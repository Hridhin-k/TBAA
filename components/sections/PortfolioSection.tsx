import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { VideoCard } from "@/components/ui/VideoCard";
import { portfolioVideos } from "@/lib/data/content";

export function PortfolioSection() {
  return (
    <Section id="portfolio" ariaLabel="Portfolio" background="ink">
      <SectionHeader
        index="07"
        eyebrow="Portfolio"
        tone="light"
        title="Work that sets the standard."
        lead="Campaign films, social creatives, and brand work produced by The Better Agency — the standard our students are trained to meet."
      />

      {/* Symmetric 2×2 grid */}
      <div className="grid sm:grid-cols-2 gap-4 md:gap-5 max-w-5xl mx-auto">
        {portfolioVideos.map((video, index) => (
          <VideoCard key={video.id} video={video} layout="wide" index={index} />
        ))}
      </div>
    </Section>
  );
}
