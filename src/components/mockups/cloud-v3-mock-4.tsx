"use client";

import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.06 },
  },
};

const shellIn: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: settle },
  },
};

const pathDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0.35 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.1, ease: settle, delay: 0.2 },
  },
};

const nodeIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: settle, delay },
  }),
};

type Hop = {
  id: string;
  label: string;
  role: string;
  ms: number;
  tone: "signal" | "accent" | "success" | "muted";
  x: number;
};

const hops: Hop[] = [
  {
    id: "cognito",
    label: "Cognito",
    role: "Sign-in gate",
    ms: 12,
    tone: "signal",
    x: 52,
  },
  {
    id: "lambda",
    label: "Lambda",
    role: "API compute",
    ms: 31,
    tone: "accent",
    x: 142,
  },
  {
    id: "dynamo",
    label: "DynamoDB",
    role: "Order write",
    ms: 18,
    tone: "accent",
    x: 232,
  },
  {
    id: "amplify",
    label: "Amplify",
    role: "Edge delivery",
    ms: 9,
    tone: "muted",
    x: 322,
  },
];

const totalMs = hops.reduce((sum, hop) => sum + hop.ms, 0) + 14;

const toneStroke: Record<Hop["tone"], string> = {
  signal: "var(--signal)",
  accent: "var(--accent)",
  success: "var(--success)",
  muted: "var(--muted)",
};

const toneFill: Record<Hop["tone"], string> = {
  signal: "rgb(38 139 210 / 0.16)",
  accent: "rgb(42 161 152 / 0.16)",
  success: "rgb(133 153 0 / 0.16)",
  muted: "rgb(147 161 161 / 0.12)",
};

const tracePath =
  "M 52 108 L 142 108 L 232 108 L 322 108 L 368 108";

function toneBarClass(tone: Hop["tone"]) {
  if (tone === "signal") return "bg-signal";
  if (tone === "success") return "bg-success";
  if (tone === "muted") return "bg-foreground/45";
  return "bg-accent";
}

