"use client";

import AnimatedContent from "@/components/react-bits/AnimatedContent";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { motion, type Variants } from "motion/react";

const settle = [0.16, 1, 0.3, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.04 },
  },
};

const panelIn: Variants = {
  hidden: { opacity: 0, y: 28, rotateX: 14, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 6,
    scale: 1,
    transition: { duration: 0.9, ease: settle },
  },
};

const pass: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 10 },
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
    transition: { type: "spring", stiffness: 360, damping: 20 },
  },
};

const spanGrow: Variants = {
  hidden: { scaleX: 0, opacity: 0.4 },
  visible: (durationMs: number) => ({
    scaleX: 1,
    opacity: 1,
    transition: { duration: durationMs / 1000, ease: settle },
  }),
};

const sweep: Variants = {
  hidden: { left: "0%", opacity: 0 },
  visible: {
    left: "100%",
    opacity: [0, 1, 1, 0],
    transition: { duration: 1.1, ease: settle, delay: 0.35 },
  },
};

const traces = [
  { label: "Cognito", detail: "session verify", ms: 14, tone: "signal" as const },
  { label: "Lambda", detail: "charge handler", ms: 38, tone: "accent" as const },
  { label: "DynamoDB", detail: "ledger write", ms: 16, tone: "accent" as const },
  { label: "Trust Commerce", detail: "settlement", ms: 16, tone: "success" as const },
];

const stack = ["Lambda", "Cognito", "SAM", "Amplify", "DynamoDB"];

const toneBar: Record<(typeof traces)[number]["tone"], string> = {
  signal: "bg-signal",
  accent: "bg-accent",
  success: "bg-success",
};

function CloudTraceVisual() {
  const reduced = usePrefersReducedMotion();
  const totalMs = traces.reduce((sum, row) => sum + row.ms, 0);

  return (
    <div
      className="relative mx-auto w-full max-w-[22rem] md:max-w-[26rem]"
      style={{ perspective: 1200 }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[42%] h-64 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-3xl"
      />

      <div className="dark relative" data-theme="dark">
        <motion.div
          className="relative min-h-[34rem] md:min-h-[36rem]"
          style={{ transformStyle: "preserve-3d" }}
          variants={stage}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <motion.div
            className="relative origin-top rounded-[1.35rem] border border-border/80 bg-surface p-4 shadow-[0_0_0_1px_rgb(42_161_152/0.12),0_32px_60px_-28px_rgb(0_0_0/0.65)] md:p-5"
            style={{ transformStyle: "preserve-3d" }}
            variants={panelIn}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-4 top-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent"
            />

            <motion.div className="flex items-start justify-between gap-3" variants={fade}>
              <div>
                <p className="text-[11px] text-muted-foreground">Memorial planning portal</p>
                <p className="mt-0.5 font-display text-xl leading-tight text-foreground">
                  Oak Hill Chapel
                </p>
                <p className="mt-1 text-[12px] text-muted-foreground">Whitmore family</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-2.5 py-1 text-[10px] font-medium text-success">
                <span className="relative flex size-1.5">
                  {!reduced && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                  )}
                  <span className="relative inline-flex size-1.5 rounded-full bg-success" />
                </span>
                Settled
              </span>
            </motion.div>

            <motion.div
              className="relative mt-5 overflow-hidden rounded-2xl bg-background px-4 py-5"
              variants={pop}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-10 size-28 rounded-full bg-accent/20 blur-2xl"
              />
              <p className="text-[11px] text-muted-foreground">Payment amount</p>
              <p className="mt-1 font-display text-[clamp(2.6rem,7vw,3.4rem)] leading-none tracking-tight text-foreground">
                $1,280
              </p>
              <p className="mt-2 text-[12px] text-accent">settled in 84ms</p>
            </motion.div>

            <motion.div className="mt-5" variants={pass}>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="font-display text-3xl leading-none tabular-nums text-foreground">
                    512
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">payments today</p>
                </div>
                <p className="max-w-[9rem] text-right text-[10px] leading-4 text-muted-foreground">
                  us-east-1 · authenticated checkout
                </p>
              </div>
            </motion.div>

            <motion.div
              className="relative mt-6 overflow-hidden rounded-xl border border-border/70 bg-background/70 p-3.5 backdrop-blur-sm"
              variants={fade}
            >
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-[11px] font-medium text-foreground">Request trace</p>
                <p className="font-display text-lg leading-none tabular-nums text-accent">
                  {totalMs}ms
                </p>
              </div>

              <motion.div className="relative mt-4 space-y-3" variants={pass}>
                {traces.map((row) => {
                  const widthPct = (row.ms / totalMs) * 100;
                  return (
                    <motion.div key={row.label} variants={fade}>
                      <div className="flex items-baseline justify-between gap-2 text-[10px]">
                        <span className="text-foreground">{row.label}</span>
                        <span className="tabular-nums text-muted-foreground">{row.ms}ms</span>
                      </div>
                      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-elevated">
                        <motion.div
                          className={`h-full origin-left rounded-full ${toneBar[row.tone]}`}
                          style={{ width: `${widthPct}%` }}
                          custom={reduced ? 0 : row.ms * 4}
                          variants={spanGrow}
                        />
                      </div>
                      <p className="mt-1 text-[9px] text-muted-foreground">{row.detail}</p>
                    </motion.div>
                  );
                })}

                {!reduced && (
                  <motion.span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-3 w-px bg-accent shadow-[0_0_12px_rgb(42_161_152/0.8)]"
                    variants={sweep}
                  />
                )}
              </motion.div>
            </motion.div>

            <motion.div className="mt-4 flex flex-wrap gap-1.5" variants={pass}>
              {stack.map((item) => (
                <motion.span
                  key={item}
                  className="rounded-md border border-border/60 bg-surface-elevated/80 px-2 py-1 text-[9px] font-medium text-muted-foreground"
                  variants={pop}
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            aria-hidden="true"
            className="absolute -bottom-3 left-6 right-6 h-8 rounded-[1.35rem] bg-surface-elevated/40 blur-md"
            variants={fade}
          />
        </motion.div>
      </div>
    </div>
  );
}

export function CloudSectionMock2() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="cloud"
      aria-labelledby="cloud-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div>
          {reduced ? (
            <>
              <h2
                id="cloud-title"
                className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
              >
                Five hundred payments a day on AWS
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
                The memorial planning portal I built runs on Lambda, Cognito, SAM, Amplify, and
                DynamoDB. It handles 500+ authenticated payments daily. When the Whitmore family
                paid $1,280 at Oak Hill Chapel, settlement finished in 84ms.
              </p>
            </>
          ) : (
            <AnimatedContent direction="horizontal" reverse distance={40} duration={0.75} ease="power2.out" threshold={0.2}>
              <h2
                id="cloud-title"
                className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
              >
                Five hundred payments a day on AWS
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
                The memorial planning portal I built runs on Lambda, Cognito, SAM, Amplify, and
                DynamoDB. It handles 500+ authenticated payments daily. When the Whitmore family
                paid $1,280 at Oak Hill Chapel, settlement finished in 84ms.
              </p>
            </AnimatedContent>
          )}
        </div>
        <div aria-hidden="true">
          <CloudTraceVisual />
        </div>
      </div>
    </section>
  );
}
