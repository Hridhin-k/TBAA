import { ApplicationJourney } from "@/components/application/ApplicationJourney";
import { FadeIn } from "@/components/motion/Motion";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

const reassurances = ["No spam", "Human review", "Response in 2 weeks"];

export function RegistrationSection() {
  return (
    <Section id="apply" ariaLabel="Application" background="cream">
      <SectionHeader
        index="11"
        eyebrow="Apply"
        title="Your application begins here."
        lead="No commitment required. It takes around five minutes, and every application is reviewed manually by our team."
      />

      <FadeIn className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-12 md:mb-14">
        {reassurances.map((item) => (
          <span
            key={item}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <span className="w-1 h-1 rounded-full bg-foreground shrink-0" />
            {item}
          </span>
        ))}
      </FadeIn>

      <div className="max-w-2xl mx-auto">
        <FadeIn delay={0.1}>
          <ApplicationJourney />
        </FadeIn>
      </div>
    </Section>
  );
}
