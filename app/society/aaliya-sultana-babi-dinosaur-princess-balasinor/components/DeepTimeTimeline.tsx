"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

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

interface TimelineStation {
  number: string;
  yearNumeral: string;
  era: string;
  title: string;
  description: string;
}

const STATIONS: TimelineStation[] = [
  {
    number: "I",
    yearNumeral: "65,000,000",
    era: "65–67 Million Years BC · Cretaceous Period",
    title: "The Ancient Nesting Grounds",
    description:
      "Dinosaurs nest in the land that will become Balasinor. Their eggs, transformed into rock by minerals over millennia, wait beneath the hills.",
  },
  {
    number: "II",
    yearNumeral: "1980s",
    era: "The 1980s · Raiyoli",
    title: "The Accidental Garden Ornaments",
    description:
      "Villagers find strange, round \"cannonballs\" in the cement quarries and use them as garden-path edging, paperweights and scale weights.",
  },
  {
    number: "III",
    yearNumeral: "GSI",
    era: "The Geological Survey of India",
    title: "Confirmation by Dr. Ashok Sahni",
    description:
      "While searching for mineral deposits, a team finds the \"cannonballs\" in a quarry manager's office. Dr. Ashok Sahni confirms them as dinosaur eggs. About 400 bones follow, including Rajasaurus Narmadensis.",
  },
  {
    number: "IV",
    yearNumeral: "2019",
    era: "2019 · The Museum Opens",
    title: "A Monument to Deep Time",
    description:
      "After years of persistence, the Raiyoli excavation site becomes a museum and a source of national pride.",
  },
];

