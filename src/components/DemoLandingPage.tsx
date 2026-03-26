import { getCategoryContent } from "@/lib/demo-content";
import { normalizeExternalUrl } from "@/lib/utils";

type LandingData = {
  companyName: string;
  title: string;
  description: string;
  priceValue?: number | null;
  contactName?: string | null;
  contactPhone?: string | null;
  contactEmail?: string | null;
  ownerName?: string | null;
  ownerWhatsapp?: string | null;
  ownerEmail?: string | null;
  ownerBrandName?: string | null;
  previewImage?: string | null;
  customCoverImage?: string | null;
  accentColor?: string | null;
  heroPrimaryCta?: string | null;
  heroSecondaryCta?: string | null;
  category: string;
};

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

function formatPrice(price?: number | null) {
  if (!price || Number.isNaN(price)) {
    return { regular: "-", discounted: "-" };
  }
  const regular = Math.round(price * 1.8);
  return {
    regular: `${regular.toLocaleString("tr-TR")} TL`,
    discounted: `${Math.round(price).toLocaleString("tr-TR")} TL`,
  };
}

function sanitizeWhatsapp(value?: string | null) {
  return (value || "").replace(/\D/g, "");
}

export default function DemoLandingPage({ data }: { data: LandingData }) {
  const content = getCategoryContent(data.category);
  const coverImage = normalizeExternalUrl(data.customCoverImage || data.previewImage || null);
  const theme = resolveTheme(data.accentColor);
  const accent = theme.accent;
  const heroWhatsapp = sanitizeWhatsapp(data.ownerWhatsapp || data.contactPhone || "905000000000");
  const fixedFooterWhatsapp = "905456597552";
  const footerWhatsapp = sanitizeWhatsapp(fixedFooterWhatsapp);
  const message = encodeURIComponent(
    "Merhaba, hazırladığınız demo siteyi inceledim. Bu siteyi yaptırmak istiyorum.",
  );
  const heroWhatsappTarget = `https://wa.me/${heroWhatsapp}?text=${message}`;
  const footerWhatsappTarget = `https://wa.me/${footerWhatsapp}?text=${message}`;
  const prices = formatPrice(data.priceValue);

  return (
    <main className="min-h-screen px-4 py-8 md:px-6 md:py-12" style={{ backgroundColor: theme.bg }}>
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/95 px-5 py-4 backdrop-blur md:px-8">
          <div className="flex items-center justify-between">
            <p className="text-base font-semibold text-neutral-900">{data.companyName}</p>
            <nav className="hidden gap-6 text-sm text-neutral-600 md:flex">
              <a href="#anasayfa" className="hover:text-neutral-900">Ana Sayfa</a>
              <a href="#hizmetler" className="hover:text-neutral-900">Hizmetler</a>
              <a href="#hakkimizda" className="hover:text-neutral-900">Hakkımızda</a>
              <a href="#iletisim" className="hover:text-neutral-900">İletişim</a>
            </nav>
          </div>
        </header>

        <section id="anasayfa" className="grid gap-8 px-5 py-8 md:grid-cols-2 md:px-8 md:py-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Bu demo size özel hazırlanmıştır</p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight text-neutral-900 md:text-5xl">
              İşletmeniz için modern ve müşteri kazandıran web sitesi
            </h1>
            <p className="mt-4 text-base leading-7 text-neutral-600">
              Markanıza özel tasarım ve hızlı iletişim altyapısı ile daha fazla müşteriye ulaşın.
            </p>

            <div className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
              <p className="text-sm text-neutral-500 line-through">{prices.regular}</p>
              <p className="mt-1 text-3xl font-bold text-neutral-900">{prices.discounted}</p>
              <p className="mt-1 text-sm text-neutral-500">Kurulum ve teslim dahil</p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={heroWhatsappTarget} target="_blank" rel="noreferrer" className="rounded-2xl px-6 py-3 text-center text-sm font-semibold text-white" style={{ backgroundColor: accent }}>
                {data.heroPrimaryCta || "WhatsApp'tan Başlat"}
              </a>
              <a href="#detaylar" className="rounded-2xl border border-neutral-300 px-6 py-3 text-center text-sm font-semibold text-neutral-800">
                {data.heroSecondaryCta || "Detayları İncele"}
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100">
            {coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={coverImage} alt={data.title || data.companyName} className="h-full min-h-[320px] w-full object-cover" />
            ) : (
              <div className="flex min-h-[320px] items-center justify-center text-sm text-neutral-500">Sektöre uygun görsel</div>
            )}
          </div>
        </section>

        <section id="detaylar" className="border-t border-neutral-200 px-5 py-8 md:px-8">
          <h2 className="text-2xl font-semibold text-neutral-900">Neden bu site?</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4"><h3 className="text-lg font-semibold text-neutral-900">Güvenilir Hizmet</h3><p className="mt-2 text-sm leading-6 text-neutral-600">Markanıza uygun profesyonel sunum dili.</p></article>
            <article className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4"><h3 className="text-lg font-semibold text-neutral-900">Hızlı İletişim</h3><p className="mt-2 text-sm leading-6 text-neutral-600">Müşteri tek tıkla sizinle iletişime geçer.</p></article>
            <article className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4"><h3 className="text-lg font-semibold text-neutral-900">Mobil Uyumlu</h3><p className="mt-2 text-sm leading-6 text-neutral-600">Tüm cihazlarda kusursuz görüntü ve deneyim.</p></article>
          </div>
        </section>

        <section id="hizmetler" className="border-t border-neutral-200 px-5 py-8 md:px-8">
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

        <section id="hakkimizda" className="border-t border-neutral-200 px-5 py-8 md:px-8">
          <h2 className="text-2xl font-semibold text-neutral-900">Hakkımızda</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-600">
            Deneyimli ekibimizle işletmenizi dijitalde en iyi şekilde temsil eden çözümler sunuyoruz.
          </p>
        </section>

        <section className="border-t border-neutral-200 px-5 py-8 md:px-8">
          <h2 className="text-2xl font-semibold text-neutral-900">Galeri / Çalışmalar</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {content.galleryItems.slice(0, 6).map((item) => (
              <div key={item} className="flex min-h-[120px] items-end rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm font-medium text-neutral-700">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-neutral-200 px-5 py-8 md:px-8">
          <h2 className="text-2xl font-semibold text-neutral-900">Yorumlar</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {content.testimonials.slice(0, 3).map((item) => (
              <article key={item.name} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                <p className="text-sm leading-6 text-neutral-700">&quot;{item.quote}&quot;</p>
                <p className="mt-3 text-sm font-semibold text-neutral-900">{item.name}</p>
                <p className="text-xs text-neutral-500">{item.role}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-neutral-200 px-5 py-8 md:px-8">
          <h2 className="text-2xl font-semibold text-neutral-900">Sık Sorulan Sorular</h2>
          <div className="mt-5 space-y-3">
            <article className="rounded-2xl border border-neutral-200 p-4"><p className="text-sm font-semibold text-neutral-900">Teslim süresi ne kadar?</p><p className="mt-2 text-sm text-neutral-600">Proje kapsamına göre ortalama 3-7 gün içinde teslim edilir.</p></article>
            <article className="rounded-2xl border border-neutral-200 p-4"><p className="text-sm font-semibold text-neutral-900">Mobil uyumlu mu?</p><p className="mt-2 text-sm text-neutral-600">Evet, tüm bölümler mobil ve tablet cihazlarda optimize çalışır.</p></article>
            <article className="rounded-2xl border border-neutral-200 p-4"><p className="text-sm font-semibold text-neutral-900">Sonradan güncellenebilir mi?</p><p className="mt-2 text-sm text-neutral-600">Evet, içerikler panel üzerinden güncellenebilir yapıdadır.</p></article>
          </div>
        </section>

        <section id="iletisim" className="border-t border-neutral-200 px-5 py-8 md:px-8">
          <h2 className="text-2xl font-semibold text-neutral-900">İletişim</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">
              <p>Telefon: {data.ownerWhatsapp || data.contactPhone || "-"}</p>
              <p className="mt-2">E-posta: {data.ownerEmail || data.contactEmail || "-"}</p>
              <p className="mt-2">Yetkili: {data.ownerName || data.contactName || "-"}</p>
              <p className="mt-2">Marka: {data.ownerBrandName || data.companyName}</p>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-4">
              <p className="text-sm font-semibold text-neutral-900">İletişim Formu</p>
              <div className="mt-3 space-y-2">
                <div className="rounded-xl bg-neutral-100 px-3 py-2 text-sm text-neutral-500">Ad Soyad</div>
                <div className="rounded-xl bg-neutral-100 px-3 py-2 text-sm text-neutral-500">Telefon / E-posta</div>
                <div className="rounded-xl bg-neutral-100 px-3 py-5 text-sm text-neutral-500">Mesajınız</div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-200 px-5 py-10 text-center md:px-8">
          <h2 className="text-3xl font-semibold text-neutral-900">Bu siteyi işletmenize özel hale getirelim</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-neutral-600">Sadece 1 mesaj ile hemen başlayabilirsiniz.</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={footerWhatsappTarget} target="_blank" rel="noreferrer" className="rounded-2xl px-6 py-3 text-sm font-semibold text-white" style={{ backgroundColor: accent }}>
              Bu Siteyi İstiyorum
            </a>
            <a href={footerWhatsappTarget} target="_blank" rel="noreferrer" className="rounded-2xl border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-800">
              Teklif Al
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
