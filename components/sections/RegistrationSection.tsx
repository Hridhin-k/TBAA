import { ApplicationJourney } from "@/components/application/ApplicationJourney";
import { FadeIn } from "@/components/motion/Motion";
import { Section } from "@/components/ui/Section";

export function RegistrationSection() {
  return (
    <Section id="apply" ariaLabel="Application" background="cream">
      <div className="editorial-grid">
        <div className="col-span-12 lg:col-span-5 lg:sticky lg:top-28 lg:self-start mb-10 lg:mb-0">
          <FadeIn>
            <p className="section-eyebrow mb-5">Apply</p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-semibold tracking-tight leading-[1.02] mb-6 max-w-md">
              Your application begins here.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-sm">
              No commitment required. It takes around five minutes, and every
              application is reviewed manually by our team.
            </p>
            <ul className="space-y-3" role="list">
              {["No spam", "Human review", "Response in 2 weeks"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="w-1 h-1 rounded-full bg-foreground shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          <FadeIn delay={0.1}>
            <ApplicationJourney />
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}
