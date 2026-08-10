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
  title: "The Royal Gallerys | Global Heritage Media, Technology & Experiences",
  description: "The Royal Gallerys is a global heritage media, technology and experiences platform dedicated to preserving, documenting and amplifying the world&apos;s royal, cultural and luxury heritage.",
  keywords: "Royal Gallerys, royal heritage, luxury magazine, Indian palaces, architectural heritage, heritage preservation, AI heritage, cultural preservation, global heritage platform, aristocratic culture, heritage media",
  authors: [{ name: "The Royal Gallerys" }],
  creator: "The Royal Gallerys",
  publisher: "The Royal Gallerys",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://theroyalgallerys.com",
    siteName: "The Royal Gallerys",
    title: "The Royal Gallerys | Global Heritage Media, Technology & Experiences",
    description: "A global heritage media, technology and experiences platform preserving, documenting and amplifying the world's royal, cultural and luxury heritage.",
    images: [
      {
        url: "https://theroyalgallerys.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Royal Gallerys - Global Heritage Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@theroyalsgallery",
    creator: "@theroyalsgallery",
    title: "The Royal Gallery",
    description: "Global heritage media, technology and experiences platform",
    images: ["https://theroyalgallerys.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://theroyalgallerys.com",
  },
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
              <div className="lg:col-span-2 space-y-5">
                <div className="text-center sm:text-left leading-none" style={{ fontFamily: "var(--font-bodoni), serif" }}>
                  <span className="block text-[clamp(7px,1vw,10px)] tracking-[0.4em] uppercase font-light text-neutral-500">The</span>
                  <span className="block text-[clamp(20px,2.8vw,30px)] tracking-[0.1em] uppercase font-normal text-white mt-0.5">Royal Gallerys</span>
                </div>
                <p className="text-[clamp(5px,0.7vw,7px)] tracking-[0.3em] uppercase text-neutral-500 mt-1" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 400 }}>
                  Heritage &middot; Media &middot; Technology &middot; Magazine
                </p>
                <p className="text-neutral-400 text-sm font-light leading-relaxed max-w-sm">
                  A global heritage media, technology and experiences platform preserving and amplifying the world&apos;s royal, cultural and luxury heritage.
                </p>
                <p className="text-[9px] sm:text-[10px] text-neutral-500 uppercase tracking-[0.3em] font-semibold">hey.theroyalgallerys@gmail.com</p>
              </div>

              {/* Explore */}
              <div className="space-y-4">
                <h4 className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-bold text-amber-400 mb-5">Explore</h4>
                <ul className="flex flex-col gap-3 text-sm text-neutral-400 font-light">
                  <li><Link href="/heritage" className="hover:text-white transition-colors">Heritage & Royalty</Link></li>
                  <li><Link href="/culture" className="hover:text-white transition-colors">Culture & Art</Link></li>
                  <li><Link href="/travel" className="hover:text-white transition-colors">Experiences</Link></li>
                  <li><Link href="/gallery" className="hover:text-white transition-colors">Living Archive</Link></li>
                  <li><Link href="/heritage-ai" className="hover:text-white transition-colors">Heritage AI</Link></li>
                  <li><Link href="/journal" className="hover:text-white transition-colors">Journal</Link></li>
                </ul>
              </div>

              {/* Ecosystem */}
              <div className="space-y-4">
                <h4 className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-bold text-amber-400 mb-5">Ecosystem</h4>
                <ul className="flex flex-col gap-3 text-sm text-neutral-400 font-light">
                  <li><Link href="/ecosystem" className="hover:text-white transition-colors">Five Houses</Link></li>
                  <li><Link href="/global-vision" className="hover:text-white transition-colors">Global Vision</Link></li>
                  <li><Link href="/membership" className="hover:text-white transition-colors">Membership</Link></li>
                  <li><Link href="/impact" className="hover:text-white transition-colors">Our Impact</Link></li>
                </ul>
              </div>

              {/* Connect */}
              <div className="space-y-4">
                <h4 className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-bold text-amber-400 mb-5">Connect</h4>
                <ul className="flex flex-col gap-3 text-sm text-neutral-400 font-light">
                  <li><a href="https://www.instagram.com/theroyalgallerys/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
                  <li><a href="mailto:hey.theroyalgallerys@gmail.com" className="hover:text-white transition-colors">Email</a></li>
                  <li><Link href="/membership" className="hover:text-white transition-colors">Private Consultation</Link></li>
                  <li><Link href="/journal" className="hover:text-white transition-colors">Newsletter</Link></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/[0.08] pt-8 sm:pt-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.15em] text-neutral-500 text-center sm:text-left font-light">
              <p>© 2026 The Royal Gallerys. All rights reserved.</p>
              <p className="text-neutral-600">Preserving Legacy · Amplifying Heritage · Shaping Cultural Memory</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}