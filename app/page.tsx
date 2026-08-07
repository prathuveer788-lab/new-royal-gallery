import Image from "next/image";
import Link from "next/link";

const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNkZGRkZGQiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

/* ── DATA ───────────────────────────────────────────── */
const editorPicks = [
  { tag: "Heritage", title: "The Amber Fort Chronicles", excerpt: "Discover the architectural brilliance and untold stories behind Jaipur's City Palace in our Summer 2026 editorial feature.", img: "/images/vecteezy_jaipur-city-palace-in-jaipur-city_3153081.jpg", readTime: "12 min read", slug: "/heritage" },
  { tag: "Culture", title: "The Golden Thread", excerpt: "How royal courts throughout Indian history supported and elevated artisanal crafts — a legacy that shapes contemporary design.", img: "/images/colorful-vibrant-indian-landscape.jpg", readTime: "15 min read", slug: "/culture" },
  { tag: "Travel", title: "Palaces of Udaipur", excerpt: "The City Palace, with its intricate jali work and panoramic views of Lake Pichola, stands as a testament to royal craftsmanship.", img: "/images/udaipur-city-view-from-hotel-balcony-rajasthan-india.jpg", readTime: "10 min read", slug: "/travel" },
  { tag: "Technology", title: "AI Meets Antiquity", excerpt: "How artificial intelligence is transforming heritage preservation — from digital twins of monuments to interactive historical archives.", img: "/images/indian-city-buildings-scene(1).jpg", readTime: "18 min read", slug: "/heritage-ai" },
];

const latestStories = [
  { tag: "Heritage", title: "Mehrangarh: The Fort of the Sun", date: "June 28, 2026", slug: "/heritage" },
  { tag: "Culture", title: "Hand-Block Printing: Rajasthan's Living Art", date: "June 22, 2026", slug: "/culture" },
  { tag: "Travel", title: "Grand Palace Hotels: Where History Meets Hospitality", date: "June 15, 2026", slug: "/travel" },
  { tag: "Archive", title: "The Living Archive: Preserving Voices of the Past", date: "June 8, 2026", slug: "/gallery" },
  { tag: "AI", title: "Digital Twins: Rebuilding Heritage in Pixels", date: "June 1, 2026", slug: "/heritage-ai" },
  { tag: "Editorial", title: "Courtly Splendor: Palaces, Processions & Patronage", date: "May 24, 2026", slug: "/journal" },
];

const houses = [
  { num: "01", title: "Media", desc: "Magazine, documentaries, podcasts — stories that carry heritage to the world.", slug: "/journal" },
  { num: "02", title: "Experiences", desc: "Palace dinners, heritage summits, private journeys into living history.", slug: "/travel" },
  { num: "03", title: "AI", desc: "Ethical artificial intelligence for preservation, archives and interactive memory.", slug: "/heritage-ai" },
  { num: "04", title: "Research", desc: "Archival documentation, oral histories, cultural intelligence.", slug: "/heritage" },
  { num: "05", title: "Institute", desc: "Masterclasses, leadership programs, the next generation of custodians.", slug: "/ecosystem" },
];

const whyNowStats = [
  { v: "$1.4T", l: "Global Luxury Market", s: "Heritage is its deepest asset" },
  { v: "1.4B", l: "Heritage Tourists / Year", s: "Seeking authentic cultural depth" },
  { v: "90%", l: "Of Memory Is At Risk", s: "Without active preservation" },
  { v: "280M", l: "Global Diaspora", s: "Reconnecting with roots" },
  { v: "1B+", l: "AI Users Worldwide", s: "A new medium for memory" },
  { v: "1M+", l: "Assets To Digitize", s: "Our founding archive goal" },
];

const impactMetrics = [
  { value: "10,000+", label: "Heritage Stories" },
  { value: "50+", label: "Documentaries" },
  { value: "25+", label: "Royal Partnerships" },
  { value: "100+", label: "Institutions" },
  { value: "5M+", label: "Global Audience" },
  { value: "1M+", label: "Archive Goal" },
];

