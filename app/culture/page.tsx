import type { Metadata } from "next";
import { getSection } from "@/lib/editorial/sections";
import { getSectionArticles } from "@/lib/editorial/registry";
import { buildSectionMetadata } from "@/lib/editorial/metadata";
import SectionLanding from "@/app/components/SectionLanding";

const section = getSection("culture");
export const metadata: Metadata = buildSectionMetadata(section);

export default function CulturePage() {
  return (
    <SectionLanding
      section={section}
      articles={getSectionArticles("culture")}
      spotlight={{
        href: "/society/shivanjali-kumari-dungarpur-wild-lens-of-royalty",
        tag: "Art · Photography",
        title: "Through the Wild Lens of Royalty: Princess Shivanjali Kumari Dungarpur",
        dek: "In Dungarpur and the Masai Mara, how an ancient royal lineage meets the fearless eye of a modern wildlife photographer.",
        image: "/images/society/shivanjali-kumari-dungarpur/01-hero.jpg",
        readTime: "8 min read",
      }}
    />
  );
}
