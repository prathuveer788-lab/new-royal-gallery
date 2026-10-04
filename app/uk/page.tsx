import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "@/app/components/NewsletterForm";

export const metadata: Metadata = {
  title: "British Heritage & Luxury Travel: Estates, Castles & Culture | The Royal Gallerys UK",
  description:
    "The Royal Gallerys UK edition — authoritative international journalism on British royalty, Scottish castle hotels, grand English country houses, Edinburgh heritage, and the historic ties connecting Britain and the world.",
  alternates: {
    canonical: "https://theroyalgallerys.com/uk",
  },
  openGraph: {
    title: "British Heritage & Luxury Travel — The Royal Gallerys UK",
    description:
      "Authoritative international journalism on British royalty, Scottish castle hotels, historic country estates, and living culture.",
    url: "https://theroyalgallerys.com/uk",
    siteName: "The Royal Gallerys",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://theroyalgallerys.com/images/uk-heritage/balmoral-castle.webp",
        width: 1920,
        height: 1080,
        alt: "Balmoral Castle estate in Royal Deeside, Aberdeenshire, Scotland",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "British Heritage & Luxury Travel — The Royal Gallerys UK",
    description:
      "Authoritative international journalism on British royalty, Scottish castles, country houses, and luxury heritage.",
    images: ["https://theroyalgallerys.com/images/uk-heritage/balmoral-castle.webp"],
  },
};

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiMxYTFhMWEiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

interface FeatureCard {
  href: string;
  category: string;
  title: string;
  dek: string;
  image: string;
  location: string;
  readTime: string;
}

const FLAGSHIP_STORIES: FeatureCard[] = [
  {
    href: "/travel/the-balmoral",
    category: "Grande Dame Hotel · Scotland",
    title: "The Balmoral, Edinburgh: Three Minutes Ahead of the City",
    dek: "Inside Edinburgh's landmark railway hotel at No. 1 Princes Street. Architecture, the Palm Court afternoon tea ritual, Bowes-Lyon family suites, and a century of Scottish heritage.",
    image: "/assets/images/balmoral/balmoral-exterior-hero.jpg",
    location: "Edinburgh, Scotland",
    readTime: "14 min read",
  },
  {
    href: "/travel/edinburgh-travel-guide",
    category: "City Guide · Scotland",
    title: "Edinburgh: The Athens of the North — Volcanic Crags & Georgian Crescents",
    dek: "From the medieval wynds of Mary King's Close to the Neoclassical Enlightenment symmetry of the New Town — an insider's luxury pilgrimage through Scotland's capital.",
    image: "/images/experiences/31-edinburgh/img-01.webp",
    location: "Lothian, Scotland",
    readTime: "16 min read",
  },
  {
    href: "/travel/scottish-highlands-travel-guide",
    category: "Wilderness & Estates · Scotland",
    title: "The Scottish Highlands: Ancient Castles, Speyside Malts & Sporting Estates",
    dek: "From Glen Coe's dramatic passes to the private sporting lodges of Royal Deeside and the North Coast 500 — encountering the wildest romantic landscape in Britain.",
    image: "/images/experiences/32-scottish-highlands/img-01.webp",
    location: "Highlands, Scotland",
    readTime: "16 min read",
  },
  {
    href: "/travel/london-travel-guide",
    category: "Capital Feature · England",
    title: "London: Mayfair Palaces, St James's Galleries & The Royal Parks",
    dek: "Two millennia of continuous history seen through its most refined institutions — from Claridge's and the Connaught to bespoke Savile Row tailoring and private member salons.",
    image: "/images/experiences/29-london/img-01.webp",
    location: "London, England",
    readTime: "17 min read",
  },
  {
    href: "/travel/castle-hotels-scotland",
    category: "Castle Hotels · Scotland",
    title: "The Most Beautiful Castle Hotels in Scotland: A Connoisseur's Guide",
    dek: "From baronial fortress suites in Fort William to Hebridean towers on Mull and 15th-century clan strongholds — where living heritage meets world-class dining.",
    image: "/images/uk-heritage/eilean-donan-castle.webp",
    location: "Highlands & Hebrides",
    readTime: "12 min read",
  },
];

