"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { allArticles, type TravelArticle } from "@/lib/travel-articles";

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNkZGRkZGQiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

/* ── Featured stories — get the large Feature layout regardless of position ── */
const FEATURED_SLUGS = [
  "umaid-bhawan-palace-jodhpur",
  "taj-lake-palace-udaipur",
  "kyoto-travel-guide",
  "amalfi-coast-travel-guide",
  "rambagh-palace-jaipur",
];

/* ── Filter configuration ─────────────────────────── */
type FilterKey = "all" | "palaces" | "destinations" | "hospitality";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "ALL" },
  { key: "palaces", label: "PALACES" },
  { key: "destinations", label: "DESTINATIONS" },
  { key: "hospitality", label: "HOSPITALITY" },
];

const SUBCATEGORY_LABELS: Record<string, string> = {
  hotels: "PALACES",
  destinations: "DESTINATIONS",
  "luxury-hospitality": "HOSPITALITY",
};

/* ── Sort & filter ────────────────────────────────── */

function filterAndSortArticles(filter: FilterKey): TravelArticle[] {
  const travelArticles = allArticles.filter(
    (a) => a.editorialSection === "travel",
  );

  let filtered: TravelArticle[];
  switch (filter) {
    case "palaces":
      filtered = travelArticles.filter(
        (a) => a.editorialSubcategory === "hotels",
      );
      break;
    case "destinations":
      filtered = travelArticles.filter(
        (a) => a.editorialSubcategory === "destinations",
      );
      break;
    case "hospitality":
      filtered = travelArticles.filter(
        (a) => a.editorialSubcategory === "luxury-hospitality",
      );
      break;
    default:
      filtered = [...travelArticles];
  }

  const featuredSet = new Set(FEATURED_SLUGS);
  return [...filtered].sort((a, b) => {
    const aFeat = featuredSet.has(a.slug);
    const bFeat = featuredSet.has(b.slug);
    if (aFeat && !bFeat) return -1;
    if (!aFeat && bFeat) return 1;
    return (
      new Date(b.publishedDate).getTime() -
      new Date(a.publishedDate).getTime()
    );
  });
}

/* ── Editorial rhythm layout grouping ─────────────── */

type LayoutGroup =
  | { type: "feature"; articles: [TravelArticle] }
  | { type: "two-col"; articles: [TravelArticle, TravelArticle] }
  | {
      type: "three-col";
      articles: [TravelArticle, TravelArticle, TravelArticle];
    };

/**
 * Assign articles to layout slots in a repeating editorial rhythm:
 *   Feature(1) → Two-Column(2) → Three-Column(3) → Feature(1) → …
 *
 * When there aren't enough remaining articles for a slot, gracefully
 * degrades: 1 remaining → Feature, 2 remaining → Two-Column.
 */
function buildLayoutGroups(articles: TravelArticle[]): LayoutGroup[] {
  const groups: LayoutGroup[] = [];
  const sequence = ["feature", "two-col", "three-col"] as const;
  let seq = 0;
  let i = 0;

  while (i < articles.length) {
    const remaining = articles.length - i;

    if (sequence[seq] === "feature") {
      groups.push({
        type: "feature",
        articles: [articles[i]],
      } as LayoutGroup);
      i += 1;
    } else if (sequence[seq] === "two-col") {
      if (remaining >= 2) {
        groups.push({
          type: "two-col",
          articles: [articles[i], articles[i + 1]],
        } as LayoutGroup);
        i += 2;
      } else {
        groups.push({
          type: "feature",
          articles: [articles[i]],
        } as LayoutGroup);
        i += 1;
      }
    } else {
      if (remaining >= 3) {
        groups.push({
          type: "three-col",
          articles: [articles[i], articles[i + 1], articles[i + 2]],
        } as LayoutGroup);
        i += 3;
      } else if (remaining === 2) {
        groups.push({
          type: "two-col",
          articles: [articles[i], articles[i + 1]],
        } as LayoutGroup);
        i += 2;
      } else {
        groups.push({
          type: "feature",
          articles: [articles[i]],
        } as LayoutGroup);
        i += 1;
      }
    }

    seq = (seq + 1) % 3;
  }

  return groups;
}

/* ── Sub-components ──────────────────────────────── */

function SubcategoryTag({ subcategory }: { subcategory: string }) {
  return (
    <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] text-amber-700 font-bold font-sans">
      {SUBCATEGORY_LABELS[subcategory] || subcategory.toUpperCase()}
    </span>
  );
}

function ReadMoreArrow() {
  return (
    <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-amber-700 font-semibold border-b border-amber-300 pb-0.5 font-sans group-hover:text-amber-800 transition-colors">
      Read Story →
    </span>
  );
}

/* ── Layout: Feature (asymmetric split, 7/12 image + 5/12 text) ── */

