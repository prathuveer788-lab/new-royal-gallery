import Link from "next/link";

const featuredStories = [
  { title: "The Golden Thread: Royal Patronage & Artisan Heritage", summary: "How royal courts throughout Indian history supported and elevated artisanal crafts — tracing traditions from origins to contemporary practice through interviews with master artisans and archival photography.", date: "May 6, 2026", readTime: "15 min read", category: "Editorial Photography" },
  { title: "Courtly Splendor: Palaces, Processions & Patronage", summary: "An evocative journey through ceremonial rituals and architectural spectacles that shaped royal identity across South Asia, from gilded throne rooms to procession routes.", date: "May 10, 2026", readTime: "12 min read", category: "Historical Narrative" },
  { title: "The Archive Awakens: AI and the Future of Cultural Memory", summary: "How artificial intelligence is transforming heritage preservation — from digital reconstruction of lost monuments to interactive conversations with historical archives.", date: "June 2, 2026", readTime: "18 min read", category: "Technology & Heritage" },
  { title: "Whispers of the Zenana: The Hidden Lives of Royal Women", summary: "Uncovering the private worlds of royal women through architecture, art and oral histories — from jali-screened balconies to the inner courtyards of Mughal palaces.", date: "June 20, 2026", readTime: "20 min read", category: "Historical Research" },
  { title: "Amber Fort: Jaipur's Living Crown", summary: "The architectural brilliance and untold stories behind one of India's most iconic structures — exclusive photography and historical narrative from our Summer 2026 editorial feature.", date: "July 1, 2026", readTime: "12 min read", category: "Cover Story" },
  { title: "Digital Twins: Rebuilding Heritage in Pixels", summary: "High-fidelity 3D replicas of heritage sites captured with photogrammetry and LiDAR — how technology ensures monuments survive even if the physical structure decays.", date: "July 4, 2026", readTime: "14 min read", category: "Technology & Heritage" },
];

const mediaPlatforms = [
  { title: "Magazine", desc: "Quarterly print", freq: "Quarterly" },
  { title: "Documentaries", desc: "Original films", freq: "Ongoing" },
  { title: "Podcast", desc: "Royal conversations", freq: "Weekly" },
  { title: "Films", desc: "Heritage cinema", freq: "Seasonal" },
  { title: "Interviews", desc: "Living voices", freq: "Ongoing" },
  { title: "Research", desc: "Cultural intelligence", freq: "Monthly" },
  { title: "Digital", desc: "Interactive stories", freq: "Weekly" },
  { title: "Newsletter", desc: "The Dispatch", freq: "Weekly" },
];

export default function JournalPage() {
  return (
    <div className="bg-white">
      {/* ══════════ HERO ══════════ */}
      <section className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16 bg-neutral-900 text-white">
        <div className="max-w-4xl">
          <span className="text-amber-400 text-[9px] sm:text-[10px] uppercase tracking-[0.35em] font-semibold">Media & Editorial</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif mt-4 mb-6 leading-[0.95] tracking-tight">
            Stories That<br />Outlive Generations
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl">
            In-depth editorial features, original documentaries, podcasts and narrative photography exploring India&apos;s heritage, architecture, culture and contemporary narratives.
          </p>
        </div>
      </section>

      {/* ══════════ MEDIA PLATFORMS ══════════ */}
      <section className="py-12 sm:py-16 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
            {mediaPlatforms.map((m) => (
              <div key={m.title} className="text-center px-4 sm:px-6 py-3">
                <span className="text-[9px] sm:text-[10px] text-amber-600 font-semibold uppercase tracking-[0.2em]">{m.freq}</span>
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
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-700 font-bold">Featured</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 mt-3 tracking-tight">From the Journal</h2>
          </div>

          <div className="space-y-16 sm:space-y-20">
            {featuredStories.map((story, i) => (
              <article key={i} className={`group ${i < featuredStories.length - 1 ? 'pb-16 sm:pb-20 border-b border-neutral-100' : ''}`}>
                <div className="space-y-4 sm:space-y-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-amber-700 font-bold text-[8px] sm:text-[9px] uppercase tracking-[0.25em]">{story.category}</span>
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
                    <Link href="#" className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-amber-700 hover:text-amber-900 transition font-semibold border-b border-amber-300 pb-0.5">Read Story →</Link>
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
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-700 font-bold">The Dispatch</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-neutral-900 mt-3 mb-4 tracking-tight">Stay Informed</h2>
          <p className="text-neutral-500 text-sm font-light mb-2">Curated heritage news, editorial highlights and event invitations — delivered weekly.</p>
          <Link href="/membership" className="inline-block mt-6 px-8 py-3 bg-neutral-900 text-white hover:bg-neutral-800 transition text-xs uppercase tracking-[0.2em] font-semibold">
            Subscribe
          </Link>
        </div>
      </section>
    </div>
  );
}
