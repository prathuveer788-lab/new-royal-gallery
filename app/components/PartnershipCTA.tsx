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

export default function PartnershipCTA() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitting(true);
    setError(false);
    const formData = new FormData();
    formData.append("fullName", name.trim());
    formData.append("email", email.trim());
    formData.append("source", "partnership-cta");
    formData.append("_subject", `Partnership Enquiry: ${name.trim()}`);
    try {
      const response = await fetch(FORM_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: formData });
      if (response.ok) { setSubmitted(true); } else { setError(true); }
    } catch { setError(true); }
    finally { setSubmitting(false); }
  };

  const handleReset = () => { setShowForm(false); setSubmitted(false); setName(""); setEmail(""); };

  return (
    <section className="py-24 sm:py-32 md:py-40 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.cream }}>
      <div className="max-w-3xl mx-auto text-center">
        {!showForm ? (
          <>
            <span className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-medium font-sans mb-6" style={{ color: C.bronze }}>
              An Invitation
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.08] mb-6 tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>
              Partner With Us to Build<br />the Future of Heritage
            </h2>
            <p className="text-sm sm:text-base font-sans leading-relaxed max-w-xl mx-auto mb-10" style={{ color: C.textStone, fontWeight: 400 }}>
              Heritage is humanity&apos;s most valuable asset. The stories that built civilizations deserve to survive. The Royal Gallery exists to ensure they do.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setShowForm(true)} className="inline-block px-10 py-4 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium font-sans cursor-pointer transition-all duration-500" style={{ color: C.ivory, background: C.obsidian, border: "none" }}>
                Become a Partner
              </button>
              <a href="/global-vision" className="inline-block px-10 py-4 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium font-sans transition-all duration-500" style={{ color: C.textDeep, border: `1px solid rgba(138,115,82,0.35)`, background: "transparent" }}>
                Explore the Vision
              </a>
            </div>
          </>
        ) : submitted ? (
          <>
            <span className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-medium font-sans mb-6" style={{ color: C.bronze }}>Thank You</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-[1.08] mb-6 tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>Your Enquiry Has Been Received</h2>
            <p className="text-sm sm:text-base font-sans leading-relaxed max-w-xl mx-auto mb-10" style={{ color: C.textStone, fontWeight: 400 }}>
              Thank you for your interest in partnering with The Royal Gallery. Our team will reach out to you at <span style={{ color: C.bronze }} className="font-medium">{email}</span> within 48 hours.
            </p>
            <button onClick={handleReset} className="inline-block px-10 py-4 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium font-sans cursor-pointer transition-all duration-500" style={{ color: C.textDeep, border: `1px solid rgba(138,115,82,0.35)`, background: "transparent" }}>← Back</button>
          </>
        ) : (
          <>
            <span className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.22em] font-medium font-sans mb-6" style={{ color: C.bronze }}>Partnership Enquiry</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-[1.08] mb-6 tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>Begin the Conversation</h2>
            <p className="text-sm sm:text-base font-sans leading-relaxed max-w-xl mx-auto mb-10" style={{ color: C.textStone, fontWeight: 400 }}>Share your details below and our partnerships team will be in touch.</p>

            {error && (
              <div className="max-w-md mx-auto mb-6 p-3 text-xs font-sans text-center" style={{ border: "1px solid rgba(138,115,82,0.25)", background: "rgba(138,115,82,0.06)", color: C.textDeep }}>
                Something went wrong. Please email us directly at <a href="mailto:hey.theroyalgallerys@gmail.com" className="underline font-medium" style={{ color: C.bronze }}>hey.theroyalgallerys@gmail.com</a>
              </div>
            )}

            <form onSubmit={handleSubmit} className="max-w-md mx-auto text-left space-y-6">
              <div>
                <label htmlFor="partner-name" className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium font-sans mb-2" style={{ color: C.textStone }}>Full Name</label>
                <input id="partner-name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name"
                  className="w-full px-4 py-3.5 text-sm font-sans transition-all focus:outline-none"
                  style={{ background: C.ivory, border: `1px solid rgba(138,115,82,0.25)`, color: C.textDeep, fontWeight: 400 }}
                />
              </div>
              <div>
                <label htmlFor="partner-email" className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium font-sans mb-2" style={{ color: C.textStone }}>Email Address</label>
                <input id="partner-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com"
                  className="w-full px-4 py-3.5 text-sm font-sans transition-all focus:outline-none"
                  style={{ background: C.ivory, border: `1px solid rgba(138,115,82,0.25)`, color: C.textDeep, fontWeight: 400 }}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button type="submit" disabled={submitting}
                  className="flex-1 px-8 py-3.5 disabled:cursor-not-allowed transition-all duration-500 text-xs sm:text-sm uppercase tracking-[0.2em] font-medium font-sans cursor-pointer"
                  style={{ color: C.ivory, background: C.obsidian, border: "none", opacity: submitting ? 0.5 : 1 }}
                >{submitting ? "Sending…" : "Submit Enquiry"}</button>
                <button type="button" onClick={handleReset} disabled={submitting}
                  className="flex-1 px-8 py-3.5 disabled:opacity-30 transition-all duration-500 text-xs sm:text-sm uppercase tracking-[0.16em] font-medium font-sans cursor-pointer"
                  style={{ color: C.textStone, border: `1px solid rgba(138,115,82,0.25)`, background: "transparent" }}
                >Cancel</button>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
