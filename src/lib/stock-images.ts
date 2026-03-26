export type StockImage = {
  id: string;
  url: string;
  tags: string[];
};

export const stockImages: StockImage[] = [
  { id: "s1", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=80", tags: ["deniz", "okyanus", "sahil", "mavi"] },
  { id: "s2", url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1400&q=80", tags: ["deniz", "dalgalar", "doga"] },
  { id: "s3", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1400&q=80", tags: ["dag", "doga", "seyahat"] },
  { id: "s4", url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400&q=80", tags: ["kamera", "fotograf", "yaratici"] },
  { id: "s5", url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1400&q=80", tags: ["kamera", "studyo", "foto"] },
  { id: "s6", url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&q=80", tags: ["yazilim", "laptop", "teknoloji"] },
  { id: "s7", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80", tags: ["teknoloji", "cip", "elektronik"] },
  { id: "s8", url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=80", tags: ["ofis", "ekip", "danismanlik"] },
  { id: "s9", url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80", tags: ["danismanlik", "toplanti", "is"] },
  { id: "s10", url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1400&q=80", tags: ["dis", "klinik", "doktor"] },
  { id: "s11", url: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1400&q=80", tags: ["dis", "saglik", "gulus"] },
  { id: "s12", url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1400&q=80", tags: ["guzellik", "salon", "cilt"] },
  { id: "s13", url: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1400&q=80", tags: ["guzellik", "sac", "makyaj"] },
  { id: "s14", url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1400&q=80", tags: ["moda", "stil", "guzellik"] },
  { id: "s15", url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&q=80", tags: ["emlak", "ev", "portfoy"] },
  { id: "s16", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80", tags: ["emlak", "villa", "lux"] },
  { id: "s17", url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80", tags: ["insaat", "bina", "proje"] },
  { id: "s18", url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1400&q=80", tags: ["insaat", "mimari", "muhendis"] },
  { id: "s19", url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1400&q=80", tags: ["arac", "otomotiv", "showroom"] },
  { id: "s20", url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&q=80", tags: ["fitness", "spor", "antrenman"] },
  { id: "s21", url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&q=80", tags: ["restoran", "yemek", "menu"] },
  { id: "s22", url: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1400&q=80", tags: ["kafe", "kahve", "barista"] },
  { id: "s23", url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1400&q=80", tags: ["psikoloji", "terapi", "iyi yasam"] },
  { id: "s24", url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1400&q=80", tags: ["egitim", "okul", "kurs"] },
  { id: "s25", url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1400&q=80", tags: ["doktor", "medikal", "klinik"] },
  { id: "s26", url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80", tags: ["is", "danismanlik", "strateji"] },
  { id: "s27", url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1400&q=80", tags: ["kod", "yazilim", "gelistirici"] },
  { id: "s28", url: "https://images.unsplash.com/photo-1522199710521-72d69614c702?w=1400&q=80", tags: ["ekip", "girisim", "ofis"] },
  { id: "s29", url: "https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?w=1400&q=80", tags: ["doga", "yesil", "manzara"] },
  { id: "s30", url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400&q=80", tags: ["gunbatimi", "sari", "seyahat"] },
];

export function findStockImageByTag(rawTag: string | null | undefined) {
  const tag = (rawTag || "").trim().toLowerCase();
  if (!tag) return null;
  return stockImages.find((item) => item.tags.some((t) => t.includes(tag))) ?? null;
}

export const stockTagSuggestions = [
  "deniz",
  "kamera",
  "telefon",
  "guzellik",
  "sac",
  "emlak",
  "dis",
  "insaat",
  "fitness",
  "restoran",
  "kafe",
  "yazilim",
];
