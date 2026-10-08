"use client";

import { ArrowRight, CalendarDays, Clock, Search, Tag, X } from "lucide-react";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";

import { useBlogCardReveal } from "@/components/blog/blog-card-motion";
import { PostCover } from "@/components/blog/post-cover";
import { blogPath, formatPostDate, type BlogPost } from "@/content/blog";
import { cn } from "@/lib/utils";

// The blog index: a sidebar (search and topic filters) beside a grid of post cards.
// Filtering runs in the browser over the already-rendered list, so every card is in the
// server HTML for crawlers and the page works as a plain list without JavaScript.

export type BrowserPost = BlogPost & { minutes: number };

// Topics shown before "Show all"; the rest are one click away.
const COLLAPSED_TOPICS = 8;

function matches(post: BrowserPost, query: string) {
  if (!query) return true;
  const haystack = `${post.title} ${post.description} ${post.tags.join(" ")}`.toLowerCase();
  // Every word must appear somewhere, so "postgres lock" finds the migration post.
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

export function BlogBrowser({ posts }: { posts: BrowserPost[] }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<string | null>(null);
  const [showAllTopics, setShowAllTopics] = useState(false);

  // Topics ordered by how many posts use them, so the collapsed list shows the biggest ones.
  const topics = useMemo(() => {
    const counts = new Map<string, number>();
    for (const post of posts) for (const tag of post.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
    return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([name, count]) => ({ name, count }));
  }, [posts]);

  const collapsed = showAllTopics ? topics : topics.slice(0, COLLAPSED_TOPICS);
  // Keep the active topic visible even when it sits past the collapse point.
  const activeHidden = topic && !collapsed.some((t) => t.name === topic) ? topics.filter((t) => t.name === topic) : [];
  const visibleTopics = [...collapsed, ...activeHidden];

  const filtered = posts.filter((post) => (!topic || post.tags.includes(topic)) && matches(post, query.trim()));
  const filtering = Boolean(topic || query.trim());
  const resultsRef = useRef<HTMLDivElement>(null);
  useBlogCardReveal(resultsRef, filtered.map((post) => post.slug).join("|"));

  return (
    <div className="mt-12 grid gap-10 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-12">
      <aside data-blog-aside className="lg:sticky lg:top-28 lg:self-start" aria-label="Filter posts">
        <label htmlFor="blog-search" className="text-sm font-medium text-foreground">
          Search
        </label>
        <div className="relative mt-3">
          <Search aria-hidden className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles"
            autoComplete="off"
            className="h-11 w-full rounded-lg border border-border bg-foreground/[0.03] pl-10 pr-4 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          />
        </div>

        <h2 className="mt-9 text-sm font-medium text-foreground">Topics</h2>
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Topics">
          <TopicChip active={!topic} onClick={() => setTopic(null)}>
            All
          </TopicChip>
          {visibleTopics.map((t) => (
            <TopicChip key={t.name} active={topic === t.name} onClick={() => setTopic(topic === t.name ? null : t.name)}>
              {t.name}
              <span className="ml-1.5 text-xs opacity-70">{t.count}</span>
            </TopicChip>
          ))}
          {topics.length > COLLAPSED_TOPICS ? (
            <button
              type="button"
              onClick={() => setShowAllTopics((open) => !open)}
              aria-expanded={showAllTopics}
              className="rounded-full border border-accent/60 px-3.5 py-1.5 text-sm text-accent-readable transition-colors hover:bg-accent/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {showAllTopics ? "Show fewer" : "Show all"}
            </button>
          ) : null}
        </div>
      </aside>

      <div ref={resultsRef}>
        <div data-blog-toolbar className="flex min-h-8 items-center justify-between gap-4">
          {/* Announced to screen readers as the filters change. */}
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {filtering
              ? `${filtered.length} of ${posts.length} ${posts.length === 1 ? "post" : "posts"}`
              : `${posts.length} ${posts.length === 1 ? "post" : "posts"}`}
          </p>
          {filtering ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setTopic(null);
              }}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              <X aria-hidden className="size-3.5" />
              Clear filters
            </button>
          ) : null}
        </div>

        {filtered.length === 0 ? (
          <p data-blog-empty className="mt-6 rounded-2xl border border-dashed border-border px-6 py-14 text-center text-muted-foreground">
            No posts match. Try another word or topic.
          </p>
        ) : (
          <ol className="mt-4 grid gap-6 md:grid-cols-2">
            {filtered.map((post) => (
              <li key={post.slug} data-blog-card data-slug={post.slug}>
                <PostCard post={post} activeTopic={topic} />
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

function TopicChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        active
          ? "border-accent bg-accent text-accent-foreground"
          : "border-border bg-foreground/[0.03] text-foreground hover:border-muted-foreground/60",
      )}
    >
      {children}
    </button>
  );
}

function PostCard({ post, activeTopic }: { post: BrowserPost; activeTopic: string | null }) {
  return (
    // One link per card: the whole card is the target, and "Read more" is its visual cue.
    <Link
      href={blogPath(post.slug)}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-foreground/[0.02] transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-muted-foreground/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <PostCover post={post} size="md" />
      <div className="flex flex-1 flex-col p-6">
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays aria-hidden className="size-3.5" />
            <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock aria-hidden className="size-3.5" />
            {post.minutes} min read
          </span>
          {post.draft ? (
            <span className="rounded-full border border-[#CB4B16]/60 px-2 py-0.5 text-xs text-[#CB4B16]">Draft</span>
          ) : null}
        </p>
        <h2 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-foreground group-hover:underline group-hover:underline-offset-4">
          {post.title}
        </h2>
        <p className="mt-3 line-clamp-3 leading-[1.65] text-muted-foreground">{post.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Topics">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs",
                tag === activeTopic ? "border-accent text-accent-readable" : "border-border text-muted-foreground",
              )}
            >
              <Tag aria-hidden className="size-3" />
              {tag}
            </li>
          ))}
        </ul>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-accent-readable">
          Read more
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
