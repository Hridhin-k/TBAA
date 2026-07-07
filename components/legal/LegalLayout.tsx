import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/config";

type LegalLayoutProps = {
  title: string;
  intro: string;
  updated: string;
  children: React.ReactNode;
};

export function LegalLayout({ title, intro, updated, children }: LegalLayoutProps) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-mist-dark bg-cream/90 backdrop-blur-md">
        <div className="container-editorial flex h-16 items-center justify-between">
          <Link
            href="/"
            className="font-display text-lg font-semibold tracking-tight text-ink"
            aria-label={`${siteConfig.name} home`}
          >
            Better<span className="text-stone">.</span>Academy
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm tracking-wide text-stone transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to home
          </Link>
        </div>
      </header>

      <main id="main-content" className="bg-cream">
        <article className="container-editorial max-w-3xl py-16 md:py-24">
          <p className="section-eyebrow mb-5 text-accent">Legal</p>
          <h1 className="font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone">
            {intro}
          </p>
          <p className="mt-4 text-sm text-stone-light">Last updated: {updated}</p>

          <div className="legal-prose mt-12">{children}</div>
        </article>
      </main>

      <Footer />
    </>
  );
}
