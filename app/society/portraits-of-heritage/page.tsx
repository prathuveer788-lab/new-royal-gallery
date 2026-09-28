import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "@/app/components/NewsletterForm";

export const metadata: Metadata = {
  title: "Portraits of Heritage — Custodians & Visionaries | The Royal Gallerys",
  description:
    "Portraits of Heritage — the custodians, artists and visionaries carrying India's legacies into the present. A signature recurring series by The Royal Gallerys.",
  alternates: {
    canonical: "https://theroyalgallerys.com/society/portraits-of-heritage",
  },
  openGraph: {
    title: "Portraits of Heritage — The Royal Gallerys",
    description:
      "The custodians, artists and visionaries carrying India's legacies into the present.",
    url: "https://theroyalgallerys.com/society/portraits-of-heritage",
    siteName: "The Royal Gallerys",
    images: [
      {
        url: "https://theroyalgallerys.com/images/aaliya-sultana-babi/og-aaliya-sultana-babi.jpg",
        width: 1200,
        height: 630,
        alt: "Portraits of Heritage — The Royal Gallerys",
      },
    ],
  },
};

const SERIES_PROFILES = [
  {
    slug: "aaliya-sultana-babi-dinosaur-princess-balasinor",
    href: "/society/aaliya-sultana-babi-dinosaur-princess-balasinor",
    rubric: "Portraits of Heritage · Vol. XII",
    title: "The Woman Who Walks With Giants",
    subtitle: "Aaliya Sultana Babi, The Dinosaur Princess of Balasinor",
    location: "Balasinor, Gujarat · 65 Million Years",
    dek: "In the mineral-rich hills of Balasinor, time does not flow in a straight line. How a royal custodian turned forgotten garden 'cannonballs' into India's dinosaur capital.",
    byline: "Words by Krishanpriya Rajawat",
    readTime: "12 min read",
    image: "/images/aaliya-sultana-babi/01-hero-aaliya-sultana-babi-portrait-1024w.webp",
    featured: true,
    status: "Published",
  },
  {
    slug: "shivanjali-kumari-dungarpur-wild-lens-of-royalty",
    href: "/society/shivanjali-kumari-dungarpur-wild-lens-of-royalty",
    rubric: "Portraits of Excellence",
    title: "Through the Wild Lens of Royalty",
    subtitle: "Princess Shivanjali Kumari Dungarpur",
    location: "Dungarpur, Rajasthan · Masai Mara",
    dek: "A princess by birthright, a wildlife photographer by conviction. From Dungarpur's Pareva stone to ten dawn drives in the Masai Mara — how an ancient lineage meets the fearless eye of a modern artist.",
    byline: "Words by Krishanpriya Rajawat",
    readTime: "8 min read",
    image: "/images/society/shivanjali-kumari-dungarpur/01-hero.jpg",
    featured: true,
    status: "Published",
  },
  {
    slug: "raghavendra-rathore-bandhgala",
    href: "#",
    rubric: "Portraits of Excellence",
    title: "The Architect of the Modern Jodhpur Cut",
    subtitle: "Raghavendra Rathore",
    location: "Jodhpur, Rajasthan",
    dek: "How royal lineage and disciplined bespoke tailoring created an internationally renowned design vocabulary for modern Indian formalwear.",
    byline: "The Royal Gallerys Editorial",
    readTime: "Forthcoming",
    image: "/images/hallway-arches-with-dramatic-light-shadows.jpg",
    featured: false,
    status: "Forthcoming Profile",
  },
  {
    slug: "house-of-mewar-custodianship",
    href: "#",
    rubric: "Portraits of Heritage",
    title: "Guardians of the Sun Dynasty",
    subtitle: "The House of Mewar in the 21st Century",
    location: "Udaipur, Mewar",
    dek: "A millennium of continuous cultural leadership, living palace museums, and philanthropic trusts navigating modern democracy.",
    byline: "The Royal Gallerys Editorial",
    readTime: "Forthcoming",
    image: "/images/badi-mahal-garden-palace-city-palace-udaipur-rajasthan-india.jpg",
    featured: false,
    status: "Forthcoming Profile",
  },
];

