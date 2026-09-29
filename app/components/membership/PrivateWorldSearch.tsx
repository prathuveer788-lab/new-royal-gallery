"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { getAllStories, PrivateStory } from "@/lib/membership/private-world-data";

interface PrivateWorldSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStory: (story: PrivateStory) => void;
}

export default function PrivateWorldSearch({
  isOpen,
  onClose,
  onSelectStory,
}: PrivateWorldSearchProps) {
  const [query, setQuery] = useState("");
  const allStories = useMemo(() => getAllStories(), []);

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

  const filteredStories = useMemo(() => {
    if (!query.trim()) return allStories.slice(0, 8);
    const q = query.toLowerCase().trim();
    return allStories.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.subtitle.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q) ||
        s.period.toLowerCase().includes(q) ||
        s.worldTitle.toLowerCase().includes(q) ||
        (s.accessionId && s.accessionId.toLowerCase().includes(q)) ||
        (s.collection && s.collection.toLowerCase().includes(q))
    );
  }, [allStories, query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#111111]/75 backdrop-blur-md flex items-start justify-center p-4 sm:p-8 animate-fadeIn">
      <div className="fixed inset-0" onClick={onClose} />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-[#FAF8F5] border border-[#111111]/20 shadow-2xl p-6 sm:p-10 my-8 sm:my-16 z-10"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#111111]/10">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-sans text-[#8A7352] font-semibold block">
              The Royal Gallerys · Private Catalog
            </span>
            <h3
              className="text-xl sm:text-2xl font-serif text-[#111111]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Search The Heritage Universe
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-xs uppercase tracking-widest font-sans text-[#777777] hover:text-[#111111] p-1"
          >
            Esc ✕
          </button>
        </div>

        {/* Search Input Box */}
        <div className="my-6">
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search palaces, jewellery, automobiles, people, archives..."
            className="w-full bg-white border border-[#111111]/25 px-5 py-4 text-sm sm:text-base font-serif text-[#111111] focus:border-[#111111] focus:outline-none placeholder:font-sans placeholder:text-xs placeholder:text-[#888888] shadow-2xs"
          />
          <div className="mt-2 flex flex-wrap gap-2 text-[10px] font-sans text-[#777777]">
            <span>Suggested:</span>
            {["Devshree", "Cartier", "Rolls-Royce", "Balmoral", "Versailles", "Tiara", "Chatsworth"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setQuery(tag)}
                className="underline hover:text-[#111111]"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results List */}
        <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
          <span className="text-[9px] uppercase tracking-[0.25em] font-sans text-[#888888] block">
            {filteredStories.length} Editorial Stories Found
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredStories.map((story) => (
              <div
                key={story.id}
                onClick={() => {
                  onSelectStory(story);
                  onClose();
                }}
                className="group cursor-pointer p-3 bg-white border border-[#111111]/10 hover:border-[#111111] transition-all flex gap-3 items-center"
              >
                <div className="relative w-16 h-16 shrink-0 bg-[#141414] overflow-hidden flex items-center justify-center p-0.5 border border-[#111111]/10">
                  <div className="relative w-full h-full">
                    <Image
                      src={story.heroImage}
                      alt={story.title}
                      fill
                      sizes="64px"
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="space-y-0.5 overflow-hidden">
                  <span className="text-[8px] uppercase tracking-wider text-[#8A7352] font-mono block">
                    {story.worldNumber} · {story.worldTitle}
                  </span>
                  <h4
                    className="text-xs sm:text-sm font-serif text-[#111111] group-hover:text-[#8A7352] transition-colors truncate"
                    style={{ fontFamily: "var(--font-cormorant), serif" }}
                  >
                    {story.title}
                  </h4>
                  <p className="text-[10px] text-[#777777] font-sans truncate">
                    {story.location} · {story.period}
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
