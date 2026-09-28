"use client";

import { useState } from "react";

export default function ShareBar({
  url,
  title,
}: {
  url: string;
  title: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  const shareTwitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=${encodeURIComponent(url)}`;

  const shareLinkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url
  )}`;

  const shareWhatsApp = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `${title} — ${url}`
  )}`;

  return (
    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] font-sans">
      <span className="text-[#6A6A70] hidden sm:inline">Share:</span>
      <button
        type="button"
        onClick={handleCopy}
        className="px-2.5 py-1 border border-[#D8D6D0] text-[#1C1C1E] hover:border-[#C4687F] hover:text-[#C4687F] transition-colors"
        aria-label="Copy article link to clipboard"
      >
        {copied ? "Copied ✓" : "Copy Link"}
      </button>
      <a
        href={shareTwitter}
        target="_blank"
        rel="noopener noreferrer"
        className="px-2 py-1 border border-[#D8D6D0] text-[#1C1C1E] hover:border-[#C4687F] hover:text-[#C4687F] transition-colors"
        aria-label="Share on X (Twitter)"
      >
        X
      </a>
      <a
        href={shareLinkedIn}
        target="_blank"
        rel="noopener noreferrer"
        className="px-2 py-1 border border-[#D8D6D0] text-[#1C1C1E] hover:border-[#C4687F] hover:text-[#C4687F] transition-colors"
        aria-label="Share on LinkedIn"
      >
        LinkedIn
      </a>
      <a
        href={shareWhatsApp}
        target="_blank"
        rel="noopener noreferrer"
        className="px-2 py-1 border border-[#D8D6D0] text-[#1C1C1E] hover:border-[#C4687F] hover:text-[#C4687F] transition-colors"
        aria-label="Share via WhatsApp"
      >
        WhatsApp
      </a>
    </div>
  );
}
