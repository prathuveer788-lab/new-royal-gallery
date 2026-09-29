// ── UNIFIED EDITORIAL SYSTEM — Registry ───────────────────
// Generic helpers over the per-section article data files.
import { allRoyaltyArticles } from "@/lib/royalty-articles";
import { allJewelleryArticles } from "@/lib/jewellery-articles";
import { allWatchesArticles } from "@/lib/watches-articles";
import { allWeddingsArticles } from "@/lib/weddings-articles";
import { allDesignArticles } from "@/lib/design-articles";
import { allCultureArticles } from "@/lib/culture-articles";
import { allBusinessArticles } from "@/lib/business-articles";
import { allMotoringArticles } from "@/lib/motoring-articles";
import { allDiningArticles } from "@/lib/dining-articles";
import { allSocietyArticles } from "@/lib/society-articles";
import { allPeopleArticles } from "@/lib/people-articles";
import { allFuturesArticles } from "@/lib/futures-articles";
import type { EditorialArticle, EditorialSection, EditorialSectionSlug } from "./types";

const SECTION_ARTICLES: Record<EditorialSectionSlug, EditorialArticle[]> = {
  royalty: allRoyaltyArticles,
  jewellery: allJewelleryArticles,
  watches: allWatchesArticles,
  weddings: allWeddingsArticles,
  design: allDesignArticles,
  culture: allCultureArticles,
  business: allBusinessArticles,
  motoring: allMotoringArticles,
  dining: allDiningArticles,
  society: allSocietyArticles,
  people: allPeopleArticles,
  futures: allFuturesArticles,
};

export function getSectionArticles(section: EditorialSectionSlug): EditorialArticle[] {
  return SECTION_ARTICLES[section] ?? [];
}

export function getArticle(section: EditorialSectionSlug, slug: string): EditorialArticle | undefined {
  return getSectionArticles(section).find((a) => a.slug === slug);
}

/** Resolve related slugs within the same section, dropping any that don't exist. */
export function getRelated(section: EditorialSectionSlug, slugs?: string[]): EditorialArticle[] {
  const all = getSectionArticles(section);
  if (!slugs || slugs.length === 0) {
    return all.slice(0, 3);
  }
  return slugs
    .map((s) => all.find((a) => a.slug === s))
    .filter((a): a is EditorialArticle => Boolean(a));
}

export function getTOC(sections: EditorialSection[]): { id: string; label: string }[] {
  return sections.map((s) => ({ id: s.id, label: s.heading }));
}

export function getAllEditorialArticles(): EditorialArticle[] {
  return Object.values(SECTION_ARTICLES).flat();
}
