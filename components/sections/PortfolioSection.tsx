import { FadeIn } from "@/components/motion/Motion";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { VideoCard } from "@/components/ui/VideoCard";
import { portfolioVideos } from "@/lib/data/content";

export function PortfolioSection() {
  const [lead, topRight, bottomLeft, bottomRight] = portfolioVideos;

  return (
    <Section id="portfolio" ariaLabel="Portfolio" background="ink">
      <div className="editorial-grid mb-8 md:mb-10">
        <div className="col-span-12 lg:col-span-6">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.25em] text-stone-light mb-4">
              Portfolio
            </p>
            <Heading as="h2" size="xl" className="text-white">
              Work that sets the standard.
            </Heading>
          </FadeIn>
        </div>
        <div className="col-span-12 lg:col-span-5 lg:col-start-8 flex items-end">
          <FadeIn delay={0.15}>
            <p className="text-stone-light leading-relaxed">
              Campaign films, social creatives, and brand work produced by{" "}
              <a
                href="https://thebetteragency.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors"
              >
                The Better Agency
              </a>{" "}
              — the standard our students are trained to meet.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Bento-style asymmetric grid — compact, balanced heights */}
      <div className="grid grid-cols-12 gap-3 md:gap-4 max-w-5xl lg:max-w-none mx-auto">
        <div className="col-span-12 sm:col-span-7">
          <VideoCard video={lead} layout="lead" index={0} />
        </div>
        <div className="col-span-12 sm:col-span-5">
          <VideoCard video={topRight} layout="compact" index={1} />
        </div>
        <div className="col-span-12 sm:col-span-5 md:col-span-4">
          <VideoCard video={bottomLeft} layout="compact" index={2} />
        </div>
        <div className="col-span-12 sm:col-span-7 md:col-span-8">
          <VideoCard video={bottomRight} layout="wide" index={3} />
        </div>
      </div>
    </Section>
  );
}
