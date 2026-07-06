import { FadeIn } from "@/components/motion/Motion";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Timeline } from "@/components/ui/Timeline";
import { curriculumModules, timelineSteps } from "@/lib/data/content";
import { siteMedia } from "@/lib/data/media";

export function ExperienceSection() {
  return (
    <Section id="experience" ariaLabel="Learning experience" background="white">
      {/* Centered intro — different rhythm from adjacent sections */}
      <div className="max-w-3xl mx-auto text-center mb-14 md:mb-20">
        <FadeIn>
          <p className="section-eyebrow mb-5">Learning Experience</p>
          <Heading as="h2" size="xl" className="mb-6">
            Six months of immersion in the craft of advertising.
          </Heading>
          <p className="text-muted-foreground leading-relaxed text-balance">
            A structured journey from foundations to finished campaigns — designed
            to mirror how great work actually gets made.
          </p>
        </FadeIn>
      </div>

      {/* Overlapping image composition */}
      <div className="editorial-grid mb-16 md:mb-24">
        <FadeIn className="col-span-12 md:col-span-9 md:col-start-1 relative z-10">
          <EditorialImage
            src={siteMedia.experience.filmSet.src}
            alt={siteMedia.experience.filmSet.alt}
            aspectRatio="cinematic"
            sizes="(max-width: 768px) 100vw, 72vw"
          />
        </FadeIn>
        <FadeIn
          delay={0.12}
          className="col-span-10 md:col-span-4 md:col-start-9 -mt-12 md:-mt-20 relative z-20"
        >
          <EditorialImage
            src={siteMedia.experience.workshop.src}
            alt={siteMedia.experience.workshop.alt}
            aspectRatio="square"
            sizes="(max-width: 768px) 80vw, 30vw"
            className="shadow-[0_24px_80px_-24px_rgba(12,12,12,0.2)]"
          />
        </FadeIn>
      </div>

      <div className="editorial-grid gap-y-12 lg:gap-x-8">
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
