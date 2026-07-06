import { FadeIn } from "@/components/motion/Motion";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { Section } from "@/components/ui/Section";
import { siteMedia } from "@/lib/data/media";

export function AboutSection() {
  return (
    <Section id="about" ariaLabel="About The Better Academy" background="cream">
      <div className="editorial-grid gap-y-10 md:gap-y-12">
        {/* Intro — single structured block */}
        <div className="col-span-12 border-b border-mist-dark pb-10 md:pb-12">
          <FadeIn>
            <div className="flex items-center gap-3 mb-8 md:mb-10">
              <span className="w-8 h-px bg-ink shrink-0" aria-hidden="true" />
              <p className="text-[11px] uppercase tracking-[0.28em] text-stone font-medium">
                About
              </p>
            </div>

            <h2 className="font-display font-semibold tracking-[-0.04em] leading-[0.95] text-[clamp(2.25rem,5.5vw,4.25rem)] max-w-[16ch]">
              Born from a belief that advertising education deserves better.
            </h2>
          </FadeIn>

          <div className="mt-8 md:mt-10 editorial-grid gap-y-6">
            <FadeIn delay={0.1} className="col-span-12 lg:col-span-6">
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
                — an established creative agency that has spent years bringing brands
                to life through strategy, design, and film.
              </p>
            </FadeIn>
            <FadeIn delay={0.18} className="col-span-12 lg:col-span-5 lg:col-start-8">
              <p className="text-stone leading-relaxed">
                We created this academy because we kept meeting talented people who
                had passion but lacked the craft, the portfolio, and the industry
                fluency to break in. The gap between what schools teach and what
                agencies need has never been wider.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Visual story */}
        <div className="col-span-12 editorial-grid gap-4 md:gap-5">
          <FadeIn className="col-span-12 md:col-span-8">
            <EditorialImage
              src={siteMedia.about.team.src}
              alt={siteMedia.about.team.alt}
              aspectRatio="cinematic"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          </FadeIn>
          <FadeIn delay={0.08} className="col-span-12 md:col-span-4 flex flex-col gap-4 md:gap-5">
            <EditorialImage
              src={siteMedia.about.studio.src}
              alt={siteMedia.about.studio.alt}
              aspectRatio="square"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <blockquote className="border-l-2 border-ink pl-5 py-1">
              <p className="text-[10px] uppercase tracking-[0.22em] text-stone mb-3">
                From the agency floor
              </p>
              <p className="font-display text-lg md:text-xl font-medium tracking-tight leading-snug text-ink">
                Every lesson is rooted in how we actually work — briefs, reviews,
                deadlines, and work we&apos;re proud to put our name on.
              </p>
            </blockquote>
          </FadeIn>
        </div>

        {/* Mission & vision */}
        <div className="col-span-12 grid md:grid-cols-2 gap-4 md:gap-5">
          <FadeIn className="border border-border bg-card p-8 md:p-10">
            <p className="section-eyebrow mb-5">Mission</p>
            <p className="font-display text-xl md:text-2xl font-semibold tracking-tight leading-snug">
              To train advertising professionals who think like strategists, create
              like artists, and deliver like practitioners.
            </p>
          </FadeIn>
          <FadeIn delay={0.08} className="border border-border bg-white p-8 md:p-10">
            <p className="section-eyebrow mb-5">Vision</p>
            <p className="font-display text-xl md:text-2xl font-semibold tracking-tight leading-snug">
              An academy recognised not for certificates, but for the quality of
              work its graduates produce.
            </p>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}
