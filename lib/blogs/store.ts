import fs from "fs";
import os from "os";
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

export type BlogStorageMode = "kv" | "local" | "tmp";

interface BlogsStore {
  blogs: BlogPost[];
}

const REPO_STORE_PATH = path.join(process.cwd(), "data", "blogs-store.json");
const TMP_STORE_PATH = path.join(os.tmpdir(), "royal-gallerys-blogs-store.json");
const KV_KEY = "rg_blogs_store_v1";

const SEED_BLOGS: BlogPost[] = [];

function getKvConfig(): { url: string; token: string } | null {
  const url =
    process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
  const token =
    process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";
  if (url && token) {
    return { url: url.replace(/\/$/, ""), token };
  }
  return null;
}

export function getBlogStorageMode(): BlogStorageMode {
  if (getKvConfig()) return "kv";
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) return "tmp";
  return "local";
}

function readLocalSeed(): BlogsStore {
  try {
    if (fs.existsSync(REPO_STORE_PATH)) {
      const parsed = JSON.parse(fs.readFileSync(REPO_STORE_PATH, "utf8")) as BlogsStore;
      if (Array.isArray(parsed.blogs)) return parsed;
    }
  } catch {}
  return { blogs: SEED_BLOGS };
}

function readFilesystemStore(): BlogsStore {
  // Check writable /tmp store first when running in serverless/read-only environments
  if (getBlogStorageMode() === "tmp") {
    try {
      if (fs.existsSync(TMP_STORE_PATH)) {
        const parsed = JSON.parse(fs.readFileSync(TMP_STORE_PATH, "utf8")) as BlogsStore;
        if (Array.isArray(parsed.blogs)) return parsed;
      }
    } catch {}
    return readLocalSeed();
  }

  try {
    const dir = path.dirname(REPO_STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(REPO_STORE_PATH)) {
      const initial: BlogsStore = { blogs: SEED_BLOGS };
      fs.writeFileSync(REPO_STORE_PATH, JSON.stringify(initial, null, 2), "utf8");
      return initial;
    }
    const parsed = JSON.parse(fs.readFileSync(REPO_STORE_PATH, "utf8")) as BlogsStore;
    if (Array.isArray(parsed.blogs)) return parsed;
  } catch {
    // Fallback to /tmp if repo path is read-only
    try {
      if (fs.existsSync(TMP_STORE_PATH)) {
        const parsed = JSON.parse(fs.readFileSync(TMP_STORE_PATH, "utf8")) as BlogsStore;
        if (Array.isArray(parsed.blogs)) return parsed;
      }
    } catch {}
  }
  return readLocalSeed();
}

function writeFilesystemStore(blogs: BlogPost[]): void {
  const payload = JSON.stringify({ blogs }, null, 2);

  if (getBlogStorageMode() !== "tmp") {
    try {
      const dir = path.dirname(REPO_STORE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(REPO_STORE_PATH, payload, "utf8");
      return;
    } catch (err: unknown) {
      const code = (err as NodeJS.ErrnoException)?.code;
      if (code !== "EROFS" && code !== "EACCES" && code !== "EPERM") {
        throw err;
      }
    }
  }

  fs.writeFileSync(TMP_STORE_PATH, payload, "utf8");
}

async function readStore(): Promise<BlogsStore> {
  const kv = getKvConfig();
  if (kv) {
    try {
      const res = await fetch(kv.url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${kv.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(["GET", KV_KEY]),
        cache: "no-store",
      });
      if (res.ok) {
        const data = (await res.json()) as { result?: string | null };
        if (data.result) {
          const parsed = JSON.parse(data.result) as BlogsStore;
          if (Array.isArray(parsed.blogs)) return parsed;
        }
        return readLocalSeed();
      }
    } catch (err) {
      console.error("KV read error, falling back to local store:", err);
    }
  }
  return readFilesystemStore();
}

async function writeStore(blogs: BlogPost[]): Promise<void> {
  const kv = getKvConfig();
  if (kv) {
    const res = await fetch(kv.url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${kv.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(["SET", KV_KEY, JSON.stringify({ blogs })]),
      cache: "no-store",
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      throw new Error(`Failed to persist blogs to KV store (${res.status}): ${errText}`);
    }
    return;
  }

  writeFilesystemStore(blogs);
}

export async function getAllBlogs(): Promise<BlogPost[]> {
  const store = await readStore();
  return [...store.blogs].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getPublishedBlogs(category?: string): Promise<BlogPost[]> {
  const all = (await getAllBlogs()).filter((b) => b.published);
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

export async function getHomeCuratedBlogs(): Promise<BlogPost[]> {
  const published = await getPublishedBlogs();
  const featured = published.filter((b) => b.featuredOnHome);
  return featured.length > 0 ? featured : published;
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | undefined> {
  const blogs = await getAllBlogs();
  return blogs.find((b) => b.slug === slug);
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

export async function createBlog(input: {
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
}): Promise<BlogPost> {
  const store = await readStore();
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
  await writeStore(store.blogs);
  return blog;
}

export async function updateBlog(
  id: string,
  updates: Partial<Omit<BlogPost, "id" | "publishedAt">>
): Promise<BlogPost | null> {
  const store = await readStore();
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
  await writeStore(store.blogs);
  return updated;
}

export async function deleteBlog(id: string): Promise<boolean> {
  const store = await readStore();
  const next = store.blogs.filter((b) => b.id !== id);
  if (next.length === store.blogs.length) return false;
  await writeStore(next);
  return true;
}
