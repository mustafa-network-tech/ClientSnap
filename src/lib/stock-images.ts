export type StockImage = {
  id: string;
  url: string;
  tags: string[];
};

export const stockImages: StockImage[] = [
  { id: "s1", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=80", tags: ["sea", "ocean", "beach", "blue"] },
  { id: "s2", url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1400&q=80", tags: ["sea", "waves", "nature"] },
  { id: "s3", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1400&q=80", tags: ["mountain", "nature", "travel"] },
  { id: "s4", url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1400&q=80", tags: ["camera", "photography", "creative"] },
  { id: "s5", url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1400&q=80", tags: ["camera", "studio", "photo"] },
  { id: "s6", url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&q=80", tags: ["software", "laptop", "technology"] },
  { id: "s7", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80", tags: ["technology", "chip", "electronics"] },
  { id: "s8", url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=80", tags: ["office", "team", "consulting"] },
  { id: "s9", url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80", tags: ["consulting", "meeting", "business"] },
  { id: "s10", url: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1400&q=80", tags: ["dental", "clinic", "doctor"] },
  { id: "s11", url: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1400&q=80", tags: ["dental", "health", "smile"] },
  { id: "s12", url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1400&q=80", tags: ["beauty", "salon", "skin"] },
  { id: "s13", url: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1400&q=80", tags: ["beauty", "hair", "makeup"] },
  { id: "s14", url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1400&q=80", tags: ["fashion", "style", "beauty"] },
  { id: "s15", url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400&q=80", tags: ["real estate", "home", "property"] },
  { id: "s16", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80", tags: ["real estate", "villa", "luxury"] },
  { id: "s17", url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80", tags: ["construction", "building", "project"] },
  { id: "s18", url: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1400&q=80", tags: ["construction", "architecture", "engineer"] },
  { id: "s19", url: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1400&q=80", tags: ["car", "automotive", "showroom"] },
  { id: "s20", url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&q=80", tags: ["fitness", "gym", "workout"] },
  { id: "s21", url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&q=80", tags: ["restaurant", "food", "menu"] },
  { id: "s22", url: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1400&q=80", tags: ["cafe", "coffee", "barista"] },
  { id: "s23", url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1400&q=80", tags: ["psychology", "therapy", "wellbeing"] },
  { id: "s24", url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1400&q=80", tags: ["education", "school", "course"] },
  { id: "s25", url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1400&q=80", tags: ["doctor", "medical", "clinic"] },
  { id: "s26", url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80", tags: ["business", "consulting", "strategy"] },
  { id: "s27", url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1400&q=80", tags: ["code", "software", "developer"] },
  { id: "s28", url: "https://images.unsplash.com/photo-1522199710521-72d69614c702?w=1400&q=80", tags: ["team", "startup", "office"] },
  { id: "s29", url: "https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?w=1400&q=80", tags: ["nature", "green", "landscape"] },
  { id: "s30", url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400&q=80", tags: ["sunset", "yellow", "travel"] },
];

export function findStockImageByTag(rawTag: string | null | undefined) {
  const tag = (rawTag || "").trim().toLowerCase();
  if (!tag) return null;
  return stockImages.find((item) => item.tags.some((t) => t.includes(tag))) ?? null;
}

export const stockTagSuggestions = [
  "sea",
  "camera",
  "phone",
  "beauty",
  "hair",
  "real estate",
  "dental",
  "construction",
  "fitness",
  "restaurant",
  "cafe",
  "software",
];
