export type Demo = {
  id: string;
  title: string;
  category: string;
  tags?: string[];
  slug: string;
  demo_url: string;
  preview_image: string | null;
  base_price: number | null;
  short_description: string | null;
  is_active: boolean;
  created_at: string;
};

