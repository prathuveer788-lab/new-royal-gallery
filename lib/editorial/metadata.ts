// ── UNIFIED EDITORIAL SYSTEM — Metadata Helpers ───────────────────
import type { Metadata } from "next";
import type { EditorialArticle, SectionConfig } from "./types";

const SITE = "https://theroyalgallerys.com";

/** Landing-page metadata (CollectionPage-style) for a section. */
export function buildSectionMetadata(section: SectionConfig): Metadata {
  const url = `${SITE}/${section.slug}`;
  const imageUrl = `${SITE}${section.heroImage}`;
  return {
    title: section.seoTitle,
    description: section.seoDescription,
    alternates: { canonical: url },
    openGraph: {
      title: section.ogTitle,
      description: section.ogDescription,
      url,
      type: "website",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: section.ogTitle }],
      siteName: "The Royal Gallerys",
    },
    twitter: {
      card: "summary_large_image",
      site: "@theroyalgallerys",
      creator: "@theroyalgallerys",
      title: section.ogTitle,
      description: section.ogDescription,
      images: [imageUrl],
    },
  };
}

/** Article metadata for a `[slug]` route. */
export function buildArticleMetadata(section: SectionConfig, article: EditorialArticle): Metadata {
  const url = `${SITE}/${section.slug}/${article.slug}`;
  const imageUrl = `${SITE}${article.heroImage}`;
  return {
    title: article.seoTitle,
    description: article.seoDescription,
    keywords: article.keywords,
    authors: [{ name: article.authorName }],
    alternates: { canonical: url },
    openGraph: {
      title: article.ogTitle,
      description: article.ogDescription,
      url,
      type: "article",
      publishedTime: article.publishedDate,
      modifiedTime: article.modifiedDate,
      authors: [article.authorName],
      images: [{ url: imageUrl, width: 1200, height: 630, alt: article.ogTitle }],
      siteName: "The Royal Gallerys",
    },
    twitter: {
      card: "summary_large_image",
      site: "@theroyalgallerys",
      creator: "@theroyalgallerys",
      title: article.ogTitle,
      description: article.ogDescription,
      images: [imageUrl],
    },
  };
}
