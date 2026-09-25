"use client";

import { StoreOfRecordVisual } from "@/components/mockups/data-v6-mock-1";
import { useInViewOnce } from "@/hooks/use-in-view-once";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function DataVisual() {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  return (
    <div ref={ref}>
      <StoreOfRecordVisual reduced={reduced} active={inView} />
    </div>
  );
}
