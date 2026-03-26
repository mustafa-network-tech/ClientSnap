type Props = {
  value: string;
};

export default function SearchBar({ value }: Props) {
  return (
    <input
      name="q"
      defaultValue={value}
      type="text"
      placeholder="Search by keyword: real estate, beauty, hair care, lawyer..."
      className="w-full rounded-2xl border border-neutral-300 bg-white px-5 py-4 outline-none focus:border-neutral-900"
    />
  );
}
