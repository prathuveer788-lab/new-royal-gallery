import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Cormorant_Garamond, Manrope, Playfair_Display, EB_Garamond } from "next/font/google";
import Navigation from "./components/Navigation";
import GlobalFooter from "./components/GlobalFooter";

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
    site: "@theroyalgallerys",
    creator: "@theroyalgallerys",
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

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${manrope.variable} ${playfair.variable} ${ebGaramond.variable} font-sans min-h-screen flex flex-col antialiased`}
        style={{ background: "#F4F0E7" }}
      >
        <Navigation />
        <main className="flex-grow">{children}</main>
        <GlobalFooter />
      </body>
    </html>
  );
}
