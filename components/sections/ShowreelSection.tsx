import { FadeIn } from "@/components/motion/Motion";
import { ReelsCarousel } from "@/components/ui/ReelsCarousel";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { reels } from "@/lib/data/reels";

export function ShowreelSection() {
  return (
    <Section
      id="showreel"
      ariaLabel="Academy showreel"
      background="ink"
      className="!py-0"
      containerClassName="!px-0 !max-w-none"
      decorated
      decorVariant="showreel"
      decorDensity="dense"
    >
      <div className="container-editorial pt-12 md:pt-16 pb-8 md:pb-10">
        <SectionHeader
          index="01"
          eyebrow="Showreel"
          tone="light"
          title="See the standard of work we hold ourselves to."
          lead="A stream of reels from The Better Agency — brand films, hospitality campaigns, fitness films, and fashion advertising. Drag, swipe, or just watch it drift."
        />
      </div>

      <FadeIn>
        <ReelsCarousel reels={reels} />
      </FadeIn>

      <div className="container-editorial pt-8 md:pt-10 pb-12 md:pb-16">
        <FadeIn delay={0.1}>
          <p className="max-w-2xl text-stone-light leading-relaxed">
            This is the craft you will learn to deliver inside our academy — real
            work, made for real brands.
          </p>
        </FadeIn>
      </div>
    </Section>
  );
}
