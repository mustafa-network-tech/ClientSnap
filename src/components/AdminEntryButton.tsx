import Link from "next/link";

export default function AdminEntryButton() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Link
        href="/admin/login"
        className="rounded-full border border-neutral-300 bg-white/80 px-4 py-2 text-sm text-neutral-700 shadow-sm backdrop-blur transition hover:bg-white hover:shadow"
      >
        Admin Girişi
      </Link>
    </div>
  );
}

