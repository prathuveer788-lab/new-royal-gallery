import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import DeepTimeTimeline from "./components/DeepTimeTimeline";
import FeatureChapterRail from "./components/FeatureChapterRail";
import ShareBar from "./components/ShareBar";
import AtAGlancePanel from "./components/AtAGlancePanel";
import FAQSection from "./components/FAQSection";
import { FAQS } from "./data";
import InstagramWorldStrip from "./components/InstagramWorldStrip";
import NewsletterForm from "@/app/components/NewsletterForm";

export const metadata: Metadata = {
  title:
    "The Woman Who Walks With Giants: Aaliya Sultana Babi, the Dinosaur Princess of Balasinor | The Royal Gallerys",
  description:
    "How Aaliya Sultana Babi turned forgotten \"cannonballs\" into India's dinosaur heritage at Raiyoli, Balasinor. A Portraits of Heritage profile.",
  authors: [{ name: "Krishanpriya Rajawat" }],
  publisher: "The Royal Gallerys",
  alternates: {
    canonical:
      "https://theroyalgallerys.com/society/aaliya-sultana-babi-dinosaur-princess-balasinor",
  },
  openGraph: {
    type: "article",
    locale: "en_US",
    url: "https://theroyalgallerys.com/society/aaliya-sultana-babi-dinosaur-princess-balasinor",
    siteName: "The Royal Gallerys",
    title:
      "The Woman Who Walks With Giants: Aaliya Sultana Babi, the Dinosaur Princess of Balasinor",
    description:
      "How Aaliya Sultana Babi turned forgotten \"cannonballs\" into India's dinosaur heritage at Raiyoli, Balasinor. A Portraits of Heritage profile.",
    publishedTime: "2026-08-15T00:00:00.000Z",
    section: "Society",
    tags: [
      "Profile",
      "Portraits of Heritage",
      "Gujarat",
      "Balasinor",
      "Museums",
      "Palaeontology",
      "Royal Women",
    ],
    images: [
      {
        url: "https://theroyalgallerys.com/images/aaliya-sultana-babi/og-aaliya-sultana-babi.jpg",
        width: 1200,
        height: 630,
        alt: "The Woman Who Walks With Giants — Aaliya Sultana Babi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@theroyalgallerys",
    creator: "@theroyalgallerys",
    title:
      "The Woman Who Walks With Giants: Aaliya Sultana Babi, the Dinosaur Princess of Balasinor",
    description:
      "How Aaliya Sultana Babi turned forgotten \"cannonballs\" into India's dinosaur heritage at Raiyoli, Balasinor. A Portraits of Heritage profile.",
    images: [
      "https://theroyalgallerys.com/images/aaliya-sultana-babi/og-aaliya-sultana-babi.jpg",
    ],
  },
};

const ARTICLE_URL =
  "https://theroyalgallerys.com/society/aaliya-sultana-babi-dinosaur-princess-balasinor";

export default function AaliyaSultanaBabiProfilePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${ARTICLE_URL}#article`,
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://theroyalgallerys.com/#website",
          name: "The Royal Gallerys",
          url: "https://theroyalgallerys.com",
        },
        headline:
          "The Woman Who Walks With Giants: Aaliya Sultana Babi, the Dinosaur Princess of Balasinor",
        description:
          "How Aaliya Sultana Babi turned forgotten \"cannonballs\" into India's dinosaur heritage at Raiyoli, Balasinor. A Portraits of Heritage profile.",
        image:
          "https://theroyalgallerys.com/images/aaliya-sultana-babi/og-aaliya-sultana-babi.jpg",
        datePublished: "2026-08-15T00:00:00.000Z",
        dateModified: "2026-08-15T00:00:00.000Z",
        author: {
          "@type": "Person",
          name: "Krishanpriya Rajawat",
          jobTitle: "Contributing Editor, Portraits of Heritage",
        },
        publisher: {
          "@type": "Organization",
          name: "The Royal Gallerys",
          url: "https://theroyalgallerys.com",
          logo: {
            "@type": "ImageObject",
            url: "https://theroyalgallerys.com/icon.png",
          },
        },
        articleSection: "Society",
        keywords: [
          "Aaliya Sultana Babi",
          "Dinosaur Princess",
          "Balasinor",
          "Raiyoli",
          "Gujarat",
          "Rajasaurus Narmadensis",
          "Dr. Ashok Sahni",
          "Paleontology India",
        ],
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": ARTICLE_URL,
        },
      },
      {
        "@type": "Person",
        "@id": `${ARTICLE_URL}#person`,
        name: "Aaliya Sultana Babi",
        alternateName: "The Dinosaur Princess of Balasinor",
        jobTitle: "Custodian and Educator of Raiyoli Dinosaur Heritage",
        nationality: "Indian",
        affiliation: {
          "@type": "Organization",
          name: "Balasinor Royal Family",
        },
        homeLocation: {
          "@type": "Place",
          name: "Balasinor, Gujarat, India",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${ARTICLE_URL}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "The Royal Gallerys",
            item: "https://theroyalgallerys.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Society",
            item: "https://theroyalgallerys.com/society",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Portraits of Heritage",
            item: "https://theroyalgallerys.com/society/portraits-of-heritage",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "The Woman Who Walks With Giants",
            item: ARTICLE_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${ARTICLE_URL}#faq`,
        mainEntity: FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="feature--aaliya relative w-full overflow-x-hidden">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── 1. EMBER-TO-NAVY GRADIENT HEADER STRIP (Print Page XXXIV) ── */}
      <div
        className="w-full h-[3px] fixed top-0 left-0 z-[120]"
        style={{
          background: "linear-gradient(90deg, #D4673A 0%, #22344A 100%)",
        }}
      />

      {/* ── 2. CINEMATIC FULL-BLEED EDITORIAL HERO ── */}
      <section
        aria-label="Article Hero: The Woman Who Walks With Giants"
        className="relative w-full overflow-hidden"
        style={{ height: "100svh", minHeight: "600px" }}
      >
        {/* Full-bleed Portrait */}
        <picture className="absolute inset-0 w-full h-full">
          <source
            type="image/avif"
            srcSet="/images/aaliya-sultana-babi/01-hero-aaliya-sultana-babi-portrait.avif"
          />
          <source
            type="image/webp"
            srcSet="/images/aaliya-sultana-babi/01-hero-aaliya-sultana-babi-portrait-640w.webp 640w, /images/aaliya-sultana-babi/01-hero-aaliya-sultana-babi-portrait-1024w.webp 1024w, /images/aaliya-sultana-babi/01-hero-aaliya-sultana-babi-portrait.webp 1600w"
            sizes="100vw"
          />
          <img
            src="/images/aaliya-sultana-babi/01-hero-aaliya-sultana-babi-portrait.jpg"
            alt="Aaliya Sultana Babi, The Dinosaur Princess of Balasinor, seated in a gilded chair in Gujarat"
            width={2911}
            height={4359}
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover"
            style={{ objectPosition: "50% 18%" }}
          />
        </picture>

        {/* Top fade — navbar legibility */}
        <div
          className="absolute inset-x-0 top-0 h-40 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(20,18,14,0.55) 0%, transparent 100%)",
          }}
        />

        {/* Bottom gradient — deep navy rising from footer */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: "68%",
            background:
              "linear-gradient(to top, rgba(22,32,46,0.98) 0%, rgba(22,32,46,0.88) 28%, rgba(22,32,46,0.55) 58%, transparent 100%)",
          }}
        />

        {/* ── TITLE BLOCK ── */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-6 sm:px-10 md:px-14 lg:px-20 pb-10 sm:pb-14 lg:pb-16">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] uppercase tracking-[0.22em] font-sans">
              <li>
                <Link href="/" className="text-white/50 hover:text-white/90 transition-colors">
                  The Royal Gallerys
                </Link>
              </li>
              <li className="text-white/25">/</li>
              <li>
                <Link href="/society" className="text-white/50 hover:text-white/90 transition-colors">
                  Society
                </Link>
              </li>
              <li className="text-white/25">/</li>
              <li>
                <Link href="/society/portraits-of-heritage" className="text-[#D4673A] hover:underline transition-colors">
                  Portraits of Heritage
                </Link>
              </li>
            </ol>
          </nav>

          {/* Rubric */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 sm:w-10" style={{ backgroundColor: "#D4673A" }} />
            <span
              className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-sans font-semibold"
              style={{ color: "#D4673A" }}
            >
              Portraits of Heritage · Heritage Edition 2026
            </span>
          </div>

          {/* H1 */}
          <h1
            className="font-playfair text-[clamp(2.4rem,6vw,6.5rem)] leading-[0.93] text-white tracking-tight mb-3"
            style={{ fontWeight: 700, textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}
          >
            The Woman Who<br className="hidden sm:block" /> Walks With{" "}
            <em style={{ color: "#D4673A", fontStyle: "italic" }}>Giants.</em>
          </h1>

          {/* Name + Subtitle */}
          <div className="mt-2 mb-6 sm:mb-8">
            <h2
              className="font-playfair italic text-[clamp(1.25rem,2.8vw,2.4rem)] text-white/90 leading-snug"
              style={{ fontWeight: 400 }}
            >
              Aaliya Sultana Babi
            </h2>
            <p
              className="font-cormorant italic text-[clamp(1rem,2vw,1.45rem)] mt-0.5 leading-snug"
              style={{ color: "rgba(239,227,210,0.75)", fontWeight: 400 }}
            >
              The Dinosaur Princess of Balasinor
            </p>
          </div>

          {/* Credits */}
          <div className="pt-4 border-t" style={{ borderColor: "rgba(243,231,211,0.18)" }}>
            <p
              className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-sans leading-relaxed"
              style={{ color: "#B8A47A" }}
            >
              Words by Krishanpriya Rajawat&nbsp;·&nbsp;Raiyoli, Gujarat, India
            </p>
            <p
              className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] font-sans mt-1"
              style={{ color: "rgba(239,227,210,0.4)" }}
            >
              Vol. XII, pp. XXXIII–XXXIV · Balasinor, Gujarat · 65 Million Years
            </p>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="absolute bottom-6 right-6 sm:right-10 z-10 flex flex-col items-end gap-1.5 opacity-50"
          aria-hidden="true"
        >
          <span className="text-[8px] uppercase tracking-[0.22em] font-sans text-white">Scroll</span>
          <div
            className="w-px h-10 sm:h-14 mx-auto"
            style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.7), transparent)" }}
          />
        </div>
      </section>

      {/* ── 3. ARTICLE CONTENT CONTAINER ── */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 py-12 sm:py-16">
        {/* Meta Bar with Share Buttons */}
        <ShareBar
          url={ARTICLE_URL}
          title="The Woman Who Walks With Giants: Aaliya Sultana Babi, the Dinosaur Princess of Balasinor"
          publishDate="August 2026"
        />

        {/* Tags strip */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {[
            "Profile",
            "Portraits of Heritage",
            "Gujarat",
            "Balasinor",
            "Museums",
            "Palaeontology",
            "Royal Women",
          ].map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-[0.18em] font-sans px-3 py-1 border border-[#D9CFC2] text-[#6B6F76] bg-[#FBF9F5]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* ── 4. STANDFIRST ── */}
        <div className="max-w-[820px] mx-auto text-center my-10 sm:my-16 px-4">
          <p
            className="font-playfair italic text-2xl sm:text-3xl md:text-4xl text-[#1B1D21] leading-[1.3] tracking-tight"
            style={{ fontWeight: 400 }}
          >
            In the mineral-rich hills of Balasinor, time does not flow in a straight line. The present is layered over a past 65 million years deep — and no one navigates this strange collision of eras with more grace, fire and determination than Aaliya Sultana Babi.
          </p>
          <div
            className="w-16 h-[2px] mx-auto mt-8 sm:mt-10"
            style={{ backgroundColor: "#D4673A" }}
          />
        </div>

        {/* ── 5. MAIN EDITORIAL BODY WITH STICKY CHAPTER RAIL ── */}
        <div className="flex items-start justify-between gap-12 lg:gap-16 relative">
          {/* Desktop Sticky Chapter Rail (≥1280px) */}
          <FeatureChapterRail />

          {/* Reading Column (max-w-[720px], ~68 characters per line) */}
          <div className="w-full max-w-[720px] mx-auto flex-1 font-eb-garamond text-xl sm:text-[21px] text-[#1B1D21] leading-[1.7]">
            {/* ════════ CHAPTER I ════════ */}
            <section id="chapter-1" className="scroll-mt-28 mb-16 sm:mb-20">
              <div className="mb-6">
                <span
                  className="text-[11px] uppercase tracking-[0.3em] font-sans font-semibold block mb-1"
                  style={{ color: "#D4673A" }}
                >
                  Chapter I
                </span>
                <h2
                  className="font-playfair text-3xl sm:text-4xl text-[#1B1D21] tracking-tight pb-3 border-b-2"
                  style={{ borderBottomColor: "#D4673A", fontWeight: 700 }}
                >
                  The Dinosaur Princess
                </h2>
              </div>

              <p className="drop-cap mb-6">
                In the sunny, mineral-rich Balasinor region, time doesn&apos;t flow in a straight line. The present is layered over a past that goes back 65 million years. Few people represent this strange collision of time like Aaliya Sultana Babi. To a casual observer, she appears as a lively, modern figure, a storyteller who brings ancient history to life. Yet, to the paleontology community and locals, she is the &ldquo;Dinosaur Princess,&rdquo; a strong protector of a prehistoric empire. In her hands, history is not a dusty idea from textbooks; it is real, heavy, and inspiring. Her story is one of chance — a noble lineage intersecting with the demands of science and a determination that turned forgotten garden ornaments into a national treasure.
              </p>
            </section>

            {/* ════════ CHAPTER II ════════ */}
            <section id="chapter-2" className="scroll-mt-28 mb-16 sm:mb-20">
              <div className="mb-6">
                <span
                  className="text-[11px] uppercase tracking-[0.3em] font-sans font-semibold block mb-1"
                  style={{ color: "#D4673A" }}
                >
                  Chapter II
                </span>
                <h2
                  className="font-playfair text-3xl sm:text-4xl text-[#1B1D21] tracking-tight pb-3 border-b-2"
                  style={{ borderBottomColor: "#D4673A", fontWeight: 700 }}
                >
                  The Accidental Discovery
                </h2>
              </div>

              <p className="mb-6">
                This unlikely journey began with a misunderstanding — a delightful geological error that would ultimately change India&apos;s paleontological significance. In the 1980s, the area around the village of Raiyoli was known for its mineral wealth, including limestone, quartz, and mica. The locals, including the late Nawansab of Balasinor, Aaliya&apos;s father, often found strange, round objects in the cement quarries.
              </p>
              <p className="mb-6">
                These limestone balls seemed ordinary, so villagers would give them to the Nawansab, thinking they were cannonballs from his family&apos;s historical artillery.
              </p>
              <p className="mb-6">
                The Nawansab, who gracefully navigated the shift from feudalism to modern democracy, had no need for these heavy artifacts cluttering his space; he kindly returned them to the villagers. In return, they used them as decorative edges for garden paths, as weights for papers, or simple weights for scales. This scene is almost surreal — dinosaur eggs, preserved for millions of years, used to hold down papers or outline a flowerbed, completely unaware of their incredible value.
              </p>

              {/* ── PULL QUOTE CARD (on --sand with ember left bar) ── */}
              <blockquote
                className="my-10 p-8 sm:p-10 border-l-4 relative"
                style={{
                  backgroundColor: "#EFE3D2",
                  borderLeftColor: "#D4673A",
                }}
              >
                <p
                  className="font-playfair italic text-2xl sm:text-3xl text-[#1B1D21] leading-snug mb-4"
                  style={{ fontWeight: 400 }}
                >
                  &ldquo;These were not remnants of a local battle but the eggs of ancient giants.&rdquo;
                </p>
                <footer className="text-xs uppercase tracking-[0.2em] font-sans text-[#6B6F76] font-medium">
                  <cite className="not-italic text-[#1B1D21] font-semibold">
                    Dr. Ashok Sahni
                  </cite>{" "}
                  · The Dino Man of India
                </footer>
              </blockquote>
            </section>
          </div>
        </div>

        {/* ── 6. SIGNATURE "DEEP TIME" TIMELINE COMPONENT ── */}
        <DeepTimeTimeline />

        {/* ── RESUME EDITORIAL BODY ── */}
        <div className="flex items-start justify-between gap-12 lg:gap-16 relative">
          {/* Spacer to keep body aligned with chapter rail */}
          <div className="hidden xl:block w-64 flex-shrink-0" />

          <div className="w-full max-w-[720px] mx-auto flex-1 font-eb-garamond text-xl sm:text-[21px] text-[#1B1D21] leading-[1.7]">
            {/* ════════ CHAPTER III ════════ */}
            <section id="chapter-3" className="scroll-mt-28 mb-16 sm:mb-20">
              <div className="mb-6">
                <span
                  className="text-[11px] uppercase tracking-[0.3em] font-sans font-semibold block mb-1"
                  style={{ color: "#D4673A" }}
                >
                  Chapter III
                </span>
                <h2
                  className="font-playfair text-3xl sm:text-4xl text-[#1B1D21] tracking-tight pb-3 border-b-2"
                  style={{ borderBottomColor: "#D4673A", fontWeight: 700 }}
                >
                  The Rajasaurus Rises
                </h2>
              </div>

              <p className="mb-6">
                The breakthrough came with the Geological Survey of India. While searching for mineral deposits, their team found the &ldquo;cannonballs&rdquo; in a quarry manager&apos;s office. They were initially amused, then fascinated, and finally struck by a profound realisation. The finds were sent to Dr. Ashok Sahni — the &ldquo;Dino Man of India&rdquo; — who confirmed the remarkable truth. These were dinosaur eggs from the Cretaceous period, between 65 and 67 million years old, transformed into rock by minerals over millennia. To an untrained eye, it&apos;s nearly impossible to tell a fossil from a stone, yet the eggs hold distinct microscopic pores that once provided oxygen to the fetus inside.
              </p>
              <p className="mb-6">
                This discovery led to the excavation of about 400 bones, revealing two types of dinosaurs: one herbivore and one carnivore. The carnivore, a 30-foot stocky creature named <em>Rajasaurus Narmadensis</em>, became the highlight of the find. Aaliya often jokes, with a playful glint in her eye, that while the Rajasaurus is technically not a T-Rex — the T-Rex was found only in Europe and North America — it was, in her words, &ldquo;more ferocious than even the T-Rex.&rdquo; This discovery was a collaborative success, connecting Indian paleontologists with international researchers and putting Balasinor on the global paleontology map.
              </p>
            </section>
          </div>
        </div>

        {/* ── 7. STATEMENT QUOTE BAND (Full Bleed --navy with ember left bar) ── */}
        <section
          aria-label="Statement Quote: Aaliya Sultana Babi"
          className="my-16 sm:my-24 py-16 sm:py-20 px-8 sm:px-14 md:px-20 border-l-4 sm:border-l-8 shadow-md"
          style={{
            backgroundColor: "#22344A",
            borderLeftColor: "#D4673A",
          }}
        >
          <div className="max-w-4xl mx-auto">
            <span
              className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-sans font-semibold block mb-6"
              style={{ color: "#D4673A" }}
            >
              The Custodian&apos;s Credo
            </span>
            <blockquote className="space-y-6">
              <p
                className="font-playfair italic text-2xl sm:text-3xl md:text-4xl text-[#F3E7D3] leading-[1.3] tracking-tight"
                style={{ fontWeight: 400 }}
              >
                &ldquo;The dinosaurs made me famous — and I made the dinosaurs famous. It is a mutually beneficial relationship, a legacy built on an accidental discovery and the determination of a woman who refused to let the past fade away.&rdquo;
              </p>
              <footer className="pt-4 border-t border-[rgba(243,231,211,0.2)]">
                <cite className="not-italic text-sm sm:text-base font-sans uppercase tracking-[0.24em] font-medium text-[#F3E7D3] block">
                  Aaliya Sultana Babi
                </cite>
                <span className="text-xs uppercase tracking-[0.2em] font-sans text-[#B8A47A] mt-1 block">
                  The Dinosaur Princess of Balasinor
                </span>
              </footer>
            </blockquote>
          </div>
        </section>



        {/* ── 9. CHAPTERS IV, V, VI + FACT PANEL ── */}
        <div className="flex items-start justify-between gap-12 lg:gap-16 relative">
          <div className="hidden xl:block w-64 flex-shrink-0" />

          <div className="w-full max-w-[720px] mx-auto flex-1 font-eb-garamond text-xl sm:text-[21px] text-[#1B1D21] leading-[1.7]">
            {/* ════════ CHAPTER IV ════════ */}
            <section id="chapter-4" className="scroll-mt-28 mb-16 sm:mb-20">
              <div className="mb-6">
                <span
                  className="text-[11px] uppercase tracking-[0.3em] font-sans font-semibold block mb-1"
                  style={{ color: "#D4673A" }}
                >
                  Chapter IV
                </span>
                <h2
                  className="font-playfair text-3xl sm:text-4xl text-[#1B1D21] tracking-tight pb-3 border-b-2"
                  style={{ borderBottomColor: "#D4673A", fontWeight: 700 }}
                >
                  The Museum — A Battle Won
                </h2>
              </div>

              <p className="mb-6">
                However, turning a quarry of &ldquo;cannonballs&rdquo; into a world-class museum was not an easy task. It took a champion, and Aaliya became more than just a caretaker; she became a warrior for the cause. When the idea of a museum was first suggested, the state government was sceptical. Their concerns centred on logistics: the site was rural and underdeveloped, just 15 minutes from Balasinor, with inadequate infrastructure and few roads. Bureaucrats questioned the feasibility of constructing a high-tech facility where few tourists would visit, deeming the project &ldquo;futile.&rdquo;
              </p>
              <p className="mb-6">
                But the Dinosaur Princess believed that the museum&apos;s strength lay in its location — exactly where history was buried — and she refused to accept their dismissal. She fought fiercely against the powers that be, insisting that relocating the fossils to a city centre would remove their context and scientific importance. Her persistence tested her patience over years where the museum stood empty, finally leading to its opening in 2019, transforming a forgotten excavation site into a source of national pride.
              </p>

              {/* ── AT A GLANCE PANEL (Museum-label card style) ── */}
              <AtAGlancePanel />
            </section>

            {/* ════════ CHAPTER V ════════ */}
            <section id="chapter-5" className="scroll-mt-28 mb-16 sm:mb-20">
              <div className="mb-6">
                <span
                  className="text-[11px] uppercase tracking-[0.3em] font-sans font-semibold block mb-1"
                  style={{ color: "#D4673A" }}
                >
                  Chapter V
                </span>
                <h2
                  className="font-playfair text-3xl sm:text-4xl text-[#1B1D21] tracking-tight pb-3 border-b-2"
                  style={{ borderBottomColor: "#D4673A", fontWeight: 700 }}
                >
                  The Educator
                </h2>
              </div>

              <p className="mb-6">
                Since the museum&apos;s opening, Aaliya has shifted from being a fighter to an educator. She understands that having a museum isn&apos;t enough; history must come to life. She offers special, personalised tours and travels across India to lecture at universities and international museums. She carries a personal collection of fossils and allows her audience to do what many museum-goers can only dream of: hold a piece of prehistoric history in their hands.
              </p>
              <p className="mb-6">
                Holding a dinosaur egg or a fossilised bone is a life-changing experience, and Aaliya knows this well. For a student or a visitor at the museum, the distance of millions of years is suddenly narrowed by the weight of a stone in their palm. This is the core of her mission: ensuring that the earth&apos;s wonders are not confined to the dry pages of textbooks but are felt and appreciated as vital parts of our shared heritage.
              </p>
            </section>
          </div>
        </div>

        {/* ── 10. "IN HER WORLD" INSTAGRAM & FIELD STRIP ── */}
        <InstagramWorldStrip />

        {/* ── 11. CHAPTER VI & EMOTIONAL CLOSE ── */}
        <div className="flex items-start justify-between gap-12 lg:gap-16 relative">
          <div className="hidden xl:block w-64 flex-shrink-0" />

          <div className="w-full max-w-[720px] mx-auto flex-1 font-eb-garamond text-xl sm:text-[21px] text-[#1B1D21] leading-[1.7]">
            {/* ════════ CHAPTER VI ════════ */}
            <section id="chapter-6" className="scroll-mt-28 mb-16 sm:mb-20">
              <div className="mb-6">
                <span
                  className="text-[11px] uppercase tracking-[0.3em] font-sans font-semibold block mb-1"
                  style={{ color: "#D4673A" }}
                >
                  Chapter VI
                </span>
                <h2
                  className="font-playfair text-3xl sm:text-4xl text-[#1B1D21] tracking-tight pb-3 border-b-2"
                  style={{ borderBottomColor: "#D4673A", fontWeight: 700 }}
                >
                  The Legacy of Giants
                </h2>
              </div>

              <p className="mb-6">
                For Aaliya, the dinosaurs are more than just her work; they are her companions. She talks about them with a warm, almost maternal affection. She examines the textures of the fossils — the fibrous or grainy patterns — with the eye of both an artist and a scientist. She understands that fame is a tool for achieving her goals. She has turned the &ldquo;cannonballs&rdquo; of the past into the cultural treasure of the future.
              </p>
              <p className="mb-6">
                When asked about her impact, she looks beyond the awards and accolades. She focuses on the visitors, students, and tourists who come to Raiyoli — not because they have to, but because they have caught a glimpse of the wonder she experiences daily. They arrive as everyday people, just seeing rocks, and leave with a connection to deep, ancient time. This is the legacy of the Dinosaur Princess of Balasinor — a story that started in a garden path and changed how a nation understands its own land.
              </p>
              <p className="mb-6">
                The sun sets over the hills of Balasinor, casting long shadows across a landscape that once echoed with the thundering footsteps of giants. Every time she holds a fossil in her hand, the gap between the ancient world and the modern one vanishes. In this silence, the fossils rest — no longer ornaments of the past, but the living, enduring heartbeat of the region.
              </p>
            </section>
          </div>
        </div>

        {/* ── 12. CLOSING STATEMENT BAND ── */}
        <section
          aria-label="Closing Reflection: Sunset over Balasinor"
          className="my-14 sm:my-20 p-10 sm:p-14 md:p-16 text-center text-[#F3E7D3] border-t-2"
          style={{
            backgroundColor: "#22344A",
            borderTopColor: "#D4673A",
          }}
        >
          <div className="max-w-2xl mx-auto space-y-4">
            <span
              className="text-[10px] uppercase tracking-[0.32em] font-sans font-semibold block"
              style={{ color: "#D4673A" }}
            >
              Balasinor Sunset · Coda
            </span>
            <p className="font-playfair italic text-2xl sm:text-3xl text-[#F3E7D3] leading-snug">
              &ldquo;No longer ornaments of the past, but the living, enduring heartbeat of the region.&rdquo;
            </p>
            <div className="pt-4 flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-[#D4673A]" />
              <span className="text-[11px] uppercase tracking-[0.24em] font-sans text-[#B8A47A]">
                Raiyoli · Gujarat · 65 Million Years
              </span>
              <span className="w-8 h-px bg-[#D4673A]" />
            </div>
          </div>
        </section>

        {/* ── 13. EDITORIAL CREDITS BLOCK ── */}
        <div className="max-w-3xl mx-auto my-12 p-8 border border-[#D9CFC2] bg-[#EFE3D2]/40 text-xs font-sans text-[#6B6F76] leading-relaxed">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D9CFC2] pb-4 mb-4">
            <span className="font-semibold uppercase tracking-[0.2em] text-[#1B1D21]">
              Colophon &amp; Publication Credits
            </span>
            <span className="text-[11px] uppercase tracking-[0.16em] text-[#D4673A]">
              Series: Portraits of Heritage
            </span>
          </div>
          <p className="text-sm font-serif text-[#1B1D21] mb-2">
            <strong>Words:</strong> Krishanpriya Rajawat · <strong>Photography:</strong> [Photographer credit TBC]
          </p>
          <p className="text-[11px] text-[#6B6F76]">
            First published in <em>The Royal Gallerys</em> print edition, Heritage Edition 2026, Vol. XII, pp. XXXIII–XXXIV.
            Digital flagship edition optimized for high-fidelity archival reading.
          </p>
        </div>

        {/* ── 14. FREQUENTLY ASKED QUESTIONS ── */}
        <div className="max-w-3xl mx-auto">
          <FAQSection />
        </div>

        {/* ── 15. MORE PORTRAITS OF HERITAGE (Series Cross-Links) ── */}
        <section
          aria-labelledby="more-portraits-heading"
          className="my-16 sm:my-24 border-t border-[#D9CFC2] pt-14"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
            <div>
              <span
                className="text-[10px] uppercase tracking-[0.28em] font-sans font-semibold block mb-1"
                style={{ color: "#D4673A" }}
              >
                The Archive Series
              </span>
              <h3
                id="more-portraits-heading"
                className="text-2xl sm:text-3xl font-serif text-[#1B1D21] tracking-tight"
                style={{ fontWeight: 400 }}
              >
                More Portraits of Heritage
              </h3>
            </div>
            <Link
              href="/society/portraits-of-heritage"
              className="text-xs uppercase tracking-[0.2em] font-sans font-medium hover:underline text-[#D4673A]"
            >
              Explore Full Series Hub →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Series Hub Lead */}
            <Link
              href="/society/portraits-of-heritage"
              className="group p-6 border border-[#D9CFC2] bg-[#22344A] text-[#F3E7D3] flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1"
            >
              <div>
                <span
                  className="text-[9px] uppercase tracking-[0.24em] font-sans font-semibold block mb-2"
                  style={{ color: "#D4673A" }}
                >
                  Series Archive
                </span>
                <h4 className="text-xl font-serif leading-snug mb-3">
                  Portraits of Heritage: The Custodians
                </h4>
                <p className="text-xs font-sans text-[#EFE3D2]/80 leading-relaxed font-light">
                  The custodians, artists and visionaries carrying India&apos;s legacies into the present.
                </p>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-medium text-[#B8A47A] mt-6 block">
                View Series Overview →
              </span>
            </Link>

            {/* Card 2: Published Profile 2 (Shivanjali Kumari Dungarpur) */}
            <Link
              href="/society/shivanjali-kumari-dungarpur-wild-lens-of-royalty"
              className="group p-6 border border-[#D9CFC2] bg-[#FBF9F5] flex flex-col justify-between hover:border-[#C4687F] hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden mb-4 bg-[#141416]">
                  <Image
                    src="/images/society/shivanjali-kumari-dungarpur/01-hero.jpg"
                    alt="Shivanjali Kumari Dungarpur, Wildlife Photographer"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] uppercase tracking-[0.24em] font-sans font-semibold text-[#C4687F]">
                    Portraits of Excellence
                  </span>
                  <span className="text-[8px] uppercase tracking-[0.2em] font-sans px-2 py-0.5 bg-[#C4687F] text-white">
                    Published
                  </span>
                </div>
                <h4 className="text-xl font-serif text-[#1B1D21] leading-snug mb-2 group-hover:text-[#C4687F] transition-colors">
                  Through the Wild Lens of Royalty
                </h4>
                <p className="font-serif italic text-sm text-[#6B6F76] mb-2">
                  Shivanjali Kumari Dungarpur
                </p>
                <p className="text-xs font-sans text-[#6B6F76] leading-relaxed">
                  Conservation, wildlife photography and royal patronage in southern Rajasthan.
                </p>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-sans text-[#C4687F] font-medium mt-6 block">
                Read Profile →
              </span>
            </Link>

            {/* Card 3: Forthcoming Profile 2 */}
            <div className="p-6 border border-[#D9CFC2] bg-[#FBF9F5] flex flex-col justify-between opacity-90">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] uppercase tracking-[0.24em] font-sans font-semibold text-[#6B6F76]">
                    Forthcoming Profile
                  </span>
                  <span className="text-[8px] uppercase tracking-[0.2em] font-sans px-2 py-0.5 bg-[#EFE3D2] text-[#6B6F76]">
                    In Production
                  </span>
                </div>
                <h4 className="text-xl font-serif text-[#1B1D21] leading-snug mb-3">
                  Raghavendra Rathore
                </h4>
                <p className="font-serif italic text-sm text-[#6B6F76] mb-2">
                  The Architect of the Modern Jodhpur Cut
                </p>
                <p className="text-xs font-sans text-[#6B6F76] leading-relaxed">
                  Bridging royal tailoring heritage and international luxury design for modern couture.
                </p>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-sans text-[#6B6F76] mt-6 block">
                Heritage Edition 2026
              </span>
            </div>
          </div>
        </section>

        {/* ── 16. NEWSLETTER DISPATCH MODULE ── */}
        <section
          aria-label="Newsletter Dispatch"
          className="my-16 sm:my-20 p-10 sm:p-14 text-center border border-[#D9CFC2]"
          style={{ backgroundColor: "#EFE3D2" }}
        >
          <div className="max-w-xl mx-auto">
            <span
              className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold block mb-2"
              style={{ color: "#D4673A" }}
            >
              The Weekly Dispatch
            </span>
            <h3
              className="text-2xl sm:text-3xl font-serif text-[#1B1D21] tracking-tight mb-3"
              style={{ fontWeight: 400 }}
            >
              Portraits, Palaces &amp; Living Heritage
            </h3>
            <p className="text-sm font-sans text-[#6B6F76] mb-8 leading-relaxed">
              Receive our finest long-form profiles, cultural essays and archival dispatches directly to your inbox.
            </p>
            <NewsletterForm variant="light" source="aaliya-sultana-babi-profile" />
          </div>
        </section>
      </main>
    </div>
  );
}
