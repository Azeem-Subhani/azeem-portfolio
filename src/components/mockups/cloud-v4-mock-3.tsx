"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";

import AnimatedContent from "@/components/react-bits/AnimatedContent";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const capabilities = [
  "Auto-scaling compute",
  "Signed-in checkout",
  "IaC releases",
] as const;

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

const arcDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0.4 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.05, ease: settle, delay: 0.22 },
  },
};

const statIn: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: settle, delay },
  }),
};

const GAUGE_RADIUS = 88;
const GAUGE_CENTER = { x: 120, y: 112 };
const HEADROOM_RATIO = 0.847;

function gaugeArc(ratio: number) {
  const start = Math.PI;
  const end = start + Math.PI * ratio;
  const x1 = GAUGE_CENTER.x + GAUGE_RADIUS * Math.cos(start);
  const y1 = GAUGE_CENTER.y + GAUGE_RADIUS * Math.sin(start);
  const x2 = GAUGE_CENTER.x + GAUGE_RADIUS * Math.cos(end);
  const y2 = GAUGE_CENTER.y + GAUGE_RADIUS * Math.sin(end);
  const largeArc = ratio > 0.5 ? 1 : 0;
  return `M ${x1} ${y1} A ${GAUGE_RADIUS} ${GAUGE_RADIUS} 0 ${largeArc} 1 ${x2} ${y2}`;
}

function ScaleHeadroomVisual({ reduced }: { reduced: boolean }) {
  const trackPath = gaugeArc(1);
  const fillPath = gaugeArc(HEADROOM_RATIO);

  return (
    <div className="relative mx-auto w-full max-w-[20rem] md:max-w-[24rem]">
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
              Concurrent execution headroom
            </p>
            <p className="tabular-nums text-[10px] text-muted-foreground">
              us-east-1 · peak hour
            </p>
          </div>

          <div className="relative mx-auto mt-2 w-full max-w-[15rem]">
            <svg
              viewBox="0 0 240 148"
              className="h-auto w-full"
              role="img"
              aria-label="Semi-circular gauge showing 847 of 1000 concurrent Lambda executions at peak hour"
            >
              <path
                d={trackPath}
                fill="none"
                stroke="rgb(7 54 66 / 0.1)"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <motion.path
                d={fillPath}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="14"
                strokeLinecap="round"
                variants={arcDraw}
                style={{
                  filter: "drop-shadow(0 0 6px rgb(42 161 152 / 0.35))",
                }}
              />
              <text
                x={GAUGE_CENTER.x}
                y={GAUGE_CENTER.y - 6}
                textAnchor="middle"
                fill="var(--foreground)"
                fontSize="34"
                fontFamily="var(--font-display), ui-serif, Georgia, serif"
                fontWeight="400"
              >
                847
              </text>
              <text
                x={GAUGE_CENTER.x}
                y={GAUGE_CENTER.y + 14}
                textAnchor="middle"
                fill="var(--muted-foreground)"
                fontSize="10"
                fontFamily="var(--font-sans), ui-sans-serif, system-ui, sans-serif"
              >
                of 1,000 concurrent
              </text>
              <text
                x="28"
                y="132"
                fill="var(--muted-foreground)"
                fontSize="9"
                fontFamily="var(--font-sans), ui-sans-serif, system-ui, sans-serif"
              >
                baseline
              </text>
              <text
                x="196"
                y="132"
                textAnchor="end"
                fill="var(--accent)"
                fontSize="9"
                fontFamily="var(--font-sans), ui-sans-serif, system-ui, sans-serif"
              >
                limit
              </text>
            </svg>
          </div>

          <div className="mt-1 grid grid-cols-3 gap-2 border-t border-border/70 pt-4">
            <motion.div custom={reduced ? 0 : 0.72} variants={statIn}>
              <p className="font-display text-[1.35rem] leading-none tabular-nums text-foreground">
                0
              </p>
              <p className="mt-1 text-[10px] leading-4 text-muted-foreground">
                throttles this hour
              </p>
            </motion.div>
            <motion.div custom={reduced ? 0 : 0.84} variants={statIn}>
              <p className="font-display text-[1.35rem] leading-none tabular-nums text-foreground">
                84ms
              </p>
              <p className="mt-1 text-[10px] leading-4 text-muted-foreground">
                p95 at peak load
              </p>
            </motion.div>
            <motion.div custom={reduced ? 0 : 0.96} variants={statIn}>
              <p className="font-display text-[1.35rem] leading-none tabular-nums text-success">
                +12×
              </p>
              <p className="mt-1 text-[10px] leading-4 text-muted-foreground">
                vs quiet baseline
              </p>
            </motion.div>
          </div>

          <p className="mt-4 text-[10px] leading-5 text-muted-foreground">
            Lambda scales out. Cognito, DynamoDB, and Amplify stay on the same
            release. SAM template v14 shipped two hours ago.
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

export function CloudV4Mock3() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="cloud-v4-mock-3"
      aria-labelledby="cloud-v4-mock-3-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <ChapterMotion reverse>
            <h2
              id="cloud-v4-mock-3-title"
              className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
            >
              Cloud expertise at scale
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
              From signed-in sessions to checkout spikes at peak hour, I
              architect, deploy, and tune Lambda, Cognito, SAM, Amplify, and
              DynamoDB. Auth, compute, and storage absorb traffic without you
              watching concurrency charts. Scale with confidence.
            </p>
            <ul
              className="mt-6 flex flex-wrap gap-2"
              aria-label="Cloud capabilities"
            >
              {capabilities.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-border/80 bg-surface/60 px-3 py-1.5 text-sm text-foreground"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </ChapterMotion>
        </div>

        <div aria-hidden="true">
          <ScaleHeadroomVisual reduced={reduced} />
        </div>
      </div>
    </section>
  );
}
