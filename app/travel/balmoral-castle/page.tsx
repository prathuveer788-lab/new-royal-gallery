import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "@/app/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Balmoral Castle: The Scottish Baronial Sanctuary of the British Monarchy | The Royal Gallerys",
  description:
    "An architectural and cultural investigation into Balmoral Castle in Royal Deeside — from Prince Albert's 1852 vision and William Smith's granite towers to the private life of the British Royal Family.",
  alternates: {
    canonical: "https://theroyalgallerys.com/travel/balmoral-castle",
  },
  openGraph: {
    title: "Balmoral Castle: The Sovereign's Highland Sanctuary — The Royal Gallerys",
    description:
      "Inside the private Deeside retreat of the British Monarchy: William Smith's Scots Baronial design, the royal deer forests, and five generations of sovereign leisure.",
    url: "https://theroyalgallerys.com/travel/balmoral-castle",
    siteName: "The Royal Gallerys",
    locale: "en_GB",
    type: "article",
    publishedTime: "2026-10-04T12:00:00Z",
    authors: ["The Royal Gallerys Editorial"],
    images: [
      {
        url: "https://theroyalgallerys.com/images/uk-heritage/balmoral-castle.webp",
        width: 2400,
        height: 1800,
        alt: "Balmoral Castle estate exterior in Royal Deeside, Aberdeenshire",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Balmoral Castle: The Sovereign's Highland Sanctuary | The Royal Gallerys",
    description:
      "Inside the private Deeside retreat of the British Monarchy: architecture, tartan heritage, and five generations of royal history.",
    images: ["https://theroyalgallerys.com/images/uk-heritage/balmoral-castle.webp"],
  },
};

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiMxYTFhMWEiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

export default function BalmoralCastlePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Balmoral Castle: The Scottish Baronial Sanctuary of the British Monarchy",
    description:
      "An architectural and cultural exploration of Balmoral Castle in Royal Deeside — examining Prince Albert's granite baronial seat, the royal deer forest, and living sovereign traditions.",
    image: "https://theroyalgallerys.com/images/uk-heritage/balmoral-castle.webp",
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
      "@id": "https://theroyalgallerys.com/travel/balmoral-castle",
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
              <li className="text-[#1A1A1A] font-medium">Balmoral Castle</li>
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
          Royal Estates of Scotland · Sovereign Seat
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#1A1A1A] leading-[1.08] mb-6">
          Balmoral Castle: The Granite Citadel Where the Monarchy Breathes
        </h1>
        <p className="text-lg sm:text-xl font-serif italic text-[#5A5A60] leading-relaxed max-w-2xl mx-auto mb-8">
          From Prince Albert&apos;s 1852 baronial vision to King Charles III&apos;s historic interior public openings — inside the British Royal Family&apos;s private refuge in Royal Deeside.
        </p>

        {/* Fact metadata bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-[#E8E4DB] text-left">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Location</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">Royal Deeside, Aberdeenshire</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Architect</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">William Smith (1853–1856)</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Dynasty</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">House of Windsor / Saxe-Coburg</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Estate Extent</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">50,000 Acres (Royal Forest)</span>
          </div>
        </div>
      </header>

      {/* ════════ FULL-RESOLUTION PHOTOGRAPHIC SPREAD ════════ */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 mb-14">
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#FAF8F4] border border-[#E8E4DB] shadow-sm">
          <Image
            src="/images/uk-heritage/balmoral-castle.webp"
            alt="Balmoral Castle estate exterior with baronial clock tower in Royal Deeside, Aberdeenshire, Scotland"
            fill
            priority
            placeholder="blur"
            blurDataURL={blurDataURL}
            className="object-contain sm:object-cover"
            sizes="(min-width: 1200px) 1152px, 100vw"
          />
        </div>
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#6A6A70] font-sans px-1 gap-1">
          <span>The 80-foot clock tower and Scottish Baronial turrets of Balmoral Castle, constructed in local Glengelder granite.</span>
          <span className="text-[10px] text-[#8A7352] font-medium tracking-wide">Archival Collection · CC BY-SA 4.0</span>
        </div>
      </section>

      {/* ════════ LONG-FORM EDITORIAL NARRATIVE ════════ */}
      <section className="max-w-3xl mx-auto px-6 sm:px-10 pb-20 font-serif leading-[1.8] text-[#2A2A2E] text-base sm:text-lg">
        <div className="space-y-8">
          <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-normal first-letter:float-left first-letter:mr-3 first-letter:text-[#8A7352] first-letter:leading-none">
            When Prince Albert purchased the 50,000-acre Balmoral estate in 1852 for £32,000 without having initially set foot upon it, he commenced a cultural transformation that reshaped European royal leisure for more than a century. The original 15th-century castle, previously leased by Queen Victoria and Albert from the trustees of the Earl Fife since 1848, was judged charming but inadequate for the burgeoning demands of the royal household and government ministers who made the arduous journey north to Royal Deeside.
          </p>

          <p>
            Rather than modifying the existing stone structure, Albert made the bold decision to build anew. He commissioned Aberdeen city architect William Smith to construct a magnificent palace of white Glengelder granite, quarried directly from the hills of the estate. Albert took personal charge of every architectural detail: the 80-foot clock tower crowned with corbelled corner bartizans, the crow-stepped gables, and the pepper-pot turrets revived medieval Scottish Baronial forms through the lens of German Romanticism and Albert&apos;s own memories of Schloss Rosenau in Coburg.
          </p>

          {/* Editorial Pull Quote */}
          <blockquote className="my-10 pl-6 sm:pl-8 border-l-2 border-[#8A7352] font-serif italic text-xl sm:text-2xl text-[#1A1A1A] leading-relaxed">
            &ldquo;All seemed to breathe freedom and peace, and to make one forget the world and its sad turmoils. Balmoral was my dear Albert&apos;s creation, his home, his love.&rdquo;
            <footer className="text-xs uppercase tracking-widest font-sans font-semibold text-[#8A7352] not-italic mt-3">
              — Queen Victoria, Leaves from the Journal of Our Life in the Highlands
            </footer>
          </blockquote>

          <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] pt-4 leading-tight">
            The Balmoral Tartan and Victorian Highland Revival
          </h2>

          <p>
            The construction of Balmoral ignited the Victorian phenomenon that social historians later termed &ldquo;Balmorality&rdquo; — a wholesale embrace of Scottish highland dress, piping, tartan, and sporting traditions by the British establishment. Prince Albert personally designed the Balmoral Tartan in 1853, featuring subtle lilac, black, and red threads woven through a grey granite field reminiscent of Aberdeenshire stone.
          </p>

          <p>
            To this day, the Balmoral Tartan remains the private preserve of the reigning Sovereign and members of the Royal Family. Unlike clan tartans, which may be freely adopted by descendants and supporters, the Balmoral weave cannot be commercially produced or worn by commoners without direct sovereign permission. Inside the castle, Albert wrapped the ballroom, drawing rooms, and private corridors in bespoke tartans, linoleum with tartan motifs, and candelabra fashioned from stag antlers harvested during autumn stalking expeditions in the Cairngorm glens.
          </p>

          <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] pt-4 leading-tight">
            The Living Sovereign Tradition
          </h2>

          <p>
            Across five successive reigns — Victoria, Edward VII, George V, George VI, and Queen Elizabeth II — Balmoral served as the emotional center of the monarchy. For Queen Elizabeth II, who spent every August and September in residence until her peaceful passing here in September 2022, Balmoral was where sovereign ceremony dissolved into informal family life: barbecues at the log cabin in Glen Muick, long walks through purple heather, and the annual Ghillies Ball where royal dukes danced the Eightsome Reel with estate gamekeepers.
          </p>

          <p>
            In 2024, King Charles III marked a historic milestone by opening the private interior state rooms of Balmoral Castle to public guided tours for the very first time since Queen Victoria completed the residence in 1856. Visitors can now experience the entrance vestibule with its life-size marble statue of Prince Albert in Highland garb, the red carpet corridors lined with Landseer oils, and the private library where prime ministers from Lord Palmerston to Winston Churchill were summoned for sovereign audiences.
          </p>
        </div>

        {/* ════════ VISITING & CONNOISSEUR NOTES ════════ */}
        <div className="mt-14 p-8 bg-[#FAF8F4] border border-[#E8E4DB]">
          <span className="text-[10px] uppercase tracking-[0.24em] font-sans font-semibold text-[#8A7352] block mb-2">
            The Connoisseur&apos;s Field Guide
          </span>
          <h3 className="text-xl font-serif text-[#1A1A1A] mb-4">
            Visiting Balmoral &amp; Royal Deeside
          </h3>
          <ul className="space-y-3 text-sm font-sans text-[#5A5A60] leading-relaxed">
            <li>
              <strong className="text-[#1A1A1A]">Seasonal Access:</strong> The castle grounds, gardens, and ballroom exhibitions are traditionally open to visitors from April to early August, prior to the Royal Family&apos;s annual late-summer arrival.
            </li>
            <li>
              <strong className="text-[#1A1A1A]">Interior Tours:</strong> Private interior room tours introduced under King Charles III must be reserved months in advance through the official Balmoral estate office due to strictly capped daily admittance.
            </li>
            <li>
              <strong className="text-[#1A1A1A]">Where to Stay:</strong> Discerning travelers frequently base themselves at The Fife Arms in nearby Braemar (celebrated for its museum-calibre modern art collection and Victorian highland grandeur) or in Edinburgh at <Link href="/travel/the-balmoral" className="text-[#8A7352] underline">The Balmoral</Link> before motoring through the scenic Cairngorms pass.
            </li>
          </ul>
        </div>

        {/* ════════ CROSS NAVIGATION ════════ */}
        <div className="mt-14 pt-8 border-t border-[#E8E4DB] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/travel/royal-estates-scotland"
            className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#8A7352] hover:text-[#1A1A1A] transition-colors"
          >
            ← All Royal Estates of Scotland
          </Link>
          <Link
            href="/travel/palace-of-holyroodhouse"
            className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#1A1A1A] hover:text-[#8A7352] transition-colors"
          >
            Next: Palace of Holyroodhouse →
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
          <p className="text-xs font-sans text-[#6A6A70] mb-6">
            Twice monthly dispatches covering living royal dynasties, private castle restorations, and high-altitude sporting retreats.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </article>
  );
}
