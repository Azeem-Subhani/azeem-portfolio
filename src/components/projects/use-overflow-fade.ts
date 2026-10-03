"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const FADE = "1.5rem";

/**
 * Fades the clipped edge of a horizontal scroller so a cut-off chip reads as "more this way"
 * rather than a layout bug. CSS alone cannot tell whether a row overflows, so this measures
 * on resize and scroll and returns a mask only while there is hidden content on that side.
 */
export function useOverflowFade<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [edges, setEdges] = useState({ start: false, end: false });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const measure = () => {
      const max = node.scrollWidth - node.clientWidth;
      // 1px of slack: subpixel layout can leave scrollWidth a hair over clientWidth.
      const start = max > 1 && node.scrollLeft > 1;
      const end = max > 1 && node.scrollLeft < max - 1;
      setEdges((current) =>
        current.start === start && current.end === end ? current : { start, end },
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    node.addEventListener("scroll", measure, { passive: true });
    return () => {
      observer.disconnect();
      node.removeEventListener("scroll", measure);
    };
  }, []);

  let style: CSSProperties | undefined;
  if (edges.start || edges.end) {
    const from = edges.start ? `transparent, #000 ${FADE}` : "#000, #000";
    const to = edges.end ? `#000 calc(100% - ${FADE}), transparent` : "#000";
    const mask = `linear-gradient(to right, ${from}, ${to})`;
    style = { maskImage: mask, WebkitMaskImage: mask };
  }

  return { ref, style };
}
