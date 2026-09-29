"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import type { PrivateStory } from "@/lib/membership/private-world-data";
import { getStoryById } from "@/lib/membership/private-world-data";
import RoomHotspotViewer from "./RoomHotspotViewer";
import BookOfTheMonthReader from "./BookOfTheMonthReader";

interface StoryReaderModalProps {
  story: PrivateStory | null;
  onClose: () => void;
  onSelectStory: (story: PrivateStory) => void;
}

export default function StoryReaderModal({
  story,
  onClose,
  onSelectStory,
}: StoryReaderModalProps) {
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

  // Resolve related stories
  const relatedStories = (story.relatedStoryIds || [])
    .map((id) => getStoryById(id))
    .filter(Boolean) as PrivateStory[];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#111111]/80 backdrop-blur-md flex justify-center p-0 sm:p-4 md:p-6 lg:p-8 animate-fadeIn">
      {/* Background click to dismiss */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Editorial Canvas Document */}
      <article
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#FAF8F5] text-[#111111] shadow-2xl min-h-screen sm:min-h-0 sm:rounded-sm overflow-hidden z-10 my-auto"
      >
        {/* ── TOP STICKY EDITORIAL CONTROLS ── */}
        <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-sm border-b border-[#111111]/10 px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-[0.22em] font-sans font-medium text-[#111111] hover:text-[#8A7352] transition-colors py-1.5 px-3 sm:px-4 border border-[#111111]/20 hover:border-[#8A7352] bg-white shadow-xs"
            >
              <span>← Back to Dashboard</span>
            </button>

            <span className="hidden md:inline-block text-[9px] uppercase tracking-[0.3em] font-sans font-semibold text-[#8A7352]">
              {story.worldNumber} · {story.worldTitle}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {story.accessionId && (
              <span className="hidden sm:inline-block text-[9px] font-mono text-[#777777] bg-white px-2 py-1 border border-[#111111]/10">
                {story.accessionId}
              </span>
            )}
            <button
              type="button"
              onClick={onClose}
              className="text-xs uppercase tracking-[0.2em] font-sans text-[#777777] hover:text-[#111111] transition-colors py-1.5 px-3 border border-[#111111]/15 hover:border-[#111111] bg-white"
            >
              Close ✕
            </button>
          </div>
        </header>

        {/* ── FLOATING MOBILE QUICK RETURN BUTTON ── */}
        <div className="fixed bottom-6 right-6 z-50 sm:hidden">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#111111] text-[#FAF8F5] text-xs font-sans uppercase tracking-widest shadow-2xl border border-[#8A7352]/40"
          >
            <span>← Back</span>
          </button>
        </div>

        {/* ── FULL-BLEED HERO PHOTOGRAPHY ── */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full max-h-[560px] bg-[#111111] overflow-hidden select-none">
          <Image
            src={story.heroImage}
            alt={story.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1000px"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between text-white text-[11px] font-sans tracking-wide">
            <span className="bg-black/50 backdrop-blur-xs px-2.5 py-1 border border-white/20">{story.location}</span>
            <span className="font-mono text-white/90 bg-black/50 backdrop-blur-xs px-2.5 py-1 border border-white/20">{story.period}</span>
          </div>
        </div>

        {/* ── ARTICLE HEADER ── */}
        <div className="px-6 sm:px-12 md:px-16 pt-10 pb-6 text-center">
          <span className="text-[10px] uppercase tracking-[0.38em] font-sans text-[#8A7352] font-semibold block mb-3">
            The Royal Gallerys Editorial Dossier
          </span>

          <h1
            className="text-3xl sm:text-5xl font-serif text-[#111111] tracking-tight leading-[1.08] max-w-3xl mx-auto"
            style={{ fontFamily: "var(--font-cormorant), 'Playfair Display', serif" }}
          >
            {story.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg font-serif italic text-[#555555] max-w-2xl mx-auto leading-relaxed">
            {story.subtitle}
          </p>

          <div className="w-16 h-px mx-auto my-6 bg-[#8A7352]/40" />

          {/* Curatorial Provenance Box */}
          {(story.collection || story.provenanceSource) && (
            <div className="max-w-xl mx-auto p-4 bg-white border border-[#111111]/10 text-left grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] font-sans text-[#666666]">
              {story.collection && (
                <div>
                  <strong className="text-[9px] uppercase tracking-[0.2em] text-[#8A7352] block font-sans">
                    Archive / Collection
                  </strong>
                  <span className="text-[#111111]">{story.collection}</span>
                </div>
              )}
              {story.provenanceSource && (
                <div>
                  <strong className="text-[9px] uppercase tracking-[0.2em] text-[#8A7352] block font-sans">
                    Attribution & Ledger
                  </strong>
                  <span className="text-[#111111]">{story.provenanceSource}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── NARRATIVE BODY (RESTRICTED EDITORIAL WIDTH) ── */}
        <div className="px-6 sm:px-12 md:px-20 py-8 max-w-3xl mx-auto space-y-8">
          {/* Introductory Drop-Cap Paragraph */}
          <p className="text-base sm:text-lg font-serif text-[#111111] leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:mr-2.5 first-letter:float-left first-letter:text-[#8A7352]">
            {story.intro}
          </p>

          {/* Timeline Specific Matrix */}
          {story.timelineData && (
            <div className="p-6 bg-white border-l-2 border-[#8A7352] space-y-3 text-xs font-sans">
              <span className="text-[9px] uppercase tracking-[0.25em] font-sans text-[#8A7352] font-semibold block">
                Timeline Historical Matrix
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[#555555]">
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-[#888888]">Personages</span>
                  <strong className="text-[#111111]">{story.timelineData.person}</strong>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-[#888888]">Geography</span>
                  <strong className="text-[#111111]">{story.timelineData.place}</strong>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-[#888888]">Core Object</span>
                  <strong className="text-[#111111]">{story.timelineData.object}</strong>
                </div>
              </div>
              <p className="pt-2 border-t border-[#111111]/5 text-xs text-[#666666] italic font-serif">
                Significance: {story.timelineData.significance}
              </p>
            </div>
          )}

          {/* Map Route Points */}
          {story.mapData && (
            <div className="p-6 bg-white border border-[#111111]/15 space-y-4">
              <div>
                <span className="text-[9px] uppercase tracking-[0.25em] font-sans text-[#8A7352] font-semibold block">
                  Cartographic Route · {story.mapData.year}
                </span>
                <h4 className="text-base font-serif text-[#111111] mt-0.5">
                  {story.mapData.route}
                </h4>
                <p className="text-[11px] font-sans text-[#777777]">
                  Cartographer: {story.mapData.cartographer}
                </p>
              </div>

              <div className="space-y-2 border-t border-[#111111]/10 pt-3">
                {story.mapData.points.map((pt, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs font-sans">
                    <span className="font-mono text-[#8A7352] text-[11px] pt-0.5">
                      0{i + 1}
                    </span>
                    <div>
                      <strong className="text-[#111111]">{pt.name}:</strong>{" "}
                      <span className="text-[#666666]">{pt.note}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Room Hotspots if present */}
          {story.hotspots && story.hotspots.length > 0 && (
            <RoomHotspotViewer
              imageSrc={story.heroImage}
              imageAlt={story.title}
              hotspots={story.hotspots}
              roomTitle={story.title}
            />
          )}

          {/* Interactive Book Chapters if present */}
          {story.bookChapters && story.bookChapters.length > 0 && (
            <BookOfTheMonthReader
              chapters={story.bookChapters}
              bookTitle={story.title}
              bookSubtitle={story.subtitle}
            />
          )}

          {/* Story Chapters / Narrative Sections */}
          {story.narrative.map((sec, idx) => (
            <div key={idx} className="space-y-4 pt-4">
              {sec.heading && (
                <h3
                  className="text-xl sm:text-2xl font-serif text-[#111111]"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  {sec.heading}
                </h3>
              )}

              <p className="text-sm sm:text-base font-serif text-[#222222] leading-relaxed text-justify">
                {sec.text}
              </p>

              {sec.pullQuote && (
                <blockquote className="my-6 p-6 border-y border-[#8A7352]/30 text-center font-serif italic text-base sm:text-lg text-[#111111]">
                  {sec.pullQuote}
                </blockquote>
              )}

              {sec.image && (
                <figure className="my-10 space-y-3">
                  <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-[#141414] overflow-hidden border border-[#111111]/15 p-2 sm:p-4 flex items-center justify-center shadow-xs">
                    <div className="relative w-full h-full">
                      <Image
                        src={sec.image}
                        alt={sec.caption || story.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 820px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                  {sec.caption && (
                    <figcaption className="text-xs font-serif text-[#666666] italic text-center px-4 max-w-xl mx-auto leading-relaxed">
                      {sec.caption}
                    </figcaption>
                  )}
                </figure>
              )}
            </div>
          ))}

          {/* Secondary Full Plate */}
          {story.secondaryImage && (
            <figure className="my-10 space-y-3">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-[#141414] overflow-hidden border border-[#111111]/15 p-2 sm:p-4 flex items-center justify-center shadow-xs">
                <div className="relative w-full h-full">
                  <Image
                    src={story.secondaryImage}
                    alt={story.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 820px"
                    className="object-contain"
                  />
                </div>
              </div>
              <figcaption className="text-xs font-serif text-[#777777] text-center italic">
                Archival plate preserved in the private collection of The Royal Gallerys.
              </figcaption>
            </figure>
          )}

          {/* Archival Folio & Plates Grid */}
          {story.galleryImages && story.galleryImages.length > 2 && (
            <div className="my-14 pt-8 border-t border-[#111111]/15 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-[#8A7352] font-semibold block">
                    Curatorial Visual Folio
                  </span>
                  <h4 className="text-xl font-serif text-[#111111] mt-0.5">
                    Archival Plates & Comparative Evidence
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-[#8A7352] px-2 py-1 border border-[#8A7352]/30 bg-white">
                  {story.galleryImages.length} Verified Plates
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                {story.galleryImages.map((imgSrc, pIdx) => (
                  <div key={pIdx} className="space-y-2 group bg-white p-3 border border-[#111111]/12 shadow-xs">
                    <div className="relative aspect-[4/3] bg-[#141414] overflow-hidden border border-[#111111]/10 flex items-center justify-center p-2">
                      <div className="relative w-full h-full">
                        <Image
                          src={imgSrc}
                          alt={`${story.title} - Plate 0${pIdx + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 420px"
                          className="object-contain transition-transform duration-500 group-hover:scale-102"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono text-[#888888] pt-1 px-1">
                      <span className="font-semibold text-[#111111]">PLATE 0{pIdx + 1}</span>
                      <span className="text-[#8A7352] uppercase tracking-wider text-[9px]">Archival Record</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── RELATED STORIES ENGINE (THE CONNECTED UNIVERSE) ── */}
        {relatedStories.length > 0 && (
          <section className="mt-12 p-8 sm:p-12 bg-white border-t border-[#111111]/15">
            <div className="max-w-3xl mx-auto">
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-[#8A7352] font-semibold block mb-1">
                The Connected Universe
              </span>
              <h4
                className="text-xl sm:text-2xl font-serif text-[#111111] mb-6"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Continue Discovering
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedStories.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      onSelectStory(rel);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="group cursor-pointer space-y-2.5 transition-transform hover:-translate-y-1"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#111111]">
                      <Image
                        src={rel.heroImage}
                        alt={rel.title}
                        fill
                        sizes="300px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <span className="text-[9px] uppercase tracking-[0.2em] font-sans text-[#8A7352] block">
                      {rel.worldNumber} · {rel.worldTitle}
                    </span>
                    <h5
                      className="text-sm font-serif text-[#111111] group-hover:text-[#8A7352] transition-colors line-clamp-2 leading-snug"
                      style={{ fontFamily: "var(--font-cormorant), serif" }}
                    >
                      {rel.title}
                    </h5>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom Close Bar */}
        <div className="p-8 sm:p-12 bg-[#FAF8F5] border-t border-[#111111]/10 text-center">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-3 px-12 py-4 text-xs uppercase tracking-[0.28em] font-sans font-medium transition-all bg-[#111111] text-[#FAF8F5] hover:bg-[#8A7352] shadow-md"
          >
            <span>← Return to Private Members’ World</span>
          </button>
        </div>
      </article>
    </div>
  );
}
