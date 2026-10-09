import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "@/app/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Blenheim Palace: England's Baroque Triumph & Churchill's Cradle | The Royal Gallerys",
  description:
    "An architectural investigation into Blenheim Palace in Oxfordshire — England's only non-royal palace, Sir John Vanbrugh's Baroque masterpiece, and the birthplace of Sir Winston Churchill.",
  alternates: {
    canonical: "https://theroyalgallerys.com/travel/blenheim-palace",
  },
  openGraph: {
    title: "Blenheim Palace: England's Baroque Triumph & Churchill's Cradle — The Royal Gallerys",
    description:
      "Inside England's monumental UNESCO World Heritage palace: Vanbrugh's heroic architecture, the Spencer-Churchill dynasty, and the Great Court.",
    url: "https://theroyalgallerys.com/travel/blenheim-palace",
    siteName: "The Royal Gallerys",
    locale: "en_GB",
    type: "article",
    publishedTime: "2026-10-04T12:00:00Z",
    authors: ["The Royal Gallerys Architecture Desk"],
    images: [
      {
        url: "https://theroyalgallerys.com/images/uk-heritage/blenheim-palace.webp",
        width: 2400,
        height: 1363,
        alt: "Blenheim Palace monumental Baroque facade in Woodstock, Oxfordshire, England",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blenheim Palace: England's Baroque Triumph | The Royal Gallerys",
    description:
      "Vanbrugh's monumental Baroque architecture, the Long Library, and the birthplace of Sir Winston Churchill in Oxfordshire.",
    images: ["https://theroyalgallerys.com/images/uk-heritage/blenheim-palace.webp"],
  },
};

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiMxYTFhMWEiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

export default function BlenheimPalacePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Blenheim Palace: England's Baroque Triumph & Churchill's Cradle",
    description:
      "An architectural and historical exploration of Blenheim Palace in Oxfordshire — examining Sir John Vanbrugh's design, the Spencer-Churchill dynasty, and Sir Winston Churchill's birth.",
    image: "https://theroyalgallerys.com/images/uk-heritage/blenheim-palace.webp",
    datePublished: "2026-10-04T12:00:00Z",
    dateModified: "2026-10-04T12:00:00Z",
    author: {
      "@type": "Organization",
      name: "The Royal Gallerys Architecture Desk",
      url: "https://theroyalgallerys.com",
    },
    publisher: {
      "@type": "Organization",
      name: "The Royal Gallerys",
      url: "https://theroyalgallerys.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://theroyalgallerys.com/travel/blenheim-palace",
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
              <li><Link href="/travel/british-country-houses" className="hover:underline">Country Houses</Link></li>
              <span className="text-[#C8C4BA]">/</span>
              <li className="text-[#1A1A1A] font-medium">Blenheim Palace</li>
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
          UNESCO World Heritage Site · Oxfordshire
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#1A1A1A] leading-[1.08] mb-6">
          Blenheim Palace: England&apos;s Sole Non-Royal Baroque Palace
        </h1>
        <p className="text-lg sm:text-xl font-serif italic text-[#5A5A60] leading-relaxed max-w-2xl mx-auto mb-8">
          Gifted by Queen Anne to John Churchill, 1st Duke of Marlborough, following his 1704 victory — Sir John Vanbrugh&apos;s titanic monument and the birthplace of Sir Winston Churchill.
        </p>

        {/* Fact metadata bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-[#E8E4DB] text-left">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Location</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">Woodstock, Oxfordshire</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Architects</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">Sir John Vanbrugh &amp; Hawksmoor</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Dynasty</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">Spencer-Churchill (Dukes of Marlborough)</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Status</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">UNESCO World Heritage (1987)</span>
          </div>
        </div>
      </header>

      {/* ════════ FULL-RESOLUTION PHOTOGRAPHIC SPREAD ════════ */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 mb-14">
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#FAF8F4] border border-[#E8E4DB] shadow-sm">
          <Image
            src="/images/uk-heritage/blenheim-palace.webp"
            alt="Blenheim Palace grand Baroque portico and Corinthian colonnade in Woodstock, Oxfordshire"
            fill
            priority
            placeholder="blur"
            blurDataURL={blurDataURL}
            className="object-contain sm:object-cover"
            sizes="(min-width: 1200px) 1152px, 100vw"
          />
        </div>
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#6A6A70] font-sans px-1 gap-1">
          <span>The monumental North Facade of Blenheim Palace, framed by martial trophies and Corinthian porticos.</span>
          <span className="text-[10px] text-[#8A7352] font-medium tracking-wide">DeFacto · CC BY-SA 4.0</span>
        </div>
      </section>

      {/* ════════ LONG-FORM EDITORIAL NARRATIVE ════════ */}
      <section className="max-w-3xl mx-auto px-6 sm:px-10 pb-20 font-serif leading-[1.8] text-[#2A2A2E] text-base sm:text-lg">
        <div className="space-y-8">
          <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-normal first-letter:float-left first-letter:mr-3 first-letter:text-[#8A7352] first-letter:leading-none">
            Blenheim Palace occupies a solitary, unmatched status in English architectural history. It is the only non-royal, non-episcopal country residence in the United Kingdom to hold the title of &ldquo;Palace.&rdquo; Constructed between 1705 and 1722, it was conceived not merely as a private home, but as an empire&apos;s triumphal monument — gifted by Queen Anne and a grateful Parliament to John Churchill, 1st Duke of Marlborough, following his crushing defeat of Louis XIV&apos;s French forces at the Battle of Blenheim in Bavaria.
          </p>

          <p>
            To execute this national statement, Marlborough bypassed Sir Christopher Wren and selected Sir John Vanbrugh, playwright turned radical architect, aided by the brooding structural genius Nicholas Hawksmoor. Together, they raised a titanic exercise in English Baroque that challenged the classical restraint of the age. Blenheim&apos;s heroic scale, colossal Corinthian colonnades, martial cannon-and-lion finials, and seven-acre Great Court were designed to project imperial power and martial defiance across Oxfordshire&apos;s gentle valleys.
          </p>

          {/* Editorial Pull Quote */}
          <blockquote className="my-10 pl-6 sm:pl-8 border-l-2 border-[#8A7352] font-serif italic text-xl sm:text-2xl text-[#1A1A1A] leading-relaxed">
            &ldquo;At Blenheim I took two very important decisions: to be born and to marry. I am content with the decision I took on both occasions.&rdquo;
            <footer className="text-xs uppercase tracking-widest font-sans font-semibold text-[#8A7352] not-italic mt-3">
              — Sir Winston Churchill
            </footer>
          </blockquote>

          <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] pt-4 leading-tight">
            The Long Library and Spencer-Churchill Splendour
          </h2>

          <p>
            Inside the palace, the state apartments follow an enfilade of monumental proportions. The Great Hall rises 67 feet to an allegorical ceiling fresco by Sir James Thornhill depicting the Duke of Marlborough pointing to the plan of the battle. Beyond lies the Long Library — stretching 183 feet (55 meters) along the entire western wing. Designed by Vanbrugh as a picture gallery and adapted into a library by Hawksmoor, the room houses more than 10,000 historic volumes and an extraordinary 1891 Father Willis organ.
          </p>

          <p>
            On 30 November 1874, while attending a ball at the palace, Lady Randolph Churchill (the American socialite Jennie Jerome) unexpectedly went into labor. Her son, Winston Leonard Spencer-Churchill, was born in a modest ground-floor bedroom near the main hall. Churchill retained a lifelong devotion to Blenheim: he proposed to his wife Clementine Hozier in the Temple of Diana in the palace gardens in 1908 and was buried in the nearby churchyard of St Martin&apos;s, Bladon, within view of the palace spires.
          </p>

          <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] pt-4 leading-tight">
            Capability Brown&apos;s Lakes and The Grand Bridge
          </h2>

          <p>
            When Vanbrugh originally built the monumental Grand Bridge across the tiny Glyme river, Horace Walpole satirized it as &ldquo;an arch that drowned all water beneath it.&rdquo; In the 1760s, Lancelot &ldquo;Capability&rdquo; Brown corrected the disparity with unprecedented landscape audacity: he dammed the river to create two cascading lakes covering over 150 acres, partially submerging Vanbrugh&apos;s bridge into the water.
          </p>

          <p>
            The resulting panorama — where the baroque palace is reflected across the glassy surface of the Queen&apos;s Pool against 2,000 acres of ancient oak parkland — represents one of the defining landscape vistas of European romantic art.
          </p>
        </div>

        {/* ════════ CONNOISSEUR NOTES ════════ */}
        <div className="mt-14 p-8 bg-[#FAF8F4] border border-[#E8E4DB]">
          <span className="text-[10px] uppercase tracking-[0.24em] font-sans font-semibold text-[#8A7352] block mb-2">
            The Connoisseur&apos;s Field Guide
          </span>
          <h3 className="text-xl font-serif text-[#1A1A1A] mb-4">
            Visiting Blenheim &amp; Woodstock
          </h3>
          <ul className="space-y-3 text-sm font-sans text-[#5A5A60] leading-relaxed">
            <li>
              <strong className="text-[#1A1A1A]">Churchill Exhibition:</strong> The permanent Churchill suite traces the wartime leader&apos;s life through letters, personal artifacts, and paintings he created at the estate.
            </li>
            <li>
              <strong className="text-[#1A1A1A]">Private Estate Stays:</strong> Woodstock offers exquisite 18th-century coaching inns, including The Bear Hotel and The Feathers, just steps from the palace&apos;s grand triumphal arch entrance.
            </li>
            <li>
              <strong className="text-[#1A1A1A]">Blenheim Horse Trials:</strong> The annual autumn international equestrian competitions draw royalty and world champions to the palace parkland each September.
            </li>
          </ul>
        </div>

        {/* ════════ CROSS NAVIGATION ════════ */}
        <div className="mt-14 pt-8 border-t border-[#E8E4DB] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/travel/chatsworth-house"
            className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#8A7352] hover:text-[#1A1A1A] transition-colors"
          >
            ← Previous: Chatsworth House
          </Link>
          <Link
            href="/travel/british-country-houses"
            className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#1A1A1A] hover:text-[#8A7352] transition-colors"
          >
            All British Country Houses →
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
