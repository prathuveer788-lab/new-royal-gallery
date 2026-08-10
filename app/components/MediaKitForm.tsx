"use client";

import { useState } from "react";

/**
 * Media Kit Download Form
 *
 * Captures brand/agency details before allowing media kit download.
 * Posts to a configurable form endpoint (Formspree, Google Apps Script, HubSpot, etc.)
 *
 * To connect: replace FORM_ENDPOINT below with your form handler URL.
 * Recommended: Formspree (free 50/mo) — create form at formspree.io, paste the URL here.
 */

const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

const BRAND_CATEGORIES = [
  "Luxury Hospitality",
  "Fashion & Apparel",
  "Spirits & Beverages",
  "Automobile",
  "Watches & Jewellery",
  "Travel & Tourism",
  "Real Estate",
  "Beauty & Fragrance",
  "Home & Décor",
  "Finance & Wealth Management",
  "Technology",
  "Other",
] as const;

const INTEREST_AREAS = [
  { value: "full-page", label: "Full-page advertising" },
  { value: "sponsored-content", label: "Sponsored content / native" },
  { value: "event", label: "Event partnership" },
  { value: "digital", label: "Digital feature" },
  { value: "custom", label: "Custom partnership" },
] as const;

export default function MediaKitForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Build structured payload
    const payload = {
      fullName: formData.get("fullName"),
      workEmail: formData.get("workEmail"),
      company: formData.get("company"),
      jobTitle: formData.get("jobTitle"),
      brandCategory: formData.get("brandCategory"),
      phone: formData.get("phone") || null,
      interests: formData.getAll("interests"),
      message: formData.get("message") || null,
      source: "media-kit-download",
      submittedAt: new Date().toISOString(),
    };

    // Also prepare FormData for services that expect it raw
    const rawFormData = new FormData();
    rawFormData.append("fullName", payload.fullName as string);
    rawFormData.append("workEmail", payload.workEmail as string);
    rawFormData.append("company", payload.company as string);
    rawFormData.append("jobTitle", payload.jobTitle as string);
    rawFormData.append("brandCategory", payload.brandCategory as string);
    rawFormData.append("phone", (payload.phone as string) || "");
    rawFormData.append("interests", payload.interests.join(", "));
    rawFormData.append("message", (payload.message as string) || "");
    rawFormData.append("source", "media-kit-download");
    rawFormData.append("_subject", `Media Kit Download: ${payload.company}`);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: rawFormData,
      });

      if (response.ok) {
        setSubmitted(true);
        // Trigger PDF download after short delay
        setTimeout(() => {
          const link = document.createElement("a");
          link.href = "/media-kit.pdf";
          link.download = "TheRoyalGallerys-MediaKit.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }, 500);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12 px-6">
        <span className="inline-block text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-amber-700 font-semibold mb-6 font-sans">
          Thank You
        </span>
        <h3 className="text-2xl sm:text-3xl font-serif text-neutral-900 mb-4 tracking-tight">
          Your Media Kit Is Ready
        </h3>
        <p className="text-neutral-500 text-sm font-light leading-relaxed max-w-md mx-auto mb-2">
          Your download should begin automatically. If it doesn&apos;t, click below.
        </p>
        <a
          href="/media-kit.pdf"
          download="TheRoyalGallerys-MediaKit.pdf"
          className="inline-block mt-4 px-10 py-3.5 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors text-xs uppercase tracking-[0.2em] font-semibold font-sans"
        >
          Download Media Kit
        </a>
        <p className="text-neutral-400 text-xs font-light mt-6 max-w-sm mx-auto leading-relaxed">
          Our partnerships team will reach out within 48 hours to discuss how we can build something exceptional together.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto text-left">
      {error && (
        <div className="mb-8 p-4 border border-red-200 bg-red-50 text-red-700 text-xs font-light text-center">
          Something went wrong. Please try again or email us directly at{" "}
          <a href="mailto:hey.theroyalgallerys@gmail.com" className="underline font-medium">
            hey.theroyalgallerys@gmail.com
          </a>
        </div>
      )}

      <div className="space-y-5">
        {/* Full Name */}
        <div>
          <label
            htmlFor="mk-fullName"
            className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-2 font-sans"
          >
            Full Name <span className="text-amber-600">*</span>
          </label>
          <input
            id="mk-fullName"
            name="fullName"
            type="text"
            required
            placeholder="Your full name"
            className="w-full px-4 py-3.5 border border-neutral-200 bg-white text-neutral-900 text-sm font-light placeholder-neutral-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-100 transition-all font-sans"
          />
        </div>

        {/* Work Email */}
        <div>
          <label
            htmlFor="mk-workEmail"
            className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-2 font-sans"
          >
            Work Email <span className="text-amber-600">*</span>
          </label>
          <input
            id="mk-workEmail"
            name="workEmail"
            type="email"
            required
            placeholder="you@company.com"
            className="w-full px-4 py-3.5 border border-neutral-200 bg-white text-neutral-900 text-sm font-light placeholder-neutral-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-100 transition-all font-sans"
          />
          <p className="text-[9px] text-neutral-400 mt-1 font-light">Please use your work email — we&apos;ll verify this.</p>
        </div>

        {/* Company */}
        <div>
          <label
            htmlFor="mk-company"
            className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-2 font-sans"
          >
            Company / Brand <span className="text-amber-600">*</span>
          </label>
          <input
            id="mk-company"
            name="company"
            type="text"
            required
            placeholder="Your company or brand name"
            className="w-full px-4 py-3.5 border border-neutral-200 bg-white text-neutral-900 text-sm font-light placeholder-neutral-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-100 transition-all font-sans"
          />
        </div>

        {/* Job Title */}
        <div>
          <label
            htmlFor="mk-jobTitle"
            className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-2 font-sans"
          >
            Job Title <span className="text-amber-600">*</span>
          </label>
          <input
            id="mk-jobTitle"
            name="jobTitle"
            type="text"
            required
            placeholder="e.g. VP Marketing, Brand Director, Media Buyer"
            className="w-full px-4 py-3.5 border border-neutral-200 bg-white text-neutral-900 text-sm font-light placeholder-neutral-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-100 transition-all font-sans"
          />
        </div>

        {/* Brand Category */}
        <div>
          <label
            htmlFor="mk-brandCategory"
            className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-2 font-sans"
          >
            Brand Category <span className="text-amber-600">*</span>
          </label>
          <select
            id="mk-brandCategory"
            name="brandCategory"
            required
            defaultValue=""
            className="w-full px-4 py-3.5 border border-neutral-200 bg-white text-neutral-900 text-sm font-light focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-100 transition-all font-sans appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2016%2016%22%3E%3Cpath%20fill%3D%22%23999%22%20d%3D%22M4%206l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat"
          >
            <option value="" disabled>
              Select your industry
            </option>
            {BRAND_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Phone (optional) */}
        <div>
          <label
            htmlFor="mk-phone"
            className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-2 font-sans"
          >
            Phone <span className="text-neutral-400 font-light">(optional)</span>
          </label>
          <input
            id="mk-phone"
            name="phone"
            type="tel"
            placeholder="+91 98765 43210"
            className="w-full px-4 py-3.5 border border-neutral-200 bg-white text-neutral-900 text-sm font-light placeholder-neutral-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-100 transition-all font-sans"
          />
        </div>

        {/* Interest Areas */}
        <fieldset>
          <legend className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-3 font-sans">
            I&apos;m interested in <span className="text-amber-600">*</span>
          </legend>
          <div className="space-y-2.5">
            {INTEREST_AREAS.map((item) => (
              <label
                key={item.value}
                className="flex items-center gap-3 text-sm text-neutral-700 font-light cursor-pointer group"
              >
                <input
                  type="checkbox"
                  name="interests"
                  value={item.label}
                  className="w-4 h-4 border-neutral-300 text-amber-600 focus:ring-amber-200 rounded cursor-pointer accent-amber-600"
                />
                <span className="group-hover:text-neutral-900 transition-colors">{item.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Message (optional) */}
        <div>
          <label
            htmlFor="mk-message"
            className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-2 font-sans"
          >
            Message <span className="text-neutral-400 font-light">(optional)</span>
          </label>
          <textarea
            id="mk-message"
            name="message"
            rows={3}
            placeholder="Tell us about your brand, campaign goals, or questions…"
            className="w-full px-4 py-3.5 border border-neutral-200 bg-white text-neutral-900 text-sm font-light placeholder-neutral-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-100 transition-all font-sans resize-none"
          />
        </div>

        {/* Submit */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={submitting}
            className="w-full px-8 py-4 bg-neutral-900 text-white hover:bg-neutral-800 disabled:bg-neutral-400 disabled:cursor-not-allowed transition-colors text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold font-sans cursor-pointer"
          >
            {submitting ? "Processing…" : "Download Media Kit"}
          </button>
        </div>

        {/* Consent */}
        <p className="text-[9px] text-neutral-400 font-light text-center leading-relaxed pt-1">
          By downloading, you agree to receive partnership-related communications from The Royal Gallerys.
          We will never share your details with third parties. You can opt out at any time.
        </p>
      </div>
    </form>
  );
}
