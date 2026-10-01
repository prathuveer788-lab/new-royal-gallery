"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export type NavView = "discover" | "collections" | "stories" | "archive" | "submit" | "profile";

interface PrivateNavigationProps {
  activeView: NavView;
  onSelectView: (view: NavView) => void;
  memberName: string;
  membershipId: string;
  onOpenSearch: () => void;
  onToggleCollectionsDrawer: () => void;
  collectionsDrawerOpen: boolean;
  onSignOut: () => void;
}

export default function PrivateNavigation({
  activeView,
  onSelectView,
  memberName,
  membershipId,
  onOpenSearch,
  onToggleCollectionsDrawer,
  collectionsDrawerOpen,
  onSignOut,
}: PrivateNavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: { id: NavView; label: string; isDrawerTrigger?: boolean }[] = [
    { id: "discover", label: "DISCOVER" },
    { id: "collections", label: "COLLECTIONS", isDrawerTrigger: true },
    { id: "stories", label: "STORIES" },
    { id: "archive", label: "ARCHIVE" },
    { id: "submit", label: "SUBMIT" },
    { id: "profile", label: "PROFILE" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-[#060606]/95 backdrop-blur-md border-b border-[#1F1F1F]/80 py-3"
          : "bg-gradient-to-b from-[#060606] via-[#060606]/80 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
        {/* Left: Brand & Subtle Member Identity */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={() => {
              onSelectView("discover");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-left group"
          >
            <span
              className="text-xs sm:text-sm font-serif tracking-[0.25em] text-[#F7F5F0] uppercase font-medium block group-hover:text-[#C5A880] transition-colors"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              ROYAL GALLERYS
            </span>
            <span className="text-[8px] font-mono uppercase tracking-[0.35em] text-[#777777] block">
              PRIVATE WORLD
            </span>
          </button>

          {/* Vertical hairline divider */}
          <div className="w-px h-6 bg-[#222222] hidden sm:block" />

          {/* Member identity badge: [MEMBER NAME] / PRIVATE ACCESS */}
          <div className="hidden sm:flex items-center gap-2 text-[9px] font-mono uppercase tracking-widest text-[#888888]">
            <span className="text-[#C5A880] font-semibold truncate max-w-[140px] md:max-w-[180px]">
              {memberName ? memberName.trim().toUpperCase() : "MEMBER"}
            </span>
            <span className="text-[#444444]">/</span>
            <span className="text-[#999999]">PRIVATE ACCESS</span>
          </div>
        </div>

        {/* Center: Primary Navigation (Minimal, Architectural) */}
        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (item.isDrawerTrigger) {
                    onToggleCollectionsDrawer();
                  } else {
                    onSelectView(item.id);
                  }
                }}
                className={`group relative text-[10px] uppercase tracking-[0.28em] font-sans transition-all py-1 ${
                  isActive
                    ? "text-[#F7F5F0] font-semibold"
                    : "text-[#888888] hover:text-[#E0DFDC]"
                }`}
              >
                <span className="flex items-center gap-1">
                  <span>{item.label}</span>
                  {item.isDrawerTrigger && (
                    <span
                      className={`text-[8px] transition-transform duration-300 ${
                        collectionsDrawerOpen ? "rotate-180 text-[#C5A880]" : "text-[#555555]"
                      }`}
                    >
                      ▼
                    </span>
                  )}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-[#C5A880]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Search + Sign Out + Mobile Trigger */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Quick Search Trigger */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#111111] hover:bg-[#1A1A1A] border border-[#222222] text-[#888888] hover:text-[#F7F5F0] text-[9px] font-mono tracking-widest uppercase transition-all"
            title="Search Curated Catalog (Cmd+K)"
          >
            <svg
              className="w-3 h-3 text-[#777777]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="hidden md:inline">SEARCH</span>
            <kbd className="hidden sm:inline px-1 py-0.2 bg-[#060606] text-[#666666] text-[8px] border border-[#222222]">
              ⌘K
            </kbd>
          </button>

          {/* Visit Public Site / Magazine (Preserves member session completely) */}
          <Link
            href="/"
            className="text-[9px] font-mono uppercase tracking-widest text-[#B8A47A] hover:text-[#FAF8F5] border border-[#8A7352]/40 hover:border-[#C5A880] px-2.5 py-1.5 transition-all hidden sm:inline-flex items-center gap-1.5 bg-[#111111]/60"
            title="Explore Public Magazine (Stay Signed In)"
          >
            <span>PUBLIC SITE</span>
            <span className="text-[10px]">↗</span>
          </Link>

          {/* Explicit Sign Out */}
          <button
            type="button"
            onClick={onSignOut}
            className="text-[9px] font-mono uppercase tracking-widest text-[#666666] hover:text-red-400 transition-colors hidden sm:block"
            title="Sign Out of Private Circle"
          >
            SIGN OUT
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#CCCCCC] hover:text-white"
            aria-label="Toggle Menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span
                className={`w-full h-px bg-current transition-transform duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`w-full h-px bg-current transition-opacity duration-300 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-full h-px bg-current transition-transform duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-[#080808] border-b border-[#222222] p-6 space-y-5 animate-fadeIn">
          <div className="pb-3 border-b border-[#1C1C1C]">
            <span className="text-[9px] font-mono text-[#777777] uppercase tracking-wider block">
              MEMBER IDENTIFIER
            </span>
            <span className="text-xs font-mono text-[#C5A880] block mt-0.5">
              {memberName} ({membershipId})
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelectView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left p-3 border text-xs tracking-widest uppercase transition-all ${
                  activeView === item.id
                    ? "bg-[#141414] text-[#F7F5F0] border-[#C5A880]"
                    : "bg-[#0B0B0B] text-[#888888] border-[#1C1C1C] hover:border-[#333333]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 space-y-3 font-mono text-xs">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#C5A880] hover:text-[#FAF8F5] flex items-center justify-between p-3 bg-[#111111] border border-[#222222] transition-colors"
            >
              <span>Explore Public Magazine</span>
              <span>↗</span>
            </Link>

            <div className="flex justify-between items-center text-[#777777] px-1 pt-1">
              <button
                type="button"
                onClick={() => {
                  onOpenSearch();
                  setMobileMenuOpen(false);
                }}
                className="text-[#C5A880] hover:underline"
              >
                Search Catalog ⌘K
              </button>
              <button
                type="button"
                onClick={onSignOut}
                className="hover:text-red-400 transition-colors text-[11px] uppercase tracking-wider"
              >
                Sign Out →
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
