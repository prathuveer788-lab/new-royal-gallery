import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Ecosystem — Five Houses, One Heritage | The Royal Gallerys",
  description:
    "Explore the divisions of The Royal Gallerys: Media, Experiences, AI, Research, and Institute — preserving cultural memory through distinct disciplines.",
  alternates: { canonical: "https://theroyalgallerys.com/ecosystem" },
  openGraph: {
    title: "The Ecosystem — Five Houses, One Heritage | The Royal Gallerys",
    description:
      "Explore the divisions of The Royal Gallerys: Media, Experiences, AI, Research, and Institute — preserving cultural memory through distinct disciplines.",
    url: "https://theroyalgallerys.com/ecosystem",
    type: "website",
    siteName: "The Royal Gallerys",
    images: [
      {
        url: "https://theroyalgallerys.com/images/hero/jaipur-city-palace-grand-facade.jpg",
        width: 1200,
        height: 630,
        alt: "The Royal Gallerys Ecosystem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@theroyalgallerys",
    creator: "@theroyalgallerys",
    title: "The Ecosystem — Five Houses, One Heritage | The Royal Gallerys",
    description:
      "Explore the divisions of The Royal Gallerys: Media, Experiences, AI, Research, and Institute.",
    images: ["https://theroyalgallerys.com/images/hero/jaipur-city-palace-grand-facade.jpg"],
  },
};

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

const houses = [
  {
    num: "01", title: "The Royal Gallerys Media", subtitle: "Stories That Carry Heritage to the World",
    desc: "The flagship media house producing the quarterly magazine, original documentaries, the Royal Conversations podcast, and global editorial storytelling — reaching millions across print, digital, film and audio.",
    services: ["Quarterly Magazine", "Documentaries", "Podcast", "Films", "Interviews", "Research Reports", "Digital Features", "Newsletter"],
    img: "/images/hero/jaipur-city-palace-grand-facade.jpg",
  },
  {
    num: "02", title: "The Royal Gallerys Experiences", subtitle: "Heritage You Can Live",
    desc: "Curating intimate heritage encounters — palace dinners with royal families, private journeys, cultural immersions and annual heritage summits where heritage is not observed but lived.",
    services: ["Palace Dinners", "Heritage Tours", "Royal Conversations", "Heritage Summits", "Luxury Retreats", "Archive Access", "Collectors Circles"],
    img: "/images/badi-mahal-garden-palace-city-palace-udaipur-rajasthan-india.jpg",
  },
  {
    num: "03", title: "The Royal Gallerys AI", subtitle: "Preserving Memory Through Technology",
    desc: "Building the world's most advanced heritage AI — digital preservation, interactive archives, AI heritage portraits, digital twins and multilingual access systems using ethical artificial intelligence.",
    services: ["AI Heritage Portraits", "Interactive Archives", "Digital Twins", "Museum AI", "Multilingual Access", "Digital Preservation", "Historical Reconstruction"],
    img: "/images/hallway-arches-with-dramatic-light-shadows.jpg",
  },
  {
    num: "04", title: "The Royal Gallerys Research", subtitle: "Documenting Cultural Memory",
    desc: "Archival documentation, oral histories, genealogical research and cultural intelligence — working with royal families, heritage institutions and scholars to document cultural knowledge before it is lost.",
    services: ["Archival Documentation", "Oral Histories", "Family Records", "Genealogical Research", "Cultural Intelligence", "Provenance Verification", "Scholarly Publishing"],
    img: "/images/design/varanasi-silk-weaving-traditional-loom.jpg",
  },
  {
    num: "05", title: "The Royal Gallerys Institute", subtitle: "Educating the Custodians of Tomorrow",
    desc: "Masterclasses, heritage leadership programs, public lectures and academic partnerships — creating the next generation of heritage custodians, scholars and cultural leaders.",
    services: ["Masterclasses", "Leadership Programs", "Public Lectures", "Academic Partnerships", "Youth Initiatives", "Certification", "Fellowships"],
    img: "/images/architectural-marvel-with-ornate-columns-arches.jpg",
  },
];

export default function EcosystemPage() {
  return (
    <div style={{ background: C.ivory }}>
      <section className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.obsidian }}>
        <div className="max-w-4xl">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.champagne }}>Our Ecosystem</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mt-4 mb-6 leading-[0.95] tracking-tight" style={{ color: C.ivory, fontWeight: 400 }}>Five Houses,<br />One Heritage</h1>
          <p className="font-sans font-normal text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl" style={{ color: C.textStone }}>Each division preserves heritage through a different craft — together they form a complete system for cultural memory.</p>
        </div>
      </section>

      <div className="space-y-0">
        {houses.map((house, i) => (
          <section key={house.num} className={`py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16`} style={{ background: i % 2 === 1 ? C.cream : C.ivory }}>
            <div className="max-w-7xl mx-auto">
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                <div className={`${i % 2 === 1 ? 'lg:col-start-2' : ''} lg:col-span-7 space-y-5 sm:space-y-6`}>
                  <span className="text-5xl sm:text-6xl md:text-7xl font-serif" style={{ color: C.champagne, fontWeight: 400 }}>0{house.num}</span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-tight tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>{house.title}</h2>
                  <p className="text-sm sm:text-base font-sans font-normal leading-relaxed" style={{ color: C.bronze }}>{house.subtitle}</p>
                  <p className="font-sans font-normal text-sm sm:text-base leading-relaxed max-w-xl" style={{ color: C.textStone }}>{house.desc}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {house.services.map((s) => (<span key={s} className="text-[9px] sm:text-[10px] px-3 py-1.5 font-sans font-normal" style={{ background: C.ivory, border: "1px solid rgba(138,115,82,0.35)", color: C.textStone }}>{s}</span>))}
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

      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16 text-center" style={{ background: C.cream }}>
        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.bronze }}>Partnership</span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mt-4 mb-6 tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>Collaborate Across the Ecosystem</h2>
        <p className="font-sans font-normal text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-10" style={{ color: C.textStone }}>Partner with one house or across the entire ecosystem.</p>
        <Link href="/advertise" className="inline-block px-10 py-4 transition text-xs uppercase tracking-[0.22em] font-medium font-sans" style={{ border: `1px solid ${C.bronze}`, color: C.bronze }}>Become a Partner</Link>
      </section>
    </div>
  );
}
