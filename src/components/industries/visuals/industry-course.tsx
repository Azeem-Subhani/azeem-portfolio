"use client";

import "./industry-course.css";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Award, Check, Lock } from "lucide-react";

import { useMotionPaused } from "@/hooks/use-motion-paused";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

/*
 * Hero illustration for the Education page: a learner dashboard where modules unlock
 * and fill in sequence, a quick-check answer flips to correct, and a certificate chip
 * appears once the last module is done. The course and questions are sample content.
 */

const MODULES = [
  { name: "Foundations", quiz: { q: "Which chart shows a trend over time?", options: ["Pie", "Line", "Table"], answer: 1 } },
  { name: "Practice set", quiz: { q: "What is the median of 2, 5, 9?", options: ["5", "9", "2"], answer: 0 } },
  { name: "Live session", quiz: { q: "Which join keeps every left row?", options: ["Inner", "Cross", "Left"], answer: 2 } },
  { name: "Final project", quiz: { q: "Where does a good project start?", options: ["A model", "A question", "A chart"], answer: 1 } },
] as const;

const TICK_MS = 800;
const TICKS_PER_MODULE = 4;
// Tick 0 resets to an empty course, ticks 1..16 work through the modules, then the
// certificate holds for a few ticks before the loop starts over.
const DONE_TICK = 1 + MODULES.length * TICKS_PER_MODULE;
const CYCLE_TICKS = DONE_TICK + 3;
// Progress of the active module at each sub-step (-1 is the reset frame).
const SUB_PROGRESS: Record<number, number> = { [-1]: 0, 0: 30, 1: 65, 2: 100, 3: 100 };

const RING_RADIUS = 34;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

type ModuleStatus = "locked" | "active" | "done";
type QuizStatus = "idle" | "selected" | "correct";

// Server and first client render agree: the finished course with its certificate.
// Reduced motion stays on this frame.
const INITIAL_TICK = DONE_TICK;

