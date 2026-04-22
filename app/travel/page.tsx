export default function TravelPage() {
  return (
    <div className="px-6 md:px-10 py-12 md:py-20 bg-[#f4f1ea]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-7xl font-serif mb-10 md:mb-16 text-center lg:text-left leading-tight">
          Wanderlust <br className="hidden md:block"/><span className="italic md:pl-20">& Luxury</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-10">
          <div className="space-y-4">
            <div className="aspect-square bg-neutral-300 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000" className="w-full h-full object-cover" alt="Travel" />
            </div>
            <h3 className="text-xl md:text-2xl font-serif italic">The Lake Palaces of Udaipur</h3>
          </div>
          
          {/* We only apply the top margin (mt-20) on medium screens and up */}
          <div className="md:mt-20 space-y-4">
            <div className="aspect-[4/5] bg-neutral-300 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000" className="w-full h-full object-cover" alt="Travel" />
            </div>
            <h3 className="text-xl md:text-2xl font-serif italic">Secret Retreats in the Himalayas</h3>
          </div>
        </div>
      </div>
    </div>
  );
}