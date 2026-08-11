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
    <div className="bg-white">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/25" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pt-28 sm:pt-36 pb-12 sm:pb-16">
          <span className="text-amber-300 text-[9px] sm:text-[10px] uppercase tracking-[0.35em] font-semibold font-sans">
            The Royal Gallerys
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-white leading-[0.95] mt-4 mb-6 max-w-3xl tracking-tight">
            Travel
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-xl mb-5">
            The world&apos;s most extraordinary journeys, places and experiences
          </p>
          <div className="flex items-center gap-3 text-white/50 text-[10px] sm:text-[11px] font-light font-sans">
            <span>{travelArticles.length} Stories</span>
            <span className="text-white/20">·</span>
            <span>6 Continents</span>
            <span className="text-white/20">·</span>
            <span>20 Countries</span>
            <span className="text-white/20">·</span>
            <span>{hotelsCount} Palaces</span>
          </div>
        </div>
      </section>

      {/* ══════════ EDITORIAL FEED ══════════ */}
      <TravelEditorialFeed />

      {/* ══════════ CROSS-SECTION LINKS ══════════ */}
      <section className="py-16 sm:py-24 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-700 font-bold font-sans">
            The Royal Gallerys
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-neutral-900 mt-3 mb-10 tracking-tight">
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
                className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-amber-800 transition-colors font-sans font-semibold border border-neutral-200 px-5 py-2.5 hover:border-amber-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ NEWSLETTER ══════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16 bg-neutral-900 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-400 font-bold font-sans">
            The Royal Traveler
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mt-4 mb-5 tracking-tight">
            Travel Intelligently
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed mb-8">
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
