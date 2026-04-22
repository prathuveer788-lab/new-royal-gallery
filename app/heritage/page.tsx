export default function HeritagePage() {
  return (
    <div className="px-6 md:px-10 py-12 md:py-20 max-w-7xl mx-auto">
      {/* Grid: 1 column on mobile, 2 columns on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-20 items-center">
        <div className="aspect-[3/4] md:aspect-[4/5] bg-neutral-200 overflow-hidden order-1 lg:order-1">
          <img src="https://images.unsplash.com/photo-1590050752117-23a9d7f280bd?q=80&w=1000" className="w-full h-full object-cover" />
        </div>
        <div className="order-2 lg:order-2">
          <h1 className="text-3xl md:text-5xl font-serif mb-6 italic">The Forgotten Palaces</h1>
          <p className="text-neutral-600 font-light text-base md:text-lg leading-relaxed">
            Content stays readable here because we reduced the text size and spacing for mobile devices.
          </p>
        </div>
      </div>
    </div>
  );
}