"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { allArticles, type TravelArticle } from "@/lib/travel-articles";

const C = {
  obsidian: "#11110F",
  ivory: "#F4F0E7",
  cream: "#EAE3D5",
  bronze: "#8A7352",
  champagne: "#B8A47A",
  textDeep: "#181714",
  textStone: "#9B9589",
};

const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNkZGRkZGQiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

const FEATURED_SLUGS = ["umaid-bhawan-palace-jodhpur", "taj-lake-palace-udaipur", "kyoto-travel-guide", "amalfi-coast-travel-guide", "rambagh-palace-jaipur"];

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

function filterAndSortArticles(filter: FilterKey): TravelArticle[] {
  const travelArticles = allArticles.filter((a) => a.editorialSection === "travel");
  let filtered: TravelArticle[];
  switch (filter) {
    case "palaces": filtered = travelArticles.filter((a) => a.editorialSubcategory === "hotels"); break;
    case "destinations": filtered = travelArticles.filter((a) => a.editorialSubcategory === "destinations"); break;
    case "hospitality": filtered = travelArticles.filter((a) => a.editorialSubcategory === "luxury-hospitality"); break;
    default: filtered = [...travelArticles];
  }
  const featuredSet = new Set(FEATURED_SLUGS);
  return [...filtered].sort((a, b) => {
    const aFeat = featuredSet.has(a.slug);
    const bFeat = featuredSet.has(b.slug);
    if (aFeat && !bFeat) return -1;
    if (!aFeat && bFeat) return 1;
    return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
  });
}

type LayoutGroup =
  | { type: "feature"; articles: [TravelArticle] }
  | { type: "two-col"; articles: [TravelArticle, TravelArticle] }
  | { type: "three-col"; articles: [TravelArticle, TravelArticle, TravelArticle] };

function buildLayoutGroups(articles: TravelArticle[]): LayoutGroup[] {
  const groups: LayoutGroup[] = [];
  const sequence = ["feature", "two-col", "three-col"] as const;
  let seq = 0; let i = 0;
  while (i < articles.length) {
    const remaining = articles.length - i;
    if (sequence[seq] === "feature") { groups.push({ type: "feature", articles: [articles[i]] } as LayoutGroup); i += 1; }
    else if (sequence[seq] === "two-col") {
      if (remaining >= 2) { groups.push({ type: "two-col", articles: [articles[i], articles[i + 1]] } as LayoutGroup); i += 2; }
      else { groups.push({ type: "feature", articles: [articles[i]] } as LayoutGroup); i += 1; }
    } else {
      if (remaining >= 3) { groups.push({ type: "three-col", articles: [articles[i], articles[i + 1], articles[i + 2]] } as LayoutGroup); i += 3; }
      else if (remaining === 2) { groups.push({ type: "two-col", articles: [articles[i], articles[i + 1]] } as LayoutGroup); i += 2; }
      else { groups.push({ type: "feature", articles: [articles[i]] } as LayoutGroup); i += 1; }
    }
    seq = (seq + 1) % 3;
  }
  return groups;
}

function SubcategoryTag({ subcategory }: { subcategory: string }) {
  return <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-medium font-sans" style={{ color: C.bronze }}>{SUBCATEGORY_LABELS[subcategory] || subcategory.toUpperCase()}</span>;
}

