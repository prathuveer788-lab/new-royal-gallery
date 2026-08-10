import Link from "next/link";
import { allArticles } from "@/lib/travel-articles";
import NewsletterForm from "../components/NewsletterForm";

const featuredStorySlugs = [
  "umaid-bhawan-palace-jodhpur",
  "rambagh-palace-jaipur",
  "taj-lake-palace-udaipur",
  "kyoto-travel-guide",
  "amalfi-coast-travel-guide",
  "sydney-travel-guide",
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
    <div className="bg-white">
      {/* ══════════ HERO ══════════ */}
      <section className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16 bg-neutral-900 text-white">
        <div className="max-w-4xl">
          <span className="text-amber-400 text-[9px] sm:text-[10px] uppercase tracking-[0.35em] font-semibold font-sans">The Royal Gallerys</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif mt-4 mb-6 leading-[0.95] tracking-tight">
            Journal
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl">
            The editorial hub of THE ROYAL GALLERYS — in-depth features, original documentaries, podcasts and narrative photography across all eleven editorial sections. Stories that outlive generations.
          </p>
        </div>
      </section>

      {/* ══════════ EDITORIAL SECTIONS ══════════ */}
      <section className="py-12 sm:py-16 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-700 font-bold font-sans block text-center mb-8">Our Sections</span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {editorialSections.map((s) => (
              <Link key={s.href} href={s.href} className="group border border-neutral-100 p-4 text-center hover:border-amber-200 hover:shadow-sm transition-all">
                <h3 className="font-serif text-sm sm:text-base text-neutral-900 group-hover:text-amber-800 transition-colors">{s.label}</h3>
                <p className="text-[9px] sm:text-[10px] text-neutral-400 font-light mt-1 leading-relaxed">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ MEDIA PLATFORMS ══════════ */}
      <section className="py-12 sm:py-16 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
            {mediaPlatforms.map((m) => (
              <div key={m.title} className="text-center px-4 sm:px-6 py-3">
                <span className="text-[9px] sm:text-[10px] text-amber-600 font-semibold uppercase tracking-[0.2em] font-sans">{m.freq}</span>
                <h3 className="font-serif text-sm sm:text-base text-neutral-900 font-medium">{m.title}</h3>
                <p className="text-[9px] sm:text-[10px] text-neutral-400 font-light">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FEATURED STORIES ══════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-700 font-bold font-sans">Featured</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 mt-3 tracking-tight">From the Journal</h2>
          </div>

          <div className="space-y-16 sm:space-y-20">
            {featuredStories.map((story, i) => (
              <article key={i} className={`group ${i < featuredStories.length - 1 ? 'pb-16 sm:pb-20 border-b border-neutral-100' : ''}`}>
                <div className="space-y-4 sm:space-y-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-amber-700 font-bold text-[8px] sm:text-[9px] uppercase tracking-[0.25em] font-sans">{story.category}</span>
                    <span className="text-neutral-300 text-[8px]">·</span>
                    <span className="text-neutral-400 text-[8px] sm:text-[9px] font-light">{story.date}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-neutral-900 group-hover:text-amber-800 transition-colors leading-tight tracking-tight">
                    {story.title}
                  </h2>
                  <p className="text-neutral-500 font-light text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl">
                    {story.summary}
                  </p>
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-xs text-neutral-400 font-light">{story.readTime}</span>
                    <Link href={`/travel/${story.slug}`} className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-amber-700 hover:text-amber-900 transition font-semibold border-b border-amber-300 pb-0.5 font-sans">Read Story →</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SUBSCRIBE ══════════ */}
      <section className="py-16 sm:py-24 px-6 sm:px-8 md:px-12 lg:px-16 bg-[#faf8f5] text-center">
        <div className="max-w-xl mx-auto">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-700 font-bold font-sans">The Dispatch</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-neutral-900 mt-3 mb-4 tracking-tight">Stay Informed</h2>
          <p className="text-neutral-500 text-sm font-light mb-2">Curated heritage news, editorial highlights and event invitations — delivered weekly.</p>
          <div className="mt-6">
            <NewsletterForm variant="light" source="journal" />
          </div>
        </div>
      </section>

      {/* ══════════ INSTITUTIONAL ══════════ */}
      <section className="py-16 sm:py-24 px-6 sm:px-8 md:px-12 lg:px-16 bg-neutral-900 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-400 font-bold font-sans">The Five Houses</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mt-3 mb-4 tracking-tight">More Than a Magazine</h2>
          <p className="text-neutral-400 text-sm font-light mb-8 leading-relaxed">
            THE ROYAL GALLERYS operates through five institutional houses — Media (this journal), Experiences, AI, Research, and the Institute. Together they form the most comprehensive heritage ecosystem in the world.
          </p>
          <Link href="/ecosystem" className="inline-block px-10 py-4 bg-white text-neutral-900 hover:bg-neutral-100 transition text-xs uppercase tracking-[0.25em] font-semibold font-sans">Explore the Ecosystem</Link>
        </div>
      </section>
    </div>
  );
}
