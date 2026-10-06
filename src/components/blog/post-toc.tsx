"use client";

import { useEffect, useState } from "react";

import type { PostHeading } from "@/lib/blog-source";
import { cn } from "@/lib/utils";

// The reading line sits 30% down the viewport. The current heading is the last
// one above it. Unlike the services TOC (toc-spy.ts), MDX output has no
// <section> per chapter, so this tracks the h2s themselves.
const READING_LINE_PCT = 30;

export function PostToc({ headings }: { headings: PostHeading[] }) {
  const [active, setActive] = useState<string | null>(null);
  const key = headings.map((h) => h.id).join(" ");

  useEffect(() => {
    const els = key
      .split(" ")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (els.length === 0) return;

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const line = (window.innerHeight * READING_LINE_PCT) / 100;
        const passed = els.filter((el) => el.getBoundingClientRect().top <= line);
        setActive(passed.at(-1)?.id ?? null);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
    };
  }, [key]);

  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="font-medium">On this page</p>
      <ol className="mt-4 space-y-2.5 border-l border-border">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              aria-current={active === heading.id ? "location" : undefined}
              className={cn(
                "-ml-px block border-l py-0.5 pl-4 leading-snug transition-colors",
                active === heading.id
                  ? "border-accent text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
