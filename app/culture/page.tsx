import Image from "next/image";

const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNkZGRkZGQiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

export default function CulturePage() {
  return (
    <div className="bg-white">
      <div className="px-4 sm:px-6 md:px-10 py-8 sm:py-12 md:py-20 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 sm:mb-16 md:mb-20 pb-8 sm:pb-12 border-b border-neutral-200">
          <p className="text-amber-600 font-semibold tracking-widest text-[8px] sm:text-[9px] md:text-[10px] uppercase mb-3">Editorial Feature</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif mb-4">Art &amp; Culture</h1>
          <p className="text-neutral-700 max-w-3xl text-sm sm:text-base md:text-lg font-light leading-relaxed">
            A deep dive into the traditions, craftsmanship, and contemporary expressions that define India's artistic landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 items-stretch">
          {/* Large Featured Image */}
          <div className="lg:col-span-2 overflow-hidden rounded-lg shadow-lg h-96 sm:h-[500px] relative">
            <Image
              src="/images/colorful-vibrant-indian-landscape(1).jpg"
              alt="Culture"
              fill
              placeholder="blur"
              blurDataURL={blurDataURL}
              loading="eager"
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          
          {/* Content Section */}
          <div className="flex flex-col justify-between space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-4">Living Traditions</h2>
              <p className="text-neutral-700 font-light text-base sm:text-lg leading-relaxed mb-4">
                India's cultural landscape thrives through countless artisans, musicians, and craftspeople dedicated to preserving ancient techniques. From textile dyeing to classical dance, these traditions bridge history and contemporary expression.
              </p>
              <p className="text-neutral-700 font-light text-base sm:text-lg leading-relaxed">
                Our editorial explores these narratives through exclusive interviews and visual documentation.
              </p>
            </div>
            
            <div className="space-y-3 border-t border-neutral-200 pt-6">
              <div className="flex items-center gap-2">
                <span className="text-amber-600 font-semibold">In This Section</span>
              </div>
              <ul className="text-sm text-neutral-700 space-y-2">
                <li>• Hand-block printing traditions</li>
                <li>• Classical arts restoration</li>
                <li>• Contemporary artisan profiles</li>
                <li>• Cultural institutional initiatives</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}