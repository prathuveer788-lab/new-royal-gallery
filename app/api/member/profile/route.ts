import { NextResponse } from "next/server";
import { getCurrentMember } from "@/lib/membership/auth";
import { getMembershipStore, saveMembershipStore } from "@/lib/membership/store";

export async function PATCH(req: Request) {
  try {
    const member = await getCurrentMember();
    if (!member) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const body = await req.json();
    const { fullName, phone, whatsapp, address, city, state, country, pincode, email } = body;

    const store = getMembershipStore();
    const index = store.members.findIndex((m) => m.id === member.id);

    if (index === -1) {
      return NextResponse.json({ error: "Member record not found." }, { status: 404 });
    }

    const currentRecord = store.members[index];

    // If changing email, check uniqueness
    if (email && email.trim().toLowerCase() !== currentRecord.email.toLowerCase()) {
      const emailNormalized = email.trim().toLowerCase();
      const existing = store.members.find(
        (m) => m.id !== member.id && m.email.toLowerCase() === emailNormalized
      );
      if (existing) {
        return NextResponse.json(
          { error: "Another account is already registered with this email address." },
          { status: 409 }
        );
      }
      currentRecord.email = emailNormalized;
    }

    if (fullName && fullName.trim()) {
      currentRecord.fullName = fullName.trim();
      const parts = fullName.trim().split(" ");
      currentRecord.firstName = parts[0] || fullName.trim();
      currentRecord.lastName = parts.slice(1).join(" ") || "";
    }

    if (phone) currentRecord.phone = phone.trim();
    if (whatsapp !== undefined) currentRecord.whatsapp = whatsapp.trim();

    if (address !== undefined) currentRecord.address.street = address.trim();
    if (city !== undefined) currentRecord.address.city = city.trim();
    if (state !== undefined) currentRecord.address.state = state.trim();
    if (country !== undefined) currentRecord.address.country = country.trim();
    if (pincode !== undefined) currentRecord.address.pincode = pincode.trim();

    currentRecord.updatedAt = new Date().toISOString();

    store.members[index] = currentRecord;
    saveMembershipStore(store);

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully.",
      member: {
        id: currentRecord.id,
        membershipId: currentRecord.membershipId,
        fullName: currentRecord.fullName,
        firstName: currentRecord.firstName,
        lastName: currentRecord.lastName,
        email: currentRecord.email,
        phone: currentRecord.phone,
        whatsapp: currentRecord.whatsapp,
        address: currentRecord.address,
        membershipType: currentRecord.membershipType,
        status: currentRecord.status,
        joinedAt: currentRecord.joinedAt,
      },
    });
  } catch (err) {
    console.error("Profile update error:", err);
    return NextResponse.json({ error: "Failed to update profile." }, { status: 500 });
  }
}
