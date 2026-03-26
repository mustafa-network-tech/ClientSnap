import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

type AdminProfilePageProps = {
  searchParams: Promise<{
    error?: string;
    success?: string;
  }>;
};

export default async function AdminProfilePage({ searchParams }: AdminProfilePageProps) {
  const params = await searchParams;
  const cookieStore = await cookies();
  const accountId = cookieStore.get("admin_account_id")?.value;

  if (!accountId) {
    redirect("/admin/login?error=Once giris yapin");
  }

  const supabase = await createClient();
  const { data: account } = await supabase
    .from("admin_accounts")
    .select("id, access_code_id, first_name, last_name, user_pin")
    .eq("id", accountId)
    .maybeSingle();

  if (!account) {
    redirect("/admin/login?error=Oturum bulunamadi");
  }

  async function saveProfileAction(formData: FormData) {
    "use server";

    const cookieStoreServer = await cookies();
    const currentAccountId = cookieStoreServer.get("admin_account_id")?.value;

    if (!currentAccountId) {
      redirect("/admin/login?error=Oturum suresi doldu");
    }

    const firstName = String(formData.get("first_name") || "").trim();
    const lastName = String(formData.get("last_name") || "").trim();
    const userPin = String(formData.get("user_pin") || "").trim();
    const userPinConfirm = String(formData.get("user_pin_confirm") || "").trim();

    if (!firstName || !lastName) {
      redirect("/admin/profile?error=Ad ve soyad zorunludur");
    }

    if (!/^\d{6}$/.test(userPin)) {
      redirect("/admin/profile?error=6 haneli kod 6 rakam olmalidir");
    }

    if (userPin !== userPinConfirm) {
      redirect("/admin/profile?error=6 haneli kod tekrari eslesmiyor");
    }

    const supabaseServer = await createClient();
    const { data: currentAccount, error: currentAccountError } = await supabaseServer
      .from("admin_accounts")
      .select("id, access_code_id")
      .eq("id", currentAccountId)
      .single();

    if (currentAccountError || !currentAccount) {
      redirect("/admin/profile?error=Hesap bulunamadi");
    }

    const { error } = await supabaseServer
      .from("admin_accounts")
      .update({
        first_name: firstName,
        last_name: lastName,
        user_pin: userPin,
        updated_at: new Date().toISOString(),
      })
      .eq("id", currentAccountId);

    if (error) {
      redirect("/admin/profile?error=Profil kaydedilemedi, 6 haneli kod kullanimda olabilir");
    }

    const { error: claimError } = await supabaseServer
      .from("admin_access_codes")
      .update({
        claimed_at: new Date().toISOString(),
      })
      .eq("id", currentAccount.access_code_id)
      .is("claimed_at", null);

    if (claimError) {
      redirect("/admin/profile?error=Kod aktivasyonu basarisiz");
    }

    redirect("/create");
  }

  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-12">
      <div className="mx-auto w-full max-w-2xl rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold text-neutral-900">Profil Ayarlari</h1>
        <p className="mt-2 text-sm text-neutral-600">
          Ilk giris tamamlandi. Simdi ad-soyad ve sonraki girisler icin 6 haneli kod olusturun.
        </p>

        {params.error ? (
          <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {params.error}
          </div>
        ) : null}

        {params.success ? (
          <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {params.success}
          </div>
        ) : null}

        <form action={saveProfileAction} className="mt-6 space-y-4">
          <input
            name="first_name"
            type="text"
            placeholder="Ad"
            defaultValue={account.first_name ?? ""}
            className="w-full rounded-2xl border border-neutral-300 px-4 py-3"
          />
          <input
            name="last_name"
            type="text"
            placeholder="Soyad"
            defaultValue={account.last_name ?? ""}
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
          <input
            name="user_pin_confirm"
            type="password"
            inputMode="numeric"
            pattern="\d{6}"
            maxLength={6}
            placeholder="6 haneli kod tekrar"
            className="w-full rounded-2xl border border-neutral-300 px-4 py-3"
          />

          <button type="submit" className="w-full rounded-2xl bg-neutral-900 px-6 py-4 text-white">
            Profili Kaydet
          </button>
        </form>
      </div>
    </main>
  );
}
