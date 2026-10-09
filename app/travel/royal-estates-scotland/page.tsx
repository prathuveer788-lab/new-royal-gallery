import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "@/app/components/NewsletterForm";

export const metadata: Metadata = {
  title: "The Great Royal Estates of Scotland: Balmoral, Holyroodhouse & Mey | The Royal Gallerys",
  description:
    "An authoritative architectural and historical exploration of Scotland's sovereign retreats — from Prince Albert's granite baronial seat in Royal Deeside to the Palace of Holyroodhouse and the Queen Mother's Castle of Mey.",
  alternates: {
    canonical: "https://theroyalgallerys.com/travel/royal-estates-scotland",
  },
  openGraph: {
    title: "The Great Royal Estates of Scotland — The Royal Gallerys",
    description:
      "Inside the private Highland retreats of the British Monarchy: Balmoral Castle, Holyroodhouse, and the Castle of Mey.",
    url: "https://theroyalgallerys.com/travel/royal-estates-scotland",
    siteName: "The Royal Gallerys",
    locale: "en_GB",
    type: "article",
    publishedTime: "2026-10-04T10:00:00Z",
    authors: ["The Royal Gallerys Editorial"],
    images: [
      {
        url: "https://theroyalgallerys.com/assets/images/balmoral/balmoral-exterior-hero.jpg",
        width: 2000,
        height: 1500,
        alt: "The Scottish baronial clock tower and granite facade of The Balmoral and Edinburgh skyline",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Great Royal Estates of Scotland | The Royal Gallerys",
    description:
      "Balmoral, Holyroodhouse, and the Castle of Mey: The living heritage of British sovereign sanctuaries in Scotland.",
    images: ["https://theroyalgallerys.com/assets/images/balmoral/balmoral-exterior-hero.jpg"],
  },
};

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiMxYTFhMWEiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

interface RoyalEstate {
  name: string;
  location: string;
  monarchHeritage: string;
  architecturalStyle: string;
  headline: string;
  narrative: string;
  keyFeature: string;
  image: string;
  alt: string;
  href: string;
}

const ESTATES: RoyalEstate[] = [
  {
    name: "Balmoral Castle",
    location: "Royal Deeside, Aberdeenshire",
    monarchHeritage: "Acquired 1852 by Prince Albert & Queen Victoria",
    architecturalStyle: "Scottish Baronial in Glengelder Granite",
    headline: "The Private Granite Citadel Where the British Sovereign Breathes",
    narrative:
      "When Prince Albert purchased the 50,000-acre Balmoral estate in 1852 for £32,000 without having initially set eyes on it, he commenced a transformation that reshaped European royal leisure. Deeming the original 15th-century castle insufficient for the royal household, Albert collaborated with Aberdeen city architect William Smith to construct a new Scottish Baronial palace of pale Glengelder granite. Its 80-foot clock tower, corbelled corner bartizans, and crow-stepped gables revived medieval Scots forms through the prism of German Romanticism. For five generations of British monarchs, Balmoral has served not as a state stage, but as an intimate family sanctuary.",
    keyFeature:
      "The Balmoral Tartan designed by Prince Albert in 1853, exclusively reserved for the reigning monarch and members of the Royal Family.",
    image: "/images/uk-heritage/balmoral-castle.webp",
    alt: "Balmoral Castle estate exterior with clock tower in Royal Deeside, Aberdeenshire",
    href: "/travel/balmoral-castle",
  },
  {
    name: "The Palace of Holyroodhouse",
    location: "Canongate, Edinburgh",
    monarchHeritage: "Official Scottish Residence of the British Monarch",
    architecturalStyle: "Classical Quadrangle by Sir William Bruce (1671–1679)",
    headline: "The Seat of Mary, Queen of Scots at the Foot of the Royal Mile",
    narrative:
      "Standing at the eastern terminal of Edinburgh's historic Royal Mile beneath Salisbury Crags, the Palace of Holyroodhouse originated as an Augustinian abbey founded in 1128 by King David I. In the early 16th century, James IV transformed the guesthouse into a royal palace. It was here that Mary, Queen of Scots lived out the most tempestuous episodes of her reign, including the assassination of David Rizzio in her private supper chamber. Rebuilt under Charles II by Sir William Bruce into a harmonious Baroque quadrangle with Doric and Ionic pilasters, Holyroodhouse remains the vibrant center of the Sovereign's official 'Royal Week' in Scotland each summer.",
    keyFeature:
      "The Great Gallery, hung with 110 portraits of Scottish monarchs painted between 1684 and 1686 by Dutch artist Jacob de Wet II.",
    image: "/images/uk-heritage/holyroodhouse.webp",
    alt: "Palace of Holyroodhouse grand facade and historic courtyard fountain in Edinburgh",
    href: "/travel/palace-of-holyroodhouse",
  },
  {
    name: "The Castle of Mey",
    location: "Caithness, Northern Highlands",
    monarchHeritage: "Private Residence of Queen Elizabeth The Queen Mother (1952–2002)",
    architecturalStyle: "16th-Century Z-Plan Baronial Tower House",
    headline: "The Queen Mother's Fortress Against the Pentland Firth",
    narrative:
      "In 1952, shortly following the death of King George VI, Queen Elizabeth The Queen Mother was visiting friends in northern Scotland when she saw the derelict Barrogill Castle perched six miles west of John o' Groats. Overlooking the turbulent tides of the Pentland Firth toward the Orkney Islands, the 16th-century stronghold had fallen into near-total abandonment. The Queen Mother purchased the estate, restored its original historic name of the Castle of Mey, and created a haven of walled gardens, rare hybrid roses, and Scottish tweed interiors. The estate is now stewarded by The King's Foundation, continuing her legacy of rural craftsmanship and Highland hospitality.",
    keyFeature:
      "The two-acre Walled Garden, ingeniously protected from North Sea gales by high stone ramparts and thriving with English roses, sweet peas, and vegetables.",
    image: "/images/uk-heritage/castle-of-mey.webp",
    alt: "The Castle of Mey coastal fortress and grounds overlooking the Pentland Firth in Caithness",
    href: "/travel/castle-of-mey",
  },
];

export default function RoyalEstatesScotlandPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "The Great Royal Estates of Scotland: Balmoral, Holyroodhouse & Mey",
    description:
      "An authoritative architectural and historical exploration of Scotland's sovereign retreats — from Prince Albert's granite seat in Royal Deeside to Holyroodhouse and the Castle of Mey.",
    image: "https://theroyalgallerys.com/assets/images/balmoral/balmoral-exterior-hero.jpg",
    datePublished: "2026-10-04T10:00:00Z",
    dateModified: "2026-10-04T10:00:00Z",
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
      "@id": "https://theroyalgallerys.com/travel/royal-estates-scotland",
    },
  };

  return (
    <article className="min-h-screen bg-[#FBF9F5] text-[#1A1A1A] antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ════════ HERO ════════ */}
      <header className="relative min-h-[75vh] sm:min-h-[85vh] flex items-end overflow-hidden bg-[#11110F]">
        <div className="absolute inset-0">
          <Image
            src="/assets/images/balmoral/balmoral-exterior-hero.jpg"
            alt="The Scottish baronial clock tower and granite facade in Edinburgh overlooking Princes Street"
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
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-sans text-[#B8A47A]">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li className="opacity-40">/</li>
              <li><Link href="/uk" className="hover:underline">UK Edition</Link></li>
              <li className="opacity-40">/</li>
              <li className="text-[#F4F0E7]">Royal Estates</li>
            </ol>
          </nav>

          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-sans font-semibold text-[#B8A47A] px-3 py-1 border border-[#B8A47A]/30 bg-black/50 backdrop-blur-xs inline-block mb-4">
            Living Heritage · Scotland · Royal Residences
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#F4F0E7] leading-[1.08] tracking-tight mb-5">
            The Great Royal Estates of Scotland
          </h1>

          <p className="text-lg sm:text-xl font-serif italic text-[#F4F0E7]/85 max-w-2xl leading-relaxed mb-6">
            Balmoral, Holyroodhouse, and the Castle of Mey: The architecture, private rituals, and living history of the British Crown in Scotland.
          </p>

          <div className="flex items-center gap-4 text-xs font-sans text-[#F4F0E7]/60 pt-4 border-t border-white/15">
            <span>By <strong>The Royal Gallerys Editorial</strong></span>
            <span>·</span>
            <span>15 min read</span>
            <span>·</span>
            <span>Autumn 2026</span>
          </div>
        </div>
      </header>

      {/* ════════ EDITORIAL ESSAY ════════ */}
      <div className="max-w-4xl mx-auto px-6 sm:px-10 py-16 sm:py-20 border-b border-[#E8E4DB]">
        <p className="text-xl sm:text-2xl font-serif text-[#1A1A1A] leading-[1.5] mb-6 font-normal">
          In Scotland, the British Monarchy undergoes a profound psychological transformation. Stripped of the neoclassical protocol of London&apos;s palaces, sovereign life reconnects with landscape, clan culture, and architectural tradition.
        </p>

        <p className="text-base sm:text-lg font-sans text-[#5A5A60] leading-relaxed mb-6">
          Ever since Queen Victoria declared Royal Deeside &ldquo;my dear paradise in the Highlands,&rdquo; Scotland has functioned not as an outpost of royal duty, but as its private heart. Here, the Sovereign wears tweed and kilt, stalks deer across heathered corries, and participates in highland gatherings that have survived for centuries.
        </p>
      </div>

      {/* ════════ ESTATES PROFILES ════════ */}
      <section className="max-w-5xl mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-24">
        {ESTATES.map((estate, idx) => (
          <article
            key={estate.name}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start border-b border-[#E8E4DB] pb-20"
          >
            <div className="lg:col-span-6 sticky top-24">
              <div className="relative aspect-[4/3] overflow-hidden shadow-sm bg-[#11110F] mb-4">
                <Image
                  src={estate.image}
                  alt={estate.alt}
                  fill
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <div className="text-xs font-sans text-[#6A6A70]">
                <span className="font-semibold text-[#8A7352]">{estate.location}</span> · {estate.architecturalStyle}
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <span className="text-sm font-serif italic text-[#8A7352]">
                Estate {String(idx + 1).padStart(2, "0")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] leading-tight font-normal">
                {estate.name}
              </h2>
              <p className="font-serif italic text-lg text-[#8A7352] leading-snug">
                {estate.headline}
              </p>
              <p className="text-sm sm:text-base font-sans text-[#5A5A60] leading-relaxed">
                {estate.narrative}
              </p>

              <div className="bg-[#FAF8F4] border border-[#E8E4DB] p-5">
                <span className="text-[10px] uppercase tracking-wider font-sans font-semibold text-[#1A1A1A] block mb-1">
                  Historical Signature
                </span>
                <p className="text-xs font-sans text-[#6A6A70] leading-relaxed">
                  {estate.keyFeature}
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-6">
                <Link
                  href={estate.href}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#1A1A1A] hover:text-[#8A7352] transition-colors border-b border-[#1A1A1A] pb-0.5"
                >
                  Read Full Dedicated Feature →
                </Link>
                <Link
                  href="/uk"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#8A7352] hover:text-[#1A1A1A] transition-colors"
                >
                  UK Hub
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* ════════ CROSS-NAVIGATION ════════ */}
      <section className="py-20 bg-[#F3EFE6] border-t border-[#E8E4DB] px-6 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-[10px] uppercase tracking-[0.28em] font-sans font-semibold text-[#8A7352] block mb-2">
            The Royal Gallerys Editorial
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] mb-8">
            Explore More British &amp; Scottish Heritage
          </h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/travel/the-balmoral"
              className="px-6 py-3 bg-[#FAF8F4] border border-[#D9D4CA] text-xs uppercase tracking-wider font-sans font-medium hover:border-[#8A7352] transition-colors"
            >
              The Balmoral Edinburgh →
            </Link>
            <Link
              href="/travel/castle-hotels-scotland"
              className="px-6 py-3 bg-[#FAF8F4] border border-[#D9D4CA] text-xs uppercase tracking-wider font-sans font-medium hover:border-[#8A7352] transition-colors"
            >
              Castle Hotels in Scotland →
            </Link>
            <Link
              href="/uk"
              className="px-6 py-3 bg-[#8A7352] text-[#FAF8F4] text-xs uppercase tracking-wider font-sans font-medium hover:bg-[#1A1A1A] transition-colors"
            >
              The UK Authority Hub →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 sm:px-10 bg-[#FBF9F5] text-center border-t border-[#E8E4DB]">
        <div className="max-w-md mx-auto">
          <span className="text-[10px] uppercase tracking-[0.24em] font-sans font-semibold text-[#8A7352] block mb-2">
            The Sovereign Dispatches
          </span>
          <h4 className="text-2xl font-serif text-[#1A1A1A] mb-4">
            Curated British Heritage Letters
          </h4>
          <NewsletterForm />
        </div>
      </section>
    </article>
  );
}
