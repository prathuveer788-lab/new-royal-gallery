"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token") || "";
  const emailParam = searchParams.get("email") || "";

  const [email, setEmail] = useState(emailParam);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (newPassword.length < 8) {
      setErrorMsg("Password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/member/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          token,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to reset password.");
      }

      setSuccessMsg(data.message);
      setTimeout(() => {
        router.push("/member/login");
      }, 2500);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Error resetting password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <p className="text-[10px] uppercase tracking-[0.38em] font-sans text-[#8A7352] mb-2 font-semibold">
          The Royal Gallery Circle
        </p>
        <h1
          className="text-3xl font-serif text-[#111111]"
          style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 400 }}
        >
          Choose New Password
        </h1>
        <div className="w-12 h-px mx-auto my-3 bg-[#8A7352]/40" />
      </div>

      <div className="p-8 sm:p-10 bg-white border border-[#111111]/15 shadow-sm">
        {errorMsg && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-800 text-xs font-sans">
            {errorMsg}
          </div>
        )}

        {successMsg ? (
          <div className="text-center space-y-4">
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-sans leading-relaxed">
              {successMsg}
            </div>
            <p className="text-xs text-[#666666]">Redirecting to member login...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8A7352] mb-2 font-sans font-semibold">
                Member Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-4 py-3 text-sm text-[#111111] focus:border-[#111111] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8A7352] mb-2 font-sans font-semibold">
                New Password (min 8 chars)
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-4 py-3 text-sm text-[#111111] focus:border-[#111111] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8A7352] mb-2 font-sans font-semibold">
                Confirm New Password
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#111111]/20 px-4 py-3 text-sm text-[#111111] focus:border-[#111111] focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 text-xs uppercase tracking-[0.24em] font-sans font-medium transition-all bg-[#111111] text-[#FAF8F5] hover:bg-[#8A7352]"
            >
              {loading ? "Updating..." : "Set New Password →"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div
      className="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center bg-[#FAF8F5] text-[#111111]"
    >
      <Suspense fallback={<div className="text-sm text-[#8A7352]">Loading credentials...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
