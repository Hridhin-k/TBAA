"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/shadcn/dialog";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/utils/cn";
import type { Reel } from "@/lib/data/reels";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { Film, Loader2, Maximize2, Play, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type ReelsCarouselProps = {
  reels: Reel[];
  /** Base drift speed in px/s (negative drifts left). */
  baseSpeed?: number;
};

const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

/** Keeps a value inside the half-open range (-width, 0] for seamless looping. */
const wrapValue = (v: number, width: number) => {
  if (width <= 0) return 0;
  let r = v % width;
  if (r > 0) r -= width;
  return r;
};

function buildYoutubeEmbedUrl(youtubeId: string): string {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    autoplay: "1",
  });
  if (typeof window !== "undefined") {
    params.set("origin", window.location.origin);
  }
  return `https://www.youtube-nocookie.com/embed/${youtubeId}?${params.toString()}`;
}

/** Accepts a full Instagram permalink or a bare shortcode and returns an embed URL. */
function buildInstagramEmbedUrl(urlOrCode: string): string {
  const match = urlOrCode.match(
    /instagram\.com\/(?:reel|reels|p|tv)\/([A-Za-z0-9_-]+)/
  );
  const code = match ? match[1] : urlOrCode.replace(/^\/+|\/+$/g, "");
  return `https://www.instagram.com/reel/${code}/embed`;
}

type PlaybackSource =
  | { kind: "native"; url: string }
  | { kind: "instagram"; url: string }
  | { kind: "youtube"; url: string };

function resolvePlayback(reel: Reel): PlaybackSource | null {
  if (reel.video) return { kind: "native", url: reel.video };
  if (reel.url) return { kind: "instagram", url: buildInstagramEmbedUrl(reel.url) };
  if (reel.youtubeId) {
    return { kind: "youtube", url: buildYoutubeEmbedUrl(reel.youtubeId) };
  }
  return null;
}

