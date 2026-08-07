import Image from "next/image";
import Link from "next/link";

const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNkZGRkZGQiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

/* ── CATEGORIES ─────────────────────────────────────── */
const categories = [
  { label: "Indian Palace Hotels", count: 20, slug: "indian-palaces", image: "/images/architectural-marvel-with-ornate-columns-arches.jpg" },
  { label: "Asia", count: 8, slug: "asia", image: "/images/hawa-mahal-palace-jaipur-india.jpg" },
  { label: "Europe", count: 12, slug: "europe", image: "/images/udaipur-city-view-from-hotel-balcony-rajasthan-india.jpg" },
  { label: "Middle East & Africa", count: 6, slug: "middle-east-africa", image: "/images/indian-city-buildings-scene.jpg" },
  { label: "Americas & Oceania", count: 4, slug: "americas-oceania", image: "/images/hallway-arches-with-dramatic-light-shadows.jpg" },
];

/* ── FEATURED DESTINATIONS ──────────────────────────── */
const featuredArticles = [
  {
    slug: "umaid-bhawan-palace-jodhpur",
    headline: "Umaid Bhawan Palace: Where Art Deco Meets Rajput Grandeur",
    subtitle: "The last of India's great palaces, still home to the Jodhpur royal family",
    category: "Indian Palace Hotels",
    country: "India",
    readTime: "14 min read",
    image: "/images/mehrangarh-fort.jpg",
  },
  {
    slug: "taj-lake-palace-udaipur",
    headline: "Taj Lake Palace: Rajasthan's Floating White Marble Dream",
    subtitle: "Drifting above Lake Pichola — the world's most romantic hotel",
    category: "Indian Palace Hotels",
    country: "India",
    readTime: "13 min read",
    image: "/images/udaipur-city-view-from-hotel-balcony-rajasthan-india.jpg",
  },
  {
    slug: "kyoto-travel-guide",
    headline: "Kyoto: The Soul of Japan, Preserved in Wood and Stone",
    subtitle: "Temples, tea houses, and the art of timeless hospitality",
    category: "Asia",
    country: "Japan",
    readTime: "16 min read",
    image: "/images/hawa-mahal-palace-jaipur-india.jpg",
  },
  {
    slug: "amalfi-coast-travel-guide",
    headline: "The Amalfi Coast: Italy's Most Seductive Shoreline",
    subtitle: "Cliffside villages, lemon groves, and the art of la dolce vita",
    category: "Europe",
    country: "Italy",
    readTime: "15 min read",
    image: "/images/colorful-vibrant-indian-landscape.jpg",
  },
  {
    slug: "rambagh-palace-jaipur",
    headline: "Rambagh Palace: The Jewel of Jaipur",
    subtitle: "From royal hunting lodge to the finest palace hotel in the Pink City",
    category: "Indian Palace Hotels",
    country: "India",
    readTime: "12 min read",
    image: "/images/vecteezy_jaipur-city-palace-in-jaipur-city_3153081.jpg",
  },
];

