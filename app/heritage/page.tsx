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
    <div style={{ background: C.ivory }}>
      {/* ══════════ HERO ══════════ */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Image src="/images/badi-mahal-garden-palace-city-palace-udaipur-rajasthan-india.jpg" alt="Heritage" fill priority placeholder="blur" blurDataURL={blurDataURL} className="object-cover" />
          <div className="absolute inset-0" style={{ background: C.obsidian, opacity: 0.55 }} />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pt-32 sm:pt-40 pb-16 sm:pb-24">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.champagne }}>Heritage &amp; Royalty</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif leading-[0.95] mt-4 mb-6 tracking-tight" style={{ color: C.ivory, fontWeight: 400 }}>
            Preserving Legacy<br />Across Generations
          </h1>
          <p className="text-sm sm:text-base md:text-lg font-sans font-normal leading-relaxed max-w-2xl" style={{ color: C.textStone }}>
            A discreet, end-to-end partnership to preserve, document and amplify heritage — from royal families to museums, from digital archives to cinematic documentaries.
          </p>
        </div>
      </section>

      {/* ══════════ FOR ROYAL FAMILIES ══════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.bronze }}>For Royal Families</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-tight tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>
                Protecting Legacy<br />Across Generations
              </h2>
              <p className="font-sans font-normal text-sm sm:text-base md:text-lg leading-relaxed max-w-xl" style={{ color: C.textStone }}>
                A discreet, end-to-end partnership to preserve, document and amplify your family&apos;s heritage with the dignity it deserves. The Royal Gallery works directly with royal and aristocratic families worldwide.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2">
                {royalServices.map((s) => (
                  <span key={s} className="text-[10px] sm:text-xs font-sans font-normal flex items-center gap-1.5" style={{ color: C.textStone }}>
                    <span className="w-1 h-1" style={{ background: C.bronze }} />{s}
                  </span>
                ))}
              </div>
              <Link href="/membership" className="inline-block mt-4 text-[10px] sm:text-xs uppercase tracking-[0.22em] transition font-medium pb-0.5 font-sans" style={{ color: C.bronze, borderBottom: `1px solid ${C.champagne}` }}>
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
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5 relative aspect-[3/4] overflow-hidden order-2 lg:order-1">
              <Image src="/images/architectural-marvel-with-ornate-columns-arches.jpg" alt="Heritage Institutions" fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:1024px)100vw,42vw" className="object-cover" />
            </div>
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 order-1 lg:order-2">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.bronze }}>For Heritage Institutions</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-tight tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>
                Technology for Cultural Preservation
              </h2>
              <p className="font-sans font-normal text-sm sm:text-base md:text-lg leading-relaxed max-w-xl" style={{ color: C.textStone }}>
                Museum-grade tools to digitize, search, reconstruct and reanimate collections for a new generation of visitors — serving museums, archives, foundations and cultural institutions worldwide.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2">
                {institutionServices.map((s) => (
                  <span key={s} className="text-[10px] sm:text-xs font-sans font-normal flex items-center gap-1.5" style={{ color: C.textStone }}>
                    <span className="w-1 h-1" style={{ background: C.bronze }} />{s}
                  </span>
                ))}
              </div>
              <Link href="/membership" className="inline-block mt-4 text-[10px] sm:text-xs uppercase tracking-[0.22em] transition font-medium pb-0.5 font-sans" style={{ color: C.bronze, borderBottom: `1px solid ${C.champagne}` }}>
                Request a Briefing →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.bronze }}>Partnership</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mt-4 mb-6 tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>Heritage Is Humanity&apos;s Most Valuable Asset</h2>
          <p className="font-sans font-normal text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-10" style={{ color: C.textStone }}>
            The stories that built civilizations deserve to survive. The Royal Gallery exists to ensure they do.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/membership" className="inline-block px-10 py-4 transition text-xs uppercase tracking-[0.22em] font-medium font-sans" style={{ border: `1px solid ${C.bronze}`, color: C.bronze }}>Partner With Us</Link>
            <Link href="/heritage-ai" className="inline-block px-10 py-4 transition text-xs uppercase tracking-[0.22em] font-medium font-sans" style={{ border: `1px solid ${C.bronze}`, color: C.bronze }}>Explore Heritage AI</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
