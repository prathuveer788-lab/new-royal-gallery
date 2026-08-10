"use client";

import { useState } from "react";

/**
 * Reusable Newsletter Signup Form
 *
 * Posts to a configurable endpoint.
 * To connect: replace FORM_ENDPOINT with your form handler URL.
 * Recommended: ConvertKit, Mailchimp, or Formspree.
 */

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
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center">
        <p className={isDark ? "text-amber-400 text-sm" : "text-amber-700 text-sm"}>
          Welcome aboard. You&apos;ll hear from us soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        disabled={status === "submitting"}
        className={
          isDark
            ? "flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-neutral-500 text-sm focus:outline-none focus:border-amber-400/50 transition-colors font-light disabled:opacity-50"
            : "flex-1 px-4 py-3 border border-neutral-200 bg-white text-neutral-900 placeholder:text-neutral-400 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-100 transition-colors font-light disabled:opacity-50"
        }
      />
      <button
        type="submit"
        disabled={status === "submitting" || !email.trim()}
        className="px-6 py-3 bg-amber-500 text-neutral-900 hover:bg-amber-400 disabled:bg-neutral-300 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors text-xs uppercase tracking-[0.2em] font-semibold font-sans flex-shrink-0 cursor-pointer"
      >
        {status === "submitting" ? "Sending…" : "Subscribe"}
      </button>
      {status === "error" && (
        <p className="text-red-400 text-xs mt-1 sm:absolute sm:mt-0 sm:-bottom-6">Failed — please try again.</p>
      )}
    </form>
  );
}
