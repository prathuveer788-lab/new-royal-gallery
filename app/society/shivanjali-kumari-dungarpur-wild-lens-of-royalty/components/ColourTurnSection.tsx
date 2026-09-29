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
    if (isReducedMotion) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const visibleDist = windowHeight - rect.top;
      const totalSpan = windowHeight * 0.85;
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
      className="bg-[#141416] my-16 sm:my-24"
    >
      {/* ── DESKTOP (md+): Editorial split — full portrait left, text right ── */}
      <div className="hidden md:flex items-stretch max-w-7xl mx-auto px-8 lg:px-16 gap-12 lg:gap-20">

        {/* LEFT: Full portrait image — natural 682×1024 ratio, zero crop */}
        <div className="w-[38%] lg:w-[36%] flex-shrink-0">
          <div className="relative">
            <Image
              src="/images/society/shivanjali-kumari-dungarpur/02-portrait-colour.jpg"
              alt="Shivanjali Kumari Dungarpur holding her camera at Dungarpur lake at sunset"
              width={682}
              height={1024}
              quality={100}
              placeholder="blur"
              blurDataURL={blurDataURL}
              sizes="(min-width: 1280px) 36vw, 38vw"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                filter: isReducedMotion
                  ? "none"
                  : `grayscale(${Math.max(0, Math.min(1, grayscaleVal))})`,
                transition: "filter 0.8s ease-out",
              }}
            />
            {/* Subtle side gradient to blend into dark bg */}
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#141416] to-transparent pointer-events-none" />
          </div>
        </div>

        {/* RIGHT: Editorial text — vertically centered beside the portrait */}
        <div className="flex-1 flex flex-col justify-center py-12">
          <span
            className="inline-block text-[10px] sm:text-[11px] uppercase tracking-[0.34em] font-sans font-medium mb-6 px-3.5 py-1 border border-white/20 self-start"
            style={{ color: "#C4687F" }}
          >
            HERITAGE · ART · LEGACY
          </span>

          <h3
            className="text-4xl lg:text-5xl xl:text-6xl font-serif text-[#F8F7F4] leading-[1.06] tracking-tight mb-8"
            style={{ fontWeight: 400 }}
          >
            Princess.
            <br />
            Photographer.
            <br />
            <span className="italic" style={{ color: "#CDB27A" }}>
              Visionary.
            </span>
          </h3>

          <p className="font-serif italic text-xl lg:text-2xl text-[#F8F7F4]/85 leading-relaxed mb-8 max-w-md">
            &ldquo;The moment quiet observation becomes an artistic voice.&rdquo;
          </p>

          <div className="w-12 h-px bg-[#C4687F]/60 mb-6" />

          <p className="text-sm font-sans text-[#F8F7F4]/50 uppercase tracking-[0.2em]">
            Dungarpur Lake at Sunset
          </p>
          <p className="text-xs font-sans text-[#F8F7F4]/35 uppercase tracking-[0.15em] mt-1">
            [Photographer credit — editors to supply]
          </p>
        </div>
      </div>

      {/* ── MOBILE (< md): Full portrait top, text below ── */}
      <div className="block md:hidden">
        {/* Full portrait — natural ratio, full width, zero crop */}
        <div className="relative">
          <Image
            src="/images/society/shivanjali-kumari-dungarpur/02-portrait-colour.jpg"
            alt="Shivanjali Kumari Dungarpur holding her camera at Dungarpur lake at sunset"
            width={682}
            height={1024}
            quality={100}
            placeholder="blur"
            blurDataURL={blurDataURL}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              filter: isReducedMotion
                ? "none"
                : `grayscale(${Math.max(0, Math.min(1, grayscaleVal))})`,
              transition: "filter 0.8s ease-out",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#141416] to-transparent pointer-events-none" />
        </div>

        {/* Text below */}
        <div className="px-6 pt-6 pb-10">
          <span
            className="inline-block text-[9px] uppercase tracking-[0.3em] font-sans font-medium mb-4 px-3 py-1 border border-white/20"
            style={{ color: "#C4687F" }}
          >
            HERITAGE · ART · LEGACY
          </span>
          <h3
            className="text-3xl font-serif text-[#F8F7F4] leading-[1.08] tracking-tight mb-5"
            style={{ fontWeight: 400 }}
          >
            Princess. Photographer.{" "}
            <span className="italic" style={{ color: "#CDB27A" }}>
              Visionary.
            </span>
          </h3>
          <p className="font-serif italic text-lg text-[#F8F7F4]/85 leading-relaxed mb-4">
            &ldquo;The moment quiet observation becomes an artistic voice.&rdquo;
          </p>
          <p className="text-xs font-sans text-[#F8F7F4]/45 uppercase tracking-[0.18em]">
            Dungarpur Lake at Sunset
          </p>
        </div>
      </div>
    </section>
  );
}
