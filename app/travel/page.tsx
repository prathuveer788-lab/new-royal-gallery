import Image from "next/image";

export default function TravelPage() {
  return (
    <div className="bg-white">
      <div className="px-4 sm:px-6 md:px-10 py-8 sm:py-12 md:py-20 bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12 sm:mb-16 md:mb-20 pb-8 sm:pb-12 border-b border-neutral-200">
            <p className="text-amber-600 font-semibold tracking-widest text-[8px] sm:text-[9px] md:text-[10px] uppercase mb-3">Travel Editorial</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif mb-4">Wanderlust &amp; Luxury</h1>
            <p className="text-neutral-600 max-w-3xl text-sm sm:text-base md:text-lg font-light leading-relaxed">
              Journey through India's most distinguished destinations. From palace hotels to heritage retreats, discover the stories behind iconic travel experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 md:gap-16">
            {/* Destination 1 */}
            <div className="space-y-4 sm:space-y-6">
              <div className="aspect-square bg-neutral-300 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-500 relative">
                <Image src="/images/view-mexican-architecture-culture.jpg" alt="Travel Destination" fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-3">Grand Palace Hotels</h3>
                <p className="text-neutral-600 font-light text-sm sm:text-base leading-relaxed">
                  Experience luxury in converted palaces, where centuries of history meet contemporary hospitality. Our guide to India's most prestigious palace hotels and heritage properties.
                </p>
              </div>
            </div>
            
            {/* Destination 2 */}
            <div className="sm:mt-12 lg:mt-20 space-y-4 sm:space-y-6">
              <div className="aspect-[4/5] bg-neutral-300 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-500 relative">
                <Image src="/images/architectural-marvel-with-ornate-columns-arches.jpg" alt="Travel Destination" fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-3">Quiet Journeys</h3>
                <p className="text-neutral-600 font-light text-sm sm:text-base leading-relaxed">
                  Beyond the mainstream: serene destinations and hidden architectural gems. Curated experiences for discerning travelers seeking authentic connection with heritage spaces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}