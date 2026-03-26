import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type AdminLoginPageProps = {
  searchParams: Promise<{
    error?: string;
    success?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const params = await searchParams;

  async function signInAction(formData: FormData) {
    "use server";

    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "").trim();

    if (!email || !password) {
      redirect("/admin/login?error=E-posta ve sifre zorunludur");
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      redirect(`/admin/login?error=${encodeURIComponent(error.message)}`);
    }

    redirect("/create");
  }

  async function signUpAction(formData: FormData) {
    "use server";

    const fullName = String(formData.get("full_name") || "").trim();
    const email = String(formData.get("signup_email") || "").trim();
    const whatsapp = String(formData.get("whatsapp") || "").trim();
    const password = String(formData.get("signup_password") || "").trim();

    if (!fullName || !email || !password) {
      redirect("/admin/login?error=Kayit icin ad, e-posta ve sifre gereklidir");
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          whatsapp,
        },
      },
    });

    if (error) {
      redirect(`/admin/login?error=${encodeURIComponent(error.message)}`);
    }

    redirect(
      "/admin/login?success=Kayit olusturuldu. E-posta dogrulama aciksa lutfen gelen kutunuzu kontrol edin.",
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-6 py-10">
      <div className="w-full max-w-5xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-neutral-900">Yönetici Paneli</h1>
          <p className="mt-2 text-sm text-neutral-600">
            Giriş yapabilir veya yeni kullanıcı hesabı oluşturabilirsiniz.
          </p>
        </div>

        {params.error ? (
          <div className="mb-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {params.error}
          </div>
        ) : null}
        {params.success ? (
          <div className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {params.success}
          </div>
        ) : null}

        <section className="grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold">Yönetici Girişi</h2>
            <p className="mt-2 text-sm text-neutral-600">
              Mevcut hesabınızla panelinize giriş yapın.
            </p>

            <form action={signInAction} className="mt-6 space-y-4">
              <input
                name="email"
                type="email"
                placeholder="E-posta"
                className="w-full rounded-2xl border border-neutral-300 px-4 py-3"
              />
              <input
                name="password"
                type="password"
                placeholder="Şifre"
                className="w-full rounded-2xl border border-neutral-300 px-4 py-3"
              />
              <button
                type="submit"
                className="w-full rounded-2xl bg-neutral-900 px-6 py-4 text-white"
              >
                Giriş Yap
              </button>
            </form>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold">Kullanıcı Ol</h2>
            <p className="mt-2 text-sm text-neutral-600">
              Yeni hesap oluşturup kendi demo panelinizi başlatın.
            </p>

            <form action={signUpAction} className="mt-6 space-y-4">
              <input
                name="full_name"
                type="text"
                placeholder="Ad Soyad"
                className="w-full rounded-2xl border border-neutral-300 px-4 py-3"
              />
              <input
                name="signup_email"
                type="email"
                placeholder="E-posta"
                className="w-full rounded-2xl border border-neutral-300 px-4 py-3"
              />
              <input
                name="whatsapp"
                type="tel"
                placeholder="WhatsApp Numarası"
                className="w-full rounded-2xl border border-neutral-300 px-4 py-3"
              />
              <input
                name="signup_password"
                type="password"
                placeholder="Şifre"
                className="w-full rounded-2xl border border-neutral-300 px-4 py-3"
              />
              <button
                type="submit"
                className="w-full rounded-2xl bg-neutral-900 px-6 py-4 text-white"
              >
                Hesap Oluştur
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

