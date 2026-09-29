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
    const cleanEmail = email.trim();
    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    const formData = new FormData();
    formData.append("email", cleanEmail);
    formData.append("source", source);
    formData.append("_subject", `New Dispatch Subscriber: ${cleanEmail}`);
    const isPlaceholder = FORM_ENDPOINT.includes("YOUR_FORM_ID");
    try {
      if (!isPlaceholder) {
        const response = await fetch(FORM_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: formData });
        if (!response.ok) throw new Error("Submission failed");
      } else {
        try {
          const subs = JSON.parse(localStorage.getItem("rg_subscribers") || "[]");
          subs.push({ email: cleanEmail, source, at: new Date().toISOString() });
          localStorage.setItem("rg_subscribers", JSON.stringify(subs));
        } catch {}
      }
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-3 px-4" style={{ background: isDark ? "rgba(184,164,122,0.12)" : "rgba(138,115,82,0.08)", border: `1px solid ${isDark ? "rgba(184,164,122,0.3)" : "rgba(138,115,82,0.2)"}` }}>
        <p className="text-sm font-serif tracking-wide" style={{ color: isDark ? C.champagne : C.bronze }}>
          Welcome to The Royal Gallerys Dispatch.
        </p>
        <p className="text-xs font-sans mt-1" style={{ color: isDark ? "rgba(244,240,231,0.6)" : C.textStone }}>
          Your weekly curated heritage and luxury briefing is confirmed.
        </p>
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
