import { Demo } from "@/types/demo";

type DemoSeed = Omit<Demo, "tags" | "created_at">;

const categoryTags: Record<string, string[]> = {
  avukat: [
    "avukat","hukuk burosu","hukuk hizmeti","dava takibi","sirketler hukuku","sozlesme hukuku","ceza hukuku","aile hukuku","goc hukuku","fikri mulkiyet","hukuki danisman","danismanlik","mahkeme sureci","hukuki ihtar","uyum","tahkim","arabuluculuk","belge hazirlama","sirket kurulumu","vergi hukuku","emlak hukuku","is hukuku","profesyonel","guvenilir","tecrubeli",
  ],
  emlak: [
    "emlak","gayrimenkul","portfoy","satilik ev","kiralik daire","villa","arsa","ticari gayrimenkul","yatirim","kiralama","ilan","emlak danismani","kredi","degerleme","acik ev","lux konut","yeni projeler","konut","broker","portfoy yonetimi","mustakil ev","rezidans","ev al","ev sat","emlak ofisi",
  ],
  fotografci: [
    "fotografci","dugun fotografi","portre","studyo","etkinlik cekimi","ticari cekim","drone cekimi","sinematik video","foto galeri","marka cekimi","moda cekimi","urun cekimi","retus","album tasarimi","foto paket","nisan cekimi","aile cekimi","hikaye anlatimi","yaratici","yasam tarzi","sosyal medya icerigi","reels","videografi","gorsel kimlik","premium portfoy",
  ],
  "dis-klinigi": [
    "dis klinigi","dis hekimi","implant","ortodonti","dis beyazlatma","gulus tasarimi","agiz bakimi","dis teli","invisalign","kanal tedavisi","dis temizligi","randevu","cocuk dis hekimligi","dis eti tedavisi","rontgen","protez","periodontoloji","endodonti","klinik","saglik","doktor profili","oncesi sonrasi","tedavi plani","estetik dis","acil dis",
  ],
  guzellik: [
    "guzellik","guzellik salonu","sac bakimi","sac tasarimi","sac kesimi","sac boyama","cilt bakimi","yuz bakimi","makyaj","tirnak tasarimi","manikur","pedikur","spa","lazer","kas tasarimi","kirpik","kisisel bakim","iyi yasam","randevu","isilti","estetik","gelin makyaji","salon","guzellik klinigi","bakim",
  ],
  insaat: [
    "insaat","muteahhit","mimari","muhendislik","proje yonetimi","ic mimari","renovasyon","ticari yapi","konut yapimi","anahtar teslim","santiye","tasiyici sistem","planlama","mavi baski","altyapi","insaat muhendisligi","insaad firmasi","malzeme","zaman cizelgesi","maliyet hesabi","portfoy","tamamlanan projeler","endustriyel","kalite","guvenlik",
  ],
  danismanlik: [
    "danismanlik","is danismanligi","strateji","operasyon","yonetim","buyume","dijital donusum","finans danismanligi","ik danismanligi","pazar arastirmasi","markalama","surec iyilestirme","b2b","yonlendirme","yonetici koclugu","performans","kpi","yol haritasi","atolye","egitim","analitik","liderlik","degisim yonetimi","olcekleme","profesyonel hizmet",
  ],
  kafe: [
    "kafe","kahve dukkani","nitelikli kahve","brunch","tatlilar","menu","rezervasyon","samimi ortam","barista","latte","cold brew","firin urunleri","paket servis","teslimat","yerel kafe","yemek fotografi","acilis saatleri","konum","en iyi kahve","topluluk","wifi kafe","bulusma noktasi","zanaat kahve","taze kavrum","icecekler",
  ],
  restoran: [
    "restoran","fine dining","menu","masa rezervasyon","sef","yemek","aksam yemegi","ogle yemegi","rezervasyon","teslimat","paket servis","mutfak","imza lezzetler","icecek listesi","aile restorani","is yemegi","etkinlik","ozel yemek","yorumlar","konum","acilis saatleri","ozel kampanya","yemek galerisi","deniz urunleri","et restoran",
  ],
  otomotiv: [
    "arac bayisi","otomotiv","showroom","ikinci el arac","sifir arac","test surusu","arac listesi","arac finansmani","takas","suv","sedan","hatchback","lux arac","filo","expertiz","garanti","servis gecmisi","arac galerisi","fiyat listesi","randevu al","kiralama","arac satis","sertifikali arac","arac detay","motor",
  ],
  fitness: [
    "spor salonu","fitness","kisisel antrenor","uyelik","antrenman","guc antrenmani","kardiyo","crossfit","pilates","yoga","vucut gelistirme","iyi yasam","yag yakimi","kas kazanimi","antrenman plani","grup dersleri","beslenme","fitness kocu","donusum","saglik kulubu","atlet","egzersiz","toparlanma","indoor cycling","bootcamp",
  ],
  psikoloji: [
    "psikolog","terapi","ruh sagligi","danismanlik","anksiyete","depresyon","stres","aile terapisi","cift terapisi","cocuk terapisi","online terapi","farkindalik","iyi olus","klinik psikolog","seans randevu","duygusal destek","travma","tukenmislik","ozsaygi","yonlendirilmis destek","degerlendirme","davranis terapisi","cbt","guvenli alan","profesyonel bakim",
  ],
  egitim: [
    "egitim","kurs","akademi","egitim programi","online ders","sinav hazirlik","dil kursu","sertifika","atolye","ogrenci basarisi","ogrenme","ozel ders","universite hazirlik","kariyer egitimi","mufredat","ders programi","kayit","mentor","egitmen","e-ogrenme","bootcamp","beceri","deneme sinavi","kampus","egitim merkezi",
  ],
  yazilim: [
    "yazilim ajansi","saas","web gelistirme","mobil uygulama","ui ux","urun tasarimi","girisim","otomasyon","crm","api entegrasyonu","panel","bulut","devops","veri platformu","mvp","olceklenme","teknoloji ortagi","full stack","frontend","backend","yapay zeka entegrasyonu","destek","bakim","guvenlik","ozel yazilim",
  ],
};

