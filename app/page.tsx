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
    </div>
  );
}