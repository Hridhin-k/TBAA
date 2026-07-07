"use client";

import { useEffect } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // Surface the error to the console; wire to a reporting service if needed.
    console.error(error);
  }, [error]);

  return (
    <main
      id="main-content"
      className="flex min-h-[100dvh] flex-col items-center justify-center bg-cream px-6 text-center"
    >
      <p className="section-eyebrow mb-6 text-accent">Something went wrong</p>
      <h1 className="font-display text-[clamp(2.25rem,7vw,4rem)] font-semibold tracking-[-0.03em] leading-[0.95] text-ink">
        An unexpected error occurred
      </h1>
      <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
        Please try again. If the problem persists, refresh the page or come back
        in a moment.
      </p>
      <button
        type="button"
        onClick={() => unstable_retry()}
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-ink-soft"
      >
        Try again
      </button>
    </main>
  );
}
