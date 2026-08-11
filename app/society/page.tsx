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
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Image src="/images/udaipur-city-view-from-hotel-balcony-rajasthan-india.jpg" alt="Society" fill priority placeholder="blur" blurDataURL={blurDataURL} className="object-cover" />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pt-32 sm:pt-40 pb-16 sm:pb-24">
          <span className="text-[10px] leading-[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.champagne }}>The Royal Gallerys</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-white leading-[0.95] mt-4 mb-6 tracking-tight" style={{ fontWeight: 400 }}>Society</h1>
          <p className="text-sm sm:text-base md:text-lg font-sans leading-relaxed max-w-xl" style={{ color: "rgba(244,240,231,0.7)", fontWeight: 400 }}>
            Royalty, aristocracy, weddings, polo, philanthropy and events — the social architecture of heritage and its living traditions.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {[
              { tag: "Royalty", title: "The House of Mewar: A Dynasty in the 21st Century", desc: "How one of the world&apos;s oldest continuous royal dynasties navigates modernity while preserving the rituals, responsibilities and cultural authority of a thousand-year legacy.", readTime: "20 min read" },
              { tag: "Weddings", title: "The Royal Wedding: Tradition, Spectacle and Meaning", desc: "Behind the pageantry of Indian royal weddings — the rituals, the craftsmanship, the family negotiations and the cultural significance that transcends the celebrations.", readTime: "15 min read" },
              { tag: "Polo", title: "The Sport of Kings Returns to Jodhpur", desc: "Polo was born in India. Today, a new generation of players, patrons and tournaments is restoring the country&apos;s place at the centre of the sport.", readTime: "12 min read" },
              { tag: "Philanthropy", title: "How India&apos;s Royal Women Are Leading Social Change", desc: "From education to healthcare to craft preservation — the royal women using their platforms, networks and resources to drive tangible social transformation.", readTime: "14 min read" },
              { tag: "Events", title: "The Season: A Calendar of Cultural Gatherings", desc: "From the Jaipur Literature Festival to palace concerts and private heritage gatherings — the events that define the social and cultural calendar.", readTime: "10 min read" },
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mt-3 mb-4 tracking-tight" style={{ color: C.ivory, fontWeight: 400 }}>Society & Culture</h2>
          <p className="text-sm font-sans mb-8 leading-relaxed" style={{ color: "rgba(244,240,231,0.7)", fontWeight: 400 }}>The finest stories at the intersection of royalty, society and cultural life.</p>
          <Link href="/membership" className="inline-block px-10 py-4 text-xs uppercase tracking-[0.22em] font-medium font-sans transition" style={{ border: `1px solid ${C.champagne}`, color: C.ivory }}>Subscribe</Link>
        </div>
      </section>
    </div>
  );
}
