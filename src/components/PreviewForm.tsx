import { stockTagSuggestions } from "@/lib/stock-images";
type PreviewFormDefaults = {
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
};

type Props = {
  action: (formData: FormData) => void;
  defaults?: PreviewFormDefaults;
};

export default function PreviewForm({ action, defaults }: Props) {
  return (
    <form action={action} className="space-y-5">
      <input
        name="company_name"
        placeholder="Firma adı"
        defaultValue={defaults?.company_name}
        className="w-full rounded-2xl border px-4 py-3"
        required
      />
      <input
        name="custom_title"
        placeholder="Özel başlık"
        defaultValue={defaults?.custom_title}
        className="w-full rounded-2xl border px-4 py-3"
      />
      <textarea
        name="custom_description"
        placeholder="Özel açıklama"
        defaultValue={defaults?.custom_description}
        className="min-h-[140px] w-full rounded-2xl border px-4 py-3"
      />
      <input
        name="custom_price"
        placeholder="Özel fiyat (örn: 15000)"
        defaultValue={defaults?.custom_price}
        className="w-full rounded-2xl border px-4 py-3"
      />
      <input
        name="custom_cover_image"
        placeholder="Kapak görsel URL (opsiyonel)"
        defaultValue={defaults?.custom_cover_image}
        className="w-full rounded-2xl border px-4 py-3"
      />
      <div className="rounded-2xl border border-dashed border-neutral-300 p-4">
        <label className="mb-2 block text-sm font-medium text-neutral-700">
          Cihazdan kapak görseli yukle (onerilen)
        </label>
        <input
          name="custom_cover_file"
          type="file"
          accept="image/*"
          className="block w-full text-sm text-neutral-600 file:mr-3 file:rounded-xl file:border-0 file:bg-neutral-900 file:px-3 file:py-2 file:text-white"
        />
        <p className="mt-2 text-xs text-neutral-500">
          Maksimum 2MB. Daha buyuk dosya secilirse yukleme atlanir.
        </p>
      </div>
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
        <label className="mb-2 block text-sm font-medium text-neutral-700">
          Hazir Unsplash gorseli sec (etiketle)
        </label>
        <input
          name="stock_image_tag"
          list="stock-image-tags"
          placeholder="Orn: sea, camera, beauty, real estate"
          className="w-full rounded-2xl border bg-white px-4 py-3 text-sm text-neutral-700"
        />
        <datalist id="stock-image-tags">
          {stockTagSuggestions.map((tag) => (
            <option key={tag} value={tag} />
          ))}
        </datalist>
      </div>
      <input
        name="accent_color"
        placeholder="Arka plan tonu (orn: mavi, yesil, sari, lacivert)"
        defaultValue={defaults?.accent_color}
        className="w-full rounded-2xl border px-4 py-3"
      />
      <input
        name="hero_primary_cta"
        placeholder="Birincil CTA metni"
        defaultValue={defaults?.hero_primary_cta}
        className="w-full rounded-2xl border px-4 py-3"
      />
      <input
        name="hero_secondary_cta"
        placeholder="İkincil CTA metni"
        defaultValue={defaults?.hero_secondary_cta}
        className="w-full rounded-2xl border px-4 py-3"
      />
      <input
        name="contact_name"
        placeholder="İletişim adı"
        defaultValue={defaults?.contact_name}
        className="w-full rounded-2xl border px-4 py-3"
      />
      <input
        name="contact_phone"
        placeholder="Telefon"
        defaultValue={defaults?.contact_phone}
        className="w-full rounded-2xl border px-4 py-3"
      />
      <input
        name="contact_email"
        placeholder="E-posta"
        defaultValue={defaults?.contact_email}
        className="w-full rounded-2xl border px-4 py-3"
      />

      <button
        type="submit"
        className="w-full rounded-2xl bg-neutral-900 px-6 py-4 text-white"
      >
        Önizlemeyi Gör
      </button>
    </form>
  );
}

