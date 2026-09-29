"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

interface Slide {
  src: string;
  alt: string;
  title: string;
  caption: string;
  credit: string;
}

const slides: Slide[] = [
  {
    src: "/assets/images/balmoral/balmoral-palm-court.jpg",
    alt: "Palm Court afternoon tea under the Venetian chandelier and glass dome at The Balmoral",
    title: "Palm Court",
    caption: "Palms rising between fluted columns beneath a glass dome, a Venetian chandelier, and a hand-painted de Gournay landscape concealing the follies of Calton Hill.",
    credit: "Photograph courtesy of The Balmoral, a Rocco Forte Hotel",
  },
  {
    src: "/assets/images/balmoral/balmoral-scone-crombie.jpg",
    alt: "The Scone and Crombie Suite sitting room at The Balmoral Edinburgh",
    title: "The Scone & Crombie Suite",
    caption: "A hundred and twenty square metres above the Old Town, named for Scone Palace and Crombie Castle, with a powder-blue overmantel of carved garlands and gilt sconces flanking the glass.",
    credit: "Photograph courtesy of The Balmoral, a Rocco Forte Hotel",
  },
  {
    src: "/assets/images/balmoral/balmoral-scone-crombie-bedroom.jpg",
    alt: "Master bedroom in the Scone and Crombie Suite designed by Olga Polizzi",
    title: "Scone & Crombie Master Bedroom",
    caption: "Interiors directed by Olga Polizzi, layering Scottish heather hues, bespoke textiles, and expansive sash windows framing Edinburgh's skyline.",
    credit: "Photograph courtesy of The Balmoral, a Rocco Forte Hotel",
  },
  {
    src: "/assets/images/balmoral/balmoral-castle-view-suite.jpg",
    alt: "Castle View Suite framing Edinburgh Castle on its volcanic crag",
    title: "Castle View Suite",
    caption: "Deluxe suites measuring twenty-eight square metres, selling orientation over floor area with direct sightlines to Edinburgh Castle across Princes Street Gardens.",
    credit: "Photograph courtesy of The Balmoral, a Rocco Forte Hotel",
  },
  {
    src: "/assets/images/balmoral/balmoral-brasserie-prince.jpg",
    alt: "Brasserie Prince dining room designed by Martin Brudnizki and Olga Polizzi",
    title: "Brasserie Prince",
    caption: "Remade in 2018 by Martin Brudnizki with Olga Polizzi, pairing classic French brasserie warmth with Scottish produce and its own dedicated street entrance.",
    credit: "Photograph courtesy of The Balmoral, a Rocco Forte Hotel",
  },
  {
    src: "/assets/images/balmoral/balmoral-number-one.jpg",
    alt: "Number One fine dining restaurant at The Balmoral with rich lacquer walls",
    title: "Number One Restaurant",
    caption: "The hotel's flagship gastronomic destination, wrapped in lacquered amber walls, celebrating the finest Scottish game, seafood, and contemporary technique.",
    credit: "Photograph courtesy of The Balmoral, a Rocco Forte Hotel",
  },
  {
    src: "/assets/images/balmoral/balmoral-spa-pool.jpg",
    alt: "The subterranean lap pool at Irene Forte Spa, The Balmoral",
    title: "Irene Forte Spa & Lap Pool",
    caption: "Rebuilt as the country's first Irene Forte Spa, featuring a 15-metre subterranean heated pool, cork underfoot, and Sicilian lemon-tree frescoes.",
    credit: "Photograph courtesy of The Balmoral, a Rocco Forte Hotel",
  },
  {
    src: "/assets/images/balmoral/balmoral-scotch-bar.jpg",
    alt: "SCOTCH whisky bar with glowing amber cabinets of over 500 varieties",
    title: "SCOTCH Whisky Bar",
    caption: "An amber sanctuary housing over 500 Scottish whiskies curated by dedicated kilted Whisky Ambassadors, from rare Speyside single malts to Islay peats.",
    credit: "Photograph courtesy of The Balmoral, a Rocco Forte Hotel",
  },
];

export default function BalmoralCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const current = slides[currentIndex];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="The Balmoral Interiors & Suites Gallery"
      className="my-16 sm:my-20 max-w-[1100px] mx-auto px-4 sm:px-6"
    >
      <div className="flex items-baseline justify-between mb-4 border-b border-[#D9D4CA] pb-3">
        <div>
          <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#24424F]">
            Gallery
          </span>
          <h3 className="text-xl sm:text-2xl font-serif text-[#1A1A1A] mt-0.5">
            Inside No. 1 Princes Street
          </h3>
        </div>
        <div className="flex items-center space-x-4">
          <span
            className="text-xs uppercase tracking-[0.18em] font-mono text-[#5B5B5B]"
            aria-live="polite"
          >
            {String(currentIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
          <div className="flex space-x-1.5">
            <button
              type="button"
              onClick={prevSlide}
              className="w-8 h-8 rounded-full border border-[#D9D4CA] flex items-center justify-center text-[#1A1A1A] hover:bg-[#24424F] hover:text-[#FAF8F4] hover:border-[#24424F] transition-all focus:outline-none focus:ring-1 focus:ring-[#24424F]"
              aria-label="Previous image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="w-8 h-8 rounded-full border border-[#D9D4CA] flex items-center justify-center text-[#1A1A1A] hover:bg-[#24424F] hover:text-[#FAF8F4] hover:border-[#24424F] transition-all focus:outline-none focus:ring-1 focus:ring-[#24424F]"
              aria-label="Next image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Slide Display */}
      <div
        className="relative w-full aspect-[3/2] overflow-hidden bg-[#EFE9DF] select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          sizes="(max-width: 768px) 100vw, 1100px"
          className="object-cover transition-opacity duration-500 ease-in-out"
          priority={currentIndex === 0}
        />

        {/* Floating title badge on slide */}
        <div className="absolute top-4 left-4 bg-[#FAF8F4]/90 backdrop-blur-sm px-3 py-1.5 border border-[#D9D4CA] text-xs font-serif text-[#1A1A1A] tracking-wide shadow-sm">
          {current.title}
        </div>
      </div>

      {/* Caption & Credit */}
      <div className="mt-3 flex flex-col sm:flex-row sm:items-baseline sm:justify-between text-xs text-[#5B5B5B] gap-2 pt-2 border-t border-[#D9D4CA]/50">
        <p className="max-w-2xl text-[13px] sm:text-[14px] leading-relaxed text-[#1A1A1A]">
          <strong className="font-semibold text-[#1A1A1A] mr-1.5">{current.title}.</strong>
          {current.caption}
        </p>
        <span className="text-[11px] sm:text-[12px] italic text-[#5B5B5B] whitespace-nowrap sm:text-right shrink-0">
          {current.credit}
        </span>
      </div>

      {/* Thumbnails Navigation Row */}
      <div className="mt-5 flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {slides.map((s, idx) => (
          <button
            key={s.title}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            className={`relative w-20 sm:w-24 aspect-[3/2] shrink-0 overflow-hidden border transition-all ${
              idx === currentIndex
                ? "border-[#24424F] ring-2 ring-[#24424F]/40 opacity-100"
                : "border-[#D9D4CA] opacity-60 hover:opacity-100"
            }`}
            aria-label={`Jump to slide ${idx + 1}: ${s.title}`}
          >
            <Image
              src={s.src}
              alt=""
              fill
              sizes="96px"
              className="object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </section>
  );
}
