import fs from "fs";
import path from "path";
import {
  BLOG_CATEGORIES,
  type BlogCategory,
  type BlogContentMode,
  type BlogPost,
} from "./constants";
import { stripHtmlToExcerpt } from "./sanitize";

export { BLOG_CATEGORIES, SOCIETY_SUBCATEGORIES, BLOG_FORMATS } from "./constants";
export type { BlogCategory, BlogContentMode, BlogPost } from "./constants";

interface BlogsStore {
  blogs: BlogPost[];
}

const STORE_PATH = path.join(process.cwd(), "data", "blogs-store.json");

const SEED_BLOGS: BlogPost[] = [];

function ensureStoreFile(): BlogsStore {
  const dir = path.dirname(STORE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(STORE_PATH)) {
    const initial: BlogsStore = { blogs: SEED_BLOGS };
    fs.writeFileSync(STORE_PATH, JSON.stringify(initial, null, 2), "utf8");
    return initial;
  }
  const raw = fs.readFileSync(STORE_PATH, "utf8");
  try {
    const parsed = JSON.parse(raw) as BlogsStore;
    if (!Array.isArray(parsed.blogs)) {
      return { blogs: SEED_BLOGS };
    }
    return parsed;
  } catch {
    return { blogs: SEED_BLOGS };
  }
}

export function getAllBlogs(): BlogPost[] {
  const store = ensureStoreFile();
  return [...store.blogs].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPublishedBlogs(category?: string): BlogPost[] {
  const all = getAllBlogs().filter((b) => b.published);
  if (!category || category.toLowerCase() === "all") {
    return all;
  }
  const normalized = category.trim().toLowerCase();
  return all.filter(
    (b) =>
      b.category.toLowerCase() === normalized ||
      b.subcategory.toLowerCase() === normalized
  );
}

export function getHomeCuratedBlogs(): BlogPost[] {
  const published = getPublishedBlogs();
  const featured = published.filter((b) => b.featuredOnHome);
  return featured.length > 0 ? featured : published;
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return getAllBlogs().find((b) => b.slug === slug);
}

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function isValidCategory(cat: string): cat is BlogCategory {
  return (BLOG_CATEGORIES as readonly string[]).includes(cat);
}

export function saveAllBlogs(blogs: BlogPost[]): void {
  const dir = path.dirname(STORE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(STORE_PATH, JSON.stringify({ blogs }, null, 2), "utf8");
}

export function createBlog(input: {
  title: string;
  subtitle?: string;
  category: BlogCategory;
  subcategory?: string;
  format?: string;
  readTime?: string;
  authorName?: string;
  coverImage: string;
  content: string;
  contentMode?: BlogContentMode;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  featuredOnHome?: boolean;
  published?: boolean;
  slug?: string;
}): BlogPost {
  const store = ensureStoreFile();
  const baseSlug = slugifyTitle(input.slug?.trim() || input.title) || `blog-${Date.now()}`;
  let uniqueSlug = baseSlug;
  let counter = 2;
  while (store.blogs.some((b) => b.slug === uniqueSlug)) {
    uniqueSlug = `${baseSlug}-${counter++}`;
  }

  const now = new Date().toISOString();
  const resolvedSubtitle =
    input.subtitle?.trim() ||
    input.metaDescription?.trim() ||
    stripHtmlToExcerpt(input.content);

  const blog: BlogPost = {
    id: `blog-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    slug: uniqueSlug,
    title: input.title.trim(),
    subtitle: resolvedSubtitle,
    category: input.category,
    subcategory: (input.subcategory || "Editorial").trim(),
    format: (input.format || "Feature").trim(),
    readTime: (input.readTime || "8 min read").trim(),
    authorName: (input.authorName || "The Royal Gallerys Editorial Desk").trim(),
    coverImage: input.coverImage.trim(),
    content: input.content.trim(),
    contentMode: input.contentMode || (/^\s*</.test(input.content) ? "html" : "text"),
    metaTitle: input.metaTitle?.trim() || input.title.trim(),
    metaDescription: input.metaDescription?.trim() || resolvedSubtitle,
    metaKeywords: input.metaKeywords?.trim() || "",
    featuredOnHome: input.featuredOnHome ?? true,
    published: input.published ?? true,
    publishedAt: now,
    updatedAt: now,
  };

  store.blogs.unshift(blog);
  saveAllBlogs(store.blogs);
  return blog;
}

export function updateBlog(
  id: string,
  updates: Partial<Omit<BlogPost, "id" | "publishedAt">>
): BlogPost | null {
  const store = ensureStoreFile();
  const idx = store.blogs.findIndex((b) => b.id === id);
  if (idx === -1) return null;

  const existing = store.blogs[idx];
  const updated: BlogPost = {
    ...existing,
    ...updates,
    id: existing.id,
    publishedAt: existing.publishedAt,
    updatedAt: new Date().toISOString(),
  };

  store.blogs[idx] = updated;
  saveAllBlogs(store.blogs);
  return updated;
}

export function deleteBlog(id: string): boolean {
  const store = ensureStoreFile();
  const next = store.blogs.filter((b) => b.id !== id);
  if (next.length === store.blogs.length) return false;
  saveAllBlogs(next);
  return true;
}
