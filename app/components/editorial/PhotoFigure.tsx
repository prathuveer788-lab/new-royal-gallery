"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
// URL map available at @/lib/image-url-map for manifest-based resolution when needed

interface PhotoFigureProps {
  /** Image source URL — when provided, renders a real image; when omitted, shows a placeholder */
  src?: string;
  /** Alt text for accessibility */
  alt: string;
  /** Short identification caption (e.g. "Umaid Bhawan Palace, Jodhpur") */
  caption: string;
  /** Editorial image detail — one or two sentences of researched context */
  imageDetail?: string;
  /** Aspect ratio / orientation */
  orientation?: "landscape" | "portrait" | "square" | "wide" | "full-width";
  /** Priority loading for above-fold images */
  priority?: boolean;
  /** Optional className override */
  className?: string;
  /** Photographer credit line */
  photographer?: string;
}

const aspectMap: Record<string, string> = {
  landscape: "aspect-[16/10]",
  portrait: "aspect-[3/4]",
  square: "aspect-[1/1]",
  wide: "aspect-[21/9]",
  "full-width": "aspect-[16/9]",
};

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNlNWU1ZTUiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

export default function PhotoFigure({
  src,
  alt,
  caption,
  imageDetail,
  orientation = "landscape",
  priority = false,
  className = "",
  photographer,
}: PhotoFigureProps) {
  const aspect = aspectMap[orientation] || aspectMap.landscape;
  const [hasError, setHasError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Reset state when src changes
  useEffect(() => {
    setHasError(false);
    setImageLoaded(false);
  }, [src]);

  // Resolve the effective source
  const effectiveSrc = (() => {
    if (!src) return undefined;
    // External URLs — redirect through URL map for download check, but use direct
    if (src.startsWith("http://") || src.startsWith("https://")) return src;
    // Local images (/images/...) — try loading normally.
    // If file exists on disk, next/image renders it.
    // If file is missing, onError triggers → editorial fallback.
    if (src.startsWith("/images/")) return src;
    // Unknown source — skip
    return undefined;
  })();

  const isRemote = effectiveSrc?.startsWith("http://") || effectiveSrc?.startsWith("https://");
  const isLocalAsset = effectiveSrc?.startsWith("/images/");
  const shouldUseFallback = !effectiveSrc || hasError || (!isRemote && !isLocalAsset);

  const handleError = useCallback(() => {
    if (mountedRef.current) setHasError(true);
  }, []);

  const handleLoad = useCallback(() => {
    if (mountedRef.current) setImageLoaded(true);
  }, []);

  // ── Real image render ──────────────────────────────
  if (effectiveSrc && !shouldUseFallback) {
    return (
      <figure className={`group my-8 sm:my-10 md:my-12 ${className}`}>
        <div
          className={`${aspect} relative overflow-hidden bg-neutral-100 border border-neutral-200/80`}
        >
          {/* Show the editorial fallback behind the image until it loads */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(245,208,122,0.35),_transparent_45%),linear-gradient(135deg,_#f7efe2_0%,_#efe1c7_40%,_#e2c79c_100%)] flex items-center justify-center z-10" />
          )}
          <Image
            src={effectiveSrc}
            alt={alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 720px, 720px"
            priority={priority}
            placeholder="blur"
            blurDataURL={blurDataURL}
            className="object-cover transition-opacity duration-500"
            style={{ opacity: imageLoaded ? 1 : 0 }}
            onLoad={handleLoad}
            onError={handleError}
            unoptimized={isRemote}
          />
          {/* Subtle gradient overlay for text readability on light images */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
        </div>
        {/* Caption */}
        <figcaption className="mt-3 sm:mt-4 max-w-lg mx-auto px-2">
          <p className="text-[11px] sm:text-xs text-neutral-500 font-medium font-sans uppercase tracking-[0.12em] leading-relaxed text-center">
            {caption}
          </p>
          {/* Image detail */}
          {imageDetail && (
            <p className="mt-2 text-[12px] sm:text-[13px] text-neutral-400 font-light leading-relaxed italic text-center max-w-md mx-auto">
              {imageDetail}
            </p>
          )}
          {/* Photographer credit */}
          {photographer && (
            <p className="mt-1.5 text-[10px] text-neutral-300 font-light tracking-[0.05em] text-center">
              Photo: {photographer}
            </p>
          )}
        </figcaption>
      </figure>
    );
  }

  // ── Editorial fallback render ─────────────────────
  return (
    <figure className={`group my-8 sm:my-10 md:my-12 ${className}`}>
      <div
        className={`${aspect} relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(245,208,122,0.35),_transparent_45%),linear-gradient(135deg,_#f7efe2_0%,_#efe1c7_40%,_#e2c79c_100%)] border border-neutral-200/70 flex items-center justify-center`}
      >
        <div className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="absolute inset-3 sm:inset-5 border border-white/70" />
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <div>
            <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-amber-800/70 font-semibold mb-3 font-sans">
              Editorial Image
            </span>
            <p className="text-base sm:text-lg md:text-xl font-serif text-neutral-900/90 max-w-sm leading-tight">
              {caption}
            </p>
            {imageDetail && (
              <p className="mt-3 text-sm text-neutral-700/80 font-light leading-relaxed max-w-md mx-auto">
                {imageDetail}
              </p>
            )}
          </div>
        </div>
      </div>
      <figcaption className="mt-3 sm:mt-4 text-[11px] sm:text-xs text-neutral-500 font-medium uppercase tracking-[0.12em] leading-relaxed text-center max-w-lg mx-auto px-2">
        {caption}
      </figcaption>
    </figure>
  );
}
