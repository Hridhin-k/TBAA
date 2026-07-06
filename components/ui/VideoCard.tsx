"use client";

import { FadeIn } from "@/components/motion/Motion";
import type { PortfolioVideo } from "@/types";
import { cn } from "@/utils/cn";
import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { VideoModal } from "./VideoModal";

type VideoCardLayout = "lead" | "compact" | "wide";

type VideoCardProps = {
  video: PortfolioVideo;
  index?: number;
  layout?: VideoCardLayout;
  className?: string;
};

const layoutStyles: Record<
  VideoCardLayout,
  {
    aspect: string;
    padding: string;
    title: string;
    play: string;
    sizes: string;
  }
> = {
  lead: {
    aspect: "aspect-[3/2]",
    padding: "p-5 md:p-6",
    title: "text-xl md:text-2xl",
    play: "w-10 h-10",
    sizes: "(max-width: 768px) 100vw, 58vw",
  },
  compact: {
    aspect: "aspect-[4/3]",
    padding: "p-4 md:p-5",
    title: "text-base md:text-lg",
    play: "w-9 h-9",
    sizes: "(max-width: 768px) 100vw, 42vw",
  },
  wide: {
    aspect: "aspect-[16/9]",
    padding: "p-5 md:p-6",
    title: "text-lg md:text-xl",
    play: "w-10 h-10",
    sizes: "(max-width: 768px) 100vw, 58vw",
  },
};

export function VideoCard({
  video,
  index = 0,
  layout = "compact",
  className,
}: VideoCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const styles = layoutStyles[layout];

  return (
    <>
      <FadeIn delay={index * 0.08} className={cn("h-full", className)}>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className={cn(
            "group relative w-full text-left overflow-hidden rounded-xl bg-ink-soft",
            styles.aspect
          )}
          aria-label={`Play ${video.title} for ${video.client}`}
        >
          <Image
            src={video.poster}
            alt={`${video.title} — ${video.client} ${video.category} film poster`}
            fill
            sizes={styles.sizes}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] group-focus-visible:scale-[1.02]"
            loading={index < 2 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-ink/25 group-hover:bg-ink/15 transition-colors duration-500" />
          <div className={cn("absolute inset-0 flex flex-col justify-end", styles.padding)}>
            <div className="flex items-end justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/65 mb-1.5">
                  {video.category} &middot; {video.year}
                </p>
                <h3
                  className={cn(
                    "font-display font-semibold tracking-tight text-white truncate",
                    styles.title
                  )}
                >
                  {video.title}
                </h3>
                <p className="text-xs text-white/55 mt-0.5 truncate">{video.client}</p>
              </div>
              <span
                className={cn(
                  "flex items-center justify-center rounded-full border border-white/30 text-white shrink-0",
                  "group-hover:bg-white group-hover:border-white group-hover:text-ink transition-all duration-500",
                  styles.play
                )}
              >
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" aria-hidden="true" />
              </span>
            </div>
            {video.duration && (
              <span className="absolute top-4 right-4 text-[10px] text-white/55 tracking-wide">
                {video.duration}
              </span>
            )}
          </div>
        </button>
      </FadeIn>

      <VideoModal video={video} open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
