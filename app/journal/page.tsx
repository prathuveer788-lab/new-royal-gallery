import type { Metadata } from "next";
import Link from "next/link";
import { allArticles } from "@/lib/travel-articles";
import NewsletterForm from "../components/NewsletterForm";

export const metadata: Metadata = {
  title: "The Journal — In-Depth Features & Dispatches | The Royal Gallerys",
  description:
    "The editorial hub of The Royal Gallerys — in-depth features, original documentaries, podcasts and narrative photography across culture, travel, design and society.",
  alternates: { canonical: "https://theroyalgallerys.com/journal" },
  openGraph: {
    title: "The Journal — In-Depth Features & Dispatches | The Royal Gallerys",
    description:
      "The editorial hub of The Royal Gallerys — in-depth features, original documentaries, podcasts and narrative photography across culture, travel, design and society.",
    url: "https://theroyalgallerys.com/journal",
    type: "website",
    siteName: "The Royal Gallerys",
    images: [
      {
        url: "https://theroyalgallerys.com/images/hero/jaipur-city-palace-grand-facade.jpg",
        width: 1200,
        height: 630,
        alt: "The Royal Gallerys Journal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@theroyalgallerys",
    creator: "@theroyalgallerys",
    title: "The Journal — In-Depth Features & Dispatches | The Royal Gallerys",
    description:
      "The editorial hub of The Royal Gallerys — in-depth features, original documentaries, podcasts and narrative photography.",
    images: ["https://theroyalgallerys.com/images/hero/jaipur-city-palace-grand-facade.jpg"],
  },
};

const C = {
  obsidian: "#11110F",
  charcoal: "#1C1B18",
  forest: "#17261F",
  ivory: "#F4F0E7",
  cream: "#EAE3D5",
  textDeep: "#181714",
  textStone: "#9B9589",
  bronze: "#8A7352",
  champagne: "#B8A47A",
};

const featuredStorySlugs = [
  "umaid-bhawan-palace-jodhpur",
  "rambagh-palace-jaipur",
  "taj-lake-palace-udaipur",
  "kyoto-travel-guide",
  "amalfi-coast-travel-guide",
  "luxury-hotel-marketing-india-hnw-travellers",
];

const featuredStories = featuredStorySlugs
  .map((slug) => allArticles.find((article) => article.slug === slug))
  .filter((article): article is (typeof allArticles)[number] => Boolean(article))
  .map((article) => ({
    slug: article.slug,
    title: article.headline,
    summary: article.subtitle,
    date: new Date(article.publishedDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    readTime: article.readTime,
    category: article.editorialSection === "travel" ? "Travel" : article.category,
  }));

const editorialSections = [
  { href: "/style", label: "Style", desc: "Fashion, jewellery, watches, beauty" },
  { href: "/travel", label: "Travel", desc: "Palace hotels, destinations, guides" },
  { href: "/design", label: "Design", desc: "Architecture, interiors, craft, gardens" },
  { href: "/culture", label: "Culture", desc: "Art, heritage, craft, collecting" },
  { href: "/society", label: "Society", desc: "Royalty, weddings, polo, philanthropy" },
  { href: "/people", label: "People", desc: "Profiles, interviews, conversations" },
  { href: "/motoring", label: "Motoring", desc: "Cars, classics, 4×4, journeys" },
  { href: "/dining", label: "Dining", desc: "Chefs, wine, culinary heritage" },
  { href: "/business", label: "Business", desc: "Luxury economy, family enterprise" },
  { href: "/futures", label: "Futures", desc: "AI, technology, innovation, sustainability" },
  { href: "/archive", label: "Archive", desc: "Photography, documents, preservation" },
];

const mediaPlatforms = [
  { title: "Magazine", desc: "Quarterly print", freq: "Quarterly" },
  { title: "Digital", desc: "Interactive stories", freq: "Weekly" },
  { title: "Newsletter", desc: "The Dispatch", freq: "Weekly" },
  { title: "Documentaries", desc: "Original films", freq: "Ongoing" },
  { title: "Podcast", desc: "Royal conversations", freq: "Weekly" },
  { title: "Research", desc: "Cultural intelligence", freq: "Monthly" },
];

export default function JournalPage() {
  return (
    <div style={{ background: C.ivory }}>
      {/* ══════════ HERO ══════════ */}
      <section className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.obsidian }}>
        <div className="max-w-4xl">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.champagne }}>The Royal Gallerys</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif mt-4 mb-6 leading-[0.95] tracking-tight" style={{ color: C.ivory, fontWeight: 400 }}>
            Journal
          </h1>
          <p className="font-sans font-normal text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl" style={{ color: C.textStone }}>
            The editorial hub of THE ROYAL GALLERYS — in-depth features, original documentaries, podcasts and narrative photography across all eleven editorial sections. Stories that outlive generations.
          </p>
        </div>
      </section>

      {/* ══════════ EDITORIAL SECTIONS ══════════ */}
      <section className="py-12 sm:py-16" style={{ borderBottom: "1px solid rgba(138,115,82,0.35)" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-medium font-sans block text-center mb-8" style={{ color: C.bronze }}>Our Sections</span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {editorialSections.map((s) => (
              <Link key={s.href} href={s.href} className="group p-4 text-center transition-all" style={{ border: "1px solid rgba(138,115,82,0.35)" }}>
                <h3 className="font-serif text-sm sm:text-base transition-colors" style={{ color: C.textDeep, fontWeight: 400 }}>{s.label}</h3>
                <p className="text-[9px] sm:text-[10px] font-sans font-normal mt-1 leading-relaxed" style={{ color: C.textStone }}>{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ MEDIA PLATFORMS ══════════ */}
      <section className="py-12 sm:py-16" style={{ borderBottom: "1px solid rgba(138,115,82,0.35)" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
            {mediaPlatforms.map((m) => (
              <div key={m.title} className="text-center px-4 sm:px-6 py-3">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.bronze }}>{m.freq}</span>
                <h3 className="font-serif text-sm sm:text-base" style={{ color: C.textDeep, fontWeight: 400 }}>{m.title}</h3>
                <p className="text-[9px] sm:text-[10px] font-sans font-normal" style={{ color: C.textStone }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FEATURED STORIES ══════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.bronze }}>Featured</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mt-3 tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>From the Journal</h2>
          </div>

          <div className="space-y-16 sm:space-y-20">
            {featuredStories.map((story, i) => (
              <article key={i} className={`group ${i < featuredStories.length - 1 ? 'pb-16 sm:pb-20' : ''}`} style={i < featuredStories.length - 1 ? { borderBottom: "1px solid rgba(138,115,82,0.35)" } : undefined}>
                <div className="space-y-4 sm:space-y-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.bronze }}>{story.category}</span>
                    <span className="text-[8px]" style={{ color: C.textStone }}>·</span>
                    <span className="text-[8px] sm:text-[9px] font-sans font-normal" style={{ color: C.textStone }}>{story.date}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif transition-colors leading-tight tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>
                    {story.title}
                  </h2>
                  <p className="font-sans font-normal text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl" style={{ color: C.textStone }}>
                    {story.summary}
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-xs font-sans font-normal" style={{ color: C.textStone }}>{story.readTime}</span>
                    <Link href={`/travel/${story.slug}`} className="text-[10px] sm:text-xs uppercase tracking-[0.22em] transition font-medium pb-0.5 font-sans" style={{ color: C.bronze, borderBottom: `1px solid ${C.champagne}` }}>Read Story →</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SUBSCRIBE ══════════ */}
      <section className="py-16 sm:py-24 px-6 sm:px-8 md:px-12 lg:px-16 text-center" style={{ background: C.cream }}>
        <div className="max-w-xl mx-auto">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.bronze }}>The Dispatch</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mt-3 mb-4 tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>Stay Informed</h2>
          <p className="font-sans font-normal text-sm leading-relaxed mb-2" style={{ color: C.textStone }}>Curated heritage news, editorial highlights and event invitations — delivered weekly.</p>
          <div className="mt-6">
            <NewsletterForm variant="light" source="journal" />
          </div>
        </div>
      </section>

      {/* ══════════ INSTITUTIONAL ══════════ */}
      <section className="py-16 sm:py-24 px-6 sm:px-8 md:px-12 lg:px-16 text-center" style={{ background: C.obsidian }}>
        <div className="max-w-2xl mx-auto">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.champagne }}>The Five Houses</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mt-3 mb-4 tracking-tight" style={{ color: C.ivory, fontWeight: 400 }}>More Than a Magazine</h2>
          <p className="font-sans font-normal text-sm leading-relaxed mb-8" style={{ color: C.textStone }}>
            THE ROYAL GALLERYS operates through five institutional houses — Media (this journal), Experiences, AI, Research, and the Institute. Together they form the most comprehensive heritage ecosystem in the world.
          </p>
          <Link href="/ecosystem" className="inline-block px-10 py-4 transition text-xs uppercase tracking-[0.22em] font-medium font-sans" style={{ border: `1px solid ${C.champagne}`, color: C.champagne }}>Explore the Ecosystem</Link>
        </div>
      </section>
    </div>
  );
}
