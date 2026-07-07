import { ApplicationJourney } from "@/components/application/ApplicationJourney";
import { FadeIn } from "@/components/motion/Motion";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

const reassurances = [
  "Limited seats — founding batch",
  "Reviewed personally",
  "Response within two weeks",
];

export function RegistrationSection() {
  return (
    <Section id="register" ariaLabel="Reserve your seat" background="cream">
      <SectionHeader
        index="04"
        eyebrow="Reserve Your Seat"
        title="Apply to the founding batch."
        lead="This is the beginning. Tell us about yourself — it takes about five minutes, and every application is read by our team."
        className="mb-5 md:mb-6"
        size="md"
      />

      <FadeIn className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 mb-6 text-sm">
        {reassurances.map((item) => (
          <span
            key={item}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
            {item}
          </span>
        ))}
      </FadeIn>

      <div className="max-w-4xl mx-auto">
        <FadeIn delay={0.1}>
          <ApplicationJourney />
        </FadeIn>
      </div>
    </Section>
  );
}
