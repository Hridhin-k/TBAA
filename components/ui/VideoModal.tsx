"use client";

import type { PortfolioVideo } from "@/types";
import { cn } from "@/utils/cn";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

type VideoModalProps = {
  video: PortfolioVideo;
  open: boolean;
  onClose: () => void;
};

export function VideoModal({ video, open, onClose }: VideoModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = "hidden";
    } else {
      if (dialog.open) dialog.close();
      document.body.style.overflow = "";
      videoRef.current?.pause();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const videoUrl = video.videoSrc
    ? video.videoSrc
    : video.youtubeId
      ? `https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0&modestbranding=1&playsinline=1`
      : null;

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        "fixed inset-0 z-[100] m-0 p-0 w-full max-w-none h-full max-h-none",
        "bg-ink/95 backdrop:bg-ink/95",
        "open:flex open:flex-col open:items-center open:justify-center"
      )}
      aria-labelledby="video-modal-title"
      onClose={onClose}
    >
      <div className="relative w-full max-w-6xl mx-auto px-4 md:px-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-12 right-4 md:right-0 flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm tracking-wide"
          aria-label="Close video"
        >
          Close
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        <div className="relative aspect-video bg-black overflow-hidden">
          {video.videoSrc ? (
            <video
              ref={videoRef}
              src={video.videoSrc}
              poster={video.poster}
              controls
              playsInline
              className="w-full h-full object-contain"
              aria-label={video.title}
            >
              <track kind="captions" />
            </video>
          ) : video.youtubeId ? (
            <iframe
              src={videoUrl ?? undefined}
              title={video.title}
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full border-0"
          loading="eager"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white/60">
              Video coming soon
            </div>
          )}
        </div>

        <div className="mt-6 text-white">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2">
            {video.category} &middot; {video.year}
          </p>
          <h2 id="video-modal-title" className="font-display text-2xl font-semibold tracking-tight">
            {video.title}
          </h2>
          <p className="text-white/60 mt-1">{video.client}</p>
        </div>
      </div>
    </dialog>
  );
}
