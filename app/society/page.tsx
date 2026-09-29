import type { Metadata } from "next";
import { getSection } from "@/lib/editorial/sections";
import { getSectionArticles } from "@/lib/editorial/registry";
import { buildSectionMetadata } from "@/lib/editorial/metadata";
import SectionLanding, { type SectionSpotlight } from "@/app/components/SectionLanding";

const section = getSection("society");
export const metadata: Metadata = buildSectionMetadata(section);

const spotlight: SectionSpotlight = {
  href: "/society/portraits-of-heritage",
  tag: "Signature Series Cluster",
  title: "Portraits of Excellence & Heritage",
  dek: "In-depth visual portraits of modern royalty — including Princess Shivanjali Kumari Dungarpur's wildlife photography and Princess Aaliya Sultana Babi's paleontological sanctuary in Balasinor.",
  image: "/images/society/shivanjali-kumari-dungarpur/01-hero.jpg",
  readTime: "Signature Series",
};

export default function SocietyPage() {
  return (
    <SectionLanding
      section={section}
      articles={getSectionArticles("society")}
      spotlight={spotlight}
    />
  );
}
