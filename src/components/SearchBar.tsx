type Props = {
  value: string;
};

export default function SearchBar({ value }: Props) {
  return (
    <input
      name="q"
      defaultValue={value}
      type="text"
      placeholder="Örn: avukat, emlak, fotoğrafçı..."
      className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 outline-none focus:border-neutral-900"
    />
  );
}

