export default function GalleryPage() {
  const photos = [
    { url: 'https://picsum.photos/800/1000?v=1' },
    { url: 'https://picsum.photos/800/1200?v=2' },
    { url: 'https://picsum.photos/800/900?v=3' },
    { url: 'https://picsum.photos/800/1100?v=4' },
  ];

  return (
    <div className="bg-[#fcfaf7] py-16 md:py-24 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12 md:mb-20">
          <h1 className="text-5xl md:text-7xl font-serif italic mb-4">Gallery</h1>
          <p className="uppercase text-[9px] md:text-[10px] tracking-[0.4em] text-neutral-500">Visual Anthology</p>
        </header>

        {/* 1 column on mobile, 2 on tablet, 3 on desktop */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-8 space-y-4 md:space-y-8">
          {photos.map((photo, index) => (
            <div key={index} className="break-inside-avoid overflow-hidden shadow-sm">
              <img src={photo.url} className="w-full h-auto hover:scale-105 transition-transform duration-700" alt="Gallery" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}