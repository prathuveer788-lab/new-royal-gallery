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

const aiCapabilities = [
  { title: "AI Heritage Portraits", subtitle: "Speak with History", desc: "Ethical AI-powered interactive representations of historical figures — trained on their writings, speeches and recorded words. Future generations can engage directly with the voices and wisdom of the past.", tags: ["Primary sources only", "Clearly labeled AI", "Multilingual", "Family-authorized"] },
  { title: "Digital Twins", subtitle: "Preserve Monuments Forever", desc: "High-fidelity 3D digital replicas captured with photogrammetry and LiDAR — preserved permanently even if the physical structure decays.", tags: ["Sub-millimeter accuracy", "Interactive exploration", "VR/AR ready", "Scholarly layer"] },
  { title: "Interactive Archives", subtitle: "Search Across Centuries", desc: "AI-powered natural language search across millions of documents, photographs and records — cross-archive discovery with semantic understanding.", tags: ["Natural language", "Cross-archive", "Semantic search", "Multi-language"] },
  { title: "Historical Reconstruction", subtitle: "Rebuild What Was Lost", desc: "AI-powered digital reconstruction of damaged heritage using historical references, architectural knowledge and surviving fragments.", tags: ["Evidence-based", "Multiple hypotheses", "Architectural AI", "Scholar-annotated"] },
  { title: "Multilingual Access", subtitle: "Heritage Without Barriers", desc: "AI translation and localization into 100+ languages — a 16th-century Persian manuscript becomes accessible to a student in Tokyo and a researcher in São Paulo.", tags: ["100+ languages", "Context-aware", "Cultural nuance", "Real-time"] },
  { title: "Museum AI", subtitle: "Intelligence for Institutions", desc: "Museum-grade AI search deployed across collections — recognizing patterns, surfacing connections human researchers might miss.", tags: ["Pattern recognition", "Auto-cataloguing", "Cross-collection", "Collaboration tools"] },
];

const ethicalPrinciples = [
  { title: "Historical Fidelity", desc: "Every AI reconstruction is grounded in verifiable primary sources. We never invent dialogue, attributes or narratives." },
  { title: "Transparency by Design", desc: "All AI-generated content is clearly and permanently labeled. Users always know what is AI versus original." },
  { title: "Human Curation", desc: "Every archive, portrait and reconstruction is reviewed by human historians and cultural custodians before release." },
  { title: "Family Consent", desc: "For personal heritage, we operate exclusively with informed consent of families and authorized custodians." },
  { title: "Cultural Sensitivity", desc: "Our AI recognizes and respects cultural protocols, sacred knowledge restrictions and community ownership." },
  { title: "Perpetual Preservation", desc: "We design for centuries — open standards, redundant continents, independent of any single technology vendor." },
];

export default function FuturesPage() {
  return (
    <div style={{ background: C.ivory }}>
      {/* Hero */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Image src="/images/hallway-arches-with-dramatic-light-shadows.jpg" alt="Futures" fill priority placeholder="blur" blurDataURL={blurDataURL} className="object-cover" />
          <div className="absolute inset-0" style={{ background: C.obsidian, opacity: 0.55 }} />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pt-32 sm:pt-40 pb-16 sm:pb-24">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.champagne }}>The Royal Gallerys</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif leading-[0.95] mt-4 mb-6 tracking-tight" style={{ color: C.ivory, fontWeight: 400 }}>Futures</h1>
          <p className="text-sm sm:text-base md:text-lg font-sans font-normal leading-relaxed max-w-xl" style={{ color: C.textStone }}>
            AI, technology, innovation, future mobility and sustainability — the forces reshaping heritage, culture and luxury for the next century.
          </p>
        </div>
      </section>

      {/* AI Capabilities */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.bronze }}>AI · Heritage Intelligence</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mt-4 tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>Heritage Meets Artificial Intelligence</h2>
            <p className="font-sans font-normal text-sm leading-relaxed max-w-2xl mx-auto mt-4" style={{ color: C.textStone }}>
              For the first time in history, technology can preserve heritage at scale. THE ROYAL GALLERYS is building the ethical AI infrastructure to make certain it does.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
            {aiCapabilities.map((cap) => (
              <div key={cap.title} className="p-6 sm:p-8 transition-all group" style={{ background: C.ivory, border: "1px solid rgba(138,115,82,0.35)" }}>
                <div className="space-y-2 sm:space-y-3">
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.bronze }}>{cap.subtitle}</span>
                  <h3 className="text-xl sm:text-2xl font-serif transition-colors" style={{ color: C.textDeep, fontWeight: 400 }}>{cap.title}</h3>
                  <p className="text-xs sm:text-sm font-sans font-normal leading-relaxed" style={{ color: C.textStone }}>{cap.desc}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cap.tags.map((t) => (<span key={t} className="text-[7px] sm:text-[8px] px-2.5 py-1 font-sans font-normal" style={{ background: C.cream, color: C.textStone }}>{t}</span>))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ethics */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.obsidian }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.champagne }}>Ethics</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mt-4 tracking-tight" style={{ color: C.ivory, fontWeight: 400 }}>The Ethics of the Archive</h2>
            <blockquote className="mt-8 pt-6 font-serif italic text-base sm:text-lg" style={{ borderTop: "1px solid rgba(244,240,231,0.12)", color: C.champagne }}>
              &ldquo;We are not recreating people. We are preserving knowledge.&rdquo;
            </blockquote>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {ethicalPrinciples.map((p) => (
              <div key={p.title} className="p-5 sm:p-6 transition-colors" style={{ border: "1px solid rgba(244,240,231,0.12)" }}>
                <h3 className="font-serif text-base sm:text-lg mb-2" style={{ color: C.champagne, fontWeight: 400 }}>{p.title}</h3>
                <p className="text-xs sm:text-sm font-sans font-normal leading-relaxed" style={{ color: C.textStone }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Mobility + Sustainability */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14">
            <div>
              <span className="text-[9px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.bronze }}>Future Mobility</span>
              <h2 className="text-2xl sm:text-3xl font-serif mt-2 mb-4 tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>The Next Generation of Movement</h2>
              <p className="font-sans font-normal text-sm leading-relaxed" style={{ color: C.textStone }}>
                Electric aviation, autonomous luxury vehicles, hyperloop corridors, and the reimagining of the journey — how technology is transforming the experience of travel.
              </p>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.bronze }}>Sustainability</span>
              <h2 className="text-2xl sm:text-3xl font-serif mt-2 mb-4 tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>Heritage as a Sustainable Asset</h2>
              <p className="font-sans font-normal text-sm leading-relaxed" style={{ color: C.textStone }}>
                How heritage preservation, cultural tourism, and traditional craftsmanship represent one of the most powerful — and underinvested — pathways to sustainable economic development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16 text-center" style={{ background: C.cream }}>
        <div className="max-w-3xl mx-auto">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.bronze }}>Partner With Royal Gallery AI</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mt-4 mb-6 tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>The Future of Heritage Is Being Built Now</h2>
          <p className="font-sans font-normal text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-10" style={{ color: C.textStone }}>
            Technology can preserve what time erodes. Partner with us to ensure your heritage survives — for your family, your institution, and the generations to come.
          </p>
          <Link href="/membership" className="inline-block px-10 py-4 transition text-xs uppercase tracking-[0.22em] font-medium font-sans" style={{ border: `1px solid ${C.bronze}`, color: C.bronze }}>Partner With Us</Link>
        </div>
      </section>
    </div>
  );
}
