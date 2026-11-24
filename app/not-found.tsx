import Link from "next/link";
import Image from "next/image";

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNkZGRkZGQiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

const featuredSections = [
  { name: "The Institute", href: "/ecosystem", desc: "Five institutional houses & preservation" },
  { name: "Global Vision", href: "/global-vision", desc: "Heritage, culture and contemporary luxury" },
  { name: "Our Impact", href: "/impact", desc: "Preserving cultural memory & legacy" },
  { name: "The Circle", href: "/membership", desc: "Private membership & archive access" },
  { name: "The Edit · Blogs", href: "/blogs", desc: "Curated essays, profiles & dispatches" },
  { name: "Member Login", href: "/member/login", desc: "Access the Private World" },
];

export default function NotFound() {
  return (
    <main className="min-h-screen relative flex flex-col justify-between bg-[#11110F] text-[#F4F0E7]">
      {/* Background Image with Luxury Tint */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/hero/jaipur-city-palace-grand-facade.jpg"
          alt="The Royal Gallerys Archive Facade"
          fill
          priority
          placeholder="blur"
          blurDataURL={blurDataURL}
          className="object-cover opacity-25"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(17,17,15,0.75) 0%, rgba(17,17,15,0.92) 60%, rgba(17,17,15,0.98) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 md:px-12 pt-36 sm:pt-44 pb-20 flex-1 flex flex-col justify-center">
        {/* Monogram / Tag */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-[1px] bg-[#B8A47A]" />
          <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.3em] text-[#B8A47A]">
            The Royal Gallerys · Folio Notice
          </span>
        </div>

        {/* 404 Heading */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#F4F0E7] leading-[0.95] mb-6">
          Folio Not Found
        </h1>

        <p className="font-serif italic text-xl sm:text-2xl text-[#EAE3D5]/80 max-w-2xl mb-8 leading-relaxed">
          The dispatch, article, or archive entry you are seeking has either shifted in our records or is preserved under a different folio.
        </p>

        {/* Return Button */}
        <div className="mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#B8A47A] text-[#11110F] hover:bg-[#F4F0E7] transition-colors duration-300 text-xs font-sans uppercase tracking-[0.22em] font-semibold"
          >
            <span>Return to Front Page</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {/* Section Directory Grid */}
        <div className="border-t border-[#B8A47A]/25 pt-12">
          <div className="flex items-center justify-between mb-8">
            <span className="text-[11px] font-sans uppercase tracking-[0.22em] text-[#9B9589]">
              Explore Key Editions
            </span>
            <span className="text-[11px] font-sans uppercase tracking-[0.22em] text-[#B8A47A]">
              Index 2026
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSections.map((sec) => (
              <Link
                key={sec.name}
                href={sec.href}
                className="group block p-5 rounded-none border border-[#B8A47A]/20 bg-[#1C1B18]/70 hover:border-[#B8A47A] hover:bg-[#1C1B18] transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-serif text-lg text-[#F4F0E7] group-hover:text-[#B8A47A] transition-colors">
                    {sec.name}
                  </h2>
                  <span className="text-[#B8A47A] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-sm">
                    &rarr;
                  </span>
                </div>
                <p className="text-xs font-sans text-[#9B9589] font-light leading-relaxed">
                  {sec.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
