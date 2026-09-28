import Image from "next/image";
import Link from "next/link";

const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNkZGRkZGQiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

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

export default function SocietyPage() {
  return (
    <div style={{ background: C.ivory }}>
      {/* ── HERO BANNER ── */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/udaipur-city-view-from-hotel-balcony-rajasthan-india.jpg"
            alt="Society"
            fill
            priority
            placeholder="blur"
            blurDataURL={blurDataURL}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pt-32 sm:pt-40 pb-16 sm:pb-24">
          <span className="text-[10px] leading-[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.champagne }}>
            The Royal Gallerys
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-white leading-[0.95] mt-4 mb-6 tracking-tight" style={{ fontWeight: 400 }}>
            Society
          </h1>
          <p className="text-sm sm:text-base md:text-lg font-sans leading-relaxed max-w-xl" style={{ color: "rgba(244,240,231,0.7)", fontWeight: 400 }}>
            Royalty, aristocracy, weddings, polo, philanthropy and events — the social architecture of heritage and its living traditions.
          </p>

          {/* Filter Chips / Clusters */}
          <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-[rgba(244,240,231,0.2)]">
            <span className="text-[10px] uppercase tracking-[0.2em] font-sans text-[#B8A47A] mr-2">
              Clusters:
            </span>
            <Link
              href="#portraits-cluster"
              className="px-3.5 py-1 text-[11px] uppercase tracking-[0.16em] font-sans transition-colors bg-[#D4673A] text-[#F3E7D3] font-medium"
            >
              Portraits ★
            </Link>
            {["Royalty", "Weddings", "Polo", "Philanthropy", "Events"].map((cluster) => (
              <span
                key={cluster}
                className="px-3 py-1 text-[11px] uppercase tracking-[0.16em] font-sans border border-[rgba(244,240,231,0.3)] text-[#F3E7D3]/80 hover:text-white transition-colors cursor-pointer"
              >
                {cluster}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTRAITS CLUSTER: FEATURED FLAGSHIP LEAD STORIES ── */}
      <section id="portraits-cluster" className="py-16 sm:py-20 px-6 sm:px-8 md:px-12 lg:px-16 border-b border-[rgba(138,115,82,0.25)]" style={{ background: C.cream }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
            <div>
              <span className="text-[10px] uppercase tracking-[0.24em] font-sans font-semibold block mb-1" style={{ color: "#C4687F" }}>
                Signature Series Cluster
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#181714] tracking-tight" style={{ fontWeight: 400 }}>
                Portraits of Excellence &amp; Heritage
              </h2>
            </div>
            <Link
              href="/society/portraits-of-heritage"
              className="text-xs uppercase tracking-[0.2em] font-sans font-medium text-[#8A7352] hover:text-[#181714] transition-colors"
            >
              Explore Portraits Hub →
            </Link>
          </div>

          <div className="space-y-8">
            {/* Profile 1: Shivanjali Kumari Dungarpur */}
            <Link
              href="/society/shivanjali-kumari-dungarpur-wild-lens-of-royalty"
              className="group block p-6 sm:p-10 border border-[#D9CFC2] bg-[#FBF9F5] shadow-sm transition-all duration-500 hover:shadow-md hover:border-[#C4687F]"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-5 relative aspect-[4/5] overflow-hidden bg-[#141416]">
                  <Image
                    src="/images/society/shivanjali-kumari-dungarpur/01-hero.jpg"
                    alt="Shivanjali Kumari Dungarpur, Wildlife Photographer"
                    fill
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    style={{ objectPosition: "45% 35%" }}
                  />
                </div>

                <div className="md:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] uppercase tracking-[0.22em] font-sans font-semibold text-[#C4687F]">
                        Profile · Portraits of Excellence
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.16em] font-sans text-[#9B9589]">
                        8 min read
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#181714] leading-[1.12] mb-2 group-hover:text-[#C4687F] transition-colors" style={{ fontWeight: 400 }}>
                      Through the Wild Lens of Royalty
                    </h3>

                    <p className="font-serif italic text-base sm:text-lg text-[#8A7352] mb-4">
                      Princess Shivanjali Kumari Dungarpur
                    </p>

                    <p className="text-sm sm:text-base font-sans leading-relaxed text-[#9B9589] font-light mb-6">
                      A princess by birthright, a wildlife photographer by conviction. From Dungarpur&apos;s Pareva stone to ten dawn drives in the Masai Mara — how an ancient lineage meets the fearless eye of a modern artist.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[rgba(138,115,82,0.25)] flex items-center justify-between text-xs font-sans">
                    <span className="text-[#9B9589]">Words by Krishanpriya Rajawat</span>
                    <span className="text-[11px] uppercase tracking-[0.18em] font-medium text-[#181714] group-hover:text-[#C4687F] transition-colors">
                      Read Profile →
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Profile 2: Aaliya Sultana Babi */}
            <Link
              href="/society/aaliya-sultana-babi-dinosaur-princess-balasinor"
              className="group block p-6 sm:p-10 border border-[#D9CFC2] bg-[#FBF9F5] shadow-sm transition-all duration-500 hover:shadow-md hover:border-[#D4673A]"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-5 relative aspect-[4/5] overflow-hidden bg-[#22344A]">
                  <Image
                    src="/images/aaliya-sultana-babi/01-hero-aaliya-sultana-babi-portrait-1024w.webp"
                    alt="Aaliya Sultana Babi, The Dinosaur Princess of Balasinor"
                    fill
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    style={{ objectPosition: "50% 25%" }}
                  />
                </div>

                <div className="md:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] uppercase tracking-[0.22em] font-sans font-semibold" style={{ color: "#D4673A" }}>
                        Profile · Portraits of Heritage
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.16em] font-sans text-[#9B9589]">
                        12 min read
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#181714] leading-[1.12] mb-2 group-hover:text-[#8A7352] transition-colors" style={{ fontWeight: 400 }}>
                      The Woman Who Walks With Giants
                    </h3>

                    <p className="font-serif italic text-base sm:text-lg text-[#8A7352] mb-4">
                      Aaliya Sultana Babi, The Dinosaur Princess of Balasinor
                    </p>

                    <p className="text-sm sm:text-base font-sans leading-relaxed text-[#9B9589] font-light mb-6">
                      In the mineral-rich hills of Balasinor, time does not flow in a straight line. The present is layered over a past 65 million years deep — and no one navigates this strange collision of eras with more grace, fire and determination than Aaliya Sultana Babi.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[rgba(138,115,82,0.25)] flex items-center justify-between text-xs font-sans">
                    <span className="text-[#9B9589]">Words by Krishanpriya Rajawat</span>
                    <span className="text-[11px] uppercase tracking-[0.18em] font-medium text-[#181714] group-hover:text-[#D4673A] transition-colors">
                      Read Profile →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── EXISTING SOCIETY EDITORIAL CLUSTERS ── */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {[
              {
                tag: "Royalty",
                title: "The House of Mewar: A Dynasty in the 21st Century",
                desc: "How one of the world's oldest continuous royal dynasties navigates modernity while preserving the rituals, responsibilities and cultural authority of a thousand-year legacy.",
                readTime: "20 min read",
                href: "/royalty/royal-heritage-matters-luxury-brands",
              },
              {
                tag: "Weddings",
                title: "The Royal Wedding: Tradition, Spectacle and Meaning",
                desc: "Behind the pageantry of Indian royal weddings — the rituals, the craftsmanship, the family negotiations and the cultural significance that transcends the celebrations.",
                readTime: "15 min read",
                href: "/weddings/royal-indian-wedding-rituals",
              },
              {
                tag: "Polo",
                title: "The Sport of Kings Returns to Jodhpur",
                desc: "Polo was born in India. Today, a new generation of players, patrons and tournaments is restoring the country's place at the centre of the sport.",
                readTime: "12 min read",
                href: "/travel/umaid-bhawan-palace-jodhpur",
              },
              {
                tag: "Philanthropy",
                title: "How India's Royal Women Are Leading Social Change",
                desc: "From education to healthcare to craft preservation — the royal women using their platforms, networks and resources to drive tangible social transformation.",
                readTime: "14 min read",
                href: "/society/portraits-of-heritage",
              },
              {
                tag: "Events",
                title: "The Season: A Calendar of Cultural Gatherings",
                desc: "From the Jaipur Literature Festival to palace concerts and private heritage gatherings — the events that define the social and cultural calendar.",
                readTime: "10 min read",
                href: "/culture/heritage-brand-storytelling-india",
              },
            ].map((story, i, arr) => (
              <article
                key={story.title}
                className="group pb-10"
                style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(138,115,82,0.35)" : "none" }}
              >
                <span className="text-[10px] leading-[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.bronze }}>
                  {story.tag}
                </span>
                <Link href={story.href}>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mt-2 mb-3 leading-tight group-hover:text-[#8A7352] transition-colors" style={{ color: C.textDeep, fontWeight: 400 }}>
                    {story.title}
                  </h2>
                </Link>
                <p className="text-sm sm:text-base font-sans leading-relaxed max-w-2xl mb-4" style={{ color: C.textStone, fontWeight: 400 }}>
                  {story.desc}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans" style={{ color: C.textStone, fontWeight: 400 }}>
                    {story.readTime}
                  </span>
                  <Link href={story.href} className="text-xs uppercase tracking-[0.16em] font-sans font-medium text-[#8A7352] hover:underline">
                    Read Story →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── DISPATCH SUBSCRIBE ── */}
      <section className="py-16 sm:py-24 px-6 sm:px-8 md:px-12 lg:px-16 text-center" style={{ background: C.obsidian }}>
        <div className="max-w-xl mx-auto">
          <span className="text-[10px] leading-[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.champagne }}>
            The Dispatch
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mt-3 mb-4 tracking-tight" style={{ color: C.ivory, fontWeight: 400 }}>
            Society &amp; Culture
          </h2>
          <p className="text-sm font-sans mb-8 leading-relaxed" style={{ color: "rgba(244,240,231,0.7)", fontWeight: 400 }}>
            The finest stories at the intersection of royalty, society and cultural life.
          </p>
          <Link href="/membership" className="inline-block px-10 py-4 text-xs uppercase tracking-[0.22em] font-medium font-sans transition" style={{ border: `1px solid ${C.champagne}`, color: C.ivory }}>
            Subscribe
          </Link>
        </div>
      </section>
    </div>
  );
}
