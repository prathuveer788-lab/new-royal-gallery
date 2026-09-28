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

const galleryPhotos = [
  { src: 'hero/jaipur-city-palace-grand-facade.jpg', alt: 'Jaipur City Palace Chandra Mahal Facade' },
  { src: 'mehrangarh-fort.jpg', alt: 'Mehrangarh Fort Jodhpur' },
  { src: 'hawa-mahal-palace-jaipur-india.jpg', alt: 'Hawa Mahal Jaipur' },
  { src: 'badi-mahal-garden-palace-city-palace-udaipur-rajasthan-india.jpg', alt: 'Badi Mahal Udaipur' },
  { src: 'udaipur-city-view-from-hotel-balcony-rajasthan-india.jpg', alt: 'Udaipur City and Lake Pichola' },
  { src: 'architectural-marvel-with-ornate-columns-arches.jpg', alt: 'Ornate Columns and Arches' },
  { src: 'hallway-arches-with-dramatic-light-shadows.jpg', alt: 'Heritage Arches' },
  { src: 'experiences/01-umaid-bhawan-palace-jodhpur/01-hero.webp', alt: 'Umaid Bhawan Palace Jodhpur' },
  { src: 'experiences/03-taj-lake-palace-udaipur/01-hero.webp', alt: 'Taj Lake Palace Udaipur' },
  { src: 'design/varanasi-silk-weaving-traditional-loom.jpg', alt: 'Varanasi Master Silk Weaver' },
  { src: 'motoring/maharaja-rolls-royce-vintage-collection.jpg', alt: "Maharaja's Vintage Rolls-Royce" },
  { src: 'dining/rajasthani-royal-thali-banquet.jpg', alt: 'Traditional Rajasthani Royal Thali' },
];

const archiveFeatures = [
  "AI Heritage Portraits", "Interactive Archives", "Digital Twins",
  "Museum Experiences", "Multilingual Access", "Long-Term Preservation",
];


export default function GalleryPage() {
  return (
    <div style={{ background: C.ivory }}>
      {/* ══════════ HERO ══════════ */}
      <section className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.obsidian }}>
        <div className="max-w-4xl">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.champagne }}>Visual Archive &amp; AI</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif mt-4 mb-6 leading-[0.95] tracking-tight" style={{ color: C.ivory, fontWeight: 400 }}>
            The Living<br />Archive
          </h1>
          <p className="font-sans font-normal text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl" style={{ color: C.textStone }}>
            A comprehensive visual archive of India&apos;s architectural heritage — and a preview of our AI-powered digital preservation platform that will make heritage accessible for centuries.
          </p>
        </div>
      </section>

      {/* ══════════ LIVING ARCHIVE PROJECT ══════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-16 sm:mb-20">
            <div className="lg:col-span-5 relative aspect-[4/5] overflow-hidden">
              <Image src="/images/hallway-arches-with-dramatic-light-shadows.jpg" alt="Living Archive" fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:1024px)100vw,42vw" className="object-cover" />
            </div>
            <div className="lg:col-span-7 space-y-5 sm:space-y-7">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.bronze }}>The Living Archive Project</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-tight tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>Imagine Speaking with History</h2>
              <p className="font-sans font-normal text-sm sm:text-base leading-relaxed max-w-xl" style={{ color: C.textStone }}>
                Our flagship AI initiative uses ethical artificial intelligence, historical research and digital preservation technologies to create interactive heritage experiences — so future generations can learn directly from the voices and wisdom of the past.
              </p>
              <div className="flex flex-wrap gap-2">
                {archiveFeatures.map((f) => (
                  <span key={f} className="text-[9px] sm:text-[10px] px-3 py-1.5 font-sans font-normal" style={{ background: C.cream, border: "1px solid rgba(138,115,82,0.35)", color: C.textStone }}>{f}</span>
                ))}
              </div>
              <blockquote className="pl-5 italic font-sans font-normal text-sm mt-4" style={{ borderLeft: `2px solid ${C.champagne}`, color: C.textStone }}>
                &ldquo;We are not recreating people. We are preserving knowledge.&rdquo;
              </blockquote>
              <Link href="/heritage-ai" className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.22em] transition font-medium pb-0.5 font-sans" style={{ color: C.bronze, borderBottom: `1px solid ${C.champagne}` }}>Explore Heritage AI →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ PHOTO MASONRY ══════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 lg:px-12" style={{ background: C.cream }}>
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.bronze }}>Visual Archive</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mt-4 tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>A Growing Collection</h2>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-5 space-y-4 sm:space-y-5">
          {galleryPhotos.map((photo, i) => (
            <div key={i} className="break-inside-avoid overflow-hidden group">
              <div className="relative overflow-hidden" style={{ background: C.ivory }}>
                <Image src={`/images/${photo.src}`} alt={photo.alt} width={800} height={1000} placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:640px)100vw,(max-width:1024px)50vw,25vw" className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-1000" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
