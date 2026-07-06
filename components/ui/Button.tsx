"use client";

import Link from "next/link";
import { Button as ShadcnButton, buttonVariants } from "@/components/ui/shadcn/button";
import { useMagneticButton } from "@/hooks/useMagneticButton";
import { cn } from "@/utils/cn";

type ButtonBaseProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
  disabled?: boolean;
};

type ButtonAsButton = ButtonBaseProps & {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  type?: never;
  onClick?: () => void;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantMap = {
  primary: "default",
  secondary: "secondary",
  ghost: "ghost",
} as const;

const sizeMap = {
  sm: "sm",
  md: "default",
  lg: "lg",
} as const;

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  magnetic = false,
  disabled,
  ...props
}: ButtonProps) {
  const magneticProps = useMagneticButton({ strength: 0.25 });
  const classes = cn(
    magnetic && "will-change-transform",
    className
  );

  if ("href" in props && props.href) {
    return (
      <Link
        href={props.href}
        className={cn(
          buttonVariants({
            variant: variantMap[variant],
            size: sizeMap[size],
          }),
          classes
        )}
        onClick={props.onClick}
        ref={magnetic ? (magneticProps.ref as React.Ref<HTMLAnchorElement>) : undefined}
        onMouseMove={magnetic ? magneticProps.handleMouseMove : undefined}
        onMouseLeave={magnetic ? magneticProps.handleMouseLeave : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <ShadcnButton
      type={props.type ?? "button"}
      variant={variantMap[variant]}
      size={sizeMap[size]}
      className={classes}
      disabled={disabled}
      onClick={props.onClick}
      ref={magnetic ? (magneticProps.ref as React.Ref<HTMLButtonElement>) : undefined}
      onMouseMove={magnetic ? magneticProps.handleMouseMove : undefined}
      onMouseLeave={magnetic ? magneticProps.handleMouseLeave : undefined}
    >
      {children}
    </ShadcnButton>
  );
}
