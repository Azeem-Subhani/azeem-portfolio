"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

type RevealOptions = {
  delayMs?: number;
  translateY?: number;
  durationMs?: number;
  /** Skip animating elements that are already inside the viewport on mount. */
  onlyIfOutOfView?: boolean;
};

// Avoids a React warning when this hook runs during SSR.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Fades and slides an element in on mount, entirely through imperative DOM
 * styles applied after hydration. The server-rendered HTML never carries a
 * hidden starting style, so a visitor without JavaScript sees the element in
 * its final, visible state instead of a permanently invisible one.
 */
export function useReveal<T extends HTMLElement>({
  delayMs = 0,
  translateY = 20,
  durationMs = 600,
  onlyIfOutOfView = false,
}: RevealOptions = {}) {
  const ref = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (onlyIfOutOfView) {
      const rect = el.getBoundingClientRect();
      const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (alreadyVisible) return;
    }

    el.style.opacity = "0";
    el.style.transform = `translateY(${translateY}px)`;

    const reveal = () => {
      el.style.transition = `opacity ${durationMs}ms ease, transform ${durationMs}ms ease`;
      el.style.transitionDelay = `${delayMs}ms`;
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    };

    if (onlyIfOutOfView) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            reveal();
            observer.disconnect();
          }
        },
        { rootMargin: "-80px" },
      );
      observer.observe(el);
      return () => observer.disconnect();
    }

    const raf = requestAnimationFrame(reveal);
    return () => cancelAnimationFrame(raf);
  }, [delayMs, translateY, durationMs, onlyIfOutOfView]);

  return ref;
}
