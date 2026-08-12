// ── UNIFIED EDITORIAL SYSTEM — Types ───────────────────
// Shared article + section shapes for the new/expanded sections
// (Royalty, Jewellery, Watches, Weddings, Design, Culture, Business).
// Mirrors the proven StyleArticle shape in lib/style-articles.ts.

export type EditorialSectionSlug =
  | "royalty"
  | "jewellery"
  | "watches"
  | "weddings"
  | "design"
  | "culture"
  | "business";

/** SEO keyword map — the commercial/S2B intelligence brief per article. */
export interface KeywordMap {
  primary: string[];
  secondary: string[];
  longTail: string[];
  commercial: string[];
  semantic: string[];
}

export interface EditorialSection {
  id: string;
  heading: string;
  content: string;
}

export interface EditorialPullQuote {
  quote: string;
  context: string;
}

export interface EditorialImageBreak {
  image: string;
  alt: string;
  caption: string;
}

export interface EditorialArticle {
  slug: string;
  section: EditorialSectionSlug;
  seoTitle: string;
  seoDescription: string;
  ogTitle: string;
  ogDescription: string;
  category: string;
  editorialSubcategory: string;
  /** Search intent for this article — business-layer articles are "commercial-investigation". */
  searchIntent: "commercial-investigation" | "informational" | "transactional";
  keywordMap: KeywordMap;
  tags: string[];
  headline: string;
  subtitle: string;
  authorName: string;
  authorRole: string;
  readTime: string;
  publishedDate: string;
  modifiedDate?: string;
  heroImage: string;
  heroCaption: string;
  sections: EditorialSection[];
  pullQuotes: EditorialPullQuote[];
  imageBreaks: EditorialImageBreak[];
  relatedSlugs: string[];
  keywords: string[];
}

/** Section landing-page config. */
export interface SectionConfig {
  slug: EditorialSectionSlug;
  label: string;
  heroImage: string;
  heroCaption: string;
  heroAlt: string;
  /** Eyebrow under the hero title — sub-disciplines, dot-separated. */
  tagline: string;
  /** Hero paragraph. */
  description: string;
  /** Body copy for the obsidian "editorial statement" band. */
  editorialStatement: string;
  /** Heading for the editorial feed band. */
  feedHeading: string;
  seoTitle: string;
  seoDescription: string;
  ogTitle: string;
  ogDescription: string;
}
