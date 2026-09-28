"use client";

import { useState } from "react";
import { FAQS } from "../data";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq-section"
      aria-label="Frequently Asked Questions"
      className="my-16 sm:my-24 max-w-4xl mx-auto border-t border-b border-[#D8D6D0] py-12"
    >
      <div className="mb-8">
        <span className="text-[10px] uppercase tracking-[0.32em] font-sans font-medium text-[#C4687F] block mb-2">
          Curatorial Inquiries
        </span>
        <h3 className="text-2xl sm:text-3xl font-serif text-[#1C1C1E] tracking-tight">
          Frequently Asked Questions
        </h3>
      </div>

      <div className="divide-y divide-[#D8D6D0]">
        {FAQS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.q} className="py-4">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between text-left gap-4 py-2 group focus-visible:outline-1 focus-visible:outline-[#C4687F]"
              >
                <span className="text-base sm:text-lg font-serif text-[#1C1C1E] group-hover:text-[#C4687F] transition-colors">
                  {item.q}
                </span>
                <span className="text-xl font-light text-[#6A6A70] select-none">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen && (
                <div className="pt-2 pb-3 pr-8">
                  <p className="font-sans text-sm sm:text-base leading-relaxed text-[#6A6A70]">
                    {item.a}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
