import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "@/app/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Highclere Castle: Sir Charles Barry's Jacobethan Triumph & The Carnarvon Archives | The Royal Gallerys",
  description:
    "An architectural and historical exploration of Highclere Castle in Hampshire — seat of the Earls of Carnarvon, Sir Charles Barry's masterpiece, and the Tutankhamun discovery archives.",
  alternates: {
    canonical: "https://theroyalgallerys.com/travel/highclere-castle",
  },
  openGraph: {
    title: "Highclere Castle: Barry's Jacobethan Triumph & The Carnarvon Archives — The Royal Gallerys",
    description:
      "Inside England's most recognizable country house: Sir Charles Barry's Bath stone architecture, the 5th Earl of Carnarvon's Egyptian discoveries, and living estate heritage.",
    url: "https://theroyalgallerys.com/travel/highclere-castle",
    siteName: "The Royal Gallerys",
    locale: "en_GB",
    type: "article",
    publishedTime: "2026-10-04T12:00:00Z",
    authors: ["The Royal Gallerys Architecture Desk"],
    images: [
      {
        url: "https://theroyalgallerys.com/images/uk-heritage/highclere-castle.webp",
        width: 2400,
        height: 1800,
        alt: "Highclere Castle Jacobethan facade in Hampshire, England",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Highclere Castle: Sir Charles Barry's Jacobethan Triumph | The Royal Gallerys",
    description:
      "Architecture, Egyptian antiquities, and living aristocratic heritage at the seat of the Earls of Carnarvon.",
    images: ["https://theroyalgallerys.com/images/uk-heritage/highclere-castle.webp"],
  },
};

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiMxYTFhMWEiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

export default function HighclereCastlePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Highclere Castle: Sir Charles Barry's Jacobethan Triumph & The Carnarvon Archives",
    description:
      "An architectural and historical investigation into Highclere Castle in Hampshire — examining Sir Charles Barry's design, the 5th Earl of Carnarvon's Egyptian excavations, and Capability Brown's parkland.",
    image: "https://theroyalgallerys.com/images/uk-heritage/highclere-castle.webp",
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
      "@id": "https://theroyalgallerys.com/travel/highclere-castle",
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
              <li className="text-[#1A1A1A] font-medium">Highclere Castle</li>
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
          Grand English Country Houses · Hampshire
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#1A1A1A] leading-[1.08] mb-6">
          Highclere Castle: Barry&apos;s Jacobethan Triumph &amp; The Carnarvon Archives
        </h1>
        <p className="text-lg sm:text-xl font-serif italic text-[#5A5A60] leading-relaxed max-w-2xl mx-auto mb-8">
          The ancestral seat of the Earl of Carnarvon — where Sir Charles Barry perfected Victorian pinnacles and Howard Carter uncovered the golden mask of Tutankhamun.
        </p>

        {/* Fact metadata bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-[#E8E4DB] text-left">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Location</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">Newbury, Hampshire</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Architect</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">Sir Charles Barry (1838–1842)</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Dynasty</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">Herbert Family (Earls of Carnarvon)</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-[#8A7352] block font-semibold">Landscape</span>
            <span className="text-xs sm:text-sm font-serif font-medium text-[#1A1A1A]">Capability Brown (1,000 Acres)</span>
          </div>
        </div>
      </header>

      {/* ════════ FULL-RESOLUTION PHOTOGRAPHIC SPREAD ════════ */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 mb-14">
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#FAF8F4] border border-[#E8E4DB] shadow-sm">
          <Image
            src="/images/uk-heritage/highclere-castle.webp"
            alt="Highclere Castle Bath stone facade and parkland towers in Hampshire, England"
            fill
            priority
            placeholder="blur"
            blurDataURL={blurDataURL}
            className="object-contain sm:object-cover"
            sizes="(min-width: 1200px) 1152px, 100vw"
          />
        </div>
        <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#6A6A70] font-sans px-1 gap-1">
          <span>Sir Charles Barry&apos;s Jacobethan towers, strapwork friezes, and corner pinnacles in pale Bath stone.</span>
          <span className="text-[10px] text-[#8A7352] font-medium tracking-wide">Chensiyuan · CC BY-SA 4.0</span>
        </div>
      </section>

      {/* ════════ LONG-FORM EDITORIAL NARRATIVE ════════ */}
      <section className="max-w-3xl mx-auto px-6 sm:px-10 pb-20 font-serif leading-[1.8] text-[#2A2A2E] text-base sm:text-lg">
        <div className="space-y-8">
          <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-normal first-letter:float-left first-letter:mr-3 first-letter:text-[#8A7352] first-letter:leading-none">
            While known globally to millions of television viewers as the real-world setting of Downton Abbey, Highclere Castle possesses an architectural and historical resonance that far transcends popular culture. In 1838, Henry Herbert, 3rd Earl of Carnarvon, engaged the preeminent architect of Victorian Britain — Sir Charles Barry — to transform a classical Georgian mansion into an imposing Jacobethan palace.
          </p>

          <p>
            Barry was simultaneously designing the new Palace of Westminster (the Houses of Parliament) on the banks of the Thames, and the stylistic affinities between the two landmarks are immediate. Clad in golden Bath limestone, Highclere is defined by its soaring central tower, ornate strapwork cresting, corner obelisks, and rhythmic mullioned fenestration. It represents the supreme apotheosis of the High Victorian Renaissance revival, floating effortlessly above 1,000 acres of parkland originally landscaped in the 1770s by Lancelot &ldquo;Capability&rdquo; Brown.
          </p>

          {/* Editorial Pull Quote */}
          <blockquote className="my-10 pl-6 sm:pl-8 border-l-2 border-[#8A7352] font-serif italic text-xl sm:text-2xl text-[#1A1A1A] leading-relaxed">
            &ldquo;Highclere stands as living proof that an English country house is not a museum frozen in time, but a vibrant organism carrying the weight of history into modern light.&rdquo;
            <footer className="text-xs uppercase tracking-widest font-sans font-semibold text-[#8A7352] not-italic mt-3">
              — Lady Fiona Carnarvon, 8th Countess of Carnarvon
            </footer>
          </blockquote>

          <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] pt-4 leading-tight">
            The Tutankhamun Discovery and Egyptian Antiquities
          </h2>

          <p>
            Beyond its architectural grandeur, Highclere holds a permanent place in the annals of global archaeology. George Herbert, 5th Earl of Carnarvon, was an intrepid explorer and patron who funded Howard Carter&apos;s sixteen-year quest in Egypt&apos;s Valley of the Kings. On 26 November 1922, Lord Carnarvon stood behind Carter as he chipped a small hole through the sealed plaster doorway of Tomb KV62. When Carnarvon asked, &ldquo;Can you see anything?&rdquo;, Carter uttered his immortal reply: &ldquo;Yes, wonderful things.&rdquo;
          </p>

          <p>
            Following the 5th Earl&apos;s tragic death in Cairo a few months later from an infected mosquito bite — giving rise to the famous sensationalist myth of the &ldquo;Curse of Tutankhamun&rdquo; — a portion of his private collection remained secretly tucked away inside hidden wall cabinets between the Drawing Room and Smoking Room at Highclere. Rediscovered in 1987 by the 7th Earl&apos;s family, these original Egyptian antiquities are now exhibited in the castle&apos;s atmospheric vaulted cellars.
          </p>

          <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] pt-4 leading-tight">
            Living Estate Stewardship in the 21st Century
          </h2>

          <p>
            Today, Highclere remains the private home of George Herbert, 8th Earl of Carnarvon, and his wife, Fiona, 8th Countess of Carnarvon. Under their stewardship, the estate has pioneered sustainable farming, produced award-winning Highclere Castle Gin distilled with botanicals harvested from the estate gardens, and maintained the house&apos;s vast library of 5,600 volumes, including Napoleon Bonaparte&apos;s desk and chair taken from Fontainebleau.
          </p>
        </div>

        {/* ════════ CONNOISSEUR NOTES ════════ */}
        <div className="mt-14 p-8 bg-[#FAF8F4] border border-[#E8E4DB]">
          <span className="text-[10px] uppercase tracking-[0.24em] font-sans font-semibold text-[#8A7352] block mb-2">
            The Connoisseur&apos;s Field Guide
          </span>
          <h3 className="text-xl font-serif text-[#1A1A1A] mb-4">
            Visiting Highclere &amp; Hampshire
          </h3>
          <ul className="space-y-3 text-sm font-sans text-[#5A5A60] leading-relaxed">
            <li>
              <strong className="text-[#1A1A1A]">Public Openings:</strong> The castle is open for select public seasons during spring and summer, alongside exclusive private evening champagne tours hosted by Lady Carnarvon.
            </li>
            <li>
              <strong className="text-[#1A1A1A]">The Monks&apos; Garden &amp; Secret Garden:</strong> Highclere boasts historic gardens cultivated since the 13th century when the Bishops of Winchester owned the estate, featuring ancient cedar trees imported from Lebanon in 1774.
            </li>
            <li>
              <strong className="text-[#1A1A1A]">Nearby Accommodations:</strong> Stay at The Vineyard in Stockcross (renowned for its 30,000-bottle wine cellar) or Heckfield Place, a restored Georgian estate in Hampshire.
            </li>
          </ul>
        </div>

        {/* ════════ CROSS NAVIGATION ════════ */}
        <div className="mt-14 pt-8 border-t border-[#E8E4DB] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/travel/british-country-houses"
            className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#8A7352] hover:text-[#1A1A1A] transition-colors"
          >
            ← All British Country Houses
          </Link>
          <Link
            href="/travel/chatsworth-house"
            className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#1A1A1A] hover:text-[#8A7352] transition-colors"
          >
            Next: Chatsworth House →
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
