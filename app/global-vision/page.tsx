import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Global Vision — Preserving Heritage Worldwide | The Royal Gallerys",
  description:
    "Building a global heritage preservation network — spanning continents, connecting royal traditions, and uniting cultural institutions in preserving civilization's memory.",
  alternates: { canonical: "https://theroyalgallerys.com/global-vision" },
  openGraph: {
    title: "Global Vision — Preserving Heritage Worldwide | The Royal Gallerys",
    description:
      "Building a global heritage preservation network — spanning continents, connecting royal traditions, and uniting cultural institutions in preserving civilization's memory.",
    url: "https://theroyalgallerys.com/global-vision",
    type: "website",
    siteName: "The Royal Gallerys",
    images: [
      {
        url: "https://theroyalgallerys.com/images/hero/jaipur-city-palace-grand-facade.jpg",
        width: 1200,
        height: 630,
        alt: "The Royal Gallerys Global Vision",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@theroyalgallerys",
    creator: "@theroyalgallerys",
    title: "Global Vision — Preserving Heritage Worldwide | The Royal Gallerys",
    description:
      "Building a global heritage preservation network — spanning continents, connecting royal traditions, and uniting cultural institutions.",
    images: ["https://theroyalgallerys.com/images/hero/jaipur-city-palace-grand-facade.jpg"],
  },
};

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

const phases = [
  { phase: "Phase 1", region: "India", desc: "Establishing the foundation — partnerships with royal families, heritage institutions, museums and luxury brands across India. Building the core archive, launching the magazine and hosting the first heritage summits.", cities: ["Jaipur", "Udaipur", "Jodhpur", "Delhi", "Mumbai", "Hyderabad"], active: true },
  { phase: "Phase 2", region: "South Asia", desc: "Expanding into the broader South Asian heritage landscape — connecting royal and aristocratic networks across the subcontinent and documenting shared cultural histories.", cities: ["Kathmandu", "Colombo", "Dhaka", "Lahore"], active: false },
  { phase: "Phase 3", region: "Middle East Royal Heritage", desc: "Partnering with royal families and cultural institutions across the Middle East — preserving desert palace heritage, Islamic art traditions and dynastic histories.", cities: ["Dubai", "Abu Dhabi", "Riyadh", "Muscat", "Doha", "Amman"], active: false },
  { phase: "Phase 4", region: "European Aristocratic Heritage", desc: "Connecting with aristocratic families, palace archives and heritage foundations across Europe — documenting centuries of royal and noble traditions.", cities: ["London", "Vienna", "Paris", "Rome", "Madrid", "Edinburgh"], active: false },
  { phase: "Phase 5", region: "Global Cultural Preservation Network", desc: "A fully connected global network — heritage institutions, royal families, museums, luxury brands and technology partners united in preserving and amplifying world heritage.", cities: ["New York", "Tokyo", "Bangkok", "Istanbul", "Marrakech", "Mexico City"], active: false },
];

const globalCities = ["India", "London", "Vienna", "Paris", "Rome", "Dubai", "New York", "Tokyo"];

export default function GlobalVisionPage() {
  return (
    <div style={{ background: C.ivory }}>
      <section className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.obsidian }}>
        <div className="max-w-4xl">
          <span className="text-[10px]/[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.champagne }}>Global Vision</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif mt-4 mb-6 leading-[0.95] tracking-tight" style={{ color: C.ivory, fontWeight: 400 }}>From India<br />to the World</h1>
          <p className="text-sm sm:text-base md:text-lg font-sans font-normal leading-relaxed max-w-2xl" style={{ color: C.textStone }}>Building a global heritage preservation network — spanning continents, connecting royal traditions, and uniting cultural institutions in preserving civilization&apos;s memory.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16" style={{ borderBottom: `1px solid rgba(138,115,82,0.35)` }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 text-center">
          <span className="text-[10px]/[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.bronze }}>Global Presence</span>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-5 mt-6">
            {globalCities.map((c) => (<span key={c} className="text-sm sm:text-base font-serif px-6 py-3 transition-colors" style={{ color: C.textDeep, fontWeight: 400, background: C.cream, border: `1px solid rgba(138,115,82,0.35)` }}>{c}</span>))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {phases.map((p) => (
            <div key={p.phase} className="p-6 sm:p-8 transition-all" style={{ border: p.active ? `1px solid ${C.bronze}` : `1px solid rgba(138,115,82,0.35)`, background: p.active ? C.cream : "transparent" }}>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-[10px]/[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.bronze }}>{p.phase}</span>
                {p.active && <span className="text-[8px] uppercase tracking-[0.22em] font-medium font-sans px-2.5 py-0.5" style={{ background: C.forest, color: C.champagne }}>Active</span>}
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif mb-2" style={{ color: C.textDeep, fontWeight: 400 }}>{p.region}</h3>
              <p className="text-sm sm:text-base font-sans font-normal leading-relaxed mb-4" style={{ color: C.textStone }}>{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.cities.map((c) => (<span key={c} className="text-[9px]/[10px] font-sans font-normal px-3 py-1" style={{ color: C.textStone, background: C.cream }}>{c}</span>))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-24 px-6 sm:px-8 md:px-12 lg:px-16 text-center" style={{ background: C.cream }}>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-6 tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>Join the Global Network</h2>
        <p className="text-sm sm:text-base font-sans font-normal max-w-xl mx-auto mb-10" style={{ color: C.textStone }}>Partner with The Royal Gallerys as we expand across continents.</p>
        <Link href="/advertise" className="inline-block px-10 py-4 transition-colors text-xs uppercase tracking-[0.22em] font-medium font-sans" style={{ background: C.obsidian, color: C.ivory, border: `1px solid ${C.obsidian}` }} >Become a Partner</Link>
      </section>
    </div>
  );
}
