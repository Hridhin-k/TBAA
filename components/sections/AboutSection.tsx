import { FadeIn } from "@/components/motion/Motion";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteMedia } from "@/lib/data/media";

export function AboutSection() {
  return (
    <Section id="about" ariaLabel="About The Better Academy" background="cream">
      <SectionHeader
        index="02"
        eyebrow="About"
        title="Born from a belief that advertising education deserves better."
      />

      {/* Intro — symmetric two-column */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto mb-12 md:mb-16">
        <FadeIn>
          <p className="text-lg md:text-xl text-ink leading-relaxed text-balance">
            The Better Academy is a new venture from{" "}
            <a
              href="https://thebetteragency.in"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-mist-dark hover:decoration-ink transition-colors"
            >
              The Better Agency
            </a>{" "}
            — an established creative agency that has spent years bringing brands to
            life through strategy, design, and film.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-stone leading-relaxed">
            We created this academy because we kept meeting talented people who had
            passion but lacked the craft, the portfolio, and the industry fluency to
            break in. The gap between what schools teach and what agencies need has
            never been wider.
          </p>
        </FadeIn>
      </div>

      {/* Visual story — symmetric image pair */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-5 max-w-5xl mx-auto mb-12 md:mb-16">
        <FadeIn>
          <EditorialImage
            src={siteMedia.about.team.src}
            alt={siteMedia.about.team.alt}
            aspectRatio="landscape"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </FadeIn>
        <FadeIn delay={0.08}>
          <EditorialImage
            src={siteMedia.about.studio.src}
            alt={siteMedia.about.studio.alt}
            aspectRatio="landscape"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </FadeIn>
      </div>

      {/* Pull quote — centered */}
      <FadeIn className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
        <p className="text-[10px] uppercase tracking-[0.22em] text-stone mb-4">
          From the agency floor
        </p>
        <blockquote className="font-display text-2xl md:text-3xl font-medium tracking-tight leading-snug text-ink text-balance">
          Every lesson is rooted in how we actually work — briefs, reviews,
          deadlines, and work we&apos;re proud to put our name on.
        </blockquote>
      </FadeIn>

      {/* Mission & vision — symmetric */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-5 max-w-5xl mx-auto">
        <FadeIn className="border border-border bg-card p-8 md:p-10 rounded-2xl">
          <p className="section-eyebrow mb-5">Mission</p>
          <p className="font-display text-xl md:text-2xl font-semibold tracking-tight leading-snug">
            To train advertising professionals who think like strategists, create
            like artists, and deliver like practitioners.
          </p>
        </FadeIn>
        <FadeIn delay={0.08} className="border border-border bg-white p-8 md:p-10 rounded-2xl">
          <p className="section-eyebrow mb-5">Vision</p>
          <p className="font-display text-xl md:text-2xl font-semibold tracking-tight leading-snug">
            An academy recognised not for certificates, but for the quality of work
            its graduates produce.
          </p>
        </FadeIn>
      </div>
    </Section>
  );
}
