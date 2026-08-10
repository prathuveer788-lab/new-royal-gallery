import Image from "next/image";
import Link from "next/link";

const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNkZGRkZGQiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

export default function BusinessPage() {
  return (
    <div className="bg-white">
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Image src="/images/indian-city-buildings-scene.jpg" alt="Business" fill priority placeholder="blur" blurDataURL={blurDataURL} className="object-cover" />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pt-32 sm:pt-40 pb-16 sm:pb-24">
          <span className="text-amber-300 text-[9px] sm:text-[10px] uppercase tracking-[0.35em] font-semibold font-sans">The Royal Gallerys</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-white leading-[0.95] mt-4 mb-6 tracking-tight">Business</h1>
          <p className="text-neutral-300 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-xl">
            The luxury economy, hospitality, family enterprises, wealth, real estate and the business of heritage — analytical intelligence for the global luxury market.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {[
              { tag: "Analysis", title: "The New Economics of Heritage: How Palace Hotels Became a Multi-Billion Dollar Industry", desc: "From Neemrana to the Taj group, the transformation of India&apos;s historic properties into luxury hospitality assets has created an entirely new category in global travel — and a blueprint for heritage economics worldwide.", readTime: "18 min read" },
              { tag: "Family Enterprise", title: "The Succession Question: How India&apos;s Family Business Dynasties Handle Transition", desc: "With an estimated $5 trillion in assets set to transfer between generations in the next decade, India&apos;s family-owned enterprises face their greatest test — succession.", readTime: "16 min read" },
              { tag: "Real Estate", title: "The Palaces Nobody Talks About: India&apos;s Hidden Heritage Property Market", desc: "Behind the high-profile hotel conversions, a quiet market for private heritage properties — havelis, forts, hunting lodges — is attracting international buyers, and transforming rural Rajasthan.", readTime: "14 min read" },
              { tag: "Luxury Economy", title: "India&apos;s $200 Billion Luxury Opportunity", desc: "With the world&apos;s fastest-growing population of ultra-high-net-worth individuals, India is reshaping the global luxury market. Here&apos;s who is spending, what they are buying, and why.", readTime: "15 min read" },
              { tag: "Intelligence", title: "The BRICS Luxury Consumer: Who They Are and What They Want", desc: "The emerging economies are producing a new kind of luxury consumer — digitally native, globally aware, and demanding authenticity over logos. The brands that understand them will dominate the next decade.", readTime: "13 min read" },
            ].map((story) => (
              <article key={story.title} className="group border-b border-neutral-100 pb-10 last:border-0">
                <span className="text-[8px] uppercase tracking-[0.25em] text-amber-700 font-bold font-sans">{story.tag}</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-neutral-900 mt-2 mb-3 leading-tight group-hover:text-amber-800 transition-colors">{story.title}</h2>
                <p className="text-neutral-500 text-sm sm:text-base font-light leading-relaxed max-w-2xl mb-4">{story.desc}</p>
                <span className="text-xs text-neutral-400 font-light">{story.readTime}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-6 sm:px-8 md:px-12 lg:px-16 bg-neutral-900 text-white text-center">
        <div className="max-w-xl mx-auto">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-400 font-bold font-sans">The Dispatch</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mt-3 mb-4 tracking-tight">Business Intelligence</h2>
          <p className="text-neutral-400 text-sm font-light mb-8">The luxury economy, family enterprise, and the business of heritage — delivered weekly.</p>
          <Link href="/membership" className="inline-block px-10 py-4 bg-white text-neutral-900 hover:bg-neutral-100 transition text-xs uppercase tracking-[0.25em] font-semibold font-sans">Subscribe</Link>
        </div>
      </section>
    </div>
  );
}
