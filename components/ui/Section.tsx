import { cn } from "@/utils/cn";
import { Container } from "./Container";
import { SectionDecor } from "./SectionDecor";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  ariaLabel?: string;
  background?: "cream" | "white" | "ink";
  decorated?: boolean;
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
  decorated = true,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn("relative isolate section-padding", bgMap[background], className)}
    >
      {decorated && (
        <SectionDecor tone={background === "ink" ? "light" : "dark"} />
      )}
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
