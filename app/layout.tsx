import type { Metadata, Viewport } from "next";
import "./globals.css";
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
    icon: [
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className="font-sans min-h-screen flex flex-col antialiased"
        style={{
          background: "#F4F0E7",
          fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          ["--font-manrope" as string]: "'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          ["--font-cormorant" as string]: "'Cormorant Garamond', 'Playfair Display', 'EB Garamond', Georgia, serif",
          ["--font-playfair" as string]: "'Playfair Display', Georgia, serif",
          ["--font-eb-garamond" as string]: "'EB Garamond', Garamond, Georgia, serif",
        }}
      >
        <Navigation />
        <main className="flex-grow">{children}</main>
        <GlobalFooter />
      </body>
    </html>
  );
}
