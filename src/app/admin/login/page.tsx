import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

type AdminLoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const params = await searchParams;

  async function signInWithAccessCodeAction(formData: FormData) {
    "use server";

    const accessCode = String(formData.get("access_code") || "").trim();

    if (!accessCode) {
      redirect("/admin/login?error=Sifre zorunludur");
    }

    const supabase = await createClient();
    const { data: codeData, error: codeError } = await supabase
      .from("admin_access_codes")
      .select("id")
      .eq("code", accessCode)
      .eq("is_active", true)
      .maybeSingle();

    if (codeError || !codeData) {
      redirect("/admin/login?error=Gecersiz sifre");
    }

    const { data: existingAccount, error: existingAccountError } = await supabase
      .from("admin_accounts")
      .select("id, user_pin")
      .eq("access_code_id", codeData.id)
      .maybeSingle();

    if (existingAccountError) {
      redirect("/admin/login?error=Hesap kontrolu basarisiz");
    }

    if (existingAccount?.user_pin) {
      redirect("/admin/login?error=Bu kod aktif edildi. Kod + 6 haneli kod ile giris yapin");
    }

    let accountId = existingAccount?.id;

    if (!accountId) {
      const { data: createdAccount, error: createError } = await supabase
        .from("admin_accounts")
        .insert({
          access_code_id: codeData.id,
          updated_at: new Date().toISOString(),
        })
        .select("id")
        .single();

      if (createError || !createdAccount) {
        redirect("/admin/login?error=Hesap olusturulamadi");
      }

      accountId = createdAccount.id;
    }

    const cookieStore = await cookies();
    cookieStore.set("admin_account_id", accountId, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    redirect("/admin/profile");
  }

  async function signInWithPinAction(formData: FormData) {
    "use server";

    const accessCode = String(formData.get("pin_access_code") || "").trim();
    const userPin = String(formData.get("user_pin") || "").trim();

    if (!accessCode) {
      redirect("/admin/login?error=Kod zorunludur");
    }

    if (!/^\d{6}$/.test(userPin)) {
      redirect("/admin/login?error=6 haneli kod 6 rakam olmalidir");
    }

    const supabase = await createClient();
    const { data: codeData, error: codeError } = await supabase
      .from("admin_access_codes")
      .select("id")
      .eq("code", accessCode)
      .eq("is_active", true)
      .not("claimed_at", "is", null)
      .single();

    if (codeError || !codeData) {
      redirect("/admin/login?error=Kod veya 6 haneli kod hatali");
    }

    const { data, error } = await supabase
      .from("admin_accounts")
      .select("id")
      .eq("access_code_id", codeData.id)
      .eq("user_pin", userPin)
      .maybeSingle();

    if (error || !data) {
      redirect("/admin/login?error=Kod veya 6 haneli kod hatali");
    }

    const cookieStore = await cookies();
    cookieStore.set("admin_account_id", data.id, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    redirect("/create");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-6 py-12">
      <div className="w-full max-w-3xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-neutral-900">Yönetici Paneli</h1>
          <p className="mt-2 text-sm text-neutral-600">
            Ilk giriste kod ile, sonraki girislerde kodunuz ve 6 haneli kodunuz ile devam edin.
          </p>
        </div>

        {params.error ? (
          <div className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {params.error}
          </div>
        ) : null}
        <section className="grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold">Ilk Giris Kodu</h2>
            <p className="mt-2 text-sm text-neutral-600">Sistemde tanimli 25 koddan biriyle ilk girisinizi yapin.</p>

            <form action={signInWithAccessCodeAction} className="mt-6 space-y-4">
              <input
                name="access_code"
                type="password"
                placeholder="Ilk giris sifresi"
                className="w-full rounded-2xl border border-neutral-300 px-4 py-3"
              />
              <button
                type="submit"
                className="w-full rounded-2xl bg-neutral-900 px-6 py-4 text-white"
              >
                Ilk Giris Yap
              </button>
            </form>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold">6 Haneli Kod ile Giris</h2>
            <p className="mt-2 text-sm text-neutral-600">Sonraki girislerde kodunuz ve 6 haneli kodunuz birlikte zorunludur.</p>

            <form action={signInWithPinAction} className="mt-6 space-y-4">
              <input
                name="pin_access_code"
                type="password"
                placeholder="Size verilen kod"
                className="w-full rounded-2xl border border-neutral-300 px-4 py-3"
              />
              <input
                name="user_pin"
                type="password"
                inputMode="numeric"
                pattern="\d{6}"
                maxLength={6}
                placeholder="6 haneli kod"
                className="w-full rounded-2xl border border-neutral-300 px-4 py-3"
              />
              <button
                type="submit"
                className="w-full rounded-2xl border border-neutral-300 bg-white px-6 py-4 text-neutral-900"
              >
                6 Haneli Kod ile Gir
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

