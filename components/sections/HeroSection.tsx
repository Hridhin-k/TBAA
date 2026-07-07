"use client";

import { Button } from "@/components/ui/Button";
import { siteMedia } from "@/lib/data/media";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motion } from "framer-motion";
import Image from "next/image";
import { watchShowreel } from "@/utils/showreel";
import { ArrowRight, Play } from "lucide-react";

const headlineLines = ["The", "Better", "Academy"];

const meta = [
  { label: "Cohort", value: "Founding Batch" },
  { label: "Format", value: "Studio + Live Briefs" },
  { label: "Location", value: "Thrissur, India" },
];

const easeOut = [0.16, 1, 0.3, 1] as const;

const lineReveal = {
  hidden: { clipPath: "inset(100% 0 0 0)" as const },
  visible: (delay: number) => ({
    clipPath: "inset(0% 0 0 0)" as const,
    transition: { duration: 1.1, delay, ease: easeOut },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, delay, ease: easeOut },
  }),
};

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const motionProps = reducedMotion
    ? {}
    : { initial: "hidden" as const, animate: "visible" as const };

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative bg-cream overflow-hidden"
    >
      <div className="container-editorial flex flex-col lg:grid lg:grid-cols-12 lg:gap-x-8 lg:min-h-[100dvh]">
        {/* ——— Content column (dissolves into the flow on mobile) ——— */}
        <div className="contents lg:z-10 lg:col-span-5 xl:col-span-5 lg:flex lg:flex-col lg:justify-between lg:pt-32 lg:pb-12 lg:min-h-[100dvh]">
          <div className="contents lg:flex lg:flex-1 lg:flex-col lg:justify-center">
            {/* Headline block — first on mobile */}
            <div className="order-1 lg:order-none pt-24 sm:pt-28 lg:pt-0">
              <motion.div custom={0.05} variants={fadeUp} {...motionProps}>
                <div className="flex items-center gap-3 mb-5 sm:mb-7 lg:mb-9">
                  <span
                    className="relative flex h-2 w-2 shrink-0"
                    aria-hidden="true"
                  >
                    <span className="absolute inline-flex h-full w-full rounded-full bg-accent/50 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  <p className="section-eyebrow text-[0.625rem] sm:text-[0.6875rem]">
                    Applications open · First batch 2026
                  </p>
                </div>
              </motion.div>

              <h1 className="font-display font-semibold tracking-[-0.05em] leading-[0.9] sm:leading-[0.88]">
                {headlineLines.map((line, index) => (
                  <span key={line} className="block overflow-hidden">
                    {reducedMotion ? (
                      <span className="block text-[clamp(3rem,15vw,4rem)] sm:text-[clamp(3.5rem,6.5vw,5.25rem)] xl:text-[6rem]">
                        {line}
                      </span>
                    ) : (
                      <motion.span
                        custom={0.12 + index * 0.14}
                        variants={lineReveal}
                        {...motionProps}
                        className="block text-[clamp(3rem,15vw,4rem)] sm:text-[clamp(3.5rem,6.5vw,5.25rem)] xl:text-[6rem]"
                      >
                        {line}
                      </motion.span>
                    )}
                  </span>
                ))}
              </h1>
            </div>

            {/* Detail block — after the image on mobile */}
            <div className="order-3 lg:order-none mt-8 lg:mt-0">
              <motion.p
                custom={0.38}
                variants={fadeUp}
                {...motionProps}
                className="mt-6 lg:mt-8  text-base md:text-lg text-muted-foreground leading-relaxed max-w-[42ch] text-balance"
              >
                A premium advertising academy from{" "}
                <span className="text-foreground">The Better Agency</span>. Learn
                inside the rhythm of a real studio — and reserve your seat in the
                founding batch.
              </motion.p>

              <motion.div
                custom={0.48}
                variants={fadeUp}
                {...motionProps}
                className="mt-7 lg:mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
              >
                <Button
                  href="#register"
                  variant="primary"
                  size="lg"
                  magnetic
                  className="w-full sm:w-auto"
                >
                  Reserve Your Seat
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Button>
                <button
                  type="button"
                  onClick={() => watchShowreel()}
                  className="inline-flex items-center justify-center gap-3 text-sm font-medium tracking-wide text-foreground group"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-full border border-border group-hover:border-accent group-hover:text-accent transition-colors">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" aria-hidden="true" />
                  </span>
                  <span className="link-underline">Watch showreel</span>
                </button>
              </motion.div>

              {/* Meta — visible on all breakpoints */}
              <motion.div
                custom={0.56}
                variants={fadeUp}
                {...motionProps}
                className="mt-8 lg:mt-14 pt-6 lg:pt-8 border-t border-border grid grid-cols-3 gap-4 md:gap-6"
              >
                {meta.map((item) => (
                  <div key={item.label}>
                    <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1.5 md:mb-2">
                      {item.label}
                    </p>
                    <p className="text-xs md:text-sm font-medium text-foreground tracking-tight leading-snug">
                      {item.value}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Scroll cue — desktop only */}
          <motion.div
            custom={0.64}
            variants={fadeUp}
            {...motionProps}
            className="order-4 hidden lg:block lg:mt-8"
          >
            <a
              href="#showreel"
              className="inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.24em] text-muted-foreground hover:text-foreground transition-colors group"
              aria-label="Scroll to showreel section"
            >
              <span className="relative flex h-10 w-px bg-border overflow-hidden" aria-hidden="true">
                {!reducedMotion && (
                  <motion.span
                    className="absolute inset-x-0 top-0 h-1/2 bg-accent"
                    animate={{ y: ["0%", "200%"] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </span>
              Scroll to explore
            </a>
          </motion.div>
        </div>

        {/* ——— Visual column ——— */}
        <div className="order-2 lg:order-none lg:col-span-7 xl:col-span-7 relative mt-8 lg:mt-0 lg:min-h-[100dvh] flex flex-col items-center lg:items-stretch justify-center pb-8 lg:pb-0 lg:py-16">
          <div className="relative w-full mx-auto">
            <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto max-h-[58vh] sm:max-h-none lg:max-h-none lg:min-h-[80vh] xl:min-h-[85vh] overflow-hidden rounded-xl lg:rounded-2xl bg-mist">
              <Image
                src={siteMedia.hero.primary}
                alt={siteMedia.hero.alt}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center sm:object-[center_22%] transition-transform duration-[1.2s] ease-out lg:hover:scale-[1.02]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/5 to-transparent lg:bg-gradient-to-l lg:from-ink/25 lg:via-transparent lg:to-transparent"
                aria-hidden="true"
              />
            </div>
          </div>

        </div>
      </div>

      <div className="hairline" aria-hidden="true" />
    </section>
  );
}
