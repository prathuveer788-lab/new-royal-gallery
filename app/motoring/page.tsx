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

export default function MotoringPage() {
  return (
    <div style={{ background: C.ivory }}>
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Image src="/images/indian-city-buildings-scene(1).jpg" alt="Motoring" fill priority placeholder="blur" blurDataURL={blurDataURL} className="object-cover" />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pt-32 sm:pt-40 pb-16 sm:pb-24">
          <span className="text-[10px] leading-[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.champagne }}>The Royal Gallerys</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-white leading-[0.95] mt-4 mb-6 tracking-tight" style={{ fontWeight: 400 }}>Motoring</h1>
          <p className="text-sm sm:text-base md:text-lg font-sans leading-relaxed max-w-xl" style={{ color: "rgba(244,240,231,0.7)", fontWeight: 400 }}>
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
            ].map((story, i, arr) => (
              <article key={story.title} className="group pb-10" style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(138,115,82,0.35)" : "none" }}>
                <span className="text-[10px] leading-[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.bronze }}>{story.tag}</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mt-2 mb-3 leading-tight group-hover:transition-colors" style={{ color: C.textDeep, fontWeight: 400 }}>{story.title}</h2>
                <p className="text-sm sm:text-base font-sans leading-relaxed max-w-2xl mb-4" style={{ color: C.textStone, fontWeight: 400 }}>{story.desc}</p>
                <span className="text-xs font-sans" style={{ color: C.textStone, fontWeight: 400 }}>{story.readTime}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-6 sm:px-8 md:px-12 lg:px-16 text-center" style={{ background: C.obsidian }}>
        <div className="max-w-xl mx-auto">
          <span className="text-[10px] leading-[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.champagne }}>The Dispatch</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mt-3 mb-4 tracking-tight" style={{ color: C.ivory, fontWeight: 400 }}>The Garage</h2>
          <p className="text-sm font-sans mb-8 leading-relaxed" style={{ color: "rgba(244,240,231,0.7)", fontWeight: 400 }}>Automotive culture, design and journeys — delivered to your inbox.</p>
          <Link href="/membership" className="inline-block px-10 py-4 text-xs uppercase tracking-[0.22em] font-medium font-sans transition" style={{ border: `1px solid ${C.champagne}`, color: C.ivory }}>Subscribe</Link>
        </div>
      </section>
    </div>
  );
}
