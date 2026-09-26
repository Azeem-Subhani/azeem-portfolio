"use client";

import "./industry-care.css";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, Lock, Video } from "lucide-react";

import { useMotionPaused } from "@/hooks/use-motion-paused";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

/*
 * Hero illustration for the HealthTech page: a patient portal where the visit counts
 * down, a care-team reply types into a secure thread, and every touch of the record
 * lands in an access log. Messages and log entries are synthetic sample data.
 */

const THREADS = [
  { ask: "Are my lab results in?", reply: "Yes, they're posted. We'll go over them on the call." },
  { ask: "Can I share my medication list?", reply: "Please do. Upload it here before the visit." },
  { ask: "Anything to prepare for today?", reply: "Just a quiet room and your latest readings." },
] as const;

const LOG_ENTRIES = [
  { action: "Viewed lab results", role: "Care team", glyph: "lock" },
  { action: "Updated appointment", role: "Front desk", glyph: "check" },
  { action: "Downloaded summary", role: "Patient", glyph: "check" },
] as const;

const TICK_MS = 900;
const CYCLE_TICKS = 15;
const TYPING_TICK = 1;
const REPLY_TICK = 3;
// Each log entry is written at a fixed point in the cycle, in LOG_ENTRIES order.
const LOG_TICKS = [REPLY_TICK, 8, 13] as const;
const VISIBLE_LOG = 3;

type LogRow = { key: number; entry: number };
type State = { tick: number; cycle: number; log: LogRow[] };

// Server and first client render agree: the reply is in, the visit is a minute out,
// and the log holds three settled entries. Reduced motion stays on this frame.
const INITIAL_STATE: State = {
  tick: 12,
  cycle: 0,
  log: [
    { key: 2, entry: 1 },
    { key: 1, entry: 0 },
    { key: 0, entry: 2 },
  ],
};

function advance(state: State): State {
  const nextTick = (state.tick + 1) % CYCLE_TICKS;
  const cycle = nextTick === 0 ? state.cycle + 1 : state.cycle;
  const entry = LOG_TICKS.indexOf(nextTick as (typeof LOG_TICKS)[number]);
  if (entry === -1) return { ...state, tick: nextTick, cycle };
  const row: LogRow = { key: state.log[0].key + 1, entry };
  return { tick: nextTick, cycle, log: [row, ...state.log].slice(0, VISIBLE_LOG) };
}

function MonoLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function IndustryCare() {
  const reduced = usePrefersReducedMotion();
  // The page's pause control freezes the loop on its current frame.
  const paused = useMotionPaused();
  const panelRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>(INITIAL_STATE);
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
    const id = window.setInterval(() => setState(advance), TICK_MS);
    return () => window.clearInterval(id);
  }, [running]);

  const { tick, cycle, log } = state;
  const thread = THREADS[cycle % THREADS.length];
  const typing = tick >= TYPING_TICK && tick < REPLY_TICK;
  const replied = tick >= REPLY_TICK;
  // Countdown steps from 5 min to 1 min across the cycle; Join lights up near start.
  const minutes = 5 - Math.floor(tick / 3);
  const joinReady = minutes <= 2;
  // Skip entrance animations on the server-matching first frame.
  const animateThread = cycle > 0;

  return (
    <div
      ref={panelRef}
      className="relative rounded-[var(--shape-radius-lg)] border border-border bg-surface/70 p-4 shadow-[0_30px_80px_-40px_color-mix(in_srgb,var(--accent)_45%,transparent)] backdrop-blur-sm sm:p-5"
    >
      <p className="sr-only">
        Illustration: a patient portal showing an upcoming video visit, a secure message
        thread where the care team replies, and an access log recording who viewed or
        changed the record.
      </p>
      <div aria-hidden="true">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-medium">
            <span className="relative flex size-2">
              <span className="industry-live-ping absolute inset-0 rounded-full bg-accent" />
              <span className="relative size-2 rounded-full bg-accent" />
            </span>
            Patient portal
          </span>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
            Sample data
          </span>
        </div>

        {/* Next appointment: countdown on the left, visit type and Join on the right. */}
        <div className="mt-4 flex items-stretch justify-between gap-3 rounded-xl border border-border bg-background/70 p-3">
          <div className="min-w-0">
            <MonoLabel>Next appointment</MonoLabel>
            <p className="mt-1 truncate font-display text-xl leading-tight">Follow-up visit</p>
            <p className="mt-1 truncate text-xs text-muted-foreground tabular-nums">
              Tue 10:30 · starts in {minutes} min
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-end justify-between gap-2">
            <span className="flex items-center gap-1 rounded-full border border-border px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-muted-foreground">
              <Video aria-hidden="true" className="size-3" strokeWidth={2} />
              Video visit
            </span>
            <span
              className={cn(
                "rounded-full border px-3.5 py-1 text-xs font-medium transition-colors duration-500",
                joinReady
                  ? "industry-care-join-pulse border-accent bg-accent text-accent-foreground"
                  : "border-border text-muted-foreground",
              )}
            >
              Join
            </span>
          </div>
        </div>

        {/* Secure thread: patient asks, care team types, reply lands. */}
        <div className="mt-3 rounded-xl border border-border bg-background/70 p-3">
          <div className="flex items-center justify-between">
            <MonoLabel className="flex items-center gap-1.5">
              <Lock aria-hidden="true" className="size-3" strokeWidth={2} />
              Secure messages
            </MonoLabel>
            <MonoLabel>Care team</MonoLabel>
          </div>
          <div key={cycle} className="mt-2.5 grid h-[5.75rem] content-start gap-2">
            <p
              className={cn(
                "ml-auto max-w-[80%] truncate rounded-2xl rounded-br-md bg-accent/15 px-3 py-1.5 text-xs",
                animateThread && "industry-care-in",
              )}
            >
              {thread.ask}
            </p>
            {replied ? (
              <p
                className={cn(
                  "max-w-[88%] rounded-2xl rounded-bl-md border border-border bg-surface px-3 py-1.5 text-xs leading-relaxed",
                  animateThread && "industry-care-in",
                )}
              >
                {thread.reply}
              </p>
            ) : typing ? (
              <span className="industry-care-in flex w-fit items-center gap-1 rounded-2xl rounded-bl-md border border-border bg-surface px-3 py-2.5">
                {[0, 1, 2].map((dot) => (
                  <span
                    key={dot}
                    className="industry-care-dot size-1.5 rounded-full bg-muted-foreground"
                    style={{ animationDelay: `${dot * 0.15}s` }}
                  />
                ))}
              </span>
            ) : null}
          </div>
        </div>

        {/* Access log: newest on top, each entry tagged with the role that acted. */}
        <div className="mt-3">
          <div className="flex items-center justify-between">
            <MonoLabel>Access log</MonoLabel>
            <MonoLabel>Newest first</MonoLabel>
          </div>
          <ul className="industry-care-log mt-2 grid h-[7.5rem] content-start gap-1.5 overflow-hidden">
            {log.map((row, index) => {
              const entry = LOG_ENTRIES[row.entry];
              const Glyph = entry.glyph === "lock" ? Lock : Check;
              return (
                <li
                  key={row.key}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg border bg-background/70 px-3 py-2 transition-colors duration-700",
                    index === 0 && row.key > 2 ? "industry-care-in border-accent/40" : "border-border",
                  )}
                >
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-accent/40 text-[var(--accent-readable)]">
                    <Glyph aria-hidden="true" className="size-3" strokeWidth={2.5} />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-xs">{entry.action}</span>
                  <MonoLabel className="shrink-0">{entry.role}</MonoLabel>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
