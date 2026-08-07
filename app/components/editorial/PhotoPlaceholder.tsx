"use client";

interface PhotoPlaceholderProps {
  label?: string;
  orientation?: "landscape" | "portrait" | "square" | "wide" | "full-width";
  caption: string;
  className?: string;
  priority?: boolean;
}

const aspectMap: Record<string, string> = {
  landscape: "aspect-[16/10]",
  portrait: "aspect-[3/4]",
  square: "aspect-[1/1]",
  wide: "aspect-[21/9]",
  "full-width": "aspect-[16/9]",
};

export default function PhotoPlaceholder({
  label = "PHOTO LOCATION",
  orientation = "landscape",
  caption,
  className = "",
}: PhotoPlaceholderProps) {
  const aspect = aspectMap[orientation] || aspectMap.landscape;

  return (
    <figure className={`group ${className}`}>
      <div
        className={`${aspect} relative overflow-hidden bg-neutral-100 border border-neutral-200 flex items-center justify-center`}
      >
        {/* Decorative grid lines */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Inner frame */}
        <div className="absolute inset-3 sm:inset-5 border border-neutral-300/60" />
        {/* Center marker */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-neutral-400 font-semibold mb-3 font-sans">
              {label}
            </span>
            <div className="flex items-center justify-center gap-2 text-neutral-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4">
                <rect x="2" y="2" width="20" height="20" rx="2" />
                <path d="M2 12h20M12 2v20" />
              </svg>
            </div>
            {/* Orientation label */}
            <span className="block text-[8px] uppercase tracking-[0.2em] text-neutral-400/60 mt-3 font-sans">
              {orientation.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 sm:mt-4 text-[11px] sm:text-xs text-neutral-400 font-light leading-relaxed italic text-center max-w-lg mx-auto px-2">
        {caption}
      </figcaption>
    </figure>
  );
}
