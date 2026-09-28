"use client";

import { useState } from "react";

export default function BalmoralShareBar() {
  const [copied, setCopied] = useState(false);
  const shareUrl = "https://theroyalgallerys.com/travel/the-balmoral";
  const title = "The Balmoral: Three Minutes Ahead of Edinburgh | The Royal Gallerys";

  const handleCopy = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="flex items-center space-x-3 text-[#5B5B5B]">
      <span className="text-[10px] uppercase tracking-[0.2em] font-medium hidden sm:inline-block">Share</span>

      {/* Copy Link */}
      <div className="relative">
        <button
          type="button"
          onClick={handleCopy}
          className="p-1.5 hover:text-[#24424F] transition-colors focus:outline-none"
          aria-label="Copy article link"
          title="Copy link"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </button>
        {copied && (
          <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#24424F] text-[#FAF8F4] text-[10px] uppercase tracking-wider py-0.5 px-2 rounded shadow whitespace-nowrap">
            Copied
          </span>
        )}
      </div>

      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(title + " " + shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 hover:text-[#24424F] transition-colors"
        aria-label="Share on WhatsApp"
        title="Share on WhatsApp"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.634.062-1.923-.469-1.579-.652-2.587-2.261-2.666-2.366-.079-.105-.636-.848-.636-1.616 0-.769.403-1.147.546-1.303.144-.157.315-.196.42-.196.105 0 .21.002.302.007.098.005.228-.037.356.27.132.316.449 1.093.488 1.172.039.079.065.171.013.275-.052.105-.079.171-.157.262-.079.092-.165.205-.236.276-.079.079-.161.165-.069.322.092.158.409.675.877 1.092.604.538 1.113.705 1.271.784.157.079.25.066.342-.039.092-.105.394-.459.5-.617.105-.157.21-.131.355-.079.144.053.917.433 1.074.512.157.079.262.118.302.184.039.066.039.38-.105.786z"/>
        </svg>
      </a>

      {/* Pinterest */}
      <a
        href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent("https://theroyalgallerys.com/assets/images/balmoral/balmoral-exterior-hero.jpg")}&description=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 hover:text-[#24424F] transition-colors"
        aria-label="Save on Pinterest"
        title="Save on Pinterest"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
        </svg>
      </a>

      {/* Email */}
      <a
        href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent("Read this feature on The Royal Gallerys: " + shareUrl)}`}
        className="p-1.5 hover:text-[#24424F] transition-colors"
        aria-label="Share by Email"
        title="Share by Email"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </a>
    </div>
  );
}
