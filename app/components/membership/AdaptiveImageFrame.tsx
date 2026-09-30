"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ImageOrientation } from "@/lib/membership/private-collections-data";

interface AdaptiveImageFrameProps {
  src: string;
  alt: string;
  orientation?: ImageOrientation;
  priority?: boolean;
  className?: string;
  sizes?: string;
  showCredit?: boolean;
  credit?: string;
  interactive?: boolean;
  onClick?: () => void;
}

export default function AdaptiveImageFrame({
  src,
  alt,
  orientation = "landscape",
  priority = false,
  className = "",
  sizes = "(max-width: 1024px) 100vw, 1200px",
  showCredit = false,
  credit,
  interactive = false,
  onClick,
}: AdaptiveImageFrameProps) {
  const [loaded, setLoaded] = useState(false);

  // Determine aspect ratio class based on natural orientation
  const getAspectClass = () => {
    switch (orientation) {
      case "portrait":
        // Tall editorial portrait (3:4 or 4:5)
        return "aspect-[3/4] sm:aspect-[4/5] max-h-[720px]";
      case "square":
        // Precision horology/object frame (1:1)
        return "aspect-square max-h-[580px]";
      case "panoramic":
        // Ultra-wide automotive/architectural vista (21:9)
        return "aspect-[16/9] sm:aspect-[21/9] max-h-[540px]";
      case "landscape":
      default:
        // Classical cinematic landscape (16:10 or 16:9)
        return "aspect-[16/10] sm:aspect-[16/9] max-h-[620px]";
    }
  };

  return (
    <figure
      onClick={onClick}
      className={`relative w-full overflow-hidden bg-[#0A0A0A] border border-[#222222]/60 select-none ${
        interactive ? "cursor-pointer group" : ""
      } ${className}`}
    >
      <div
        className={`relative w-full ${getAspectClass()} flex items-center justify-center p-2 sm:p-4 bg-gradient-to-b from-[#0E0E0E] to-[#060606]`}
      >
        {/* Subtle obsidian grain backing */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative w-full h-full">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            onLoad={() => setLoaded(true)}
            className={`object-contain transition-all duration-700 ease-out ${
              interactive ? "group-hover:scale-102" : ""
            } ${loaded ? "opacity-100 filter-none" : "opacity-0 blur-xs"}`}
          />
        </div>

        {/* Ambient metallic corner accents */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#888888]/30 pointer-events-none" />
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#888888]/30 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#888888]/30 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#888888]/30 pointer-events-none" />
      </div>

      {showCredit && credit && (
        <figcaption className="px-3 py-2 bg-[#080808] border-t border-[#1C1C1C] flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-[#777777]">
          <span className="truncate max-w-[85%]">{credit}</span>
          <span className="text-[#C5A880]/80">VERIFIED</span>
        </figcaption>
      )}
    </figure>
  );
}
