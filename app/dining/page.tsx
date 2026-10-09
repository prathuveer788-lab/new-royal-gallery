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

interface ArticleCard {
  href: string;
  category: string;
  title: string;
  dek: string;
  image: string;
  author: string;
  readTime: string;
}

// ── SECTION A: LEAD STORIES ───────────────────────────────
const LEAD_COVER: ArticleCard = {
  href: "/dining/the-royal-kitchens-of-india-recipes-lost-and-found",
  category: "Cover Feature · Palace Kitchens",
  title: "The Royal Kitchens of India: Recipes Lost and Found",
  dek: "Behind the vaulted sandstone walls of India's royal residences, master khansamas guarded handwritten recipe manuscripts for centuries. Today, royal custodians and historians are unearthing these lost culinary treatises before they vanish forever.",
  image: "/images/dining/rajputana-royal-thali.webp",
  author: "Devika Rathore",
  readTime: "16 min read",
};

const LEAD_TRIO: ArticleCard[] = [
  {
    href: "/dining/the-nizams-feast-inside-the-royal-dawat-of-hyderabad",
    category: "Royal Dawat · Hyderabad",
    title: "The Nizam's Feast: Inside the Royal Dawat of Hyderabad",
    dek: "Seated around the world's longest rosewood table at Taj Falaknuma beneath Venetian chandeliers: the acoustic marvels, sealed copper degchis, and lasting legacy of Asaf Jahi banqueting.",
    image: "/images/dining/falaknuma-101-table.webp",
    author: "Mirza Zafar Ali",
    readTime: "15 min read",
  },
  {
    href: "/dining/rajputana-at-the-table-royal-culinary-traditions",
    category: "Rajputana Dining · Court Lineage",
    title: "Rajputana at the Table: The Art of a Royal Culinary Tradition",
    dek: "From Mewar's game pits to Marwar's sun-dried delicacies: how desert scarcity, royal shikargahs, and courtly ceremonies produced one of the world's most sophisticated culinary philosophies.",
    image: "/images/dining/heritage-spices-terroir.webp",
    author: "Maharani Priyadarshini Kumari",
    readTime: "15 min read",
  },
  {
    href: "/dining/michelin-stars-and-modern-indian-gastronomy",
    category: "Haute Cuisine · Global Stage",
    title: "Michelin Stars and Modern Indian Gastronomy",
    dek: "From Mayfair's two-starred Gymkhana and Dubai's Tresind Studio to Bangkok and New York: how a fearless generation decoupled Indian food from curry clichés to construct a new global language.",
    image: "/images/dining/michelin-indian-modernist.webp",
    author: "Kabir Mehra",
    readTime: "15 min read",
  },
];

