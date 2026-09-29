import type { Metadata } from "next";
import { getSection } from "@/lib/editorial/sections";
import { getSectionArticles } from "@/lib/editorial/registry";
import { buildSectionMetadata } from "@/lib/editorial/metadata";
import SectionLanding from "@/app/components/SectionLanding";

const section = getSection("people");
export const metadata: Metadata = buildSectionMetadata(section);

export default function PeoplePage() {
  return <SectionLanding section={section} articles={getSectionArticles("people")} />;
}
