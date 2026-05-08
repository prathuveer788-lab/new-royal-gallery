export default function JournalPage() {
  return (
    <div className="bg-white">
      <div className="bg-white py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="border-b border-neutral-200 pb-8 sm:pb-12 mb-12 sm:mb-16 md:mb-20">
            <p className="text-amber-600 font-semibold tracking-widest text-[8px] sm:text-[9px] md:text-[10px] uppercase mb-3">Online Editorial</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif mb-4">The Journal</h1>
            <p className="text-neutral-700 max-w-2xl text-sm sm:text-base font-light leading-relaxed">
              In-depth editorial features and narrative photography exploring India's heritage, architecture, culture, and contemporary narratives. Curated stories from our editorial team.
            </p>
          </div>

          <div className="space-y-16 sm:space-y-20 md:space-y-28">
            {[
              {
                title: "The Golden Thread: Royal Patronage & Artisan Heritage",
                summary: "A comprehensive exploration of how royal courts throughout Indian history have supported and elevated artisanal crafts. This feature documents the symbiotic relationship between patronage and creativity, tracing heritage traditions from their origins to contemporary practice. Through interviews with master artisans and archival photography, we reveal the narratives that define India's artistic legacy.",
                date: "May 6, 2026",
                readTime: "15 min read",
                category: "Editorial Photography",
              },
              {
                title: "Courtly Splendor: Palaces, Processions, and Patronage",
                summary: "An evocative journey through the ceremonial rituals and architectural spectacles that shaped royal identity across South Asia. We trace the evolution of palace culture, from gilded throne rooms to procession routes, and consider how these enduring traditions continue to inspire contemporary design and storytelling.",
                date: "May 10, 2026",
                readTime: "12 min read",
                category: "Historical Narrative",
              },
            ].map((story) => (
              <article key={story.title} className="group pb-12 sm:pb-16 md:pb-20 border-b border-neutral-100 last:border-b-0 last:pb-0">
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="text-amber-600 font-semibold text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-widest">Featured Story</span>
                    <span className="text-neutral-400 text-[7px] sm:text-[8px]">•</span>
                    <span className="text-neutral-600 text-[7px] sm:text-[8px] font-light">{story.date}</span>
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-4 group-hover:text-amber-800 transition-colors leading-tight">
                      {story.title}
                    </h2>
                    <p className="text-neutral-700 font-light text-base sm:text-lg leading-relaxed mb-6">
                      {story.summary}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 items-center pt-4">
                    <span className="text-xs sm:text-sm text-neutral-500 font-light">{story.readTime}</span>
                    <span className="text-neutral-300">•</span>
                    <span className="text-xs sm:text-sm text-neutral-500 font-light">{story.category}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}