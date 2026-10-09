import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "@/app/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Gleneagles Hotel: The Glorious Playground in the Perthshire Hills | The Royal Gallerys",
  description:
    "A century of sporting grandeur, championship golf, falconry, and two-Michelin-star dining at Gleneagles in Perthshire — Scotland's legendary luxury resort estate.",
  alternates: {
    canonical: "https://theroyalgallerys.com/travel/gleneagles-hotel",
  },
  openGraph: {
    title: "Gleneagles Hotel: The Glorious Playground — The Royal Gallerys",
    description:
      "Inside Scotland's iconic 850-acre Perthshire playground: French chateau architecture, Restaurant Andrew Fairlie, the King's Course, and countryside pursuits.",
    url: "https://theroyalgallerys.com/travel/gleneagles-hotel",
    siteName: "The Royal Gallerys",
    locale: "en_GB",
    type: "article",
    publishedTime: "2026-10-04T12:00:00Z",
    authors: ["The Royal Gallerys Travel Desk"],
    images: [
      {
        url: "https://theroyalgallerys.com/images/uk-heritage/gleneagles-hotel.webp",
        width: 2400,
        height: 1600,
        alt: "Gleneagles Hotel grand chateau facade and manicured grounds in Auchterarder, Perthshire, Scotland",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gleneagles Hotel: The Glorious Playground | The Royal Gallerys",
    description:
      "A century of sporting royalty, two-Michelin-starred dining, and 850 acres of Perthshire luxury.",
    images: ["https://theroyalgallerys.com/images/uk-heritage/gleneagles-hotel.webp"],
  },
};

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiMxYTFhMWEiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

export default function GleneaglesHotelPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Article", "Resort"],
    headline: "Gleneagles Hotel: A Century of Sporting Royalty in the Perthshire Hills",
    name: "The Gleneagles Hotel",
    description:
      "An insider's luxury guide to Gleneagles Hotel in Perthshire — 850 acres of sporting pursuits, Restaurant Andrew Fairlie, and a century of Scottish hospitality.",
    image: "https://theroyalgallerys.com/images/uk-heritage/gleneagles-hotel.webp",
    datePublished: "2026-10-04T12:00:00Z",
    dateModified: "2026-10-04T12:00:00Z",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Auchterarder",
      addressLocality: "Auchterarder",
      addressRegion: "Perthshire",
      postalCode: "PH3 1NF",
      addressCountry: "GB",
    },
    author: {
      "@type": "Organization",
      name: "The Royal Gallerys Travel Desk",
      url: "https://theroyalgallerys.com",
    },
    publisher: {
      "@type": "Organization",
      name: "The Royal Gallerys",
      url: "https://theroyalgallerys.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://theroyalgallerys.com/travel/gleneagles-hotel",
    },
  };

  return (
    <article className="min-h-screen bg-[#FBF9F5] text-[#1A1A1A] antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ════════ BREADCRUMBS & TOP NAV ════════ */}
      <div className="border-b border-[#E8E4DB] bg-[#FAF8F4]/90 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-3.5 flex items-center justify-between text-xs font-sans">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-[#8A7352]">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <span className="text-[#C8C4BA]">/</span>
              <li><Link href="/uk" className="hover:underline">UK Edition</Link></li>
              <span className="text-[#C8C4BA]">/</span>
              <li><Link href="/travel/castle-hotels-scotland" className="hover:underline">Castle Hotels &amp; Resorts</Link></li>
              <span className="text-[#C8C4BA]">/</span>
              <li className="text-[#1A1A1A] font-medium">Gleneagles</li>
            </ol>
          </nav>
          <Link
            href="/uk"
            className="hidden sm:inline-flex items-center gap-1.5 uppercase tracking-wider text-[10px] font-semibold text-[#8A7352] hover:text-[#1A1A1A] transition-colors"
          >
            ← Back to UK Hub
          </Link>
        </div>
      </div>

      {/* ════════ HEADER & PROVENANCE ════════ */}
      <header className="pt-12 sm:pt-16 pb-10 px-6 sm:px-10 max-w-4xl mx-auto text-center">
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.34em] font-sans font-semibold text-[#8A7352] block mb-4">
          The Glorious Playground · Perthshire
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#1A1A1A] leading-[1.08] mb-6">
          Gleneagles: A Century of Sporting Royalty in the Perthshire Hills
        </h1>
        <p className="text-lg sm:text-xl font-serif italic text-[#5A5A60] leading-relaxed max-w-2xl mx-auto mb-8">
          Opened in 1924 as the &ldquo;Riviera in the Highlands&rdquo; — 850 rolling acres of championship golf, gun dogs, falconry, and Scotland&apos;s sole two-Michelin-starred restaurant.
        </p>

        {/* Fact metadata bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-[#E8E4DB] text-left">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Location</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">Auchterarder, Perthshire</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Opened</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">1924 by Caledonian Railway</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Gastronomy</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">Restaurant Andrew Fairlie (2 Stars)</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Estate Extent</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">850 Private Countryside Acres</span>
          </div>
        </div>
      </header>

      {/* ════════ FULL-RESOLUTION PHOTOGRAPHIC SPREAD ════════ */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 mb-14">
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#FAF8F4] border border-[#E8E4DB] shadow-sm">
          <Image
            src="/images/uk-heritage/gleneagles-hotel.webp"
            alt="Gleneagles Hotel grand chateau facade and manicured Perthshire grounds in Auchterarder, Scotland"
            fill
            priority
            placeholder="blur"
            blurDataURL={blurDataURL}
            className="object-contain sm:object-cover"
            sizes="(min-width: 1200px) 1152px, 100vw"
          />
        </div>
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#6A6A70] font-sans px-1 gap-1">
          <span>The iconic French chateau roofline, lawns, and Ochil Hills backdrop of Gleneagles in Perthshire.</span>
          <span className="text-[10px] text-[#8A7352] font-medium tracking-wide">Archival Collection · CC BY-SA 2.0</span>
        </div>
      </section>

      {/* ════════ LONG-FORM EDITORIAL NARRATIVE ════════ */}
      <section className="max-w-3xl mx-auto px-6 sm:px-10 pb-20 font-serif leading-[1.8] text-[#2A2A2E] text-base sm:text-lg">
        <div className="space-y-8">
          <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-normal first-letter:float-left first-letter:mr-3 first-letter:text-[#8A7352] first-letter:leading-none">
            In June 1924, when the Caledonian Railway opened the doors of Gleneagles in the rolling hills of Perthshire, the British press heralded it as &ldquo;the Riviera in the Highlands&rdquo; and &ldquo;the eighth wonder of the world.&rdquo; Conceived by railway general manager Donald Matheson during a walking holiday in 1910, Gleneagles was envisioned as the world&apos;s ultimate resort playground — combining the architectural dignity of a French chateau with the untamed sporting landscape of Scotland.
          </p>

          <p>
            During the Roaring Twenties and Thirties, Gleneagles became the indispensable seasonal playground for European royalty, American millionaires, and society figures. Guests arrived aboard the bespoke &ldquo;Gleneagles Express&rdquo; private sleeping car service from London Euston, stepping directly onto the hotel&apos;s own railway platform dressed in plus fours and tweed jackets for days of golf, shooting, dancing to Henry Hall&apos;s BBC dance orchestra, and evening banquets in the Strathearn salon.
          </p>

          {/* Editorial Pull Quote */}
          <blockquote className="my-10 pl-6 sm:pl-8 border-l-2 border-[#8A7352] font-serif italic text-xl sm:text-2xl text-[#1A1A1A] leading-relaxed">
            &ldquo;Gleneagles is where Scotland&apos;s countryside pursuits meet the Golden Age of travel — a grand estate where time slows down to the cadence of the glen.&rdquo;
          </blockquote>

          <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] pt-4 leading-tight">
            Championship Golf and the Ryder Cup Legacy
          </h2>

          <p>
            Long before the hotel itself opened, legend golf course architect James Braid sculpted the King&apos;s Course (1919) and the Queen&apos;s Course (1919) across the natural glacial moorland. Braid used the moorland ridges and heather-fringed hollows to create two of the most celebrated inland links tests on earth.
          </p>

          <p>
            Gleneagles has hosted the inaugural 1921 international match that inspired the Ryder Cup, the Curtis Cup, the 2014 Ryder Cup on the PGA Centenary Course, and the 2019 Solheim Cup — making it the only venue in Europe to have hosted both premier biennial transatlantic team trophies.
          </p>

          <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] pt-4 leading-tight">
            Restaurant Andrew Fairlie &amp; Country Pursuits
          </h2>

          <p>
            Gastronomy at Gleneagles is anchored by Restaurant Andrew Fairlie, Scotland&apos;s only restaurant to hold two Michelin stars continuously for nearly two decades. Renowned for its signature home-smoked Scottish lobster — slow-smoked for five hours over Scotch whisky barrel oak shavings — the restaurant delivers classic French culinary mastery elevated by the richest Scottish estate produce.
          </p>

          <p>
            Beyond golf and gastronomy, Gleneagles is an epicenter of authentic country life: the British School of Falconry, the Gundog School where guests train Labrador retrievers across water courses, off-road driving in vintage Land Rovers, archery, equestrianism, and clay shooting across its private 850-acre grounds.
          </p>
        </div>

        {/* ════════ CONNOISSEUR NOTES ════════ */}
        <div className="mt-14 p-8 bg-[#FAF8F4] border border-[#E8E4DB]">
          <span className="text-[10px] uppercase tracking-[0.24em] font-sans font-semibold text-[#8A7352] block mb-2">
            The Connoisseur&apos;s Field Guide
          </span>
          <h3 className="text-xl font-serif text-[#1A1A1A] mb-4">
            Reserving &amp; Experiencing Gleneagles
          </h3>
          <ul className="space-y-3 text-sm font-sans text-[#5A5A60] leading-relaxed">
            <li>
              <strong className="text-[#1A1A1A]">Direct Sleeper Train:</strong> Take the Caledonian Sleeper train from London Euston directly to Gleneagles Station, waking up to the dawn mist rising over the Ochil Hills.
            </li>
            <li>
              <strong className="text-[#1A1A1A]">The Century Bar:</strong> Sample from over 300 single malt whiskies, including rare bottlings distilled exclusively for the estate.
            </li>
            <li>
              <strong className="text-[#1A1A1A]">The Strathearn:</strong> Don a dinner jacket for classical tableside silver service (beef Wellington carved tableside, crêpes Suzette flambéed before you).
            </li>
          </ul>
        </div>

        {/* ════════ CROSS NAVIGATION ════════ */}
        <div className="mt-14 pt-8 border-t border-[#E8E4DB] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/travel/inveraray-castle"
            className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#8A7352] hover:text-[#1A1A1A] transition-colors"
          >
            ← Previous: Inveraray Castle
          </Link>
          <Link
            href="/travel/castle-hotels-scotland"
            className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#1A1A1A] hover:text-[#8A7352] transition-colors"
          >
            All Scottish Castle Hotels →
          </Link>
        </div>
      </section>

      {/* ════════ NEWSLETTER ════════ */}
      <section className="py-16 px-6 bg-[#FAF8F4] border-t border-[#E8E4DB] text-center">
        <div className="max-w-xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.26em] font-sans font-semibold text-[#8A7352] block mb-2">
            The Royal Gallerys · Dispatches
          </span>
          <h3 className="text-2xl font-serif text-[#1A1A1A] mb-3">
            Receive Private Architectural &amp; Heritage Folios
          </h3>
          <NewsletterForm />
        </div>
      </section>
    </article>
  );
}
