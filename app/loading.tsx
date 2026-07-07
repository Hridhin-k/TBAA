export default function Loading() {
  return (
    <div
      className="flex min-h-[100dvh] items-center justify-center bg-cream"
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Loading…</span>
      <span
        className="h-8 w-8 animate-spin rounded-full border-2 border-mist-dark border-t-accent"
        aria-hidden="true"
      />
    </div>
  );
}
