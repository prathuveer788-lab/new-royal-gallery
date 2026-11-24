import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { verifyAdminAuth } from "@/lib/admin/auth";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  isValidCategory,
  slugifyTitle,
  updateBlog,
} from "@/lib/blogs/store";

export const dynamic = "force-dynamic";

function saveUploadedCoverImage(imageData: string, titleHint: string): string {
  const match = imageData.match(/^data:image\/(png|jpe?g|webp|avif);base64,(.+)$/i);
  if (!match) {
    throw new Error("Unsupported image format. Please upload PNG, JPG, WEBP, or AVIF.");
  }

  const rawExt = match[1].toLowerCase();
  const ext = rawExt === "jpeg" ? "jpg" : rawExt;
  const buffer = Buffer.from(match[2], "base64");
  if (buffer.length > 8 * 1024 * 1024) {
    throw new Error("Cover image must be under 8 MB.");
  }

  const dir = path.join(process.cwd(), "public", "images", "blogs");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const safeName = slugifyTitle(titleHint) || "blog";
  const filename = `${safeName}-${Date.now()}.${ext}`;
  fs.writeFileSync(path.join(dir, filename), buffer);
  return `/images/blogs/${filename}`;
}

export async function GET(req: Request) {
  const isAuthed = await verifyAdminAuth(req);
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized Editorial Office access." }, { status: 401 });
  }
  return NextResponse.json({ blogs: getAllBlogs() });
}

export async function POST(req: Request) {
  const isAuthed = await verifyAdminAuth(req);
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized Editorial Office access." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      title,
      subtitle,
      category,
      subcategory,
      format,
      readTime,
      authorName,
      coverImage,
      imageData,
      content,
      featuredOnHome,
      published,
      slug,
    } = body;

    if (!title?.trim() || !subtitle?.trim() || !content?.trim()) {
      return NextResponse.json(
        { error: "Title, subtitle, and blog content are required." },
        { status: 400 }
      );
    }

    if (!category || !isValidCategory(category)) {
      return NextResponse.json(
        { error: "Please select a valid blog category." },
        { status: 400 }
      );
    }

    let resolvedImage = (coverImage || "").trim();
    if (imageData && typeof imageData === "string") {
      resolvedImage = saveUploadedCoverImage(imageData, title);
    }

    if (!resolvedImage) {
      resolvedImage = "/images/hero/jaipur-city-palace-grand-facade.jpg";
    }

    const blog = createBlog({
      title,
      subtitle,
      category,
      subcategory,
      format,
      readTime,
      authorName,
      coverImage: resolvedImage,
      content,
      featuredOnHome,
      published,
      slug,
    });

    return NextResponse.json({ success: true, blog });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create blog." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  const isAuthed = await verifyAdminAuth(req);
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized Editorial Office access." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, imageData, ...updates } = body;
    if (!id) {
      return NextResponse.json({ error: "Blog id is required." }, { status: 400 });
    }

    if (updates.category && !isValidCategory(updates.category)) {
      return NextResponse.json({ error: "Invalid category." }, { status: 400 });
    }

    if (imageData && typeof imageData === "string") {
      updates.coverImage = saveUploadedCoverImage(imageData, updates.title || "blog");
    }

    if (updates.slug) {
      updates.slug = slugifyTitle(updates.slug);
    }

    const updated = updateBlog(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Blog not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, blog: updated });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update blog." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const isAuthed = await verifyAdminAuth(req);
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized Editorial Office access." }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Blog id is required." }, { status: 400 });
    }

    const removed = deleteBlog(id);
    if (!removed) {
      return NextResponse.json({ error: "Blog not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to delete blog." },
      { status: 500 }
    );
  }
}
