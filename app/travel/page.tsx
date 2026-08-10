import Image from "next/image";
import Link from "next/link";
import { allArticles } from "@/lib/travel-articles";
import NewsletterForm from "../components/NewsletterForm";

const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNkZGRkZGQiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

const travelArticles = allArticles.filter((a) => a.editorialSection === "travel");
const hotelsArticles = travelArticles.filter((a) => a.editorialSubcategory === "hotels");
const destinationsArticles = travelArticles.filter((a) => a.editorialSubcategory === "destinations");

const subcategoryFilters = [
  { label: "Palace Hotels", count: hotelsArticles.length, subcategory: "hotels" as const },
  { label: "Destinations", count: destinationsArticles.length, subcategory: "destinations" as const },
];

/* ── FEATURED DESTINATIONS — pulled dynamically ──────── */
const featuredSlugs = ["umaid-bhawan-palace-jodhpur", "taj-lake-palace-udaipur", "kyoto-travel-guide", "amalfi-coast-travel-guide", "rambagh-palace-jaipur"];
const featuredArticles = featuredSlugs
  .map((slug) => travelArticles.find((a) => a.slug === slug))
  .filter((a): a is NonNullable<typeof a> => a != null)
  .slice(0, 5);

/* ── REGIONS ─────────────────────────────────────────── */
const regions = [
  { label: "Indian Palace Hotels", items: hotelsArticles },
  { label: "Asia", items: destinationsArticles.filter((d) => ["Japan", "South Korea", "Vietnam"].includes(d.country)) },
  { label: "Europe", items: destinationsArticles.filter((d) => ["Italy", "France", "Switzerland", "Scotland", "England", "Portugal", "Spain"].includes(d.country)) },
  { label: "Middle East & Africa", items: destinationsArticles.filter((d) => ["Turkey", "Morocco", "Egypt", "South Africa", "UAE", "Oman"].includes(d.country)) },
  { label: "Americas & Oceania", items: destinationsArticles.filter((d) => ["Australia", "New Zealand", "Canada", "Mexico"].includes(d.country)) },
];

