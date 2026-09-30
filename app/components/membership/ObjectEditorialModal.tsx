"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CuratedObject, getObjectById } from "@/lib/membership/private-collections-data";
import AdaptiveImageFrame from "./AdaptiveImageFrame";

interface ObjectEditorialModalProps {
  object: CuratedObject | null;
  onClose: () => void;
  onSelectObject: (obj: CuratedObject) => void;
  isSaved?: boolean;
  onToggleSave?: (objId: string) => void;
}

export default function ObjectEditorialModal({
  object,
  onClose,
  onSelectObject,
  isSaved = false,
  onToggleSave,
}: ObjectEditorialModalProps) {
  const [activeTab, setActiveTab] = useState<"story" | "craft" | "provenance" | "specs">("story");
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (object) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [object, onClose]);

  if (!object) return null;

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#050505] text-[#F7F5F0] animate-fadeIn">
      {/* ── STICKY CURATORIAL TOP BAR ── */}
      <header className="sticky top-0 z-30 bg-[#060606]/95 backdrop-blur-md border-b border-[#1C1C1C] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-[#CCCCCC] hover:text-white px-3 py-1.5 bg-[#141414] border border-[#2B2B2B] hover:border-[#555555] transition-all"
          >
            <span>← Back to Collections</span>
          </button>

          <div className="hidden md:flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-[#777777]">
            <span className="text-[#C5A880]">{object.worldNumber}</span>
            <span>·</span>
            <span>{object.worldTitle}</span>
            <span>·</span>
            <span className="text-[#AAAAAA]">{object.accessionOrRef}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Save to Member Archive */}
          {onToggleSave && (
            <button
              type="button"
              onClick={() => onToggleSave(object.id)}
              className={`px-3 py-1.5 border text-[10px] font-mono uppercase tracking-widest transition-all ${
                isSaved
                  ? "bg-[#C5A880] text-[#050505] border-[#C5A880] font-semibold"
                  : "bg-[#111111] text-[#AAAAAA] border-[#2B2B2B] hover:text-white"
              }`}
            >
              {isSaved ? "✓ In My Archive" : "+ Save to Archive"}
            </button>
          )}

          {/* Copy Link */}
          <button
            type="button"
            onClick={handleShare}
            className="px-3 py-1.5 bg-[#111111] border border-[#2B2B2B] hover:border-[#555555] text-[10px] font-mono uppercase tracking-widest text-[#AAAAAA] hover:text-white transition-all hidden sm:block"
          >
            {copiedLink ? "✓ Copied" : "Share"}
          </button>

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#777777] hover:text-white text-sm font-mono"
            aria-label="Close Modal"
          >
            ✕
          </button>
        </div>
      </header>

      {/* ── MAIN ARTICLE CANVAS ── */}
      <article className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-16 space-y-12">
        {/* Curatorial Masthead */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.35em] text-[#C5A880]">
            <span>{object.house}</span>
            <span>·</span>
            <span className="text-[#777777]">{object.period}</span>
          </div>

          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#F7F5F0] leading-[1.08] tracking-tight font-normal"
            style={{ fontFamily: "var(--font-cormorant), 'Playfair Display', serif" }}
          >
            {object.title}
          </h1>

          <p className="text-base sm:text-xl font-serif italic text-[#A8A49C] leading-relaxed">
            {object.subtitle}
          </p>

          <p className="text-xs sm:text-sm font-sans text-[#888888] leading-relaxed pt-1">
            {object.curatorialDeck}
          </p>
        </div>

        {/* ── ADAPTIVE HERO VISUAL (Respects natural orientation, NO CROP) ── */}
        <div className="w-full">
          <AdaptiveImageFrame
            src={object.image}
            alt={object.title}
            orientation={object.imageOrientation}
            priority
            showCredit
            credit={`${object.imageCredit} · Reference ${object.accessionOrRef}`}
          />
        </div>

        {/* ── OFFICIAL PRICING & DISCOVERY STRIP (Section 19 & 20) ── */}
        <div className="p-6 sm:p-8 bg-[#0B0B0B] border border-[#222222] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5">
            <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#C5A880] block">
              {object.price.priceType === "OFFICIAL_INDIA_PRICE"
                ? "OFFICIAL INDIA SALON ALLOCATION"
                : object.price.priceType === "AUCTION_RECORD"
                ? "DOCUMENTED AUCTION PROVENANCE"
                : "CURATORIAL VALUATION / DOSSIER"}
            </span>

            <div className="text-xl sm:text-2xl font-mono text-[#F7F5F0] font-semibold">
              {object.price.amountINR}
            </div>

            <div className="text-[10px] font-mono text-[#666666]">
              Source: {object.price.source} · Verified {object.price.verifiedDate}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={object.officialSource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#F7F5F0] hover:bg-[#E5E0D8] text-[#050505] text-[10px] font-mono uppercase tracking-[0.25em] font-semibold transition-all inline-flex items-center gap-2"
            >
              <span>{object.officialSource.actionLabel}</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* ── TABBED EDITORIAL CHAPTERS ── */}
        <div className="space-y-8">
          {/* Navigation Bar */}
          <div className="flex border-b border-[#222222] text-xs font-mono tracking-widest uppercase overflow-x-auto">
            {[
              { id: "story", label: "01 · THE STORY" },
              { id: "craft", label: "02 · THE CRAFT" },
              { id: "provenance", label: "03 · PROVENANCE & RUNWAY" },
              { id: "specs", label: "04 · TECHNICAL DOSSIER" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-4 sm:px-6 whitespace-nowrap transition-all border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? "border-[#C5A880] text-[#F7F5F0] font-semibold"
                    : "border-transparent text-[#666666] hover:text-[#AAAAAA]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Chapter Content */}
          <div className="min-h-[260px]">
            {activeTab === "story" && (
              <div className="space-y-6 max-w-3xl text-sm sm:text-base font-serif text-[#CCCCCC] leading-relaxed">
                {object.theStory.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            )}

            {activeTab === "craft" && (
              <div className="space-y-4 max-w-3xl">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880] block">
                  ATELIER DISCIPLINE & MATERIALS
                </span>
                <div className="space-y-4 text-sm sm:text-base font-serif text-[#CCCCCC] leading-relaxed">
                  {object.theCraft.map((p, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <span className="text-xs font-mono text-[#C5A880] mt-1 shrink-0">✦</span>
                      <p>{p}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "provenance" && (
              <div className="space-y-4 max-w-3xl">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880] block">
                  DOCUMENTED CHRONOLOGY & EXHIBITIONS
                </span>
                <div className="space-y-3 text-sm font-sans text-[#BBBBBB]">
                  {object.provenanceOrRunway.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-[#0A0A0A] border border-[#1C1C1C] flex gap-3 items-start"
                    >
                      <span className="text-[10px] font-mono text-[#888888] mt-0.5">[{idx + 1}]</span>
                      <p>{p}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="max-w-3xl space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880] block">
                  CURATORIAL SPECIFICATION SHEET
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  {object.technicalDossier.map((spec, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-[#0A0A0A] border border-[#1C1C1C] flex flex-col justify-between space-y-1"
                    >
                      <span className="text-[9px] uppercase tracking-wider text-[#666666]">
                        {spec.label}
                      </span>
                      <span className="text-[#E0DFDC] font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── RELATED OBJECTS IN THE PRIVATE COLLECTION ── */}
        {object.relatedObjectIds && object.relatedObjectIds.length > 0 && (
          <div className="pt-12 border-t border-[#1C1C1C] space-y-6">
            <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#C5A880] block">
              COMPLEMENTARY PIECES IN THE COLLECTION
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {object.relatedObjectIds.map((relId) => {
                const relObj = getObjectById(relId);
                if (!relObj) return null;
                return (
                  <div
                    key={relObj.id}
                    onClick={() => {
                      onSelectObject(relObj);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="group cursor-pointer p-4 bg-[#0B0B0B] border border-[#1C1C1C] hover:border-[#C5A880] transition-all flex flex-col justify-between h-44"
                  >
                    <div className="space-y-1.5">
                      <span className="text-[8px] font-mono uppercase tracking-wider text-[#C5A880] block">
                        {relObj.house}
                      </span>
                      <h4
                        className="text-sm font-serif text-[#F7F5F0] group-hover:text-[#C5A880] transition-colors leading-snug line-clamp-2"
                        style={{ fontFamily: "var(--font-cormorant), serif" }}
                      >
                        {relObj.title}
                      </h4>
                    </div>

                    <div className="pt-2 border-t border-[#181818] flex items-center justify-between text-[9px] font-mono text-[#666666]">
                      <span>{relObj.period}</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Return to Collections button */}
        <div className="pt-10 text-center">
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-3.5 border border-[#333333] hover:border-[#C5A880] text-xs font-mono uppercase tracking-[0.25em] text-[#AAAAAA] hover:text-[#F7F5F0] transition-all"
          >
            ← Return to Private Collections
          </button>
        </div>
      </article>

      {/* Floating mobile back button */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-3 bg-[#111111]/90 backdrop-blur-md border border-[#333333] text-white text-xs font-mono uppercase tracking-widest shadow-2xl flex items-center gap-2"
        >
          <span>←</span>
          <span>Back</span>
        </button>
      </div>
    </div>
  );
}
