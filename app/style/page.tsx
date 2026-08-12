import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import StyleEditorialFeed from "../components/StyleEditorialFeed";

const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNkZGRkZGQiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

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

export const metadata: Metadata = {
  title: "STYLE — Fashion, Couture, Jewellery & Luxury | The Royal Gallerys",
  description: "THE ROYAL GALLERYS Style section — an international luxury fashion editorial destination covering fashion, couture, jewellery, watches, beauty, and the intersection of Indian heritage with contemporary luxury.",
  keywords: "luxury fashion, Indian couture, jewellery, watches, beauty, royal style, Indian fashion, luxury brands, fashion trends 2026, Indian craftsmanship, bridal couture, high jewellery India",
  openGraph: {
    title: "STYLE — The Royal Gallerys Fashion & Luxury Editorial",
    description: "Fashion, couture, jewellery, watches, beauty — the art of personal style through the lens of heritage, craftsmanship, and contemporary luxury.",
    type: "website",
    images: [{ url: "https://theroyalgallerys.com/images/colorful-vibrant-indian-landscape(1).jpg", width: 1200, height: 630, alt: "The Royal Gallerys — Style" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "STYLE — The Royal Gallerys",
    description: "Fashion, couture, jewellery, watches, beauty — where heritage meets contemporary luxury.",
  },
  alternates: { canonical: "https://theroyalgallerys.com/style" },
};

export default function StylePage() {
  return (
    <div style={{ background: C.ivory }}>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-[80vh] sm:min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/vecteezy_jaipur-city-palace-in-jaipur-city_3153081.jpg"
            alt="Style — The Royal Gallerys"
            fill
            priority
            placeholder="blur"
            blurDataURL={blurDataURL}
            className="object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(17,17,15,0.88), rgba(17,17,15,0.55), rgba(17,17,15,0.85))" }} />
        </div>

        {/* Top accent */}
        <div className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2" style={{ width: "clamp(40px,8vw,80px)", height: 1, background: "rgba(184,164,122,0.5)" }} />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 md:px-12 pt-28 sm:pt-36 pb-20 sm:pb-28 text-center">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.42em] font-medium font-sans mb-8 sm:mb-10" style={{ color: C.champagne, opacity: 0.75 }}>
            The Royal Gallerys — Style
          </p>

          <h1 className="text-[clamp(3rem,6vw,7rem)] font-serif leading-[0.92] mb-8 sm:mb-10 tracking-tight" style={{ color: C.ivory, fontWeight: 400 }}>
            STYLE
          </h1>

          <p className="text-[clamp(11px,1.2vw,14px)] uppercase tracking-[0.28em] font-light font-sans mb-6 sm:mb-8" style={{ color: C.textStone }}>
            Fashion · Couture · Jewellery · Watches · Beauty · Accessories
          </p>

          <p className="text-sm sm:text-base md:text-lg font-sans leading-relaxed max-w-2xl mx-auto mb-12 sm:mb-14" style={{ color: "rgba(244,240,231,0.65)", fontWeight: 400 }}>
            An international luxury fashion editorial destination exploring the intersection of heritage craftsmanship, contemporary design, and the evolving language of Indian and global luxury style.
          </p>

          <a
            href="#style-feed"
            className="inline-block text-[11px] sm:text-xs uppercase tracking-[0.24em] font-medium font-sans px-10 sm:px-14 py-3.5 sm:py-4 transition-all duration-500"
            style={{ color: C.champagne, border: "1px solid rgba(184,164,122,0.35)" }}
          >
            Explore the Collection →
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: C.ivory, opacity: 0.15 }}>
          <span className="text-[8px] uppercase tracking-[0.32em] font-sans">Scroll</span>
          <div className="w-px h-12" style={{ background: `linear-gradient(to bottom, ${C.ivory}, transparent)` }} />
        </div>
      </section>

      {/* ═══════════════ FEATURED STORY ═══════════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.ivory }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 sm:mb-16">
            <span className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-medium font-sans mb-5" style={{ color: C.bronze }}>
              Featured Story
            </span>
            <h2 className="text-[clamp(2rem,4.5vw,4.2rem)] font-serif leading-[1.08] tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>
              India&apos;s New Luxury<br />Fashion Consumer
            </h2>
            <div className="mt-8" style={{ width: 64, height: 1, background: "rgba(138,115,82,0.35)", margin: "0 auto" }} />
          </div>

          <Link href="/style/indias-new-luxury-fashion-consumer" className="group block">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[540px] overflow-hidden">
                <Image
                  src="/images/colorful-vibrant-indian-landscape.jpg"
                  alt="India's New Luxury Fashion Consumer"
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
                    Brand Strategy · 14 min read
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif leading-[1.08] transition-colors duration-300 group-hover:text-[#8A7352]" style={{ color: C.textDeep, fontWeight: 400 }}>
                    What Global Brands Need to Know
                  </h3>
                  <p className="text-sm sm:text-base font-sans leading-relaxed max-w-md" style={{ color: C.textStone, fontWeight: 400 }}>
                    A definitive analysis of India&apos;s emerging luxury fashion consumer — shifting behaviours, premiumisation, digital discovery, and what international luxury brands must understand to succeed in the Indian market.
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

      {/* ═══════════════ EDITORIAL FEED ═══════════════ */}
      <div id="style-feed" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto pt-16 sm:pt-20 md:pt-24 px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="text-center mb-8 sm:mb-10">
            <span className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.bronze }}>
              The Style Edit
            </span>
            <h2 className="text-[clamp(1.8rem,3.5vw,3.5rem)] font-serif leading-[1.1] mt-3 tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>
              A Curated Selection of Luxury<br />Fashion Editorials
            </h2>
            <div className="mt-7 mx-auto" style={{ width: 64, height: 1, background: "rgba(138,115,82,0.35)" }} />
          </div>
        </div>
        <StyleEditorialFeed />
      </div>

      {/* ═══════════════ WHERE FASHION MEETS HERITAGE ═══════════════ */}
      <section className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.obsidian }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-medium font-sans mb-6" style={{ color: C.champagne }}>
            Where Fashion Meets Heritage
          </span>
          <h2 className="text-[clamp(1.8rem,4vw,4rem)] font-serif leading-[1.1] tracking-tight mb-8" style={{ color: C.ivory, fontWeight: 400 }}>
            THE ROYAL GALLERYS explores the intersection of fashion, heritage, royalty, culture and contemporary luxury.
          </h2>
          <p className="text-base sm:text-lg font-sans leading-relaxed max-w-2xl mx-auto mb-10" style={{ color: C.textStone, fontWeight: 400 }}>
            Our editorial world brings together stories of designers, artisans, personalities, destinations and institutions shaping India&apos;s luxury landscape — creating a distinctive platform where cultural authority meets commercial intelligence.
          </p>
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
            {[
              { href: "/travel", label: "Travel", title: "Palace Hotels & Heritage Journeys", img: "/images/udaipur-city-view-from-hotel-balcony-rajasthan-india.jpg" },
              { href: "/culture", label: "Culture", title: "Art, Patronage & Living Heritage", img: "/images/hawa-mahal-palace-jaipur-india.jpg" },
              { href: "/society", label: "Society", title: "Royalty, People & Institutions", img: "/images/architectural-marvel-with-ornate-columns-arches.jpg" },
              { href: "/design", label: "Design", title: "Architecture, Interiors & Craft", img: "/images/hallway-arches-with-dramatic-light-shadows.jpg" },
            ].map((item) => (
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
            The Style Dispatch
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight mb-4" style={{ color: C.ivory, fontWeight: 400 }}>
            The Finest Stories in Fashion, Weekly
          </h2>
          <p className="text-sm sm:text-base font-sans mb-8 leading-relaxed" style={{ color: "rgba(244,240,231,0.65)", fontWeight: 400 }}>
            Couture, jewellery, watches, beauty — curated by our editors and delivered to your inbox. Join the conversation at the intersection of heritage and contemporary luxury.
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
            Let It Enter the Right<br />Conversation.
          </h2>
          <p className="text-sm sm:text-base font-sans leading-relaxed max-w-xl mx-auto mb-8" style={{ color: C.textStone, fontWeight: 400 }}>
            For luxury fashion houses, couture designers, jewellery brands, watchmakers, beauty houses, and luxury lifestyle brands — THE ROYAL GALLERYS offers an editorial environment where your story connects with the most sophisticated audience in the world.
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
