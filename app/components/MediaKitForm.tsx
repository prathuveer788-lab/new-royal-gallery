"use client";

import { useState } from "react";

const C = {
  obsidian: "#11110F",
  ivory: "#F4F0E7",
  bronze: "#8A7352",
  textDeep: "#181714",
  textStone: "#9B9589",
  cream: "#EAE3D5",
};

const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

const BRAND_CATEGORIES = [
  "Luxury Hospitality", "Fashion & Apparel", "Spirits & Beverages", "Automobile",
  "Watches & Jewellery", "Travel & Tourism", "Real Estate", "Beauty & Fragrance",
  "Home & Décor", "Finance & Wealth Management", "Technology", "Other",
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
    const _payload = {
      fullName: formData.get("fullName"), workEmail: formData.get("workEmail"),
      company: formData.get("company"), jobTitle: formData.get("jobTitle"),
      brandCategory: formData.get("brandCategory"), phone: formData.get("phone") || null,
      interests: formData.getAll("interests"), message: formData.get("message") || null,
      source: "media-kit-download", submittedAt: new Date().toISOString(),
    };
    const rawFormData = new FormData();
    rawFormData.append("fullName", _payload.fullName as string);
    rawFormData.append("workEmail", _payload.workEmail as string);
    rawFormData.append("company", _payload.company as string);
    rawFormData.append("jobTitle", _payload.jobTitle as string);
    rawFormData.append("brandCategory", _payload.brandCategory as string);
    rawFormData.append("phone", (_payload.phone as string) || "");
    rawFormData.append("interests", _payload.interests.join(", "));
    rawFormData.append("message", (_payload.message as string) || "");
    rawFormData.append("source", "media-kit-download");
    rawFormData.append("_subject", `Media Kit Download: ${_payload.company}`);
    const isPlaceholder = FORM_ENDPOINT.includes("YOUR_FORM_ID");
    try {
      if (!isPlaceholder) {
        const response = await fetch(FORM_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: rawFormData });
        if (!response.ok) throw new Error("Submission failed");
      } else {
        try {
          const existing = JSON.parse(localStorage.getItem("rg_mediakit_requests") || "[]");
          existing.push(_payload);
          localStorage.setItem("rg_mediakit_requests", JSON.stringify(existing));
        } catch {
          // Ignore localStorage errors
        }
      }
      setSubmitted(true);
      setTimeout(() => {
        const link = document.createElement("a");
        link.href = "/media-kit.pdf";
        link.download = "TheRoyalGallerys-MediaKit.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 400);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3.5 text-sm font-sans transition-all focus:outline-none";
  const inputStyle = { background: C.ivory, border: "1px solid rgba(138,115,82,0.25)", color: C.textDeep, fontWeight: 400 } as const;

  if (submitted) {
    return (
      <div className="text-center py-12 px-6">
        <span className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-medium font-sans mb-6" style={{ color: C.bronze }}>Thank You</span>
        <h3 className="text-2xl sm:text-3xl font-serif mb-4 tracking-tight" style={{ color: C.textDeep }}>Your Media Kit Is Ready</h3>
        <p className="text-sm font-sans leading-relaxed max-w-md mx-auto mb-2" style={{ color: C.textStone, fontWeight: 400 }}>Your download should begin automatically. If it doesn&apos;t, click below.</p>
        <a href="/media-kit.pdf" download="TheRoyalGallerys-MediaKit.pdf" className="inline-block mt-4 px-10 py-3.5 text-xs uppercase tracking-[0.2em] font-medium font-sans transition-all duration-500" style={{ color: C.ivory, background: C.obsidian }}>
          Download Media Kit
        </a>
        <p className="text-xs font-sans mt-6 max-w-sm mx-auto leading-relaxed" style={{ color: C.textStone, fontWeight: 400 }}>Our partnerships team will reach out within 48 hours to discuss how we can build something exceptional together.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto text-left">
      {error && (
        <div className="mb-8 p-4 text-xs font-sans text-center" style={{ border: "1px solid rgba(138,115,82,0.25)", background: "rgba(138,115,82,0.06)", color: C.textDeep }}>
          Something went wrong. Please try again or email us directly at <a href="mailto:hey.theroyalgallerys@gmail.com" className="underline font-medium" style={{ color: C.bronze }}>hey.theroyalgallerys@gmail.com</a>
        </div>
      )}
      <div className="space-y-5">
        {[
          { id: "mk-fullName", name: "fullName", type: "text", label: "Full Name", placeholder: "Your full name" },
          { id: "mk-workEmail", name: "workEmail", type: "email", label: "Work Email", placeholder: "you@company.com", hint: "Please use your work email — we'll verify this." },
          { id: "mk-company", name: "company", type: "text", label: "Company / Brand", placeholder: "Your company or brand name" },
          { id: "mk-jobTitle", name: "jobTitle", type: "text", label: "Job Title", placeholder: "e.g. VP Marketing, Brand Director, Media Buyer" },
        ].map((f) => (
          <div key={f.id}>
            <label htmlFor={f.id} className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium font-sans mb-2" style={{ color: C.textStone }}>{f.label} <span style={{ color: C.bronze }}>*</span></label>
            <input id={f.id} name={f.name} type={f.type} required placeholder={f.placeholder} className={inputClass} style={inputStyle} />
            {f.hint && <p className="text-[9px] font-sans mt-1" style={{ color: C.textStone, fontWeight: 400 }}>{f.hint}</p>}
          </div>
        ))}
        <div>
          <label htmlFor="mk-brandCategory" className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium font-sans mb-2" style={{ color: C.textStone }}>Brand Category <span style={{ color: C.bronze }}>*</span></label>
          <select id="mk-brandCategory" name="brandCategory" required defaultValue="" className={inputClass + " appearance-none"} style={inputStyle}>
            <option value="" disabled>Select your industry</option>
            {BRAND_CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="mk-phone" className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium font-sans mb-2" style={{ color: C.textStone }}>Phone <span style={{ color: C.textStone }} className="font-light">(optional)</span></label>
          <input id="mk-phone" name="phone" type="tel" placeholder="+91 98765 43210" className={inputClass} style={inputStyle} />
        </div>
        <fieldset>
          <legend className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium font-sans mb-3" style={{ color: C.textStone }}>I&apos;m interested in <span style={{ color: C.bronze }}>*</span></legend>
          <div className="space-y-2.5">
            {INTEREST_AREAS.map((item) => (
              <label key={item.value} className="flex items-center gap-3 text-sm font-sans cursor-pointer group" style={{ color: C.textDeep, fontWeight: 400 }}>
                <input type="checkbox" name="interests" value={item.label} className="w-4 h-4 cursor-pointer" style={{ accentColor: C.bronze }} />
                <span className="transition-colors duration-300 group-hover:text-[#8A7352]">{item.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div>
          <label htmlFor="mk-message" className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium font-sans mb-2" style={{ color: C.textStone }}>Message <span style={{ color: C.textStone }} className="font-light">(optional)</span></label>
          <textarea id="mk-message" name="message" rows={3} placeholder="Tell us about your brand, campaign goals, or questions…" className={inputClass + " resize-none"} style={inputStyle} />
        </div>
        <div className="pt-3">
          <button type="submit" disabled={submitting}
            className="w-full px-8 py-4 text-xs sm:text-sm uppercase tracking-[0.22em] font-medium font-sans cursor-pointer transition-all duration-500 disabled:cursor-not-allowed"
            style={{ color: C.ivory, background: C.obsidian, border: "none", opacity: submitting ? 0.5 : 1 }}
          >{submitting ? "Processing…" : "Download Media Kit"}</button>
        </div>
        <p className="text-[9px] font-sans text-center leading-relaxed pt-1" style={{ color: C.textStone, fontWeight: 400 }}>
          By downloading, you agree to receive partnership-related communications from The Royal Gallerys. We will never share your details with third parties. You can opt out at any time.
        </p>
      </div>
    </form>
  );
}
