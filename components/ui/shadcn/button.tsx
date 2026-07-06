import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border border-primary hover:bg-ink-soft shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]",
        secondary:
          "bg-transparent text-foreground border border-foreground hover:bg-foreground hover:text-primary-foreground",
        ghost:
          "bg-transparent text-foreground border border-transparent hover:border-border hover:bg-accent",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-accent",
        link: "text-foreground underline-offset-4 hover:underline border-0 bg-transparent p-0 h-auto",
      },
      size: {
        default: "h-11 px-7 text-sm tracking-wide",
        sm: "h-9 px-5 text-sm",
        lg: "h-14 px-9 text-base tracking-wide",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
