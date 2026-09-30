"use client";

import React, { useState } from "react";
import { getObjectById, getStoryById } from "@/lib/membership/private-collections-data";
import DigitalMembershipCard from "./DigitalMembershipCard";

interface MyArchiveProps {
  member: any;
  savedObjectIds: string[];
  savedStoryIds: string[];
  submissions: any[];
  onSelectObject: (obj: any) => void;
  onSelectStory: (story: any) => void;
  onRemoveSavedObject: (id: string) => void;
  onRemoveSavedStory: (id: string) => void;
  onUpdateProfile: (data: any) => Promise<void>;
}

export default function MyArchive({
  member,
  savedObjectIds,
  savedStoryIds,
  submissions,
  onSelectObject,
  onSelectStory,
  onRemoveSavedObject,
  onRemoveSavedStory,
  onUpdateProfile,
}: MyArchiveProps) {
  const [activeTab, setActiveTab] = useState<"saved" | "submissions" | "credential" | "dossier">(
    "saved"
  );
  const [phone, setPhone] = useState(member?.phone || "");
  const [street, setStreet] = useState(member?.address?.street || "");
  const [city, setCity] = useState(member?.address?.city || "");
  const [state, setState] = useState(member?.address?.state || "");
  const [pincode, setPincode] = useState(member?.address?.pincode || "");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      await onUpdateProfile({
        phone,
        address: { street, city, state, pincode },
      });
      setMsg("✓ Confidential delivery records updated successfully.");
    } catch (err: any) {
      setMsg(err.message || "Failed to update dossier.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pb-8 border-b border-[#1C1C1C]">
        <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#C5A880] block">
          PRIVATE ARCHIVE & CREDENTIALS
        </span>
        <h1
          className="text-3xl sm:text-5xl font-serif text-[#F7F5F0] font-normal"
          style={{ fontFamily: "var(--font-cormorant), serif" }}
        >
          My Archive
        </h1>
        <div className="w-16 h-px bg-[#C5A880]/40 mx-auto my-3" />
        <p className="text-sm sm:text-base font-serif italic text-[#A8A49C] leading-relaxed">
          The personal curated folio of {member?.fullName || "Member"} · Permanent Identifier:{" "}
          <span className="font-mono text-[#C5A880] not-italic">{member?.membershipId}</span>
        </p>
      </div>

      {/* Archive Navigation */}
      <div className="flex border-b border-[#222222] text-xs font-mono tracking-widest uppercase overflow-x-auto justify-center">
        {[
          { id: "saved", label: `SAVED OBJECTS (${savedObjectIds.length})` },
          { id: "submissions", label: `MY SUBMISSIONS (${submissions.length})` },
          { id: "credential", label: "LIFETIME CREDENTIAL" },
          { id: "dossier", label: "DELIVERY & SETTINGS" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-3 px-5 sm:px-8 whitespace-nowrap transition-all border-b-2 -mb-px ${
              activeTab === tab.id
                ? "border-[#C5A880] text-[#F7F5F0] font-semibold"
                : "border-transparent text-[#666666] hover:text-[#AAAAAA]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Saved Objects */}
      {activeTab === "saved" && (
        <div className="space-y-8">
          {savedObjectIds.length === 0 ? (
            <div className="p-12 bg-[#0A0A0A] border border-[#1C1C1C] text-center space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#777777] block">
                YOUR CURATED FOLIO IS CURRENTLY EMPTY
              </span>
              <p className="text-sm font-serif italic text-[#AAAAAA] max-w-md mx-auto">
                Explore the collections in Fashion, Timepieces, Jewellery, or Automobilia, and save pieces
                to your personal archive for ongoing study.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedObjectIds.map((id) => {
                const obj = getObjectById(id);
                if (!obj) return null;
                return (
                  <div
                    key={obj.id}
                    className="p-5 bg-[#0B0B0B] border border-[#1F1F1F] hover:border-[#C5A880] transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[9px] font-mono text-[#C5A880]">
                        <span>{obj.house}</span>
                        <button
                          type="button"
                          onClick={() => onRemoveSavedObject(obj.id)}
                          className="text-[#666666] hover:text-red-400"
                        >
                          Remove ✕
                        </button>
                      </div>

                      <h3
                        onClick={() => onSelectObject(obj)}
                        className="text-base font-serif text-[#F7F5F0] hover:text-[#C5A880] transition-colors leading-snug cursor-pointer line-clamp-2"
                        style={{ fontFamily: "var(--font-cormorant), serif" }}
                      >
                        {obj.title}
                      </h3>

                      <p className="text-xs font-serif italic text-[#888888] line-clamp-2">
                        {obj.subtitle}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#181818] flex items-center justify-between text-[10px] font-mono text-[#666666]">
                      <span>{obj.price.amountINR}</span>
                      <button
                        type="button"
                        onClick={() => onSelectObject(obj)}
                        className="text-[#C5A880] hover:underline"
                      >
                        Open Dossier →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: My Submissions */}
      {activeTab === "submissions" && (
        <div className="space-y-6">
          {submissions.length === 0 ? (
            <div className="p-12 bg-[#0A0A0A] border border-[#1C1C1C] text-center space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#777777] block">
                NO DOSSIERS CURRENTLY SUBMITTED
              </span>
              <p className="text-sm font-serif italic text-[#AAAAAA] max-w-md mx-auto">
                Members may submit archival photographs, family histories, and personal collections
                via the “Submit” portal to be reviewed by our curatorial editors.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {submissions.map((sub, idx) => (
                <div
                  key={sub.id || idx}
                  className="p-6 bg-[#0B0B0B] border border-[#1F1F1F] flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-3 text-[9px] font-mono uppercase tracking-wider">
                      <span className="px-2 py-0.5 bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/40 font-semibold">
                        {sub.status || "UNDER EDITORIAL REVIEW"}
                      </span>
                      <span className="text-[#666666]">{sub.category}</span>
                    </div>

                    <h3
                      className="text-lg font-serif text-[#F7F5F0]"
                      style={{ fontFamily: "var(--font-cormorant), serif" }}
                    >
                      {sub.title}
                    </h3>

                    <p className="text-xs font-sans text-[#888888] line-clamp-1 max-w-2xl">
                      {sub.description}
                    </p>
                  </div>

                  <div className="text-right text-[10px] font-mono text-[#666666] shrink-0">
                    <span>Transmitted to Board</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Lifetime Credential */}
      {activeTab === "credential" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-[#0A0A0A] p-8 border border-[#1C1C1C] space-y-6 flex flex-col items-center justify-center">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C5A880]">
              OFFICIAL DIGITAL LIFETIME CREDENTIAL
            </span>

            <DigitalMembershipCard
              fullName={member?.fullName || "Member"}
              membershipId={member?.membershipId || "RG-MEMBER"}
              status="ACTIVE"
            />
          </div>

          <div className="lg:col-span-5 bg-[#0B0B0B] p-8 border border-[#1C1C1C] space-y-6">
            <h3
              className="text-xl font-serif text-[#F7F5F0]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Credential Standing
            </h3>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex justify-between py-2 border-b border-[#1C1C1C]">
                <span className="text-[#777777]">Full Name</span>
                <span className="text-[#F7F5F0] font-sans font-medium">{member?.fullName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#1C1C1C]">
                <span className="text-[#777777]">Permanent ID</span>
                <span className="text-[#C5A880] font-semibold">{member?.membershipId}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#1C1C1C]">
                <span className="text-[#777777]">Standing</span>
                <span className="text-emerald-400 font-semibold">LIFETIME MEMBER (ACTIVE)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#1C1C1C]">
                <span className="text-[#777777]">Registered Email</span>
                <span className="text-[#CCCCCC]">{member?.email}</span>
              </div>
            </div>

            {/* Annual Physical Print Dispatch */}
            <div className="pt-4 border-t border-[#1C1C1C] space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5A880] block font-semibold">
                ANNUAL PHYSICAL PRINT VOLUMES (3 ISSUES / YEAR)
              </span>
              <div className="p-4 bg-[#0E0E0E] border border-[#222222] text-xs font-mono space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#AAAAAA]">Spring Issue No. 1</span>
                  <span className="text-emerald-400">DISPATCHED</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#AAAAAA]">Summer Issue No. 2</span>
                  <span className="text-[#666666]">IN CURATION</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#AAAAAA]">Autumn Issue No. 3</span>
                  <span className="text-[#666666]">IN CURATION</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Delivery Dossier & Settings */}
      {activeTab === "dossier" && (
        <form
          onSubmit={handleSave}
          className="max-w-3xl mx-auto p-8 sm:p-10 bg-[#0A0A0A] border border-[#1C1C1C] space-y-6"
        >
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C5A880] block">
              CONFIDENTIAL DOSSIER
            </span>
            <h2
              className="text-2xl font-serif text-[#F7F5F0] mt-1"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Mailing Address & Dispatch Records
            </h2>
            <p className="text-xs font-sans text-[#777777] mt-1">
              Your registered mailing address is used exclusively for courier dispatch of the three
              physical annual collector issues of The Royal Gallerys.
            </p>
          </div>

          {msg && (
            <div className="p-4 bg-emerald-950/40 border border-emerald-500/50 text-emerald-200 text-xs font-mono">
              {msg}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-[#888888] uppercase tracking-wider block">
                Mobile / WhatsApp Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#111111] border border-[#262626] px-4 py-3 text-sm text-[#F7F5F0] focus:border-[#C5A880] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label className="text-[#888888] uppercase tracking-wider block">
                Street Address / Estate Name
              </label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full bg-[#111111] border border-[#262626] px-4 py-3 text-sm text-[#F7F5F0] focus:border-[#C5A880] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[#888888] uppercase tracking-wider block">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-[#111111] border border-[#262626] px-4 py-3 text-sm text-[#F7F5F0] focus:border-[#C5A880] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[#888888] uppercase tracking-wider block">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full bg-[#111111] border border-[#262626] px-4 py-3 text-sm text-[#F7F5F0] focus:border-[#C5A880] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[#888888] uppercase tracking-wider block">PIN / ZIP Code</label>
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full bg-[#111111] border border-[#262626] px-4 py-3 text-sm text-[#F7F5F0] focus:border-[#C5A880] focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#1C1C1C]">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-[#F7F5F0] hover:bg-[#E5E0D8] text-[#050505] text-xs font-mono uppercase tracking-[0.25em] font-semibold transition-all"
            >
              {saving ? "Saving..." : "Update Dispatch Records →"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
