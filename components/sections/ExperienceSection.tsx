import { FadeIn } from "@/components/motion/Motion";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Timeline } from "@/components/ui/Timeline";
import { curriculumModules, timelineSteps } from "@/lib/data/content";
import { siteMedia } from "@/lib/data/media";

export function ExperienceSection() {
  return (
    <Section id="experience" ariaLabel="Learning experience" background="white">
      <SectionHeader
        index="05"
        eyebrow="Learning Experience"
        title="Six months of immersion in the craft of advertising."
        lead="A structured journey from foundations to finished campaigns — designed to mirror how great work actually gets made."
      />

      {/* Symmetric image pair */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-5 max-w-5xl mx-auto mb-12 md:mb-16">
        <FadeIn>
          <EditorialImage
            src={siteMedia.experience.filmSet.src}
            alt={siteMedia.experience.filmSet.alt}
            aspectRatio="landscape"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </FadeIn>
        <FadeIn delay={0.1}>
          <EditorialImage
            src={siteMedia.experience.workshop.src}
            alt={siteMedia.experience.workshop.alt}
            aspectRatio="landscape"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </FadeIn>
      </div>

      <div className="editorial-grid gap-y-12 lg:gap-x-8 max-w-5xl mx-auto">
        <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <FadeIn>
            <p className="section-eyebrow mb-4">Timeline</p>
            <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight mb-8">
              Program arc
            </h3>
          </FadeIn>
          <Timeline steps={timelineSteps} />
        </div>

        <div className="col-span-12 lg:col-span-7 lg:col-start-6">
          <FadeIn delay={0.1}>
            <p className="section-eyebrow mb-4">Curriculum</p>
            <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight mb-8">
              What you&apos;ll master
            </h3>
          </FadeIn>
          <div className="grid gap-4 md:gap-5">
            {curriculumModules.map((module, index) => (
              <FeatureCard
                key={module.id}
                number={module.number}
                title={module.title}
                description={module.description}
                topics={module.topics}
                index={index}
                variant={index === 0 ? "featured" : "default"}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
