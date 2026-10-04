import Image from "next/image";
import Link from "next/link";
import { C, blurDataURL } from "@/lib/design-tokens";
import { EditorialQuote, LuxuryDivider } from "@/app/components/editorial";
import { getRelated, getTOC } from "@/lib/editorial/registry";
import { SECTIONS } from "@/lib/editorial/sections";
import type { EditorialArticle, SectionConfig } from "@/lib/editorial/types";

const SITE = "https://theroyalgallerys.com";

/* ── Render article content (paragraphs + **bold**) ─── */
function renderContent(text: string): React.ReactNode[] {
  return text.split("\n\n").map((para, i) => {
    const trimmed = para.trim();
    if (!trimmed) return null;
    if (trimmed.includes("**")) {
      const parts = trimmed.split(/(\*\*.*?\*\*)/);
      return (
        <p key={i} className="text-base sm:text-lg font-sans leading-relaxed mb-5" style={{ color: C.textDeep, fontWeight: 400 }}>
          {parts.map((part, j) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return <strong key={j} style={{ color: C.textDeep, fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
            }
            return <span key={j}>{part}</span>;
          })}
        </p>
      );
    }
    return (
      <p key={i} className="text-base sm:text-lg font-sans leading-relaxed mb-5" style={{ color: C.textDeep, fontWeight: 400 }}>
        {trimmed}
      </p>
    );
  });
}

