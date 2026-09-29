import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import {
  getMembershipStore,
  saveMembershipStore,
  getLiveMemberCount,
  generateNextMembershipId,
} from "@/lib/membership/store";
import { toSafeMember } from "@/lib/membership/auth";
import { sendMemberApprovedEmail } from "@/lib/membership/mailer";

const ADMIN_PASSCODE = process.env.EDITORIAL_ADMIN_KEY || "GSingh1977@@";
const ADMIN_COOKIE_NAME = "rg_admin_token";

async function verifyAdminAuth(req: Request): Promise<boolean> {
  const authHeader = req.headers.get("Authorization");
  if (authHeader && authHeader === `Bearer ${ADMIN_PASSCODE}`) {
    return true;
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return false;

  const expectedToken = crypto
    .createHmac("sha256", ADMIN_PASSCODE)
    .update("rg-editorial-admin-access")
    .digest("hex");

  return token === expectedToken;
}

export async function GET(req: Request) {
  const isAuthed = await verifyAdminAuth(req);
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized Editorial Office access." }, { status: 401 });
  }

  const store = getMembershipStore();
  const safeMembers = store.members.map((m) => toSafeMember(m));

  return NextResponse.json({
    config: store.config,
    liveMemberCount: getLiveMemberCount(store),
    members: safeMembers,
    submissions: store.submissions,
    printIssues: store.printIssues,
    privateFiles: store.privateFiles,
    collectorEditions: store.collectorEditions,
    notifications: store.notifications,
    dispatchedEmails: store.dispatchedEmails || [],
  });
}

export async function PATCH(req: Request) {
  const isAuthed = await verifyAdminAuth(req);
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized Editorial Office access." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action, payload } = body;
    const store = getMembershipStore();

    switch (action) {
      case "APPROVE_MEMBER": {
        const { memberId, customMembershipId } = payload;
        const member = store.members.find((m) => m.id === memberId);
        if (!member) return NextResponse.json({ error: "Member not found" }, { status: 404 });

        // Permanent identifier assignment
        const permanentId =
          customMembershipId && customMembershipId.trim()
            ? customMembershipId.trim().toUpperCase()
            : generateNextMembershipId(store);

        const now = new Date().toISOString();
        member.membershipId = permanentId;
        member.status = "ACTIVE";
        member.approvedAt = now;
        member.updatedAt = now;
        member.payment.verified = true;
        member.payment.paidAt = now;

        // Add member notification
        store.notifications.unshift({
          id: `notif-appr-${Date.now()}`,
          memberId: member.id,
          title: "Membership Approved — Welcome to The Royal Gallery Circle",
          message: `Your application has been formally approved by the Editorial Office. Your Permanent Identifier is ${permanentId}. Your Digital Membership Card is now unlocked.`,
          category: "ANNOUNCEMENT",
          createdAt: now,
        });

        // Save immediately before email
        saveMembershipStore(store);

        // Dispatch approval email to the member
        try {
          await sendMemberApprovedEmail(member);
        } catch (e) {
          console.error("Member approval email dispatch error:", e);
        }

        return NextResponse.json({
          success: true,
          message: `Member ${member.fullName} approved with Permanent ID ${permanentId}.`,
          member: toSafeMember(member),
          liveMemberCount: getLiveMemberCount(store),
        });
      }

      case "UPDATE_MEMBER_STATUS": {
        const { memberId, status } = payload;
        const member = store.members.find((m) => m.id === memberId);
        if (!member) return NextResponse.json({ error: "Member not found" }, { status: 404 });
        member.status = status;
        member.updatedAt = new Date().toISOString();
        break;
      }

      case "UPDATE_SUBMISSION_STATUS": {
        const { submissionId, status, internalNotes } = payload;
        const submission = store.submissions.find((s) => s.id === submissionId);
        if (!submission) return NextResponse.json({ error: "Submission not found" }, { status: 404 });
        if (status) submission.status = status;
        if (internalNotes !== undefined) submission.internalNotes = internalNotes;
        submission.updatedAt = new Date().toISOString();

        store.notifications.unshift({
          id: `notif-sub-update-${Date.now()}`,
          memberId: submission.memberId,
          title: `Submission Update: ${submission.title}`,
          message: `Your story submission status has been updated to "${submission.status}" by the Editorial Office.`,
          category: "EDITORIAL",
          createdAt: new Date().toISOString(),
        });
        break;
      }

      case "UPDATE_PRINT_ISSUE": {
        const { issueId, status, dispatchDate, trackingNumber } = payload;
        const issue = store.printIssues.find((i) => i.id === issueId);
        if (!issue) return NextResponse.json({ error: "Issue not found" }, { status: 404 });
        if (status) issue.status = status;
        if (dispatchDate) issue.dispatchDate = dispatchDate;
        if (trackingNumber !== undefined) issue.trackingNumber = trackingNumber;
        break;
      }

      case "UPDATE_CONFIG": {
        const { memberCount, membershipPrice } = payload;
        if (memberCount !== undefined && !isNaN(Number(memberCount))) {
          store.config.memberCount = Number(memberCount);
        }
        if (membershipPrice !== undefined && !isNaN(Number(membershipPrice))) {
          store.config.membershipPrice = Number(membershipPrice);
        }
        break;
      }

      case "ADD_NOTIFICATION": {
        const { title, message, category, memberId } = payload;
        store.notifications.unshift({
          id: `notif-adm-${Date.now()}`,
          memberId: memberId || undefined,
          title,
          message,
          category: category || "ANNOUNCEMENT",
          createdAt: new Date().toISOString(),
        });
        break;
      }

      default:
        return NextResponse.json({ error: "Unrecognized admin action." }, { status: 400 });
    }

    saveMembershipStore(store);
    return NextResponse.json({
      success: true,
      message: "Changes saved successfully.",
      liveMemberCount: getLiveMemberCount(store),
    });
  } catch (err) {
    console.error("Admin PATCH error:", err);
    return NextResponse.json({ error: "Failed to apply admin updates." }, { status: 500 });
  }
}
