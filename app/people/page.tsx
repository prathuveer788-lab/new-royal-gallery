import Image from "next/image";
import Link from "next/link";

const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNkZGRkZGQiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

export default function PeoplePage() {
  return (
    <div className="bg-white">
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Image src="/images/beautiful-shot-lodhi-garden-delhi-india-cloudy-sky.jpg" alt="People" fill priority placeholder="blur" blurDataURL={blurDataURL} className="object-cover" />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pt-32 sm:pt-40 pb-16 sm:pb-24">
          <span className="text-amber-300 text-[9px] sm:text-[10px] uppercase tracking-[0.35em] font-semibold font-sans">The Royal Gallerys</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-white leading-[0.95] mt-4 mb-6 tracking-tight">People</h1>
          <p className="text-neutral-300 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-xl">
            Royal families, designers, founders, artists, collectors and visionaries — in-depth profiles of the people shaping culture, luxury and heritage.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {[
              { tag: "Profile", title: "Raghavendra Rathore: The Man Who Gave the Bandhgala a Future", desc: "The Jodhpur-based designer has transformed a traditional Rajput garment into a symbol of contemporary Indian masculinity — worn by heads of state, business leaders, and a new generation discovering their sartorial heritage.", readTime: "16 min read" },
              { tag: "Interview", title: "The Collector: Inside One Family&apos;s Five Generations of Indian Art", desc: "A conversation about provenance, passion, and the responsibility of custodianship — how one family assembled India&apos;s most significant private collection of miniature paintings.", readTime: "14 min read" },
              { tag: "Visionary", title: "The Hotelier Restoring Rajasthan&apos;s Forgotten Fortresses", desc: "One man&apos;s mission to rescue Rajasthan&apos;s crumbling architectural heritage — turning abandoned forts into world-class hotels while preserving their stories.", readTime: "12 min read" },
              { tag: "Profile", title: "The Maharani Who Built a Fashion Empire", desc: "How one royal woman transformed her family&apos;s textile heritage into a global luxury brand — bridging the worlds of palace ateliers and international fashion weeks.", readTime: "15 min read" },
              { tag: "Conversation", title: "The Chef Bringing Royal Cuisine to the World", desc: "From palace kitchens to Michelin recognition — the chef documenting, preserving and reinterpreting the lost culinary traditions of India&apos;s royal courts.", readTime: "11 min read" },
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mt-3 mb-4 tracking-tight">Profiles & Conversations</h2>
          <p className="text-neutral-400 text-sm font-light mb-8">In-depth interviews and profiles of the visionaries shaping our world.</p>
          <Link href="/membership" className="inline-block px-10 py-4 bg-white text-neutral-900 hover:bg-neutral-100 transition text-xs uppercase tracking-[0.25em] font-semibold font-sans">Subscribe</Link>
        </div>
      </section>
    </div>
  );
}
