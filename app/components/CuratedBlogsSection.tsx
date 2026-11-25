"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  BLOG_CATEGORIES,
  SOCIETY_SUBCATEGORIES,
  type BlogPost,
} from "@/lib/blogs/constants";

const C = {
  ivory: "#F4F0E7",
  cream: "#EAE3D5",
  obsidian: "#11110F",
  textDeep: "#181714",
  textStone: "#9B9589",
  bronze: "#8A7352",
  champagne: "#B8A47A",
};

export function BlogCard({ blog }: { blog: BlogPost }) {
  return (
    <Link href={`/blogs/${blog.slug}`} className="group flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden mb-3 bg-[#1C1B18]">
        <img
          src={blog.coverImage}
          alt={blog.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-1000 ease-in-out"
        />
      </div>
      <span
        className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-medium font-sans"
        style={{ color: C.bronze }}
      >
        {blog.category} · {blog.subcategory}
      </span>
      <h3
        className="text-lg sm:text-xl font-serif mt-1.5 mb-1 leading-snug transition-colors duration-300 group-hover:text-[#8A7352]"
        style={{ color: C.textDeep, fontWeight: 400 }}
      >
        {blog.title}
      </h3>
      <span
        className="text-[11px] font-sans font-normal mt-auto"
        style={{ color: C.textStone }}
      >
        {blog.format} · {blog.readTime}
      </span>
    </Link>
  );
}

export default function CuratedBlogsSection({
  blogs,
  variant = "home",
  initialCategory = "All",
  initialSubcategory = "All",
}: {
  blogs: BlogPost[];
  variant?: "home" | "archive";
  initialCategory?: string;
  initialSubcategory?: string;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSocietySub, setSelectedSocietySub] = useState<string>(initialSubcategory);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      if (selectedCategory !== "All" && blog.category !== selectedCategory) {
        return false;
      }
      if (
        selectedCategory === "Society" &&
        selectedSocietySub !== "All" &&
        blog.subcategory.toLowerCase() !== selectedSocietySub.toLowerCase()
      ) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const hay = `${blog.title} ${blog.subtitle} ${blog.category} ${blog.subcategory}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [blogs, selectedCategory, selectedSocietySub, searchQuery]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setSelectedSocietySub("All");
  };

  return (
    <section
      id="the-edit"
      className="py-12 sm:py-16 md:py-20 px-6 sm:px-8 md:px-12 lg:px-16 scroll-mt-16"
      style={{ background: variant === "home" ? C.cream : C.ivory }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header — matches 05 — THE EDIT / A Curated Selection */}
        <div className="text-center mb-7 sm:mb-9">
          <span
            className="block text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-medium font-sans mb-2.5 sm:mb-3"
            style={{ color: C.bronze }}
          >
            {variant === "home" ? "05 — The Edit" : "Editorial Archive · Blogs"}
          </span>
          <h2
            className="text-[clamp(1.75rem,3.6vw,3.1rem)] font-serif leading-[1.08] tracking-tight"
            style={{ color: C.textDeep, fontWeight: 400 }}
          >
            {variant === "home" ? "A Curated Selection" : "All Editorial Blogs"}
          </h2>
          <div className="mt-4 sm:mt-5">
            <hr
              className="border-0 mx-auto"
              style={{
                height: 1,
                background: "rgba(138,115,82,0.35)",
                width: 64,
              }}
            />
          </div>
        </div>

        {/* Category Filter Strip */}
        <div className="mb-7 sm:mb-9 space-y-3">
          {variant === "archive" && (
            <div className="max-w-md mx-auto mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search blogs by title, category, or topic..."
                className="w-full px-4 py-2.5 text-xs font-sans bg-white/70 border border-[#8A7352]/30 text-[#181714] placeholder:text-[#9B9589] focus:outline-none focus:border-[#8A7352]"
              />
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-2">
            {["All", ...BLOG_CATEGORIES].map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className="px-3.5 py-1.5 text-[10px] uppercase tracking-[0.18em] font-sans font-medium transition-all duration-300 cursor-pointer"
                  style={{
                    background: active ? C.obsidian : "transparent",
                    color: active ? C.ivory : C.bronze,
                    border: active
                      ? `1px solid ${C.obsidian}`
                      : "1px solid rgba(138,115,82,0.28)",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Society Sub-Categories */}
          {selectedCategory === "Society" && (
            <div className="flex flex-wrap justify-center gap-2 pt-1">
              {["All", ...SOCIETY_SUBCATEGORIES].map((sub) => {
                const active = selectedSocietySub === sub;
                return (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setSelectedSocietySub(sub)}
                    className="px-3 py-1 text-[10px] uppercase tracking-[0.16em] font-sans transition-all duration-300 cursor-pointer"
                    style={{
                      background: active ? C.bronze : "rgba(138,115,82,0.08)",
                      color: active ? C.ivory : C.textDeep,
                      border: "1px solid rgba(138,115,82,0.3)",
                    }}
                  >
                    {sub === "All" ? "All Society" : sub}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 4-Column Blog Grid */}
        {filteredBlogs.length === 0 ? (
          <div
            className="py-16 text-center border border-[#8A7352]/25"
            style={{ background: variant === "home" ? C.ivory : C.cream }}
          >
            <p className="font-serif text-2xl text-[#181714] mb-2">
              {selectedCategory === "All"
                ? "No blogs published yet."
                : `No blogs published in ${selectedCategory} yet.`}
            </p>
            <p className="text-xs font-sans text-[#9B9589] mb-6">
              Add new blogs from the Editorial Office console to feature them here.
            </p>
            {selectedCategory !== "All" && (
              <button
                type="button"
                onClick={() => handleCategoryChange("All")}
                className="px-6 py-2.5 text-[10px] uppercase tracking-[0.2em] font-sans font-medium cursor-pointer"
                style={{
                  background: C.obsidian,
                  color: C.ivory,
                }}
              >
                Show All Categories
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}

        {/* Footer CTA */}
        {variant === "home" && (
          <div className="mt-8 sm:mt-10 text-center">
            <Link
              href="/blogs"
              className="inline-block text-[11px] sm:text-xs uppercase tracking-[0.22em] font-medium font-sans transition-all duration-500 px-8 sm:px-10 py-3"
              style={{
                color: C.textDeep,
                border: "1px solid rgba(138,115,82,0.4)",
              }}
            >
              Explore All Blogs →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
