"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function BalmoralHeader() {
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setCondensed(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "UK Edition", href: "/uk" },
    { label: "Royalty", href: "/royalty" },
    { label: "Travel", href: "/travel" },
    { label: "Style", href: "/style" },
    { label: "Design", href: "/design" },
    { label: "Culture", href: "/culture" },
    { label: "Society", href: "/society" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 w-full ${
          condensed
            ? "bg-[#FAF8F4]/95 backdrop-blur-md shadow-sm py-2.5"
            : "bg-[#FAF8F4] py-4 md:py-5"
        }`}
        style={{
          borderBottom: "1px solid #D9D4CA",
        }}
      >
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Top Bar */}
          <div className="flex items-center justify-between">
            {/* Left: Menu & Search */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-1.5 text-[#1A1A1A] hover:text-[#24424F] transition-colors focus:outline-none focus:ring-1 focus:ring-[#24424F]"
                aria-label="Open navigation menu"
                aria-expanded={menuOpen}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16M4 12h16M4 17h16" />
                  )}
                </svg>
              </button>

              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-1.5 text-[#1A1A1A] hover:text-[#24424F] transition-colors focus:outline-none focus:ring-1 focus:ring-[#24424F]"
                aria-label="Search articles"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
                </svg>
              </button>
            </div>

            {/* Centre: THE ROYAL GALLERYS Wordmark */}
            <div className="text-center select-none px-2">
              <Link href="/" className="inline-block group" aria-label="The Royal Gallerys Home">
                <span
                  className="block text-[8px] sm:text-[9px] uppercase tracking-[0.38em] text-[#5B5B5B] font-light leading-none mb-0.5"
                  style={{ fontFamily: "var(--font-manrope), sans-serif" }}
                >
                  The
                </span>
                <span
                  className="block text-[17px] sm:text-[21px] md:text-[25px] tracking-[0.12em] uppercase text-[#1A1A1A] font-normal leading-none transition-colors group-hover:text-[#24424F]"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  Royal Gallerys
                </span>
              </Link>
            </div>

            {/* Right: Subscribe & Newsletter */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Link
                href="#newsletter"
                className="hidden sm:inline-block text-[11px] sm:text-[12px] uppercase tracking-[0.18em] font-medium text-[#1A1A1A] hover:text-[#24424F] transition-colors border-b border-[#24424F]/30 hover:border-[#24424F] pb-0.5"
                style={{ fontFamily: "var(--font-manrope), sans-serif" }}
              >
                Subscribe
              </Link>
              <Link
                href="#newsletter"
                aria-label="Newsletter subscription"
                className="p-1.5 text-[#5B5B5B] hover:text-[#24424F] transition-colors"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Desktop Nav Row (Visible when not condensed) */}
          {!condensed && (
            <nav
              aria-label="Editorial Categories"
              className="hidden md:flex items-center justify-center space-x-7 lg:space-x-10 mt-3 pt-3 border-t border-[#D9D4CA]/50 transition-all duration-300"
            >
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-[11px] lg:text-[12px] uppercase tracking-[0.22em] text-[#5B5B5B] hover:text-[#24424F] transition-colors font-medium font-sans relative py-0.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-[#24424F] hover:after:w-full after:transition-all after:duration-300"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Slide-out Mobile & Desktop Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <div
            className="fixed inset-0 bg-[#1A1A1A]/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-sm bg-[#FAF8F4] shadow-2xl p-6 sm:p-8 flex flex-col justify-between overflow-y-auto border-r border-[#D9D4CA]">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#D9D4CA]">
                <div className="leading-tight" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                  <span className="block text-[8px] tracking-[0.3em] uppercase text-[#5B5B5B]">The</span>
                  <span className="block text-[19px] tracking-[0.1em] uppercase text-[#1A1A1A]">Royal Gallerys</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="p-2 text-[#5B5B5B] hover:text-[#1A1A1A]"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-8 space-y-5">
                <p className="text-[10px] uppercase tracking-[0.24em] text-[#24424F] font-semibold">Editorial Sections</p>
                <div className="flex flex-col space-y-3">
                  {[
                    { label: "Royalty", href: "/royalty" },
                    { label: "Travel & Hotels", href: "/travel" },
                    { label: "Style & Wardrobe", href: "/style" },
                    { label: "Design & Interiors", href: "/design" },
                    { label: "Jewellery & Gems", href: "/jewellery" },
                    { label: "Watches & Horology", href: "/watches" },
                    { label: "Culture & Arts", href: "/culture" },
                    { label: "Society & Gatherings", href: "/society" },
                    { label: "Motoring", href: "/motoring" },
                    { label: "Fine Dining", href: "/dining" },
                  ].map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-lg text-[#1A1A1A] hover:text-[#24424F] transition-colors py-1 border-b border-[#D9D4CA]/40 font-serif"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-[#D9D4CA] mt-8 text-xs text-[#5B5B5B] space-y-3">
              <p className="font-serif italic text-sm text-[#1A1A1A]">
                The International Magazine of Heritage & Luxury
              </p>
              <div className="flex gap-4">
                <Link href="/ecosystem" className="hover:text-[#24424F]">The Five Houses</Link>
                <Link href="/membership" className="hover:text-[#24424F]">Membership</Link>
                <Link href="/advertise" className="hover:text-[#24424F]">Advertise</Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4">
          <div
            className="fixed inset-0 bg-[#1A1A1A]/50 backdrop-blur-sm transition-opacity"
            onClick={() => setSearchOpen(false)}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-xl bg-[#FAF8F4] border border-[#D9D4CA] p-6 shadow-2xl z-10">
            <div className="flex items-center justify-between pb-4 border-b border-[#D9D4CA]">
              <span className="text-[11px] uppercase tracking-[0.24em] text-[#24424F] font-semibold">Search The Royal Gallerys</span>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-[#5B5B5B] hover:text-[#1A1A1A]"
                aria-label="Close search"
              >
                ✕
              </button>
            </div>
            <div className="mt-4">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hotels, heritage, destinations, architects..."
                className="w-full bg-[#EFE9DF] border border-[#D9D4CA] px-4 py-3 text-base text-[#1A1A1A] placeholder-[#5B5B5B] focus:outline-none focus:border-[#24424F]"
                autoFocus
              />
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#5B5B5B]">
                <span className="font-medium text-[#1A1A1A]">Popular searches:</span>
                {["The Balmoral", "Edinburgh", "Palace Hotels", "Olga Polizzi", "Scottish Baronial", "Palm Court"].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSearchQuery(tag)}
                    className="px-2.5 py-1 bg-[#EFE9DF] text-[#1A1A1A] hover:bg-[#D9D4CA] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
