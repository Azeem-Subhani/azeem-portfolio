"use client";

import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.08 },
  },
};

const panelIn: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: settle },
  },
};

const spineDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0.4 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.4, ease: settle, delay: 0.25 },
  },
};

const nodeSettle: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: settle, delay },
  }),
};

type StackLayer = {
  id: string;
  label: string;
  detail: string;
  y: number;
  tone: "signal" | "accent" | "success";
  delay: number;
};

const layers: StackLayer[] = [
  {
    id: "cognito",
    label: "Cognito",
    detail: "Authenticated users",
    y: 48,
    tone: "signal",
    delay: 0.55,
  },
  {
    id: "lambda",
    label: "Lambda",
    detail: "API compute",
    y: 118,
    tone: "accent",
    delay: 0.72,
  },
  {
    id: "dynamo",
    label: "DynamoDB",
    detail: "User and order records",
    y: 188,
    tone: "accent",
    delay: 0.88,
  },
  {
    id: "deploy",
    label: "SAM · Amplify",
    detail: "Deploy pipeline",
    y: 258,
    tone: "success",
    delay: 1.04,
  },
];

const spinePath = "M 200 28 L 200 290";

function toneStroke(tone: StackLayer["tone"]) {
  if (tone === "signal") return "var(--signal)";
  if (tone === "success") return "var(--success)";
  return "var(--accent)";
}

function toneBg(tone: StackLayer["tone"]) {
  if (tone === "signal") return "rgb(38 139 210 / 0.14)";
  if (tone === "success") return "rgb(133 153 0 / 0.14)";
  return "rgb(42 161 152 / 0.14)";
}

function StackTraceVisual({ reduced }: { reduced: boolean }) {
  return (
    <div
      className="relative mx-auto w-full max-w-[20rem] md:max-w-[24rem]"
      style={{ perspective: 1200 }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[44%] h-72 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/22 blur-3xl"
      />

      <div className="dark relative" data-theme="dark">
        <motion.div
          className="relative overflow-hidden rounded-[1.75rem] border border-border/60 bg-background px-4 pb-5 pt-4 shadow-[0_0_0_1px_rgb(42_161_152/0.14),0_32px_64px_-36px_rgb(0_0_0/0.6)]"
          variants={stage}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-accent/10 to-transparent"
          />

          <motion.div variants={panelIn}>
            <div className="relative z-10 mb-3 flex items-baseline justify-between gap-3 px-1">
              <p className="text-[11px] text-muted-foreground">Production stack</p>
              <span className="inline-flex items-center gap-1.5 text-[10px] text-accent">
                <span className="relative flex size-1.5">
                  {!reduced ? (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  ) : null}
                  <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                </span>
                Live traffic
              </span>
            </div>

            <svg
              viewBox="0 0 400 320"
              className="relative z-10 h-auto w-full"
              role="img"
              aria-label="Serverless stack from Cognito auth through Lambda and DynamoDB to production checkout"
            >
              <motion.path
                d={spinePath}
                fill="none"
                stroke="var(--border)"
                strokeWidth="2"
                strokeLinecap="round"
                variants={spineDraw}
              />
              <motion.path
                d={spinePath}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2.5"
                strokeLinecap="round"
                variants={spineDraw}
                style={{ filter: "drop-shadow(0 0 5px rgb(42 161 152 / 0.4))" }}
              />

              {layers.map((layer) => (
                <motion.g
                  key={layer.id}
                  custom={reduced ? 0 : layer.delay}
                  variants={nodeSettle}
                >
                  <line
                    x1="200"
                    y1={layer.y}
                    x2="128"
                    y2={layer.y}
                    stroke="var(--border)"
                    strokeWidth="1"
                    strokeDasharray="3 4"
                    opacity="0.7"
                  />
                  <rect
                    x="24"
                    y={layer.y - 22}
                    width="104"
                    height="44"
                    rx="10"
                    fill={toneBg(layer.tone)}
                    stroke={toneStroke(layer.tone)}
                    strokeWidth="1.2"
                  />
                  <text
                    x="76"
                    y={layer.y - 4}
                    textAnchor="middle"
                    fill="var(--foreground)"
                    fontSize="11"
                    fontFamily="var(--font-h2), sans-serif"
                    fontWeight="500"
                  >
                    {layer.label}
                  </text>
                  <text
                    x="76"
                    y={layer.y + 12}
                    textAnchor="middle"
                    fill="var(--muted)"
                    fontSize="8.5"
                    fontFamily="var(--font-h2), sans-serif"
                  >
                    {layer.detail}
                  </text>
                </motion.g>
              ))}

              {!reduced ? (
                <motion.circle
                  r="5"
                  fill="var(--accent)"
                  style={{
                    filter: "drop-shadow(0 0 6px rgb(42 161 152 / 0.8))",
                    offsetPath: `path('${spinePath}')`,
                  }}
                  initial={{ offsetDistance: "0%" }}
                  animate={{ offsetDistance: "100%" }}
                  transition={{
                    duration: 2.2,
                    ease: "linear",
                    delay: 1.5,
                    repeat: Infinity,
                    repeatDelay: 2.8,
                  }}
                />
              ) : null}

              <motion.g custom={reduced ? 0 : 1.22} variants={nodeSettle}>
                <rect
                  x="248"
                  y="268"
                  width="128"
                  height="44"
                  rx="10"
                  fill="rgb(42 161 152 / 0.18)"
                  stroke="var(--accent)"
                  strokeWidth="1.4"
                />
                <text
                  x="312"
                  y="286"
                  textAnchor="middle"
                  fill="var(--foreground)"
                  fontSize="11"
                  fontFamily="var(--font-h2), sans-serif"
                  fontWeight="500"
                >
                  Checkout settled
                </text>
                <text
                  x="312"
                  y="302"
                  textAnchor="middle"
                  fill="var(--accent)"
                  fontSize="9"
                  fontFamily="var(--font-h2), sans-serif"
                >
                  84ms p95
                </text>
                <line
                  x1="200"
                  y1="290"
                  x2="248"
                  y2="290"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                />
              </motion.g>
            </svg>

            <div className="relative z-10 mt-1 grid grid-cols-2 gap-3 border-t border-border/50 px-1 pt-4">
              <div>
                <p className="font-display text-[2rem] leading-none tabular-nums text-foreground">
                  500+
                </p>
                <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
                  Authenticated payments per day
                </p>
              </div>
              <div className="text-right">
                <p className="font-display text-[2rem] leading-none tabular-nums text-foreground">
                  84ms
                </p>
                <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
                  Lambda p95 under load
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export function CloudV3Mock1() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="cloud-v3-mock-1"
      aria-labelledby="cloud-v3-mock-1-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2
            id="cloud-v3-mock-1-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            Serverless from sign-in to production checkout
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            I build on Lambda, Cognito, SAM, Amplify, and DynamoDB so your app
            handles authenticated traffic and real payments without you
            babysitting infrastructure. Users sign in, APIs respond under load,
            and checkout clears in production.
          </p>
        </div>

        <div aria-hidden="true">
          <StackTraceVisual reduced={reduced} />
        </div>
      </div>
    </section>
  );
}
