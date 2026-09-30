"use client";

import React, { useState } from "react";
import Image from "next/image";
import { EditorialStory, getAllEditorialStories } from "@/lib/membership/private-collections-data";

interface ArchiveViewProps {
  onSelectStory: (story: EditorialStory) => void;
  onOpenSubmit: () => void;
}

interface PrintIssue {
  id: string;
  season: string;
  volumeNumber: string;
  title: string;
  subtitle: string;
  leadTopics: string[];
  coverImage: string;
  pageCount: number;
  binding: string;
  status: "In Circulation" | "Scheduled" | "Archive Reserved";
  publishedDate: string;
}

const PRINT_ISSUES: PrintIssue[] = [
  {
    id: "volume-01-spring",
    season: "Spring Edition",
    volumeNumber: "VOLUME 01 / 2026",
    title: "The Sovereignty of Form",
    subtitle:
      "A deep curatorial dive into early twentieth-century French couture ateliers, hand-hammered coachbuilt motor cars, and the monumental 962-carat Patiala diamond collar.",
    leadTopics: [
      "The Atelier Muslin: Inside Rue Cambon Haute Couture",
      "Barker & Clark: Hand-Hammered Ash-Frame Coachbuilds",
      "The De Beers Colossus: Resurrecting the Patiala Bib",
      "Patek Philippe Ref. 5270: Perpetual Chronometry",
    ],
    coverImage: "/images/style/hero/style-hero-couture-runway.jpg",
    pageCount: 248,
    binding: "Quarter-bound English buckram with gold hot-stamped typography",
    status: "In Circulation",
    publishedDate: "March 2026",
  },
  {
    id: "volume-02-summer",
    season: "Summer Edition",
    volumeNumber: "VOLUME 02 / 2026",
    title: "The Riviera & The Court",
    subtitle:
      "Architectural and nautical sovereignty: Villa d'Este on Lake Como, the mystery clocks of Maurice Coüet, and private Mediterranean dynastic flotillas.",
    leadTopics: [
      "Villa d'Este: 16th-Century Cardinal's Water Palace",
      "Cartier Model A: The Floating Hands of 1912",
      "Classic Riva Aquarama: Mahogany and V8 Symphony",
      "Bulgari Serpenti: Seven Decades of Sinuous Joaillerie",
    ],
    coverImage: "/images/private-world/06-palace/villa-d-este-como-01.jpg",
    pageCount: 264,
    binding: "Silver foil debossed Italian linen with silk ribbon marker",
    status: "In Circulation",
    publishedDate: "June 2026",
  },
  {
    id: "volume-03-autumn",
    season: "Autumn Edition",
    volumeNumber: "VOLUME 03 / 2026",
    title: "Grand Complications & The Forest",
    subtitle:
      "The zenith of mechanical craftsmanship: London bespoke sporting pairs, Geneva chiming repeaters, and private sporting estates of the Scottish Highlands.",
    leadTopics: [
      "James Purdey & Sons: The Damascus Steel Sidelock",
      "Audemars Piguet RD#4: The 23-Complication Marvel",
      "Dev Shree Deogarh: Living Custodianship in Rajasthan",
      "Nicolas-Noël Boutet: Versailles Presentation Flintlocks",
    ],
    coverImage: "/images/collections/arms/royal-garniture-flintlock-gun.jpg",
    pageCount: 288,
    binding: "Forest green archival buckram with gilt top edge",
    status: "In Circulation",
    publishedDate: "September 2026",
  },
  {
    id: "volume-annual-monograph",
    season: "Annual Monograph",
    volumeNumber: "SPECIAL COLLECTOR'S FOLIO",
    title: "Living Heritage: Dynasties, Toshakhanas & Haute Joaillerie",
    subtitle:
      "The definitive hardbound compendium reserved strictly for registered Fellows of The Royal Gallerys. Comprehensive provenance, museum archives, and auction records.",
    leadTopics: [
      "The Complete Inventory of Maharaja Bhupinder Singh's Regalia",
      "Boulle Marquetry in the Royal Collection Trust",
      "Vacheron Constantin Cabinotiers: Bespoke Celestial Horology",
      "The World's Surviving Pre-War Coachbuilt Bugattis",
    ],
    coverImage: "/images/private-world/02-vault/patiala-necklace-01.jpg",
    pageCount: 384,
    binding: "Slipcased hand-bound goatskin leather with numbered certificate",
    status: "Archive Reserved",
    publishedDate: "December 2026",
  },
];

