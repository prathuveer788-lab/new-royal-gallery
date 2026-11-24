"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  BLOG_CATEGORIES,
  SOCIETY_SUBCATEGORIES,
  type BlogCategory,
  type BlogContentMode,
  type BlogPost,
} from "@/lib/blogs/constants";
import { isHtmlContent, normalizeBlogHtml } from "@/lib/blogs/sanitize";

interface BlogFormState {
  id?: string;
  title: string;
  slug: string;
  category: BlogCategory;
  subcategory: string;
  coverImage: string;
  imageData: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  contentMode: BlogContentMode;
  content: string;
  featuredOnHome: boolean;
  published: boolean;
}

const INITIAL_FORM: BlogFormState = {
  title: "",
  slug: "",
  category: "Style",
  subcategory: "Editorial",
  coverImage: "",
  imageData: "",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  contentMode: "html",
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
  const [storageMode, setStorageMode] = useState<"kv" | "local" | "tmp" | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [filterCat, setFilterCat] = useState<string>("All");
  const [editorTab, setEditorTab] = useState<"code" | "preview">("code");
  const [form, setForm] = useState<BlogFormState>(INITIAL_FORM);

  const loadBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blogs");
      if (res.ok) {
        const data = await res.json();
        setBlogs(data.blogs || []);
        if (data.storageMode) setStorageMode(data.storageMode);
      }
    } catch (e) {
      console.error("Failed to fetch blogs:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetch("/api/admin/blogs")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active || !data) return;
        setBlogs(data.blogs || []);
        if (data.storageMode) setStorageMode(data.storageMode);
      })
      .catch((e) => console.error("Failed to fetch blogs:", e))
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") return;
      const rawDataUrl = reader.result;

      if (file.size <= 250 * 1024) {
        setForm((prev) => ({
          ...prev,
          imageData: rawDataUrl,
          coverImage: prev.coverImage || file.name,
        }));
        return;
      }

      // Compress larger images client-side so serverless payloads stay small and fast
      const img = new Image();
      img.onload = () => {
        const maxDim = 1400;
        const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setForm((prev) => ({
            ...prev,
            imageData: rawDataUrl,
            coverImage: prev.coverImage || file.name,
          }));
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressed = canvas.toDataURL("image/webp", 0.82);
        const finalUrl = compressed.startsWith("data:image/webp")
          ? compressed
          : canvas.toDataURL("image/jpeg", 0.82);
        setForm((prev) => ({
          ...prev,
          imageData: finalUrl,
          coverImage: prev.coverImage || file.name,
        }));
      };
      img.onerror = () => {
        setForm((prev) => ({
          ...prev,
          imageData: rawDataUrl,
          coverImage: prev.coverImage || file.name,
        }));
      };
      img.src = rawDataUrl;
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
          ...(form.slug.trim() ? { slug: form.slug.trim() } : {}),
          category: form.category,
          subcategory: form.subcategory,
          coverImage: form.coverImage,
          ...(form.imageData ? { imageData: form.imageData } : {}),
          metaTitle: form.metaTitle,
          metaDescription: form.metaDescription,
          metaKeywords: form.metaKeywords,
          contentMode: form.contentMode,
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
      setEditorTab("code");
      await loadBlogs();
    } catch (err: unknown) {
      onFeedback(err instanceof Error ? err.message : "Failed to save blog.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (blog: BlogPost) => {
    const detectedMode: BlogContentMode = isHtmlContent(blog.content, blog.contentMode)
      ? "html"
      : "text";

    setForm({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      category: blog.category,
      subcategory: blog.subcategory,
      coverImage: blog.coverImage,
      imageData: "",
      metaTitle: blog.metaTitle || blog.title,
      metaDescription: blog.metaDescription || blog.subtitle,
      metaKeywords: blog.metaKeywords || "",
      contentMode: detectedMode,
      content: blog.content,
      featuredOnHome: blog.featuredOnHome,
      published: blog.published,
    });
    setEditorTab("code");
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
      {storageMode === "tmp" && (
        <div className="p-4 bg-amber-50 border border-amber-300 text-amber-900 text-xs leading-relaxed">
          <strong>Serverless Notice:</strong> Vercel&apos;s filesystem is read-only, so blogs and uploaded images are currently stored temporarily (<code>/tmp</code> + inline image data). For permanent cloud persistence across deployments, add <code>UPSTASH_REDIS_REST_URL</code> &amp; <code>UPSTASH_REDIS_REST_TOKEN</code> (or <code>KV_REST_API_URL</code> &amp; <code>KV_REST_API_TOKEN</code>) and optionally <code>BLOB_READ_WRITE_TOKEN</code> in Vercel Environment Variables.
        </div>
      )}

      {/* ── CREATE / EDIT BLOG FORM ── */}
      <form
        onSubmit={handleSubmit}
        className="p-6 sm:p-8 bg-white border border-[#111111]/15 shadow-sm space-y-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#111111]/10 pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#8A7352] font-semibold block">
              {form.id ? "Edit Blog Module" : "Add Blog Module"}
            </span>
            <h3 className="text-2xl font-serif text-[#111111]">
              {form.id ? form.title : "Add / Paste Website Blog"}
            </h3>
          </div>
          {form.id && (
            <button
              type="button"
              onClick={() => {
                setForm(INITIAL_FORM);
                setEditorTab("code");
              }}
              className="px-4 py-1.5 text-xs uppercase tracking-wider border border-[#111111]/20 text-[#555555] hover:bg-neutral-50 cursor-pointer"
            >
              Cancel Edit
            </button>
          )}
        </div>

        {/* 1. Title, Slug, Category & Sub-category */}
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
                    className={`px-2.5 py-1 text-[10px] uppercase tracking-wider border cursor-pointer ${
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

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#8A7352] mb-1 font-semibold">
              Custom URL Slug (Optional — auto-generated from title)
            </label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              placeholder="e.g. royal-horology-heritage-india"
              className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-4 py-2.5 text-sm font-mono text-[#111111] focus:border-[#111111] focus:outline-none"
            />
          </div>
        </div>

        {/* 2. Cover Image Upload */}
        <div className="p-4 sm:p-5 bg-[#FAF8F5] border border-[#111111]/10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="text-[10px] uppercase tracking-wider text-[#8A7352] font-semibold">
              Cover Image Upload (or Paste Path / URL)
            </label>
            <label className="px-4 py-2 text-[10px] uppercase tracking-wider bg-[#111111] text-white cursor-pointer hover:bg-[#8A7352] transition-colors">
              Choose Image File
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/avif"
                onChange={handleImageFileChange}
                className="hidden"
              />
            </label>
          </div>
          <input
            type="text"
            value={form.coverImage}
            onChange={(e) =>
              setForm({ ...form, coverImage: e.target.value, imageData: "" })
            }
            placeholder="/images/... or https://... (optional if uploading a file)"
            className="w-full bg-white border border-[#111111]/20 px-3 py-2 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
          />
          {previewSrc && (
            <div className="flex items-center gap-4 pt-2">
              <img
                src={previewSrc}
                alt="Cover preview"
                className="w-20 h-24 object-cover border border-[#111111]/15"
              />
              <div className="text-xs text-[#666666]">
                <span className="font-semibold text-[#111111] block">Cover Image Ready</span>
                <span className="break-all">
                  {form.imageData ? "Uploaded file ready to save in /images/blogs/" : form.coverImage}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* 3. SEO Meta Tags */}
        <div className="p-4 sm:p-5 bg-[#FAF8F5] border border-[#111111]/10 space-y-4">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#8A7352] font-semibold block">
            SEO Meta Tags
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#666666] mb-1 font-semibold">
                Meta Title
              </label>
              <input
                type="text"
                value={form.metaTitle}
                onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                placeholder="SEO title for <title> and OpenGraph (defaults to Blog Title)"
                className="w-full bg-white border border-[#111111]/20 px-3 py-2 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#666666] mb-1 font-semibold">
                Meta Keywords (comma-separated)
              </label>
              <input
                type="text"
                value={form.metaKeywords}
                onChange={(e) => setForm({ ...form, metaKeywords: e.target.value })}
                placeholder="e.g. royal heritage, luxury watches, india"
                className="w-full bg-white border border-[#111111]/20 px-3 py-2 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#666666] mb-1 font-semibold">
              Meta Description
            </label>
            <textarea
              rows={2}
              value={form.metaDescription}
              onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
              placeholder="SEO description for search engines & social previews..."
              className="w-full bg-white border border-[#111111]/20 px-3 py-2 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
            />
          </div>
        </div>

        {/* 4. Blog Code / Content Editor + Live Preview */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="text-[10px] uppercase tracking-wider text-[#8A7352] font-semibold">
              Blog Code / Content *
            </label>

            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex border border-[#111111]/20">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, contentMode: "html" })}
                  className={`px-3 py-1 text-[10px] uppercase tracking-wider cursor-pointer ${
                    form.contentMode === "html"
                      ? "bg-[#111111] text-white"
                      : "bg-white text-[#555555]"
                  }`}
                >
                  HTML / Blog Code
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, contentMode: "text" })}
                  className={`px-3 py-1 text-[10px] uppercase tracking-wider cursor-pointer ${
                    form.contentMode === "text"
                      ? "bg-[#111111] text-white"
                      : "bg-white text-[#555555]"
                  }`}
                >
                  Text / Markdown
                </button>
              </div>

              <div className="inline-flex border border-[#8A7352]/40">
                <button
                  type="button"
                  onClick={() => setEditorTab("code")}
                  className={`px-3 py-1 text-[10px] uppercase tracking-wider cursor-pointer ${
                    editorTab === "code"
                      ? "bg-[#8A7352] text-white"
                      : "bg-white text-[#8A7352]"
                  }`}
                >
                  Code Editor
                </button>
                <button
                  type="button"
                  onClick={() => setEditorTab("preview")}
                  className={`px-3 py-1 text-[10px] uppercase tracking-wider cursor-pointer ${
                    editorTab === "preview"
                      ? "bg-[#8A7352] text-white"
                      : "bg-white text-[#8A7352]"
                  }`}
                >
                  Live Preview
                </button>
              </div>
            </div>
          </div>

          {editorTab === "code" ? (
            <textarea
              required
              rows={12}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder={
                form.contentMode === "html"
                  ? "<article>\n  <h2>Section Heading</h2>\n  <p>Paste your blog HTML / styled code here...</p>\n</article>"
                  : "Write paragraphs separated by a blank line. Use ## for headings and **bold** for emphasis..."
              }
              className={`w-full bg-[#FAF8F5] border border-[#111111]/20 px-4 py-3 text-sm text-[#111111] focus:border-[#111111] focus:outline-none ${
                form.contentMode === "html" ? "font-mono text-xs leading-relaxed" : "font-sans"
              }`}
            />
          ) : (
            <div className="p-6 bg-[#F4F0E7] border border-[#8A7352]/30 min-h-[260px]">
              {!form.content.trim() ? (
                <p className="text-xs text-[#9B9589]">
                  Paste blog code or text in the Code Editor tab to preview it here.
                </p>
              ) : isHtmlContent(form.content, form.contentMode) ? (
                <div
                  className="blog-code-body text-[#181714]"
                  dangerouslySetInnerHTML={{
                    __html: normalizeBlogHtml(form.content),
                  }}
                />
              ) : (
                <div className="space-y-4 text-sm text-[#181714] leading-relaxed">
                  {form.content.split(/\n\s*\n/).map((para, idx) => (
                    <p key={idx}>{para.trim()}</p>
                  ))}
                </div>
              )}
            </div>
          )}
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
