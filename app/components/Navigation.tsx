"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-[100] bg-white/95 backdrop-blur-md border-b border-neutral-100">
      {/* Responsive Padding: px-4 (Mobile) -> px-16 (Desktop) */}
      <div className="max-w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-4 flex justify-between items-center">
        
        {/* LEFT SIDE: Heritage Logo */}
        <Link href="/" className="flex items-center gap-4 group flex-shrink-0">
            <div className="flex flex-col items-start text-left">
              {/* Main Title: High-contrast, bold, and tightly stacked */}
              <h1 
                className="font-serif uppercase text-[#2a2a3c] font-normal leading-[0.8] tracking-[-0.02em] text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                style={{ fontFamily: 'var(--font-bodoni), serif' }}
              >
                The Royal <br />
                Gallery's
              </h1>

              {/* Sub-headline: Small, wide-spaced caps */}
              <p className="mt-2 font-sans text-[6px] sm:text-[7px] md:text-[9px] lg:text-[10px] uppercase tracking-[0.15em] text-neutral-500 font-bold">
                AN INTERNATIONAL CHRONICLE OF HERITAGE
              </p>
            </div>
        </Link>

        {/* RIGHT SIDE: Menu (Desktop) */}
        <div 
          className="hidden md:flex items-center gap-8 lg:gap-10 text-[16px] lg:text-[18px] font-medium text-neutral-600" 
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          <Link href="/heritage" className="hover:text-amber-700 transition-colors tracking-wide">Heritage</Link>
          <Link href="/culture" className="hover:text-amber-700 transition-colors tracking-wide">Culture</Link>
          <Link href="/travel" className="hover:text-amber-700 transition-colors tracking-wide">Travel</Link>
          <Link href="/gallery" className="hover:text-amber-700 transition-colors tracking-wide">Gallery</Link>
          <Link href="/journal" className="hover:text-amber-700 transition-colors tracking-wide ">Journal</Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button className="md:hidden text-2xl p-2 text-neutral-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-neutral-200 transition-all duration-300 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
        <div className="flex flex-col items-center py-8 gap-6 text-[20px] font-serif italic text-neutral-800" style={{ fontFamily: 'var(--font-cormorant)' }}>
          <Link href="/heritage" onClick={() => setIsOpen(false)}>Heritage</Link>
          <Link href="/culture" onClick={() => setIsOpen(false)}>Culture</Link>
          <Link href="/travel" onClick={() => setIsOpen(false)}>Travel</Link>
          <Link href="/gallery" onClick={() => setIsOpen(false)}>Gallery</Link>
          <Link href="/journal" onClick={() => setIsOpen(false)}>Journal</Link>
        </div>
      </div>
    </nav>
  );
}
