"use client";

import React, { useState } from "react";
import Image from "next/image";
import type { Hotspot } from "@/lib/membership/private-world-data";

interface RoomHotspotViewerProps {
  imageSrc: string;
  imageAlt: string;
  hotspots: Hotspot[];
  roomTitle: string;
}

export default function RoomHotspotViewer({
  imageSrc,
  imageAlt,
  hotspots,
  roomTitle,
}: RoomHotspotViewerProps) {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(
    hotspots[0] || null
  );

  return (
    <div className="my-10 bg-white border border-[#111111]/15 overflow-hidden shadow-sm">
      {/* Header bar */}
      <div className="px-6 py-4 bg-[#FAF8F5] border-b border-[#111111]/10 flex items-center justify-between">
        <div>
          <span className="text-[9px] uppercase tracking-[0.3em] font-sans text-[#8A7352] font-semibold block">
            Interactive Room Examination
          </span>
          <h4
            className="text-base sm:text-lg font-serif text-[#111111]"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            {roomTitle}
          </h4>
        </div>
        <p className="text-[10px] uppercase tracking-[0.2em] font-sans text-[#777777] hidden sm:block">
          Click markers to inspect objects & provenance
        </p>
      </div>

      {/* Main Photographic Canvas with Hotspots */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-[#111111] overflow-hidden select-none">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 1000px"
          className="object-cover"
        />

        {/* Ambient overlay */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />

        {/* Interactive Hotspot Pins */}
        {hotspots.map((spot) => {
          const isSelected = selectedHotspot?.id === spot.id;
          return (
            <button
              key={spot.id}
              type="button"
              onClick={() => setSelectedHotspot(spot)}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group flex items-center justify-center transition-all duration-300 ${
                isSelected ? "scale-125 ring-4 ring-[#FAF8F5]" : "hover:scale-110"
              }`}
              title={spot.title}
            >
              {/* Outer pulsing ring */}
              <span className="absolute w-8 h-8 rounded-full bg-white/40 animate-ping pointer-events-none" />
              {/* Inner core pin */}
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shadow-lg transition-colors ${
                  isSelected
                    ? "bg-[#111111] text-[#FAF8F5] ring-2 ring-[#8A7352]"
                    : "bg-[#FAF8F5] text-[#111111] hover:bg-[#8A7352] hover:text-[#FAF8F5]"
                }`}
              >
                +
              </span>

              {/* Tooltip on hover */}
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-[#111111]/90 backdrop-blur-sm text-[#FAF8F5] text-[10px] font-sans uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
                {spot.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Hotspot Dossier Card */}
      {selectedHotspot && (
        <div className="p-6 sm:p-8 bg-[#FAF8F5] border-t border-[#111111]/10 transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="inline-block text-[9px] uppercase tracking-[0.28em] font-sans font-semibold text-[#8A7352] px-2 py-0.5 border border-[#8A7352]/30 bg-white">
                {selectedHotspot.category}
              </span>
              <h5
                className="text-xl sm:text-2xl font-serif text-[#111111] pt-1"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                {selectedHotspot.title}
              </h5>
              <p className="text-xs sm:text-sm font-sans text-[#444444] leading-relaxed pt-1 max-w-2xl">
                {selectedHotspot.description}
              </p>
            </div>

            <div className="sm:max-w-xs p-4 bg-white border border-[#111111]/10 text-xs font-sans space-y-1 shadow-2xs">
              <span className="text-[9px] uppercase tracking-[0.2em] font-sans font-semibold text-[#777777] block">
                Provenance Record
              </span>
              <p className="text-[#111111] italic font-serif text-xs leading-relaxed">
                {selectedHotspot.provenance}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
