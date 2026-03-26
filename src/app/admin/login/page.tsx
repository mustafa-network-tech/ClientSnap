import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

type AdminLoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

function normalizeAccessCode(value: string) {
  return value
    .trim()
    .toUpperCase()
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/[_\s]+/g, "-")
    .replace(/-+/g, "-");
}

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const params = await searchParams;

  async function signInAction(formData: FormData) {
    "use server";

    const loginCode = normalizeAccessCode(String(formData.get("login_code") || ""));

    if (!loginCode) {
      redirect("/admin/login?error=Kod zorunludur");
    }

    const ownerCode = normalizeAccessCode(process.env.ADMIN_OWNER_CODE || "CSNAP-OWNER-904721");
    let role: "owner" | "member" | null = null;

    if (loginCode === ownerCode) {
      role = "owner";
    } else {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("admin_invite_codes")
        .select("id")
        .eq("code", loginCode)
        .eq("is_active", true)
        .maybeSingle();
      if (!error && data) {
        role = "member";
      }
    }

    if (!role) {
      redirect("/admin/login?error=Gecersiz kod");
    }

    const cookieStore = await cookies();
    cookieStore.set("admin_role", role, {
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
            Tek kod ile giris yapin. Davet kodlari sadece yonetici tarafindan uretilir.
          </p>
        </div>

        {params.error ? (
          <div className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {params.error}
          </div>
        ) : null}
        <section className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold">Kod ile Giris</h2>
          <p className="mt-2 text-sm text-neutral-600">Yonetici ana kodu veya size verilen davet kodunu girin.</p>

          <form action={signInAction} className="mt-6 space-y-4">
            <input
              name="login_code"
              type="password"
              placeholder="Giris kodu"
              className="w-full rounded-2xl border border-neutral-300 px-4 py-3"
            />
            <button
              type="submit"
              className="w-full rounded-2xl bg-neutral-900 px-6 py-4 text-white"
            >
              Giris Yap
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

