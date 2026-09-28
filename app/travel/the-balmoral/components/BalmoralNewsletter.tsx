"use client";

import { useState } from "react";

export default function BalmoralNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 600);
  };

  return (
    <section
      id="newsletter"
      aria-label="Newsletter sign-up"
      className="my-16 sm:my-24 max-w-[800px] mx-auto px-4 sm:px-6"
    >
      <div className="bg-[#EFE9DF] border border-[#D9D4CA] p-8 sm:p-12 text-center">
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] font-semibold text-[#24424F] block mb-2 font-sans">
          The Weekly Despatch
        </span>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#1A1A1A] font-normal leading-tight">
          The Royal Gallerys, in your inbox
        </h3>
        <p className="mt-3 text-sm sm:text-base text-[#5B5B5B] max-w-lg mx-auto font-serif leading-relaxed">
          Curated dispatches on historic palace hotels, private collections, architectural heritage, and timeless luxury.
        </p>

        {status === "success" ? (
          <div className="mt-6 p-4 bg-[#FAF8F4] border border-[#24424F]/30 text-sm text-[#24424F] font-serif">
            Thank you for subscribing. The forthcoming edition of The Royal Gallerys Despatch will arrive in your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 bg-[#FAF8F4] border border-[#D9D4CA] px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#5B5B5B] focus:outline-none focus:border-[#24424F]"
              aria-label="Email address"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="bg-[#24424F] text-[#FAF8F4] px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#1A1A1A] transition-colors focus:outline-none"
            >
              {status === "submitting" ? "Joining…" : "Subscribe"}
            </button>
          </form>
        )}

        <p className="mt-4 text-[11px] text-[#5B5B5B] font-sans">
          By subscribing, you agree to receive editorial communications from The Royal Gallerys. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
