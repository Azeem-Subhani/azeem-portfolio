"use client";

import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

/*
 * DESIGN BRIEF — Pass 1
 * Subject: Azeem sells AWS serverless as a service (auth, compute, data, deploy).
 * Job: Convince a buyer the stack is repeatable and production-ready, not a one-off case study.
 *
 * Color (#hex, mock-local deploy console — light chassis, not mock 1 dark registry):
 *   frame #f0e9d3 (surface-elevated), panel #fdf6e3 (bg), well #eee8d5 (border wash),
 *   ink #073642 (fg), muted #657b83, lane-cogn #268bd2, lane-lambda #2aa198,
 *   lane-dynamo #b58900, lane-ship #859900
 *
 * Type: Instrument Serif display on copy; Inter/sans on console labels (site tokens).
 *
 * Layout (visualFirst false):
 *   lg: [copy + chips | deploy pipeline visual]
 *   mobile: copy stacked above visual; lanes compress to vertical steps with left rail.
 *
 *   ┌ copy column ──────────┐  ┌ pipeline console ────────┐
 *   │ title                 │  │ sam deploy · stage 4/4   │
 *   │ From…to…, I…          │  │ [Cognito lane ────────→] │
 *   │ breadth + close       │  │ [Lambda lane  ────────→] │
 *   │ [chip][chip][chip]    │  │ [Dynamo lane  ────────→] │
 *   └───────────────────────┘  │ [SAM·Amplify  ─── LIVE]  │
 *                              └──────────────────────────┘
 *
 * Principle: One memorable thing — horizontal deploy lanes with a single left-to-right
 * fill sweep. Everything else stays quiet. Sells the service (repeatable IaC deploy),
 * not a client project.
 *
 * DESIGN BRIEF — Pass 2 (AI-tell revision)
 * Rejected: dark near-black panel (mock 1 owns that), vertical spine topology (mock 1 + v3),
 * logo glyph row (mock 1), numbered 01/02/03 markers, ping on every chip, payment metrics.
 * Revised: warm light console frame, horizontal swim lanes, one orchestrated fill animation,
 * capability chips without eyebrow labels.
 */

/** Mock-local: warm deploy console on Solarized cream, not mock 1 dark registry */
const console = {
  frame: "#f0e9d3",
  panel: "#fdf6e3",
  well: "#eee8d5",
  ink: "#073642",
  muted: "#657b83",
  cognito: "#268bd2",
  lambda: "#2aa198",
  dynamo: "#b58900",
  ship: "#859900",
} as const;

const capabilities = ["User pool auth", "Pay-per-use APIs", "Repeatable deploys"] as const;

type Lane = {
  id: string;
  service: string;
  role: string;
  tint: string;
  fill: string;
  delay: number;
};

const lanes: Lane[] = [
  {
    id: "cognito",
    service: "Cognito",
    role: "Sign-in and tokens",
    tint: console.cognito,
    fill: "rgb(38 139 210 / 0.16)",
    delay: 0.28,
  },
  {
    id: "lambda",
    service: "Lambda",
    role: "API handlers",
    tint: console.lambda,
    fill: "rgb(42 161 152 / 0.16)",
    delay: 0.44,
  },
  {
    id: "dynamo",
    service: "DynamoDB",
    role: "Partitioned records",
    tint: console.dynamo,
    fill: "rgb(181 137 0 / 0.14)",
    delay: 0.6,
  },
  {
    id: "ship",
    service: "SAM · Amplify",
    role: "Stack update",
    tint: console.ship,
    fill: "rgb(133 153 0 / 0.14)",
    delay: 0.76,
  },
];

const deploySteps = [
  { id: "validate", label: "sam validate" },
  { id: "build", label: "sam build" },
  { id: "deploy", label: "sam deploy" },
  { id: "live", label: "UPDATE_COMPLETE" },
] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.06 },
  },
};

const panelIn: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.72, ease: settle },
  },
};

const laneIn: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.48, ease: settle, delay },
  }),
};

const fillGrow: Variants = {
  hidden: { scaleX: 0, opacity: 0.45 },
  visible: (delay: number) => ({
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.85, ease: settle, delay },
  }),
};

const stepIn: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: settle, delay: 0.14 + index * 0.08 },
  }),
};

