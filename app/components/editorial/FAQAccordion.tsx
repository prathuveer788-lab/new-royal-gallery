"use client";

import { useState } from "react";

interface FAQItem { question: string; answer: string; }

const C = { bronze: "#8A7352", textDeep: "#181714", textStone: "#9B9589", ivory: "#F4F0E7" };

export default function FAQAccordion({ items, className = "" }: { items: FAQItem[]; className?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const borderStyle = "1px solid rgba(138,115,82,0.2)";

  return (
    <div className={`my-10 sm:my-12 ${className}`} style={{ borderTop: borderStyle, borderBottom: borderStyle }}>
      {items.map((item, i) => (
        <div key={i} style={{ borderBottom: i < items.length - 1 ? borderStyle : "none" }}>
          <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between py-4 sm:py-5 text-left group">
            <span className="text-sm sm:text-base font-serif pr-4 transition-colors duration-300 group-hover:text-[#8A7352]" style={{ color: C.textDeep }}>{item.question}</span>
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center transition-all duration-300 text-xs font-sans"
              style={{
                border: openIndex === i ? `1px solid ${C.bronze}` : "1px solid rgba(138,115,82,0.25)",
                background: openIndex === i ? C.bronze : "transparent",
                color: openIndex === i ? C.ivory : C.textStone,
                transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >↓</span>
          </button>
          <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: openIndex === i ? "24rem" : 0 }}>
            <p className="text-xs sm:text-sm font-sans leading-relaxed pb-4 sm:pb-5" style={{ color: C.textStone, fontWeight: 400 }}>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
