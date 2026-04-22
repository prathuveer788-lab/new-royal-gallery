export default function CulturePage() {
  return (
    <div className="px-6 md:px-10 py-12 md:py-20 max-w-7xl mx-auto">
      <div className="text-center mb-10 md:mb-16">
        <span className="uppercase text-[10px] tracking-[0.3em] text-amber-600">Essence</span>
        <h1 className="text-4xl md:text-6xl font-serif mt-2 italic">Art & Culture</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        {/* Mobile: 1st | Desktop: Spans 2 columns */}
        <div className="lg:col-span-2 aspect-[4/3] md:aspect-video bg-neutral-200 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=1200" className="w-full h-full object-cover" alt="Culture" />
        </div>
        
        <div className="flex flex-col justify-center text-center lg:text-left">
          <h2 className="text-2xl md:text-3xl font-serif mb-4">The Revival of Hand-Block Printing</h2>
          <p className="text-neutral-600 font-light leading-relaxed mb-6 text-sm md:text-base">
            Exploring the rhythmic precision of artisans who breathe life into patterns, preserving a 400-year-old legacy.
          </p>
          <a href="#" className="text-xs uppercase tracking-[0.2em] font-bold border-b border-black w-fit pb-1 mx-auto lg:mx-0">Read Story</a>
        </div>
      </div>
    </div>
  );
}