"use client";

import { useEffect, useRef, useState } from "react";
import { Eye } from "lucide-react";

import { useMotionPaused } from "@/hooks/use-motion-paused";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

import "./industry-stream.css";

/*
 * Hero illustration for the media page: a live player whose viewer count drifts, whose
 * buffer thins and recovers, and whose adaptive bitrate steps 1080p down to 720p and back,
 * beside a chat feed. Every value is derived from one tick counter and is synthetic.
 */

const TICK_MS = 1000;
const CYCLE = 24;
// Server and first client render agree on this tick; reduced motion stays on it.
const INITIAL_TICK = 7;
const VISIBLE_CHAT = 4;
const CHAT_EVERY = 2;

const BASE_VIEWERS = 2418;
// Small ups and downs that sum to zero, so the count loops without drifting away.
const VIEWER_DELTAS = [3, -1, 4, 2, -3, 1, 5, -2, -4, 1, -3, -3];
const VIEWER_OFFSETS = VIEWER_DELTAS.map((_, i) =>
  VIEWER_DELTAS.slice(0, i + 1).reduce((sum, d) => sum + d, 0),
);

// Buffer ahead of the playhead (% of the track). It thins mid-cycle, which is what
// makes the player drop a rung, then refills and steps back up.
const BUFFER = [9, 10, 11, 11, 12, 12, 11, 10, 9, 8, 6, 5, 4, 3, 4, 6, 8, 10, 11, 12, 12, 11, 10, 9];
const LOW_FROM = 13;
const LOW_UNTIL = 20;
const PLAYHEAD = 84;

const LADDER = [
  { label: "360", mbps: "0.8" },
  { label: "480", mbps: "1.4" },
  { label: "720", mbps: "3.0" },
  { label: "1080", mbps: "6.0" },
] as const;

const CHAT = [
  { handle: "@kite", text: "audio is crisp tonight" },
  { handle: "@nova", text: "hello from the late shift" },
  { handle: "@rio", text: "that camera switch was smooth" },
  { handle: "@juno", text: "first time catching one live" },
  { handle: "@pax", text: "no buffering on my end" },
  { handle: "@ember", text: "will there be a replay?" },
  { handle: "@kite", text: "chat is moving fast" },
  { handle: "@nova", text: "the lighting looks great" },
  { handle: "@rio", text: "watching from the train" },
  { handle: "@juno", text: "holding up on hotel wifi" },
] as const;

const START_SECONDS = 2 * 3600 + 14 * 60 + 30;
const INITIAL_MESSAGE = Math.floor(INITIAL_TICK / CHAT_EVERY);

// Manual grouping keeps server and client output identical regardless of locale.
const groupDigits = (n: number) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const clock = (total: number) =>
  [Math.floor(total / 3600), Math.floor(total / 60) % 60, total % 60]
    .map((part) => part.toString().padStart(2, "0"))
    .join(":");

function frameAt(tick: number) {
  const phase = tick % CYCLE;
  const rung = phase >= LOW_FROM && phase < LOW_UNTIL ? 2 : 3;
  const newest = Math.floor(tick / CHAT_EVERY);
  const first = Math.max(0, newest - VISIBLE_CHAT + 1);
  return {
    viewers: BASE_VIEWERS + VIEWER_OFFSETS[tick % VIEWER_OFFSETS.length],
    buffer: BUFFER[phase],
    rung,
    elapsed: clock(START_SECONDS + tick),
    messages: Array.from({ length: newest - first + 1 }, (_, i) => first + i),
  };
}

