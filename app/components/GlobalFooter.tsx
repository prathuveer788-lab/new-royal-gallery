"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const objectiveFooterLinks = [
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

const footerSections = [
  {
    title: "Connect",
    links: [
      { href: "https://www.instagram.com/theroyalgallerys/", label: "Instagram" },
      { href: "mailto:hey.theroyalsgallery@gmail.com", label: "Email" },
      { href: "/advertise", label: "Advertise" },
      { href: "/member/login", label: "Member Login" },
    ],
  },
];

export default function GlobalFooter() {
  const pathname = usePathname();

  if (pathname?.startsWith("/member/dashboard")) {
    return null;
  }

  return (
    <footer style={{ background: "#11110F", color: "#F4F0E7" }} className="pt-10 sm:pt-12 md:pt-14 pb-6 sm:pb-8 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 mt-auto">
      <div className="max-w-7xl mx-auto">
        <hr className="editorial-rule mb-8 sm:mb-10 opacity-30" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-8 sm:mb-10">
          <div className="lg:col-span-1 space-y-3">
            <div className="text-center sm:text-left leading-none" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              <span className="block text-[clamp(7px,1vw,10px)] tracking-[0.38em] uppercase font-light opacity-50" style={{ color: "#9B9589" }}>The</span>
              <span className="block text-[clamp(20px,2.5vw,28px)] tracking-[0.08em] uppercase font-normal mt-0.5" style={{ color: "#F4F0E7" }}>Royal Gallerys</span>
            </div>
            <p className="text-[clamp(6px,0.7vw,8px)] tracking-[0.28em] uppercase mt-1" style={{ color: "#8A7352", fontFamily: "var(--font-manrope), sans-serif", fontWeight: 500 }}>
              Heritage · Culture · Luxury · Influence
            </p>
            <p className="text-xs sm:text-sm font-light leading-relaxed" style={{ color: "#9B9589" }}>
              The international magazine for heritage, culture and luxury — editorial authority on the people, places and ideas shaping our world.
            </p>
            <div className="pt-1">
              <a
                href="mailto:hey.theroyalsgallery@gmail.com"
                className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-mono text-[#C4A97D] hover:text-[#FAF8F5] transition-colors duration-300 break-all"
              >
                hey.theroyalsgallery@gmail.com
              </a>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-semibold font-sans mb-3" style={{ color: "#8A7352" }}>
              <Link href="/blogs" className="hover:text-[#F4F0E7] transition-colors duration-300">
                Objective
              </Link>
            </h4>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-2 text-xs sm:text-sm font-light" style={{ color: "#9B9589" }}>
              {objectiveFooterLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-[#F4F0E7] transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {footerSections.map((col) => (
            <div key={col.title} className="space-y-3">
              <h4 className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-semibold font-sans mb-3" style={{ color: "#8A7352" }}>{col.title}</h4>
              <ul className="flex flex-col gap-2 text-xs sm:text-sm font-light" style={{ color: "#9B9589" }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-[#F4F0E7] transition-colors duration-300">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="editorial-rule mb-5 sm:mb-6 opacity-25" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.14em] text-center sm:text-left font-light font-sans" style={{ color: "#9B9589" }}>
          <p>© 2026 The Royal Gallerys. All rights reserved.</p>
          <p style={{ color: "#8A7352" }}>Preserving Legacy · Amplifying Heritage · Shaping Cultural Memory</p>
        </div>
      </div>
    </footer>
  );
}
