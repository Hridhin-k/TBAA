"use client";

import { experienceOptions } from "@/lib/validation/registration";
import { cn } from "@/utils/cn";
import { Check } from "lucide-react";

type ExperiencePickerProps = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export function ExperiencePicker({ value, onChange, error }: ExperiencePickerProps) {
  return (
    <div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        role="radiogroup"
        aria-label="Experience level"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "experience-error" : undefined}
      >
        {experienceOptions.map((option) => {
          const selected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.value)}
              className={cn(
                "relative flex items-center justify-between gap-3 rounded-2xl p-5 text-left",
                "border transition-all duration-300",
                selected
                  ? "border-ink bg-ink text-white"
                  : "border-mist-dark bg-white hover:border-ink/40"
              )}
            >
              <span
                className={cn(
                  "font-display text-lg font-semibold tracking-tight",
                  selected ? "text-white" : "text-ink"
                )}
              >
                {option.label}
              </span>
              {selected && (
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white text-ink shrink-0">
                  <Check className="w-4 h-4" aria-hidden="true" />
                </span>
              )}
            </button>
          );
        })}
      </div>
      {error && (
        <p id="experience-error" className="mt-3 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
