import { FadeIn } from "@/components/motion/Motion";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { mentors } from "@/lib/data/content";
import Image from "next/image";

export function MentorsSection() {
  return (
    <Section id="mentors" ariaLabel="Mentors" background="cream">
      <SectionHeader
        index="06"
        eyebrow="Mentors"
        title="Learn from people who still make the work."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-5 max-w-5xl mx-auto">
        {mentors.map((mentor, index) => (
          <FadeIn key={mentor.id} delay={index * 0.08} className="group">
            <article>
              <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-2xl bg-mist">
                <Image
                  src={mentor.image}
                  alt={`Portrait of ${mentor.name}, ${mentor.role}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                />
              </div>
              <p className="text-xs uppercase tracking-[0.15em] text-stone mb-2">
                {mentor.expertise}
              </p>
              <h3 className="font-display text-xl font-semibold tracking-tight">
                {mentor.name}
              </h3>
              <p className="text-sm text-stone mt-1 mb-4">{mentor.role}</p>
              <p className="text-sm text-stone leading-relaxed">{mentor.bio}</p>
            </article>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
