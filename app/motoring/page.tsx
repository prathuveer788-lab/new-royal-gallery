import Image from "next/image";
import Link from "next/link";

const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNkZGRkZGQiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

export default function MotoringPage() {
  return (
    <div className="bg-white">
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Image src="/images/indian-city-buildings-scene(1).jpg" alt="Motoring" fill priority placeholder="blur" blurDataURL={blurDataURL} className="object-cover" />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pt-32 sm:pt-40 pb-16 sm:pb-24">
          <span className="text-amber-300 text-[9px] sm:text-[10px] uppercase tracking-[0.35em] font-semibold font-sans">The Royal Gallerys</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-white leading-[0.95] mt-4 mb-6 tracking-tight">Motoring</h1>
          <p className="text-neutral-300 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-xl">
            Cars, 4×4, classic automobiles, supercars, motorcycles and motorsport — an exploration of automotive culture, design and engineering.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {[
              { tag: "Classic Cars", title: "The Maharaja&apos;s Garage: India&apos;s Hidden Automotive Treasures", desc: "The extraordinary collections of vintage Rolls-Royces, Bentleys, Daimlers and Cadillacs preserved by India&apos;s royal families — some with fewer than a hundred miles on the clock, most never seen by the public.", readTime: "18 min read" },
              { tag: "4×4", title: "Defender, G-Wagon, Land Cruiser: The New Safari Culture", desc: "How the world&apos;s most capable vehicles have become the preferred transport for luxury adventure travel — crossing the Thar Desert, the Scottish Highlands, and the African savannah.", readTime: "14 min read" },
              { tag: "Design", title: "Rolls-Royce and the Indian Maharajas: A Century of Bespoke", desc: "From the Pearls of the Nizam to the Star of India — the century-long relationship between Goodwood and the subcontinent&apos;s royal houses.", readTime: "16 min read" },
              { tag: "Modern", title: "The New Super SUVs: Performance Meets Presence", desc: "Porsche Cayenne Turbo GT, Aston Martin DBX707, Lamborghini Urus — when the world&apos;s most powerful SUVs arrive in India, they find their natural habitat.", readTime: "12 min read" },
              { tag: "Journeys", title: "The Golden Quadrilateral: India&apos;s Greatest Road Trip", desc: "5,846 kilometres connecting Delhi, Mumbai, Chennai and Kolkata — a journey through the subcontinent&apos;s most diverse landscapes, cuisines and cultures.", readTime: "15 min read" },
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mt-3 mb-4 tracking-tight">The Garage</h2>
          <p className="text-neutral-400 text-sm font-light mb-8">Automotive culture, design and journeys — delivered to your inbox.</p>
          <Link href="/membership" className="inline-block px-10 py-4 bg-white text-neutral-900 hover:bg-neutral-100 transition text-xs uppercase tracking-[0.25em] font-semibold font-sans">Subscribe</Link>
        </div>
      </section>
    </div>
  );
}
