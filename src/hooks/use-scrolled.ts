"use client";

import { useEffect, useLayoutEffect, useState } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * True once the document has been scrolled past `threshold` pixels.
 * Reads scroll position after hydration so a mid-page refresh still
 * lands in the compact header state.
 */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > threshold;
      setScrolled((prev) => (prev === next ? prev : next));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
