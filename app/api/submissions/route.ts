import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/admin/auth";
import {
  addSubmission,
  getAllSubmissions,
  type SubmissionType,
} from "@/lib/submissions/store";

export const dynamic = "force-dynamic";

const EDITORIAL_EMAIL = "hey.theroyalsgallery@gmail.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function notifyEditorialOffice(subject: string, text: string): Promise<void> {
  console.log(`\n[SUBMISSION] ${subject}\n${text}\n`);

  if (!process.env.RESEND_API_KEY) return;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "The Royal Gallerys <circle@theroyalgallerys.com>",
        to: [EDITORIAL_EMAIL],
        subject,
        text,
      }),
    });
  } catch (err) {
    console.error("[Submissions API] External email dispatch failed:", err);
  }
}

export async function GET(req: NextRequest) {
  if (!verifyAdminAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const submissions = await getAllSubmissions();
  return NextResponse.json({ submissions });
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    const rawType = String(body.type || "").trim();
    const type: SubmissionType =
      rawType === "media-kit" || rawType === "partnership" ? rawType : "newsletter";

    const email = String(body.email || body.workEmail || "").trim().toLowerCase();
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const fullName = String(body.fullName || "").trim() || undefined;
    const company = String(body.company || "").trim() || undefined;
    const jobTitle = String(body.jobTitle || "").trim() || undefined;
    const brandCategory = String(body.brandCategory || "").trim() || undefined;
    const phone = String(body.phone || "").trim() || undefined;
    const message = String(body.message || "").trim() || undefined;
    const source = String(body.source || type).trim();
    const interests = Array.isArray(body.interests)
      ? body.interests.map((x) => String(x).trim()).filter(Boolean)
      : undefined;

    if (type !== "newsletter" && !fullName) {
      return NextResponse.json(
        { error: "Full name is required." },
        { status: 400 }
      );
    }

    if (type === "media-kit" && (!company || !jobTitle || !brandCategory)) {
      return NextResponse.json(
        { error: "Company, job title, and brand category are required." },
        { status: 400 }
      );
    }

    const saved = await addSubmission({
      type,
      email,
      fullName,
      company,
      jobTitle,
      brandCategory,
      phone,
      interests,
      message,
      source,
    });

    const subject =
      type === "media-kit"
        ? `[MEDIA KIT] ${company || email}`
        : type === "partnership"
          ? `[PARTNERSHIP] ${fullName || email}`
          : `[DISPATCH SUBSCRIBER] ${email}`;

    const details = [
      `Type: ${type}`,
      `Email: ${email}`,
      fullName ? `Name: ${fullName}` : null,
      company ? `Company: ${company}` : null,
      jobTitle ? `Job Title: ${jobTitle}` : null,
      brandCategory ? `Category: ${brandCategory}` : null,
      phone ? `Phone: ${phone}` : null,
      interests && interests.length ? `Interests: ${interests.join(", ")}` : null,
      message ? `Message: ${message}` : null,
      `Source: ${source}`,
      `Submitted: ${saved.submittedAt}`,
    ]
      .filter(Boolean)
      .join("\n");

    await notifyEditorialOffice(subject, details);

    return NextResponse.json({ success: true, id: saved.id });
  } catch (err) {
    console.error("[Submissions API] POST failed:", err);
    return NextResponse.json(
      { error: "Could not process submission." },
      { status: 500 }
    );
  }
}
