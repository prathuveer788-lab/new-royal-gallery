import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import { Cormorant_Garamond, Montserrat, Bodoni_Moda } from "next/font/google";
import Navigation from "./components/Navigation";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://theroyalgallerys.com"),
  title: "THE ROYAL GALLERYS | Heritage, Culture & Luxury — The International Magazine",
  description: "THE ROYAL GALLERYS is the international magazine for heritage, culture and luxury — editorial authority on royal families, palace hotels, art, design, motoring, dining and the future of tradition.",
  keywords: "Royal Gallerys, heritage magazine, luxury magazine, royal families, palace hotels, Indian palaces, architectural heritage, art and culture, heritage preservation, luxury travel, fine dining, classic cars, heritage AI",
  authors: [{ name: "The Royal Gallerys" }],
  creator: "The Royal Gallerys",
  publisher: "The Royal Gallerys",
  formatDetection: { email: false, telephone: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theroyalgallerys.com",
    siteName: "The Royal Gallerys",
    title: "THE ROYAL GALLERYS — Heritage, Culture & Luxury",
    description: "The international magazine for heritage, culture and luxury. Editorial authority on royal families, palace hotels, art, design, and the future of tradition.",
    images: [{ url: "https://theroyalgallerys.com/og-image.jpg", width: 1200, height: 630, alt: "The Royal Gallerys — The International Magazine" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@theroyalsgallery",
    creator: "@theroyalsgallery",
    title: "THE ROYAL GALLERYS",
    description: "The international magazine for heritage, culture and luxury.",
    images: ["https://theroyalgallerys.com/og-image.jpg"],
  },
  alternates: { canonical: "https://theroyalgallerys.com" },
};

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni"
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat"
});

const footerSections = [
  {
    title: "Sections",
    links: [
      { href: "/style", label: "Style" },
      { href: "/travel", label: "Travel" },
      { href: "/design", label: "Design" },
      { href: "/culture", label: "Culture" },
      { href: "/society", label: "Society" },
      { href: "/people", label: "People" },
      { href: "/motoring", label: "Motoring" },
      { href: "/dining", label: "Dining" },
      { href: "/business", label: "Business" },
      { href: "/futures", label: "Futures" },
      { href: "/archive", label: "Archive" },
    ],
  },
  {
    title: "The Journal",
    links: [
      { href: "/journal", label: "All Stories" },
      { href: "/membership", label: "Subscribe" },
      { href: "/membership", label: "Newsletter" },
      { href: "/advertise", label: "Advertise" },
    ],
  },
  {
    title: "Institute",
    links: [
      { href: "/ecosystem", label: "Five Houses" },
      { href: "/global-vision", label: "Global Vision" },
      { href: "/impact", label: "Our Impact" },
      { href: "/membership", label: "Membership" },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: "https://www.instagram.com/theroyalgallerys/", label: "Instagram" },
      { href: "mailto:hey.theroyalgallerys@gmail.com", label: "Email" },
      { href: "/membership", label: "Private Consultation" },
      { href: "/journal", label: "Newsletter" },
    ],
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${montserrat.variable} ${bodoni.variable} font-sans bg-white min-h-screen flex flex-col antialiased`}>
        <Navigation />
        <main className="flex-grow">{children}</main>

        {/* ── FOOTER ── */}
        <footer className="bg-neutral-950 text-white pt-16 sm:pt-20 md:pt-28 pb-8 sm:pb-10 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 mt-auto">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 sm:gap-12 mb-16 sm:mb-20">
              {/* Brand */}
              <div className="lg:col-span-1 space-y-5">
                <div className="text-center sm:text-left leading-none" style={{ fontFamily: "var(--font-bodoni), serif" }}>
                  <span className="block text-[clamp(7px,1vw,10px)] tracking-[0.4em] uppercase font-light text-neutral-500">The</span>
                  <span className="block text-[clamp(20px,2.8vw,30px)] tracking-[0.1em] uppercase font-normal text-white mt-0.5">Royal Gallerys</span>
                </div>
                <p className="text-[clamp(5px,0.7vw,7px)] tracking-[0.3em] uppercase text-neutral-500 mt-1" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 400 }}>
                  Heritage &middot; Culture &middot; Luxury &middot; Influence
                </p>
                <p className="text-neutral-400 text-sm font-light leading-relaxed">
                  The international magazine for heritage, culture and luxury — editorial authority on the people, places and ideas shaping our world.
                </p>
                <p className="text-[9px] sm:text-[10px] text-neutral-500 uppercase tracking-[0.3em] font-semibold font-sans">hey.theroyalgallerys@gmail.com</p>
              </div>

              {/* Link columns */}
              {footerSections.map((col) => (
                <div key={col.title} className="space-y-4">
                  <h4 className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-bold text-amber-400 mb-5 font-sans">{col.title}</h4>
                  <ul className="flex flex-col gap-3 text-sm text-neutral-400 font-light">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className="hover:text-white transition-colors">{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="border-t border-white/[0.08] pt-8 sm:pt-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.15em] text-neutral-500 text-center sm:text-left font-light font-sans">
              <p>© 2026 The Royal Gallerys. All rights reserved.</p>
              <p className="text-neutral-600">Preserving Legacy · Amplifying Heritage · Shaping Cultural Memory</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