// ── SECTION B: RAJPUTANA AT THE TABLE ───────────────────────
const RAJPUTANA_STORIES: ArticleCard[] = [
  {
    href: "/dining/mathania-to-marwar-the-sacred-chillies-of-rajasthan",
    category: "Terroir · Jodhpur",
    title: "Mathania to Marwar: The Sacred Chillies of Rajasthan",
    dek: "In a narrow agricultural pocket north of Jodhpur, desert soil and intense diurnal temperature swings yield the ruby pepper that gives royal Lal Maas its crimson glow and velvet warmth.",
    image: "/images/dining/mathania-chillies-desert.webp",
    author: "Raghuvendra Singh Rathore",
    readTime: "14 min read",
  },
  {
    href: "/dining/maas-ke-sooley-the-warrior-cuisine-of-the-rajputs",
    category: "Courtly Game · Mewar",
    title: "Maas ke Sooley: The Warrior Cuisine of the Rajputs",
    dek: "Smoked over glowing babool coals, tenderised with wild kachri melon, and finished with the courtly dhungar clove-smoke ritual: the enduring delicacy of open-air royal hunting encampments.",
    image: "/images/dining/maas-ke-sooley-charcoal.webp",
    author: "Maharani Priyadarshini Kumari",
    readTime: "15 min read",
  },
  {
    href: "/dining/the-secret-manuscripts-of-sailana-and-rampur",
    category: "Palace Archives · Central India",
    title: "The Secret Manuscripts of Sailana and Rampur",
    dek: "Decrypting handwritten royal recipe treatises where Maharaja Digvijaya Singh of Sailana brought laboratory precision to sandalwood pastes, while Rampur perfected rose-scented lamb halwa.",
    image: "/images/dining/sailana-palace-manuscript-cuisine.webp",
    author: "Devika Rathore",
    readTime: "16 min read",
  },
  {
    href: "/dining/the-royal-sweetmeats-silver-leaf-saffron-and-court-confectionery",
    category: "Court Confectionery · Artisanal Arts",
    title: "The Royal Sweetmeats: Silver Leaf, Saffron and Court Confectionery",
    dek: "Edible silver varq beaten between parchment to sub-micron gossamer, Kashmiri saffron strands, and slow-reduced mawa: why royal dessert tables were treated as medicinal and aesthetic sculpture.",
    image: "/images/dining/royal-mithai-silver-varq.webp",
    author: "Ananya Sen-Gupta",
    readTime: "14 min read",
  },
  {
    href: "/dining/the-shikargah-banquet-feasts-under-desert-stars",
    category: "Royal Encampments · Thar Desert",
    title: "The Shikargah Banquet: Feasts Under Desert Stars",
    dek: "Billowing silk shamianas lit by flaming mashaals and sand-pit roasted Khad Khargosh: how the romance of the desert hunting banquet survives in India's premier luxury retreats.",
    image: "/images/dining/desert-camp-candlelit-banquet.webp",
    author: "Rohan Singhal",
    readTime: "15 min read",
  },
];

// ── SECTION C: THE WORLD'S TABLE ───────────────────────────
const WORLDS_TABLE_STORIES: ArticleCard[] = [
  {
    href: "/dining/britains-country-house-dining-living-traditions",
    category: "British Gastronomy · Country Houses",
    title: "Inside Britain's Country-House Dining: Walled Gardens, Game and The Long Table",
    dek: "How historic British estates — from Chatsworth to Gleneagles — preserve the ritual of the long mahogany table, estate venison, Victorian walled gardens, and courtly entertaining.",
    image: "/images/dining/country-house-dining.webp",
    author: "Alistair Campbell",
    readTime: "14 min read",
  },
  {
    href: "/dining/afternoon-tea-at-the-grand-hotels-from-london-to-edinburgh",
    category: "Living Ritual · Great Britain",
    title: "Afternoon Tea at the Grand Hotels: From London to Edinburgh",
    dek: "Tiered silver stands, Cornish clotted cream, bone china, and first-flush Himalayan infusions: the living art of British afternoon tea at Claridge's, The Ritz, and The Balmoral.",
    image: "/images/dining/afternoon-tea-palm-court.webp",
    author: "Alistair Campbell",
    readTime: "13 min read",
  },
  {
    href: "/travel/the-balmoral",
    category: "Grande Dame Hotel · Edinburgh",
    title: "The Balmoral, Edinburgh: Number One & Palm Court Tea Ritual",
    dek: "The historic Scottish railway landmark at No. 1 Princes Street, pairing Michelin-calibre gastronomy with rare Speyside single malts beneath the soaring Venetian chandelier dome.",
    image: "/assets/images/balmoral/balmoral-exterior-hero.jpg",
    author: "The Royal Gallerys Travel Bureau",
    readTime: "14 min read",
  },
  {
    href: "/travel/london-travel-guide",
    category: "Capital Feature · London",
    title: "London: Mayfair Palaces, St James's Dining Salons & Historic Clubs",
    dek: "Two centuries of gastronomic diplomacy seen through London's finest institutions — from Claridge's and The Connaught to private members' cellars in St James's.",
    image: "/images/experiences/29-london/img-01.webp",
    author: "The Royal Gallerys Travel Bureau",
    readTime: "17 min read",
  },
];

