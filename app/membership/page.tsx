"use client";

import { useState, useRef } from "react";
import Link from "next/link";

const C = {
  obsidian: "#11110F",
  charcoal: "#1C1B18",
  forest: "#17261F",
  ivory: "#F4F0E7",
  cream: "#EAE3D5",
  textDeep: "#181714",
  textStone: "#9B9589",
  bronze: "#8A7352",
  champagne: "#B8A47A",
};

const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

const tiers = [
  {
    id: "patron",
    name: "Patron",
    subtitle: "The Supporter",
    price: "Annual Membership",
    benefits: [
      "Research archive access & quarterly print volumes",
      "Limited-edition luxury publications",
      "Curated salon dinner invitations",
      "Private heritage tour access across Rajasthan",
      "Annual Patron gathering in Udaipur or London",
      "Dedicated concierge heritage assistance",
    ],
    cta: "Apply for Patron",
    featured: true,
  },
  {
    id: "legacy",
    name: "Legacy",
    subtitle: "The Custodian",
    price: "Curated Membership",
    benefits: [
      "All Patron benefits included",
      "Full royal network & estate introductions",
      "Private bespoke heritage journeys",
      "Personal archival consultation for family collections",
      "Bespoke documentary production collaboration",
      "Legacy book commission guidance",
      "Annual Legacy Summit seat",
    ],
    cta: "Apply for Legacy",
    featured: false,
  },
  {
    id: "founder",
    name: "Founder",
    subtitle: "By Invitation",
    price: "Founding Circle",
    benefits: [
      "All Legacy benefits included",
      "Founding circle governance seat",
      "Shape institutional & archival direction",
      "Lifetime archive access & priority acquisition rights",
      "Global summit hosting rights",
      "Named archive collection endowment",
      "Private royal audiences & ceremonial access",
      "Founder recognition in perpetuity",
    ],
    cta: "Enquire for Founder",
    featured: false,
  },
];

const partnerTypes = [
  {
    title: "Royal Families",
    desc: "Discreet heritage preservation, documentary production and global storytelling.",
    link: "/royalty",
  },
  {
    title: "Luxury Brands",
    desc: "Heritage-powered campaigns, editorial placement and royal context.",
    link: "/culture",
  },
  {
    title: "Heritage Institutions",
    desc: "Digital archives, AI search and interactive exhibitions.",
    link: "/royalty",
  },
  {
    title: "Researchers",
    desc: "Archive access, research partnerships and publishing.",
    link: "/journal",
  },
];

