import Link from "next/link";

export default function BalmoralFooter() {
  const categories = [
    { label: "UK Edition", href: "/uk" },
    { label: "Royalty", href: "/royalty" },
    { label: "Travel & Hotels", href: "/travel" },
    { label: "Style", href: "/style" },
    { label: "Design & Interiors", href: "/design" },
    { label: "Culture & Arts", href: "/culture" },
    { label: "Society", href: "/society" },
    { label: "Jewellery", href: "/jewellery" },
    { label: "Watches", href: "/watches" },
    { label: "Weddings", href: "/weddings" },
    { label: "Motoring", href: "/motoring" },
  ];

  return (
    <footer
      className="text-[#FAF8F4] pt-16 sm:pt-20 pb-12 px-6 sm:px-8 lg:px-12 mt-20"
      style={{ backgroundColor: "#24424F" }}
      aria-label="The Royal Gallerys Editorial Footer"
    >
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 pb-14 border-b border-[#FAF8F4]/15">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="inline-block group" aria-label="The Royal Gallerys Home">
              <span
                className="block text-[9px] uppercase tracking-[0.38em] text-[#FAF8F4]/60 font-light leading-none mb-1 font-sans"
              >
                The
              </span>
              <span
                className="block text-2xl sm:text-3xl tracking-[0.1em] uppercase font-normal leading-none font-serif text-[#FAF8F4]"
              >
                Royal Gallerys
              </span>
            </Link>
            <p className="text-sm font-serif italic text-[#FAF8F4]/80 max-w-sm leading-relaxed">
              The International Magazine of Heritage & Luxury
            </p>
            <p className="text-xs text-[#FAF8F4]/60 leading-relaxed max-w-md font-sans">
              Documenting the world’s most venerable palace hotels, royal houses, high craftsmanship, and the living memory of architectural landmarks.
            </p>
          </div>

          {/* Categories Col */}
          <div className="md:col-span-4">
            <h4 className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#FAF8F4]/70 mb-4 font-sans">
              Editorial Sections
            </h4>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs font-sans text-[#FAF8F4]/80">
              {categories.map((c) => (
                <Link
                  key={c.label}
                  href={c.href}
                  className="hover:text-[#FAF8F4] hover:underline underline-offset-4 transition-colors"
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect Col */}
          <div className="md:col-span-3 space-y-3 font-sans text-xs text-[#FAF8F4]/80">
            <h4 className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#FAF8F4]/70 mb-4">
              Institute & Inquiries
            </h4>
            <div className="flex flex-col space-y-2">
              <Link href="/ecosystem" className="hover:text-[#FAF8F4] transition-colors">The Five Houses</Link>
              <Link href="/membership" className="hover:text-[#FAF8F4] transition-colors">Fellowship & Membership</Link>
              <Link href="/advertise" className="hover:text-[#FAF8F4] transition-colors">Partnerships & Advertising</Link>
              <a href="mailto:hey.theroyalgallerys@gmail.com" className="hover:text-[#FAF8F4] transition-colors">
                hey.theroyalgallerys@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FAF8F4]/60 font-sans gap-4">
          <p>© 2026 The Royal Gallerys. All editorial rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="italic font-serif">Preserving Legacy · Amplifying Heritage</span>
            <span>Edinburgh & Global Bureaux</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
