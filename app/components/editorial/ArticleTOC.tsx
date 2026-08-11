"use client";

import { useState, useEffect } from "react";

const C = { bronze: "#8A7352", textDeep: "#181714", textStone: "#9B9589" };

interface TOCItem {
  id: string;
  label: string;
}

export default function ArticleTOC({ items, className = "" }: { items: TOCItem[]; className?: string }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) setActiveId(entry.target.id); }); },
      { rootMargin: "-80px 0px -60% 0px" }
    );
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className={`pl-5 sm:pl-6 py-2 ${className}`} style={{ borderLeft: `2px solid rgba(138,115,82,0.2)` }}>
      <h4 className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium font-sans mb-3 sm:mb-4" style={{ color: C.bronze }}>
        In This Article
      </h4>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => { e.preventDefault(); document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" }); }}
              className="block text-xs sm:text-sm leading-relaxed transition-colors duration-200 font-sans"
              style={{ color: activeId === item.id ? C.textDeep : C.textStone, fontWeight: activeId === item.id ? 500 : 400 }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
