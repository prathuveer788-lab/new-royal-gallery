import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PhotoPlaceholder,
  PhotoFigure,
  EditorialQuote,
  FactBox,
  LuxuryDivider,
  TravelTipBox,
  FAQAccordion,
  ItineraryCard,
  HotelCard,
  ArticleTOC,
  ReadingProgress,
} from "@/app/components/editorial";
import NewsletterForm from "@/app/components/NewsletterForm";

const C = {
  obsidian: "#11110F",
  charcoal: "#1C1B18",
  forest: "#17261F",
  ivory: "#F4F0E7",
  cream: "#EAE3D5",
  textDeep: "#181714",
  textStone: "#9B9589",
  bronze: "#8A7352",
  champagne: "#B8A47A",
};

// ── We'll import the article content from the content files ──
// For now this serves as the editorial page template
// Each article's full content will be loaded dynamically

const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNkZGRkZGQiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

// ── Generate static params for all articles ──────────
export async function generateStaticParams() {
  // Import dynamically to avoid circular deps
  const { allArticles } = await import("@/lib/travel-articles");
  return allArticles.map((a) => ({ slug: a.slug }));
}

// ── Generate metadata per article ────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { allArticles } = await import("@/lib/travel-articles");
  const article = allArticles.find((a) => a.slug === slug);
  if (!article) return { title: "Article Not Found" };

  const fullImageUrl = article.heroImage.startsWith("http")
    ? article.heroImage
    : `https://theroyalgallerys.com${article.heroImage}`;
  const canonicalUrl = `https://theroyalgallerys.com/travel/${slug}`;

  return {
    title: article.seoTitle,
    description: article.seoDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: article.ogTitle,
      description: article.ogDescription,
      url: canonicalUrl,
      type: "article",
      siteName: "The Royal Gallerys",
      publishedTime: article.publishedDate,
      authors: [article.authorName],
      images: [{ url: fullImageUrl, width: 1200, height: 630, alt: article.ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@theroyalgallerys",
      creator: "@theroyalgallerys",
      title: article.ogTitle,
      description: article.ogDescription,
      images: [fullImageUrl],
    },
  };
}

// ── Content Section Renderer ─────────────────────────
function renderTextWithLinks(text: string): React.ReactNode[] {
  if (!text.includes("[[LINK:")) return [text];
  const parts = text.split(/(\[\[LINK:.+?\|.+?\]\])/);
  return parts.map((part, idx) => {
    const linkMatch = part.match(/^\[\[LINK:(.+?)\|(.+?)\]\]$/);
    if (linkMatch) {
      return (
        <a key={idx} href={linkMatch[1]} style={{ color: C.bronze, textDecoration: "underline", textDecorationColor: C.champagne, textUnderlineOffset: "2px", textDecorationThickness: "1px" }} >
          {linkMatch[2]}
        </a>
      );
    }
    return <span key={idx}>{part}</span>;
  });
}

