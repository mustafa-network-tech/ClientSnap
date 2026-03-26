export type DemoContent = {
  nav: string[];
  heroTitle: string;
  heroDescription: string;
  primaryCta: string;
  secondaryCta: string;
  values: Array<{ title: string; description: string }>;
  services: Array<{ title: string; description: string }>;
  about: string;
  galleryTitle: string;
  galleryItems: string[];
  testimonials: Array<{ name: string; role: string; quote: string }>;
  faqs: Array<{ question: string; answer: string }>;
  finalCtaTitle: string;
  finalCtaDescription: string;
};

const baseNav = [
  "Ana Sayfa",
  "Hizmetler",
  "Hakkimizda",
  "Calismalar",
  "Iletisim",
];

const baseValues = [
  { title: "Guvenilir Hizmet", description: "Markaniza uygun, profesyonel ve net sunum dili." },
  { title: "Hizli Iletisim", description: "Teklif isteyen musteriler tek tikla size ulasir." },
  { title: "Mobil Uyumlu", description: "Tum icerik yapisi mobil cihazlarda sorunsuz calisir." },
];

const defaultContent: DemoContent = {
  nav: baseNav,
  heroTitle: "Markaniz icin donusum odakli modern landing page",
  heroDescription: "Musteri guveni olusturan, net CTA'li ve sektorunuze uygun sayfa yapisi.",
  primaryCta: "Bu Siteyi Istiyorum",
  secondaryCta: "Hizmetleri Incele",
  values: baseValues,
  services: [
    { title: "Sektorunuze Uygun Tasarim", description: "Kategorinize gore hazir bloklar." },
    { title: "Teklif Odakli Akis", description: "Sayfa sonuna kadar yonlendiren icerik duzeni." },
    { title: "Guven Unsurlari", description: "Referans, FAQ ve net iletisim alanlari." },
  ],
  about:
    "Ekibimiz, hizmet satan markalar icin hizli karar aldiran sade ama guclu landing page deneyimleri tasarlar.",
  galleryTitle: "Calisma Ornekleri",
  galleryItems: ["Modern Hero Layout", "Service Card Grid", "Conversion CTA Blocks"],
  testimonials: [
    { name: "Selin Y.", role: "Isletme Sahibi", quote: "Musteri gorusmelerimiz belirgin sekilde hizlandi." },
    { name: "Mert K.", role: "Danisman", quote: "Sunum netlesince teklif donus oranlari artti." },
    { name: "Aylin T.", role: "Kurucu", quote: "Tek link ile profesyonel bir ilk izlenim veriyoruz." },
  ],
  faqs: [
    { question: "Ne kadar surede teslim edilir?", answer: "Sablona gore 3-7 gun icinde yayina hazir olur." },
    { question: "Mobilde sorunsuz calisir mi?", answer: "Evet, tum bloklar responsive olarak tasarlanmistir." },
    { question: "Icerigi sonradan guncelleyebilir miyim?", answer: "Evet, panelden ust katman iceriklerini guncelleyebilirsiniz." },
  ],
  finalCtaTitle: "Bu siteyi isletmenize ozel hale getirelim",
  finalCtaDescription:
    "Hazir yapidan baslayip marka dilinize uygun iceriklerle hizli sekilde yayina alin.",
};

export const categoryContentMap: Record<string, Partial<DemoContent>> = {
  dental: {
    heroTitle: "Saglikli ve estetik gulusler icin profesyonel yaklasim",
    heroDescription: "Modern tedavi yontemleri ve guven veren hasta deneyimi.",
    primaryCta: "Randevu Al",
    secondaryCta: "Hizmetleri Incele",
    services: [
      { title: "Implant Tedavisi", description: "Kalici ve estetik dis yenileme cozumleri." },
      { title: "Ortodonti", description: "Cene ve dis diziliminde profesyonel duzeltmeler." },
      { title: "Dis Beyazlatma", description: "Dogal gorunumlu ve guvenli beyazlatma uygulamalari." },
    ],
    galleryTitle: "Klinik ve Uygulama Goruntuleri",
    galleryItems: ["Klinik Karsilama", "Tedavi Odalari", "Hasta Deneyimi"],
  },
  lawyer: {
    heroTitle: "Hukuki sureclerde guvenilir ve net cozum ortaginiz",
    heroDescription: "Bireysel ve kurumsal muvekkiller icin profesyonel danismanlik.",
    primaryCta: "Hemen Bilgi Al",
    secondaryCta: "Hizmetleri Gor",
    services: [
      { title: "Sirketler Hukuku", description: "Kurumsal surecler icin risk azaltan hukuki destek." },
      { title: "Dava Takibi", description: "Surec odakli, net ve duzenli bilgilendirme." },
      { title: "Sozlesme Danismanligi", description: "Ticari sozlesmelerde guvenli altyapi." },
    ],
    galleryTitle: "Calisma Alanlari",
    galleryItems: ["Kurumsal Danismanlik", "Dava Surecleri", "Hukuki Degerlendirme"],
  },
  beauty: {
    services: [
      { title: "Cilt Bakimi", description: "Uzman ekip ile cilt tipine uygun bakim surecleri." },
      { title: "Sac Tasarimi", description: "Modern sac kesimi ve sekillendirme uygulamalari." },
      { title: "Profesyonel Makyaj", description: "Etkinlik ve gunluk kullanim icin ozel uygulamalar." },
    ],
    galleryTitle: "Salon Calismalari",
    galleryItems: ["Bakim Uygulamalari", "Sac Donusumleri", "Makyaj Sonuclari"],
  },
  "real-estate": {
    services: [
      { title: "Satilik Portfoy", description: "Satin alma odakli secili ilan vitrini." },
      { title: "Kiralik Cözümler", description: "Hizli geri donus icin optimize edilmis listeleme." },
      { title: "Yatirim Danismanligi", description: "Bolge bazli veri destekli karar sureci." },
    ],
    galleryTitle: "Portfoy Calismalari",
    galleryItems: ["Premium Konutlar", "Yatirim Projeleri", "Referans Portfoyler"],
  },
};

export function getCategoryContent(category: string): DemoContent {
  const overrides = categoryContentMap[category] ?? {};
  return {
    ...defaultContent,
    ...overrides,
    nav: overrides.nav ?? defaultContent.nav,
    values: overrides.values ?? defaultContent.values,
    services: overrides.services ?? defaultContent.services,
    galleryItems: overrides.galleryItems ?? defaultContent.galleryItems,
    testimonials: overrides.testimonials ?? defaultContent.testimonials,
    faqs: overrides.faqs ?? defaultContent.faqs,
  };
}