export default function MembershipPage() {
  const [selectedTier, setSelectedTier] = useState<string>("patron");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = (tierId: string) => {
    setSelectedTier(tierId);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    setSubmitting(true);
    setError(false);

    const payload = {
      tier: selectedTier,
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim() || null,
      notes: notes.trim() || null,
      source: "membership-application",
      submittedAt: new Date().toISOString(),
    };

    const formData = new FormData();
    formData.append("tier", payload.tier);
    formData.append("fullName", payload.fullName);
    formData.append("email", payload.email);
    formData.append("phone", payload.phone || "");
    formData.append("notes", payload.notes || "");
    formData.append("source", payload.source);
    formData.append("_subject", `Membership Application: ${payload.fullName} (${payload.tier})`);

    const isPlaceholder = FORM_ENDPOINT.includes("YOUR_FORM_ID");

    try {
      if (!isPlaceholder) {
        const response = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        });
        if (!response.ok) throw new Error("Submission failed");
      } else {
        try {
          const existing = JSON.parse(localStorage.getItem("rg_membership_applications") || "[]");
          existing.push(payload);
          localStorage.setItem("rg_membership_applications", JSON.stringify(existing));
        } catch {
          // Ignore localStorage errors
        }
      }
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFullName("");
    setEmail("");
    setPhone("");
    setNotes("");
  };

  return (
    <div style={{ background: C.ivory }}>
      {/* ══════════ HERO ══════════ */}
      <section className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 md:px-12 lg:px-16 text-center" style={{ background: C.obsidian }}>
        <div className="max-w-3xl mx-auto">
          <span className="text-[10px]/[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.champagne }}>
            Membership
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif mt-4 mb-6 leading-[0.95] tracking-tight" style={{ color: C.ivory, fontWeight: 400 }}>
            Join The Royal Gallerys Circle
          </h1>
          <p className="text-sm sm:text-base font-sans font-normal max-w-2xl mx-auto leading-relaxed" style={{ color: C.textStone }}>
            An invitation into the world&apos;s most rarefied heritage community — salon events, private archives, limited-edition publications, and direct connection with living royal lineages.
          </p>
        </div>
      </section>

      {/* ══════════ TIERS ══════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className="p-6 sm:p-10 flex flex-col justify-between transition-all duration-300"
                style={{
                  border: tier.featured ? `1px solid ${C.champagne}` : `1px solid rgba(138,115,82,0.35)`,
                  background: tier.featured ? C.cream : "transparent",
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.bronze }}>
                      {tier.subtitle}
                    </span>
                    {tier.featured && (
                      <span className="text-[9px] uppercase tracking-[0.22em] font-medium font-sans px-2.5 py-0.5" style={{ background: C.bronze, color: C.ivory }}>
                        Recommended
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif mb-1" style={{ color: C.textDeep, fontWeight: 400 }}>
                    {tier.name}
                  </h3>
                  <p className="text-xs font-sans font-medium mb-6" style={{ color: C.bronze }}>
                    {tier.price}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {tier.benefits.map((b) => (
                      <li key={b} className="text-xs sm:text-sm font-sans flex items-start gap-2.5" style={{ color: C.textDeep, opacity: 0.85 }}>
                        <span className="mt-0.5 flex-shrink-0" style={{ color: C.bronze }}>
                          ·
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => scrollToForm(tier.id)}
                  className="w-full text-center text-xs uppercase tracking-[0.22em] font-medium font-sans py-3.5 px-6 transition-all duration-300 cursor-pointer"
                  style={
                    tier.featured
                      ? { background: C.bronze, color: C.ivory, border: `1px solid ${C.bronze}` }
                      : { color: C.textDeep, border: `1px solid ${C.bronze}`, background: "transparent" }
                  }
                >
                  {tier.cta} →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ APPLICATION FORM SECTION ══════════ */}
      <section ref={formRef} id="membership-application" className="py-20 sm:py-28 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.obsidian }}>
        <div className="max-w-2xl mx-auto">
          {!submitted ? (
            <>
              <div className="text-center mb-10">
                <span className="text-[10px] uppercase tracking-[0.22em] font-medium font-sans mb-3 block" style={{ color: C.champagne }}>
                  Application
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white mb-4" style={{ fontWeight: 400 }}>
                  Apply for Circle Membership
                </h2>
                <p className="text-sm font-sans text-stone-400 leading-relaxed max-w-lg mx-auto">
                  Select your tier and submit your details. Applications are reviewed quarterly by our membership committee.
                </p>
              </div>

              {/* Tier Toggle Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
                {[
                  { id: "patron", label: "Patron" },
                  { id: "legacy", label: "Legacy" },
                  { id: "founder", label: "Founder" },
                  { id: "consultation", label: "Consultation" },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTier(t.id)}
                    className="py-2.5 px-3 text-[11px] uppercase tracking-[0.16em] font-sans font-medium transition-all duration-300 cursor-pointer text-center"
                    style={{
                      border: selectedTier === t.id ? `1px solid ${C.champagne}` : "1px solid rgba(244,240,231,0.15)",
                      background: selectedTier === t.id ? C.champagne : "rgba(255,255,255,0.04)",
                      color: selectedTier === t.id ? C.obsidian : C.ivory,
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {error && (
                <div className="mb-6 p-4 text-xs font-sans text-center text-red-200" style={{ border: "1px solid rgba(220,38,38,0.3)", background: "rgba(220,38,38,0.1)" }}>
                  There was an issue processing your request. Please email our committee directly at{" "}
                  <a href="mailto:hey.theroyalgallerys@gmail.com" className="underline font-medium text-amber-200">
                    hey.theroyalgallerys@gmail.com
                  </a>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                <div>
                  <label htmlFor="mem-name" className="block text-[10px] uppercase tracking-[0.2em] font-medium font-sans mb-2 text-stone-300">
                    Full Name *
                  </label>
                  <input
                    id="mem-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Lord / Lady / Title & Full Name"
                    className="w-full px-4 py-3 text-sm font-sans focus:outline-none transition-colors"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(244,240,231,0.2)", color: C.ivory }}
                  />
                </div>

                <div>
                  <label htmlFor="mem-email" className="block text-[10px] uppercase tracking-[0.2em] font-medium font-sans mb-2 text-stone-300">
                    Email Address *
                  </label>
                  <input
                    id="mem-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@estate.com"
                    className="w-full px-4 py-3 text-sm font-sans focus:outline-none transition-colors"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(244,240,231,0.2)", color: C.ivory }}
                  />
                </div>

                <div>
                  <label htmlFor="mem-phone" className="block text-[10px] uppercase tracking-[0.2em] font-medium font-sans mb-2 text-stone-300">
                    Phone / Country &amp; City
                  </label>
                  <input
                    id="mem-phone"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 / +44 / City of Residence"
                    className="w-full px-4 py-3 text-sm font-sans focus:outline-none transition-colors"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(244,240,231,0.2)", color: C.ivory }}
                  />
                </div>

                <div>
                  <label htmlFor="mem-notes" className="block text-[10px] uppercase tracking-[0.2em] font-medium font-sans mb-2 text-stone-300">
                    Background, Lineage or Area of Heritage Interest
                  </label>
                  <textarea
                    id="mem-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Please share any collections, family history, or specific heritage pursuits..."
                    className="w-full px-4 py-3 text-sm font-sans focus:outline-none transition-colors resize-none"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(244,240,231,0.2)", color: C.ivory }}
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 text-xs uppercase tracking-[0.24em] font-medium font-sans transition-all duration-300 cursor-pointer"
                    style={{ background: C.champagne, color: C.obsidian, border: "none", opacity: submitting ? 0.6 : 1 }}
                  >
                    {submitting ? "Submitting Application…" : `Submit Application for ${selectedTier.toUpperCase()} →`}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-10 px-6 border border-stone-700 bg-stone-900/60">
              <span className="text-[10px] uppercase tracking-[0.24em] font-medium font-sans mb-4 block" style={{ color: C.champagne }}>
                Application Received
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-white mb-4" style={{ fontWeight: 400 }}>
                Thank You, {fullName}
              </h3>
              <p className="text-sm font-sans text-stone-300 max-w-md mx-auto leading-relaxed mb-6">
                Your application for the <span className="font-semibold text-amber-200 capitalize">{selectedTier}</span> tier has been recorded. Our membership committee will review your dossier and contact you at <span className="text-stone-100 font-medium">{email}</span> within 48 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 text-xs uppercase tracking-[0.2em] font-sans transition-colors cursor-pointer"
                  style={{ border: `1px solid rgba(184,164,122,0.4)`, color: C.champagne, background: "transparent" }}
                >
                  Submit Another Enquiry
                </button>
                <a
                  href={`mailto:hey.theroyalgallerys@gmail.com?subject=Membership Enquiry: ${encodeURIComponent(fullName)} (${selectedTier})`}
                  className="px-6 py-3 text-xs uppercase tracking-[0.2em] font-sans transition-colors cursor-pointer"
                  style={{ background: C.champagne, color: C.obsidian }}
                >
                  Direct Email Committee
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══════════ PARTNER OPPORTUNITIES ══════════ */}
      <section className="py-16 sm:py-24 px-6 sm:px-8 md:px-12 lg:px-16" style={{ background: C.cream }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-serif text-center mb-10 tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>
            Partnership Opportunities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {partnerTypes.map((p) => (
              <Link key={p.title} href={p.link} className="p-6 sm:p-7 transition-all group" style={{ background: C.ivory, border: `1px solid rgba(138,115,82,0.2)` }}>
                <h3 className="font-serif text-base sm:text-lg mb-2 transition-colors group-hover:text-[#8A7352]" style={{ color: C.textDeep, fontWeight: 400 }}>
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm font-sans font-normal leading-relaxed" style={{ color: C.textStone }}>
                  {p.desc}
                </p>
                <span className="inline-block mt-4 text-[10px]/[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.bronze }}>
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CONTACT & ENQUIRIES ══════════ */}
      <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-[10px]/[11px] uppercase tracking-[0.22em] font-medium font-sans" style={{ color: C.bronze }}>
            Enquiries
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mt-4 mb-6 tracking-tight" style={{ color: C.textDeep, fontWeight: 400 }}>
            An Invitation to Build the Future of Heritage
          </h2>
          <p className="text-sm font-sans font-normal max-w-xl mx-auto mb-10" style={{ color: C.textStone }}>
            Private consultations available for royal families, luxury brands and heritage institutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={() => scrollToForm("consultation")}
              className="inline-block px-10 py-4 transition-colors text-xs uppercase tracking-[0.22em] font-medium font-sans cursor-pointer"
              style={{ background: C.obsidian, color: C.ivory, border: `1px solid ${C.obsidian}` }}
            >
              Schedule a Consultation
            </button>
            <a
              href="mailto:hey.theroyalgallerys@gmail.com"
              className="inline-block px-10 py-4 transition-colors text-xs uppercase tracking-[0.22em] font-medium font-sans"
              style={{ color: C.textDeep, border: `1px solid ${C.bronze}` }}
            >
              Email Us
            </a>
          </div>
          <div className="mt-8 space-y-1.5">
            <p className="text-[10px]/[11px] uppercase tracking-[0.22em] font-sans font-normal">
              <a href="mailto:hey.theroyalgallerys@gmail.com" style={{ color: C.textStone }}>
                hey.theroyalgallerys@gmail.com
              </a>
            </p>
            <p className="text-[10px]/[11px] uppercase tracking-[0.22em] font-sans font-normal">
              <a href="https://www.instagram.com/theroyalgallerys/" target="_blank" rel="noreferrer" style={{ color: C.textStone }}>
                @theroyalgallerys
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
