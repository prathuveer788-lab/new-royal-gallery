import Link from "next/link";

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

const tiers = [
  { name: "Patron", subtitle: "The Supporter", price: "Annual Membership", benefits: ["Research archive access", "Limited-edition publications", "Salon dinner invitations", "Private heritage tour access", "Annual Patron gathering", "Concierge heritage service"], cta: "Apply", featured: true },
  { name: "Legacy", subtitle: "The Custodian", price: "Curated Membership", benefits: ["All Patron benefits", "Full royal network access", "Private heritage journeys", "Personal archive consultation", "Royal family introductions", "Bespoke documentary production", "Legacy book commission", "Annual Legacy Summit seat"], cta: "Apply", featured: false },
  { name: "Founder", subtitle: "By Invitation", price: "Founding Circle", benefits: ["All Legacy benefits", "Founding circle governance seat", "Shape institutional direction", "Lifetime archive access", "Global summit hosting rights", "Named archive collection", "Private royal audiences", "Founder recognition in perpetuity"], cta: "Enquire", featured: false },
];

const partnerTypes = [
  { title: "Royal Families", desc: "Discreet heritage preservation, documentary production and global storytelling.", link: "/heritage" },
  { title: "Luxury Brands", desc: "Heritage-powered campaigns, editorial placement and royal context.", link: "/culture" },
  { title: "Heritage Institutions", desc: "Digital archives, AI search and interactive exhibitions.", link: "/heritage" },
  { title: "Researchers", desc: "Archive access, research partnerships and publishing.", link: "/journal" },
];

export default function MembershipPage() {
  return (
    <div style={{ background: C.ivory }}>
      {/* HERO */}
      <section className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16 text-center" style={{ background: C.obsidian }}>
        <div className="max-w-3xl mx-auto">
          <span className="text-[10px]/[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.champagne }}>Membership</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mt-4 mb-6 leading-[0.95] tracking-tight" style={{ color: C.ivory, fontWeight: 400 }}>Join the Royal Gallery Circle</h1>
          <p className="text-sm sm:text-base font-sans font-normal max-w-2xl mx-auto leading-relaxed" style={{ color: C.textStone }}>An invitation into the world&apos;s most rarefied heritage community — events, archives, publications and a private royal network.</p>
        </div>
      </section>

      {/* TIERS */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {tiers.map((tier) => (
              <div key={tier.name} className="p-6 sm:p-8 flex flex-col transition-all" style={{ border: tier.featured ? `1px solid ${C.champagne}` : `1px solid rgba(138,115,82,0.35)`, background: tier.featured ? C.cream : "transparent" }}>
                {tier.featured && <span className="text-[9px] uppercase tracking-[0.22em] font-medium font-sans px-2.5 py-0.5 self-start mb-5" style={{ background: C.bronze, color: C.ivory }}>Recommended</span>}
                <p className="text-xl sm:text-2xl font-serif mb-0.5" style={{ color: C.textDeep, fontWeight: 400 }}>{tier.name}</p>
                <p className="text-[10px]/[11px] uppercase tracking-[0.22em] font-medium font-sans mb-1" style={{ color: C.bronze }}>{tier.subtitle}</p>
                <p className="text-[10px]/[11px] font-sans font-normal mb-6" style={{ color: C.textStone }}>{tier.price}</p>
                <ul className="space-y-2.5 mb-8 flex-grow">
                  {tier.benefits.map((b) => (<li key={b} className="text-[10px]/[11px] font-sans font-normal flex items-start gap-2" style={{ color: C.textStone }}><span className="mt-0.5 flex-shrink-0" style={{ color: C.bronze }}>·</span>{b}</li>))}
                </ul>
                <Link href="#" className="inline-block text-center text-[10px]/[11px] uppercase tracking-[0.22em] font-medium font-sans py-2.5 px-4 transition-colors" style={tier.featured ? { background: C.bronze, color: C.ivory, border: `1px solid ${C.bronze}` } : { color: C.bronze, border: `1px solid ${C.bronze}` }}>{tier.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER TYPES */}
      <section className="py-12 sm:py-20 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-serif text-center mb-10 tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>Partnership Opportunities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {partnerTypes.map((p) => (
              <Link key={p.title} href={p.link} className="p-6 sm:p-7 transition-all group" style={{ background: C.ivory, border: `1px solid rgba(138,115,82,0.2)` }} >
                <h3 className="font-serif text-base sm:text-lg mb-2 transition-colors" style={{ color: C.textDeep, fontWeight: 400 }} >{p.title}</h3>
                <p className="text-xs sm:text-sm font-sans font-normal leading-relaxed" style={{ color: C.textStone }}>{p.desc}</p>
                <span className="inline-block mt-4 text-[10px]/[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.bronze }}>Learn More →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT & ENQUIRIES */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-[10px]/[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.bronze }}>Enquiries</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mt-4 mb-6 tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>An Invitation to Build the Future of Heritage</h2>
          <p className="text-sm font-sans font-normal max-w-xl mx-auto mb-10" style={{ color: C.textStone }}>Private consultations available for royal families, luxury brands and heritage institutions.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#" className="inline-block px-10 py-4 transition-colors text-xs uppercase tracking-[0.22em] font-medium font-sans" style={{ background: C.obsidian, color: C.ivory, border: `1px solid ${C.obsidian}` }} >Schedule a Consultation</Link>
            <a href="mailto:hey.theroyalgallerys@gmail.com" className="inline-block px-10 py-4 transition-colors text-xs uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.textDeep, border: `1px solid ${C.bronze}` }} >Email Us</a>
          </div>
          <div className="mt-6 space-y-1.5">
            <p className="text-[10px]/[11px] uppercase tracking-[0.22em] font-sans font-normal">
              <a href="mailto:hey.theroyalgallerys@gmail.com" style={{ color: C.textStone }} >hey.theroyalgallerys@gmail.com</a>
            </p>
            <p className="text-[10px]/[11px] uppercase tracking-[0.22em] font-sans font-normal">
              <a href="https://www.instagram.com/theroyalgallerys/" target="_blank" rel="noreferrer" style={{ color: C.textStone }} >@theroyalgallerys</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