export default function ArchiveView({ onSelectStory, onOpenSubmit }: ArchiveViewProps) {
  const [activeTab, setActiveTab] = useState<"volumes" | "stories" | "monographs">("volumes");
  const allStories = getAllEditorialStories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-16 animate-fadeIn">
      {/* ── ARCHIVE HEADER ── */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pb-8 border-b border-[#1E1E1E]">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111111] border border-[#222222] text-[9px] font-mono uppercase tracking-[0.3em] text-[#C5A880]">
          <span>EDITORIAL PUBLICATION MEMORY</span>
        </div>

        <h1
          className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#F7F5F0] font-normal tracking-tight"
          style={{ fontFamily: "var(--font-cormorant), serif" }}
        >
          The Publication Archive
        </h1>

        <div className="w-16 h-px bg-[#C5A880]/60 mx-auto" />

        <p className="text-sm sm:text-base font-serif italic text-[#A8A49C] leading-relaxed">
          The permanent record of The Royal Gallerys: seasonal print volumes dispatched to members,
          curated longform investigations, and authoritative monographs on high craft and living heritage.
        </p>
      </div>

      {/* ── ARCHIVE TABS ── */}
      <div className="flex border-b border-[#222222] text-xs font-mono tracking-widest uppercase overflow-x-auto justify-center">
        {[
          { id: "volumes", label: `PRINT VOLUMES (${PRINT_ISSUES.length})` },
          { id: "stories", label: `EDITORIAL FEATURES (${allStories.length})` },
          { id: "monographs", label: "CURATORIAL MONOGRAPHS" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-3.5 px-6 sm:px-10 whitespace-nowrap transition-all border-b-2 -mb-px text-[10px] sm:text-xs ${
              activeTab === tab.id
                ? "border-[#C5A880] text-[#F7F5F0] font-semibold"
                : "border-transparent text-[#666666] hover:text-[#AAAAAA]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── TAB 1: ANNUAL PRINT VOLUMES ── */}
      {activeTab === "volumes" && (
        <section className="space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#181818]">
            <div>
              <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-[#C5A880] block mb-1">
                PHYSICAL LIBRARY DISPATCH
              </span>
              <h2
                className="text-2xl sm:text-3xl font-serif text-[#F7F5F0]"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                The Three Annual Volumes & Monograph
              </h2>
            </div>
            <p className="text-xs font-mono text-[#888888] max-w-sm sm:text-right">
              Printed on archival 170gsm GardaMatt Art paper and delivered complimentary to registered
              member postal addresses worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {PRINT_ISSUES.map((issue) => (
              <div
                key={issue.id}
                className="bg-[#0A0A0A] border border-[#1E1E1E] hover:border-[#383838] transition-all p-6 sm:p-8 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-5">
                  {/* Issue Meta Header */}
                  <div className="flex items-center justify-between text-[9px] font-mono tracking-widest uppercase">
                    <span className="text-[#C5A880] font-semibold">{issue.volumeNumber}</span>
                    <span className="px-2 py-0.5 bg-[#141414] border border-[#262626] text-[#888888]">
                      {issue.publishedDate}
                    </span>
                  </div>

                  {/* Split Layout: Book Cover + Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
                    {/* Cover Frame */}
                    <div className="sm:col-span-5 relative aspect-[3/4] w-full bg-[#050505] border border-[#222222] shadow-2xl overflow-hidden group-hover:border-[#C5A880]/50 transition-colors">
                      <Image
                        src={issue.coverImage}
                        alt={issue.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3">
                        <span className="text-[8px] font-mono uppercase tracking-[0.25em] text-[#C5A880]">
                          ROYAL GALLERYS
                        </span>
                        <span className="text-xs font-serif text-white font-medium">
                          {issue.season}
                        </span>
                      </div>
                    </div>

                    {/* Book Metadata */}
                    <div className="sm:col-span-7 space-y-3">
                      <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-[#777777] block">
                        {issue.season}
                      </span>
                      <h3
                        className="text-xl sm:text-2xl font-serif text-[#F7F5F0] group-hover:text-[#C5A880] transition-colors leading-snug"
                        style={{ fontFamily: "var(--font-cormorant), serif" }}
                      >
                        {issue.title}
                      </h3>
                      <p className="text-xs font-serif text-[#A8A49C] leading-relaxed">
                        {issue.subtitle}
                      </p>

                      <div className="pt-2 text-[10px] font-mono text-[#777777] space-y-1">
                        <div>
                          Extent: <span className="text-[#CCCCCC]">{issue.pageCount} Pages</span>
                        </div>
                        <div className="line-clamp-2">
                          Binding: <span className="text-[#CCCCCC]">{issue.binding}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Table of Contents Excerpt */}
                  <div className="p-4 bg-[#0E0E0E] border border-[#1A1A1A] space-y-2">
                    <span className="text-[8px] font-mono uppercase tracking-[0.3em] text-[#C5A880] block">
                      Featured Monographic Chapters
                    </span>
                    <ul className="space-y-1 text-xs font-serif text-[#CCCCCC]">
                      {issue.leadTopics.map((topic, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-[#C5A880] text-[10px]">§</span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-[#181818] flex items-center justify-between text-xs font-mono">
                  <span className="text-[9px] text-[#666666] uppercase tracking-wider">
                    Status: <span className="text-[#A0A0A0]">{issue.status}</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A880] group-hover:translate-x-1 transition-transform">
                    Volume Dossier →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── TAB 2: LONGFORM EDITORIAL STORIES ── */}
      {activeTab === "stories" && (
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#181818]">
            <div>
              <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-[#C5A880] block mb-1">
                PUBLISHED EDITORIAL DOSSIERS
              </span>
              <h2
                className="text-2xl sm:text-3xl font-serif text-[#F7F5F0]"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Archived Stories & Heritage Investigations
              </h2>
            </div>
            <span className="text-xs font-mono text-[#888888]">
              {allStories.length} Investigations Published
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {allStories.map((story) => (
              <article
                key={story.id}
                onClick={() => onSelectStory(story)}
                className="group cursor-pointer bg-[#0A0A0A] border border-[#1E1E1E] hover:border-[#C5A880] transition-all p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-4">
                  {/* Hero Cover Frame */}
                  <div className="relative aspect-[16/10] w-full bg-[#050505] overflow-hidden border border-[#181818]">
                    <Image
                      src={story.heroImage}
                      alt={story.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-black/80 border border-white/10 text-[8px] font-mono uppercase tracking-widest text-[#C5A880]">
                      {story.category}
                    </div>
                  </div>

                  {/* Title & Metadata */}
                  <div className="space-y-2">
                    <div className="text-[9px] font-mono text-[#777777] uppercase tracking-wider flex items-center justify-between">
                      <span>{story.publishedDate}</span>
                      <span>{story.readTime}</span>
                    </div>

                    <h3
                      className="text-lg sm:text-xl font-serif text-[#F7F5F0] group-hover:text-[#C5A880] transition-colors leading-snug"
                      style={{ fontFamily: "var(--font-cormorant), serif" }}
                    >
                      {story.title}
                    </h3>

                    <p className="text-xs font-serif text-[#9E9B95] line-clamp-3 leading-relaxed">
                      {story.leadParagraph}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#181818] flex items-center justify-between text-[10px] font-mono text-[#888888] group-hover:text-[#F7F5F0]">
                  <span>Read Investigation</span>
                  <span className="text-[#C5A880] group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ── TAB 3: CURATORIAL MONOGRAPHS ── */}
      {activeTab === "monographs" && (
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#181818]">
            <div>
              <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-[#C5A880] block mb-1">
                FIELD RESEARCH & SCHOLARSHIP
              </span>
              <h2
                className="text-2xl sm:text-3xl font-serif text-[#F7F5F0]"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Curatorial Papers & Field Records
              </h2>
            </div>
            <button
              type="button"
              onClick={onOpenSubmit}
              className="text-xs font-mono uppercase tracking-widest text-[#C5A880] hover:text-white"
            >
              Submit Archival Lead +
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                id: "mono-1",
                code: "RG-MONO-001",
                title: "The Provenance of Mughal Jade Hilted Daggers in European Collections",
                department: "Arms & Armour / Islamic Art",
                summary:
                  "An exhaustive census of 47 documented nephrite jade hilts carved during the reigns of Jahangir and Shah Jahan, tracing their passage through British East India Company officers to modern museums.",
                date: "Published February 2026",
              },
              {
                id: "mono-2",
                code: "RG-MONO-002",
                title: "The Vanishing Ateliers: Hand-Stitched Saddlery & Coach Trimming",
                department: "Coachbuilding & Leathercraft",
                summary:
                  "A photographic and technical investigation into the remaining four master saddle-stitchers in Great Britain capable of restoring original Edwardian Rolls-Royce interior leatherwork.",
                date: "Published April 2026",
              },
              {
                id: "mono-3",
                code: "RG-MONO-003",
                title: "The Maharaja's Carriage: Rolls-Royce Phantom I 'The Pearl of the East'",
                department: "Automobile Provenance",
                summary:
                  "Original chassis records, factory build cards from Derby, and contemporary correspondence surrounding the 1928 custom Barker cabriolet commissioned for princely processions.",
                date: "Published July 2026",
              },
              {
                id: "mono-4",
                code: "RG-MONO-004",
                title: "Mystery Clocks of Maurice Coüet: Internal Mechanics & Optical Illusion",
                department: "Haute Horlogerie & Decorative Arts",
                summary:
                  "A mechanical analysis of how rock crystal discs geared to hidden perimeter shafts in the base allowed Cartier clocks to rotate floating hands without visible connection.",
                date: "Published August 2026",
              },
            ].map((m) => (
              <div
                key={m.id}
                className="p-6 bg-[#0A0A0A] border border-[#1E1E1E] hover:border-[#333333] transition-all space-y-3"
              >
                <div className="flex items-center justify-between text-[9px] font-mono tracking-widest uppercase">
                  <span className="text-[#C5A880]">{m.code}</span>
                  <span className="text-[#666666]">{m.department}</span>
                </div>
                <h3
                  className="text-lg font-serif text-[#F7F5F0] leading-snug"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  {m.title}
                </h3>
                <p className="text-xs font-serif text-[#9E9B95] leading-relaxed">
                  {m.summary}
                </p>
                <div className="pt-3 border-t border-[#161616] flex items-center justify-between text-[10px] font-mono text-[#777777]">
                  <span>{m.date}</span>
                  <span className="text-[#CCCCCC]">Confidential Member Document</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── SUBMISSION BANNER ── */}
      <div className="p-8 sm:p-10 bg-gradient-to-r from-[#0C0C0C] via-[#121212] to-[#0C0C0C] border border-[#222222] text-center space-y-4">
        <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-[#C5A880] block">
          CONTRIBUTE TO THE RECORD
        </span>
        <h3
          className="text-2xl sm:text-3xl font-serif text-[#F7F5F0]"
          style={{ fontFamily: "var(--font-cormorant), serif" }}
        >
          Have an Heirloom, Archival Object or Story to Document?
        </h3>
        <p className="text-xs sm:text-sm font-serif text-[#A8A49C] max-w-2xl mx-auto leading-relaxed">
          Members are invited to submit privately held heirlooms, historical photographs, or ancestral
          narratives for consideration in forthcoming print volumes and museum-grade digital monographs.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={onOpenSubmit}
            className="px-6 py-2.5 bg-[#C5A880] text-black text-xs font-mono uppercase tracking-widest font-semibold hover:bg-[#D4BC96] transition-colors"
          >
            Submit to the Editorial Board →
          </button>
        </div>
      </div>
    </div>
  );
}
