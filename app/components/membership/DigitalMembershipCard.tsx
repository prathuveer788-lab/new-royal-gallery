"use client";

import React, { useState } from "react";
import Image from "next/image";

interface DigitalMembershipCardProps {
  fullName: string;
  membershipId: string;
  joinedDate?: string;
  status?: string;
  compact?: boolean;
}

export default function DigitalMembershipCard({
  fullName,
  membershipId,
  status = "ACTIVE",
  compact = false,
}: DigitalMembershipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);

  const displayId = membershipId || "RGC-003594";
  const displayName = fullName ? fullName.trim().toUpperCase() : "PATRON OF LIVING HERITAGE";

  const handleCopyId = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(displayId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* ── CARD PERSPECTIVE CONTAINER (Slightly zoomed out for refined editorial luxury) ── */}
      <div
        className={`relative w-full ${
          compact ? "max-w-[380px]" : "max-w-[460px] sm:max-w-[490px]"
        } perspective-[1200px] select-none mx-auto`}
      >
        {/* 3D FLIPPABLE CARD WRAPPER */}
        <div
          onClick={() => setIsFlipped((prev) => !prev)}
          className="relative w-full aspect-[479/314] cursor-pointer transition-transform duration-700 ease-out preserve-3d group shadow-2xl rounded-[12px] sm:rounded-[16px]"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
          title="Click to view reverse side of card"
        >
          {/* ════════════════════════════════════════════════
              FRONT OF CARD (CLEAN LUXURY EMERALD & GOLD BASE)
              ════════════════════════════════════════════════ */}
          <div
            className="@container absolute inset-0 w-full h-full rounded-[12px] sm:rounded-[16px] overflow-hidden backface-hidden"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            {/* Base Cropped Card Asset */}
            <Image
              src="/images/membership/card-front-base.png"
              alt="The Royal Gallerys Lifetime Membership Card"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-cover pointer-events-none"
            />

            {/* Subtle Metallic Sheen on Hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* ── DYNAMIC 1: MEMBER FULL NAME ── */}
            {/* Perfectly centered horizontally and placed in the open space directly above "MEMBERSHIP CARD" */}
            <div
              className="absolute inset-x-0 w-full text-center pointer-events-none z-20 flex flex-col items-center justify-center px-4"
              style={{
                top: "52%",
                transform: "translateY(-50%)",
              }}
            >
              <span
                className="block font-serif font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-center"
                style={{
                  fontFamily: "var(--font-cormorant), var(--font-playfair), 'Cinzel', Georgia, serif",
                  fontSize: "clamp(10px, 3.4cqw, 17.5px)",
                  color: "#DFC498",
                  textShadow:
                    "0 1px 2px rgba(0, 0, 0, 0.95), 0 0 1px rgba(255, 245, 220, 0.35)",
                  maxWidth: "88%",
                  margin: "0 auto",
                  textAlign: "center",
                }}
              >
                {displayName}
              </span>
            </div>

            {/* ── DYNAMIC 2: MEMBER ID ── */}
            {/* Positioned directly under "MEMBER ID" header in matching gold serif */}
            <div
              className="absolute pointer-events-none z-20 text-center flex flex-col items-center justify-center"
              style={{
                left: "5.4%",
                width: "16.8%",
                top: "92.8%",
                transform: "translateY(-50%)",
              }}
            >
              <span
                className="block font-serif font-bold uppercase tracking-[0.12em] text-center w-full"
                style={{
                  fontFamily: "var(--font-cormorant), var(--font-playfair), 'Cinzel', Georgia, serif",
                  fontSize: "clamp(7px, 2.1cqw, 11px)",
                  color: "#DFC498",
                  textShadow:
                    "0 1px 2px rgba(0, 0, 0, 0.95), 0 0 1px rgba(255, 245, 220, 0.35)",
                  textAlign: "center",
                }}
              >
                {displayId}
              </span>
            </div>

            {/* ── DYNAMIC 3: VALID UNTIL (LIFETIME) ── */}
            {/* Positioned directly under "VALID UNTIL" header in matching gold serif */}
            <div
              className="absolute pointer-events-none z-20 text-center flex flex-col items-center justify-center"
              style={{
                left: "75.8%",
                width: "19.0%",
                top: "92.8%",
                transform: "translateY(-50%)",
              }}
            >
              <span
                className="block font-serif font-bold uppercase tracking-[0.12em] text-center w-full"
                style={{
                  fontFamily: "var(--font-cormorant), var(--font-playfair), 'Cinzel', Georgia, serif",
                  fontSize: "clamp(7px, 2.1cqw, 11px)",
                  color: "#DFC498",
                  textShadow:
                    "0 1px 2px rgba(0, 0, 0, 0.95), 0 0 1px rgba(255, 245, 220, 0.35)",
                  textAlign: "center",
                }}
              >
                LIFETIME
              </span>
            </div>
          </div>

          {/* ════════════════════════════════════════════════
              BACK OF CARD (HERITAGE CREST & MOTTO)
              ════════════════════════════════════════════════ */}
          <div
            className="absolute inset-0 w-full h-full rounded-[12px] sm:rounded-[16px] overflow-hidden backface-hidden"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <Image
              src="/images/membership/card-back-base.png"
              alt="The Royal Gallerys Crest Reverse"
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-cover pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* ── CARD CONTROLS (NO DOWNLOAD BUTTON AS STRICTLY REQUESTED) ── */}
      <div className="mt-5 flex items-center justify-between w-full max-w-[460px] sm:max-w-[490px] px-1 text-xs font-sans">
        <button
          type="button"
          onClick={() => setIsFlipped((prev) => !prev)}
          className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-[#8A7352] hover:text-[#111111] transition-colors py-1"
        >
          <span>↺</span>
          <span>{isFlipped ? "View Front Credential" : "View Royal Crest Reverse"}</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCopyId}
            className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-[#666666] hover:text-[#111111] transition-colors py-1"
          >
            <span>{copied ? "✓ Copied" : "Copy Member ID"}</span>
          </button>

          <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}
