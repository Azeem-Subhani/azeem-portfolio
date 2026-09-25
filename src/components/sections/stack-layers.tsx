"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { useInViewOnce } from "@/hooks/use-in-view-once";

const settle = [0.16, 1, 0.3, 1] as const;

/** Same surface tokens as the chapter consoles, so the page reads as one set. */
const tone = {
  chassis: "var(--surface)",
  panel: "var(--surface-elevated)",
  well: "var(--background)",
  ink: "var(--foreground)",
  muted: "var(--muted-foreground)",
} as const;

const hairline = (percent: number) =>
  `color-mix(in srgb, var(--foreground) ${percent}%, transparent)`;

type Layer = { id: string; label: string; color: string; tools: string[] };

// The full toolbox, top of the stack to the bottom. Every project lights a
// subset, so the dim chips double as the breadth the old logo loop showed.
const layers: Layer[] = [
  {
    id: "interface",
    label: "Interface",
    color: "var(--signal)",
    tools: ["React", "Next.js", "TypeScript", "Angular", "Ionic", "Tailwind"],
  },
  {
    id: "api",
    label: "API",
    color: "var(--accent)",
    tools: ["Django", "NestJS", "Node.js", "GraphQL", "AppSync", "Lambda", "Socket.IO"],
  },
  {
    id: "data",
    label: "Data",
    color: "#b58900",
    tools: ["PostgreSQL", "MySQL", "MongoDB", "DynamoDB", "Firestore"],
  },
  {
    id: "platform",
    label: "Cloud & payments",
    color: "var(--success)",
    tools: ["AWS", "Cognito", "Firebase", "Docker", "Stripe", "Trust Commerce"],
  },
];

type ProjectId = "track-hero" | "oxym" | "memorial";

type Project = {
  label: string;
  /** Tools per layer id. Taken from each project's stack in src/content/projects.ts. */
  picks: Record<string, string[]>;
  /** Shown in a layer the project record doesn't list a tool for. */
  gaps?: Record<string, string>;
  metric: { value: string; label: string };
};

const projects: Record<ProjectId, Project> = {
  "track-hero": {
    label: "Track Hero",
    picks: {
      interface: ["React", "Next.js", "TypeScript"],
      api: ["Django"],
      platform: ["Stripe"],
    },
    gaps: { data: "behind the Django API" },
    metric: { value: "5", label: "white-label venues on one platform" },
  },
  oxym: {
    label: "Oxym",
    picks: {
      interface: ["Angular", "Ionic"],
      api: ["NestJS", "Node.js", "Socket.IO"],
      data: ["Firestore"],
      platform: ["Firebase", "Stripe"],
    },
    metric: { value: "1", label: "codebase for web and mobile" },
  },
  memorial: {
    label: "Memorial portal",
    picks: {
      interface: ["Next.js"],
      api: ["AppSync", "Lambda"],
      data: ["DynamoDB"],
      platform: ["AWS", "Cognito", "Trust Commerce"],
    },
    metric: { value: "500+", label: "payments a day in production" },
  },
};

const projectOrder: ProjectId[] = ["track-hero", "oxym", "memorial"];

/** Time for the lit thread to drop from one layer to the next. */
const STEP_MS = 240;
/** Lets the heading reveal land before the first project lights up. */
const startDelayMs = 700;
/** How long a fully lit stack holds before the tour moves on. */
const advanceAfterMs = 3400;

