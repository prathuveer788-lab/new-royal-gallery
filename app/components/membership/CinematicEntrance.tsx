"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface CinematicEntranceProps {
  memberName: string;
  membershipId: string;
  membershipType?: string;
  onEnter: () => void;
}

export default function CinematicEntrance({
  memberName,
  membershipId,
  membershipType = "LIFETIME MEMBER",
  onEnter,
}: CinematicEntranceProps) {
  const [mounted, setMounted] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const handleEnterClick = () => {
    setFading(true);
    setTimeout(() => {
      onEnter();
    }, 700);
  };

  const displayName = memberName ? memberName.trim().toUpperCase() : "ESTEEMED MEMBER";
  const displayId = membershipId || "RGC-003594";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#FAF8F5] transition-opacity duration-700 select-none ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* ── BACKGROUND PHOTOGRAPHIC COMPOSITION (LIGHT EDITORIAL TONALITY) ── */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/architectural-marvel-with-ornate-columns-arches.jpg"
          alt="The Royal Gallerys Private World"
          fill
          priority
          sizes="100vw"
          className={`object-cover object-center filter grayscale-[30%] brightness-[1.08] contrast-[0.95] transition-transform duration-[2400ms] ease-out ${
            mounted ? "scale-100" : "scale-105"
          }`}
        />
        {/* Soft daylight mist & ivory paper wash overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/85 via-[#FAF8F5]/65 to-[#FAF8F5]/92" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(250,248,245,0.7)_80%)]" />
      </div>

      {/* ── MINIMAL EDITORIAL TYPOGRAPHY & ENTRANCE SEQUENCE ── */}
      <div
        className={`relative z-10 max-w-3xl mx-auto px-6 text-center transition-all duration-1000 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Subtle Masthead */}
        <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.45em] font-sans font-medium text-[#8A7352] mb-3">
          The Royal Gallerys
        </p>

        {/* Cursive Subtitle */}
        <p
          className="text-lg sm:text-xl font-serif italic text-[#444444] mb-8"
          style={{ fontFamily: "var(--font-cormorant), 'Playfair Display', serif" }}
        >
          Private Members’ World
        </p>

        {/* Hairline Divider */}
        <div className="w-12 h-px mx-auto bg-[#8A7352]/40 mb-8" />

        {/* Member Welcome */}
        <h1
          className="text-3xl sm:text-5xl md:text-6xl font-serif font-normal text-[#111111] tracking-tight leading-[1.08] mb-4"
          style={{ fontFamily: "var(--font-cormorant), 'Playfair Display', serif" }}
        >
          Welcome, {displayName}
        </h1>

        {/* Small Supporting Metadata */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.28em] text-[#777777] mb-12">
          <span>Member</span>
          <span className="text-[#8A7352]">·</span>
          <span>{membershipType}</span>
          <span className="text-[#8A7352]">·</span>
          <span className="font-mono text-[#111111]">{displayId}</span>
        </div>

        {/* Quiet, Cinematic Entry Button */}
        <div>
          <button
            type="button"
            onClick={handleEnterClick}
            className="group relative inline-flex items-center gap-3 px-10 sm:px-14 py-4 text-xs uppercase tracking-[0.28em] font-sans font-medium transition-all duration-500 bg-[#111111] text-[#FAF8F5] hover:bg-[#8A7352] hover:shadow-lg"
          >
            <span>Enter The Private World</span>
            <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
          </button>
        </div>

        {/* Subtle Footer Citation */}
        <p className="mt-12 text-[9px] uppercase tracking-[0.24em] font-sans text-[#888888]">
          Stories of heritage, royalty, people, places and objects · Curated beyond the obvious
        </p>
      </div>
    </div>
  );
}
