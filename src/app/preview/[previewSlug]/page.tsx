import { notFound } from "next/navigation";
import DemoLandingPage from "@/components/DemoLandingPage";
import { hasSupabaseEnv, localDemos } from "@/lib/local-data";
import { createClient } from "@/lib/supabase/server";
import { PreviewWithDemo } from "@/types/preview";

type PageProps = {
  params: Promise<{ previewSlug: string }>;
  searchParams: Promise<{
    company_name?: string;
    custom_title?: string;
    custom_description?: string;
    custom_price?: string;
    custom_cover_image?: string;
    accent_color?: string;
    hero_primary_cta?: string;
    hero_secondary_cta?: string;
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

    const price = query.custom_price?.trim()
      ? `${query.custom_price} TL`
      : demo.base_price
        ? `${demo.base_price} TL`
        : "Price on request";

    return (
      <DemoLandingPage
        data={{
          companyName: query.company_name || "Client",
          title: query.custom_title || demo.title,
          description:
            query.custom_description ||
            demo.short_description ||
            "Landing page preview for your selected demo.",
          priceLabel: price,
          contactName: query.contact_name,
          contactPhone: query.contact_phone,
          contactEmail: query.contact_email,
          demoUrl: demo.demo_url,
          previewImage: demo.preview_image,
          customCoverImage: query.custom_cover_image,
          accentColor: query.accent_color,
          heroPrimaryCta: query.hero_primary_cta,
          heroSecondaryCta: query.hero_secondary_cta,
          category: demo.category,
        }}
      />
    );
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("custom_previews")
    .select(
      "id,demo_id,company_name,custom_title,custom_description,custom_price,custom_cover_image,accent_color,hero_primary_cta,hero_secondary_cta,contact_name,contact_phone,contact_email,preview_slug,status,created_at,demos(title,category,demo_url,preview_image,base_price,short_description)",
    )
    .eq("preview_slug", previewSlug)
    .maybeSingle();

  const preview = data as PreviewWithDemo | null;
  if (!preview || !preview.demos) notFound();

  const price = preview.custom_price ?? preview.demos.base_price;

  return (
    <DemoLandingPage
      data={{
        companyName: preview.company_name,
        title: preview.custom_title || preview.demos.title,
        description:
          preview.custom_description ||
          preview.demos.short_description ||
          "Landing page preview for your selected demo.",
        priceLabel: price ? `${price} TL` : "Price on request",
        contactName: preview.contact_name,
        contactPhone: preview.contact_phone,
        contactEmail: preview.contact_email,
        demoUrl: preview.demos.demo_url,
        previewImage: preview.demos.preview_image,
        customCoverImage: preview.custom_cover_image,
        accentColor: preview.accent_color,
        heroPrimaryCta: preview.hero_primary_cta,
        heroSecondaryCta: preview.hero_secondary_cta,
        category: preview.demos.category,
      }}
    />
  );
}
