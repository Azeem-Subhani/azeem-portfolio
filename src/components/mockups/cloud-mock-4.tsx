"use client";

import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const copyIn: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: settle },
  },
};

const visualStage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.18 },
  },
};

const receiptIn: Variants = {
  hidden: { opacity: 0, y: 28, rotateX: 14, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.85, ease: settle },
  },
};

const stratumIn: Variants = {
  hidden: { opacity: 0, y: 22, scaleX: 0.88 },
  visible: {
    opacity: 1,
    y: 0,
    scaleX: 1,
    transition: { duration: 0.7, ease: settle },
  },
};

const pulseIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 0.75, duration: 0.4 },
  },
};

const countIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 320, damping: 22 },
  },
};

type Stratum = {
  id: string;
  label: string;
  detail: string;
  depth: number;
  width: string;
  accent: "accent" | "signal" | "success";
};

const strata: Stratum[] = [
  { id: "cognito", label: "Cognito", detail: "Session verified", depth: 0, width: "88%", accent: "signal" },
  { id: "lambda", label: "Lambda", detail: "84ms p95", depth: 1, width: "92%", accent: "accent" },
  { id: "dynamo", label: "DynamoDB", detail: "Ledger write", depth: 2, width: "96%", accent: "accent" },
  { id: "deploy", label: "SAM and Amplify", detail: "us-east-1", depth: 3, width: "100%", accent: "success" },
];

const accentClass: Record<Stratum["accent"], string> = {
  accent: "border-accent/35 bg-accent/10 text-accent",
  signal: "border-signal/35 bg-signal/10 text-signal",
  success: "border-success/35 bg-success/12 text-success",
};

function StratumPlate({ layer, index }: { layer: Stratum; index: number }) {
  const cls = accentClass[layer.accent];

  return (
    <motion.div
      className="relative mx-auto origin-center"
      style={{ width: layer.width, zIndex: 10 - index }}
      variants={stratumIn}
    >
      <div
        className={`relative overflow-hidden rounded-xl border px-4 py-3 shadow-[0_12px_28px_-18px_rgb(var(--shadow-color)/0.55),inset_0_1px_0_rgb(255_255_255/0.06)] backdrop-blur-sm ${cls}`}
        style={{
          transform: `translateY(${layer.depth * 10}px)`,
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -12deg,
              transparent,
              transparent 6px,
              color-mix(in srgb, currentColor 8%, transparent) 6px,
              color-mix(in srgb, currentColor 8%, transparent) 7px
            )`,
          }}
        />
        <div className="relative flex items-center justify-between gap-3">
          <span className="text-[11px] font-medium tracking-wide text-foreground">{layer.label}</span>
          <span className="text-[10px] text-muted-foreground">{layer.detail}</span>
        </div>
      </div>
    </motion.div>
  );
}

function PulsePath({ reduced }: { reduced: boolean }) {
  return (
    <motion.svg
      className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible"
      viewBox="0 0 200 320"
      fill="none"
      aria-hidden="true"
      variants={pulseIn}
    >
      <defs>
        <linearGradient id="cloud-mock4-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
          <stop offset="35%" stopColor="var(--accent)" stopOpacity="0.85" />
          <stop offset="100%" stopColor="var(--signal)" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      <path
        d="M100 52 C100 88, 100 112, 100 138 C100 168, 100 196, 100 228 C100 256, 100 276, 100 296"
        stroke="url(#cloud-mock4-beam)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="4 7"
        opacity="0.55"
      />

      {!reduced && (
        <motion.circle
          r="4"
          fill="var(--accent)"
          style={{ filter: "drop-shadow(0 0 6px rgb(42 161 152 / 0.9))" }}
          animate={{
            cx: [100, 100, 100, 100],
            cy: [52, 138, 228, 296],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2.4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1.2,
          }}
        />
      )}
    </motion.svg>
  );
}

function SettlementVisual({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-[22rem] md:max-w-[26rem]"
      style={{ perspective: 1200 }}
      variants={visualStage}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[42%] h-64 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-3xl"
      />

      <div className="dark relative" data-theme="dark">
        <div className="graph-paper absolute inset-0 rounded-3xl opacity-35" aria-hidden="true" />

        <div
          className="relative min-h-[28rem] overflow-hidden rounded-3xl border border-border/60 bg-surface/80 px-5 pb-8 pt-6 shadow-[0_0_0_1px_rgb(42_161_152/0.12),0_32px_64px_-36px_rgb(7_54_66/0.65)] backdrop-blur-sm md:min-h-[32rem] md:px-7 md:pb-10 md:pt-8"
          style={{ transformStyle: "preserve-3d" }}
        >
          <PulsePath reduced={reduced} />

          <motion.div
            className="relative z-30 mx-auto max-w-[15.5rem] origin-bottom"
            style={{ transformStyle: "preserve-3d" }}
            variants={receiptIn}
          >
            <div className="rounded-2xl bg-background p-[9px] shadow-[0_0_0_1px_rgb(42_161_152/0.22),0_24px_48px_-28px_rgb(0_0_0/0.75)]">
              <div className="relative overflow-hidden rounded-[0.85rem] bg-surface px-4 py-4">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-8 -top-10 size-28 rounded-full bg-accent/20 blur-2xl"
                />
                <p className="text-[10px] text-muted-foreground">Oak Hill Chapel</p>
                <p className="mt-0.5 text-[11px] text-foreground">Whitmore family contribution</p>
                <p className="mt-3 font-display text-[2.35rem] leading-none tracking-tight text-foreground">
                  $1,280
                </p>
                <div className="mt-3 flex items-center justify-between gap-2 border-t border-border/70 pt-3">
                  <span className="inline-flex items-center gap-1.5 text-[10px] text-accent">
                    <span className="relative flex size-1.5">
                      {!reduced && (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                      )}
                      <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                    </span>
                    Settled in 84ms
                  </span>
                  <span className="text-[10px] text-muted-foreground">Trust Commerce</span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="relative z-10 mt-8 space-y-2.5 md:mt-10">
            {strata.map((layer, index) => (
              <StratumPlate key={layer.id} layer={layer} index={index} />
            ))}
          </div>

          <motion.div
            className="relative z-30 mt-7 flex items-end justify-between gap-4 border-t border-border/50 pt-5"
            variants={countIn}
          >
            <div>
              <p className="font-display text-[2.5rem] leading-none tabular-nums text-foreground">512</p>
              <p className="mt-1 text-[11px] text-muted-foreground">authenticated payments today</p>
            </div>
            <p className="max-w-[9rem] text-right text-[10px] leading-4 text-muted-foreground">
              Memorial portal, live production traffic
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function CloudSectionMock4() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="cloud-mock-4"
      aria-labelledby="cloud-mock-4-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <motion.div
        className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20"
        variants={stage}
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-12% 0px" }}
      >
        <div>
          <motion.h2
            id="cloud-mock-4-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
            variants={copyIn}
          >
            Every payment verified before it settles
          </motion.h2>
          <motion.p
            className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg"
            variants={copyIn}
          >
            The memorial planning portal runs on Lambda, Cognito, SAM, Amplify, and DynamoDB.
            Over five hundred signed-in transactions clear through it daily. Oak Hill Chapel is
            one of them.
          </motion.p>
        </div>

        <div aria-hidden="true">
          <SettlementVisual reduced={reduced} />
        </div>
      </motion.div>
    </section>
  );
}
