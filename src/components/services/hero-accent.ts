"use client";

import { useLayoutEffect, type RefObject } from "react";

/**
 * The accent line is split into words so each can rise, but the fill has to
 * read as one gradient. Measure the line and each word's offset so the
 * background stays continuous across the spans.
 */
export function useAccentLine(lineRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    let cancelled = false;
    const fit = () => {
      if (cancelled) return;
      line.style.setProperty("--line-w", `${line.getBoundingClientRect().width}px`);
      for (const word of line.querySelectorAll<HTMLElement>(".service-hero-word")) {
        word.style.setProperty("--word-x", `${word.offsetLeft}px`);
      }
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(line);
    void document.fonts?.ready.then(fit);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [lineRef]);
}
