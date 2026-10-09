import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "@/app/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Inverlochy Castle Hotel: Baronial Romance Beneath Ben Nevis | The Royal Gallerys",
  description:
    "An insider's luxury guide to Inverlochy Castle Hotel in Fort William — Queen Victoria's romantic Scottish sanctuary, 1863 Baronial architecture, and dining by Michel Roux Jr.",
  alternates: {
    canonical: "https://theroyalgallerys.com/travel/inverlochy-castle",
  },
  openGraph: {
    title: "Inverlochy Castle Hotel: Baronial Romance Beneath Ben Nevis — The Royal Gallerys",
    description:
      "Inside Scotland's finest luxury castle hotel: Victorian frescoes, Venetian chandeliers, Ben Nevis mountain panoramas, and haute cuisine.",
    url: "https://theroyalgallerys.com/travel/inverlochy-castle",
    siteName: "The Royal Gallerys",
    locale: "en_GB",
    type: "article",
    publishedTime: "2026-10-04T12:00:00Z",
    authors: ["The Royal Gallerys Travel Desk"],
    images: [
      {
        url: "https://theroyalgallerys.com/images/uk-heritage/inverlochy-castle.webp",
        width: 2400,
        height: 958,
        alt: "Inverlochy Castle Hotel grand entrance and Highland facade in Fort William, Scotland",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inverlochy Castle Hotel: Baronial Romance Beneath Ben Nevis | The Royal Gallerys",
    description:
      "Queen Victoria's beloved Highland castle, Seasgair by Michel Roux Jr., and baronial suites beneath Ben Nevis.",
    images: ["https://theroyalgallerys.com/images/uk-heritage/inverlochy-castle.webp"],
  },
};

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiMxYTFhMWEiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

export default function InverlochyCastlePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Article", "Hotel"],
    headline: "Inverlochy Castle Hotel: Baronial Romance Beneath Ben Nevis",
    name: "Inverlochy Castle Hotel",
    description:
      "An architectural and connoisseur's hotel guide to Inverlochy Castle Hotel in Fort William — Queen Victoria's romantic sanctuary, Seasgair dining by Michel Roux Jr., and Scottish Baronial luxury.",
    image: "https://theroyalgallerys.com/images/uk-heritage/inverlochy-castle.webp",
    datePublished: "2026-10-04T12:00:00Z",
    dateModified: "2026-10-04T12:00:00Z",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Torlundy",
      addressLocality: "Fort William",
      addressRegion: "Highlands",
      postalCode: "PH33 6SN",
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
      "@id": "https://theroyalgallerys.com/travel/inverlochy-castle",
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
              <li><Link href="/travel/castle-hotels-scotland" className="hover:underline">Castle Hotels</Link></li>
              <span className="text-[#C8C4BA]">/</span>
              <li className="text-[#1A1A1A] font-medium">Inverlochy Castle</li>
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
          Grande Dame Castle Hotel · Scottish Highlands
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#1A1A1A] leading-[1.08] mb-6">
          Inverlochy Castle: Baronial Romance Beneath the Shadow of Ben Nevis
        </h1>
        <p className="text-lg sm:text-xl font-serif italic text-[#5A5A60] leading-relaxed max-w-2xl mx-auto mb-8">
          Where Queen Victoria spent a week in 1873 sketching Highland glens — Scotland&apos;s pioneering luxury country castle, Venetian chandeliers, and culinary brilliance by Michel Roux Jr.
        </p>

        {/* Fact metadata bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-[#E8E4DB] text-left">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Location</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">Torlundy, Fort William</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Built</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">1863 by Lord Abinger</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Dining</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">Seasgair by Michel Roux Jr.</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Tariffs</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">From £580 to £2,400 / Night</span>
          </div>
        </div>
      </header>

      {/* ════════ FULL-RESOLUTION PHOTOGRAPHIC SPREAD ════════ */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 mb-14">
        <div className="relative aspect-[16/10] sm:aspect-[16/7] w-full overflow-hidden bg-[#FAF8F4] border border-[#E8E4DB] shadow-sm">
          <Image
            src="/images/uk-heritage/inverlochy-castle.webp"
            alt="Inverlochy Castle Hotel grand entrance and Highland facade in Torlundy, Fort William, Scotland"
            fill
            priority
            placeholder="blur"
            blurDataURL={blurDataURL}
            className="object-contain sm:object-cover"
            sizes="(min-width: 1200px) 1152px, 100vw"
          />
        </div>
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#6A6A70] font-sans px-1 gap-1">
          <span>The Scottish Baronial entrance portico, turrets, and landscaped private loch of Inverlochy Castle Hotel.</span>
          <span className="text-[10px] text-[#8A7352] font-medium tracking-wide">Steffen Schmitz · CC BY-SA 4.0</span>
        </div>
      </section>

      {/* ════════ LONG-FORM EDITORIAL NARRATIVE ════════ */}
      <section className="max-w-3xl mx-auto px-6 sm:px-10 pb-20 font-serif leading-[1.8] text-[#2A2A2E] text-base sm:text-lg">
        <div className="space-y-8">
          <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-normal first-letter:float-left first-letter:mr-3 first-letter:text-[#8A7352] first-letter:leading-none">
            In September 1873, Queen Victoria journeyed to the West Highlands and spent a solitary week at Inverlochy Castle. Enamored by the dramatic play of autumn mist drifting over Ben Nevis and the tranquil waters of the private estate loch, she inscribed in her personal Highland journal: &ldquo;I never saw a lovelier or more romantic spot.&rdquo;
          </p>

          <p>
            Constructed in 1863 by William Scarlett, 3rd Baron Abinger, near the ruined fortress where Clan Donald fought the historic 1431 and 1645 battles of Inverlochy, this baronial manor represents the height of Victorian domestic craftsmanship. Built in heavy local stone with crenellated parapets and corbelled towers, Inverlochy balances defensive fortitude with sumptuous residential luxury.
          </p>

          {/* Editorial Pull Quote */}
          <blockquote className="my-10 pl-6 sm:pl-8 border-l-2 border-[#8A7352] font-serif italic text-xl sm:text-2xl text-[#1A1A1A] leading-relaxed">
            &ldquo;Inverlochy established the archetype of modern Scottish luxury: roaring peat fires, antique Venetian crystal, and hospitality that treats every guest as a visiting sovereign.&rdquo;
          </blockquote>

          <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] pt-4 leading-tight">
            The Pioneer of Scottish Luxury Hospitality
          </h2>

          <p>
            In 1969, Greta Hobbs — the visionary daughter of Canadian industrialist Joseph Hobbs — converted Inverlochy into Scotland&apos;s first dedicated luxury country house hotel. At a time when British provincial accommodations were notoriously austere, Inverlochy set international benchmarks: nineteen individually decorated bedrooms hung with 17th-century tapestries, original frescoes on the grand staircase, and a billiards room featuring Lord Abinger&apos;s antique Victorian snooker table.
          </p>

          <p>
            Over the ensuing decades, Inverlochy became the secluded refuge for international royalty, statesmen, and cultural icons — from Charlie Chaplin and Sean Connery to Anthony Hopkins and King Charles III (as Prince of Wales).
          </p>

          <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] pt-4 leading-tight">
            Seasgair by Michel Roux Jr.
          </h2>

          <p>
            Culinary excellence at Inverlochy reached a new summit with the launch of Seasgair (Gaelic for &ldquo;warm, cosy, and comfortable&rdquo;), curated by legendary chef Michel Roux Jr. The dining experience evokes the convivial atmosphere of an aristocratic country house gathering: guests congregate in the Great Hall for bespoke single malt cocktails and canapés before being seated for a theatrical five-course celebration of the Scottish larder.
          </p>

          <p>
            Dishes highlight wild roe deer harvested from neighboring estates, hand-dived langoustines from Mallaig, Loch Creran oysters, and Highland berries, paired with rare vintages from the castle&apos;s temperature-controlled subterranean cellar.
          </p>
        </div>

        {/* ════════ CONNOISSEUR NOTES ════════ */}
        <div className="mt-14 p-8 bg-[#FAF8F4] border border-[#E8E4DB]">
          <span className="text-[10px] uppercase tracking-[0.24em] font-sans font-semibold text-[#8A7352] block mb-2">
            The Connoisseur&apos;s Field Guide
          </span>
          <h3 className="text-xl font-serif text-[#1A1A1A] mb-4">
            Reserving &amp; Experiencing Inverlochy Castle
          </h3>
          <ul className="space-y-3 text-sm font-sans text-[#5A5A60] leading-relaxed">
            <li>
              <strong className="text-[#1A1A1A]">The Queen&apos;s Suite:</strong> Reserve the exact bedroom suite occupied by Queen Victoria in 1873, complete with a carved four-poster bed and private balcony overlooking Ben Nevis.
            </li>
            <li>
              <strong className="text-[#1A1A1A]">Sporting Pursuits:</strong> The estate concierge arranges private salmon fishing on the River Lochy, stalking on Highland deer forests, and chartered boat cruises across Loch Linnhe.
            </li>
            <li>
              <strong className="text-[#1A1A1A]">How to Arrive:</strong> The Jacobite Steam Train (celebrated as the Hogwarts Express) departs from nearby Fort William across the Glenfinnan Viaduct, offering an evocative rail arrival into the Highlands.
            </li>
          </ul>
        </div>

        {/* ════════ CROSS NAVIGATION ════════ */}
        <div className="mt-14 pt-8 border-t border-[#E8E4DB] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/travel/castle-hotels-scotland"
            className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#8A7352] hover:text-[#1A1A1A] transition-colors"
          >
            ← All Scottish Castle Hotels
          </Link>
          <Link
            href="/travel/inveraray-castle"
            className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#1A1A1A] hover:text-[#8A7352] transition-colors"
          >
            Next: Inveraray Castle →
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
