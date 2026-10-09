import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "@/app/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Dining: Modern Rajputana, Palace Banquets & Haute Cuisine | The Royal Gallerys",
  description:
    "The International Magazine of Heritage & Luxury Dining — exploring contemporary Rajputana gastronomy, historic palace kitchens, British country-house dining, master chefs, and the rituals of the table.",
  alternates: {
    canonical: "https://theroyalgallerys.com/dining",
  },
  openGraph: {
    title: "Dining: Modern Rajputana, Palace Banquets & Haute Cuisine — The Royal Gallerys",
    description:
      "From royal khansamas and hand-hammered kansa thaals to grand British country estates and progressive international tasting menus.",
    url: "https://theroyalgallerys.com/dining",
    siteName: "The Royal Gallerys",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: "https://theroyalgallerys.com/images/dining/hero-palace-dining.webp",
        width: 2400,
        height: 1600,
        alt: "Palace state dining hall with crystal chandeliers and formal tablescape",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dining — The Royal Gallerys",
    description:
      "The Art of the Table · Modern Rajputana · Palace Kitchens · Haute Cuisine · Terroir",
    images: ["https://theroyalgallerys.com/images/dining/hero-palace-dining.webp"],
  },
};

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiMxYTFhMWEiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

interface DiningArticleCard {
  href: string;
  category: string;
  title: string;
  dek: string;
  image: string;
  author: string;
  readTime: string;
}

const LEAD_STORY: DiningArticleCard = {
  href: "/dining/the-royal-kitchens-of-india-recipes-lost-and-found",
  category: "Lead Cover Story · Culinary Heritage",
  title: "The Royal Kitchens of India: Recipes Lost and Found",
  dek: "Behind the vaulted sandstone walls of India's royal residences, master khansamas guarded handwritten recipe manuscripts for centuries. Today, royal custodians and historians are unearthing these lost culinary treatises before they vanish forever.",
  image: "/images/dining/rajputana-royal-thali.webp",
  author: "Devika Rathore",
  readTime: "16 min read",
};

const RAJPUTANA_STORIES: DiningArticleCard[] = [
  {
    href: "/dining/rajputana-at-the-table-royal-culinary-traditions",
    category: "Rajputana Dining · Royal Lineage",
    title: "Rajputana at the Table: The Art of a Royal Culinary Tradition",
    dek: "From Mewar's game pits to Marwar's austere sun-dried delicacies: how desert scarcity, royal shikargahs, and courtly ceremonies produced one of the world's most sophisticated culinary philosophies.",
    image: "/images/dining/heritage-spices-terroir.webp",
    author: "Maharani Priyadarshini Kumari",
    readTime: "15 min read",
  },
  {
    href: "/dining/the-royal-kitchens-of-india-recipes-lost-and-found",
    category: "Palace Archives · Rampur to Mewar",
    title: "The Secret Treatises of the Khansamas: From Awadh to Sailana",
    dek: "Decrypting the nuskhas — handwritten culinary notebooks encoded in Old Rajasthani and Persian — where medicine, botanical distillations, and courtly diplomacy met.",
    image: "/images/dining/rajputana-royal-thali.webp",
    author: "Devika Rathore",
    readTime: "16 min read",
  },
];

const WORLDS_TABLE_STORIES: DiningArticleCard[] = [
  {
    href: "/dining/britains-country-house-dining-living-traditions",
    category: "British Gastronomy · Country Houses",
    title: "Inside Britain's Country-House Dining: Walled Gardens, Game and The Long Table",
    dek: "How historic British estates — from Chatsworth to Gleneagles — preserve the ritual of the long table, estate-reared venison, Victorian walled gardens, and courtly entertaining.",
    image: "/images/dining/country-house-dining.webp",
    author: "Alistair Campbell",
    readTime: "14 min read",
  },
  {
    href: "/travel/the-balmoral",
    category: "Grande Dame Hotel · Edinburgh",
    title: "The Balmoral, Edinburgh: Number One & Palm Court Tea Ritual",
    dek: "The historic Scottish railway landmark where Michelin-calibre dining meets the iconic dome of the Palm Court, pairing rare single malts with Highlands game.",
    image: "/assets/images/balmoral/balmoral-exterior-hero.jpg",
    author: "The Royal Gallerys Travel Bureau",
    readTime: "14 min read",
  },
  {
    href: "/travel/london-travel-guide",
    category: "Capital Feature · London",
    title: "London: Mayfair Palaces, St James's Dining Salons & Historic Clubs",
    dek: "Two centuries of gastronomic diplomacy seen through London's finest institutions — from Claridge's and The Connaught to private cellars in St James's.",
    image: "/images/experiences/29-london/img-01.webp",
    author: "The Royal Gallerys Travel Bureau",
    readTime: "17 min read",
  },
];

