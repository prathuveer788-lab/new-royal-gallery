import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impact & Mission — The Living Heritage Archive | The Royal Gallerys",
  description:
    "Building the world's largest living heritage archive. Documenting royal legacies, historic architecture, and traditional crafts for future generations.",
  alternates: { canonical: "https://theroyalgallerys.com/impact" },
  openGraph: {
    title: "Impact & Mission — The Living Heritage Archive | The Royal Gallerys",
    description:
      "Building the world's largest living heritage archive. Documenting royal legacies, historic architecture, and traditional crafts for future generations.",
    url: "https://theroyalgallerys.com/impact",
    type: "website",
    siteName: "The Royal Gallerys",
    images: [
      {
        url: "https://theroyalgallerys.com/images/hero/jaipur-city-palace-grand-facade.jpg",
        width: 1200,
        height: 630,
        alt: "The Royal Gallerys Impact and Mission",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@theroyalgallerys",
    creator: "@theroyalgallerys",
    title: "Impact & Mission — The Living Heritage Archive | The Royal Gallerys",
    description:
      "Building the world's largest living heritage archive. Documenting royal legacies, historic architecture, and traditional crafts.",
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

const impactNumbers = [
  { v: "10,000+", l: "Heritage Stories", d: "Documented across our media platforms" },
  { v: "50+", l: "Documentaries", d: "Original films on royal families & heritage" },
  { v: "25+", l: "Royal Partnerships", d: "Active collaborations worldwide" },
  { v: "100+", l: "Heritage Institutions", d: "Museums, archives & foundations" },
  { v: "5M+", l: "Global Audience", d: "Magazine, digital, documentary & social" },
  { v: "1M+", l: "Archive Goal", d: "Photographs, letters, records & oral histories" },
];

const values = [
  { title: "Preservation", desc: "Every story, image and tradition documented before it is lost. We treat heritage as irreplaceable — because it is." },
  { title: "Dignity", desc: "Royal and aristocratic heritage handled with the discretion, respect and cultural sensitivity it deserves." },
  { title: "Innovation", desc: "Using the best of technology — AI, digital preservation, immersive media — in service of the oldest human need: remembering." },
  { title: "Access", desc: "Heritage should not be locked away. We make it discoverable, searchable and available across languages and geographies." },
  { title: "Authenticity", desc: "No invention, no embellishment. We document what is real — verified through rigorous research and primary sources." },
  { title: "Legacy", desc: "We measure success in generations, not quarters. Every asset we preserve is preserved for centuries." },
];

export default function ImpactPage() {
  return (
    <div style={{ background: C.ivory }}>
      <section className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16 text-center" style={{ background: C.obsidian }}>
        <div className="max-w-3xl mx-auto">
          <span className="text-[10px]/[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.champagne }}>Our Impact</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mt-4 mb-6 leading-[0.95] tracking-tight" style={{ color: C.ivory, fontWeight: 400 }}>Building the World&apos;s Largest Living Heritage Archive</h1>
          <p className="text-sm sm:text-base font-sans font-normal max-w-2xl mx-auto leading-relaxed" style={{ color: C.textStone }}>Heritage is humanity&apos;s most valuable asset. We measure success by what we preserve, how many we reach, and the generations we serve.</p>
        </div>
      </section>

      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6 mb-20 sm:mb-28">
            {impactNumbers.map((n) => (
              <div key={n.l} className="text-center p-5 sm:p-6 transition-all" style={{ border: `1px solid rgba(138,115,82,0.35)` }}>
                <p className="text-3xl sm:text-4xl md:text-5xl font-serif mb-1.5" style={{ color: C.bronze, fontWeight: 400 }}>{n.v}</p>
                <p className="text-[10px]/[11px] font-medium font-sans uppercase tracking-[0.22em] mb-1" style={{ color: C.textDeep }}>{n.l}</p>
                <p className="text-[9px] font-sans font-normal" style={{ color: C.textStone }}>{n.d}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif text-center mb-10 tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>Our Principles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-20 sm:mb-28">
            {values.map((v) => (
              <div key={v.title} className="p-6 sm:p-7 transition-all" style={{ border: `1px solid rgba(138,115,82,0.35)` }}>
                <h3 className="font-serif text-lg sm:text-xl mb-2" style={{ color: C.textDeep, fontWeight: 400 }}>{v.title}</h3>
                <p className="text-xs sm:text-sm font-sans font-normal leading-relaxed" style={{ color: C.textStone }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.obsidian }}>
        <div className="max-w-3xl mx-auto">
          <span className="text-[10px]/[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.champagne }}>Founder&apos;s Letter</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mt-4 mb-8 tracking-tight" style={{ color: C.ivory, fontWeight: 400 }}>Why We Started</h2>
          <div className="space-y-6 text-sm sm:text-base font-sans font-normal leading-relaxed" style={{ color: C.textStone }}>
            <p>Heritage is disappearing. Every year the world loses photographs, letters, voices and traditions that can never be recovered — fading quietly while we look away.</p>
            <p>But for the first time in history, technology can preserve it. And storytelling can amplify it — carrying the wisdom of the past into the hands of the future.</p>
            <p>Future generations deserve access to the knowledge that built civilizations. The Royal Gallerys exists to make certain they receive it.</p>
          </div>
          <p className="mt-10 text-sm font-serif italic" style={{ color: C.champagne, fontWeight: 400 }}>— The Royal Gallerys, Founding Office</p>
        </div>
      </section>

      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-6 tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>Heritage Is Humanity&apos;s<br />Most Valuable Asset</h2>
        <p className="text-sm sm:text-base font-sans font-normal max-w-xl mx-auto mb-10" style={{ color: C.textStone }}>The stories that built civilizations deserve to survive. The Royal Gallerys exists to ensure they do.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/membership" className="inline-block px-10 py-4 transition-colors text-xs uppercase tracking-[0.22em] font-medium font-sans" style={{ background: C.obsidian, color: C.ivory, border: `1px solid ${C.obsidian}` }} >Partner With Us</Link>
          <Link href="/global-vision" className="inline-block px-10 py-4 transition-colors text-xs uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.textDeep, border: `1px solid ${C.bronze}` }} >Explore the Vision</Link>
        </div>
      </section>
    </div>
  );
}
