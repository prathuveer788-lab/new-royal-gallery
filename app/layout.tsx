import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Cormorant_Garamond, Montserrat, Bodoni_Moda } from "next/font/google";
import Navigation from "./components/Navigation";

export const metadata: Metadata = {
  title: "The Royal Gallery's | Heritage & Culture Magazine",
  description: "Explore India's royal heritage, architectural masterpieces, and luxury travel destinations. The Royal Gallery's is a premium digital magazine documenting aristocratic culture, heritage sites, and contemporary narratives.",
  keywords: "Royal Gallery's, royal heritage, luxury magazine, Indian palaces, architectural heritage, travel magazine, aristocratic culture",
  authors: [{ name: "The Royal Gallery's" }],
  creator: "The Royal Gallery's",
  publisher: "The Royal Gallery's",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
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
    url: "https://yourdomain.com",
    siteName: "The Royal Gallery's",
    title: "The Royal Gallery's | Heritage & Culture Magazine",
    description: "Discover India's royal heritage and architectural masterpieces through our premium editorial magazine.",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Royal Gallery's - Royal Heritage Magazine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@theroyalsgallery",
    creator: "@theroyalsgallery",
    title: "The Royal Gallery's",
    description: "Premium magazine exploring royal heritage and luxury travel",
    images: ["https://yourdomain.com/og-image.jpg"],
  },
  alternates: {
    canonical: "https://yourdomain.com",
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
      <body className={`${cormorant.variable} ${montserrat.variable} ${bodoni.variable} font-sans bg-[#fcfaf7] min-h-screen flex flex-col`}>
        
        {/* NAVIGATION - Client Component with interactive elements */}
        <Navigation />

        {/* MAIN CONTENT */}
        <main className="flex-grow pt-16 sm:pt-20 md:pt-24 lg:pt-32">{children}</main>

        {/* FOOTER */}
        <footer className="bg-[#111111] text-white pt-12 sm:pt-16 pb-6 sm:pb-8 px-4 sm:px-6 md:px-10 mt-auto">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-14 md:mb-16">
              <div className="space-y-4">
                <h3 className="text-xl font-serif font-bold tracking-tighter uppercase leading-none text-white">
                  THE ROYAL <span className="block text-[10px] text-amber-500 tracking-[0.3em] font-sans mt-1">GALLERY'S</span>
                </h3>
                <p className="text-neutral-400 text-sm font-light leading-relaxed max-w-xs">
                  A premium digital magazine documenting royal heritage and aristocratic culture.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-amber-500">Explore</h4>
                <ul className="flex flex-col gap-2 text-sm text-neutral-400 font-light">
                  <li><Link href="/heritage" className="hover:text-white transition">Heritage & Royalty</Link></li>
                  <li><Link href="/culture" className="hover:text-white transition">Culture & Art</Link></li>
                  <li><Link href="/travel" className="hover:text-white transition">Luxury Travel</Link></li>
                  <li><Link href="/gallery" className="hover:text-white transition">Gallery</Link></li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-amber-500">Connect</h4>
                <div className="flex gap-4 text-neutral-400 text-sm mb-4">
                  <a href="https://instagram.com/theroyalsgallery" target="_blank" rel="noreferrer" className="hover:text-white transition italic underline underline-offset-4">Instagram</a>
                  <a href="mailto:hey.theroyalsgallery@gmail.com" className="hover:text-white transition italic underline underline-offset-4">Email</a>
                </div>
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest leading-loose">
                  hey.theroyalsgallery@gmail.com
                </p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-neutral-500 text-center sm:text-left">
              <p>© 2026 The Royal Gallery's. All rights reserved.</p>
              <p className="text-neutral-600">Indian Royal Heritage & Global Aristocratic Culture</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}