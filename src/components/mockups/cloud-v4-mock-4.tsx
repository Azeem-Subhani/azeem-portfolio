"use client";

import { motion, type Variants } from "motion/react";

import { useInViewOnce } from "@/hooks/use-in-view-once";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

/**
 * Mock-local trace console. The values come from the page theme so the console
 * reads as a light trace panel on a light page and as the original oxidized
 * slate in dark mode, instead of being locked dark in both.
 */
const trace = {
  chassis: "var(--panel-chassis)",
  panel: "var(--panel-inset)",
  well: "var(--panel-well)",
  ink: "var(--panel-ink)",
  muted: "var(--panel-muted)",
  grid: "var(--panel-grid)",
} as const;

const capabilities = ["Route-level auth", "SAM deploy pipeline", "Write path metrics"] as const;

type Span = {
  id: string;
  label: string;
  detail: string;
  ms: number;
  tone: "signal" | "accent" | "success" | "muted";
  delay: number;
};

const spans: Span[] = [
  {
    id: "cognito",
    label: "Cognito",
    detail: "JWT validated",
    ms: 12,
    tone: "signal",
    delay: 0.28,
  },
  {
    id: "lambda",
    label: "Lambda",
    detail: "Charge handler",
    ms: 31,
    tone: "accent",
    delay: 0.4,
  },
  {
    id: "dynamo",
    label: "DynamoDB",
    detail: "Order put item",
    ms: 18,
    tone: "accent",
    delay: 0.52,
  },
  {
    id: "amplify",
    label: "Amplify",
    detail: "Edge response",
    ms: 9,
    tone: "muted",
    delay: 0.64,
  },
];

const totalMs = spans.reduce((sum, span) => sum + span.ms, 0);
const maxMs = Math.max(...spans.map((s) => s.ms));

const toneBar: Record<Span["tone"], string> = {
  signal: "bg-signal",
  accent: "bg-accent",
  success: "bg-success",
  muted: "bg-foreground/45",
};

const toneText: Record<Span["tone"], string> = {
  signal: "text-signal",
  accent: "text-accent",
  success: "text-success",
  muted: "text-muted-foreground",
};

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

const barGrow: Variants = {
  hidden: { scaleX: 0, opacity: 0.45 },
  visible: (delay: number) => ({
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.72, ease: settle, delay },
  }),
};

const rowIn: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.42, ease: settle, delay },
  }),
};

const totalDraw: Variants = {
  hidden: { scaleX: 0, opacity: 0.35 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.85, ease: settle, delay: 0.78 },
  },
};

