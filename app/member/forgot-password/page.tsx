"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [resetUrl, setResetUrl] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/member/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to process request.");
      }

      setMessage(data.message);
      if (data.debugResetUrl) {
        setResetUrl(data.debugResetUrl);
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Error submitting request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center bg-[#FAF8F5] text-[#111111]"
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="text-[10px] uppercase tracking-[0.38em] font-sans text-[#8A7352] mb-2 font-semibold">
            The Royal Gallery Circle
          </p>
          <h1
            className="text-3xl font-serif text-[#111111]"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}
          >
            Reset Member Password
          </h1>
          <div className="w-12 h-px mx-auto my-3 bg-[#8A7352]/40" />
          <p className="text-xs text-[#666666] font-sans">
            Enter your registered member email address to receive password reset instructions.
          </p>
        </div>

        <div className="p-8 sm:p-10 bg-white border border-[#111111]/15 shadow-sm">
          {errorMsg && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-800 text-xs font-sans">
              {errorMsg}
            </div>
          )}

          {message ? (
            <div className="space-y-4 text-center">
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-sans leading-relaxed">
                {message}
              </div>
              {resetUrl && (
                <div className="p-3 bg-[#FAF8F5] border border-[#111111]/10 text-xs text-left">
                  <p className="text-[10px] text-[#8A7352] uppercase tracking-wider mb-1 font-semibold">
                    Direct Reset Link:
                  </p>
                  <a href={resetUrl} className="text-[#111111] underline break-all font-mono">
                    {resetUrl}
                  </a>
                </div>
              )}
              <Link
                href="/member/login"
                className="inline-block mt-4 text-xs uppercase tracking-[0.2em] font-sans text-[#111111] hover:text-[#8A7352]"
              >
                ← Return to Member Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8A7352] mb-2 font-sans font-semibold">
                  Registered Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="member@domain.com"
                  className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-4 py-3 text-sm text-[#111111] focus:border-[#111111] focus:outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 text-xs uppercase tracking-[0.24em] font-sans font-medium transition-all bg-[#111111] text-[#FAF8F5] hover:bg-[#8A7352]"
              >
                {loading ? "Processing..." : "Generate Reset Link →"}
              </button>

              <div className="text-center pt-2">
                <Link
                  href="/member/login"
                  className="text-xs uppercase tracking-[0.16em] font-sans text-[#777777] hover:text-[#111111]"
                >
                  Cancel & Return to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
