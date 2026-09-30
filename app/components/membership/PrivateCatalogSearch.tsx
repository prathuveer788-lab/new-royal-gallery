"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { getAllCuratedObjects, CuratedObject } from "@/lib/membership/private-collections-data";

interface PrivateCatalogSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectObject: (obj: CuratedObject) => void;
}

export default function PrivateCatalogSearch({
  isOpen,
  onClose,
  onSelectObject,
}: PrivateCatalogSearchProps) {
  const [query, setQuery] = useState("");
  const allObjects = useMemo(() => getAllCuratedObjects(), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        // Toggle or focus
      }
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

  const filtered = useMemo(() => {
    if (!query.trim()) return allObjects.slice(0, 6);
    const q = query.toLowerCase().trim();
    return allObjects.filter(
      (o) =>
        o.title.toLowerCase().includes(q) ||
        o.house.toLowerCase().includes(q) ||
        o.subtitle.toLowerCase().includes(q) ||
        o.worldTitle.toLowerCase().includes(q) ||
        o.material.toLowerCase().includes(q) ||
        o.accessionOrRef.toLowerCase().includes(q) ||
        o.period.toLowerCase().includes(q)
    );
  }, [allObjects, query]);

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
              ROYAL GALLERYS · CURATORIAL SEARCH
            </span>
            <h3
              className="text-xl sm:text-2xl font-serif text-[#F7F5F0]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Search Private Collections
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
            placeholder="Search houses (Chanel, Patek, Cartier), references, materials, or periods..."
            className="w-full bg-[#111111] border border-[#262626] px-5 py-4 text-sm font-serif text-[#F7F5F0] focus:border-[#C5A880] focus:outline-none placeholder:font-mono placeholder:text-xs placeholder:text-[#666666]"
          />

          <div className="mt-2.5 flex flex-wrap gap-2 text-[9px] font-mono text-[#666666]">
            <span>Suggested:</span>
            {[
              "Schiaparelli",
              "Patek Philippe",
              "Cartier",
              "Rolls-Royce",
              "Bugatti",
              "Boulle",
              "Boutet",
              "Dev Shree",
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
        <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
          <span className="text-[9px] font-mono uppercase tracking-widest text-[#666666] block">
            {filtered.length} Curated Works Found
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filtered.map((obj) => (
              <div
                key={obj.id}
                onClick={() => {
                  onSelectObject(obj);
                  onClose();
                }}
                className="group cursor-pointer p-3 bg-[#0E0E0E] border border-[#1A1A1A] hover:border-[#C5A880] transition-all flex gap-3 items-center"
              >
                <div className="relative w-16 h-16 shrink-0 bg-[#060606] overflow-hidden flex items-center justify-center border border-[#222222]">
                  <Image
                    src={obj.image}
                    alt={obj.title}
                    fill
                    sizes="64px"
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-0.5 overflow-hidden">
                  <span className="text-[8px] font-mono uppercase tracking-wider text-[#C5A880] block">
                    {obj.house} · {obj.worldTitle}
                  </span>
                  <h4
                    className="text-xs sm:text-sm font-serif text-[#F7F5F0] group-hover:text-[#C5A880] transition-colors truncate"
                    style={{ fontFamily: "var(--font-cormorant), serif" }}
                  >
                    {obj.title}
                  </h4>
                  <p className="text-[10px] font-mono text-[#777777] truncate">
                    {obj.period} · {obj.price.amountINR}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
