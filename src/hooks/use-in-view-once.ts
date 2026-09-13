"use client";

import { useEffect, useRef, useState } from "react";

import { revealTargetPx } from "@/lib/reveal-visibility";

/**
 * Fires once the element is genuinely on screen — not merely peeking past the
 * bottom edge. Drives entrance choreography for the mockup visuals so their
 * lower half doesn't animate while the visitor is still two sections away.
 */
export function useInViewOnce<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let observer: IntersectionObserver | null = null;

    const isReady = () => {
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const target = revealTargetPx(rect.height, viewportHeight);
      const visible = Math.max(
        0,
        Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0),
      );

      return visible + 1 >= target;
    };

    const markInView = () => {
      setInView(true);
      observer?.disconnect();
      observer = null;
    };

    // Runs from a frame callback so the reduced-motion and already-visible
    // paths don't set state synchronously inside the effect body.
    const frame = requestAnimationFrame(() => {
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        typeof IntersectionObserver === "undefined"
      ) {
        markInView();
        return;
      }

      if (isReady()) {
        markInView();
        return;
      }

      observer = new IntersectionObserver(
        () => {
          if (isReady()) markInView();
        },
        {
          // Fine-grained steps so a tall element still reports progress while
          // scrolling in, even though it can never reach a 1.0 ratio.
          threshold: Array.from({ length: 40 }, (_, index) => index / 40),
          rootMargin: "0px 0px -6% 0px",
        },
      );

      observer.observe(el);
    });

    const onResize = () => {
      if (isReady()) markInView();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return { ref, inView };
}
