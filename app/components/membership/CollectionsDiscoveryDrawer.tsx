"use client";

import React from "react";
import Image from "next/image";
import { WORLD_DEFINITIONS, WorldId } from "@/lib/membership/private-collections-data";

interface CollectionsDiscoveryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedWorld: WorldId | "all";
  onSelectWorld: (worldId: WorldId | "all") => void;
}

export default function CollectionsDiscoveryDrawer({
  isOpen,
  onClose,
  selectedWorld,
  onSelectWorld,
}: CollectionsDiscoveryDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-[#050505]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Slide-down / Drop drawer container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 pt-20 pb-12 z-10">
        <div className="bg-[#0A0A0A] border border-[#222222] shadow-2xl p-6 sm:p-10 text-[#F7F5F0]">
          {/* Header */}
          <div className="flex items-end justify-between pb-6 border-b border-[#1C1C1C]">
            <div>
              <span className="text-[9px] uppercase tracking-[0.4em] font-mono text-[#C5A880] block mb-1">
                PROGRESSIVE DISCOVERY · 09 PRIVATE WORLDS
              </span>
              <h2
                className="text-2xl sm:text-4xl font-serif text-[#F7F5F0] tracking-tight font-normal"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                The Curatorial Collections
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  onSelectWorld("all");
                  onClose();
                }}
                className={`text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 border transition-all ${
                  selectedWorld === "all"
                    ? "bg-[#C5A880] text-[#050505] border-[#C5A880] font-semibold"
                    : "bg-[#111111] text-[#AAAAAA] border-[#222222] hover:text-white"
                }`}
              >
                View All Collections
              </button>

              <button
                type="button"
                onClick={onClose}
                className="text-xs font-mono text-[#777777] hover:text-white p-1"
                aria-label="Close Drawer"
              >
                ✕ Close
              </button>
            </div>
          </div>

          {/* 9 World Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8">
            {WORLD_DEFINITIONS.map((w) => {
              const isSelected = selectedWorld === w.id;
              return (
                <div
                  key={w.id}
                  onClick={() => {
                    onSelectWorld(w.id);
                    onClose();
                  }}
                  className={`group relative cursor-pointer p-5 border transition-all duration-300 flex flex-col justify-between h-56 bg-[#0E0E0E] ${
                    isSelected
                      ? "border-[#C5A880] ring-1 ring-[#C5A880]/40"
                      : "border-[#1F1F1F] hover:border-[#444444]"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-[#C5A880] font-semibold">
                        {w.number}
                      </span>
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#666666]">
                        {w.frenchTitle}
                      </span>
                    </div>

                    <h3
                      className="text-base sm:text-lg font-serif text-[#F7F5F0] group-hover:text-[#C5A880] transition-colors leading-snug"
                      style={{ fontFamily: "var(--font-cormorant), serif" }}
                    >
                      {w.title}
                    </h3>

                    <p className="text-[11px] font-sans text-[#888888] line-clamp-2 leading-relaxed">
                      {w.tagline}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#1C1C1C] flex items-center justify-between text-[10px] font-mono text-[#777777] group-hover:text-[#F7F5F0]">
                    <span>Enter World</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
