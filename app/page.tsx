import Image from "next/image";
import Link from "next/link";
import { allArticles } from "@/lib/travel-articles";
import PartnershipCTA from "./components/PartnershipCTA";

const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNkZGRkZGQiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

/* ── SHARED MICRO-COMPONENTS ─────────────────────────── */
function SectionLabel({ children, light }: { children: string; light?: boolean }) {
  return (
    <span className={`inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.4em] font-semibold font-sans ${light ? "text-amber-400" : "text-amber-700"}`}>
      {children}
    </span>
  );
}

function EditorialDivider({ light }: { light?: boolean }) {
  return <hr className={`w-16 h-px border-0 my-8 sm:my-10 ${light ? "bg-white/30" : "bg-neutral-300"}`} />;
}

/* ── ARTICLE HELPERS ─────────────────────────────────── */
const travelArticles = allArticles.filter(a => a.editorialSection === "travel");
const featuredTravel = travelArticles.slice(0, 4);

const houses = [
  { num: "I", title: "Media", desc: "Magazine, documentaries, podcasts — stories that carry heritage to the world.", slug: "/journal" },
  { num: "II", title: "Experiences", desc: "Palace dinners, heritage summits, private journeys into living history.", slug: "/travel" },
  { num: "III", title: "AI", desc: "Ethical artificial intelligence for preservation, archives, and interactive memory.", slug: "/futures" },
  { num: "IV", title: "Research", desc: "Archival documentation, oral histories, cultural intelligence.", slug: "/ecosystem" },
  { num: "V", title: "Institute", desc: "Masterclasses, leadership programs, the next generation of custodians.", slug: "/ecosystem" },
];

