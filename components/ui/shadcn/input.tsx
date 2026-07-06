import * as React from "react";
import { cn } from "@/utils/cn";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-none border-0 border-b border-input bg-transparent px-0 py-2 text-base text-foreground transition-colors",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:border-foreground",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "aria-invalid:border-destructive",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
