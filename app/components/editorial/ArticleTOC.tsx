"use client";

import { useState, useEffect } from "react";

interface TOCItem {
  id: string;
  label: string;
}

export default function ArticleTOC({
  items,
  className = "",
}: {
  items: TOCItem[];
  className?: string;
}) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className={`border-l-2 border-neutral-200 pl-5 sm:pl-6 py-2 ${className}`}>
      <h4 className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-amber-700 font-bold mb-3 sm:mb-4 font-sans">
        In This Article
      </h4>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`block text-xs sm:text-sm leading-relaxed transition-colors duration-200 font-light ${
                activeId === item.id
                  ? "text-amber-800 font-medium"
                  : "text-neutral-500 hover:text-neutral-800"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
