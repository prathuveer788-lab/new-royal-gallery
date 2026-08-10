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

  const primaryLinks = [
    { href: "/style", label: "Style" },
    { href: "/travel", label: "Travel" },
    { href: "/design", label: "Design" },
    { href: "/culture", label: "Culture" },
    { href: "/society", label: "Society" },
    { href: "/motoring", label: "Motoring" },
    { href: "/dining", label: "Dining" },
    { href: "/business", label: "Business" },
    { href: "/futures", label: "Futures" },
    { href: "/archive", label: "Archive" },
  ];

  const utilityLinks = [
    { href: "/ecosystem", label: "Institute" },
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
      <div className="flex items-center justify-between gap-6 px-6 sm:px-8 lg:px-10 py-3.5">

        {/* ════════ LOGO ════════ */}
        <Link href="/" className="group flex-shrink-0 select-none" aria-label="The Royal Gallerys — Home">
          <div className="leading-none" style={{ fontFamily: "var(--font-bodoni), serif" }}>
            <span className={`block text-[9px] sm:text-[10px] tracking-[0.35em] uppercase font-light transition-colors duration-500 ${ink} opacity-80`}>
              The
            </span>
            <span className={`block text-[20px] sm:text-[22px] lg:text-[24px] tracking-[0.06em] uppercase font-normal transition-colors duration-500 leading-none ${ink}`}>
              Royal Gallerys
            </span>
            <span
              className={`block text-[7px] sm:text-[7.5px] tracking-[0.2em] uppercase font-sans transition-colors duration-500 mt-0.5 ${ink} opacity-60`}
              style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 500 }}
            >
              Heritage &middot; Culture &middot; Luxury &middot; Influence
            </span>
          </div>
        </Link>

        {/* ════════ DESKTOP NAV ════════ */}
        <div className="hidden lg:flex items-center gap-0.5">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-1.5 xl:px-2.5 py-2 text-[15px] xl:text-[16px] tracking-[0.03em] transition-colors duration-300 whitespace-nowrap ${
                scrolled ? "text-neutral-500 hover:text-neutral-900" : "text-white/70 hover:text-white"
              }`}
              style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600 }}
            >
              {link.label}
            </Link>
          ))}
          <span className={`w-px h-4 mx-1.5 transition-colors duration-500 ${scrolled ? "bg-neutral-200" : "bg-white/20"}`} />
          {utilityLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-1.5 xl:px-2 py-2 text-[14px] xl:text-[15px] tracking-[0.03em] transition-colors duration-300 whitespace-nowrap ${
                scrolled ? "text-neutral-400 hover:text-neutral-700" : "text-white/55 hover:text-white/85"
              }`}
              style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600 }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/membership"
            className={`ml-2 px-5 xl:px-6 py-2 text-[12px] xl:text-[13px] uppercase tracking-[0.1em] transition-all duration-300 font-medium ${
              scrolled
                ? "text-neutral-800 border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
                : "text-white/90 border border-white/35 hover:border-white hover:bg-white hover:text-neutral-900"
            }`}
            style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 500 }}
          >
            Membership
          </Link>
        </div>

        {/* ════════ MOBILE ════════ */}
        <button
          className={`lg:hidden text-2xl p-2 transition-colors duration-500 flex-shrink-0 ${scrolled ? "text-neutral-900" : "text-white"}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-white border-b border-neutral-100 shadow-2xl transition-all duration-300 ${
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
      }`}>
        <div className="flex flex-col items-center py-10 gap-4 text-lg text-neutral-800" style={{ fontFamily: "var(--font-cormorant)" }}>
          {primaryLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="hover:text-neutral-500 transition-colors tracking-wide">
              {link.label}
            </Link>
          ))}
          <hr className="w-12 border-neutral-200 my-1" />
          {utilityLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-base text-neutral-500 hover:text-neutral-800 transition-colors tracking-wide">
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
