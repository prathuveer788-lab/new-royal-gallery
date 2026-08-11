export default function HotelCard({
  name, category, description, highlights, priceRange, className = "",
}: {
  name: string; category: string; description: string; highlights: string[]; priceRange: string; className?: string;
}) {
  return (
    <div className={`group p-5 sm:p-6 transition-all duration-300 ${className}`} style={{ border: "1px solid rgba(138,115,82,0.15)", background: "#F4F0E7" }}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-medium font-sans" style={{ color: "#8A7352" }}>{category}</span>
          <h4 className="text-lg sm:text-xl font-serif mt-1 transition-colors duration-300 group-hover:text-[#8A7352]" style={{ color: "#181714" }}>{name}</h4>
        </div>
        <span className="text-[10px] sm:text-xs font-sans flex-shrink-0 ml-3" style={{ color: "#9B9589", fontWeight: 400 }}>{priceRange}</span>
      </div>
      <p className="text-xs sm:text-sm font-sans leading-relaxed mb-3" style={{ color: "#9B9589", fontWeight: 400 }}>{description}</p>
      <div className="flex flex-wrap gap-1.5">
        {highlights.map((h) => (
          <span key={h} className="text-[8px] sm:text-[9px] font-sans px-2 py-0.5" style={{ background: "#EAE3D5", color: "#9B9589", fontWeight: 400 }}>{h}</span>
        ))}
      </div>
    </div>
  );
}
