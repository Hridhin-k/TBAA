import { cn } from "@/utils/cn";

type SectionDecorProps = {
  tone?: "dark" | "light";
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

/**
 * Editorial background framing: faint vertical rails in the side margins with
 * crosshair joints at each section corner. Shown on wider screens where the
 * content column leaves room in the margins.
 */
export function SectionDecor({ tone = "dark" }: SectionDecorProps) {
  const rail = tone === "light" ? "via-white/12" : "via-ink/10";
  const mark = tone === "light" ? "text-white/25" : "text-ink/20";

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
    </div>
  );
}