const CURATED_CLUSTERS = [
  {
    title: "The Great Royal Estates of Scotland",
    tagline: "Balmoral, Holyroodhouse & Highland Sovereign Sanctuaries",
    description:
      "Since Queen Victoria and Prince Albert acquired Balmoral in 1852, Royal Deeside has stood as the private refuge of the British Crown. We examine the architecture, the baronial turrets of William Smith, the royal deer forests, and the surviving cultural traditions that make Scotland the spiritual home of British royal leisure.",
    image: "/images/uk-heritage/balmoral-castle.webp",
    alt: "Balmoral Castle estate exterior, Scotland",
    items: [
      {
        title: "Balmoral Castle: The Crown's Highland Refuge",
        location: "Royal Deeside, Aberdeenshire",
        note: "Prince Albert's granite Scottish Baronial masterpiece",
      },
      {
        title: "The Palace of Holyroodhouse: Sovereign Seat in Edinburgh",
        location: "Canongate, Edinburgh",
        note: "From Mary, Queen of Scots to the modern Royal Week ceremony",
      },
      {
        title: "The Castle of Mey: Queen Elizabeth The Queen Mother's Caithness Haven",
        location: "Caithness, Northern Scotland",
        note: "A 16th-century fortress restored overlooking the Pentland Firth",
      },
    ],
  },
  {
    title: "Britain's Grandest Historic Country Houses",
    tagline: "Chatsworth, Highclere, Blenheim & Architectural Patronage",
    description:
      "The English country house represents one of the world's highest expressions of domestic architecture, landscape design, and hereditary art collection. From Capability Brown's sweeping parklands to Grinling Gibbons's woodcarvings, these living estates remain custodians of European artistic civilization.",
    image: "/images/uk-heritage/highclere-castle.webp",
    alt: "Highclere Castle estate, Hampshire, England",
    items: [
      {
        title: "Highclere Castle: The Earl of Carnarvon & Egyptological Legacy",
        location: "Hampshire, England",
        note: "Sir Charles Barry's Jacobethan masterpiece and the Tutankhamun archives",
      },
      {
        title: "Chatsworth House: The Palace of the Peak",
        location: "Derbyshire, England",
        note: "Sixteen generations of Devonshire art, sculpture, and Duke patronage",
      },
      {
        title: "Blenheim Palace: England's Only Non-Royal Baroque Palace",
        location: "Woodstock, Oxfordshire",
        note: "Sir John Vanbrugh's monument to the 1st Duke of Marlborough and Sir Winston Churchill's birthplace",
      },
    ],
  },
  {
    title: "The Castle Hotels of Scotland",
    tagline: "Living Baronial Grandeur & Modern Highland Hospitality",
    description:
      "Few travel experiences equal crossing a stone drawbridge at twilight to sleep beneath seventeenth-century timber ceilings with a peat fire burning in the hearth. We catalog Scotland's most authentic castle hotels, where ancestral clan heritage meets world-class contemporary dining.",
    image: "/images/uk-heritage/eilean-donan-castle.webp",
    alt: "Eilean Donan Castle, Western Highlands, Scotland",
    items: [
      {
        title: "Inverlochy Castle: Beneath the Shadow of Ben Nevis",
        location: "Fort William, Highlands",
        note: "Where Queen Victoria wrote in her journal: 'I never saw a lovelier or more romantic spot'",
      },
      {
        title: "Inveraray Castle: The Ancestral Seat of Clan Campbell",
        location: "Argyll & Bute, Scotland",
        note: "Gothic Revival elegance on the tranquil shores of Loch Fyne",
      },
      {
        title: "Gleneagles Hotel: The Glorious Playground in the Perthshire Hills",
        location: "Auchterarder, Perthshire",
        note: "A century of championship sporting pursuits, equestrianism, and Michelin dining",
      },
    ],
  },
  {
    title: "Britain & India: Living Heritage Connections",
    tagline: "Shared Architecture, Royal Polo, Bespoke Tailoring & Palace Grandeur",
    description:
      "The cultural dialogue between Britain and India over three centuries transformed both nations' architecture, equestrian sports, ceremonial style, and luxury commerce. From the Indo-Saracenic palaces designed by British architects to Savile Row's enduring relationship with Indian royal houses, we document the living ties.",
    image: "/images/uk-heritage/windsor-castle.webp",
    alt: "Windsor Castle Upper Ward Quadrangle, Berkshire",
    items: [
      {
        title: "The Durbar of Goodwood: Rolls-Royce & Indian Princely Commissions",
        location: "Goodwood, West Sussex",
        note: "Over 800 bespoke chassis shipped from Derby and Goodwood to Indian royal courts",
      },
      {
        title: "Savile Row to Jodhpur: The Satorial Journey of the Riding Trouser",
        location: "Mayfair, London",
        note: "How Sir Pratap Singh introduced desert riding trousers to Queen Victoria's court in 1897",
      },
      {
        title: "The Single Malt Dialogue: Scotland's Highland Stills & Indian Terroir",
        location: "Speyside & Bengaluru",
        note: "A technical examination of rapid maturation, oak casks, and world whisky acclaim",
      },
    ],
  },
];

