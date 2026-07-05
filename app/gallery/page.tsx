import Image from "next/image";
import Link from "next/link";

const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNkZGRkZGQiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

const galleryPhotos = [
  { src: 'vecteezy_jaipur-city-palace-in-jaipur-city_3153081.jpg', alt: 'Jaipur City Palace' },
  { src: 'mehrangarh-fort.jpg', alt: 'Mehrangarh Fort Jodhpur' },
  { src: 'hawa-mahal-palace-jaipur-india.jpg', alt: 'Hawa Mahal Jaipur' },
  { src: 'badi-mahal-garden-palace-city-palace-udaipur-rajasthan-india.jpg', alt: 'Badi Mahal Udaipur' },
  { src: 'udaipur-city-view-from-hotel-balcony-rajasthan-india.jpg', alt: 'Udaipur City View' },
  { src: 'udaipur-city-view-from-hotel-balcony-rajasthan-india(1).jpg', alt: 'Udaipur Lake View' },
  { src: 'architectural-marvel-with-ornate-columns-arches.jpg', alt: 'Ornate Columns and Arches' },
  { src: 'hallway-arches-with-dramatic-light-shadows.jpg', alt: 'Heritage Arches' },
  { src: 'beautiful-shot-lodhi-garden-delhi-india-cloudy-sky.jpg', alt: 'Lodhi Garden Delhi' },
  { src: 'colorful-vibrant-indian-landscape.jpg', alt: 'Vibrant Indian Landscape' },
  { src: 'colorful-vibrant-indian-landscape(1).jpg', alt: 'Colorful Indian Culture' },
  { src: 'indian-city-buildings-scene.jpg', alt: 'Indian City Architecture' },
  { src: 'indian-city-buildings-scene(1).jpg', alt: 'Indian Heritage Buildings' },
];

const archiveFeatures = [
  "AI Heritage Portraits", "Interactive Archives", "Digital Twins",
  "Museum Experiences", "Multilingual Access", "Long-Term Preservation",
];


export default function GalleryPage() {
  return (
    <div className="bg-white">
      {/* ══════════ HERO ══════════ */}
      <section className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16 bg-neutral-900 text-white">
        <div className="max-w-4xl">
          <span className="text-amber-400 text-[9px] sm:text-[10px] uppercase tracking-[0.35em] font-semibold">Visual Archive & AI</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif mt-4 mb-6 leading-[0.95] tracking-tight">
            The Living<br />Archive
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl">
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
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-700 font-bold">The Living Archive Project</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-neutral-900 leading-tight tracking-tight">Imagine Speaking with History</h2>
              <p className="text-neutral-600 font-light text-sm sm:text-base leading-relaxed max-w-xl">
                Our flagship AI initiative uses ethical artificial intelligence, historical research and digital preservation technologies to create interactive heritage experiences — so future generations can learn directly from the voices and wisdom of the past.
              </p>
              <div className="flex flex-wrap gap-2">
                {archiveFeatures.map((f) => (
                  <span key={f} className="text-[9px] sm:text-[10px] bg-[#faf8f5] text-neutral-600 px-3 py-1.5 border border-neutral-200 font-light">{f}</span>
                ))}
              </div>
              <blockquote className="border-l-2 border-amber-400 pl-5 italic text-neutral-400 text-sm mt-4">
                &ldquo;We are not recreating people. We are preserving knowledge.&rdquo;
              </blockquote>
              <Link href="/heritage-ai" className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.25em] text-amber-700 hover:text-amber-900 transition font-semibold border-b border-amber-300 pb-0.5">Explore Heritage AI →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ PHOTO MASONRY ══════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 lg:px-12 bg-[#faf8f5]">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-700 font-bold">Visual Archive</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 mt-4 tracking-tight">A Growing Collection</h2>
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-5 space-y-4 sm:space-y-5">
          {galleryPhotos.map((photo, i) => (
            <div key={i} className="break-inside-avoid overflow-hidden group">
              <div className="relative overflow-hidden bg-neutral-100">
                <Image src={`/images/${photo.src}`} alt={photo.alt} width={800} height={1000} placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:640px)100vw,(max-width:1024px)50vw,25vw" className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-700" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
