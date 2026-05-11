import Image from "next/image";

const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNkZGRkZGQiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

export default function HomePage() {
  const visualChronicles = [
    { title: "The Imperial Gate", category: "Heritage", img: "/images/mehrangarh-fort.jpg" },
    { title: "Ancient Textiles", category: "Culture", img: "/images/colorful-vibrant-indian-landscape.jpg" },
    { title: "The Desert Palace", category: "Travel", img: "/images/udaipur-city-view-from-hotel-balcony-rajasthan-india.jpg" }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen sm:min-h-[80vh] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-1000">
          <Image
            src="/images/vecteezy_jaipur-city-palace-in-jaipur-city_3153081.jpg"
            alt="Jaipur City Palace"
            fill
            priority
            placeholder="blur"
            blurDataURL={blurDataURL}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 py-12 sm:py-20 space-y-3 sm:space-y-4">
          <p className="uppercase text-xs sm:text-sm tracking-[0.3em] text-amber-100 font-light">Heritage Magazine</p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif mb-4 sm:mb-6 leading-tight">The Royal Gallery's</h1>
          <p className="max-w-2xl mx-auto italic opacity-90 text-base sm:text-lg md:text-xl font-light">Curated stories of royal heritage, architectural mastery, and cultural traditions across India and beyond.</p>
        </div>
      </section>

      {/* Visual Chronicles Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14 md:mb-16 pb-8 sm:pb-12 border-b border-neutral-200">
            <span className="uppercase text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] text-amber-600 block mb-3">Featured Stories</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-3 text-neutral-900">In This Issue</h2>
            <p className="text-neutral-700 text-sm sm:text-base max-w-2xl mx-auto font-light">Discover the intersection of heritage and contemporary culture through our curated editorial selections.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {visualChronicles.map((item, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg mb-4 bg-neutral-100 shadow-sm group-hover:shadow-md transition-shadow duration-500">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                    loading="eager"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-widest text-amber-600 font-semibold block">{item.category}</span>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-serif leading-tight text-neutral-900 group-hover:text-amber-800 transition-colors">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-700 mt-2">Explore the narrative</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Editorial Mission */}
      <section className="py-16 sm:py-20 md:py-28 bg-neutral-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 md:px-8">
          <h2 className="text-xs sm:text-sm uppercase tracking-[0.4em] sm:tracking-[0.5em] text-amber-500 mb-6 sm:mb-8 font-light">Editorial Vision</h2>
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif leading-relaxed mb-6 sm:mb-8">
            Preserving the grandeur of yesteryears through a modern editorial lens.
          </p>
          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed font-light">
            We document royal heritage, architectural marvels, and cultural narratives that define India's aristocratic landscape. Each issue presents carefully curated visual essays and in-depth editorial stories from heritage sites, cultural institutions, and timeless destinations.
          </p>
          <div className="mt-8 sm:mt-12 w-12 h-[1px] bg-amber-500 mx-auto"></div>
        </div>
      </section>

      {/* Featured Story */}
      <section className="py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-16 items-center">
            <div className="order-2 md:order-1 w-full overflow-hidden rounded-lg shadow-lg relative h-64 sm:h-80 md:h-[500px]">
              <Image
                src="/images/vecteezy_jaipur-city-palace-in-jaipur-city_3153081.jpg"
                alt="Featured Story"
                fill
                priority
                placeholder="blur"
                blurDataURL={blurDataURL}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2 w-full space-y-6 sm:space-y-8">
              <div>
                <p className="text-amber-600 font-semibold tracking-widest text-[8px] sm:text-[9px] md:text-[10px] uppercase mb-3">Summer Issue 2026</p>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif leading-tight text-neutral-900">The Amber Fort Chronicles</h2>
              </div>
              <p className="text-neutral-700 leading-relaxed font-light text-base sm:text-lg">
                Discover the architectural brilliance and untold stories behind Jaipur's City Palace. In our Summer 2026 editorial feature, we explore the intricate detailing, royal heritage, and contemporary significance of one of India's most iconic structures through exclusive photography and historical narrative.
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-neutral-200">
                <div>
                  <p className="text-xs text-neutral-400">12 min read</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}