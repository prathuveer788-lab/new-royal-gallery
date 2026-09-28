"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiMxNDE0MTYiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

const DRIVES = [
  { roman: "I", num: 1 },
  { roman: "II", num: 2 },
  { roman: "III", num: 3 },
  { roman: "IV", num: 4 },
  { roman: "V", num: 5 },
  { roman: "VI", num: 6 },
  { roman: "VII", num: 7 },
  { roman: "VIII", num: 8 },
  { roman: "IX", num: 9 },
  { roman: "X", num: 10 },
];

export default function TenDrivesSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    if (isReducedMotion) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;
      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isReducedMotion]);

  // Determine active drive: 0 to 10
  // Progress 0.0 to 0.7 maps to 10 drives
  const filledDrivesCount = Math.min(10, Math.floor(scrollProgress * 12.5));

  // Determine active text phase
  let activePhase = 0;
  if (scrollProgress >= 0.65) {
    activePhase = 3;
  } else if (scrollProgress >= 0.42) {
    activePhase = 2;
  } else if (scrollProgress >= 0.18) {
    activePhase = 1;
  } else {
    activePhase = 0;
  }

  // Finale reveal progress (from 0.72 to 1.0)
  const finaleProgress = Math.max(0, Math.min(1, (scrollProgress - 0.72) / 0.24));

  if (isReducedMotion) {
    return (
      <section
        aria-label="Ten Drives Sequence"
        className="py-20 px-6 sm:px-12 bg-[#141416] text-[#F8F7F4] border-t border-b border-[rgba(216,214,208,0.15)]"
      >
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center">
            <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-[#C4687F] block mb-3">
              The Signature Sequence · Ten Dawn Drives
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#F8F7F4]">
              Rising at 04:00 in the Masai Mara
            </h3>
          </div>

          {/* Static drives list */}
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-3 py-6 border-t border-b border-white/10 text-center">
            {DRIVES.map((d) => (
              <div key={d.roman} className="flex flex-col items-center">
                <span className="w-4 h-4 rounded-full bg-[#C4687F] mb-1.5" />
                <span className="text-[9px] uppercase tracking-wider font-sans text-[#F8F7F4]/70">
                  {d.roman}
                </span>
                <span className="text-[8px] font-sans text-[#CDB27A]">04:00</span>
              </div>
            ))}
          </div>

          <div className="space-y-6 text-lg sm:text-xl font-serif italic text-[#F8F7F4]/90 text-center leading-relaxed">
            <p>The cheetah, guides warned, is the rarest of the great cats to find.</p>
            <p>After ten drives, rising at four each morning, she found nothing.</p>
            <p>She held her instincts close —</p>
            <p className="text-[#CDB27A]">
              and on one of her last drives the cheetah walked into her frame as though always meant to.
            </p>
          </div>

          <figure className="relative aspect-[16/10] overflow-hidden rounded-sm border border-white/10 mt-8">
            <Image
              src="/images/society/shivanjali-kumari-dungarpur/03-plate-vigil.jpg"
              alt="Cheetah mother and cubs on a termite mound, Masai Mara"
              fill
              className="object-cover"
            />
            <figcaption className="absolute bottom-0 inset-x-0 bg-black/75 p-4 text-center text-xs font-serif italic text-[#F8F7F4]">
              It holds everything she believes about patience and conviction.
            </figcaption>
          </figure>
        </div>
      </section>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative h-[320vh] bg-[#141416]"
      aria-label="Ten Drives Interactive Scroll Experience"
    >
      {/* Sticky viewport frame */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden px-6 sm:px-12 py-10 z-20">
        
        {/* TOP: Subtitle & Drives Indicator */}
        <div className="max-w-4xl mx-auto w-full text-center pt-8 sm:pt-10 z-30 transition-opacity duration-500" style={{ opacity: finaleProgress > 0.85 ? 0.2 : 1 }}>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.32em] font-sans text-[#C4687F] font-medium block mb-2">
            The Signature Sequence · Masai Mara
          </span>
          <p className="text-xs uppercase tracking-[0.22em] font-sans text-[#F8F7F4]/50 mb-6">
            Rising at 04:00 · Ten Dawn Drives
          </p>

          {/* Ten small circles filling one by one */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6 max-w-2xl mx-auto">
            {DRIVES.map((d, index) => {
              const isFilled = index < filledDrivesCount;
              return (
                <div key={d.roman} className="flex flex-col items-center group">
                  <div
                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full transition-all duration-300 ${
                      isFilled
                        ? "bg-[#C4687F] shadow-[0_0_8px_rgba(196,104,127,0.7)] scale-110"
                        : "border border-white/25 bg-transparent"
                    }`}
                  />
                  <span
                    className={`text-[8px] sm:text-[9px] uppercase tracking-wider font-sans mt-2 transition-colors duration-300 ${
                      isFilled ? "text-[#F8F7F4] font-medium" : "text-[#F8F7F4]/30"
                    }`}
                  >
                    {d.roman}
                  </span>
                  <span
                    className={`text-[7px] sm:text-[8px] font-sans tracking-wide transition-colors duration-300 ${
                      isFilled ? "text-[#CDB27A]" : "text-[#F8F7F4]/20"
                    }`}
                  >
                    04:00
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* MIDDLE: Sequence Texts Fading Between Lines */}
        <div className="relative max-w-3xl mx-auto w-full my-auto px-4 z-30 text-center min-h-[160px] flex items-center justify-center">
          {/* Line 1 */}
          <div
            className="absolute inset-x-0 transition-all duration-700 pointer-events-none"
            style={{
              opacity: activePhase === 0 && finaleProgress < 0.2 ? 1 : 0,
              transform: `translateY(${activePhase === 0 ? "0px" : "-12px"})`,
            }}
          >
            <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-[#F8F7F4] leading-relaxed">
              The cheetah, guides warned, is the rarest of the great cats to find.
            </p>
          </div>

          {/* Line 2 */}
          <div
            className="absolute inset-x-0 transition-all duration-700 pointer-events-none"
            style={{
              opacity: activePhase === 1 && finaleProgress < 0.2 ? 1 : 0,
              transform: `translateY(${activePhase === 1 ? "0px" : "-12px"})`,
            }}
          >
            <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-[#F8F7F4] leading-relaxed">
              After ten drives, rising at four each morning, she found nothing.
            </p>
          </div>

          {/* Line 3 */}
          <div
            className="absolute inset-x-0 transition-all duration-700 pointer-events-none"
            style={{
              opacity: activePhase === 2 && finaleProgress < 0.2 ? 1 : 0,
              transform: `translateY(${activePhase === 2 ? "0px" : "-12px"})`,
            }}
          >
            <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-[#F8F7F4] leading-relaxed">
              She held her instincts close —
            </p>
          </div>

          {/* Line 4 */}
          <div
            className="absolute inset-x-0 transition-all duration-700 pointer-events-none"
            style={{
              opacity: activePhase === 3 && finaleProgress < 0.35 ? 1 : 0,
              transform: `translateY(${activePhase === 3 ? "0px" : "-12px"})`,
            }}
          >
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif italic text-[#CDB27A] leading-relaxed">
              and on one of her last drives the cheetah walked into her frame as though always meant to.
            </p>
          </div>
        </div>

        {/* BOTTOM: Scroll Indicator / Counter hint */}
        <div
          className="text-center pb-4 z-30 transition-opacity duration-300"
          style={{ opacity: finaleProgress > 0.4 ? 0 : 0.6 }}
        >
          <span className="text-[9px] uppercase tracking-[0.28em] font-sans text-[#F8F7F4]/60">
            Scroll to accompany the search ({Math.round(scrollProgress * 100)}%) ↓
          </span>
        </div>

        {/* FINALE: Full-bleed reveal of 03-plate-vigil.jpg */}
        <div
          className="absolute inset-0 z-10 transition-opacity duration-700 pointer-events-none flex flex-col justify-end"
          style={{
            opacity: finaleProgress,
            transform: `scale(${0.96 + finaleProgress * 0.04})`,
          }}
        >
          <div className="absolute inset-0">
            <Image
              src="/images/society/shivanjali-kumari-dungarpur/03-plate-vigil.jpg"
              alt="Cheetah mother and cubs on termite mound, Masai Mara — © Shivanjali Kumari Dungarpur"
              fill
              placeholder="blur"
              blurDataURL={blurDataURL}
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-transparent to-[#141416]/40" />
          </div>

          {/* Finale Caption Overlay */}
          <div className="relative z-20 max-w-4xl mx-auto w-full px-6 pb-12 sm:pb-16 text-center">
            <span className="inline-block text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-sans font-medium text-[#C4687F] mb-3">
              Plate I · The Vigil
            </span>
            <h4 className="text-xl sm:text-2xl md:text-3xl font-serif italic text-[#F8F7F4] leading-snug max-w-2xl mx-auto mb-2">
              &ldquo;It holds everything she believes about patience and conviction.&rdquo;
            </h4>
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-sans text-[#F8F7F4]/70">
              Photographs © Shivanjali Kumari Dungarpur
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
