"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiMxNDE0MTYiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

export default function ColourTurnSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  const [grayscaleVal, setGrayscaleVal] = useState(isReducedMotion ? 0 : 1);

  useEffect(() => {
    if (isReducedMotion) {
      return;
    }

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // When top of element reaches bottom of viewport, progress = 0 (grayscale = 1)
      // When center reaches center of viewport, progress = 1 (grayscale = 0)
      const visibleDist = windowHeight - rect.top;
      const totalSpan = windowHeight * 0.75;
      const progress = Math.max(0, Math.min(1, visibleDist / totalSpan));
      setGrayscaleVal(1 - progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isReducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-label="The Colour Turn — Sunset Portrait"
      className="relative w-full min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden my-16 sm:my-24 bg-[#141416]"
    >
      {/* Background Image with greyscale to colour filter */}
      <div className="absolute inset-0">
        <Image
          src="/images/society/shivanjali-kumari-dungarpur/02-portrait-colour.jpg"
          alt="Shivanjali Kumari Dungarpur holding her camera at the Dungarpur lake at sunset"
          fill
          placeholder="blur"
          blurDataURL={blurDataURL}
          sizes="100vw"
          className="object-cover transition-all duration-700 ease-out"
          style={{
            filter: isReducedMotion ? "none" : `grayscale(${Math.max(0, Math.min(1, grayscaleVal))})`,
            objectPosition: "50% 28%",
          }}
        />
        {/* Soft atmospheric gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-[#141416]/30 to-[#141416]/60" />
      </div>

      {/* Typographic Overlay */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-12 text-center py-20">
        <span
          className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.34em] font-sans font-medium mb-4 px-3.5 py-1 border border-white/20 bg-black/40 backdrop-blur-sm"
          style={{ color: "#C4687F" }}
        >
          HERITAGE · ART · LEGACY
        </span>

        <h3
          className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#F8F7F4] leading-[1.08] tracking-tight mb-4"
          style={{ fontWeight: 400 }}
        >
          PRINCESS · PHOTOGRAPHER · VISIONARY
        </h3>

        <p className="font-serif italic text-base sm:text-xl text-[#F8F7F4]/90 max-w-2xl mx-auto leading-relaxed">
          &ldquo;The moment quiet observation becomes an artistic voice.&rdquo;
        </p>

        <div className="mt-8 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.22em] font-sans text-[#F8F7F4]/60">
          <span>Dungarpur Lake at Sunset</span>
          <span>·</span>
          <span>[Photographer credit — editors to supply]</span>
        </div>
      </div>
    </section>
  );
}
