"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { CATALOG_ITEMS, CatalogItem } from "@/lib/membership/private-world-catalog";
import { getAllEditorialStories, EditorialStory } from "@/lib/membership/private-collections-data";

interface PrivateCatalogSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCatalogItem: (item: CatalogItem) => void;
  onSelectStory?: (story: EditorialStory) => void;
}

export default function PrivateCatalogSearch({
  isOpen,
  onClose,
  onSelectCatalogItem,
  onSelectStory,
}: PrivateCatalogSearchProps) {
  const [query, setQuery] = useState("");
  const allStories = useMemo(() => getAllEditorialStories(), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return CATALOG_ITEMS.slice(0, 8);
    const q = query.toLowerCase().trim();
    return CATALOG_ITEMS.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.subcategory.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  const filteredStories = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return allStories.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.subtitle.toLowerCase().includes(q)
    );
  }, [allStories, query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#050505]/90 backdrop-blur-md flex items-start justify-center p-4 sm:p-8 animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-[#0A0A0A] border border-[#222222] shadow-2xl p-6 sm:p-8 my-8 sm:my-16 z-10 text-[#F7F5F0]"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1C1C1C]">
          <div>
            <span className="text-[9px] uppercase tracking-[0.4em] font-mono text-[#C5A880] block">
              ROYAL GALLERYS · INTELLIGENCE SEARCH
            </span>
            <h3
              className="text-xl sm:text-2xl font-serif text-[#F7F5F0]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Curated Luxury & Archival Search
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-xs font-mono uppercase tracking-widest text-[#777777] hover:text-[#F7F5F0] p-1"
          >
            Esc ✕
          </button>
        </div>

        {/* Input */}
        <div className="my-6">
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search houses (Chanel, Patek, Cartier, Purdey, Rolls-Royce, Faberge), categories, specs..."
            className="w-full bg-[#111111] border border-[#262626] px-5 py-4 text-sm font-serif text-[#F7F5F0] focus:border-[#C5A880] focus:outline-none placeholder:font-mono placeholder:text-xs placeholder:text-[#666666]"
          />

          <div className="mt-2.5 flex flex-wrap gap-2 text-[9px] font-mono text-[#666666]">
            <span>Quick Filters:</span>
            {[
              "Chanel",
              "Patek Philippe",
              "Cartier",
              "Rolls-Royce",
              "Purdey",
              "Breguet",
              "Bulgari",
              "Dev Shree",
              "Fabergé",
            ].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setQuery(tag)}
                className="underline hover:text-[#C5A880] transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2">
          {/* Catalog Pieces */}
          <div className="space-y-3">
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#C5A880] block">
              {filteredItems.length} Catalog Creations
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectCatalogItem(item);
                    onClose();
                  }}
                  className="group cursor-pointer p-3 bg-[#0E0E0E] border border-[#1A1A1A] hover:border-[#C5A880] transition-all flex gap-3 items-center"
                >
                  <div className="relative w-16 h-16 shrink-0 bg-[#060606] overflow-hidden flex items-center justify-center border border-[#222222]">
                    <Image
                      src={item.heroImage}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-contain group-hover:scale-105 transition-transform duration-500 p-1"
                    />
                  </div>

                  <div className="space-y-0.5 overflow-hidden">
                    <span className="text-[8px] font-mono uppercase tracking-wider text-[#C5A880] block">
                      {item.brand} · {item.subcategory}
                    </span>
                    <h4
                      className="text-xs sm:text-sm font-serif text-[#F7F5F0] group-hover:text-[#C5A880] transition-colors truncate"
                      style={{ fontFamily: "var(--font-cormorant), serif" }}
                    >
                      {item.name}
                    </h4>
                    <p className="text-[10px] font-mono text-[#888888] truncate">
                      {item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Editorial Stories if matched */}
          {filteredStories.length > 0 && (
            <div className="space-y-3 pt-3 border-t border-[#1C1C1C]">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#C5A880] block">
                {filteredStories.length} Editorial Stories Found
              </span>

              <div className="space-y-2">
                {filteredStories.map((story) => (
                  <div
                    key={story.id}
                    onClick={() => {
                      if (onSelectStory) onSelectStory(story);
                      onClose();
                    }}
                    className="p-3 bg-[#0E0E0E] border border-[#1A1A1A] hover:border-[#C5A880] cursor-pointer flex justify-between items-center"
                  >
                    <div>
                      <span className="text-[8px] font-mono uppercase text-[#C5A880] block">
                        {story.category} · {story.readTime}
                      </span>
                      <h4
                        className="text-sm font-serif text-[#F7F5F0]"
                        style={{ fontFamily: "var(--font-cormorant), serif" }}
                      >
                        {story.title}
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-[#C5A880]">Read →</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
