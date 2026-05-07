import Image from "next/image";

export default function HeritagePage() {
  return (
    <div className="bg-white">
      <div className="px-4 sm:px-6 md:px-10 py-8 sm:py-12 md:py-20 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16 md:mb-20 pb-8 sm:pb-12 border-b border-neutral-200">
          <p className="text-amber-600 font-semibold tracking-widest text-[8px] sm:text-[9px] md:text-[10px] uppercase mb-3">Editorial Section</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif mb-4">Heritage &amp; Royalty</h1>
          <p className="text-neutral-600 max-w-3xl text-sm sm:text-base md:text-lg font-light leading-relaxed">
            Explore the architectural legacy and cultural significance of India's most revered heritage sites. From the majestic palaces of Rajasthan to the gardens of Mughal emperors, we document the stories embedded in stone and history.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-20 items-center">
          <div className="order-2 lg:order-1 aspect-[3/4] md:aspect-[4/5] bg-neutral-200 overflow-hidden rounded-lg shadow-lg relative">
            <Image src="/images/badi-mahal-garden-palace-city-palace-udaipur-rajasthan-india.jpg" alt="Heritage" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className="order-1 lg:order-2 space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-4">The Palaces of Udaipur</h2>
              <p className="text-neutral-600 font-light text-base sm:text-lg leading-relaxed">
                Udaipur's architectural gems represent the pinnacle of Rajasthani heritage. The City Palace, with its intricate jali work and panoramic views of Lake Pichola, stands as a testament to royal craftsmanship. Badi Mahal, the garden palace, embodies the fusion of Mughal and Rajasthani architectural styles, with each courtyard and chamber telling stories of centuries past.
              </p>
            </div>
            <ul className="space-y-4">
              <li className="flex gap-4 items-start">
                <span className="text-amber-600 font-bold text-lg">·</span>
                <div>
                  <h4 className="font-serif text-lg sm:text-xl mb-1">Architectural Excellence</h4>
                  <p className="text-neutral-600 text-sm font-light">Detailed craftsmanship in every jali and arch</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-amber-600 font-bold text-lg">·</span>
                <div>
                  <h4 className="font-serif text-lg sm:text-xl mb-1">Cultural Narrative</h4>
                  <p className="text-neutral-600 text-sm font-light">Centuries of royal patronage and tradition</p>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <span className="text-amber-600 font-bold text-lg">·</span>
                <div>
                  <h4 className="font-serif text-lg sm:text-xl mb-1">Contemporary Relevance</h4>
                  <p className="text-neutral-600 text-sm font-light">Preserved heritage in a modern context</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}