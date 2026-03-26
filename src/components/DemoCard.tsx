import Link from "next/link";
import { Demo } from "@/types/demo";

type Props = {
  demo: Demo;
};

export default function DemoCard({ demo }: Props) {
  return (
    <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
      <div className="border-b border-neutral-200 bg-neutral-50 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <div className="ml-2 h-6 flex-1 rounded-md bg-white px-2 text-xs leading-6 text-neutral-400">
            {demo.slug}.demo
          </div>
        </div>
      </div>
      <div className="aspect-[16/10] bg-neutral-100 p-3">
        <div className="h-full overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <div className="border-b border-neutral-100 px-3 py-2 text-[10px] text-neutral-500">
            {demo.title}
          </div>
          {demo.preview_image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={demo.preview_image}
              alt={demo.title}
              className="h-[62%] w-full object-cover"
            />
          ) : (
            <div className="flex h-[62%] items-center justify-center text-xs text-neutral-400">
              Demo preview
            </div>
          )}
          <div className="grid h-[38%] grid-cols-3 gap-2 p-2">
            <div className="rounded-md bg-neutral-100" />
            <div className="rounded-md bg-neutral-100" />
            <div className="rounded-md bg-neutral-100" />
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-2 text-sm text-neutral-500">{demo.category}</div>
        <h3 className="text-xl font-semibold">{demo.title}</h3>
        <p className="mt-2 text-sm leading-6 text-neutral-600">
          {demo.short_description || "No description provided."}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-800">
            {demo.base_price ? `${demo.base_price} TL` : "Price not set"}
          </span>

          <Link
            href={`/create/${demo.slug}`}
            className="rounded-xl bg-neutral-900 px-4 py-2 text-sm text-white"
          >
            Edit Demo
          </Link>
        </div>
      </div>
    </div>
  );
}
