import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSection } from "@/lib/editorial/sections";
import { getSectionArticles, getArticle } from "@/lib/editorial/registry";
import { buildArticleMetadata } from "@/lib/editorial/metadata";
import ArticlePage from "@/app/components/ArticlePage";

const section = getSection("royalty");

export async function generateStaticParams() {
  return getSectionArticles("royalty").map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle("royalty", slug);
  if (!article) return { title: "Article Not Found — The Royal Gallerys" };
  return buildArticleMetadata(section, article);
}

export default async function RoyaltyArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle("royalty", slug);
  if (!article) notFound();
  return <ArticlePage section={section} article={article} />;
}
