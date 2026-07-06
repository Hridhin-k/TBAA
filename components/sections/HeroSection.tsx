"use client";

import { Button } from "@/components/ui/Button";
import { siteMedia } from "@/lib/data/media";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { motion } from "framer-motion";
import Image from "next/image";
import { watchShowreel } from "@/utils/showreel";
import { ArrowRight } from "lucide-react";

const headlineLines = ["The Better", "Academy"];

const stats = [
  { label: "Duration", value: "6 Months" },
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
      {/* Editorial index mark */}
      <div
        className="hidden xl:block absolute top-28 right-[clamp(1.25rem,3vw,2.5rem)] font-display text-[11px] tracking-[0.3em] text-stone/50"
        aria-hidden="true"
      >
        01
      </div>

      <div className="container-editorial min-h-[100dvh] grid lg:grid-cols-12 lg:gap-x-8">
        {/* ——— Content column ——— */}
        <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between pt-28 pb-8 lg:pt-32 lg:pb-12 lg:min-h-[100dvh] z-10">
          <div className="flex-1 flex flex-col justify-center">
            <motion.div custom={0.05} variants={fadeUp} {...motionProps}>
              <div className="flex items-center gap-3 mb-7 lg:mb-9">
                <span className="w-10 h-px bg-ink shrink-0" aria-hidden="true" />
                <p className="section-eyebrow">The Better Agency presents</p>
              </div>
            </motion.div>

            <h1 className="font-display font-semibold tracking-[-0.05em] leading-[0.88]">
              {headlineLines.map((line, index) => (
                <span key={line} className="block overflow-hidden">
                  {reducedMotion ? (
                    <span className="block text-[clamp(3rem,10vw,6.5rem)] xl:text-[7rem]">
                      {line}
                    </span>
                  ) : (
                    <motion.span
                      custom={0.12 + index * 0.14}
                      variants={lineReveal}
                      {...motionProps}
                      className="block text-[clamp(3rem,10vw,6.5rem)] xl:text-[7rem]"
                    >
                      {line}
                    </motion.span>
                  )}
                </span>
              ))}
            </h1>

            <motion.p
              custom={0.38}
              variants={fadeUp}
              {...motionProps}
              className="mt-6 lg:mt-8 text-base md:text-lg text-muted-foreground leading-relaxed max-w-[36ch] text-balance"
            >
              A premium advertising academy for creatives who want to learn inside
              the rhythm of a real agency — not a classroom.
            </motion.p>

            <motion.div
              custom={0.48}
              variants={fadeUp}
              {...motionProps}
              className="mt-8 lg:mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
            >
              <Button href="#apply" variant="primary" size="lg" magnetic>
                Apply for Admission
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>
              <button
                type="button"
                onClick={() => watchShowreel()}
                className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-foreground group"
              >
                <span className="link-underline">Watch showreel</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            </motion.div>

            {/* Stats — visible on all breakpoints */}
            <motion.div
              custom={0.56}
              variants={fadeUp}
              {...motionProps}
              className="mt-10 lg:mt-14 pt-8 border-t border-border grid grid-cols-3 gap-4 md:gap-6"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1.5 md:mb-2">
                    {stat.label}
                  </p>
                  <p className="text-xs md:text-sm font-medium text-foreground tracking-tight leading-snug">
                    {stat.value}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div custom={0.64} variants={fadeUp} {...motionProps} className="mt-10 lg:mt-8">
            <a
              href="#about"
              className="inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.24em] text-muted-foreground hover:text-foreground transition-colors group"
              aria-label="Scroll to about section"
            >
              <span className="relative flex h-10 w-px bg-border overflow-hidden" aria-hidden="true">
                {!reducedMotion && (
                  <motion.span
                    className="absolute inset-x-0 top-0 h-1/2 bg-foreground"
                    animate={{ y: ["0%", "200%"] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </span>
              Scroll to explore
            </a>
          </motion.div>
        </div>

        {/* ——— Visual column — broken grid, overlapping caption ——— */}
        <div className="lg:col-span-7 xl:col-span-7 relative lg:min-h-[100dvh] flex flex-col justify-center pb-8 lg:pb-0 lg:py-16">
          <div className="relative w-full">
            {/* Main image frame — inset on desktop for editorial breathing room */}
            <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto lg:min-h-[72vh] xl:min-h-[78vh] overflow-hidden rounded-2xl lg:rounded-3xl bg-mist">
              <Image
                src={siteMedia.hero.primary}
                alt={siteMedia.hero.alt}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-[center_22%] transition-transform duration-[1.2s] ease-out lg:hover:scale-[1.02]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/5 to-transparent lg:bg-gradient-to-l lg:from-ink/30 lg:via-transparent lg:to-transparent"
                aria-hidden="true"
              />
            </div>

            {/* Floating caption card — overlaps content boundary on desktop */}
            <motion.div
              custom={0.5}
              variants={fadeUp}
              {...motionProps}
              className="absolute -bottom-6 left-4 right-4 sm:left-6 sm:right-6 lg:-left-12 lg:bottom-10 lg:right-auto lg:max-w-[280px] border border-border bg-card/95 backdrop-blur-sm p-5 md:p-6 shadow-[0_20px_60px_-20px_rgba(12,12,12,0.2)]"
            >
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-2">
                Featured Work
              </p>
              <p className="font-display text-lg md:text-xl font-semibold tracking-tight leading-snug">
                Campaigns that set the standard
              </p>
              <span
                className="mt-4 inline-flex items-center justify-center w-9 h-9 rounded-full border border-border text-[10px] font-medium tracking-wider"
                aria-hidden="true"
              >
                01
              </span>
            </motion.div>
          </div>

          {/* Sector tags — desktop only, under image */}
          <motion.div
            custom={0.58}
            variants={fadeUp}
            {...motionProps}
            className="hidden lg:flex flex-wrap gap-2 mt-14 lg:pl-2"
          >
            <p className="w-full text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">
              Industries we train for
            </p>
            {["Hospitality", "F&B", "Fashion", "Fitness", "D2C Brands"].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-border bg-white px-3.5 py-1.5 text-[11px] tracking-wide text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="hairline" aria-hidden="true" />
    </section>
  );
}
