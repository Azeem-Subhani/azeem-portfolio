"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Turns true once the element is within `margin` of the viewport and stays
 * true. Lets expensive below-the-fold work (geometry sampling, entrance
 * animation) wait until the visitor is about to see it. Without
 * IntersectionObserver the work runs straight away rather than never.
 */
export function useNearViewport<T extends HTMLElement = HTMLDivElement>(margin = "400px") {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      // Deferred a frame so state is not set synchronously in the effect body.
      const frame = requestAnimationFrame(() => setNear(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: `${margin} 0px` },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  return { ref, near };
}
