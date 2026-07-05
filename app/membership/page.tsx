import Link from "next/link";

const tiers = [
  { name: "Circle", subtitle: "The Beginning", price: "Complimentary Application", benefits: ["Exclusive event invitations", "Private digital content access", "Quarterly print magazine", "The Dispatch newsletter", "Priority event registration", "Member-only online portal"], cta: "Apply", featured: false },
  { name: "Patron", subtitle: "The Supporter", price: "Annual Membership", benefits: ["All Circle benefits", "Research archive access", "Limited-edition publications", "Salon dinner invitations", "Private heritage tour access", "Annual Patron gathering", "Concierge heritage service"], cta: "Apply", featured: true },
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
    <div className="bg-white">
      {/* HERO */}
      <section className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16 bg-neutral-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-amber-400 text-[9px] sm:text-[10px] uppercase tracking-[0.35em] font-semibold">Membership</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mt-4 mb-6 leading-[0.95] tracking-tight">Join the Royal Gallery Circle</h1>
          <p className="text-neutral-400 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">An invitation into the world&apos;s most rarefied heritage community — events, archives, publications and a private royal network.</p>
        </div>
      </section>

      {/* TIERS */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {tiers.map((tier) => (
              <div key={tier.name} className={`p-6 sm:p-8 border flex flex-col transition-all ${tier.featured ? 'border-amber-300 bg-[#faf8f5] shadow-lg ring-1 ring-amber-200' : 'border-neutral-200 hover:border-amber-200 hover:shadow-md'}`}>
                {tier.featured && <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] bg-amber-500 text-white px-2.5 py-0.5 self-start mb-5 font-bold">Recommended</span>}
                <p className="text-xl sm:text-2xl font-serif text-neutral-900 mb-0.5">{tier.name}</p>
                <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-amber-700 font-bold mb-1">{tier.subtitle}</p>
                <p className="text-[10px] sm:text-[11px] text-neutral-400 font-light mb-6">{tier.price}</p>
                <ul className="space-y-2.5 mb-8 flex-grow">
                  {tier.benefits.map((b) => (<li key={b} className="text-[10px] sm:text-xs text-neutral-600 font-light flex items-start gap-2"><span className="text-amber-500 mt-0.5 flex-shrink-0">·</span>{b}</li>))}
                </ul>
                <Link href="#" className={`inline-block text-center text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold py-2.5 px-4 transition ${tier.featured ? 'bg-amber-500 text-white hover:bg-amber-400' : 'border border-amber-500 text-amber-700 hover:bg-amber-50'}`}>{tier.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER TYPES */}
      <section className="py-12 sm:py-20 px-6 sm:px-8 md:px-12 lg:px-16 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-serif text-neutral-900 text-center mb-10 tracking-tight">Partnership Opportunities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {partnerTypes.map((p) => (
              <Link key={p.title} href={p.link} className="bg-white p-6 sm:p-7 border border-neutral-100 hover:shadow-md hover:border-amber-100 transition-all group">
                <h3 className="font-serif text-base sm:text-lg text-neutral-900 mb-2 group-hover:text-amber-800 transition-colors">{p.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed">{p.desc}</p>
                <span className="inline-block mt-4 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-amber-700 font-bold">Learn More →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-700 font-bold">Contact</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 mt-4 mb-6 tracking-tight">An Invitation to Build the Future of Heritage</h2>
          <p className="text-neutral-500 text-sm font-light max-w-xl mx-auto mb-10">Private consultations available for royal families, luxury brands and heritage institutions.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#" className="inline-block px-10 py-4 bg-neutral-900 text-white hover:bg-neutral-800 transition text-xs uppercase tracking-[0.25em] font-semibold">Schedule a Consultation</Link>
            <a href="mailto:hello@theroyalgallery.com" className="inline-block px-10 py-4 border border-neutral-300 text-neutral-700 hover:border-neutral-900 transition text-xs uppercase tracking-[0.25em] font-medium">Email Us</a>
          </div>
          <p className="mt-6 text-[10px] text-neutral-400 uppercase tracking-[0.3em]">hello@theroyalgallery.com</p>
        </div>
      </section>
    </div>
  );
}
