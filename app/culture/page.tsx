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

const traditions = [
  { tag: "Hand-Block Printing", title: "Rajasthan's Centuries-Old Textile Craft", desc: "Artisans carve teak blocks and print by hand — each piece a generational story. We document the families, the techniques, and the future of this extraordinary living tradition.", readTime: "12 min read" },
  { tag: "Classical Arts", title: "The Revival of Indian Classical Performance", desc: "Documenting the resurgence of Indian classical music, dance and theatrical traditions — the institutions, the gurus, and the young performers carrying them forward.", readTime: "14 min read" },
  { tag: "Artisans", title: "Master Craftspeople: Bridging Heritage and Modernity", desc: "In-depth profiles and visual documentation of the artisans whose hands preserve centuries of knowledge while adapting to contemporary markets and tastes.", readTime: "16 min read" },
  { tag: "Institutions", title: "The Foundations Sustaining India's Living Traditions", desc: "The museums, foundations, and patrons behind the preservation of India's cultural heritage — their vision, their collections, and their impact.", readTime: "13 min read" },
  { tag: "Art & Antiques", title: "Collecting Indian Art: A Connoisseur's Guide", desc: "From Company School paintings to contemporary installations — understanding the market, the provenance, and the joy of building a meaningful collection.", readTime: "15 min read" },
];

const brandServices = [
  { title: "Brand Documentaries", desc: "Cinematic films tracing your maison's provenance — heritage as the ultimate luxury narrative." },
  { title: "Heritage Storytelling", desc: "Editorial rooted in your brand's history, craftsmanship and cultural significance." },
  { title: "Editorial Features", desc: "Dedicated features in The Royal Gallery magazine, positioning your brand within royal context." },
  { title: "Royal Context Campaigns", desc: "Campaigns connecting your brand to the world's most prestigious heritage spaces." },
  { title: "Luxury Events", desc: "Bespoke gatherings in palace settings — heritage, luxury and cultural connoisseurs together." },
  { title: "International Visibility", desc: "Global reach through our network of heritage institutions and royal partners." },
];

export default function CulturePage() {
  return (
    <div style={{ background: C.ivory }}>
      {/* HERO */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Image src="/images/colorful-vibrant-indian-landscape.jpg" alt="Culture" fill priority placeholder="blur" blurDataURL={blurDataURL} className="object-cover" />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pt-32 sm:pt-40 pb-16 sm:pb-24">
          <span className="text-[10px] leading-[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.champagne }}>The Royal Gallerys</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-white leading-[0.95] mt-4 mb-6 tracking-tight" style={{ fontWeight: 400 }}>Culture</h1>
          <p className="text-sm sm:text-base md:text-lg font-sans leading-relaxed max-w-xl" style={{ color: "rgba(244,240,231,0.7)", fontWeight: 400 }}>
            Art, heritage, craft, collecting and cultural institutions — where centuries of artistry meet the present moment, documented with the authority of deep scholarship and the elegance of fine editorial.
          </p>
        </div>
      </section>

      {/* EDITORIAL STORIES */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {traditions.map((story) => (
              <article key={story.title} className="group pb-10 last:pb-0" style={{ borderBottom: story !== traditions[traditions.length - 1] ? "1px solid rgba(138,115,82,0.35)" : "none" }}>
                <span className="text-[10px] leading-[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.bronze }}>{story.tag}</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mt-2 mb-3 leading-tight group-hover:transition-colors" style={{ color: C.textDeep, fontWeight: 400 }}>{story.title}</h2>
                <p className="text-sm sm:text-base font-sans leading-relaxed max-w-2xl mb-4" style={{ color: C.textStone, fontWeight: 400 }}>{story.desc}</p>
                <span className="text-xs font-sans" style={{ color: C.textStone, fontWeight: 400 }}>{story.readTime}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FOR LUXURY BRANDS */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5 relative aspect-[3/4] overflow-hidden order-2 lg:order-1">
              <Image src="/images/architectural-marvel-with-ornate-columns-arches.jpg" alt="Luxury Heritage" fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:1024px)100vw,42vw" className="object-cover" />
            </div>
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 order-1 lg:order-2">
              <span className="text-[10px] leading-[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.bronze }}>For Luxury Brands</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-tight tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>
                Heritage Is the Most<br />Powerful Luxury Asset
              </h2>
              <p className="text-sm sm:text-base md:text-lg font-sans leading-relaxed max-w-xl" style={{ color: C.textStone, fontWeight: 400 }}>
                We translate provenance into desire — pairing your maison with royal context, editorial craft and international visibility to reach discerning global audiences.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
                {brandServices.map((s) => (
                  <div key={s.title} className="pl-4" style={{ borderLeft: `1px solid rgba(138,115,82,0.35)` }}>
                    <h4 className="font-serif text-sm sm:text-base" style={{ color: C.textDeep, fontWeight: 400 }}>{s.title}</h4>
                    <p className="text-[10px] sm:text-xs font-sans mt-0.5" style={{ color: C.textStone, fontWeight: 400 }}>{s.desc}</p>
                  </div>
                ))}
              </div>
              <Link href="/membership" className="inline-block mt-4 text-[10px] sm:text-xs uppercase tracking-[0.22em] font-medium font-sans transition pb-0.5" style={{ color: C.bronze, borderBottom: `1px solid rgba(138,115,82,0.35)` }}>
                Partner With Us →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="py-16 sm:py-24 px-6 sm:px-8 md:px-12 lg:px-16 text-center" style={{ background: C.obsidian }}>
        <div className="max-w-xl mx-auto">
          <span className="text-[10px] leading-[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.champagne }}>The Dispatch</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mt-3 mb-4 tracking-tight" style={{ color: C.ivory, fontWeight: 400 }}>Culture in Context</h2>
          <p className="text-sm font-sans mb-8 leading-relaxed" style={{ color: "rgba(244,240,231,0.7)", fontWeight: 400 }}>Art, heritage, craft and collecting — the stories that define culture, delivered weekly.</p>
          <Link href="/membership" className="inline-block px-10 py-4 text-xs uppercase tracking-[0.22em] font-medium font-sans transition" style={{ border: `1px solid ${C.champagne}`, color: C.ivory }}>Subscribe</Link>
        </div>
      </section>
    </div>
  );
}
