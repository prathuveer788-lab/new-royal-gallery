export default function JournalPage() {
  return (
    <div className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="border-b border-neutral-100 pb-10 mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-serif mb-4">The Journal</h1>
          <p className="text-neutral-500 italic text-sm md:text-base">Curated stories of heritage.</p>
        </div>

        <div className="space-y-16 md:space-y-24">
          {[1, 2].map((i) => (
            <article key={i} className="group">
              <div className="flex items-center gap-3 text-[9px] md:text-[10px] uppercase tracking-widest text-amber-700 mb-3">
                <span>April 21, 2026</span>
                <span className="h-px w-6 bg-amber-200"></span>
                <span>Editorial</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-serif mb-4 group-hover:text-amber-800 transition">
                The Golden Thread: Royal Patronage
              </h2>
              <p className="text-neutral-600 font-light text-sm md:text-lg leading-relaxed mb-6">
                Exploring the rhythmic precision of artisans who breathe life into patterns...
              </p>
              <button className="text-[10px] md:text-xs uppercase font-bold tracking-widest border-b border-black pb-1">
                Read Story
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}