function FeatureCard({ article }: { article: TravelArticle }) {
  return (
    <Link
      href={`/travel/${article.slug}`}
      className="group block"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Image panel */}
        <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[480px] overflow-hidden">
          <Image
            src={article.heroImage}
            alt={article.headline}
            fill
            placeholder="blur"
            blurDataURL={blurDataURL}
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
          />
        </div>

        {/* Text panel */}
        <div className="lg:col-span-5 flex items-center bg-[#faf8f5] p-8 sm:p-10 md:p-14 lg:p-16">
          <div className="space-y-4 sm:space-y-5">
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-amber-700 font-bold font-sans">
              {article.category} · {article.country}
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-neutral-900 leading-[1.08] group-hover:text-amber-800 transition-colors">
              {article.headline}
            </h3>
            <p className="text-neutral-600 text-sm sm:text-base font-light leading-relaxed max-w-md">
              {article.subtitle}
            </p>
            <div className="flex items-center gap-4 pt-1">
              <span className="text-xs text-neutral-400 font-light">
                {article.readTime}
              </span>
              <ReadMoreArrow />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ── Layout: Two-Column card ──────────────────────── */

function TwoColumnCard({ article }: { article: TravelArticle }) {
  return (
    <Link
      href={`/travel/${article.slug}`}
      className="group flex flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden mb-4">
        <Image
          src={article.heroImage}
          alt={article.headline}
          fill
          placeholder="blur"
          blurDataURL={blurDataURL}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
      </div>
      <SubcategoryTag subcategory={article.editorialSubcategory} />
      <h3 className="text-xl sm:text-2xl font-serif text-neutral-900 mt-1.5 mb-2 leading-tight group-hover:text-amber-800 transition-colors">
        {article.headline}
      </h3>
      <span className="text-[10px] sm:text-[11px] text-neutral-400 font-light mt-auto">
        {article.readTime}
      </span>
    </Link>
  );
}

/* ── Layout: Three-Column card ────────────────────── */

function ThreeColumnCard({ article }: { article: TravelArticle }) {
  return (
    <Link
      href={`/travel/${article.slug}`}
      className="group flex flex-col"
    >
      <div className="relative aspect-[3/4] overflow-hidden mb-4">
        <Image
          src={article.heroImage}
          alt={article.headline}
          fill
          placeholder="blur"
          blurDataURL={blurDataURL}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
      </div>
      <SubcategoryTag subcategory={article.editorialSubcategory} />
      <h3 className="text-lg sm:text-xl font-serif text-neutral-900 mt-1.5 mb-2 leading-tight group-hover:text-amber-800 transition-colors">
        {article.headline}
      </h3>
      <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed flex-1 line-clamp-3">
        {article.subtitle}
      </p>
      <span className="text-[10px] text-neutral-400 font-light mt-3">
        {article.readTime}
      </span>
    </Link>
  );
}

/* ── Main exported component ──────────────────────── */

export default function TravelEditorialFeed() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const articles = useMemo(
    () => filterAndSortArticles(activeFilter),
    [activeFilter],
  );

  const layoutGroups = useMemo(
    () => buildLayoutGroups(articles),
    [articles],
  );

  /* Pre-compute filter counts once — they never change */
  const filterCounts = useMemo(() => {
    const all = allArticles.filter((a) => a.editorialSection === "travel");
    return {
      all: all.length,
      palaces: all.filter((a) => a.editorialSubcategory === "hotels").length,
      destinations: all.filter(
        (a) => a.editorialSubcategory === "destinations",
      ).length,
      hospitality: all.filter(
        (a) => a.editorialSubcategory === "luxury-hospitality",
      ).length,
    };
  }, []);

  return (
    <>
      {/* ── Filter bar ──────────────────────────── */}
      <section className="py-8 sm:py-10 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="flex flex-wrap gap-3 sm:gap-6 justify-center">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setActiveFilter(f.key)}
                className={`text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold font-sans pb-1.5 transition-colors ${
                  activeFilter === f.key
                    ? "text-amber-800 border-b-2 border-amber-500"
                    : "text-neutral-400 hover:text-amber-700 border-b-2 border-transparent"
                }`}
              >
                {f.label}{" "}
                <span className="font-light text-neutral-300">
                  ({filterCounts[f.key]})
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Editorial feed ──────────────────────── */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {articles.length === 0 ? (
            /* ── Empty state ────────────────── */
            <div className="text-center py-20">
              <p className="text-neutral-500 font-light text-lg mb-4">
                No stories in this category yet.
              </p>
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-amber-700 font-semibold border-b border-amber-300 pb-0.5 font-sans hover:text-amber-800 transition-colors"
              >
                View All Stories →
              </button>
            </div>
          ) : (
            <div className="space-y-16 sm:space-y-20 md:space-y-24">
              {layoutGroups.map((group, gi) => (
                <div key={`${group.type}-${gi}`}>
                  {/* Feature */}
                  {group.type === "feature" && (
                    <FeatureCard article={group.articles[0]} />
                  )}

                  {/* Two-Column row */}
                  {group.type === "two-col" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                      {group.articles.map((article) => (
                        <TwoColumnCard
                          key={article.slug}
                          article={article}
                        />
                      ))}
                    </div>
                  )}

                  {/* Three-Column row */}
                  {group.type === "three-col" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                      {group.articles.map((article) => (
                        <ThreeColumnCard
                          key={article.slug}
                          article={article}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
