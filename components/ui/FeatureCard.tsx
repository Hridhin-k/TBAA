import { FadeIn } from "@/components/motion/Motion";
import { cn } from "@/utils/cn";

type FeatureCardProps = {
  number: string;
  title: string;
  description: string;
  topics?: string[];
  className?: string;
  index?: number;
  variant?: "default" | "featured";
};

export function FeatureCard({
  number,
  title,
  description,
  topics,
  className,
  index = 0,
  variant = "default",
}: FeatureCardProps) {
  return (
    <FadeIn delay={index * 0.08} className={cn("group h-full", className)}>
      <article
        className={cn(
          "relative h-full border border-border bg-card transition-colors duration-500 hover:border-foreground/20",
          variant === "featured" ? "p-8 md:p-10" : "p-6 md:p-8"
        )}
      >
        <span
          className={cn(
            "font-display font-semibold tracking-tight text-muted-foreground/40 block mb-6",
            variant === "featured"
              ? "text-5xl md:text-6xl leading-none"
              : "text-4xl md:text-5xl leading-none"
          )}
        >
          {number}
        </span>
        <h3
          className={cn(
            "font-display font-semibold tracking-tight mb-4 group-hover:text-foreground/85 transition-colors",
            variant === "featured" ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
          )}
        >
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-5 max-w-prose">{description}</p>
        {topics && topics.length > 0 && (
          <ul className="flex flex-wrap gap-2" role="list">
            {topics.map((topic) => (
              <li
                key={topic}
                className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground border border-border px-3 py-1.5 rounded-full"
              >
                {topic}
              </li>
            ))}
          </ul>
        )}
      </article>
    </FadeIn>
  );
}
