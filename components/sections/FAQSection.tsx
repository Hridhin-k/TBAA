import { FadeIn } from "@/components/motion/Motion";
import { FAQ } from "@/components/ui/FAQ";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { faqItems } from "@/lib/data/content";

export function FAQSection() {
  return (
    <Section id="faq" ariaLabel="Frequently asked questions" background="white">
      <SectionHeader
        index="10"
        eyebrow="FAQ"
        title="Questions, answered."
      />

      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <FAQ items={faqItems} />
        </FadeIn>
      </div>
    </Section>
  );
}
