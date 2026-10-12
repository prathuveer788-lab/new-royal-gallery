"use client";

import { useRef, useState, useEffect, useCallback } from "react";

/* ── LUXURY COLOR SYSTEM FOR MAHARANI MAHANSAR ────── */
const M = {
  burgundy: "#2A080C",
  deepBurgundy: "#180407",
  charcoal: "#141113",
  antiqueBrass: "#C49A45",
  champagne: "#D8C7A5",
  ivory: "#F6F1EA",
  parchment: "#ECE4D6",
  mutedText: "#A39990",
};

/* ── ICONS (Module level) ─────────────────────────── */
function PlayGlyph() {
  return (
    <svg width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="34" cy="34" r="33" stroke="rgba(196, 154, 69, 0.7)" strokeWidth="1.2" />
      <circle cx="34" cy="34" r="30" stroke="rgba(246, 241, 234, 0.15)" strokeWidth="0.8" />
      <polygon points="28,21 48,34 28,47" fill="#F6F1EA" />
    </svg>
  );
}

function SmallPlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="5,2 16,9 5,16" fill="currentColor" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="3" width="3" height="12" rx="0.5" fill="currentColor" />
      <rect x="11" y="3" width="3" height="12" rx="0.5" fill="currentColor" />
    </svg>
  );
}

function VolumeOnIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 7h3l4-4v12l-4-4H2V7z" fill="currentColor" />
      <path d="M12 5.5c1.5 1 2.2 2.3 2.2 3.5s-.7 2.5-2.2 3.5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M13.5 3c2.2 1.5 3.5 3.5 3.5 6s-1.3 4.5-3.5 6" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function VolumeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 7h3l4-4v12l-4-4H2V7z" fill="currentColor" />
      <line x1="12" y1="6" x2="17" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="17" y1="6" x2="12" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * MaharaniMahansarExperience
 *
 * Dedicated luxury heritage showcase for Maharani Mahansar Heritage Liqueur.
 * Pure video presentation + concise editorial narrative.
 * Fast, instant video loading via normalized URL and metadata prebuffering.
 */
