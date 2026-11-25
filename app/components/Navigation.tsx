"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LIGHT_HEADER_ROUTES = [
  "/membership",
  "/member/login",
  "/member/forgot-password",
  "/member/reset-password",
  "/editorial-office",
  "/admin",
  "/circle",
];

function isLightRgbColor(bg: string): boolean | null {
  const match = bg.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/i);
  if (!match) return null;
  const alpha = match[4] !== undefined ? parseFloat(match[4]) : 1;
  if (alpha < 0.5) return null;
  const r = Number(match[1]);
  const g = Number(match[2]);
  const b = Number(match[3]);
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return luminance > 185;
}

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const navRef = useRef<HTMLElement | null>(null);
  const [openPath, setOpenPath] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [detectedLightBg, setDetectedLightBg] = useState(false);
  const [member, setMember] = useState<{ firstName: string; membershipId: string } | null>(null);

  const isOpen = openPath === pathname;
  const setIsOpen = (next: boolean) => setOpenPath(next ? pathname : null);

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
    const checkBehindNav = () => {
      const isScrolled = window.scrollY > 60;
      setScrolled(isScrolled);
      if (isScrolled) {
        setDetectedLightBg(false);
        return;
      }

      const elements = document.elementsFromPoint(window.innerWidth / 2, 32);
      for (const el of elements) {
        if (navRef.current && navRef.current.contains(el)) continue;
        if (el.tagName === "IMG" || el.tagName === "VIDEO" || el.tagName === "CANVAS") {
          setDetectedLightBg(false);
          return;
        }
        const style = window.getComputedStyle(el);
        if (style.backgroundImage && style.backgroundImage !== "none") {
          setDetectedLightBg(false);
          return;
        }
        const isLight = isLightRgbColor(style.backgroundColor);
        if (isLight !== null) {
          setDetectedLightBg(isLight);
          return;
        }
      }
      setDetectedLightBg(false);
    };

    checkBehindNav();
    window.addEventListener("scroll", checkBehindNav, { passive: true });
    window.addEventListener("resize", checkBehindNav, { passive: true });
    return () => {
      window.removeEventListener("scroll", checkBehindNav);
      window.removeEventListener("resize", checkBehindNav);
    };
  }, [pathname]);

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

  if (pathname?.startsWith("/member/dashboard")) {
    return null;
  }

  const objectiveLinks = [
    { href: "/blogs?category=Style", label: "Style" },
    { href: "/blogs?category=Jewellery", label: "Jewellery" },
    { href: "/blogs?category=Watches", label: "Watches" },
    { href: "/blogs?category=Weddings", label: "Weddings" },
    { href: "/blogs?category=Travel", label: "Travel" },
    { href: "/blogs?category=UK", label: "UK" },
    { href: "/blogs?category=Design", label: "Design" },
    { href: "/blogs?category=Culture", label: "Culture" },
    { href: "/blogs?category=Royalty", label: "Royalty" },
    { href: "/blogs?category=Society", label: "Society" },
    { href: "/blogs?category=Motoring", label: "Motoring" },
    { href: "/blogs?category=Dining", label: "Dining" },
    { href: "/blogs?category=Business", label: "Business" },
    { href: "/blogs?category=Future", label: "Future" },
  ];

  const societyLinks = [
    { href: "/blogs?category=Society", label: "Society Overview" },
    { href: "/blogs?category=Society&sub=Portraits%20of%20Heritage", label: "★ Portraits of Heritage" },
    { href: "/blogs?category=Society&sub=The%20Dinosaur%20Princess%20Profile", label: "The Dinosaur Princess Profile →" },
    { href: "/blogs?category=Society&sub=Wild%20Lens%20of%20Royalty%20Profile", label: "★ Wild Lens of Royalty Profile →" },
  ];

  const isKnownLightRoute = LIGHT_HEADER_ROUTES.some((route) =>
    pathname?.startsWith(route)
  );
  const isLightTop = !scrolled && (isKnownLightRoute || detectedLightBg);

  // On light/white backgrounds at top: black text (#11110F). On dark hero or scrolled bar: ivory text (#F4F0E7).
  const textColor = isLightTop ? "text-[#11110F]" : "text-[#F4F0E7]";
  const navLinkColor = scrolled ? "#9B9589" : isLightTop ? "#11110F" : "#B8A47A";
  const hoverTextColor = isLightTop ? "#8A7352" : "#F4F0E7";

  return (
    <nav
      ref={navRef}
      className="fixed top-0 w-full z-[100] transition-all duration-700"
      style={{
        background: scrolled ? "#11110F" : "transparent",
        borderBottom: scrolled
          ? "1px solid rgba(138,115,82,0.18)"
          : isLightTop
            ? "1px solid rgba(17,17,15,0.08)"
            : "1px solid transparent",
      }}
    >
      <div className="flex items-center justify-between gap-6 px-6 sm:px-8 lg:px-10 py-4">

        {/* ════════ MASTHEAD LOGO ════════ */}
        <Link href="/" className="group flex-shrink-0 select-none" aria-label="The Royal Gallerys — Home">
          <div className="leading-none" style={{ fontFamily: "var(--font-cormorant), serif" }}>
            <span className={`block text-[9px] sm:text-[10px] tracking-[0.38em] uppercase font-light transition-colors duration-500 ${textColor} ${isLightTop ? "opacity-70" : "opacity-60"}`}>
              The
            </span>
            <span className={`block text-[20px] sm:text-[22px] lg:text-[24px] tracking-[0.07em] uppercase font-normal transition-colors duration-500 leading-none ${textColor}`}>
              Royal Gallerys
            </span>
          </div>
        </Link>

        {/* ════════ DESKTOP NAV ════════ */}
        <div className="hidden lg:flex items-center gap-0.5">
          <div className="relative group/objective">
            <Link
              href="/blogs"
              className="px-1.5 xl:px-2.5 py-2 text-[13px] xl:text-[14px] tracking-[0.14em] uppercase transition-colors duration-300 whitespace-nowrap font-sans inline-flex items-center gap-1"
              style={{
                color: navLinkColor,
                fontWeight: 400,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = hoverTextColor; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = navLinkColor; }}
              aria-haspopup="true"
            >
              <span>Objective</span>
              <span className="text-[8px] opacity-60">▾</span>
            </Link>

            {/* Objective dropdown */}
            <div
              className="absolute top-full left-0 min-w-[250px] py-2 opacity-0 translate-y-2 pointer-events-none group-hover/objective:opacity-100 group-hover/objective:translate-y-0 group-hover/objective:pointer-events-auto group-focus-within/objective:opacity-100 group-focus-within/objective:translate-y-0 group-focus-within/objective:pointer-events-auto transition-all duration-300 shadow-xl border border-[rgba(138,115,82,0.3)]"
              style={{ background: "#11110F" }}
            >
              {objectiveLinks.map((link) => {
                if (link.label === "Society") {
                  return (
                    <div key={link.label} className="relative group/society">
                      <Link
                        href={link.href}
                        className="flex items-center justify-between gap-6 px-5 py-2 text-xs uppercase tracking-[0.16em] font-sans text-[#F4F0E7]/80 hover:text-[#D4673A] hover:bg-white/5 transition-colors"
                      >
                        <span>{link.label}</span>
                        <span className="text-[8px] opacity-60">▸</span>
                      </Link>

                      {/* Society submenu */}
                      <div
                        className="absolute top-0 left-full min-w-[260px] py-2 opacity-0 translate-x-1 pointer-events-none group-hover/society:opacity-100 group-hover/society:translate-x-0 group-hover/society:pointer-events-auto group-focus-within/society:opacity-100 group-focus-within/society:translate-x-0 group-focus-within/society:pointer-events-auto transition-all duration-300 shadow-xl border border-[rgba(138,115,82,0.3)]"
                        style={{ background: "#11110F" }}
                      >
                        {societyLinks.map((s, i) => (
                          <Link
                            key={s.label}
                            href={s.href}
                            className={
                              i === 0
                                ? "block px-5 py-2 text-xs uppercase tracking-[0.16em] font-sans text-[#F4F0E7]/80 hover:text-[#D4673A] hover:bg-white/5 transition-colors"
                                : i === 1
                                  ? "block px-5 py-2 text-xs uppercase tracking-[0.16em] font-sans text-[#D4673A] hover:bg-white/5 transition-colors font-medium"
                                  : i === 2
                                    ? "block px-5 py-2 text-[11px] font-serif italic text-[#F4F0E7]/70 hover:text-[#F4F0E7] hover:bg-white/5 transition-colors"
                                    : "block px-5 py-2 text-[11px] font-serif italic text-[#C4687F] hover:text-white hover:bg-white/5 transition-colors"
                            }
                          >
                            {s.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block px-5 py-2 text-xs uppercase tracking-[0.16em] font-sans text-[#F4F0E7]/80 hover:text-[#D4673A] hover:bg-white/5 transition-colors"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <Link
            href="/membership"
            className="ml-2 px-3 xl:px-4 py-2 text-[11px] xl:text-[12px] uppercase tracking-[0.16em] transition-all duration-500 font-sans font-medium"
            style={{
              color: isLightTop ? "#11110F" : "#F4F0E7",
              border: isLightTop ? "1px solid rgba(17,17,15,0.45)" : "1px solid rgba(138,115,82,0.45)",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background = isLightTop ? "rgba(17,17,15,0.08)" : "rgba(138,115,82,0.15)";
              (e.target as HTMLElement).style.borderColor = isLightTop ? "#11110F" : "rgba(184,164,122,0.7)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = "transparent";
              (e.target as HTMLElement).style.borderColor = isLightTop ? "rgba(17,17,15,0.45)" : "rgba(138,115,82,0.45)";
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
                  color: isLightTop ? "#11110F" : "#F7F5F0",
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
                color: isLightTop ? "#11110F" : "#D4AF37",
                border: isLightTop ? "1px solid rgba(17,17,15,0.55)" : "1px solid rgba(212,175,55,0.5)",
                background: isLightTop ? "rgba(17,17,15,0.05)" : "rgba(212,175,55,0.06)",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background = isLightTop ? "#11110F" : "rgba(212,175,55,0.18)";
                (e.target as HTMLElement).style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = isLightTop ? "rgba(17,17,15,0.05)" : "rgba(212,175,55,0.06)";
                (e.target as HTMLElement).style.color = isLightTop ? "#11110F" : "#D4AF37";
              }}
            >
              Member Login
            </Link>
          )}
        </div>

        {/* ════════ MOBILE TOGGLE ════════ */}
        <button
          className="lg:hidden text-2xl p-2 transition-colors duration-500 flex-shrink-0"
          style={{ color: isLightTop ? "#11110F" : "#F4F0E7" }}
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
              Objective
            </div>
            <div className="grid grid-cols-2 gap-2">
              {objectiveLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2.5 rounded-xs tracking-[0.12em] uppercase text-[12px] font-medium transition-colors border border-white/5 bg-white/[0.02] hover:bg-[#8A7352]/20 hover:text-[#B8A47A] hover:border-[#8A7352]/40"
                  style={{ color: "#F4F0E7" }}
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
              {societyLinks.map((s, i) => (
                <Link
                  key={s.label}
                  href={s.href}
                  onClick={() => setIsOpen(false)}
                  className={
                    i === 0
                      ? "text-[11px] uppercase tracking-[0.16em] text-[#F4F0E7]/85 hover:text-[#D4673A]"
                      : i === 1
                        ? "text-[11px] uppercase tracking-[0.16em] text-[#B8A47A] hover:underline"
                        : i === 2
                          ? "text-[12px] font-serif italic text-white/80 hover:text-white"
                          : "text-[12px] font-serif italic text-white/90 hover:text-[#C4687F]"
                  }
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Utility & Membership */}
          <div className="flex flex-col gap-3 pt-2 border-t border-white/10">
            <div className="flex items-center justify-between text-xs tracking-[0.16em] uppercase text-[#9B9589] px-1">
              <Link
                href="/blogs"
                onClick={() => setIsOpen(false)}
                className="hover:text-[#B8A47A] transition-colors py-1"
              >
                Blogs
              </Link>
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
