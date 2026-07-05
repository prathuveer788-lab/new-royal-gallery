import Image from "next/image";
import Link from "next/link";

const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNkZGRkZGQiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

const signatureExperiences = [
  { label: "Signature", title: "Royal Palace Dinners", desc: "Intimate evening gatherings in India's most magnificent palace settings — curated menus, private performances and conversations with royalty.", img: "/images/mehrangarh-fort.jpg" },
  { label: "Private", title: "Heritage Tours", desc: "Behind-the-scenes access to private royal residences, closed collections and hidden architectural treasures guided by historians.", img: "/images/badi-mahal-garden-palace-city-palace-udaipur-rajasthan-india.jpg" },
  { label: "Intimate", title: "Royal Conversations", desc: "Private audiences and salon discussions with members of royal families, cultural custodians and heritage thought leaders.", img: "/images/hawa-mahal-palace-jaipur-india.jpg" },
  { label: "Convening", title: "Heritage Summits", desc: "Annual gatherings of heritage leaders, royal families and cultural institutions shaping the future of global preservation.", img: "/images/architectural-marvel-with-ornate-columns-arches.jpg" },
  { label: "Escape", title: "Luxury Retreats", desc: "Curated extended stays in palace hotels and heritage properties — immersive cultural experiences with the intimacy of a private residence.", img: "/images/udaipur-city-view-from-hotel-balcony-rajasthan-india.jpg" },
  { label: "Members Only", title: "Archive Access & Collectors Circles", desc: "Exclusive access to private archives, rare collections and the inner circle of heritage connoisseurship.", img: "/images/hallway-arches-with-dramatic-light-shadows.jpg" },
];

export default function TravelPage() {
  return (
    <div className="bg-white">
      {/* ══════════ HERO ══════════ */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Image src="/images/udaipur-city-view-from-hotel-balcony-rajasthan-india(1).jpg" alt="Experiences" fill priority placeholder="blur" blurDataURL={blurDataURL} className="object-cover" />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pt-32 sm:pt-40 pb-16 sm:pb-24">
          <span className="text-amber-300 text-[9px] sm:text-[10px] uppercase tracking-[0.35em] font-semibold">Experiences</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-white leading-[0.95] mt-4 mb-6 tracking-tight">
            Heritage You<br />Can Experience
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl">
            Curated encounters that bring heritage to life — from palace dinners to private tours, from luxury retreats to exclusive collectors&apos; circles.
          </p>
        </div>
      </section>

      {/* ══════════ SIGNATURE EXPERIENCES ══════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-700 font-bold">Signature</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-neutral-900 mt-4 tracking-tight">Curated Heritage Encounters</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {signatureExperiences.map((exp) => (
              <div key={exp.title} className="group">
                <div className="relative aspect-[4/3] overflow-hidden mb-4">
                  <Image src={exp.img} alt={exp.title} fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:640px)100vw,(max-width:1024px)50vw,33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <span className="absolute top-3 left-3 text-[7px] sm:text-[8px] uppercase tracking-[0.2em] bg-white/90 backdrop-blur text-amber-800 px-2.5 py-1 font-bold">{exp.label}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-neutral-900 mb-2 group-hover:text-amber-800 transition-colors">{exp.title}</h3>
                <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed">{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16 bg-neutral-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-400 font-bold">Begin Your Journey</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mt-4 mb-6 tracking-tight">An Invitation to Extraordinary Heritage</h2>
          <p className="text-neutral-400 text-sm sm:text-base font-light max-w-xl mx-auto mb-10 leading-relaxed">
            Private consultations available for bespoke heritage experiences, palace bookings and cultural itineraries curated around your interests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/membership" className="inline-block px-10 py-4 bg-amber-500 text-neutral-900 hover:bg-amber-400 transition text-xs uppercase tracking-[0.25em] font-semibold">Enquire Now</Link>
            <Link href="/ecosystem" className="inline-block px-10 py-4 border border-white/30 text-white hover:border-amber-300 transition text-xs uppercase tracking-[0.25em] font-medium">Explore Ecosystem</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
