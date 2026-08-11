"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress({ className = "" }: { className?: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 w-full z-[200] ${className}`} style={{ height: 2 }}>
      <div
        className="h-full transition-[width] duration-150 ease-out"
        style={{ width: `${Math.min(progress, 100)}%`, background: "#8A7352" }}
      />
    </div>
  );
}
