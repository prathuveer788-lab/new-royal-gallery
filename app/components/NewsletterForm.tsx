"use client";

import { useState } from "react";

const C = {
  obsidian: "#11110F",
  ivory: "#F4F0E7",
  bronze: "#8A7352",
  champagne: "#B8A47A",
  textDeep: "#181714",
  textStone: "#9B9589",
  cream: "#EAE3D5",
};

const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

interface NewsletterFormProps {
  variant?: "dark" | "light";
  source?: string;
}

export default function NewsletterForm({ variant = "dark", source = "newsletter" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const isDark = variant === "dark";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("submitting");
    const formData = new FormData();
    formData.append("email", email.trim());
    formData.append("source", source);
    formData.append("_subject", `New Subscriber: ${email.trim()}`);
    try {
      const response = await fetch(FORM_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: formData });
      if (response.ok) { setStatus("success"); setEmail(""); }
      else { setStatus("error"); }
    } catch { setStatus("error"); }
  };

  if (status === "success") {
    return (
      <div className="text-center">
        <p className="text-sm font-sans" style={{ color: isDark ? C.champagne : C.bronze }}>Welcome aboard. You&apos;ll hear from us soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address" disabled={status === "submitting"}
        className="flex-1 px-4 py-3 text-sm transition-colors font-sans disabled:opacity-50 focus:outline-none"
        style={{ background: isDark ? "rgba(255,255,255,0.06)" : C.cream, border: isDark ? "1px solid rgba(255,255,255,0.12)" : `1px solid rgba(138,115,82,0.3)`, color: isDark ? C.ivory : C.textDeep, fontWeight: 400 }}
      />
      <button
        type="submit" disabled={status === "submitting" || !email.trim()}
        className="px-6 py-3 disabled:cursor-not-allowed transition-colors text-xs uppercase tracking-[0.2em] font-medium font-sans flex-shrink-0 cursor-pointer"
        style={{ background: isDark ? C.bronze : C.obsidian, color: C.ivory, border: "none", opacity: status === "submitting" || !email.trim() ? 0.4 : 1 }}
      >
        {status === "submitting" ? "Sending…" : "Subscribe"}
      </button>
      {status === "error" && <p className="text-xs mt-1 sm:absolute sm:mt-0 sm:-bottom-6 font-sans" style={{ color: C.textStone }}>Failed — please try again.</p>}
    </form>
  );
}
