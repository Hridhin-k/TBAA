import { FadeIn } from "@/components/motion/Motion";
import { cn } from "@/utils/cn";

type TimelineProps = {
  steps: {
    id: string;
    phase: string;
    title: string;
    description: string;
  }[];
  className?: string;
};

export function Timeline({ steps, className }: TimelineProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute left-0 top-0 bottom-0 w-px bg-mist-dark hidden md:block" aria-hidden="true" />
      <ol className="space-y-10 md:space-y-12" role="list">
        {steps.map((step, index) => (
          <FadeIn key={step.id} delay={index * 0.1}>
            <li className="relative md:pl-12">
              <span
                className="hidden md:block absolute left-0 top-2 w-2 h-2 -translate-x-[3.5px] bg-ink rounded-full"
                aria-hidden="true"
              />
              <p className="text-xs uppercase tracking-[0.2em] text-stone mb-3">
                {step.phase}
              </p>
              <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight mb-4">
                {step.title}
              </h3>
              <p className="text-stone max-w-lg leading-relaxed">{step.description}</p>
            </li>
          </FadeIn>
        ))}
      </ol>
    </div>
  );
}