export default function MaharaniMahansarExperience() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showPlayOverlay, setShowPlayOverlay] = useState(false);
  const [progress, setProgress] = useState(0);

  // Clean, URL-safe path to prevent encoding issues across browsers & CDNs
  const videoSourceUrl = "/maharani-mahansar-intro.mp4";

  // Scroll-triggered IntersectionObserver Autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video is properly initialized for mobile and modern desktop browsers
    video.muted = true;
    video.defaultMuted = true;

    const playVideo = async () => {
      try {
        video.muted = true;
        await video.play();
        setIsPlaying(true);
        setIsMuted(true);
        setShowPlayOverlay(false);
      } catch {
        setShowPlayOverlay(true);
        setIsPlaying(false);
      }
    };

    const pauseVideo = () => {
      video.pause();
      setIsPlaying(false);
    };

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
              playVideo();
            } else if (!entry.isIntersecting) {
              pauseVideo();
            }
          });
        },
        { threshold: [0, 0.25, 0.5] }
      );

      observer.observe(video);
      return () => observer.disconnect();
    } else {
      playVideo();
    }
  }, []);

  // Time tracking
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener("timeupdate", updateProgress);
    return () => video.removeEventListener("timeupdate", updateProgress);
  }, []);

  const togglePlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (video.paused) {
        await video.play();
        setIsPlaying(true);
        setShowPlayOverlay(false);
      } else {
        video.pause();
        setIsPlaying(false);
        setShowPlayOverlay(true);
      }
    } catch {
      setShowPlayOverlay(true);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setShowPlayOverlay(true);
    setProgress(100);
  }, []);

  return (
    <section
      id="maharani-mahansar"
      className="relative w-full overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 50% 0%, ${M.burgundy} 0%, ${M.deepBurgundy} 45%, ${M.charcoal} 100%)`,
        borderTop: "1px solid rgba(196, 154, 69, 0.2)",
        borderBottom: "1px solid rgba(196, 154, 69, 0.2)",
      }}
      aria-label="Maharani Mahansar — Heritage Liqueur Brand Showcase"
    >
      {/* ── TOP EDITORIAL HEADER ─────────────────────────── */}
      <div className="max-w-5xl mx-auto pt-20 sm:pt-28 md:pt-36 pb-12 sm:pb-16 px-6 sm:px-8 text-center">
        {/* Dual Signature Badges */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <span
            className="text-[9px] sm:text-[10px] uppercase tracking-[0.32em] font-sans font-semibold"
            style={{ color: M.antiqueBrass }}
          >
            An Exclusive Heritage Collaboration
          </span>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: M.antiqueBrass }} />
          <span
            className="text-[9px] sm:text-[10px] uppercase tracking-[0.28em] font-sans font-medium"
            style={{ color: M.mutedText }}
          >
            The Royal Gallerys
          </span>
        </div>

        {/* Brand Display Name */}
        <p
          className="text-[11px] sm:text-xs md:text-[13px] uppercase tracking-[0.45em] font-sans font-medium mb-3 sm:mb-4"
          style={{ color: M.champagne }}
        >
          Heritage Liqueur of Rajasthan
        </p>

        <h2
          className="text-[clamp(2.4rem,5.5vw,5.2rem)] font-serif leading-[1.04] tracking-tight mb-6 sm:mb-8 font-normal"
          style={{ color: M.ivory }}
        >
          MAHARANI MAHANSAR
        </h2>

        {/* Editorial Sub-line */}
        <p
          className="font-playfair italic text-lg sm:text-2xl md:text-3xl max-w-2xl mx-auto mb-8 sm:mb-10 font-normal leading-snug"
          style={{ color: M.champagne }}
        >
          &ldquo;The Heritage of Mahansar. The Spirit of Rajasthan.&rdquo;
        </p>

        {/* Restrained brass accent bar */}
        <div
          className="mx-auto"
          style={{
            width: "clamp(50px, 8vw, 90px)",
            height: 1,
            background: `linear-gradient(to right, transparent, ${M.antiqueBrass}, transparent)`,
          }}
        />
      </div>

      {/* ── CINEMATIC BRAND FILM PRESENTATION ──────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 pb-16 sm:pb-24">
        {/* Frame with subtle double-border luxury matting */}
        <div
          className="relative p-1.5 sm:p-2.5 rounded-sm"
          style={{
            background: "linear-gradient(145deg, rgba(196,154,69,0.3) 0%, rgba(42,8,12,0.6) 50%, rgba(196,154,69,0.15) 100%)",
            boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(42, 8, 12, 0.4)",
          }}
        >
          <div
            className="relative w-full overflow-hidden bg-black"
            style={{
              aspectRatio: "16 / 9",
            }}
          >
            {/* The Master Video Asset with auto preloading for instant response */}
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-contain cursor-pointer"
              playsInline
              muted
              autoPlay
              loop
              preload="auto"
              onClick={togglePlay}
              onEnded={handleEnded}
            >
              <source src="/maharani-mahansar-intro.mp4" type='video/mp4; codecs="avc1"' />
              <source src="https://maharanimahansar.in/wp-content/uploads/2025/01/1.2.mp4" type='video/mp4; codecs="avc1"' />
              Your browser does not support HTML5 video.
            </video>

            {/* Play Overlay (when paused or blocked by browser policy) */}
            {showPlayOverlay && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 flex flex-col items-center justify-center z-20 cursor-pointer transition-colors duration-500 group bg-black/40 hover:bg-black/25"
                aria-label="Play Maharani Mahansar Film"
              >
                <div className="transform group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl">
                  <PlayGlyph />
                </div>
                <span
                  className="mt-4 text-[10px] uppercase tracking-[0.28em] font-sans font-medium text-[#F6F1EA]/90 group-hover:text-[#F6F1EA]"
                >
                  Watch the Heritage Film
                </span>
              </button>
            )}

            {/* Subtle Controls Bar */}
            <div
              className="absolute bottom-0 left-0 right-0 z-30 flex items-center gap-3 px-4 sm:px-6 py-3.5"
              style={{
                background: "linear-gradient(to top, rgba(14, 4, 6, 0.85) 0%, rgba(14, 4, 6, 0) 100%)",
              }}
            >
              {/* Play/Pause Button */}
              <button
                onClick={togglePlay}
                className="flex items-center justify-center w-8 h-8 rounded-full text-[#F6F1EA] hover:text-[#C49A45] transition-colors cursor-pointer"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? <PauseIcon /> : <SmallPlayIcon />}
              </button>

              {/* Timeline Progress */}
              <div
                className="flex-1 h-[2px] rounded-full overflow-hidden"
                style={{ background: "rgba(196, 154, 69, 0.25)" }}
              >
                <div
                  className="h-full transition-[width] duration-200 ease-linear"
                  style={{
                    width: `${progress}%`,
                    background: `linear-gradient(to right, ${M.antiqueBrass}, ${M.champagne})`,
                  }}
                />
              </div>

              {/* Audio Toggle (Preserving authentic soundtrack) */}
              <button
                onClick={toggleMute}
                className="flex items-center justify-center w-8 h-8 rounded-full text-[#F6F1EA] hover:text-[#C49A45] transition-colors cursor-pointer"
                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              >
                {isMuted ? <VolumeOffIcon /> : <VolumeOnIcon />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── PURE EDITORIAL STORY NARRATIVE (No Triptych/Tables) ── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 pb-24 sm:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Heading and Context */}
          <div className="lg:col-span-5 space-y-4">
            <span
              className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] font-sans font-semibold block"
              style={{ color: M.antiqueBrass }}
            >
              The Cultural Narrative
            </span>

            <h3
              className="text-2xl sm:text-3xl md:text-4xl font-serif leading-[1.12] text-[#F6F1EA] font-normal"
            >
              A Legacy Rooted in Rajasthan
            </h3>

            <p className="text-xs sm:text-sm font-sans tracking-wide text-[#A39990] uppercase pt-2">
              Shekhawati Region · Living Tradition · Crafted Lineage
            </p>
          </div>

          {/* Right Column: Editorial Essay */}
          <div className="lg:col-span-7 space-y-6">
            <p
              className="text-base sm:text-lg font-serif leading-relaxed font-normal"
              style={{ color: M.parchment }}
            >
              Set within Rajasthan&apos;s historic Shekhawati region, Mahansar holds a distinctive
              cultural landscape shaped by monumental havelis, frescoed chambers, and generations of
              refinement. Here, heritage is not a static museum exhibit, but a living sensory tradition
              handed down through time.
            </p>

            <p
              className="text-sm sm:text-base font-sans font-light leading-relaxed"
              style={{ color: M.mutedText }}
            >
              Maharani Mahansar brings the royal liqueur craftsmanship of the desert court into contemporary
              focus. Formulated with botanicals, traditional distillation methods, and an uncompromising
              reverence for local terroir, each bottle reflects the regal hospitalities of Rajasthan&apos;s
              storied past.
            </p>

            <p
              className="text-sm sm:text-base font-sans font-light leading-relaxed"
              style={{ color: M.mutedText }}
            >
              Through the editorial lens of <em className="text-[#F6F1EA] font-serif not-italic">The Royal Gallerys</em>,
              we present this collaboration as an exploration of place, prestige, and the enduring authority
              of authentic regional luxury.
            </p>

            {/* Official External Link & Signature */}
            <div className="pt-6 border-t border-[rgba(196,154,69,0.2)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <a
                href="https://maharanimahansar.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.24em] font-sans font-semibold transition-colors duration-300 hover:underline"
                style={{ color: M.antiqueBrass }}
              >
                Discover the Maison · maharanimahansar.in →
              </a>

              <span
                className="text-[9px] uppercase tracking-[0.2em] font-sans font-light text-[#A39990]"
              >
                Editorial Feature · Autumn 2026
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
