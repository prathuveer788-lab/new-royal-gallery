"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQAccordion({
  items,
  className = "",
}: {
  items: FAQItem[];
  className?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={`divide-y divide-neutral-200 border-t border-b border-neutral-200 my-10 sm:my-12 ${className}`}>
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between py-4 sm:py-5 text-left group"
          >
            <span className="text-sm sm:text-base font-serif text-neutral-800 pr-4 group-hover:text-amber-800 transition-colors">
              {item.question}
            </span>
            <span
              className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 text-xs ${
                openIndex === i
                  ? "border-amber-400 bg-amber-400 text-white rotate-180"
                  : "border-neutral-300 text-neutral-400"
              }`}
            >
              ↓
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === i ? "max-h-96 pb-4 sm:pb-5" : "max-h-0"
            }`}
          >
            <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
