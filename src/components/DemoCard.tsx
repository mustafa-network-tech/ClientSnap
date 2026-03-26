import Link from "next/link";
import { Demo } from "@/types/demo";

type Props = {
  demo: Demo;
};

export default function DemoCard({ demo }: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
      <div className="aspect-[16/10] bg-neutral-100">
        {demo.preview_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={demo.preview_image}
            alt={demo.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-neutral-500">
            Görsel yok
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="mb-2 text-sm text-neutral-500">{demo.category}</div>
        <h3 className="text-xl font-semibold">{demo.title}</h3>
        <p className="mt-2 text-sm leading-6 text-neutral-600">
          {demo.short_description || "Açıklama eklenmemiş."}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-800">
            {demo.base_price ? `${demo.base_price} TL` : "Fiyat girilmemiş"}
          </span>

          <Link
            href={`/create/${demo.slug}`}
            className="rounded-xl bg-neutral-900 px-4 py-2 text-sm text-white"
          >
            Demo Düzenle
          </Link>
        </div>
      </div>
    </div>
  );
}

