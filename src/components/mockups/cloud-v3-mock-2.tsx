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

const panelIn: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: settle },
  },
};

const pathDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0.35 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.25, ease: settle, delay: 0.18 },
  },
};

const gateIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.42, ease: settle, delay },
  }),
};

type Gate = {
  id: string;
  label: string;
  detail: string;
  cx: number;
  cy: number;
  tone: "signal" | "accent" | "success";
  delay: number;
};

const gates: Gate[] = [
  {
    id: "cognito",
    label: "Cognito",
    detail: "User pool",
    cx: 56,
    cy: 72,
    tone: "signal",
    delay: 0.48,
  },
  {
    id: "lambda",
    label: "Lambda",
    detail: "Charge API",
    cx: 168,
    cy: 72,
    tone: "accent",
    delay: 0.62,
  },
  {
    id: "dynamo",
    label: "DynamoDB",
    detail: "Order row",
    cx: 280,
    cy: 72,
    tone: "accent",
    delay: 0.76,
  },
  {
    id: "deploy",
    label: "SAM · Amplify",
    detail: "Live stack",
    cx: 344,
    cy: 168,
    tone: "success",
    delay: 0.9,
  },
];

const conduitPath =
  "M 56 72 H 168 H 280 V 168 H 344";

function toneStroke(tone: Gate["tone"]) {
  if (tone === "signal") return "var(--signal)";
  if (tone === "success") return "var(--success)";
  return "var(--accent)";
}

function toneFill(tone: Gate["tone"]) {
  if (tone === "signal") return "rgb(38 139 210 / 0.16)";
  if (tone === "success") return "rgb(133 153 0 / 0.16)";
  return "rgb(42 161 152 / 0.16)";
}

function ConduitVisual({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-[22rem] md:max-w-[26rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[42%] h-64 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl"
      />

      <div className="dark relative" data-theme="dark">
        <motion.div
          className="relative overflow-hidden rounded-[1.75rem] border border-border/60 bg-background px-3 pb-4 pt-3.5 shadow-[0_0_0_1px_rgb(42_161_152/0.14),0_28px_56px_-32px_rgb(0_0_0/0.62)] sm:px-4 sm:pb-5 sm:pt-4"
          variants={stage}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-linear-to-b from-accent/10 to-transparent sm:h-20"
          />

          <motion.div variants={panelIn}>
            <div className="relative z-10 mb-2 flex items-baseline justify-between gap-2 px-0.5 sm:mb-3 sm:px-1">
              <p className="text-[10px] text-muted-foreground sm:text-[11px]">
                Auth-to-settlement path
              </p>
              <p className="text-[10px] tabular-nums text-accent sm:text-[11px]">
                500+ / day
              </p>
            </div>

            <svg
              viewBox="0 0 400 220"
              className="relative z-10 h-auto w-full"
              role="img"
              aria-label="Payment flow from Cognito authentication through Lambda and DynamoDB to SAM and Amplify deployment"
            >
              <motion.path
                d={conduitPath}
                fill="none"
                stroke="var(--border)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={pathDraw}
              />
              <motion.path
                d={conduitPath}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={pathDraw}
                style={{ filter: "drop-shadow(0 0 4px rgb(42 161 152 / 0.45))" }}
              />

              {gates.map((gate) => (
                <motion.g
                  key={gate.id}
                  custom={reduced ? 0 : gate.delay}
                  variants={gateIn}
                >
                  <rect
                    x={gate.cx - 44}
                    y={gate.cy - 24}
                    width="88"
                    height="48"
                    rx="11"
                    fill={toneFill(gate.tone)}
                    stroke={toneStroke(gate.tone)}
                    strokeWidth="1.2"
                  />
                  <text
                    x={gate.cx}
                    y={gate.cy - 5}
                    textAnchor="middle"
                    fill="var(--foreground)"
                    fontSize="11"
                    fontFamily="var(--font-h2), sans-serif"
                    fontWeight="500"
                  >
                    {gate.label}
                  </text>
                  <text
                    x={gate.cx}
                    y={gate.cy + 11}
                    textAnchor="middle"
                    fill="var(--muted)"
                    fontSize="8.5"
                    fontFamily="var(--font-h2), sans-serif"
                  >
                    {gate.detail}
                  </text>
                </motion.g>
              ))}

              {!reduced ? (
                <motion.circle
                  r="5"
                  fill="var(--accent)"
                  style={{
                    filter: "drop-shadow(0 0 6px rgb(42 161 152 / 0.85))",
                    offsetPath: `path('${conduitPath}')`,
                  }}
                  initial={{ offsetDistance: "0%" }}
                  animate={{ offsetDistance: "100%" }}
                  transition={{
                    duration: 2,
                    ease: "linear",
                    delay: 1.1,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                />
              ) : null}

              <motion.g custom={reduced ? 0 : 1.05} variants={gateIn}>
                <rect
                  x="292"
                  y="182"
                  width="96"
                  height="32"
                  rx="8"
                  fill="rgb(42 161 152 / 0.14)"
                  stroke="var(--accent)"
                  strokeWidth="1"
                />
                <text
                  x="340"
                  y="202"
                  textAnchor="middle"
                  fill="var(--foreground)"
                  fontSize="10"
                  fontFamily="var(--font-h2), sans-serif"
                  fontWeight="500"
                >
                  Settled 84ms p95
                </text>
              </motion.g>
            </svg>

            <div
              className="relative z-10 mt-2 grid grid-cols-3 gap-2 border-t border-border/50 px-0.5 pt-3 sm:mt-3 sm:gap-3 sm:px-1 sm:pt-4"
              aria-hidden="true"
            >
              <div>
                <p className="font-display text-[clamp(1.35rem,5vw,1.75rem)] leading-none tabular-nums text-foreground">
                  500+
                </p>
                <p className="mt-1 text-[10px] leading-4 text-muted-foreground sm:text-[11px]">
                  Authed payments daily
                </p>
              </div>
              <div className="text-center">
                <p className="font-display text-[clamp(1.35rem,5vw,1.75rem)] leading-none tabular-nums text-foreground">
                  84ms
                </p>
                <p className="mt-1 text-[10px] leading-4 text-muted-foreground sm:text-[11px]">
                  Lambda p95
                </p>
              </div>
              <div className="text-right">
                <p className="font-display text-[clamp(1.35rem,5vw,1.75rem)] leading-none tabular-nums text-foreground">
                  5
                </p>
                <p className="mt-1 text-[10px] leading-4 text-muted-foreground sm:text-[11px]">
                  AWS services wired
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export function CloudV3Mock2() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="cloud-v3-mock-2"
      aria-labelledby="cloud-v3-mock-2-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2
            id="cloud-v3-mock-2-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            Auth and payments that hold at five hundred a day
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            I wire Lambda, Cognito, SAM, Amplify, and DynamoDB into one
            production path. Users sign in once, APIs stay fast under load, and
            checkout clears without you running servers.
          </p>
        </div>

        <div aria-hidden="true">
          <ConduitVisual reduced={reduced} />
        </div>
      </div>
    </section>
  );
}
