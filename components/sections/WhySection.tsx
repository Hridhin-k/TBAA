import { FadeIn } from "@/components/motion/Motion";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
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

const stats = [
  { label: "Applications reviewed personally", value: "100%" },
  { label: "Cohort model", value: "Small & focused" },
  { label: "Learning format", value: "Studio + live briefs" },
];

export function WhySection() {
  return (
    <Section id="why" ariaLabel="Why Better Academy" background="cream">
      <SectionHeader
        index="04"
        eyebrow="Why Better Academy"
        title={
          <>
            Not another course.
            <br />
            <span className="text-stone">A creative apprenticeship.</span>
          </>
        }
      />

      {/* Symmetric proof metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto mb-10 md:mb-12">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-mist-dark bg-white px-6 py-6 text-center"
          >
            <p className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-ink mb-2">
              {item.value}
            </p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-stone">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* Breather visual */}
      <FadeIn className="max-w-5xl mx-auto mb-10 md:mb-12">
        <EditorialImage
          src={siteMedia.why.collaboration.src}
          alt={siteMedia.why.collaboration.alt}
          aspectRatio="cinematic"
          sizes="(max-width: 768px) 100vw, 56rem"
        />
      </FadeIn>

      {/* Numbered differentiator list — consistent rows */}
      <div className="max-w-5xl mx-auto">
        {differentiators.map((item, index) => (
          <FadeIn key={item.number} delay={index * 0.06}>
            <article className="grid grid-cols-[auto_1fr] gap-6 md:gap-10 border-t border-mist-dark py-7 md:py-8">
              <span className="font-display text-sm font-medium tracking-[0.15em] text-stone pt-1">
                {item.number}
              </span>
              <div className="grid md:grid-cols-[1fr_1.2fr] gap-2 md:gap-8">
                <h3 className="font-display text-xl md:text-2xl font-semibold tracking-tight text-balance">
                  {item.title}
                </h3>
                <p className="text-stone leading-relaxed">{item.description}</p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
