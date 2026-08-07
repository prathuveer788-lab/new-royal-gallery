export default function FactBox({
  items,
  title = "Quick Facts",
  className = "",
}: {
  items: { label: string; value: string }[];
  title?: string;
  className?: string;
}) {
  return (
    <aside
      className={`bg-[#faf8f5] border border-neutral-200/80 p-5 sm:p-6 md:p-8 my-8 sm:my-10 ${className}`}
    >
      <h4 className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-amber-700 font-bold mb-4 sm:mb-5 font-sans">
        {title}
      </h4>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col gap-0.5">
            <dt className="text-[10px] sm:text-[11px] text-neutral-400 uppercase tracking-[0.15em] font-medium font-sans">
              {item.label}
            </dt>
            <dd className="text-sm sm:text-base text-neutral-800 font-serif">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
