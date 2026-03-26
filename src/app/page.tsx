import Link from "next/link";
import AdminEntryButton from "@/components/AdminEntryButton";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        <span className="mb-4 rounded-full border border-neutral-300 px-4 py-1 text-sm text-neutral-600">
          Demoyu sec, teklif katmanini duzenle, aninda paylas
        </span>

        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          Musteriye hazir demo sayfasini dakikalar icinde olustur.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-600 md:text-lg">
          Kategoriye veya anahtar kelimeye gore ara, en uygun demoyu sec,
          teklif bilgilerini gir ve kisisel onizleme linkini olustur.
        </p>

        <div className="mt-10">
          <Link
            href="/create"
            className="rounded-2xl bg-neutral-900 px-8 py-4 text-white shadow-lg transition hover:opacity-90"
          >
            Demo Olustur
          </Link>
        </div>
      </section>

      <AdminEntryButton />
    </main>
  );
}
