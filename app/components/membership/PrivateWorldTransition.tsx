"use client";

import React, { useEffect, useState } from "react";

interface PrivateWorldTransitionProps {
  memberName: string;
  membershipId: string;
  onComplete: () => void;
}

export default function PrivateWorldTransition({
  memberName,
  membershipId,
  onComplete,
}: PrivateWorldTransitionProps) {
  const [phase, setPhase] = useState<"dark" | "identity" | "access" | "fadeout">("dark");

  useEffect(() => {
    // Sequence timing
    const t1 = setTimeout(() => setPhase("identity"), 300);
    const t2 = setTimeout(() => setPhase("access"), 1400);
    const t3 = setTimeout(() => setPhase("fadeout"), 2800);
    const t4 = setTimeout(() => onComplete(), 3400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#050505] text-[#F7F5F0] transition-opacity duration-700 ${
        phase === "fadeout" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Subtle obsidian noise / vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,25,25,0.4)_0%,#050505_80%)] pointer-events-none" />

      {/* Center content */}
      <div className="relative text-center max-w-2xl px-6 space-y-6 select-none">
        {/* Curatorial watermark */}
        <div
          className={`transition-all duration-700 transform ${
            phase !== "dark" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.5em] font-mono text-[#888888]">
            ROYAL GALLERYS · PRIVATE COLLECTIONS
          </span>
        </div>

        {/* Member Name */}
        <div
          className={`transition-all duration-700 transform delay-100 ${
            phase === "identity" || phase === "access" || phase === "fadeout"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#F7F5F0] tracking-tight font-normal uppercase"
            style={{ fontFamily: "var(--font-cormorant), 'Playfair Display', serif" }}
          >
            {memberName || "MEMBER"}
          </h1>
        </div>

        {/* Thin divider */}
        <div
          className={`w-12 h-px bg-[#C5A880]/50 mx-auto transition-all duration-700 ${
            phase === "access" || phase === "fadeout" ? "w-24 opacity-100" : "w-0 opacity-0"
          }`}
        />

        {/* PRIVATE ACCESS badge */}
        <div
          className={`transition-all duration-700 transform ${
            phase === "access" || phase === "fadeout"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3"
          }`}
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-[#333333] bg-[#0E0E0E]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.4em] text-[#C5A880]">
              PRIVATE ACCESS
            </span>
            <span className="text-[9px] font-mono text-[#666666] border-l border-[#222222] pl-3">
              {membershipId}
            </span>
          </div>
        </div>

        {/* Quick skip trigger in bottom right */}
        <button
          type="button"
          onClick={onComplete}
          className="absolute bottom-8 right-8 text-[9px] font-mono uppercase tracking-widest text-[#555555] hover:text-[#999999] transition-colors"
        >
          Skip Transition →
        </button>
      </div>
    </div>
  );
}
