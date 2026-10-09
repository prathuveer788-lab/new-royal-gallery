import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { C, blurDataURL } from "@/lib/design-tokens";
import { getSection } from "@/lib/editorial/sections";
import { getSectionArticles } from "@/lib/editorial/registry";
import { buildSectionMetadata } from "@/lib/editorial/metadata";
import NewsletterForm from "@/app/components/NewsletterForm";

const section = getSection("jewellery");
export const metadata: Metadata = buildSectionMetadata(section);

export default function JewelleryPage() {
  const articles = getSectionArticles("jewellery");

  // Lead Cover Story
  const leadStory = articles.find((a) => a.slug === "the-tiara-britains-most-enduring-jewel") || articles[0];

  // Royal & Aristocratic Stories
  const royalArticles = articles.filter((a) =>
    ["the-vladimir-tiara-romanov-to-windsor", "garrard-and-the-crown-jewels", "french-crown-jewels-louvre"].includes(a.slug)
  );

  // The Great Maisons
  const maisonArticles = articles.filter((a) =>
    ["cartier-the-king-of-jewellers", "van-cleef-arpels-the-mystery-setting", "graff-and-historic-diamonds", "bulgari-serpenti-high-jewellery"].includes(a.slug)
  );

  // The Collector & The Atelier
  const collectorArticles = articles.filter((a) =>
    ["inside-mayfair-private-jewellers", "the-collector-historic-auctions"].includes(a.slug)
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Jewellery — High Jewellery, Royal Collections & Great Maisons",
    description: section.description,
    url: "https://theroyalgallerys.com/jewellery",
    publisher: {
      "@type": "Organization",
      name: "The Royal Gallerys",
      url: "https://theroyalgallerys.com",
    },
    hasPart: articles.map((article) => ({
      "@type": "Article",
      headline: article.headline,
      url: `https://theroyalgallerys.com/jewellery/${article.slug}`,
      image: `https://theroyalgallerys.com${article.heroImage}`,
    })),
  };

  return (
    <div style={{ background: C.ivory }} className="text-[#181714]">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ═══════════════ MASTHEAD & HERO BANNER ═══════════════ */}
      <section className="relative min-h-[85vh] sm:min-h-[92vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={section.heroImage}
            alt={section.heroAlt}
            fill
            priority
            placeholder="blur"
            blurDataURL={blurDataURL}
            className="object-cover object-center filter brightness-[0.72] contrast-[1.08]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(17,17,15,0.85) 0%, rgba(17,17,15,0.48) 50%, rgba(17,17,15,0.92) 100%)",
            }}
          />
        </div>

        {/* Delicate hairline ornament */}
        <div
          className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2"
          style={{ width: "clamp(48px,10vw,96px)", height: 1, background: "rgba(184,164,122,0.6)" }}
        />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 md:px-12 pt-32 sm:pt-40 pb-20 sm:pb-28 text-center">
          <p
            className="text-[10px] sm:text-[11px] uppercase tracking-[0.44em] font-medium font-sans mb-6 sm:mb-8"
            style={{ color: C.champagne }}
          >
            The Royal Gallerys · Editorial
          </p>

          <h1
            className="text-[clamp(3.2rem,7vw,7.5rem)] font-serif leading-[0.92] mb-6 sm:mb-8 tracking-tight"
            style={{ color: C.ivory, fontWeight: 400 }}
          >
            JEWELLERY
          </h1>

          <p
            className="text-[clamp(11px,1.25vw,14px)] uppercase tracking-[0.3em] font-light font-sans mb-6 sm:mb-8"
            style={{ color: "rgba(234, 227, 213, 0.88)" }}
          >
            High Jewellery · Royal Collections · British Craft · Gemstones · Collectors
          </p>

          <div
            className="w-16 h-px mx-auto mb-6 sm:mb-8"
            style={{ background: "rgba(184,164,122,0.45)" }}
          />

          <p
            className="text-sm sm:text-base md:text-lg font-sans leading-relaxed max-w-2xl mx-auto mb-10 sm:mb-12"
            style={{ color: "rgba(244,240,231,0.78)", fontWeight: 300 }}
          >
            An international luxury editorial chronicle of high jewellery — the historic royal collections of Britain and Europe, the discreet salons of Mayfair and Place Vendôme, legendary gemstones, and master ateliers.
          </p>

          {/* Quick jump navigation */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-3xl mx-auto">
            <a
              href="#jewellery-edit"
              className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] font-sans px-5 py-2.5 transition-all duration-300"
              style={{
                color: C.ivory,
                background: "rgba(184,164,122,0.18)",
                border: "1px solid rgba(184,164,122,0.4)",
              }}
            >
              The Jewellery Edit
            </a>
            <a
              href="#royal-aristocratic"
              className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] font-sans px-5 py-2.5 transition-all duration-300 hover:border-[#B8A47A]"
              style={{
                color: "rgba(244,240,231,0.85)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              Royal & Aristocratic
            </a>
            <a
              href="#great-houses"
              className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] font-sans px-5 py-2.5 transition-all duration-300 hover:border-[#B8A47A]"
              style={{
                color: "rgba(244,240,231,0.85)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              The Great Maisons
            </a>
            <a
              href="#the-collector"
              className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] font-sans px-5 py-2.5 transition-all duration-300 hover:border-[#B8A47A]"
              style={{
                color: "rgba(244,240,231,0.85)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              The Collector & Atelier
            </a>
          </div>
        </div>

        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          style={{ color: C.ivory, opacity: 0.2 }}
        >
          <span className="text-[8px] uppercase tracking-[0.32em] font-sans">Scroll</span>
          <div
            className="w-px h-10"
            style={{ background: `linear-gradient(to bottom, ${C.ivory}, transparent)` }}
          />
        </div>
      </section>

      {/* ═══════════════ THE JEWELLERY EDIT (LEAD STORY) ═══════════════ */}
      <section
        id="jewellery-edit"
        className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16"
        style={{ background: C.ivory }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between border-b pb-5 mb-12 sm:mb-16" style={{ borderColor: "rgba(184,164,122,0.3)" }}>
            <div>
              <span
                className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-medium font-sans block mb-1"
                style={{ color: C.bronze }}
              >
                Lead Feature
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif tracking-tight" style={{ color: C.obsidian }}>
                The Jewellery Edit
              </h2>
            </div>
            <span
              className="text-[11px] uppercase tracking-[0.22em] font-sans hidden sm:inline"
              style={{ color: C.textStone }}
            >
              Issue No. 04 · High Jewellery
            </span>
          </div>

          <article className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Visual */}
            <div className="lg:col-span-7">
              <Link href={`/jewellery/${leadStory.slug}`} className="group block relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden">
                <Image
                  src={leadStory.heroImage}
                  alt={leadStory.headline}
                  fill
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "rgba(17,17,15,0.15)" }}
                />
              </Link>
              <p
                className="text-[11px] font-sans mt-3 text-right italic"
                style={{ color: C.textStone }}
              >
                {leadStory.heroCaption}
              </p>
            </div>

            {/* Editorial Content */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="text-[10px] uppercase tracking-[0.24em] font-medium font-sans px-3 py-1"
                  style={{
                    color: C.bronze,
                    background: "rgba(138,115,82,0.08)",
                    border: "1px solid rgba(138,115,82,0.25)",
                  }}
                >
                  {leadStory.category}
                </span>
                <span className="text-[11px] font-sans" style={{ color: C.textStone }}>
                  {leadStory.readTime}
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl md:text-[2.75rem] font-serif leading-[1.12] mb-6">
                <Link
                  href={`/jewellery/${leadStory.slug}`}
                  className="hover:text-[#8A7352] transition-colors duration-300"
                  style={{ color: C.obsidian }}
                >
                  {leadStory.headline}
                </Link>
              </h3>

              <p
                className="text-base sm:text-lg font-sans leading-relaxed mb-8"
                style={{ color: "rgba(24,23,20,0.8)", fontWeight: 300 }}
              >
                {leadStory.subtitle}
              </p>

              <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: "rgba(184,164,122,0.25)" }}>
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] font-sans font-medium" style={{ color: C.obsidian }}>
                    {leadStory.authorName}
                  </p>
                  <p className="text-[11px] font-sans" style={{ color: C.textStone }}>
                    {leadStory.authorRole}
                  </p>
                </div>

                <Link
                  href={`/jewellery/${leadStory.slug}`}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-medium font-sans group hover:gap-3 transition-all duration-300"
                  style={{ color: C.bronze }}
                >
                  <span>Read Article</span>
                  <span className="text-sm">→</span>
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ═══════════════ EDITORIAL STATEMENT BAND ═══════════════ */}
      <section className="py-20 sm:py-24 px-6 sm:px-8 md:px-12" style={{ background: C.obsidian, color: C.ivory }}>
        <div className="max-w-4xl mx-auto text-center">
          <span
            className="text-[10px] sm:text-[11px] uppercase tracking-[0.38em] font-medium font-sans mb-6 block"
            style={{ color: C.champagne }}
          >
            The Editorial Manifesto
          </span>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-serif font-light leading-relaxed mb-8"
            style={{ color: C.cream }}
          >
            &ldquo;High jewellery is not an accessory to fashion; it is geology elevated to statehood, the architectural craft of the sovereign court, and an immortal document of human taste.&rdquo;
          </h2>
          <div className="w-12 h-px mx-auto mb-6" style={{ background: "rgba(184,164,122,0.4)" }} />
          <p
            className="text-xs sm:text-sm uppercase tracking-[0.28em] font-sans"
            style={{ color: C.champagne, opacity: 0.8 }}
          >
            London · Paris · Rome · Geneva
          </p>
        </div>
      </section>

      {/* ═══════════════ ROYAL & ARISTOCRATIC ═══════════════ */}
      <section
        id="royal-aristocratic"
        className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16"
        style={{ background: "#F0ECE1" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 sm:mb-20">
            <span
              className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-medium font-sans block mb-3"
              style={{ color: C.bronze }}
            >
              Sovereign Provenance · Historic Diadems · Imperial Regalia
            </span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-6" style={{ borderColor: "rgba(184,164,122,0.3)" }}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight" style={{ color: C.obsidian }}>
                Royal & Aristocratic
              </h2>
              <p className="text-sm font-sans max-w-xl" style={{ color: C.textStone }}>
                From Westminster Abbey and St Petersburg to the Galerie d’Apollon, chronicling the crown jewels that shaped the visual theatre of European dynasties.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
            {royalArticles.map((article) => (
              <article key={article.slug} className="group flex flex-col justify-between">
                <div>
                  <Link href={`/jewellery/${article.slug}`} className="block relative aspect-[4/5] overflow-hidden mb-6">
                    <Image
                      src={article.heroImage}
                      alt={article.headline}
                      fill
                      placeholder="blur"
                      blurDataURL={blurDataURL}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "rgba(17,17,15,0.12)" }}
                    />
                    <div className="absolute top-4 left-4">
                      <span
                        className="text-[9px] uppercase tracking-[0.2em] font-medium font-sans px-2.5 py-1"
                        style={{
                          color: C.ivory,
                          background: "rgba(17,17,15,0.75)",
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        {article.category}
                      </span>
                    </div>
                  </Link>

                  <p className="text-[10px] uppercase tracking-[0.2em] font-sans mb-3" style={{ color: C.bronze }}>
                    {article.readTime} · {article.authorName}
                  </p>

                  <h3 className="text-xl sm:text-2xl font-serif leading-[1.24] mb-3">
                    <Link
                      href={`/jewellery/${article.slug}`}
                      className="group-hover:text-[#8A7352] transition-colors duration-300"
                      style={{ color: C.obsidian }}
                    >
                      {article.headline}
                    </Link>
                  </h3>

                  <p
                    className="text-sm font-sans leading-relaxed mb-6 line-clamp-3"
                    style={{ color: "rgba(24,23,20,0.75)", fontWeight: 300 }}
                  >
                    {article.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t" style={{ borderColor: "rgba(184,164,122,0.2)" }}>
                  <Link
                    href={`/jewellery/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] font-medium font-sans hover:gap-2.5 transition-all duration-300"
                    style={{ color: C.bronze }}
                  >
                    <span>Read Dossier</span>
                    <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ THE GREAT MAISONS ═══════════════ */}
      <section
        id="great-houses"
        className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16"
        style={{ background: C.ivory }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 sm:mb-20">
            <span
              className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-medium font-sans block mb-3"
              style={{ color: C.bronze }}
            >
              Mayfair · Place Vendôme · Via Condotti
            </span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-6" style={{ borderColor: "rgba(184,164,122,0.3)" }}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight" style={{ color: C.obsidian }}>
                The Great Maisons
              </h2>
              <p className="text-sm font-sans max-w-xl" style={{ color: C.textStone }}>
                The European high jewellery houses that defined modern elegance through pioneering patents, architectural platinum, and legendary stones.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14">
            {maisonArticles.map((article, idx) => (
              <article key={article.slug} className="group border pb-8" style={{ background: "#FCFAF6", borderColor: "rgba(184,164,122,0.22)" }}>
                <Link href={`/jewellery/${article.slug}`} className="block relative aspect-[16/10] overflow-hidden mb-6">
                  <Image
                    src={article.heroImage}
                    alt={article.headline}
                    fill
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "rgba(17,17,15,0.12)" }}
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className="text-[9px] uppercase tracking-[0.2em] font-medium font-sans px-3 py-1"
                      style={{
                        color: C.ivory,
                        background: "rgba(17,17,15,0.8)",
                      }}
                    >
                      {article.category}
                    </span>
                  </div>
                </Link>

                <div className="px-6 sm:px-8">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-sans mb-3" style={{ color: C.bronze }}>
                    <span>{article.readTime}</span>
                    <span>·</span>
                    <span>{article.authorName}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif leading-[1.18] mb-4">
                    <Link
                      href={`/jewellery/${article.slug}`}
                      className="group-hover:text-[#8A7352] transition-colors duration-300"
                      style={{ color: C.obsidian }}
                    >
                      {article.headline}
                    </Link>
                  </h3>

                  <p
                    className="text-sm font-sans leading-relaxed mb-6"
                    style={{ color: "rgba(24,23,20,0.78)", fontWeight: 300 }}
                  >
                    {article.subtitle}
                  </p>

                  <div className="pt-4 border-t flex items-center justify-between" style={{ borderColor: "rgba(184,164,122,0.2)" }}>
                    <span className="text-[10px] uppercase tracking-[0.22em] font-sans" style={{ color: C.textStone }}>
                      Maison Profile
                    </span>
                    <Link
                      href={`/jewellery/${article.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-medium font-sans hover:gap-2.5 transition-all duration-300"
                      style={{ color: C.bronze }}
                    >
                      <span>Explore Feature</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ THE COLLECTOR & THE ATELIER ═══════════════ */}
      <section
        id="the-collector"
        className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16"
        style={{ background: "#EAE5D9" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 sm:mb-20">
            <span
              className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-medium font-sans block mb-3"
              style={{ color: C.bronze }}
            >
              Private Salons · Historic Salerooms · Gemstone Rarity
            </span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-6" style={{ borderColor: "rgba(184,164,122,0.3)" }}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight" style={{ color: C.obsidian }}>
                The Collector & The Atelier
              </h2>
              <p className="text-sm font-sans max-w-xl" style={{ color: C.textStone }}>
                Inside the discreet reception rooms of Mayfair, unheated geological rarities, and the historic auction salerooms of Geneva and London.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14">
            {collectorArticles.map((article) => (
              <article key={article.slug} className="group flex flex-col justify-between" style={{ background: C.ivory, border: "1px solid rgba(184,164,122,0.25)" }}>
                <div>
                  <Link href={`/jewellery/${article.slug}`} className="block relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={article.heroImage}
                      alt={article.headline}
                      fill
                      placeholder="blur"
                      blurDataURL={blurDataURL}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: "rgba(17,17,15,0.12)" }}
                    />
                  </Link>

                  <div className="p-8 sm:p-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="text-[9px] uppercase tracking-[0.24em] font-medium font-sans px-3 py-1"
                        style={{
                          color: C.bronze,
                          background: "rgba(138,115,82,0.08)",
                          border: "1px solid rgba(138,115,82,0.2)",
                        }}
                      >
                        {article.category}
                      </span>
                      <span className="text-[11px] font-sans" style={{ color: C.textStone }}>
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-serif leading-[1.2] mb-4">
                      <Link
                        href={`/jewellery/${article.slug}`}
                        className="group-hover:text-[#8A7352] transition-colors duration-300"
                        style={{ color: C.obsidian }}
                      >
                        {article.headline}
                      </Link>
                    </h3>

                    <p
                      className="text-sm sm:text-base font-sans leading-relaxed mb-6"
                      style={{ color: "rgba(24,23,20,0.78)", fontWeight: 300 }}
                    >
                      {article.subtitle}
                    </p>
                  </div>
                </div>

                <div className="px-8 pb-8 sm:px-10 sm:pb-10 pt-4 border-t flex items-center justify-between" style={{ borderColor: "rgba(184,164,122,0.2)" }}>
                  <span className="text-[11px] font-sans" style={{ color: C.textStone }}>
                    By {article.authorName}
                  </span>
                  <Link
                    href={`/jewellery/${article.slug}`}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-medium font-sans hover:gap-3 transition-all duration-300"
                    style={{ color: C.bronze }}
                  >
                    <span>Read Article</span>
                    <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ THE PRIVATE WORLD & DISCOVERY ═══════════════ */}
      <section className="py-20 sm:py-28 px-6 sm:px-8 md:px-12" style={{ background: C.obsidian, color: C.ivory }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <span
                className="text-[10px] sm:text-[11px] uppercase tracking-[0.36em] font-medium font-sans mb-4 block"
                style={{ color: C.champagne }}
              >
                The Private Salon & Connoisseurship
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light leading-[1.12] mb-6" style={{ color: C.ivory }}>
                A Sovereign Standard of Discretion and Craftsmanship
              </h2>
              <p className="text-sm sm:text-base font-sans leading-relaxed mb-8" style={{ color: "rgba(244,240,231,0.7)", fontWeight: 300 }}>
                The Royal Gallerys documents high jewellery as a sacred decorative art and sovereign lineage. Explore our private archival dossiers, discover master jewellers of Mayfair and Place Vendôme, or consult our curatorial editors.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/membership"
                  className="text-xs uppercase tracking-[0.22em] font-medium font-sans px-8 py-3.5 transition-all duration-300"
                  style={{
                    color: C.obsidian,
                    background: C.champagne,
                  }}
                >
                  Member Privileges
                </Link>
                <Link
                  href="/watches"
                  className="text-xs uppercase tracking-[0.22em] font-medium font-sans px-8 py-3.5 transition-all duration-300 hover:border-[#B8A47A]"
                  style={{
                    color: C.champagne,
                    border: "1px solid rgba(184,164,122,0.4)",
                  }}
                >
                  Explore Horology →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 border" style={{ borderColor: "rgba(184,164,122,0.3)", background: "rgba(28,27,24,0.6)" }}>
              <h3 className="text-lg font-serif mb-2" style={{ color: C.cream }}>
                The Jewellery Gazette
              </h3>
              <p className="text-xs font-sans mb-6" style={{ color: "rgba(244,240,231,0.6)" }}>
                Receive discreet dispatches on historic auctions, European royal diadem exhibitions, and high jewellery acquisitions.
              </p>
              <NewsletterForm
                variant="dark"
                source="jewellery-page"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