const HOSPITALITY_STORIES: DiningArticleCard[] = [
  {
    href: "/dining/the-art-of-hosting-tablescaping-and-courtly-ritual",
    category: "The Art of the Table · Tablescaping",
    title: "The Silver, the Linen and the Ritual of the Table: The Art of Imperial Entertaining",
    dek: "The architecture of the dining table: from hand-hammered kansa and antique silver candelabra to hand-spun Irish linen and the courtly etiquette of grand receptions.",
    image: "/images/dining/tablescaping-silver-ritual.webp",
    author: "Countess Marina von Walderdorff",
    readTime: "13 min read",
  },
  {
    href: "/dining/the-rise-of-indian-single-malt",
    category: "Terroir & Cellars · Single Malt",
    title: "The Rise of Indian Single Malt: Terroir, Wood and Accelerated Maturation",
    dek: "How tropical humidity, Himalayan six-row barley, and American bourbon casks made Indian single malts the most sought-after bottles among international collectors.",
    image: "/images/dining/indian-single-malt-casks.webp",
    author: "Vikramaditya Sengupta",
    readTime: "14 min read",
  },
  {
    href: "/dining/darjeeling-assam-nilgiri-the-terroir-of-indian-tea",
    category: "Living Heritage · Tea Terroir",
    title: "Darjeeling, Assam, Nilgiri: The Terroir of Indian Tea",
    dek: "From first-flush muscatel in the Himalayan mist of Darjeeling to malty Brahmaputra estates: an authoritative exploration of India's grand cru tea harvests.",
    image: "/images/dining/darjeeling-tea-terroir.webp",
    author: "Ananya Sen-Gupta",
    readTime: "15 min read",
  },
];

const CHEF_CRAFT_STORIES: DiningArticleCard[] = [
  {
    href: "/dining/the-new-guard-indian-chefs-redefining-global-fine-dining",
    category: "Chefs & Craft · Haute Cuisine",
    title: "The New Guard: Indian Chefs Redefining Global Fine Dining",
    dek: "From London and Bangkok to New York and New Delhi, how a visionary generation of chefs is stripping Indian cuisine of clichés to craft rigorous, ingredient-driven degustations.",
    image: "/images/dining/chef-craft-kitchen.webp",
    author: "Kabir Mehra",
    readTime: "16 min read",
  },
  {
    href: "/dining/the-new-language-of-indian-fine-dining",
    category: "Haute Cuisine · Degustation",
    title: "The New Language of Indian Fine Dining: Modernity, Terroir and Restraint",
    dek: "Moving beyond heavy gravies and generic tandoori platters: why progressive Indian gastronomy now commands the world's most critical dining accolades.",
    image: "/images/dining/contemporary-indian-plating.webp",
    author: "Vikramaditya Sengupta",
    readTime: "15 min read",
  },
];

const PALACE_DESTINATIONS: DiningArticleCard[] = [
  {
    href: "/dining/palace-dining-the-worlds-most-spectacular-restaurant-settings",
    category: "Palace Dining · Gastronomic Travel",
    title: "Palace Dining: The World's Most Spectacular Restaurant Settings",
    dek: "From Suvarna Mahal under Florentine ceiling frescoes to the 101 Table of Taj Falaknuma and marble pavilions overlooking Lake Pichola: the world's grandest halls to dine.",
    image: "/images/dining/hero-palace-dining.webp",
    author: "Rohan Singhal",
    readTime: "15 min read",
  },
  {
    href: "/dining/palace-dining-the-worlds-most-spectacular-restaurant-settings",
    category: "Heritage Salons · Private Dining",
    title: "Private Palace Salons: Where Dining Becomes Imperial Theater",
    dek: "A curated connoisseur's itinerary through private heritage dining chambers across Rajasthan, Hyderabad, and the princely states of Central India.",
    image: "/images/dining/private-dining-sanctuary.webp",
    author: "Devika Rathore",
    readTime: "12 min read",
  },
];

