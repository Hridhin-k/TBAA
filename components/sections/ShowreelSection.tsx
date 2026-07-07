import { FadeIn } from "@/components/motion/Motion";
import { CinematicVideoPlayer } from "@/components/ui/CinematicVideoPlayer";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteMedia } from "@/lib/data/media";

export function ShowreelSection() {
  return (
    <Section
      id="showreel"
      ariaLabel="Academy showreel"
      background="ink"
      className="!py-0 scroll-mt-16"
      containerClassName="!px-0 !max-w-none"
      decorated={false}
    >
      <div className="container-editorial pt-12 md:pt-16 pb-8 md:pb-10">
        <SectionHeader
          index="01"
          eyebrow="Showreel"
          tone="light"
          title="See the standard of work we hold ourselves to."
        />
      </div>

      <FadeIn>
        <CinematicVideoPlayer
          youtubeId={siteMedia.showreel.youtubeId}
          poster={siteMedia.showreel.poster}
          title={siteMedia.showreel.title}
          subtitle={siteMedia.showreel.subtitle}
          aspectRatio="cinematic"
        />
      </FadeIn>

      <div className="container-editorial pt-8 md:pt-10 pb-12 md:pb-16">
        <FadeIn delay={0.1}>
          <p className="mx-auto max-w-2xl text-center text-stone-light leading-relaxed">
            Behind-the-scenes from real commercial shoots — brand films, hospitality
            campaigns, fitness films, and fashion advertising. This is the craft you
            will learn to deliver inside our academy.
          </p>
        </FadeIn>
      </div>
    </Section>
  );
}
