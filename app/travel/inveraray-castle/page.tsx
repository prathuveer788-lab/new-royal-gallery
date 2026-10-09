import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "@/app/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Inveraray Castle: Ancestral Seat of Clan Campbell on Loch Fyne | The Royal Gallerys",
  description:
    "An architectural and dynastic exploration of Inveraray Castle in Argyll — seat of the Duke of Argyll, Chief of Clan Campbell, Gothic Revival architecture, and the monumental Armoury Hall.",
  alternates: {
    canonical: "https://theroyalgallerys.com/travel/inveraray-castle",
  },
  openGraph: {
    title: "Inveraray Castle: Ancestral Seat of the Duke of Argyll — The Royal Gallerys",
    description:
      "Inside Scotland's premier Gothic Revival castle: Clan Campbell history, 1,300 weapons in the Armoury Hall, Beauvais tapestries, and Loch Fyne.",
    url: "https://theroyalgallerys.com/travel/inveraray-castle",
    siteName: "The Royal Gallerys",
    locale: "en_GB",
    type: "article",
    publishedTime: "2026-10-04T12:00:00Z",
    authors: ["The Royal Gallerys Editorial"],
    images: [
      {
        url: "https://theroyalgallerys.com/images/uk-heritage/inveraray-castle.webp",
        width: 2400,
        height: 1476,
        alt: "Inveraray Castle Gothic Revival facade and corner turrets in Argyll, Scotland",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Inveraray Castle: Ancestral Seat of Clan Campbell | The Royal Gallerys",
    description:
      "The Duke of Argyll's seat on Loch Fyne: Gothic Revival splendor, 1,300 highland weapons, and living clan heritage.",
    images: ["https://theroyalgallerys.com/images/uk-heritage/inveraray-castle.webp"],
  },
};

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiMxYTFhMWEiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

export default function InverarayCastlePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Inveraray Castle: Ancestral Seat of Clan Campbell on Loch Fyne",
    description:
      "An architectural and historical exploration of Inveraray Castle in Argyll — examining Roger Morris's Gothic Revival design, the Duke of Argyll's ancestral collection, and the dramatic setting of Loch Fyne.",
    image: "https://theroyalgallerys.com/images/uk-heritage/inveraray-castle.webp",
    datePublished: "2026-10-04T12:00:00Z",
    dateModified: "2026-10-04T12:00:00Z",
    author: {
      "@type": "Organization",
      name: "The Royal Gallerys Editorial",
      url: "https://theroyalgallerys.com",
    },
    publisher: {
      "@type": "Organization",
      name: "The Royal Gallerys",
      url: "https://theroyalgallerys.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://theroyalgallerys.com/travel/inveraray-castle",
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
              <li><Link href="/travel/castle-hotels-scotland" className="hover:underline">Castle Hotels &amp; Seats</Link></li>
              <span className="text-[#C8C4BA]">/</span>
              <li className="text-[#1A1A1A] font-medium">Inveraray Castle</li>
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
          Clan Campbell Seat · Argyll &amp; Bute
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#1A1A1A] leading-[1.08] mb-6">
          Inveraray Castle: The Ancestral Fortress of Clan Campbell on Loch Fyne
        </h1>
        <p className="text-lg sm:text-xl font-serif italic text-[#5A5A60] leading-relaxed max-w-2xl mx-auto mb-8">
          The ancestral seat of the Duke of Argyll — pioneering 18th-century Gothic Revival architecture, the soaring Armoury Hall with 1,300 weapons, and six centuries of Highland clan leadership.
        </p>

        {/* Fact metadata bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-[#E8E4DB] text-left">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Location</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">Loch Fyne, Argyll</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Architects</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">Roger Morris &amp; Robert Mylne</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Clan Chief</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">Torquhil Campbell, 13th Duke</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Armoury</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">1,300 Swords, Muskets &amp; Lochaber Axes</span>
          </div>
        </div>
      </header>

      {/* ════════ FULL-RESOLUTION PHOTOGRAPHIC SPREAD ════════ */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 mb-14">
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#FAF8F4] border border-[#E8E4DB] shadow-sm">
          <Image
            src="/images/uk-heritage/inveraray-castle.webp"
            alt="Inveraray Castle southwest Gothic Revival facade and circular corner towers in Argyll, Scotland"
            fill
            priority
            placeholder="blur"
            blurDataURL={blurDataURL}
            className="object-contain sm:object-cover"
            sizes="(min-width: 1200px) 1152px, 100vw"
          />
        </div>
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#6A6A70] font-sans px-1 gap-1">
          <span>The distinctive circular corner towers, conical slate spires, and moat of Inveraray Castle beside Loch Fyne.</span>
          <span className="text-[10px] text-[#8A7352] font-medium tracking-wide">DeFacto · CC BY-SA 4.0</span>
        </div>
      </section>

      {/* ════════ LONG-FORM EDITORIAL NARRATIVE ════════ */}
      <section className="max-w-3xl mx-auto px-6 sm:px-10 pb-20 font-serif leading-[1.8] text-[#2A2A2E] text-base sm:text-lg">
        <div className="space-y-8">
          <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-normal first-letter:float-left first-letter:mr-3 first-letter:text-[#8A7352] first-letter:leading-none">
            Rising serenely from emerald parkland where the River Aray flows into the sea waters of Loch Fyne, Inveraray Castle represents one of the earliest and most daring manifestations of the Gothic Revival in Europe. Begun in 1746 by Archibald Campbell, 3rd Duke of Argyll — just months after the Battle of Culloden brought an end to the Jacobite Risings — the castle was designed to proclaim the enlightened supremacy of Clan Campbell.
          </p>

          <p>
            Architect Roger Morris drafted the initial Palladian-Gothic hybrid plans, which were later brought to completion by Robert Mylne. Constructed in greenish-grey chlorite schist quarried from nearby Loch Fyne, the castle is square in plan, flanked by four massive circular corner towers and crowned with French-inspired conical slate roofs added following a fire in 1877. Surrounded by a wide dry moat and decorative stone battlements, Inveraray exudes the air of an enchanted medieval fortress reimagined with 18th-century classical proportion.
          </p>

          {/* Editorial Pull Quote */}
          <blockquote className="my-10 pl-6 sm:pl-8 border-l-2 border-[#8A7352] font-serif italic text-xl sm:text-2xl text-[#1A1A1A] leading-relaxed">
            &ldquo;Inveraray is Clan Campbell&apos;s stone testament: an epic cross-section of Scottish martial defense, French court elegance, and unbroken family line.&rdquo;
          </blockquote>

          <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] pt-4 leading-tight">
            The Monumental Armoury Hall
          </h2>

          <p>
            At the heart of the castle rises the soaring Armoury Hall, with a ceiling vault soaring 68 feet (21 meters) high — making it the tallest room in Scotland. The hall is lined with an astonishing geometric installation of 1,300 weapons: 16th-century two-handed claymores, Lochaber axes, broadswords, and brown Bess flintlock muskets carried by the Argyll Militia at Culloden in 1746.
          </p>

          <p>
            Contrasting vividly with this martial spectacle, the State Dining Room and Tapestry Drawing Room reveal exquisite Parisian refinement. Decorated in the late 18th century for the 5th Duke by French painter Girard, the rooms preserve original Beauvais tapestries woven in Paris, painted gilded boiserie, and the ceremonial gold and silver banqueting services of the Campbell dukes.
          </p>

          <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] pt-4 leading-tight">
            Living Clan Heritage and Argyll Today
          </h2>

          <p>
            Inveraray remains the private home of Torquhil Campbell, 13th Duke of Argyll, Chief of Clan Campbell (MacCailein Mòr), and his family. Under their leadership, the 60,000-acre Argyll estate continues as a living center of highland culture, hosting the annual Inveraray Highland Games and producing sustainable timber, hydro power, and artisanal products.
          </p>
        </div>

        {/* ════════ CONNOISSEUR NOTES ════════ */}
        <div className="mt-14 p-8 bg-[#FAF8F4] border border-[#E8E4DB]">
          <span className="text-[10px] uppercase tracking-[0.24em] font-sans font-semibold text-[#8A7352] block mb-2">
            The Connoisseur&apos;s Field Guide
          </span>
          <h3 className="text-xl font-serif text-[#1A1A1A] mb-4">
            Visiting Inveraray &amp; Loch Fyne
          </h3>
          <ul className="space-y-3 text-sm font-sans text-[#5A5A60] leading-relaxed">
            <li>
              <strong className="text-[#1A1A1A]">Loch Fyne Oysters:</strong> Stop at the world-renowned Loch Fyne Oyster Bar at Cairndow, just 10 minutes along the loch shore from the castle gates.
            </li>
            <li>
              <strong className="text-[#1A1A1A]">The Dun na Cuaiche Walk:</strong> Hike to the 18th-century watchtower atop Dun na Cuaiche hill overlooking the castle for the most celebrated photographic vantage point in Argyll.
            </li>
            <li>
              <strong className="text-[#1A1A1A]">Where to Stay:</strong> The George Hotel in Inveraray town offers 18th-century coaching inn character, roaring open log fires, and over 400 single malt whiskies.
            </li>
          </ul>
        </div>

        {/* ════════ CROSS NAVIGATION ════════ */}
        <div className="mt-14 pt-8 border-t border-[#E8E4DB] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/travel/inverlochy-castle"
            className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#8A7352] hover:text-[#1A1A1A] transition-colors"
          >
            ← Previous: Inverlochy Castle
          </Link>
          <Link
            href="/travel/gleneagles-hotel"
            className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#1A1A1A] hover:text-[#8A7352] transition-colors"
          >
            Next: Gleneagles Hotel →
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
