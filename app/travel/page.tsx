import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { allArticles } from "@/lib/travel-articles";
import NewsletterForm from "../components/NewsletterForm";
import TravelEditorialFeed from "../components/TravelEditorialFeed";

export const metadata: Metadata = {
  title:
    "Travel — Luxury Hotels, Palaces & Destinations | THE ROYAL GALLERYS",
  description:
    "Explore extraordinary hotels, royal palaces, destinations, journeys and luxury travel experiences from India and around the world.",
};

const C = {
  obsidian: "#11110F",
  charcoal: "#1C1B18",
  forest: "#17261F",
  ivory: "#F4F0E7",
  cream: "#EAE3D5",
  textDeep: "#181714",
  textStone: "#9B9589",
  bronze: "#8A7352",
  champagne: "#B8A47A",
};

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNkZGRkZGQiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

const travelArticles = allArticles.filter(
  (a) => a.editorialSection === "travel",
);
const hotelsCount = travelArticles.filter(
  (a) => a.editorialSubcategory === "hotels",
).length;

export default function TravelPage() {
  return (
    <div style={{ background: C.ivory }}>
      {/* ══════════ HERO ══════════ */}
      <section className="relative min-h-[65vh] sm:min-h-[75vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/colorful-vibrant-indian-landscape.jpg"
            alt="Luxury Travel"
            fill
            priority
            placeholder="blur"
            blurDataURL={blurDataURL}
            className="object-cover"
          />
          <div className="absolute inset-0" style={{ background: "rgba(17,17,15,0.55)" }} />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pt-28 sm:pt-36 pb-12 sm:pb-16">
          <span className="text-[10px]/[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.champagne }}>
            The Royal Gallerys
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif leading-[0.95] mt-4 mb-6 max-w-3xl tracking-tight" style={{ color: C.ivory, fontWeight: 400 }}>
            Travel
          </h1>
          <p className="text-sm sm:text-base md:text-lg font-sans font-normal leading-relaxed max-w-xl mb-5" style={{ color: C.textStone }}>
            The world&apos;s most extraordinary journeys, places and experiences
          </p>
          <div className="flex items-center gap-3 text-[10px]/[11px] font-sans font-normal" style={{ color: "rgba(244,240,231,0.5)" }}>
            <span>{travelArticles.length} Stories</span>
            <span style={{ color: "rgba(244,240,231,0.2)" }}>·</span>
            <span>6 Continents</span>
            <span style={{ color: "rgba(244,240,231,0.2)" }}>·</span>
            <span>20 Countries</span>
            <span style={{ color: "rgba(244,240,231,0.2)" }}>·</span>
            <span>{hotelsCount} Palaces</span>
          </div>
        </div>
      </section>

      {/* ══════════ EDITORIAL FEED ══════════ */}
      <TravelEditorialFeed />

      {/* ══════════ CROSS-SECTION LINKS ══════════ */}
      <section className="py-16 sm:py-24 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.cream }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[10px]/[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.bronze }}>
            The Royal Gallerys
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mt-3 mb-10 tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>
            Explore More Sections
          </h2>
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            {[
              { href: "/design", label: "Design" },
              { href: "/culture", label: "Culture" },
              { href: "/dining", label: "Dining" },
              { href: "/motoring", label: "Motoring" },
              { href: "/society", label: "Society" },
              { href: "/style", label: "Style" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[10px]/[11px] uppercase tracking-[0.22em] font-medium font-sans px-5 py-2.5 transition-colors"
                style={{ color: C.textStone, border: `1px solid rgba(138,115,82,0.35)` }} >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ NEWSLETTER ══════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16 text-center" style={{ background: C.obsidian }}>
        <div className="max-w-2xl mx-auto">
          <span className="text-[10px]/[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.champagne }}>
            The Royal Traveler
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mt-4 mb-5 tracking-tight" style={{ color: C.ivory, fontWeight: 400 }}>
            Travel Intelligently
          </h2>
          <p className="text-sm sm:text-base font-sans font-normal leading-relaxed mb-8" style={{ color: C.textStone }}>
            Join our community of discerning travelers. Weekly dispatches include
            new destination guides, palace hotel reviews, curated itineraries, and
            exclusive early access to our print edition.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <NewsletterForm variant="dark" source="travel-index" />
          </div>
        </div>
      </section>
    </div>
  );
}
