"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { allStyleArticles, type StyleArticle } from "@/lib/style-articles";

const C = {
  obsidian: "#11110F",
  ivory: "#F4F0E7",
  cream: "#EAE3D5",
  bronze: "#8A7352",
  champagne: "#B8A47A",
  textDeep: "#181714",
  textStone: "#9B9589",
};

const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy93My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNkZGRkZGQiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

type FilterKey = "all" | "fashion" | "couture" | "jewellery" | "watches" | "beauty" | "accessories" | "royal-style" | "weddings" | "brand-strategy" | "craftsmanship";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "ALL" },
  { key: "fashion", label: "FASHION" },
  { key: "couture", label: "COUTURE" },
  { key: "jewellery", label: "JEWELLERY" },
  { key: "royal-style", label: "ROYAL STYLE" },
  { key: "weddings", label: "WEDDINGS" },
  { key: "craftsmanship", label: "CRAFTSMANSHIP" },
  { key: "brand-strategy", label: "BRAND STRATEGY" },
];

function filterArticles(filter: FilterKey): StyleArticle[] {
  if (filter === "all") return [...allStyleArticles];
  return allStyleArticles.filter((a) => {
    const cat = a.category.toLowerCase().replace(/\s+/g, "-");
    return cat === filter;
  });
}

function CategoryTag({ label }: { label: string }) {
  return (
    <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.bronze }}>
      {label}
    </span>
  );
}

