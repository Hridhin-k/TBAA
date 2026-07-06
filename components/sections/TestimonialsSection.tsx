import { FadeIn } from "@/components/motion/Motion";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { testimonials } from "@/lib/data/content";

export function TestimonialsSection() {
  const [featured, ...rest] = testimonials;

  return (
    <Section id="testimonials" ariaLabel="Testimonials" background="cream">
      <div className="editorial-grid gap-y-10 mb-10 md:mb-14">
        <div className="col-span-12 lg:col-span-5">
          <FadeIn>
            <p className="section-eyebrow mb-5">Voices</p>
            <Heading as="h2" size="lg" className="max-w-md">
              What our first cohort experienced.
            </Heading>
          </FadeIn>
        </div>
      </div>

      <div className="editorial-grid gap-4 md:gap-5">
        <FadeIn className="col-span-12 lg:col-span-7">
          <blockquote className="h-full border border-border bg-card p-8 md:p-12 flex flex-col justify-between">
            <p className="font-display text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight leading-snug text-balance">
              &ldquo;{featured.quote}&rdquo;
            </p>
            <footer className="mt-10 pt-8 border-t border-border">
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

        <div className="col-span-12 lg:col-span-5 flex flex-col gap-4 md:gap-5">
          {rest.map((testimonial, index) => (
            <FadeIn key={testimonial.id} delay={0.1 + index * 0.08}>
              <blockquote className="border border-border bg-white p-6 md:p-8 h-full">
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
      </div>
    </Section>
  );
}