export function ReelsCarousel({ reels, baseSpeed = -55 }: ReelsCarouselProps) {
  const reducedMotion = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setWidthRef = useRef(0);

  const x = useMotionValue(0);

  // ——— page-scroll coupling (the signature parallax feel) ———
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 300,
  });
  const velocityFactor = useTransform(
    smoothVelocity,
    [-2000, 0, 2000],
    [-4, 0, 4],
    { clamp: false }
  );

  // ——— imperative motion state ———
  const manualVelRef = useRef(0); // px/s from wheel + drag momentum
  const hoveringRef = useRef(false);
  const draggingRef = useRef(false);
  const didDragRef = useRef(false);
  const lastPointerXRef = useRef(0);
  const lastPointerTRef = useRef(0);
  const dragVelRef = useRef(0);

  const [grabbing, setGrabbing] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // ——— inline playback (freezes the drift while a reel plays in place) ———
  const [playingKey, setPlayingKey] = useState<string | null>(null);
  const playingRef = useRef(false);

  // ——— fallback modal (non-native sources only) ———
  const [activeReel, setActiveReel] = useState<Reel | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [playback, setPlayback] = useState<PlaybackSource | null>(null);

  const openReel = useCallback((reel: Reel, key: string) => {
    if (didDragRef.current) return;
    const source = resolvePlayback(reel);
    if (!source) return;

    if (source.kind === "native") {
      // stop the drift and play inline, right where the card sits
      playingRef.current = true;
      manualVelRef.current = 0;
      setPlayingKey(key);
      return;
    }

    // no self-hosted mp4 — fall back to the overlay player
    setActiveReel(reel);
    setPlayback(source);
    setIsLoading(true);
  }, []);

  const stopInline = useCallback(() => {
    playingRef.current = false;
    setPlayingKey(null);
  }, []);

  const closeReel = useCallback(() => {
    setActiveReel(null);
    setPlayback(null);
    setIsLoading(false);
  }, []);

  // Measure one set's width (track holds two identical sets).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      setWidthRef.current = track.scrollWidth / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, [reels]);

  useAnimationFrame((_, delta) => {
    if (reducedMotion) return;
    if (playingRef.current) return; // frozen while a reel plays inline
    const width = setWidthRef.current;
    if (!width) return;

    const dt = delta / 1000;
    let next = x.get();

    if (!draggingRef.current) {
      let moveBy = baseSpeed * dt; // constant left drift
      const vf = velocityFactor.get();
      moveBy += baseSpeed * dt * Math.abs(vf); // scroll speeds it up
      moveBy += -vf * 42 * dt; // scroll direction biases (down → left)
      moveBy += manualVelRef.current * dt; // wheel / drag momentum

      if (hoveringRef.current) moveBy *= 0.2; // ease near a hovered reel

      next += moveBy;

      // frame-rate independent decay of manual velocity
      manualVelRef.current *= Math.pow(0.94, delta / 16.667);
      if (Math.abs(manualVelRef.current) < 0.4) manualVelRef.current = 0;
    }

    x.set(wrapValue(next, width));
  });

  const handleWheel = useCallback((e: React.WheelEvent) => {
    // Only scrub on intentional horizontal (trackpad) swipes; leave vertical
    // wheel to drive the page-scroll coupling instead.
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      manualVelRef.current = clamp(
        manualVelRef.current - e.deltaX * 9,
        -3200,
        3200
      );
    }
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    draggingRef.current = true;
    didDragRef.current = false;
    lastPointerXRef.current = e.clientX;
    lastPointerTRef.current = performance.now();
    manualVelRef.current = 0;
    dragVelRef.current = 0;
    setGrabbing(true);
    containerRef.current?.setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const now = performance.now();
    const dx = e.clientX - lastPointerXRef.current;
    const dtp = now - lastPointerTRef.current || 16;

    if (Math.abs(dx) > 3) didDragRef.current = true;
    dragVelRef.current = (dx / dtp) * 1000;

    x.set(wrapValue(x.get() + dx, setWidthRef.current));

    lastPointerXRef.current = e.clientX;
    lastPointerTRef.current = now;
  }, [x]);

  const endDrag = useCallback((e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    manualVelRef.current = clamp(dragVelRef.current, -3400, 3400);
    setGrabbing(false);
    try {
      containerRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      // pointer may already be released
    }
    // allow the click-to-open guard to reset after this event loop tick
    window.setTimeout(() => {
      didDragRef.current = false;
    }, 0);
  }, []);

  // ——— reduced motion: simple native horizontal scroll ———
  if (reducedMotion) {
    return (
      <>
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto px-[max(1rem,calc((100vw-72rem)/2))] pb-4 snap-x snap-mandatory">
            {reels.map((reel) => {
              const key = `${reel.id}-rm`;
              return (
                <ReelCard
                  key={key}
                  cardKey={key}
                  reel={reel}
                  isPlaying={playingKey === key}
                  onOpen={openReel}
                  onStop={stopInline}
                  className="snap-center"
                />
              );
            })}
          </div>
        </div>
        <ReelModal
          reel={activeReel}
          playback={playback}
          isLoading={isLoading}
          onLoaded={() => setIsLoading(false)}
          onClose={closeReel}
        />
      </>
    );
  }

  const doubled = [...reels, ...reels];

  return (
    <>
      <div
        ref={containerRef}
        className={cn(
          "relative select-none overflow-hidden py-2",
          grabbing ? "cursor-grabbing" : "cursor-grab"
        )}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        role="list"
        aria-label="Instagram reels from The Better Agency"
      >
        {/* edge fades */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 md:w-32 bg-gradient-to-r from-ink to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 md:w-32 bg-gradient-to-l from-ink to-transparent"
          aria-hidden="true"
        />

        <motion.div
          ref={trackRef}
          className="flex w-max gap-4 md:gap-6 will-change-transform"
          style={{ x }}
        >
          {doubled.map((reel, i) => {
            const key = `${reel.id}-${i}`;
            const isPlaying = playingKey === key;
            const dimmed =
              (playingKey !== null && !isPlaying) ||
              (playingKey === null &&
                hoveredId !== null &&
                hoveredId !== reel.id);
            return (
              <ReelCard
                key={key}
                cardKey={key}
                reel={reel}
                isPlaying={isPlaying}
                onOpen={openReel}
                onStop={stopInline}
                dimmed={dimmed}
                onHoverStart={() => {
                  hoveringRef.current = true;
                  setHoveredId(reel.id);
                }}
                onHoverEnd={() => {
                  hoveringRef.current = false;
                  setHoveredId((current) => (current === reel.id ? null : current));
                }}
                aria-hidden={i >= reels.length}
              />
            );
          })}
        </motion.div>
      </div>

      <ReelModal
        reel={activeReel}
        playback={playback}
        isLoading={isLoading}
        onLoaded={() => setIsLoading(false)}
        onClose={closeReel}
      />
    </>
  );
}

