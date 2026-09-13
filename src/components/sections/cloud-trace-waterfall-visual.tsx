"use client";

import { TraceWaterfallVisual } from "@/components/mockups/cloud-v4-mock-4";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function CloudTraceWaterfallVisual() {
  const reduced = usePrefersReducedMotion();
  return <TraceWaterfallVisual reduced={reduced} />;
}