export default function UKLandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "The Royal Gallerys UK — British Heritage, Royalty, Luxury Travel & Culture",
    description:
      "Authoritative international journalism on British royalty, Scottish castles, country houses, luxury hotels, and living culture.",
    url: "https://theroyalgallerys.com/uk",
    publisher: {
      "@type": "Organization",
      name: "The Royal Gallerys",
      url: "https://theroyalgallerys.com",
    },
    about: [
      { "@type": "Thing", name: "British Royalty" },
      { "@type": "Thing", name: "Scottish Castles" },
      { "@type": "Thing", name: "English Country Houses" },
      { "@type": "Thing", name: "Luxury Travel in the United Kingdom" },
      { "@type": "Thing", name: "Heritage Hotels Scotland" },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1A1A1A] antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ════════ HERO SECTION ════════ */}
      <section className="relative min-h-[85vh] sm:min-h-[92vh] flex items-end overflow-hidden bg-[#11110F]">
        <div className="absolute inset-0">
          <Image
            src="/images/uk-heritage/balmoral-castle.webp"
            alt="Balmoral Castle estate in Royal Deeside, Aberdeenshire, Scotland"
            fill
            priority
            placeholder="blur"
            blurDataURL={blurDataURL}
            className="object-cover object-center opacity-85"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#11110F] via-[#11110F]/40 to-[#11110F]/20" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-16 sm:pb-24 pt-36">
          <div className="max-w-3xl">
            {/* Rubric */}
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.32em] font-sans font-semibold text-[#B8A47A] px-3 py-1.5 border border-[#B8A47A]/30 bg-[#11110F]/60 backdrop-blur-sm">
                United Kingdom Edition · Living Heritage
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#F4F0E7] leading-[1.04] tracking-tight mb-6">
              British Heritage &amp; Luxury, Through an International Lens
            </h1>

            {/* Dek */}
            <p className="text-lg sm:text-xl lg:text-2xl font-serif italic text-[#F4F0E7]/85 leading-relaxed mb-8">
              From Royal Deeside and the volcanic crags of Edinburgh to the great country estates of England — documenting the architectural, aristocratic and cultural institutions that shape living British heritage.
            </p>

            {/* Quick jump tags */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-sans text-[#F4F0E7]/70">
              <span className="text-[#B8A47A] uppercase tracking-widest text-[10px] font-semibold">Explore:</span>
              <a href="#flagship-features" className="hover:text-[#B8A47A] transition-colors border-b border-[#F4F0E7]/25 pb-0.5">Flagship Features</a>
              <span className="text-[#F4F0E7]/30">·</span>
              <a href="#royal-estates" className="hover:text-[#B8A47A] transition-colors border-b border-[#F4F0E7]/25 pb-0.5">Royal Estates</a>
              <span className="text-[#F4F0E7]/30">·</span>
              <a href="#country-houses" className="hover:text-[#B8A47A] transition-colors border-b border-[#F4F0E7]/25 pb-0.5">Country Houses</a>
              <span className="text-[#F4F0E7]/30">·</span>
              <a href="#castle-hotels" className="hover:text-[#B8A47A] transition-colors border-b border-[#F4F0E7]/25 pb-0.5">Castle Hotels</a>
              <span className="text-[#F4F0E7]/30">·</span>
              <a href="#britain-india" className="hover:text-[#B8A47A] transition-colors border-b border-[#F4F0E7]/25 pb-0.5">Britain &amp; India</a>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ EDITORIAL STATEMENT ════════ */}
      <section className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 bg-[#FBF9F5] border-b border-[#E8E4DB]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-sans font-semibold text-[#8A7352] block mb-4">
            The Royal Gallerys · London &amp; Edinburgh Bureaux
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-[#1A1A1A] leading-[1.2] mb-8 font-normal">
            &ldquo;Britain does not merely preserve history; it inhabits it. In the rhythm of its country estates, the ceremony of its courts, and the quiet dignity of its ancient stone, heritage remains a living discipline.&rdquo;
          </h2>
          <div className="w-16 h-px bg-[#8A7352]/40 mx-auto" />
        </div>
      </section>

      {/* ════════ FLAGSHIP FEATURES GRID ════════ */}
      <section id="flagship-features" className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-6 border-b border-[#E8E4DB] gap-4">
          <div>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-sans font-semibold text-[#8A7352] block mb-2">
              Featured Editorials
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1A1A1A]">
              Essential Reading on British Heritage
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-[#6A6A70] max-w-md">
            Authoritative, long-form travel and architecture features curated for the discerning international heritage traveler.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {FLAGSHIP_STORIES.map((story) => (
            <article
              key={story.href}
              className="group flex flex-col justify-between border-b border-[#E8E4DB] pb-10"
            >
              <div>
                <Link href={story.href} className="block relative aspect-[16/10] overflow-hidden mb-6 bg-[#11110F]">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-[9px] uppercase tracking-[0.24em] font-sans font-medium px-2.5 py-1 bg-black/70 backdrop-blur-xs text-[#F4F0E7] border border-white/15">
                      {story.location}
                    </span>
                  </div>
                </Link>

                <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider font-sans text-[#8A7352] mb-3 font-semibold">
                  <span>{story.category}</span>
                  <span className="text-[#C8C4BA]">·</span>
                  <span className="text-[#6A6A70]">{story.readTime}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] group-hover:text-[#8A7352] transition-colors leading-[1.18] mb-3">
                  <Link href={story.href}>{story.title}</Link>
                </h3>

                <p className="text-sm sm:text-base font-sans text-[#5A5A60] leading-relaxed mb-6 font-normal">
                  {story.dek}
                </p>
              </div>

              <div>
                <Link
                  href={story.href}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#1A1A1A] group-hover:text-[#8A7352] transition-colors"
                >
                  Read Editorial Feature
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ════════ THEMATIC EDITORIAL CLUSTERS ════════ */}
      {CURATED_CLUSTERS.map((cluster, idx) => {
        const isReversed = idx % 2 === 1;
        const sectionId = cluster.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        return (
          <section
            key={cluster.title}
            id={sectionId}
            className={`py-20 sm:py-28 px-6 sm:px-10 lg:px-16 ${
              idx % 2 === 0 ? "bg-[#F3EFE6]" : "bg-[#FBF9F5]"
            } border-t border-[#E8E4DB]`}
          >
            <div className="max-w-7xl mx-auto">
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                  isReversed ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Visual side */}
                <div className={`lg:col-span-6 ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="relative aspect-[4/3] overflow-hidden shadow-sm bg-[#11110F]">
                    <Image
                      src={cluster.image}
                      alt={cluster.alt}
                      fill
                      placeholder="blur"
                      blurDataURL={blurDataURL}
                      className="object-cover"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                  </div>
                </div>

                {/* Text / Index side */}
                <div className={`lg:col-span-6 ${isReversed ? "lg:order-1" : "lg:order-2"}`}>
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-sans font-semibold text-[#8A7352] block mb-2">
                    {cluster.tagline}
                  </span>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1A1A1A] leading-[1.1] mb-6">
                    {cluster.title}
                  </h3>
                  <p className="text-sm sm:text-base font-sans text-[#5A5A60] leading-relaxed mb-8">
                    {cluster.description}
                  </p>

                  <div className="space-y-5 border-t border-[#DCD6C9] pt-6">
                    {cluster.items.map((item, itemIdx) => (
                      <div key={item.title} className="flex items-start gap-4">
                        <span className="text-xs font-serif italic text-[#8A7352] pt-0.5">
                          {String(itemIdx + 1).padStart(2, "0")}.
                        </span>
                        <div>
                          <h4 className="text-base sm:text-lg font-serif font-medium text-[#1A1A1A]">
                            {item.title}
                          </h4>
                          <p className="text-xs font-sans text-[#6A6A70] mt-0.5">
                            <span className="font-medium text-[#8A7352]">{item.location}</span> — {item.note}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ════════ INDIA × BRITAIN HISTORIC DIALOGUE CALLOUT ════════ */}
      <section id="britain-india" className="py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-[#11110F] text-[#F4F0E7]">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.36em] font-sans font-semibold text-[#B8A47A] block mb-4">
            Cross-Cultural Editorial Dialogue
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#F4F0E7] leading-[1.08] mb-8 font-normal">
            From Scottish Castles to Rajput Palaces: The Shared Language of Living Heritage
          </h2>
          <p className="text-base sm:text-lg lg:text-xl font-serif italic text-[#F4F0E7]/80 max-w-3xl mx-auto leading-relaxed mb-12">
            The Royal Gallerys bridges the aristocratic traditions of the British Isles and the Indian subcontinent — exploring how family estates, equestrian traditions, and centuries of architectural patronage continue to inspire the modern luxury traveler.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/travel"
              className="px-8 py-4 text-xs uppercase tracking-[0.22em] font-sans font-semibold bg-[#B8A47A] text-[#11110F] hover:bg-[#F4F0E7] transition-colors"
            >
              Explore Palace Hotels
            </Link>
            <Link
              href="/royalty"
              className="px-8 py-4 text-xs uppercase tracking-[0.22em] font-sans font-semibold border border-[#B8A47A]/50 text-[#F4F0E7] hover:border-[#F4F0E7] transition-colors"
            >
              Royal Houses &amp; Dynasties
            </Link>
          </div>
        </div>
      </section>

      {/* ════════ NEWSLETTER / EDITORIAL OFFICE ════════ */}
      <section className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 bg-[#FBF9F5] border-t border-[#E8E4DB]">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-sans font-semibold text-[#8A7352] block mb-2">
            The London &amp; Edinburgh Letters
          </span>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#1A1A1A] mb-4">
            Curated Heritage Dispatches for UK Members
          </h3>
          <p className="text-sm font-sans text-[#5A5A60] mb-8 max-w-xl mx-auto">
            Private invitations to castle hotel openings, country house retrospectives, and rare photographic folios delivered bi-weekly.
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
