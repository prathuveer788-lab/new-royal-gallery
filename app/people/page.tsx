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

export default function PeoplePage() {
  return (
    <div style={{ background: C.ivory }}>
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Image src="/images/beautiful-shot-lodhi-garden-delhi-india-cloudy-sky.jpg" alt="People" fill priority placeholder="blur" blurDataURL={blurDataURL} className="object-cover" />
          <div className="absolute inset-0" style={{ background: C.obsidian, opacity: 0.55 }} />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pt-32 sm:pt-40 pb-16 sm:pb-24">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.champagne }}>The Royal Gallerys</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif leading-[0.95] mt-4 mb-6 tracking-tight" style={{ color: C.ivory, fontWeight: 400 }}>People</h1>
          <p className="text-sm sm:text-base md:text-lg font-sans font-normal leading-relaxed max-w-xl" style={{ color: C.textStone }}>
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
              <article key={story.title} className="group pb-10 last:border-0" style={{ borderBottom: "1px solid rgba(138,115,82,0.35)" }}>
                <span className="text-[8px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.bronze }}>{story.tag}</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mt-2 mb-3 leading-tight transition-colors" style={{ color: C.textDeep, fontWeight: 400 }}>{story.title}</h2>
                <p className="font-sans font-normal text-sm sm:text-base leading-relaxed max-w-2xl mb-4" style={{ color: C.textStone }}>{story.desc}</p>
                <span className="text-xs font-sans font-normal" style={{ color: C.textStone }}>{story.readTime}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-6 sm:px-8 md:px-12 lg:px-16 text-center" style={{ background: C.obsidian }}>
        <div className="max-w-xl mx-auto">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.champagne }}>The Dispatch</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mt-3 mb-4 tracking-tight" style={{ color: C.ivory, fontWeight: 400 }}>Profiles &amp; Conversations</h2>
          <p className="font-sans font-normal text-sm leading-relaxed mb-8" style={{ color: C.textStone }}>In-depth interviews and profiles of the visionaries shaping our world.</p>
          <Link href="/membership" className="inline-block px-10 py-4 transition text-xs uppercase tracking-[0.22em] font-medium font-sans" style={{ border: `1px solid ${C.champagne}`, color: C.champagne }}>Subscribe</Link>
        </div>
      </section>
    </div>
  );
}