const demos: DemoSeed[] = [
  { id: "local-1", title: "Hukuk Otoritesi Pro", category: "avukat", slug: "legal-authority-pro", demo_url: "https://example.com/demo-law-1", preview_image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1400&q=80", base_price: 12000, short_description: "Modern hukuk burolari icin guven odakli tanitim.", is_active: true },
  { id: "local-2", title: "Sehir Emlak Prime", category: "emlak", slug: "urban-property-prime", demo_url: "https://example.com/demo-realty-1", preview_image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&q=80", base_price: 15000, short_description: "Premium listeleme duzeniyle talep odakli emlak sayfasi.", is_active: true },
  { id: "local-3", title: "Gorsel Hikaye Studyo", category: "fotografci", slug: "visual-story-studio", demo_url: "https://example.com/demo-photo-1", preview_image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1400&q=80", base_price: 10000, short_description: "Fotografcilar icin zarif ve etkili portfoy yapisi.", is_active: true },
  { id: "local-4", title: "Villa Vitrin Elite", category: "emlak", slug: "villa-showcase-elite", demo_url: "https://example.com/demo-realty-2", preview_image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80", base_price: 16500, short_description: "Yuksek donusum hedefli luks konut sunumu.", is_active: true },
  { id: "local-5", title: "Yatirim Emlak Hatti", category: "emlak", slug: "investor-property-funnel", demo_url: "https://example.com/demo-realty-3", preview_image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1400&q=80", base_price: 17250, short_description: "Yatirim odakli emlak kampanyalari icin hazirlandi.", is_active: true },
  { id: "local-6", title: "Gulumse Klinik Modern", category: "dis-klinigi", slug: "smile-clinic-modern", demo_url: "https://example.com/demo-dental-1", preview_image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1400&q=80", base_price: 14000, short_description: "Guven veren dis klinigi sunumu icin temiz yapi.", is_active: true },
  { id: "local-7", title: "Dis Randevu Plus", category: "dis-klinigi", slug: "dental-booking-plus", demo_url: "https://example.com/demo-dental-2", preview_image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1400&q=80", base_price: 15200, short_description: "Hizli iletisim icin randevu odakli dis klinigi tasarimi.", is_active: true },
  { id: "local-8", title: "Guzellik Isilti Studyo", category: "guzellik", slug: "beauty-glow-studio", demo_url: "https://example.com/demo-beauty-1", preview_image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1400&q=80", base_price: 11250, short_description: "Bakim hizmetlerini on plana cikaran premium salon yapisi.", is_active: true },
  { id: "local-9", title: "Guzellik Randevu Lounge", category: "guzellik", slug: "beauty-booking-lounge", demo_url: "https://example.com/demo-beauty-2", preview_image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1400&q=80", base_price: 12500, short_description: "Randevu donusumunu artirmak icin optimize edildi.", is_active: true },
  { id: "local-10", title: "Insaat Imza", category: "insaat", slug: "buildcorp-signature", demo_url: "https://example.com/demo-construction-1", preview_image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80", base_price: 18500, short_description: "Kurumsal insaat firmalari icin guven odakli yapi.", is_active: true },
  { id: "local-11", title: "Proje Portfoy Ustasi", category: "insaat", slug: "project-portfolio-builder", demo_url: "https://example.com/demo-construction-2", preview_image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1400&q=80", base_price: 19800, short_description: "Muteahhitler icin vaka odakli sunum formati.", is_active: true },
  { id: "local-12", title: "Yonetici Danismanlik Bir", category: "danismanlik", slug: "executive-consulting-one", demo_url: "https://example.com/demo-consulting-1", preview_image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80", base_price: 16000, short_description: "Karar vericilere yonelik danismanlik tanitim sayfasi.", is_active: true },
  { id: "local-13", title: "Danismanlik Premium Grid", category: "danismanlik", slug: "consulting-premium-grid", demo_url: "https://example.com/demo-consulting-2", preview_image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80", base_price: 17500, short_description: "Donusum bloklariyla modern danismanlik tasarimi.", is_active: true },
  { id: "local-14", title: "Bistro Kafe Acilis", category: "kafe", slug: "bistro-cafe-landing", demo_url: "https://example.com/demo-cafe-1", preview_image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1400&q=80", base_price: 9800, short_description: "Menu odakli samimi kafe tanitim sayfasi.", is_active: true },
  { id: "local-15", title: "Restoran Menu Akisi", category: "restoran", slug: "restaurant-menu-flow", demo_url: "https://example.com/demo-restaurant-1", preview_image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&q=80", base_price: 11800, short_description: "Rezervasyon odakli restoran sunumu.", is_active: true },
  { id: "local-16", title: "Oto Galeri Showroom", category: "otomotiv", slug: "auto-gallery-showroom", demo_url: "https://example.com/demo-auto-1", preview_image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1400&q=80", base_price: 14300, short_description: "Arac galerileri icin listeleme odakli duzen.", is_active: true },
  { id: "local-17", title: "Fitness Uyelik Merkezi", category: "fitness", slug: "fitness-membership-hub", demo_url: "https://example.com/demo-gym-1", preview_image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&q=80", base_price: 10800, short_description: "Uyelik donusumunu hedefleyen spor salonu sayfasi.", is_active: true },
  { id: "local-18", title: "Zihin Bakim Psikoloji", category: "psikoloji", slug: "mindcare-psychology", demo_url: "https://example.com/demo-psychology-1", preview_image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1400&q=80", base_price: 13200, short_description: "Sakin ve guven veren psikoloji merkezi stili.", is_active: true },
  { id: "local-19", title: "Kurs Merkezi Pro", category: "egitim", slug: "course-center-pro", demo_url: "https://example.com/demo-education-1", preview_image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1400&q=80", base_price: 11900, short_description: "Kayit odakli egitim merkezi sayfasi.", is_active: true },
  { id: "local-20", title: "Yazilim Ajansi Prime", category: "yazilim", slug: "saas-agency-prime", demo_url: "https://example.com/demo-software-1", preview_image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1400&q=80", base_price: 21000, short_description: "B2B yazilim ajanslari icin guclu konumlama tasarimi.", is_active: true },
];

export const localDemos: Demo[] = demos.map((demo) => ({
  ...demo,
  tags: categoryTags[demo.category] ?? [],
  created_at: new Date().toISOString(),
}));

export function hasSupabaseEnv() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
