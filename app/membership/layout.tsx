import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Membership — The Royal Gallerys Circle | The Royal Gallerys",
  description:
    "An invitation into the world's most rarefied heritage community — salon events, private archives, limited-edition publications, and direct connection with living royal lineages.",
  alternates: { canonical: "https://theroyalgallerys.com/membership" },
  openGraph: {
    title: "Membership — The Royal Gallerys Circle | The Royal Gallerys",
    description:
      "An invitation into the world's most rarefied heritage community — salon events, private archives, limited-edition publications, and direct connection with living royal lineages.",
    url: "https://theroyalgallerys.com/membership",
    type: "website",
    siteName: "The Royal Gallerys",
    images: [
      {
        url: "https://theroyalgallerys.com/images/hero/jaipur-city-palace-grand-facade.jpg",
        width: 1200,
        height: 630,
        alt: "The Royal Gallerys Circle Membership",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@theroyalgallerys",
    creator: "@theroyalgallerys",
    title: "Membership — The Royal Gallerys Circle | The Royal Gallerys",
    description:
      "An invitation into the world's most rarefied heritage community — salon events, private archives, and royal patronage.",
    images: ["https://theroyalgallerys.com/images/hero/jaipur-city-palace-grand-facade.jpg"],
  },
};

export default function MembershipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
