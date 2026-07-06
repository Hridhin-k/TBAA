"use client";

import { useScrolled } from "@/hooks/useScrolled";
import { siteConfig } from "@/lib/config";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function Navigation() {
  const scrolled = useScrolled(60);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-cream/90 backdrop-blur-md border-b border-mist-dark"
          : "bg-cream/0"
      )}
    >
      <nav
        className="container-editorial flex items-center justify-between h-16"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-ink"
          aria-label={`${siteConfig.name} home`}
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
          <Button href="#apply" variant="primary" size="sm" magnetic>
            Apply Now
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={cn(
              "block w-6 h-px bg-ink transition-transform duration-300",
              menuOpen && "translate-y-[3.5px] rotate-45"
            )}
          />
          <span
            className={cn(
              "block w-6 h-px bg-ink transition-opacity duration-300",
              menuOpen && "opacity-0"
            )}
          />
          <span
            className={cn(
              "block w-6 h-px bg-ink transition-transform duration-300",
              menuOpen && "-translate-y-[3.5px] -rotate-45"
            )}
          />
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-500 bg-cream border-b border-mist-dark",
          menuOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <ul className="container-editorial py-8 flex flex-col gap-6" role="list">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-2xl font-display font-semibold tracking-tight"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-4">
            <Button href="#apply" variant="primary" size="lg" onClick={() => setMenuOpen(false)}>
              Apply Now
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
