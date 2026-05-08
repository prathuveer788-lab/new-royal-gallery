import Image from "next/image";

const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNkZGRkZGQiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

const photos = [
  'architectural-marvel-with-ornate-columns-arches.jpg',
  'badi-mahal-garden-palace-city-palace-udaipur-rajasthan-india.jpg',
  'beautiful-shot-lodhi-garden-delhi-india-cloudy-sky.jpg',
  'bicycle-parking-indian-building-islamic-style.jpg',
  'colorful-vibrant-indian-landscape(1).jpg',
  'colorful-vibrant-indian-landscape.jpg',
  'hallway-arches-with-dramatic-light-shadows.jpg',
  'hawa-mahal-palace-jaipur-india.jpg',
  'indian-city-buildings-scene(1).jpg',
  'indian-city-buildings-scene.jpg',
  'mehrangarh-fort.jpg',
  'udaipur-city-view-from-hotel-balcony-rajasthan-india(1).jpg',
  'udaipur-city-view-from-hotel-balcony-rajasthan-india.jpg',
  'vecteezy_jaipur-city-palace-in-jaipur-city_3153081.jpg',
  'vertical-shot-retro-beige-car-front.jpg',
  'view-mexican-architecture-culture.jpg',
  'yellow-drink-with-lemon-cinnamon.jpg',
];

function cleanAltText(filename: string) {
  return filename
    .replace(/\.(jpg|jpeg|png|webp|gif)$/i, '')
    .replace(/[-_()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function GalleryPage() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <header className="text-center py-12 sm:py-16 md:py-20 border-b border-neutral-100">
          <p className="uppercase text-xs sm:text-sm tracking-[0.3em] text-amber-600 font-light mb-3">Visual Collection</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif mb-4">Gallery</h1>
          <p className="text-neutral-700 max-w-2xl mx-auto text-sm sm:text-base font-light">
            A comprehensive visual archive of India's architectural heritage, royal palaces, cultural landmarks, and contemporary spaces that define editorial excellence.
          </p>
        </header>

        <div className="py-12 sm:py-16 md:py-20">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 sm:gap-8 space-y-6 sm:space-y-8">
            {photos.map((filename, index) => (
              <div key={index} className="break-inside-avoid overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-500 group">
                <div className="relative overflow-hidden bg-neutral-100 aspect-[4/5]">
                  <Image
                    src={`/images/${filename}`}
                    alt={cleanAltText(filename)}
                    fill
                    placeholder="blur"
                    blurDataURL={blurDataURL}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
