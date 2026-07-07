"use client";

import { FadeIn } from "@/components/motion/Motion";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { launchPhases } from "@/lib/data/launch";
import { cn } from "@/utils/cn";

export function LaunchTimelineSection() {
  return (
    <Section id="timeline" ariaLabel="Launch timeline" background="white">
      <SectionHeader
        index="03"
        eyebrow="Launch Timeline"
        title="The road to the founding batch."
      />

      <div className="max-w-5xl mx-auto">
        <div className="relative">
          {/* Connecting line — desktop */}
          <div
            className="hidden md:block absolute top-[7px] left-0 right-0 h-px bg-mist-dark"
            aria-hidden="true"
          />

          <ol className="grid gap-10 md:grid-cols-3 md:gap-8" role="list">
            {launchPhases.map((phase, index) => {
              const isOpen = phase.status === "open";
              return (
                <FadeIn key={phase.step} delay={index * 0.12}>
                  <li className="relative md:pr-8">
                    {/* Marker */}
                    <span
                      className={cn(
                        "relative z-10 flex h-3.5 w-3.5 items-center justify-center",
                        "mb-6"
                      )}
                      aria-hidden="true"
                    >
                      {isOpen && (
                        <span className="absolute inline-flex h-full w-full rounded-full bg-accent/40 animate-ping" />
                      )}
                      <span
                        className={cn(
                          "relative inline-flex h-3.5 w-3.5 rounded-full ring-4 ring-white",
                          isOpen ? "bg-accent" : "border border-mist-dark bg-cream"
                        )}
                      />
                    </span>

                    <p
                      className={cn(
                        "text-[10px] uppercase tracking-[0.22em] mb-3",
                        isOpen ? "text-accent" : "text-muted-foreground"
                      )}
                    >
                      {phase.window}
                    </p>
                    <h3 className="font-display text-xl md:text-2xl font-semibold tracking-tight mb-3">
                      {phase.label}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-[32ch]">
                      {phase.description}
                    </p>
                  </li>
                </FadeIn>
              );
            })}
          </ol>
        </div>
      </div>
    </Section>
  );
}
