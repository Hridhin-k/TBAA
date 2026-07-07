"use client";

import { FadeIn } from "@/components/motion/Motion";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { journeySteps } from "@/lib/data/content";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motion } from "framer-motion";

export function JourneySection() {
  const reducedMotion = useReducedMotion();

  return (
    <Section id="journey" ariaLabel="Student journey" background="white">
      <SectionHeader
        index="08"
        eyebrow="Your Journey"
        title="From application to career — a path designed with intention."
      />

      <div className="relative">
        <div
          className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-mist-dark"
          aria-hidden="true"
        />

        <ol className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-5" role="list">
          {journeySteps.map((step, index) => (
            <FadeIn key={step.id} delay={index * 0.1}>
              <li className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                <motion.span
                  className={cn(
                    "flex items-center justify-center w-16 h-16 rounded-full border border-mist-dark mb-6",
                    "font-display text-lg font-semibold tracking-tight bg-white relative z-10"
                  )}
                  whileInView={
                    reducedMotion ? undefined : { scale: [0.9, 1], opacity: [0.5, 1] }
                  }
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                >
                  {step.step}
                </motion.span>
                <h3 className="font-display text-xl font-semibold tracking-tight mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-stone leading-relaxed max-w-[28ch]">
                  {step.description}
                </p>
              </li>
            </FadeIn>
          ))}
        </ol>
      </div>
    </Section>
  );
}