/* ── Structured data ─────────────────────────────── */
function articleSchema(article: EditorialArticle, section: SectionConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.headline,
    description: article.seoDescription,
    author: { "@type": "Person", name: article.authorName },
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate || article.publishedDate,
    image: `${SITE}${article.heroImage}`,
    publisher: { "@type": "Organization", name: "The Royal Gallerys", url: SITE },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/${section.slug}/${article.slug}` },
  };
}

function breadcrumbSchema(article: EditorialArticle, section: SectionConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: section.label, item: `${SITE}/${section.slug}` },
      { "@type": "ListItem", position: 3, name: article.headline, item: `${SITE}/${section.slug}/${article.slug}` },
    ],
  };
}

/* ── PAGE ─────────────────────────────────────────── */
export default function ArticlePage({ section, article }: { section: SectionConfig; article: EditorialArticle }) {
  const relatedArticles = getRelated(section.slug, article.relatedSlugs);
  const toc = getTOC(article.sections);

  // Cross-section navigation — the sibling editorial sections.
  const sectionLinks = [
    { href: "/style", label: "Style" },
    { href: "/travel", label: "Travel" },
    ...SECTIONS.filter((s) => s.slug !== section.slug).map((s) => ({ href: `/${s.slug}`, label: s.label })),
  ];

  return (
    <div style={{ background: C.ivory }}>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(article, section)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(article, section)) }} />

      {/* ════════ HERO BANNER ════════ */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-end">
        <div className="absolute inset-0">
          <Image src={article.heroImage} alt={article.headline} fill priority placeholder="blur" blurDataURL={blurDataURL} className="object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(17,17,15,0.92), rgba(17,17,15,0.35), rgba(17,17,15,0.55))" }} />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pb-12 sm:pb-16 md:pb-20 pt-32">
          <nav className="mb-6 sm:mb-8" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[9px] sm:text-[10px] uppercase tracking-[0.18em] font-sans">
              <li><Link href="/" className="transition-colors duration-300" style={{ color: C.champagne }}>Home</Link></li>
              <li style={{ color: "rgba(244,240,231,0.3)" }}>/</li>
              <li><Link href={`/${section.slug}`} className="transition-colors duration-300" style={{ color: C.champagne }}>{section.label}</Link></li>
              <li style={{ color: "rgba(244,240,231,0.3)" }}>/</li>
              <li style={{ color: "rgba(244,240,231,0.6)" }}>{article.category}</li>
            </ol>
          </nav>

          <span className="inline-block text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-medium font-sans mb-4 px-3 py-1.5" style={{ color: C.champagne, border: "1px solid rgba(184,164,122,0.3)" }}>
            {article.category}
          </span>

          <h1 className="text-[clamp(1.8rem,4vw,3.8rem)] font-serif leading-[1.08] mb-5 sm:mb-6 tracking-tight max-w-4xl" style={{ color: C.ivory, fontWeight: 400 }}>
            {article.headline}
          </h1>

          <p className="text-sm sm:text-base md:text-lg font-sans leading-relaxed max-w-2xl mb-6 sm:mb-8" style={{ color: "rgba(244,240,231,0.7)", fontWeight: 400 }}>
            {article.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-[10px] sm:text-xs font-sans" style={{ color: "rgba(244,240,231,0.5)" }}>
            <span style={{ color: C.champagne }}>{article.authorName}</span>
            <span>·</span>
            <span>{article.authorRole}</span>
            <span>·</span>
            <time dateTime={article.publishedDate}>{new Date(article.publishedDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </section>

      {/* ════════ ARTICLE BODY ════════ */}
      <article className="py-16 sm:py-20 md:py-28 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Sidebar — TOC + Tags */}
            <aside className="lg:col-span-3 order-2 lg:order-1">
              <div className="lg:sticky lg:top-28 space-y-8">
                <div>
                  <h4 className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-semibold font-sans mb-5" style={{ color: C.bronze }}>
                    In This Article
                  </h4>
                  <nav>
                    <ul className="space-y-3">
                      {toc.map((item) => (
                        <li key={item.id}>
                          <a href={`#${item.id}`} className="text-xs sm:text-sm font-serif leading-tight block transition-colors duration-300" style={{ color: C.textStone, fontWeight: 400 }}>
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>

                <div>
                  <h4 className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-semibold font-sans mb-3" style={{ color: C.bronze }}>Topics</h4>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span key={tag} className="text-[9px] sm:text-[10px] font-sans px-3 py-1.5" style={{ background: C.cream, color: C.textStone }}>
                        {tag.replace(/-/g, " ").toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="mb-12 sm:mb-16">
                <LuxuryDivider />
              </div>

              {article.sections.map((s, idx) => (
                <div key={s.id} id={s.id} className="mb-14 sm:mb-18">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif leading-[1.12] mb-6 sm:mb-8" style={{ color: C.textDeep, fontWeight: 400 }}>
                    {s.heading}
                  </h2>
                  <div className="space-y-1">{renderContent(s.content)}</div>

                  {idx === 0 && article.pullQuotes[0] && (
                    <div className="my-12 sm:my-14">
                      <EditorialQuote attribution={article.pullQuotes[0].context}>{article.pullQuotes[0].quote}</EditorialQuote>
                    </div>
                  )}

                  {idx === 1 && article.imageBreaks[0] && (
                    <figure className="my-12 sm:my-14">
                      <div className="relative aspect-[16/9] overflow-hidden mb-3">
                        <Image src={article.imageBreaks[0].image} alt={article.imageBreaks[0].alt} fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:1024px)100vw,50vw" className="object-cover" />
                      </div>
                      <figcaption className="text-[9px] sm:text-[10px] font-sans italic text-center" style={{ color: C.textStone }}>
                        {article.imageBreaks[0].caption}
                      </figcaption>
                    </figure>
                  )}

                  {idx === 2 && article.pullQuotes[1] && (
                    <div className="my-12 sm:my-14">
                      <EditorialQuote attribution={article.pullQuotes[1].context}>{article.pullQuotes[1].quote}</EditorialQuote>
                    </div>
                  )}

                  {idx === 3 && article.imageBreaks[1] && (
                    <figure className="my-12 sm:my-14">
                      <div className="relative aspect-[16/9] overflow-hidden mb-3">
                        <Image src={article.imageBreaks[1].image} alt={article.imageBreaks[1].alt} fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:1024px)100vw,50vw" className="object-cover" />
                      </div>
                      <figcaption className="text-[9px] sm:text-[10px] font-sans italic text-center" style={{ color: C.textStone }}>
                        {article.imageBreaks[1].caption}
                      </figcaption>
                    </figure>
                  )}
                </div>
              ))}

              {/* THE ROYAL GALLERYS VIEW */}
              <div className="my-14 sm:my-18 p-8 sm:p-10 md:p-14" style={{ background: C.cream }}>
                <span className="inline-block text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-semibold font-sans mb-5" style={{ color: C.bronze }}>
                  The Royal Gallerys View
                </span>
                <p className="text-base sm:text-lg md:text-xl font-serif leading-[1.3] mb-4" style={{ color: C.textDeep, fontWeight: 400 }}>
                  THE ROYAL GALLERYS is the international magazine for heritage, culture and luxury — documenting the people, places and ideas shaping the worlds of royalty, jewellery, design, travel and contemporary life. Our editorial authority rests on deep engagement with India&apos;s cultural ecosystem and a commitment to telling the stories that matter.
                </p>
                <p className="text-sm font-sans leading-relaxed" style={{ color: C.textStone, fontWeight: 400 }}>
                  For editorial inquiries, story proposals, and partnership discussions, contact our editors at{" "}
                  <a href="mailto:hey.theroyalgallerys@gmail.com" className="transition-colors duration-300" style={{ color: C.bronze, textDecoration: "underline", textUnderlineOffset: "2px" }}>
                    hey.theroyalgallerys@gmail.com
                  </a>
                  .
                </p>
              </div>

              {/* Author Bio */}
              <div className="flex items-start gap-5 p-6 sm:p-8" style={{ border: `1px solid rgba(138,115,82,0.15)` }}>
                <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-full flex items-center justify-center text-xl font-serif" style={{ background: C.cream, color: C.bronze }}>
                  TRG
                </div>
                <div>
                  <p className="text-sm sm:text-base font-serif mb-1" style={{ color: C.textDeep, fontWeight: 600 }}>
                    {article.authorName}
                  </p>
                  <p className="text-xs sm:text-sm font-sans leading-relaxed" style={{ color: C.textStone, fontWeight: 400 }}>
                    {article.authorRole}. THE ROYAL GALLERYS is the international magazine for heritage, culture and luxury — editorial authority on the people, places and ideas shaping our world.
                  </p>
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="lg:col-span-3 order-3">
              <div className="lg:sticky lg:top-28 space-y-10">
                <div>
                  <h4 className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-semibold font-sans mb-5" style={{ color: C.bronze }}>
                    Part of {section.label}
                  </h4>
                  <p className="text-xs sm:text-sm font-sans leading-relaxed mb-4" style={{ color: C.textStone, fontWeight: 400 }}>
                    This article is part of THE ROYAL GALLERYS {section.label} section — our international editorial destination for {section.label.toLowerCase()}, heritage and luxury.
                  </p>
                  <Link href={`/${section.slug}`} className="text-[10px] sm:text-xs uppercase tracking-[0.18em] font-medium font-sans transition-colors duration-300" style={{ color: C.bronze, borderBottom: `1px solid rgba(184,164,122,0.4)`, paddingBottom: 2 }}>
                    Explore All {section.label} Stories →
                  </Link>
                </div>

                {relatedArticles.length > 0 && (
                  <div>
                    <h4 className="text-[9px] sm:text-[10px] uppercase tracking-[0.22em] font-semibold font-sans mb-5" style={{ color: C.bronze }}>
                      Related Stories
                    </h4>
                    <div className="space-y-5">
                      {relatedArticles.map((rel) => (
                        <Link key={rel.slug} href={`/${section.slug}/${rel.slug}`} className="group block">
                          <div className="relative aspect-[16/10] overflow-hidden mb-2.5">
                            <Image src={rel.heroImage} alt={rel.headline} fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:1024px)25vw,20vw" className="object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                          </div>
                          <span className="text-[8px] uppercase tracking-[0.18em] font-medium font-sans" style={{ color: C.bronze }}>{rel.category}</span>
                          <h5 className="text-sm font-serif leading-tight mt-1 transition-colors duration-300 group-hover:text-[#8A7352]" style={{ color: C.textDeep, fontWeight: 400 }}>
                            {rel.headline}
                          </h5>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* ════════ RELATED STORIES GRID ════════ */}
      {relatedArticles.length > 0 && (
        <section className="py-16 sm:py-24 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.cream }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <span className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-medium font-sans mb-4" style={{ color: C.bronze }}>
                Continue Reading
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif leading-[1.1] tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>
                Related Stories
              </h2>
              <div className="mt-6 mx-auto" style={{ width: 64, height: 1, background: "rgba(138,115,82,0.35)" }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {relatedArticles.map((rel) => (
                <Link key={rel.slug} href={`/${section.slug}/${rel.slug}`} className="group flex flex-col">
                  <div className="relative aspect-[3/4] overflow-hidden mb-4">
                    <Image src={rel.heroImage} alt={rel.headline} fill placeholder="blur" blurDataURL={blurDataURL} sizes="(max-width:768px)100vw,33vw" className="object-cover group-hover:scale-[1.03] transition-transform duration-1000 ease-in-out" />
                  </div>
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-medium font-sans" style={{ color: C.bronze }}>{rel.category}</span>
                  <h3 className="text-lg sm:text-xl font-serif leading-tight mt-1.5 mb-2 transition-colors duration-300 group-hover:text-[#8A7352]" style={{ color: C.textDeep, fontWeight: 400 }}>
                    {rel.headline}
                  </h3>
                  <span className="text-[10px] sm:text-[11px] font-sans font-light" style={{ color: C.textStone }}>{rel.readTime}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════ CROSS-SECTION NAVIGATION ════════ */}
      <section className="py-16 sm:py-24 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.ivory }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-medium font-sans mb-4" style={{ color: C.bronze }}>
              Discover More
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif leading-[1.1] tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>
              Explore The Royal Gallerys
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {sectionLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[10px] sm:text-xs uppercase tracking-[0.2em] font-medium font-sans px-5 py-2.5 transition-all duration-300"
                style={{ color: C.textStone, border: `1px solid rgba(138,115,82,0.2)`, background: C.cream }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ PARTNERSHIP CTA ════════ */}
      <section className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.obsidian }}>
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-medium font-sans mb-6" style={{ color: C.champagne }}>
            Your Brand Has a Story
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif leading-[1.1] mb-8 tracking-tight" style={{ color: C.ivory, fontWeight: 400 }}>
            Put It in Front of the<br />Right Audience.
          </h2>
          <p className="text-sm sm:text-base font-sans leading-relaxed max-w-xl mx-auto mb-10" style={{ color: C.textStone, fontWeight: 400 }}>
            For luxury brands, hospitality groups, designers and cultural institutions seeking to connect with the world&apos;s most sophisticated audience — THE ROYAL GALLERYS offers an editorial environment where your story reaches the decision-makers who matter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/advertise"
              className="inline-block text-[11px] sm:text-xs uppercase tracking-[0.22em] font-medium font-sans px-10 sm:px-12 py-3.5 transition-all duration-500"
              style={{ color: C.ivory, border: "1px solid rgba(184,164,122,0.4)" }}
            >
              Request Media Kit →
            </Link>
            <Link
              href="/advertise"
              className="inline-block text-[11px] sm:text-xs uppercase tracking-[0.22em] font-medium font-sans px-10 sm:px-12 py-3.5 transition-all duration-500"
              style={{ color: C.champagne, border: "1px solid rgba(184,164,122,0.25)" }}
            >
              Discuss a Partnership →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