export default function DeepTimeTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeStation, setActiveStation] = useState(0);
  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isReducedMotion) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Calculate progress while container is scrolling through viewport
      const totalScrollable = containerHeight - viewportHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);

      setProgress(rawProgress);

      const stationIndex = Math.min(
        Math.floor(rawProgress * STATIONS.length),
        STATIONS.length - 1
      );
      setActiveStation(stationIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isReducedMotion]);

  const scrollToStation = (index: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;
    const totalScrollable = containerHeight - viewportHeight;

    const targetProgress = index / (STATIONS.length - 1);
    const targetScrollY = containerTop + targetProgress * totalScrollable;

    window.scrollTo({
      top: targetScrollY,
      behavior: isReducedMotion ? "auto" : "smooth",
    });
    setActiveStation(index);
  };

  return (
    <section
      aria-label="Deep Time Timeline: From the Cretaceous to 2019"
      className="relative w-full my-16 sm:my-24 md:my-32"
    >
      {/* ── DESKTOP STICKY SCROLL TIMELINE (≥1024px) ── */}
      <div
        ref={containerRef}
        className="hidden lg:block relative"
        style={{
          height: isReducedMotion ? "auto" : "320vh",
          background: "#22344A",
        }}
      >
        <div
          className={`${
            isReducedMotion ? "relative" : "sticky top-0"
          } h-screen w-full flex flex-col justify-between overflow-hidden px-8 sm:px-12 lg:px-20 py-16`}
          style={{ background: "#22344A" }}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between z-20">
            <div>
              <span
                className="text-[11px] uppercase tracking-[0.3em] font-sans font-medium"
                style={{ color: "#D4673A" }}
              >
                Signature Deep Time Archive
              </span>
              <h3
                className="text-2xl sm:text-3xl font-serif text-[#F3E7D3] tracking-tight mt-1"
                style={{ fontWeight: 400 }}
              >
                The Chronology of Giants
              </h3>
            </div>

            {/* Station indicator badges */}
            <div className="flex items-center gap-2">
              {STATIONS.map((station, idx) => (
                <button
                  key={station.number}
                  onClick={() => scrollToStation(idx)}
                  className="px-3.5 py-1 text-xs uppercase tracking-[0.2em] font-sans transition-all duration-300 rounded-sm focus-visible:outline-2 focus-visible:outline-[#D4673A]"
                  style={{
                    color: activeStation === idx ? "#22344A" : "#F3E7D3",
                    backgroundColor:
                      activeStation === idx ? "#D4673A" : "rgba(243,231,211,0.08)",
                    border: `1px solid ${
                      activeStation === idx ? "#D4673A" : "rgba(243,231,211,0.2)"
                    }`,
                  }}
                  aria-label={`Jump to Station ${station.number}: ${station.era}`}
                >
                  Station {station.number}
                </button>
              ))}
            </div>
          </div>

          {/* Progress Line */}
          <div className="relative w-full my-6 z-20">
            <div
              className="h-[2px] w-full"
              style={{ background: "rgba(243,231,211,0.15)" }}
            />
            <div
              className="absolute top-0 left-0 h-[2px] transition-all duration-150 ease-out"
              style={{
                width: `${progress * 100}%`,
                background: "linear-gradient(90deg, #D4673A, #F3E7D3)",
                boxShadow: "0 0 12px rgba(212,103,58,0.7)",
              }}
            />
          </div>

          {/* Sliding horizontal container */}
          <div className="relative flex-grow flex items-center overflow-hidden z-10">
            <div
              ref={trackRef}
              className="flex items-center w-full transition-transform duration-300 ease-out"
              style={{
                transform: isReducedMotion
                  ? "none"
                  : `translateX(-${progress * (STATIONS.length - 1) * 33.33}%)`,
              }}
            >
              {STATIONS.map((station, index) => {
                const isActive = activeStation === index;
                return (
                  <article
                    key={station.number}
                    className="flex-shrink-0 w-full max-w-[85vw] lg:max-w-[70vw] xl:max-w-[60vw] pr-12 xl:pr-20 relative"
                    style={{
                      opacity: isActive ? 1 : 0.6,
                      transition: "opacity 0.4s ease",
                    }}
                  >
                    {/* Giant background outlined numeral */}
                    <div
                      aria-hidden="true"
                      className="absolute -top-16 -left-6 text-[clamp(6rem,14vw,14rem)] font-serif font-black select-none pointer-events-none"
                      style={{
                        color: "transparent",
                        WebkitTextStroke: "1px rgba(243,231,211,0.08)",
                        lineHeight: 0.85,
                      }}
                    >
                      {station.yearNumeral}
                    </div>

                    <div className="relative z-10 pt-12 pb-6 pl-4">
                      {/* Era Subhead */}
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className="px-2.5 py-0.5 text-[10px] uppercase tracking-[0.24em] font-sans font-medium"
                          style={{
                            color: "#D4673A",
                            backgroundColor: "rgba(212,103,58,0.12)",
                            border: "1px solid rgba(212,103,58,0.3)",
                          }}
                        >
                          Station {station.number}
                        </span>
                        <span
                          className="text-xs uppercase tracking-[0.22em] font-sans font-medium"
                          style={{ color: "#B8A47A" }}
                        >
                          {station.era}
                        </span>
                      </div>

                      {/* Station Title */}
                      <h4
                        className="text-3xl sm:text-4xl xl:text-5xl font-serif text-[#F3E7D3] leading-[1.1] mb-6 tracking-tight"
                        style={{ fontWeight: 400 }}
                      >
                        {station.title}
                      </h4>

                      {/* Station Description */}
                      <p
                        className="text-lg xl:text-xl font-sans text-[#EFE3D2] leading-relaxed max-w-2xl"
                        style={{ fontWeight: 300, opacity: 0.9 }}
                      >
                        {station.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Footer note & Keyboard tips */}
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] font-sans text-[#B8A47A] z-20 pt-4 border-t border-[rgba(243,231,211,0.1)]">
            <span>Scroll vertically to traverse 65 million years</span>
            <span>Raiyoli, Balasinor · Certified Geological Record</span>
          </div>
        </div>
      </div>

      {/* ── MOBILE & TABLET VERTICAL TIMELINE (<1024px) ── */}
      <div
        className="block lg:hidden px-6 sm:px-10 py-16 sm:py-20"
        style={{ background: "#22344A" }}
      >
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <span
              className="text-[10px] uppercase tracking-[0.28em] font-sans font-medium"
              style={{ color: "#D4673A" }}
            >
              Signature Deep Time Archive
            </span>
            <h3
              className="text-2xl sm:text-3xl font-serif text-[#F3E7D3] tracking-tight mt-1 mb-3"
              style={{ fontWeight: 400 }}
            >
              The Chronology of Giants
            </h3>
            <p className="text-sm font-sans text-[#EFE3D2]/80 leading-relaxed">
              From Cretaceous nesting beds beneath the hills of Balasinor to the world-class museum opened in 2019.
            </p>
          </div>

          {/* Semantic Ordered List */}
          <ol className="relative border-l border-[#D4673A]/40 ml-4 space-y-12">
            {STATIONS.map((station) => (
              <li key={station.number} className="relative pl-7 sm:pl-9">
                {/* Station Node Marker */}
                <div
                  className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-[#D4673A] bg-[#22344A] flex items-center justify-center"
                  style={{ boxShadow: "0 0 10px rgba(212,103,58,0.5)" }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F3E7D3]" />
                </div>

                {/* Big faint numeral on mobile */}
                <div
                  aria-hidden="true"
                  className="text-4xl font-serif font-black select-none pointer-events-none mb-1 opacity-15"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: "1px #F3E7D3",
                  }}
                >
                  {station.yearNumeral}
                </div>

                {/* Station Rubric */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className="text-[9px] uppercase tracking-[0.2em] font-sans font-semibold px-2 py-0.5"
                    style={{
                      color: "#D4673A",
                      backgroundColor: "rgba(212,103,58,0.15)",
                    }}
                  >
                    Station {station.number}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.16em] font-sans text-[#B8A47A]">
                    {station.era}
                  </span>
                </div>

                {/* Station Heading */}
                <h4
                  className="text-xl sm:text-2xl font-serif text-[#F3E7D3] leading-snug mb-3"
                  style={{ fontWeight: 400 }}
                >
                  {station.title}
                </h4>

                {/* Station Text */}
                <p className="text-sm sm:text-base font-sans text-[#EFE3D2]/90 leading-relaxed font-light">
                  {station.description}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-12 pt-6 border-t border-[rgba(243,231,211,0.12)] text-center">
            <span className="text-[10px] uppercase tracking-[0.24em] font-sans text-[#B8A47A]">
              Raiyoli · Gujarat · The Dino Man of India Verification
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
