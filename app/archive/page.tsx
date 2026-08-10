import Image from "next/image";
import Link from "next/link";

const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNkZGRkZGQiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

const galleryImages = [
  { src: "/images/heritage-photography.jpg", alt: "Heritage photography", span: "col-span-2 row-span-2", height: "h-full" },
  { src: "/images/ancient-architecture-background.jpg", alt: "Ancient architecture", span: "", height: "aspect-[3/4]" },
  { src: "/images/indian-flag-monument.jpg", alt: "Indian flag monument", span: "col-span-2", height: "aspect-[16/8]" },
  { src: "/images/golden-temple.jpg", alt: "Golden temple", span: "", height: "aspect-[3/4]" },
  { src: "/images/beautiful-night-view-taj-hotel.jpg", alt: "Taj Hotel at night", span: "row-span-2", height: "h-full" },
  { src: "/images/hallway-arches-with-dramatic-light-shadows.jpg", alt: "Hallway arches", span: "", height: "aspect-[3/4]" },
  { src: "/images/ancient-city-landscape.jpg", alt: "Ancient city", span: "", height: "aspect-[3/4]" },
  { src: "/images/indian-architecture-beautiful-monument.jpg", alt: "Indian monument", span: "col-span-2", height: "aspect-[16/8]" },
  { src: "/images/beautiful-shot-lodhi-garden-delhi-india-cloudy-sky.jpg", alt: "Lodhi Garden", span: "", height: "aspect-[4/3]" },
  { src: "/images/colorful-vibrant-indian-landscape.jpg", alt: "Colorful Indian landscape", span: "", height: "aspect-[4/3]" },
  { src: "/images/indian-city-buildings-scene.jpg", alt: "Indian city buildings", span: "", height: "aspect-[3/4]" },
  { src: "/images/indian-city-buildings-scene(1).jpg", alt: "City buildings", span: "", height: "aspect-[3/4]" },
];

const archiveProjects = [
  { title: "The Living Archive", desc: "Our flagship preservation initiative. Over 50,000 photographs, documents, maps and oral histories digitized and catalogued — the largest private repository of Indian heritage materials in the world.", status: "Active — continuously acquiring" },
  { title: "Royal Portrait Series", desc: "A photographic survey of India's remaining royal families — commissioned portraits, candid documentation, and interviews capturing the custodians of a thousand years of tradition at the threshold of modernity.", status: "In progress — 14 families documented" },
  { title: "Lost Monuments Project", desc: "Documentation of heritage sites at risk — detailed photographic surveys, architectural drawings, and oral histories collected before these structures are lost to neglect, development, or climate change.", status: "Phase II — 127 sites surveyed" },
  { title: "Textile & Craft Archive", desc: "Comprehensive documentation of India's textile traditions — weaving patterns, dyeing techniques, embroidery styles — organized by region, community and technique. A resource for scholars, designers and artisans.", status: "Building — 3,200 specimens catalogued" },
];

export default function ArchivePage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Image src="/images/heritage-photography.jpg" alt="Archive" fill priority placeholder="blur" blurDataURL={blurDataURL} className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pt-32 sm:pt-40 pb-16 sm:pb-24">
          <span className="text-amber-300 text-[9px] sm:text-[10px] uppercase tracking-[0.35em] font-semibold font-sans">The Royal Gallerys</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-white leading-[0.95] mt-4 mb-6 tracking-tight">Archive</h1>
          <p className="text-neutral-300 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-lg">
            Historical and modern photography, the Living Archive Project, royal collection documentation, institutional archives and heritage records — preserving what time would erase.
          </p>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-700 font-bold font-sans">The Collection</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 mt-4 tracking-tight">Selected Photographs</h2>
            <p className="text-neutral-500 text-sm font-light max-w-xl mx-auto mt-3">
              A curated selection from the archive — architecture, portraiture, landscape, and documentary photography.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {galleryImages.map((img, i) => (
              <div key={i} className={`relative overflow-hidden group ${img.span} ${img.height}`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Living Archive Project */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-400 font-bold font-sans">Preservation</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mt-4 tracking-tight">The Living Archive Project</h2>
            <p className="text-neutral-400 text-sm sm:text-base font-light max-w-2xl mx-auto mt-4 leading-relaxed">
              Heritage is not what is built in stone — it is what is preserved in memory. THE ROYAL GALLERYS Living Archive is a permanent, publicly accessible repository of photographs, documents, oral histories and cultural records. Built to last for centuries. Open to scholars, families and the public.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
            {archiveProjects.map((proj) => (
              <div key={proj.title} className="border border-white/10 p-6 sm:p-8 hover:border-amber-400/30 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif text-lg sm:text-xl text-amber-400">{proj.title}</h3>
                </div>
                <p className="text-neutral-400 text-sm font-light leading-relaxed mb-4">{proj.desc}</p>
                <span className="text-[10px] uppercase tracking-[0.2em] text-amber-500/70 font-medium font-sans">{proj.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16 text-center bg-[#faf8f5]">
        <div className="max-w-3xl mx-auto">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-700 font-bold font-sans">Contribute to the Archive</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 mt-4 mb-6 tracking-tight">Your Heritage Belongs in the Record</h2>
          <p className="text-neutral-500 text-sm sm:text-base font-light max-w-xl mx-auto mb-10">
            If you hold photographs, documents, letters or oral histories that tell the story of heritage — whether personal, institutional or cultural — we invite you to contribute to the Living Archive.
          </p>
          <Link href="/membership" className="inline-block px-10 py-4 bg-neutral-900 text-white hover:bg-neutral-800 transition text-xs uppercase tracking-[0.25em] font-semibold font-sans">Contribute</Link>
        </div>
      </section>
    </div>
  );
}
