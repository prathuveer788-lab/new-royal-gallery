"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PRIVATE_WORLDS } from "@/lib/membership/private-world-data";

interface PrivateWorldHeaderProps {
  activeTab: string;
  onSelectTab: (tabId: string) => void;
  memberName: string;
  membershipId: string;
  onOpenSearch: () => void;
  onOpenCredential: () => void;
  onSignOut: () => void;
  onReplayEntrance?: () => void;
}

export default function PrivateWorldHeader({
  activeTab,
  onSelectTab,
  memberName,
  membershipId,
  onOpenSearch,
  onOpenCredential,
  onSignOut,
  onReplayEntrance,
}: PrivateWorldHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const firstName = memberName ? memberName.trim().split(" ")[0] : "Member";

  return (
    <header className="sticky top-0 z-30 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#111111]/10">
      {/* ── TOP UTILITY & IDENTITY BAR ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
        {/* Brand Masthead */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-[10px] sm:text-[11px] uppercase tracking-[0.38em] font-sans font-semibold text-[#111111] hover:text-[#8A7352] transition-colors"
          >
            The Royal Gallerys
          </Link>
          <span className="text-[#8A7352]/40 hidden sm:inline">|</span>
          <span className="text-[9px] uppercase tracking-[0.25em] font-sans text-[#8A7352] hidden sm:inline font-medium">
            Private Members’ World
          </span>
        </div>

        {/* Member Identity & Actions */}
        <div className="flex items-center gap-4 text-xs font-sans">
          {/* Replay Entrance (Cinematic entrance replay) */}
          {onReplayEntrance && (
            <button
              type="button"
              onClick={onReplayEntrance}
              className="text-[10px] uppercase tracking-[0.2em] text-[#777777] hover:text-[#111111] transition-colors hidden md:block"
              title="Experience cinematic welcome entrance again"
            >
              Entrance ↺
            </button>
          )}

          {/* Search Trigger */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-[#555555] hover:text-[#111111] transition-colors px-2.5 py-1 rounded-xs border border-[#111111]/10 bg-white"
          >
            <span>⌕</span>
            <span className="hidden sm:inline">Search Universe</span>
          </button>

          {/* My Credential & Dossier Button */}
          <button
            type="button"
            onClick={onOpenCredential}
            className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium transition-all ${
              activeTab === "credential"
                ? "bg-[#111111] text-[#FAF8F5]"
                : "border border-[#8A7352]/50 text-[#8A7352] hover:bg-[#8A7352] hover:text-[#FAF8F5]"
            }`}
          >
            <span>My Credential</span>
          </button>

          {/* Member Badge */}
          <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-[#111111]/10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            <span className="text-[10px] uppercase tracking-widest text-[#111111] font-semibold">
              {firstName}
            </span>
            <span className="text-[9px] font-mono text-[#8A7352]">
              ({membershipId})
            </span>
          </div>

          {/* Sign Out */}
          <button
            type="button"
            onClick={onSignOut}
            className="text-[10px] uppercase tracking-wider text-[#888888] hover:text-red-700 transition-colors"
          >
            Sign Out
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="lg:hidden text-sm px-2 py-1 text-[#111111]"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* ── THE 10 WORLDS HORIZONTAL EDITORIAL STRIP ── */}
      <nav className="border-t border-[#111111]/5 overflow-x-auto no-scrollbar bg-white/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center gap-1 sm:gap-2 py-2 whitespace-nowrap text-[10px] sm:text-[11px] font-sans tracking-[0.18em] uppercase">
          {/* All Worlds / Living Cover Tab */}
          <button
            type="button"
            onClick={() => onSelectTab("all")}
            className={`px-3 py-1.5 transition-all ${
              activeTab === "all"
                ? "font-semibold text-[#111111] border-b-2 border-[#111111]"
                : "text-[#666666] hover:text-[#111111]"
            }`}
          >
            Living Cover
          </button>

          {/* The 10 Worlds */}
          {PRIVATE_WORLDS.map((world) => {
            const isActive = activeTab === world.id;
            return (
              <button
                key={world.id}
                type="button"
                onClick={() => onSelectTab(world.id)}
                className={`px-3 py-1.5 transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "font-semibold text-[#111111] border-b-2 border-[#111111]"
                    : "text-[#666666] hover:text-[#111111]"
                }`}
              >
                <span className="text-[9px] font-mono text-[#8A7352]">
                  {world.number}
                </span>
                <span>{world.title}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#111111]/20 p-6 space-y-4">
          <div className="pb-3 border-b border-[#111111]/10 flex items-center justify-between text-xs font-sans">
            <div>
              <p className="font-semibold text-[#111111]">{memberName}</p>
              <p className="font-mono text-[#8A7352] text-[10px]">{membershipId}</p>
            </div>
            <button
              onClick={() => {
                onOpenCredential();
                setMobileMenuOpen(false);
              }}
              className="px-3 py-1 bg-[#111111] text-[#FAF8F5] text-[10px] uppercase tracking-wider"
            >
              Card & Dossier
            </button>
          </div>

          <p className="text-[9px] uppercase tracking-[0.3em] text-[#8A7352] font-semibold">
            Select Private World
          </p>

          <div className="grid grid-cols-2 gap-2 text-[10px] font-sans uppercase tracking-wider">
            <button
              onClick={() => {
                onSelectTab("all");
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 text-left border ${
                activeTab === "all" ? "bg-white border-[#111111]" : "border-[#111111]/10"
              }`}
            >
              Living Cover
            </button>
            {PRIVATE_WORLDS.map((w) => (
              <button
                key={w.id}
                onClick={() => {
                  onSelectTab(w.id);
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 text-left border ${
                  activeTab === w.id ? "bg-white border-[#111111]" : "border-[#111111]/10"
                }`}
              >
                <span className="font-mono text-[#8A7352] text-[9px] block">
                  {w.number}
                </span>
                <span className="truncate block">{w.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
