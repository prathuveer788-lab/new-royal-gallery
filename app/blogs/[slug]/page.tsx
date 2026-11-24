import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogBySlug, getPublishedBlogs } from "@/lib/blogs/store";
import { BlogCard } from "@/app/components/CuratedBlogsSection";

export const dynamic = "force-dynamic";

const C = {
  obsidian: "#11110F",
  ivory: "#F4F0E7",
  cream: "#EAE3D5",
  textDeep: "#181714",
  textStone: "#9B9589",
  bronze: "#8A7352",
  champagne: "#B8A47A",
};

function renderParagraph(para: string, idx: number) {
  const trimmed = para.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("## ")) {
    return (
      <h2
        key={idx}
        className="text-2xl sm:text-3xl font-serif mt-10 mb-4 leading-snug"
        style={{ color: C.textDeep, fontWeight: 400 }}
      >
        {trimmed.slice(3)}
      </h2>
    );
  }

  if (trimmed.includes("**")) {
    const parts = trimmed.split(/(\*\*.*?\*\*)/);
    return (
      <p
        key={idx}
        className="text-base sm:text-lg font-sans leading-relaxed mb-6"
        style={{ color: C.textDeep, fontWeight: 400 }}
      >
        {parts.map((part, j) =>
          part.startsWith("**") && part.endsWith("**") ? (
            <strong key={j} style={{ fontWeight: 600, color: C.textDeep }}>
              {part.slice(2, -2)}
            </strong>
          ) : (
            <span key={j}>{part}</span>
          )
        )}
      </p>
    );
  }

  return (
    <p
      key={idx}
      className="text-base sm:text-lg font-sans leading-relaxed mb-6"
      style={{ color: C.textDeep, fontWeight: 400 }}
    >
      {trimmed}
    </p>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog || !blog.published) {
    return { title: "Blog Not Found — The Royal Gallerys" };
  }
  return {
    title: `${blog.title} — ${blog.category} | The Royal Gallerys`,
    description: blog.subtitle,
    openGraph: {
      title: blog.title,
      description: blog.subtitle,
      type: "article",
      images: blog.coverImage ? [{ url: blog.coverImage }] : undefined,
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog || !blog.published) {
    notFound();
  }

  const relatedBlogs = getPublishedBlogs()
    .filter((b) => b.id !== blog.id)
    .slice(0, 4);

  const formattedDate = new Date(blog.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article style={{ background: C.ivory }}>
      {/* Hero Banner */}
      <section className="relative min-h-[65vh] sm:min-h-[75vh] flex items-end">
        <div className="absolute inset-0 bg-[#11110F]">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(17,17,15,0.94), rgba(17,17,15,0.45), rgba(17,17,15,0.65))",
            }}
          />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-8 md:px-12 pb-14 sm:pb-20 pt-36">
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-sans">
              <li>
                <Link href="/" style={{ color: C.champagne }}>
                  Home
                </Link>
              </li>
              <li style={{ color: "rgba(244,240,231,0.35)" }}>/</li>
              <li>
                <Link href="/blogs" style={{ color: C.champagne }}>
                  Blogs
                </Link>
              </li>
              <li style={{ color: "rgba(244,240,231,0.35)" }}>/</li>
              <li style={{ color: "rgba(244,240,231,0.75)" }}>
                {blog.category} · {blog.subcategory}
              </li>
            </ol>
          </nav>

          <span
            className="block text-[10px] sm:text-[11px] uppercase tracking-[0.24em] font-sans font-medium mb-4"
            style={{ color: C.champagne }}
          >
            {blog.category} · {blog.subcategory}
          </span>

          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-serif leading-[1.06] tracking-tight mb-6"
            style={{ color: C.ivory, fontWeight: 400 }}
          >
            {blog.title}
          </h1>

          <p
            className="text-base sm:text-lg font-sans leading-relaxed max-w-2xl mb-6"
            style={{ color: "rgba(244,240,231,0.78)" }}
          >
            {blog.subtitle}
          </p>

          <div
            className="flex flex-wrap items-center gap-3 text-xs font-sans"
            style={{ color: C.textStone }}
          >
            <span style={{ color: C.champagne }}>{blog.authorName}</span>
            <span>·</span>
            <span>{formattedDate}</span>
            <span>·</span>
            <span>
              {blog.format} · {blog.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-16 sm:py-24 px-6 sm:px-8 md:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10 pb-8 border-b border-[#8A7352]/25">
            <Link
              href="/blogs"
              className="text-[10px] uppercase tracking-[0.22em] font-sans font-medium"
              style={{ color: C.bronze }}
            >
              ← Back to All Blogs
            </Link>
          </div>

          <div>
            {blog.content
              .split(/\n\s*\n/)
              .map((para, idx) => renderParagraph(para, idx))}
          </div>
        </div>
      </section>

      {/* Related Stories */}
      {relatedBlogs.length > 0 && (
        <section
          className="py-20 sm:py-28 px-6 sm:px-8 md:px-12 lg:px-16"
          style={{ background: C.cream }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <span
                className="block text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-medium font-sans mb-4"
                style={{ color: C.bronze }}
              >
                Continue Reading
              </span>
              <h2
                className="text-3xl sm:text-4xl font-serif tracking-tight"
                style={{ color: C.textDeep, fontWeight: 400 }}
              >
                More From The Edit
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
              {relatedBlogs.map((rel) => (
                <BlogCard key={rel.id} blog={rel} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
