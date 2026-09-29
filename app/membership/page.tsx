"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const BENEFITS = [
  {
    num: "01",
    title: "3 Annual Print Issues",
    description:
      "Receive all three physical hardcover volumes of The Royal Gallerys delivered to your registered physical address worldwide.",
    highlight: "Hardcover Print",
  },
  {
    num: "02",
    title: "The Complete Royal Archive",
    description:
      "Unrestricted digital access to current and previous volumes, private royal photographic folios, and historical manuscripts.",
    highlight: "Full Archival Access",
  },
  {
    num: "03",
    title: "3 Private Files / Year",
    description:
      "Receive three confidential, substantial digital dossiers curated annually by our editors on rare jewels, court recipes, and royal provenance.",
    highlight: "Private Dossiers",
  },
  {
    num: "04",
    title: "Editorial Desk Access",
    description:
      "Direct portal to submit your heritage discoveries, family archives, estates, and travel experiences directly to The Royal Gallerys Editorial Office.",
    highlight: "Direct Submission",
  },
  {
    num: "05",
    title: "Priority Editorial Consideration",
    description:
      "Member proposals receive priority review by senior editors. Every proposal is considered with scholarly care (publication is not guaranteed).",
    highlight: "Priority Review",
  },
  {
    num: "06",
    title: "Annual Digital Collector’s Edition",
    description:
      "Receive one separately curated annual digital heritage publication created as an encyclopedic collector's volume of timeless craftsmanship.",
    highlight: "Collector's Compendium",
  },
];

