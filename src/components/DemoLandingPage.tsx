import { getCategoryContent } from "@/lib/demo-content";
import { normalizeExternalUrl } from "@/lib/utils";

type LandingData = {
  companyName: string;
  title: string;
  description: string;
  priceLabel: string;
  contactName?: string | null;
  contactPhone?: string | null;
  contactEmail?: string | null;
  demoUrl: string;
  previewImage?: string | null;
  customCoverImage?: string | null;
  accentColor?: string | null;
  heroPrimaryCta?: string | null;
  heroSecondaryCta?: string | null;
  category: string;
};

function AccentButton({ href, text, accent }: { href: string; text: string; accent: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="rounded-2xl px-6 py-3 text-center text-sm font-semibold text-white" style={{ backgroundColor: accent }}>
      {text}
    </a>
  );
}

function resolveTheme(rawTone: string | null | undefined) {
  const value = (rawTone || "").trim().toLowerCase();
  const palette: Record<string, { accent: string; bg: string }> = {
    mavi: { accent: "#2563eb", bg: "#eff6ff" },
    blue: { accent: "#2563eb", bg: "#eff6ff" },
    yesil: { accent: "#16a34a", bg: "#f0fdf4" },
    green: { accent: "#16a34a", bg: "#f0fdf4" },
    sari: { accent: "#ca8a04", bg: "#fefce8" },
    yellow: { accent: "#ca8a04", bg: "#fefce8" },
    mor: { accent: "#9333ea", bg: "#faf5ff" },
    purple: { accent: "#9333ea", bg: "#faf5ff" },
    kirmizi: { accent: "#dc2626", bg: "#fef2f2" },
    red: { accent: "#dc2626", bg: "#fef2f2" },
    turuncu: { accent: "#ea580c", bg: "#fff7ed" },
    orange: { accent: "#ea580c", bg: "#fff7ed" },
    lacivert: { accent: "#1e3a8a", bg: "#eff6ff" },
    navy: { accent: "#1e3a8a", bg: "#eff6ff" },
  };

  if (palette[value]) return palette[value];
  if (value && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value)) {
    return { accent: value, bg: "#f8fafc" };
  }
  return { accent: "#111827", bg: "#f8fafc" };
}

