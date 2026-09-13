"use client";

import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

/** Mock-local chassis: Solarized base03 panel, not fivexlabs lime/black */
const chassis = {
  frame: "#002b36",
  well: "#04313d",
  ink: "#eee8d5",
  muted: "#93a1a1",
  grid: "rgb(238 232 213 / 0.06)",
} as const;

const capabilities = ["Serverless auth", "IaC deploys", "Payment APIs"] as const;

type ServiceMark = {
  id: string;
  label: string;
  mono: string;
};

const services: ServiceMark[] = [
  { id: "lambda", label: "Lambda", mono: "λ" },
  { id: "cognito", label: "Cognito", mono: "◉" },
  { id: "sam", label: "SAM", mono: "▤" },
  { id: "amplify", label: "Amplify", mono: "▲" },
  { id: "dynamo", label: "DynamoDB", mono: "▦" },
];

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.06 },
  },
};

const panelIn: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.78, ease: settle },
  },
};

const markIn: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: settle, delay: 0.18 + index * 0.07 },
  }),
};

const pathDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0.3 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.15, ease: settle, delay: 0.42 },
  },
};

const laneIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.48, ease: settle, delay },
  }),
};

function ServiceGlyph({ mark }: { mark: ServiceMark }) {
  return (
    <svg viewBox="0 0 40 40" className="size-9" aria-hidden="true">
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="9"
        fill={chassis.well}
        stroke="rgb(238 232 213 / 0.14)"
        strokeWidth="0.8"
      />
      <text
        x="20"
        y="25"
        textAnchor="middle"
        fill={chassis.ink}
        fontSize="15"
        fontFamily="var(--font-sans), ui-sans-serif, system-ui, sans-serif"
        fontWeight="500"
      >
        {mark.mono}
      </text>
    </svg>
  );
}

