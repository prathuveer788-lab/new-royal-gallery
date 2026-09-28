"use client";

import { useEffect, useRef } from "react";

interface GridItem {
  plate: string;
  title: string;
  caption: string;
  catalogue: string;
}

const ITEMS: GridItem[] = [
  {
    plate: "PLATE II",
    title: "Field Excavation at Raiyoli",
    caption:
      "Aaliya Sultana Babi at the original quarry site where Cretaceous dinosaur eggs were uncovered in the 1980s.",
    catalogue: "RAI-FIELD-01",
  },
  {
    plate: "PLATE III",
    title: "Examining Microscopic Egg Pores",
    caption:
      "Demonstrating the oxygen pores that distinguish 65-million-year-old fossilized dinosaur eggs from ordinary limestone.",
    catalogue: "RAI-SPEC-02",
  },
  {
    plate: "PLATE IV",
    title: "Fossil Preservation & Archiving",
    caption:
      "Documenting bone fragments and geological layers in the Balasinor district alongside researchers.",
    catalogue: "RAI-ARCH-03",
  },
  {
    plate: "PLATE V",
    title: "Heritage Lecture & Student Masterclass",
    caption:
      "Traveling across universities and international institutions to share the prehistoric heritage of Gujarat.",
    catalogue: "RAI-EDU-04",
  },
  {
    plate: "PLATE VI",
    title: "The Tactile Weight of Deep Time",
    caption:
      "Allowing visitors to hold genuine prehistoric history in their palms, narrowing the 65-million-year divide.",
    catalogue: "RAI-EXP-05",
  },
  {
    plate: "PLATE VII",
    title: "The Museum at Raiyoli",
    caption:
      "Inside the high-tech facility inaugurated in 2019, securing India's dinosaur capital for future generations.",
    catalogue: "RAI-MUS-06",
  },
];

interface WindowWithInstgrm extends Window {
  instgrm?: {
    Embeds: {
      process: () => void;
    };
  };
}

export default function InstagramWorldStrip() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If Instagram embed blockquotes exist, load Instagram's embed script
    if (typeof window !== "undefined") {
      const win = window as unknown as WindowWithInstgrm;
      win.instgrm?.Embeds.process();
    }
  }, []);

  return (
    <section
      aria-label="In Her World: Dispatches and Field Photography"
      className="my-16 sm:my-24 border-y border-[#D9CFC2] py-16"
      style={{ backgroundColor: "#F3E7D3" }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span
              className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold block"
              style={{ color: "#D4673A" }}
            >
              In Her World · Editorial Grid
            </span>
            <h3
              className="text-3xl sm:text-4xl font-serif text-[#1B1D21] tracking-tight mt-1"
              style={{ fontWeight: 400 }}
            >
              Field Dispatches &amp; Living Heritage
            </h3>
          </div>
          <p className="text-xs uppercase tracking-[0.18em] font-sans text-[#6B6F76] max-w-xs sm:text-right">
            Curated dispatches from Balasinor, Raiyoli &amp; global lecture halls
          </p>
        </div>

        {/* 3x2 Grid on Desktop / Swipeable on Mobile */}
        <div
          ref={containerRef}
          className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 overflow-x-auto sm:overflow-visible pb-6 sm:pb-0 snap-x snap-mandatory scrollbar-none"
        >
          {ITEMS.map((item) => (
            <div
              key={item.plate}
              className="flex-shrink-0 w-[82vw] sm:w-auto snap-center bg-[#FBF9F5] border border-[#D9CFC2] p-6 sm:p-7 flex flex-col justify-between shadow-sm transition-all duration-300 hover:border-[#D4673A]"
            >
              <div>
                {/* Plate rubric */}
                <div className="flex items-center justify-between border-b border-[#D9CFC2]/60 pb-3 mb-4">
                  <span
                    className="text-[10px] uppercase tracking-[0.24em] font-sans font-semibold"
                    style={{ color: "#D4673A" }}
                  >
                    {item.plate}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.18em] font-sans text-[#6B6F76]">
                    {item.catalogue}
                  </span>
                </div>

                {/* Card Title */}
                <h4
                  className="text-xl font-serif text-[#1B1D21] leading-snug mb-3"
                  style={{ fontWeight: 500 }}
                >
                  {item.title}
                </h4>

                {/* Card Caption */}
                <p className="text-sm font-sans text-[#1B1D21]/80 leading-relaxed font-light mb-6">
                  {item.caption}
                </p>
              </div>

              {/* Museum Label Credit */}
              <div className="pt-4 border-t border-[#D9CFC2]/50">
                <span className="text-[10px] uppercase tracking-[0.16em] font-sans text-[#6B6F76] block">
                  Courtesy of Aaliya Sultana Babi / @[handle]
                </span>
                <span className="text-[9px] font-serif text-[#D4673A] italic">
                  Permitted Instagram Archive · Balasinor
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Follow her on Instagram Link */}
        <div className="mt-10 pt-6 border-t border-[#D9CFC2] flex flex-wrap items-center justify-between gap-4 text-xs font-sans">
          <span className="text-[#6B6F76] italic">
            Photography authorized by Aaliya Sultana Babi. Permitted Instagram posts will be embedded upon editorial release.
          </span>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium transition-colors hover:text-[#D4673A] focus-visible:outline-[#D4673A]"
            style={{ color: "#22344A" }}
          >
            <span>Follow her on Instagram</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
