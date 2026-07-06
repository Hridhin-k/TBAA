"use client";

import { motion, type Variants } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/utils/cn";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
};

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.8,
  direction = "up",
  once = true,
}: FadeInProps) {
  const reducedMotion = useReducedMotion();

  const offsets = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  };

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

type TextStaggerProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
};

export function TextStagger({
  text,
  className,
  as: Component = "span",
  delay = 0,
}: TextStaggerProps) {
  const reducedMotion = useReducedMotion();
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: delay },
    },
  };

  const child: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  if (reducedMotion) {
    return <Component className={className}>{text}</Component>;
  }

  return (
    <Component className={cn("inline", className)} aria-label={text}>
      <motion.span
        className="inline-flex flex-wrap"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {words.map((word, i) => (
          <motion.span key={`${word}-${i}`} className="inline-block mr-[0.25em]" variants={child}>
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}

type RevealProps = {
  children: React.ReactNode;
  className?: string;
};

export function Reveal({ children, className }: RevealProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
