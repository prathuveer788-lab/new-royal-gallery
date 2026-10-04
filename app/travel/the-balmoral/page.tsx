import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BalmoralHeader from "./components/BalmoralHeader";
import BalmoralCarousel from "./components/BalmoralCarousel";
import BalmoralShareBar from "./components/BalmoralShareBar";
import BalmoralNewsletter from "./components/BalmoralNewsletter";
import BalmoralFooter from "./components/BalmoralFooter";

export const metadata: Metadata = {
  title: "The Balmoral, Edinburgh: Three Minutes Ahead of the City | The Royal Gallerys",
  description:
    "Inside Edinburgh's landmark railway hotel at No. 1 Princes Street. Architecture, Palm Court, suites, and a century of Scottish heritage.",
  alternates: {
    canonical: "https://theroyalgallerys.com/travel/the-balmoral",
  },
  openGraph: {
    title: "The Balmoral: Three Minutes Ahead of Edinburgh",
    description:
      "Inside Edinburgh's landmark railway hotel at No. 1 Princes Street. Architecture, Palm Court, suites, and a century of Scottish heritage.",
    url: "https://theroyalgallerys.com/travel/the-balmoral",
    siteName: "The Royal Gallerys",
    locale: "en_GB",
    type: "article",
    publishedTime: "2026-09-27T10:00:00Z",
    authors: ["The Royal Gallerys Travel Desk"],
    images: [
      {
        url: "https://theroyalgallerys.com/assets/images/balmoral/balmoral-exterior-hero.jpg",
        width: 2000,
        height: 1500,
        alt: "The Balmoral exterior clock tower over Princes Street and North Bridge, Edinburgh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Balmoral: Three Minutes Ahead of Edinburgh | The Royal Gallerys",
    description:
      "Inside Edinburgh's landmark railway hotel at No. 1 Princes Street. Architecture, Palm Court, suites, and a century of Scottish heritage.",
    images: ["https://theroyalgallerys.com/assets/images/balmoral/balmoral-exterior-hero.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": "https://theroyalgallerys.com/travel/the-balmoral#article",
      "headline": "The Balmoral: Three Minutes Ahead of Edinburgh",
      "description":
        "Inside Edinburgh's landmark railway hotel at No. 1 Princes Street. Architecture, Palm Court, suites, and a century of Scottish heritage.",
      "image": "https://theroyalgallerys.com/assets/images/balmoral/balmoral-exterior-hero.jpg",
      "datePublished": "2026-09-27T10:00:00Z",
      "dateModified": "2026-09-27T10:00:00Z",
      "author": {
        "@type": "Organization",
        "name": "The Royal Gallerys Travel Desk",
        "url": "https://theroyalgallerys.com",
      },
      "publisher": {
        "@type": "Organization",
        "name": "The Royal Gallerys",
        "logo": {
          "@type": "ImageObject",
          "url": "https://theroyalgallerys.com/icon.png",
        },
      },
      "mainEntityOfPage": "https://theroyalgallerys.com/travel/the-balmoral",
    },
    {
      "@type": "Hotel",
      "@id": "https://theroyalgallerys.com/travel/the-balmoral#hotel",
      "name": "The Balmoral, a Rocco Forte Hotel",
      "image": "https://theroyalgallerys.com/assets/images/balmoral/balmoral-exterior-hero.jpg",
      "telephone": "+44 131 556 2414",
      "url": "https://www.roccofortehotels.com/hotels-and-resorts/the-balmoral-hotel/",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1 Princes Street",
        "addressLocality": "Edinburgh",
        "postalCode": "EH2 2EQ",
        "addressCountry": "GB",
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      },
    },
  ],
};

export default function BalmoralArticlePage() {
  return (
    <div
      className="min-h-screen bg-[#FAF8F4] text-[#1A1A1A] antialiased selection:bg-[#24424F]/15 selection:text-[#1A1A1A]"
      style={{
        ["--paper" as string]: "#FAF8F4",
        ["--ink" as string]: "#1A1A1A",
        ["--ink-soft" as string]: "#5B5B5B",
        ["--rule" as string]: "#D9D4CA",
        ["--stone" as string]: "#EFE9DF",
        ["--heritage" as string]: "#24424F",
        ["--moss" as string]: "#6D7247",
      }}
    >
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Skip Link for Accessibility */}
      <a
        href="#article-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-[#24424F] text-[#FAF8F4] px-4 py-2 text-xs uppercase tracking-widest font-sans"
      >
        Skip to main content
      </a>

      {/* Condé Nast Traveller style quiet-chrome header */}
      <BalmoralHeader />

      <main id="article-content" className="w-full">
        {/* ── ARTICLE HEADER ── */}
        <header className="pt-10 sm:pt-16 pb-8 md:pb-12 max-w-[900px] mx-auto px-4 sm:px-6 text-center">
          {/* Rubric */}
          <p
            className="text-[11px] sm:text-[12px] uppercase tracking-[0.24em] font-semibold text-[#24424F] mb-4 font-sans"
          >
            Travel · Edinburgh · Hotels
          </p>

          {/* Headline */}
          <h1
            className="text-[29px] sm:text-[46px] md:text-[64px] lg:text-[78px] font-serif font-normal leading-[1.1] sm:leading-[1.05] tracking-[-0.01em] text-[#1A1A1A] max-w-[860px] mx-auto"
          >
            <span className="block sm:inline">The Balmoral:</span>{" "}
            <span className="block sm:inline">Three Minutes Ahead of Edinburgh</span>
          </h1>

          {/* Standfirst */}
          <p
            className="mt-5 sm:mt-7 text-[18px] sm:text-[22px] md:text-[25px] font-serif italic text-[#5B5B5B] leading-[1.38] max-w-[760px] mx-auto font-light text-balance"
          >
            For more than a century the clock above Waverley has run fast on purpose. Inside Edinburgh’s great railway hotel, a house fluent in both Old Town and New.
          </p>

          {/* Byline Block */}
          <div className="mt-8 pt-5 border-t border-[#D9D4CA] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#5B5B5B]">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1">
              <span className="text-[#1A1A1A] font-medium uppercase tracking-[0.14em] text-[11px]">
                By The Royal Gallerys Travel Desk
              </span>
              <span>·</span>
              <time dateTime="2026-09-27">27 September 2026</time>
              <span>·</span>
              <span>8 min read</span>
            </div>
            <BalmoralShareBar />
          </div>
        </header>

        {/* ── HERO IMAGE ── */}
        <figure className="w-full mb-12 sm:mb-16">
          <div className="w-full relative aspect-[4/5] sm:aspect-[16/9] bg-[#EFE9DF] overflow-hidden">
            <Image
              src="/assets/images/balmoral/balmoral-exterior-hero.jpg"
              alt="The Balmoral clock tower and Victorian Scottish Baronial façade at No. 1 Princes Street, Edinburgh"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[80%_25%] sm:object-[center_35%]"
            />
          </div>
          <figcaption className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 mt-3 flex flex-col sm:flex-row sm:items-baseline sm:justify-between text-xs text-[#5B5B5B] gap-1.5 font-sans">
            <span className="text-[13px] text-[#1A1A1A]">
              <strong className="font-semibold text-[#1A1A1A] mr-1">No. 1 Princes Street.</strong>
              The tower rises fifty-eight metres over the corner of Princes Street and North Bridge.
            </span>
            <span className="text-[11px] sm:text-[12px] italic whitespace-nowrap text-[#5B5B5B]">
              Photograph courtesy of The Balmoral, a Rocco Forte Hotel
            </span>
          </figcaption>
        </figure>

        {/* ── ARTICLE BODY ── */}
        <article className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative lg:grid lg:grid-cols-12 lg:gap-12">
            
            {/* Main Reading Column (Centered max ~680px) */}
            <div className="lg:col-span-8 lg:col-start-1 xl:col-span-8 max-w-[680px] mx-auto lg:mx-0">
              
              {/* Part 1: Arrival & Opening */}
              <div className="space-y-6 text-[18px] md:text-[20px] leading-[1.68] font-serif text-[#1A1A1A] [font-feature-settings:'onum'_1]">
                <p className="first-letter:float-left first-letter:text-[5rem] first-letter:leading-[0.8] first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:font-normal first-letter:text-[#24424F]">
                  The clock above Waverley has been three minutes fast since 1902, so that nobody hurrying up from the platforms should miss a train. It is a civic courtesy engineered in gilded cast iron: three minutes granted to human hesitation, to luggage straps, to farewells spoken under steam. For one hundred and twenty-four years, the only night the clock is permitted to keep true Greenwich time is Hogmanay—the thirty-first of December—when Edinburgh counts down together before the bells, and fiction gives way to the real midnight.
                </p>

                <p>
                  Arrive as the hotel was meant to be arrived at, by rail, and the city sorts itself in a single movement: the Old Town’s volcanic ridge climbing precipitously to the south, Princes Street running west in Georgian order, and above you fifty-eight metres of Scottish sandstone holding the Northern sky. To step off the train and ascend directly into No. 1 Princes Street is to experience the Victorian railway hotel at its zenith—not as an escape from the city, but as its threshold.
                </p>
              </div>

              {/* Mobile Info Box (Visible on mobile/tablet, floated on >=1280px) */}
              <aside className="my-10 xl:hidden">
                <TheDetailsPanel />
              </aside>

              {/* Sub-section: A landmark in time */}
              <section className="mt-14 space-y-6 text-[18px] md:text-[20px] leading-[1.68] font-serif text-[#1A1A1A] [font-feature-settings:'onum'_1]">
                <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-normal leading-[1.15] text-[#1A1A1A] pt-4 border-t border-[#D9D4CA]">
                  A landmark in time
                </h2>

                <p>
                  The hotel was conceived as an instrument of arrival. In the closing decade of the nineteenth century, the North British Railway sought an imposing monument worthy of its rebuilt subterranean station. The established hoteliers of Princes Street, alarmed by the scale and audacity of the railway company’s ambition, fought the scheme fiercely before a committee of the House of Lords. They lost.
                </p>

                <p>
                  The architectural competition of 1895 went to William Hamilton Beattie, the accomplished architect responsible for Jenners department store further along the street. Beattie drew a grand palace of Victorian Scottish Baronial drama, but fate intervened: he died in 1898. His capable assistant Andrew Robb Scott took up the drawings and carried the vast building through four further years of masonry and finishing to its opening on 15 October 1902. Seven years had passed from competition to completion; the architect did not live to see the doors swing wide.
                </p>

                <p>
                  It opened as the North British Station Hotel, serving generations of travellers arriving from King’s Cross on the Flying Scotsman. Renamed The Balmoral in 1991, the property has been a Rocco Forte hotel since 1997, and has held Category B listed status since 1994.
                </p>
              </section>
            </div>

            {/* Desktop Floated Aside (>=1280px) */}
            <aside className="hidden xl:block xl:col-span-4 sticky top-28 self-start pl-4">
              <TheDetailsPanel />
            </aside>
          </div>

          {/* ── WIDE IMAGE (Breaks out to 1100px) ── */}
          <figure className="my-16 sm:my-20 max-w-[1100px] mx-auto">
            <div className="relative w-full aspect-[3/2] bg-[#EFE9DF] overflow-hidden">
              <Image
                src="/assets/images/balmoral/balmoral-facade-wide.jpg"
                alt="Architectural façade detail of The Balmoral showing Victorian Scottish Baronial stonework and canted bays"
                fill
                sizes="(max-width: 1200px) 100vw, 1100px"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-3 flex flex-col sm:flex-row sm:items-baseline sm:justify-between text-xs text-[#5B5B5B] gap-1 font-sans">
              <span className="text-[13px] text-[#1A1A1A]">
                <strong className="font-semibold text-[#1A1A1A] mr-1">Victorian Scottish Baronial.</strong>
                Canted bays and balconies of a continental boulevard beneath the dormers and turrets of the Scottish tower house.
              </span>
              <span className="text-[11px] sm:text-[12px] italic text-[#5B5B5B] whitespace-nowrap">
                Photograph courtesy of The Balmoral, a Rocco Forte Hotel
              </span>
            </figcaption>
          </figure>

          {/* ── READING COLUMN PART 2 ── */}
          <div className="max-w-[680px] mx-auto">
            
            {/* Pull Quote 1 */}
            <blockquote className="my-14 sm:my-18 py-8 sm:py-10 border-y border-[#D9D4CA] text-center">
              <p className="text-[24px] sm:text-[30px] md:text-[34px] font-serif italic text-[#1A1A1A] leading-[1.3] font-light max-w-xl mx-auto">
                “The greatest luxury at this address is not a room. It is a fixed point from which a moving city becomes legible.”
              </p>
            </blockquote>

            {/* Sub-section: The architecture: fluent in two Edinburghs */}
            <section className="space-y-6 text-[18px] md:text-[20px] leading-[1.68] font-serif text-[#1A1A1A] [font-feature-settings:'onum'_1]">
              <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-normal leading-[1.15] text-[#1A1A1A] pt-4 border-t border-[#D9D4CA]">
                The architecture: fluent in two Edinburghs
              </h2>

              <p>
                The façade is sandstone cut from the beds that built the Georgian terraces, but darker and deeper in section, modelled for shadow rather than line. The stone holds rain the way the Old Town does, so the building is rarely the colour it was an hour ago. In morning drizzle it turns the tone of wet tweed; under late afternoon sun through the Firth of Forth, it glows amber against the basalt crags.
              </p>

              <p>
                Canted bays and balconies belong to a continental boulevard; the dormers and turrets above them come from the Scottish tower house. The corner tower carries its four dials and answers the Scott Monument across the gardens without imitating it. The New Town’s composure and the Old Town’s vertical drama meet on this one corner, and the building declines to choose between them.
              </p>

              <p>
                The tower’s four great dials were made by the historic Edinburgh horologists Hamilton &amp; Inches, whose George Street workshops still maintain the mechanism. On three hundred and sixty-four days each year, those hands register three minutes before the hour, keeping Edinburgh’s travelers impeccably punctual.
              </p>
            </section>
          </div>

          {/* ── IMAGE PAIR (Side by Side, 8px gap) ── */}
          <div className="my-16 sm:my-20 max-w-[1100px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2">
              <figure>
                <div className="relative w-full aspect-[4/5] bg-[#EFE9DF] overflow-hidden">
                  <Image
                    src="/assets/images/balmoral/balmoral-clock-tower.jpg"
                    alt="The Balmoral clock tower dials crafted by Hamilton and Inches"
                    fill
                    sizes="(max-width: 768px) 100vw, 550px"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <figcaption className="mt-2 text-xs text-[#5B5B5B] font-sans">
                  <span className="block text-[13px] text-[#1A1A1A]">
                    <strong className="font-semibold text-[#1A1A1A]">Hamilton &amp; Inches dials.</strong> Running three minutes fast since 1902.
                  </span>
                  <span className="text-[11px] italic">Photograph courtesy of The Balmoral, a Rocco Forte Hotel</span>
                </figcaption>
              </figure>

              <figure>
                <div className="relative w-full aspect-[4/5] bg-[#EFE9DF] overflow-hidden">
                  <Image
                    src="/assets/images/balmoral/balmoral-palm-court.jpg"
                    alt="Palm Court afternoon tea under the glass dome and chandelier at The Balmoral"
                    fill
                    sizes="(max-width: 768px) 100vw, 550px"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <figcaption className="mt-2 text-xs text-[#5B5B5B] font-sans">
                  <span className="block text-[13px] text-[#1A1A1A]">
                    <strong className="font-semibold text-[#1A1A1A]">Palm Court.</strong> Palms, fluted columns, and a Venetian chandelier under glass.
                  </span>
                  <span className="text-[11px] italic">Photograph courtesy of The Balmoral, a Rocco Forte Hotel</span>
                </figcaption>
              </figure>
            </div>
          </div>

          {/* ── READING COLUMN PART 3 ── */}
          <div className="max-w-[680px] mx-auto">
            
            {/* Sub-section: Inside: Palm Court and the suites */}
            <section className="space-y-6 text-[18px] md:text-[20px] leading-[1.68] font-serif text-[#1A1A1A] [font-feature-settings:'onum'_1]">
              <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-normal leading-[1.15] text-[#1A1A1A] pt-4 border-t border-[#D9D4CA]">
                Inside: Palm Court and the suites
              </h2>

              <p>
                The door is at No. 1 Princes Street. The plan turns inward and upward (marble, galleries, stairs) towards Palm Court: palms rising between fluted columns beneath a glass dome, a Venetian chandelier, and a hand-painted de Gournay landscape in which the follies of Calton Hill are hidden among the trees. Afternoons bring a harpist, and tea is poured from a table of eighty-eight leaves.
              </p>

              {/* Floated Inset Image in Column */}
              <figure className="my-8 md:float-right md:w-[260px] md:ml-6 md:mb-4">
                <div className="relative w-full aspect-[4/5] bg-[#EFE9DF] overflow-hidden border border-[#D9D4CA]">
                  <Image
                    src="/assets/images/balmoral/balmoral-private-dining.jpg"
                    alt="Private dining salon at Number One restaurant, The Balmoral"
                    fill
                    sizes="260px"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <figcaption className="mt-2 text-[11px] text-[#5B5B5B] font-sans leading-tight">
                  <strong className="text-[#1A1A1A]">Private dining.</strong> Intimate salon at Number One restaurant.
                  <span className="block italic text-[10px] mt-0.5">Photograph courtesy of The Balmoral</span>
                </figcaption>
              </figure>

              <p>
                Interiors are by Olga Polizzi, Sir Rocco’s sister and the group’s director of design. Fabrics carry the landscape: blues, greys and moss-greens, and a tartan woven for the house rather than borrowed from a clan. The palette eschews theatrical Victoriana in favour of light-handed Scottish elegance—linens that evoke mountain mist, soft wools, and tailored cabinetry.
              </p>

              <p>
                The Scone &amp; Crombie Suite, named for Scone Palace and Crombie Castle, is a hundred and twenty square metres above the Old Town, with a powder-blue overmantel of carved garlands and gilt sconces flanking the glass. Classic rooms are nineteen square metres and face an internal courtyard; the deluxe rooms that look at the Castle are twenty-eight. The house sells orientation rather than floor area.
              </p>
            </section>
          </div>

          {/* ── GALLERY CAROUSEL (Interactive) ── */}
          <BalmoralCarousel />

          {/* ── READING COLUMN PART 4 ── */}
          <div className="max-w-[680px] mx-auto">
            
            {/* Sub-section: Food and drink */}
            <section className="mt-12 space-y-6 text-[18px] md:text-[20px] leading-[1.68] font-serif text-[#1A1A1A] [font-feature-settings:'onum'_1]">
              <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-normal leading-[1.15] text-[#1A1A1A] pt-4 border-t border-[#D9D4CA]">
                Food and drink
              </h2>

              <p>
                Brasserie Prince, remade in 2018 by Martin Brudnizki with Olga Polizzi, was given its own door onto Princes Street. The dining room balances the warmth of a classic Parisian brasserie with Scottish produce: leather banquettes, brass fittings, and mirrors that catch the soft northern daylight.
              </p>

              <p>
                Downstairs, Number One provides the hotel’s formal fine-dining stage, framed by lacquered walls and contemporary art. Across the entrance hall, SCOTCH presents an amber library of more than five hundred single malts, blends, and rare vintages, tended by kilted Whisky Ambassadors who guide guests through Scotland’s distilling regions.
              </p>

              {/* Bar & Dining Photo Feature */}
              <div className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
                <figure className="flex flex-col">
                  <div className="relative w-full aspect-[4/3] bg-[#EFE9DF] overflow-hidden border border-[#D9D4CA]">
                    <Image
                      src="/assets/images/balmoral/balmoral-scotch-bar.jpg"
                      alt="SCOTCH whisky bar at The Balmoral with glowing amber shelves of over 500 whiskies"
                      fill
                      sizes="(max-width: 768px) 100vw, 340px"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-2 text-xs text-[#5B5B5B] font-sans">
                    <strong className="text-[#1A1A1A]">SCOTCH Whisky Bar.</strong> Over 500 varieties in glowing amber oak cabinets.
                  </figcaption>
                </figure>

                <figure className="flex flex-col">
                  <div className="relative w-full aspect-[4/3] bg-[#EFE9DF] overflow-hidden border border-[#D9D4CA]">
                    <Image
                      src="/assets/images/balmoral/balmoral-brasserie-prince.jpg"
                      alt="Brasserie Prince at The Balmoral designed by Martin Brudnizki"
                      fill
                      sizes="(max-width: 768px) 100vw, 340px"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-2 text-xs text-[#5B5B5B] font-sans">
                    <strong className="text-[#1A1A1A]">Brasserie Prince.</strong> Martin Brudnizki design with street entrance.
                  </figcaption>
                </figure>
              </div>
            </section>

            {/* Sub-section: The spa */}
            <section className="mt-12 space-y-6 text-[18px] md:text-[20px] leading-[1.68] font-serif text-[#1A1A1A] [font-feature-settings:'onum'_1]">
              <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-normal leading-[1.15] text-[#1A1A1A] pt-4 border-t border-[#D9D4CA]">
                The spa
              </h2>

              <p>
                The spa below was rebuilt as the first Irene Forte Spa in the country, with lemon-tree frescoes and cork underfoot. The subterranean sanctuary houses a fifteen-metre heated lap pool, steam rooms, and restorative treatment suites where Mediterranean botanicals meet Scottish tranquillity.
              </p>
            </section>

            {/* Sub-section: The service and the tartan */}
            <section className="mt-12 space-y-6 text-[18px] md:text-[20px] leading-[1.68] font-serif text-[#1A1A1A] [font-feature-settings:'onum'_1]">
              <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-normal leading-[1.15] text-[#1A1A1A] pt-4 border-t border-[#D9D4CA]">
                The service and the tartan
              </h2>

              <p>
                The Balmoral tartan was made for the hotel by the Edinburgh kiltmakers Kinloch Anderson, and is worn in kilt and in trews. In an era when hotel uniforms often lean towards global uniformity, the sight of doormen greeting arrivals at the foot of Princes Street in bespoke kilt and tailored wool asserts an unapologetic sense of place.
              </p>

              {/* Doorman Tartan Photo Feature */}
              <figure className="my-6 not-prose">
                <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-[#EFE9DF] overflow-hidden border border-[#D9D4CA]">
                  <Image
                    src="/assets/images/balmoral/balmoral-doorman-tartan.jpg"
                    alt="The Balmoral doorman in bespoke Kinloch Anderson tartan on Princes Street"
                    fill
                    sizes="(max-width: 768px) 100vw, 680px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-xs text-[#5B5B5B] font-sans">
                  <strong className="text-[#1A1A1A]">Kinloch Anderson Tartan.</strong> Bespoke kilt and trews tailored for No. 1 Princes Street.
                </figcaption>
              </figure>

              <p>
                General Manager Andrew McPherson captures the house ethos: <em className="text-[#1A1A1A]">“…a hotel that has been welcoming the world to Edinburgh for over a century.”</em>
              </p>
            </section>

            {/* Sub-section: Literary Edinburgh */}
            <section className="mt-12 space-y-6 text-[18px] md:text-[20px] leading-[1.68] font-serif text-[#1A1A1A] [font-feature-settings:'onum'_1]">
              <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-normal leading-[1.15] text-[#1A1A1A] pt-4 border-t border-[#D9D4CA]">
                Literary Edinburgh
              </h2>

              <p>
                Waverley takes its name from Scott’s novels; in 2004 Edinburgh became the first UNESCO City of Literature. The literary lineage of the capital permeates the stones of the hotel. In January 2007, in a room upstairs, J.K. Rowling finished the last of the Harry Potter novels, signing the marble bust in Room 552—now preserved as the J.K. Rowling Suite—before closing a defining chapter in modern English fiction.
              </p>

              {/* J.K. Rowling Suite Photo Feature */}
              <figure className="my-6 not-prose">
                <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-[#EFE9DF] overflow-hidden border border-[#D9D4CA]">
                  <Image
                    src="/assets/images/balmoral/balmoral-jk-rowling-suite.jpg"
                    alt="The J.K. Rowling Suite at The Balmoral with signed Hermes marble bust"
                    fill
                    sizes="(max-width: 768px) 100vw, 680px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-xs text-[#5B5B5B] font-sans">
                  <strong className="text-[#1A1A1A]">The J.K. Rowling Suite.</strong> Room 552, where the final lines of the series were written.
                </figcaption>
              </figure>
            </section>

            {/* Pull Quote 2 */}
            <blockquote className="my-14 sm:my-18 py-8 sm:py-10 border-y border-[#D9D4CA] text-center">
              <p className="text-[24px] sm:text-[30px] md:text-[34px] font-serif italic text-[#1A1A1A] leading-[1.3] font-light max-w-xl mx-auto">
                “Grand hotels ask to be admired. This one asks what time you are leaving, and quietly sees to it that you are not late.”
              </p>
            </blockquote>

            {/* Sub-section: The neighbourhood */}
            <section className="space-y-6 text-[18px] md:text-[20px] leading-[1.68] font-serif text-[#1A1A1A] [font-feature-settings:'onum'_1]">
              <h2 className="text-[26px] sm:text-[32px] md:text-[36px] font-normal leading-[1.15] text-[#1A1A1A] pt-4 border-t border-[#D9D4CA]">
                The neighbourhood
              </h2>

              <p>
                Step out of the front door and Edinburgh arranges itself into four directions, none longer than a walk: west along Princes Street to the National (free, since 2023); south across North Bridge up to the Old Town and the Castle; east to Calton Hill; north to George Street and the workshops of Hamilton &amp; Inches.
              </p>

              <p>
                Two hundred metres west stands Jenners, Beattie’s other Princes Street building, closed since 2021 and under restoration. Together, the two landmarks frame Edinburgh’s Victorian golden age, when iron, stone, and rail reshaped the Scottish capital.
              </p>
            </section>

            {/* Sub-section: Know before you go */}
            <section className="mt-12 pt-6 border-t border-[#D9D4CA]">
              <h2 className="text-[22px] sm:text-[26px] font-normal text-[#1A1A1A] font-serif mb-4">
                Know before you go
              </h2>
              <ul className="space-y-3 text-[16px] sm:text-[17px] font-serif text-[#1A1A1A] list-none pl-0 leading-relaxed [font-feature-settings:'onum'_1]">
                <li className="flex items-start">
                  <span className="text-[#24424F] mr-3 font-mono text-sm leading-none mt-1">▪</span>
                  <span><strong>Arrival by rail:</strong> Lift and staircase access connects directly from the Edinburgh Waverley Station concourse to No. 1 Princes Street.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#24424F] mr-3 font-mono text-sm leading-none mt-1">▪</span>
                  <span><strong>The clock tower:</strong> Calibrated three minutes fast throughout the year; the only night it reflects Greenwich Mean Time is Hogmanay (31 December).</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#24424F] mr-3 font-mono text-sm leading-none mt-1">▪</span>
                  <span><strong>Afternoon Tea:</strong> Served daily in Palm Court beneath the glass dome; reservations for the afternoon harpist sittings should be secured well in advance.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#24424F] mr-3 font-mono text-sm leading-none mt-1">▪</span>
                  <span><strong>Room selection:</strong> Classic courtyard rooms offer nineteen square metres of secluded quiet; deluxe Castle-view rooms measure twenty-eight square metres and frame direct vistas of the fortress.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#24424F] mr-3 font-mono text-sm leading-none mt-1">▪</span>
                  <span><strong>Staff tartan:</strong> Tailored exclusively for the hotel by Kinloch Anderson, Scotland’s premier kiltmakers since 1868.</span>
                </li>
              </ul>
            </section>

            {/* End of Article Mark & Tags */}
            <div className="mt-14 pt-8 border-t border-[#D9D4CA] flex flex-col items-center text-center">
              <span className="inline-block w-2.5 h-2.5 bg-[#24424F] mb-6" aria-hidden="true" />
              
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {["Edinburgh", "Palace Hotels", "Rocco Forte", "Scottish Heritage", "Architecture", "Luxury Travel"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] uppercase tracking-[0.16em] px-3 py-1 bg-[#EFE9DF] text-[#5B5B5B] font-sans border border-[#D9D4CA]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Desk Bio */}
              <div className="p-6 bg-[#EFE9DF] border border-[#D9D4CA] w-full text-left font-sans">
                <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#24424F] block mb-1">
                  The Royal Gallerys
                </span>
                <h4 className="text-base font-serif text-[#1A1A1A] font-medium">
                  Travel &amp; Heritage Desk
                </h4>
                <p className="mt-2 text-xs text-[#5B5B5B] leading-relaxed">
                  Written and curated by our European correspondents, covering landmark architecture, royal houses, and the historic palace hotels of Great Britain and the Continent.
                </p>
              </div>
            </div>

          </div>
        </article>

        {/* ── MORE FROM THE ROYAL GALLERYS ── */}
        <section className="mt-20 sm:mt-28 py-16 bg-[#EFE9DF] border-t border-[#D9D4CA]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-[11px] uppercase tracking-[0.26em] font-semibold text-[#24424F] block font-sans">
                Editorial Recommendations
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] mt-1">
                More from The Royal Gallerys
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1: Edinburgh Literary Trail */}
              <article className="group">
                <div className="relative w-full aspect-[4/5] bg-[#D9D4CA] overflow-hidden mb-3 border border-[#D9D4CA]">
                  <Image
                    src="/images/experiences/31-edinburgh/img-01.webp"
                    alt="Edinburgh Castle on its volcanic crag illuminated at twilight"
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-[#FAF8F4]/90 text-[10px] uppercase tracking-[0.16em] px-2 py-0.5 text-[#24424F] font-sans font-medium">
                    Related Guide
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#24424F] font-sans block mb-1">
                  Travel · Scotland
                </span>
                <h4 className="text-lg font-serif text-[#1A1A1A] group-hover:text-[#24424F] transition-colors leading-snug">
                  <Link href="/travel/edinburgh-travel-guide">
                    Edinburgh: The City Where History Is Set in Stone
                  </Link>
                </h4>
                <p className="mt-1 text-xs text-[#5B5B5B] font-serif italic">
                  Volcanic crags, medieval wynds, and the world’s first UNESCO City of Literature.
                </p>
              </article>

              {/* Card 2: Scottish Highlands */}
              <article className="group">
                <div className="relative w-full aspect-[4/5] bg-[#D9D4CA] overflow-hidden mb-3 border border-[#D9D4CA]">
                  <Image
                    src="/images/experiences/32-scottish-highlands/img-01.webp"
                    alt="Scottish Highlands mountain estate in autumn"
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-[#FAF8F4]/90 text-[10px] uppercase tracking-[0.16em] px-2 py-0.5 text-[#24424F] font-sans font-medium">
                    Related Feature
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#24424F] font-sans block mb-1">
                  Travel · Highlands
                </span>
                <h4 className="text-lg font-serif text-[#1A1A1A] group-hover:text-[#24424F] transition-colors leading-snug">
                  <Link href="/travel/scottish-highlands-travel-guide">
                    The Great Scottish Sporting Estates &amp; Castles
                  </Link>
                </h4>
                <p className="mt-1 text-xs text-[#5B5B5B] font-serif italic">
                  Across heathered glens and ancient pine forests in Scotland’s wild north.
                </p>
              </article>

              {/* Card 3: UK Edition Hub */}
              <article className="group">
                <div className="relative w-full aspect-[4/5] bg-[#D9D4CA] overflow-hidden mb-3 border border-[#D9D4CA]">
                  <Image
                    src="/images/uk-heritage/balmoral-castle.webp"
                    alt="Balmoral Castle estate in Royal Deeside, Aberdeenshire, Scotland"
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-[#FAF8F4]/90 text-[10px] uppercase tracking-[0.16em] px-2 py-0.5 text-[#24424F] font-sans font-medium">
                    UK Edition
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#24424F] font-sans block mb-1">
                  Living Heritage · Britain
                </span>
                <h4 className="text-lg font-serif text-[#1A1A1A] group-hover:text-[#24424F] transition-colors leading-snug">
                  <Link href="/uk">
                    British Heritage, Royalty &amp; Luxury Travel
                  </Link>
                </h4>
                <p className="mt-1 text-xs text-[#5B5B5B] font-serif italic">
                  Royal estates, Scottish castles, English country houses, and luxury travel.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER SIGN-UP ── */}
        <BalmoralNewsletter />
      </main>

      {/* ── DEDICATED DARK --HERITAGE FOOTER ── */}
      <BalmoralFooter />
    </div>
  );
}

/* ── "The Details" Info Box Component ── */
function TheDetailsPanel() {
  return (
    <div className="bg-[#EFE9DF] border border-[#D9D4CA] p-6 sm:p-7 shadow-sm">
      <span className="text-[10px] uppercase tracking-[0.26em] font-semibold text-[#24424F] block mb-2 font-sans">
        The Details
      </span>
      <h3 className="text-xl font-serif text-[#1A1A1A] leading-tight mb-4">
        The Balmoral, a Rocco Forte Hotel
      </h3>

      <div className="space-y-3 text-xs font-sans text-[#1A1A1A] border-t border-[#D9D4CA] pt-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.18em] text-[#5B5B5B] block mb-0.5">Address</span>
          <p className="font-medium text-[#1A1A1A]">1 Princes Street, Edinburgh EH2 2EQ, Scotland</p>
        </div>

        <div>
          <span className="text-[10px] uppercase tracking-[0.18em] text-[#5B5B5B] block mb-0.5">Contact</span>
          <p className="font-medium">
            <a href="tel:+441315562414" className="hover:text-[#24424F]">+44 131 556 2414</a>
            <span className="mx-2 text-[#5B5B5B]">·</span>
            <a
              href="https://www.roccofortehotels.com/hotels-and-resorts/the-balmoral-hotel/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#24424F] underline underline-offset-2"
            >
              roccofortehotels.com
            </a>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div>
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#5B5B5B] block mb-0.5">Opened</span>
            <p className="font-medium">15 October 1902</p>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#5B5B5B] block mb-0.5">Listing</span>
            <p className="font-medium">Category B (1994)</p>
          </div>
        </div>

        <div className="pt-1">
          <span className="text-[10px] uppercase tracking-[0.18em] text-[#5B5B5B] block mb-0.5">Architect</span>
          <p className="font-medium leading-snug">William Hamilton Beattie (completed by Andrew Robb Scott)</p>
        </div>

        <div className="pt-1">
          <span className="text-[10px] uppercase tracking-[0.18em] text-[#5B5B5B] block mb-0.5">Interiors</span>
          <p className="font-medium">Olga Polizzi</p>
        </div>
      </div>
    </div>
  );
}
