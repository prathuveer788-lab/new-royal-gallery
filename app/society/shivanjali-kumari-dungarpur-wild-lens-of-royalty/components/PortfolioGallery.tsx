"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

interface Plate {
  roman: string;
  label: string;
  caption: string;
  file: string;
  isMissing?: boolean;
  alt: string;
  notes?: string;
}

const PLATES: Plate[] = [
  {
    roman: "I",
    label: "I · THE VIGIL",
    caption: "A cheetah mother surveys the Mara from her termite mound.",
    file: "/images/society/shivanjali-kumari-dungarpur/03-plate-vigil.jpg",
    alt: "A cheetah mother and her cubs surveying the Mara from atop a termite mound",
  },
  {
    roman: "II",
    label: "II · THE ARRIVAL",
    caption: "She walked into the frame as though always meant to.",
    file: "/images/society/shivanjali-kumari-dungarpur/04-plate-arrival.jpg",
    alt: "Cheetah walking along a dirt road with her cub in black and white",
  },
  {
    roman: "III",
    label: "III · THE FAMILY",
    caption: "The most personal frame in her portfolio.",
    file: "/images/society/shivanjali-kumari-dungarpur/05-plate-family.jpg",
    isMissing: true,
    alt: "Plate III: Cheetah and cubs on the mound (black and white) — pending archival delivery",
    notes: "Archival Slot 05-plate-family · Requested from editors",
  },
  {
    roman: "IV",
    label: "IV · LAST LIGHT",
    caption: "“Every hour before sunrise.”",
    file: "/images/society/shivanjali-kumari-dungarpur/06-plate-last-light.jpg",
    alt: "A hyena standing in golden savannah grasses in the Masai Mara",
  },
];

