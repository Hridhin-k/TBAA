import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex min-h-[100dvh] flex-col items-center justify-center bg-cream px-6 text-center"
    >
      <p className="section-eyebrow mb-6 text-accent">Error 404</p>
      <h1 className="font-display text-[clamp(2.5rem,8vw,4.5rem)] font-semibold tracking-[-0.03em] leading-[0.95] text-ink">
        Page not found
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
        The page you are looking for may have moved, or it never existed. Let&apos;s
        get you back to the academy.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-ink-soft"
      >
        Return home
      </Link>
    </main>
  );
}
