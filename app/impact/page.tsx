import Link from "next/link";

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
    <div className="bg-white">
      <section className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16 bg-neutral-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-amber-400 text-[9px] sm:text-[10px] uppercase tracking-[0.35em] font-semibold">Our Impact</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mt-4 mb-6 leading-[0.95] tracking-tight">Building the World&apos;s Largest Living Heritage Archive</h1>
          <p className="text-neutral-400 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">Heritage is humanity&apos;s most valuable asset. We measure success by what we preserve, how many we reach, and the generations we serve.</p>
        </div>
      </section>

      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6 mb-20 sm:mb-28">
            {impactNumbers.map((n) => (
              <div key={n.l} className="text-center p-5 sm:p-6 border border-neutral-100 hover:border-amber-100 hover:shadow-sm transition-all">
                <p className="text-3xl sm:text-4xl md:text-5xl font-serif text-amber-600 mb-1.5">{n.v}</p>
                <p className="text-[9px] sm:text-[10px] md:text-[11px] font-semibold text-neutral-800 uppercase tracking-wide mb-1">{n.l}</p>
                <p className="text-[8px] sm:text-[9px] text-neutral-400 font-light">{n.d}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif text-neutral-900 text-center mb-10 tracking-tight">Our Principles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-20 sm:mb-28">
            {values.map((v) => (
              <div key={v.title} className="border border-neutral-100 p-6 sm:p-7 hover:shadow-md hover:border-amber-100 transition-all">
                <h3 className="font-serif text-lg sm:text-xl text-neutral-900 mb-2">{v.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-6 sm:px-8 md:px-12 lg:px-16 bg-neutral-900 text-white">
        <div className="max-w-3xl mx-auto">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-400 font-bold">Founder&apos;s Letter</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mt-4 mb-8 tracking-tight">Why We Started</h2>
          <div className="space-y-6 text-sm sm:text-base font-light leading-relaxed text-neutral-400">
            <p>Heritage is disappearing. Every year the world loses photographs, letters, voices and traditions that can never be recovered — fading quietly while we look away.</p>
            <p>But for the first time in history, technology can preserve it. And storytelling can amplify it — carrying the wisdom of the past into the hands of the future.</p>
            <p>Future generations deserve access to the knowledge that built civilizations. The Royal Gallery exists to make certain they receive it.</p>
          </div>
          <p className="mt-10 text-sm font-serif text-amber-300">— The Royal Gallery, Founding Office</p>
        </div>
      </section>

      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 mb-6 tracking-tight">Heritage Is Humanity&apos;s<br />Most Valuable Asset</h2>
        <p className="text-neutral-500 text-sm sm:text-base font-light max-w-xl mx-auto mb-10">The stories that built civilizations deserve to survive. The Royal Gallery exists to ensure they do.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/membership" className="inline-block px-10 py-4 bg-neutral-900 text-white hover:bg-neutral-800 transition text-xs uppercase tracking-[0.25em] font-semibold">Partner With Us</Link>
          <Link href="/global-vision" className="inline-block px-10 py-4 border border-neutral-300 text-neutral-700 hover:border-neutral-900 transition text-xs uppercase tracking-[0.25em] font-medium">Explore the Vision</Link>
        </div>
      </section>
    </div>
  );
}