function DeployPipelineVisual({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[20rem] sm:max-w-[24rem] md:max-w-[28rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[46%] h-64 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/14 blur-3xl"
      />

      <motion.div
        className="relative overflow-hidden rounded-[1.65rem] border border-border/70 px-3.5 pb-4 pt-3.5 shadow-[0_24px_48px_-28px_rgb(7_54_66/0.22)] sm:rounded-[1.75rem] sm:px-4 sm:pb-5 sm:pt-4"
        style={{ backgroundColor: console.frame }}
        variants={stage}
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
      >
        <motion.div variants={panelIn}>
          <div className="mb-3 flex items-end justify-between gap-2 px-0.5 sm:mb-4">
            <p className="text-[10px] sm:text-[11px]" style={{ color: console.muted }}>
              Deploy pipeline
            </p>
            <span
              className="inline-flex items-center gap-1.5 text-[10px] font-medium sm:text-[11px]"
              style={{ color: console.ship }}
            >
              <span className="relative flex size-1.5">
                {!reduced ? (
                  <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-50"
                    style={{ backgroundColor: console.ship }}
                  />
                ) : null}
                <span
                  className="relative inline-flex size-1.5 rounded-full"
                  style={{ backgroundColor: console.ship }}
                />
              </span>
              Stack live
            </span>
          </div>

          <div
            className="overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:overflow-visible"
            aria-hidden="true"
          >
            <div className="flex w-max min-w-full gap-1.5 sm:w-full sm:gap-2">
              {deploySteps.map((step, index) => {
                const done = index < deploySteps.length - 1 || !reduced;
                return (
                  <motion.div
                    key={step.id}
                    custom={reduced ? 0 : index}
                    variants={stepIn}
                    className="min-w-[4.5rem] flex-1 rounded-lg border px-2 py-2 text-center sm:min-w-0 sm:px-2.5"
                    style={{
                      borderColor:
                        index === deploySteps.length - 1
                          ? `color-mix(in srgb, ${console.ship} 45%, ${console.well})`
                          : `color-mix(in srgb, ${console.muted} 28%, ${console.well})`,
                      backgroundColor: console.panel,
                    }}
                  >
                    <p
                      className="truncate font-mono text-[8px] leading-tight sm:text-[9px]"
                      style={{
                        color:
                          index === deploySteps.length - 1 ? console.ship : console.muted,
                      }}
                    >
                      {step.label}
                    </p>
                    <p
                      className="mt-1 text-[9px] font-medium tabular-nums sm:text-[10px]"
                      style={{ color: done ? console.ink : console.muted }}
                    >
                      {index + 1}/{deploySteps.length}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div
            className="mt-3 space-y-2.5 rounded-xl border p-2.5 sm:mt-4 sm:space-y-3 sm:p-3"
            style={{
              backgroundColor: console.panel,
              borderColor: `color-mix(in srgb, ${console.muted} 22%, ${console.well})`,
            }}
          >
            {lanes.map((lane) => (
              <motion.div
                key={lane.id}
                custom={reduced ? 0 : lane.delay}
                variants={laneIn}
                className="grid grid-cols-[4.5rem_1fr] items-center gap-2 sm:grid-cols-[5.5rem_1fr] sm:gap-3"
              >
                <div>
                  <p
                    className="text-[10px] font-medium leading-tight sm:text-[11px]"
                    style={{ color: console.ink }}
                  >
                    {lane.service}
                  </p>
                  <p
                    className="mt-0.5 text-[8px] leading-tight sm:text-[9px]"
                    style={{ color: console.muted }}
                  >
                    {lane.role}
                  </p>
                </div>

                <div className="relative h-7 overflow-hidden rounded-md sm:h-8">
                  <div
                    className="absolute inset-0 rounded-md"
                    style={{ backgroundColor: lane.fill }}
                  />
                  <motion.div
                    className="absolute inset-y-0 left-0 origin-left rounded-md"
                    style={{ backgroundColor: lane.tint, width: "100%" }}
                    custom={reduced ? 0 : lane.delay + 0.12}
                    variants={fillGrow}
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-end px-2"
                    aria-hidden="true"
                  >
                    <span
                      className="text-[8px] font-medium sm:text-[9px]"
                      style={{ color: console.panel }}
                    >
                      {lane.id === "ship" ? "live" : "ready"}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div
            className="mt-3 flex items-center justify-between gap-3 border-t px-0.5 pt-3 sm:mt-4 sm:pt-4"
            style={{ borderColor: `color-mix(in srgb, ${console.muted} 20%, ${console.well})` }}
          >
            <p className="text-[10px] leading-4 sm:text-[11px]" style={{ color: console.muted }}>
              One template ships auth, compute, data, and hosting together.
            </p>
            {!reduced ? (
              <motion.span
                aria-hidden="true"
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: console.lambda }}
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
            ) : (
              <span
                aria-hidden="true"
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: console.lambda }}
              />
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function CloudV4Mock2() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="cloud-v4-mock-2"
      aria-labelledby="cloud-v4-mock-2-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2
            id="cloud-v4-mock-2-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            Cloud expertise at scale
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            From Cognito sign-in to DynamoDB-backed APIs, I build serverless stacks
            on Lambda, Cognito, SAM, Amplify, and DynamoDB that stay up when traffic
            jumps.
            Auth, compute, and deploys land in one repeatable path you can run again
            without rebuilding from scratch. Ship with confidence.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Cloud capabilities">
            {capabilities.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-border/80 bg-surface/60 px-3 py-1.5 text-sm text-foreground"
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>

        <div aria-hidden="true">
          <DeployPipelineVisual reduced={reduced} />
        </div>
      </div>
    </section>
  );
}
