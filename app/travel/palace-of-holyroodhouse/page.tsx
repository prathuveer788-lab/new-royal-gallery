import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "@/app/components/NewsletterForm";

export const metadata: Metadata = {
  title: "The Palace of Holyroodhouse: Sovereign Seat in Edinburgh | The Royal Gallerys",
  description:
    "An architectural journey through the Palace of Holyroodhouse at the foot of Edinburgh's Royal Mile — from Mary, Queen of Scots' Renaissance chambers to Sir William Bruce's Baroque quadrangle.",
  alternates: {
    canonical: "https://theroyalgallerys.com/travel/palace-of-holyroodhouse",
  },
  openGraph: {
    title: "The Palace of Holyroodhouse: Sovereign Seat in Edinburgh — The Royal Gallerys",
    description:
      "Inside the official Scottish residence of the British Monarch: Mary Queen of Scots, the Great Gallery portraits, and modern Royal Week ceremonies.",
    url: "https://theroyalgallerys.com/travel/palace-of-holyroodhouse",
    siteName: "The Royal Gallerys",
    locale: "en_GB",
    type: "article",
    publishedTime: "2026-10-04T12:00:00Z",
    authors: ["The Royal Gallerys Editorial"],
    images: [
      {
        url: "https://theroyalgallerys.com/images/uk-heritage/holyroodhouse.webp",
        width: 2400,
        height: 1146,
        alt: "The Palace of Holyroodhouse facade and forecourt fountain in Edinburgh, Scotland",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Palace of Holyroodhouse: Sovereign Seat in Edinburgh | The Royal Gallerys",
    description:
      "Mary Queen of Scots, classical Baroque architecture, and royal ceremony at the foot of Arthur's Seat.",
    images: ["https://theroyalgallerys.com/images/uk-heritage/holyroodhouse.webp"],
  },
};

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiMxYTFhMWEiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

export default function HolyroodhousePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "The Palace of Holyroodhouse: Sovereign Seat at the Foot of the Royal Mile",
    description:
      "An architectural and historical exploration of the Palace of Holyroodhouse in Edinburgh — examining Renaissance towers, Sir William Bruce's classical quadrangle, and nine centuries of Scottish royal drama.",
    image: "https://theroyalgallerys.com/images/uk-heritage/holyroodhouse.webp",
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
      "@id": "https://theroyalgallerys.com/travel/palace-of-holyroodhouse",
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
              <li className="text-[#1A1A1A] font-medium">Holyroodhouse</li>
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
          Official Royal Residence · Scotland
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#1A1A1A] leading-[1.08] mb-6">
          The Palace of Holyroodhouse: Nine Centuries of Sovereign Drama
        </h1>
        <p className="text-lg sm:text-xl font-serif italic text-[#5A5A60] leading-relaxed max-w-2xl mx-auto mb-8">
          Standing at the terminal of Edinburgh&apos;s Royal Mile beneath Salisbury Crags — where Mary Queen of Scots confronted destiny and Charles II raised a Classical Baroque monument.
        </p>

        {/* Fact metadata bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-[#E8E4DB] text-left">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Location</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">Canongate, Edinburgh</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Architects</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">Sir William Bruce &amp; Robert Mylne</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Foundation</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">1128 (Abbey) / 1501 (Palace)</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Role</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">Official Scottish Monarch Residence</span>
          </div>
        </div>
      </header>

      {/* ════════ FULL-RESOLUTION PHOTOGRAPHIC SPREAD ════════ */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 mb-14">
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#FAF8F4] border border-[#E8E4DB] shadow-sm">
          <Image
            src="/images/uk-heritage/holyroodhouse.webp"
            alt="The Palace of Holyroodhouse grand facade and historic courtyard fountain in Edinburgh"
            fill
            priority
            placeholder="blur"
            blurDataURL={blurDataURL}
            className="object-contain sm:object-cover"
            sizes="(min-width: 1200px) 1152px, 100vw"
          />
        </div>
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#6A6A70] font-sans px-1 gap-1">
          <span>The West Facade and 19th-century royal fountain of Holyroodhouse, flanked by James V&apos;s medieval tower.</span>
          <span className="text-[10px] text-[#8A7352] font-medium tracking-wide">Steffen Schmitz · CC BY-SA 4.0</span>
        </div>
      </section>

      {/* ════════ LONG-FORM EDITORIAL NARRATIVE ════════ */}
      <section className="max-w-3xl mx-auto px-6 sm:px-10 pb-20 font-serif leading-[1.8] text-[#2A2A2E] text-base sm:text-lg">
        <div className="space-y-8">
          <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-normal first-letter:float-left first-letter:mr-3 first-letter:text-[#8A7352] first-letter:leading-none">
            Few buildings in the British Isles compress as much romantic, turbulent, and constitutional drama into their stone fabric as the Palace of Holyroodhouse. Originating in 1128 as an Augustinian abbey founded by King David I — legendary lore states he was saved from a charging stag by the miraculous appearance of a holy rood (cross) between its antlers — the abbey guesthouse grew into the primary royal residence of Scotland by the early 16th century under James IV.
          </p>

          <p>
            The surviving northwest tower, erected between 1528 and 1532 by James V, represents the most intensely atmospheric surviving royal apartment in Edinburgh. Here, within the bedchamber and tiny adjacent supper room, Mary, Queen of Scots spent the most critical years of her tragic reign (1561–1567). On the evening of 9 March 1566, Mary&apos;s jealous husband, Lord Darnley, and a band of Protestant nobles burst into her private closet and brutally stabbed her Italian private secretary, David Rizzio, fifty-six times before her eyes. The bloodstains were famously left in the wooden floorboards, a chilling memento of Scottish court intrigue that tourists have contemplated for three centuries.
          </p>

          {/* Editorial Pull Quote */}
          <blockquote className="my-10 pl-6 sm:pl-8 border-l-2 border-[#8A7352] font-serif italic text-xl sm:text-2xl text-[#1A1A1A] leading-relaxed">
            &ldquo;Holyrood stands at the foot of the hill like an ancient jewel chest — its locks heavy with Tudor intrigues, Stuart tragedies, and the quiet dignity of modern crown duty.&rdquo;
          </blockquote>

          <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] pt-4 leading-tight">
            Sir William Bruce and the Classical Baroque Quadrangle
          </h2>

          <p>
            Following the Restoration of the Stuart monarchy in 1660, Charles II decreed that Holyroodhouse should be transformed into a palace worthy of a modern European realm. Between 1671 and 1679, Scotland&apos;s pioneering Classical architect, Sir William Bruce, designed the monumental quadrangle that defines the palace today. Bruce achieved brilliant balance: to counterbalance James V&apos;s medieval northwest tower, he erected a matching southwest tower, linking them with a monumental Doric colonnade and Roman Baroque pediment.
          </p>

          <p>
            Within Bruce&apos;s state apartments, master Dutch plasterers John Houlbert and George Dunsterfield executed some of the finest enriched plasterwork ceilings in the United Kingdom, adorned with naturalistic garlands of fruits, acorns, and coats of arms. The Great Gallery — stretching 150 feet along the northern side — contains 110 portraits of Scottish monarchs commissioned from Dutch painter Jacob de Wet II. Though early portraits were fanciful likenesses invented by the artist, the room served as the grand ballroom where Prince Charles Edward Stuart (&ldquo;Bonnie Prince Charlie&rdquo;) held court in 1745 during the Jacobite occupation of Edinburgh.
          </p>

          <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] pt-4 leading-tight">
            The Living Modern Sovereign Tradition: Royal Week
          </h2>

          <p>
            Today, Holyroodhouse remains the official Scottish seat of the Sovereign. Each summer during &ldquo;Royal Week&rdquo; (traditionally late June to early July), King Charles III resides in the palace, beginning with the ancient Ceremony of the Keys on the palace forecourt, where the Lord Provost offers the monarch the keys to Edinburgh. The palace gardens — a tranquil 10-acre oasis overlooking the volcanic cliffs of Salisbury Crags — host the annual Sovereign Garden Party for 8,000 Scottish guests, bridging ancient court ritual with modern civic celebration.
          </p>
        </div>

        {/* ════════ CONNOISSEUR NOTES ════════ */}
        <div className="mt-14 p-8 bg-[#FAF8F4] border border-[#E8E4DB]">
          <span className="text-[10px] uppercase tracking-[0.24em] font-sans font-semibold text-[#8A7352] block mb-2">
            The Connoisseur&apos;s Field Guide
          </span>
          <h3 className="text-xl font-serif text-[#1A1A1A] mb-4">
            Visiting Holyroodhouse &amp; Canongate
          </h3>
          <ul className="space-y-3 text-sm font-sans text-[#5A5A60] leading-relaxed">
            <li>
              <strong className="text-[#1A1A1A]">The King&apos;s Gallery:</strong> Adjacent to the palace, the King&apos;s Gallery showcases rotating exhibitions of masterworks from the Royal Collection, including drawings by Leonardo da Vinci and Fabergé eggs.
            </li>
            <li>
              <strong className="text-[#1A1A1A]">Holyrood Abbey Ruins:</strong> The roofless 12th-century abbey nave behind the palace is one of the most hauntingly romantic Gothic ruin sites in Scotland, containing the royal vault of James V.
            </li>
            <li>
              <strong className="text-[#1A1A1A]">Connoisseur Itinerary:</strong> Walk down the Royal Mile from Edinburgh Castle in the morning, tour Holyroodhouse, and conclude with afternoon tea at <Link href="/travel/the-balmoral" className="text-[#8A7352] underline">The Balmoral&apos;s Palm Court</Link>.
            </li>
          </ul>
        </div>

        {/* ════════ CROSS NAVIGATION ════════ */}
        <div className="mt-14 pt-8 border-t border-[#E8E4DB] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/travel/balmoral-castle"
            className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#8A7352] hover:text-[#1A1A1A] transition-colors"
          >
            ← Previous: Balmoral Castle
          </Link>
          <Link
            href="/travel/castle-of-mey"
            className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#1A1A1A] hover:text-[#8A7352] transition-colors"
          >
            Next: Castle of Mey →
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
