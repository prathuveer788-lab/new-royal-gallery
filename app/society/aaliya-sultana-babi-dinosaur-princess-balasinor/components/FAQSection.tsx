"use client";

import { useState } from "react";
import { FAQS as defaultFaqs, type FAQItem } from "../data";

export default function FAQSection({ items = defaultFaqs }: { items?: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section aria-labelledby="faq-heading" className="my-16 sm:my-24">
      <div className="border-t border-[#D9CFC2] pt-12">
        <span
          className="text-[10px] uppercase tracking-[0.28em] font-sans font-semibold block mb-2"
          style={{ color: "#D4673A" }}
        >
          Frequently Asked Questions
        </span>
        <h3
          id="faq-heading"
          className="text-3xl sm:text-4xl font-serif text-[#1B1D21] tracking-tight mb-8"
          style={{ fontWeight: 400 }}
        >
          Essential Inquiries · Raiyoli Dinosaur Heritage
        </h3>

        <div className="space-y-4">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="border border-[#D9CFC2] bg-[#FBF9F5] transition-colors"
                style={{
                  borderColor: isOpen ? "#D4673A" : "#D9CFC2",
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus-visible:outline-[#D4673A]"
                >
                  <span className="text-lg sm:text-xl font-serif text-[#1B1D21] font-medium leading-snug">
                    {item.question}
                  </span>
                  <span
                    className="text-xl font-sans transition-transform duration-300 text-[#D4673A] select-none"
                    style={{
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-base font-sans text-[#1B1D21]/90 leading-relaxed border-t border-[#D9CFC2]/40">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
