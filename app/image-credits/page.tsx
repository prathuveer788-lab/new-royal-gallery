import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import fs from "node:fs";
import path from "node:path";

export const metadata: Metadata = {
  title: "Image Credits & Photographic Index | The Royal Gallerys",
  description:
    "Complete photographic index, licensing attributions, and copyright disclosures for The Royal Gallerys — International Magazine of Heritage & Luxury.",
  alternates: {
    canonical: "https://theroyalgallerys.com/image-credits",
  },
};

interface ImageCredit {
  path: string;
  title: string;
  article?: string;
  artist: string;
  license: string;
  sourceUrl: string;
  caption?: string;
  creditRequired?: boolean;
}

function getCredits(): ImageCredit[] {
  try {
    const jsonPath = path.join(process.cwd(), "content", "image-credits.json");
    if (fs.existsSync(jsonPath)) {
      return JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    }
  } catch (err) {
    console.error("Error reading image-credits.json:", err);
  }
  return [];
}

const C = {
  obsidian: "#11110F",
  charcoal: "#1C1B18",
  ivory: "#F4F0E7",
  cream: "#EAE3D5",
  textDeep: "#181714",
  textStone: "#9B9589",
  bronze: "#8A7352",
  champagne: "#B8A47A",
};

export default function ImageCreditsPage() {
  const credits = getCredits();

  return (
    <div style={{ background: C.ivory, minHeight: "100vh" }}>
      {/* ── HEADER / MASTHEAD ── */}
      <header className="pt-32 sm:pt-40 pb-16 sm:pb-20 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.obsidian }}>
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-medium block mb-3" style={{ color: C.champagne }}>
            Legal Disclosures &amp; Visual Index
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-[1.05]" style={{ fontWeight: 400 }}>
            Photographic Credits &amp; Licensing
          </h1>
          <p className="mt-5 text-sm sm:text-base md:text-lg font-sans max-w-3xl leading-relaxed" style={{ color: "rgba(244,240,231,0.75)", fontWeight: 300 }}>
            THE ROYAL GALLERYS is dedicated to rigorous attribution, intellectual property stewardship, and editorial integrity. Every photograph published across our print and digital editions is credited to its respective photographer, archive, or institution under Creative Commons, open documentation, or official press rights.
          </p>
        </div>
      </header>

      {/* ── STATS & POLICY OVERVIEW ── */}
      <section className="py-12 border-b border-[#D9CFC2] px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <span className="text-3xl sm:text-4xl font-serif font-light text-[#181714] block">
              {credits.length}+
            </span>
            <span className="text-xs uppercase tracking-[0.2em] font-sans font-medium text-[#8A7352] mt-1 block">
              Indexed Visual Assets
            </span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-serif font-light text-[#181714] block">
              100%
            </span>
            <span className="text-xs uppercase tracking-[0.2em] font-sans font-medium text-[#8A7352] mt-1 block">
              Verified Legal Provenance
            </span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-serif font-light text-[#181714] block">
              Zero-Stock
            </span>
            <span className="text-xs uppercase tracking-[0.2em] font-sans font-medium text-[#8A7352] mt-1 block">
              Curated Editorial Standard
            </span>
          </div>
        </div>
      </section>

      {/* ── MAIN CREDITS DIRECTORY ── */}
      <main className="py-16 sm:py-24 px-6 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#D9CFC2] pb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#181714]" style={{ fontWeight: 400 }}>
              Visual Archive Catalogue
            </h2>
            <p className="text-sm font-sans text-[#6B6F76] mt-1">
              Photographic entries catalogued across the magazine&apos;s features and heritage chronicles.
            </p>
          </div>
          <div className="text-xs font-sans text-[#8A7352] uppercase tracking-[0.16em]">
            Sorted by Feature Chronology
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {credits.map((item, idx) => (
            <article
              key={`${item.path}-${idx}`}
              className="group border border-[#D9CFC2] p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-md"
              style={{ background: "#FFFFFF" }}
            >
              <div>
                {/* Visual Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#EAE3D5] mb-4 border border-[#ECE5D8]">
                  <Image
                    src={item.path}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                    unoptimized={item.path.endsWith(".avif")}
                  />
                </div>

                {/* Article Badge */}
                {item.article && (
                  <span className="text-[9px] uppercase tracking-[0.22em] font-sans font-semibold text-[#8A7352] block mb-1.5">
                    {item.article}
                  </span>
                )}

                {/* Title */}
                <h3 className="font-serif text-lg text-[#181714] leading-snug mb-2" style={{ fontWeight: 500 }}>
                  {item.title}
                </h3>

                {/* Caption if present */}
                {item.caption && (
                  <p className="font-sans text-xs text-[#6B6F76] leading-relaxed line-clamp-2 mb-3">
                    {item.caption}
                  </p>
                )}
              </div>

              {/* Attribution Meta Box */}
              <div className="pt-4 border-t border-[#F0EAE1] mt-3 space-y-2 text-xs font-sans">
                <div className="flex justify-between items-baseline gap-2">
                  <span className="text-[#9B9589] font-light">Photographer:</span>
                  <span className="text-[#181714] font-medium text-right truncate">
                    {item.artist}
                  </span>
                </div>
                <div className="flex justify-between items-baseline gap-2">
                  <span className="text-[#9B9589] font-light">Licensing:</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wide bg-[#F4F0E7] text-[#8A7352] border border-[#E0D8CB]">
                    {item.license}
                  </span>
                </div>
                {item.sourceUrl && (
                  <div className="pt-2">
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] uppercase tracking-[0.16em] text-[#8A7352] hover:text-[#181714] font-semibold inline-flex items-center gap-1 transition-colors"
                    >
                      Source Archive ↗
                    </a>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* ── ETHICAL ATTRIBUTION & INQUIRY NOTICE ── */}
        <section className="mt-20 p-8 sm:p-12 border border-[#D9CFC2] rounded-none" style={{ background: C.cream }}>
          <div className="max-w-3xl">
            <span className="text-[10px] uppercase tracking-[0.26em] font-sans font-semibold text-[#8A7352] block mb-2">
              Attribution Standards &amp; Rights Requests
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#181714] mb-4" style={{ fontWeight: 400 }}>
              Rights Holders &amp; Editorial Inquiries
            </h3>
            <p className="font-sans text-sm text-[#4A4B4E] leading-relaxed mb-6 font-light">
              THE ROYAL GALLERYS respects the intellectual property and copyright of all photographers, artists, and archival trusts. If you are a copyright holder and believe an image requires amended attribution, licence clarification, or removal, please contact our editorial bureau directly. Inquiries are processed promptly within 24 hours.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="mailto:hey.theroyalgallerys@gmail.com?subject=Image%20Licensing%20Inquiry"
                className="px-6 py-3 text-xs uppercase tracking-[0.2em] font-sans font-medium text-white transition-colors"
                style={{ background: C.obsidian }}
              >
                Contact Rights Desk
              </a>
              <Link
                href="/"
                className="px-6 py-3 text-xs uppercase tracking-[0.2em] font-sans font-medium text-[#181714] border border-[#8A7352] hover:bg-[#F4F0E7] transition-colors"
              >
                Return to Journal
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
