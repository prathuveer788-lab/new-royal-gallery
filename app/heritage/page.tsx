import Image from "next/image";
import Link from "next/link";

const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNkZGRkZGQiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

const royalServices = [
  "Digital Family Archives", "Documentary Production", "Heritage Preservation",
  "AI Heritage Experiences", "Legacy Books", "Archive Digitization",
  "Family History Research", "Global Storytelling",
];

const institutionServices = [
  "Digital Archives", "AI Search Systems", "Interactive Exhibitions",
  "Museum Experiences", "Historical Reconstruction", "Heritage Intelligence",
];

export default function HeritagePage() {
  return (
    <div className="bg-white">
      {/* ══════════ HERO ══════════ */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Image src="/images/badi-mahal-garden-palace-city-palace-udaipur-rajasthan-india.jpg" alt="Heritage" fill priority placeholder="blur" blurDataURL={blurDataURL} className="object-cover" />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pt-32 sm:pt-40 pb-16 sm:pb-24">
          <span className="text-amber-300 text-[9px] sm:text-[10px] uppercase tracking-[0.35em] font-semibold">Heritage & Royalty</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-white leading-[0.95] mt-4 mb-6 tracking-tight">
            Preserving Legacy<br />Across Generations
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl">
            A discreet, end-to-end partnership to preserve, document and amplify heritage — from royal families to museums, from digital archives to cinematic documentaries.
          </p>
        </div>
      </section>

      {/* ══════════ FOR ROYAL FAMILIES ══════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-700 font-bold">For Royal Families</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-neutral-900 leading-tight tracking-tight">
                Protecting Legacy<br />Across Generations
              </h2>
              <p className="text-neutral-600 font-light text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
                A discreet, end-to-end partnership to preserve, document and amplify your family&apos;s heritage with the dignity it deserves. The Royal Gallery works directly with royal and aristocratic families worldwide.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2">
                {royalServices.map((s) => (
                  <span key={s} className="text-[10px] sm:text-xs text-neutral-500 font-light flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-amber-500 rounded-full" />{s}
                  </span>
                ))}
              </div>
              <Link href="/membership" className="inline-block mt-4 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-amber-700 hover:text-amber-900 transition font-semibold border-b border-amber-300 pb-0.5">
                Schedule a Private Consultation →
              </Link>
            </div>
            <div className="lg:col-span-5 relative aspect-[3/4] overflow-hidden">
              <Image src="/images/mehrangarh-fort.jpg" alt="Royal Heritage" fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:1024px)100vw,42vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ FOR INSTITUTIONS ══════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5 relative aspect-[3/4] overflow-hidden order-2 lg:order-1">
              <Image src="/images/architectural-marvel-with-ornate-columns-arches.jpg" alt="Heritage Institutions" fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:1024px)100vw,42vw" className="object-cover" />
            </div>
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 order-1 lg:order-2">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-700 font-bold">For Heritage Institutions</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-neutral-900 leading-tight tracking-tight">
                Technology for Cultural Preservation
              </h2>
              <p className="text-neutral-600 font-light text-sm sm:text-base md:text-lg leading-relaxed max-w-xl">
                Museum-grade tools to digitize, search, reconstruct and reanimate collections for a new generation of visitors — serving museums, archives, foundations and cultural institutions worldwide.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2">
                {institutionServices.map((s) => (
                  <span key={s} className="text-[10px] sm:text-xs text-neutral-500 font-light flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-amber-500 rounded-full" />{s}
                  </span>
                ))}
              </div>
              <Link href="/membership" className="inline-block mt-4 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-amber-700 hover:text-amber-900 transition font-semibold border-b border-amber-300 pb-0.5">
                Request a Briefing →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-700 font-bold">Partnership</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 mt-4 mb-6 tracking-tight">Heritage Is Humanity&apos;s Most Valuable Asset</h2>
          <p className="text-neutral-500 text-sm sm:text-base font-light max-w-xl mx-auto mb-10">
            The stories that built civilizations deserve to survive. The Royal Gallery exists to ensure they do.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/membership" className="inline-block px-10 py-4 bg-neutral-900 text-white hover:bg-neutral-800 transition text-xs uppercase tracking-[0.25em] font-semibold">Partner With Us</Link>
            <Link href="/heritage-ai" className="inline-block px-10 py-4 border border-neutral-300 text-neutral-700 hover:border-neutral-900 transition text-xs uppercase tracking-[0.25em] font-medium">Explore Heritage AI</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