function renderContent(content: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const lines = content.split("\n");
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Photo: [[PHOTO:orientation|src|caption|imageDetail|photographer]]
    // Legacy format: [[PHOTO:orientation|caption]]
    const photoMatch = line.match(/^\[\[PHOTO:(landscape|portrait|square|wide|full-width)\|(.+)\]\]$/);
    if (photoMatch) {
      const orientation = photoMatch[1] as "landscape" | "portrait" | "square" | "wide" | "full-width";
      const parts = photoMatch[2].split("|");

      // Check if extended format with src URL (starts with /images or https://)
      if (parts.length >= 3 && (parts[0].startsWith("/images") || parts[0].startsWith("https://"))) {
        const src = parts[0];
        const caption = parts[1] || "";
        const imageDetail = parts[2] || undefined;
        const photographer = parts[3] || undefined;
        nodes.push(
          <PhotoFigure
            key={key++}
            src={src}
            alt={caption}
            caption={caption}
            imageDetail={imageDetail}
            photographer={photographer}
            orientation={orientation}
          />
        );
      } else {
        // Legacy format: just caption, no src
        nodes.push(
          <PhotoPlaceholder
            key={key++}
            orientation={orientation}
            caption={photoMatch[2]}
          />
        );
      }
      i++;
      continue;
    }

    // Pull quote: [[QUOTE:text|attribution|role]]
    const quoteMatch = line.match(/^\[\[QUOTE:(.+?)(?:\|(.+?))?(?:\|(.+?))?\]\]$/);
    if (quoteMatch) {
      nodes.push(
        <EditorialQuote
          key={key++}
          attribution={quoteMatch[2] || undefined}
          role={quoteMatch[3] || undefined}
        >
          {quoteMatch[1]}
        </EditorialQuote>
      );
      i++;
      continue;
    }

    // Divider: [[DIVIDER]]
    if (line.trim() === "[[DIVIDER]]") {
      nodes.push(<LuxuryDivider key={key++} />);
      i++;
      continue;
    }

    // Tip box: [[TIP:title|icon]]
    const tipMatch = line.match(/^\[\[TIP:(.+?)(?:\|(.+?))?\]\]$/);
    if (tipMatch) {
      const tipContent: string[] = [];
      i++;
      while (i < lines.length && lines[i].trim() !== "[[/TIP]]") {
        tipContent.push(lines[i]);
        i++;
      }
      i++; // skip closing tag
      nodes.push(
        <TravelTipBox key={key++} title={tipMatch[1]} icon={tipMatch[2] || "💡"}>
          {tipContent.map((t, j) => (
            <p key={j}>{renderTextWithLinks(t)}</p>
          ))}
        </TravelTipBox>
      );
      continue;
    }

    // Subheading
    if (line.startsWith("## ")) {
      const id = line.slice(3).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      nodes.push(
        <h3 key={key++} id={id} className="text-xl sm:text-2xl md:text-3xl font-serif mt-10 sm:mt-12 mb-4 sm:mb-5 leading-tight" style={{ color: C.textDeep, fontWeight: 400 }}>
          {line.slice(3)}
        </h3>
      );
      i++;
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Regular paragraph — collect until next special marker
    if (!line.startsWith("[[") && !line.startsWith("## ") && line.trim() !== "") {
      const paragraphLines: string[] = [];
      while (i < lines.length && lines[i].trim() !== "" && !lines[i].startsWith("[[") && !lines[i].startsWith("## ")) {
        paragraphLines.push(lines[i]);
        i++;
      }
      const paragraphText = paragraphLines.join(" ");
      nodes.push(
        <p key={key++} className="text-sm sm:text-base md:text-lg font-sans font-normal leading-[1.8] mb-5" style={{ color: C.textStone }}>
          {renderTextWithLinks(paragraphText)}
        </p>
      );
      continue;
    }

    i++;
  }

  return nodes;
}

