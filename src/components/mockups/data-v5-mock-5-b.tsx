"use client";

import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

const rowIn: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: settle } },
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

const manifests: ManifestRow[] = [
  {
    id: "relational",
    workload: "Booking hold",
    store: "PostgreSQL",
    storeNote: "row locked until checkout",
    query: "slot availability",
    retrieval: "2 policy docs · 0.91",
    rail: "Stripe",
    amount: "$890.00",
    settled: true,
  },
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

function DispatchRow({ row, primary }: { row: ManifestRow; primary: boolean }) {
  return (
    <motion.li
      variants={rowIn}
      className={`rounded-xl border px-3 py-3 sm:px-3.5 sm:py-3.5 ${
        primary
          ? "border-accent/40 bg-surface-elevated/80 shadow-[0_0_0_1px_rgb(42_161_152/0.15)]"
          : "border-border/50 bg-surface/60 opacity-75"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="font-display text-base leading-none text-foreground sm:text-lg">
          {row.workload}
        </p>
        {row.settled && primary ? (
          <span className="shrink-0 rounded-md bg-success/15 px-1.5 py-0.5 text-[9px] text-success">
            settled
          </span>
        ) : null}
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <div>
          <p className="text-[9px] text-muted-foreground">Store</p>
          <p className="text-xs font-medium text-accent">{row.store}</p>
          <p className="mt-0.5 text-[9px] leading-4 text-muted-foreground">{row.storeNote}</p>
        </div>
        <div>
          <p className="text-[9px] text-muted-foreground">Retrieval</p>
          <p className="text-xs font-medium text-accent-secondary">{row.retrieval}</p>
        </div>
        <div>
          <p className="text-[9px] text-muted-foreground">Query</p>
          <p className="text-xs text-foreground">{row.query}</p>
        </div>
        <div>
          <p className="text-[9px] text-muted-foreground">Rail</p>
          <p className="text-xs text-foreground">{row.rail}</p>
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-between border-t border-border/50 pt-2.5">
        <span className="text-[9px] text-muted-foreground">Amount</span>
        <span className="font-display text-sm tabular-nums text-foreground">{row.amount}</span>
      </div>
    </motion.li>
  );
}

function DispatchSlab({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[20rem] sm:max-w-[22.5rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-secondary/10 blur-3xl"
      />

      <div className="dark relative" data-theme="dark">
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_24px_48px_-22px_rgb(0_0_0/0.55)]"
          variants={stage}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <div className="border-b border-accent/30 bg-accent/10 px-4 py-3">
            <p className="font-display text-lg leading-none text-foreground">Store routing</p>
            <p className="mt-1 text-[10px] text-muted-foreground">dispatch slab · live manifest</p>
          </div>

          <ol className="space-y-2 p-2.5 sm:space-y-2.5 sm:p-3">
            {manifests.map((row, index) => (
              <DispatchRow key={row.id} row={row} primary={index === 0} />
            ))}
          </ol>

          <div className="border-t border-border/70 px-4 py-3">
            <p className="text-[10px] leading-4 text-muted-foreground">
              Each row posts to the store that owns it. Stripe and Trust Commerce capture against
              that write — not a separate ledger hunt.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function DataV5Mock5B() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="data-v5-mock-5-b"
      aria-labelledby="data-v5-mock-5-b-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <DispatchSlab reduced={reduced} />
        </div>

        <div className="lg:order-2">
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            whileInView={reduced ? undefined : { opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.55, ease: settle }}
          >
            <h2
              id="data-v5-mock-5-b-title"
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
