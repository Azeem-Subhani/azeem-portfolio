"use client";

import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

/** Mock-local worksheet: warm graph paper on blue-charcoal chassis */
const sheet = {
  chassis: "#141e27",
  rim: "#243240",
  paper: "#e4ddd0",
  rule: "#cfc6b8",
  ink: "#1a242c",
  muted: "#5c6670",
  pg: "#2a6464",
  ddb: "#3a5878",
  fs: "#4f6640",
  rag: "#5c4a6e",
  stripe: "#4f46b8",
  trust: "#8f4a42",
} as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.06 },
  },
};

const foldIn: Variants = {
  hidden: { opacity: 0, rotateX: 14, y: 18, scale: 0.96 },
  visible: {
    opacity: 1,
    rotateX: 0,
    y: 0,
    scale: 1,
    transition: { duration: 0.82, ease: settle },
  },
};

const trunkDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0.35 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.05, ease: settle, delay: 0.42 },
  },
};

const rowReveal: Variants = {
  hidden: { opacity: 0, x: -6 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.48, ease: settle, delay },
  }),
};

type RouteRow = {
  id: string;
  store: string;
  schema: string;
  workload: string;
  rail: string;
  railKind: "stripe" | "trust" | "none";
  band: string;
  delay: number;
};

const routes: RouteRow[] = [
  {
    id: "pg",
    store: "PostgreSQL",
    schema: "uuid PK · FK constraints",
    workload: "Orders, ledgers, reporting",
    rail: "Stripe",
    railKind: "stripe",
    band: sheet.pg,
    delay: 0.62,
  },
  {
    id: "ddb",
    store: "DynamoDB",
    schema: "pk · sk · TTL",
    workload: "Sessions, spikes, hot keys",
    rail: "Trust Commerce",
    railKind: "trust",
    band: sheet.ddb,
    delay: 0.78,
  },
  {
    id: "fs",
    store: "Firestore",
    schema: "collection / doc paths",
    workload: "Live docs, client sync",
    rail: "Stripe Connect",
    railKind: "stripe",
    band: sheet.fs,
    delay: 0.94,
  },
  {
    id: "rag",
    store: "RAG retrieval",
    schema: "vector index · top-k",
    workload: "Grounded answers at query time",
    rail: "No charge",
    railKind: "none",
    band: sheet.rag,
    delay: 1.1,
  },
];

const trunkPath = "M 52 34 L 52 248";

function railStyle(kind: RouteRow["railKind"]) {
  if (kind === "trust") {
    return {
      background: `color-mix(in srgb, ${sheet.trust} 16%, ${sheet.paper})`,
      borderColor: `color-mix(in srgb, ${sheet.trust} 55%, ${sheet.rule})`,
      color: sheet.trust,
    };
  }
  if (kind === "stripe") {
    return {
      background: `color-mix(in srgb, ${sheet.stripe} 14%, ${sheet.paper})`,
      borderColor: `color-mix(in srgb, ${sheet.stripe} 50%, ${sheet.rule})`,
      color: sheet.stripe,
    };
  }
  return {
    background: `color-mix(in srgb, ${sheet.muted} 12%, ${sheet.paper})`,
    borderColor: sheet.rule,
    color: sheet.muted,
  };
}

function RouteBand({
  row,
  reduced,
  compact,
}: {
  row: RouteRow;
  reduced: boolean;
  compact?: boolean;
}) {
  const rail = railStyle(row.railKind);

  return (
    <motion.div
      className={`relative border-b border-dashed last:border-b-0 ${compact ? "px-3 py-3" : "px-4 py-3.5 sm:py-4"}`}
      style={{ borderColor: sheet.rule }}
      custom={reduced ? 0 : row.delay}
      variants={rowReveal}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-1 left-0 w-1 rounded-full"
        style={{ background: row.band, opacity: 0.85 }}
      />
      <div className={`flex ${compact ? "flex-col gap-2" : "items-start justify-between gap-3 sm:items-center"}`}>
        <div className="min-w-0 flex-1 pl-2">
          <p
            className="text-[11px] font-medium leading-tight sm:text-xs"
            style={{ color: sheet.ink }}
          >
            {row.store}
          </p>
          <p
            className="mt-1 text-[10px] leading-4 sm:text-[11px]"
            style={{ color: sheet.muted }}
          >
            {row.workload}
          </p>
          <p
            className="mt-1.5 text-[9px] leading-4 sm:text-[10px]"
            style={{ color: sheet.muted, fontVariantNumeric: "tabular-nums" }}
          >
            {row.schema}
          </p>
        </div>
        <div
          className={`shrink-0 rounded-md border px-2 py-1 text-[9px] font-medium leading-none sm:text-[10px] ${compact ? "self-start" : ""}`}
          style={rail}
        >
          {row.rail}
        </div>
      </div>
    </motion.div>
  );
}

