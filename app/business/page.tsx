import type { Metadata } from "next";
import { getSection } from "@/lib/editorial/sections";
import { getSectionArticles } from "@/lib/editorial/registry";
import { buildSectionMetadata } from "@/lib/editorial/metadata";
import SectionLanding from "@/app/components/SectionLanding";

const section = getSection("business");
export const metadata: Metadata = buildSectionMetadata(section);

export default function BusinessPage() {
  return <SectionLanding section={section} articles={getSectionArticles("business")} />;
}
