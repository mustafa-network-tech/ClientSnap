import Link from "next/link";
import DemoCard from "@/components/DemoCard";
import SearchBar from "@/components/SearchBar";
import { hasSupabaseEnv, localDemos } from "@/lib/local-data";
import { createClient } from "@/lib/supabase/server";
import { Demo } from "@/types/demo";

type CreatePageProps = {
  searchParams: Promise<{ q?: string }>;
};

const popularTags = [
  "real estate",
  "beauty",
  "hair care",
  "lawyer",
  "dental clinic",
  "consulting",
  "fitness",
  "software",
  "restaurant",
  "photographer",
  "psychologist",
  "education",
];

function normalizeSearchValue(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default async function CreatePage({ searchParams }: CreatePageProps) {
  const params = await searchParams;
  const q = (params.q ?? "").trim();
  const isLocalMode = !hasSupabaseEnv();

  let demos: Demo[] = [];
  let errorMessage = "";

  if (isLocalMode) {
    const keyword = normalizeSearchValue(q);
    demos = localDemos.filter((demo) =>
      q
        ? normalizeSearchValue(demo.title).includes(keyword) ||
          normalizeSearchValue(demo.category).includes(keyword) ||
          (demo.tags ?? []).some((tag) =>
            normalizeSearchValue(tag).includes(keyword),
          )
        : true,
    );
  } else {
    const supabase = await createClient();
    if (q) {
      const { data, error } = await supabase.rpc("search_demos", {
        search_text: q,
      });
      demos = (data ?? []) as Demo[];
      errorMessage = error?.message ?? "";
    } else {
      const { data, error } = await supabase
        .from("demos")
        .select(
          "id,title,category,tags,slug,demo_url,preview_image,base_price,short_description,is_active,created_at",
        )
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      demos = (data ?? []) as Demo[];
      errorMessage = error?.message ?? "";
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold">Create Demo Preview</h1>
        <p className="mt-2 text-neutral-600">
          Search by title, category, or tags to find the best demo quickly.
        </p>

        <form className="mt-8">
          <SearchBar value={q} />
        </form>

        <div className="mt-4 flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Link
              key={tag}
              href={`/create?q=${encodeURIComponent(tag)}`}
              className="rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs text-neutral-700 hover:border-neutral-900 hover:text-neutral-900"
            >
              {tag}
            </Link>
          ))}
        </div>

        {isLocalMode ? (
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            Local mode active: using mock demo catalog.
          </div>
        ) : null}

        {!isLocalMode && errorMessage ? (
          <div className="mt-10 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            Failed to load demos: {errorMessage}
          </div>
        ) : null}

        {demos.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-neutral-300 bg-white p-12 text-center text-neutral-600">
            No active demos found for this search.
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {demos.map((demo) => (
              <DemoCard key={demo.id} demo={demo} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
