"use client";

import * as React from "react";
import { cn } from "@/utils/cn";
import { Label } from "@/components/ui/shadcn/label";

type FloatingFieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
  large?: boolean;
};

export function FloatingField({
  id,
  label,
  error,
  hint,
  children,
  className,
  large,
}: FloatingFieldProps) {
  return (
    <div className={cn("relative space-y-1.5", className)}>
      <Label
        htmlFor={id}
        className={cn(
          "block text-[11px] uppercase tracking-[0.2em] text-muted-foreground",
          large && "sr-only"
        )}
      >
        {label}
      </Label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-sm text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
