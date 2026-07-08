"use client";

import { cn } from "@/utils/cn";
import {
  MotifGraphic,
  pickMotifs,
} from "@/components/ui/agency-motifs";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const inset = "left-4 xl:left-8 2xl:left-12";
const insetRight = "right-4 xl:right-8 2xl:right-12";

/**
 * Hero-only background: agency craft motifs scattered on both rails,
 * animated LIVE badge, color-bar strip, viewfinder corners, and a
 * soft broadcast-wave arc. All purely decorative.
 */
export function HeroDecor() {
  const reducedMotion = useReducedMotion();

  // 6 motifs from the full pool, spread across both rails
  const motifs = pickMotifs("hero-v2", 6);

  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* ── Animated motifs in side gutters ─────────────────────────── */}
      {motifs.map((placed, i) => (
        <MotifGraphic
          key={`hero-${placed.entry.id}-${i}`}
          placed={{
            ...placed,
            size:
              i === 0
                ? "h-10 w-10 xl:h-12 xl:w-12"
                : i === 3
                  ? "h-11 w-11 xl:h-14 xl:w-14"
                  : placed.size,
          }}
          toneClass="text-ink/[0.07] md:text-ink/[0.09]"
          className={cn(
            placed.top,
            placed.side === "left"
              ? cn(inset, "-translate-x-1/2", i > 3 ? "hidden xl:block" : "hidden md:block")
              : cn(insetRight, "translate-x-1/2", i > 3 ? "hidden xl:block" : "hidden lg:block"),
            reducedMotion && "!animate-none"
          )}
        />
      ))}

      {/* ── Mobile: single motif in margin ───────────────────────────── */}
      <MotifGraphic
        placed={{
          entry: motifs[0]?.entry ?? pickMotifs("fallback", 1)[0].entry,
          side: "right",
          top: "top-[42%]",
          size: "h-8 w-8",
          rotate: "rotate-6",
          delay: "animation-delay-500",
        }}
        toneClass="text-ink/[0.06]"
        className={cn(insetRight, "translate-x-1/2 md:hidden")}
      />

      {/* ── Animated REC / ON-SET dot ─────────────────────────────────── */}
      {!reducedMotion && (
        <span
          className={cn(
            "absolute top-[28%] hidden md:flex items-center gap-1.5",
            insetRight,
            "translate-x-4 xl:translate-x-8"
          )}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent/70" />
          </span>
          <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-ink/25">
            On set
          </span>
        </span>
      )}

      {/* ── LIVE badge — top-left gutter ─────────────────────────────── */}
      {!reducedMotion && (
        <span
          className={cn(
            "absolute top-[18%] hidden lg:flex items-center gap-1.5",
            inset,
            "-translate-x-full pr-3"
          )}
        >
          <span className="inline-flex items-center gap-1 border border-accent/30 rounded px-1.5 py-0.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent/80" />
            </span>
            <span className="text-[8px] font-semibold uppercase tracking-[0.32em] text-accent/60">
              Live
            </span>
          </span>
        </span>
      )}

      {/* ── Viewfinder corner brackets — left rail ───────────────────── */}
      <svg
        viewBox="0 0 20 20"
        fill="none"
        className={cn(
          "absolute top-[44%] h-6 w-6 hidden xl:block",
          inset,
          "-translate-x-full -translate-y-1/2"
        )}
      >
        <path d="M2 8V2h6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="text-ink/10" />
        <path d="M2 12v6h6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="text-ink/10" />
        <path d="M18 8V2h-6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="text-ink/10" />
        <path d="M18 12v6h-6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="text-ink/10" />
      </svg>

      {/* ── Vertical color-bars strip — far left edge ─────────────────── */}
      <span
        className={cn(
          "absolute hidden 2xl:flex flex-col top-1/3 -translate-y-1/2 gap-[2px]",
          "left-0 w-[5px]"
        )}
      >
        {["bg-ink/25","bg-ink/12","bg-ink/18","bg-ink/8","bg-ink/20","bg-ink/14"].map((c, i) => (
          <span key={i} className={cn("flex-1 h-7 rounded-sm", c)} />
        ))}
      </span>

      {/* ── Timecode / frame counter label — bottom left ─────────────── */}
      {!reducedMotion && (
        <span
          className={cn(
            "absolute bottom-[12%] hidden xl:block",
            inset,
            "-translate-x-full pr-3"
          )}
        >
          <span className="font-mono text-[8px] tracking-widest text-ink/15 tabular-nums">
            00:00:24:12
          </span>
        </span>
      )}

      {/* ── Soft accent orb (studio light feel) ──────────────────────── */}
      <span
        className={cn(
          "absolute top-1/4 h-40 w-40 rounded-full blur-3xl animate-decor-glow",
          "bg-accent/[0.05]",
          insetRight,
          "translate-x-1/2"
        )}
      />

      {/* ── Second smaller orb — lower left ──────────────────────────── */}
      {!reducedMotion && (
        <span
          className={cn(
            "absolute top-[65%] h-24 w-24 rounded-full blur-2xl animate-decor-glow",
            "bg-accent/[0.04]",
            inset,
            "-translate-x-1/2"
          )}
          style={{ animationDelay: "3s" }}
        />
      )}
    </div>
  );
}
