import Link from "next/link";

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
    <div className="bg-white">
      <section className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16 bg-neutral-900 text-white">
        <div className="max-w-4xl">
          <span className="text-amber-400 text-[9px] sm:text-[10px] uppercase tracking-[0.35em] font-semibold">Global Vision</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif mt-4 mb-6 leading-[0.95] tracking-tight">From India<br />to the World</h1>
          <p className="text-neutral-400 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl">Building a global heritage preservation network — spanning continents, connecting royal traditions, and uniting cultural institutions in preserving civilization&apos;s memory.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 text-center">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-700 font-bold">Global Presence</span>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-5 mt-6">
            {globalCities.map((c) => (<span key={c} className="text-sm sm:text-base font-serif text-neutral-600 bg-[#faf8f5] px-6 py-3 border border-neutral-200 hover:border-amber-200 transition-colors">{c}</span>))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          {phases.map((p) => (
            <div key={p.phase} className={`p-6 sm:p-8 border ${p.active ? 'border-amber-200 bg-[#faf8f5]' : 'border-neutral-200'} hover:shadow-md transition-all`}>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-amber-700 font-bold">{p.phase}</span>
                {p.active && <span className="text-[7px] sm:text-[8px] uppercase tracking-[0.2em] bg-amber-100 text-amber-700 px-2.5 py-0.5 font-bold">Active</span>}
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-neutral-900 mb-2">{p.region}</h3>
              <p className="text-neutral-500 text-sm sm:text-base font-light leading-relaxed mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.cities.map((c) => (<span key={c} className="text-[9px] sm:text-[10px] text-neutral-400 font-light bg-neutral-100 px-3 py-1">{c}</span>))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 sm:py-24 px-6 sm:px-8 md:px-12 lg:px-16 text-center bg-[#faf8f5]">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 mb-6 tracking-tight">Join the Global Network</h2>
        <p className="text-neutral-500 text-sm sm:text-base font-light max-w-xl mx-auto mb-10">Partner with The Royal Gallery as we expand across continents.</p>
        <Link href="/membership" className="inline-block px-10 py-4 bg-neutral-900 text-white hover:bg-neutral-800 transition text-xs uppercase tracking-[0.25em] font-semibold">Become a Partner</Link>
      </section>
    </div>
  );
}
