import type { Metadata } from "next";
import { getSection } from "@/lib/editorial/sections";
import { getSectionArticles } from "@/lib/editorial/registry";
import { buildSectionMetadata } from "@/lib/editorial/metadata";
import SectionLanding from "@/app/components/SectionLanding";

const section = getSection("design");
export const metadata: Metadata = buildSectionMetadata(section);

export default function DesignPage() {
  return <SectionLanding section={section} articles={getSectionArticles("design")} />;
}
