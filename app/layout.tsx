import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import { Cormorant_Garamond, Manrope } from "next/font/google";
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
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
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

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600"],
});

const footerSections = [
  {
    title: "Sections",
    links: [
      { href: "/style", label: "Style" },
      { href: "/jewellery", label: "Jewellery" },
      { href: "/watches", label: "Watches" },
      { href: "/weddings", label: "Weddings" },
      { href: "/travel", label: "Travel" },
      { href: "/royalty", label: "Royalty" },
      { href: "/design", label: "Design" },
      { href: "/culture", label: "Culture" },
      { href: "/society", label: "Society" },
      { href: "/motoring", label: "Motoring" },
      { href: "/dining", label: "Dining" },
      { href: "/business", label: "Business" },
      { href: "/futures", label: "Futures" },
      { href: "/archive", label: "Archive" },
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
      { href: "/advertise", label: "Advertise" },
      { href: "/membership", label: "Newsletter" },
    ],
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${manrope.variable} font-sans min-h-screen flex flex-col antialiased`} style={{ background: "#F4F0E7" }}>
        <Navigation />
        <main className="flex-grow">{children}</main>

        {/* ── FOOTER ── */}
        <footer style={{ background: "#11110F", color: "#F4F0E7" }} className="pt-16 sm:pt-20 md:pt-28 pb-8 sm:pb-10 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 mt-auto">
          <div className="max-w-7xl mx-auto">

            {/* Thin bronze rule */}
            <hr className="editorial-rule mb-16 sm:mb-20 opacity-30" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 sm:gap-12 mb-16 sm:mb-20">
              {/* Brand */}
              <div className="lg:col-span-1 space-y-5">
                <div className="text-center sm:text-left leading-none" style={{ fontFamily: "var(--font-cormorant), serif" }}>
                  <span className="block text-[clamp(7px,1vw,10px)] tracking-[0.38em] uppercase font-light opacity-50" style={{ color: "#9B9589" }}>The</span>
                  <span className="block text-[clamp(20px,2.8vw,30px)] tracking-[0.08em] uppercase font-normal mt-0.5" style={{ color: "#F4F0E7" }}>Royal Gallerys</span>
                </div>
                <p className="text-[clamp(5px,0.7vw,7px)] tracking-[0.28em] uppercase mt-1" style={{ color: "#8A7352", fontFamily: "var(--font-manrope), sans-serif", fontWeight: 500 }}>
                  Heritage · Culture · Luxury · Influence
                </p>
                <p className="text-sm font-light leading-relaxed" style={{ color: "#9B9589" }}>
                  The international magazine for heritage, culture and luxury — editorial authority on the people, places and ideas shaping our world.
                </p>
                <p style={{ color: "#8A7352" }} className="text-[9px] sm:text-[10px] uppercase tracking-[0.28em] font-medium font-sans">hey.theroyalgallerys@gmail.com</p>
              </div>

              {/* Link columns */}
              {footerSections.map((col) => (
                <div key={col.title} className="space-y-4">
                  <h4 className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-semibold font-sans mb-5" style={{ color: "#8A7352" }}>{col.title}</h4>
                  <ul className="flex flex-col gap-3 text-sm font-light" style={{ color: "#9B9589" }}>
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className="hover:text-[#F4F0E7] transition-colors duration-300">{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Thin bronze rule */}
            <hr className="editorial-rule mb-8 sm:mb-10 opacity-25" />

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.14em] text-center sm:text-left font-light font-sans" style={{ color: "#9B9589" }}>
              <p>© 2026 The Royal Gallerys. All rights reserved.</p>
              <p style={{ color: "#8A7352" }}>Preserving Legacy · Amplifying Heritage · Shaping Cultural Memory</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
