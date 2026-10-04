"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MemberLoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [authenticatedMember, setAuthenticatedMember] = useState<{
    fullName: string;
    email: string;
    membershipId: string;
  } | null>(null);

  useEffect(() => {
    // Check if already authenticated, but DO NOT auto-redirect!
    // Authentication into private collections must ONLY happen on explicit user action.
    fetch("/api/member/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.authenticated && data?.member) {
          setAuthenticatedMember(data.member);
          // If identifier is not set yet, fill with their active email or membership ID
          setIdentifier((prev) => prev || data.member.email || data.member.membershipId || "");
        }
      })
      .catch(() => {});

    // Prefill saved email if user previously entered credentials
    try {
      const saved = localStorage.getItem("rg_member_identifier");
      if (saved) setIdentifier((prev) => prev || saved);
    } catch {}
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/member/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: identifier, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed.");
      }

      // Save identifier for smooth future logins
      try {
        localStorage.setItem("rg_member_identifier", identifier.trim());
      } catch {}

      router.push(data.redirectUrl || "/member/dashboard");
      router.refresh();
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Failed to authenticate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center bg-[#FAF8F5] text-[#111111]">
      <div className="w-full max-w-md">
        {/* Masthead Title */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-5">
            <Image
              src="/icon.png"
              alt="The Royal Gallery"
              width={80}
              height={80}
              priority
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl shadow-md border border-[#111111]/10 object-contain"
            />
          </div>
          <p className="text-[10px] uppercase tracking-[0.38em] font-sans text-[#8A7352] mb-2 font-semibold">
            The Royal Gallery Circle
          </p>
          <h1
            className="text-3xl sm:text-4xl font-serif text-[#111111]"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}
          >
            Member Sign In
          </h1>
          <div className="w-12 h-px mx-auto my-4 bg-[#8A7352]/40" />
          <p className="text-xs text-[#666666] font-sans leading-relaxed">
            Enter your credentials to access your private member dashboard and archives.
          </p>
        </div>

        {/* Login Box */}
        <div className="p-8 sm:p-10 bg-white border border-[#111111]/15 shadow-sm">
          {errorMsg && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-800 text-xs font-sans">
              {errorMsg}
            </div>
          )}

          {/* Active Session Notification — User can choose to enter directly or re-authenticate */}
          {authenticatedMember && (
            <div className="mb-6 p-4 bg-[#8A7352]/10 border border-[#8A7352]/40 text-left">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-[#8A7352]">
                    Active Member Session
                  </span>
                </div>
                <span className="text-[9px] font-mono text-[#888888] uppercase">
                  {authenticatedMember.membershipId}
                </span>
              </div>
              <p className="text-xs text-[#111111] font-serif leading-relaxed">
                You are currently signed in as{" "}
                <strong className="font-semibold text-[#111111] uppercase tracking-wider">
                  {authenticatedMember.fullName}
                </strong>.
              </p>
              <div className="mt-3.5 flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => router.push("/member/dashboard")}
                  className="px-4 py-2.5 bg-[#111111] hover:bg-[#8A7352] text-[#FAF8F5] text-[10px] uppercase tracking-[0.2em] font-sans font-medium transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Enter Private World Directly ✦</span>
                </button>
                <Link
                  href="/"
                  className="px-3 py-2 border border-[#111111]/20 hover:border-[#111111] text-[#666666] hover:text-[#111111] text-[10px] uppercase tracking-[0.16em] font-sans transition-colors inline-flex items-center gap-1"
                >
                  <span>Public Site ↗</span>
                </Link>
              </div>
              <div className="mt-3 pt-3 border-t border-[#8A7352]/20">
                <span className="text-[10px] uppercase tracking-wider text-[#777777] font-sans">
                  Or enter credentials below to sign in:
                </span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8A7352] mb-2 font-sans font-semibold">
                Registered Email or Member ID
              </label>
              <input
                type="text"
                required
                autoComplete="username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="name@domain.com or RGC-003594"
                className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-4 py-3 text-sm text-[#111111] focus:border-[#111111] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#8A7352] font-sans font-semibold">
                  Password
                </label>
                <Link
                  href="/member/forgot-password"
                  className="text-[10px] uppercase tracking-wider text-[#777777] hover:text-[#111111] transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-4 py-3 pr-12 text-sm text-[#111111] focus:border-[#111111] focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-wider text-[#777777] hover:text-[#111111] font-sans px-1"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 text-xs uppercase tracking-[0.24em] font-sans font-medium transition-all bg-[#111111] text-[#FAF8F5] hover:bg-[#8A7352]"
              >
                {loading ? "Authenticating..." : "Sign In to Circle →"}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-[#111111]/10 text-center">
            <p className="text-xs text-[#777777] font-sans">
              Not a member yet?
            </p>
            <Link
              href="/membership"
              className="mt-2 inline-block text-xs uppercase tracking-[0.18em] font-serif text-[#111111] underline underline-offset-4 hover:text-[#8A7352]"
            >
              Apply for The Royal Gallery Circle (₹3,999 Lifetime) →
            </Link>
          </div>
        </div>

        {/* Editorial Office Portal Link */}
        <div className="mt-8 text-center">
          <Link
            href="/editorial-office"
            className="text-[10px] uppercase tracking-[0.2em] text-[#999999] hover:text-[#111111] transition-colors"
          >
            Editorial Office Admin Terminal
          </Link>
        </div>
      </div>
    </div>
  );
}
