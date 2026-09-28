"use client";

import { useEffect, useState } from "react";

interface Chapter {
  id: string;
  numeral: string;
  title: string;
}

const CHAPTERS: Chapter[] = [
  { id: "chapter-1", numeral: "I", title: "The Dinosaur Princess" },
  { id: "chapter-2", numeral: "II", title: "The Accidental Discovery" },
  { id: "chapter-3", numeral: "III", title: "The Rajasaurus Rises" },
  { id: "chapter-4", numeral: "IV", title: "The Museum — A Battle Won" },
  { id: "chapter-5", numeral: "V", title: "The Educator" },
  { id: "chapter-6", numeral: "VI", title: "The Legacy of Giants" },
];

export default function FeatureChapterRail() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 240;

      for (let i = CHAPTERS.length - 1; i >= 0; i--) {
        const el = document.getElementById(CHAPTERS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveChapterIndex(i);
          return;
        }
      }
      setActiveChapterIndex(0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <aside
      aria-label="Chapter progress rail"
      className="hidden xl:block sticky top-28 self-start w-64 pr-8 z-30 select-none"
    >
      <div className="border-l-2 border-[#D9CFC2] pl-5 py-2 space-y-6">
        <div>
          <span
            className="text-[10px] uppercase tracking-[0.28em] font-sans font-semibold block mb-1"
            style={{ color: "#D4673A" }}
          >
            Chapter {activeChapterIndex + 1} of {CHAPTERS.length}
          </span>
          <span className="text-xs uppercase tracking-[0.16em] font-sans text-[#6B6F76]">
            Reading Progress
          </span>
        </div>

        <nav>
          <ul className="space-y-4">
            {CHAPTERS.map((chap, idx) => {
              const isActive = activeChapterIndex === idx;
              return (
                <li key={chap.id}>
                  <button
                    onClick={() => scrollToChapter(chap.id)}
                    className="text-left group flex items-start gap-2.5 transition-colors duration-200 focus-visible:outline-[#D4673A]"
                  >
                    <span
                      className="text-xs font-serif font-medium mt-0.5 transition-colors"
                      style={{
                        color: isActive ? "#D4673A" : "#6B6F76",
                      }}
                    >
                      {chap.numeral}.
                    </span>
                    <span
                      className="text-xs font-serif leading-snug transition-colors line-clamp-2"
                      style={{
                        color: isActive ? "#1B1D21" : "#6B6F76",
                        fontWeight: isActive ? 600 : 400,
                      }}
                    >
                      {chap.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Small badge */}
        <div className="pt-4 border-t border-[#D9CFC2]/60">
          <span className="text-[9px] uppercase tracking-[0.24em] font-sans text-[#6B6F76] block">
            Portraits of Heritage
          </span>
          <span className="text-[10px] font-serif text-[#1B1D21] italic">
            Balasinor · Gujarat
          </span>
        </div>
      </div>
    </aside>
  );
}