// ── Page Component ───────────────────────────────────
export default async function TravelArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { allArticles } = await import("@/lib/travel-articles");
  const article = allArticles.find((a) => a.slug === slug);

  if (!article) notFound();

  // For articles that have their full content loaded from content files
  let sections = article.sections;
  let fullContent: React.ReactNode[] = [];

  // Try to load detailed article content
  try {
    const contentModule = await import(`@/lib/content/${slug}`);
    sections = contentModule.articleSections || article.sections;
    if (contentModule.articleContent) {
      fullContent = renderContent(contentModule.articleContent);
    }
  } catch {
    // Article content file not yet created — show placeholder
  }

  const toc = sections.length > 0
    ? sections.map((s) => ({ id: s.id, label: s.heading }))
    : [];

  const siteUrl = "https://theroyalgallerys.com";
  const heroImgUrl = article.heroImage.startsWith("http")
    ? article.heroImage
    : `${siteUrl}${article.heroImage}`;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.headline,
    description: article.seoDescription,
    image: heroImgUrl,
    datePublished: article.publishedDate,
    dateModified: article.publishedDate,
    author: {
      "@type": "Person",
      name: article.authorName,
      jobTitle: article.authorRole,
    },
    publisher: {
      "@type": "Organization",
      name: "The Royal Gallerys",
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/travel/${slug}`,
    },
  };

  const breadcrumbsLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Travel", item: `${siteUrl}/travel` },
      { "@type": "ListItem", position: 3, name: article.headline },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
      />
      <ReadingProgress />

      <article style={{ background: C.ivory }}>
        {/* ══════════ HERO BANNER ══════════ */}
        <header className="relative min-h-[70vh] sm:min-h-[80vh] flex items-end">
          <div className="absolute inset-0">
            <Image
              src={article.heroImage}
              alt={article.headline}
              fill
              priority
              placeholder="blur"
              blurDataURL={blurDataURL}
              className="object-cover"
            />
            <div className="absolute inset-0" style={{ background: "rgba(17,17,15,0.55)" }} />
          </div>
          <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pb-12 sm:pb-16 md:pb-20">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[10px]/[11px] uppercase tracking-[0.22em] mb-6 sm:mb-8 font-sans" style={{ color: "rgba(244,240,231,0.5)" }}>
              <Link href="/" style={{ color: "rgba(244,240,231,0.5)" }} >The Royal Gallerys</Link>
              <span style={{ color: "rgba(244,240,231,0.2)" }}>/</span>
              <Link href="/travel" style={{ color: "rgba(244,240,231,0.5)" }} >Travel</Link>
              {(article.editorialSection && article.editorialSection !== "travel") && (
                <>
                  <span style={{ color: "rgba(244,240,231,0.2)" }}>/</span>
                  <Link href={`/${article.editorialSection}`} className="capitalize" style={{ color: "rgba(244,240,231,0.5)" }} >{article.editorialSection}</Link>
                </>
              )}
              <span style={{ color: "rgba(244,240,231,0.2)" }}>/</span>
              <span style={{ color: "rgba(184,164,122,0.8)" }}>{article.country}</span>
            </div>
            {/* Editorial tags */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-block text-[10px]/[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.champagne }}>
                {article.editorialSubcategory === "hotels" ? "Palace Hotels" : article.category}
              </span>
              {article.tags && article.tags.length > 0 && (
                <>
                  <span style={{ color: "rgba(244,240,231,0.2)" }} className="text-xs">·</span>
                  {article.tags.slice(0, 3).map((t) => (
                    <span key={t} className="text-[9px] uppercase tracking-[0.22em] font-sans font-normal" style={{ color: "rgba(244,240,231,0.4)" }}>{t}</span>
                  ))}
                </>
              )}
            </div>
            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.12] sm:leading-[1.15] mb-4 sm:mb-5 max-w-4xl tracking-tight" style={{ color: C.ivory, fontWeight: 400 }}>
              {article.headline}
            </h1>
            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg font-sans font-normal leading-relaxed max-w-2xl mb-6 sm:mb-8" style={{ color: "rgba(234,227,213,0.9)" }}>
              {article.subtitle}
            </p>
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[10px]/[11px] font-sans font-normal" style={{ color: "rgba(244,240,231,0.6)" }}>
              <span>{article.authorName}</span>
              <span style={{ color: "rgba(244,240,231,0.25)" }}>|</span>
              <span>{article.readTime}</span>
              <span style={{ color: "rgba(244,240,231,0.25)" }}>|</span>
              <time dateTime={article.publishedDate}>
                {new Date(article.publishedDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
          </div>
        </header>

        {/* ══════════ ARTICLE BODY ══════════ */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-20 py-12 sm:py-16 md:py-20">
            {/* Sidebar — TOC (desktop) */}
            <aside className="hidden lg:block lg:w-56 xl:w-64 flex-shrink-0">
              <div className="sticky top-28">
                {toc.length > 0 && <ArticleTOC items={toc} />}

                {/* Quick Facts in sidebar */}
                {article.quickFacts.length > 0 && (
                  <div className="mt-8">
                    <FactBox items={article.quickFacts} title="Quick Facts" />
                  </div>
                )}

                {/* Author bio */}
                <div className="mt-8 pt-6" style={{ borderTop: `1px solid rgba(138,115,82,0.35)` }}>
                  <p className="text-[10px]/[11px] uppercase tracking-[0.22em] font-medium mb-2 font-sans" style={{ color: C.bronze }}>
                    About the Author
                  </p>
                  <p className="text-sm font-serif" style={{ color: C.textDeep, fontWeight: 400 }}>{article.authorName}</p>
                  <p className="text-xs font-sans font-normal mt-0.5" style={{ color: C.textStone }}>{article.authorRole}</p>
                </div>
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 min-w-0 max-w-[720px]">
              {/* Quick Facts (mobile) */}
              <div className="lg:hidden mb-10">
                <FactBox items={article.quickFacts} title="Quick Facts" />
              </div>

              {/* Rendered article content */}
              {fullContent.length > 0 ? (
                <div className="article-content">{fullContent}</div>
              ) : sections.length > 0 ? (
                <div className="article-content">
                  {sections.map((section) => (
                    <section key={section.id} id={section.id} className="mb-8 sm:mb-10">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-serif mb-4 sm:mb-5 leading-tight" style={{ color: C.textDeep, fontWeight: 400 }}>
                        {section.heading}
                      </h2>
                      <div className="text-sm sm:text-base md:text-lg font-sans font-normal leading-[1.8] space-y-5" style={{ color: C.textStone }}>
                        {section.content.split("\n\n").map((p, i) => (
                          <p key={i}>{p}</p>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="font-serif text-lg italic" style={{ color: C.textStone, fontWeight: 400 }}>
                    Full editorial content coming soon.
                  </p>
                  <p className="text-sm mt-2 font-sans font-normal" style={{ color: C.textStone }}>
                    Our travel editors are crafting this luxury guide.
                  </p>
                </div>
              )}

              <LuxuryDivider />

              {/* Itineraries */}
              {(article.itinerary3Day || article.itinerary5Day || article.itinerary7Day) && (
                <section id="itineraries" className="mb-10 sm:mb-12">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-6 sm:mb-8 text-center" style={{ color: C.textDeep, fontWeight: 400 }}>
                    Luxury Itineraries
                  </h2>
                  {article.itinerary3Day && <ItineraryCard plan={article.itinerary3Day} />}
                  {article.itinerary5Day && <ItineraryCard plan={article.itinerary5Day} />}
                  {article.itinerary7Day && <ItineraryCard plan={article.itinerary7Day} />}
                </section>
              )}

              {/* Hotels */}
              {article.hotels.length > 0 && (
                <section id="where-to-stay" className="mb-10 sm:mb-12">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-6 sm:mb-8 text-center" style={{ color: C.textDeep, fontWeight: 400 }}>
                    Where to Stay
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {article.hotels.map((hotel) => (
                      <HotelCard key={hotel.name} {...hotel} />
                    ))}
                  </div>
                </section>
              )}

              {/* Budget */}
              <section id="budget" className="mb-10 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-6 sm:mb-8 text-center" style={{ color: C.textDeep, fontWeight: 400 }}>
                  Approximate Budgets
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr style={{ borderBottom: `1px solid ${C.bronze}` }}>
                        <th className="py-3 pr-4 text-[10px]/[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.textStone }}>Category</th>
                        <th className="py-3 pr-4 text-[10px]/[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.textStone }}>Per Night / Person</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm font-sans font-normal" style={{ color: C.textStone }}>
                      <tr style={{ borderBottom: `1px solid rgba(138,115,82,0.2)` }}>
                        <td className="py-3 pr-4 font-serif" style={{ color: C.textDeep, fontWeight: 400 }}>Budget</td>
                        <td className="py-3 pr-4">{article.budget.budget}</td>
                      </tr>
                      <tr style={{ borderBottom: `1px solid rgba(138,115,82,0.2)` }}>
                        <td className="py-3 pr-4 font-serif" style={{ color: C.textDeep, fontWeight: 400 }}>Mid-Range</td>
                        <td className="py-3 pr-4">{article.budget.midRange}</td>
                      </tr>
                      <tr style={{ borderBottom: `1px solid rgba(138,115,82,0.2)` }}>
                        <td className="py-3 pr-4 font-serif" style={{ color: C.textDeep, fontWeight: 400 }}>Luxury</td>
                        <td className="py-3 pr-4" style={{ color: C.bronze }}>{article.budget.luxury}</td>
                      </tr>
                      <tr style={{ borderBottom: `1px solid rgba(138,115,82,0.2)` }}>
                        <td className="py-3 pr-4 font-serif" style={{ color: C.textDeep, fontWeight: 400 }}>Ultra-Luxury</td>
                        <td className="py-3 pr-4 font-medium" style={{ color: C.bronze }}>{article.budget.ultraLuxury}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <LuxuryDivider />

              {/* FAQ */}
              {article.faqs.length > 0 && (
                <section id="faq" className="mb-10 sm:mb-12">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-6 sm:mb-8 text-center" style={{ color: C.textDeep, fontWeight: 400 }}>
                    Frequently Asked Questions
                  </h2>
                  <FAQAccordion items={article.faqs} />
                </section>
              )}

              {/* Related Articles */}
              {article.relatedSlugs.length > 0 && (
                <section className="mb-10 sm:mb-12">
                  <h2 className="text-xl sm:text-2xl font-serif mb-6 text-center" style={{ color: C.textDeep, fontWeight: 400 }}>
                    Related Stories
                  </h2>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {article.relatedSlugs.map((slug) => (
                      <Link
                        key={slug}
                        href={`/travel/${slug}`}
                        className="text-xs sm:text-sm font-sans font-normal px-4 py-2 transition-colors"
                        style={{ color: C.textStone, border: `1px solid rgba(138,115,82,0.35)` }} >
                        {slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>

        {/* Cross-Section Recommendations */}
        <section className="py-12 sm:py-16 px-6 sm:px-8" style={{ background: C.cream }}>
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-[10px]/[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.bronze }}>The Royal Gallerys</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif mt-3 mb-8 tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>More to Explore</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { href: "/style", label: "Style" },
                { href: "/design", label: "Design" },
                { href: "/culture", label: "Culture" },
                { href: "/society", label: "Society" },
                { href: "/people", label: "People" },
                { href: "/motoring", label: "Motoring" },
                { href: "/dining", label: "Dining" },
                { href: "/business", label: "Business" },
                { href: "/futures", label: "Futures" },
                { href: "/archive", label: "Archive" },
              ].map((s) => (
                <Link key={s.href} href={s.href} className="text-[10px]/[11px] uppercase tracking-[0.22em] font-medium font-sans px-5 py-2.5 transition-colors" style={{ color: C.textStone, border: `1px solid rgba(138,115,82,0.35)`, background: C.ivory }} >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-12 sm:py-16 px-6 sm:px-8 text-center" style={{ background: C.obsidian }}>
          <div className="max-w-xl mx-auto">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif mb-3" style={{ color: C.ivory, fontWeight: 400 }}>
              Join The Royal Traveler
            </h3>
            <p className="text-sm font-sans font-normal mb-6 leading-relaxed" style={{ color: C.textStone }}>
              Weekly dispatches from the world&apos;s finest destinations. Curated itineraries, hotel reviews, and insider access — delivered to your inbox.
            </p>
            <div className="max-w-md mx-auto">
              <NewsletterForm variant="dark" source={`article-${article.slug}`} />
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
