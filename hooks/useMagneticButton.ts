"use client";

import { useCallback, useRef } from "react";

type MagneticOptions = {
  strength?: number;
};

export function useMagneticButton({ strength = 0.35 }: MagneticOptions = {}) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const element = ref.current;
    if (!element) return;
    element.style.transform = "translate(0px, 0px)";
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
}
