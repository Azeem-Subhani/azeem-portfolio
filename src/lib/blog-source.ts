import { readFileSync } from "node:fs";
import path from "node:path";

import { slugify } from "@/lib/slug";

// Server-only helpers (node:fs) that read a post's raw MDX. Import them from server
// components only; they stay out of src/content/blog.ts, which reaches client
// bundles through the nav.

const WORDS_PER_MINUTE = 230;

export type PostHeading = { id: string; text: string };

export function readPostSource(slug: string) {
  return readFileSync(path.join(process.cwd(), "src/content/blog", `${slug}.mdx`), "utf8");
}

// Drops fenced code, MDX comments, and JSX tags so they don't count as prose.
function proseOf(source: string) {
  return source
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, " ")
    .replace(/<[^>]+>/g, " ");
}

// Code still takes reading time, so count it at a third of prose speed.
export function readingMinutes(source: string) {
  const words = (text: string) => text.split(/\s+/).filter(Boolean).length;
  const codeWords = (source.match(/```[\s\S]*?```/g) ?? []).reduce((n, block) => n + words(block), 0);
  return Math.max(1, Math.round((words(proseOf(source)) + codeWords / 3) / WORDS_PER_MINUTE));
}

// Strips inline Markdown so the text matches what the h2 renderer sees.
export function headingText(markdown: string) {
  return markdown
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`*_]/g, "")
    .trim();
}

export function extractHeadings(source: string): PostHeading[] {
  const withoutCode = source.replace(/```[\s\S]*?```/g, "");
  return [...withoutCode.matchAll(/^## (.+)$/gm)].map(([, raw]) => {
    const text = headingText(raw);
    return { id: slugify(text), text };
  });
}
