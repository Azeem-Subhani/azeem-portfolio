"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";

import AnimatedContent from "@/components/react-bits/AnimatedContent";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.06 },
  },
};

const sheetIn: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: settle },
  },
};

const barGrow: Variants = {
  hidden: { scaleX: 0, opacity: 0.5 },
  visible: (delay: number) => ({
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.75, ease: settle, delay },
  }),
};

const totalDraw: Variants = {
  hidden: { scaleX: 0, opacity: 0.4 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: settle, delay: 0.95 },
  },
};

type Hop = {
  id: string;
  label: string;
  detail: string;
  ms: number;
  tone: "signal" | "accent" | "success";
  delay: number;
};

const hops: Hop[] = [
  {
    id: "cognito",
    label: "Cognito",
    detail: "User pool session",
    ms: 12,
    tone: "signal",
    delay: 0.18,
  },
  {
    id: "lambda",
    label: "Lambda",
    detail: "Charge handler",
    ms: 31,
    tone: "accent",
    delay: 0.32,
  },
  {
    id: "dynamo",
    label: "DynamoDB",
    detail: "Order record write",
    ms: 18,
    tone: "accent",
    delay: 0.46,
  },
  {
    id: "amplify",
    label: "Amplify",
    detail: "Hosted API route",
    ms: 9,
    tone: "signal",
    delay: 0.6,
  },
];

const maxMs = Math.max(...hops.map((h) => h.ms));

const toneBar: Record<Hop["tone"], string> = {
  signal: "bg-signal",
  accent: "bg-accent",
  success: "bg-success",
};

const toneText: Record<Hop["tone"], string> = {
  signal: "text-signal",
  accent: "text-accent",
  success: "text-success",
};

function LoadReportVisual({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[22rem] md:max-w-[26rem]">
      <motion.div
        className="relative overflow-hidden rounded-md border border-border bg-surface px-4 py-5 shadow-[inset_0_1px_0_rgb(253_246_227/0.6),0_18px_44px_-32px_rgb(7_54_66/0.35)] sm:px-5 sm:py-6"
        variants={stage}
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
      >
        <div
          aria-hidden="true"
          className="graph-paper pointer-events-none absolute inset-0 opacity-40"
        />

        <motion.div className="relative z-10" variants={sheetIn}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border/80 pb-3">
            <p className="text-[12px] font-medium text-foreground">
              Production load snapshot
            </p>
            <p className="tabular-nums text-[10px] text-muted-foreground">
              2026-09-08 14:32 UTC
            </p>
          </div>

          <div className="mt-4 space-y-3.5" role="list" aria-label="Service latency under load">
            {hops.map((hop) => {
              const width = `${Math.round((hop.ms / maxMs) * 100)}%`;
              return (
                <div key={hop.id} role="listitem">
                  <div className="flex items-baseline justify-between gap-3">
                    <div className="min-w-0">
                      <p className={`text-[12px] font-medium ${toneText[hop.tone]}`}>
                        {hop.label}
                      </p>
                      <p className="truncate text-[10px] text-muted-foreground">
                        {hop.detail}
                      </p>
                    </div>
                    <p className="shrink-0 tabular-nums text-[11px] text-foreground">
                      {hop.ms}ms
                    </p>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-sm bg-foreground/8">
                    <motion.div
                      className={`h-full origin-left rounded-sm ${toneBar[hop.tone]}`}
                      style={{ width }}
                      custom={reduced ? 0 : hop.delay}
                      variants={barGrow}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative mt-5 pt-4">
            <motion.div
              className="absolute inset-x-0 top-0 h-px origin-left bg-accent"
              variants={totalDraw}
              aria-hidden="true"
            />
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-display text-[2rem] leading-none tabular-nums text-foreground">
                  84ms
                </p>
                <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
                  End-to-end p95
                </p>
              </div>
              <div className="text-right">
                <p className="font-display text-[2rem] leading-none tabular-nums text-foreground">
                  500+
                </p>
                <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
                  Authenticated payments per day
                </p>
              </div>
            </div>
          </div>

          <p className="relative z-10 mt-5 border-t border-border/70 pt-3 text-[10px] leading-5 text-muted-foreground">
            Deployed with SAM and Amplify. Cognito on the auth path, Lambda and
            DynamoDB on checkout.
          </p>
        </motion.div>
      </motion.div>
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

export function CloudV3Mock3() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="cloud-v3-mock-3"
      aria-labelledby="cloud-v3-mock-3-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <ChapterMotion reverse>
            <h2
              id="cloud-v3-mock-3-title"
              className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
            >
              Serverless auth and payments in production
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
              I build on Lambda, Cognito, SAM, Amplify, and DynamoDB so your app
              handles signed-in users and real checkout without you running
              servers. The stack stays fast under daily payment traffic.
            </p>
          </ChapterMotion>
        </div>

        <div aria-hidden="true">
          <LoadReportVisual reduced={reduced} />
        </div>
      </div>
    </section>
  );
}
