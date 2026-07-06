import { cn } from "@/utils/cn";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4";
  children: React.ReactNode;
  className?: string;
  size?: "display" | "xl" | "lg" | "md" | "sm";
  balance?: boolean;
};

const sizeMap = {
  display:
    "text-[clamp(3rem,8vw,7.5rem)] leading-[0.95] tracking-[-0.04em] font-semibold",
  xl: "text-[clamp(2.25rem,5vw,4.5rem)] leading-[1] tracking-[-0.03em] font-semibold",
  lg: "text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.05] tracking-[-0.025em] font-semibold",
  md: "text-[clamp(1.25rem,2vw,1.75rem)] leading-[1.15] tracking-[-0.02em] font-semibold",
  sm: "text-lg leading-snug tracking-[-0.01em] font-semibold",
};

export function Heading({
  as: Component = "h2",
  children,
  className,
  size = "lg",
  balance = true,
}: HeadingProps) {
  return (
    <Component
      className={cn(
        "font-display",
        sizeMap[size],
        balance && "text-balance",
        className
      )}
    >
      {children}
    </Component>
  );
}