export default function DemoLandingPage({ data }: { data: LandingData }) {
  const content = getCategoryContent(data.category);
  const mainCta = data.heroPrimaryCta || content.primaryCta;
  const secondaryCta = data.heroSecondaryCta || content.secondaryCta;
  const liveDemoUrl = normalizeExternalUrl(data.demoUrl);
  const coverImage = normalizeExternalUrl(data.customCoverImage || data.previewImage || null);
  const theme = resolveTheme(data.accentColor);
  const accent = theme.accent;
  const whatsappTarget = `https://wa.me/${(data.contactPhone || "905000000000").replace(/\D/g, "")}?text=Merhaba,+${encodeURIComponent(data.companyName)}+icin+hazirlanan+siteyi+istiyorum.`;

  return (
    <main className="min-h-screen px-4 py-8 md:px-6 md:py-12" style={{ backgroundColor: theme.bg }}>
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <header className="flex items-center justify-between border-b border-neutral-200 px-5 py-4 md:px-8">
          <p className="text-base font-semibold text-neutral-900">{data.companyName}</p>
          <nav className="hidden gap-5 text-sm text-neutral-600 md:flex">
            {content.nav.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
        </header>

        <section className="grid gap-8 px-5 py-8 md:grid-cols-2 md:px-8 md:py-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Premium Landing Demo</p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-neutral-900 md:text-5xl">{data.title || content.heroTitle}</h1>
            <p className="mt-4 text-base leading-7 text-neutral-600">{data.description || content.heroDescription}</p>

            <div className="mt-6 rounded-2xl bg-neutral-100 p-4">
              <p className="text-sm text-neutral-500">Fiyat Teklifi</p>
              <p className="mt-1 text-3xl font-bold text-neutral-900">{data.priceLabel}</p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {liveDemoUrl ? <AccentButton href={liveDemoUrl} text={mainCta} accent={accent} /> : <span className="rounded-2xl bg-neutral-300 px-6 py-3 text-center text-sm text-neutral-600">Canli demo URL gecersiz</span>}
              <AccentButton href={whatsappTarget} text={secondaryCta} accent={accent} />
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100">
            {coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={coverImage} alt={data.title} className="h-full min-h-[320px] w-full object-cover" />
            ) : (
              <div className="flex min-h-[320px] items-center justify-center text-sm text-neutral-500">Cover image yok</div>
            )}
          </div>
        </section>

        <section className="border-t border-neutral-200 px-5 py-8 md:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {content.values.map((item) => (
              <article key={item.title} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-neutral-200 px-5 py-8 md:px-8">
          <h2 className="text-2xl font-semibold text-neutral-900">Hizmetler</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {content.services.map((item) => (
              <article key={item.title} className="rounded-2xl border border-neutral-200 p-4">
                <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-neutral-200 px-5 py-8 md:px-8">
          <h2 className="text-2xl font-semibold text-neutral-900">Hakkimizda</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-600">{content.about}</p>
        </section>

        <section className="border-t border-neutral-200 px-5 py-8 md:px-8">
          <h2 className="text-2xl font-semibold text-neutral-900">{content.galleryTitle}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {content.galleryItems.map((item) => (
              <div key={item} className="flex min-h-[120px] items-end rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm font-medium text-neutral-700">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-neutral-200 px-5 py-8 md:px-8">
          <h2 className="text-2xl font-semibold text-neutral-900">Yorumlar</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {content.testimonials.map((item) => (
              <article key={item.name} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                <p className="text-sm leading-6 text-neutral-700">&quot;{item.quote}&quot;</p>
                <p className="mt-3 text-sm font-semibold text-neutral-900">{item.name}</p>
                <p className="text-xs text-neutral-500">{item.role}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-neutral-200 px-5 py-8 md:px-8">
          <h2 className="text-2xl font-semibold text-neutral-900">Sik Sorulan Sorular</h2>
          <div className="mt-5 space-y-3">
            {content.faqs.map((item) => (
              <article key={item.question} className="rounded-2xl border border-neutral-200 p-4">
                <p className="text-sm font-semibold text-neutral-900">{item.question}</p>
                <p className="mt-2 text-sm text-neutral-600">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-neutral-200 px-5 py-8 md:px-8">
          <h2 className="text-2xl font-semibold text-neutral-900">Iletisim</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">
              <p>Telefon: {data.contactPhone || "-"}</p>
              <p className="mt-2">E-posta: {data.contactEmail || "-"}</p>
              <p className="mt-2">Yetkili: {data.contactName || "-"}</p>
              <p className="mt-2">Adres: Isletme adres bilgisi burada yer alir.</p>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-4">
              <p className="text-sm font-semibold text-neutral-900">Iletisim Formu</p>
              <div className="mt-3 space-y-2">
                <div className="rounded-xl bg-neutral-100 px-3 py-2 text-sm text-neutral-500">Ad Soyad</div>
                <div className="rounded-xl bg-neutral-100 px-3 py-2 text-sm text-neutral-500">Telefon / E-posta</div>
                <div className="rounded-xl bg-neutral-100 px-3 py-5 text-sm text-neutral-500">Mesajiniz</div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-200 px-5 py-10 text-center md:px-8">
          <h2 className="text-3xl font-semibold text-neutral-900">{content.finalCtaTitle}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-neutral-600">{content.finalCtaDescription}</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <AccentButton href={whatsappTarget} text="Bu Siteyi Istiyorum" accent={accent} />
            <AccentButton href={whatsappTarget} text="Teklif Al" accent={accent} />
          </div>
        </section>
      </div>
    </main>
  );
}
