"use client";

import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const frameIn: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: settle },
  },
};

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0.35 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.15, ease: settle },
  },
};

const seal: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 320, damping: 22, delay: 0.95 },
  },
};

const nodeIn: Variants = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: settle, delay },
  }),
};

type ServiceNode = {
  id: string;
  label: string;
  cx: number;
  cy: number;
  tone: "accent" | "signal";
  delay: number;
};

const nodes: ServiceNode[] = [
  { id: "cognito", label: "Cognito", cx: 62, cy: 132, tone: "signal", delay: 0.12 },
  { id: "lambda", label: "Lambda", cx: 118, cy: 72, tone: "accent", delay: 0.28 },
  { id: "sam", label: "SAM", cx: 200, cy: 48, tone: "accent", delay: 0.42 },
  { id: "amplify", label: "Amplify", cx: 282, cy: 72, tone: "accent", delay: 0.56 },
  { id: "dynamo", label: "DynamoDB", cx: 338, cy: 132, tone: "accent", delay: 0.72 },
];

const archPath =
  "M 36 168 C 36 72 92 32 200 32 C 308 32 364 72 364 168";

function toneFill(tone: ServiceNode["tone"]) {
  return tone === "signal" ? "var(--signal)" : "var(--accent)";
}

function PortalArchVisual({ reduced }: { reduced: boolean }) {
  return (
    <div
      className="relative mx-auto w-full max-w-[22rem] md:max-w-[26rem]"
      style={{ perspective: 1200 }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[46%] h-64 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-3xl"
      />

      <div className="dark relative" data-theme="dark">
        <motion.div
          className="relative overflow-hidden rounded-[1.75rem] border border-border/70 bg-background px-4 pb-5 pt-4 shadow-[0_0_0_1px_rgb(42_161_152/0.16),0_32px_64px_-36px_rgb(0_0_0/0.65)]"
          variants={stage}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-accent/12 to-transparent"
          />

          <motion.div variants={frameIn}>
            <svg
              viewBox="0 0 400 190"
              className="relative z-10 h-auto w-full"
              aria-hidden="true"
            >
              <motion.path
                d={archPath}
                fill="none"
                stroke="var(--border)"
                strokeWidth="1.5"
                strokeLinecap="round"
                variants={draw}
              />
              <motion.path
                d={archPath}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2.5"
                strokeLinecap="round"
                variants={draw}
                style={{ filter: "drop-shadow(0 0 6px rgb(42 161 152 / 0.45))" }}
              />

              {nodes.map((node) => (
                <motion.g
                  key={node.id}
                  custom={reduced ? 0 : node.delay}
                  variants={nodeIn}
                >
                  <circle
                    cx={node.cx}
                    cy={node.cy}
                    r="14"
                    fill="var(--surface-elevated)"
                    stroke={toneFill(node.tone)}
                    strokeWidth="1.5"
                  />
                  <text
                    x={node.cx}
                    y={node.cy + 28}
                    textAnchor="middle"
                    fill="var(--muted)"
                    fontSize="9"
                    fontFamily="var(--font-h2), sans-serif"
                    fontWeight="500"
                  >
                    {node.label}
                  </text>
                </motion.g>
              ))}
            </svg>
          </motion.div>

          <motion.div
            className="relative z-20 -mt-6 px-2 text-center sm:-mt-8"
            variants={seal}
          >
            <p className="text-[10px] text-muted-foreground">Oak Hill Chapel</p>
            <p className="mt-0.5 text-[11px] text-foreground">Whitmore family contribution</p>
            <p className="mt-2 font-display text-[clamp(2.6rem,8vw,3.35rem)] leading-none tracking-tight text-foreground">
              $1,280
            </p>
            <p className="mt-2 text-[11px] text-accent">Settled in 84ms</p>
          </motion.div>

          <motion.div
            className="relative z-20 mt-4 flex items-end justify-between gap-4 border-t border-border/50 pt-4"
            variants={seal}
          >
            <div>
              <p className="font-display text-[2.25rem] leading-none tabular-nums text-foreground">
                512
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">authenticated payments today</p>
            </div>
            <p className="max-w-[8.5rem] text-right text-[10px] leading-4 text-muted-foreground">
              Memorial planning portal, production traffic
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export function CloudR2Mock1() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="cloud-r2-mock-1"
      aria-labelledby="cloud-r2-mock-1-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2
            id="cloud-r2-mock-1-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            Memorial payments clear in milliseconds
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            I run Lambda, Cognito, SAM, Amplify, and DynamoDB on the planning portal
            families use after a loss. More than five hundred authenticated charges go
            through it every day. At Oak Hill Chapel, the Whitmore family&apos;s $1,280
            contribution settled in 84ms.
          </p>
        </div>

        <div aria-hidden="true">
          <PortalArchVisual reduced={reduced} />
        </div>
      </div>
    </section>
  );
}
