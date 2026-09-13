"use client";

import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

/** Mock-local: station departure board — charcoal chassis, amber departures */
const board = {
  chassis: "#1a2228",
  frame: "#2a343c",
  face: "#222b32",
  slot: "#2f3a42",
  ink: "#e8edf0",
  muted: "#7a8894",
  amber: "#c49a3a",
  pg: "#4a9a94",
  ddb: "#5a8ab8",
  fs: "#8a9a52",
  rag: "#8a78a8",
  stripe: "#5c72d4",
  trust: "#3d8a72",
} as const;

const capabilityChips = [
  "Schema migration",
  "Real-time sync",
  "Payment at write time",
] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.06 },
  },
};

const shellIn: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.72, ease: settle },
  },
};

const rowFlip: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: settle, delay },
  }),
};

const markIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.38, ease: settle, delay },
  }),
};

type RouteRow = {
  id: string;
  workload: string;
  store: string;
  storeTint: string;
  rail: string;
  railTint: string;
  delay: number;
};

const routes: RouteRow[] = [
  {
    id: "ledger",
    workload: "Ledger migration",
    store: "PostgreSQL",
    storeTint: board.pg,
    rail: "Stripe",
    railTint: board.stripe,
    delay: 0.52,
  },
  {
    id: "session",
    workload: "Session sync",
    store: "DynamoDB",
    storeTint: board.ddb,
    rail: "Trust Commerce",
    railTint: board.trust,
    delay: 0.68,
  },
  {
    id: "live",
    workload: "Document sync",
    store: "Firestore",
    storeTint: board.fs,
    rail: "Stripe Connect",
    railTint: board.stripe,
    delay: 0.84,
  },
  {
    id: "retrieval",
    workload: "Retrieval pass",
    store: "RAG index",
    storeTint: board.rag,
    rail: "No charge",
    railTint: board.muted,
    delay: 1.0,
  },
];

function StoreMark({
  label,
  tint,
  delay,
  reduced,
}: {
  label: string;
  tint: string;
  delay: number;
  reduced: boolean;
}) {
  return (
    <motion.div
      className="flex flex-col items-center gap-1"
      custom={reduced ? 0 : delay}
      variants={markIn}
    >
      <div
        className="flex h-8 w-8 items-center justify-center rounded-md border text-[10px] font-medium leading-none"
        style={{
          borderColor: `color-mix(in srgb, ${tint} 55%, ${board.frame})`,
          background: `color-mix(in srgb, ${tint} 14%, ${board.face})`,
          color: board.ink,
        }}
      >
        {label.slice(0, 2).toUpperCase()}
      </div>
      <span className="text-[9px] leading-none" style={{ color: board.muted }}>
        {label}
      </span>
    </motion.div>
  );
}

function RouteStrip({
  row,
  reduced,
}: {
  row: RouteRow;
  reduced: boolean;
}) {
  return (
    <motion.li
      className="grid grid-cols-[1fr_auto_auto] items-center gap-2 rounded-md px-2.5 py-2 sm:gap-3 sm:px-3 sm:py-2.5"
      style={{ background: board.slot }}
      custom={reduced ? 0 : row.delay}
      variants={rowFlip}
    >
      <p
        className="min-w-0 truncate text-[11px] font-medium leading-tight sm:text-xs"
        style={{ color: board.ink }}
      >
        {row.workload}
      </p>
      <span
        className="shrink-0 rounded px-1.5 py-0.5 text-[9px] font-medium leading-none sm:text-[10px]"
        style={{
          color: row.storeTint,
          background: `color-mix(in srgb, ${row.storeTint} 16%, ${board.face})`,
        }}
      >
        {row.store}
      </span>
      <span
        className="shrink-0 rounded border px-1.5 py-0.5 text-[9px] font-medium leading-none sm:text-[10px]"
        style={{
          color: row.railTint,
          borderColor: `color-mix(in srgb, ${row.railTint} 45%, ${board.frame})`,
          background: `color-mix(in srgb, ${row.railTint} 10%, ${board.face})`,
        }}
      >
        {row.rail}
      </span>
    </motion.li>
  );
}

