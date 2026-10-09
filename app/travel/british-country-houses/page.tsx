import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "@/app/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Britain's Grandest Historic Country Houses: Highclere, Chatsworth & Blenheim | The Royal Gallerys",
  description:
    "An architectural and cultural investigation into Britain's greatest aristocratic country seats — exploring the patronage, collections, and living heritage of Highclere Castle, Chatsworth House, and Blenheim Palace.",
  alternates: {
    canonical: "https://theroyalgallerys.com/travel/british-country-houses",
  },
  openGraph: {
    title: "Britain's Grandest Historic Country Houses — The Royal Gallerys",
    description:
      "Inside Britain's greatest private palaces: Chatsworth, Highclere, and Blenheim Palace.",
    url: "https://theroyalgallerys.com/travel/british-country-houses",
    siteName: "The Royal Gallerys",
    locale: "en_GB",
    type: "article",
    publishedTime: "2026-10-04T10:00:00Z",
    authors: ["The Royal Gallerys Architecture Desk"],
    images: [
      {
        url: "https://theroyalgallerys.com/images/uk-heritage/highclere-castle.webp",
        width: 1920,
        height: 1080,
        alt: "Highclere Castle estate and Jacobethan architecture in Hampshire",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Britain's Grandest Historic Country Houses | The Royal Gallerys",
    description:
      "Highclere, Chatsworth, and Blenheim: Living aristocratic architecture and heritage collections.",
    images: ["https://theroyalgallerys.com/images/uk-heritage/highclere-castle.webp"],
  },
};

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiMxYTFhMWEiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

interface CountryHouse {
  name: string;
  county: string;
  dynasty: string;
  architect: string;
  headline: string;
  essay: string;
  collectionHighlight: string;
  image: string;
  alt: string;
  href: string;
}

const HOUSES: CountryHouse[] = [
  {
    name: "Chatsworth House",
    county: "Bakewell, Derbyshire",
    dynasty: "Seat of the Duke of Devonshire (Cavendish Family)",
    architect: "William Talman (1687) & Jeffry Wyatville (1820s)",
    headline: "The Palace of the Peak and Four Centuries of Connoisseurship",
    essay:
      "Standing in the rolling hills of the Derbyshire Peak District above the River Derwent, Chatsworth represents perhaps the most complete private art repository in Western Europe. Passed down through sixteen generations of the Cavendish family since Bess of Hardwick built the original Elizabethan house in 1552, the house was transformed into an English Baroque triumph in 1687 by the 1st Duke of Devonshire. The Painted Hall, decorated with frescoes of Julius Caesar's triumphs by Louis Laguerre, leads to galleries housing works by Rembrandt, Reynolds, Lucian Freud, and Canova. The landscape, reshaped by Capability Brown and later Sir Joseph Paxton — who constructed the colossal Great Conservatory that inspired London's Crystal Palace — is an enduring masterwork of English garden art.",
    collectionHighlight:
      "The Devonshire Collection: Over 4,000 Old Master drawings, Roman marbles, and Canova's marble statue of Madame Mère.",
    image: "/images/uk-heritage/chatsworth-house.webp",
    alt: "Chatsworth House south facade overlooking the fountain and grounds",
    href: "/travel/chatsworth-house",
  },
  {
    name: "Highclere Castle",
    county: "Newbury, Hampshire",
    dynasty: "Seat of the Earl of Carnarvon (Herbert Family)",
    architect: "Sir Charles Barry (1838–1842)",
    headline: "Barry's Jacobethan Masterwork & The Egyptological Archive",
    essay:
      "While internationally celebrated as the filming location for Downton Abbey, Highclere Castle possesses an architectural and historical significance that transcends cinema. In 1838, the 3rd Earl of Carnarvon commissioned Sir Charles Barry — while Barry was simultaneously designing the Palace of Westminster in London — to transform a modest Georgian house into an imposing Jacobethan palace clad in pale Bath stone. Its pinnacles, towers, and rich strapwork decoration create a dramatic silhouette across 1,000 acres of parkland designed by Capability Brown. Highclere was also the ancestral home of George Herbert, 5th Earl of Carnarvon, who financed Howard Carter and stood beside him in November 1922 when they made the historic breakthrough into King Tutankhamun's tomb in Egypt's Valley of the Kings.",
    collectionHighlight:
      "The Carnarvon Egyptian Antiquities Collection, including original artifacts brought back from Luxor by the 5th Earl.",
    image: "/images/uk-heritage/highclere-castle.webp",
    alt: "Highclere Castle facade and gardens",
    href: "/travel/highclere-castle",
  },
  {
    name: "Blenheim Palace",
    county: "Woodstock, Oxfordshire",
    dynasty: "Seat of the Duke of Marlborough (Spencer-Churchill Family)",
    architect: "Sir John Vanbrugh & Nicholas Hawksmoor (1705–1722)",
    headline: "England's Sole Non-Royal Baroque Palace & Churchill's Cradle",
    essay:
      "Designated a UNESCO World Heritage Site in 1987, Blenheim Palace is unique in England: it is the only non-royal, non-episcopal country residence in the nation titled a 'Palace'. Built between 1705 and 1722 as a national gift from Queen Anne to John Churchill, 1st Duke of Marlborough, following his triumph at the Battle of Blenheim, the palace represents the theatrical climax of English Baroque architecture. Designed by dramatist-architect Sir John Vanbrugh and executed with the brooding structural brilliance of Nicholas Hawksmoor, Blenheim features titanic Corinthian colonnades and military triumphal trophies. On 30 November 1874, Sir Winston Churchill was born in a ground-floor bedroom here, sealing Blenheim's place at the core of British modern history.",
    collectionHighlight:
      "The Long Library (55 meters long), housing 10,000 books and the great Henry Willis pipe organ, beneath Grinling Gibbons woodcarvings.",
    image: "/images/uk-heritage/blenheim-palace.webp",
    alt: "Blenheim Palace grand baroque facade in Oxfordshire",
    href: "/travel/blenheim-palace",
  },
];

export default function BritishCountryHousesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Britain's Grandest Historic Country Houses: Highclere, Chatsworth & Blenheim",
    description:
      "An architectural and cultural investigation into Britain's greatest aristocratic country seats — exploring the patronage, collections, and living heritage.",
    image: "https://theroyalgallerys.com/images/uk-heritage/highclere-castle.webp",
    datePublished: "2026-10-04T10:00:00Z",
    dateModified: "2026-10-04T10:00:00Z",
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
      "@id": "https://theroyalgallerys.com/travel/british-country-houses",
    },
  };

  return (
    <article className="min-h-screen bg-[#FBF9F5] text-[#1A1A1A] antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="relative min-h-[75vh] sm:min-h-[85vh] flex items-end overflow-hidden bg-[#11110F]">
        <div className="absolute inset-0">
          <Image
            src="/images/uk-heritage/highclere-castle.webp"
            alt="Highclere Castle estate and gardens, Hampshire, England"
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
              <li className="text-[#F4F0E7]">Country Houses</li>
            </ol>
          </nav>

          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-sans font-semibold text-[#B8A47A] px-3 py-1 border border-[#B8A47A]/30 bg-black/50 backdrop-blur-xs inline-block mb-4">
            Architecture · England · Stately Homes
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#F4F0E7] leading-[1.08] tracking-tight mb-5">
            Britain&apos;s Grandest Historic Country Houses
          </h1>

          <p className="text-lg sm:text-xl font-serif italic text-[#F4F0E7]/85 max-w-2xl leading-relaxed mb-6">
            Chatsworth, Highclere, and Blenheim Palace: Architectural ambition, hereditary art collections, and four centuries of aristocratic life.
          </p>

          <div className="flex items-center gap-4 text-xs font-sans text-[#F4F0E7]/60 pt-4 border-t border-white/15">
            <span>By <strong>The Royal Gallerys Architecture Desk</strong></span>
            <span>·</span>
            <span>14 min read</span>
            <span>·</span>
            <span>Autumn 2026</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 sm:px-10 py-16 sm:py-20 border-b border-[#E8E4DB]">
        <p className="text-xl sm:text-2xl font-serif text-[#1A1A1A] leading-[1.5] mb-6 font-normal">
          The English country house is an architectural organism unlike any other in Western civilization. It was conceived simultaneously as a private family residence, an art gallery, a center of political power, and a sanctuary of landscape design.
        </p>

        <p className="text-base sm:text-lg font-sans text-[#5A5A60] leading-relaxed mb-6">
          Unlike the French châteaux, which were largely stripped and municipalized during the Revolution, Britain&apos;s greatest houses have maintained continuous hereditary custodianship. The portraits hanging in the Long Gallery were commissioned by direct ancestors; the gardens reflect three centuries of layered horticultural taste.
        </p>
      </div>

      <section className="max-w-5xl mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-24">
        {HOUSES.map((house, idx) => (
          <article
            key={house.name}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start border-b border-[#E8E4DB] pb-20"
          >
            <div className="lg:col-span-6 sticky top-24">
              <div className="relative aspect-[4/3] overflow-hidden shadow-sm bg-[#11110F] mb-4">
                <Image
                  src={house.image}
                  alt={house.alt}
                  fill
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <div className="text-xs font-sans text-[#6A6A70]">
                <span className="font-semibold text-[#8A7352]">{house.county}</span> · {house.architect}
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <span className="text-sm font-serif italic text-[#8A7352]">
                Stately Home {String(idx + 1).padStart(2, "0")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1A1A1A] leading-tight font-normal">
                {house.name}
              </h2>
              <p className="font-serif italic text-lg text-[#8A7352] leading-snug">
                {house.headline}
              </p>
              <p className="text-sm sm:text-base font-sans text-[#5A5A60] leading-relaxed">
                {house.essay}
              </p>

              <div className="bg-[#FAF8F4] border border-[#E8E4DB] p-5">
                <span className="text-[10px] uppercase tracking-wider font-sans font-semibold text-[#1A1A1A] block mb-1">
                  Collection &amp; Curatorial Masterpiece
                </span>
                <p className="text-xs font-sans text-[#6A6A70] leading-relaxed">
                  {house.collectionHighlight}
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-6">
                <Link
                  href={house.href}
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

      <section className="py-20 bg-[#F3EFE6] border-t border-[#E8E4DB] px-6 sm:px-10 lg:px-16 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.28em] font-sans font-semibold text-[#8A7352] block mb-2">
            The Royal Gallerys UK Collection
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] mb-8">
            Continue Your Architectural Journey
          </h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/travel/royal-estates-scotland"
              className="px-6 py-3 bg-[#FAF8F4] border border-[#D9D4CA] text-xs uppercase tracking-wider font-sans font-medium hover:border-[#8A7352] transition-colors"
            >
              The Royal Estates of Scotland →
            </Link>
            <Link
              href="/travel/castle-hotels-scotland"
              className="px-6 py-3 bg-[#FAF8F4] border border-[#D9D4CA] text-xs uppercase tracking-wider font-sans font-medium hover:border-[#8A7352] transition-colors"
            >
              The Castle Hotels of Scotland →
            </Link>
            <Link
              href="/uk"
              className="px-6 py-3 bg-[#8A7352] text-[#FAF8F4] text-xs uppercase tracking-wider font-sans font-medium hover:bg-[#1A1A1A] transition-colors"
            >
              UK Edition Hub →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 sm:px-10 bg-[#FBF9F5] text-center border-t border-[#E8E4DB]">
        <div className="max-w-md mx-auto">
          <span className="text-[10px] uppercase tracking-[0.24em] font-sans font-semibold text-[#8A7352] block mb-2">
            Architectural Letters
          </span>
          <h4 className="text-2xl font-serif text-[#1A1A1A] mb-4">
            Curated British Country House Dispatches
          </h4>
          <NewsletterForm />
        </div>
      </section>
    </article>
  );
}
