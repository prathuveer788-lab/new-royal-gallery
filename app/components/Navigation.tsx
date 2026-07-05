"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/heritage", label: "Heritage" },
    { href: "/culture", label: "Culture" },
    { href: "/travel", label: "Experiences" },
    { href: "/gallery", label: "Archive" },
    { href: "/heritage-ai", label: "AI" },
    { href: "/journal", label: "Journal" },
    { href: "/ecosystem", label: "Ecosystem" },
    { href: "/global-vision", label: "Vision" },
  ];

  const ink = scrolled ? "text-neutral-900" : "text-white";

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.04)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 py-4 flex justify-between items-center">

        {/* ════════════ LOGO ════════════ */}
        <Link href="/" className="group flex-shrink-0 select-none" aria-label="The Royal Gallerys — Home">
          <div className="text-center leading-none" style={{ fontFamily: "var(--font-bodoni), serif" }}>
            <span className={`block text-[clamp(7px,1.2vw,10px)] tracking-[0.45em] uppercase font-light transition-colors duration-500 ${ink} opacity-75`}>
              The
            </span>
            <span className={`block text-[clamp(16px,2.8vw,26px)] tracking-[0.1em] uppercase font-normal transition-colors duration-500 mt-0.5 ${ink}`}>
              Royal Gallerys
            </span>
            <span
              className={`block text-[clamp(5px,0.85vw,7px)] tracking-[0.3em] uppercase font-sans transition-colors duration-500 mt-1 ${ink} opacity-60`}
              style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 400 }}
            >
              Heritage &middot; Media &middot; Technology &middot; Magazine
            </span>
          </div>
        </Link>

        {/* ════════════ DESKTOP NAV ════════════ */}
        <div className="hidden lg:flex items-center gap-0.5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 xl:px-4 py-2 text-[12px] xl:text-[13px] tracking-[0.08em] transition-colors duration-300 ${
                scrolled ? "text-neutral-500 hover:text-neutral-900" : "text-white/65 hover:text-white"
              }`}
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
            >
              {link.label}
            </Link>
          ))}
          <span className={`w-px h-4 mx-1.5 transition-colors duration-500 ${scrolled ? "bg-neutral-200" : "bg-white/20"}`} />
          <Link
            href="/membership"
            className={`ml-1 px-4 xl:px-5 py-2 text-[10px] xl:text-[11px] uppercase tracking-[0.14em] transition-all duration-300 ${
              scrolled
                ? "text-neutral-700 border border-neutral-300 hover:border-neutral-900"
                : "text-white border border-white/35 hover:border-white"
            }`}
            style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 500 }}
          >
            Membership
          </Link>
        </div>

        {/* ════════════ MOBILE ════════════ */}
        <button
          className={`lg:hidden text-2xl p-2 transition-colors duration-500 ${scrolled ? "text-neutral-900" : "text-white"}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      <div className={`lg:hidden absolute top-full left-0 w-full bg-white border-b border-neutral-100 shadow-2xl transition-all duration-300 ${
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
      }`}>
        <div className="flex flex-col items-center py-10 gap-5 text-lg text-neutral-800" style={{ fontFamily: "var(--font-cormorant)" }}>
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="hover:text-neutral-500 transition-colors tracking-wide">
              {link.label}
            </Link>
          ))}
          <Link href="/membership" onClick={() => setIsOpen(false)}
            className="mt-2 px-7 py-3 bg-neutral-900 text-white text-sm uppercase tracking-[0.14em] hover:bg-neutral-700 transition"
            style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 500 }}>
            Membership
          </Link>
        </div>
      </div>
    </nav>
  );
}
