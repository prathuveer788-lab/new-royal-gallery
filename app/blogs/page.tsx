import type { Metadata } from "next";
import { BLOG_CATEGORIES, SOCIETY_SUBCATEGORIES } from "@/lib/blogs/constants";
import { getPublishedBlogs } from "@/lib/blogs/store";
import CuratedBlogsSection from "@/app/components/CuratedBlogsSection";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blogs & Curated Selections | The Royal Gallerys",
  description:
    "Explore editorial stories, profiles, and dispatches across Style, Jewellery, Watches, Weddings, Travel, UK, Design, Culture, Royalty, Society, Motoring, Dining, Business, and Future.",
  alternates: { canonical: "https://theroyalgallerys.com/blogs" },
};

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sub?: string }>;
}) {
  const { category, sub } = await searchParams;
  const blogs = await getPublishedBlogs();

  const matchedCategory =
    category &&
    BLOG_CATEGORIES.find((c) => c.toLowerCase() === category.trim().toLowerCase());
  const initialCategory = matchedCategory || "All";

  const matchedSub =
    initialCategory === "Society" &&
    sub &&
    SOCIETY_SUBCATEGORIES.find((s) => s.toLowerCase() === sub.trim().toLowerCase());
  const initialSubcategory = matchedSub || "All";

  return (
    <div style={{ background: "#F4F0E7" }}>
      <section
        className="pt-32 sm:pt-40 pb-16 sm:pb-24 px-6 sm:px-8 md:px-12 lg:px-16 text-center"
        style={{ background: "#11110F" }}
      >
        <div className="max-w-4xl mx-auto">
          <span
            className="text-[10px] sm:text-[11px] uppercase tracking-[0.38em] font-medium font-sans block mb-5"
            style={{ color: "#B8A47A" }}
          >
            The Royal Gallerys · The Edit
          </span>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-[0.98] tracking-tight mb-6"
            style={{ color: "#F4F0E7", fontWeight: 400 }}
          >
            {initialCategory === "All" ? "Curated Blogs" : initialCategory}
          </h1>
          <p
            className="text-sm sm:text-base md:text-lg font-sans leading-relaxed max-w-2xl mx-auto"
            style={{ color: "#9B9589", fontWeight: 400 }}
          >
            Dispatches, profiles, and cultural essays across Style, Jewellery, Watches, Weddings, Travel, UK, Design, Culture, Royalty, Society, Motoring, Dining, Business, and Future.
          </p>
        </div>
      </section>

      <CuratedBlogsSection
        key={`${initialCategory}-${initialSubcategory}`}
        blogs={blogs}
        variant="archive"
        initialCategory={initialCategory}
        initialSubcategory={initialSubcategory}
      />
    </div>
  );
}
