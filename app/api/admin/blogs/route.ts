import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { verifyAdminAuth } from "@/lib/admin/auth";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogStorageMode,
  isValidCategory,
  slugifyTitle,
  updateBlog,
} from "@/lib/blogs/store";

export const dynamic = "force-dynamic";

async function saveUploadedCoverImage(imageData: string, titleHint: string): Promise<string> {
  const match = imageData.match(/^data:image\/(png|jpe?g|webp|avif);base64,(.+)$/i);
  if (!match) {
    throw new Error("Unsupported image format. Please upload PNG, JPG, WEBP, or AVIF.");
  }

  const rawExt = match[1].toLowerCase();
  const ext = rawExt === "jpeg" ? "jpg" : rawExt;
  const contentType = `image/${rawExt === "jpg" ? "jpeg" : rawExt}`;
  const buffer = Buffer.from(match[2], "base64");
  if (buffer.length > 8 * 1024 * 1024) {
    throw new Error("Cover image must be under 8 MB.");
  }

  const safeName = slugifyTitle(titleHint) || "blog";
  const filename = `${safeName}-${Date.now()}.${ext}`;

  // 1. If Vercel Blob token is configured, upload directly to Vercel Blob
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  if (blobToken) {
    const res = await fetch(`https://blob.vercel-storage.com/blogs/${filename}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${blobToken}`,
        "x-api-version": "7",
        "x-content-type": contentType,
      },
      body: buffer,
    });
    if (res.ok) {
      const data = (await res.json()) as { url?: string };
      if (data.url) return data.url;
    }
  }

  // 2. Try saving to public/images/blogs/ on writable local/VPS filesystems
  if (!process.env.VERCEL && !process.env.AWS_LAMBDA_FUNCTION_NAME) {
    try {
      const dir = path.join(process.cwd(), "public", "images", "blogs");
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(path.join(dir, filename), buffer);
      return `/images/blogs/${filename}`;
    } catch (err: unknown) {
      const code = (err as NodeJS.ErrnoException)?.code;
      if (code !== "EROFS" && code !== "EACCES" && code !== "EPERM") {
        throw err;
      }
    }
  }

  // 3. Fallback on read-only serverless filesystems (e.g. Vercel without Blob):
  // Keep inline Data URL so image renders cleanly without EROFS error.
  if (buffer.length > 2 * 1024 * 1024) {
    throw new Error(
      "On Vercel read-only storage, please upload an image under 2 MB or paste an image URL."
    );
  }
  return imageData;
}

export async function GET(req: Request) {
  const isAuthed = await verifyAdminAuth(req);
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized Editorial Office access." }, { status: 401 });
  }
  return NextResponse.json({
    blogs: await getAllBlogs(),
    storageMode: getBlogStorageMode(),
  });
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
      contentMode,
      metaTitle,
      metaDescription,
      metaKeywords,
      featuredOnHome,
      published,
      slug,
    } = body;

    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json(
        { error: "Title and Blog Code / Content are required." },
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
      resolvedImage = await saveUploadedCoverImage(imageData, title);
    }

    if (!resolvedImage) {
      resolvedImage = "/images/hero/jaipur-city-palace-grand-facade.jpg";
    }

    const blog = await createBlog({
      title,
      subtitle,
      category,
      subcategory,
      format,
      readTime,
      authorName,
      coverImage: resolvedImage,
      content,
      contentMode,
      metaTitle,
      metaDescription,
      metaKeywords,
      featuredOnHome,
      published,
      slug,
    });

    return NextResponse.json({
      success: true,
      blog,
      storageMode: getBlogStorageMode(),
    });
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
      updates.coverImage = await saveUploadedCoverImage(imageData, updates.title || "blog");
    }

    if (updates.slug) {
      updates.slug = slugifyTitle(updates.slug);
    }

    const updated = await updateBlog(id, updates);
    if (!updated) {
      return NextResponse.json({ error: "Blog not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      blog: updated,
      storageMode: getBlogStorageMode(),
    });
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

    const removed = await deleteBlog(id);
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
