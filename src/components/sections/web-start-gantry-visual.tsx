"use client";

import { StartGantryVisual } from "@/components/mockups/web-r2-mock-5";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function WebStartGantryVisual() {
  const reduced = usePrefersReducedMotion();
  return <StartGantryVisual reduced={reduced} />;
}
