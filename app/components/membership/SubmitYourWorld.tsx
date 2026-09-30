"use client";

import React, { useState } from "react";

interface SubmitYourWorldProps {
  memberName: string;
  membershipId: string;
  onSubmissionSuccess?: (sub: any) => void;
}

export default function SubmitYourWorld({
  memberName,
  membershipId,
  onSubmissionSuccess,
}: SubmitYourWorldProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Automobilia & Historic Cars");
  const [era, setEra] = useState("");
  const [location, setLocation] = useState("");
  const [provenance, setProvenance] = useState("");
  const [narrative, setNarrative] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );
  const [previewOpen, setPreviewOpen] = useState(false);

  const categories = [
    "Automobilia & Historic Cars",
    "Family Estates & Architecture",
    "Horological Heirlooms & Pocket Clocks",
    "High Jewellery & Dynastic Gemstones",
    "Antiques, Silver & Objets d'Art",
    "Personal Travel Archives & Sanctuaries",
    "Historic Textiles & Bespoke Tailoring",
    "Art Collections & Avant-Garde Sculpture",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/member/submit-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          era,
          location,
          provenance,
          description: narrative,
          imageUrl,
          internalNotes: `Member ID: ${membershipId}`,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");

      setFeedback({
        type: "success",
        text: "✓ Your dossier has been transmitted to the Senior Curatorial Board. Status: UNDER EDITORIAL REVIEW.",
      });

      if (onSubmissionSuccess && data.submission) {
        onSubmissionSuccess(data.submission);
      }

      // Reset form fields
      setTitle("");
      setEra("");
      setLocation("");
      setProvenance("");
      setNarrative("");
      setImageUrl("");
    } catch (err: any) {
      setFeedback({
        type: "error",
        text: err.message || "Unable to transmit dossier to Editorial Board.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pb-8 border-b border-[#1C1C1C]">
        <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#C5A880] block">
          CURATORIAL PORTAL · PRIVATE WORLD
        </span>
        <h1
          className="text-3xl sm:text-5xl font-serif text-[#F7F5F0] font-normal"
          style={{ fontFamily: "var(--font-cormorant), serif" }}
        >
          Submit Your World
        </h1>
        <div className="w-16 h-px bg-[#C5A880]/40 mx-auto my-3" />
        <p className="text-sm sm:text-base font-serif italic text-[#A8A49C] leading-relaxed">
          Members are invited to submit family estate histories, vintage automobiles, documented heirlooms,
          and private archives directly to our Senior Curatorial Board for publication consideration.
        </p>
      </div>

      {/* Editorial Transformation Protocol Notice */}
      <div className="p-6 bg-[#0E0E0E] border border-[#222222] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#C5A880]">
            EDITORIAL PROTOCOL & REVIEW LIFECYCLE
          </span>
          <span className="text-[9px] font-mono text-[#666666]">STRICTLY CONFIDENTIAL</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-[9px] font-mono uppercase tracking-wider text-[#888888]">
          <span className="px-2 py-1 bg-[#1A1A1A] text-[#E0DFDC] border border-[#333333]">
            01 DRAFT
          </span>
          <span>→</span>
          <span className="px-2 py-1 bg-[#1A1A1A] text-[#E0DFDC] border border-[#333333]">
            02 SUBMITTED
          </span>
          <span>→</span>
          <span className="px-2 py-1 bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/40">
            03 UNDER REVIEW
          </span>
          <span>→</span>
          <span className="px-2 py-1 bg-[#1A1A1A] text-[#888888]">04 FACT CHECK</span>
          <span>→</span>
          <span className="px-2 py-1 bg-[#1A1A1A] text-[#888888]">05 EDITORIAL EDIT</span>
          <span>→</span>
          <span className="px-2 py-1 bg-[#1A1A1A] text-[#888888]">06 PUBLISHED</span>
        </div>

        <p className="text-xs font-sans text-[#777777] leading-relaxed">
          Raw member submissions are never published as unformatted notes. Our editors collaborate
          with you to transform your narrative into a museum-grade Royal Gallerys editorial dossier,
          complete with archival typography, verified citations, and high-resolution plate presentation.
        </p>
      </div>

      {/* Main Submission Form */}
      <form onSubmit={handleSubmit} className="p-8 sm:p-12 bg-[#0A0A0A] border border-[#1C1C1C] space-y-6">
        {feedback && (
          <div
            className={`p-4 border text-xs font-mono tracking-wide ${
              feedback.type === "success"
                ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-200"
                : "bg-red-950/40 border-red-500/50 text-red-200"
            }`}
          >
            {feedback.text}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Title */}
          <div className="sm:col-span-2 space-y-2">
            <label className="block text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">
              Dossier Title or Subject *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. The 1934 Mercedes-Benz 500K Preserved Across Three Generations"
              className="w-full bg-[#111111] border border-[#262626] px-4 py-3 text-sm text-[#F7F5F0] focus:border-[#C5A880] focus:outline-none"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="block text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">
              Curatorial World *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#111111] border border-[#262626] px-4 py-3 text-xs text-[#F7F5F0] focus:border-[#C5A880] focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c} className="bg-[#111111]">
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Era / Date */}
          <div className="space-y-2">
            <label className="block text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">
              Era, Year, or Period
            </label>
            <input
              type="text"
              value={era}
              onChange={(e) => setEra(e.target.value)}
              placeholder="e.g. Circa 1934, Pre-War, or Late Regency"
              className="w-full bg-[#111111] border border-[#262626] px-4 py-3 text-xs text-[#F7F5F0] focus:border-[#C5A880] focus:outline-none"
            />
          </div>

          {/* Location / Estate */}
          <div className="space-y-2">
            <label className="block text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">
              Estate Location / Origin
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Mewar, Rajasthan or Scottish Highlands"
              className="w-full bg-[#111111] border border-[#262626] px-4 py-3 text-xs text-[#F7F5F0] focus:border-[#C5A880] focus:outline-none"
            />
          </div>

          {/* Documented Provenance */}
          <div className="space-y-2">
            <label className="block text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">
              Documented Provenance / Family Acquisition
            </label>
            <input
              type="text"
              value={provenance}
              onChange={(e) => setProvenance(e.target.value)}
              placeholder="e.g. Delivered new to my great-grandfather in Calcutta; coachwork by Barker"
              className="w-full bg-[#111111] border border-[#262626] px-4 py-3 text-xs text-[#F7F5F0] focus:border-[#C5A880] focus:outline-none"
            />
          </div>

          {/* Primary Photograph URL / Upload */}
          <div className="sm:col-span-2 space-y-2">
            <label className="block text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">
              Archival Photograph URL or File Reference
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Paste direct URL to archival image (or note: High-resolution scans available on request)"
              className="w-full bg-[#111111] border border-[#262626] px-4 py-3 text-xs text-[#F7F5F0] focus:border-[#C5A880] focus:outline-none"
            />
          </div>

          {/* Full Narrative */}
          <div className="sm:col-span-2 space-y-2">
            <label className="block text-[10px] font-mono uppercase tracking-widest text-[#C5A880]">
              Personal Story, History & Craft Details *
            </label>
            <textarea
              rows={6}
              required
              value={narrative}
              onChange={(e) => setNarrative(e.target.value)}
              placeholder="Detail the background, how the object survived, personal family memories, mechanical or architectural condition, and any archival records..."
              className="w-full bg-[#111111] border border-[#262626] px-4 py-3 text-sm text-[#F7F5F0] focus:border-[#C5A880] focus:outline-none leading-relaxed"
            />
          </div>
        </div>

        {/* Action buttons */}
        <div className="pt-4 border-t border-[#1C1C1C] flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setPreviewOpen(!previewOpen)}
            className="text-xs font-mono uppercase tracking-widest text-[#888888] hover:text-[#F7F5F0] transition-colors"
          >
            {previewOpen ? "Hide Editorial Preview ▴" : "Preview Editorial Transformation ▾"}
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3.5 bg-[#F7F5F0] hover:bg-[#E5E0D8] text-[#050505] text-xs font-mono uppercase tracking-[0.25em] font-semibold transition-all"
          >
            {submitting ? "Transmitting..." : "Submit to Curatorial Board →"}
          </button>
        </div>
      </form>

      {/* Live Editorial Transformation Preview (Section 25) */}
      {previewOpen && (
        <div className="p-8 sm:p-12 bg-[#080808] border border-[#262626] space-y-8 animate-fadeIn">
          <div className="flex items-center justify-between pb-4 border-b border-[#1C1C1C]">
            <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-[#C5A880]">
              LIVE EDITORIAL TRANSFORMATION PREVIEW
            </span>
            <span className="text-[9px] font-mono text-[#666666]">ROYAL GALLERYS SPECIFICATION</span>
          </div>

          <div className="space-y-4 max-w-3xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#888888] block">
              {category} · {era || "ERA SPECIFIED"}
            </span>

            <h2
              className="text-2xl sm:text-4xl font-serif text-[#F7F5F0] leading-tight font-normal"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              {title || "The Story of a Private Collection"}
            </h2>

            <div className="flex items-center gap-3 text-xs font-mono text-[#C5A880]">
              <span>FROM THE PRIVATE COLLECTION OF</span>
              <span className="text-[#F7F5F0] font-semibold uppercase">{memberName}</span>
            </div>

            <p className="text-sm sm:text-base font-serif italic text-[#A8A49C] leading-relaxed pt-2">
              {provenance ? `Provenance: ${provenance}` : "Provenance recorded in member dossier."}
            </p>

            <div className="pt-4 text-xs font-serif text-[#CCCCCC] leading-relaxed space-y-3">
              <p>
                {narrative ||
                  "Your submission will be edited by our senior curatorial desk to articulate the historical provenance, aesthetic significance, and personal custodial story."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
