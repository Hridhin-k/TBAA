"use client";

import { useScrolled } from "@/hooks/useScrolled";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { siteConfig } from "@/lib/config";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const ease = [0.16, 1, 0.3, 1] as const;

const overlayVariants: Variants = {
  hidden: { x: "-100%" },
  visible: {
    x: 0,
    transition: { duration: 0.5, ease, when: "beforeChildren", staggerChildren: 0.07, delayChildren: 0.18 },
  },
  exit: {
    x: "-100%",
    transition: { duration: 0.4, ease, when: "afterChildren", staggerChildren: 0.03, staggerDirection: -1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
  exit: { opacity: 0, y: 14, transition: { duration: 0.2, ease } },
};

export function Navigation() {
  const scrolled = useScrolled(60);
  const reducedMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        menuOpen
          ? "bg-cream"
          : scrolled
            ? "bg-cream/90 backdrop-blur-md border-b border-mist-dark"
            : "bg-cream/0"
      )}
    >
      <nav
        className="container-editorial flex items-center justify-between h-16"
        aria-label="Main navigation"
      >
        <Link
          href="/#hero"
          onClick={closeMenu}
          className="relative z-50 font-display text-lg font-semibold tracking-tight text-ink"
          aria-label={`${siteConfig.name} — scroll to top`}
        >
          Better<span className="text-stone">.</span>Academy
        </Link>

        <ul className="hidden lg:flex items-center gap-10" role="list">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm tracking-wide text-stone hover:text-ink transition-colors link-underline"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button href="#register" variant="primary" size="sm" magnetic>
            Reserve Your Seat
          </Button>
        </div>

        <button
          type="button"
          className="relative z-50 lg:hidden -mr-2 flex h-10 w-10 flex-col items-center justify-center gap-[5px] p-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={cn(
              "block h-px w-6 bg-ink transition-transform duration-300 ease-out",
              menuOpen && "translate-y-[6px] rotate-45"
            )}
          />
          <span
            className={cn(
              "block h-px w-6 bg-ink transition-all duration-300 ease-out",
              menuOpen && "opacity-0"
            )}
          />
          <span
            className={cn(
              "block h-px w-6 bg-ink transition-transform duration-300 ease-out",
              menuOpen && "-translate-y-[6px] -rotate-45"
            )}
          />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            variants={reducedMotion ? undefined : overlayVariants}
            initial={reducedMotion ? { opacity: 1 } : "hidden"}
            animate={reducedMotion ? { opacity: 1 } : "visible"}
            exit={reducedMotion ? { opacity: 0 } : "exit"}
            className="fixed inset-0 top-0 z-40 h-[100dvh] overflow-y-auto bg-cream will-change-transform lg:hidden"
          >
            <div className="container-editorial flex min-h-[100dvh] flex-col pt-24 pb-10">
              <motion.div
                variants={reducedMotion ? undefined : itemVariants}
                className="mb-8 flex items-center gap-3"
              >
                <span className="h-px w-8 bg-accent" aria-hidden="true" />
                <span className="section-eyebrow text-accent">Navigation</span>
              </motion.div>

              <ul className="flex flex-col" role="list">
                {siteConfig.nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    variants={reducedMotion ? undefined : itemVariants}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className="group flex items-center gap-5 border-t border-mist-dark py-5"
                    >
                      <span className="font-display text-xs font-medium text-accent tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-[clamp(1.5rem,7vw,2.25rem)] font-semibold leading-none tracking-tight text-ink transition-transform duration-300 ease-out group-hover:translate-x-1.5">
                        {item.label}
                      </span>
                      <ArrowRight
                        className="ml-auto h-6 w-6 -translate-x-2 text-stone opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                variants={reducedMotion ? undefined : itemVariants}
                className="mt-auto border-t border-mist-dark pt-8"
              >
                <Button
                  href="#register"
                  variant="primary"
                  size="lg"
                  onClick={closeMenu}
                  className="w-full gap-2"
                >
                  Reserve Your Seat
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-sm">
                  <a
                    href={`mailto:${siteConfig.organization.email}`}
                    className="text-stone transition-colors hover:text-ink"
                  >
                    {siteConfig.organization.email}
                  </a>
                  <div className="flex items-center gap-5">
                    <a
                      href={siteConfig.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone transition-colors hover:text-ink"
                    >
                      Instagram
                    </a>
                    <a
                      href={siteConfig.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone transition-colors hover:text-ink"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