export function IndustryStream() {
  const reduced = usePrefersReducedMotion();
  // The page's pause control freezes the loop on its current frame.
  const paused = useMotionPaused();
  const panelRef = useRef<HTMLDivElement>(null);
  const [tick, setTick] = useState(INITIAL_TICK);
  const [running, setRunning] = useState(false);

  // Only tick while the panel is on screen and the tab is visible.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || reduced || paused) return;
    let inView = false;
    const update = () => setRunning(inView && document.visibilityState === "visible");
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    observer.observe(panel);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      setRunning(false);
    };
  }, [reduced, paused]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setTick((t) => t + 1), TICK_MS);
    return () => window.clearInterval(id);
  }, [running]);

  const frame = frameAt(reduced ? INITIAL_TICK : tick);
  const active = LADDER[frame.rung];
  const hd = frame.rung === LADDER.length - 1;

  return (
    <div
      ref={panelRef}
      className="relative rounded-[var(--shape-radius-lg)] border border-border bg-surface/70 p-4 shadow-[0_30px_80px_-40px_color-mix(in_srgb,var(--accent)_45%,transparent)] backdrop-blur-sm sm:p-5"
    >
      <p className="sr-only">
        Illustration: a live video player with a viewer count, buffer bar, and adaptive
        bitrate switching between 1080p and 720p, next to a scrolling chat feed.
      </p>
      <div aria-hidden="true" className={cn(!running && "industry-stream-paused")}>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-medium">
            <span className="relative flex size-2">
              <span className="industry-live-ping absolute inset-0 rounded-full bg-accent" />
              <span className="relative size-2 rounded-full bg-accent" />
            </span>
            Live stream
          </span>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
            Sample data
          </span>
        </div>

        {/* Player frame: abstract picture, overlays on top, scrub bar along the bottom. */}
        <div className="industry-stream-picture relative mt-4 aspect-video overflow-hidden rounded-xl border border-border">
          <span className="industry-stream-blob industry-stream-blob-a" />
          <span className="industry-stream-blob industry-stream-blob-b" />
          <span className="industry-stream-blob industry-stream-blob-c" />
          <span className="industry-stream-ring" />
          <span className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-background/85 to-transparent" />

          <div className="absolute inset-x-2.5 top-2.5 flex items-center justify-between gap-2">
            <span className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-md border border-accent/40 bg-background/75 px-1.5 py-0.5 font-mono text-[0.58rem] font-medium uppercase tracking-[0.14em] text-[var(--accent-readable)]">
                <span className="size-1.5 rounded-full bg-accent" />
                Live
              </span>
              <span className="flex items-center gap-1 rounded-md bg-background/75 px-1.5 py-0.5 font-mono text-[0.6rem] tabular-nums text-foreground/85">
                <Eye aria-hidden="true" className="size-3" strokeWidth={2} />
                {groupDigits(frame.viewers)}
              </span>
            </span>
            <span
              key={active.label}
              className={cn(
                "rounded-md border bg-background/75 px-1.5 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.1em]",
                hd ? "border-accent/40 text-[var(--accent-readable)]" : "border-border text-muted-foreground",
                !reduced && tick > INITIAL_TICK && "industry-stream-chip-in",
              )}
            >
              {active.label}p{hd ? " HD" : ""}
            </span>
          </div>

          <div className="absolute inset-x-2.5 bottom-2 flex items-center gap-2.5">
            <span className="font-mono text-[0.58rem] tabular-nums text-foreground/80">{frame.elapsed}</span>
            <span className="relative h-1 flex-1 overflow-hidden rounded-full bg-foreground/15">
              <span
                className="absolute inset-y-0 bg-foreground/30 transition-[width] duration-700 ease-out"
                style={{ left: `${PLAYHEAD}%`, width: `${frame.buffer}%` }}
              />
              <span className="absolute inset-y-0 left-0 bg-accent" style={{ width: `${PLAYHEAD}%` }} />
            </span>
            <span className="size-2 shrink-0 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
          </div>
        </div>

        {/* Adaptive bitrate ladder: the active rung is solid, rungs below it are tinted. */}
        <div className="mt-3 flex items-end justify-between gap-3">
          <span className="min-w-0">
            <span className="block font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground">
              Adaptive bitrate
            </span>
            <span className="mt-1 flex items-baseline gap-1">
              <span className="font-display text-xl leading-none tabular-nums">{active.mbps}</span>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground">
                Mbps
              </span>
            </span>
          </span>
          <span className="flex shrink-0 items-end gap-2">
            {LADDER.map((step, index) => (
              <span key={step.label} className="flex flex-col items-center gap-1">
                <span
                  className={cn(
                    "w-2.5 rounded-sm transition-colors duration-500",
                    index === frame.rung ? "bg-accent" : index < frame.rung ? "bg-accent/30" : "bg-border",
                  )}
                  style={{ height: `${0.4 + index * 0.25}rem` }}
                />
                <span
                  className={cn(
                    "font-mono text-[0.52rem] tabular-nums transition-colors duration-500",
                    index === frame.rung ? "text-[var(--accent-readable)]" : "text-muted-foreground/70",
                  )}
                >
                  {step.label}
                </span>
              </span>
            ))}
          </span>
        </div>

        {/* Chat: newest line at the bottom, older lines dim before they leave. */}
        <ul className="industry-stream-chat mt-3 flex h-[7.25rem] flex-col justify-end gap-1.5 overflow-hidden rounded-xl border border-border bg-background/70 px-3 py-2.5">
          {frame.messages.map((index, position) => {
            const message = CHAT[index % CHAT.length];
            const age = frame.messages.length - 1 - position;
            return (
              <li
                key={index}
                className={cn(
                  "flex min-w-0 items-baseline gap-2 text-[0.8rem] leading-snug transition-opacity duration-500",
                  age >= 3 ? "opacity-60" : age === 2 ? "opacity-75" : "opacity-100",
                  !reduced && index > INITIAL_MESSAGE && "industry-stream-chat-in",
                )}
              >
                <span className="shrink-0 font-mono text-[0.66rem] text-[var(--accent-readable)]">
                  {message.handle}
                </span>
                <span className="truncate text-foreground/85">{message.text}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
