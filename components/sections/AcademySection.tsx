import { FadeIn } from "@/components/motion/Motion";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { academyFeatures } from "@/lib/data/launch";

export function AcademySection() {
  return (
    <Section id="academy" ariaLabel="The Academy" background="cream">
      <SectionHeader
        index="02"
        eyebrow="The Academy"
        title="Not a course. An apprenticeship in the making of great advertising."
        lead="The Better Academy exists to close the gap between how advertising is taught and how it is actually made."
      />

      {/* Editorial feature blocks — no generic cards */}
      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-x-10 md:gap-x-16 gap-y-0">
        {academyFeatures.map((feature, index) => (
          <FadeIn key={feature.number} delay={index * 0.08}>
            <article className="group relative border-t border-mist-dark py-8 md:py-10">
              <span
                className="absolute left-0 top-0 h-px w-0 bg-accent transition-all duration-500 ease-out group-hover:w-full"
                aria-hidden="true"
              />
              <div className="flex items-baseline gap-4 mb-4">
                <span className="font-display text-sm font-medium text-accent tabular-nums">
                  {feature.number}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-semibold tracking-tight">
                  {feature.title}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed md:pl-10 max-w-md">
                {feature.description}
              </p>
            </article>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