/* ── SHARED MICRO-COMPONENTS ─────────────────────────── */
function SectionTag({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span className={`inline-block text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-amber-700 font-semibold ${className}`}>
      {children}
    </span>
  );
}

function SectionHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-neutral-900 tracking-tight leading-[1.08] ${className}`}>
      {children}
    </h2>
  );
}

function Divider() {
  return <hr className="w-16 h-px bg-neutral-300 border-0 mx-auto my-8 sm:my-10" />;
}

/* ── PAGE ────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div className="bg-white">

      {/* ══════════ HERO ══════════ */}
      <section className="relative min-h-screen flex items-center py-20 sm:py-24 md:py-28">
        <div className="absolute inset-0">
          <Image src="/images/vecteezy_jaipur-city-palace-in-jaipur-city_3153081.jpg" alt="Jaipur City Palace" fill priority placeholder="blur" blurDataURL={blurDataURL} className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="max-w-4xl">
            <p className="text-amber-300 text-[10px] sm:text-[11px] uppercase tracking-[0.4em] font-medium mb-6 font-sans">
              Summer Issue 2026
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.2] sm:leading-[1.25] mb-6 sm:mb-8 tracking-normal">
              Heritage<br />
              Deserves<br />
              <span className="text-amber-300 italic">More Than</span><br />
              Memory
            </h1>
            <p className="text-neutral-200 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-xl mb-8 sm:mb-10">
              The Royal Gallery is a global heritage media, technology and experiences platform — preserving and amplifying the world&apos;s royal, cultural and luxury heritage through storytelling, AI, and immersive encounters.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link href="/journal" className="inline-block px-8 sm:px-10 py-3 sm:py-3.5 bg-white text-neutral-900 hover:bg-neutral-100 transition-colors text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold font-sans">
                Read the Journal
              </Link>
              <Link href="/membership" className="inline-block px-8 sm:px-10 py-3 sm:py-3.5 border border-white/30 text-white hover:border-amber-300 hover:text-amber-200 transition-colors text-xs sm:text-sm uppercase tracking-[0.25em] font-medium font-sans">
                Become a Member
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ EDITOR'S PICKS ══════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <SectionTag className="mb-4 sm:mb-6">Editor&apos;s Picks</SectionTag>
            <SectionHeading>Curated for the Connoisseur</SectionHeading>
            <Divider />
          </div>

          {/* Lead Story — split layout */}
          <div className="mb-16 sm:mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Image */}
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[520px] overflow-hidden">
                <Image src={editorPicks[0].img} alt={editorPicks[0].title} fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:1024px)100vw,58vw" className="object-cover hover:scale-[1.02] transition-transform duration-700" />
              </div>
              {/* Text panel */}
              <div className="lg:col-span-5 flex items-center bg-[#faf8f5] p-8 sm:p-10 md:p-14 lg:p-16">
                <div className="w-full space-y-4 sm:space-y-6">
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-amber-700 font-bold font-sans">{editorPicks[0].tag}</span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-neutral-900 leading-[1.08]">{editorPicks[0].title}</h3>
                  <p className="text-neutral-600 text-sm sm:text-base font-light leading-relaxed max-w-md">{editorPicks[0].excerpt}</p>
                  <div className="flex items-center gap-4 pt-2">
                    <span className="text-xs text-neutral-400 font-light">{editorPicks[0].readTime}</span>
                    <Link href={editorPicks[0].slug} className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-amber-700 hover:text-amber-900 transition-colors font-semibold border-b border-amber-300 pb-0.5 font-sans">Read →</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Story Grid — 3 across */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {editorPicks.slice(1).map((story) => (
              <Link key={story.title} href={story.slug} className="group flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden mb-5 flex-shrink-0">
                  <Image src={story.img} alt={story.title} fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:768px)100vw,33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-[7px] sm:text-[8px] uppercase tracking-[0.25em] text-amber-700 font-bold font-sans">{story.tag}</span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-neutral-900 mt-2 mb-3 leading-tight group-hover:text-amber-800 transition-colors">{story.title}</h3>
                  <p className="text-neutral-500 text-xs sm:text-sm font-light leading-relaxed mb-3 flex-1">{story.excerpt}</p>
                  <span className="text-[10px] text-neutral-400 font-light mt-auto">{story.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ MISSION ══════════ */}
      <section className="py-16 sm:py-24 md:py-32 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-6 sm:px-8">
          <span className="inline-block text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-amber-400 font-semibold mb-6 font-sans">The Mission</span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-serif leading-[1.06] tracking-tight mb-8">
            Creating the Future<br />Infrastructure for Heritage
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-10">
            For centuries, heritage has been fragmented across archives, private collections, museums, oral histories and fading memories. The Royal Gallery brings them together — through media, technology, storytelling and preservation — into a single living infrastructure for civilization&apos;s memory.
          </p>
          <hr className="w-12 h-px bg-amber-500/60 border-0 mx-auto mb-8" />
          <blockquote className="text-neutral-200 text-base sm:text-lg md:text-xl font-serif italic leading-relaxed">
            &ldquo;We are not recreating people. We are preserving knowledge.&rdquo;
          </blockquote>
          <p className="text-neutral-500 text-[10px] sm:text-xs uppercase tracking-[0.2em] mt-4 font-sans font-light">The Royal Gallery · Ethics of the Archive</p>
        </div>
      </section>

      {/* ══════════ FEATURED: AI ══════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[600px] overflow-hidden order-2 lg:order-1">
              <Image src="/images/hallway-arches-with-dramatic-light-shadows.jpg" alt="AI & Heritage" fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:1024px)100vw,50vw" className="object-cover hover:scale-[1.02] transition-transform duration-700" />
            </div>
            <div className="flex items-center bg-[#faf8f5] p-8 sm:p-12 md:p-16 lg:p-20 order-1 lg:order-2">
              <div className="w-full space-y-5 sm:space-y-7 max-w-lg">
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-amber-700 font-bold font-sans">The Living Archive Project</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-neutral-900 leading-[1.08]">AI Meets<br />Antiquity</h2>
                <p className="text-neutral-600 text-sm sm:text-base font-light leading-relaxed">
                  Imagine speaking with history. The Living Archive Project uses ethical artificial intelligence, historical research and digital preservation technologies to create interactive heritage experiences — so future generations can learn directly from the voices and wisdom of the past.
                </p>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 pt-2">
                  {["AI Heritage Portraits", "Digital Twins", "Interactive Archives", "Multilingual Access", "Museum Experiences", "Long-Term Preservation"].map((f) => (
                    <li key={f} className="text-[10px] sm:text-xs text-neutral-500 font-light flex items-center gap-2">
                      <span className="w-1 h-1 bg-amber-500 rounded-full flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/heritage-ai" className="inline-block mt-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-amber-700 hover:text-amber-900 transition-colors font-semibold border-b border-amber-300 pb-0.5 font-sans">
                  Explore Heritage AI →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ THE FIVE HOUSES ══════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <SectionTag className="mb-4 sm:mb-6">Our Ecosystem</SectionTag>
            <SectionHeading>Five Houses, One Heritage</SectionHeading>
            <Divider />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            {houses.map((h) => (
              <Link key={h.num} href={h.slug} className="group bg-white p-6 sm:p-8 flex flex-col hover:shadow-lg transition-all duration-300 border border-transparent hover:border-amber-100">
                <span className="text-4xl sm:text-5xl font-serif text-amber-300 group-hover:text-amber-500 transition-colors block mb-4">{h.num}</span>
                <h3 className="text-lg sm:text-xl font-serif text-neutral-900 mb-2">{h.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed flex-1">{h.desc}</p>
                <span className="inline-block mt-4 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-amber-700 font-semibold font-sans opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ WHY NOW ══════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <SectionTag className="mb-4 sm:mb-6">Why Now</SectionTag>
            <SectionHeading className="max-w-4xl mx-auto">
              The Greatest Heritage Transfer in Human History Is Happening Now
            </SectionHeading>
            <p className="text-neutral-400 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] mt-6 font-light font-sans">
              Photographs · Letters · Oral Histories · Traditions · Languages · Knowledge
            </p>
            <Divider />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5">
            {whyNowStats.map((s) => (
              <div key={s.l} className="flex flex-col text-center p-5 sm:p-6 border border-neutral-100 hover:border-amber-100 transition-colors">
                <p className="text-2xl sm:text-3xl md:text-4xl font-serif text-amber-600 mb-1.5">{s.v}</p>
                <p className="text-[8px] sm:text-[9px] md:text-[10px] font-semibold text-neutral-800 uppercase tracking-wide mb-1.5 font-sans">{s.l}</p>
                <p className="text-[7px] sm:text-[8px] text-neutral-400 font-light leading-relaxed mt-auto">{s.s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ LATEST STORIES ══════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12 sm:mb-16">
            <div>
              <SectionTag className="mb-3 sm:mb-4">Latest</SectionTag>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 tracking-tight">From the Journal</h2>
            </div>
            <Link href="/journal" className="hidden sm:inline-block text-[10px] sm:text-xs uppercase tracking-[0.25em] text-neutral-400 hover:text-amber-700 transition-colors font-medium font-sans">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200">
            {latestStories.map((story, i) => (
              <Link key={i} href={story.slug} className="group flex flex-col bg-white p-6 sm:p-8 hover:bg-[#faf8f5] transition-colors">
                <span className="text-[7px] sm:text-[8px] uppercase tracking-[0.2em] text-amber-700 font-bold font-sans">{story.tag}</span>
                <h3 className="text-lg sm:text-xl md:text-2xl font-serif text-neutral-900 mt-2 mb-3 leading-tight group-hover:text-amber-800 transition-colors flex-1">{story.title}</h3>
                <span className="text-[10px] sm:text-xs text-neutral-400 font-light mt-auto">{story.date}</span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10 sm:hidden">
            <Link href="/journal" className="inline-block text-[10px] uppercase tracking-[0.25em] text-neutral-500 hover:text-amber-700 transition-colors font-medium font-sans">
              View All Stories →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════ IMPACT ══════════ */}
      <section className="py-16 sm:py-24 md:py-32 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-amber-400 font-semibold mb-6 font-sans">Impact</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight max-w-3xl mx-auto leading-[1.1]">
              Building the World&apos;s Largest Living Heritage Archive
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-10">
            {impactMetrics.map((m) => (
              <div key={m.label} className="flex flex-col items-center text-center">
                <p className="text-3xl sm:text-4xl md:text-5xl font-serif text-amber-400 mb-3">{m.value}</p>
                <p className="text-[9px] sm:text-[10px] text-neutral-400 font-light uppercase tracking-[0.15em] font-sans">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PARTNER CTA ══════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-amber-700 font-semibold mb-6 font-sans">An Invitation</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-neutral-900 leading-[1.08] mb-6 tracking-tight">
            Partner With Us to Build<br />the Future of Heritage
          </h2>
          <p className="text-neutral-500 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto mb-10">
            Heritage is humanity&apos;s most valuable asset. The stories that built civilizations deserve to survive. The Royal Gallery exists to ensure they do.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/membership" className="inline-block px-10 py-4 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold font-sans">
              Become a Partner
            </Link>
            <Link href="/global-vision" className="inline-block px-10 py-4 border border-neutral-300 text-neutral-700 hover:border-neutral-900 hover:text-neutral-900 transition-colors text-xs sm:text-sm uppercase tracking-[0.25em] font-medium font-sans">
              Explore the Vision
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
