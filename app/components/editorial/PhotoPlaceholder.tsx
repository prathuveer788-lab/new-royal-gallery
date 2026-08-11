"use client";

interface PhotoPlaceholderProps {
  label?: string;
  orientation?: "landscape" | "portrait" | "square" | "wide" | "full-width";
  caption: string;
  className?: string;
  priority?: boolean;
}

const aspectMap: Record<string, string> = {
  landscape: "aspect-[16/10]", portrait: "aspect-[3/4]", square: "aspect-[1/1]",
  wide: "aspect-[21/9]", "full-width": "aspect-[16/9]",
};

const C = { cream: "#EAE3D5", bronze: "#8A7352", textStone: "#9B9589" };

export default function PhotoPlaceholder({
  label = "PHOTO LOCATION", orientation = "landscape", caption, className = "",
}: PhotoPlaceholderProps) {
  const aspect = aspectMap[orientation] || aspectMap.landscape;
  return (
    <figure className={`group ${className}`}>
      <div className={`${aspect} relative overflow-hidden flex items-center justify-center`} style={{ background: C.cream, border: "1px solid rgba(138,115,82,0.15)" }}>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute inset-3 sm:inset-5" style={{ border: "1px solid rgba(138,115,82,0.2)" }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-medium font-sans mb-3" style={{ color: C.textStone }}>{label}</span>
            <div className="flex items-center justify-center gap-2" style={{ color: C.textStone, opacity: 0.3 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></svg>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="2" y="2" width="20" height="20" rx="2" /><path d="M2 12h20M12 2v20" /></svg>
            </div>
            <span className="block text-[8px] uppercase tracking-[0.2em] font-sans mt-3" style={{ color: C.textStone, opacity: 0.5 }}>{orientation.toUpperCase()}</span>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 sm:mt-4 text-[11px] sm:text-xs font-sans italic text-center max-w-lg mx-auto px-2" style={{ color: C.textStone, fontWeight: 400 }}>{caption}</figcaption>
    </figure>
  );
}
