"use client";

import { useState } from "react";

interface ShareBarProps {
  url: string;
  title: string;
  publishDate: string;
}

export default function ShareBar({ url, title, publishDate }: ShareBarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div
      className="w-full border-y border-[#D9CFC2] py-4 my-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-sans text-xs"
      style={{ color: "#6B6F76" }}
    >
      {/* Editorial Meta */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs">
        <span
          className="uppercase tracking-[0.2em] font-medium"
          style={{ color: "#D4673A" }}
        >
          Society · Profile
        </span>
        <span className="text-[#D9CFC2]">•</span>
        <span className="text-[#1B1D21] font-medium">
          Words by Krishanpriya Rajawat
        </span>
        <span className="text-[#D9CFC2]">•</span>
        <span>12 min read</span>
        <span className="text-[#D9CFC2]">•</span>
        <time dateTime="2026-08-15">{publishDate}</time>
      </div>

      {/* Share actions */}
      <div className="flex items-center gap-3 self-end md:self-auto">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#6B6F76] font-medium hidden sm:inline">
          Share
        </span>

        {/* Copy Link */}
        <button
          onClick={handleCopy}
          aria-label="Copy link to article"
          className="relative px-3 py-1.5 border border-[#D9CFC2] text-[11px] uppercase tracking-[0.14em] font-medium transition-colors hover:border-[#D4673A] hover:text-[#1B1D21] focus-visible:outline-[#D4673A]"
        >
          {copied ? "Copied ✓" : "Copy Link"}
          {copied && (
            <span
              role="status"
              className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#22344A] text-[#F3E7D3] text-[10px] py-1 px-2 rounded whitespace-nowrap shadow-lg animate-fade-in"
            >
              Link Copied!
            </span>
          )}
        </button>

        {/* WhatsApp */}
        <a
          href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on WhatsApp"
          className="px-2.5 py-1.5 border border-[#D9CFC2] text-[11px] uppercase tracking-[0.14em] font-medium transition-colors hover:border-[#D4673A] hover:text-[#1B1D21] focus-visible:outline-[#D4673A]"
        >
          WhatsApp
        </a>

        {/* X / Twitter */}
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X (Twitter)"
          className="px-2.5 py-1.5 border border-[#D9CFC2] text-[11px] uppercase tracking-[0.14em] font-medium transition-colors hover:border-[#D4673A] hover:text-[#1B1D21] focus-visible:outline-[#D4673A]"
        >
          X
        </a>

        {/* LinkedIn */}
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          className="px-2.5 py-1.5 border border-[#D9CFC2] text-[11px] uppercase tracking-[0.14em] font-medium transition-colors hover:border-[#D4673A] hover:text-[#1B1D21] focus-visible:outline-[#D4673A]"
        >
          LinkedIn
        </a>

        {/* Email */}
        <a
          href={`mailto:?subject=${encodedTitle}&body=Read this profile on The Royal Gallerys:%20${encodedUrl}`}
          aria-label="Share via Email"
          className="px-2.5 py-1.5 border border-[#D9CFC2] text-[11px] uppercase tracking-[0.14em] font-medium transition-colors hover:border-[#D4673A] hover:text-[#1B1D21] focus-visible:outline-[#D4673A]"
        >
          Email
        </a>
      </div>
    </div>
  );
}
