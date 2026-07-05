import Image from "next/image";
import Link from "next/link";

const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNkZGRkZGQiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

const houses = [
  {
    num: "01", title: "Royal Gallery Media", subtitle: "Stories That Carry Heritage to the World",
    desc: "The flagship media house producing the quarterly magazine, original documentaries, the Royal Conversations podcast, and global editorial storytelling — reaching millions across print, digital, film and audio.",
    services: ["Quarterly Magazine", "Documentaries", "Podcast", "Films", "Interviews", "Research Reports", "Digital Features", "Newsletter"],
    img: "/images/colorful-vibrant-indian-landscape.jpg",
  },
  {
    num: "02", title: "Royal Gallery Experiences", subtitle: "Heritage You Can Live",
    desc: "Curating intimate heritage encounters — palace dinners with royal families, private journeys, cultural immersions and annual heritage summits where heritage is not observed but lived.",
    services: ["Palace Dinners", "Heritage Tours", "Royal Conversations", "Heritage Summits", "Luxury Retreats", "Archive Access", "Collectors Circles"],
    img: "/images/udaipur-city-view-from-hotel-balcony-rajasthan-india.jpg",
  },
  {
    num: "03", title: "Royal Gallery AI", subtitle: "Preserving Memory Through Technology",
    desc: "Building the world's most advanced heritage AI — digital preservation, interactive archives, AI heritage portraits, digital twins and multilingual access systems using ethical artificial intelligence.",
    services: ["AI Heritage Portraits", "Interactive Archives", "Digital Twins", "Museum AI", "Multilingual Access", "Digital Preservation", "Historical Reconstruction"],
    img: "/images/hallway-arches-with-dramatic-light-shadows.jpg",
  },
  {
    num: "04", title: "Royal Gallery Research", subtitle: "Documenting Cultural Memory",
    desc: "Archival documentation, oral histories, genealogical research and cultural intelligence — working with royal families, heritage institutions and scholars to document cultural knowledge before it is lost.",
    services: ["Archival Documentation", "Oral Histories", "Family Records", "Genealogical Research", "Cultural Intelligence", "Provenance Verification", "Scholarly Publishing"],
    img: "/images/beautiful-shot-lodhi-garden-delhi-india-cloudy-sky.jpg",
  },
  {
    num: "05", title: "Royal Gallery Institute", subtitle: "Educating the Custodians of Tomorrow",
    desc: "Masterclasses, heritage leadership programs, public lectures and academic partnerships — creating the next generation of heritage custodians, scholars and cultural leaders.",
    services: ["Masterclasses", "Leadership Programs", "Public Lectures", "Academic Partnerships", "Youth Initiatives", "Certification", "Fellowships"],
    img: "/images/architectural-marvel-with-ornate-columns-arches.jpg",
  },
];

export default function EcosystemPage() {
  return (
    <div className="bg-white">
      <section className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16 bg-neutral-900 text-white">
        <div className="max-w-4xl">
          <span className="text-amber-400 text-[9px] sm:text-[10px] uppercase tracking-[0.35em] font-semibold">Our Ecosystem</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mt-4 mb-6 leading-[0.95] tracking-tight">Five Houses,<br />One Heritage</h1>
          <p className="text-neutral-400 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl">Each division preserves heritage through a different craft — together they form a complete system for cultural memory.</p>
        </div>
      </section>

      <div className="space-y-0">
        {houses.map((house, i) => (
          <section key={house.num} className={`py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16 ${i % 2 === 1 ? 'bg-[#faf8f5]' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto">
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                <div className={`${i % 2 === 1 ? 'lg:col-start-2' : ''} lg:col-span-7 space-y-5 sm:space-y-6`}>
                  <span className="text-5xl sm:text-6xl md:text-7xl font-serif text-amber-300">0{house.num}</span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-neutral-900 leading-tight tracking-tight">{house.title}</h2>
                  <p className="text-amber-700 text-sm sm:text-base font-light tracking-wide">{house.subtitle}</p>
                  <p className="text-neutral-500 font-light text-sm sm:text-base leading-relaxed max-w-xl">{house.desc}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {house.services.map((s) => (<span key={s} className="text-[9px] sm:text-[10px] bg-white border border-neutral-200 text-neutral-500 px-3 py-1.5 font-light">{s}</span>))}
                  </div>
                </div>
                <div className={`${i % 2 === 1 ? 'lg:col-start-1' : ''} lg:col-span-5 relative aspect-[3/4] overflow-hidden`}>
                  <Image src={house.img} alt={house.title} fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:1024px)100vw,42vw" className="object-cover" />
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16 text-center bg-[#faf8f5]">
        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-700 font-bold">Partnership</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 mt-4 mb-6 tracking-tight">Collaborate Across the Ecosystem</h2>
        <p className="text-neutral-500 text-sm sm:text-base font-light max-w-xl mx-auto mb-10">Partner with one house or across the entire ecosystem.</p>
        <Link href="/membership" className="inline-block px-10 py-4 bg-neutral-900 text-white hover:bg-neutral-800 transition text-xs uppercase tracking-[0.25em] font-semibold">Become a Partner</Link>
      </section>
    </div>
  );
}
