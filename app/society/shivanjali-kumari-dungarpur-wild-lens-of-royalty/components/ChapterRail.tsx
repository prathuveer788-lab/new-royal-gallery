"use client";

import { useEffect, useState } from "react";

const CHAPTERS = [
  { id: "chapter-1", roman: "I", title: "The City That Made Her" },
  { id: "chapter-2", roman: "II", title: "A Lockdown & iPhone 5" },
  { id: "chapter-3", roman: "III", title: "The Most Powerful Permission" },
  { id: "chapter-4", roman: "IV", title: "Where Philosophy Met Craft" },
  { id: "the-portfolio", roman: "◆", title: "The Portfolio · Masai Mara" },
  { id: "chapter-5", roman: "V", title: "Other Inheritances" },
  { id: "chapter-6", roman: "VI", title: "An Inheritance, Reimagined" },
];

export default function ChapterRail() {
  const [activeId, setActiveId] = useState<string>("chapter-1");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
      }
    );

    CHAPTERS.forEach((ch) => {
      const el = document.getElementById(ch.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Chapter Index"
      className="hidden xl:block sticky top-32 w-56 pr-8 self-start select-none"
    >
      <span className="text-[9px] uppercase tracking-[0.3em] font-sans font-semibold text-[#6A6A70] block mb-4 border-b border-[#D8D6D0] pb-2">
        Exhibition Chapters
      </span>

      <ul className="space-y-3.5">
        {CHAPTERS.map((ch) => {
          const isActive = activeId === ch.id;
          return (
            <li key={ch.id}>
              <a
                href={`#${ch.id}`}
                className={`group flex items-baseline gap-2.5 transition-colors duration-300 ${
                  isActive ? "text-[#C4687F] font-medium" : "text-[#6A6A70] hover:text-[#1C1C1E]"
                }`}
              >
                <span
                  className={`text-[10px] uppercase font-sans tracking-widest ${
                    isActive ? "text-[#C4687F]" : "text-[#6A6A70]/60 group-hover:text-[#1C1C1E]"
                  }`}
                >
                  {ch.roman}
                </span>
                <span className="text-xs font-serif leading-tight">
                  {ch.title}
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 pt-4 border-t border-[#D8D6D0]/60">
        <a
          href="#at-a-glance"
          className="text-[10px] uppercase tracking-[0.2em] font-sans text-[#6A6A70] hover:text-[#1C1C1E] transition-colors block mb-2"
        >
          Wall Label / Facts →
        </a>
        <a
          href="#faq-section"
          className="text-[10px] uppercase tracking-[0.2em] font-sans text-[#6A6A70] hover:text-[#1C1C1E] transition-colors block"
        >
          Curator FAQ →
        </a>
      </div>
    </nav>
  );
}
