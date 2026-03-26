import Link from "next/link";
import AdminEntryButton from "@/components/AdminEntryButton";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        <span className="mb-4 rounded-full border border-neutral-300 px-4 py-1 text-sm text-neutral-600">
          Choose a demo, customize the offer layer, share instantly
        </span>

        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          Create a client-ready demo page in minutes.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-600 md:text-lg">
          Search by category or keyword, pick the best template, and generate a
          personalized preview link with your custom offer details.
        </p>

        <div className="mt-10">
          <Link
            href="/create"
            className="rounded-2xl bg-neutral-900 px-8 py-4 text-white shadow-lg transition hover:opacity-90"
          >
            Create Demo
          </Link>
        </div>
      </section>

      <AdminEntryButton />
    </main>
  );
}