export default function PortfolioGallery() {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [mobileIndex, setMobileIndex] = useState<number>(0);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;

      if (e.key === "Escape") {
        const lastIdx = activeLightboxIndex;
        setActiveLightboxIndex(null);
        triggerRefs.current[lastIdx]?.focus();
      } else if (e.key === "ArrowRight") {
        setActiveLightboxIndex((prev) => (prev !== null ? (prev + 1) % PLATES.length : null));
      } else if (e.key === "ArrowLeft") {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + PLATES.length) % PLATES.length : null
        );
      } else if (e.key === "Tab") {
        // Focus trap inside lightbox
        if (!lightboxRef.current) return;
        const focusableElements = lightboxRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    },
    [activeLightboxIndex]
  );

  useEffect(() => {
    if (activeLightboxIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      // Auto focus close button
      const closeBtn = lightboxRef.current?.querySelector<HTMLButtonElement>("#lightbox-close-btn");
      closeBtn?.focus();
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeLightboxIndex, handleKeyDown]);

  // Touch handlers for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent, isLightbox: boolean) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swipe left -> Next
        if (isLightbox) {
          setActiveLightboxIndex((prev) => (prev !== null ? (prev + 1) % PLATES.length : null));
        } else {
          setMobileIndex((prev) => Math.min(PLATES.length - 1, prev + 1));
        }
      } else {
        // Swipe right -> Prev
        if (isLightbox) {
          setActiveLightboxIndex((prev) =>
            prev !== null ? (prev - 1 + PLATES.length) % PLATES.length : null
          );
        } else {
          setMobileIndex((prev) => Math.max(0, prev - 1));
        }
      }
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="the-portfolio"
      aria-labelledby="portfolio-heading"
      className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 border-t border-b border-[#D8D6D0]"
      style={{ backgroundColor: "#F8F7F4" }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#D8D6D0] pb-6 mb-12 sm:mb-16 gap-4">
          <div>
            <span
              className="text-[10px] sm:text-[11px] uppercase tracking-[0.32em] font-sans font-medium block mb-2"
              style={{ color: "#C4687F" }}
            >
              Exhibition Plates I–IV
            </span>
            <h2
              id="portfolio-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1C1C1E] tracking-tight"
              style={{ fontWeight: 400 }}
            >
              The Portfolio · Masai Mara
            </h2>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-[11px] uppercase tracking-[0.2em] font-sans text-[#6A6A70]">
              Photographs © Shivanjali Kumari Dungarpur
            </span>
          </div>
        </div>

        {/* ── DESKTOP GALLERY WALL (>= 768px) ── */}
        <div className="hidden md:block">
          {/* Top row: Plate I (7 cols) + Stack of Plate II & III (5 cols) */}
          <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start mb-12">
            
            {/* Plate I: 7 cols */}
            <div className="col-span-7 flex flex-col">
              <button
                ref={(el) => { triggerRefs.current[0] = el; }}
                type="button"
                onClick={() => setActiveLightboxIndex(0)}
                className="group block relative w-full aspect-[4/3] bg-white p-4 sm:p-5 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-[#D8D6D0]/70 cursor-zoom-in text-left transition-transform duration-500 hover:-translate-y-1"
                aria-label="View Plate I in lightbox: The Vigil"
              >
                <div className="relative w-full h-full overflow-hidden bg-[#141416]">
                  <Image
                    src={PLATES[0].file}
                    alt={PLATES[0].alt}
                    fill
                    sizes="(max-width: 1200px) 58vw, 680px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 text-white text-[9px] uppercase tracking-widest px-2.5 py-1 backdrop-blur-xs font-sans">
                    View Plate ↗
                  </div>
                </div>
              </button>

              {/* Gallery wall label */}
              <div className="mt-4 px-2">
                <span className="text-[10px] uppercase tracking-[0.26em] font-sans font-medium text-[#C4687F] block mb-1">
                  {PLATES[0].label}
                </span>
                <p className="font-serif italic text-base text-[#1C1C1E] leading-snug">
                  {PLATES[0].caption}
                </p>
                <p className="text-[10px] uppercase tracking-[0.18em] font-sans text-[#6A6A70] mt-1">
                  Masai Mara, Kenya · Archival Pigment Print
                </p>
              </div>
            </div>

            {/* Stacked Plates II & III: 5 cols */}
            <div className="col-span-5 flex flex-col gap-10">
              
              {/* Plate II */}
              <div className="flex flex-col">
                <button
                  ref={(el) => { triggerRefs.current[1] = el; }}
                  type="button"
                  onClick={() => setActiveLightboxIndex(1)}
                  className="group block relative w-full aspect-[16/10] bg-white p-3.5 sm:p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-[#D8D6D0]/70 cursor-zoom-in text-left transition-transform duration-500 hover:-translate-y-1"
                  aria-label="View Plate II in lightbox: The Arrival"
                >
                  <div className="relative w-full h-full overflow-hidden bg-[#141416]">
                    <Image
                      src={PLATES[1].file}
                      alt={PLATES[1].alt}
                      fill
                      sizes="(max-width: 1200px) 42vw, 480px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 text-white text-[9px] uppercase tracking-widest px-2 py-0.5 backdrop-blur-xs font-sans">
                      View Plate ↗
                    </div>
                  </div>
                </button>
                <div className="mt-3 px-2">
                  <span className="text-[10px] uppercase tracking-[0.26em] font-sans font-medium text-[#C4687F] block mb-0.5">
                    {PLATES[1].label}
                  </span>
                  <p className="font-serif italic text-sm text-[#1C1C1E] leading-snug">
                    {PLATES[1].caption}
                  </p>
                </div>
              </div>

              {/* Plate III: Missing, neutral --mist placeholder */}
              <div className="flex flex-col">
                <button
                  ref={(el) => { triggerRefs.current[2] = el; }}
                  type="button"
                  onClick={() => setActiveLightboxIndex(2)}
                  className="group block relative w-full aspect-[16/10] bg-white p-3.5 sm:p-4 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-[#D8D6D0]/70 cursor-zoom-in text-left transition-transform duration-500 hover:-translate-y-1"
                  aria-label="View Plate III in lightbox: The Family (Slot Placeholder)"
                >
                  <div
                    className="relative w-full h-full flex flex-col items-center justify-center p-6 border border-dashed border-[#6A6A70]/40 transition-colors group-hover:border-[#C4687F]"
                    style={{ backgroundColor: "#E3ECEE" }}
                  >
                    <span className="text-[9px] uppercase tracking-[0.26em] font-sans font-medium text-[#6A6A70] mb-1">
                      Archival Slot · 05-plate-family
                    </span>
                    <span className="font-serif italic text-base text-[#1C1C1E] text-center mb-1">
                      III · The Family
                    </span>
                    <span className="text-[8px] uppercase tracking-widest font-sans text-[#C4687F]">
                      In Exhibition Curation · Editors to Supply
                    </span>
                  </div>
                </button>
                <div className="mt-3 px-2">
                  <span className="text-[10px] uppercase tracking-[0.26em] font-sans font-medium text-[#C4687F] block mb-0.5">
                    {PLATES[2].label}
                  </span>
                  <p className="font-serif italic text-sm text-[#1C1C1E] leading-snug">
                    {PLATES[2].caption}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom row: Plate IV (wide underneath) */}
          <div className="flex flex-col max-w-4xl mx-auto">
            <button
              ref={(el) => { triggerRefs.current[3] = el; }}
              type="button"
              onClick={() => setActiveLightboxIndex(3)}
              className="group block relative w-full aspect-[16/9] sm:aspect-[21/9] bg-white p-4 sm:p-5 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-[#D8D6D0]/70 cursor-zoom-in text-left transition-transform duration-500 hover:-translate-y-1"
              aria-label="View Plate IV in lightbox: Last Light"
            >
              <div className="relative w-full h-full overflow-hidden bg-[#141416]">
                <Image
                  src={PLATES[3].file}
                  alt={PLATES[3].alt}
                  fill
                  sizes="1000px"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 text-white text-[9px] uppercase tracking-widest px-2.5 py-1 backdrop-blur-xs font-sans">
                  View Plate ↗
                </div>
              </div>
            </button>
            <div className="mt-4 px-2 text-center">
              <span className="text-[10px] uppercase tracking-[0.26em] font-sans font-medium text-[#C4687F] block mb-1">
                {PLATES[3].label}
              </span>
              <p className="font-serif italic text-base text-[#1C1C1E]">
                {PLATES[3].caption}
              </p>
            </div>
          </div>
        </div>

        {/* ── MOBILE SWIPE SEQUENCE (< 768px) ── */}
        <div
          className="block md:hidden"
          onTouchStart={onTouchStart}
          onTouchEnd={(e) => onTouchEnd(e, false)}
        >
          {/* Plate Card */}
          <div className="bg-white p-3.5 shadow-md border border-[#D8D6D0] mb-4">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#141416]">
              {PLATES[mobileIndex].isMissing ? (
                <div
                  className="w-full h-full flex flex-col items-center justify-center p-4 border border-dashed border-[#6A6A70]/40"
                  style={{ backgroundColor: "#E3ECEE" }}
                >
                  <span className="text-[9px] uppercase tracking-[0.24em] font-sans text-[#6A6A70] mb-1">
                    Slot: 05-plate-family
                  </span>
                  <span className="font-serif italic text-base text-[#1C1C1E] text-center mb-1">
                    III · The Family
                  </span>
                  <span className="text-[8px] uppercase tracking-widest font-sans text-[#C4687F]">
                    Curation Pending
                  </span>
                </div>
              ) : (
                <Image
                  src={PLATES[mobileIndex].file}
                  alt={PLATES[mobileIndex].alt}
                  fill
                  sizes="92vw"
                  className="object-cover"
                />
              )}
            </div>

            {/* Label below mobile image */}
            <div className="mt-4 text-center">
              <span className="text-[10px] uppercase tracking-[0.26em] font-sans font-medium text-[#C4687F] block mb-1">
                {PLATES[mobileIndex].label}
              </span>
              <p className="font-serif italic text-sm text-[#1C1C1E] mb-2">
                {PLATES[mobileIndex].caption}
              </p>
              <button
                type="button"
                onClick={() => setActiveLightboxIndex(mobileIndex)}
                className="text-[10px] uppercase tracking-[0.2em] font-sans text-[#6A6A70] underline py-1"
              >
                Expand Lightbox View ↗
              </button>
            </div>
          </div>

          {/* Mobile Navigation Bar & 1 / 4 Counter */}
          <div className="flex items-center justify-between px-2 pt-2">
            <button
              type="button"
              onClick={() => setMobileIndex((prev) => Math.max(0, prev - 1))}
              disabled={mobileIndex === 0}
              className="text-xs uppercase tracking-[0.2em] font-sans px-4 py-2 border border-[#D8D6D0] disabled:opacity-30 disabled:pointer-events-none"
            >
              ← Prev
            </button>
            <span className="text-xs uppercase tracking-[0.24em] font-sans font-medium text-[#1C1C1E]">
              {mobileIndex + 1} / {PLATES.length}
            </span>
            <button
              type="button"
              onClick={() => setMobileIndex((prev) => Math.min(PLATES.length - 1, prev + 1))}
              disabled={mobileIndex === PLATES.length - 1}
              className="text-xs uppercase tracking-[0.2em] font-sans px-4 py-2 border border-[#D8D6D0] disabled:opacity-30 disabled:pointer-events-none"
            >
              Next →
            </button>
          </div>
        </div>

      </div>

      {/* ── FULL-SCREEN LIGHTBOX MODAL ON BLACK ── */}
      {activeLightboxIndex !== null && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label="Exhibition Lightbox View"
          className="fixed inset-0 z-[200] flex flex-col justify-between p-4 sm:p-8 bg-[#141416]/98 backdrop-blur-md text-[#F8F7F4]"
          onTouchStart={onTouchStart}
          onTouchEnd={(e) => onTouchEnd(e, true)}
        >
          {/* Lightbox Top Bar */}
          <div className="flex items-center justify-between w-full max-w-7xl mx-auto z-10 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-[#C4687F] font-medium">
                Plate {PLATES[activeLightboxIndex].roman} of IV
              </span>
              <span className="text-white/20">|</span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-sans text-[#F8F7F4]/60 hidden sm:inline">
                © Shivanjali Kumari Dungarpur
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[9px] uppercase tracking-[0.2em] font-sans text-white/40 hidden md:inline">
                Use Arrow Keys or Swipe · Esc to Close
              </span>
              <button
                id="lightbox-close-btn"
                type="button"
                onClick={() => {
                  const lastIdx = activeLightboxIndex;
                  setActiveLightboxIndex(null);
                  triggerRefs.current[lastIdx]?.focus();
                }}
                className="px-3.5 py-1.5 border border-white/30 text-xs uppercase tracking-[0.2em] font-sans hover:bg-white/10 focus-visible:outline-white transition-colors"
                aria-label="Close exhibition lightbox"
              >
                Close ✕
              </button>
            </div>
          </div>

          {/* Lightbox Middle: Native Max Frame (Never stretched/upscaled) */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            {PLATES[activeLightboxIndex].isMissing ? (
              <div
                className="w-full max-w-xl aspect-[16/10] flex flex-col items-center justify-center p-8 border border-dashed border-[#6A6A70]"
                style={{ backgroundColor: "#E3ECEE" }}
              >
                <span className="text-[10px] uppercase tracking-[0.28em] font-sans text-[#6A6A70] mb-2">
                  Archival Slot: 05-plate-family.jpg
                </span>
                <h4 className="text-2xl font-serif text-[#1C1C1E] mb-2">
                  III · The Family
                </h4>
                <p className="font-serif italic text-sm text-[#1C1C1E]/80 text-center max-w-md mb-4">
                  The most personal frame in her portfolio — a cheetah mother and cubs upon the Mara mound.
                </p>
                <span className="text-[9px] uppercase tracking-[0.2em] font-sans px-3 py-1 bg-[#141416] text-[#F8F7F4]">
                  Pending delivery from editors · Listed in MISSING_IMAGES.md
                </span>
              </div>
            ) : (
              <div className="relative max-w-full max-h-[75vh] w-auto h-auto flex items-center justify-center">
                {/* Native dimensions without exceeding container */}
                <Image
                  src={PLATES[activeLightboxIndex].file}
                  alt={PLATES[activeLightboxIndex].alt}
                  width={1024}
                  height={682}
                  className="max-h-[72vh] max-w-[92vw] w-auto h-auto object-contain border border-white/10 shadow-2xl"
                  priority
                />
              </div>
            )}

            {/* Prev / Next Buttons */}
            <button
              type="button"
              onClick={() =>
                setActiveLightboxIndex((prev) =>
                  prev !== null ? (prev - 1 + PLATES.length) % PLATES.length : null
                )
              }
              aria-label="Previous plate"
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 text-xl bg-black/60 border border-white/20 text-white hover:bg-[#C4687F] transition-colors focus-visible:outline-white"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveLightboxIndex((prev) =>
                  prev !== null ? (prev + 1) % PLATES.length : null
                )
              }
              aria-label="Next plate"
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 text-xl bg-black/60 border border-white/20 text-white hover:bg-[#C4687F] transition-colors focus-visible:outline-white"
            >
              ›
            </button>
          </div>

          {/* Lightbox Bottom Caption */}
          <div className="w-full max-w-4xl mx-auto text-center pt-3 border-t border-white/10 z-10">
            <span className="text-[10px] uppercase tracking-[0.28em] font-sans font-medium text-[#C4687F] block mb-1">
              {PLATES[activeLightboxIndex].label}
            </span>
            <p className="font-serif italic text-base sm:text-lg text-[#F8F7F4] leading-relaxed max-w-2xl mx-auto">
              {PLATES[activeLightboxIndex].caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
