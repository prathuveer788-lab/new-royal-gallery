"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MemberLoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    // If already authenticated, redirect straight to dashboard
    fetch("/api/member/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.authenticated && data?.member) {
          router.replace("/member/dashboard");
        }
      })
      .catch(() => {});

    // Automatically prefill saved email if user previously logged in
    try {
      const saved = localStorage.getItem("rg_member_identifier");
      if (saved) setIdentifier(saved);
    } catch {}
  }, [router]);

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
