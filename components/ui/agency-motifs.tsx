import type { ComponentType } from "react";
import { cn } from "@/utils/cn";

export type MotifProps = { className?: string };

export type MotifEntry = {
  id: string;
  Component: ComponentType<MotifProps>;
  /** CSS animation utility from animations.css */
  motion?: "float" | "drift" | "spin" | "pulse";
};

export function Cross({ className }: MotifProps) {
  return (
    <svg
      viewBox="0 0 10 10"
      fill="none"
      className={cn("h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2", className)}
    >
      <path d="M5 0v10M0 5h10" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}

export function Aperture({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="0.9" />
      <path
        d="M12 3l4.5 7.8M21 12H12M16.5 20.8L12 13M3 12h9M7.5 3.2L12 11M3 12l4.5-7.8"
        stroke="currentColor"
        strokeWidth="0.7"
      />
    </svg>
  );
}

export function Camera({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M2 8.5A1.5 1.5 0 013.5 7h2.2l1.4-2.1A1.5 1.5 0 018.3 4h7.4a1.5 1.5 0 011.4.9L18.5 7H20a1.5 1.5 0 011.5 1.5v9A1.5 1.5 0 0119.5 19h-15A1.5 1.5 0 013 17.5v-9z"
        stroke="currentColor"
        strokeWidth="0.85"
      />
      <circle cx="12" cy="12.5" r="3.8" stroke="currentColor" strokeWidth="0.85" />
      <circle cx="17.5" cy="9.5" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function VideoPlayer({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="5" width="20" height="14" rx="1.5" stroke="currentColor" strokeWidth="0.85" />
      <path d="M10 9.5v5l4.5-2.5L10 9.5z" stroke="currentColor" strokeWidth="0.75" fill="currentColor" fillOpacity="0.15" />
      <path d="M2 8h20" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
    </svg>
  );
}

export function FilmStrip({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="4" y="3" width="16" height="18" rx="1" stroke="currentColor" strokeWidth="0.85" />
      <path d="M7 3v18M17 3v18" stroke="currentColor" strokeWidth="0.7" />
      <path d="M5.5 6h3M5.5 9h3M5.5 12h3M5.5 15h3M15.5 6h3M15.5 9h3M15.5 12h3M15.5 15h3" stroke="currentColor" strokeWidth="0.55" />
      <rect x="8" y="8" width="8" height="8" stroke="currentColor" strokeWidth="0.65" />
    </svg>
  );
}

export function Clapper({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="9" width="18" height="11" stroke="currentColor" strokeWidth="0.8" />
      <path
        d="M3 9l2.5-4 4 1.4 4-1.4 4 1.4 2.5-1.4M6.5 5L9 9M11.5 5.5L14 9.4M16.5 5L19 9"
        stroke="currentColor"
        strokeWidth="0.7"
      />
    </svg>
  );
}

export function Megaphone({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 10v4l11 5V5L3 10z" stroke="currentColor" strokeWidth="0.8" />
      <path d="M14 7c3 1 5 2.5 5 5s-2 4-5 5" stroke="currentColor" strokeWidth="0.7" />
      <path d="M6 14v4l3 1" stroke="currentColor" strokeWidth="0.7" />
    </svg>
  );
}

export function Nib({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2l6 6-6 14-6-14 6-6z" stroke="currentColor" strokeWidth="0.8" />
      <path d="M6 8h12M12 8v14" stroke="currentColor" strokeWidth="0.7" />
      <circle cx="12" cy="11" r="1.4" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

export function Cursor({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M5 3l14 7-6 2.2L10.5 20 5 3z"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Spotlight({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="0.7" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="0.85" />
      <path d="M9 12h6M12 9v6" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
    </svg>
  );
}

export function Waveform({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 12h2M7 8v8M11 5v14M15 9v6M19 7v10M21 11v2" stroke="currentColor" strokeWidth="0.85" strokeLinecap="round" />
    </svg>
  );
}

export function LayoutGrid({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="8" height="8" stroke="currentColor" strokeWidth="0.8" />
      <rect x="13" y="3" width="8" height="8" stroke="currentColor" strokeWidth="0.8" />
      <rect x="3" y="13" width="8" height="8" stroke="currentColor" strokeWidth="0.8" />
      <rect x="13" y="13" width="8" height="5" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

export function Target({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="0.7" />
      <path d="M12 1v6M12 17v6M1 12h6M17 12h6" stroke="currentColor" strokeWidth="0.7" />
    </svg>
  );
}

export function Quote({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4 14c0-4 2-7 5-8M4 14v4h5v-4H4zM15 14c0-4 2-7 5-8M15 14v4h5v-4h-5z"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RecBadge({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="0.85" />
      <circle cx="8" cy="12" r="2.2" fill="currentColor" fillOpacity="0.85" />
      <path d="M12 10.5h7M12 13.5h5" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" />
    </svg>
  );
}

export function ColorBars({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="4" width="3" height="16" fill="currentColor" fillOpacity="0.9" />
      <rect x="6" y="4" width="3" height="16" fill="currentColor" fillOpacity="0.5" />
      <rect x="10" y="4" width="3" height="16" fill="currentColor" fillOpacity="0.3" />
      <rect x="14" y="4" width="3" height="16" fill="currentColor" fillOpacity="0.6" />
      <rect x="18" y="4" width="3" height="16" fill="currentColor" fillOpacity="0.8" />
      <rect x="2" y="4" width="19" height="16" stroke="currentColor" strokeWidth="0.6" />
    </svg>
  );
}

export function BillboardFrame({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="4" width="20" height="13" rx="1" stroke="currentColor" strokeWidth="0.85" />
      <path d="M8 17v3M16 17v3M6 20h12" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M5 7h14M5 10h9M5 13h6" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function MicBoom({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="9" y="2" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="0.85" />
      <path d="M5 11a7 7 0 0014 0" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M12 18v4M9 22h6" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M9 6h6M9 9h6" stroke="currentColor" strokeWidth="0.55" opacity="0.5" />
    </svg>
  );
}

export function Typewriter({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="8" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="0.85" />
      <rect x="7" y="3" width="10" height="6" rx="1" stroke="currentColor" strokeWidth="0.75" />
      <path d="M7 14h2M11 14h2M15 14h2M9 17h6" stroke="currentColor" strokeWidth="0.65" strokeLinecap="round" opacity="0.6" />
      <circle cx="12" cy="11" r="1.2" stroke="currentColor" strokeWidth="0.7" />
    </svg>
  );
}

export function Monitor({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="3" width="20" height="14" rx="1.5" stroke="currentColor" strokeWidth="0.85" />
      <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M6 7h12M6 10h8M6 13h5" stroke="currentColor" strokeWidth="0.55" strokeLinecap="round" opacity="0.4" />
      <circle cx="18" cy="5.5" r="0.8" fill="currentColor" fillOpacity="0.7" />
    </svg>
  );
}

export function Broadcast({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M5 12.5a7 7 0 0114 0" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M8 15.5a4 4 0 018 0" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M2 9.5a10 10 0 0120 0" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round" opacity="0.5" />
      <circle cx="12" cy="18" r="1.5" fill="currentColor" />
      <path d="M12 19.5v2.5" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" />
    </svg>
  );
}

export function Slider({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="0.65" strokeLinecap="round" opacity="0.4" />
      <circle cx="8" cy="6" r="2" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="15" cy="12" r="2" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="10" cy="18" r="2" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

export function TapeReel({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="0.85" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="0.75" />
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
      <path d="M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" stroke="currentColor" strokeWidth="0.55" opacity="0.4" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" fillOpacity="0.6" />
    </svg>
  );
}

export function PenTool({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 19l-7 2 2-7L17 4l5 5-10 10z" stroke="currentColor" strokeWidth="0.8" strokeLinejoin="round" />
      <path d="M17 4l3 3" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="9.5" cy="14.5" r="1.2" stroke="currentColor" strokeWidth="0.7" />
    </svg>
  );
}

export const AGENCY_MOTIFS: MotifEntry[] = [
  { id: "camera", Component: Camera, motion: "float" },
  { id: "video", Component: VideoPlayer, motion: "pulse" },
  { id: "film", Component: FilmStrip, motion: "drift" },
  { id: "aperture", Component: Aperture, motion: "spin" },
  { id: "clapper", Component: Clapper, motion: "float" },
  { id: "megaphone", Component: Megaphone, motion: "drift" },
  { id: "nib", Component: Nib, motion: "float" },
  { id: "cursor", Component: Cursor, motion: "drift" },
  { id: "spotlight", Component: Spotlight, motion: "pulse" },
  { id: "waveform", Component: Waveform, motion: "pulse" },
  { id: "grid", Component: LayoutGrid, motion: "float" },
  { id: "target", Component: Target, motion: "spin" },
  { id: "quote", Component: Quote, motion: "float" },
  { id: "rec", Component: RecBadge, motion: "pulse" },
  { id: "colorbars", Component: ColorBars, motion: "pulse" },
  { id: "billboard", Component: BillboardFrame, motion: "float" },
  { id: "mic", Component: MicBoom, motion: "drift" },
  { id: "typewriter", Component: Typewriter, motion: "float" },
  { id: "monitor", Component: Monitor, motion: "drift" },
  { id: "broadcast", Component: Broadcast, motion: "pulse" },
  { id: "slider", Component: Slider, motion: "drift" },
  { id: "tape", Component: TapeReel, motion: "spin" },
  { id: "pentool", Component: PenTool, motion: "float" },
];

/** Motifs that fit dark (showreel) sections best */
export const SHOWREEL_MOTIF_IDS = [
  "camera",
  "video",
  "film",
  "aperture",
  "clapper",
  "rec",
  "waveform",
  "colorbars",
  "tape",
  "broadcast",
  "monitor",
] as const;

export function hashSeed(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return h;
}

const MOTION_CLASS = {
  float: "animate-decor-float",
  drift: "animate-decor-drift",
  spin: "animate-decor-spin",
  pulse: "animate-decor-pulse",
} as const;

export type PlacedMotif = {
  entry: MotifEntry;
  side: "left" | "right";
  top: string;
  size: string;
  rotate: string;
  delay: string;
};

const PLACEMENTS: Omit<PlacedMotif, "entry">[] = [
  { side: "left",  top: "top-[10%]",  size: "h-7 w-7 xl:h-9 xl:w-9",   rotate: "-rotate-6",  delay: "animation-delay-0" },
  { side: "right", top: "top-[22%]",  size: "h-8 w-8 xl:h-10 xl:w-10", rotate: "rotate-12",  delay: "animation-delay-700" },
  { side: "left",  top: "top-[38%]",  size: "h-6 w-6 xl:h-8 xl:w-8",   rotate: "rotate-3",   delay: "animation-delay-1400" },
  { side: "right", top: "top-[52%]",  size: "h-9 w-9 xl:h-11 xl:w-11", rotate: "-rotate-12", delay: "animation-delay-2100" },
  { side: "left",  top: "top-[65%]",  size: "h-7 w-7 xl:h-9 xl:w-9",   rotate: "rotate-6",   delay: "animation-delay-500" },
  { side: "right", top: "top-[78%]",  size: "h-6 w-6 xl:h-8 xl:w-8",   rotate: "-rotate-3",  delay: "animation-delay-0" },
  { side: "left",  top: "top-[85%]",  size: "h-5 w-5 xl:h-7 xl:w-7",   rotate: "rotate-9",   delay: "animation-delay-1400" },
  { side: "right", top: "top-[92%]",  size: "h-8 w-8 xl:h-9 xl:w-9",   rotate: "-rotate-6",  delay: "animation-delay-700" },
];

export function pickMotifs(
  seed: string,
  count = 4,
  filterIds?: readonly string[]
): PlacedMotif[] {
  const pool = filterIds
    ? AGENCY_MOTIFS.filter((m) => filterIds.includes(m.id))
    : AGENCY_MOTIFS;

  if (pool.length === 0) return [];

  const base = hashSeed(seed);
  const result: PlacedMotif[] = [];

  for (let i = 0; i < Math.min(count, PLACEMENTS.length); i++) {
    const entry = pool[(base + i * 5) % pool.length];
    result.push({ entry, ...PLACEMENTS[i] });
  }

  return result;
}

export function MotifGraphic({
  placed,
  className,
  toneClass,
}: {
  placed: PlacedMotif;
  className?: string;
  toneClass: string;
}) {
  const { entry, size, rotate, delay } = placed;
  const { Component, motion } = entry;
  const motionClass = motion ? MOTION_CLASS[motion] : "";

  return (
    <span
      className={cn(
        "absolute inline-flex items-center justify-center opacity-100",
        size,
        delay,
        motionClass,
        className
      )}
    >
      <Component className={cn("h-full w-full", rotate, toneClass)} />
    </span>
  );
}
