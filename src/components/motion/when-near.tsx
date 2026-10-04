"use client";

import type { ReactNode } from "react";

import { useNearViewport } from "@/hooks/use-near-viewport";

/**
 * Holds off mounting `children` until the placeholder is near the viewport.
 * Pair with `next/dynamic` so the chunk is not requested on first paint.
 */
export function WhenNear({
  children,
  minHeight = "24rem",
  margin = "600px",
  className,
}: {
  children: ReactNode;
  minHeight?: string;
  margin?: string;
  className?: string;
}) {
  const { ref, near } = useNearViewport<HTMLDivElement>(margin);

  return (
    <div ref={ref} className={className} style={near ? undefined : { minHeight }}>
      {near ? children : null}
    </div>
  );
}