export default function PortraitsOfHeritagePage() {
  return (
    <div style={{ backgroundColor: "#F4F0E7" }}>
      {/* ── HEADER BANNER ── */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center bg-[#22344A]">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/images/udaipur-city-view-from-hotel-balcony-rajasthan-india.jpg"
            alt="Portraits of Heritage"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#22344A] via-[#22344A]/80 to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pt-32 sm:pt-36 pb-16">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] font-sans">
              <li>
                <Link href="/" className="text-[#B8A47A] hover:text-[#F3E7D3] transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-[#F3E7D3]/40">/</li>
              <li>
                <Link href="/society" className="text-[#B8A47A] hover:text-[#F3E7D3] transition-colors">
                  Society
                </Link>
              </li>
              <li className="text-[#F3E7D3]/40">/</li>
              <li className="text-[#F3E7D3] font-medium">Portraits of Heritage</li>
            </ol>
          </nav>

          <span
            className="text-[10px] sm:text-[11px] uppercase tracking-[0.32em] font-sans font-semibold block mb-3"
            style={{ color: "#D4673A" }}
          >
            Series Hub · Vol. XII
          </span>
          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#F3E7D3] leading-[0.98] mb-6 tracking-tight"
            style={{ fontWeight: 400 }}
          >
            Portraits of Heritage
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-serif italic max-w-3xl text-[#EFE3D2]/90 leading-relaxed">
            &ldquo;Portraits of Heritage — the custodians, artists and visionaries carrying India&apos;s legacies into the present.&rdquo;
          </p>
        </div>
      </section>

      {/* ── SERIES FEED CONTAINER ── */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Featured Flagship Lead Story */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-8 bg-[#D4673A]" />
            <span
              className="text-[10px] uppercase tracking-[0.28em] font-sans font-semibold"
              style={{ color: "#D4673A" }}
            >
              Flagship Profile · Lead Feature
            </span>
          </div>

          <Link
            href={SERIES_PROFILES[0].href}
            className="group block border border-[#D9CFC2] bg-[#FBF9F5] shadow-sm transition-all duration-500 hover:shadow-md hover:border-[#D4673A]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative min-h-[380px] sm:min-h-[460px] overflow-hidden bg-[#22344A]">
                <Image
                  src={SERIES_PROFILES[0].image}
                  alt={SERIES_PROFILES[0].title}
                  fill
                  priority
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  style={{ objectPosition: "50% 25%" }}
                />
              </div>

              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between" style={{ backgroundColor: "#22344A" }}>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-[10px] uppercase tracking-[0.24em] font-sans font-semibold"
                      style={{ color: "#D4673A" }}
                    >
                      {SERIES_PROFILES[0].rubric}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-sans text-[#B8A47A]">
                      {SERIES_PROFILES[0].readTime}
                    </span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-serif text-[#F3E7D3] leading-[1.1] mb-2 tracking-tight group-hover:text-[#D4673A] transition-colors">
                    {SERIES_PROFILES[0].title}
                  </h2>
                  <p className="font-playfair italic text-lg sm:text-xl text-[#F3E7D3]/85 mb-4">
                    {SERIES_PROFILES[0].subtitle}
                  </p>

                  <p className="text-xs uppercase tracking-[0.18em] font-sans text-[#B8A47A] mb-5">
                    {SERIES_PROFILES[0].location}
                  </p>

                  <p className="text-sm sm:text-base font-sans text-[#EFE3D2]/90 leading-relaxed font-light mb-6">
                    {SERIES_PROFILES[0].dek}
                  </p>
                </div>

                <div className="pt-6 border-t border-[rgba(243,231,211,0.2)] flex items-center justify-between">
                  <span className="text-xs font-sans text-[#B8A47A]">
                    {SERIES_PROFILES[0].byline}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] font-sans font-medium text-[#F3E7D3] group-hover:text-[#D4673A] transition-colors">
                    Read Flagship Feature →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Series Profile Grid */}
        <div>
          <div className="flex items-center justify-between border-b border-[#D9CFC2] pb-4 mb-10">
            <h3 className="text-2xl font-serif text-[#1B1D21] tracking-tight">
              Upcoming Profiles in the Series
            </h3>
            <span className="text-xs uppercase tracking-[0.2em] font-sans text-[#6B6F76]">
              Heritage Edition 2026
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERIES_PROFILES.slice(1).map((item) => {
              const isPublished = item.status === "Published";
              const CardContent = (
                <>
                  <div>
                    {item.image && isPublished && (
                      <div className="relative aspect-[16/10] overflow-hidden mb-5 bg-[#141416]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    )}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[9px] uppercase tracking-[0.22em] font-sans font-semibold text-[#8A7352]">
                        {item.rubric}
                      </span>
                      <span className={`text-[9px] uppercase tracking-[0.16em] font-sans px-2 py-0.5 ${isPublished ? "bg-[#C4687F] text-white" : "bg-[#EAE3D5] text-[#1B1D21]/80"}`}>
                        {item.status}
                      </span>
                    </div>

                    <h4 className={`text-2xl font-serif text-[#1B1D21] leading-snug mb-1 ${isPublished ? "group-hover:text-[#C4687F] transition-colors" : ""}`}>
                      {item.title}
                    </h4>
                    <p className="font-serif italic text-base text-[#6B6F76] mb-3">
                      {item.subtitle}
                    </p>
                    <p className="text-[11px] uppercase tracking-[0.16em] font-sans text-[#8A7352] mb-4">
                      {item.location}
                    </p>
                    <p className="text-sm font-sans text-[#1B1D21]/80 leading-relaxed font-light">
                      {item.dek}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#D9CFC2]/60 flex items-center justify-between text-xs font-sans text-[#6B6F76]">
                    <span>{item.byline}</span>
                    <span className={isPublished ? "text-[#C4687F] font-medium" : "italic"}>
                      {isPublished ? "Read Profile →" : item.readTime}
                    </span>
                  </div>
                </>
              );

              return isPublished ? (
                <Link
                  key={item.slug}
                  href={item.href}
                  className="group border border-[#D9CFC2] bg-[#FBF9F5] p-6 sm:p-7 flex flex-col justify-between hover:border-[#C4687F] hover:shadow-md transition-all duration-300"
                >
                  {CardContent}
                </Link>
              ) : (
                <div
                  key={item.slug}
                  className="border border-[#D9CFC2] bg-[#FBF9F5] p-6 sm:p-7 flex flex-col justify-between opacity-80"
                >
                  {CardContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER MODULE ── */}
      <section className="py-16 sm:py-20 bg-[#22344A] text-[#F3E7D3] px-6 text-center">
        <div className="max-w-xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-[#D4673A] block mb-2">
            The Royal Gallerys
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#F3E7D3] mb-4 tracking-tight">
            Subscribe to Portraits of Heritage
          </h2>
          <p className="text-sm font-sans text-[#EFE3D2]/80 leading-relaxed mb-8">
            Stay informed as new profiles of India&apos;s living custodians and heritage visionaries are released.
          </p>
          <NewsletterForm variant="dark" source="portraits-of-heritage-hub" />
        </div>
      </section>
    </div>
  );
}