function RoutingWorksheet({ reduced }: { reduced: boolean }) {
  return (
    <div
      className="relative mx-auto w-full max-w-[20rem] sm:max-w-[22rem]"
      style={{ perspective: 1100 }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[38%] top-[46%] h-56 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: `color-mix(in srgb, ${sheet.pg} 28%, transparent)` }}
      />

      <motion.div
        className="relative overflow-hidden rounded-[1.6rem] border p-3 shadow-[0_28px_60px_-34px_rgb(0_0_0/0.55)] sm:p-3.5"
        style={{
          background: sheet.chassis,
          borderColor: sheet.rim,
        }}
        variants={stage}
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
      >
        <motion.div
          className="relative overflow-hidden rounded-[1.05rem]"
          style={{
            background: sheet.paper,
            transformStyle: "preserve-3d",
          }}
          variants={foldIn}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.55]"
            style={{
              backgroundImage: `repeating-linear-gradient(
                to bottom,
                transparent,
                transparent 27px,
                ${sheet.rule} 27px,
                ${sheet.rule} 28px
              )`,
            }}
          />

          <div className="relative z-10 px-4 pb-1 pt-4 sm:px-5 sm:pt-5">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-[10px] sm:text-[11px]" style={{ color: sheet.muted }}>
                Store routing spec
              </p>
              <p
                className="text-[10px] tabular-nums sm:text-[11px]"
                style={{ color: sheet.muted }}
              >
                v1.0
              </p>
            </div>
            <p
              className="mt-2 font-display text-[1.35rem] leading-[1.08] sm:text-[1.5rem]"
              style={{ color: sheet.ink }}
            >
              One write, one home
            </p>
            <p className="mt-1.5 max-w-[14rem] text-[10px] leading-4 sm:text-[11px]" style={{ color: sheet.muted }}>
              Each record type lands in the store that fits the workload. Payment rails attach at schema time.
            </p>
          </div>

          <div className="relative z-10 mt-3 hidden sm:block">
            <svg
              viewBox="0 0 320 260"
              className="absolute inset-x-0 top-0 h-[16.25rem] w-full"
              aria-hidden="true"
            >
              <motion.path
                d={trunkPath}
                fill="none"
                stroke={sheet.rule}
                strokeWidth="1.5"
                strokeLinecap="round"
                variants={trunkDraw}
              />
              <motion.path
                d={trunkPath}
                fill="none"
                stroke={sheet.pg}
                strokeWidth="2"
                strokeLinecap="round"
                variants={trunkDraw}
                style={{ filter: `drop-shadow(0 0 4px color-mix(in srgb, ${sheet.pg} 40%, transparent))` }}
              />
              {[72, 128, 184, 240].map((y, i) => (
                <motion.line
                  key={y}
                  x1="52"
                  y1={y}
                  x2="68"
                  y2={y}
                  stroke={routes[i].band}
                  strokeWidth="1.5"
                  variants={trunkDraw}
                />
              ))}
              {!reduced ? (
                <motion.circle
                  r="4"
                  fill={sheet.pg}
                  style={{
                    offsetPath: `path('${trunkPath}')`,
                    filter: `drop-shadow(0 0 5px color-mix(in srgb, ${sheet.pg} 70%, transparent))`,
                  }}
                  initial={{ offsetDistance: "0%" }}
                  animate={{ offsetDistance: "100%" }}
                  transition={{
                    duration: 2.4,
                    ease: "linear",
                    delay: 1.35,
                    repeat: Infinity,
                    repeatDelay: 3.2,
                  }}
                />
              ) : null}
            </svg>
          </div>

          <div className="relative z-10 mt-2 sm:mt-[3.25rem] sm:pl-7">
            {routes.map((row) => (
              <RouteBand key={row.id} row={row} reduced={reduced} />
            ))}
          </div>

          <div
            className="relative z-10 mx-4 mb-4 mt-3 rounded-lg border px-3 py-2.5 sm:mx-5"
            style={{
              borderColor: sheet.rule,
              background: `color-mix(in srgb, ${sheet.paper} 88%, ${sheet.chassis})`,
            }}
          >
            <p className="text-[10px] leading-4" style={{ color: sheet.muted }}>
              Settlement follows the store that posted the write. No cross-store hunts at charge time.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function DataV3Mock4() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="data-v3-mock-4"
      aria-labelledby="data-v3-mock-4-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <RoutingWorksheet reduced={reduced} />
        </div>

        <div className="lg:order-2">
          <h2
            id="data-v3-mock-4-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            Enterprise data management
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            I design which store holds each record type and wire Stripe or Trust Commerce
            against the write that owns it. PostgreSQL for relational truth, DynamoDB when
            traffic spikes, Firestore for live sync, RAG when answers need context.
          </p>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
            Payment rails attach at schema time so settlement never hunts for a home after
            the charge clears.
          </p>
        </div>
      </div>
    </section>
  );
}