function ReadMore() {
  return (
    <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium font-sans transition-colors duration-300 group-hover:text-[#8A7352]" style={{ color: C.bronze, borderBottom: `1px solid rgba(184,164,122,0.5)`, paddingBottom: 2 }}>
      Read Story →
    </span>
  );
}

/* ── Feature Card (full-width hero-style) ──────── */
function FeatureCard({ article }: { article: StyleArticle }) {
  return (
    <Link href={`/style/${article.slug}`} className="group block">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto lg:min-h-[520px] overflow-hidden">
          <Image src={article.heroImage} alt={article.headline} fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:1024px)100vw,58vw" className="object-cover group-hover:scale-[1.03] transition-transform duration-1000 ease-in-out" />
        </div>
        <div className="lg:col-span-5 flex items-center p-8 sm:p-10 md:p-14 lg:p-16" style={{ background: C.cream }}>
          <div className="space-y-4 sm:space-y-5">
            <CategoryTag label={article.category} />
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif leading-[1.08] transition-colors duration-300 group-hover:text-[#8A7352]" style={{ color: C.textDeep, fontWeight: 400 }}>
              {article.headline}
            </h3>
            <p className="text-sm sm:text-base font-sans leading-relaxed max-w-md" style={{ color: C.textStone, fontWeight: 400 }}>
              {article.subtitle}
            </p>
            <div className="flex items-center gap-4 pt-1">
              <span className="text-xs font-sans font-light" style={{ color: C.textStone }}>{article.readTime}</span>
              <ReadMore />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ── Two-Column Card ──────────────────────────── */
function TwoColumnCard({ article }: { article: StyleArticle }) {
  return (
    <Link href={`/style/${article.slug}`} className="group flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden mb-4">
        <Image src={article.heroImage} alt={article.headline} fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:768px)100vw,50vw" className="object-cover group-hover:scale-[1.03] transition-transform duration-1000 ease-in-out" />
      </div>
      <CategoryTag label={article.category} />
      <h3 className="text-xl sm:text-2xl font-serif leading-tight mt-1.5 mb-2 transition-colors duration-300 group-hover:text-[#8A7352]" style={{ color: C.textDeep, fontWeight: 400 }}>
        {article.headline}
      </h3>
      <p className="text-xs sm:text-sm font-sans leading-relaxed flex-1 line-clamp-3" style={{ color: C.textStone, fontWeight: 400 }}>
        {article.subtitle}
      </p>
      <span className="text-[10px] sm:text-[11px] font-sans font-light mt-3" style={{ color: C.textStone }}>{article.readTime}</span>
    </Link>
  );
}

/* ── Three-Column Card ────────────────────────── */
function ThreeColumnCard({ article }: { article: StyleArticle }) {
  return (
    <Link href={`/style/${article.slug}`} className="group flex flex-col">
      <div className="relative aspect-[3/4] overflow-hidden mb-4">
        <Image src={article.heroImage} alt={article.headline} fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:768px)100vw,33vw" className="object-cover group-hover:scale-[1.03] transition-transform duration-1000 ease-in-out" />
      </div>
      <CategoryTag label={article.category} />
      <h3 className="text-lg sm:text-xl font-serif leading-tight mt-1.5 mb-2 transition-colors duration-300 group-hover:text-[#8A7352]" style={{ color: C.textDeep, fontWeight: 400 }}>
        {article.headline}
      </h3>
      <p className="text-xs sm:text-sm font-sans leading-relaxed flex-1 line-clamp-3" style={{ color: C.textStone, fontWeight: 400 }}>
        {article.subtitle}
      </p>
      <span className="text-[10px] font-sans font-light mt-3" style={{ color: C.textStone }}>{article.readTime}</span>
    </Link>
  );
}

/* ── Pull Quote Break ─────────────────────────── */
function QuoteBreak({ quote, context }: { quote: string; context: string }) {
  return (
    <div className="py-12 sm:py-16 md:py-20 px-6 sm:px-8 text-center max-w-3xl mx-auto">
      <div className="mb-6 mx-auto" style={{ width: 64, height: 1, background: "rgba(138,115,82,0.35)" }} />
      <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif leading-[1.25] mb-4" style={{ color: C.textDeep, fontWeight: 400 }}>
        &ldquo;{quote}&rdquo;
      </blockquote>
      <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-sans font-medium" style={{ color: C.bronze }}>
        {context}
      </p>
      <div className="mt-6 mx-auto" style={{ width: 64, height: 1, background: "rgba(138,115,82,0.35)" }} />
    </div>
  );
}

/* ── Full-Width Image Break ──────────────────── */
function FullWidthImage({ article }: { article: StyleArticle }) {
  return (
    <Link href={`/style/${article.slug}`} className="group block relative">
      <div className="relative aspect-[21/9] lg:aspect-[21/8] overflow-hidden">
        <Image src={article.heroImage} alt={article.headline} fill placeholder="blur" blurDataURL={blurDataURL} sizes="100vw" className="object-cover group-hover:scale-[1.02] transition-transform duration-1000 ease-in-out" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(17,17,15,0.75), transparent 60%)" }} />
        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 md:p-16">
          <CategoryTag label={article.category} />
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif leading-[1.08] mt-3 mb-3 transition-colors duration-300 group-hover:text-[#B8A47A]" style={{ color: C.ivory, fontWeight: 400 }}>
            {article.headline}
          </h3>
          <span className="text-xs sm:text-sm font-sans" style={{ color: C.textStone }}>{article.readTime}</span>
        </div>
      </div>
    </Link>
  );
}

/* ── MAIN EDITORIAL FEED ──────────────────────── */
export default function StyleEditorialFeed() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const articles = useMemo(() => filterArticles(activeFilter), [activeFilter]);

  const filterCounts = useMemo(() => {
    const counts: Record<FilterKey, number> = { all: 0, fashion: 0, couture: 0, jewellery: 0, watches: 0, beauty: 0, accessories: 0, "royal-style": 0, weddings: 0, "brand-strategy": 0, craftsmanship: 0 };
    counts.all = allStyleArticles.length;
    allStyleArticles.forEach((a) => {
      const cat = a.category.toLowerCase().replace(/\s+/g, "-") as FilterKey;
      if (cat in counts) counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, []);

  // Build layout: first article as feature, then alternating patterns
  const buildLayout = () => {
    if (articles.length === 0) return null;
    const remaining = articles.slice(1);
    const groups: { type: "two-col" | "three-col"; articles: StyleArticle[] }[] = [];

    let i = 0;
    while (i < remaining.length) {
      if (i % 5 === 0 || i % 5 === 3) {
        // Two-column
        if (remaining.length - i >= 2) {
          groups.push({ type: "two-col", articles: [remaining[i], remaining[i + 1]] });
          i += 2;
        } else {
          groups.push({ type: "two-col", articles: [remaining[i]] });
          i += 1;
        }
      } else {
        // Three-column
        const take = Math.min(3, remaining.length - i);
        groups.push({ type: "three-col", articles: remaining.slice(i, i + take) });
        i += take;
      }
    }
    return groups;
  };

  const groups = useMemo(() => buildLayout(), [articles]);

  // Featured article is the first
  const featured = articles[0];
  // Pick one article for full-width break (middle of the list)
  const fullWidthArticle = articles.length > 5 ? articles[5] : null;
  // Pick a quote from some article
  const quoteArticle = articles.length > 3 ? articles[3] : articles[0];

  return (
    <>
      {/* ── Filter Bar ──────────────────────────── */}
      <section className="py-8 sm:py-10" style={{ borderBottom: `1px solid rgba(138,115,82,0.15)` }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="flex flex-wrap gap-3 sm:gap-5 justify-center">
            {FILTERS.filter((f) => filterCounts[f.key] > 0).map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setActiveFilter(f.key)}
                className="text-[10px] sm:text-xs uppercase tracking-[0.18em] font-medium font-sans pb-1.5 transition-colors duration-300"
                style={{
                  color: activeFilter === f.key ? C.bronze : C.textStone,
                  borderBottom: activeFilter === f.key ? `1px solid ${C.bronze}` : "1px solid transparent",
                }}
              >
                {f.label} <span className="font-light" style={{ color: C.textStone }}>({filterCounts[f.key] || 0})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Editorial Feed ──────────────────────── */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {articles.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-sans text-lg mb-4" style={{ color: C.textStone, fontWeight: 400 }}>No stories in this category yet.</p>
              <button type="button" onClick={() => setActiveFilter("all")} className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium font-sans transition-colors duration-300" style={{ color: C.bronze, borderBottom: `1px solid rgba(184,164,122,0.5)`, paddingBottom: 2 }}>
                View All Stories →
              </button>
            </div>
          ) : (
            <div className="space-y-16 sm:space-y-20 md:space-y-24">
              {/* Featured Story */}
              {featured && <FeatureCard article={featured} />}

              {/* Quote Break */}
              {quoteArticle?.pullQuotes?.[0] && (
                <QuoteBreak quote={quoteArticle.pullQuotes[0].quote} context={quoteArticle.pullQuotes[0].context} />
              )}

              {/* Layout Groups */}
              {groups?.map((group, gi) => (
                <div key={`${group.type}-${gi}`}>
                  {group.type === "two-col" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                      {group.articles.map((article) => (
                        <TwoColumnCard key={article.slug} article={article} />
                      ))}
                    </div>
                  )}
                  {group.type === "three-col" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                      {group.articles.map((article) => (
                        <ThreeColumnCard key={article.slug} article={article} />
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Full-Width Break */}
              {fullWidthArticle && fullWidthArticle !== featured && (
                <FullWidthImage article={fullWidthArticle} />
              )}

              {/* Second Quote Break */}
              {articles.length > 6 && articles[6]?.pullQuotes?.[0] && (
                <QuoteBreak quote={articles[6].pullQuotes[0].quote} context={articles[6].pullQuotes[0].context} />
              )}
            </div>
          )}

          {/* Empty state after filter */}
        </div>
      </section>
    </>
  );
}
