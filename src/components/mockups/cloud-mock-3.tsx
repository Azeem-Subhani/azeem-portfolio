"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";

import AnimatedContent from "@/components/react-bits/AnimatedContent";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const panelIn: Variants = {
  hidden: { opacity: 0, rotateX: 14, rotateZ: -3, y: 48, scale: 0.94 },
  visible: {
    opacity: 1,
    rotateX: 8,
    rotateZ: -2,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: settle },
  },
};

const receiptIn: Variants = {
  hidden: { opacity: 0, x: 28, rotateY: -18, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: -6,
    scale: 1,
    transition: { duration: 0.85, ease: settle, delay: 0.18 },
  },
};

const lanePass: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.35 } },
};

const laneIn: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: settle },
  },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: settle },
  },
};

const pop: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 360, damping: 18 },
  },
};

type ServiceLane = {
  id: string;
  label: string;
  detail: string;
  ms: number;
  tone: "accent" | "signal" | "success";
};

const lanes: ServiceLane[] = [
  { id: "cognito", label: "Cognito", detail: "Whitmore family session", ms: 12, tone: "signal" },
  { id: "lambda", label: "Lambda", detail: "charge handler", ms: 31, tone: "accent" },
  { id: "dynamo", label: "DynamoDB", detail: "ledger write", ms: 18, tone: "accent" },
  { id: "amplify", label: "Amplify", detail: "portal API", ms: 9, tone: "signal" },
  { id: "sam", label: "SAM", detail: "us-east-1 stack", ms: 14, tone: "success" },
];

const toneStyles = {
  accent: {
    dot: "bg-accent shadow-[0_0_12px_rgb(42_161_152/0.65)]",
    bar: "bg-accent/70",
    chip: "bg-accent/15 text-accent",
  },
  signal: {
    dot: "bg-signal shadow-[0_0_12px_rgb(38_139_210/0.55)]",
    bar: "bg-signal/60",
    chip: "bg-signal/15 text-signal",
  },
  success: {
    dot: "bg-success shadow-[0_0_10px_rgb(133_153_0/0.5)]",
    bar: "bg-success/55",
    chip: "bg-success/15 text-success",
  },
};

