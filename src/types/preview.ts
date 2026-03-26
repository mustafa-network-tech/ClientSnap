export type CustomPreview = {
  id: string;
  demo_id: string;
  company_name: string;
  custom_title: string | null;
  custom_description: string | null;
  custom_price: number | null;
  contact_name: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  preview_slug: string;
  status: string;
  created_at: string;
};

export type PreviewWithDemo = CustomPreview & {
  demos: {
    title: string;
    category: string;
    demo_url: string;
    preview_image: string | null;
    base_price: number | null;
    short_description: string | null;
  } | null;
};

