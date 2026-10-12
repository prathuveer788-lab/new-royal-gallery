"use client";

import { useRef, useState, useEffect, useCallback } from "react";

/* ── COLOUR CONSTANTS (shared with homepage) ──────────── */
const C = {
  obsidian: "#11110F",
  ivory: "#F4F0E7",
  bronze: "#8A7352",
  champagne: "#B8A47A",
  textStone: "#9B9589",
};

/* ── PLAY ICON (SVG) ────────────────────────────────── */
function PlayIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="31" stroke="rgba(184,164,122,0.6)" strokeWidth="1" />
      <polygon points="26,20 46,32 26,44" fill="rgba(244,240,231,0.9)" />
    </svg>
  );
}

/* ── PAUSE ICON (SVG) ───────────────────────────────── */
function PauseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="3" width="3" height="12" rx="0.5" fill="currentColor" />
      <rect x="11" y="3" width="3" height="12" rx="0.5" fill="currentColor" />
    </svg>
  );
}

/* ── SMALL PLAY ICON ────────────────────────────────── */
function SmallPlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="5,2 16,9 5,16" fill="currentColor" />
    </svg>
  );
}

/* ── SOUND ICONS ────────────────────────────────────── */
function SoundOnIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 7h3l4-4v12l-4-4H2V7z" fill="currentColor" />
      <path d="M12 5.5c1.5 1 2.2 2.3 2.2 3.5s-.7 2.5-2.2 3.5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M13.5 3c2.2 1.5 3.5 3.5 3.5 6s-1.3 4.5-3.5 6" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function SoundOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 7h3l4-4v12l-4-4H2V7z" fill="currentColor" />
      <line x1="12" y1="6" x2="17" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="17" y1="6" x2="12" y2="12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * IntroVideo — The Royal Gallerys official introduction film.
 *
 * Renders the original 2K (2560×1440) video in a cinematic, editorially-
 * branded section.  Autoplays muted; provides discreet play/pause and
 * sound controls.  Falls back to a branded poster card if playback fails.
 *
 * The video file itself is NEVER modified — only the presentation layer.
 */
export default function IntroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [progress, setProgress] = useState(0);

  /* ── Autoplay attempt ───────────────────────────────── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryAutoplay = async () => {
      try {
        video.muted = true;
        await video.play();
        setIsPlaying(true);
        setIsMuted(true);
      } catch {
        // Autoplay blocked — show manual play button
        setShowPlayButton(true);
        setIsPlaying(false);
      }
    };

    if (video.readyState >= 3) {
      tryAutoplay();
    } else {
      video.addEventListener("canplay", () => tryAutoplay(), { once: true });
    }
  }, []);

  /* ── Progress tracking ──────────────────────────────── */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTime = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };
    video.addEventListener("timeupdate", onTime);
    return () => video.removeEventListener("timeupdate", onTime);
  }, []);

  /* ── Handlers ───────────────────────────────────────── */
  const togglePlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      if (video.paused) {
        await video.play();
        setIsPlaying(true);
        setShowPlayButton(false);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    } catch {
      setShowPlayButton(true);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  const handleLoaded = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setShowPlayButton(true);
    setProgress(100);
  }, []);

  return (
    <section
      className="relative w-full"
      style={{ background: C.obsidian }}
    >
      {/* ── Top editorial accent ────────────────────────── */}
      <div className="relative z-10 text-center pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 md:pb-12 px-6">
        <p
          className="text-[10px] sm:text-[11px] uppercase tracking-[0.32em] font-medium font-sans mb-4"
          style={{ color: C.bronze }}
        >
          The Royal Gallerys Presents
        </p>
        <h2
          className="text-[clamp(1.1rem,2.5vw,1.6rem)] font-serif leading-[1.3] tracking-wide"
          style={{ color: C.ivory, fontWeight: 400 }}
        >
          The International Magazine of Heritage &amp; Luxury
        </h2>
        {/* Decorative rule */}
        <div
          className="mx-auto mt-6 sm:mt-8"
          style={{
            width: "clamp(40px,8vw,80px)",
            height: 1,
            background: "rgba(184,164,122,0.4)",
          }}
        />
      </div>

      {/* ── Video container ─────────────────────────────── */}
      <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pb-16 sm:pb-20 md:pb-24">
        {/* Aspect-ratio wrapper — prevents layout shift */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: "16 / 9",
            background: C.obsidian,
          }}
        >
          {/* Error fallback */}
          {hasError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
              <p
                className="text-sm sm:text-base font-sans"
                style={{ color: C.textStone }}
              >
                Unable to play the introduction film.
              </p>
              <p
                className="text-xs font-sans"
                style={{ color: C.bronze }}
              >
                Please refresh the page or try a different browser.
              </p>
            </div>
          ) : (
            <>
              {/* The video element — original file, untouched */}
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full"
                style={{
                  objectFit: "contain",
                  background: C.obsidian,
                  opacity: isLoaded ? 1 : 0,
                  transition: "opacity 0.8s ease-in-out",
                }}
                playsInline
                muted
                preload="auto"
                onLoadedData={handleLoaded}
                onError={handleError}
                onEnded={handleEnded}
              >
                <source
                  src="/Royal_Gallerys_Intro_2K_v5.mp4"
                  type='video/mp4; codecs="avc1"'
                />
                Your browser does not support the video element.
              </video>

              {/* Loading shimmer (before video loads) */}
              {!isLoaded && !hasError && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="animate-pulse flex flex-col items-center gap-4"
                  >
                    <div
                      className="w-12 h-12 rounded-full border"
                      style={{ borderColor: "rgba(184,164,122,0.3)" }}
                    />
                    <p
                      className="text-[10px] uppercase tracking-[0.28em] font-sans"
                      style={{ color: C.textStone }}
                    >
                      Loading Film…
                    </p>
                  </div>
                </div>
              )}

              {/* Large centre play button (shown when autoplay blocked or video ended) */}
              {showPlayButton && isLoaded && (
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center z-20 cursor-pointer group"
                  style={{ background: "rgba(17,17,15,0.35)" }}
                  aria-label="Play introduction video"
                >
                  <div className="transform group-hover:scale-110 transition-transform duration-300">
                    <PlayIcon />
                  </div>
                </button>
              )}

              {/* Bottom controls bar */}
              {isLoaded && (
                <div
                  className="absolute bottom-0 left-0 right-0 z-30 flex items-center gap-3 px-4 sm:px-5 py-3"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(17,17,15,0.7), transparent)",
                  }}
                >
                  {/* Play / Pause */}
                  <button
                    onClick={togglePlay}
                    className="flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200 cursor-pointer"
                    style={{ color: C.ivory }}
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <PauseIcon /> : <SmallPlayIcon />}
                  </button>

                  {/* Progress bar */}
                  <div
                    className="flex-1 h-[2px] rounded-full overflow-hidden"
                    style={{ background: "rgba(184,164,122,0.2)" }}
                  >
                    <div
                      className="h-full rounded-full transition-[width] duration-200 ease-linear"
                      style={{
                        width: `${progress}%`,
                        background: C.champagne,
                      }}
                    />
                  </div>

                  {/* Mute / Unmute */}
                  <button
                    onClick={toggleMute}
                    className="flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200 cursor-pointer"
                    style={{ color: C.ivory }}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <SoundOffIcon /> : <SoundOnIcon />}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
