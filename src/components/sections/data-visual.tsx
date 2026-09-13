"use client";

import { RoutingSpinePanel } from "@/components/mockups/data-v5-mock-5-c";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function DataVisual() {
  const reduced = usePrefersReducedMotion();
  return <RoutingSpinePanel reduced={reduced} />;
}
