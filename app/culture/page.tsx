import Image from "next/image";
import Link from "next/link";

const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNkZGRkZGQiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

const brandServices = [
  { title: "Brand Documentaries", desc: "Cinematic films tracing your maison's provenance — heritage as the ultimate luxury narrative." },
  { title: "Heritage Storytelling", desc: "Editorial rooted in your brand's history, craftsmanship and cultural significance." },
  { title: "Editorial Features", desc: "Dedicated features in The Royal Gallery magazine, positioning your brand within royal context." },
  { title: "Royal Context Campaigns", desc: "Campaigns connecting your brand to the world's most prestigious heritage spaces." },
  { title: "Luxury Events", desc: "Bespoke gatherings in palace settings — heritage, luxury and cultural connoisseurs together." },
  { title: "International Visibility", desc: "Global reach through our network of heritage institutions and royal partners." },
];

const traditions = [
  { title: "Hand-Block Printing", desc: "Rajasthan's centuries-old textile craft — artisans carve teak blocks and print by hand, each piece a generational story." },
  { title: "Classical Arts Restoration", desc: "Documenting the revival of Indian classical music, dance and theatrical traditions through archival recording." },
  { title: "Contemporary Artisan Profiles", desc: "In-depth interviews and visual documentation of master craftspeople bridging heritage and modernity." },
  { title: "Cultural Institutions", desc: "The foundations, museums and patrons sustaining India's living traditions — their vision and impact." },
];

export default function CulturePage() {
  return (
    <div className="bg-white">
      {/* ══════════ HERO ══════════ */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Image src="/images/colorful-vibrant-indian-landscape.jpg" alt="Culture" fill priority placeholder="blur" blurDataURL={blurDataURL} className="object-cover" />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pt-32 sm:pt-40 pb-16 sm:pb-24">
          <span className="text-amber-300 text-[9px] sm:text-[10px] uppercase tracking-[0.35em] font-semibold">Art & Culture</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-[0.95] mt-4 mb-6 tracking-tight">
            Living Traditions<br />& Contemporary Expression
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl">
            Where centuries of Indian artistry meet the present moment — a deep exploration of the traditions, craftsmanship and cultural narratives shaping our world.
          </p>
        </div>
      </section>

      {/* ══════════ LIVING TRADITIONS ══════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-700 font-bold">Editorial Feature</span>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-neutral-900 mt-4 tracking-tight">Living Traditions</h2>
            <p className="text-neutral-500 text-sm sm:text-base font-light max-w-2xl mx-auto mt-4">
              India&apos;s cultural landscape thrives through countless artisans and craftspeople dedicated to preserving ancient techniques — bridging history and contemporary expression.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {traditions.map((t) => (
              <div key={t.title} className="border border-neutral-100 p-6 sm:p-7 hover:shadow-lg hover:border-amber-100 transition-all">
                <h3 className="font-serif text-lg sm:text-xl text-neutral-900 mb-2">{t.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ FOR LUXURY BRANDS ══════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5 relative aspect-[3/4] overflow-hidden order-2 lg:order-1">
              <Image src="/images/architectural-marvel-with-ornate-columns-arches.jpg" alt="Luxury Heritage" fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:1024px)100vw,42vw" className="object-cover" />
            </div>
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 order-1 lg:order-2">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-700 font-bold">For Luxury Brands</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-neutral-900 leading-tight tracking-tight">
                Heritage Is the Most<br />Powerful Luxury Asset
              </h2>
              <p className="text-neutral-600 font-light text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
                We translate provenance into desire — pairing your maison with royal context, editorial craft and international visibility to reach discerning global audiences.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2">
                {brandServices.map((s) => (
                  <div key={s.title} className="border-l-2 border-amber-200 pl-4">
                    <h4 className="font-serif text-sm sm:text-base text-neutral-900">{s.title}</h4>
                    <p className="text-[10px] sm:text-xs text-neutral-500 font-light mt-0.5">{s.desc}</p>
                  </div>
                ))}
              </div>
              <Link href="/membership" className="inline-block mt-4 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-amber-700 hover:text-amber-900 transition font-semibold border-b border-amber-300 pb-0.5">
                Partner With Us →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ FEATURED EDITORIAL ══════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16 bg-neutral-900 text-white">
        <div className="max-w-3xl mx-auto">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-400 font-bold">Featured Editorial</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif mt-4 mb-8 tracking-tight">The Golden Thread: Royal Patronage & Artisan Heritage</h2>
          <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed mb-6">
            A comprehensive exploration of how royal courts throughout Indian history have supported and elevated artisanal crafts — documenting the symbiotic relationship between patronage and creativity from their origins to contemporary practice.
          </p>
          <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
            Through interviews with master artisans and archival photography, we reveal the narratives that define India&apos;s artistic legacy — a golden thread connecting past, present and future.
          </p>
          <div className="flex items-center gap-4 mt-10 pt-8 border-t border-white/10">
            <span className="text-xs text-neutral-500 font-light">15 min read</span>
            <span className="text-neutral-600">·</span>
            <span className="text-xs text-neutral-500 font-light">Editorial Photography</span>
          </div>
        </div>
      </section>
    </div>
  );
}