export default function TravelPage() {
  return (
    <div className="bg-white">
      {/* ══════════ HERO ══════════ */}
      <section className="relative min-h-[65vh] sm:min-h-[75vh] flex items-center">
        <div className="absolute inset-0">
          <Image src="/images/colorful-vibrant-indian-landscape.jpg" alt="Luxury Travel" fill priority placeholder="blur" blurDataURL={blurDataURL} className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/25" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pt-28 sm:pt-36 pb-12 sm:pb-16">
          <span className="text-amber-300 text-[9px] sm:text-[10px] uppercase tracking-[0.35em] font-semibold font-sans">The Royal Gallerys</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-white leading-[0.95] mt-4 mb-6 max-w-3xl tracking-tight">
            Travel
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-xl mb-5">
            Palace hotels, heritage properties, iconic cities and extraordinary destinations — fifty definitive luxury travel guides written with firsthand authority.
          </p>
          <div className="flex items-center gap-3 text-white/50 text-[10px] sm:text-[11px] font-light font-sans">
            <span>{travelArticles.length} Destinations</span>
            <span className="text-white/20">·</span>
            <span>6 Continents</span>
            <span className="text-white/20">·</span>
            <span>20 Countries</span>
            <span className="text-white/20">·</span>
            <span>{hotelsArticles.length} Palace Hotels</span>
          </div>
        </div>
      </section>

      {/* ══════════ SUBCATEGORY FILTERS ══════════ */}
      <section className="py-8 sm:py-10 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="flex flex-wrap gap-3 sm:gap-5 justify-center">
            {subcategoryFilters.map((f) => (
              <a key={f.subcategory} href={`#${f.subcategory}`} className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-amber-800 transition-colors font-sans font-semibold">
                {f.label} <span className="text-neutral-300 font-light">({f.count})</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ EDITOR'S JOURNEYS ══════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-700 font-bold font-sans">Editor&apos;s Journeys</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-neutral-900 mt-4 tracking-tight">Featured Destinations</h2>
            <hr className="w-16 h-px bg-neutral-300 border-0 mx-auto mt-8 sm:mt-10" />
          </div>

          {/* Lead feature */}
          {featuredArticles[0] && (
            <Link href={`/travel/${featuredArticles[0].slug}`} className="group block mb-16 sm:mb-20">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[480px] overflow-hidden">
                  <Image src={featuredArticles[0].heroImage} alt={featuredArticles[0].headline} fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:1024px)100vw,58vw" className="object-cover group-hover:scale-[1.02] transition-transform duration-700" />
                </div>
                <div className="lg:col-span-5 flex items-center bg-[#faf8f5] p-8 sm:p-10 md:p-14 lg:p-16">
                  <div className="space-y-4 sm:space-y-5">
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-amber-700 font-bold font-sans">{featuredArticles[0].category} · {featuredArticles[0].country}</span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-neutral-900 leading-[1.08] group-hover:text-amber-800 transition-colors">{featuredArticles[0].headline}</h3>
                    <p className="text-neutral-600 text-sm sm:text-base font-light leading-relaxed max-w-md">{featuredArticles[0].subtitle}</p>
                    <div className="flex items-center gap-4 pt-1">
                      <span className="text-xs text-neutral-400 font-light">{featuredArticles[0].readTime}</span>
                      <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-amber-700 font-semibold border-b border-amber-300 pb-0.5 font-sans">Read Guide →</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {featuredArticles.slice(1).map((article) => (
              <Link key={article.slug} href={`/travel/${article.slug}`} className="group flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden mb-4 flex-shrink-0">
                  <Image src={article.heroImage} alt={article.headline} fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:640px)100vw,(max-width:1024px)50vw,25vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <span className="text-[7px] sm:text-[8px] uppercase tracking-[0.25em] text-amber-700 font-bold font-sans">{article.category}</span>
                <h3 className="text-lg sm:text-xl font-serif text-neutral-900 mt-1.5 mb-2 leading-tight group-hover:text-amber-800 transition-colors">{article.headline}</h3>
                <p className="text-xs text-neutral-500 font-light leading-relaxed flex-1">{article.subtitle}</p>
                <span className="text-[10px] text-neutral-400 font-light mt-2">{article.readTime}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ ALL DESTINATIONS BY REGION ══════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-700 font-bold font-sans">The Collection</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-neutral-900 mt-4 tracking-tight">All {travelArticles.length} Destinations</h2>
            <hr className="w-16 h-px bg-neutral-300 border-0 mx-auto mt-8 sm:mt-10" />
          </div>

          {regions.filter((r) => r.items.length > 0).map((cat) => (
            <div key={cat.label} className="mb-10 sm:mb-14 last:mb-0">
              <h3 className="text-sm sm:text-base uppercase tracking-[0.2em] text-amber-800 font-bold mb-5 sm:mb-6 font-sans">
                {cat.label} <span className="text-neutral-400 font-light ml-2">({cat.items.length})</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {cat.items.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/travel/${d.slug}`}
                    className="group bg-white p-4 sm:p-5 hover:shadow-sm hover:border-amber-100 transition-all border border-transparent flex flex-col"
                  >
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.15em] text-neutral-400 font-medium font-sans">{d.country}</span>
                    <h4 className="text-base sm:text-lg font-serif text-neutral-900 mt-0.5 mb-1.5 group-hover:text-amber-800 transition-colors leading-tight">{d.headline.split(":")[0].trim()}</h4>
                    <span className="text-[10px] sm:text-[11px] text-neutral-400 font-light mt-auto">{d.destination || d.country}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ CROSS-SECTION LINKS ══════════ */}
      <section className="py-16 sm:py-24 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-700 font-bold font-sans">The Royal Gallerys</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-neutral-900 mt-3 mb-10 tracking-tight">Explore More Sections</h2>
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            {[
              { href: "/design", label: "Design" },
              { href: "/culture", label: "Culture" },
              { href: "/dining", label: "Dining" },
              { href: "/motoring", label: "Motoring" },
              { href: "/society", label: "Society" },
              { href: "/style", label: "Style" },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-amber-800 transition-colors font-sans font-semibold border border-neutral-200 px-5 py-2.5 hover:border-amber-200">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ NEWSLETTER ══════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16 bg-neutral-900 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-400 font-bold font-sans">The Royal Traveler</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mt-4 mb-5 tracking-tight">Travel Intelligently</h2>
          <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed mb-8">
            Join our community of discerning travelers. Weekly dispatches include new destination guides, palace hotel reviews, curated itineraries, and exclusive early access to our print edition.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <NewsletterForm variant="dark" source="travel-index" />
          </div>
        </div>
      </section>
    </div>
  );
}