function PipelineManifest({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[22rem] md:max-w-[26rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-accent/18 blur-3xl"
      />

      <div className="dark relative" data-theme="dark">
        <motion.div
          className="relative overflow-hidden rounded-[1.75rem] border border-border/55 bg-background px-4 pb-5 pt-4 shadow-[0_0_0_1px_rgb(42_161_152/0.12),0_28px_60px_-32px_rgb(0_0_0/0.65)] sm:px-5 sm:pb-6 sm:pt-5"
          variants={stage}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <motion.div
            variants={shellIn}
            className="relative z-10 flex items-baseline justify-between gap-3"
          >
            <p className="text-[11px] text-muted-foreground">
              What lands in production
            </p>
            <span className="inline-flex items-center gap-1.5 text-[10px] text-accent">
              <span className="relative flex size-1.5">
                {!reduced ? (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-55" />
                ) : null}
                <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
              </span>
              Live stack
            </span>
          </motion.div>

          <motion.div variants={shellIn} className="relative z-10 mt-5">
            <svg
              viewBox="0 0 400 200"
              className="h-auto w-full"
              role="img"
              aria-label="Request path through Cognito, Lambda, DynamoDB, and Amplify to settled checkout"
            >
              <motion.path
                d={tracePath}
                fill="none"
                stroke="var(--border)"
                strokeWidth="2.5"
                strokeLinecap="round"
                variants={pathDraw}
              />
              <motion.path
                d={tracePath}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeLinecap="round"
                variants={pathDraw}
                style={{ filter: "drop-shadow(0 0 4px rgb(42 161 152 / 0.45))" }}
              />

              {hops.map((hop, index) => (
                <motion.g
                  key={hop.id}
                  custom={reduced ? 0 : 0.45 + index * 0.14}
                  variants={nodeIn}
                >
                  <circle
                    cx={hop.x}
                    cy="108"
                    r="14"
                    fill={toneFill[hop.tone]}
                    stroke={toneStroke[hop.tone]}
                    strokeWidth="1.2"
                  />
                  <text
                    x={hop.x}
                    y="74"
                    textAnchor="middle"
                    fill="var(--foreground)"
                    fontSize="10"
                    fontFamily="var(--font-h2), sans-serif"
                    fontWeight="500"
                  >
                    {hop.label}
                  </text>
                  <text
                    x={hop.x}
                    y="86"
                    textAnchor="middle"
                    fill="var(--muted)"
                    fontSize="8"
                    fontFamily="var(--font-h2), sans-serif"
                  >
                    {hop.role}
                  </text>
                  <text
                    x={hop.x}
                    y="148"
                    textAnchor="middle"
                    fill={toneStroke[hop.tone]}
                    fontSize="9"
                    fontFamily="var(--font-h2), sans-serif"
                    fontWeight="500"
                  >
                    {hop.ms}ms
                  </text>
                </motion.g>
              ))}

              <motion.g custom={reduced ? 0 : 1.05} variants={nodeIn}>
                <rect
                  x="348"
                  y="88"
                  width="44"
                  height="40"
                  rx="8"
                  fill="rgb(42 161 152 / 0.2)"
                  stroke="var(--accent)"
                  strokeWidth="1.3"
                />
                <text
                  x="370"
                  y="105"
                  textAnchor="middle"
                  fill="var(--foreground)"
                  fontSize="9"
                  fontFamily="var(--font-h2), sans-serif"
                  fontWeight="500"
                >
                  Settled
                </text>
                <text
                  x="370"
                  y="118"
                  textAnchor="middle"
                  fill="var(--accent)"
                  fontSize="8"
                  fontFamily="var(--font-h2), sans-serif"
                >
                  {totalMs}ms
                </text>
              </motion.g>

              {!reduced ? (
                <motion.circle
                  r="4"
                  fill="var(--accent)"
                  style={{
                    filter: "drop-shadow(0 0 5px rgb(42 161 152 / 0.75))",
                    offsetPath: `path('${tracePath}')`,
                  }}
                  initial={{ offsetDistance: "0%" }}
                  animate={{ offsetDistance: "100%" }}
                  transition={{
                    duration: 1.8,
                    ease: "linear",
                    delay: 1.3,
                    repeat: Infinity,
                    repeatDelay: 3.2,
                  }}
                />
              ) : null}

              <motion.g custom={reduced ? 0 : 0.35} variants={nodeIn}>
                <rect
                  x="40"
                  y="168"
                  width="320"
                  height="22"
                  rx="4"
                  fill="rgb(133 153 0 / 0.1)"
                  stroke="var(--success)"
                  strokeWidth="0.8"
                  strokeDasharray="4 3"
                />
                <text
                  x="200"
                  y="182"
                  textAnchor="middle"
                  fill="var(--success)"
                  fontSize="8.5"
                  fontFamily="var(--font-h2), sans-serif"
                >
                  SAM deploy pipeline beneath every hop
                </text>
              </motion.g>
            </svg>
          </motion.div>

          <motion.div
            variants={shellIn}
            className="relative z-10 mt-2 border-t border-border/50 pt-4"
          >
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <p className="text-[11px] text-muted-foreground">
                Checkout request budget
              </p>
              <p className="text-[11px] tabular-nums text-muted-foreground">
                <span className="font-medium text-foreground">{totalMs}ms</span>{" "}
                end-to-end
              </p>
            </div>

            <div className="flex h-2 w-full overflow-hidden rounded-sm bg-foreground/8">
              {hops.map((hop) => (
                <div
                  key={hop.id}
                  className={`h-full ${toneBarClass(hop.tone)}`}
                  style={{ width: `${(hop.ms / totalMs) * 100}%` }}
                />
              ))}
              <div
                className="h-full bg-success/70"
                style={{ width: `${(14 / totalMs) * 100}%` }}
              />
            </div>

            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
              {[...hops, { id: "sam", label: "SAM", ms: 14, tone: "success" as const }].map(
                (segment) => (
                  <li key={segment.id} className="min-w-0">
                    <p className="truncate text-[11px] font-medium text-foreground">
                      {segment.label}
                    </p>
                    <p className="text-[10px] tabular-nums text-muted-foreground">
                      {segment.ms}ms
                    </p>
                  </li>
                ),
              )}
            </ul>
          </motion.div>

          <motion.div
            variants={shellIn}
            className="relative z-10 mt-4 grid grid-cols-2 gap-3 border-t border-border/50 pt-4"
          >
            <div>
              <p className="font-display text-[2rem] leading-none tabular-nums text-foreground">
                500+
              </p>
              <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
                Authenticated payments per day on stacks I ship
              </p>
            </div>
            <div className="text-right">
              <p className="font-display text-[2rem] leading-none tabular-nums text-foreground">
                5
              </p>
              <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
                AWS services wired as one production path
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export function CloudV3Mock4() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="cloud-v3-mock-4"
      aria-labelledby="cloud-v3-mock-4-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2
            id="cloud-v3-mock-4-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            Production serverless without a platform team
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            I wire Cognito, Lambda, DynamoDB, SAM, and Amplify into stacks that
            handle sign-in, API traffic, and real checkout in production. You
            get auth that gates payments, compute that stays fast under load,
            repeatable deploys, and a data layer that settles transactions — not
            a roadmap slide about going serverless.
          </p>
        </div>

        <div aria-hidden="true">
          <PipelineManifest reduced={reduced} />
        </div>
      </div>
    </section>
  );
}
