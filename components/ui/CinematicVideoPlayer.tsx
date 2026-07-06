"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/shadcn/dialog";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/utils/cn";
import { Loader2, Play, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";

type CinematicVideoPlayerProps = {
  poster: string;
  title: string;
  subtitle?: string;
  className?: string;
  aspectRatio?: "cinematic" | "wide" | "square";
  youtubeId?: string;
  src?: string;
};

const aspectMap = {
  cinematic: "aspect-[21/9] md:aspect-[2.4/1]",
  wide: "aspect-video",
  square: "aspect-[4/3] md:aspect-[16/10]",
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

export function CinematicVideoPlayer({
  poster,
  title,
  subtitle,
  className,
  aspectRatio = "cinematic",
  youtubeId,
  src,
}: CinematicVideoPlayerProps) {
  const reducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleOpen = useCallback(() => {
    setError(null);
    if (youtubeId) {
      setIsLoading(true);
      setEmbedUrl(buildYoutubeEmbedUrl(youtubeId));
    }
    setOpen(true);
  }, [youtubeId]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setEmbedUrl(null);
    setIsLoading(false);
    setError(null);
  }, []);

  return (
    <>
      <div
        className={cn(
          "group relative overflow-hidden rounded-none bg-ink",
          aspectMap[aspectRatio],
          className
        )}
      >
        <Image
          src={poster}
          alt={`${title} poster`}
          fill
          sizes="100vw"
          className={cn(
            "object-cover transition-transform duration-700 ease-out",
            !reducedMotion && "group-hover:scale-[1.02]"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-ink/10" />

        <button
          type="button"
          onClick={handleOpen}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          aria-label={`Play ${title}`}
        >
          <span className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/35 bg-white/10 backdrop-blur-md text-white transition-all duration-500 group-hover:scale-105 group-hover:bg-white group-hover:text-ink">
            <Play className="w-8 h-8 md:w-9 md:h-9 fill-current ml-1" aria-hidden="true" />
          </span>
          <span className="text-center px-6">
            <span className="block font-display text-xl md:text-2xl font-semibold tracking-tight text-white">
              {title}
            </span>
            {subtitle && (
              <span className="block text-sm text-white/65 mt-1.5 tracking-wide">
                {subtitle}
              </span>
            )}
          </span>
        </button>
      </div>

      <Dialog
        open={open}
        onOpenChange={(next) => (next ? handleOpen() : handleClose())}
      >
        <DialogContent className="fixed inset-0 z-[100] flex h-[100dvh] max-w-none w-full translate-x-0 translate-y-0 flex-col gap-0 rounded-none border-0 bg-ink p-0 shadow-none [&>button]:hidden">
          <DialogTitle className="sr-only">{title}</DialogTitle>

          {/* Blurred poster backdrop */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <Image
              src={poster}
              alt=""
              fill
              className="object-cover scale-110 blur-2xl opacity-40"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-ink/85" />
          </div>

          <div className="relative z-10 flex items-center justify-between px-5 py-4 md:px-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/50 mb-1">
                Now playing
              </p>
              <p className="font-display text-lg md:text-xl font-semibold tracking-tight text-white">
                {title}
              </p>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="flex items-center justify-center w-11 h-11 rounded-full border border-white/20 text-white hover:bg-white hover:text-ink transition-colors"
              aria-label="Close showreel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative z-10 flex flex-1 items-center justify-center px-4 pb-8 md:px-10 md:pb-12">
            <div className="relative w-full max-w-6xl aspect-video overflow-hidden rounded-xl bg-black shadow-2xl">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-ink/60 z-10">
                  <Loader2 className="w-10 h-10 text-white animate-spin" />
                </div>
              )}

              {error && (
                <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                  <p className="text-white/70 text-sm">{error}</p>
                </div>
              )}

              {youtubeId && embedUrl && open && (
                <iframe
                  src={embedUrl}
                  title={title}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  onLoad={() => setIsLoading(false)}
                  onError={() => {
                    setIsLoading(false);
                    setError("The showreel could not be loaded.");
                  }}
                  className="absolute inset-0 h-full w-full border-0"
                />
              )}

              {!youtubeId && src && open && (
                <video
                  src={src}
                  controls
                  autoPlay
                  playsInline
                  className="absolute inset-0 h-full w-full object-contain"
                >
                  <track kind="captions" />
                </video>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
