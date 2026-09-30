"use client";

import React from "react";
import { CATALOG_CATEGORIES, CatalogCategoryDef } from "@/lib/membership/private-world-catalog";

interface CollectionsDiscoveryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export default function CollectionsDiscoveryDrawer({
  isOpen,
  onClose,
  selectedCategory,
  onSelectCategory,
}: CollectionsDiscoveryDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-fadeIn">
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-[#050505]/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Slide-down / Drop drawer container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 pt-20 pb-12 z-10">
        <div className="bg-[#0A0A0A] border border-[#222222] shadow-2xl p-6 sm:p-10 text-[#F7F5F0]">
          {/* Header */}
          <div className="flex items-end justify-between pb-6 border-b border-[#1C1C1C]">
            <div>
              <span className="text-[9px] uppercase tracking-[0.4em] font-mono text-[#C5A880] block mb-1">
                CONTEMPORARY DISCOVERY · 10 PRIVATE WORLDS
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
                  onSelectCategory("all");
                  onClose();
                }}
                className={`text-[10px] font-mono uppercase tracking-widest px-3 py-1.5 border transition-all ${
                  selectedCategory === "all"
                    ? "bg-[#C5A880] text-[#050505] border-[#C5A880] font-semibold"
                    : "bg-[#111111] text-[#AAAAAA] border-[#222222] hover:text-white"
                }`}
              >
                View All (100 Pieces)
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

          {/* 10 World Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
            {CATALOG_CATEGORIES.map((cat: CatalogCategoryDef) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <div
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    onClose();
                  }}
                  className={`group relative cursor-pointer p-4 border transition-all duration-300 flex flex-col justify-between h-48 bg-[#0E0E0E] ${
                    isSelected
                      ? "border-[#C5A880] ring-1 ring-[#C5A880]/50"
                      : "border-[#1F1F1F] hover:border-[#444444]"
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-[#C5A880] font-semibold">
                        {cat.number}
                      </span>
                      <span className="text-[8px] font-mono uppercase tracking-wider text-[#666666]">
                        10 Pieces
                      </span>
                    </div>

                    <h3
                      className="text-sm font-serif text-[#F7F5F0] group-hover:text-[#C5A880] transition-colors leading-tight line-clamp-2"
                      style={{ fontFamily: "var(--font-cormorant), serif" }}
                    >
                      {cat.title}
                    </h3>

                    <p className="text-[10px] font-sans text-[#888888] line-clamp-2 leading-relaxed">
                      {cat.subtitle}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#1C1C1C] flex items-center justify-between text-[9px] font-mono text-[#777777] group-hover:text-[#F7F5F0]">
                    <span>Explore World</span>
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
