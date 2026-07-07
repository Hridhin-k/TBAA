import { cn } from "@/utils/cn";

type SectionDecorProps = {
  tone?: "dark" | "light";
  /** Stable string (e.g. the section id) used to vary which motifs appear. */
  seed?: string;
};

const inset = "left-4 xl:left-8 2xl:left-12";
const insetRight = "right-4 xl:right-8 2xl:right-12";

function Cross({ className }: { className?: string }) {
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

type MotifProps = { className?: string };

/* —— Advertising-craft line motifs (thin, editorial) —— */

// Aperture / lens — film & photography
function Aperture({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="0.9" />
      <path
        d="M12 3l4.5 7.8M21 12l-9 0M16.5 20.8L12 13M3 12h9M7.5 3.2L12 11M3 12l4.5-7.8"
        stroke="currentColor"
        strokeWidth="0.7"
      />
    </svg>
  );
}

// Pen nib — copywriting
function Nib({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2l6 6-6 14-6-14 6-6z"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <path d="M6 8h12M12 8v14" stroke="currentColor" strokeWidth="0.7" />
      <circle cx="12" cy="11" r="1.4" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

// Megaphone — media & broadcast
function Megaphone({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M3 10v4l11 5V5L3 10z"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <path
        d="M14 7c3 1 5 2.5 5 5s-2 4-5 5"
        stroke="currentColor"
        strokeWidth="0.7"
      />
      <path d="M6 14v4l3 1" stroke="currentColor" strokeWidth="0.7" />
    </svg>
  );
}

// Cursor / pointer — digital
function Cursor({ className }: MotifProps) {
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

// Clapperboard — film production
function Clapper({ className }: MotifProps) {
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

// Asterisk / spark — accent flourish
function Asterisk({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 3v18M4.5 7.5l15 9M19.5 7.5l-15 9"
        stroke="currentColor"
        strokeWidth="0.8"
      />
    </svg>
  );
}

// Quotation marks — messaging
function Quote({ className }: MotifProps) {
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

// Registration target — print / precision
function Target({ className }: MotifProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="0.7" />
      <path d="M12 1v6M12 17v6M1 12h6M17 12h6" stroke="currentColor" strokeWidth="0.7" />
    </svg>
  );
}

const MOTIFS = [
  Aperture,
  Nib,
  Megaphone,
  Cursor,
  Clapper,
  Asterisk,
  Quote,
  Target,
] as const;

function hash(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return h;
}

/**
 * Editorial background framing: faint vertical rails in the side margins with
 * crosshair joints at each corner, plus a couple of advertising-craft line
 * motifs scattered in the gutters. Desktop-only; purely decorative.
 */
export function SectionDecor({ tone = "dark", seed = "" }: SectionDecorProps) {
  const rail = tone === "light" ? "via-white/12" : "via-ink/10";
  const mark = tone === "light" ? "text-white/25" : "text-ink/20";
  const motif = tone === "light" ? "text-white/[0.10]" : "text-ink/[0.09]";

  const base = hash(seed);
  const idxA = base % MOTIFS.length;
  // Offset by a co-prime step so the two motifs usually differ; unsigned shift
  // keeps the index non-negative (signed >> can yield a negative index).
  const idxB = ((base >>> 3) + 3) % MOTIFS.length;
  const MotifA = MOTIFS[idxA];
  const MotifB = MOTIFS[idxB];

  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 hidden lg:block"
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

      {/* Advertising-craft motifs in the gutters */}
      {MotifA ? (
        <MotifA
          className={cn(
            "absolute top-1/3 h-7 w-7 -translate-x-1/2 -rotate-6",
            motif,
            inset
          )}
        />
      ) : null}
      {MotifB ? (
        <MotifB
          className={cn(
            "absolute bottom-1/3 h-7 w-7 translate-x-1/2 rotate-6",
            motif,
            insetRight
          )}
        />
      ) : null}
    </div>
  );
}
