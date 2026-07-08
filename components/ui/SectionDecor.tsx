import { cn } from "@/utils/cn";
import {
  Cross,
  MotifGraphic,
  SHOWREEL_MOTIF_IDS,
  pickMotifs,
} from "@/components/ui/agency-motifs";

type SectionDecorProps = {
  tone?: "dark" | "light";
  /** Stable string (e.g. the section id) used to vary which motifs appear. */
  seed?: string;
  /** Use film/video-heavy motifs (showreel). */
  variant?: "default" | "showreel";
  /** Show motifs on tablet+ (default) or desktop-only */
  visibility?: "md" | "lg";
  /** How many motifs to scatter (max 8) */
  density?: "default" | "dense";
};

const inset = "left-4 xl:left-8 2xl:left-12";
const insetRight = "right-4 xl:right-8 2xl:right-12";

/**
 * Editorial background framing: side rails, corner crosshairs, animated
 * advertising-craft motifs in the gutters, and ambient studio cues.
 * Purely decorative.
 */
export function SectionDecor({
  tone = "dark",
  seed = "",
  variant = "default",
  visibility = "md",
  density = "default",
}: SectionDecorProps) {
  const rail = tone === "light" ? "via-white/12" : "via-ink/10";
  const mark = tone === "light" ? "text-white/25" : "text-ink/20";
  const motifTone =
    tone === "light" ? "text-white/[0.11]" : "text-ink/[0.085]";

  const visibilityClass =
    visibility === "lg" ? "hidden lg:block" : "hidden md:block";

  const count = density === "dense" ? 6 : 4;
  const motifs = pickMotifs(
    seed,
    count,
    variant === "showreel" ? SHOWREEL_MOTIF_IDS : undefined
  );

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        visibilityClass
      )}
      aria-hidden="true"
    >
      {/* Side rails */}
      <span
        className={cn(
          "absolute inset-y-0 w-px bg-gradient-to-b from-transparent to-transparent",
          rail,
          inset
        )}
      />
      <span
        className={cn(
          "absolute inset-y-0 w-px bg-gradient-to-b from-transparent to-transparent",
          rail,
          insetRight
        )}
      />

      {/* Corner crosshairs */}
      <Cross className={cn("absolute top-6", mark, inset)} />
      <Cross className={cn("absolute top-6", mark, insetRight)} />
      <Cross className={cn("absolute bottom-6", mark, inset)} />
      <Cross className={cn("absolute bottom-6", mark, insetRight)} />

      {/* Scattered agency motifs */}
      {motifs.map((placed, i) => (
        <MotifGraphic
          key={`${seed}-${placed.entry.id}-${i}`}
          placed={placed}
          toneClass={motifTone}
          className={cn(
            placed.top,
            placed.side === "left"
              ? cn(inset, "-translate-x-1/2")
              : cn(insetRight, "translate-x-1/2")
          )}
        />
      ))}

      {/* Soft accent orb — studio light feel */}
      <span
        className={cn(
          "absolute top-1/4 h-32 w-32 rounded-full blur-3xl animate-decor-glow",
          tone === "light" ? "bg-accent/10" : "bg-accent/[0.06]",
          insetRight,
          "translate-x-1/2"
        )}
      />

      {/* Secondary orb for dense sections */}
      {density === "dense" && (
        <span
          className={cn(
            "absolute bottom-1/4 h-24 w-24 rounded-full blur-2xl animate-decor-glow",
            tone === "light" ? "bg-accent/8" : "bg-accent/[0.04]",
            inset,
            "-translate-x-1/2"
          )}
          style={{ animationDelay: "4s" }}
        />
      )}

      {/* Timecode label — showreel variant only */}
      {variant === "showreel" && (
        <span
          className={cn(
            "absolute bottom-8",
            insetRight,
            "translate-x-full pl-3"
          )}
        >
          <span className="font-mono text-[8px] tracking-widest text-white/15 tabular-nums">
            00:00:00:00
          </span>
        </span>
      )}

      {/* Vertical tick marks — left rail accent */}
      <span className={cn("absolute flex flex-col gap-4 top-1/3", inset, "-translate-x-full pr-2.5")}>
        {[1, 2, 3].map((n) => (
          <span
            key={n}
            className={cn(
              "block w-1.5 h-px",
              tone === "light" ? "bg-white/20" : "bg-ink/15"
            )}
          />
        ))}
      </span>
    </div>
  );
}