/* ── PAGE ────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div className="bg-white">

      {/* ══════════ 01 — HERO / MAGAZINE COVER ══════════ */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Image src="/images/vecteezy_jaipur-city-palace-in-jaipur-city_3153081.jpg" alt="Jaipur City Palace" fill priority placeholder="blur" blurDataURL={blurDataURL} className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />
        </div>

        {/* Decorative top line */}
        <div className="absolute top-12 sm:top-16 left-1/2 -translate-x-1/2 w-[clamp(40px,8vw,80px)] h-px bg-amber-400/40" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pt-20 pb-16 text-center">
          <p className="text-amber-300/80 text-[10px] sm:text-[11px] uppercase tracking-[0.5em] font-medium mb-10 sm:mb-12 font-sans">
            Volume I · Summer 2026
          </p>

          <h1 className="text-[clamp(1.6rem,3.5vw,3.2rem)] font-serif text-white leading-[1.12] mb-6 sm:mb-8 tracking-[0.02em]">
            THE INTERNATIONAL<br />
            MAGAZINE OF<br />
            HERITAGE &amp; LUXURY
          </h1>

          <p className="text-amber-200/70 text-[clamp(10px,1.2vw,13px)] uppercase tracking-[0.28em] font-light mb-12 sm:mb-14 font-sans">
            Royalty · Travel · Style · Design · Culture · Society
          </p>

          <a
            href="#the-magazine"
            className="inline-block px-10 sm:px-14 py-3.5 sm:py-4 border border-amber-400/40 text-amber-300 hover:bg-amber-400/10 hover:border-amber-300/60 transition-all duration-500 text-[11px] sm:text-xs uppercase tracking-[0.35em] font-medium font-sans"
          >
            Enter the Magazine →
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20">
          <span className="text-[8px] uppercase tracking-[0.35em] font-sans">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </section>

      {/* ══════════ 02 — THE MAGAZINE ══════════ */}
      <section id="the-magazine" className="py-24 sm:py-32 md:py-40 px-6 sm:px-8 md:px-12 lg:px-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14 sm:mb-16">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-amber-700 font-semibold font-sans mb-8">
              02 — The Magazine
            </p>
            <h2 className="text-[clamp(2rem,4.5vw,4.2rem)] font-serif text-neutral-900 leading-[1.08] tracking-tight mb-8 sm:mb-10">
              A World of Heritage.<br />
              <span className="text-amber-800">A New Language of Luxury.</span>
            </h2>
            <EditorialDivider />
            <p className="text-neutral-600 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto mt-8 sm:mt-10">
              THE ROYAL GALLERYS is an international magazine dedicated to the worlds of heritage, culture and contemporary luxury. From royal families and historic estates to fashion, jewellery, architecture, travel, art, hospitality and design — we document the people and places carrying extraordinary traditions into the modern world.
            </p>
          </div>

          <div className="text-center">
            <Link
              href="/global-vision"
              className="inline-block px-10 sm:px-12 py-3.5 sm:py-4 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors text-[11px] sm:text-xs uppercase tracking-[0.3em] font-semibold font-sans"
            >
              Read Our Story →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ THE EDIT ══════════ */}
      <section className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 sm:mb-20 md:mb-24">
            <SectionLabel>The Edit</SectionLabel>
            <h2 className="text-[clamp(2rem,4vw,3.8rem)] font-serif text-neutral-900 mt-5 sm:mt-6 tracking-tight leading-[1.05]">A Curated Selection</h2>
            <EditorialDivider />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
            {[
              { href: "/style", label: "Style", title: "The Indian Fashion Houses Redefining Global Luxury", meta: "Fashion · 8 min read", img: "/images/colorful-vibrant-indian-landscape.jpg" },
              { href: "/travel", label: "Travel", title: "The World's Most Extraordinary Palace Hotels", meta: "Hotels · 14 min read", img: "/images/udaipur-city-view-from-hotel-balcony-rajasthan-india.jpg" },
              { href: "/culture", label: "Culture", title: "The Golden Thread: Royal Patronage and Artisan Heritage", meta: "Essay · 15 min read", img: "/images/hawa-mahal-palace-jaipur-india.jpg" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="group flex flex-col">
                <div className="relative aspect-[3/4] overflow-hidden mb-6">
                  <Image src={item.img} alt={item.label} fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:768px)100vw,33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-amber-700 font-bold font-sans mb-2">{item.label}</span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-neutral-900 leading-[1.15] group-hover:text-amber-800 transition-colors mb-3">{item.title}</h3>
                <span className="text-[11px] sm:text-xs text-neutral-400 font-light tracking-wide">{item.meta}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TRAVEL — Featured ══════════ */}
      <section className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-14 sm:mb-16">
            <div>
              <SectionLabel>Travel</SectionLabel>
              <h2 className="text-[clamp(2rem,4vw,3.8rem)] font-serif text-neutral-900 mt-4 sm:mt-5 tracking-tight leading-[1.05]">Where to Go Now</h2>
            </div>
            <Link href="/travel" className="hidden sm:inline-block text-[11px] uppercase tracking-[0.3em] text-neutral-400 hover:text-amber-700 transition-colors font-semibold font-sans">
              View All 50 Destinations →
            </Link>
          </div>

          {/* Lead Travel Feature */}
          <Link href={`/travel/${featuredTravel[0]?.slug || "umaid-bhawan-palace-jodhpur"}`} className="group block mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[520px] overflow-hidden">
                <Image src="/images/mehrangarh-fort.jpg" alt={featuredTravel[0]?.headline || "Palace Hotel"} fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:1024px)100vw,58vw" className="object-cover group-hover:scale-[1.02] transition-transform duration-700" />
              </div>
              <div className="lg:col-span-5 flex items-center bg-white p-10 sm:p-12 md:p-16 lg:p-20">
                <div className="space-y-5 sm:space-y-7">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-700 font-bold font-sans">Palace Hotels · {featuredTravel[0]?.country || "India"}</span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-neutral-900 leading-[1.08] group-hover:text-amber-800 transition-colors">
                    {featuredTravel[0]?.headline || "Umaid Bhawan Palace: Where Art Deco Meets Rajput Grandeur"}
                  </h3>
                  <p className="text-neutral-600 text-sm sm:text-base font-light leading-relaxed max-w-md">
                    {featuredTravel[0]?.subtitle || "The last of India's great palaces, still home to the Jodhpur royal family — a living monument to ambition, craftsmanship, and the enduring power of heritage."}
                  </p>
                  <span className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.25em] text-amber-700 font-semibold border-b border-amber-300 pb-0.5 font-sans">Read Story →</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Secondary travel grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-7">
            {featuredTravel.slice(1, 4).map((article) => (
              <Link key={article.slug} href={`/travel/${article.slug}`} className="group flex flex-col bg-white hover:shadow-lg transition-all duration-300">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src="/images/architectural-marvel-with-ornate-columns-arches.jpg" alt={article.headline} fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:640px)100vw,33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 sm:p-7 flex flex-col flex-1">
                  <span className="text-[8px] uppercase tracking-[0.25em] text-amber-700 font-bold font-sans">{article.country}</span>
                  <h3 className="text-lg sm:text-xl font-serif text-neutral-900 mt-2 mb-3 leading-tight group-hover:text-amber-800 transition-colors flex-1">{article.headline}</h3>
                  <span className="text-[10px] sm:text-[11px] text-neutral-400 font-light tracking-wide">{article.readTime}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12 sm:hidden">
            <Link href="/travel" className="text-[11px] uppercase tracking-[0.3em] text-neutral-500 hover:text-amber-700 font-semibold font-sans">View All Destinations →</Link>
          </div>
        </div>
      </section>

      {/* ══════════ STYLE — Editorial Feature ══════════ */}
      <section className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
            <div className="relative aspect-[4/5] overflow-hidden order-2 lg:order-1">
              <Image src="/images/colorful-vibrant-indian-landscape(1).jpg" alt="Style & Fashion" fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:1024px)100vw,50vw" className="object-cover" />
            </div>
            <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
              <SectionLabel>Style</SectionLabel>
              <h2 className="text-[clamp(2rem,4vw,4.5rem)] font-serif text-neutral-900 leading-[1.05] tracking-tight">
                The New Language of Indian Luxury
              </h2>
              <p className="text-neutral-600 text-base sm:text-lg font-light leading-relaxed max-w-lg">
                From Sabyasachi&apos;s global ascent to a new generation of designers reshaping the vocabulary of Indian couture — the intersection of heritage craftsmanship and contemporary fashion has never been more compelling.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                {["Fashion", "Jewellery", "Watches", "Couture"].map((t) => (
                  <span key={t} className="text-[10px] sm:text-[11px] bg-[#faf8f5] text-neutral-500 px-4 py-2 font-light tracking-wide">{t}</span>
                ))}
              </div>
              <Link href="/style" className="inline-block mt-3 text-[11px] sm:text-xs uppercase tracking-[0.3em] text-amber-700 hover:text-amber-900 transition-colors font-semibold border-b border-amber-300 pb-0.5 font-sans">
                Explore Style →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ DESIGN ══════════ */}
      <section className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <SectionLabel light>Design</SectionLabel>
            <h2 className="text-[clamp(2rem,4vw,3.8rem)] font-serif text-white mt-5 sm:mt-6 tracking-tight leading-[1.05]">Architecture · Interiors · Craft</h2>
            <EditorialDivider light />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {[
              { title: "The Fort Palaces of Rajasthan", sub: "Architecture", img: "/images/architectural-marvel-with-ornate-columns-arches.jpg" },
              { title: "Inside the Homes of Indian Royalty", sub: "Interiors", img: "/images/hallway-arches-with-dramatic-light-shadows.jpg" },
              { title: "The Craftsmen Keeping Centuries Alive", sub: "Craft", img: "/images/beautiful-shot-lodhi-garden-delhi-india-cloudy-sky.jpg" },
            ].map((item) => (
              <Link key={item.title} href="/design" className="group flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden mb-5">
                  <Image src={item.img} alt={item.title} fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:768px)100vw,33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-amber-400 font-bold font-sans">{item.sub}</span>
                <h3 className="text-xl sm:text-2xl font-serif text-white mt-2 leading-tight group-hover:text-amber-300 transition-colors">{item.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ MOTORING ══════════ */}
      <section className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 sm:mb-16">
            <SectionLabel>Motoring</SectionLabel>
            <h2 className="text-[clamp(2rem,4vw,3.8rem)] font-serif text-neutral-900 mt-4 sm:mt-5 tracking-tight leading-[1.05]">The Machines That Move Us</h2>
            <p className="text-neutral-500 text-base sm:text-lg font-light max-w-xl mt-5 leading-relaxed">
              From vintage Rolls-Royces in Rajasthan to the new Defenders crossing the Thar — an exploration of automotive culture, design and engineering.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            {[
              { title: "The Maharaja's Garage", sub: "Classic Cars", desc: "The extraordinary collections of vintage automobiles preserved by India's royal families — Rolls-Royce, Bentley, Daimler and beyond.", img: "/images/indian-city-buildings-scene(1).jpg" },
              { title: "Defender, G-Wagon & the Modern Safari", sub: "4×4", desc: "How the world's most capable vehicles are redefining luxury adventure travel across India, Africa, and beyond.", img: "/images/indian-city-buildings-scene.jpg" },
            ].map((item) => (
              <Link key={item.title} href="/motoring" className="group grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-7 items-center hover:bg-[#faf8f5] transition-colors p-5 sm:p-6 -m-5 sm:-m-6">
                <div className="sm:col-span-2 relative aspect-[4/3] overflow-hidden">
                  <Image src={item.img} alt={item.title} fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:640px)100vw,40vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="sm:col-span-3 space-y-3">
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-amber-700 font-bold font-sans">{item.sub}</span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-neutral-900 leading-tight group-hover:text-amber-800 transition-colors">{item.title}</h3>
                  <p className="text-sm text-neutral-500 font-light leading-relaxed">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SOCIETY ══════════ */}
      <section className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16 bg-[#faf8f5]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14 sm:mb-16">
            <SectionLabel>Society</SectionLabel>
            <h2 className="text-[clamp(2rem,4vw,3.8rem)] font-serif text-neutral-900 mt-4 sm:mt-5 tracking-tight leading-[1.05]">Royalty · People · Institutions</h2>
            <p className="text-neutral-600 text-base font-light max-w-2xl mx-auto mt-4 leading-relaxed">The families, visionaries and institutions shaping heritage and culture — from royal dynasties to the designers and founders redefining luxury for a new generation.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { tag: "Royalty", title: "The House of Mewar: A Dynasty in the 21st Century" },
              { tag: "Profile", title: "Raghavendra Rathore: The Man Who Gave the Bandhgala a Future" },
              { tag: "Polo", title: "The Sport of Kings Returns to Jodhpur" },
              { tag: "Interview", title: "The Collector: Inside Five Generations of Indian Art" },
              { tag: "Philanthropy", title: "How India's Royal Women Are Leading Social Change" },
              { tag: "Visionary", title: "The Hotelier Restoring Rajasthan's Forgotten Fortresses" },
            ].map((s) => (
              <Link key={s.title} href="/society" className="group flex items-start gap-5 py-5 px-5 bg-white hover:shadow-md transition-all border border-transparent hover:border-amber-100">
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-amber-700 font-bold font-sans mt-0.5 whitespace-nowrap">{s.tag}</span>
                <h3 className="text-lg sm:text-xl font-serif text-neutral-900 leading-tight group-hover:text-amber-800 transition-colors">{s.title}</h3>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/society" className="inline-block text-[11px] uppercase tracking-[0.3em] text-amber-700 hover:text-amber-900 font-semibold border-b border-amber-300 pb-0.5 font-sans">Explore Society →</Link>
          </div>
        </div>
      </section>

      {/* ══════════ DINING + BUSINESS ══════════ */}
      <section className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-14">
            <Link href="/dining" className="group block">
              <div className="relative aspect-[16/10] overflow-hidden mb-6">
                <Image src="/images/colorful-vibrant-indian-landscape.jpg" alt="Dining" fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:768px)100vw,50vw" className="object-cover group-hover:scale-[1.02] transition-transform duration-700" />
              </div>
              <SectionLabel>Dining</SectionLabel>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-neutral-900 leading-[1.1] mt-3 mb-4 group-hover:text-amber-800 transition-colors">The Royal Kitchens of India</h3>
              <p className="text-neutral-500 text-base font-light leading-relaxed max-w-md">From palace kitchens to the world&apos;s finest restaurants — the chefs, traditions, and flavours defining a new era of Indian culinary culture.</p>
            </Link>
            <Link href="/business" className="group block">
              <div className="relative aspect-[16/10] overflow-hidden mb-6">
                <Image src="/images/udaipur-city-view-from-hotel-balcony-rajasthan-india(1).jpg" alt="Business" fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:768px)100vw,50vw" className="object-cover group-hover:scale-[1.02] transition-transform duration-700" />
              </div>
              <SectionLabel>Business</SectionLabel>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-neutral-900 leading-[1.1] mt-3 mb-4 group-hover:text-amber-800 transition-colors">The New Economics of Heritage</h3>
              <p className="text-neutral-500 text-base font-light leading-relaxed max-w-md">How family enterprises, hospitality groups, and a new generation of luxury entrepreneurs are reshaping the business of Indian heritage.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ FUTURES ══════════ */}
      <section className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[640px] overflow-hidden order-2 lg:order-1">
              <Image src="/images/hallway-arches-with-dramatic-light-shadows.jpg" alt="AI & Heritage" fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:1024px)100vw,50vw" className="object-cover" />
            </div>
            <div className="flex items-center bg-[#faf8f5] p-10 sm:p-14 md:p-18 lg:p-24 order-1 lg:order-2">
              <div className="w-full space-y-6 sm:space-y-8 max-w-lg">
                <SectionLabel>Futures</SectionLabel>
                <h2 className="text-[clamp(1.8rem,3.5vw,3.8rem)] font-serif text-neutral-900 leading-[1.08]">Heritage Meets Intelligence</h2>
                <p className="text-neutral-600 text-base sm:text-lg font-light leading-relaxed">
                  AI Heritage Portraits. Digital Twins. Interactive Archives. THE ROYAL GALLERYS is building the world&apos;s most advanced ethical AI platform for cultural preservation — so future generations can learn directly from the voices and wisdom of the past.
                </p>
                <ul className="grid grid-cols-2 gap-x-5 gap-y-3 pt-2">
                  {["AI Heritage Portraits", "Digital Twins", "Interactive Archives", "Multilingual Access", "Museum Experiences", "Long-Term Preservation"].map((f) => (
                    <li key={f} className="text-xs sm:text-sm text-neutral-500 font-light flex items-center gap-2.5">
                      <span className="w-1 h-1 bg-amber-500 rounded-full flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/futures" className="inline-block mt-3 text-[11px] sm:text-xs uppercase tracking-[0.3em] text-amber-700 hover:text-amber-900 transition-colors font-semibold border-b border-amber-300 pb-0.5 font-sans">
                  Explore Futures →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ FROM THE ARCHIVE ══════════ */}
      <section className="py-20 sm:py-28 md:py-36 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-6 sm:px-8">
          <SectionLabel light>From the Archive</SectionLabel>
          <h2 className="text-[clamp(2rem,4.5vw,5rem)] font-serif leading-[1.05] tracking-tight mt-5 mb-7">
            The Photographs That Preserved a World
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-10">
            Rare archival images, oral histories, and unpublished documents from India&apos;s royal families — collected, preserved, and made accessible for the first time.
          </p>
          <Link href="/archive" className="inline-block px-10 sm:px-12 py-3.5 sm:py-4 border border-white/20 text-white hover:border-amber-300 hover:text-amber-200 transition-colors text-xs sm:text-sm uppercase tracking-[0.3em] font-medium font-sans">
            Enter the Archive
          </Link>
        </div>
      </section>

      {/* ══════════ THE FIVE HOUSES ══════════ */}
      <section className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <SectionLabel>The Five Houses</SectionLabel>
            <h2 className="text-[clamp(2rem,4vw,3.8rem)] font-serif text-neutral-900 mt-5 sm:mt-6 tracking-tight leading-[1.05]">One Heritage, Five Disciplines</h2>
            <p className="text-neutral-500 text-base font-light max-w-xl mx-auto mt-4 leading-relaxed">THE ROYAL GALLERYS operates across five interconnected houses — each preserving heritage through a different craft.</p>
            <EditorialDivider />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
            {houses.map((h) => (
              <Link key={h.num} href={h.slug} className="group bg-white p-7 sm:p-8 flex flex-col hover:shadow-lg transition-all duration-300 border border-transparent hover:border-amber-100">
                <span className="text-4xl sm:text-5xl font-serif text-amber-300/60 group-hover:text-amber-400 transition-colors block mb-5">{h.num}</span>
                <h3 className="text-xl sm:text-2xl font-serif text-neutral-900 mb-3">{h.title}</h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed flex-1">{h.desc}</p>
                <span className="inline-block mt-5 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-amber-700 font-semibold font-sans opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ NEWSLETTER / MEMBERSHIP ══════════ */}
      <section className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16 bg-neutral-900 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <SectionLabel light>The Dispatch</SectionLabel>
          <h2 className="text-[clamp(2rem,4vw,3.8rem)] font-serif tracking-tight mt-5 mb-6 leading-[1.05]">Join The Royal Gallerys</h2>
          <p className="text-neutral-400 text-base sm:text-lg font-light leading-relaxed mb-10 max-w-xl mx-auto">
            A weekly edit of the finest stories in style, travel, design, culture and heritage — delivered to your inbox. Plus early access to our print edition, events, and private experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/membership" className="inline-block px-10 sm:px-12 py-3.5 sm:py-4 bg-white text-neutral-900 hover:bg-neutral-100 transition-colors text-xs sm:text-sm uppercase tracking-[0.3em] font-semibold font-sans">
              Become a Member
            </Link>
            <Link href="/journal" className="inline-block px-10 sm:px-12 py-3.5 sm:py-4 border border-white/20 text-white hover:border-amber-300 hover:text-amber-200 transition-colors text-xs sm:text-sm uppercase tracking-[0.3em] font-medium font-sans">
              Subscribe to Journal
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ PARTNER CTA ══════════ */}
      <PartnershipCTA />

    </div>
  );
}
