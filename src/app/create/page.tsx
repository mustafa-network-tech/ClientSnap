import DemoCard from "@/components/DemoCard";
import SearchBar from "@/components/SearchBar";
import { hasSupabaseEnv, localDemos } from "@/lib/local-data";
import { createClient } from "@/lib/supabase/server";
import { Demo } from "@/types/demo";

type CreatePageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function CreatePage({ searchParams }: CreatePageProps) {
  const params = await searchParams;
  const q = (params.q ?? "").trim();
  const isLocalMode = !hasSupabaseEnv();

  let demos: Demo[] = [];
  let errorMessage = "";

  if (isLocalMode) {
    const keyword = q.toLowerCase();
    demos = localDemos.filter((demo) =>
      q
        ? demo.title.toLowerCase().includes(keyword) ||
          demo.category.toLowerCase().includes(keyword)
        : true,
    );
  } else {
    const supabase = await createClient();
    let query = supabase
      .from("demos")
      .select(
        "id,title,category,slug,demo_url,preview_image,base_price,short_description,is_active,created_at",
      )
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (q) {
      query = query.or(`title.ilike.%${q}%,category.ilike.%${q}%`);
    }

    const { data, error } = await query;
    demos = (data ?? []) as Demo[];
    errorMessage = error?.message ?? "";
  }

  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold">Demo Oluştur</h1>
        <p className="mt-2 text-neutral-600">
          Kategori ya da başlığa göre arama yap, uygun demoyu seç.
        </p>

        <form className="mt-8">
          <SearchBar value={q} />
        </form>

        {isLocalMode ? (
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            Local mod: Supabase bagli degil, mock demolar gosteriliyor.
          </div>
        ) : null}

        {!isLocalMode && errorMessage ? (
          <div className="mt-10 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            Demolar yuklenirken hata olustu: {errorMessage}
          </div>
        ) : null}

        {demos.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-neutral-300 bg-white p-12 text-center text-neutral-600">
            Bu aramaya uygun aktif demo bulunamadi.
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

