import Image from "next/image";
import Link from "next/link";
import { C, blurDataURL } from "@/lib/design-tokens";
import EditorialFeed from "@/app/components/EditorialFeed";
import type { EditorialArticle, SectionConfig } from "@/lib/editorial/types";

export interface SectionSpotlight {
  href: string;
  tag: string;
  title: string;
  dek: string;
  image: string;
  readTime: string;
}

const CROSS_LINKS = [
  { href: "/society/shivanjali-kumari-dungarpur-wild-lens-of-royalty", label: "Art · Photography", title: "Through the Wild Lens of Royalty", img: "/images/society/shivanjali-kumari-dungarpur/01-hero.jpg" },
  { href: "/society/aaliya-sultana-babi-dinosaur-princess-balasinor", label: "Society · Profile", title: "The Woman Who Walks With Giants", img: "/images/aaliya-sultana-babi/01-hero-aaliya-sultana-babi-portrait-1024w.webp" },
  { href: "/society/portraits-of-heritage", label: "Society · Series Hub", title: "Portraits of Heritage", img: "/images/aaliya-sultana-babi/01-hero-aaliya-sultana-babi-portrait.webp" },
  { href: "/travel", label: "Travel", title: "Palace Hotels & Heritage Journeys", img: "/images/udaipur-city-view-from-hotel-balcony-rajasthan-india.jpg" },
  { href: "/style", label: "Style", title: "Couture, Jewellery & Luxury Fashion", img: "/images/style/hero/style-hero-luxury-fashion.jpg" },
  { href: "/royalty", label: "Royalty", title: "Palaces, Lineage & Living Heritage", img: "/images/badi-mahal-garden-palace-city-palace-udaipur-rajasthan-india.jpg" },
  { href: "/culture", label: "Culture", title: "Art, Patronage & Living Heritage", img: "/images/hawa-mahal-palace-jaipur-india.jpg" },
  { href: "/design", label: "Design", title: "Architecture, Interiors & Craft", img: "/images/hallway-arches-with-dramatic-light-shadows.jpg" },
  { href: "/weddings", label: "Weddings", title: "Bridal Couture & Destination Venues", img: "/images/style/article-06/indian-bridal-couture-hero.jpg" },
  { href: "/jewellery", label: "Jewellery", title: "High Jewellery & Gemstone Heritage", img: "/images/style/article-07/high-jewellery-gold-luxury.jpg" },
  { href: "/watches", label: "Watches", title: "Luxury Horology & Collecting", img: "/images/watches/watch-hero.jpeg" },
];

