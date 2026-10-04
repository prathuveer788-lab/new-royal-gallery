import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import TenDrivesSequence from "./components/TenDrivesSequence";
import ColourTurnSection from "./components/ColourTurnSection";
import PortfolioGallery from "./components/PortfolioGallery";
import AtAGlanceLabel from "./components/AtAGlanceLabel";
import ChapterRail from "./components/ChapterRail";
import ShareBar from "./components/ShareBar";
import FAQSection from "./components/FAQSection";
import { FAQS } from "./data";
import NewsletterForm from "@/app/components/NewsletterForm";

const CANONICAL_URL =
  "https://theroyalgallerys.com/society/shivanjali-kumari-dungarpur-wild-lens-of-royalty";

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiMxNDE0MTYiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

export const metadata: Metadata = {
  title:
    "Through the Wild Lens of Royalty: Shivanjali Kumari Dungarpur, Wildlife Photographer | The Royal Gallerys",
  description:
    "Princess Shivanjali Kumari Dungarpur on patience, the Masai Mara and a royal inheritance reimagined through the lens. A Portraits of Excellence profile.",
  authors: [{ name: "Krishanpriya Rajawat" }],
  publisher: "The Royal Gallerys",
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    type: "article",
    locale: "en_US",
    url: CANONICAL_URL,
    siteName: "The Royal Gallerys",
    title:
      "Through the Wild Lens of Royalty: Shivanjali Kumari Dungarpur, Wildlife Photographer",
    description:
      "Princess Shivanjali Kumari Dungarpur on patience, the Masai Mara and a royal inheritance reimagined through the lens. A Portraits of Excellence profile.",
    publishedTime: "2026-09-28T00:00:00.000Z",
    section: "Society",
    tags: [
      "Profile",
      "Portraits of Excellence",
      "Wildlife Photography",
      "Dungarpur",
      "Rajasthan",
      "Royal Women",
      "Masai Mara",
    ],
    images: [
      {
        url: "https://www.theroyalgallerys.com/images/society/shivanjali-kumari-dungarpur/og-shivanjali-kumari-dungarpur.jpg",
        width: 1200,
        height: 630,
        alt: "Through the Wild Lens of Royalty — Princess Shivanjali Kumari Dungarpur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@theroyalgallerys",
    creator: "@theroyalgallerys",
    title:
      "Through the Wild Lens of Royalty: Shivanjali Kumari Dungarpur, Wildlife Photographer",
    description:
      "Princess Shivanjali Kumari Dungarpur on patience, the Masai Mara and a royal inheritance reimagined through the lens. A Portraits of Excellence profile.",
    images: [
      "https://www.theroyalgallerys.com/images/society/shivanjali-kumari-dungarpur/og-shivanjali-kumari-dungarpur.jpg",
    ],
  },
};

export default function ShivanjaliProfilePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${CANONICAL_URL}#article`,
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://www.theroyalgallerys.com/#website",
          name: "The Royal Gallerys",
          url: "https://www.theroyalgallerys.com",
        },
        headline:
          "Through the Wild Lens of Royalty: Shivanjali Kumari Dungarpur, Wildlife Photographer",
        description:
          "Princess Shivanjali Kumari Dungarpur on patience, the Masai Mara and a royal inheritance reimagined through the lens. A Portraits of Excellence profile.",
        image:
          "https://www.theroyalgallerys.com/images/society/shivanjali-kumari-dungarpur/og-shivanjali-kumari-dungarpur.jpg",
        datePublished: "2026-09-28T00:00:00.000Z",
        dateModified: "2026-09-28T00:00:00.000Z",
        author: {
          "@type": "Person",
          name: "Krishanpriya Rajawat",
          jobTitle: "Contributing Writer, Portraits of Excellence",
        },
        publisher: {
          "@type": "Organization",
          name: "The Royal Gallerys",
          url: "https://www.theroyalgallerys.com",
          logo: {
            "@type": "ImageObject",
            url: "https://www.theroyalgallerys.com/icon.png",
          },
        },
        articleSection: "Society",
        keywords: [
          "Princess Shivanjali Kumari Dungarpur",
          "Wildlife Photography",
          "Dungarpur",
          "Rajasthan",
          "Portraits of Excellence",
          "Masai Mara",
          "Udai Bilas Palace",
          "Juna Mahal",
        ],
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": CANONICAL_URL,
        },
      },
      {
        "@type": "Person",
        "@id": `${CANONICAL_URL}#person`,
        name: "Shivanjali Kumari Dungarpur",
        alternateName: "Princess Shivanjali Kumari Dungarpur",
        jobTitle: "Wildlife Photographer",
        nationality: "Indian",
        affiliation: {
          "@type": "Organization",
          name: "Royal Family of Dungarpur",
        },
        homeLocation: {
          "@type": "Place",
          name: "Dungarpur, Rajasthan, India",
        },
      },
      {
        "@type": "ImageGallery",
        "@id": `${CANONICAL_URL}#gallery`,
        name: "The Portfolio · Masai Mara by Shivanjali Kumari Dungarpur",
        description:
          "Photographic plates of Masai Mara wildlife by Princess Shivanjali Kumari Dungarpur.",
        author: {
          "@type": "Person",
          name: "Shivanjali Kumari Dungarpur",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${CANONICAL_URL}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "The Royal Gallerys",
            item: "https://www.theroyalgallerys.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Society",
            item: "https://www.theroyalgallerys.com/society",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Portraits",
            item: "https://www.theroyalgallerys.com/society/portraits-of-heritage",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Through the Wild Lens of Royalty",
            item: CANONICAL_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${CANONICAL_URL}#faq`,
        mainEntity: FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
        })),
      },
    ],
  };

  return (
    <div className="feature--shivanjali min-h-screen">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Skip Link for Accessibility */}
      <a
        href="#main-feature-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-20 focus:left-6 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[#141416] focus:text-[#F8F7F4] focus:outline-1 focus:outline-[#C4687F]"
      >
        Skip to main content
      </a>

      {/* ════════════════════════════════════════════════
          1 & 2 — BREADCRUMB
          ════════════════════════════════════════════════ */}
      <div className="bg-[#141416] border-b border-white/10 pt-24 sm:pt-28 pb-3 px-6 sm:px-10 lg:px-16">
        <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto">
          <ol className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] font-sans text-white/60">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                The Royal Gallerys
              </Link>
            </li>
            <li className="text-white/30">/</li>
            <li>
              <Link href="/society" className="hover:text-white transition-colors">
                Society
              </Link>
            </li>
            <li className="text-white/30">/</li>
            <li>
              <Link
                href="/society/portraits-of-heritage"
                className="hover:text-white transition-colors"
              >
                Portraits
              </Link>
            </li>
            <li className="text-white/30 hidden sm:inline">/</li>
            <li className="text-[#C4687F] font-medium hidden sm:inline">
              Through the Wild Lens of Royalty
            </li>
          </ol>
        </nav>
      </div>

      {/* ════════════════════════════════════════════════
          3 — HERO: FULL-BLEED B&W (01-hero) 100vh
          Desktop: 100vh full bleed, gradients on lower & right only, face clean
          Mobile: 4:5 crop centered on her, text below face (no text over face!)
          ════════════════════════════════════════════════ */}
      <header
        aria-label="Profile Hero Banner"
        className="bg-[#141416] text-[#F8F7F4]"
      >
        {/* ── DESKTOP (md+): Full image at natural ratio, text overlay at bottom ── */}
        <div className="hidden md:block relative w-full">
          {/* Image at 100% width, auto height — exact native ratio, zero crop */}
          <Image
            src="/images/society/shivanjali-kumari-dungarpur/01-hero.jpg"
            alt="Princess Shivanjali Kumari Dungarpur seated in a boat on Dungarpur lake with Udai Bilas Palace in background"
            width={1024}
            height={681}
            quality={100}
            priority
            placeholder="blur"
            blurDataURL={blurDataURL}
            sizes="100vw"
            style={{ width: "100%", height: "auto", display: "block" }}
          />

          {/* Gradient fade: bottom for text legibility, right side */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141416]/90 via-[#141416]/15 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#141416]/75 via-transparent to-transparent pointer-events-none" />

          {/* Corner brackets */}
          <div className="corner-bracket corner-bracket--tl" aria-hidden="true" />
          <div className="corner-bracket corner-bracket--tr" aria-hidden="true" />
          <div className="corner-bracket corner-bracket--bl" aria-hidden="true" />
          <div className="corner-bracket corner-bracket--br" aria-hidden="true" />

          {/* Top rubric */}
          <div className="absolute top-8 left-8 lg:left-16 z-10">
            <span
              className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.32em] font-sans font-medium px-3.5 py-1.5 border border-white/20 bg-black/50 backdrop-blur-sm"
              style={{ color: "#CDB27A" }}
            >
              FEATURE · WILDLIFE PHOTOGRAPHY · HERITAGE EDITION 2026
            </span>
          </div>

          {/* Bottom text overlay — sits on the gradient */}
          <div className="absolute bottom-0 inset-x-0 z-10 px-8 lg:px-16 pb-8 lg:pb-12 grid grid-cols-12 gap-8 items-end">
            <div className="col-span-5 max-w-sm">
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-[#C4687F] block mb-2">
                PORTRAITS OF EXCELLENCE · WILDLIFE &amp; HERITAGE
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif italic text-[#F8F7F4] leading-tight mb-2">
                Shivanjali Kumari Dungarpur
              </h2>
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.24em] font-sans text-white/70 block">
                WILDLIFE PHOTOGRAPHER · DUNGARPUR, RAJASTHAN
              </span>
            </div>
            <div className="col-span-7 text-right">
              <h1 className="text-5xl sm:text-6xl lg:text-[80px] xl:text-[90px] font-serif leading-[0.94] tracking-tight mb-3 text-[#F8F7F4]">
                Through the{" "}
                <span className="italic" style={{ color: "#CDB27A" }}>
                  Wild Lens
                </span>{" "}
                of Royalty
              </h1>
              <p className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-white/85">
                Capturing the Untamed Heart of Rajasthan
              </p>
            </div>
          </div>
        </div>

        {/* ── MOBILE (< md): Full image at natural ratio, editorial text below ── */}
        <div className="block md:hidden bg-[#141416]">
          {/* Full image — no crop, no fill, exact native ratio */}
          <div className="relative">
            <Image
              src="/images/society/shivanjali-kumari-dungarpur/01-hero.jpg"
              alt="Princess Shivanjali Kumari Dungarpur on Dungarpur lake with Udai Bilas Palace behind her"
              width={1024}
              height={681}
              quality={100}
              priority
              placeholder="blur"
              blurDataURL={blurDataURL}
              sizes="100vw"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
            {/* Top label */}
            <div className="absolute top-3 left-3 z-10">
              <span className="text-[9px] uppercase tracking-[0.26em] font-sans font-medium px-2.5 py-1 bg-black/60 border border-white/20 text-[#CDB27A]">
                Portraits of Excellence
              </span>
            </div>
            {/* Bottom fade */}
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#141416] to-transparent pointer-events-none" />
          </div>

          {/* Editorial text — below image, no overlap on face */}
          <div className="bg-[#141416] px-6 pt-5 pb-10">
            <span className="text-[9px] uppercase tracking-[0.28em] font-sans font-semibold text-[#C4687F] block mb-3">
              FEATURE · HERITAGE EDITION 2026
            </span>
            <h1 className="text-[36px] leading-[1.04] font-serif text-[#F8F7F4] tracking-tight mb-3">
              Through the{" "}
              <span className="italic" style={{ color: "#CDB27A" }}>
                Wild Lens
              </span>{" "}
              of Royalty
            </h1>
            <p className="font-serif italic text-lg text-white/80 mb-6 leading-relaxed">
              Capturing the Untamed Heart of Rajasthan
            </p>
            <div className="pt-4 border-t border-white/15">
              <span className="text-[9px] uppercase tracking-[0.26em] font-sans text-[#C4687F] block mb-1">
                Artist Profile
              </span>
              <h2 className="text-2xl font-serif italic text-[#F8F7F4] leading-snug">
                Shivanjali Kumari Dungarpur
              </h2>
              <span className="text-[9px] uppercase tracking-[0.2em] font-sans text-white/55 block mt-1">
                WILDLIFE PHOTOGRAPHER · DUNGARPUR, RAJASTHAN
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════════
          4 — META BAR
          ════════════════════════════════════════════════ */}
      <div className="border-b border-[#D8D6D0] bg-[#F8F7F4] py-4 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-sans text-[#6A6A70]">
            <span className="font-semibold uppercase tracking-wider text-[#1C1C1E]">
              Society · Profile
            </span>
            <span className="text-[#D8D6D0]">|</span>
            <span>Words by <strong className="text-[#1C1C1E] font-medium">Krishanpriya Rajawat</strong></span>
            <span className="text-[#D8D6D0]">|</span>
            <span>Photography: <strong className="text-[#1C1C1E] font-medium">Shivanjali Kumari Dungarpur</strong></span>
            <span className="text-[#D8D6D0]">|</span>
            <span>8 min read</span>
            <span className="text-[#D8D6D0]">|</span>
            <span>Autumn 2026</span>
          </div>

          <ShareBar url={CANONICAL_URL} title="Through the Wild Lens of Royalty: Shivanjali Kumari Dungarpur" />
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          5 — STANDFIRST
          ════════════════════════════════════════════════ */}
      <section className="pt-16 sm:pt-20 pb-8 px-6 sm:px-10 lg:px-16 text-center max-w-4xl mx-auto">
        <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#1C1C1E] leading-[1.25]">
          Princess Shivanjali Kumari Dungarpur — where the weight of an ancient lineage meets the fearless eye of a modern artist.
        </p>
        <div className="w-16 h-px bg-[#C4687F] mx-auto mt-8 mb-4 opacity-60" />
      </section>

      {/* ════════════════════════════════════════════════
          EDITORIAL BODY CONTAINER WITH STICKY CHAPTER RAIL (>=1280px)
          ════════════════════════════════════════════════ */}
      <main id="main-feature-content" className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-8">
        <div className="xl:flex xl:gap-14 items-start">
          
          {/* Sticky Chapter Rail on left (>=1280px) */}
          <ChapterRail />

          {/* Main Reading Column (desktop: 680px, tablet: 620px) */}
          <article className="w-full max-w-[680px] mx-auto xl:mx-0 font-sans">

            {/* 6. Opening */}
            <div className="space-y-6 text-lg sm:text-[20px] font-serif leading-[1.7] text-[#1C1C1E]">
              <p className="drop-cap">
                In the lake city of Dungarpur, where heritage and wilderness have always shared the same horizon, Shivanjali Kumari has built a practice of quiet, extraordinary attention. A princess by birthright, a wildlife photographer by conviction, she moves through the wild with the patience of someone who understands that the most powerful images are never taken — they are waited for. Her lens captures not merely the animals of Rajasthan&apos;s forests and wetlands, but the emotional grammar of the natural world: stillness before the hunt, the tenderness between a cheetah and her cubs, the dignity of creatures entirely indifferent to the human gaze. Each frame is a testament to her belief that photography, at its finest, is an act of profound respect.
              </p>

              {/* Hero Line */}
              <div className="my-8 py-5 px-6 border-l-2 border-[#C4687F] bg-[#E3ECEE]/40 font-serif italic text-lg sm:text-xl text-[#1C1C1E] leading-relaxed">
                On the ancient lakes of Dungarpur, where Pareva stone glows blue-grey in the morning light and every ripple carries the memory of a dynasty — she waits, watches, and finds her frame.
              </div>
            </div>

            <div className="text-center my-10 select-none text-[#C4687F]">◆</div>

            {/* 7. Chapter I: The City That Made Her */}
            <section id="chapter-1" className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-[#C4687F] block">
                Chapter I
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1C1C1E] tracking-tight">
                The City That Made Her
              </h2>
              <div className="space-y-6 text-lg sm:text-[20px] font-serif leading-[1.7] text-[#1C1C1E]">
                <p>
                  The hilly terrain of southern Rajasthan cradles Dungarpur — a city of Pareva stone that glows bluish-grey in dawn light, of palaces that have outlasted dynasties. It is from this soil that Shivanjali Kumari Dungarpur — nineteen, princess by birthright, photographer by passion — draws her vision of the world.
                </p>
                <p>
                  Most who inherit a royal lineage inherit its rituals. Shivanjali inherited its gaze. The seven-storey Juna Mahal; the serene Udai Bilas Palace, her family&apos;s seat and today a celebrated heritage hotel. These are not backdrops to her life but the grammar of her artistic language — one she now speaks through a camera, studying at Le Mark Institute in Bombay.
                </p>
              </div>
            </section>

            <div className="text-center my-10 select-none text-[#C4687F]">◆</div>

            {/* 8. Chapter II: A Lockdown and an iPhone 5 */}
            <section id="chapter-2" className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-[#C4687F] block">
                Chapter II
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1C1C1E] tracking-tight">
                A Lockdown and an iPhone 5
              </h2>
              <div className="space-y-6 text-lg sm:text-[20px] font-serif leading-[1.7] text-[#1C1C1E]">
                <p>
                  Her journey began not in a studio but in the stillness of a lockdown. In 2020 her school, Mayo College, encouraged entry to a Round Square Conference on the arts. Armed only with an iPhone 5, she submitted her work — and emerged first runner-up across all-India. She returned transformed, earning her photography badge and rising to official Head Photographer, a role that pulled her from mid-lecture to capture school life as it happened.
                </p>
              </div>
            </section>

            {/* 9. Pull Quote 1 (860px wide layout) */}
            <blockquote className="my-14 py-8 border-t border-b border-[#C4687F]/40 text-center max-w-[860px] -mx-4 sm:-mx-8 lg:-mx-16 px-4">
              <p className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-[#1C1C1E] leading-snug">
                &ldquo;Nature has its own pace — it is raw, wild, and not performing for humans. This is the lesson I carry from every safari, every hour before sunrise, every quiet moment in the field.&rdquo;
              </p>
              <cite className="block mt-4 text-[11px] uppercase tracking-[0.24em] font-sans text-[#C4687F] not-italic font-medium">
                — Shivanjali Kumari Dungarpur
              </cite>
            </blockquote>

            {/* 10. Chapter III: The Most Powerful Permission */}
            <section id="chapter-3" className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-[#C4687F] block">
                Chapter III
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1C1C1E] tracking-tight">
                The Most Powerful Permission
              </h2>
              <div className="space-y-6 text-lg sm:text-[20px] font-serif leading-[1.7] text-[#1C1C1E]">
                <p>
                  By the middle of twelfth grade the decision was made: photography, and nothing else. Her parents offered the most powerful of permissions — <span className="italic">&ldquo;If you love it so much, why not?&rdquo;</span> For a young woman navigating expectations woven into centuries of royal heritage, it was an act of liberation. She enrolled in her degree with the blessing of a family that chose to celebrate her art over convention.
                </p>
              </div>
            </section>

          </article>
        </div>
      </main>

      {/* ════════════════════════════════════════════════
          11 — COLOUR TURN: FULL-BLEED SUNSET PORTRAIT (02-portrait-colour)
          Greyscale -> colour transition on scroll
          ════════════════════════════════════════════════ */}
      <ColourTurnSection />

      {/* ════════════════════════════════════════════════
          EDITORIAL BODY CONTAINER CONTINUED
          ════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-8">
        <div className="xl:flex xl:gap-14 items-start">
          
          <div className="hidden xl:block w-56 flex-shrink-0" />

          <article className="w-full max-w-[680px] mx-auto xl:mx-0 font-sans">
            
            {/* 12. Chapter IV: Where Philosophy Met Craft */}
            <section id="chapter-4" className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-[#C4687F] block">
                Chapter IV
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1C1C1E] tracking-tight">
                Where Philosophy Met Craft
              </h2>
              <div className="space-y-6 text-lg sm:text-[20px] font-serif leading-[1.7] text-[#1C1C1E]">
                <p>
                  Wildlife photography became the domain where philosophy met craft. She speaks of early safaris at Jim Corbett — frustrating hours, no sightings — and the eventual grace of patience; of the Masai Mara, where a lion at rest became a meditation on authenticity. She begins each photograph with a quiet intent, forming the core emotion before pressing the shutter.
                </p>
                <p>
                  Her most personal photograph remains a cheetah and her cubs in the Masai Mara. The cheetah, guides warned, is the rarest of the great cats to find. After ten drives, rising at four each morning, she found nothing. She held her instincts close — and on one of her last drives the cheetah walked into her frame as though always meant to. It holds everything she believes about patience and conviction.
                </p>
              </div>
            </section>

          </article>
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          13 — SIGNATURE: "TEN DRIVES" SEQUENCE
          Sticky full-screen section on --ink
          ════════════════════════════════════════════════ */}
      <TenDrivesSequence />

      {/* ════════════════════════════════════════════════
          14 — THE PORTFOLIO: MASAI MARA (Plates I–IV)
          Gallery wall desktop grid, mobile swipe, lightbox on black
          ════════════════════════════════════════════════ */}
      <PortfolioGallery />

      {/* ════════════════════════════════════════════════
          EDITORIAL BODY CONTAINER CONTINUED
          ════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12">
        <div className="xl:flex xl:gap-14 items-start">
          
          <div className="hidden xl:block w-56 flex-shrink-0" />

          <article className="w-full max-w-[680px] mx-auto xl:mx-0 font-sans">

            {/* 15. Chapter V: Other Inheritances */}
            <section id="chapter-5" className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-[#C4687F] block">
                Chapter V
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1C1C1E] tracking-tight">
                Other Inheritances
              </h2>
              <div className="space-y-6 text-lg sm:text-[20px] font-serif leading-[1.7] text-[#1C1C1E]">
                <p>
                  Beyond the wild she carries other inheritances: a bond with her father through automobiles, preserved in the family&apos;s car museum at Dungarpur, where a vintage Jaguar&apos;s lines echo the precision she seeks through her lens. From her mother, Her Highness Priyadarshini Kumari Dungarpur — who carried Rajasthani cuisine to Switzerland in 1991 — came a fascination with baking, and a diploma at Sophia College.
                </p>
              </div>
            </section>

          </article>
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          16 — "TWO INSTRUMENTS" STATEMENT BAND
          Full-bleed --ink band with thin rhythm pulse line
          ════════════════════════════════════════════════ */}
      <section
        aria-label="Two Instruments Statement"
        className="w-full my-12 py-20 sm:py-28 px-6 sm:px-12 lg:px-20 text-center bg-[#141416] text-[#F8F7F4] border-t border-b border-white/10 relative overflow-hidden"
      >
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.34em] font-sans font-medium text-[#C4687F] block mb-6">
            The Tabla &amp; The Shutter
          </span>

          <blockquote className="space-y-6">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif italic text-[#F8F7F4] leading-[1.25] tracking-tight">
              &ldquo;I played the tabla for ten years. I made a promise to my late grandfather to continue. It brings rhythm to my visual life — the beat of my hands and the click of the shutter, two instruments in the same pursuit of truth.&rdquo;
            </p>
            <cite className="block text-xs uppercase tracking-[0.24em] font-sans text-[#CDB27A] not-italic pt-4">
              — Shivanjali Kumari Dungarpur
            </cite>
          </blockquote>

          {/* Thin rhythmic pulsing motif line */}
          <div className="mt-12 flex items-center justify-center gap-3">
            <div className="w-16 h-px bg-[#C4687F]/40" />
            <div className="w-32 h-[1.5px] bg-[#C4687F] rhythm-pulse rounded-full" />
            <div className="w-16 h-px bg-[#C4687F]/40" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          EDITORIAL BODY CONTAINER CONTINUED
          ════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12">
        <div className="xl:flex xl:gap-14 items-start">
          
          <div className="hidden xl:block w-56 flex-shrink-0" />

          <article className="w-full max-w-[680px] mx-auto xl:mx-0 font-sans">

            {/* 17. Chapter VI: An Inheritance, Reimagined */}
            <section id="chapter-6" className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-[#C4687F] block">
                Chapter VI
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1C1C1E] tracking-tight">
                An Inheritance, Reimagined
              </h2>
              <div className="space-y-6 text-lg sm:text-[20px] font-serif leading-[1.7] text-[#1C1C1E]">
                <p>
                  After graduation her path is clear: study abroad, then commit fully to wildlife photography — chasing the unscripted, the unheld, the real. Alongside the camera, the tabla continues, in honour of a grandfather&apos;s memory.
                </p>
                <p>
                  She does not photograph to perform. She photographs to understand — the cheetah in the grass, the palace at first light, the city that made her. In her hands a camera is not merely a tool. It is an inheritance, reimagined.
                </p>
              </div>

              {/* End Signoff */}
              <div className="pt-8 mt-8 border-t border-[#D8D6D0] flex items-center gap-3 text-xs uppercase tracking-[0.24em] font-sans font-medium text-[#1C1C1E]">
                <span className="text-[#C4687F] select-none text-base">◆</span>
                <span>WORDS BY Krishanpriya Rajawat</span>
              </div>
            </section>

          </article>
        </div>
      </div>

      {/* ════════════════════════════════════════════════
          18 — AT A GLANCE: GALLERY WALL LABEL (on --mist)
          ════════════════════════════════════════════════ */}
      <div id="at-a-glance" className="px-6 sm:px-10 lg:px-16">
        <AtAGlanceLabel />
      </div>

      {/* ════════════════════════════════════════════════
          19 — CREDITS BLOCK
          ════════════════════════════════════════════════ */}
      <section
        aria-label="Editorial Credits"
        className="max-w-4xl mx-auto px-6 sm:px-10 py-10 border-t border-[#D8D6D0] text-center"
      >
        <p className="text-xs uppercase tracking-[0.22em] font-sans text-[#6A6A70] leading-relaxed">
          First published in <strong className="text-[#1C1C1E]">The Royal Gallerys</strong>, Heritage Edition, Autumn 2026, pp. XXIII–XXVI.
        </p>
        <p className="text-xs font-sans text-[#6A6A70] mt-2">
          By the Editors · Words by <strong className="text-[#1C1C1E]">Krishanpriya Rajawat</strong> · Photography: <strong className="text-[#1C1C1E]">Shivanjali Kumari Dungarpur</strong>.
        </p>
      </section>

      {/* ════════════════════════════════════════════════
          20 — CURATOR FAQ
          ════════════════════════════════════════════════ */}
      <div className="px-6 sm:px-10 lg:px-16">
        <FAQSection />
      </div>

      {/* ════════════════════════════════════════════════
          21 — MORE PORTRAITS (3 CARDS)
          ════════════════════════════════════════════════ */}
      <section
        aria-labelledby="more-portraits-heading"
        className="my-20 sm:my-28 px-6 sm:px-10 lg:px-16 border-t border-[#D8D6D0] pt-16"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
            <div>
              <span className="text-[10px] uppercase tracking-[0.28em] font-sans font-semibold text-[#C4687F] block mb-1">
                Portraits of Excellence &amp; Heritage
              </span>
              <h3
                id="more-portraits-heading"
                className="text-2xl sm:text-3xl font-serif text-[#1C1C1E] tracking-tight"
              >
                More Profiles in the Series
              </h3>
            </div>
            <Link
              href="/society/portraits-of-heritage"
              className="text-xs uppercase tracking-[0.2em] font-sans font-medium text-[#1C1C1E] hover:text-[#C4687F] transition-colors"
            >
              Explore Portraits Hub →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Aaliya Sultana Babi */}
            <Link
              href="/society/aaliya-sultana-babi-dinosaur-princess-balasinor"
              className="group block border border-[#D8D6D0] bg-white p-6 sm:p-7 shadow-xs hover:border-[#C4687F] hover:shadow-md transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden mb-5 bg-[#22344A]">
                <Image
                  src="/images/aaliya-sultana-babi/01-hero-aaliya-sultana-babi-portrait-1024w.webp"
                  alt="Aaliya Sultana Babi, The Dinosaur Princess of Balasinor"
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  style={{ objectPosition: "50% 25%" }}
                />
                <span className="absolute top-3 left-3 text-[9px] uppercase tracking-widest px-2.5 py-0.5 bg-[#D4673A] text-white font-sans font-semibold">
                  Published Profile
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-[0.22em] font-sans font-semibold text-[#8A7352] block mb-1">
                Portraits of Heritage · Vol. XII
              </span>
              <h4 className="text-xl font-serif text-[#1C1C1E] leading-snug mb-2 group-hover:text-[#C4687F] transition-colors">
                The Woman Who Walks With Giants
              </h4>
              <p className="font-serif italic text-sm text-[#6A6A70] mb-3">
                Aaliya Sultana Babi, The Dinosaur Princess of Balasinor
              </p>
              <span className="text-[10px] uppercase tracking-[0.18em] font-sans text-[#1C1C1E] group-hover:text-[#C4687F] font-medium transition-colors">
                Read Profile →
              </span>
            </Link>

            {/* Card 2: Raghavendra Rathore (Published) */}
            <Link
              href="/people/raghavendra-rathore-the-man-who-gave-the-bandhgala-a-future"
              className="group border border-[#D8D6D0] bg-[#FBF9F5] p-6 sm:p-7 flex flex-col justify-between hover:border-[#C4687F] transition-all hover:shadow-md"
            >
              <div className="relative aspect-[16/10] overflow-hidden mb-4 bg-[#141416]">
                <Image
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
                  alt="Raghavendra Rathore"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-[9px] uppercase tracking-[0.22em] font-sans font-semibold text-[#8A7352] block mb-1">
                Portraits of Excellence · Vol. XIV
              </span>
              <h4 className="text-xl font-serif text-[#1C1C1E] leading-snug mb-2 group-hover:text-[#C4687F] transition-colors">
                The Architect of the Modern Jodhpur Cut
              </h4>
              <p className="font-serif italic text-sm text-[#6A6A70] mb-3">
                Raghavendra Rathore
              </p>
              <span className="text-[10px] uppercase tracking-[0.18em] font-sans text-[#1C1C1E] group-hover:text-[#C4687F] font-medium transition-colors">
                Read Profile →
              </span>
            </Link>

            {/* Card 3: House of Mewar (Published) */}
            <Link
              href="/society/the-house-of-mewar-a-dynasty-in-the-21st-century"
              className="group border border-[#D8D6D0] bg-[#FBF9F5] p-6 sm:p-7 flex flex-col justify-between hover:border-[#C4687F] transition-all hover:shadow-md"
            >
              <div className="relative aspect-[16/10] overflow-hidden mb-4 bg-[#141416]">
                <Image
                  src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80"
                  alt="House of Mewar"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-[9px] uppercase tracking-[0.22em] font-sans font-semibold text-[#8A7352] block mb-1">
                Portraits of Heritage · Vol. XV
              </span>
              <h4 className="text-xl font-serif text-[#1C1C1E] leading-snug mb-2 group-hover:text-[#C4687F] transition-colors">
                Guardians of the Sun Dynasty
              </h4>
              <p className="font-serif italic text-sm text-[#6A6A70] mb-3">
                The House of Mewar in the 21st Century
              </p>
              <span className="text-[10px] uppercase tracking-[0.18em] font-sans text-[#1C1C1E] group-hover:text-[#C4687F] font-medium transition-colors">
                Read Profile →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          22 — NEWSLETTER DISPATCH MODULE
          ════════════════════════════════════════════════ */}
      <section
        aria-label="Newsletter Dispatch"
        className="my-16 sm:my-20 p-10 sm:p-14 text-center border-t border-b border-[#D8D6D0] bg-[#E3ECEE]/40"
      >
        <div className="max-w-xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold block mb-2 text-[#C4687F]">
            The Weekly Dispatch
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif text-[#1C1C1E] tracking-tight mb-3">
            Portraits, Palaces &amp; Living Heritage
          </h3>
          <p className="text-sm font-sans text-[#6A6A70] mb-8 leading-relaxed">
            Receive our finest long-form profiles, curatorial portfolios and archival dispatches directly to your inbox.
          </p>
          <NewsletterForm variant="light" source="shivanjali-kumari-dungarpur-profile" />
        </div>
      </section>
    </div>
  );
}
