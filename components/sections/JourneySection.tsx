"use client";

import { FadeIn } from "@/components/motion/Motion";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { journeySteps } from "@/lib/data/content";
import { siteMedia } from "@/lib/data/media";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motion } from "framer-motion";

export function JourneySection() {
  const reducedMotion = useReducedMotion();

  return (
    <Section id="journey" ariaLabel="Student journey" background="white">
      <div className="editorial-grid gap-y-10 mb-10 md:mb-14">
        <div className="col-span-12 lg:col-span-6">
          <FadeIn>
            <p className="text-xs uppercase tracking-[0.25em] text-stone mb-4">
              Your Journey
            </p>
            <Heading as="h2" size="xl" className="max-w-3xl">
              From application to career — a path designed with intention.
            </Heading>
          </FadeIn>
        </div>
        <div className="col-span-12 lg:col-span-5 lg:col-start-8">
          <FadeIn delay={0.1}>
            <EditorialImage
              src={siteMedia.journey.process.src}
              alt={siteMedia.journey.process.alt}
              aspectRatio="landscape"
              sizes="(max-width: 768px) 100vw, 42vw"
            />
          </FadeIn>
        </div>
      </div>

      <div className="relative">
        <div
          className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-mist-dark"
          aria-hidden="true"
        />

        <ol className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-5" role="list">
          {journeySteps.map((step, index) => (
            <FadeIn key={step.id} delay={index * 0.1}>
              <li className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <motion.span
                    className={cn(
                      "flex items-center justify-center w-16 h-16 rounded-full border border-mist-dark",
                      "font-display text-lg font-semibold tracking-tight bg-white relative z-10"
                    )}
                    whileInView={
                      reducedMotion
                        ? undefined
                        : { scale: [0.9, 1], opacity: [0.5, 1] }
                    }
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.5 }}
                  >
                    {step.step}
                  </motion.span>
                </div>
                <h3 className="font-display text-xl font-semibold tracking-tight mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-stone leading-relaxed">{step.description}</p>
              </li>
            </FadeIn>
          ))}
        </ol>
      </div>
    </Section>
  );
}
