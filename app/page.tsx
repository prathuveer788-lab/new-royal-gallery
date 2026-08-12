import Image from "next/image";
import Link from "next/link";
import { allArticles } from "@/lib/travel-articles";
import PartnershipCTA from "./components/PartnershipCTA";

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

function SectionHeading({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2
      className="text-[clamp(2rem,4.5vw,4.2rem)] font-serif leading-[1.08] tracking-tight mt-4 sm:mt-5"
      style={{ color: light ? C.ivory : C.textDeep, fontWeight: 400 }}
    >
      {children}
    </h2>
  );
}

function EditorialBody({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className="text-base sm:text-lg font-sans leading-relaxed max-w-2xl"
      style={{ color: light ? C.textStone : C.textStone, fontWeight: 400 }}
    >
      {children}
    </p>
  );
}

function EditorialBtn({ href, children, dark }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <Link
      href={href}
      className="inline-block text-[11px] sm:text-xs uppercase tracking-[0.22em] font-medium font-sans transition-all duration-500 px-8 sm:px-10 py-3"
      style={{
        color: dark ? C.ivory : C.textDeep,
        border: `1px solid ${dark ? "rgba(138,115,82,0.5)" : "rgba(138,115,82,0.4)"}`,
        background: "transparent",
      }} >
      {children} →
    </Link>
  );
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
    <div style={{ background: C.ivory }}>

      {/* ════════════════════════════════════════════════
          01 — HERO / MAGAZINE COVER
          ════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/vecteezy_jaipur-city-palace-in-jaipur-city_3153081.jpg"
            alt="Jaipur City Palace"
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

      {/* ════════════════════════════════════════════════
          03 — THE EDIT
          ════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 md:py-40 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 sm:mb-20 md:mb-24">
            <SectionNumber n="03 — The Edit" />
            <SectionHeading>A Curated Selection</SectionHeading>
            <div className="mt-8 sm:mt-9">
              <EditorialRule short />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-14">
            {[
              { href: "/style", label: "Style", title: "The Indian Fashion Houses Redefining Global Luxury", meta: "Fashion · 8 min read", img: "/images/sama-ali.jpeg" },
              { href: "/travel", label: "Travel", title: "The World's Most Extraordinary Palace Hotels", meta: "Hotels · 14 min read", img: "/images/udaipur-city-view-from-hotel-balcony-rajasthan-india.jpg" },
              { href: "/culture", label: "Culture", title: "The Golden Thread: Royal Patronage and Artisan Heritage", meta: "Essay · 15 min read", img: "/images/hawa-mahal-palace-jaipur-india.jpg" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="group flex flex-col">
                <div className="relative aspect-[3/4] overflow-hidden mb-6">
                  <Image
                    src={item.img} alt={item.label} fill placeholder="blur" blurDataURL={blurDataURL}
                    sizes="(max-width:768px)100vw,33vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-1000 ease-in-out"
                  />
                </div>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] font-sans font-medium mb-2.5" style={{ color: C.bronze }}>
                  {item.label}
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-serif leading-[1.15] mb-3 transition-colors duration-300 group-hover:text-[#8A7352]" style={{ color: C.textDeep, fontWeight: 400 }}>
                  {item.title}
                </h3>
                <span className="text-[11px] sm:text-xs font-sans tracking-wide font-light" style={{ color: C.textStone }}>
                  {item.meta}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          04 — TRAVEL
          ════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 md:py-40 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.ivory }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-14 sm:mb-16">
            <div>
              <SectionNumber n="04 — Travel" />
              <SectionHeading>Where Heritage<br />Becomes Destination</SectionHeading>
            </div>
            <Link href="/travel" className="hidden sm:inline-block text-[11px] uppercase tracking-[0.2em] font-medium font-sans transition-colors duration-300" style={{ color: C.bronze }}>
              View All Destinations →
            </Link>
          </div>

          {/* Lead Travel Feature */}
          <Link href={`/travel/${featuredTravel[0]?.slug || "umaid-bhawan-palace-jodhpur"}`} className="group block mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[520px] overflow-hidden">
                <Image
                  src="/images/mehrangarh-fort.jpg" alt={featuredTravel[0]?.headline || "Palace Hotel"}
                  fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:1024px)100vw,58vw"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-1000 ease-in-out"
                />
              </div>
              <div className="lg:col-span-5 flex items-center p-10 sm:p-12 md:p-16 lg:p-20" style={{ background: C.cream }}>
                <div className="space-y-5 sm:space-y-7">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-sans font-medium" style={{ color: C.bronze }}>
                    Palace Hotels · {featuredTravel[0]?.country || "India"}
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif leading-[1.08] transition-colors duration-300 group-hover:text-[#8A7352]" style={{ color: C.textDeep, fontWeight: 400 }}>
                    {featuredTravel[0]?.headline || "Umaid Bhawan Palace: Where Art Deco Meets Rajput Grandeur"}
                  </h3>
                  <p className="text-sm sm:text-base font-sans leading-relaxed max-w-md" style={{ color: C.textStone, fontWeight: 400 }}>
                    {featuredTravel[0]?.subtitle || "The last of India's great palaces, still home to the Jodhpur royal family — a living monument to ambition, craftsmanship, and the enduring power of heritage."}
                  </p>
                  <span className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium font-sans transition-colors" style={{ color: C.bronze, borderBottom: `1px solid ${C.champagne}`, paddingBottom: 2 }}>
                    Read Story →
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Secondary travel grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-7">
            {featuredTravel.slice(1, 4).map((article) => (
              <Link key={article.slug} href={`/travel/${article.slug}`} className="group flex flex-col transition-all duration-500" style={{ background: C.cream }}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/architectural-marvel-with-ornate-columns-arches.jpg" alt={article.headline}
                    fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:640px)100vw,33vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-1000 ease-in-out"
                  />
                </div>
                <div className="p-6 sm:p-7 flex flex-col flex-1">
                  <span className="text-[8px] uppercase tracking-[0.2em] font-sans font-medium" style={{ color: C.bronze }}>{article.country}</span>
                  <h3 className="text-lg sm:text-xl font-serif leading-tight mt-2 mb-3 transition-colors duration-300 group-hover:text-[#8A7352] flex-1" style={{ color: C.textDeep, fontWeight: 400 }}>
                    {article.headline}
                  </h3>
                  <span className="text-[10px] sm:text-[11px] font-sans tracking-wide font-light" style={{ color: C.textStone }}>{article.readTime}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12 sm:hidden">
            <Link href="/travel" className="text-[11px] uppercase tracking-[0.2em] font-sans font-medium" style={{ color: C.bronze }}>
              View All Destinations →
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          05 — STYLE
          ════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 md:py-40 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.ivory }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">
            <div className="relative aspect-[4/5] overflow-hidden order-2 lg:order-1">
              <Image
                src="/images/colorful-vibrant-indian-landscape(1).jpg" alt="Style & Fashion"
                fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:1024px)100vw,50vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-6 sm:space-y-8 order-1 lg:order-2">
              <SectionNumber n="05 — Style" />
              <h2 className="text-[clamp(2rem,4.5vw,4.5rem)] font-serif leading-[1.05] tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>
                The New Language of Indian Luxury
              </h2>
              <p className="text-base sm:text-lg font-sans leading-relaxed max-w-lg" style={{ color: C.textStone, fontWeight: 400 }}>
                From Sabyasachi&apos;s global ascent to a new generation of designers reshaping the vocabulary of Indian couture — the intersection of heritage craftsmanship and contemporary fashion has never been more compelling.
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                {["Fashion", "Jewellery", "Watches", "Couture"].map((t) => (
                  <span key={t} className="text-[10px] sm:text-[11px] font-sans font-light tracking-wide px-4 py-2" style={{ background: C.cream, color: C.textStone }}>
                    {t}
                  </span>
                ))}
              </div>
              <EditorialBtn href="/style">Explore Style</EditorialBtn>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          06 — DESIGN (Dark Spread)
          ════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 md:py-40 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.obsidian }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <SectionNumber n="06 — Design" />
            <SectionHeading light>Architecture · Interiors · Craft</SectionHeading>
            <div className="mt-8 sm:mt-9">
              <EditorialRule short />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {[
              { title: "The Fort Palaces of Rajasthan", sub: "Architecture", img: "/images/architectural-marvel-with-ornate-columns-arches.jpg" },
              { title: "Inside the Homes of Indian Royalty", sub: "Interiors", img: "/images/hallway-arches-with-dramatic-light-shadows.jpg" },
              { title: "The Craftsmen Keeping Centuries Alive", sub: "Craft", img: "/images/beautiful-shot-lodhi-garden-delhi-india-cloudy-sky.jpg" },
            ].map((item) => (
              <Link key={item.title} href="/design" className="group flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden mb-5">
                  <Image
                    src={item.img} alt={item.title} fill placeholder="blur" blurDataURL={blurDataURL}
                    sizes="(max-width:768px)100vw,33vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-1000 ease-in-out"
                  />
                </div>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-sans font-medium" style={{ color: C.bronze }}>{item.sub}</span>
                <h3 className="text-xl sm:text-2xl font-serif leading-tight mt-2 transition-colors duration-300 group-hover:text-[#B8A47A]" style={{ color: C.ivory, fontWeight: 400 }}>
                  {item.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          07 — MOTORING
          ════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 md:py-40 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.ivory }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 sm:mb-16">
            <SectionNumber n="07 — Motoring" />
            <SectionHeading>The Machines That Move Us</SectionHeading>
            <p className="text-base sm:text-lg font-sans leading-relaxed max-w-xl mt-5" style={{ color: C.textStone, fontWeight: 400 }}>
              From vintage Rolls-Royces in Rajasthan to the new Defenders crossing the Thar — an exploration of automotive culture, design and engineering.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            {[
              { title: "The Maharaja's Garage", sub: "Classic Cars", desc: "The extraordinary collections of vintage automobiles preserved by India's royal families — Rolls-Royce, Bentley, Daimler and beyond.", img: "/images/indian-city-buildings-scene(1).jpg" },
              { title: "Defender, G-Wagon & the Modern Safari", sub: "4×4", desc: "How the world's most capable vehicles are redefining luxury adventure travel across India, Africa, and beyond.", img: "/images/indian-city-buildings-scene.jpg" },
            ].map((item) => (
              <Link key={item.title} href="/motoring" className="group grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-7 items-center transition-colors duration-300 p-5 sm:p-6 -m-5 sm:-m-6" style={{ background: C.ivory }}>
                <div className="sm:col-span-2 relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.img} alt={item.title} fill placeholder="blur" blurDataURL={blurDataURL}
                    sizes="(max-width:640px)100vw,40vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-1000 ease-in-out"
                  />
                </div>
                <div className="sm:col-span-3 space-y-3">
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-sans font-medium" style={{ color: C.bronze }}>{item.sub}</span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-serif leading-tight transition-colors duration-300 group-hover:text-[#8A7352]" style={{ color: C.textDeep, fontWeight: 400 }}>{item.title}</h3>
                  <p className="text-sm font-sans leading-relaxed" style={{ color: C.textStone, fontWeight: 400 }}>{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          08 — SOCIETY
          ════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 md:py-40 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.cream }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14 sm:mb-16">
            <SectionNumber n="08 — Society" />
            <SectionHeading>Royalty · People · Institutions</SectionHeading>
            <p className="text-base font-sans leading-relaxed max-w-2xl mx-auto mt-4" style={{ color: C.textStone, fontWeight: 400 }}>
              The families, visionaries and institutions shaping heritage and culture — from royal dynasties to the designers and founders redefining luxury for a new generation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5" style={{ background: "rgba(138,115,82,0.12)" }}>
            {[
              { tag: "Royalty", title: "The House of Mewar: A Dynasty in the 21st Century" },
              { tag: "Profile", title: "Raghavendra Rathore: The Man Who Gave the Bandhgala a Future" },
              { tag: "Polo", title: "The Sport of Kings Returns to Jodhpur" },
              { tag: "Interview", title: "The Collector: Inside Five Generations of Indian Art" },
              { tag: "Philanthropy", title: "How India's Royal Women Are Leading Social Change" },
              { tag: "Visionary", title: "The Hotelier Restoring Rajasthan's Forgotten Fortresses" },
            ].map((s) => (
              <Link key={s.title} href="/society" className="group flex items-start gap-5 py-5 px-5 transition-colors duration-300" style={{ background: C.ivory }}>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-sans font-medium mt-0.5 whitespace-nowrap" style={{ color: C.bronze }}>{s.tag}</span>
                <h3 className="text-lg sm:text-xl font-serif leading-tight transition-colors duration-300 group-hover:text-[#8A7352]" style={{ color: C.textDeep, fontWeight: 400 }}>
                  {s.title}
                </h3>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/society" className="inline-block text-[11px] uppercase tracking-[0.2em] font-medium font-sans transition-colors" style={{ color: C.bronze, borderBottom: `1px solid ${C.champagne}`, paddingBottom: 2 }}>
              Explore Society →
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          09 — DINING + BUSINESS
          ════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 md:py-40 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.ivory }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-14">
            <Link href="/dining" className="group block">
              <div className="relative aspect-[16/10] overflow-hidden mb-6">
                <Image
                  src="/images/colorful-vibrant-indian-landscape.jpg" alt="Dining"
                  fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:768px)100vw,50vw"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-1000 ease-in-out"
                />
              </div>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-sans font-medium" style={{ color: C.bronze }}>09 — Dining</span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif leading-[1.1] mt-3 mb-4 transition-colors duration-300 group-hover:text-[#8A7352]" style={{ color: C.textDeep, fontWeight: 400 }}>
                The Royal Kitchens of India
              </h3>
              <p className="text-base font-sans leading-relaxed max-w-md" style={{ color: C.textStone, fontWeight: 400 }}>
                From palace kitchens to the world&apos;s finest restaurants — the chefs, traditions, and flavours defining a new era of Indian culinary culture.
              </p>
            </Link>
            <Link href="/business" className="group block">
              <div className="relative aspect-[16/10] overflow-hidden mb-6">
                <Image
                  src="/images/udaipur-city-view-from-hotel-balcony-rajasthan-india(1).jpg" alt="Business"
                  fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:768px)100vw,50vw"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-1000 ease-in-out"
                />
              </div>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-sans font-medium" style={{ color: C.bronze }}>10 — Business</span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif leading-[1.1] mt-3 mb-4 transition-colors duration-300 group-hover:text-[#8A7352]" style={{ color: C.textDeep, fontWeight: 400 }}>
                The New Economics of Heritage
              </h3>
              <p className="text-base font-sans leading-relaxed max-w-md" style={{ color: C.textStone, fontWeight: 400 }}>
                How family enterprises, hospitality groups, and a new generation of luxury entrepreneurs are reshaping the business of Indian heritage.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          11 — FUTURES (Heritage Green)
          ════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 md:py-40 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[640px] overflow-hidden order-2 lg:order-1">
              <Image
                src="/images/hallway-arches-with-dramatic-light-shadows.jpg" alt="AI & Heritage"
                fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:1024px)100vw,50vw"
                className="object-cover"
              />
            </div>
            <div className="flex items-center p-10 sm:p-14 md:p-18 lg:p-24 order-1 lg:order-2" style={{ background: C.forest }}>
              <div className="w-full space-y-6 sm:space-y-8 max-w-lg">
                <SectionNumber n="11 — Futures" />
                <h2 className="text-[clamp(1.8rem,3.5vw,3.8rem)] font-serif leading-[1.08]" style={{ color: C.ivory, fontWeight: 400 }}>
                  Heritage Meets Intelligence
                </h2>
                <p className="text-base sm:text-lg font-sans leading-relaxed" style={{ color: C.textStone, fontWeight: 400 }}>
                  AI Heritage Portraits. Digital Twins. Interactive Archives. THE ROYAL GALLERYS is building the world&apos;s most advanced ethical AI platform for cultural preservation — so future generations can learn directly from the voices and wisdom of the past.
                </p>
                <ul className="grid grid-cols-2 gap-x-5 gap-y-3 pt-2">
                  {["AI Heritage Portraits", "Digital Twins", "Interactive Archives", "Multilingual Access", "Museum Experiences", "Long-Term Preservation"].map((f) => (
                    <li key={f} className="text-xs sm:text-sm font-sans font-light flex items-center gap-2.5" style={{ color: C.champagne }}>
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: C.bronze }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="pt-2">
                  <EditorialBtn href="/futures" dark>Explore Futures</EditorialBtn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          12 — FROM THE ARCHIVE (Obsidian)
          ════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 md:py-40 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.obsidian }}>
        <div className="max-w-4xl mx-auto text-center">
          <SectionNumber n="12 — From the Archive" />
          <h2 className="text-[clamp(2rem,4.5vw,5rem)] font-serif leading-[1.05] tracking-tight mt-5 mb-7" style={{ color: C.ivory, fontWeight: 400 }}>
            The Photographs That Preserved a World
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-sans leading-relaxed max-w-2xl mx-auto mb-10" style={{ color: C.textStone, fontWeight: 400 }}>
            Rare archival images, oral histories, and unpublished documents from India&apos;s royal families — collected, preserved, and made accessible for the first time.
          </p>
          <Link
            href="/archive"
            className="inline-block text-[11px] sm:text-xs uppercase tracking-[0.22em] font-medium font-sans px-10 sm:px-12 py-3.5 transition-all duration-500"
            style={{ color: C.champagne, border: "1px solid rgba(184,164,122,0.35)" }} >
            Enter the Archive
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          13 — THE FIVE HOUSES
          ════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 md:py-40 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <SectionNumber n="13 — The Five Houses" />
            <SectionHeading>One Heritage,<br />Five Disciplines</SectionHeading>
            <p className="text-base font-sans leading-relaxed max-w-xl mx-auto mt-4" style={{ color: C.textStone, fontWeight: 400 }}>
              THE ROYAL GALLERYS operates across five interconnected houses — each preserving heritage through a different craft.
            </p>
            <div className="mt-8 sm:mt-9">
              <EditorialRule short />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
            {houses.map((h) => (
              <Link key={h.num} href={h.slug} className="group p-7 sm:p-8 flex flex-col transition-all duration-500" style={{ background: C.ivory, border: "1px solid rgba(138,115,82,0.12)" }}>
                <span className="text-4xl sm:text-5xl font-serif block mb-5 transition-colors duration-300 group-hover:text-[#8A7352]" style={{ color: "rgba(138,115,82,0.25)", fontWeight: 400 }}>
                  {h.num}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif mb-3" style={{ color: C.textDeep, fontWeight: 400 }}>{h.title}</h3>
                <p className="text-sm font-sans leading-relaxed flex-1" style={{ color: C.textStone, fontWeight: 400 }}>{h.desc}</p>
                <span className="inline-block mt-5 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: C.bronze }}>
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          14 — THE DISPATCH (Obsidian)
          ════════════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 md:py-40 px-6 sm:px-8 md:px-12 lg:px-16 text-center" style={{ background: C.obsidian }}>
        <div className="max-w-2xl mx-auto">
          <SectionNumber n="14 — The Dispatch" />
          <h2 className="text-[clamp(2rem,4vw,3.8rem)] font-serif leading-[1.05] tracking-tight mt-5 mb-6" style={{ color: C.ivory, fontWeight: 400 }}>
            Join The Royal Gallerys
          </h2>
          <p className="text-base sm:text-lg font-sans leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: C.textStone, fontWeight: 400 }}>
            A weekly edit of the finest stories in style, travel, design, culture and heritage — delivered to your inbox. Plus early access to our print edition, events, and private experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/membership"
              className="inline-block text-[11px] sm:text-xs uppercase tracking-[0.22em] font-medium font-sans px-10 sm:px-12 py-3.5 transition-all duration-500"
              style={{ color: C.obsidian, background: C.ivory }} >
              Become a Member
            </Link>
            <Link
              href="/journal"
              className="inline-block text-[11px] sm:text-xs uppercase tracking-[0.22em] font-medium font-sans px-10 sm:px-12 py-3.5 transition-all duration-500"
              style={{ color: C.champagne, border: "1px solid rgba(184,164,122,0.35)" }} >
              Subscribe to Journal
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          PARTNER CTA
          ════════════════════════════════════════════════ */}
      <PartnershipCTA />

    </div>
  );
}
