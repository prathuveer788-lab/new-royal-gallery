"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { EditorialStory, getObjectById } from "@/lib/membership/private-collections-data";
import AdaptiveImageFrame from "./AdaptiveImageFrame";

interface EditorialStoryModalProps {
  story: EditorialStory | null;
  onClose: () => void;
  onSelectObject: (obj: any) => void;
}

export default function EditorialStoryModal({
  story,
  onClose,
  onSelectObject,
}: EditorialStoryModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (story) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [story, onClose]);

  if (!story) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#050505] text-[#F7F5F0] animate-fadeIn">
      {/* Sticky top header */}
      <header className="sticky top-0 z-30 bg-[#060606]/95 backdrop-blur-md border-b border-[#1C1C1C] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-[#CCCCCC] hover:text-white px-3 py-1.5 bg-[#141414] border border-[#2B2B2B] hover:border-[#555555] transition-all"
        >
          <span>← Back to Stories</span>
        </button>

        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C5A880] hidden sm:inline">
          {story.category} · {story.readTime}
        </span>

        <button
          type="button"
          onClick={onClose}
          className="p-1.5 text-[#777777] hover:text-white text-sm font-mono"
          aria-label="Close Story"
        >
          ✕
        </button>
      </header>

      {/* Main article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#C5A880] block">
            ROYAL GALLERYS EDITORIAL DOSSIER
          </span>

          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#F7F5F0] leading-[1.08] tracking-tight font-normal"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            {story.title}
          </h1>

          <div className="w-16 h-px bg-[#C5A880]/40 mx-auto my-3" />

          <p className="text-base sm:text-xl font-serif italic text-[#A8A49C] leading-relaxed">
            {story.subtitle}
          </p>

          <div className="pt-2 flex items-center justify-center gap-4 text-[10px] font-mono uppercase tracking-widest text-[#777777]">
            <span>{story.publishedDate}</span>
            <span>·</span>
            <span>{story.readTime}</span>
          </div>
        </div>

        {/* Hero image with adaptive frame */}
        <AdaptiveImageFrame
          src={story.heroImage}
          alt={story.title}
          orientation={story.heroOrientation}
          priority
          showCredit
          credit={story.imageCredit}
        />

        {/* Lead paragraph */}
        <div className="max-w-3xl mx-auto">
          <p className="text-lg sm:text-2xl font-serif text-[#F7F5F0] leading-relaxed border-l-2 border-[#C5A880] pl-6 italic">
            {story.leadParagraph}
          </p>
        </div>

        {/* Story sections */}
        <div className="max-w-3xl mx-auto space-y-10">
          {story.sections.map((sec, idx) => (
            <section key={idx} className="space-y-4">
              <h2
                className="text-xl sm:text-2xl font-serif text-[#C5A880] tracking-wide"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                {sec.heading}
              </h2>

              <div className="space-y-4 text-sm sm:text-base font-serif text-[#CCCCCC] leading-relaxed">
                {sec.body.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {sec.quote && (
                <blockquote className="my-6 p-6 bg-[#0E0E0E] border-l-2 border-[#C5A880] space-y-2">
                  <p className="text-base sm:text-lg font-serif italic text-[#E5E0D8]">
                    “{sec.quote.text}”
                  </p>
                  <footer className="text-[10px] font-mono uppercase tracking-wider text-[#888888]">
                    — {sec.quote.author}
                  </footer>
                </blockquote>
              )}
            </section>
          ))}
        </div>

        {/* Curator Note */}
        <div className="max-w-3xl mx-auto p-6 bg-[#0B0B0B] border border-[#222222] text-xs font-mono text-[#888888] space-y-1">
          <span className="text-[#C5A880] uppercase tracking-wider block font-semibold">
            EDITORIAL DESK NOTE
          </span>
          <p>{story.curatorNote}</p>
        </div>

        {/* Related objects */}
        {story.relatedObjectIds && story.relatedObjectIds.length > 0 && (
          <div className="max-w-3xl mx-auto pt-8 border-t border-[#1C1C1C] space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880] block">
              FEATURED OBJECTS FROM THIS DOSSIER
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {story.relatedObjectIds.map((objId) => {
                const obj = getObjectById(objId);
                if (!obj) return null;
                return (
                  <div
                    key={obj.id}
                    onClick={() => {
                      onClose();
                      onSelectObject(obj);
                    }}
                    className="group cursor-pointer p-4 bg-[#0A0A0A] border border-[#1C1C1C] hover:border-[#C5A880] transition-all"
                  >
                    <span className="text-[8px] font-mono text-[#C5A880] uppercase block">
                      {obj.house}
                    </span>
                    <h4 className="text-xs font-serif text-[#F7F5F0] group-hover:text-[#C5A880] transition-colors truncate mt-1">
                      {obj.title}
                    </h4>
                    <span className="text-[9px] font-mono text-[#666666] block mt-2">
                      Inspect Piece →
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="pt-8 text-center">
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-3.5 border border-[#333333] hover:border-[#C5A880] text-xs font-mono uppercase tracking-[0.25em] text-[#AAAAAA] hover:text-[#F7F5F0] transition-all"
          >
            ← Return to Curatorial Stories
          </button>
        </div>
      </article>
    </div>
  );
}