export default function SectionLanding({
  section,
  articles,
  spotlight,
}: {
  section: SectionConfig;
  articles: EditorialArticle[];
  spotlight?: SectionSpotlight;
}) {
  const featured = articles[0];
  const crossLinks = CROSS_LINKS.filter((l) => l.href !== `/${section.slug}`).slice(0, 4);

  return (
    <div style={{ background: C.ivory }}>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-[80vh] sm:min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src={section.heroImage}
            alt={section.heroAlt}
            fill
            priority
            placeholder="blur"
            blurDataURL={blurDataURL}
            className="object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(17,17,15,0.88), rgba(17,17,15,0.55), rgba(17,17,15,0.85))" }} />
        </div>

        <div className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2" style={{ width: "clamp(40px,8vw,80px)", height: 1, background: "rgba(184,164,122,0.5)" }} />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 md:px-12 pt-28 sm:pt-36 pb-20 sm:pb-28 text-center">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.42em] font-medium font-sans mb-8 sm:mb-10" style={{ color: C.champagne, opacity: 0.75 }}>
            The Royal Gallerys — {section.label}
          </p>

          <h1 className="text-[clamp(3rem,6vw,7rem)] font-serif leading-[0.92] mb-8 sm:mb-10 tracking-tight" style={{ color: C.ivory, fontWeight: 400 }}>
            {section.label.toUpperCase()}
          </h1>

          <p className="text-[clamp(11px,1.2vw,14px)] uppercase tracking-[0.28em] font-light font-sans mb-6 sm:mb-8" style={{ color: C.textStone }}>
            {section.tagline}
          </p>

          <p className="text-sm sm:text-base md:text-lg font-sans leading-relaxed max-w-2xl mx-auto mb-12 sm:mb-14" style={{ color: "rgba(244,240,231,0.65)", fontWeight: 400 }}>
            {section.description}
          </p>

          <a
            href="#section-feed"
            className="inline-block text-[11px] sm:text-xs uppercase tracking-[0.24em] font-medium font-sans px-10 sm:px-14 py-3.5 sm:py-4 transition-all duration-500"
            style={{ color: C.champagne, border: "1px solid rgba(184,164,122,0.35)" }}
          >
            Explore the Collection →
          </a>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: C.ivory, opacity: 0.15 }}>
          <span className="text-[8px] uppercase tracking-[0.32em] font-sans">Scroll</span>
          <div className="w-px h-12" style={{ background: `linear-gradient(to bottom, ${C.ivory}, transparent)` }} />
        </div>
      </section>

      {/* ═══════════════ FEATURED STORY ═══════════════ */}
      {featured && (
        <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.ivory }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14 sm:mb-16">
              <span className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-medium font-sans mb-5" style={{ color: C.bronze }}>
                Featured Story
              </span>
              <h2 className="text-[clamp(2rem,4.5vw,4.2rem)] font-serif leading-[1.08] tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>
                {featured.headline}
              </h2>
              <div className="mt-8" style={{ width: 64, height: 1, background: "rgba(138,115,82,0.35)", margin: "0 auto" }} />
            </div>

            <Link href={`/${section.slug}/${featured.slug}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[540px] overflow-hidden">
                  <Image
                    src={featured.heroImage}
                    alt={featured.headline}
                    fill
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                    sizes="(max-width:1024px)100vw,58vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-1000 ease-in-out"
                  />
                </div>
                <div className="lg:col-span-5 flex items-center p-10 sm:p-12 md:p-16 lg:p-20" style={{ background: C.cream }}>
                  <div className="space-y-5 sm:space-y-7">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-sans font-medium" style={{ color: C.bronze }}>
                      {featured.category} · {featured.readTime}
                    </span>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif leading-[1.08] transition-colors duration-300 group-hover:text-[#8A7352]" style={{ color: C.textDeep, fontWeight: 400 }}>
                      {featured.subtitle.split(",")[0]}
                    </h3>
                    <p className="text-sm sm:text-base font-sans leading-relaxed max-w-md" style={{ color: C.textStone, fontWeight: 400 }}>
                      {featured.subtitle}
                    </p>
                    <span className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium font-sans transition-colors" style={{ color: C.bronze, borderBottom: `1px solid ${C.champagne}`, paddingBottom: 2 }}>
                      Read the Full Story →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ═══════════════ EDITORIAL FEED ═══════════════ */}
      <div id="section-feed" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto pt-16 sm:pt-20 md:pt-24 px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="text-center mb-8 sm:mb-10">
            <span className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.bronze }}>
              The {section.label} Edit
            </span>
            <h2 className="text-[clamp(1.8rem,3.5vw,3.5rem)] font-serif leading-[1.1] mt-3 tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>
              {section.feedHeading}
            </h2>
            <div className="mt-7 mx-auto" style={{ width: 64, height: 1, background: "rgba(138,115,82,0.35)" }} />
          </div>
        </div>
        <EditorialFeed section={section} articles={articles} />
      </div>

      {/* ═══════════════ SPOTLIGHT FEATURE (CROSS-LINK) ═══════════════ */}
      {spotlight && (
        <section className="py-16 sm:py-20 px-6 sm:px-8 md:px-12 lg:px-16 border-t border-[rgba(138,115,82,0.25)]" style={{ background: C.cream }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8" style={{ backgroundColor: "#D4673A" }} />
              <span className="text-[10px] uppercase tracking-[0.24em] font-sans font-semibold" style={{ color: "#D4673A" }}>
                Feature Spotlight · {spotlight.tag}
              </span>
            </div>
            <Link
              href={spotlight.href}
              className="group block border border-[#D9CFC2] bg-[#FBF9F5] shadow-sm transition-all duration-500 hover:shadow-md hover:border-[#D4673A]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto lg:min-h-[320px] overflow-hidden bg-[#22344A]">
                  <Image
                    src={spotlight.image}
                    alt={spotlight.title}
                    fill
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    style={{ objectPosition: "50% 25%" }}
                  />
                </div>
                <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between" style={{ background: "#22344A" }}>
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] uppercase tracking-[0.22em] font-sans font-semibold" style={{ color: "#D4673A" }}>
                        {spotlight.tag}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.16em] font-sans text-[#B8A47A]">
                        {spotlight.readTime}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-serif text-[#F3E7D3] leading-snug mb-3 group-hover:text-[#D4673A] transition-colors" style={{ fontWeight: 400 }}>
                      {spotlight.title}
                    </h3>
                    <p className="text-sm sm:text-base font-sans text-[#EFE3D2]/85 leading-relaxed font-light mb-6">
                      {spotlight.dek}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[rgba(243,231,211,0.2)] flex items-center justify-between text-xs font-sans text-[#B8A47A]">
                    <span>Portraits of Heritage Series · Balasinor</span>
                    <span className="uppercase tracking-[0.18em] text-[#F3E7D3] group-hover:text-[#D4673A] transition-colors">
                      Read Flagship Profile →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ═══════════════ EDITORIAL STATEMENT ═══════════════ */}
      <section className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.obsidian }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-medium font-sans mb-6" style={{ color: C.champagne }}>
            The Royal Gallerys — {section.label}
          </span>
          <h2 className="text-[clamp(1.8rem,4vw,4rem)] font-serif leading-[1.1] tracking-tight mb-8" style={{ color: C.ivory, fontWeight: 400 }}>
            {section.editorialStatement}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/advertise"
              className="inline-block text-[11px] sm:text-xs uppercase tracking-[0.22em] font-medium font-sans px-10 sm:px-12 py-3.5 transition-all duration-500"
              style={{ color: C.ivory, border: "1px solid rgba(184,164,122,0.4)" }}
            >
              Explore Partnership Opportunities →
            </Link>
            <Link
              href="/global-vision"
              className="inline-block text-[11px] sm:text-xs uppercase tracking-[0.22em] font-medium font-sans px-10 sm:px-12 py-3.5 transition-all duration-500"
              style={{ color: C.champagne, border: "1px solid rgba(184,164,122,0.25)" }}
            >
              Discover Our World →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ CROSS-SECTION LINKS ═══════════════ */}
      <section className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.ivory }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 sm:mb-18">
            <span className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-medium font-sans mb-5" style={{ color: C.bronze }}>
              Continue Exploring
            </span>
            <h2 className="text-[clamp(1.8rem,3.5vw,3.5rem)] font-serif leading-[1.1] tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>
              The Royal Gallerys World
            </h2>
            <div className="mt-7 mx-auto" style={{ width: 64, height: 1, background: "rgba(138,115,82,0.35)" }} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {crossLinks.map((item) => (
              <Link key={item.href} href={item.href} className="group flex flex-col">
                <div className="relative aspect-[3/4] overflow-hidden mb-4">
                  <Image
                    src={item.img}
                    alt={item.label}
                    fill
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                    sizes="(max-width:768px)100vw,25vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-1000"
                  />
                </div>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-medium font-sans" style={{ color: C.bronze }}>
                  {item.label}
                </span>
                <h3 className="text-lg sm:text-xl font-serif mt-1.5 leading-tight transition-colors duration-300 group-hover:text-[#8A7352]" style={{ color: C.textDeep, fontWeight: 400 }}>
                  {item.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ NEWSLETTER ═══════════════ */}
      <section className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16 text-center" style={{ background: C.charcoal }}>
        <div className="max-w-xl mx-auto">
          <span className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-medium font-sans mb-5" style={{ color: C.champagne }}>
            The Royal Gallerys Dispatch
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight mb-4" style={{ color: C.ivory, fontWeight: 400 }}>
            The Finest Stories in Heritage &amp; Luxury, Weekly
          </h2>
          <p className="text-sm sm:text-base font-sans mb-8 leading-relaxed" style={{ color: "rgba(244,240,231,0.65)", fontWeight: 400 }}>
            {section.label}, culture, travel, design — curated by our editors and delivered to your inbox. Join the conversation at the intersection of heritage and contemporary luxury.
          </p>
          <Link
            href="/membership"
            className="inline-block px-10 py-4 text-xs uppercase tracking-[0.22em] font-medium font-sans transition-all duration-500"
            style={{ border: `1px solid ${C.champagne}`, color: C.ivory }}
          >
            Subscribe to the Dispatch
          </Link>
        </div>
      </section>

      {/* ═══════════════ PARTNERSHIP CTA ═══════════════ */}
      <section className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.cream }}>
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-medium font-sans mb-6" style={{ color: C.bronze }}>
            Your Brand Has a Story
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif leading-[1.1] mb-8 tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>
            Put It in Front of the<br />Right Audience.
          </h2>
          <p className="text-sm sm:text-base font-sans leading-relaxed max-w-xl mx-auto mb-8" style={{ color: C.textStone, fontWeight: 400 }}>
            For luxury brands, hospitality groups, designers and cultural institutions — THE ROYAL GALLERYS offers an editorial environment where your story connects with the most sophisticated audience in the world.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto text-left">
            {[
              { title: "Request Media Kit", desc: "Discover our editorial calendar, audience insights, and partnership opportunities.", href: "/advertise" },
              { title: "Discuss a Partnership", desc: "Explore how your brand can participate in our editorial world.", href: "/advertise" },
              { title: "Contact the Editors", desc: "Reach our editorial team directly for story proposals and collaborations.", href: "mailto:hey.theroyalgallerys@gmail.com" },
            ].map((cta) => (
              <Link
                key={cta.title}
                href={cta.href}
                className="group p-6 transition-all duration-500 text-center sm:text-left"
                style={{ background: C.ivory, border: "1px solid rgba(138,115,82,0.12)" }}
              >
                <h3 className="text-sm sm:text-base font-serif mb-2 transition-colors duration-300 group-hover:text-[#8A7352]" style={{ color: C.textDeep, fontWeight: 400 }}>
                  {cta.title}
                </h3>
                <p className="text-xs font-sans leading-relaxed" style={{ color: C.textStone, fontWeight: 400 }}>
                  {cta.desc}
                </p>
                <span className="inline-block mt-4 text-[10px] uppercase tracking-[0.18em] font-medium font-sans" style={{ color: C.bronze }}>
                  Learn More →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
