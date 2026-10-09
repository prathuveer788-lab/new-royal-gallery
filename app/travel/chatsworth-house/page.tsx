import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "@/app/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Chatsworth House: The Palace of the Peak & The Devonshire Collection | The Royal Gallerys",
  description:
    "An architectural and connoisseur's investigation into Chatsworth House in Derbyshire — seat of the Duke of Devonshire, sixteen generations of Cavendish art patronage, and Paxton's Emperor Fountain.",
  alternates: {
    canonical: "https://theroyalgallerys.com/travel/chatsworth-house",
  },
  openGraph: {
    title: "Chatsworth House: The Palace of the Peak — The Royal Gallerys",
    description:
      "Inside Western Europe's greatest private art treasury: English Baroque architecture by William Talman, Old Master drawings, and the Cavendish legacy.",
    url: "https://theroyalgallerys.com/travel/chatsworth-house",
    siteName: "The Royal Gallerys",
    locale: "en_GB",
    type: "article",
    publishedTime: "2026-10-04T12:00:00Z",
    authors: ["The Royal Gallerys Architecture Desk"],
    images: [
      {
        url: "https://theroyalgallerys.com/images/uk-heritage/chatsworth-house.webp",
        width: 2400,
        height: 1606,
        alt: "Chatsworth House south facade and fountain in Derbyshire, England",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chatsworth House: The Palace of the Peak | The Royal Gallerys",
    description:
      "The Duke of Devonshire's ancestral estate: Baroque splendor, Old Masters, and revolutionary landscape design in the Peak District.",
    images: ["https://theroyalgallerys.com/images/uk-heritage/chatsworth-house.webp"],
  },
};

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiMxYTFhMWEiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

export default function ChatsworthHousePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Chatsworth House: The Palace of the Peak & The Devonshire Collection",
    description:
      "An architectural and cultural exploration of Chatsworth House in Derbyshire — examining William Talman's English Baroque facade, the Devonshire art collection, and Sir Joseph Paxton's landscape.",
    image: "https://theroyalgallerys.com/images/uk-heritage/chatsworth-house.webp",
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
      "@id": "https://theroyalgallerys.com/travel/chatsworth-house",
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
              <li className="text-[#1A1A1A] font-medium">Chatsworth House</li>
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
          Grand English Country Houses · Derbyshire
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#1A1A1A] leading-[1.08] mb-6">
          Chatsworth House: The Palace of the Peak and Four Centuries of Splendour
        </h1>
        <p className="text-lg sm:text-xl font-serif italic text-[#5A5A60] leading-relaxed max-w-2xl mx-auto mb-8">
          The ancestral seat of the Duke of Devonshire — sixteen generations of Cavendish collecting, Talman&apos;s English Baroque architecture, and Paxton&apos;s Emperor Fountain above the River Derwent.
        </p>

        {/* Fact metadata bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-[#E8E4DB] text-left">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Location</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">Bakewell, Derbyshire</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Architects</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">William Talman (1687) &amp; Wyatville</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Dynasty</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">Cavendish (Dukes of Devonshire)</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Treasures</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">Devonshire Collection (4,000+ works)</span>
          </div>
        </div>
      </header>

      {/* ════════ FULL-RESOLUTION PHOTOGRAPHIC SPREAD ════════ */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 mb-14">
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#FAF8F4] border border-[#E8E4DB] shadow-sm">
          <Image
            src="/images/uk-heritage/chatsworth-house.webp"
            alt="Chatsworth House south facade and fountain frontage overlooking the garden canal in Derbyshire"
            fill
            priority
            placeholder="blur"
            blurDataURL={blurDataURL}
            className="object-contain sm:object-cover"
            sizes="(min-width: 1200px) 1152px, 100vw"
          />
        </div>
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#6A6A70] font-sans px-1 gap-1">
          <span>The south and east Baroque facades of Chatsworth House, mirrored in the Canal Pond before the Emperor Fountain.</span>
          <span className="text-[10px] text-[#8A7352] font-medium tracking-wide">Mike Peel · CC BY-SA 4.0</span>
        </div>
      </section>

      {/* ════════ LONG-FORM EDITORIAL NARRATIVE ════════ */}
      <section className="max-w-3xl mx-auto px-6 sm:px-10 pb-20 font-serif leading-[1.8] text-[#2A2A2E] text-base sm:text-lg">
        <div className="space-y-8">
          <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-normal first-letter:float-left first-letter:mr-3 first-letter:text-[#8A7352] first-letter:leading-none">
            Set within a dramatic natural bowl in the Derbyshire Peak District where the River Derwent winds through ancient woodland, Chatsworth House is frequently proclaimed the finest private residence in the English-speaking world. Founded in 1552 by Elizabeth Talbot, Countess of Shrewsbury — celebrated in history as the indomitable &ldquo;Bess of Hardwick&rdquo; — Chatsworth has been the principal seat of the Cavendish family, Dukes of Devonshire, for nearly five hundred years.
          </p>

          <p>
            Between 1687 and 1707, William Cavendish, 1st Duke of Devonshire, executed a daring architectural revolution. Employing architect William Talman, he replaced the Elizabethan courtyard with a monumental classical palace. Chatsworth&apos;s South Front became the first truly Baroque facade erected in England, featuring titanic rusticated stonework, giant Corinthian pilasters, and an ornate roof balustrade topped with golden stone urns that caught the northern afternoon sun.
          </p>

          {/* Editorial Pull Quote */}
          <blockquote className="my-10 pl-6 sm:pl-8 border-l-2 border-[#8A7352] font-serif italic text-xl sm:text-2xl text-[#1A1A1A] leading-relaxed">
            &ldquo;Chatsworth is not merely a house; it is a civilization unto itself — where four centuries of taste, intellectual curiosity, and artistic generosity remain unbroken.&rdquo;
          </blockquote>

          <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] pt-4 leading-tight">
            The Devonshire Collection: An Incomparable Treasury
          </h2>

          <p>
            The art treasures gathered by sixteen generations of the Cavendish family constitute one of the world&apos;s most vital private collections. In the Painted Hall, visitors stand beneath sweeping ceiling frescoes by Louis Laguerre depicting scenes from the life of Julius Caesar. The Great Dining Room hosted Queen Victoria&apos;s first state dinner as monarch in 1843.
          </p>

          <p>
            The Sculpture Gallery, added in the 1820s by the 6th &ldquo;Bachelor&rdquo; Duke of Devonshire and architect Jeffry Wyatville, houses Antonio Canova&apos;s breathtaking neoclassical marble statue of Napoleon&apos;s mother, Letizia Ramolino (Madame Mère), alongside masterworks by Bertel Thorvaldsen. The Devonshire drawings cabinet contains more than 3,000 Renaissance drawings by Leonardo da Vinci, Raphael, and Rembrandt, making it rival the collections of the Louvre and the British Museum.
          </p>

          <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] pt-4 leading-tight">
            Paxton, Capability Brown &amp; The Emperor Fountain
          </h2>

          <p>
            The 105-acre garden surrounding Chatsworth was reshaped in the 18th century by Capability Brown and revolutionized in the 1830s by head gardener Sir Joseph Paxton. To honor a prospective visit by Tsar Nicholas I of Russia in 1844, Paxton engineered the &ldquo;Emperor Fountain&rdquo; — an engineering marvel that threw a jet of water 290 feet into the air using purely gravity-fed pressure from an eight-acre reservoir constructed high on the moorland above the house.
          </p>

          <p>
            Paxton also constructed the colossal Great Conservatory at Chatsworth, an iron-and-glass greenhouse so expansive that carriages could drive through its center. While the conservatory was demolished following World War I, its modular prefabricated engineering served as Paxton&apos;s direct prototype for London&apos;s world-famous Crystal Palace in 1851.
          </p>
        </div>

        {/* ════════ CONNOISSEUR NOTES ════════ */}
        <div className="mt-14 p-8 bg-[#FAF8F4] border border-[#E8E4DB]">
          <span className="text-[10px] uppercase tracking-[0.24em] font-sans font-semibold text-[#8A7352] block mb-2">
            The Connoisseur&apos;s Field Guide
          </span>
          <h3 className="text-xl font-serif text-[#1A1A1A] mb-4">
            Visiting Chatsworth &amp; The Peak District
          </h3>
          <ul className="space-y-3 text-sm font-sans text-[#5A5A60] leading-relaxed">
            <li>
              <strong className="text-[#1A1A1A]">Estate Farm Shop:</strong> The Chatsworth Estate Farm Shop in the nearby village of Pilsley is widely recognized as England&apos;s premier luxury farm shop, offering venison from the estate deer park and traditional Derbyshire baked goods.
            </li>
            <li>
              <strong className="text-[#1A1A1A]">Devonshire Arms:</strong> Discerning visitors stay at The Cavendish Hotel in Baslow or The Devonshire Arms at Beeley, both situated on the Duke&apos;s estate with rooms furnished from the family collection.
            </li>
            <li>
              <strong className="text-[#1A1A1A]">Private Tours:</strong> Specialized curator-led tours of the Devonshire drawings collection and private library can be arranged by prior appointment.
            </li>
          </ul>
        </div>

        {/* ════════ CROSS NAVIGATION ════════ */}
        <div className="mt-14 pt-8 border-t border-[#E8E4DB] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/travel/highclere-castle"
            className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#8A7352] hover:text-[#1A1A1A] transition-colors"
          >
            ← Previous: Highclere Castle
          </Link>
          <Link
            href="/travel/blenheim-palace"
            className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#1A1A1A] hover:text-[#8A7352] transition-colors"
          >
            Next: Blenheim Palace →
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
