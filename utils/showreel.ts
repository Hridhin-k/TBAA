export function scrollToShowreel(): void {
  const section = document.getElementById("showreel");
  if (!section) return;
  section.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function watchShowreel(event?: { preventDefault?: () => void }): void {
  event?.preventDefault?.();
  scrollToShowreel();
}
