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

const subcategories = [
  { label: "Fashion", slug: "fashion", img: "/images/colorful-vibrant-indian-landscape.jpg", desc: "Couture houses, designers and the evolving language of luxury fashion." },
  { label: "Jewellery", slug: "jewellery", img: "/images/architectural-marvel-with-ornate-columns-arches.jpg", desc: "From Cartier to contemporary Indian ateliers — the art of adornment." },
  { label: "Watches", slug: "watches", img: "/images/hallway-arches-with-dramatic-light-shadows.jpg", desc: "Patek Philippe, Rolex and the craft of haute horlogerie." },
  { label: "Beauty", slug: "beauty", img: "/images/colorful-vibrant-indian-landscape(1).jpg", desc: "Rituals, brands and the aesthetics of personal care." },
];

export default function StylePage() {
  return (
    <div style={{ background: C.ivory }}>
      {/* Hero */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Image src="/images/colorful-vibrant-indian-landscape.jpg" alt="Style" fill priority placeholder="blur" blurDataURL={blurDataURL} className="object-cover" />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pt-32 sm:pt-40 pb-16 sm:pb-24">
          <span className="text-[10px] leading-[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.champagne }}>The Royal Gallerys</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-white leading-[0.95] mt-4 mb-6 tracking-tight" style={{ fontWeight: 400 }}>Style</h1>
          <p className="text-sm sm:text-base md:text-lg font-sans leading-relaxed max-w-xl" style={{ color: "rgba(244,240,231,0.7)", fontWeight: 400 }}>
            Fashion, couture, jewellery, watches and beauty — the art of personal style through the lens of heritage, craftsmanship and contemporary luxury.
          </p>
        </div>
      </section>

      {/* Subcategories */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {subcategories.map((cat) => (
              <Link key={cat.label} href={`/style`} className="group flex flex-col">
                <div className="relative aspect-[3/4] overflow-hidden mb-4">
                  <Image src={cat.img} alt={cat.label} fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:768px)100vw,25vw" className="object-cover group-hover:scale-[1.03] transition-transform duration-1000" />
                </div>
                <span className="text-[10px] leading-[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.bronze }}>Explore</span>
                <h3 className="text-xl sm:text-2xl font-serif mt-1.5 mb-1.5 leading-tight group-hover:transition-colors" style={{ color: C.textDeep, fontWeight: 400 }}>{cat.label}</h3>
                <p className="text-xs sm:text-sm font-sans leading-relaxed" style={{ color: C.textStone, fontWeight: 400 }}>{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Editorial */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.cream }}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[10px] leading-[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.bronze }}>Featured</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif mt-4 mb-6 tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>The New Language of Indian Luxury</h2>
          <p className="text-sm sm:text-base font-sans max-w-2xl mx-auto leading-relaxed mb-8" style={{ color: C.textStone, fontWeight: 400 }}>
            From Sabyasachi&apos;s global ascent to Raghavendra Rathore&apos;s reinvention of the bandhgala, a new generation of Indian designers is shaping the vocabulary of international luxury — rooted in centuries of textile and craft tradition, speaking to the contemporary world.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs font-sans" style={{ color: C.textStone, fontWeight: 400 }}>
            <span>12 min read</span>
            <span>·</span>
            <span>Coming Soon</span>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 sm:py-24 px-6 sm:px-8 md:px-12 lg:px-16 text-center" style={{ background: C.obsidian }}>
        <div className="max-w-xl mx-auto">
          <span className="text-[10px] leading-[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.champagne }}>The Dispatch</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mt-3 mb-4 tracking-tight" style={{ color: C.ivory, fontWeight: 400 }}>Style, Delivered Weekly</h2>
          <p className="text-sm font-sans mb-8 leading-relaxed" style={{ color: "rgba(244,240,231,0.7)", fontWeight: 400 }}>The finest stories in fashion, jewellery, watches and beauty — curated by our editors.</p>
          <Link href="/membership" className="inline-block px-10 py-4 text-xs uppercase tracking-[0.22em] font-medium font-sans transition" style={{ border: `1px solid ${C.champagne}`, color: C.ivory }}>Subscribe</Link>
        </div>
      </section>
    </div>
  );
}