function DepartureBoardVisual({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[20rem] sm:max-w-[22.5rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[42%] h-48 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: `color-mix(in srgb, ${board.amber} 22%, transparent)` }}
      />

      <motion.div
        className="relative overflow-hidden rounded-[1.35rem] border p-2.5 shadow-[0_28px_60px_-34px_rgb(0_0_0/0.62)] sm:rounded-[1.5rem] sm:p-3"
        style={{
          background: board.chassis,
          borderColor: board.frame,
        }}
        variants={stage}
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
      >
        <motion.div variants={shellIn}>
          <div
            className="flex items-center justify-between gap-3 rounded-t-[0.85rem] px-3 py-2.5 sm:px-3.5"
            style={{ background: board.face }}
          >
            <div>
              <p className="text-[10px] leading-4 sm:text-[11px]" style={{ color: board.muted }}>
                Store routing board
              </p>
              <p
                className="font-display text-[1.05rem] leading-tight sm:text-lg"
                style={{ color: board.ink }}
              >
                Live departures
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  background: board.amber,
                  boxShadow: reduced
                    ? undefined
                    : `0 0 8px color-mix(in srgb, ${board.amber} 70%, transparent)`,
                }}
              />
              <span className="text-[10px] tabular-nums" style={{ color: board.amber }}>
                syncing
              </span>
            </div>
          </div>

          <div
            className="grid grid-cols-4 gap-2 border-y px-3 py-3 sm:px-3.5"
            style={{
              borderColor: board.frame,
              background: board.chassis,
            }}
          >
            <StoreMark label="PostgreSQL" tint={board.pg} delay={0.28} reduced={reduced} />
            <StoreMark label="DynamoDB" tint={board.ddb} delay={0.36} reduced={reduced} />
            <StoreMark label="Firestore" tint={board.fs} delay={0.44} reduced={reduced} />
            <StoreMark label="RAG" tint={board.rag} delay={0.52} reduced={reduced} />
          </div>

          <ol className="space-y-1.5 p-2.5 sm:space-y-2 sm:p-3">
            {routes.map((row) => (
              <RouteStrip key={row.id} row={row} reduced={reduced} />
            ))}
          </ol>

          <div
            className="mx-2.5 mb-2.5 rounded-md px-3 py-2 sm:mx-3 sm:mb-3"
            style={{
              background: `color-mix(in srgb, ${board.amber} 10%, ${board.face})`,
              borderLeft: `3px solid ${board.amber}`,
            }}
          >
            <p className="text-[10px] leading-4 sm:text-[11px]" style={{ color: board.muted }}>
              Settlement follows the store that posted the write. No ledger hunt after the charge clears.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function CapabilityChips() {
  return (
    <ul className="mt-6 flex flex-wrap gap-2" aria-label="Data capabilities">
      {capabilityChips.map((chip) => (
        <li
          key={chip}
          className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-foreground"
        >
          {chip}
        </li>
      ))}
    </ul>
  );
}

export function DataV4Mock4() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="data-v4-mock-4"
      aria-labelledby="data-v4-mock-4-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <DepartureBoardVisual reduced={reduced} />
        </div>

        <div className="lg:order-2">
          <h2
            id="data-v4-mock-4-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            Enterprise data management
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            From schema migrations to live sync and retrieval, I pick the store that fits each
            workload and wire Stripe or Trust Commerce at write time.
          </p>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
            PostgreSQL holds what must join. DynamoDB takes partition keys at volume. Firestore
            keeps clients current. RAG pulls your docs when a query needs context. Charges settle
            against the record that posted them.
          </p>
          <CapabilityChips />
        </div>
      </div>
    </section>
  );
}