// ── SECTION D: THE ART OF HOSPITALITY & RITUAL ─────────────
const HOSPITALITY_STORIES: ArticleCard[] = [
  {
    href: "/dining/the-art-of-hosting-tablescaping-and-courtly-ritual",
    category: "The Art of the Table · Tablescaping",
    title: "The Silver, the Linen and the Ritual of the Table: The Art of Imperial Entertaining",
    dek: "The architecture of the dining table: from antique silver candelabra and Irish linen to Waterford crystal and the choreographed service rituals of grand European and Indian receptions.",
    image: "/images/dining/tablescaping-silver-ritual.webp",
    author: "Countess Marina von Walderdorff",
    readTime: "13 min read",
  },
  {
    href: "/dining/the-art-of-the-kansa-thaal-ayurveda-metal-and-dining",
    category: "Ancient Metallurgy · Ayurveda",
    title: "The Art of the Kansa Thaal: Ayurveda, Metal and Dining",
    dek: "78% copper and 22% tin: why the Maharajas preferred hand-beaten bell metal over pure gold. The thermal conductivity, alkalising health properties, and geometric mandala of twelve katoris.",
    image: "/images/dining/silver-kansa-thaal-geometry.webp",
    author: "Countess Marina von Walderdorff",
    readTime: "14 min read",
  },
  {
    href: "/dining/the-rise-of-indian-single-malt",
    category: "Terroir & Cellars · Single Malt",
    title: "The Rise of Indian Single Malt: Terroir, Wood and Accelerated Maturation",
    dek: "How tropical humidity, Himalayan six-row barley, and bourbon oak casks made Indian single malts the most sought-after bottles among international collectors and auction houses.",
    image: "/images/dining/indian-single-malt-casks.webp",
    author: "Vikramaditya Sengupta",
    readTime: "14 min read",
  },
  {
    href: "/dining/darjeeling-assam-nilgiri-the-terroir-of-indian-tea",
    category: "Living Heritage · Tea Terroir",
    title: "Darjeeling, Assam, Nilgiri: The Terroir of Indian Tea",
    dek: "From first-flush spring muscatel in the Himalayan mist of Makaibari to malty Brahmaputra whole-leaf Assams and high-altitude Nilgiri frost harvests: India's grand cru estates.",
    image: "/images/dining/darjeeling-tea-terroir.webp",
    author: "Ananya Sen-Gupta",
    readTime: "15 min read",
  },
];

// ── SECTION E: THE CHEF & THE CRAFT ─────────────────────────
const CHEF_CRAFT_STORIES: ArticleCard[] = [
  {
    href: "/dining/the-new-guard-indian-chefs-redefining-global-fine-dining",
    category: "Chefs & Craft · Haute Cuisine",
    title: "The New Guard: Indian Chefs Redefining Global Fine Dining",
    dek: "From London and Bangkok to New York and New Delhi: how visionary chefs are stripping subcontinental food of clichés to craft rigorous, ingredient-driven, multi-course degustations.",
    image: "/images/dining/chef-craft-kitchen.webp",
    author: "Kabir Mehra",
    readTime: "16 min read",
  },
  {
    href: "/dining/the-new-language-of-indian-fine-dining",
    category: "Haute Cuisine · Degustation",
    title: "The New Language of Indian Fine Dining: Modernity, Terroir and Restraint",
    dek: "Moving beyond heavy gravies and generic tandoori platters: why progressive Indian gastronomy now commands the world's most critical dining accolades and discerning palates.",
    image: "/images/dining/contemporary-indian-plating.webp",
    author: "Vikramaditya Sengupta",
    readTime: "15 min read",
  },
  {
    href: "/dining/michelin-stars-and-modern-indian-gastronomy",
    category: "Michelin Guide · Innovation",
    title: "Deconstructing the Degustation: Negative Flavor Pairing and Modernist Precision",
    dek: "Scientific flavor chemistry meets heritage recipes: how top culinary labs prove that contrasting flavor compounds create the sublime harmony of subcontinental cooking.",
    image: "/images/dining/michelin-indian-modernist.webp",
    author: "Kabir Mehra",
    readTime: "15 min read",
  },
];

