import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import IntroVideo from "./components/IntroVideo";
import MaharaniMahansarExperience from "./components/MaharaniMahansarExperience";

export const metadata: Metadata = {
  title: "THE ROYAL GALLERYS | Heritage, Culture & Luxury — The International Magazine",
  description:
    "The international magazine for heritage, culture and luxury — authoritative journalism on British, European and subcontinental royal houses, palace hotels, historic country estates, and the future of living tradition.",
  alternates: {
    canonical: "https://theroyalgallerys.com",
  },
};

const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNkZGRkZGQiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

/* ── COLOUR CONSTANTS ─────────────────────────────── */
const C = {
  obsidian: "#11110F",
  charcoal: "#1C1B18",
  forest: "#17261F",
  oxblood: "#4A171B",
  ivory: "#F4F0E7",
  cream: "#EAE3D5",
  textDeep: "#181714",
  textStone: "#9B9589",
  bronze: "#8A7352",
  champagne: "#B8A47A",
};

/* ── SHARED EDITORIAL MICRO-COMPONENTS ─────────────── */

function SectionNumber({ n }: { n: string }) {
  return (
    <span
      className="block text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-medium font-sans mb-5 sm:mb-6"
      style={{ color: C.bronze }}
    >
      {n}
    </span>
  );
}

function EditorialRule({ short }: { short?: boolean }) {
  return (
    <hr
      className="border-0"
      style={{
        height: 1,
        background: "rgba(138,115,82,0.35)",
        width: short ? 64 : "100%",
        margin: short ? "0 auto" : undefined,
      }}
    />
  );
}

/* ── PAGE ────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div style={{ background: C.ivory }}>

      {/* ════════════════════════════════════════════════
          01 — HERO / MAGAZINE COVER
          ════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/jaipur-city-palace-grand-facade.jpg"
            alt="Jaipur City Palace Chandra Mahal complex"
            fill
            priority
            placeholder="blur"
            blurDataURL={blurDataURL}
            className="object-cover"
          />
          {/* Deep cinematic overlay */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(17,17,15,0.92), rgba(17,17,15,0.65), rgba(17,17,15,0.88))" }} />
        </div>

        {/* Decorative top accent */}
        <div
          className="absolute top-14 sm:top-18 left-1/2 -translate-x-1/2"
          style={{ width: "clamp(40px,8vw,80px)", height: 1, background: "rgba(184,164,122,0.5)" }}
        />

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-8 md:px-12 pt-20 pb-16 text-center">
          {/* Volume */}
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.48em] font-medium font-sans mb-10 sm:mb-12" style={{ color: C.champagne, opacity: 0.75 }}>
            Volume I · Summer 2026
          </p>

          {/* Masthead */}
          <p className="text-[clamp(10px,1.1vw,12px)] uppercase tracking-[0.32em] font-light font-sans mb-6 sm:mb-8" style={{ color: C.bronze }}>
            The Royal Gallerys
          </p>

          {/* Main cover line */}
          <h1 className="text-[clamp(2.2rem,4.8vw,4.6rem)] font-serif leading-[1.05] mb-8 sm:mb-10" style={{ color: C.ivory, fontWeight: 400 }}>
            The International<br />
            Magazine of<br />
            Heritage &amp; Luxury
          </h1>

          {/* Deck */}
          <p className="text-[clamp(11px,1.3vw,14px)] uppercase tracking-[0.26em] font-light font-sans mb-14 sm:mb-16" style={{ color: C.textStone }}>
            Royalty · Travel · Style · Design · Culture · Society
          </p>

          {/* CTA */}
          <a
            href="#the-magazine"
            className="inline-block text-[11px] sm:text-xs uppercase tracking-[0.28em] font-medium font-sans px-10 sm:px-14 py-3.5 sm:py-4 transition-all duration-700"
            style={{ color: C.champagne, border: "1px solid rgba(184,164,122,0.35)" }} >
            Enter the Magazine →
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: C.ivory, opacity: 0.18 }}>
          <span className="text-[8px] uppercase tracking-[0.32em] font-sans">Scroll</span>
          <div className="w-px h-12" style={{ background: `linear-gradient(to bottom, ${C.ivory}, transparent)` }} />
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          OFFICIAL INTRODUCTION FILM
          ════════════════════════════════════════════════ */}
      <IntroVideo />

      {/* ════════════════════════════════════════════════
          MAHARANI MAHANSAR — HERITAGE LIQUEUR EXPERIENCE
          ════════════════════════════════════════════════ */}
      <MaharaniMahansarExperience />

      {/* ════════════════════════════════════════════════
          02 — THE MAGAZINE
          ════════════════════════════════════════════════ */}
      <section id="the-magazine" className="py-24 sm:py-32 md:py-40 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.ivory }}>
        <div className="max-w-4xl mx-auto text-center">
          <SectionNumber n="02 — The Magazine" />

          <h2 className="text-[clamp(2rem,4.5vw,4.2rem)] font-serif leading-[1.08] tracking-tight mb-8 sm:mb-10" style={{ color: C.textDeep, fontWeight: 400 }}>
            A World of Heritage.<br />
            <span style={{ color: C.bronze }}>A New Language of Luxury.</span>
          </h2>

          <div className="mb-10 sm:mb-12">
            <EditorialRule short />
          </div>

          <p className="text-base sm:text-lg md:text-xl font-sans leading-relaxed max-w-3xl mx-auto mb-12 sm:mb-14" style={{ color: C.textStone, fontWeight: 400 }}>
            THE ROYAL GALLERYS is an international magazine dedicated to the worlds of heritage, culture and contemporary luxury. From royal families and historic estates to fashion, jewellery, architecture, travel, art, hospitality and design — we document the people and places carrying extraordinary traditions into the modern world.
          </p>

          <Link
            href="/global-vision"
            className="inline-block text-[11px] sm:text-xs uppercase tracking-[0.22em] font-medium font-sans px-10 sm:px-12 py-3.5 transition-all duration-500"
            style={{ color: C.ivory, background: C.obsidian }} >
            Read Our Story →
          </Link>
        </div>
      </section>

    </div>
  );
}
