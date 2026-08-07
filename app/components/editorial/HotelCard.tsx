export default function HotelCard({
  name,
  category,
  description,
  highlights,
  priceRange,
  className = "",
}: {
  name: string;
  category: string;
  description: string;
  highlights: string[];
  priceRange: string;
  className?: string;
}) {
  return (
    <div
      className={`group border border-neutral-200 p-5 sm:p-6 hover:border-amber-200 hover:shadow-sm transition-all ${className}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-amber-700 font-bold font-sans">
            {category}
          </span>
          <h4 className="text-lg sm:text-xl font-serif text-neutral-900 mt-1 group-hover:text-amber-800 transition-colors">
            {name}
          </h4>
        </div>
        <span className="text-[10px] sm:text-xs text-neutral-500 font-light flex-shrink-0 ml-3">
          {priceRange}
        </span>
      </div>
      <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed mb-3">
        {description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {highlights.map((h) => (
          <span
            key={h}
            className="text-[8px] sm:text-[9px] bg-[#faf8f5] text-neutral-500 px-2 py-0.5 font-light"
          >
            {h}
          </span>
        ))}
      </div>
    </div>
  );
}
