import { FadeIn } from "@/components/motion/Motion";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { mentors } from "@/lib/data/content";
import Image from "next/image";

export function MentorsSection() {
  return (
    <Section id="mentors" ariaLabel="Mentors" background="cream">
      <FadeIn>
        <p className="text-xs uppercase tracking-[0.25em] text-stone mb-4">
          Mentors
        </p>
        <Heading as="h2" size="xl" className="max-w-3xl mb-10 md:mb-14">
          Learn from people who still make the work.
        </Heading>
      </FadeIn>

      <div className="editorial-grid gap-y-10 md:gap-y-0">
        {mentors.map((mentor, index) => (
          <FadeIn
            key={mentor.id}
            delay={index * 0.08}
            className="col-span-12 md:col-span-6 lg:col-span-3 group"
          >
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
