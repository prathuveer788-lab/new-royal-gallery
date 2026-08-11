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

  return {
    title: article.seoTitle,
    description: article.seoDescription,
    openGraph: {
      title: article.ogTitle,
      description: article.ogDescription,
      type: "article",
      publishedTime: article.publishedDate,
      authors: [article.authorName],
      images: [{ url: article.heroImage, width: 1200, height: 630, alt: article.ogTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.ogTitle,
      description: article.ogDescription,
    },
    alternates: { canonical: `https://theroyalgallerys.com/travel/${slug}` },
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
        <a key={idx} href={linkMatch[1]} className="text-amber-800 hover:text-amber-900 underline decoration-amber-300 decoration-1 underline-offset-2 transition-colors">
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
        <h3 key={key++} id={id} className="text-xl sm:text-2xl md:text-3xl font-serif text-neutral-900 mt-10 sm:mt-12 mb-4 sm:mb-5 leading-tight">
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
        <p key={key++} className="text-sm sm:text-base md:text-lg text-neutral-700 font-light leading-[1.8] mb-5">
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

  return (
    <>
      <ReadingProgress />

      <article className="bg-white">
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20" />
          </div>
          <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pb-12 sm:pb-16 md:pb-20">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/50 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] mb-6 sm:mb-8 font-sans">
              <Link href="/" className="hover:text-amber-300 transition-colors">The Royal Gallerys</Link>
              <span className="text-white/20">/</span>
              <Link href="/travel" className="hover:text-amber-300 transition-colors">Travel</Link>
              {(article.editorialSection && article.editorialSection !== "travel") && (
                <>
                  <span className="text-white/20">/</span>
                  <Link href={`/${article.editorialSection}`} className="hover:text-amber-300 transition-colors capitalize">{article.editorialSection}</Link>
                </>
              )}
              <span className="text-white/20">/</span>
              <span className="text-amber-300/80">{article.country}</span>
            </div>
            {/* Editorial tags */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-block text-amber-300 text-[9px] sm:text-[10px] uppercase tracking-[0.35em] font-semibold font-sans">
                {article.editorialSubcategory === "hotels" ? "Palace Hotels" : article.category}
              </span>
              {article.tags && article.tags.length > 0 && (
                <>
                  <span className="text-white/20 text-xs">·</span>
                  {article.tags.slice(0, 3).map((t) => (
                    <span key={t} className="text-white/40 text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-light font-sans">{t}</span>
                  ))}
                </>
              )}
            </div>
            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-[1.12] sm:leading-[1.15] mb-4 sm:mb-5 max-w-4xl tracking-tight">
              {article.headline}
            </h1>
            {/* Subtitle */}
            <p className="text-neutral-200/90 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl mb-6 sm:mb-8">
              {article.subtitle}
            </p>
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-white/60 text-[10px] sm:text-[11px] font-light font-sans">
              <span>{article.authorName}</span>
              <span className="text-white/25">|</span>
              <span>{article.readTime}</span>
              <span className="text-white/25">|</span>
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
                <div className="mt-8 pt-6 border-t border-neutral-200">
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-amber-700 font-bold mb-2 font-sans">
                    About the Author
                  </p>
                  <p className="text-sm font-serif text-neutral-800">{article.authorName}</p>
                  <p className="text-xs text-neutral-500 font-light mt-0.5">{article.authorRole}</p>
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
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-neutral-900 mb-4 sm:mb-5 leading-tight">
                        {section.heading}
                      </h2>
                      <div className="text-sm sm:text-base md:text-lg text-neutral-700 font-light leading-[1.8] space-y-5">
                        {section.content.split("\n\n").map((p, i) => (
                          <p key={i}>{p}</p>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-neutral-400 font-serif text-lg italic">
                    Full editorial content coming soon.
                  </p>
                  <p className="text-neutral-500 text-sm mt-2 font-light">
                    Our travel editors are crafting this luxury guide.
                  </p>
                </div>
              )}

              <LuxuryDivider />

              {/* Itineraries */}
              {(article.itinerary3Day || article.itinerary5Day || article.itinerary7Day) && (
                <section id="itineraries" className="mb-10 sm:mb-12">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-neutral-900 mb-6 sm:mb-8 text-center">
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
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-neutral-900 mb-6 sm:mb-8 text-center">
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
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-neutral-900 mb-6 sm:mb-8 text-center">
                  Approximate Budgets
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b-2 border-neutral-200">
                        <th className="py-3 pr-4 text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-neutral-400 font-medium font-sans">Category</th>
                        <th className="py-3 pr-4 text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-neutral-400 font-medium font-sans">Per Night / Person</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm text-neutral-700 font-light">
                      <tr className="border-b border-neutral-100">
                        <td className="py-3 pr-4 font-serif">Budget</td>
                        <td className="py-3 pr-4">{article.budget.budget}</td>
                      </tr>
                      <tr className="border-b border-neutral-100">
                        <td className="py-3 pr-4 font-serif">Mid-Range</td>
                        <td className="py-3 pr-4">{article.budget.midRange}</td>
                      </tr>
                      <tr className="border-b border-neutral-100">
                        <td className="py-3 pr-4 font-serif">Luxury</td>
                        <td className="py-3 pr-4 text-amber-800">{article.budget.luxury}</td>
                      </tr>
                      <tr className="border-b border-neutral-100">
                        <td className="py-3 pr-4 font-serif">Ultra-Luxury</td>
                        <td className="py-3 pr-4 text-amber-800 font-medium">{article.budget.ultraLuxury}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <LuxuryDivider />

              {/* FAQ */}
              {article.faqs.length > 0 && (
                <section id="faq" className="mb-10 sm:mb-12">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-neutral-900 mb-6 sm:mb-8 text-center">
                    Frequently Asked Questions
                  </h2>
                  <FAQAccordion items={article.faqs} />
                </section>
              )}

              {/* Related Articles */}
              {article.relatedSlugs.length > 0 && (
                <section className="mb-10 sm:mb-12">
                  <h2 className="text-xl sm:text-2xl font-serif text-neutral-900 mb-6 text-center">
                    Related Stories
                  </h2>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {article.relatedSlugs.map((slug) => (
                      <Link
                        key={slug}
                        href={`/travel/${slug}`}
                        className="text-xs sm:text-sm text-neutral-600 hover:text-amber-800 transition-colors border border-neutral-200 px-4 py-2 font-light"
                      >
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
        <section className="py-12 sm:py-16 px-6 sm:px-8 bg-[#faf8f5]">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-amber-700 font-bold font-sans">The Royal Gallerys</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-neutral-900 mt-3 mb-8 tracking-tight">More to Explore</h2>
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
                <Link key={s.href} href={s.href} className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-neutral-500 hover:text-amber-800 transition-colors font-sans font-semibold border border-neutral-200 px-5 py-2.5 hover:border-amber-200 bg-white">
                  {s.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="bg-neutral-900 text-white py-12 sm:py-16 px-6 sm:px-8 text-center">
          <div className="max-w-xl mx-auto">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif mb-3">
              Join The Royal Traveler
            </h3>
            <p className="text-neutral-400 text-sm font-light mb-6 leading-relaxed">
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
