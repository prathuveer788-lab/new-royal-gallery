import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "@/app/components/NewsletterForm";

export const metadata: Metadata = {
  title: "The Most Beautiful Castle Hotels in Scotland: A Connoisseur's Guide | The Royal Gallerys",
  description:
    "From baronial fortress suites in the Scottish Highlands to romantic island keeps on Loch Fyne — the definitive luxury guide to staying in Scotland's living ancestral castles.",
  alternates: {
    canonical: "https://theroyalgallerys.com/travel/castle-hotels-scotland",
  },
  openGraph: {
    title: "The Most Beautiful Castle Hotels in Scotland — The Royal Gallerys",
    description:
      "Inside Scotland's finest living castle hotels: Clan Campbell strongholds, Victorian retreats, and Michelin-starred Highland hospitality.",
    url: "https://theroyalgallerys.com/travel/castle-hotels-scotland",
    siteName: "The Royal Gallerys",
    locale: "en_GB",
    type: "article",
    publishedTime: "2026-10-04T10:00:00Z",
    authors: ["The Royal Gallerys Travel Desk"],
    images: [
      {
        url: "https://theroyalgallerys.com/images/uk-heritage/eilean-donan-castle.webp",
        width: 1920,
        height: 1080,
        alt: "Historic Scottish castle illuminated against the loch waters at dusk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Most Beautiful Castle Hotels in Scotland | The Royal Gallerys",
    description:
      "Inside Scotland's finest living castle hotels: Clan strongholds, baronial towers, and Michelin-starred dining.",
    images: ["https://theroyalgallerys.com/images/uk-heritage/eilean-donan-castle.webp"],
  },
};

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiMxYTFhMWEiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

interface CastleHotel {
  name: string;
  location: string;
  region: string;
  heritageEra: string;
  headline: string;
  description: string;
  architecturalHighlights: string;
  diningNote: string;
  image: string;
  alt: string;
  tariffs: string;
}

const CASTLES: CastleHotel[] = [
  {
    name: "Inverlochy Castle Hotel",
    location: "Torlundy, Fort William",
    region: "Highlands",
    heritageEra: "1863 · Baronial Residence",
    headline: "Where Queen Victoria Found Her Romantic Ideal Beneath Ben Nevis",
    description:
      "In 1873, Queen Victoria spent a week at Inverlochy Castle writing in her journal that she 'never saw a lovelier or more romantic spot.' Built in 1863 by William Scarlett, 3rd Baron Abinger, near the site of the 13th-century fortress, Inverlochy represents the pinnacle of Victorian Scottish Baronial domestic architecture. The Great Hall rises with crystal chandeliers, Venetian glass, and hand-carved oak heraldry, framed against the soaring granite massif of Ben Nevis.",
    architecturalHighlights:
      "Original Italian frescoes, 17th-century French tapestries, ceiling paintings by Bohemian craftsmen, and billiards room with Victorian snooker table.",
    diningNote:
      "Seasgair by Michel Roux Jr. — classical Highland venison, langoustines from Mallaig, and hand-dived scallops served in the Queen's dining room.",
    image: "/images/uk-heritage/inveraray-castle.webp",
    alt: "Inverlochy Castle estate and Highland landscape",
    tariffs: "From £580 to £2,400 per night",
  },
  {
    name: "Glengorm Castle",
    location: "Tobermory, Isle of Mull",
    region: "Inner Hebrides",
    heritageEra: "1860 · Hebridean Fortress",
    headline: "Turrets Clinging to Sea Cliffs Above the North Atlantic",
    description:
      "Standing on the northernmost tip of the Isle of Mull, Glengorm Castle looks out over the Sea of the Hebrides toward the islands of Rum, Eigg, and the Outer Hebrides. Built in 1860 by James Forsyth on the site of ancient standing stones dating back to the Bronze Age, the castle is crowned with crow-stepped gables and round corner turrets. The library features a perpetual fire of Scottish peat, a collection of single malts available on an honor-bar system, and windows framing Atlantic gales in total baronial shelter.",
    architecturalHighlights:
      "Granite masonry quarried from the estate, Hebridean tower rooms with panoramic sea views, and adjacent Neolithic standing stones circle.",
    diningNote:
      "The Glengorm Coffee Shop & Larder serves Highland cattle beef raised on the castle's own 5,000-acre organic coastal estate.",
    image: "/images/uk-heritage/eilean-donan-castle.webp",
    alt: "Glengorm Castle Hebridean sea views and stone turrets",
    tariffs: "From £320 to £950 per night",
  },
  {
    name: "Crossbasket Castle",
    location: "High Blantyre, South Lanarkshire",
    region: "Lowlands / Clyde Valley",
    heritageEra: "15th Century · Tower House",
    headline: "A 600-Year-Old Lindsey Clan Stronghold Reborn as an Architectural Sanctuary",
    description:
      "Dating to the 1430s when it was the fortress of the Lindsey family, Crossbasket Castle is dominated by a majestic four-story medieval stone tower overlooking the rushing waterfalls of the Calder Water. Painstakingly restored from near-ruin over five years by heritage conservationists Steve and Alison Timoney, the castle features gold-leaf cornicing, Renaissance stone archways, and a brand-new £15 million hotel wing.",
    architecturalHighlights:
      "15th-century barrel-vaulted stone chambers, the Lindsay Tower bridal suite spanning four vertical levels, and private river walks through ancient oak woodlands.",
    diningNote:
      "Trocadero's restaurant by Michel Roux Jr. — an opulent grand dining salon celebrating Scottish larder ingredients with French haute cuisine precision.",
    image: "/images/uk-heritage/cliveden-house.webp",
    alt: "Crossbasket Castle riverside estate architecture",
    tariffs: "From £410 to £1,650 per night",
  },
  {
    name: "Fonab Castle Hotel & Spa",
    location: "Pitlochry, Perthshire",
    region: "Perthshire Highlands",
    heritageEra: "1892 · Port-na-Craig Estate",
    headline: "Highland Baronial Elegance on the Shores of Loch Faskally",
    description:
      "Built in 1892 for the Clark family of Paisley — who generated a global fortune from the Scottish spool cotton thread industry — Fonab Castle combines rich red sandstone masonry with Victorian baronial turrets. Nestled amidst towering Douglas firs and weeping willows on the banks of Loch Faskally, the castle offers floor-to-ceiling glass dining terraces that reflect the autumnal Perthshire foliage.",
    architecturalHighlights:
      "Red sandstone oriel windows, baronial spiral staircases, wood-burning stone fireplaces, and modern woodland lodges blending into ancient pines.",
    diningNote:
      "Sandemans Fine Dining (3 AA Rosettes) — 7-course tasting menus paired with rare Scottish single malts from nearby Blair Athol and Edradour distilleries.",
    image: "/images/uk-heritage/gleneagles-hotel.webp",
    alt: "Fonab Castle Perthshire estate lakeside view",
    tariffs: "From £390 to £1,400 per night",
  },
];

export default function CastleHotelsScotlandPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "The Most Beautiful Castle Hotels in Scotland: A Connoisseur's Guide",
    description:
      "From baronial fortress suites in the Scottish Highlands to romantic island keeps on Loch Fyne — the definitive luxury guide to staying in Scotland's living ancestral castles.",
    image: "https://theroyalgallerys.com/images/uk-heritage/eilean-donan-castle.webp",
    datePublished: "2026-10-04T10:00:00Z",
    dateModified: "2026-10-04T10:00:00Z",
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
      "@id": "https://theroyalgallerys.com/travel/castle-hotels-scotland",
    },
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://theroyalgallerys.com" },
      { "@type": "ListItem", position: 2, name: "UK Edition", item: "https://theroyalgallerys.com/uk" },
      {
        "@type": "ListItem",
        position: 3,
        name: "Castle Hotels in Scotland",
        item: "https://theroyalgallerys.com/travel/castle-hotels-scotland",
      },
    ],
  };

  return (
    <article className="min-h-screen bg-[#FBF9F5] text-[#1A1A1A] antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      {/* ════════ HERO SECTION ════════ */}
      <header className="relative min-h-[75vh] sm:min-h-[85vh] flex items-end overflow-hidden bg-[#11110F]">
        <div className="absolute inset-0">
          <Image
            src="/images/uk-heritage/eilean-donan-castle.webp"
            alt="Eilean Donan Castle illuminated on the loch waters in the Scottish Highlands"
            fill
            priority
            placeholder="blur"
            blurDataURL={blurDataURL}
            className="object-cover object-center opacity-85"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#11110F] via-[#11110F]/45 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 pb-16 sm:pb-20 pt-32">
          {/* Breadcrumb nav */}
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-sans text-[#B8A47A]">
              <li>
                <Link href="/" className="hover:underline">Home</Link>
              </li>
              <li className="opacity-40">/</li>
              <li>
                <Link href="/uk" className="hover:underline">UK Edition</Link>
              </li>
              <li className="opacity-40">/</li>
              <li className="text-[#F4F0E7]">Castle Hotels</li>
            </ol>
          </nav>

          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-sans font-semibold text-[#B8A47A] px-3 py-1 border border-[#B8A47A]/30 bg-black/50 backdrop-blur-xs inline-block mb-4">
            Travel · Scotland · Castle Hotels
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#F4F0E7] leading-[1.08] tracking-tight mb-5">
            The Most Beautiful Castle Hotels in Scotland
          </h1>

          <p className="text-lg sm:text-xl font-serif italic text-[#F4F0E7]/85 max-w-2xl leading-relaxed mb-6">
            Where sixteenth-century granite battlements, peat-scented drawing rooms, and Michelin-starred Highland game meet the world&apos;s most romantic landscapes.
          </p>

          <div className="flex items-center gap-4 text-xs font-sans text-[#F4F0E7]/60 pt-4 border-t border-white/15">
            <span>By <strong>The Royal Gallerys Travel Desk</strong></span>
            <span>·</span>
            <span>12 min read</span>
            <span>·</span>
            <span>Updated Autumn 2026</span>
          </div>
        </div>
      </header>

      {/* ════════ INTRO ESSAY ════════ */}
      <div className="max-w-4xl mx-auto px-6 sm:px-10 py-16 sm:py-20 border-b border-[#E8E4DB]">
        <p className="text-xl sm:text-2xl font-serif text-[#1A1A1A] leading-[1.5] mb-6 font-normal">
          To check into a Scottish castle hotel is not simply to book a bedroom; it is to inherit, for a few nights, the psychological weight and aesthetic sanctuary of a clan stronghold.
        </p>

        <p className="text-base sm:text-lg font-sans text-[#5A5A60] leading-relaxed mb-6 font-normal">
          While many of Europe&apos;s historic châteaux have been converted into antiseptic resorts, Scotland&apos;s finest castle hotels retain their ancestral soul. The timber beams remain seasoned by centuries of Highland oak smoke. The library shelves carry nineteenth-century editions of Sir Walter Scott bound in calfskin. And outside the mullioned windows, the weather arrives not as an inconvenience, but as drama — sweeping across heathered moors and lochs of bottomless black water.
        </p>

        <div className="my-10 p-6 sm:p-8 bg-[#F3EFE6] border-l-2 border-[#8A7352]">
          <span className="text-[10px] uppercase tracking-[0.24em] font-sans font-semibold text-[#8A7352] block mb-2">
            The Highland Standard
          </span>
          <p className="font-serif italic text-lg sm:text-xl text-[#1A1A1A] leading-relaxed">
            &ldquo;There is a particular hour in a Scottish castle — after the guns have returned from the moor, when the candles are lit in the sconces and the first peat fire begins to warm the stone — that cannot be replicated anywhere else on earth.&rdquo;
          </p>
        </div>
      </div>

      {/* ════════ DETAILED CASTLE REVIEWS ════════ */}
      <section className="max-w-5xl mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-24">
        {CASTLES.map((castle, idx) => (
          <article
            key={castle.name}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start border-b border-[#E8E4DB] pb-20"
          >
            {/* Visual side */}
            <div className="lg:col-span-6 sticky top-24">
              <div className="relative aspect-[4/3] overflow-hidden shadow-sm bg-[#11110F] mb-4">
                <Image
                  src={castle.image}
                  alt={castle.alt}
                  fill
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <span className="absolute bottom-3 left-3 text-[9px] uppercase tracking-[0.2em] font-sans font-medium px-2.5 py-1 bg-black/75 text-[#F4F0E7]">
                  {castle.heritageEra}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-sans text-[#6A6A70] px-1">
                <span>{castle.location}</span>
                <span className="font-semibold text-[#8A7352]">{castle.tariffs}</span>
              </div>
            </div>

            {/* Content side */}
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-3">
                <span className="text-sm font-serif italic text-[#8A7352]">
                  No. {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-[10px] uppercase tracking-[0.24em] font-sans text-[#6A6A70]">
                  {castle.region}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] leading-tight font-normal">
                {castle.name}
              </h2>

              <p className="font-serif italic text-lg text-[#8A7352] leading-snug">
                {castle.headline}
              </p>

              <p className="text-sm sm:text-base font-sans text-[#5A5A60] leading-relaxed">
                {castle.description}
              </p>

              {/* Architectural details box */}
              <div className="bg-[#FAF8F4] border border-[#E8E4DB] p-5 space-y-3">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-sans font-semibold text-[#1A1A1A] block">
                    Architectural Distinction
                  </span>
                  <p className="text-xs font-sans text-[#6A6A70] mt-1 leading-relaxed">
                    {castle.architecturalHighlights}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E8E4DB]">
                  <span className="text-[10px] uppercase tracking-wider font-sans font-semibold text-[#1A1A1A] block">
                    The Culinary Table
                  </span>
                  <p className="text-xs font-sans text-[#6A6A70] mt-1 leading-relaxed">
                    {castle.diningNote}
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/uk"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#8A7352] hover:text-[#1A1A1A] transition-colors"
                >
                  Explore in UK Hub →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* ════════ CROSS-LINKING & RELATED GUIDES ════════ */}
      <section className="py-20 bg-[#F3EFE6] border-t border-[#E8E4DB] px-6 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-[0.28em] font-sans font-semibold text-[#8A7352] block mb-2">
              Related Scottish &amp; British Features
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A]">
              Continue Exploring British Heritage
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/travel/the-balmoral" className="group block bg-[#FBF9F5] p-6 border border-[#E8E4DB] hover:border-[#8A7352] transition-colors">
              <span className="text-[9px] uppercase tracking-wider font-sans text-[#8A7352] font-semibold block mb-2">
                Grande Dame · Edinburgh
              </span>
              <h4 className="text-xl font-serif text-[#1A1A1A] group-hover:text-[#8A7352] transition-colors mb-2">
                The Balmoral: Three Minutes Ahead of Edinburgh
              </h4>
              <p className="text-xs font-sans text-[#6A6A70] leading-relaxed">
                The landmark clock tower hotel at No. 1 Princes Street presiding over the capital.
              </p>
            </Link>

            <Link href="/travel/scottish-highlands-travel-guide" className="group block bg-[#FBF9F5] p-6 border border-[#E8E4DB] hover:border-[#8A7352] transition-colors">
              <span className="text-[9px] uppercase tracking-wider font-sans text-[#8A7352] font-semibold block mb-2">
                Wilderness Guide · Scotland
              </span>
              <h4 className="text-xl font-serif text-[#1A1A1A] group-hover:text-[#8A7352] transition-colors mb-2">
                The Scottish Highlands: Ancient Castles &amp; Speyside Malts
              </h4>
              <p className="text-xs font-sans text-[#6A6A70] leading-relaxed">
                Speyside single malt distilleries, Glen Coe passes, and North Coast 500 routes.
              </p>
            </Link>

            <Link href="/uk" className="group block bg-[#FBF9F5] p-6 border border-[#E8E4DB] hover:border-[#8A7352] transition-colors">
              <span className="text-[9px] uppercase tracking-wider font-sans text-[#8A7352] font-semibold block mb-2">
                Topical Authority Hub
              </span>
              <h4 className="text-xl font-serif text-[#1A1A1A] group-hover:text-[#8A7352] transition-colors mb-2">
                The Royal Gallerys UK: British Heritage &amp; Luxury
              </h4>
              <p className="text-xs font-sans text-[#6A6A70] leading-relaxed">
                Explore royal residences, country estates, architecture, and luxury travel across Britain.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════ NEWSLETTER ════════ */}
      <section className="py-20 px-6 sm:px-10 bg-[#FBF9F5] text-center border-t border-[#E8E4DB]">
        <div className="max-w-md mx-auto">
          <span className="text-[10px] uppercase tracking-[0.24em] font-sans font-semibold text-[#8A7352] block mb-2">
            The Edinburgh &amp; Highland Letters
          </span>
          <h4 className="text-2xl font-serif text-[#1A1A1A] mb-4">
            Receive Private Castle Invitations
          </h4>
          <NewsletterForm />
        </div>
      </section>
    </article>
  );
}
