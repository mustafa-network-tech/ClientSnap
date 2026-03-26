export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-6">
      <div className="w-full max-w-md rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold">Admin Girişi</h1>
        <p className="mt-2 text-neutral-600">
          Panel burada başlayacak. Şimdilik sadece giriş ekranı.
        </p>

        <form className="mt-8 space-y-4">
          <input
            type="email"
            placeholder="E-posta"
            className="w-full rounded-2xl border px-4 py-3"
          />
          <input
            type="password"
            placeholder="Şifre"
            className="w-full rounded-2xl border px-4 py-3"
          />
          <button
            type="submit"
            className="w-full rounded-2xl bg-neutral-900 px-6 py-4 text-white"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </main>
  );
}