export default function DiningPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#181714]">
      {/* ── MASTHEAD & HERO HEADER ─────────────────────────────────── */}
      <header className="border-b border-[#EAE3D5] bg-[#FAF8F5]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 pt-10 pb-12 sm:pt-16 sm:pb-16">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.28em] font-sans text-[#8A7352] mb-3 font-semibold">
              The Royal Gallerys · Gastronomy &amp; Living Heritage
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal tracking-tight text-[#181714] mb-4">
              DINING
            </h1>
            <p className="text-xs sm:text-sm uppercase tracking-[0.22em] text-[#8A7352] font-sans font-medium mb-6">
              The Art of the Table · Culinary Heritage · Exceptional Restaurants · Gastronomic Travel
            </p>
            <div className="w-16 h-px bg-[#8A7352]/40 mb-6" />
            <p className="text-base sm:text-lg text-[#555047] font-serif leading-relaxed max-w-2xl italic">
              &ldquo;Across royal palaces, desert fortresses, British country estates, and the vanguard of contemporary haute cuisine, dining survives not simply as sustenance, but as living culture, architectural theater, and courtly ritual.&rdquo;
            </p>

            {/* CURATOR NAV PILLS */}
            <nav className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8 pt-6 border-t border-[#EAE3D5] w-full text-xs font-sans tracking-widest uppercase">
              <a href="#the-dining-edit" className="px-3.5 py-1.5 rounded-full border border-[#D5CCBF] bg-white text-[#181714] hover:border-[#8A7352] transition-colors">
                The Dining Edit
              </a>
              <a href="#rajputana" className="px-3.5 py-1.5 rounded-full border border-[#D5CCBF] bg-white text-[#181714] hover:border-[#8A7352] transition-colors">
                Rajputana at the Table
              </a>
              <a href="#worlds-table" className="px-3.5 py-1.5 rounded-full border border-[#D5CCBF] bg-white text-[#181714] hover:border-[#8A7352] transition-colors">
                The World&apos;s Table
              </a>
              <a href="#hospitality" className="px-3.5 py-1.5 rounded-full border border-[#D5CCBF] bg-white text-[#181714] hover:border-[#8A7352] transition-colors">
                Art of Hospitality
              </a>
              <a href="#chefs-craft" className="px-3.5 py-1.5 rounded-full border border-[#D5CCBF] bg-white text-[#181714] hover:border-[#8A7352] transition-colors">
                The Chef &amp; Craft
              </a>
              <a href="#destinations" className="px-3.5 py-1.5 rounded-full border border-[#D5CCBF] bg-white text-[#181714] hover:border-[#8A7352] transition-colors">
                Palace Sanctuaries
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* ── SECTION A: THE DINING EDIT (LEAD COVER STORY) ───────────── */}
      <section id="the-dining-edit" className="py-12 sm:py-20 border-b border-[#EAE3D5] bg-[#FAF8F5]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#EAE3D5]">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8A7352]" />
              <span className="text-[11px] uppercase tracking-[0.24em] font-sans font-semibold text-[#8A7352]">
                Section A · The Dining Edit
              </span>
            </div>
            <span className="text-xs uppercase tracking-widest text-[#7D766B] font-sans hidden sm:inline-block">
              Lead Feature
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* HERO IMAGE CONTAINER */}
            <div className="lg:col-span-7">
              <Link href={LEAD_STORY.href} className="group block relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-sm bg-[#EAE3D5]">
                <Image
                  src={LEAD_STORY.image}
                  alt={LEAD_STORY.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#181714] text-[#F4F0E7] text-[10px] uppercase font-sans tracking-[0.2em] px-3 py-1 font-semibold">
                    Cover Feature
                  </span>
                </div>
              </Link>
            </div>

            {/* HERO EDITORIAL COPY */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-[11px] uppercase tracking-[0.22em] text-[#8A7352] font-sans font-semibold mb-3">
                {LEAD_STORY.category}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#181714] font-normal leading-[1.12] mb-4 group">
                <Link href={LEAD_STORY.href} className="hover:text-[#8A7352] transition-colors">
                  {LEAD_STORY.title}
                </Link>
              </h2>
              <p className="text-sm sm:text-base text-[#555047] font-serif leading-relaxed mb-6">
                {LEAD_STORY.dek}
              </p>
              <div className="flex items-center gap-4 text-xs font-sans text-[#7D766B] pt-4 border-t border-[#EAE3D5]">
                <span>By {LEAD_STORY.author}</span>
                <span>·</span>
                <span>{LEAD_STORY.readTime}</span>
              </div>
              <div className="mt-6">
                <Link
                  href={LEAD_STORY.href}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-sans font-medium text-[#181714] hover:text-[#8A7352] transition-colors group"
                >
                  Read Full Editorial
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION B: RAJPUTANA AT THE TABLE ───────────────────────── */}
      <section id="rajputana" className="py-16 sm:py-24 border-b border-[#EAE3D5] bg-[#F7F4EE]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* SECTION HEADER */}
          <div className="max-w-3xl mb-12">
            <span className="text-[11px] uppercase tracking-[0.25em] font-sans font-semibold text-[#8A7352] block mb-2">
              01 · Rajputana at the Table
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#181714] leading-tight mb-4">
              Desert Fortresses, Sacred Spices &amp; Royal Thaal Geometry
            </h2>
            <p className="text-base text-[#555047] font-serif leading-relaxed">
              In the royal courts of Mewar, Marwar, and Amber, gastronomy was an alchemy of warfare, climate, and Ayurvedic balance. Meals were served on hand-beaten kansa and engraved silver, calibrated to the seasons and prepared with heirloom single-estate spices.
            </p>
          </div>

          {/* RAJPUTANA TERROIR PILLARS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 p-6 sm:p-8 bg-white border border-[#EAE3D5] rounded-sm">
            <div className="border-b md:border-b-0 md:border-r border-[#EAE3D5] pb-6 md:pb-0 md:pr-6">
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#8A7352] font-sans font-semibold block mb-2">
                Terroir · Jodhpur
              </span>
              <h3 className="text-xl font-serif text-[#181714] mb-2">Mathania Chillies</h3>
              <p className="text-xs text-[#555047] leading-relaxed font-sans">
                Grown exclusively in a micro-pocket near Jodhpur. Prized for brilliant deep-scarlet colour and slow, gentle smokiness without aggressive, numbing pungency.
              </p>
            </div>
            <div className="border-b md:border-b-0 md:border-r border-[#EAE3D5] pb-6 md:pb-0 md:pr-6">
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#8A7352] font-sans font-semibold block mb-2">
                The Royal Hunt · Mewar
              </span>
              <h3 className="text-xl font-serif text-[#181714] mb-2">Maas ke Sooley</h3>
              <p className="text-xs text-[#555047] leading-relaxed font-sans">
                The quintessential camp preparation of Rajput warriors. Thin escalopes of wild game marinated in wild souring curd and roasted over babool wood charcoals.
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#8A7352] font-sans font-semibold block mb-2">
                Vedic Chemistry · The Thaal
              </span>
              <h3 className="text-xl font-serif text-[#181714] mb-2">Kansa &amp; Pure Silver</h3>
              <p className="text-xs text-[#555047] leading-relaxed font-sans">
                Bell metal alloys of 78% copper and 22% tin, prescribed in courtly Ayurvedic manuscripts to cool body heat, preserve digestive fire, and conduct thermal energy.
              </p>
            </div>
          </div>

          {/* ARTICLE CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {RAJPUTANA_STORIES.map((article) => (
              <article key={article.title} className="group flex flex-col bg-white border border-[#EAE3D5] rounded-sm overflow-hidden hover:shadow-sm transition-shadow">
                <Link href={article.href} className="relative aspect-[16/10] overflow-hidden bg-[#EAE3D5]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                  />
                </Link>
                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A7352] font-sans font-semibold mb-2">
                    {article.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-[#181714] font-normal leading-snug mb-3">
                    <Link href={article.href} className="group-hover:text-[#8A7352] transition-colors">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#555047] font-serif leading-relaxed mb-6 flex-1">
                    {article.dek}
                  </p>
                  <div className="flex items-center justify-between text-xs font-sans text-[#7D766B] pt-4 border-t border-[#EAE3D5]">
                    <span>By {article.author}</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION C: THE WORLD'S TABLE ────────────────────────────── */}
      <section id="worlds-table" className="py-16 sm:py-24 border-b border-[#EAE3D5] bg-[#FAF8F5]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* SECTION HEADER */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#EAE3D5] gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] font-sans font-semibold text-[#8A7352] block mb-2">
                02 · The World&apos;s Table
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#181714]">
                British Country Estates &amp; European Degustations
              </h2>
            </div>
            <p className="text-sm text-[#555047] font-serif max-w-md italic">
              From the Victorian walled gardens of Derbyshire to the cellars of Mayfair and Edinburgh&apos;s historic dining rooms.
            </p>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WORLDS_TABLE_STORIES.map((article) => (
              <article key={article.title} className="group flex flex-col bg-white border border-[#EAE3D5] rounded-sm overflow-hidden hover:border-[#8A7352]/40 transition-colors">
                <Link href={article.href} className="relative aspect-[4/3] overflow-hidden bg-[#EAE3D5]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                  />
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A7352] font-sans font-semibold mb-2">
                    {article.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif text-[#181714] font-normal leading-snug mb-3">
                    <Link href={article.href} className="group-hover:text-[#8A7352] transition-colors">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#555047] font-serif leading-relaxed mb-6 flex-1">
                    {article.dek}
                  </p>
                  <div className="flex items-center justify-between text-xs font-sans text-[#7D766B] pt-4 border-t border-[#EAE3D5]">
                    <span>{article.author}</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION D: THE ART OF HOSPITALITY & RITUAL ───────────────── */}
      <section id="hospitality" className="py-16 sm:py-24 border-b border-[#EAE3D5] bg-[#11110F] text-[#F4F0E7]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* DARK THEMED SECTION HEADER */}
          <div className="max-w-3xl mb-12">
            <span className="text-[11px] uppercase tracking-[0.28em] font-sans font-semibold text-[#B8A47A] block mb-2">
              03 · The Art of Hospitality
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#F4F0E7] leading-tight mb-4">
              Tablescaping, Imperial Silver, Single Malt &amp; High-Altitude Teas
            </h2>
            <p className="text-base text-[#B3ACA0] font-serif leading-relaxed">
              Entertaining at the highest level requires more than exceptional cooking. It demands an orchestrated choreography of candlelight, linen weight, crystal provenance, and distilled terroir.
            </p>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOSPITALITY_STORIES.map((article) => (
              <article key={article.title} className="group flex flex-col bg-[#1A1A18] border border-[#2E2C27] rounded-sm overflow-hidden hover:border-[#B8A47A]/50 transition-colors">
                <Link href={article.href} className="relative aspect-[4/3] overflow-hidden bg-[#242320]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                  />
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#B8A47A] font-sans font-semibold mb-2">
                    {article.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif text-[#F4F0E7] font-normal leading-snug mb-3">
                    <Link href={article.href} className="group-hover:text-[#B8A47A] transition-colors">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#B3ACA0] font-serif leading-relaxed mb-6 flex-1">
                    {article.dek}
                  </p>
                  <div className="flex items-center justify-between text-xs font-sans text-[#7D766B] pt-4 border-t border-[#2E2C27]">
                    <span>{article.author}</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION E: THE CHEF & THE CRAFT ─────────────────────────── */}
      <section id="chefs-craft" className="py-16 sm:py-24 border-b border-[#EAE3D5] bg-[#FAF8F5]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* SECTION HEADER */}
          <div className="max-w-3xl mb-12">
            <span className="text-[11px] uppercase tracking-[0.25em] font-sans font-semibold text-[#8A7352] block mb-2">
              04 · The Chef &amp; The Craft
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#181714] leading-tight mb-4">
              The Masters of Modern Culinary Architecture
            </h2>
            <p className="text-base text-[#555047] font-serif leading-relaxed">
              The contemporary Indian culinary vanguard is not merely modernising old dishes; they are decoding flavour chemistry, negative spice pairing, and forgotten micro-regional fermentations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {CHEF_CRAFT_STORIES.map((article) => (
              <article key={article.title} className="group flex flex-col bg-white border border-[#EAE3D5] rounded-sm overflow-hidden hover:border-[#8A7352]/40 transition-colors">
                <Link href={article.href} className="relative aspect-[16/10] overflow-hidden bg-[#EAE3D5]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                  />
                </Link>
                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A7352] font-sans font-semibold mb-2">
                    {article.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-[#181714] font-normal leading-snug mb-3">
                    <Link href={article.href} className="group-hover:text-[#8A7352] transition-colors">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#555047] font-serif leading-relaxed mb-6 flex-1">
                    {article.dek}
                  </p>
                  <div className="flex items-center justify-between text-xs font-sans text-[#7D766B] pt-4 border-t border-[#EAE3D5]">
                    <span>By {article.author}</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION F: DESTINATIONS & PALACE RESTAURANTS ─────────────── */}
      <section id="destinations" className="py-16 sm:py-24 border-b border-[#EAE3D5] bg-[#F7F4EE]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* SECTION HEADER */}
          <div className="max-w-3xl mb-12">
            <span className="text-[11px] uppercase tracking-[0.25em] font-sans font-semibold text-[#8A7352] block mb-2">
              05 · Destinations &amp; Experiences
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#181714] leading-tight mb-4">
              Dining in Historic Sanctuaries: The Grandest Halls of the World
            </h2>
            <p className="text-base text-[#555047] font-serif leading-relaxed">
              When the dining room itself is an architectural masterpiece — where crystal chandeliers, hand-painted gold ceilings, and marble verandas create an unforgettable culinary stage.
            </p>
          </div>

          {/* PALACE SPOTLIGHT CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {PALACE_DESTINATIONS.map((article) => (
              <article key={article.title} className="group flex flex-col bg-white border border-[#EAE3D5] rounded-sm overflow-hidden hover:shadow-sm transition-shadow">
                <Link href={article.href} className="relative aspect-[16/10] overflow-hidden bg-[#EAE3D5]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                  />
                </Link>
                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A7352] font-sans font-semibold mb-2">
                    {article.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-[#181714] font-normal leading-snug mb-3">
                    <Link href={article.href} className="group-hover:text-[#8A7352] transition-colors">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-xs sm:text-sm text-[#555047] font-serif leading-relaxed mb-6 flex-1">
                    {article.dek}
                  </p>
                  <div className="flex items-center justify-between text-xs font-sans text-[#7D766B] pt-4 border-t border-[#EAE3D5]">
                    <span>By {article.author}</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* ARCHITECTURAL DIRECTORY CALLOUT */}
          <div className="border border-[#EAE3D5] bg-white p-8 sm:p-10 rounded-sm">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8A7352] font-sans font-semibold block mb-2">
              The Connoisseur&apos;s Itinerary
            </span>
            <h3 className="text-2xl font-serif text-[#181714] mb-6">
              Essential Palace &amp; Heritage Dining Salons
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs font-sans">
              <div className="border-t border-[#EAE3D5] pt-4">
                <p className="font-semibold text-[#181714] mb-1">Suvarna Mahal</p>
                <p className="text-[#8A7352] mb-1">Rambagh Palace · Jaipur</p>
                <p className="text-[#6B655B] leading-relaxed">
                  Florentine ceiling frescoes, alabaster urns, and silver thaal tasting menus curated with royal families.
                </p>
              </div>
              <div className="border-t border-[#EAE3D5] pt-4">
                <p className="font-semibold text-[#181714] mb-1">The 101 Table</p>
                <p className="text-[#8A7352] mb-1">Taj Falaknuma · Hyderabad</p>
                <p className="text-[#6B655B] leading-relaxed">
                  The world&apos;s longest dining table in carved rosewood with 101 chairs and acoustics calibrated for whispering.
                </p>
              </div>
              <div className="border-t border-[#EAE3D5] pt-4">
                <p className="font-semibold text-[#181714] mb-1">Durbar Hall &amp; Pichola</p>
                <p className="text-[#8A7352] mb-1">City Palace · Udaipur</p>
                <p className="text-[#6B655B] leading-relaxed">
                  Waterfront marble verandas and portrait galleries where Mewari game and winter lentils are served.
                </p>
              </div>
              <div className="border-t border-[#EAE3D5] pt-4">
                <p className="font-semibold text-[#181714] mb-1">The Palm Court</p>
                <p className="text-[#8A7352] mb-1">The Balmoral · Edinburgh</p>
                <p className="text-[#6B655B] leading-relaxed">
                  Venetian glass chandelier, harpist, and the definitive British afternoon tea pairing Scottish game and rare teas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER & MEMBERSHIP ─────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#FAF8F5]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8A7352] font-sans font-semibold block mb-3">
            The Royal Gallerys · Private Cellars &amp; Tables
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#181714] mb-4">
            Receive The Gastronomy Dispatch
          </h2>
          <p className="text-sm text-[#555047] font-serif leading-relaxed mb-8 max-w-xl mx-auto">
            Weekly essays on palace culinary archives, secret restaurant reservations, rare single malt releases, and the art of imperial tablescaping.
          </p>
          <div className="max-w-md mx-auto">
            <NewsletterForm variant="light" source="dining-landing" />
          </div>
        </div>
      </section>
    </main>
  );
}