function frame(tick: number) {
  const done = tick >= DONE_TICK;
  const current = done ? MODULES.length - 1 : tick === 0 ? 0 : Math.floor((tick - 1) / TICKS_PER_MODULE);
  const sub = done ? TICKS_PER_MODULE - 1 : tick === 0 ? -1 : (tick - 1) % TICKS_PER_MODULE;

  const modules = MODULES.map((_, index) => {
    if (done || index < current) return { status: "done" as ModuleStatus, progress: 100 };
    if (index > current) return { status: "locked" as ModuleStatus, progress: 0 };
    const status: ModuleStatus = sub === TICKS_PER_MODULE - 1 ? "done" : "active";
    return { status, progress: SUB_PROGRESS[sub] };
  });
  const overall = Math.round(modules.reduce((sum, m) => sum + m.progress, 0) / MODULES.length);
  const quiz: QuizStatus = sub <= 0 ? "idle" : sub === 1 ? "selected" : "correct";

  return { done, current, sub, modules, overall, quiz };
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

export function IndustryCourse() {
  const reduced = usePrefersReducedMotion();
  // The page's pause control freezes the loop on its current frame.
  const paused = useMotionPaused();
  const panelRef = useRef<HTMLDivElement>(null);
  // Steps taken since mount; the visible tick is derived so the first frame is fixed.
  const [step, setStep] = useState(0);
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
    const id = window.setInterval(() => setStep((s) => s + 1), TICK_MS);
    return () => window.clearInterval(id);
  }, [running]);

  const tick = (INITIAL_TICK + step) % CYCLE_TICKS;
  const { done, current, sub, modules, overall, quiz } = frame(tick);
  const activeQuiz = MODULES[current].quiz;
  // Entrance animations play only on the tick where their content changes, and never
  // on the server-matching first frame.
  const animate = step > 0;
  const certIn = animate && tick === DONE_TICK;
  const questionIn = animate && !done && sub <= 0;
  const flipIn = animate && !done && sub === 2;

  return (
    <div
      ref={panelRef}
      className="relative rounded-[var(--shape-radius-lg)] border border-border bg-surface/70 p-4 shadow-[0_30px_80px_-40px_color-mix(in_srgb,var(--accent)_45%,transparent)] backdrop-blur-sm sm:p-5"
    >
      <p className="sr-only">
        Illustration: a learner dashboard where four course modules unlock and complete in
        order, a quiz answer is marked correct, and a certificate becomes ready at the end.
      </p>
      <div aria-hidden="true">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-medium">
            <span className="relative flex size-2">
              <span className="industry-live-ping absolute inset-0 rounded-full bg-accent" />
              <span className="relative size-2 rounded-full bg-accent" />
            </span>
            Course progress
          </span>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
            Sample data
          </span>
        </div>

        {/* Course header: overall ring fills as each module's bar does. */}
        <div className="mt-4 flex items-center gap-4 rounded-xl border border-border bg-background/70 p-3">
          <div className="relative size-[4.5rem] shrink-0">
            <svg viewBox="0 0 80 80" className="size-full -rotate-90">
              <circle cx="40" cy="40" r={RING_RADIUS} className="fill-none stroke-[var(--border)]" strokeWidth="6" />
              <circle
                cx="40"
                cy="40"
                r={RING_RADIUS}
                className="fill-none stroke-[var(--accent)] transition-[stroke-dashoffset] duration-700 ease-out"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={RING_CIRCUMFERENCE}
                strokeDashoffset={RING_CIRCUMFERENCE * (1 - overall / 100)}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-display text-lg tabular-nums">
              {overall}%
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <MonoLabel>Course</MonoLabel>
            <p className="mt-0.5 truncate font-display text-lg leading-tight">Intro to analytics</p>
            <div className="mt-1.5 flex h-5 items-center">
              {done ? (
                <span
                  className={cn(
                    "flex items-center gap-1 rounded-full border border-accent/50 px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-[var(--accent-readable)]",
                    certIn && "industry-course-in",
                  )}
                >
                  <Award aria-hidden="true" className="size-3" strokeWidth={2.25} />
                  Certificate ready
                </span>
              ) : (
                <span className="truncate text-xs text-muted-foreground">
                  Module {current + 1} of {MODULES.length}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Modules: locked, then in progress, then done, strictly in order. */}
        <ul className="mt-3 divide-y divide-border rounded-xl border border-border bg-background/70">
          {MODULES.map((module, index) => {
            const { status, progress } = modules[index];
            return (
              <li key={module.name} className="flex items-center gap-2.5 px-3 py-2">
                <span
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-500",
                    status === "done" && "border-accent bg-accent text-accent-foreground",
                    status === "active" && "border-accent",
                    status === "locked" && "border-border text-muted-foreground",
                  )}
                >
                  {status === "done" ? (
                    <Check aria-hidden="true" className="size-3" strokeWidth={3} />
                  ) : status === "active" ? (
                    <span className="industry-course-active-dot size-2 rounded-full bg-accent" />
                  ) : (
                    <Lock aria-hidden="true" className="size-2.5" strokeWidth={2.25} />
                  )}
                </span>
                <span
                  className={cn(
                    "min-w-0 flex-1 truncate text-xs transition-colors duration-500",
                    status === "locked" ? "text-muted-foreground" : "text-foreground",
                  )}
                >
                  {module.name}
                </span>
                <span className="relative h-1 w-14 shrink-0 overflow-hidden rounded-full bg-border sm:w-20">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-accent transition-[width] duration-700 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </span>
                <span className="w-8 shrink-0 text-right font-mono text-[0.6rem] tabular-nums text-muted-foreground">
                  {progress}%
                </span>
              </li>
            );
          })}
        </ul>

        {/* Quick check for the current module: an option is picked, then marked correct. */}
        <div className="mt-3 rounded-xl border border-border bg-background/70 p-3">
          <div className="flex items-center justify-between gap-3">
            <MonoLabel className="truncate">Quick check</MonoLabel>
            <MonoLabel
              className={cn(
                "shrink-0 transition-colors duration-300",
                quiz === "correct" && "text-[var(--accent-readable)]",
              )}
            >
              {quiz === "correct" ? "Correct" : quiz === "selected" ? "Checking" : "Answering"}
            </MonoLabel>
          </div>
          <p key={`q-${current}`} className={cn("mt-1.5 truncate text-sm", questionIn && "industry-course-in")}>
            {activeQuiz.q}
          </p>
          <div className="mt-2.5 grid grid-cols-3 gap-1.5">
            {activeQuiz.options.map((option, index) => {
              const isAnswer = index === activeQuiz.answer;
              const picked = isAnswer && quiz !== "idle";
              const correct = isAnswer && quiz === "correct";
              return (
                <span
                  key={`${current}-${option}`}
                  className={cn(
                    "flex min-w-0 items-center justify-center gap-1 rounded-lg border px-2 py-1.5 text-xs transition-colors duration-300",
                    correct
                      ? "border-accent bg-accent/15 text-[var(--accent-readable)]"
                      : picked
                        ? "border-accent/40 bg-accent/5"
                        : "border-border text-muted-foreground",
                    correct && flipIn && "industry-course-flip",
                  )}
                >
                  {correct ? <Check aria-hidden="true" className="size-3 shrink-0" strokeWidth={2.75} /> : null}
                  <span className="truncate">{option}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
