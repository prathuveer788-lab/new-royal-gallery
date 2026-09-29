"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const footerSections = [
  {
    title: "Sections",
    links: [
      { href: "/style", label: "Style" },
      { href: "/jewellery", label: "Jewellery" },
      { href: "/watches", label: "Watches" },
      { href: "/weddings", label: "Weddings" },
      { href: "/travel", label: "Travel" },
      { href: "/royalty", label: "Royalty" },
      { href: "/design", label: "Design" },
      { href: "/culture", label: "Culture" },
      { href: "/society", label: "Society" },
      { href: "/motoring", label: "Motoring" },
      { href: "/dining", label: "Dining" },
      { href: "/business", label: "Business" },
      { href: "/futures", label: "Futures" },
      { href: "/archive", label: "Archive" },
    ],
  },
  {
    title: "Institute",
    links: [
      { href: "/ecosystem", label: "Five Houses" },
      { href: "/global-vision", label: "Global Vision" },
      { href: "/impact", label: "Our Impact" },
      { href: "/membership", label: "The Royal Gallery Circle" },
      { href: "/image-credits", label: "Image Credits & Licensing" },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: "https://www.instagram.com/theroyalgallerys/", label: "Instagram" },
      { href: "mailto:hey.theroyalgallerys@gmail.com", label: "Email" },
      { href: "/advertise", label: "Advertise" },
      { href: "/member/login", label: "Member Login" },
    ],
  },
];

export default function GlobalFooter() {
  const pathname = usePathname();

  if (pathname?.startsWith("/travel/the-balmoral")) {
    return null;
  }

  return (
    <footer style={{ background: "#11110F", color: "#F4F0E7" }} className="pt-16 sm:pt-20 md:pt-28 pb-8 sm:pb-10 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 mt-auto">
      <div className="max-w-7xl mx-auto">
        <hr className="editorial-rule mb-16 sm:mb-20 opacity-30" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 sm:gap-12 mb-16 sm:mb-20">
          <div className="lg:col-span-1 space-y-5">
            <div className="text-center sm:text-left leading-none" style={{ fontFamily: "var(--font-cormorant), serif" }}>
              <span className="block text-[clamp(7px,1vw,10px)] tracking-[0.38em] uppercase font-light opacity-50" style={{ color: "#9B9589" }}>The</span>
              <span className="block text-[clamp(20px,2.8vw,30px)] tracking-[0.08em] uppercase font-normal mt-0.5" style={{ color: "#F4F0E7" }}>Royal Gallerys</span>
            </div>
            <p className="text-[clamp(5px,0.7vw,7px)] tracking-[0.28em] uppercase mt-1" style={{ color: "#8A7352", fontFamily: "var(--font-manrope), sans-serif", fontWeight: 500 }}>
              Heritage · Culture · Luxury · Influence
            </p>
            <p className="text-sm font-light leading-relaxed" style={{ color: "#9B9589" }}>
              The international magazine for heritage, culture and luxury — editorial authority on the people, places and ideas shaping our world.
            </p>
            <div className="pt-2">
              <a
                href="mailto:hey.theroyalsgallery@gmail.com"
                className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.24em] font-mono text-[#C4A97D] hover:text-[#FAF8F5] transition-colors duration-300 break-all"
              >
                hey.theroyalsgallery@gmail.com
              </a>
            </div>
          </div>

          {footerSections.map((col) => (
            <div key={col.title} className="space-y-4">
              <h4 className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-semibold font-sans mb-5" style={{ color: "#8A7352" }}>{col.title}</h4>
              <ul className="flex flex-col gap-3 text-sm font-light" style={{ color: "#9B9589" }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="hover:text-[#F4F0E7] transition-colors duration-300">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="editorial-rule mb-8 sm:mb-10 opacity-25" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.14em] text-center sm:text-left font-light font-sans" style={{ color: "#9B9589" }}>
          <div className="flex items-center gap-3">
            <p>© 2026 The Royal Gallerys. All rights reserved.</p>
            <span>·</span>
            <Link href="/image-credits" className="hover:text-[#F4F0E7] transition-colors underline decoration-[#8A7352]/40 underline-offset-4">Image Credits</Link>
          </div>
          <p style={{ color: "#8A7352" }}>Preserving Legacy · Amplifying Heritage · Shaping Cultural Memory</p>
        </div>
      </div>
    </footer>
  );
}
