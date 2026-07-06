import { FadeIn } from "@/components/motion/Motion";
import { FAQ } from "@/components/ui/FAQ";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { faqItems } from "@/lib/data/content";

export function FAQSection() {
  return (
    <Section id="faq" ariaLabel="Frequently asked questions" background="white">
      <div className="editorial-grid">
        <div className="col-span-12 lg:col-span-4 mb-8 lg:mb-0 lg:sticky lg:top-24 lg:self-start">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.25em] text-stone mb-4">
              FAQ
            </p>
            <Heading as="h2" size="lg">
              Questions,
              <br />
              answered.
            </Heading>
          </FadeIn>
        </div>

        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          <FadeIn delay={0.1}>
            <FAQ items={faqItems} />
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}