function ReadMoreArrow() {
  return <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium font-sans transition-colors duration-300 group-hover:text-[#8A7352]" style={{ color: C.bronze, borderBottom: `1px solid rgba(184,164,122,0.5)`, paddingBottom: 2 }}>Read Story →</span>;
}

function FeatureCard({ article }: { article: TravelArticle }) {
  return (
    <Link href={`/travel/${article.slug}`} className="group block">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[480px] overflow-hidden">
          <Image src={article.heroImage} alt={article.headline} fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover group-hover:scale-[1.03] transition-transform duration-1000 ease-in-out" />
        </div>
        <div className="lg:col-span-5 flex items-center p-8 sm:p-10 md:p-14 lg:p-16" style={{ background: C.cream }}>
          <div className="space-y-4 sm:space-y-5">
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.24em] font-medium font-sans" style={{ color: C.bronze }}>{article.category} · {article.country}</span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif leading-[1.08] transition-colors duration-300 group-hover:text-[#8A7352]" style={{ color: C.textDeep, fontWeight: 400 }}>{article.headline}</h3>
            <p className="text-sm sm:text-base font-sans leading-relaxed max-w-md" style={{ color: C.textStone, fontWeight: 400 }}>{article.subtitle}</p>
            <div className="flex items-center gap-4 pt-1">
              <span className="text-xs font-sans font-light" style={{ color: C.textStone }}>{article.readTime}</span>
              <ReadMoreArrow />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function TwoColumnCard({ article }: { article: TravelArticle }) {
  return (
    <Link href={`/travel/${article.slug}`} className="group flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden mb-4">
        <Image src={article.heroImage} alt={article.headline} fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-[1.03] transition-transform duration-1000 ease-in-out" />
      </div>
      <SubcategoryTag subcategory={article.editorialSubcategory} />
      <h3 className="text-xl sm:text-2xl font-serif leading-tight mt-1.5 mb-2 transition-colors duration-300 group-hover:text-[#8A7352]" style={{ color: C.textDeep, fontWeight: 400 }}>{article.headline}</h3>
      <span className="text-[10px] sm:text-[11px] font-sans font-light mt-auto" style={{ color: C.textStone }}>{article.readTime}</span>
    </Link>
  );
}

function ThreeColumnCard({ article }: { article: TravelArticle }) {
  return (
    <Link href={`/travel/${article.slug}`} className="group flex flex-col">
      <div className="relative aspect-[3/4] overflow-hidden mb-4">
        <Image src={article.heroImage} alt={article.headline} fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-[1.03] transition-transform duration-1000 ease-in-out" />
      </div>
      <SubcategoryTag subcategory={article.editorialSubcategory} />
      <h3 className="text-lg sm:text-xl font-serif leading-tight mt-1.5 mb-2 transition-colors duration-300 group-hover:text-[#8A7352]" style={{ color: C.textDeep, fontWeight: 400 }}>{article.headline}</h3>
      <p className="text-xs sm:text-sm font-sans leading-relaxed flex-1 line-clamp-3" style={{ color: C.textStone, fontWeight: 400 }}>{article.subtitle}</p>
      <span className="text-[10px] font-sans font-light mt-3" style={{ color: C.textStone }}>{article.readTime}</span>
    </Link>
  );
}

export default function TravelEditorialFeed() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const articles = useMemo(() => filterAndSortArticles(activeFilter), [activeFilter]);
  const layoutGroups = useMemo(() => buildLayoutGroups(articles), [articles]);
  const filterCounts = useMemo(() => {
    const all = allArticles.filter((a) => a.editorialSection === "travel");
    return { all: all.length, palaces: all.filter((a) => a.editorialSubcategory === "hotels").length, destinations: all.filter((a) => a.editorialSubcategory === "destinations").length, hospitality: all.filter((a) => a.editorialSubcategory === "luxury-hospitality").length };
  }, []);

  return (
    <>
      {/* Filter bar */}
      <section className="py-8 sm:py-10" style={{ borderBottom: `1px solid rgba(138,115,82,0.15)` }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="flex flex-wrap gap-3 sm:gap-6 justify-center">
            {FILTERS.map((f) => (
              <button key={f.key} type="button" onClick={() => setActiveFilter(f.key)}
                className="text-[10px] sm:text-xs uppercase tracking-[0.18em] font-medium font-sans pb-1.5 transition-colors duration-300"
                style={{ color: activeFilter === f.key ? C.bronze : C.textStone, borderBottom: activeFilter === f.key ? `1px solid ${C.bronze}` : "1px solid transparent" }}
              >
                {f.label} <span className="font-light" style={{ color: C.textStone }}>({filterCounts[f.key]})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial feed */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {articles.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-sans text-lg mb-4" style={{ color: C.textStone, fontWeight: 400 }}>No stories in this category yet.</p>
              <button type="button" onClick={() => setActiveFilter("all")}
                className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium font-sans transition-colors duration-300" style={{ color: C.bronze, borderBottom: `1px solid rgba(184,164,122,0.5)`, paddingBottom: 2 }}>
                View All Stories →
              </button>
            </div>
          ) : (
            <div className="space-y-16 sm:space-y-20 md:space-y-24">
              {layoutGroups.map((group, gi) => (
                <div key={`${group.type}-${gi}`}>
                  {group.type === "feature" && <FeatureCard article={group.articles[0]} />}
                  {group.type === "two-col" && <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">{group.articles.map((article) => <TwoColumnCard key={article.slug} article={article} />)}</div>}
                  {group.type === "three-col" && <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">{group.articles.map((article) => <ThreeColumnCard key={article.slug} article={article} />)}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