export function StackLayers({ reduced }: { reduced: boolean }) {
  const { ref: panelRef, inView } = useInViewOnce<HTMLDivElement>();
  const [projectId, setProjectId] = useState<ProjectId>("track-hero");
  const [runKey, setRunKey] = useState(0);
  /** Deepest layer the thread has reached; -1 before it starts. */
  const [reachedState, setReached] = useState(-1);
  const userPicked = useRef(false);

  const reached = reduced ? layers.length - 1 : reachedState;
  const project = projects[projectId];

  useEffect(() => {
    if (!inView || reduced) return;
    const first = window.setTimeout(() => setRunKey(1), startDelayMs);
    return () => window.clearTimeout(first);
  }, [inView, reduced]);

  // Drops the thread down the stack, lighting each layer as it arrives, then
  // hands off to the next project once unless the visitor has picked one.
  useEffect(() => {
    if (reduced || runKey === 0) return;
    const timers: number[] = [];
    const later = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

    later(0, () => setReached(-1));
    layers.forEach((_, index) => later(60 + index * STEP_MS, () => setReached(index)));

    const next = projectOrder[projectOrder.indexOf(projectId) + 1];
    if (next && !userPicked.current) {
      later(60 + layers.length * STEP_MS + advanceAfterMs, () => {
        if (userPicked.current) return;
        setProjectId(next);
        setRunKey((k) => k + 1);
      });
    }

    return () => timers.forEach(window.clearTimeout);
    // projectId changes always come with a runKey bump, so runKey covers it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runKey, reduced]);

  const pick = (id: ProjectId) => {
    userPicked.current = true;
    if (id === projectId) return;
    setProjectId(id);
    if (!reduced) setRunKey((k) => k + 1);
  };

  const morph = reduced ? { duration: 0 } : { duration: 0.45, ease: settle };
  const swap = reduced ? { duration: 0 } : { duration: 0.32, ease: settle };

  return (
    <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-[34rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/12 blur-3xl"
      />

      <div
        ref={panelRef}
        role="region"
        aria-label="Technology stack"
        className="relative overflow-hidden rounded-[1.65rem] border border-border/80 px-4 pb-5 pt-4 shadow-[0_28px_56px_-30px_rgb(21_40_48/0.85)] sm:px-6 sm:pb-6 sm:pt-5"
        style={{
          backgroundColor: tone.chassis,
          backgroundImage: `linear-gradient(to bottom, ${hairline(4)}, transparent 38%, color-mix(in srgb, var(--background) 60%, transparent))`,
          boxShadow: `inset 0 1px 0 ${hairline(7)}`,
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <div>
            <p className="text-[11px]" style={{ color: tone.muted }}>
              Stack by project
            </p>
            <p
              className="mt-0.5 font-display text-[1.35rem] leading-none sm:text-[1.55rem]"
              style={{ color: tone.ink }}
            >
              Picked per product
            </p>
          </div>

          <div
            className="flex rounded-full border p-0.5"
            style={{ borderColor: hairline(14), backgroundColor: tone.well }}
            role="group"
            aria-label="Project"
          >
            {projectOrder.map((id) => {
              const selected = id === projectId;
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => pick(id)}
                  className="relative h-8 whitespace-nowrap rounded-full px-2.5 text-[11px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal sm:px-3 sm:text-[12px]"
                  style={{ color: selected ? tone.ink : tone.muted }}
                >
                  {selected ? (
                    <motion.span
                      layoutId="stack-project-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: tone.panel }}
                      transition={morph}
                    />
                  ) : null}
                  <span className="relative">{projects[id].label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* The stack. One thread runs through every layer: the same person
            owns each one, so nothing changes hands on the way down. */}
        <div className="relative mt-6">
          <ol className="relative space-y-2">
            {layers.map((layer, index) => {
              const lit = reached >= index;
              const picks = project.picks[layer.id] ?? [];
              const gap = project.gaps?.[layer.id];
              const next = layers[index + 1];
              return (
                <li
                  key={layer.id}
                  className="relative grid grid-cols-[1.375rem_minmax(0,1fr)] gap-x-3 sm:gap-x-4"
                >
                  {/* Thread segment down to the next layer's node. Rows grow with
                      their chips, so each row owns its own piece of the spine. */}
                  {next ? (
                    <div
                      aria-hidden="true"
                      className="absolute left-[calc(0.6875rem-1px)] top-[1.1rem] h-[calc(100%+0.5rem)] w-[2px]"
                      style={{ backgroundColor: hairline(14) }}
                    >
                      <motion.div
                        className="size-full origin-top rounded-full"
                        style={{
                          background: `linear-gradient(to bottom, ${layer.color}, ${next.color})`,
                          boxShadow: `0 0 8px color-mix(in srgb, ${layer.color} 60%, transparent)`,
                        }}
                        initial={false}
                        animate={{ scaleY: reached > index ? 1 : 0 }}
                        transition={
                          reduced || reached <= index
                            ? { duration: 0 }
                            : { duration: STEP_MS / 1000, ease: "linear" }
                        }
                      />
                    </div>
                  ) : null}
                  <div className="flex h-[2.2rem] items-center justify-center">
                    <span
                      aria-hidden="true"
                      className="relative size-[0.875rem] rounded-full border-2 transition-[border-color,box-shadow,background-color] duration-300"
                      style={{
                        borderColor: lit ? layer.color : hairline(22),
                        backgroundColor: lit ? layer.color : tone.chassis,
                        boxShadow: lit
                          ? `0 0 0 4px color-mix(in srgb, ${layer.color} 18%, transparent), 0 0 14px ${layer.color}`
                          : "none",
                      }}
                    />
                  </div>

                  <div
                    className="rounded-2xl border px-3 py-2.5 transition-[border-color,background-color] duration-500 sm:grid sm:grid-cols-[6.25rem_minmax(0,1fr)] sm:items-start sm:gap-x-3 sm:px-3.5"
                    style={{
                      borderColor: lit && (picks.length || gap)
                        ? `color-mix(in srgb, ${layer.color} 34%, transparent)`
                        : hairline(10),
                      backgroundColor: tone.well,
                    }}
                  >
                    <p className="flex items-baseline gap-2 pb-2 sm:pb-0 sm:pt-[0.3rem]">
                      <span className="text-[10px] tabular-nums" style={{ color: tone.muted }}>
                        0{index + 1}
                      </span>
                      <span className="text-[12px] font-medium leading-4" style={{ color: tone.ink }}>
                        {layer.label}
                      </span>
                    </p>

                    <ul className="flex flex-wrap gap-1.5" aria-label={`${layer.label} tools`}>
                      {layer.tools.map((tool) => {
                        const on = lit && picks.includes(tool);
                        return (
                          <li
                            key={tool}
                            aria-current={on ? "true" : undefined}
                            className="inline-flex h-6 items-center gap-1.5 rounded-full border px-2 text-[10.5px] font-medium leading-none transition-[color,border-color,background-color,box-shadow,opacity] duration-300 sm:text-[11px]"
                            style={{
                              borderColor: on ? layer.color : hairline(12),
                              backgroundColor: on ? tone.panel : "transparent",
                              color: on ? tone.ink : tone.muted,
                              opacity: on ? 1 : 0.55,
                              boxShadow: on
                                ? `0 0 14px -2px color-mix(in srgb, ${layer.color} 55%, transparent)`
                                : "none",
                            }}
                          >
                            {on ? (
                              <span
                                aria-hidden="true"
                                className="size-1.5 rounded-full"
                                style={{ backgroundColor: layer.color }}
                              />
                            ) : null}
                            {tool}
                          </li>
                        );
                      })}
                      {gap && lit ? (
                        <li
                          className="inline-flex h-6 items-center px-1 text-[10.5px] italic sm:text-[11px]"
                          style={{ color: tone.muted }}
                        >
                          {gap}
                        </li>
                      ) : null}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-5 flex min-h-[3.5rem] items-end justify-between gap-x-6 gap-y-2">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={projectId}
              className="leading-none"
              style={{ color: tone.ink }}
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -4 }}
              transition={swap}
            >
              <span className="font-display text-[2.5rem] tabular-nums sm:text-[2.9rem]">
                {project.metric.value}
              </span>
              <span className="mt-1.5 block text-[11px]" style={{ color: tone.muted }}>
                {project.metric.label}
              </span>
            </motion.p>
          </AnimatePresence>
          <p className="max-w-[12rem] pb-0.5 text-right text-[11px] leading-4" style={{ color: tone.muted }}>
            Four layers, one engineer.
            <br />
            No handoffs between them.
          </p>
        </div>
      </div>
    </div>
  );
}
