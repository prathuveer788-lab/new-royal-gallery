"use client";
import { useState } from "react";
import Link from "next/link";
import "./globals.css";
import { Cormorant_Garamond, Montserrat, Bodoni_Moda } from "next/font/google";

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
});

const bodoni = Bodoni_Moda({ 
  subsets: ["latin"], 
  variable: "--font-bodoni" 
});

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  variable: "--font-montserrat" 
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${montserrat.variable} ${bodoni.variable} font-sans bg-[#fcfaf7] min-h-screen flex flex-col`}>
        
        {/* NAVIGATION */}
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

          {/* MOBILE MENU DROPDOWN (Added this back so responsive works) */}
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

        {/* MAIN CONTENT */}
        <main className="flex-grow pt-16 sm:pt-20 md:pt-24 lg:pt-32">{children}</main>

        {/* FOOTER */}
        <footer className="bg-[#111111] text-white pt-12 sm:pt-16 pb-6 sm:pb-8 px-4 sm:px-6 md:px-10 mt-auto">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-14 md:mb-16">
              <div className="space-y-4">
                <h3 className="text-xl font-serif font-bold tracking-tighter uppercase leading-none text-white">
                  THE ROYAL <span className="block text-[10px] text-amber-500 tracking-[0.3em] font-sans mt-1">GALLERY'S</span>
                </h3>
                <p className="text-neutral-400 text-sm font-light leading-relaxed max-w-xs">
                  A premium digital magazine documenting royal heritage and aristocratic culture.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-amber-500">Explore</h4>
                <ul className="flex flex-col gap-2 text-sm text-neutral-400 font-light">
                  <li><Link href="/heritage" className="hover:text-white transition">Heritage & Royalty</Link></li>
                  <li><Link href="/culture" className="hover:text-white transition">Culture & Art</Link></li>
                  <li><Link href="/travel" className="hover:text-white transition">Luxury Travel</Link></li>
                  <li><Link href="/gallery" className="hover:text-white transition">Gallery</Link></li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-amber-500">Connect</h4>
                <div className="flex gap-4 text-neutral-400 text-sm mb-4">
                  <a href="https://instagram.com/theroyalsgallery" target="_blank" rel="noreferrer" className="hover:text-white transition italic underline underline-offset-4">Instagram</a>
                  <a href="mailto:hey.theroyalsgallery@gmail.com" className="hover:text-white transition italic underline underline-offset-4">Email</a>
                </div>
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest leading-loose">
                  hey.theroyalsgallery@gmail.com
                </p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-neutral-500 text-center sm:text-left">
              <p>© 2026 The Royal Gallery's. All rights reserved.</p>
              <p className="text-neutral-600">Indian Royal Heritage & Global Aristocratic Culture</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}