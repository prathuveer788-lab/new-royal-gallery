import type { Metadata } from "next";
import { getSection } from "@/lib/editorial/sections";
import { getSectionArticles } from "@/lib/editorial/registry";
import { buildSectionMetadata } from "@/lib/editorial/metadata";
import SectionLanding from "@/app/components/SectionLanding";

const section = getSection("royalty");
export const metadata: Metadata = buildSectionMetadata(section);

export default function RoyaltyPage() {
  return (
    <SectionLanding
      section={section}
      articles={getSectionArticles("royalty")}
      spotlight={{
        href: "/society/aaliya-sultana-babi-dinosaur-princess-balasinor",
        tag: "Heritage",
        title: "The Woman Who Walks With Giants: Aaliya Sultana Babi",
        dek: "A member of the Balasinor royal family preserving 65 million years of dinosaur heritage — living lineage intersecting with modern science.",
        image: "/images/aaliya-sultana-babi/01-hero-aaliya-sultana-babi-portrait-1024w.webp",
        readTime: "12 min read",
      }}
    />
  );
}
