"use client";

import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";

const C = {
  ivory: "#F4F0E7",
  cream: "#EAE3D5",
  bronze: "#8A7352",
  champagne: "#B8A47A",
  textDeep: "#181714",
  textStone: "#9B9589",
};

interface PhotoFigureProps {
  src?: string;
  alt: string;
  caption: string;
  imageDetail?: string;
  orientation?: "landscape" | "portrait" | "square" | "wide" | "full-width";
  priority?: boolean;
  className?: string;
  photographer?: string;
}

// Fallback aspect used only while an image is still loading, before its
// natural dimensions are known. Once loaded, the container matches the
// image's own aspect ratio exactly, so nothing is ever cropped or letterboxed.
const aspectMap: Record<string, string> = {
  landscape: "16 / 10",
  portrait: "3 / 4",
  square: "1 / 1",
  wide: "21 / 9",
  "full-width": "16 / 9",
};

const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGw9IiNlNWU1ZTUiIGQ9Ik0wIDBoMXYxSDB6Ii8+PC9zdmc+";

export default function PhotoFigure({
  src, alt, caption, imageDetail, orientation = "landscape", priority = false, className = "", photographer,
}: PhotoFigureProps) {
  const fallbackAspect = aspectMap[orientation] || aspectMap.landscape;
  const [hasError, setHasError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [naturalAspect, setNaturalAspect] = useState<string | undefined>(undefined);
  const mountedRef = useRef(true);

  useEffect(() => { mountedRef.current = true; return () => { mountedRef.current = false; }; }, []);
  useEffect(() => { setHasError(false); setImageLoaded(false); setNaturalAspect(undefined); }, [src]);

  const effectiveSrc = (() => {
    if (!src) return undefined;
    if (src.startsWith("http://") || src.startsWith("https://")) return src;
    if (src.startsWith("/images/")) return src;
    return undefined;
  })();

  const isRemote = effectiveSrc?.startsWith("http://") || effectiveSrc?.startsWith("https://");
  const isLocalAsset = effectiveSrc?.startsWith("/images/");
  const shouldUseFallback = !effectiveSrc || hasError || (!isRemote && !isLocalAsset);

  const handleError = useCallback(() => { if (mountedRef.current) setHasError(true); }, []);
  const handleLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img && img.naturalWidth && img.naturalHeight) {
      setNaturalAspect(`${img.naturalWidth} / ${img.naturalHeight}`);
    }
    if (mountedRef.current) setImageLoaded(true);
  }, []);

  // Editorial fallback gradient
  const fallbackBg = "radial-gradient(circle at top left, rgba(138,115,82,0.22), transparent 45%), linear-gradient(135deg, #F4F0E7 0%, #EAE3D5 40%, #C4B394 100%)";

  if (effectiveSrc && !shouldUseFallback) {
    return (
      <figure className={`group my-6 sm:my-8 ${className}`}>
        <div
          className="relative w-full overflow-hidden"
          style={{ background: C.cream, border: "1px solid rgba(138,115,82,0.15)", aspectRatio: naturalAspect || fallbackAspect }}
        >
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center z-10" style={{ background: fallbackBg }} />
          )}
          <Image
            src={effectiveSrc} alt={alt} fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 720px, 720px"
            priority={priority} placeholder="blur" blurDataURL={blurDataURL}
            className="transition-opacity duration-500"
            style={{ objectFit: "contain", opacity: imageLoaded ? 1 : 0 }}
            onLoad={handleLoad} onError={handleError} unoptimized={isRemote}
          />
        </div>
        <figcaption className="mt-2 sm:mt-3 max-w-lg mx-auto px-2">
          <p className="text-[11px] sm:text-xs font-medium font-sans uppercase tracking-[0.12em] leading-relaxed text-center" style={{ color: C.textStone }}>{caption}</p>
          {imageDetail && (
            <p className="mt-1.5 text-[12px] sm:text-[13px] font-sans leading-relaxed italic text-center max-w-md mx-auto" style={{ color: C.textStone, fontWeight: 400 }}>{imageDetail}</p>
          )}
          {photographer && (
            <p className="mt-1.5 text-[10px] font-sans tracking-[0.05em] text-center" style={{ color: C.champagne, fontWeight: 300 }}>Photo: {photographer}</p>
          )}
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className={`group my-6 sm:my-8 ${className}`}>
      <div className="relative w-full overflow-hidden flex items-center justify-center" style={{ background: fallbackBg, border: "1px solid rgba(138,115,82,0.18)", aspectRatio: fallbackAspect }}>
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
        <div className="absolute inset-3 sm:inset-5" style={{ border: "1px solid rgba(255,255,255,0.6)" }} />
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <div>
            <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-medium font-sans mb-3" style={{ color: "rgba(138,115,82,0.7)" }}>Editorial Image</span>
            <p className="text-base sm:text-lg md:text-xl font-serif max-w-sm leading-tight" style={{ color: C.textDeep }}>{caption}</p>
            {imageDetail && (
              <p className="mt-3 text-sm font-sans leading-relaxed max-w-md mx-auto" style={{ color: C.textStone, fontWeight: 400 }}>{imageDetail}</p>
            )}
          </div>
        </div>
      </div>
      <figcaption className="mt-2 sm:mt-3 text-[11px] sm:text-xs font-medium uppercase tracking-[0.12em] leading-relaxed text-center max-w-lg mx-auto px-2" style={{ color: C.textStone }}>{caption}</figcaption>
    </figure>
  );
}