function RegistryVisual({ reduced }: { reduced: boolean }) {
  const spinePath = "M 200 118 L 200 248";
  const branchPaths = [
    "M 200 118 L 72 118",
    "M 200 148 L 328 148",
    "M 200 178 L 88 178",
    "M 200 208 L 312 208",
    "M 200 248 L 200 268",
  ];

  return (
    <div className="relative mx-auto w-full max-w-[20rem] md:max-w-[26rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[44%] h-72 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/18 blur-3xl"
      />

      <div className="dark relative" data-theme="dark">
        <motion.div
          className="relative overflow-hidden rounded-[1.75rem] border border-border/55 px-4 pb-5 pt-4 shadow-[0_0_0_1px_rgb(42_161_152/0.12),0_32px_64px_-32px_rgb(0_43_54/0.75)] sm:px-5 sm:pb-6 sm:pt-5"
          style={{ backgroundColor: chassis.frame }}
          variants={stage}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.55]"
            style={{
              backgroundImage: `
                linear-gradient(to right, ${chassis.grid} 1px, transparent 1px),
                linear-gradient(to bottom, ${chassis.grid} 1px, transparent 1px)
              `,
              backgroundSize: "18px 18px",
            }}
          />

          <motion.div variants={panelIn}>
            <div className="relative z-10 mb-4 flex items-end justify-between gap-3 px-0.5">
              <p className="text-[11px]" style={{ color: chassis.muted }}>
                AWS stack registry
              </p>
              <span
                className="inline-flex items-center gap-1.5 text-[10px] text-accent"
                style={{ color: "var(--accent)" }}
              >
                <span className="relative flex size-1.5">
                  {!reduced ? (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-55" />
                  ) : null}
                  <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                </span>
                All services live
              </span>
            </div>

            <div
              className="relative z-10 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              aria-hidden="true"
            >
              <div className="mx-auto flex w-max min-w-full justify-between gap-2 px-0.5 sm:gap-3">
                {services.map((mark, index) => (
                  <motion.div
                    key={mark.id}
                    className="flex shrink-0 flex-col items-center gap-1.5"
                    custom={reduced ? 0 : index}
                    variants={markIn}
                  >
                    <ServiceGlyph mark={mark} />
                    <span
                      className="text-[9px] leading-none"
                      style={{ color: chassis.muted }}
                    >
                      {mark.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <svg
              viewBox="0 0 400 300"
              className="relative z-10 mt-4 h-auto w-full"
              role="img"
              aria-label="Abstract serverless topology from auth through compute and storage to deploy"
            >
              <motion.path
                d={spinePath}
                fill="none"
                stroke="rgb(238 232 213 / 0.12)"
                strokeWidth="2"
                strokeLinecap="round"
                variants={pathDraw}
              />
              <motion.path
                d={spinePath}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2.2"
                strokeLinecap="round"
                variants={pathDraw}
                style={{ filter: "drop-shadow(0 0 4px rgb(42 161 152 / 0.35))" }}
              />

              {branchPaths.map((path, index) => (
                <motion.path
                  key={path}
                  d={path}
                  fill="none"
                  stroke="rgb(238 232 213 / 0.18)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeDasharray="4 5"
                  variants={pathDraw}
                  custom={index}
                />
              ))}

              <motion.g custom={reduced ? 0 : 0.62} variants={laneIn}>
                <rect
                  x="24"
                  y="96"
                  width="96"
                  height="44"
                  rx="10"
                  fill="rgb(38 139 210 / 0.12)"
                  stroke="var(--signal)"
                  strokeWidth="1.1"
                />
                <text
                  x="72"
                  y="116"
                  textAnchor="middle"
                  fill={chassis.ink}
                  fontSize="11"
                  fontFamily="var(--font-sans), ui-sans-serif, system-ui, sans-serif"
                  fontWeight="500"
                >
                  Auth edge
                </text>
                <text
                  x="72"
                  y="130"
                  textAnchor="middle"
                  fill={chassis.muted}
                  fontSize="8.5"
                  fontFamily="var(--font-sans), ui-sans-serif, system-ui, sans-serif"
                >
                  Cognito pool
                </text>
              </motion.g>

              <motion.g custom={reduced ? 0 : 0.76} variants={laneIn}>
                <rect
                  x="152"
                  y="126"
                  width="96"
                  height="44"
                  rx="10"
                  fill="rgb(42 161 152 / 0.14)"
                  stroke="var(--accent)"
                  strokeWidth="1.1"
                />
                <text
                  x="200"
                  y="146"
                  textAnchor="middle"
                  fill={chassis.ink}
                  fontSize="11"
                  fontFamily="var(--font-sans), ui-sans-serif, system-ui, sans-serif"
                  fontWeight="500"
                >
                  Compute
                </text>
                <text
                  x="200"
                  y="160"
                  textAnchor="middle"
                  fill={chassis.muted}
                  fontSize="8.5"
                  fontFamily="var(--font-sans), ui-sans-serif, system-ui, sans-serif"
                >
                  Lambda APIs
                </text>
              </motion.g>

              <motion.g custom={reduced ? 0 : 0.9} variants={laneIn}>
                <rect
                  x="280"
                  y="186"
                  width="96"
                  height="44"
                  rx="10"
                  fill="rgb(42 161 152 / 0.12)"
                  stroke="var(--accent)"
                  strokeWidth="1.1"
                />
                <text
                  x="328"
                  y="206"
                  textAnchor="middle"
                  fill={chassis.ink}
                  fontSize="11"
                  fontFamily="var(--font-sans), ui-sans-serif, system-ui, sans-serif"
                  fontWeight="500"
                >
                  Store
                </text>
                <text
                  x="328"
                  y="220"
                  textAnchor="middle"
                  fill={chassis.muted}
                  fontSize="8.5"
                  fontFamily="var(--font-sans), ui-sans-serif, system-ui, sans-serif"
                >
                  DynamoDB
                </text>
              </motion.g>

              <motion.g custom={reduced ? 0 : 1.04} variants={laneIn}>
                <rect
                  x="128"
                  y="256"
                  width="144"
                  height="36"
                  rx="10"
                  fill="rgb(133 153 0 / 0.14)"
                  stroke="var(--success)"
                  strokeWidth="1.2"
                />
                <text
                  x="200"
                  y="278"
                  textAnchor="middle"
                  fill={chassis.ink}
                  fontSize="11"
                  fontFamily="var(--font-sans), ui-sans-serif, system-ui, sans-serif"
                  fontWeight="500"
                >
                  SAM · Amplify deploy
                </text>
              </motion.g>

              {!reduced ? (
                <motion.circle
                  r="4.5"
                  fill="var(--accent)"
                  style={{
                    filter: "drop-shadow(0 0 5px rgb(42 161 152 / 0.7))",
                    offsetPath: `path('${spinePath}')`,
                  }}
                  initial={{ offsetDistance: "0%" }}
                  animate={{ offsetDistance: "100%" }}
                  transition={{
                    duration: 2.4,
                    ease: "linear",
                    delay: 1.35,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                />
              ) : null}
            </svg>

            <div
              className="relative z-10 mt-1 grid grid-cols-2 gap-3 border-t px-0.5 pt-4"
              style={{ borderColor: "rgb(238 232 213 / 0.08)" }}
            >
              <div>
                <p
                  className="font-display text-[1.65rem] leading-none tabular-nums sm:text-[1.85rem]"
                  style={{ color: chassis.ink }}
                >
                  5
                </p>
                <p className="mt-1 text-[11px] leading-4" style={{ color: chassis.muted }}>
                  services wired as one unit
                </p>
              </div>
              <div className="text-right">
                <p
                  className="font-display text-[1.65rem] leading-none tabular-nums sm:text-[1.85rem]"
                  style={{ color: chassis.ink }}
                >
                  &lt;100ms
                </p>
                <p className="mt-1 text-[11px] leading-4" style={{ color: chassis.muted }}>
                  write path under load
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export function CloudV4Mock1() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="cloud-v4-mock-1"
      aria-labelledby="cloud-v4-mock-1-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2
            id="cloud-v4-mock-1-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            Cloud expertise at scale
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            From serverless auth to production payment infrastructure, I architect,
            deploy, and optimize on Lambda, Cognito, SAM, Amplify, and DynamoDB.
            Sign-in, compute, deploys, hosting, and storage wired as one unit.
            Scale with confidence.
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
          <RegistryVisual reduced={reduced} />
        </div>
      </div>
    </section>
  );
}
