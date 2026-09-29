import { NextResponse } from "next/server";
import { getCurrentMember } from "@/lib/membership/auth";
import { getMembershipStore, getLiveMemberCount } from "@/lib/membership/store";

export async function GET() {
  try {
    const store = getMembershipStore();
    const liveCount = getLiveMemberCount(store);
    const member = await getCurrentMember();

    return NextResponse.json({
      authenticated: !!member,
      member: member || null,
      config: {
        memberCount: liveCount,
        price: store.config.membershipPrice,
        currency: store.config.currency || "INR",
      },
    });
  } catch (err) {
    console.error("Error in /api/member/me:", err);
    return NextResponse.json({ error: "Failed to retrieve status." }, { status: 500 });
  }
}
