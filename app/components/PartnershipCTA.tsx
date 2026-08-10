"use client";

import { useState } from "react";

export default function PartnershipCTA() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setShowForm(false);
    setSubmitted(false);
    setName("");
    setEmail("");
  };

  return (
    <section className="py-16 sm:py-24 md:py-32 px-6 sm:px-8 md:px-12 lg:px-16 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        {!showForm ? (
          <>
            <span className="inline-block text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-amber-700 font-semibold mb-6 font-sans">
              An Invitation
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-neutral-900 leading-[1.08] mb-6 tracking-tight">
              Partner With Us to Build
              <br />
              the Future of Heritage
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto mb-10">
              Heritage is humanity&apos;s most valuable asset. The stories that
              built civilizations deserve to survive. The Royal Gallery exists
              to ensure they do.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowForm(true)}
                className="inline-block px-10 py-4 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold font-sans cursor-pointer"
              >
                Become a Partner
              </button>
              <a
                href="/global-vision"
                className="inline-block px-10 py-4 border border-neutral-300 text-neutral-700 hover:border-neutral-900 hover:text-neutral-900 transition-colors text-xs sm:text-sm uppercase tracking-[0.25em] font-medium font-sans"
              >
                Explore the Vision
              </a>
            </div>
          </>
        ) : submitted ? (
          <>
            <span className="inline-block text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-amber-700 font-semibold mb-6 font-sans">
              Thank You
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 leading-[1.08] mb-6 tracking-tight">
              Your Enquiry Has Been Received
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto mb-10">
              Thank you for your interest in partnering with The Royal Gallery.
              Our team will reach out to you at{" "}
              <span className="text-amber-700 font-medium">{email}</span> within
              48 hours.
            </p>
            <button
              onClick={handleReset}
              className="inline-block px-10 py-4 border border-neutral-300 text-neutral-700 hover:border-neutral-900 transition-colors text-xs sm:text-sm uppercase tracking-[0.25em] font-medium font-sans cursor-pointer"
            >
              ← Back
            </button>
          </>
        ) : (
          <>
            <span className="inline-block text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-amber-700 font-semibold mb-6 font-sans">
              Partnership Enquiry
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-neutral-900 leading-[1.08] mb-6 tracking-tight">
              Begin the Conversation
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto mb-10">
              Share your details below and our partnerships team will be in
              touch.
            </p>

            <form
              onSubmit={handleSubmit}
              className="max-w-md mx-auto text-left space-y-6"
            >
              <div>
                <label
                  htmlFor="partner-name"
                  className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-2 font-sans"
                >
                  Full Name
                </label>
                <input
                  id="partner-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-3.5 border border-neutral-200 bg-white text-neutral-900 text-sm font-light placeholder-neutral-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-100 transition-all font-sans"
                />
              </div>

              <div>
                <label
                  htmlFor="partner-email"
                  className="block text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-semibold mb-2 font-sans"
                >
                  Email Address
                </label>
                <input
                  id="partner-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3.5 border border-neutral-200 bg-white text-neutral-900 text-sm font-light placeholder-neutral-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-100 transition-all font-sans"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  type="submit"
                  className="flex-1 px-8 py-3.5 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold font-sans cursor-pointer"
                >
                  Submit Enquiry
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 px-8 py-3.5 border border-neutral-300 text-neutral-500 hover:border-neutral-900 hover:text-neutral-700 transition-colors text-xs sm:text-sm uppercase tracking-[0.15em] font-medium font-sans cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
