import Link from 'next/link';

export default function HomePage() {
  const visualChronicles = [
    { title: "The Imperial Gate", category: "Heritage", img: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=800" },
    { title: "Ancient Textiles", category: "Culture", img: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=800" },
    { title: "The Desert Palace", category: "Travel", img: "https://images.unsplash.com/photo-1590050752117-23a9d7f280bd?q=80&w=800" }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
          style={{ 
            backgroundImage: `url('/images/vecteezy_jaipur-city-palace-in-jaipur-city_3153081.jpg')` 
          }}
        >
          {/* Dark Overlay to make text readable */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-8xl font-serif mb-4">The Royals Gallery</h1>
          <p className="max-w-xl mx-auto italic opacity-90 text-lg mb-8 font-light">A chronicle of royal heritage and timeless elegance</p>
          <Link href="/journal" className="border border-white px-8 py-3 uppercase tracking-widest text-xs hover:bg-white hover:text-black transition">
            Explore the Journal
          </Link>
        </div>
      </section>

      {/* Visual Chronicles Section */}
      <section className="py-20 px-6 md:px-10 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="uppercase text-[10px] tracking-[0.4em] text-amber-600 block mb-2">Visual Chronicles</span>
            <h2 className="text-4xl md:text-5xl font-serif italic">Latest Stories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visualChronicles.map((item, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="aspect-[4/5] overflow-hidden mb-4 bg-neutral-100">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-neutral-400">{item.category}</span>
                <h3 className="text-2xl font-serif mt-1 group-hover:text-amber-800 transition-colors">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Ethos Section */}
      <section className="py-24 bg-[#fcfcfc] border-b border-neutral-100">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-sm uppercase tracking-[0.5em] text-amber-600 mb-8">Our Philosophy</h2>
          <p className="text-2xl md:text-4xl font-serif leading-relaxed text-neutral-800">
            "Preserving the grandeur of yesteryears through a modern lens, we curate moments that define the intersection of <span className="italic text-amber-700">royalty and reality</span>."
          </p>
          <div className="mt-10 w-12 h-[1px] bg-amber-600 mx-auto"></div>
        </div>
      </section>

      {/* Featured Exhibit */}
      <section className="py-20">
        <div className="max-w-full mx-auto px-4 md:px-10">
          <div className="flex flex-col md:flex-row items-center gap-12 bg-neutral-50 p-8 md:p-16">
            <div className="w-full md:w-1/2 overflow-hidden">
              <img 
                src="/images/vecteezy_jaipur-city-palace-in-jaipur-city_3153081.jpg" 
                alt="Featured" 
                className="w-full h-[500px] object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <span className="text-amber-600 font-bold tracking-widest text-[10px] uppercase">Summer Collection 2026</span>
              <h2 className="text-5xl font-serif">The Amber Fort Chronicles</h2>
              <p className="text-neutral-600 leading-relaxed font-light">
                Experience the intricate craftsmanship of Rajasthan's most iconic landmark. Our exclusive 
                photo-essay takes you behind the closed doors of the royal suites.
              </p>
              <button className="text-black border-b border-black pb-1 hover:text-amber-700 hover:border-amber-700 transition uppercase text-xs tracking-tighter font-bold">
                Read the full story
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}