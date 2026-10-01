"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [member, setMember] = useState<{ firstName: string; membershipId: string } | null>(null);

  const handlePublicSignOut = async () => {
    try {
      await fetch("/api/member/logout", { method: "POST" });
    } catch {}
    setMember(null);
    router.refresh();
  };

  useEffect(() => {
    fetch("/api/member/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.authenticated && data?.member) {
          setMember(data.member);
        } else {
          setMember(null);
        }
      })
      .catch(() => setMember(null));
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  if (pathname?.startsWith("/travel/the-balmoral") || pathname?.startsWith("/member/dashboard")) {
    return null;
  }

  const primaryLinks = [
    { href: "/style", label: "Style" },
    { href: "/jewellery", label: "Jewellery" },
    { href: "/watches", label: "Watches" },
    { href: "/weddings", label: "Weddings" },
    { href: "/travel", label: "Travel" },
    { href: "/design", label: "Design" },
    { href: "/culture", label: "Culture" },
    { href: "/royalty", label: "Royalty" },
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
          {primaryLinks.map((link) => {
            if (link.label === "Society") {
              return (
                <div key={link.href} className="relative group/society">
                  <Link
                    href={link.href}
                    className="px-1.5 xl:px-2.5 py-2 text-[13px] xl:text-[14px] tracking-[0.14em] uppercase transition-colors duration-300 whitespace-nowrap font-sans inline-flex items-center gap-1"
                    style={{
                      color: scrolled ? "#9B9589" : "#B8A47A",
                      fontWeight: 400,
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#F4F0E7"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = scrolled ? "#9B9589" : "#B8A47A"; }}
                  >
                    <span>{link.label}</span>
                    <span className="text-[8px] opacity-60">▾</span>
                  </Link>

                  {/* Dropdown menu */}
                  <div
                    className="absolute top-full left-0 min-w-[240px] py-3 opacity-0 translate-y-2 pointer-events-none group-hover/society:opacity-100 group-hover/society:translate-y-0 group-hover/society:pointer-events-auto transition-all duration-300 shadow-xl border border-[rgba(138,115,82,0.3)]"
                    style={{ background: "#11110F" }}
                  >
                    <Link
                      href="/society"
                      className="block px-5 py-2 text-xs uppercase tracking-[0.16em] font-sans text-[#F4F0E7]/80 hover:text-[#D4673A] hover:bg-white/5 transition-colors"
                    >
                      Society Overview
                    </Link>
                    <Link
                      href="/society/portraits-of-heritage"
                      className="block px-5 py-2 text-xs uppercase tracking-[0.16em] font-sans text-[#D4673A] hover:bg-white/5 transition-colors font-medium"
                    >
                      ★ Portraits of Heritage
                    </Link>
                    <Link
                      href="/society/aaliya-sultana-babi-dinosaur-princess-balasinor"
                      className="block px-5 py-2 text-[11px] font-serif italic text-[#F4F0E7]/70 hover:text-[#F4F0E7] hover:bg-white/5 transition-colors"
                    >
                      The Dinosaur Princess Profile →
                    </Link>
                    <Link
                      href="/society/shivanjali-kumari-dungarpur-wild-lens-of-royalty"
                      className="block px-5 py-2 text-[11px] font-serif italic text-[#C4687F] hover:text-white hover:bg-white/5 transition-colors"
                    >
                      ★ Wild Lens of Royalty Profile →
                    </Link>
                  </div>
                </div>
              );
            }

            return (
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
            );
          })}
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
            className="ml-2 px-3 xl:px-4 py-2 text-[11px] xl:text-[12px] uppercase tracking-[0.16em] transition-all duration-500 font-sans font-medium"
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
            The Circle
          </Link>
          {member ? (
            <div className="flex items-center gap-1.5 ml-2">
              <Link
                href="/member/dashboard"
                className="px-3 xl:px-4 py-2 text-[11px] xl:text-[12px] uppercase tracking-[0.16em] transition-all duration-300 font-sans font-medium flex items-center gap-2 group"
                style={{
                  background: "linear-gradient(135deg, rgba(212,175,55,0.22) 0%, rgba(184,164,122,0.12) 100%)",
                  border: "1px solid rgba(212,175,55,0.75)",
                  color: "#F7F5F0",
                }}
                title={`Enter Private World as ${member.firstName ? member.firstName.toUpperCase() : "MEMBER"}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="tracking-[0.18em]">✦ PRIVATE WORLD</span>
                {member.firstName && (
                  <span className="text-[10px] text-[#C5A880] tracking-wider uppercase font-mono pl-1.5 border-l border-[#8A7352]/40 hidden xl:inline">
                    {member.firstName.toUpperCase()}
                  </span>
                )}
              </Link>
              <button
                type="button"
                onClick={handlePublicSignOut}
                className="px-2 py-2 text-[10px] uppercase tracking-wider font-sans text-[#777777] hover:text-[#D4AF37] transition-colors"
                title="Sign Out of Circle"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/member/login"
              className="ml-2 px-3 xl:px-4 py-2 text-[11px] xl:text-[12px] uppercase tracking-[0.16em] transition-all duration-500 font-sans font-medium"
              style={{
                color: "#D4AF37",
                border: "1px solid rgba(212,175,55,0.5)",
                background: "rgba(212,175,55,0.06)",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background = "rgba(212,175,55,0.18)";
                (e.target as HTMLElement).style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = "rgba(212,175,55,0.06)";
                (e.target as HTMLElement).style.color = "#D4AF37";
              }}
            >
              Member Login
            </Link>
          )}
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
        className="lg:hidden absolute top-full left-0 w-full transition-all duration-300 max-h-[calc(100dvh-70px)] overflow-y-auto overscroll-contain shadow-2xl"
        style={{
          background: "#11110F",
          borderBottom: "1px solid rgba(138,115,82,0.25)",
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateY(0)" : "translateY(-8px)",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        <div className="px-5 sm:px-8 py-6 flex flex-col gap-5 text-sm font-sans" style={{ color: "#F4F0E7" }}>
          
          {/* Editorial Sections Grid */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] font-sans font-semibold mb-2.5 px-1 text-[#8A7352]">
              Sections
            </div>
            <div className="grid grid-cols-2 gap-2">
              {primaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2.5 rounded-xs tracking-[0.12em] uppercase text-[12px] font-medium transition-colors border border-white/5 bg-white/[0.02] hover:bg-[#8A7352]/20 hover:text-[#B8A47A] hover:border-[#8A7352]/40"
                  style={{ color: pathname === link.href ? "#B8A47A" : "#F4F0E7" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Society Special Series Feature Card */}
          <div className="p-4 bg-white/[0.03] border border-[#8A7352]/30 rounded-xs">
            <span className="text-[9px] uppercase tracking-[0.24em] font-semibold text-[#D4673A] block mb-1">
              Curated Series · Society
            </span>
            <div className="flex flex-col gap-2 mt-2">
              <Link
                href="/society/portraits-of-heritage"
                onClick={() => setIsOpen(false)}
                className="text-[11px] uppercase tracking-[0.16em] text-[#B8A47A] hover:underline"
              >
                ★ Portraits of Heritage
              </Link>
              <Link
                href="/society/shivanjali-kumari-dungarpur-wild-lens-of-royalty"
                onClick={() => setIsOpen(false)}
                className="text-[12px] font-serif italic text-white/90 hover:text-[#C4687F]"
              >
                Shivanjali Kumari Dungarpur — Wild Lens →
              </Link>
              <Link
                href="/society/aaliya-sultana-babi-dinosaur-princess-balasinor"
                onClick={() => setIsOpen(false)}
                className="text-[12px] font-serif italic text-white/80 hover:text-white"
              >
                The Dinosaur Princess of Balasinor →
              </Link>
            </div>
          </div>

          {/* Utility & Membership */}
          <div className="flex flex-col gap-3 pt-2 border-t border-white/10">
            <div className="flex items-center justify-between text-xs tracking-[0.16em] uppercase text-[#9B9589] px-1">
              {utilityLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-[#B8A47A] transition-colors py-1"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="hover:text-[#B8A47A] transition-colors py-1"
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="hover:text-[#B8A47A] transition-colors py-1"
              >
                Contact
              </Link>
            </div>

            <Link
              href="/membership"
              onClick={() => setIsOpen(false)}
              className="mt-1 w-full text-center py-3 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 font-sans block"
              style={{
                color: "#F4F0E7",
                background: "rgba(138,115,82,0.15)",
                border: "1px solid rgba(184,164,122,0.6)",
              }}
            >
              The Royal Gallery Circle (₹3,999 Lifetime)
            </Link>

            {member ? (
              <div className="space-y-2 p-3 bg-white/[0.04] border border-[#D4AF37]/40 rounded-xs">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-[#D4AF37] uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    MEMBER ACTIVE
                  </span>
                  {member.firstName && (
                    <span className="text-[#C5A880] uppercase">
                      {member.firstName.toUpperCase()}
                    </span>
                  )}
                </div>
                <Link
                  href="/member/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-3 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 font-sans flex items-center justify-center gap-2 shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #B8A47A 0%, #D4AF37 100%)",
                    color: "#0C0C0D",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-800" />
                  <span>✦ Enter Private World</span>
                </Link>
                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      handlePublicSignOut();
                    }}
                    className="text-[11px] uppercase tracking-wider text-[#888888] hover:text-red-400 transition-colors"
                  >
                    Sign Out →
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/member/login"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-3 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 font-sans border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 block"
              >
                Member Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