/* ── ALL DESTINATIONS ───────────────────────────────── */
const allDestinations = [
  // Indian Palace Hotels (20)
  ...[
    { name: "Umaid Bhawan Palace", country: "India", region: "Jodhpur, Rajasthan", slug: "umaid-bhawan-palace-jodhpur" },
    { name: "Rambagh Palace", country: "India", region: "Jaipur, Rajasthan", slug: "rambagh-palace-jaipur" },
    { name: "Taj Lake Palace", country: "India", region: "Udaipur, Rajasthan", slug: "taj-lake-palace-udaipur" },
    { name: "City Palace Udaipur", country: "India", region: "Udaipur, Rajasthan", slug: "city-palace-udaipur" },
    { name: "Shiv Niwas Palace", country: "India", region: "Udaipur, Rajasthan", slug: "shiv-niwas-palace-udaipur" },
    { name: "Fateh Prakash Palace", country: "India", region: "Udaipur, Rajasthan", slug: "fateh-prakash-palace-udaipur" },
    { name: "Samode Palace", country: "India", region: "Jaipur, Rajasthan", slug: "samode-palace-jaipur" },
    { name: "Samode Haveli", country: "India", region: "Jaipur, Rajasthan", slug: "samode-haveli-jaipur" },
    { name: "RAAS Jodhpur", country: "India", region: "Jodhpur, Rajasthan", slug: "raas-jodhpur" },
    { name: "Suryagarh", country: "India", region: "Jaisalmer, Rajasthan", slug: "suryagarh-jaisalmer" },
    { name: "Devi Garh", country: "India", region: "Udaipur, Rajasthan", slug: "devi-garh-udaipur" },
    { name: "Mihir Garh", country: "India", region: "Jodhpur, Rajasthan", slug: "mihir-garh-jodhpur" },
    { name: "Rohet Garh", country: "India", region: "Jodhpur, Rajasthan", slug: "rohet-garh-jodhpur" },
    { name: "Ahilya Fort", country: "India", region: "Maheshwar, Madhya Pradesh", slug: "ahilya-fort-maheshwar" },
    { name: "Falaknuma Palace", country: "India", region: "Hyderabad, Telangana", slug: "falaknuma-palace-hyderabad" },
    { name: "Lalgarh Palace", country: "India", region: "Bikaner, Rajasthan", slug: "lalgarh-palace-bikaner" },
    { name: "Gajner Palace", country: "India", region: "Bikaner, Rajasthan", slug: "gajner-palace-bikaner" },
    { name: "Noor-Us-Sabah Palace", country: "India", region: "Bhopal, Madhya Pradesh", slug: "noor-us-sabah-palace-bhopal" },
    { name: "Neemrana Fort Palace", country: "India", region: "Alwar, Rajasthan", slug: "neemrana-fort-palace" },
    { name: "Bhanwar Vilas Palace", country: "India", region: "Karauli, Rajasthan", slug: "bhanwar-vilas-palace-karauli" },
  ].map((d) => ({ ...d, category: "Indian Palace Hotels" })),
  // Asia
  ...[
    { name: "Kyoto", country: "Japan", region: "Kansai", slug: "kyoto-travel-guide" },
    { name: "Tokyo", country: "Japan", region: "Kanto", slug: "tokyo-travel-guide" },
    { name: "Osaka", country: "Japan", region: "Kansai", slug: "osaka-travel-guide" },
    { name: "Seoul", country: "South Korea", region: "Seoul Capital Area", slug: "seoul-travel-guide" },
    { name: "Busan", country: "South Korea", region: "Yeongnam", slug: "busan-travel-guide" },
    { name: "Hanoi", country: "Vietnam", region: "Northern Vietnam", slug: "hanoi-travel-guide" },
    { name: "Ho Chi Minh City", country: "Vietnam", region: "Southern Vietnam", slug: "ho-chi-minh-city-travel-guide" },
    { name: "Hoi An", country: "Vietnam", region: "Central Vietnam", slug: "hoi-an-travel-guide" },
  ].map((d) => ({ ...d, category: "Asia" })),
  // Europe
  ...[
    { name: "Amalfi Coast", country: "Italy", region: "Campania", slug: "amalfi-coast-travel-guide" },
    { name: "Lake Como", country: "Italy", region: "Lombardy", slug: "lake-como-travel-guide" },
    { name: "Tuscany", country: "Italy", region: "Central Italy", slug: "tuscany-travel-guide" },
    { name: "Paris", country: "France", region: "Île-de-France", slug: "paris-travel-guide" },
    { name: "French Riviera", country: "France", region: "Provence-Alpes-Côte d'Azur", slug: "french-riviera-travel-guide" },
    { name: "Interlaken", country: "Switzerland", region: "Bernese Oberland", slug: "interlaken-travel-guide" },
    { name: "Lucerne", country: "Switzerland", region: "Central Switzerland", slug: "lucerne-travel-guide" },
    { name: "Edinburgh", country: "Scotland", region: "Lothian", slug: "edinburgh-travel-guide" },
    { name: "Scottish Highlands", country: "Scotland", region: "Highlands", slug: "scottish-highlands-travel-guide" },
    { name: "London", country: "England", region: "Greater London", slug: "london-travel-guide" },
    { name: "Lisbon", country: "Portugal", region: "Lisbon Region", slug: "lisbon-travel-guide" },
    { name: "Barcelona", country: "Spain", region: "Catalonia", slug: "barcelona-travel-guide" },
  ].map((d) => ({ ...d, category: "Europe" })),
  // Middle East & Africa
  ...[
    { name: "Istanbul", country: "Turkey", region: "Marmara", slug: "istanbul-travel-guide" },
    { name: "Marrakech", country: "Morocco", region: "Marrakech-Safi", slug: "marrakech-travel-guide" },
    { name: "Cairo & The Nile", country: "Egypt", region: "Cairo / Luxor", slug: "cairo-nile-travel-guide" },
    { name: "Cape Town", country: "South Africa", region: "Western Cape", slug: "cape-town-travel-guide" },
    { name: "Dubai", country: "UAE", region: "Dubai Emirate", slug: "dubai-travel-guide" },
    { name: "Muscat", country: "Oman", region: "Muscat Governorate", slug: "muscat-travel-guide" },
  ].map((d) => ({ ...d, category: "Middle East & Africa" })),
  // Americas & Oceania
  ...[
    { name: "Sydney", country: "Australia", region: "New South Wales", slug: "sydney-travel-guide" },
    { name: "Queenstown", country: "New Zealand", region: "Otago", slug: "queenstown-travel-guide" },
    { name: "Banff & The Rockies", country: "Canada", region: "Alberta", slug: "banff-rockies-travel-guide" },
    { name: "Mexico City", country: "Mexico", region: "Valley of Mexico", slug: "mexico-city-travel-guide" },
  ].map((d) => ({ ...d, category: "Americas & Oceania" })),
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
          <span className="text-amber-300 text-[9px] sm:text-[10px] uppercase tracking-[0.35em] font-semibold font-sans">The Royal Traveler</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.12] mt-4 mb-5 max-w-3xl tracking-tight">
            Destinations Worth<br />the Journey
          </h1>
          <p className="text-neutral-200/90 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-xl mb-6">
            Fifty definitive luxury travel guides — from India&apos;s royal palace hotels to the world&apos;s most extraordinary destinations. Each guide written with the authority of firsthand experience and the elegance of fine editorial.
          </p>
          <div className="flex items-center gap-3 text-white/50 text-[10px] sm:text-[11px] font-light font-sans">
            <span>50 Destinations</span>
            <span className="text-white/20">·</span>
            <span>6 Continents</span>
            <span className="text-white/20">·</span>
            <span>20 Countries</span>
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
          <Link href={`/travel/${featuredArticles[0].slug}`} className="group block mb-16 sm:mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[480px] overflow-hidden">
                <Image src={featuredArticles[0].image} alt={featuredArticles[0].headline} fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:1024px)100vw,58vw" className="object-cover group-hover:scale-[1.02] transition-transform duration-700" />
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

          {/* Feature grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {featuredArticles.slice(1).map((article) => (
              <Link key={article.slug} href={`/travel/${article.slug}`} className="group flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden mb-4 flex-shrink-0">
                  <Image src={article.image} alt={article.headline} fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:640px)100vw,(max-width:1024px)50vw,25vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
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

      {/* ══════════ ALL DESTINATIONS ══════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-700 font-bold font-sans">The Collection</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-neutral-900 mt-4 tracking-tight">All 50 Destinations</h2>
            <hr className="w-16 h-px bg-neutral-300 border-0 mx-auto mt-8 sm:mt-10" />
          </div>

          {["Indian Palace Hotels", "Asia", "Europe", "Middle East & Africa", "Americas & Oceania"].map((cat) => {
            const items = allDestinations.filter((d) => d.category === cat);
            return (
              <div key={cat} className="mb-10 sm:mb-14 last:mb-0">
                <h3 className="text-sm sm:text-base uppercase tracking-[0.2em] text-amber-800 font-bold mb-5 sm:mb-6 font-sans">
                  {cat} <span className="text-neutral-400 font-light ml-2">({items.length})</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                  {items.map((d) => (
                    <Link
                      key={d.slug}
                      href={`/travel/${d.slug}`}
                      className="group bg-white p-4 sm:p-5 hover:shadow-sm hover:border-amber-100 transition-all border border-transparent flex flex-col"
                    >
                      <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.15em] text-neutral-400 font-medium font-sans">{d.country}</span>
                      <h4 className="text-base sm:text-lg font-serif text-neutral-900 mt-0.5 mb-1.5 group-hover:text-amber-800 transition-colors leading-tight">{d.name}</h4>
                      <span className="text-[10px] sm:text-[11px] text-neutral-400 font-light mt-auto">{d.region}</span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
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
            <input type="email" placeholder="Your email address" className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-neutral-500 text-sm focus:outline-none focus:border-amber-400/50 transition-colors font-light" />
            <button className="px-6 py-3 bg-amber-500 text-neutral-900 hover:bg-amber-400 transition-colors text-xs uppercase tracking-[0.2em] font-semibold font-sans flex-shrink-0">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
}
