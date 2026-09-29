import { NextResponse } from "next/server";
import crypto from "crypto";
import { getCurrentMember } from "@/lib/membership/auth";
import {
  getMembershipStore,
  saveMembershipStore,
  EditorialSubmission,
} from "@/lib/membership/store";
import { sendEditorialSubmissionAlert } from "@/lib/membership/mailer";

export async function POST(req: Request) {
  try {
    const member = await getCurrentMember();
    if (!member) {
      return NextResponse.json(
        { error: "Unauthorized. You must be an active member to submit to the Editorial Desk." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { title, category, description, notes, attachments } = body;

    if (!title || !description || !category) {
      return NextResponse.json(
        { error: "Title, category, and story description are required." },
        { status: 400 }
      );
    }

    const store = getMembershipStore();

    const submissionId = `SUB-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(2).toString("hex").toUpperCase()}`;
    const now = new Date().toISOString();

    const submission: EditorialSubmission = {
      id: submissionId,
      memberId: member.id,
      memberEmail: member.email,
      memberName: member.fullName,
      membershipId: member.membershipId,
      title: title.trim(),
      category: category.trim(),
      description: description.trim(),
      notes: notes ? notes.trim() : undefined,
      attachments: Array.isArray(attachments) ? attachments : [],
      status: "Submitted",
      internalNotes: "",
      submittedAt: now,
      updatedAt: now,
    };

    store.submissions.unshift(submission);

    // Also add member notification
    store.notifications.unshift({
      id: `notif-sub-${submissionId}`,
      memberId: member.id,
      title: "Editorial Desk Submission Received",
      message: `Your story "${submission.title}" has been assigned reference ${submissionId} and queued for priority editorial review.`,
      category: "EDITORIAL",
      createdAt: now,
    });

    saveMembershipStore(store);

    // Dispatch email alert to Editorial Office
    try {
      const fullMember = store.members.find((m) => m.id === member.id);
      if (fullMember) {
        await sendEditorialSubmissionAlert(submission, fullMember);
      }
    } catch (e) {
      console.error("Submission email alert error:", e);
    }

    return NextResponse.json({
      success: true,
      submissionId,
      message: "Thank you. Your material has been received by The Royal Gallerys Editorial Office.",
      submission,
    });
  } catch (err) {
    console.error("Story submission error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your submission." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const member = await getCurrentMember();
    if (!member) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const store = getMembershipStore();
    const memberSubmissions = store.submissions.filter((s) => s.memberId === member.id);

    return NextResponse.json({
      success: true,
      submissions: memberSubmissions,
    });
  } catch (err) {
    console.error("Error fetching submissions:", err);
    return NextResponse.json({ error: "Failed to fetch submissions." }, { status: 500 });
  }
}
