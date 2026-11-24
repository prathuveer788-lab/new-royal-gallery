import { NextResponse } from "next/server";
import { getHomeCuratedBlogs, getPublishedBlogs } from "@/lib/blogs/store";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || undefined;
  const featured = searchParams.get("featured");

  const blogs =
    featured === "true" && !category
      ? getHomeCuratedBlogs()
      : getPublishedBlogs(category);

  return NextResponse.json({ blogs });
}