export default function MembershipPage() {
  const router = useRouter();

  // Dynamic live member count
  const [memberCount, setMemberCount] = useState<number>(3592);
  const [membershipPrice, setMembershipPrice] = useState<number>(3999);

  // Application Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("India");
  const [pincode, setPincode] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [assignedId, setAssignedId] = useState("");

  // Load configured live member count
  useEffect(() => {
    fetch("/api/member/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.config?.memberCount) {
          setMemberCount(data.config.memberCount);
        }
        if (data.config?.price) {
          setMembershipPrice(data.config.price);
        }
      })
      .catch(() => {});
  }, []);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!fullName || !email || !password || !confirmPassword || !phone) {
      setErrorMsg("Please complete all required identity details.");
      return;
    }

    if (password.length < 8) {
      setErrorMsg("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    if (!streetAddress || !city || !pincode) {
      setErrorMsg("Please provide your physical mailing address for print volume dispatches.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/member/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          whatsapp: whatsapp || phone,
          password,
          confirmPassword,
          address: streetAddress,
          city,
          state,
          country,
          pincode,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit application.");
      }

      setAssignedId(data.proposedMembershipId || "RGC-003593");
      setSubmitted(true);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Error submitting application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#FAF8F5", color: "#111111" }} className="min-h-screen">
      {/* ════════════════════════════════════════════════
          01 — VOGUE LIGHT EDITORIAL HERO
          ════════════════════════════════════════════════ */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 px-6 sm:px-8 md:px-12 text-center border-b border-[#111111]/10">
        <div className="max-w-4xl mx-auto">
          {/* Subtle Tracked Label */}
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.38em] font-sans font-semibold text-[#8A7352] mb-4">
            The International Editorial Circle
          </p>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif leading-[0.95] tracking-tight mb-6 text-[#111111]"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}
          >
            The Royal Gallery Circle
          </h1>

          <div className="w-16 h-px mx-auto my-6 bg-[#8A7352]" />

          <p className="text-base sm:text-lg font-sans font-light leading-relaxed max-w-2xl mx-auto text-[#555555] mb-12">
            A private digital membership and archival communion for custodians, connoisseurs, and admirers of global heritage, living culture, and timeless connoisseurship.
          </p>

          {/* ════════ REQUIREMENT 3 — PROMINENT MEMBER COUNT ════════ */}
          <div className="py-8 px-6 max-w-md mx-auto border-y border-[#111111]/15 bg-white/70 shadow-sm mb-12">
            <div
              className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#111111] tracking-wider"
              style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}
            >
              {memberCount.toLocaleString("en-IN")} MEMBERS
            </div>
            <p className="mt-2 text-xs sm:text-sm uppercase tracking-[0.28em] font-sans text-[#8A7352] font-semibold">
              Next is you.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#enrollment-form"
              className="w-full sm:w-auto px-10 sm:px-14 py-4 text-xs sm:text-sm uppercase tracking-[0.24em] font-sans font-medium transition-all duration-300 bg-[#111111] text-[#FAF8F5] hover:bg-[#8A7352]"
            >
              Apply for Lifetime Membership →
            </a>

            <Link
              href="/member/login"
              className="w-full sm:w-auto px-10 sm:px-12 py-4 text-xs sm:text-sm uppercase tracking-[0.24em] font-sans font-medium transition-all duration-300 border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-[#FAF8F5]"
            >
              Member Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          02 — SINGLE MEMBERSHIP EDITORIAL BANNER
          ════════════════════════════════════════════════ */}
      <section className="py-12 px-6 bg-white border-b border-[#111111]/10 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#8A7352]">
            Single Lifetime Tier
          </span>
          <div className="mt-2 text-3xl sm:text-4xl md:text-5xl font-serif text-[#111111]">
            ₹{membershipPrice.toLocaleString("en-IN")}{" "}
            <span className="text-xl sm:text-2xl font-light text-[#8A7352] font-sans tracking-widest">
              — LIFETIME
            </span>
          </div>
          <p className="mt-3 text-xs sm:text-sm font-sans text-[#666666] max-w-xl mx-auto leading-relaxed">
            This is a one-time payment. There are no monthly or annual membership fees. Complete lifelong access to the international publication, private files, and archives.
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          03 — SIX CORE BENEFITS (LIGHT VOGUE GRID)
          ════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 px-6 sm:px-8 md:px-12 lg:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#8A7352]">
            Custodial Privileges
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-serif mt-2 text-[#111111]"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}
          >
            The Six Core Benefits
          </h2>
          <div className="w-12 h-px mx-auto my-4 bg-[#8A7352]/40" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BENEFITS.map((b) => (
            <div
              key={b.num}
              className="p-8 sm:p-10 bg-white border border-[#111111]/10 flex flex-col justify-between transition-all duration-300 hover:border-[#8A7352] hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-[#111111]/5">
                  <span className="text-xs uppercase tracking-[0.24em] font-mono font-bold text-[#8A7352]">
                    {b.num}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] font-sans text-[#777777]">
                    {b.highlight}
                  </span>
                </div>
                <h3
                  className="text-2xl font-serif text-[#111111] mb-3 font-normal"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm font-sans text-[#666666] leading-relaxed">
                  {b.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#111111]/5 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#8A7352] font-medium">
                <span>Lifetime Standing</span>
                <span>✓ Included</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          04 — ENROLLMENT & JOINING PROCESS (LIGHT VOGUE)
          ════════════════════════════════════════════════ */}
      <section
        id="enrollment-form"
        className="py-20 sm:py-28 px-6 sm:px-8 md:px-12 bg-white border-t border-[#111111]/10"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#8A7352]">
              Admittance Procedure
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-serif mt-2 text-[#111111]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Apply for The Royal Gallery Circle
            </h2>
            <div className="w-12 h-px mx-auto my-4 bg-[#8A7352]/40" />
            <p className="text-xs sm:text-sm font-sans text-[#666666] max-w-lg mx-auto leading-relaxed">
              Complete your membership application. Upon submission, your details are transmitted directly to the Editorial Office at{" "}
              <strong className="text-[#111111]">hey.theroyalsgallery@gmail.com</strong> for review and permanent credential assignment.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-800 text-xs font-sans">
              {errorMsg}
            </div>
          )}

          {submitted ? (
            <div className="p-8 sm:p-12 border-2 border-[#111111] bg-white text-center space-y-6 shadow-md max-w-2xl mx-auto">
              <span className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#8A7352] font-semibold block">
                Application Transmitted to Editorial Office
              </span>
              <h3
                className="text-3xl sm:text-4xl font-serif text-[#111111]"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Thank You, {fullName.toUpperCase()}
              </h3>

              {/* ── PROMINENT PAYMENT & ACTIVATION NOTICE ── */}
              <div className="p-6 bg-[#FAF8F5] border-2 border-[#8A7352]/50 text-center space-y-3">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#8A7352]/10 text-[#8A7352] text-sm font-serif">
                  ✉
                </div>
                <h4 className="text-base sm:text-lg font-serif font-semibold text-[#111111] leading-snug">
                  Tumhe ek mail receive hoga, wahan payment complete karte hi active ho jayegi membership.
                </h4>
                <p className="text-xs font-sans text-[#555555] max-w-lg mx-auto leading-relaxed">
                  An official communication from <strong>The Royal Gallerys</strong> has been transmitted to <strong className="text-[#111111]">{email}</strong>. Please check your inbox (and spam/promotions folder) to complete your one-time ₹3,999 payment. Once payment is confirmed, your Permanent Identifier and bespoke Digital Membership Card will immediately unlock inside your private dashboard.
                </p>
              </div>

              <div className="p-5 bg-[#FAF8F5] border border-[#111111]/10 text-xs font-sans text-[#666666] max-w-md mx-auto text-left space-y-2">
                <div className="flex justify-between py-1 border-b border-[#111111]/5">
                  <span className="text-[#777777]">Application Reference</span>
                  <span className="font-mono font-bold text-[#111111]">{assignedId}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#111111]/5">
                  <span className="text-[#777777]">Registered Member</span>
                  <span className="font-medium text-[#111111]">{fullName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#111111]/5">
                  <span className="text-[#777777]">Registered Email</span>
                  <span className="font-medium text-[#111111]">{email}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#111111]/5">
                  <span className="text-[#777777]">Membership Level</span>
                  <span className="font-serif font-medium text-[#111111]">The Royal Gallery Circle · ₹3,999 Lifetime</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#777777]">Status</span>
                  <span className="text-amber-800 font-semibold uppercase tracking-wider text-[11px]">
                    ● Awaiting Email Payment Verification
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#777777] font-serif italic max-w-md mx-auto">
                You can sign into your member dashboard anytime using your registered email and password to track the real-time status of your dossier.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/member/dashboard"
                  className="px-8 py-3.5 text-xs uppercase tracking-[0.24em] font-sans font-medium transition-all bg-[#111111] text-[#FAF8F5] hover:bg-[#8A7352]"
                >
                  Enter Member Dashboard →
                </Link>
                <Link
                  href="/member/login"
                  className="px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-sans font-medium transition-all border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-[#FAF8F5]"
                >
                  Member Sign In →
                </Link>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleApply}
              className="p-8 sm:p-12 border border-[#111111]/15 bg-[#FAF8F5] shadow-sm space-y-6"
            >
              <div className="border-b border-[#111111]/10 pb-4">
                <h3 className="text-xl font-serif text-[#111111]">
                  1. Member Identity & Account Login
                </h3>
                <p className="text-xs text-[#777777] font-sans mt-0.5">
                  Your email will serve as your primary member sign-in identifier.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8A7352] mb-2 font-sans font-semibold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Maharaja Vikramaditya Rathore"
                    className="w-full bg-white border border-[#111111]/20 px-4 py-3 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8A7352] mb-2 font-sans font-semibold">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="member@lineage.com"
                    className="w-full bg-white border border-[#111111]/20 px-4 py-3 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8A7352] mb-2 font-sans font-semibold">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98290 XXXXX"
                    className="w-full bg-white border border-[#111111]/20 px-4 py-3 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8A7352] mb-2 font-sans font-semibold">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+91 98290 XXXXX (optional)"
                    className="w-full bg-white border border-[#111111]/20 px-4 py-3 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8A7352] mb-2 font-sans font-semibold">
                    Create Password *
                  </label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 8 characters"
                    className="w-full bg-white border border-[#111111]/20 px-4 py-3 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8A7352] mb-2 font-sans font-semibold">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full bg-white border border-[#111111]/20 px-4 py-3 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
                  />
                </div>
              </div>

              <div className="border-t border-[#111111]/10 pt-6">
                <h3 className="text-xl font-serif text-[#111111]">
                  2. Physical Delivery Address
                </h3>
                <p className="text-xs text-[#777777] font-sans mt-0.5 mb-4">
                  Where your three annual physical print volumes will be dispatched.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8A7352] mb-2 font-sans font-semibold">
                      Street Address / Estate Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      placeholder="e.g. Haveli Chandra Mahal, Palace Road"
                      className="w-full bg-white border border-[#111111]/20 px-4 py-3 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8A7352] mb-2 font-sans font-semibold">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Jaipur"
                        className="w-full bg-white border border-[#111111]/20 px-3 py-2.5 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8A7352] mb-2 font-sans font-semibold">
                        State
                      </label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="Rajasthan"
                        className="w-full bg-white border border-[#111111]/20 px-3 py-2.5 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8A7352] mb-2 font-sans font-semibold">
                        PIN / ZIP *
                      </label>
                      <input
                        type="text"
                        required
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="302002"
                        className="w-full bg-white border border-[#111111]/20 px-3 py-2.5 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8A7352] mb-2 font-sans font-semibold">
                        Country
                      </label>
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        placeholder="India"
                        className="w-full bg-white border border-[#111111]/20 px-3 py-2.5 text-sm text-[#111111] focus:border-[#111111] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 text-xs uppercase tracking-[0.24em] font-sans font-medium transition-all bg-[#111111] text-[#FAF8F5] hover:bg-[#8A7352] shadow-sm"
                >
                  {loading ? "Transmitting Application..." : "SUBMIT APPLICATION FOR REVIEW (₹3,999 LIFETIME) →"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          05 — VOGUE FOOTER PROMPT
          ════════════════════════════════════════════════ */}
      <section className="py-16 text-center border-t border-[#111111]/10 bg-[#FAF8F5]">
        <p className="text-xs uppercase tracking-[0.24em] text-[#777777] font-sans mb-2">
          Already an Enrolled Member?
        </p>
        <Link
          href="/member/login"
          className="inline-block text-sm uppercase tracking-[0.2em] font-serif text-[#111111] underline underline-offset-4 hover:text-[#8A7352]"
        >
          Access Member Dashboard →
        </Link>
      </section>
    </div>
  );
}