export function TraceWaterfallVisual({
  reduced,
  playOnMount = false,
}: {
  /** Overrides the in-view gate, for previews that own their own timing. */
  reduced: boolean;
  playOnMount?: boolean;
}) {
  const { ref: panelRef, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <div className="relative mx-auto w-full max-w-[20rem] md:max-w-[26rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[44%] h-60 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "color-mix(in srgb, #268bd2 16%, transparent)" }}
      />

      <div className="relative">
        <motion.div
          ref={panelRef}
          className="relative overflow-hidden rounded-[1.65rem] border border-border/50 px-4 py-5 shadow-[0_0_0_1px_rgb(38_139_210/0.1),0_28px_56px_-30px_rgb(21_40_48/0.85)] sm:px-5 sm:py-6"
          style={{ backgroundColor: trace.chassis }}
          variants={stage}
          initial={reduced ? false : "hidden"}
          animate={reduced || playOnMount || inView ? "visible" : "hidden"}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage: `
                linear-gradient(to right, ${trace.grid} 1px, transparent 1px),
                linear-gradient(to bottom, ${trace.grid} 1px, transparent 1px)
              `,
              backgroundSize: "16px 16px",
            }}
          />

          <motion.div variants={panelIn} className="relative z-10">
            <div
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b pb-3.5"
              style={{ borderColor: "rgb(238 232 213 / 0.1)" }}
            >
              <div>
                <p className="text-[11px]" style={{ color: trace.muted }}>
                  Request trace
                </p>
                <p
                  className="mt-0.5 font-display text-[1.35rem] leading-none sm:text-[1.5rem]"
                  style={{ color: trace.ink }}
                >
                  POST /checkout
                </p>
              </div>
              <p className="text-right">
                <span
                  className="font-display text-[1.65rem] leading-none tabular-nums sm:text-[1.85rem]"
                  style={{ color: trace.ink }}
                >
                  {totalMs}ms
                </span>
                <span className="mt-0.5 block text-[10px]" style={{ color: trace.muted }}>
                  end to end
                </span>
              </p>
            </div>

            <div
              className="mt-5 space-y-3.5"
              role="list"
              aria-label="Latency breakdown across serverless services"
            >
              {spans.map((span) => {
                const width = `${Math.round((span.ms / maxMs) * 100)}%`;
                return (
                  <motion.div
                    key={span.id}
                    role="listitem"
                    custom={reduced ? 0 : span.delay}
                    variants={rowIn}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="min-w-0">
                        <p className={`text-[12px] font-medium ${toneText[span.tone]}`}>
                          {span.label}
                        </p>
                        <p
                          className="truncate text-[10px]"
                          style={{ color: trace.muted }}
                        >
                          {span.detail}
                        </p>
                      </div>
                      <p
                        className="shrink-0 tabular-nums text-[11px]"
                        style={{ color: trace.ink }}
                      >
                        {span.ms}ms
                      </p>
                    </div>
                    <div
                      className="relative mt-1.5 h-2.5 overflow-hidden rounded-sm"
                      style={{ backgroundColor: trace.well }}
                    >
                      <motion.div
                        className={`absolute inset-y-0 left-0 origin-left rounded-sm ${toneBar[span.tone]}`}
                        style={{ width }}
                        custom={reduced ? 0 : span.delay + 0.08}
                        variants={barGrow}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="relative mt-5 pt-4">
              <motion.div
                className="absolute inset-x-0 top-0 h-px origin-left bg-signal/70"
                variants={totalDraw}
                aria-hidden="true"
              />
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p
                    className="font-display text-[1.75rem] leading-none tabular-nums sm:text-[2rem]"
                    style={{ color: trace.ink }}
                  >
                    500+
                  </p>
                  <p className="mt-1 text-[11px] leading-4" style={{ color: trace.muted }}>
                    Authenticated requests per day
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className="font-display text-[1.75rem] leading-none tabular-nums sm:text-[2rem]"
                    style={{ color: trace.ink }}
                  >
                    SAM
                  </p>
                  <p className="mt-1 text-[11px] leading-4" style={{ color: trace.muted }}>
                    deploys all five services
                  </p>
                </div>
              </div>
            </div>

            <div
              className="mt-4 rounded-lg px-3 py-2.5"
              style={{ backgroundColor: trace.panel }}
            >
              <p className="text-[10px] leading-4" style={{ color: trace.muted }}>
                Cognito gates the route. Lambda runs the charge. DynamoDB holds
                the write. Amplify serves the API. One stack, measured hop by hop.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export function CloudV4Mock4() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="cloud-v4-mock-4"
      aria-labelledby="cloud-v4-mock-4-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2
            id="cloud-v4-mock-4-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            Cloud expertise at scale
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            From API routes behind Cognito to DynamoDB writes in production, I
            architect and deploy serverless stacks on Lambda, SAM, Amplify, and
            DynamoDB. I trace the auth gate, the compute slice, and the store
            write so latency has a name before users hit it.
          </p>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
            Five AWS services ship as one SAM deploy. Your team runs the stack
            daily without me on call.
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
          <TraceWaterfallVisual reduced={reduced} />
        </div>
      </div>
    </section>
  );
}
