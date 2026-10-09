import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "@/app/components/NewsletterForm";

export const metadata: Metadata = {
  title: "The Castle of Mey: Queen Elizabeth The Queen Mother's Caithness Haven | The Royal Gallerys",
  description:
    "An architectural and biographical exploration of the Castle of Mey on the northern coast of Scotland — Queen Elizabeth The Queen Mother's beloved coastal fortress overlooking the Pentland Firth.",
  alternates: {
    canonical: "https://theroyalgallerys.com/travel/castle-of-mey",
  },
  openGraph: {
    title: "The Castle of Mey: The Queen Mother's Highland Sanctuary — The Royal Gallerys",
    description:
      "Inside the private coastal retreat of Queen Elizabeth The Queen Mother: 16th-century Sinclair tower architecture, the walled garden, and the Pentland Firth.",
    url: "https://theroyalgallerys.com/travel/castle-of-mey",
    siteName: "The Royal Gallerys",
    locale: "en_GB",
    type: "article",
    publishedTime: "2026-10-04T12:00:00Z",
    authors: ["The Royal Gallerys Editorial"],
    images: [
      {
        url: "https://theroyalgallerys.com/images/uk-heritage/castle-of-mey.webp",
        width: 2400,
        height: 1800,
        alt: "The Castle of Mey in Caithness, Scotland, overlooking the North Sea",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Castle of Mey: The Queen Mother's Highland Sanctuary | The Royal Gallerys",
    description:
      "The Queen Mother's 16th-century fortress, coastal walled gardens, and living royal stewardship in Caithness.",
    images: ["https://theroyalgallerys.com/images/uk-heritage/castle-of-mey.webp"],
  },
};

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiMxYTFhMWEiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

export default function CastleOfMeyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "The Castle of Mey: Queen Elizabeth The Queen Mother's Caithness Haven",
    description:
      "Inside the private northern retreat of Queen Elizabeth The Queen Mother — 16th-century Z-plan fortress architecture, coastal walled gardens, and living royal craftsmanship.",
    image: "https://theroyalgallerys.com/images/uk-heritage/castle-of-mey.webp",
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
      "@id": "https://theroyalgallerys.com/travel/castle-of-mey",
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
              <li><Link href="/travel/royal-estates-scotland" className="hover:underline">Royal Estates</Link></li>
              <span className="text-[#C8C4BA]">/</span>
              <li className="text-[#1A1A1A] font-medium">Castle of Mey</li>
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
          Royal Scottish Sanctuaries · Caithness
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#1A1A1A] leading-[1.08] mb-6">
          The Castle of Mey: The Queen Mother&apos;s Fortress Against the Northern Sea
        </h1>
        <p className="text-lg sm:text-xl font-serif italic text-[#5A5A60] leading-relaxed max-w-2xl mx-auto mb-8">
          Six miles west of John o&apos; Groats overlooking the turbulent Pentland Firth — how a grieving royal widow rescued a roofless 16th-century fortress and cultivated a blooming paradise in the teeth of Arctic gales.
        </p>

        {/* Fact metadata bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-[#E8E4DB] text-left">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Location</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">Caithness, Northern Scotland</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Origins</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">c. 1566–1572 by 4th Earl of Caithness</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Royal Restorer</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">Queen Elizabeth The Queen Mother (1952)</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Current Custodian</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">The King&apos;s Foundation</span>
          </div>
        </div>
      </header>

      {/* ════════ FULL-RESOLUTION PHOTOGRAPHIC SPREAD ════════ */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 mb-14">
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#FAF8F4] border border-[#E8E4DB] shadow-sm">
          <Image
            src="/images/uk-heritage/castle-of-mey.webp"
            alt="The Castle of Mey and coastal estate grounds in Caithness, Scotland"
            fill
            priority
            placeholder="blur"
            blurDataURL={blurDataURL}
            className="object-contain sm:object-cover"
            sizes="(min-width: 1200px) 1152px, 100vw"
          />
        </div>
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#6A6A70] font-sans px-1 gap-1">
          <span>The fortified Z-plan stone towers and corbelled parapets of the Castle of Mey, facing the Pentland Firth.</span>
          <span className="text-[10px] text-[#8A7352] font-medium tracking-wide">Supergolden · CC BY-SA 3.0</span>
        </div>
      </section>

      {/* ════════ LONG-FORM EDITORIAL NARRATIVE ════════ */}
      <section className="max-w-3xl mx-auto px-6 sm:px-10 pb-20 font-serif leading-[1.8] text-[#2A2A2E] text-base sm:text-lg">
        <div className="space-y-8">
          <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-normal first-letter:float-left first-letter:mr-3 first-letter:text-[#8A7352] first-letter:leading-none">
            In August 1952, six months following the sudden death of King George VI, Queen Elizabeth The Queen Mother was staying with friends in the remote, wind-scoured reaches of Caithness in Scotland&apos;s extreme north. Heartbroken and searching for solitude away from official court life, she caught sight of Barrogill Castle — a crumbling 16th-century fortress perched solitary against the horizon, its slate roofs collapsing and its ancient stone ramparts exposed to the fury of North Atlantic squalls.
          </p>

          <p>
            When informed that the derelict property was on the verge of being sold for scrap demolition, the Queen Mother made the spontaneous decision to purchase it. It was the only home she would ever own in her own right. She immediately restored its historic ancestral name — the Castle of Mey — which had been bestowed upon it when George Sinclair, 4th Earl of Caithness, constructed the Z-plan fortified tower house between 1566 and 1572.
          </p>

          {/* Editorial Pull Quote */}
          <blockquote className="my-10 pl-6 sm:pl-8 border-l-2 border-[#8A7352] font-serif italic text-xl sm:text-2xl text-[#1A1A1A] leading-relaxed">
            &ldquo;There is something about this wild corner of Scotland — where the sky meets the northern tides — that restores the soul more surely than any court salon in Europe.&rdquo;
          </blockquote>

          <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] pt-4 leading-tight">
            The Miracle of the Walled Garden
          </h2>

          <p>
            One of the Queen Mother&apos;s crowning achievements at Mey was the creation of a two-acre walled garden. In a coastal environment so brutally windy that native trees cannot grow upright and salt spray burns vegetation for months on end, she constructed towering 12-foot stone protection walls. Inside this microclimate sanctuary, she cultivated Albertine rambling roses, English sweet peas, delphiniums, and Scottish marigolds.
          </p>

          <p>
            Through clever planting of hardy escallonia hedging, the garden defied Arctic latitudes to become one of the most celebrated horticultural gems of the Scottish Highlands. The Queen Mother spent three weeks every August and ten days in October here, donning waders and oilskin coats to walk along the stony beaches of the Pentland Firth with her beloved corgis, scanning the water for passing seals and Orkney fishing boats.
          </p>

          <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] pt-4 leading-tight">
            The King&apos;s Foundation and Modern Stewardship
          </h2>

          <p>
            In 1996, the Queen Mother established the Queen Elizabeth Castle of Mey Trust to secure the estate&apos;s long-term preservation for the benefit of the Caithness community. Today, under the stewardship of King Charles III through The King&apos;s Foundation, the castle maintains its authentic mid-century character: the chintz slipcovers, open peat fires, family photographs on sideboards, and shells collected by the royal grandchildren.
          </p>

          <p>
            The Granary Lodge — a luxury 10-bedroom guest lodge opened on the estate in 2019 by King Charles III (then Duke of Rothesay) — allows discerning travelers to stay directly on the castle grounds, experiencing bespoke Highland breakfasts, private walled garden strolls at twilight, and total immersion in Scotland&apos;s quietest royal sanctuary.
          </p>
        </div>

        {/* ════════ CONNOISSEUR NOTES ════════ */}
        <div className="mt-14 p-8 bg-[#FAF8F4] border border-[#E8E4DB]">
          <span className="text-[10px] uppercase tracking-[0.24em] font-sans font-semibold text-[#8A7352] block mb-2">
            The Connoisseur&apos;s Field Guide
          </span>
          <h3 className="text-xl font-serif text-[#1A1A1A] mb-4">
            Visiting the Castle of Mey &amp; Staying at The Granary Lodge
          </h3>
          <ul className="space-y-3 text-sm font-sans text-[#5A5A60] leading-relaxed">
            <li>
              <strong className="text-[#1A1A1A]">The Granary Lodge:</strong> The estate offers 10 sumptuously appointed bed-and-breakfast suites within the former granary, featuring traditional Scottish fabrics and views across to the Orkney Islands.
            </li>
            <li>
              <strong className="text-[#1A1A1A]">North Coast 500:</strong> The Castle of Mey sits directly on the world-renowned North Coast 500 touring route, making it an indispensable luxury stopping point between Inverness and Caithness.
            </li>
            <li>
              <strong className="text-[#1A1A1A]">Royal Week Closure:</strong> The castle is traditionally closed to visitors for a brief period in early August when King Charles III and Queen Camilla take up residence for their annual Caithness retreat.
            </li>
          </ul>
        </div>

        {/* ════════ CROSS NAVIGATION ════════ */}
        <div className="mt-14 pt-8 border-t border-[#E8E4DB] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/travel/palace-of-holyroodhouse"
            className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#8A7352] hover:text-[#1A1A1A] transition-colors"
          >
            ← Previous: Palace of Holyroodhouse
          </Link>
          <Link
            href="/travel/royal-estates-scotland"
            className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#1A1A1A] hover:text-[#8A7352] transition-colors"
          >
            All Royal Estates of Scotland →
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
