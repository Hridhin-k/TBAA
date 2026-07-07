import { cn } from "@/utils/cn";
import { FadeIn } from "@/components/motion/Motion";
import { Heading } from "@/components/ui/Heading";

type SectionHeaderProps = {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  tone?: "dark" | "light";
  size?: "lg" | "md";
  className?: string;
};

export function SectionHeader({
  index,
  eyebrow,
  title,
  lead,
  tone = "dark",
  size = "lg",
  className,
}: SectionHeaderProps) {
  const isLight = tone === "light";

  return (
    <FadeIn className={cn("max-w-5xl mx-auto mb-8 md:mb-10", className)}>
      <div className="flex items-center gap-3 mb-5">
        <span
          className={cn("h-px w-8 shrink-0", isLight ? "bg-accent/60" : "bg-accent")}
          aria-hidden="true"
        />
        <p className={cn("section-eyebrow", isLight && "text-stone-light")}>
          <span className="font-medium text-accent">{index}</span>
          <span className="mx-2 opacity-40" aria-hidden="true">
            /
          </span>
          {eyebrow}
        </p>
      </div>

      <Heading as="h2" size={size} className={cn(isLight && "text-white")}>
        {title}
      </Heading>

      {lead && (
        <p
          className={cn(
            "mt-5 max-w-2xl leading-relaxed text-balance",
            isLight ? "text-stone-light" : "text-muted-foreground"
          )}
        >
          {lead}
        </p>
      )}
    </FadeIn>
  );
}
