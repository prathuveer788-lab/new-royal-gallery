import Image from "next/image";
import Link from "next/link";

const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNkZGRkZGQiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

export default function DiningPage() {
  return (
    <div className="bg-white">
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Image src="/images/colorful-vibrant-indian-landscape.jpg" alt="Dining" fill priority placeholder="blur" blurDataURL={blurDataURL} className="object-cover" />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pt-32 sm:pt-40 pb-16 sm:pb-24">
          <span className="text-amber-300 text-[9px] sm:text-[10px] uppercase tracking-[0.35em] font-semibold font-sans">The Royal Gallerys</span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-white leading-[0.95] mt-4 mb-6 tracking-tight">Dining</h1>
          <p className="text-neutral-300 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-xl">
            Restaurants, chefs, culinary culture, wine, spirits, coffee and tea — the world of fine dining and gastronomic heritage.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {[
              { tag: "Culinary Heritage", title: "The Royal Kitchens of India: Recipes Lost and Found", desc: "Inside the palace kitchens where centuries-old recipes are being documented, preserved and reimagined — from the spice-laden biryanis of Hyderabad to the subtle vegetarian feasts of Udaipur.", readTime: "16 min read" },
              { tag: "Chefs", title: "The New Guard: Indian Chefs Redefining Global Fine Dining", desc: "A generation of Indian chefs is earning Michelin stars, opening restaurants in the world&apos;s culinary capitals, and bringing the complexity of Indian gastronomy to an international audience.", readTime: "14 min read" },
              { tag: "Wine & Spirits", title: "The Rise of Indian Single Malt", desc: "How Indian whiskies went from obscurity to beating Scottish distillers at their own game — the story of the subcontinent&apos;s most surprising luxury export.", readTime: "12 min read" },
              { tag: "Tea", title: "Darjeeling, Assam, Nilgiri: The Terroir of Indian Tea", desc: "The estates, the seasons, the craft — understanding India&apos;s three great tea regions and the extraordinary diversity of their production.", readTime: "10 min read" },
              { tag: "Restaurants", title: "Palace Dining: The World&apos;s Most Spectacular Restaurant Settings", desc: "From the Durbar Hall at Fateh Prakash to the rooftop of Rambagh Palace — dining experiences where the setting rivals the cuisine.", readTime: "13 min read" },
            ].map((story) => (
              <article key={story.title} className="group border-b border-neutral-100 pb-10 last:border-0">
                <span className="text-[8px] uppercase tracking-[0.25em] text-amber-700 font-bold font-sans">{story.tag}</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-neutral-900 mt-2 mb-3 leading-tight group-hover:text-amber-800 transition-colors">{story.title}</h2>
                <p className="text-neutral-500 text-sm sm:text-base font-light leading-relaxed max-w-2xl mb-4">{story.desc}</p>
                <span className="text-xs text-neutral-400 font-light">{story.readTime}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-6 sm:px-8 md:px-12 lg:px-16 bg-neutral-900 text-white text-center">
        <div className="max-w-xl mx-auto">
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-400 font-bold font-sans">The Dispatch</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mt-3 mb-4 tracking-tight">The Table</h2>
          <p className="text-neutral-400 text-sm font-light mb-8">Restaurants, chefs, wine, spirits and culinary culture — the finest dining stories.</p>
          <Link href="/membership" className="inline-block px-10 py-4 bg-white text-neutral-900 hover:bg-neutral-100 transition text-xs uppercase tracking-[0.25em] font-semibold font-sans">Subscribe</Link>
        </div>
      </section>
    </div>
  );
}
