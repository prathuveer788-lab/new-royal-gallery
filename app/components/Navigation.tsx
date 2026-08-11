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

  // On hero (transparent): ivory text. On scroll: dark bg, ivory text.
  const textColor = scrolled ? "text-[#F4F0E7]" : "text-[#F4F0E7]";

  return (
    <nav
      className="fixed top-0 w-full z-[100] transition-all duration-700"
      style={{
        background: scrolled ? "#11110F" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(138,115,82,0.18)" : "1px solid transparent",
      }}
    >
      <div className="flex items-center justify-between gap-6 px-6 sm:px-8 lg:px-10 py-4">

        {/* ════════ MASTHEAD LOGO ════════ */}
        <Link href="/" className="group flex-shrink-0 select-none" aria-label="The Royal Gallerys — Home">
          <div className="leading-none" style={{ fontFamily: "var(--font-cormorant), serif" }}>
            <span className={`block text-[9px] sm:text-[10px] tracking-[0.38em] uppercase font-light transition-colors duration-500 ${textColor} opacity-60`}>
              The
            </span>
            <span className={`block text-[20px] sm:text-[22px] lg:text-[24px] tracking-[0.07em] uppercase font-normal transition-colors duration-500 leading-none ${textColor}`}>
              Royal Gallerys
            </span>
          </div>
        </Link>

        {/* ════════ DESKTOP NAV ════════ */}
        <div className="hidden lg:flex items-center gap-0.5">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-1.5 xl:px-2.5 py-2 text-[13px] xl:text-[14px] tracking-[0.14em] uppercase transition-colors duration-300 whitespace-nowrap font-sans"
              style={{
                color: scrolled ? "#9B9589" : "#B8A47A",
                fontWeight: 400,
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#F4F0E7"; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = scrolled ? "#9B9589" : "#B8A47A"; }}
            >
              {link.label}
            </Link>
          ))}
          <span className="w-px h-3.5 mx-2 transition-colors duration-500" style={{ background: "rgba(138,115,82,0.3)" }} />
          {utilityLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-1.5 xl:px-2 py-2 text-[12px] xl:text-[13px] tracking-[0.14em] uppercase transition-colors duration-300 whitespace-nowrap font-sans"
              style={{
                color: scrolled ? "#9B9589" : "#8A7352",
                fontWeight: 400,
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "#F4F0E7"; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = scrolled ? "#9B9589" : "#8A7352"; }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/membership"
            className="ml-2 px-5 xl:px-6 py-2 text-[11px] xl:text-[12px] uppercase tracking-[0.16em] transition-all duration-500 font-sans font-medium"
            style={{
              color: "#F4F0E7",
              border: "1px solid rgba(138,115,82,0.45)",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background = "rgba(138,115,82,0.15)";
              (e.target as HTMLElement).style.borderColor = "rgba(184,164,122,0.7)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = "transparent";
              (e.target as HTMLElement).style.borderColor = "rgba(138,115,82,0.45)";
            }}
          >
            Membership
          </Link>
        </div>

        {/* ════════ MOBILE TOGGLE ════════ */}
        <button
          className="lg:hidden text-2xl p-2 transition-colors duration-500 flex-shrink-0"
          style={{ color: "#F4F0E7" }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className="lg:hidden absolute top-full left-0 w-full transition-all duration-500"
        style={{
          background: "#11110F",
          borderBottom: "1px solid rgba(138,115,82,0.2)",
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateY(0)" : "translateY(-8px)",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        <div className="flex flex-col items-center py-10 gap-4 text-lg font-sans" style={{ color: "#F4F0E7" }}>
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="hover:text-[#B8A47A] transition-colors tracking-[0.14em] uppercase text-[15px] font-light"
            >
              {link.label}
            </Link>
          ))}
          <hr className="w-12 my-1" style={{ borderColor: "rgba(138,115,82,0.3)" }} />
          {utilityLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-[14px] uppercase tracking-[0.14em] font-light hover:text-[#B8A47A] transition-colors"
              style={{ color: "#9B9589" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/membership"
            onClick={() => setIsOpen(false)}
            className="mt-2 px-7 py-3 text-sm uppercase tracking-[0.18em] font-medium transition-all duration-300 font-sans"
            style={{
              color: "#F4F0E7",
              border: "1px solid rgba(138,115,82,0.5)",
            }}
          >
            Membership
          </Link>
        </div>
      </div>
    </nav>
  );
}