// ── SECTION F: DESTINATIONS & PALACE SANCTUARIES ─────────────
const PALACE_DESTINATIONS: ArticleCard[] = [
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
    href: "/dining/the-nizams-feast-inside-the-royal-dawat-of-hyderabad",
    category: "Heritage Salons · Private Banquets",
    title: "The 101 Dining Table at Taj Falaknuma Palace",
    dek: "A 108-foot rosewood masterpiece engineered for whispered diplomacy, Italian marble urns, and silver chilamchi hand-washing rituals that precede imperial dawat feasts.",
    image: "/images/dining/falaknuma-101-table.webp",
    author: "Mirza Zafar Ali",
    readTime: "15 min read",
  },
  {
    href: "/dining/palace-dining-the-worlds-most-spectacular-restaurant-settings",
    category: "Sanctuaries · Private Salons",
    title: "Private Palace Salons: Where Dining Becomes Imperial Theater",
    dek: "A curated connoisseur's itinerary through private heritage dining chambers across Rajasthan, Central India, and the regal courts of the Deccan.",
    image: "/images/dining/private-dining-sanctuary.webp",
    author: "Devika Rathore",
    readTime: "12 min read",
  },
  {
    href: "/dining/the-shikargah-banquet-feasts-under-desert-stars",
    category: "Outdoor Splendour · Rajasthan",
    title: "Lakeside Pavilions & Desert Dunes: Dining Beyond Four Walls",
    dek: "Candlelit terraces hovering over the moonlit waters of Udaipur, and lantern-lit royal tented camps in the Thar Desert where the stars form the ceiling.",
    image: "/images/dining/lake-pichola-pavilion-dining.webp",
    author: "Rohan Singhal",
    readTime: "15 min read",
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

      {/* ── SECTION A: THE DINING EDIT (LEAD COVER STORIES) ─────────── */}
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
              Lead Features &amp; Cover Stories
            </span>
          </div>

          {/* MAIN COVER STORY */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
            <div className="lg:col-span-7">
              <Link href={LEAD_COVER.href} className="group block relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-sm bg-[#EAE3D5]">
                <Image
                  src={LEAD_COVER.image}
                  alt={LEAD_COVER.title}
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
                    Cover Story
                  </span>
                </div>
              </Link>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-[11px] uppercase tracking-[0.22em] text-[#8A7352] font-sans font-semibold mb-3">
                {LEAD_COVER.category}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#181714] font-normal leading-[1.12] mb-4">
                <Link href={LEAD_COVER.href} className="hover:text-[#8A7352] transition-colors">
                  {LEAD_COVER.title}
                </Link>
              </h2>
              <p className="text-sm sm:text-base text-[#555047] font-serif leading-relaxed mb-6">
                {LEAD_COVER.dek}
              </p>
              <div className="flex items-center gap-4 text-xs font-sans text-[#7D766B] pt-4 border-t border-[#EAE3D5]">
                <span>By {LEAD_COVER.author}</span>
                <span>·</span>
                <span>{LEAD_COVER.readTime}</span>
              </div>
              <div className="mt-6">
                <Link
                  href={LEAD_COVER.href}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-sans font-medium text-[#181714] hover:text-[#8A7352] transition-colors group"
                >
                  Read Full Editorial
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* THREE SUPPORTING COVER FEATURES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[#EAE3D5]">
            {LEAD_TRIO.map((article) => (
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
                  <h3 className="text-xl font-serif text-[#181714] font-normal leading-snug mb-3">
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

          {/* RAJPUTANA ARTICLE CARDS (5 STORIES) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {RAJPUTANA_STORIES.map((article, idx) => (
              <article
                key={article.title}
                className={`group flex flex-col bg-white border border-[#EAE3D5] rounded-sm overflow-hidden hover:shadow-sm transition-shadow ${
                  idx === 0 ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <Link
                  href={article.href}
                  className={`relative overflow-hidden bg-[#EAE3D5] ${
                    idx === 0 ? "aspect-[16/9]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes={idx === 0 ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                  />
                </Link>
                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A7352] font-sans font-semibold mb-2">
                    {article.category}
                  </span>
                  <h3 className={`font-serif text-[#181714] font-normal leading-snug mb-3 ${idx === 0 ? "text-2xl sm:text-3xl" : "text-xl"}`}>
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

          {/* GRID (4 STORIES) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {WORLDS_TABLE_STORIES.map((article) => (
              <article key={article.title} className="group flex flex-col bg-white border border-[#EAE3D5] rounded-sm overflow-hidden hover:border-[#8A7352]/40 transition-colors">
                <Link href={article.href} className="relative aspect-[4/3] overflow-hidden bg-[#EAE3D5]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                  />
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A7352] font-sans font-semibold mb-2">
                    {article.category}
                  </span>
                  <h3 className="text-lg font-serif text-[#181714] font-normal leading-snug mb-3">
                    <Link href={article.href} className="group-hover:text-[#8A7352] transition-colors">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-[#555047] font-serif leading-relaxed mb-6 flex-1 line-clamp-3">
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

          {/* GRID (4 STORIES) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOSPITALITY_STORIES.map((article) => (
              <article key={article.title} className="group flex flex-col bg-[#1A1A18] border border-[#2E2C27] rounded-sm overflow-hidden hover:border-[#B8A47A]/50 transition-colors">
                <Link href={article.href} className="relative aspect-[4/3] overflow-hidden bg-[#242320]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                  />
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#B8A47A] font-sans font-semibold mb-2">
                    {article.category}
                  </span>
                  <h3 className="text-lg font-serif text-[#F4F0E7] font-normal leading-snug mb-3">
                    <Link href={article.href} className="group-hover:text-[#B8A47A] transition-colors">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-[#B3ACA0] font-serif leading-relaxed mb-6 flex-1 line-clamp-3">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CHEF_CRAFT_STORIES.map((article) => (
              <article key={article.title} className="group flex flex-col bg-white border border-[#EAE3D5] rounded-sm overflow-hidden hover:border-[#8A7352]/40 transition-colors">
                <Link href={article.href} className="relative aspect-[16/10] overflow-hidden bg-[#EAE3D5]">
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
                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A7352] font-sans font-semibold mb-2">
                    {article.category}
                  </span>
                  <h3 className="text-xl font-serif text-[#181714] font-normal leading-snug mb-3">
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

          {/* PALACE SPOTLIGHT CARDS (4 DESTINATIONS) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {PALACE_DESTINATIONS.map((article) => (
              <article key={article.title} className="group flex flex-col bg-white border border-[#EAE3D5] rounded-sm overflow-hidden hover:shadow-sm transition-shadow">
                <Link href={article.href} className="relative aspect-[4/3] overflow-hidden bg-[#EAE3D5]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                  />
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A7352] font-sans font-semibold mb-2">
                    {article.category}
                  </span>
                  <h3 className="text-lg font-serif text-[#181714] font-normal leading-snug mb-3">
                    <Link href={article.href} className="group-hover:text-[#8A7352] transition-colors">
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-[#555047] font-serif leading-relaxed mb-6 flex-1 line-clamp-3">
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

      {/* ── SECTION G: COMPLETE EDITORIAL ARCHIVE DIRECTORY ─────────── */}
      <section className="py-16 sm:py-24 border-b border-[#EAE3D5] bg-[#FAF8F5]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl mb-12">
            <span className="text-[11px] uppercase tracking-[0.25em] font-sans font-semibold text-[#8A7352] block mb-2">
              The Archive
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#181714] leading-tight mb-4">
              All Gastronomy &amp; Dining Features
            </h2>
            <p className="text-sm text-[#555047] font-serif leading-relaxed">
              Explore the complete collection of 18 long-form investigations, recipes, terroir essays, and interviews across royal courts and international dining capitals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "The Royal Kitchens of India: Recipes Lost and Found",
                href: "/dining/the-royal-kitchens-of-india-recipes-lost-and-found",
                category: "Palace Kitchens",
                time: "16 min read"
              },
              {
                title: "Rajputana at the Table: Royal Culinary Traditions",
                href: "/dining/rajputana-at-the-table-royal-culinary-traditions",
                category: "Rajputana Dining",
                time: "15 min read"
              },
              {
                title: "Mathania to Marwar: The Sacred Chillies of Rajasthan",
                href: "/dining/mathania-to-marwar-the-sacred-chillies-of-rajasthan",
                category: "Rajputana Terroir",
                time: "14 min read"
              },
              {
                title: "Maas ke Sooley: The Warrior Cuisine of the Rajputs",
                href: "/dining/maas-ke-sooley-the-warrior-cuisine-of-the-rajputs",
                category: "Courtly Game",
                time: "15 min read"
              },
              {
                title: "The Secret Manuscripts of Sailana and Rampur",
                href: "/dining/the-secret-manuscripts-of-sailana-and-rampur",
                category: "Palace Archives",
                time: "16 min read"
              },
              {
                title: "The Nizam's Feast: Inside the Royal Dawat of Hyderabad",
                href: "/dining/the-nizams-feast-inside-the-royal-dawat-of-hyderabad",
                category: "Royal Heritage",
                time: "15 min read"
              },
              {
                title: "The New Guard: Indian Chefs Redefining Global Fine Dining",
                href: "/dining/the-new-guard-indian-chefs-redefining-global-fine-dining",
                category: "Chefs & Craft",
                time: "16 min read"
              },
              {
                title: "The New Language of Indian Fine Dining: Modernity, Terroir and Restraint",
                href: "/dining/the-new-language-of-indian-fine-dining",
                category: "Haute Cuisine",
                time: "15 min read"
              },
              {
                title: "Michelin Stars and Modern Indian Gastronomy",
                href: "/dining/michelin-stars-and-modern-indian-gastronomy",
                category: "Haute Cuisine",
                time: "15 min read"
              },
              {
                title: "Palace Dining: The World's Most Spectacular Restaurant Settings",
                href: "/dining/palace-dining-the-worlds-most-spectacular-restaurant-settings",
                category: "Palace Dining",
                time: "15 min read"
              },
              {
                title: "Inside Britain's Country-House Dining: Walled Gardens, Game and The Long Table",
                href: "/dining/britains-country-house-dining-living-traditions",
                category: "British Gastronomy",
                time: "14 min read"
              },
              {
                title: "Afternoon Tea at the Grand Hotels: From London to Edinburgh",
                href: "/dining/afternoon-tea-at-the-grand-hotels-from-london-to-edinburgh",
                category: "British Gastronomy",
                time: "13 min read"
              },
              {
                title: "The Silver, the Linen and the Ritual of the Table: Imperial Entertaining",
                href: "/dining/the-art-of-hosting-tablescaping-and-courtly-ritual",
                category: "Tablescaping",
                time: "13 min read"
              },
              {
                title: "The Art of the Kansa Thaal: Ayurveda, Metal and Dining",
                href: "/dining/the-art-of-the-kansa-thaal-ayurveda-metal-and-dining",
                category: "Tablescaping",
                time: "14 min read"
              },
              {
                title: "The Royal Sweetmeats: Silver Leaf, Saffron and Court Confectionery",
                href: "/dining/the-royal-sweetmeats-silver-leaf-saffron-and-court-confectionery",
                category: "Culinary Arts",
                time: "14 min read"
              },
              {
                title: "The Rise of Indian Single Malt: Terroir, Wood and Accelerated Maturation",
                href: "/dining/the-rise-of-indian-single-malt",
                category: "Terroir & Cellars",
                time: "14 min read"
              },
              {
                title: "Darjeeling, Assam, Nilgiri: The Terroir of Indian Tea",
                href: "/dining/darjeeling-assam-nilgiri-the-terroir-of-indian-tea",
                category: "Living Heritage",
                time: "15 min read"
              },
              {
                title: "The Shikargah Banquet: Feasts Under Desert Stars",
                href: "/dining/the-shikargah-banquet-feasts-under-desert-stars",
                category: "Gastronomic Travel",
                time: "15 min read"
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group p-5 bg-white border border-[#EAE3D5] rounded-sm hover:border-[#8A7352] transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A7352] font-sans font-semibold block mb-2">
                    {item.category}
                  </span>
                  <h4 className="text-base font-serif text-[#181714] font-normal leading-snug group-hover:text-[#8A7352] transition-colors">
                    {item.title}
                  </h4>
                </div>
                <div className="mt-4 pt-3 border-t border-[#F0EBE0] flex items-center justify-between text-xs text-[#7D766B] font-sans">
                  <span>{item.time}</span>
                  <span className="text-[#8A7352] group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
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
