// ── UNIFIED EDITORIAL SYSTEM — Metadata Helpers ───────────────────
import type { Metadata } from "next";
import type { EditorialArticle, SectionConfig } from "./types";

const SITE = "https://theroyalgallerys.com";

/** Landing-page metadata (CollectionPage-style) for a section. */
export function buildSectionMetadata(section: SectionConfig): Metadata {
  return {
    title: section.seoTitle,
    description: section.seoDescription,
    openGraph: {
      title: section.ogTitle,
      description: section.ogDescription,
      type: "website",
      images: [{ url: `${SITE}${section.heroImage}`, width: 1200, height: 630, alt: section.ogTitle }],
      siteName: "The Royal Gallerys",
    },
    twitter: {
      card: "summary_large_image",
      title: section.ogTitle,
      description: section.ogDescription,
      images: [`${SITE}${section.heroImage}`],
    },
    alternates: { canonical: `${SITE}/${section.slug}` },
  };
}

/** Article metadata for a `[slug]` route. */
export function buildArticleMetadata(section: SectionConfig, article: EditorialArticle): Metadata {
  return {
    title: article.seoTitle,
    description: article.seoDescription,
    keywords: article.keywords,
    authors: [{ name: article.authorName }],
    openGraph: {
      title: article.ogTitle,
      description: article.ogDescription,
      type: "article",
      publishedTime: article.publishedDate,
      modifiedTime: article.modifiedDate,
      authors: [article.authorName],
      images: [{ url: `${SITE}${article.heroImage}`, width: 1200, height: 630, alt: article.ogTitle }],
      siteName: "The Royal Gallerys",
    },
    twitter: {
      card: "summary_large_image",
      title: article.ogTitle,
      description: article.ogDescription,
      images: [`${SITE}${article.heroImage}`],
    },
    alternates: { canonical: `${SITE}/${section.slug}/${article.slug}` },
  };
}
