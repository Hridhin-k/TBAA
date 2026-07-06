import { FadeIn } from "@/components/motion/Motion";
import { Reveal } from "@/components/motion/Motion";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { siteMedia } from "@/lib/data/media";

const problems = [
  {
    number: "01",
    title: "Theory without practice",
    description:
      "Most courses teach advertising history and frameworks — but never how to write a brief, pitch an idea, or survive a client review.",
  },
  {
    number: "02",
    title: "Outdated portfolios",
    description:
      "Students graduate with mock campaigns that look nothing like the work agencies actually produce. Recruiters see through it instantly.",
  },
  {
    number: "03",
    title: "Disconnected mentors",
    description:
      "Instructors who haven't made a campaign in years can't teach you what today's market demands. The industry moves faster than syllabi.",
  },
  {
    number: "04",
    title: "Certificate culture",
    description:
      "A PDF certificate doesn't open doors. A reel of real work, shaped by real feedback, does.",
  },
];

export function ProblemSection() {
  return (
    <Section id="problem" ariaLabel="Industry problem" background="white">
      <div className="editorial-grid gap-y-12 md:gap-y-16">
        {/* Headline spans wide — image breaks right */}
        <div className="col-span-12 lg:col-span-7 lg:col-start-1">
          <FadeIn>
            <p className="section-eyebrow mb-5">The Problem</p>
            <Heading as="h2" size="xl" className="max-w-[14ch]">
              Advertising education is stuck in the past.
            </Heading>
          </FadeIn>
        </div>

        <div className="col-span-12 lg:col-span-5 lg:col-start-8 lg:-mt-24 relative z-10">
          <Reveal>
            <EditorialImage
              src={siteMedia.problem.education.src}
              alt={siteMedia.problem.education.alt}
              aspectRatio="portrait"
              sizes="(max-width: 768px) 100vw, 38vw"
              className="shadow-[0_24px_80px_-24px_rgba(12,12,12,0.25)]"
            />
          </Reveal>
        </div>

        {/* Staggered problem list — offset column */}
        <div className="col-span-12 lg:col-span-8 lg:col-start-2">
          <div className="grid gap-4 md:gap-5">
            {problems.map((problem, index) => (
              <FadeIn key={problem.title} delay={index * 0.08}>
                <article className="group grid grid-cols-[auto_1fr] gap-5 md:gap-8 border border-border bg-card p-6 md:p-8 transition-colors hover:border-foreground/15">
                  <span className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-muted-foreground/30 leading-none pt-1">
                    {problem.number}
                  </span>
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-semibold tracking-tight mb-3">
                      {problem.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed max-w-xl">
                      {problem.description}
                    </p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