function PulsePath({ reduced }: { reduced: boolean }) {
  return (
    <svg
      viewBox="0 0 280 340"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cloud-mock3-trace" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgb(42 161 152 / 0)" />
          <stop offset="35%" stopColor="rgb(42 161 152 / 0.55)" />
          <stop offset="100%" stopColor="rgb(38 139 210 / 0.35)" />
        </linearGradient>
      </defs>
      <path
        d="M 228 42 C 228 90, 52 110, 52 168 C 52 226, 228 246, 228 298"
        fill="none"
        stroke="url(#cloud-mock3-trace)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.45"
      />
      {!reduced && (
        <circle r="5" fill="rgb(42 161 152)">
          <animateMotion
            dur="2.8s"
            repeatCount="indefinite"
            path="M 228 42 C 228 90, 52 110, 52 168 C 52 226, 228 246, 228 298"
          />
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2.8s" repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  );
}

function ServiceLanes({ reduced }: { reduced: boolean }) {
  return (
    <motion.div className="relative mt-5 space-y-2.5" variants={lanePass}>
      {lanes.map((lane, index) => {
        const tone = toneStyles[lane.tone];
        return (
          <motion.div
            key={lane.id}
            className="group relative flex items-center gap-3 rounded-xl border border-foreground/8 bg-background/40 px-3 py-2.5 backdrop-blur-sm"
            variants={laneIn}
          >
            <span className={`size-2 shrink-0 rounded-full ${tone.dot}`} />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-[12px] font-medium text-foreground">{lane.label}</p>
                <p className="shrink-0 tabular-nums text-[11px] text-muted-foreground">{lane.ms}ms</p>
              </div>
              <p className="truncate text-[10px] text-muted-foreground">{lane.detail}</p>
            </div>
            <div className="absolute inset-x-3 bottom-0 h-px overflow-hidden rounded-full bg-foreground/6">
              <motion.div
                className={`h-full origin-left rounded-full ${tone.bar}`}
                initial={{ scaleX: 0 }}
                animate={reduced ? { scaleX: 1 } : { scaleX: 1 }}
                transition={{ duration: 0.6, ease: settle, delay: 0.5 + index * 0.12 }}
                style={{ transformOrigin: "left" }}
              />
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function ReceiptCard({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="absolute -right-2 top-6 z-30 w-[11.5rem] origin-center sm:-right-6 sm:w-[12.5rem]"
      style={{ transformStyle: "preserve-3d" }}
      variants={receiptIn}
    >
      <div className="rounded-2xl bg-background p-[7px] shadow-[0_0_0_1px_rgb(42_161_152/0.22),0_24px_48px_-20px_rgb(0_43_54/0.7)]">
        <div className="relative overflow-hidden rounded-[0.85rem] bg-surface px-3.5 py-3.5">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 -top-10 size-28 rounded-full bg-accent/20 blur-2xl"
          />
          <p className="text-[10px] text-muted-foreground">Oak Hill Chapel</p>
          <p className="mt-0.5 text-[11px] text-foreground">Whitmore family</p>
          <p className="mt-3 font-display text-[2.35rem] leading-none tracking-tight text-foreground">
            $1,280
          </p>
          <div className="mt-3 flex items-center justify-between border-t border-border/80 pt-2.5">
            <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${toneStyles.accent.chip}`}>
              settled
            </span>
            <span className="tabular-nums text-[11px] font-medium text-accent">84ms</span>
          </div>
          {!reduced && (
            <motion.span
              className="pointer-events-none absolute -left-1 top-1/2 size-2 rounded-full bg-accent shadow-[0_0_14px_rgb(42_161_152/0.8)]"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1.15, 0.85] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

function TracePanel({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem]" style={{ perspective: 1200 }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[55%] h-64 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-3xl"
      />

      <div className="dark relative" data-theme="dark">
        <motion.div
          className="relative min-h-[26rem] sm:min-h-[28rem]"
          variants={stage}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <ReceiptCard reduced={reduced} />

          <motion.div
            className="relative mx-auto mt-8 w-full max-w-[19rem] origin-center sm:max-w-[21rem]"
            style={{ transformStyle: "preserve-3d" }}
            variants={panelIn}
          >
            <div className="rounded-[1.35rem] bg-background p-[8px] shadow-[0_0_0_1px_rgb(42_161_152/0.18),0_32px_60px_-28px_rgb(0_43_54/0.65)]">
              <div className="relative overflow-hidden rounded-[1rem] bg-surface px-4 pb-4 pt-3.5">
                <div
                  aria-hidden="true"
                  className="graph-paper pointer-events-none absolute inset-0 opacity-35"
                />
                <PulsePath reduced={reduced} />

                <motion.div className="relative flex items-start justify-between gap-3" variants={fade}>
                  <div>
                    <p className="text-[11px] text-muted-foreground">Memorial portal</p>
                    <p className="font-display text-2xl leading-none text-foreground">512</p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">auth payments today</p>
                  </div>
                  <motion.div
                    className="rounded-xl border border-accent/25 bg-accent/10 px-2.5 py-1.5 text-right"
                    variants={pop}
                  >
                    <p className="text-[9px] text-muted-foreground">p95 latency</p>
                    <p className="tabular-nums text-[13px] font-medium text-accent">84ms</p>
                  </motion.div>
                </motion.div>

                <ServiceLanes reduced={reduced} />

                <motion.div
                  className="relative mt-4 flex items-center justify-between rounded-lg border border-foreground/8 bg-background/50 px-3 py-2"
                  variants={fade}
                >
                  <p className="text-[10px] text-muted-foreground">Region us-east-1</p>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex size-1.5">
                      {!reduced && (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                      )}
                      <span className="relative inline-flex size-1.5 rounded-full bg-success" />
                    </span>
                    <span className="text-[10px] font-medium text-success">live</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function ChapterMotion({
  reverse,
  children,
}: {
  reverse: boolean;
  children: ReactNode;
}) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return children;

  return (
    <AnimatedContent
      direction="horizontal"
      reverse={reverse}
      distance={40}
      duration={0.75}
      ease="power2.out"
      threshold={0.2}
    >
      {children}
    </AnimatedContent>
  );
}

export function CloudSectionMock3() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="cloud"
      aria-labelledby="cloud-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <ChapterMotion reverse>
            <h2
              id="cloud-title"
              className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
            >
              Cloud expertise at scale
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
              Serverless on AWS with Lambda, Cognito, SAM, Amplify, and DynamoDB.
              The memorial planning portal handles 500+ authenticated payments
              every day — Oak Hill Chapel&apos;s last one cleared $1,280 in 84
              milliseconds.
            </p>
          </ChapterMotion>
        </div>

        <div aria-hidden="true">
          <TracePanel reduced={reduced} />
        </div>
      </div>
    </section>
  );
}
