import { FadeIn } from "@/components/motion/Motion";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

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
      <SectionHeader
        index="03"
        eyebrow="The Problem"
        title="Advertising education is stuck in the past."
        lead="The way advertising is taught has drifted far from how it is actually made. Four gaps keep talented people from breaking in."
      />

      {/* Symmetric 2×2 grid */}
      <div className="grid sm:grid-cols-2 gap-4 md:gap-5 max-w-5xl mx-auto">
        {problems.map((problem, index) => (
          <FadeIn key={problem.title} delay={index * 0.08}>
            <article className="group h-full grid grid-cols-[auto_1fr] gap-5 md:gap-6 border border-border bg-card p-6 md:p-8 rounded-2xl transition-colors hover:border-foreground/15">
              <span className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-muted-foreground/30 leading-none pt-1">
                {problem.number}
              </span>
              <div>
                <h3 className="font-display text-xl md:text-2xl font-semibold tracking-tight mb-3">
                  {problem.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