// ————————————————————————————————————————————————————————————

type ReelCardProps = {
  reel: Reel;
  cardKey: string;
  isPlaying: boolean;
  onOpen: (reel: Reel, key: string) => void;
  onStop: () => void;
  dimmed?: boolean;
  className?: string;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  "aria-hidden"?: boolean;
};

function ReelCard({
  reel,
  cardKey,
  isPlaying,
  onOpen,
  onStop,
  dimmed = false,
  className,
  onHoverStart,
  onHoverEnd,
  "aria-hidden": ariaHidden,
}: ReelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isPlaying) return;
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      void video.play().catch(() => {
        /* autoplay may be blocked; native controls remain */
      });
    };
    if (video.readyState >= 2) play();
    else video.addEventListener("loadeddata", play, { once: true });

    return () => {
      video.removeEventListener("loadeddata", play);
      video.pause();
    };
  }, [isPlaying]);

  const enterFullscreen = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const el = video as HTMLVideoElement & {
      webkitEnterFullscreen?: () => void;
      webkitRequestFullscreen?: () => void;
    };
    if (el.requestFullscreen) void el.requestFullscreen();
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    else if (el.webkitEnterFullscreen) el.webkitEnterFullscreen();
  }, []);

  return (
    <div
      role="listitem"
      aria-hidden={ariaHidden}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className={cn(
        "group relative shrink-0 transition-[opacity,transform] duration-500 ease-out",
        "w-[220px] sm:w-[248px] md:w-[280px]",
        dimmed ? "opacity-40 scale-[0.97]" : "opacity-100",
        isPlaying && "scale-[1.02]",
        className
      )}
    >
      {isPlaying ? (
        <div
          onPointerDown={(e) => e.stopPropagation()}
          className="relative w-full aspect-[9/16] overflow-hidden rounded-2xl bg-black ring-1 ring-white/25 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]"
        >
          <video
            ref={videoRef}
            src={reel.video}
            poster={reel.poster}
            controls
            autoPlay
            playsInline
            preload="auto"
            onEnded={onStop}
            className="absolute inset-0 h-full w-full object-contain bg-black"
          />
          {/* controls: close + fullscreen (kept clear of native control bar) */}
          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-2.5">
            <button
              type="button"
              onClick={onStop}
              className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-ink"
              aria-label={`Stop ${reel.title}`}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={enterFullscreen}
              className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-ink"
              aria-label={`View ${reel.title} in fullscreen`}
            >
              <Maximize2 className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => onOpen(reel, cardKey)}
          onPointerDown={(e) => e.stopPropagation()}
          tabIndex={ariaHidden ? -1 : 0}
          className={cn(
            "relative block w-full aspect-[9/16] overflow-hidden rounded-2xl bg-ink-soft",
            "ring-1 ring-white/10 transition-all duration-500",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
            "group-hover:ring-white/30 group-hover:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]"
          )}
          aria-label={`Play reel: ${reel.title}`}
        >
          <Image
            src={reel.poster}
            alt={`${reel.title} — ${reel.category}`}
            fill
            draggable={false}
            sizes="(max-width: 640px) 220px, 280px"
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
          />

          {/* gradient + grain */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/25"
            aria-hidden="true"
          />

          {/* top row */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3.5">
            <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-white/80">
              <Film className="w-3.5 h-3.5" aria-hidden="true" />
              Reel
            </span>
            <span className="rounded-full bg-black/30 px-2 py-1 text-[9px] uppercase tracking-[0.14em] text-white/70 backdrop-blur-sm">
              {reel.category}
            </span>
          </div>

          {/* play affordance */}
          <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:text-ink">
            <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true" />
          </span>

          {/* caption */}
          <div className="absolute inset-x-0 bottom-0 p-4">
            <p className="font-display text-base font-semibold leading-tight tracking-tight text-white">
              {reel.title}
            </p>
            <p className="mt-1 text-[11px] tracking-wide text-white/60">
              {reel.handle}
            </p>
          </div>
        </button>
      )}
    </div>
  );
}

