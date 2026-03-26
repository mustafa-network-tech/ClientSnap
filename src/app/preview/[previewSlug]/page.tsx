import { notFound } from "next/navigation";
import { hasSupabaseEnv, localDemos } from "@/lib/local-data";
import { createClient } from "@/lib/supabase/server";
import { normalizeExternalUrl } from "@/lib/utils";
import { PreviewWithDemo } from "@/types/preview";

type PageProps = {
  params: Promise<{ previewSlug: string }>;
  searchParams: Promise<{
    company_name?: string;
    custom_title?: string;
    custom_description?: string;
    custom_price?: string;
    contact_name?: string;
    contact_phone?: string;
    contact_email?: string;
    demo_slug?: string;
  }>;
};

export default async function PreviewPage({ params, searchParams }: PageProps) {
  const { previewSlug } = await params;
  const isLocalMode = !hasSupabaseEnv();
  const query = await searchParams;

  if (isLocalMode && query.demo_slug) {
    const demo = localDemos.find((item) => item.slug === query.demo_slug);
    if (!demo) notFound();
    const localPrice = query.custom_price?.trim()
      ? Number(query.custom_price.replace(",", "."))
      : demo.base_price;
    const liveDemoUrl = normalizeExternalUrl(demo.demo_url);

    return (
      <main className="min-h-screen bg-neutral-50 px-6 py-12">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
          <div className="grid gap-0 md:grid-cols-2">
            <div className="bg-neutral-100 p-10">
              <div className="flex h-full min-h-[340px] items-center justify-center overflow-hidden rounded-3xl border border-dashed border-neutral-300">
                <div className="text-sm text-neutral-500">Demo gorseli yok</div>
              </div>
            </div>
            <div className="p-10">
              <div className="text-sm text-neutral-500">
                {(query.company_name || "Musteri")} icin hazirlanmis demo
              </div>
              <h1 className="mt-3 text-3xl font-semibold leading-tight">
                {query.custom_title || demo.title}
              </h1>
              <p className="mt-5 leading-7 text-neutral-600">
                {query.custom_description || demo.short_description || "Aciklama bulunmuyor."}
              </p>
              <div className="mt-8 rounded-2xl bg-neutral-100 p-5">
                <div className="text-sm text-neutral-500">Fiyat</div>
                <div className="mt-2 text-3xl font-bold">
                  {localPrice ? `${localPrice} TL` : "Gorusmeye gore fiyatlandirma"}
                </div>
              </div>
              <div className="mt-8 space-y-2 text-sm text-neutral-700">
                {query.contact_name ? <div>Iletisim: {query.contact_name}</div> : null}
                {query.contact_phone ? <div>Telefon: {query.contact_phone}</div> : null}
                {query.contact_email ? <div>E-posta: {query.contact_email}</div> : null}
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {liveDemoUrl ? (
                  <a
                    href={liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-2xl bg-neutral-900 px-6 py-4 text-center text-white"
                  >
                    Canli Demoyu Ac
                  </a>
                ) : (
                  <span className="rounded-2xl bg-neutral-300 px-6 py-4 text-center text-neutral-600">
                    Canli demo linki gecersiz
                  </span>
                )}
                <a
                  href={`https://wa.me/${(query.contact_phone || "905000000000").replace(/\D/g, "")}?text=Merhaba,+${encodeURIComponent(query.company_name || "musteriniz")}+icin+hazirlanan+demo+hakkinda+gorusmek+istiyorum.`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-neutral-300 px-6 py-4 text-center"
                >
                  Iletisime Gec
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-6 max-w-5xl text-center text-sm text-neutral-500">
          Local mode preview slug: {previewSlug}
        </div>
      </main>
    );
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("custom_previews")
    .select(
      "id,demo_id,company_name,custom_title,custom_description,custom_price,contact_name,contact_phone,contact_email,preview_slug,status,created_at,demos(title,category,demo_url,preview_image,base_price,short_description)",
    )
    .eq("preview_slug", previewSlug)
    .maybeSingle();

  const preview = data as PreviewWithDemo | null;
  if (!preview || !preview.demos) notFound();

  const price = preview.custom_price ?? preview.demos.base_price;
  const liveDemoUrl = normalizeExternalUrl(preview.demos.demo_url);

  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-12">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="grid gap-0 md:grid-cols-2">
          <div className="bg-neutral-100 p-10">
            <div className="flex h-full min-h-[340px] items-center justify-center overflow-hidden rounded-3xl border border-dashed border-neutral-300">
              {preview.demos.preview_image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview.demos.preview_image}
                  alt={preview.demos.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-sm text-neutral-500">Demo görseli yok</div>
              )}
            </div>
          </div>

          <div className="p-10">
            <div className="text-sm text-neutral-500">
              {preview.company_name} için hazırlanmış demo
            </div>

            <h1 className="mt-3 text-3xl font-semibold leading-tight">
              {preview.custom_title || preview.demos.title}
            </h1>

            <p className="mt-5 leading-7 text-neutral-600">
              {preview.custom_description || preview.demos.short_description || "Açıklama bulunmuyor."}
            </p>

            <div className="mt-8 rounded-2xl bg-neutral-100 p-5">
              <div className="text-sm text-neutral-500">Fiyat</div>
              <div className="mt-2 text-3xl font-bold">
                {price ? `${price} TL` : "Görüşmeye göre fiyatlandırma"}
              </div>
            </div>

            <div className="mt-8 space-y-2 text-sm text-neutral-700">
              {preview.contact_name ? <div>İletişim: {preview.contact_name}</div> : null}
              {preview.contact_phone ? <div>Telefon: {preview.contact_phone}</div> : null}
              {preview.contact_email ? <div>E-posta: {preview.contact_email}</div> : null}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {liveDemoUrl ? (
                <a
                  href={liveDemoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl bg-neutral-900 px-6 py-4 text-center text-white"
                >
                  Canlı Demoyu Aç
                </a>
              ) : (
                <span className="rounded-2xl bg-neutral-300 px-6 py-4 text-center text-neutral-600">
                  Canlı demo linki geçersiz
                </span>
              )}
              <a
                href={`https://wa.me/${(preview.contact_phone || "905000000000").replace(/\D/g, "")}?text=Merhaba,+${encodeURIComponent(preview.company_name)}+için+hazırlanan+demo+hakkında+görüşmek+istiyorum.`}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-neutral-300 px-6 py-4 text-center"
              >
                İletişime Geç
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-5xl text-center text-sm text-neutral-500">
        Preview slug: {previewSlug}
      </div>
    </main>
  );
}

