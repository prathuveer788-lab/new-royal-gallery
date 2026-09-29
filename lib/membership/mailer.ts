import {
  MemberAccount,
  EditorialSubmission,
  getMembershipStore,
  saveMembershipStore,
  DispatchedEmail,
} from "./store";

const EDITORIAL_OFFICE_EMAIL = "hey.theroyalsgallery@gmail.com";

function recordDispatchedEmail(
  to: string,
  subject: string,
  body: string,
  type: DispatchedEmail["type"]
) {
  try {
    const store = getMembershipStore();
    const emailRecord: DispatchedEmail = {
      id: `EML-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      to,
      from: "The Royal Gallerys Editorial Office <circle@theroyalgallerys.com>",
      subject,
      body,
      type,
      sentAt: new Date().toISOString(),
      status: "SENT",
    };
    if (!store.dispatchedEmails) store.dispatchedEmails = [];
    store.dispatchedEmails.unshift(emailRecord);
    saveMembershipStore(store);
  } catch (err) {
    console.error("Failed to record dispatched email:", err);
  }
}

/**
 * 1. Alert sent to Editorial Office when someone applies to join The Royal Gallery Circle
 */
export async function sendEditorialOfficeNewMemberAlert(member: MemberAccount): Promise<boolean> {
  const subject = `[NEW APPLICATION] The Royal Gallery Circle — ${member.fullName} (${member.email})`;

  const textContent = `
================================================================================
NEW APPLICATION RECEIVED FOR THE ROYAL GALLERY CIRCLE
Destination: ${EDITORIAL_OFFICE_EMAIL}
Date & Time: ${new Date(member.joinedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}
--------------------------------------------------------------------------------
A reader has applied to join The Royal Gallery Circle (₹3,999 Lifetime).

APPLICANT DETAILS:
- Full Name: ${member.fullName}
- Email: ${member.email}
- Mobile Phone: ${member.phone}
- WhatsApp: ${member.whatsapp || member.phone}

REGISTERED MAILING ADDRESS (FOR PRINT VOLUMES):
- Street: ${member.address.street}
- City: ${member.address.city}
- State: ${member.address.state}
- Country: ${member.address.country}
- PIN / ZIP: ${member.address.pincode}

APPLICATION STATUS: PENDING EDITORIAL APPROVAL
Order ID: ${member.payment.orderId}
Proposed Permanent Identifier: ${member.membershipId}

ACTION REQUIRED BY EDITORIAL OFFICE:
To approve this member and activate their Digital Membership Card:
Open Editorial Office Console: http://localhost:3000/editorial-office
Click "Approve & Activate Lifetime Member"
================================================================================
  `.trim();

  // Print with high visibility in server console on localhost
  console.log("\n" + textContent + "\n");

  recordDispatchedEmail(EDITORIAL_OFFICE_EMAIL, subject, textContent, "APPLICATION_ALERT");

  if (process.env.RESEND_API_KEY) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "The Royal Gallerys <circle@theroyalgallerys.com>",
          to: [EDITORIAL_OFFICE_EMAIL],
          subject,
          text: textContent,
        }),
      });
    } catch (e) {
      console.error("External email dispatch note:", e);
    }
  }

  return true;
}

/**
 * 2. Official notification sent to member when approved by the Editorial Office
 */
export async function sendMemberApprovedEmail(member: MemberAccount): Promise<boolean> {
  const subject = `Approved: Welcome to The Royal Gallery Circle — Permanent ID: ${member.membershipId}`;

  const textContent = `
================================================================================
THE ROYAL GALLERY CIRCLE — MEMBERSHIP APPROVAL
Destination: ${member.email}
--------------------------------------------------------------------------------
Dear ${member.firstName || member.fullName},

We are honoured to inform you that your application for The Royal Gallery Circle has been formally approved by The Royal Gallerys Editorial Office.

YOUR OFFICIAL MEMBERSHIP CREDENTIALS:
- Member Name: ${member.fullName}
- Permanent Identifier: ${member.membershipId}
- Standing: ACTIVE — LIFETIME MEMBER
- One-Time Fee: ₹${member.amountPaid.toLocaleString("en-IN")} (Lifetime)
- Date Admitted: ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}

YOUR DIGITAL MEMBERSHIP CARD IS NOW UNLOCKED:
You can immediately view, download, and store your high-resolution Digital Membership Card inside your private dashboard:
http://localhost:3000/member/dashboard

YOUR SIX CORE BENEFITS ARE ACTIVE:
01 — 3 Annual Hardcover Print Issues delivered to your registered address
02 — Complete Royal Gallerys Archive & Private Folios
03 — 3 Private Dossiers / Year
04 — Direct Editorial Desk Access
05 — Priority Editorial Consideration
06 — Annual Digital Collector's Edition

With highest regards,
The Editorial Office
The Royal Gallerys
hey.theroyalsgallery@gmail.com
================================================================================
  `.trim();

  console.log("\n" + textContent + "\n");

  recordDispatchedEmail(member.email, subject, textContent, "MEMBER_APPROVAL");

  return true;
}

export const sendMemberWelcomeEmail = sendMemberApprovedEmail;

/**
 * 3. Alert sent when a member submits a story/dossier to Editorial Desk
 */
export async function sendEditorialSubmissionAlert(
  submission: EditorialSubmission,
  member: MemberAccount
): Promise<boolean> {
  const subject = `[EDITORIAL DESK] Story Proposal: ${submission.title} — ${member.fullName} (${submission.membershipId})`;

  const textContent = `
================================================================================
NEW EDITORIAL DESK SUBMISSION
Destination: ${EDITORIAL_OFFICE_EMAIL}
--------------------------------------------------------------------------------
Member: ${member.fullName} (${submission.membershipId})
Email: ${member.email} | Phone: ${member.phone}
Category: ${submission.category}
Submission ID: ${submission.id}
Date: ${new Date(submission.submittedAt).toUTCString()}

Title: ${submission.title}
Story Context:
${submission.description}

Notes/Links: ${submission.notes || "None"}

Review in Editorial Office Console: http://localhost:3000/editorial-office
================================================================================
  `.trim();

  console.log("\n" + textContent + "\n");

  recordDispatchedEmail(EDITORIAL_OFFICE_EMAIL, subject, textContent, "SUBMISSION_ALERT");

  return true;
}
