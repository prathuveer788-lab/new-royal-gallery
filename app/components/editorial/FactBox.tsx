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
      className={`p-5 sm:p-6 md:p-8 my-8 sm:my-10 ${className}`}
      style={{ background: "#EAE3D5", border: "1px solid rgba(138,115,82,0.18)" }}
    >
      <h4 className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium font-sans mb-4 sm:mb-5" style={{ color: "#8A7352" }}>
        {title}
      </h4>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col gap-0.5">
            <dt className="text-[10px] sm:text-[11px] uppercase tracking-[0.14em] font-medium font-sans" style={{ color: "#9B9589" }}>
              {item.label}
            </dt>
            <dd className="text-sm sm:text-base font-serif" style={{ color: "#181714" }}>
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
