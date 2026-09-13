"use client";

import { LazyMotion, domAnimation } from "motion/react";

/**
 * Loads only the `domAnimation` feature set for below-the-fold sections that
 * render through `m.*` (see `Reveal`), instead of the full `motion` bundle
 * that the above-the-fold Hero needs. Not marked `strict` so it can nest
 * safely without crashing on unrelated `motion.*` usage elsewhere in the tree.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}
