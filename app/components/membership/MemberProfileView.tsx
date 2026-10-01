"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import DigitalMembershipCard from "./DigitalMembershipCard";
import { CATALOG_ITEMS, CatalogItem } from "@/lib/membership/private-world-catalog";
import { EditorialStory, getAllEditorialStories } from "@/lib/membership/private-collections-data";
import type { SafeMember, EditorialSubmission } from "@/lib/membership/store";

interface MemberProfileViewProps {
  member: SafeMember | null;
  savedCatalogIds: string[];
  savedStoryIds: string[];
  submissions: EditorialSubmission[];
  onSelectCatalogItem: (item: CatalogItem) => void;
  onSelectStory: (story: EditorialStory) => void;
  onRemoveSavedCatalogItem: (id: string) => void;
  onRemoveSavedStory: (id: string) => void;
  onUpdateProfile: (data: any) => Promise<void>;
  onNavigateToDiscover: () => void;
  onNavigateToSubmit: () => void;
}

export default function MemberProfileView({
  member,
  savedCatalogIds,
  savedStoryIds,
  submissions,
  onSelectCatalogItem,
  onSelectStory,
  onRemoveSavedCatalogItem,
  onRemoveSavedStory,
  onUpdateProfile,
  onNavigateToDiscover,
  onNavigateToSubmit,
}: MemberProfileViewProps) {
  const [activeTab, setActiveTab] = useState<"card" | "saved" | "submissions" | "dispatch">("card");

  // Dispatch Form State
  const [phone, setPhone] = useState(member?.phone || "");
  const [street, setStreet] = useState(member?.address?.street || "");
  const [city, setCity] = useState(member?.address?.city || "");
  const [state, setState] = useState(member?.address?.state || "");
  const [pincode, setPincode] = useState(member?.address?.pincode || "");
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  // Resolving Saved Catalog Items
  const savedItems = useMemo(() => {
    return CATALOG_ITEMS.filter((item) => savedCatalogIds.includes(item.id));
  }, [savedCatalogIds]);

  // Resolving Saved Stories
  const savedStories = useMemo(() => {
    const all = getAllEditorialStories();
    return all.filter((s) => savedStoryIds.includes(s.id));
  }, [savedStoryIds]);

  const handleSaveDispatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg("");
    try {
      await onUpdateProfile({
        phone,
        address: { street, city, state, pincode },
      });
      setStatusMsg("✓ Confidential delivery address updated successfully for physical print volumes.");
    } catch (err: any) {
      setStatusMsg(err.message || "Failed to update dispatch record.");
    } finally {
      setSaving(false);
    }
  };

  const upperFullName = member?.fullName ? member.fullName.trim().toUpperCase() : "PRIVATE MEMBER";
  const initials = member?.fullName
    ? member.fullName
        .trim()
        .toUpperCase()
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
    : "RG";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-12 animate-fadeIn">
      {/* ── PROFILE SANCTUARY HEADER ── */}
      <div className="text-center max-w-3xl mx-auto space-y-4 pb-8 border-b border-[#1C1C1C]">
        {/* Sovereign Member Monogram Medallion */}
        <div className="w-16 h-16 rounded-full border border-[#C5A880]/50 bg-gradient-to-b from-[#181818] via-[#111111] to-[#0A0A0A] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(197,168,128,0.15)] ring-1 ring-[#C5A880]/20">
          <span
            className="font-serif text-[#DFC498] text-xl tracking-[0.25em] font-semibold pl-1"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            {initials}
          </span>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#121212] border border-[#262626] text-[9px] font-mono uppercase tracking-[0.35em] text-[#C5A880]">
          <span>MEMBER SANCTUARY & CREDENTIAL</span>
        </div>

        <h1
          className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#F7F5F0] font-normal uppercase tracking-[0.08em]"
          style={{ fontFamily: "var(--font-cormorant), serif" }}
        >
          {upperFullName}
        </h1>

        <div className="flex items-center justify-center gap-3">
          <div className="w-14 h-px bg-gradient-to-r from-transparent to-[#C5A880]/60" />
          <span className="text-[#C5A880] text-xs">✦</span>
          <div className="w-14 h-px bg-gradient-to-l from-transparent to-[#C5A880]/60" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#888888] uppercase tracking-wider">
          <span>
            ID: <span className="text-[#C5A880] font-semibold">{member?.membershipId || "RGC-003594"}</span>
          </span>
          <span className="text-[#444444]">·</span>
          <span>Standing: <span className="text-[#55B374]">Active Fellow</span></span>
          <span className="text-[#444444]">·</span>
          <span>Tier: <span className="text-[#CCCCCC]">Living Heritage Patron ({member?.membershipType || "LIFETIME"})</span></span>
          <span className="text-[#444444]">·</span>
          <span>Access: <span className="text-[#C5A880]">Salon Privé Clearance</span></span>
        </div>
      </div>

      {/* ── TABS ── */}
      <div className="flex border-b border-[#222222] text-xs font-mono tracking-widest uppercase overflow-x-auto justify-center gap-1 sm:gap-2">
        {[
          { id: "card", label: "DIGITAL PATRON CREDENTIAL" },
          { id: "saved", label: `SAVED FOLIO (${savedItems.length + savedStories.length})` },
          { id: "submissions", label: `EDITORIAL INTAKE (${submissions.length})` },
          { id: "dispatch", label: "DISPATCH ADDRESS & DOSSIER" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-3.5 px-4 sm:px-7 whitespace-nowrap transition-all border-b-2 -mb-px text-[10px] sm:text-xs tracking-[0.2em] ${
              activeTab === tab.id
                ? "border-[#C5A880] text-[#F7F5F0] font-semibold bg-[#121212]/50"
                : "border-transparent text-[#666666] hover:text-[#CCCCCC]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── TAB 1: DIGITAL MEMBERSHIP CARD ── */}
      {activeTab === "card" && (
        <section className="space-y-8 max-w-2xl mx-auto text-center">
          <div className="space-y-2">
            <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#C5A880] block">
              OFFICIAL PATRON CREDENTIAL
            </span>
            <p className="text-xs sm:text-sm font-serif italic text-[#9E9B95]">
              Click the card to inspect the reverse side with encrypted verification cipher and sovereign seal.
            </p>
          </div>

          {/* Card Component */}
          <div className="py-4">
            <DigitalMembershipCard
              fullName={upperFullName}
              membershipId={member?.membershipId || "RGC-003594"}
              joinedDate={member?.createdAt}
              status="ACTIVE"
            />
          </div>

          <div className="p-4 bg-[#0A0A0A] border border-[#1E1E1E] text-left text-xs font-mono text-[#888888] space-y-2">
            <div className="text-[10px] uppercase tracking-widest text-[#C5A880]">
              Privileges of Fellow Standing
            </div>
            <ul className="space-y-1 list-disc list-inside text-[#AAAAAA] text-[11px]">
              <li>Guaranteed seasonal delivery of the three hardcover Royal Gallerys volumes</li>
              <li>Invitation to private salon viewings at Place Vendôme and London gunmakers</li>
              <li>Perpetual digital access to high-resolution scans of royal toshakhana archives</li>
              <li>Direct curatorial review channel for member-held heirlooms</li>
            </ul>
          </div>
        </section>
      )}

      {/* ── TAB 2: MY SAVED FOLIO ── */}
      {activeTab === "saved" && (
        <section className="space-y-10">
          {/* Saved Catalog Pieces */}
          <div className="space-y-6">
            <div className="flex items-end justify-between border-b border-[#181818] pb-3">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#C5A880] block">
                  CURATED LUXURY SELECTIONS
                </span>
                <h3
                  className="text-xl sm:text-2xl font-serif text-[#F7F5F0]"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  Saved Catalog Pieces ({savedItems.length})
                </h3>
              </div>
              {savedItems.length === 0 && (
                <button
                  type="button"
                  onClick={onNavigateToDiscover}
                  className="text-xs font-mono uppercase text-[#C5A880] hover:underline"
                >
                  Explore Catalog →
                </button>
              )}
            </div>

            {savedItems.length === 0 ? (
              <div className="p-12 text-center bg-[#090909] border border-[#1A1A1A] space-y-3">
                <p className="text-sm font-serif text-[#777777]">
                  No pieces saved to your folio yet. Explore the contemporary discovery collections to curate your personal archive.
                </p>
                <button
                  type="button"
                  onClick={onNavigateToDiscover}
                  className="px-5 py-2 bg-[#141414] hover:bg-[#202020] text-xs font-mono uppercase tracking-widest text-[#C5A880] border border-[#2B2B2B]"
                >
                  Browse Discovery Catalog
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedItems.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-[#0A0A0A] border border-[#1E1E1E] hover:border-[#C5A880] transition-all p-4 flex flex-col justify-between"
                  >
                    <div
                      onClick={() => onSelectCatalogItem(item)}
                      className="cursor-pointer space-y-3"
                    >
                      <div className="relative aspect-[4/3] w-full bg-[#050505] overflow-hidden border border-[#181818]">
                        <Image
                          src={item.heroImage}
                          alt={item.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-[#C5A880] block">
                          {item.brand} · {item.subcategory}
                        </span>
                        <h4
                          className="text-base font-serif text-[#F7F5F0] group-hover:text-[#C5A880] transition-colors leading-snug line-clamp-2 mt-1"
                          style={{ fontFamily: "var(--font-cormorant), serif" }}
                        >
                          {item.name}
                        </h4>
                        <span className="text-xs font-mono text-[#AAAAAA] block mt-1">
                          {item.price}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[#181818] flex items-center justify-between text-[10px] font-mono">
                      <button
                        type="button"
                        onClick={() => onRemoveSavedCatalogItem(item.id)}
                        className="text-[#777777] hover:text-red-400 uppercase tracking-wider"
                      >
                        Remove
                      </button>
                      <button
                        type="button"
                        onClick={() => onSelectCatalogItem(item)}
                        className="text-[#C5A880] uppercase tracking-wider"
                      >
                        Inspect Piece →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Saved Editorial Stories */}
          {savedStories.length > 0 && (
            <div className="space-y-6 pt-6 border-t border-[#1E1E1E]">
              <div className="border-b border-[#181818] pb-3">
                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#C5A880] block">
                  BOOKMARKED READS
                </span>
                <h3
                  className="text-xl sm:text-2xl font-serif text-[#F7F5F0]"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  Saved Editorial Stories ({savedStories.length})
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedStories.map((story) => (
                  <div
                    key={story.id}
                    className="p-5 bg-[#0A0A0A] border border-[#1E1E1E] flex flex-col justify-between space-y-4"
                  >
                    <div
                      onClick={() => onSelectStory(story)}
                      className="cursor-pointer space-y-2"
                    >
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#C5A880]">
                        {story.category} · {story.readTime}
                      </span>
                      <h4
                        className="text-lg font-serif text-[#F7F5F0] hover:text-[#C5A880] transition-colors"
                        style={{ fontFamily: "var(--font-cormorant), serif" }}
                      >
                        {story.title}
                      </h4>
                      <p className="text-xs font-serif text-[#888888] line-clamp-2">
                        {story.leadParagraph}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-mono pt-3 border-t border-[#161616]">
                      <button
                        type="button"
                        onClick={() => onRemoveSavedStory(story.id)}
                        className="text-[#666666] hover:text-red-400"
                      >
                        Remove
                      </button>
                      <button
                        type="button"
                        onClick={() => onSelectStory(story)}
                        className="text-[#C5A880]"
                      >
                        Read Investigation →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* ── TAB 3: SUBMISSIONS TRACKER ── */}
      {activeTab === "submissions" && (
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#181818]">
            <div>
              <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-[#C5A880] block mb-1">
                EDITORIAL INTAKE RECORD
              </span>
              <h2
                className="text-2xl sm:text-3xl font-serif text-[#F7F5F0]"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Your Archival & Story Submissions
              </h2>
            </div>
            <button
              type="button"
              onClick={onNavigateToSubmit}
              className="px-4 py-2 bg-[#C5A880] text-black text-xs font-mono uppercase tracking-widest font-semibold hover:bg-[#D4BC96] transition-colors"
            >
              New Submission +
            </button>
          </div>

          {submissions.length === 0 ? (
            <div className="p-12 text-center bg-[#090909] border border-[#1A1A1A] space-y-4">
              <span className="text-3xl block">📜</span>
              <h4
                className="text-lg font-serif text-[#E0DFDC]"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                No Archival Submissions on Record
              </h4>
              <p className="text-xs sm:text-sm font-serif text-[#777777] max-w-md mx-auto">
                Do you hold an ancestral heirloom, private vintage automobile, or unpublished archival record?
                Submit it for curatorial appraisal and inclusion in future print volumes.
              </p>
              <button
                type="button"
                onClick={onNavigateToSubmit}
                className="px-5 py-2 bg-[#141414] hover:bg-[#202020] text-xs font-mono uppercase tracking-widest text-[#C5A880] border border-[#2B2B2B]"
              >
                Submit Archival Item Now
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-5 bg-[#0A0A0A] border border-[#1E1E1E] flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#C5A880]">
                        {sub.category || "HERITAGE"}
                      </span>
                      <span className="text-[9px] font-mono text-[#555555]">·</span>
                      <span className="text-[9px] font-mono text-[#777777]">
                        Submitted {new Date(sub.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h4
                      className="text-lg font-serif text-[#F7F5F0]"
                      style={{ fontFamily: "var(--font-cormorant), serif" }}
                    >
                      {sub.title}
                    </h4>
                    <p className="text-xs font-serif text-[#888888] line-clamp-2 max-w-2xl">
                      {sub.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span
                      className={`px-3 py-1 border text-[10px] uppercase tracking-widest ${
                        sub.status === "Accepted" || sub.status === "Published"
                          ? "bg-emerald-950/40 text-emerald-300 border-emerald-800"
                          : sub.status === "Under Editorial Review"
                          ? "bg-amber-950/40 text-amber-300 border-amber-800"
                          : "bg-neutral-900 text-neutral-400 border-neutral-800"
                      }`}
                    >
                      {sub.status || "Submitted"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ── TAB 4: CONFIDENTIAL PRINT DISPATCH DOSSIER ── */}
      {activeTab === "dispatch" && (
        <section className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-2 text-center">
            <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#C5A880] block">
              POSTAL LOGISTICS DOSSIER
            </span>
            <h3
              className="text-2xl font-serif text-[#F7F5F0]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Print Volume Dispatch Destination
            </h3>
            <p className="text-xs sm:text-sm font-serif italic text-[#888888]">
              All three annual physical hardbound volumes and the Collector&apos;s Monograph are securely
              shipped via white-glove courier to this confidential address.
            </p>
          </div>

          {statusMsg && (
            <div
              className={`p-4 text-xs font-mono text-center border ${
                statusMsg.startsWith("✓")
                  ? "bg-emerald-950/30 text-emerald-300 border-emerald-800"
                  : "bg-red-950/30 text-red-300 border-red-800"
              }`}
            >
              {statusMsg}
            </div>
          )}

          <form onSubmit={handleSaveDispatch} className="space-y-5 bg-[#0A0A0A] border border-[#1E1E1E] p-6 sm:p-8">
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-[#777777] block">
                Primary Contact Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2.5 bg-[#121212] border border-[#2B2B2B] text-xs font-mono text-[#F7F5F0] focus:border-[#C5A880] focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-[#777777] block">
                Street / Estate / Residence Address
              </label>
              <textarea
                rows={3}
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Palace / Haveli / Apartment, Suite / Road"
                className="w-full px-4 py-2.5 bg-[#121212] border border-[#2B2B2B] text-xs font-mono text-[#F7F5F0] focus:border-[#C5A880] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-[#777777] block">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Jaipur / New Delhi / London"
                  className="w-full px-4 py-2.5 bg-[#121212] border border-[#2B2B2B] text-xs font-mono text-[#F7F5F0] focus:border-[#C5A880] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-[#777777] block">
                  State / Region
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="Rajasthan"
                  className="w-full px-4 py-2.5 bg-[#121212] border border-[#2B2B2B] text-xs font-mono text-[#F7F5F0] focus:border-[#C5A880] focus:outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-[#777777] block">
                  Postal Pincode
                </label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="302001"
                  className="w-full px-4 py-2.5 bg-[#121212] border border-[#2B2B2B] text-xs font-mono text-[#F7F5F0] focus:border-[#C5A880] focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#1C1C1C] flex items-center justify-between">
              <span className="text-[9px] font-mono text-[#666666] uppercase tracking-wider">
                Encrypted & Guarded
              </span>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 bg-[#C5A880] hover:bg-[#D4BC96] text-black text-xs font-mono uppercase tracking-widest font-semibold transition-colors disabled:opacity-50"
              >
                {saving ? "Updating..." : "Update Dispatch Records"}
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
}
