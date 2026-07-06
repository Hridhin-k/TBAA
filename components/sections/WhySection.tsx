import { FadeIn } from "@/components/motion/Motion";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { siteMedia } from "@/lib/data/media";

const differentiators = [
  {
    number: "01",
    title: "Agency-born, not classroom-built",
    description:
      "Every module is designed by practitioners who ship campaigns weekly. You learn inside the rhythm of real agency life.",
  },
  {
    number: "02",
    title: "Live briefs, real stakes",
    description:
      "Work on actual brand challenges with mentor feedback at every stage — from insight to final presentation.",
  },
  {
    number: "03",
    title: "Small cohorts, deep attention",
    description:
      "We keep numbers intentionally low. Your work gets seen, critiqued, and elevated — not lost in a crowd.",
  },
  {
    number: "04",
    title: "Portfolio that performs",
    description:
      "Graduate with campaigns that demonstrate strategic thinking, craft, and taste — the three things agencies hire for.",
  },
  {
    number: "05",
    title: "Industry network from day one",
    description:
      "Direct access to agency leaders, brand marketers, and production partners who shape the industry.",
  },
];

export function WhySection() {
  return (
    <Section id="why" ariaLabel="Why Better Academy" background="cream">
      <div className="editorial-grid gap-y-10 mb-10 md:mb-14">
        <div className="col-span-12 lg:col-span-6">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.25em] text-stone mb-4">
              Why Better Academy
            </p>
            <Heading as="h2" size="xl" className="max-w-4xl">
              Not another course.
              <br />
              <span className="text-stone">A creative apprenticeship.</span>
            </Heading>
          </FadeIn>
        </div>
        <div className="col-span-12 lg:col-span-5 lg:col-start-8">
          <FadeIn delay={0.1}>
            <EditorialImage
              src={siteMedia.why.collaboration.src}
              alt={siteMedia.why.collaboration.alt}
              aspectRatio="portrait"
              sizes="(max-width: 768px) 100vw, 42vw"
            />
          </FadeIn>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-10 md:mb-14">
        {[
          { label: "Applications reviewed personally", value: "100%" },
          { label: "Cohort model", value: "Small & focused" },
          { label: "Learning format", value: "Studio + live briefs" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-mist-dark bg-white px-5 py-4"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-stone mb-2">
              {item.label}
            </p>
            <p className="font-display text-lg md:text-xl font-semibold tracking-tight text-ink">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="editorial-grid gap-y-0">
        {differentiators.map((item, index) => (
          <FadeIn
            key={item.number}
            delay={index * 0.06}
            className="col-span-12 md:col-span-6 lg:col-span-4 border-t border-mist-dark pt-6 pb-8 md:pr-6"
          >
            <span className="text-xs tracking-[0.15em] text-stone block mb-4">
              {item.number}
            </span>
            <h3 className="font-display text-xl md:text-2xl font-semibold tracking-tight mb-4">
              {item.title}
            </h3>
            <p className="text-stone leading-relaxed">{item.description}</p>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
