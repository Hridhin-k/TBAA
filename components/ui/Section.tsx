import { cn } from "@/utils/cn";
import { Container } from "./Container";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  ariaLabel?: string;
  background?: "cream" | "white" | "ink";
};

const bgMap = {
  cream: "bg-cream",
  white: "bg-white",
  ink: "bg-ink text-white",
};

export function Section({
  id,
  children,
  className,
  containerClassName,
  ariaLabel,
  background = "cream",
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn("section-padding", bgMap[background], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
