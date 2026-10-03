"use client";

import { useEffect, useState } from "react";

/** The reading line sits 40% down the viewport; a chapter is current while it spans that line. */
const READING_LINE_PCT = 40;

/**
 * Scroll-spy for the "On this page" bars. Each id belongs to a chapter h2; the
 * enclosing <section> is what gets tracked, since the heading alone is too short
 * to hold the line. Returns the current chapter id, or null above the first
 * chapter and below the last.
 */
export function useActiveChapter(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(" ");

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const chapters = key
      .split(" ")
      .map((id) => ({ id, section: document.getElementById(id)?.closest("section") }))
      .filter((entry): entry is { id: string; section: HTMLElement } => Boolean(entry.section));
    if (chapters.length === 0) return;

    // The observer only says when a section crosses the line; read the rects then
    // to pick the one under it, so a fast scroll past several chapters still lands right.
    const update = () => {
      const line = (window.innerHeight * READING_LINE_PCT) / 100;
      const current = chapters.find(({ section }) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= line && rect.bottom > line;
      });
      setActive(current?.id ?? null);
    };

    // A thin band at the reading line. The observer also fires once on observe,
    // which sets the initial chapter.
    const observer = new IntersectionObserver(update, {
      rootMargin: `-${READING_LINE_PCT}% 0px -${99 - READING_LINE_PCT}% 0px`,
    });
    chapters.forEach(({ section }) => observer.observe(section));

    return () => observer.disconnect();
  }, [key]);

  return active;
}
