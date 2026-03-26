type PreviewFormDefaults = {
  company_name?: string;
  custom_title?: string;
  custom_description?: string;
  custom_price?: string;
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
        placeholder="Özel fiyat"
        defaultValue={defaults?.custom_price}
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