// ————————————————————————————————————————————————————————————

type ReelModalProps = {
  reel: Reel | null;
  playback: PlaybackSource | null;
  isLoading: boolean;
  onLoaded: () => void;
  onClose: () => void;
};

function ReelModal({
  reel,
  playback,
  isLoading,
  onLoaded,
  onClose,
}: ReelModalProps) {
  const open = reel !== null;
  const isNative = playback?.kind === "native";
  const isInstagram = playback?.kind === "instagram";
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(true);

  useEffect(() => {
    if (!open) setIsPaused(true);
  }, [open]);

  useEffect(() => {
    const video = videoRef.current;
    if (!open || !isNative || !video) return;

    const play = () => {
      void video.play().catch(() => {
        // Browser may block autoplay; tap overlay + controls remain.
      });
    };

    if (video.readyState >= 2) play();
    else video.addEventListener("loadeddata", play, { once: true });

    return () => {
      video.removeEventListener("loadeddata", play);
      video.pause();
      video.currentTime = 0;
    };
  }, [open, isNative, playback?.url]);

  const handleVideoAreaClick = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  }, []);

  return (
    <Dialog open={open} onOpenChange={(next) => (next ? undefined : onClose())}>
      <DialogContent className="fixed inset-0 z-[100] flex h-[100dvh] max-w-none w-full translate-x-0 translate-y-0 flex-col items-center justify-center gap-0 rounded-none border-0 bg-ink/95 p-4 shadow-none [&>button]:hidden">
        <DialogTitle className="sr-only">{reel?.title ?? "Reel"}</DialogTitle>

        {reel && (
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <Image
              src={reel.poster}
              alt=""
              fill
              className="object-cover scale-110 blur-3xl opacity-30"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-ink/85" />
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-ink"
          aria-label="Close reel"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative z-10 flex h-full w-full items-center justify-center">
          <div
            className={cn(
              "relative overflow-hidden rounded-2xl bg-black shadow-2xl",
              isInstagram
                ? "h-full max-h-[88vh] w-full max-w-[min(94vw,400px)]"
                : "aspect-[9/16] h-full max-h-[86vh] w-auto max-w-[min(94vw,480px)]"
            )}
          >
            {isLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-ink/60">
                <Loader2 className="h-9 w-9 animate-spin text-white" />
              </div>
            )}
            {reel && playback && isNative && (
              <>
                <video
                  ref={videoRef}
                  src={playback.url}
                  poster={reel.poster}
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                  onLoadedData={onLoaded}
                  onCanPlay={onLoaded}
                  onPlay={() => setIsPaused(false)}
                  onPause={() => setIsPaused(true)}
                  className="absolute inset-0 h-full w-full object-contain bg-black"
                />
                {isPaused && (
                  <button
                    type="button"
                    onClick={handleVideoAreaClick}
                    className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30"
                    aria-label={`Play ${reel.title}`}
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur-md">
                      <Play className="ml-1 h-7 w-7 fill-current" aria-hidden="true" />
                    </span>
                  </button>
                )}
              </>
            )}
            {reel && playback && !isNative && (
              <iframe
                src={playback.url}
                title={reel.title}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                scrolling="no"
                onLoad={onLoaded}
                className="absolute inset-0 h-full w-full border-0"
              />
            )}
          </div>
        </div>

        {reel && (isNative || !isInstagram) && (
          <div className="relative z-10 mt-4 text-center">
            <p className="font-display text-lg font-semibold tracking-tight text-white">
              {reel.title}
            </p>
            <p className="mt-1 text-sm text-white/55">{reel.handle}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
