"use client";

import { useEffect, useLayoutEffect, useState } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * True once the document has been scrolled past `threshold` pixels.
 * Reads scroll position after hydration so a mid-page refresh still
 * lands in the compact header state.
 *
 * The state only releases below `releaseAt`, so hovering around the
 * threshold does not flip it (and restart the header transition) on every
 * scroll event.
 */
export function useScrolled(threshold = 24, releaseAt = threshold / 3) {
  const [scrolled, setScrolled] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled((prev) => (prev ? y > releaseAt : y > threshold));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, releaseAt]);

  return scrolled;
}
