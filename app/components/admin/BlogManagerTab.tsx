"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  BLOG_CATEGORIES,
  BLOG_FORMATS,
  SOCIETY_SUBCATEGORIES,
  type BlogCategory,
  type BlogPost,
} from "@/lib/blogs/constants";

interface BlogFormState {
  id?: string;
  title: string;
  subtitle: string;
  category: BlogCategory;
  subcategory: string;
  format: string;
  readTime: string;
  authorName: string;
  coverImage: string;
  imageData: string;
  content: string;
  featuredOnHome: boolean;
  published: boolean;
}

const INITIAL_FORM: BlogFormState = {
  title: "",
  subtitle: "",
  category: "Style",
  subcategory: "Editorial",
  format: "Feature",
  readTime: "10 min read",
  authorName: "The Royal Gallerys Editorial Desk",
  coverImage: "",
  imageData: "",
  content: "",
  featuredOnHome: true,
  published: true,
};

export default function BlogManagerTab({
  onFeedback,
}: {
  onFeedback: (msg: string) => void;
}) {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [filterCat, setFilterCat] = useState<string>("All");
  const [form, setForm] = useState<BlogFormState>(INITIAL_FORM);

  const loadBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blogs");
      if (res.ok) {
        const data = await res.json();
        setBlogs(data.blogs || []);
      }
    } catch (e) {
      console.error("Failed to fetch blogs:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setForm((prev) => ({
          ...prev,
          imageData: reader.result as string,
          coverImage: prev.coverImage || file.name,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const isEditing = Boolean(form.id);
      const res = await fetch("/api/admin/blogs", {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(isEditing ? { id: form.id } : {}),
          title: form.title,
          subtitle: form.subtitle,
          category: form.category,
          subcategory: form.subcategory,
          format: form.format,
          readTime: form.readTime,
          authorName: form.authorName,
          coverImage: form.coverImage,
          ...(form.imageData ? { imageData: form.imageData } : {}),
          content: form.content,
          featuredOnHome: form.featuredOnHome,
          published: form.published,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save blog.");
      }

      onFeedback(
        isEditing
          ? `✓ Blog "${data.blog.title}" updated.`
          : `✓ Blog "${data.blog.title}" published under ${data.blog.category}.`
      );
      setForm(INITIAL_FORM);
      await loadBlogs();
    } catch (err: unknown) {
      onFeedback(err instanceof Error ? err.message : "Failed to save blog.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (blog: BlogPost) => {
    setForm({
      id: blog.id,
      title: blog.title,
      subtitle: blog.subtitle,
      category: blog.category,
      subcategory: blog.subcategory,
      format: blog.format,
      readTime: blog.readTime,
      authorName: blog.authorName,
      coverImage: blog.coverImage,
      imageData: "",
      content: blog.content,
      featuredOnHome: blog.featuredOnHome,
      published: blog.published,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggle = async (
    blog: BlogPost,
    field: "published" | "featuredOnHome"
  ) => {
    try {
      const res = await fetch("/api/admin/blogs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: blog.id,
          [field]: !blog[field],
        }),
      });
      if (res.ok) {
        onFeedback(`✓ Updated "${blog.title}".`);
        await loadBlogs();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (blog: BlogPost) => {
    if (!confirm(`Delete blog "${blog.title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/blogs?id=${encodeURIComponent(blog.id)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        onFeedback(`✓ Deleted "${blog.title}".`);
        if (form.id === blog.id) {
          setForm(INITIAL_FORM);
        }
        await loadBlogs();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const visibleBlogs =
    filterCat === "All"
      ? blogs
      : blogs.filter((b) => b.category === filterCat);

  const previewSrc = form.imageData || form.coverImage;

  return (
    <div className="space-y-10">
      {/* ── CREATE / EDIT BLOG FORM ── */}
      <form
        onSubmit={handleSubmit}
        className="p-6 sm:p-8 bg-white border border-[#111111]/15 shadow-sm space-y-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#111111]/10 pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#8A7352] font-semibold block">
              {form.id ? "Editing Curated Blog" : "Publish New Blog"}
            </span>
            <h3 className="text-2xl font-serif text-[#111111]">
              {form.id ? form.title : "Add Blog to The Edit"}
            </h3>
          </div>
          {form.id && (
            <button
              type="button"
              onClick={() => setForm(INITIAL_FORM)}
              className="px-4 py-1.5 text-xs uppercase tracking-wider border border-[#111111]/20 text-[#555555] hover:bg-neutral-50"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#8A7352] mb-1 font-semibold">
              Blog Title *
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. The Woman Who Walks With Giants"
              className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-4 py-2.5 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#8A7352] mb-1 font-semibold">
              Category *
            </label>
            <select
              value={form.category}
              onChange={(e) => {
                const nextCat = e.target.value as BlogCategory;
                setForm({
                  ...form,
                  category: nextCat,
                  subcategory:
                    nextCat === "Society"
                      ? "Society Overview"
                      : form.subcategory || "Editorial",
                });
              }}
              className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-4 py-2.5 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
            >
              {BLOG_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#8A7352] mb-1 font-semibold">
              Sub-Category / Series Label
            </label>
            <input
              type="text"
              value={form.subcategory}
              onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
              placeholder="e.g. Profile, Hotel Feature, Classic Cars, Art & Lineage"
              className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-4 py-2.5 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
            />
            {form.category === "Society" && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {SOCIETY_SUBCATEGORIES.map((sub) => (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setForm({ ...form, subcategory: sub })}
                    className={`px-2.5 py-1 text-[10px] uppercase tracking-wider border ${
                      form.subcategory === sub
                        ? "bg-[#111111] text-white border-[#111111]"
                        : "bg-[#FAF8F5] text-[#555555] border-[#111111]/15 hover:border-[#8A7352]"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#8A7352] mb-1 font-semibold">
                Format
              </label>
              <select
                value={form.format}
                onChange={(e) => setForm({ ...form, format: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-3 py-2.5 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
              >
                {BLOG_FORMATS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#8A7352] mb-1 font-semibold">
                Read Time
              </label>
              <input
                type="text"
                value={form.readTime}
                onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                placeholder="12 min read"
                className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-3 py-2.5 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#8A7352] mb-1 font-semibold">
              Author / Desk
            </label>
            <input
              type="text"
              value={form.authorName}
              onChange={(e) => setForm({ ...form, authorName: e.target.value })}
              className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-4 py-2.5 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#8A7352] mb-1 font-semibold">
              Cover Image (Path / URL or Upload)
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={form.coverImage}
                onChange={(e) =>
                  setForm({ ...form, coverImage: e.target.value, imageData: "" })
                }
                placeholder="/images/... or https://..."
                className="flex-1 bg-[#FAF8F5] border border-[#111111]/20 px-3 py-2.5 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
              />
              <label className="px-3 py-2.5 text-[10px] uppercase tracking-wider bg-[#111111] text-white cursor-pointer hover:bg-[#8A7352] whitespace-nowrap">
                Upload
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/avif"
                  onChange={handleImageFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {previewSrc && (
          <div className="flex items-center gap-4 p-3 bg-[#FAF8F5] border border-[#111111]/10">
            <img
              src={previewSrc}
              alt="Cover preview"
              className="w-16 h-20 object-cover border border-[#111111]/10"
            />
            <div className="text-xs text-[#666666]">
              <span className="font-semibold text-[#111111] block">Cover Image Preview</span>
              <span>{form.imageData ? "Ready to upload to /images/blogs/" : form.coverImage}</span>
            </div>
          </div>
        )}

        <div>
          <label className="block text-[10px] uppercase tracking-wider text-[#8A7352] mb-1 font-semibold">
            Subtitle / Summary *
          </label>
          <textarea
            required
            rows={2}
            value={form.subtitle}
            onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
            placeholder="Brief editorial summary shown on the blog header..."
            className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-4 py-2.5 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-wider text-[#8A7352] mb-1 font-semibold">
            Blog Content * (Separate paragraphs with a blank line; use ## for headings)
          </label>
          <textarea
            required
            rows={8}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="Write or paste the full editorial blog article here..."
            className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-4 py-3 text-sm text-[#111111] focus:border-[#111111] focus:outline-none font-sans"
          />
        </div>

        <div className="flex flex-wrap items-center gap-6 pt-2">
          <label className="flex items-center gap-2 text-xs text-[#111111] cursor-pointer">
            <input
              type="checkbox"
              checked={form.featuredOnHome}
              onChange={(e) =>
                setForm({ ...form, featuredOnHome: e.target.checked })
              }
              className="accent-[#111111]"
            />
            <span>Show on Homepage (&ldquo;03 — The Edit&rdquo;)</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-[#111111] cursor-pointer">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
              className="accent-[#111111]"
            />
            <span>Published (Visible on Website)</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-sans font-medium bg-[#111111] text-[#FAF8F5] hover:bg-[#8A7352] transition-colors disabled:opacity-50 cursor-pointer"
        >
          {saving
            ? "Saving..."
            : form.id
            ? "Update Blog →"
            : "Publish Blog →"}
        </button>
      </form>

      {/* ── EXISTING BLOGS LIST ── */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#111111]/10 pb-3">
          <div>
            <h3 className="text-2xl font-serif text-[#111111]">
              Website Blogs ({visibleBlogs.length})
            </h3>
            <p className="text-xs text-[#666666] font-sans">
              Blogs published here appear on the Homepage (&ldquo;03 — The Edit&rdquo;) and on{" "}
              <Link href="/blogs" className="underline text-[#8A7352]">
                /blogs
              </Link>
              .
            </p>
          </div>

          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="bg-white border border-[#111111]/20 px-3 py-1.5 text-xs text-[#111111]"
          >
            <option value="All">All Categories</option>
            {BLOG_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-[#8A7352] uppercase tracking-widest bg-white border border-[#111111]/10">
            Loading Blogs...
          </div>
        ) : visibleBlogs.length === 0 ? (
          <div className="p-10 text-center text-xs text-[#666666] bg-white border border-[#111111]/10">
            No blogs found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {visibleBlogs.map((blog) => (
              <div
                key={blog.id}
                className="p-5 bg-white border border-[#111111]/15 shadow-sm flex gap-4"
              >
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-20 h-28 object-cover flex-shrink-0 bg-neutral-100"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8A7352]">
                        {blog.category} · {blog.subcategory}
                      </span>
                      {blog.featuredOnHome && (
                        <span className="text-[9px] uppercase px-2 py-0.5 bg-[#FAF8F5] border border-[#8A7352]/40 text-[#8A7352]">
                          Homepage
                        </span>
                      )}
                      {!blog.published && (
                        <span className="text-[9px] uppercase px-2 py-0.5 bg-amber-50 border border-amber-300 text-amber-800">
                          Draft
                        </span>
                      )}
                    </div>
                    <h4 className="font-serif text-lg text-[#111111] leading-snug line-clamp-2">
                      {blog.title}
                    </h4>
                    <p className="text-[11px] text-[#666666] mt-1">
                      {blog.format} · {blog.readTime}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-3 mt-2 border-t border-[#111111]/10">
                    <button
                      type="button"
                      onClick={() => handleEdit(blog)}
                      className="px-2.5 py-1 text-[10px] uppercase tracking-wider border border-[#111111]/20 text-[#111111] hover:bg-neutral-50 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggle(blog, "featuredOnHome")}
                      className="px-2.5 py-1 text-[10px] uppercase tracking-wider border border-[#8A7352]/40 text-[#8A7352] hover:bg-[#FAF8F5] cursor-pointer"
                    >
                      {blog.featuredOnHome ? "Unfeature" : "Feature"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleToggle(blog, "published")}
                      className="px-2.5 py-1 text-[10px] uppercase tracking-wider border border-[#111111]/20 text-[#555555] hover:bg-neutral-50 cursor-pointer"
                    >
                      {blog.published ? "Set Draft" : "Publish"}
                    </button>
                    <Link
                      href={`/blogs/${blog.slug}`}
                      target="_blank"
                      className="px-2.5 py-1 text-[10px] uppercase tracking-wider border border-[#111111]/20 text-[#111111] hover:bg-neutral-50"
                    >
                      View →
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(blog)}
                      className="px-2.5 py-1 text-[10px] uppercase tracking-wider border border-red-200 text-red-700 hover:bg-red-50 cursor-pointer ml-auto"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
