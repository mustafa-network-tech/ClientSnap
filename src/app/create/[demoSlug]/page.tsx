import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { Buffer } from "node:buffer";
import PreviewForm from "@/components/PreviewForm";
import { requireAdminSession } from "@/lib/admin-auth";
import { hasSupabaseEnv, localDemos } from "@/lib/local-data";
import { findStockImageByTag } from "@/lib/stock-images";
import { createClient } from "@/lib/supabase/server";
import { createPreviewSlug } from "@/lib/utils";
import { Demo } from "@/types/demo";

type PageProps = {
  params: Promise<{ demoSlug: string }>;
  searchParams: Promise<{ error?: string }>;
};

export default async function EditDemoPage({ params, searchParams }: PageProps) {
  await requireAdminSession();

  const { demoSlug } = await params;
  const pageParams = await searchParams;
  const isLocalMode = !hasSupabaseEnv();
  let demo: Demo | null = null;

  if (isLocalMode) {
    demo = localDemos.find((item) => item.slug === demoSlug) ?? null;
  } else {
    const supabase = await createClient();
    const { data: demoData } = await supabase
      .from("demos")
      .select(
        "id,title,category,slug,demo_url,preview_image,base_price,short_description,is_active,created_at",
      )
      .eq("slug", demoSlug)
      .eq("is_active", true)
      .maybeSingle();

    demo = demoData as Demo | null;
  }

  if (!demo) notFound();
  const demoId = demo.id;

  async function createPreview(formData: FormData) {
    "use server";

    const companyName = String(formData.get("company_name") || "").trim();
    const customTitle = String(formData.get("custom_title") || "").trim();
    const customDescription = String(formData.get("custom_description") || "").trim();
    const customPriceRaw = String(formData.get("custom_price") || "").trim();
    let customCoverImage = String(formData.get("custom_cover_image") || "").trim();
    const stockImageTag = String(formData.get("stock_image_tag") || "").trim();
    const accentColor = String(formData.get("accent_color") || "").trim();
    const heroPrimaryCta = String(formData.get("hero_primary_cta") || "").trim();
    const heroSecondaryCta = String(formData.get("hero_secondary_cta") || "").trim();
    const contactName = String(formData.get("contact_name") || "").trim();
    const contactPhone = String(formData.get("contact_phone") || "").trim();
    const contactEmail = String(formData.get("contact_email") || "").trim();

    if (!companyName) {
      return;
    }

    const customPrice = customPriceRaw ? Number(customPriceRaw.replace(",", ".")) : null;
    const previewSlug = createPreviewSlug(companyName);
    const previewParams = new URLSearchParams({
      company_name: companyName,
      custom_title: customTitle,
      custom_description: customDescription,
      custom_price: customPriceRaw,
      custom_cover_image: customCoverImage,
      stock_image_tag: stockImageTag,
      accent_color: accentColor,
      hero_primary_cta: heroPrimaryCta,
      hero_secondary_cta: heroSecondaryCta,
      contact_name: contactName,
      contact_phone: contactPhone,
      contact_email: contactEmail,
      demo_slug: demoSlug,
    });

    if (!customCoverImage && stockImageTag) {
      const stockImage = findStockImageByTag(stockImageTag);
      if (stockImage) {
        customCoverImage = stockImage.url;
        previewParams.set("custom_cover_image", customCoverImage);
      }
    }

    if (isLocalMode) {
      redirect(`/preview/${previewSlug}?${previewParams.toString()}`);
    }

    const innerSupabase = await createClient();
    const headerStore = await headers();
    const rawIp = headerStore.get("x-forwarded-for") || headerStore.get("x-real-ip") || "";
    const ipAddress = rawIp.split(",")[0]?.trim() || "unknown";
    const nowIso = new Date().toISOString();

    const { data: quotaRow } = await innerSupabase
      .from("preview_quota_by_ip")
      .select("ip_address, attempts, window_started_at, blocked_until")
      .eq("ip_address", ipAddress)
      .maybeSingle();

    if (!quotaRow) {
      await innerSupabase.from("preview_quota_by_ip").insert({
        ip_address: ipAddress,
        attempts: 1,
        window_started_at: nowIso,
        blocked_until: null,
        updated_at: nowIso,
      });
    } else {
      const nowTime = new Date(nowIso).getTime();
      const windowStart = new Date(quotaRow.window_started_at).getTime();
      const blockedUntilTime = quotaRow.blocked_until ? new Date(quotaRow.blocked_until).getTime() : 0;
      const isBlocked = blockedUntilTime > nowTime;
      const isNewWindow = nowTime - windowStart >= 24 * 60 * 60 * 1000;

      if (isBlocked) {
        redirect(`/create/${demoSlug}?error=limit_reached`);
      }

      if (isNewWindow) {
        await innerSupabase
          .from("preview_quota_by_ip")
          .update({
            attempts: 1,
            window_started_at: nowIso,
            blocked_until: null,
            updated_at: nowIso,
          })
          .eq("ip_address", ipAddress);
      } else if (quotaRow.attempts >= 3) {
        await innerSupabase
          .from("preview_quota_by_ip")
          .update({
            blocked_until: new Date(windowStart + 24 * 60 * 60 * 1000).toISOString(),
            updated_at: nowIso,
          })
          .eq("ip_address", ipAddress);
        redirect(`/create/${demoSlug}?error=limit_reached`);
      } else {
        await innerSupabase
          .from("preview_quota_by_ip")
          .update({
            attempts: quotaRow.attempts + 1,
            updated_at: nowIso,
          })
          .eq("ip_address", ipAddress);
      }
    }

    const coverFile = formData.get("custom_cover_file");
    const maxFileSize = 2 * 1024 * 1024;

    if (coverFile instanceof File && coverFile.size > 0) {
      if (coverFile.size <= maxFileSize) {
        const bucketName = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "demo-covers";
        const safeName = `${previewSlug}-${Date.now()}.${coverFile.name.split(".").pop() || "jpg"}`;
        const objectPath = `previews/${safeName}`;
        const fileBytes = Buffer.from(await coverFile.arrayBuffer());

        const { error: uploadError } = await innerSupabase.storage
          .from(bucketName)
          .upload(objectPath, fileBytes, {
            contentType: coverFile.type || "image/jpeg",
            upsert: true,
          });

        if (!uploadError) {
          const { data: publicData } = innerSupabase.storage
            .from(bucketName)
            .getPublicUrl(objectPath);
          customCoverImage = publicData.publicUrl || customCoverImage;
        }
      } else {
        previewParams.set("upload_warning", "max_2mb");
      }
    }

    previewParams.set("custom_cover_image", customCoverImage);

    const { error } = await innerSupabase.from("custom_previews").insert({
      demo_id: demoId,
      company_name: companyName,
      custom_title: customTitle || null,
      custom_description: customDescription || null,
      custom_price: Number.isFinite(customPrice as number) ? customPrice : null,
      custom_cover_image: customCoverImage || null,
      accent_color: accentColor || null,
      hero_primary_cta: heroPrimaryCta || null,
      hero_secondary_cta: heroSecondaryCta || null,
      contact_name: contactName || null,
      contact_phone: contactPhone || null,
      contact_email: contactEmail || null,
      preview_slug: previewSlug,
      status: "active",
    });

    if (error) {
      const fallbackParams = new URLSearchParams(previewParams);
      fallbackParams.set("force_preview", "1");
      redirect(`/preview/${previewSlug}?${fallbackParams.toString()}`);
    }

    redirect(`/preview/${previewSlug}`);
  }

  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-12">
      <div className="mx-auto max-w-3xl rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold">Demo Düzenle</h1>
          <p className="mt-2 text-neutral-600">
            Sadece sunum katmanı düzenlenir, demo kodu sabit kalır.
          </p>
        </div>

        <div className="mb-8 rounded-2xl bg-neutral-100 p-4">
          <p className="text-sm text-neutral-500">Seçilen demo</p>
          <h2 className="mt-1 text-lg font-semibold text-neutral-900">{demo.title}</h2>
          <p className="text-sm text-neutral-600">{demo.short_description || "Açıklama yok"}</p>
        </div>
        {isLocalMode ? (
          <p className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            Local mod: onizleme kaydi veritabanina yazilmaz, URL parametresi ile ilerler.
          </p>
        ) : null}
        {pageParams.error === "limit_reached" ? (
          <p className="mb-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            Limitiniz donmustur. 24 saat dolmadan yeni demo olusturamazsiniz.
          </p>
        ) : null}

        <PreviewForm action={createPreview} />
      </div>
    </main>
  );
}

