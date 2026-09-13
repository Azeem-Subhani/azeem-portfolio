"use client";

import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const spineDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: settle, delay: 0.15 },
  },
};

const nodeIn: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: settle, delay: 0.2 + i * 0.1 },
  }),
};

type ManifestRow = {
  id: string;
  workload: string;
  store: string;
  storeNote: string;
  query: string;
  retrieval: string;
  rail: string;
  amount: string;
  settled: boolean;
};

const primary: ManifestRow = {
  id: "relational",
  workload: "Booking hold",
  store: "PostgreSQL",
  storeNote: "row locked until checkout",
  query: "slot availability",
  retrieval: "2 policy docs · 0.91",
  rail: "Stripe",
  amount: "$890.00",
  settled: true,
};

const collapsed: ManifestRow[] = [
  {
    id: "session",
    workload: "Checkout session",
    store: "DynamoDB",
    storeNote: "partition key on cart id",
    query: "installment schedule",
    retrieval: "1 excerpt · 38ms",
    rail: "Trust Commerce",
    amount: "$1,280.00",
    settled: true,
  },
  {
    id: "sync",
    workload: "Roster update",
    store: "Firestore",
    storeNote: "live sync to clients",
    query: "dues batch lookup",
    retrieval: "4 receipts matched",
    rail: "Stripe Connect",
    amount: "$340.00",
    settled: true,
  },
];

const spineNodes = [
  { key: "store", label: "Store", value: primary.store, note: primary.storeNote, tint: "text-accent" },
  { key: "query", label: "Query", value: primary.query, tint: "text-foreground" },
  {
    key: "retrieval",
    label: "Retrieval",
    value: primary.retrieval,
    tint: "text-accent-secondary",
  },
  { key: "rail", label: "Rail", value: primary.rail, tint: "text-foreground" },
  { key: "amount", label: "Amount", value: primary.amount, tint: "text-foreground" },
] as const;

function RoutingSpine({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[20rem] sm:max-w-[22rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-8 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-accent/12 blur-3xl"
      />

      <div className="relative rounded-2xl border border-border bg-surface p-4 shadow-[0_20px_44px_-24px_rgb(var(--shadow-color)/0.4)] sm:p-5">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="font-display text-lg leading-none text-foreground">{primary.workload}</p>
            <p className="mt-1 text-[10px] text-muted-foreground">routing spine · primary row</p>
          </div>
          {primary.settled ? (
            <span className="rounded-md border border-success/50 px-1.5 py-0.5 text-[9px] text-success">
              Settled
            </span>
          ) : null}
        </div>

        <div className="relative pl-1">
          <svg
            viewBox="0 0 4 200"
            className="absolute left-[0.4375rem] top-2 h-[calc(100%-1rem)] w-1 overflow-visible"
            aria-hidden="true"
          >
            <motion.line
              x1="2"
              y1="0"
              x2="2"
              y2="200"
              stroke="currentColor"
              strokeWidth="2"
              className="text-accent/35"
              variants={spineDraw}
              initial={reduced ? false : "hidden"}
              whileInView={reduced ? undefined : "visible"}
              viewport={{ once: true, margin: "-10% 0px" }}
            />
          </svg>

          <ol className="space-y-4">
            {spineNodes.map((node, index) => (
              <motion.li
                key={node.key}
                custom={index}
                variants={nodeIn}
                initial={reduced ? false : "hidden"}
                whileInView={reduced ? undefined : "visible"}
                viewport={{ once: true, margin: "-10% 0px" }}
                className="relative grid grid-cols-[1rem_1fr] gap-3"
              >
                <span
                  aria-hidden="true"
                  className="relative z-10 mt-1.5 block size-2 rounded-full bg-accent ring-4 ring-surface"
                />
                <div>
                  <p className="text-[9px] text-muted-foreground">{node.label}</p>
                  <p className={`text-xs font-medium ${node.tint}`}>{node.value}</p>
                  {"note" in node && node.note ? (
                    <p className="mt-0.5 text-[9px] leading-4 text-muted-foreground">{node.note}</p>
                  ) : null}
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <div className="mt-5 space-y-2 border-t border-border/70 pt-4">
          {collapsed.map((row) => (
            <div
              key={row.id}
              className="flex items-center justify-between rounded-lg border border-border/45 bg-background/50 px-2.5 py-2 opacity-60"
            >
              <div>
                <p className="text-[10px] font-medium text-foreground">{row.workload}</p>
                <p className="text-[9px] text-muted-foreground">
                  {row.store} → {row.rail}
                </p>
              </div>
              <p className="font-display text-xs tabular-nums text-muted-foreground">{row.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DataV5Mock5F() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="data-v5-mock-5-f"
      aria-labelledby="data-v5-mock-5-f-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <RoutingSpine reduced={reduced} />
        </div>

        <div className="lg:order-2">
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            whileInView={reduced ? undefined : { opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.55, ease: settle }}
          >
            <h2
              id="data-v5-mock-5-f-title"
              className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
            >
              Enterprise data management
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
              Postgres holds relational records. DynamoDB and Firestore take over when the product
              needs partition keys or live sync. RAG retrieval answers from those stores in one
              pass.
            </p>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              Stripe and Trust Commerce settle against whichever store posted the row. I wire that
              path at schema time so charges never chase the wrong home.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
