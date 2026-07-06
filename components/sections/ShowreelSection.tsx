import { FadeIn } from "@/components/motion/Motion";
import { CinematicVideoPlayer } from "@/components/ui/CinematicVideoPlayer";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { siteMedia } from "@/lib/data/media";

export function ShowreelSection() {
  return (
    <Section
      id="showreel"
      ariaLabel="Academy showreel"
      background="ink"
      className="!py-0 scroll-mt-16"
      containerClassName="!px-0 !max-w-none"
    >
      <div className="container-editorial pt-10 md:pt-14 pb-6 md:pb-10">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.25em] text-stone-light mb-4">
            Showreel
          </p>
          <Heading as="h2" size="lg" className="text-white max-w-3xl">
            See the standard of work we hold ourselves to.
          </Heading>
        </FadeIn>
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

      <div className="container-editorial pt-6 md:pt-8 pb-10 md:pb-14">
        <FadeIn delay={0.1}>
          <p className="text-stone-light max-w-2xl leading-relaxed">
            Behind-the-scenes from real commercial shoots — brand films, hospitality
            campaigns, fitness films, and fashion advertising. This is the craft you
            will learn to deliver inside our academy.
          </p>
        </FadeIn>
      </div>
    </Section>
  );
}
