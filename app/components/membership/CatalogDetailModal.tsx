"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { CatalogItem, CATALOG_ITEMS } from "@/lib/membership/private-world-catalog";

interface CatalogDetailModalProps {
  item: CatalogItem | null;
  onClose: () => void;
  onSelectItem: (item: CatalogItem) => void;
  isSaved?: boolean;
  onToggleSave?: (id: string) => void;
}

export default function CatalogDetailModal({
  item,
  onClose,
  onSelectItem,
  isSaved = false,
  onToggleSave,
}: CatalogDetailModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset active image index when item changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [item?.id]);

  // Gallery array guaranteed to have at least the hero image
  const galleryImages = useMemo(() => {
    if (!item) return [];
    if (item.gallery && item.gallery.length > 0) {
      // Ensure heroImage is included if not in gallery
      const list = [...item.gallery];
      if (!list.includes(item.heroImage)) {
        list.unshift(item.heroImage);
      }
      return list;
    }
    return [item.heroImage];
  }, [item]);

  const activeImage = galleryImages[activeImageIndex] || item?.heroImage || "";

  // Cycle image handlers
  const handleNextImage = useCallback(() => {
    if (galleryImages.length <= 1) return;
    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const handlePrevImage = useCallback(() => {
    if (galleryImages.length <= 1) return;
    setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, [galleryImages.length]);

  // Keyboard navigation & body overflow lock
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        handleNextImage();
      } else if (e.key === "ArrowLeft") {
        handlePrevImage();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose, handleNextImage, handlePrevImage]);

  // Related items from same category
  const relatedItems = useMemo(() => {
    if (!item) return [];
    return CATALOG_ITEMS.filter(
      (c) => c.category === item.category && c.id !== item.id
    ).slice(0, 4);
  }, [item]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="catalog-detail-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#050505]/95 backdrop-blur-md text-[#F7F5F0] animate-fadeIn"
    >
      {/* ── STICKY TOP APP BAR ── */}
      <header className="sticky top-0 z-40 bg-[#070707]/95 backdrop-blur-md border-b border-[#1E1E1E] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-[#CCCCCC] hover:text-white px-3 py-1.5 bg-[#121212] border border-[#2B2B2B] hover:border-[#555555] transition-all"
          >
            <span>← Back to Discovery</span>
          </button>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C5A880] hidden md:inline">
            {item.category.toUpperCase()} / {item.subcategory.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {onToggleSave && (
            <button
              type="button"
              onClick={() => onToggleSave(item.id)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-mono tracking-wider uppercase border transition-all ${
                isSaved
                  ? "bg-[#C5A880] text-black border-[#C5A880] font-semibold"
                  : "bg-[#141414] text-[#C5A880] border-[#333333] hover:border-[#C5A880]"
              }`}
            >
              <span>{isSaved ? "★ Saved to Folio" : "☆ Save to Folio"}</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#777777] hover:text-white text-sm font-mono border border-transparent hover:border-[#333333] transition-all"
            aria-label="Close Detail"
          >
            ✕
          </button>
        </div>
      </header>

      {/* ── MAIN MODAL CONTENT CONTAINER ── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-12">
        {/* TWO-COLUMN EDITORIAL HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: MULTI-IMAGE GALLERY (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Active Image Stage with Adaptive Ratio */}
            <div className="relative w-full bg-[#0A0A0A] border border-[#222222] rounded-sm overflow-hidden flex items-center justify-center min-h-[380px] sm:min-h-[480px] lg:min-h-[540px] group shadow-2xl">
              <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[540px]">
                <Image
                  src={activeImage}
                  alt={item.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-contain p-2 sm:p-4 transition-transform duration-500 group-hover:scale-[1.02]"
                  priority
                />
              </div>

              {/* Prev / Next Nav Overlay Arrows */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-black/70 hover:bg-black/90 text-white border border-white/20 text-xs font-mono transition-all opacity-80 sm:opacity-0 group-hover:opacity-100"
                    aria-label="Previous image"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-black/70 hover:bg-black/90 text-white border border-white/20 text-xs font-mono transition-all opacity-80 sm:opacity-0 group-hover:opacity-100"
                    aria-label="Next image"
                  >
                    →
                  </button>
                  {/* Photo Counter */}
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/80 backdrop-blur-sm border border-[#333333] text-[9px] font-mono tracking-widest text-[#AAAAAA]">
                    {String(activeImageIndex + 1).padStart(2, "0")} /{" "}
                    {String(galleryImages.length).padStart(2, "0")}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Rail (Clicking switches active photo) */}
            {galleryImages.length > 1 && (
              <div className="space-y-2">
                <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#777777] block">
                  Interactive Multi-Angle Gallery ({galleryImages.length} Perspectives)
                </span>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3">
                  {galleryImages.map((imgUrl, idx) => {
                    const isCurrent = idx === activeImageIndex;
                    return (
                      <button
                        key={`${imgUrl}-${idx}`}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative aspect-square border overflow-hidden transition-all bg-[#0C0C0C] ${
                          isCurrent
                            ? "border-[#C5A880] ring-1 ring-[#C5A880]/60 scale-[1.03]"
                            : "border-[#222222] hover:border-[#555555] opacity-70 hover:opacity-100"
                        }`}
                        aria-label={`View perspective ${idx + 1}`}
                      >
                        <Image
                          src={imgUrl}
                          alt={`${item.name} - view ${idx + 1}`}
                          fill
                          sizes="120px"
                          className="object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: CURATORIAL DOSSIER & SPECS (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Category / Brand / Year Header */}
            <div className="space-y-2 border-b border-[#1E1E1E] pb-5">
              <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.3em] uppercase">
                <span className="text-[#C5A880] font-semibold">{item.brand}</span>
                {item.year && <span className="text-[#777777]">{item.year}</span>}
              </div>

              <h1
                id="catalog-detail-title"
                className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#F7F5F0] leading-snug font-normal"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                {item.name}
              </h1>

              <div className="text-xs font-mono text-[#888888] uppercase tracking-wider">
                {item.subcategory}
                {item.designer ? ` · Design: ${item.designer}` : ""}
              </div>
            </div>

            {/* Price & Official Status Banner */}
            <div className="p-4 bg-[#0E0E0E] border border-[#222222] flex items-center justify-between">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#777777] block mb-0.5">
                  Verified Retail / Curatorial Valuation
                </span>
                <span className="text-base sm:text-lg font-mono font-medium text-[#C5A880]">
                  {item.price}
                </span>
              </div>
              <span className="text-[9px] font-mono text-[#666666] uppercase tracking-widest border border-[#282828] px-2 py-1">
                Authentic Source
              </span>
            </div>

            {/* Editorial Description */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#999999] block">
                Editorial Overview
              </span>
              <p className="text-sm font-serif text-[#E0DFDC] leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Why It Matters (Curatorial Highlight Box) */}
            <div className="p-5 bg-gradient-to-br from-[#121212] to-[#0A0A0A] border-l-2 border-[#C5A880] border-t border-r border-b border-[#1F1F1F] space-y-2">
              <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-[#C5A880] block font-semibold">
                Curatorial Insight · Why It Matters
              </span>
              <p className="text-xs sm:text-sm font-serif italic text-[#CFCBC4] leading-relaxed">
                &ldquo;{item.editorialNote}&rdquo;
              </p>
            </div>

            {/* Official Source & Verification Link */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono border-t border-[#1C1C1C]">
              <div className="text-[10px] text-[#777777] uppercase tracking-wider truncate">
                Source: <span className="text-[#AAAAAA]">{item.source}</span>
              </div>

              {item.officialUrl && (
                <a
                  href={item.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#171717] hover:bg-[#222222] border border-[#333333] hover:border-[#C5A880] text-[#F7F5F0] hover:text-[#C5A880] text-[10px] font-mono uppercase tracking-widest transition-all"
                >
                  <span>Discover Official Source</span>
                  <span>↗</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* ── TECHNICAL & CRAFT SPECIFICATIONS TABLE ── */}
        {item.specifications && Object.keys(item.specifications).length > 0 && (
          <section className="pt-8 border-t border-[#1E1E1E] space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-[#C5A880] block mb-1">
                  TECHNICAL DOSSIER & PROVENANCE
                </span>
                <h3
                  className="text-xl sm:text-2xl font-serif text-[#F7F5F0]"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  Craftsmanship & Specifications
                </h3>
              </div>
              <span className="text-xs font-mono text-[#666666] hidden sm:block">
                Ref: {item.id.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#222222] border border-[#222222]">
              {Object.entries(item.specifications).map(([key, val]) => (
                <div
                  key={key}
                  className="p-4 bg-[#0A0A0A] flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888] sm:min-w-[140px]">
                    {key}
                  </span>
                  <span className="text-xs sm:text-sm font-sans text-[#F7F5F0] text-left sm:text-right font-light">
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── RELATED CURATED CREATIONS RAIL ── */}
        {relatedItems.length > 0 && (
          <section className="pt-8 border-t border-[#1E1E1E] space-y-6">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-[#C5A880] block mb-1">
                  CORRESPONDING ATELIER WORKS
                </span>
                <h3
                  className="text-xl sm:text-2xl font-serif text-[#F7F5F0]"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  Related Creations in {item.category.toUpperCase()}
                </h3>
              </div>
              <span className="text-xs font-mono text-[#666666]">
                {relatedItems.length} Selections
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedItems.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectItem(rel)}
                  className="group cursor-pointer bg-[#0A0A0A] border border-[#1E1E1E] hover:border-[#C5A880] p-4 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="relative aspect-[4/3] w-full bg-[#050505] overflow-hidden border border-[#181818]">
                      <Image
                        src={rel.heroImage}
                        alt={rel.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#C5A880] block">
                        {rel.brand}
                      </span>
                      <h4
                        className="text-sm font-serif text-[#F7F5F0] group-hover:text-[#C5A880] transition-colors line-clamp-2 mt-0.5"
                        style={{ fontFamily: "var(--font-cormorant), serif" }}
                      >
                        {rel.name}
                      </h4>
                    </div>
                  </div>
                  <div className="pt-3 mt-3 border-t border-[#181818] flex items-center justify-between text-[10px] font-mono">
                    <span className="text-[#AAAAAA]">{rel.price}</span>
                    <span className="text-[#C5A880] group-hover:translate-x-1 transition-transform">
                      Inspect →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
