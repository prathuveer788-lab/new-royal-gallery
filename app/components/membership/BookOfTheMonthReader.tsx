"use client";

import React, { useState } from "react";
import Image from "next/image";
import type { BookChapter } from "@/lib/membership/private-world-data";

interface BookOfTheMonthReaderProps {
  chapters: BookChapter[];
  bookTitle: string;
  bookSubtitle: string;
}

export default function BookOfTheMonthReader({
  chapters,
  bookTitle,
  bookSubtitle,
}: BookOfTheMonthReaderProps) {
  const [currentIdx, setCurrentIdx] = useState(0);

  const activeChap = chapters[currentIdx] || chapters[0];

  return (
    <div className="my-10 bg-[#FAF8F5] border border-[#111111]/20 shadow-lg overflow-hidden">
      {/* ── COFFEE-TABLE BOOK MASTHEAD ── */}
      <div className="p-6 sm:p-8 bg-white border-b border-[#111111]/15 text-center">
        <span className="text-[10px] uppercase tracking-[0.35em] font-sans text-[#8A7352] font-semibold block mb-2">
          The Royal Gallerys · Digital Luxury Monograph
        </span>
        <h3
          className="text-2xl sm:text-4xl font-serif text-[#111111] max-w-2xl mx-auto"
          style={{ fontFamily: "var(--font-cormorant), serif" }}
        >
          {bookTitle}
        </h3>
        <p className="text-xs sm:text-sm font-sans text-[#666666] mt-2 max-w-xl mx-auto italic">
          {bookSubtitle}
        </p>

        {/* Chapter Navigator Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 pt-4 border-t border-[#111111]/10">
          {chapters.map((chap, idx) => (
            <button
              key={chap.id}
              type="button"
              onClick={() => setCurrentIdx(idx)}
              className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-sans transition-all duration-300 ${
                currentIdx === idx
                  ? "bg-[#111111] text-[#FAF8F5] shadow-xs"
                  : "bg-[#FAF8F5] text-[#666666] hover:bg-[#8A7352]/10 hover:text-[#111111]"
              }`}
            >
              <span>{chap.number}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── TWO-PAGE SPREAD SIMULATION (DESKTOP) / EDITORIAL VERTICAL SPREAD (MOBILE) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
        {/* Left Side / Full Photographic Plate */}
        <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-full bg-[#111111] overflow-hidden select-none">
          <Image
            src={activeChap.image}
            alt={activeChap.title}
            fill
            sizes="(max-width: 1024px) 100vw, 700px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 text-white text-[11px] font-sans tracking-wide leading-relaxed bg-black/40 backdrop-blur-xs p-3">
            {activeChap.caption}
          </div>
        </div>

        {/* Right Side / Editorial Monograph Text */}
        <div className="lg:col-span-5 p-8 sm:p-12 bg-white flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-[#8A7352] font-semibold">
                {activeChap.number}
              </span>
              <h4
                className="text-2xl sm:text-3xl font-serif text-[#111111] mt-1"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                {activeChap.title}
              </h4>
              <p className="text-xs uppercase tracking-[0.18em] font-sans text-[#777777] mt-1">
                {activeChap.subtitle}
              </p>
            </div>

            <div className="w-12 h-px bg-[#8A7352]/40" />

            <div className="space-y-4 text-sm font-serif text-[#222222] leading-relaxed text-justify">
              {activeChap.prose.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Page Turn Controls */}
          <div className="pt-8 mt-6 border-t border-[#111111]/10 flex items-center justify-between">
            <button
              type="button"
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
              className="text-[10px] uppercase tracking-[0.24em] font-sans text-[#111111] disabled:opacity-30 disabled:pointer-events-none hover:text-[#8A7352] transition-colors py-1"
            >
              ← Previous Chapter
            </button>

            <span className="text-[10px] font-mono text-[#8A7352]">
              {currentIdx + 1} / {chapters.length}
            </span>

            <button
              type="button"
              disabled={currentIdx === chapters.length - 1}
              onClick={() =>
                setCurrentIdx((prev) => Math.min(chapters.length - 1, prev + 1))
              }
              className="text-[10px] uppercase tracking-[0.24em] font-sans text-[#111111] disabled:opacity-30 disabled:pointer-events-none hover:text-[#8A7352] transition-colors py-1"
            >
              Next Chapter →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
