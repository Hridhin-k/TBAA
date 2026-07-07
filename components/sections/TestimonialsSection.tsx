import { FadeIn } from "@/components/motion/Motion";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { testimonials } from "@/lib/data/content";

export function TestimonialsSection() {
  const [featured, ...rest] = testimonials;

  return (
    <Section id="testimonials" ariaLabel="Testimonials" background="cream">
      <SectionHeader
        index="09"
        eyebrow="Voices"
        title="What our first cohort experienced."
      />

      {/* Featured quote — centered */}
      <FadeIn className="max-w-5xl mx-auto text-center mb-4 md:mb-5">
        <blockquote className="border border-border bg-card rounded-2xl p-8 md:p-12">
          <p className="font-display text-2xl md:text-3xl font-medium tracking-tight leading-snug text-balance">
            &ldquo;{featured.quote}&rdquo;
          </p>
          <footer className="mt-8 pt-6 border-t border-border">
            <cite className="not-italic">
              <span className="block text-sm font-medium">{featured.name}</span>
              <span className="block text-sm text-muted-foreground mt-1">
                {featured.role}
                {featured.cohort && ` — ${featured.cohort}`}
              </span>
            </cite>
          </footer>
        </blockquote>
      </FadeIn>

      {/* Supporting quotes — symmetric grid */}
      <div className="grid sm:grid-cols-2 gap-4 md:gap-5 max-w-5xl mx-auto">
        {rest.map((testimonial, index) => (
          <FadeIn key={testimonial.id} delay={0.1 + index * 0.08}>
            <blockquote className="h-full border border-border bg-white rounded-2xl p-6 md:p-8">
              <p className="font-display text-lg md:text-xl font-medium tracking-tight leading-snug mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <footer>
                <cite className="not-italic">
                  <span className="block text-sm font-medium">{testimonial.name}</span>
                  <span className="block text-sm text-muted-foreground mt-1">
                    {testimonial.role}
                    {testimonial.cohort && ` — ${testimonial.cohort}`}
                  </span>
                </cite>
              </footer>
            </blockquote>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
