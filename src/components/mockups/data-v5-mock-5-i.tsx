"use client";

import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const rowSlide: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: settle, delay: 0.1 + i * 0.08 },
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

const columns = ["Workload", "Store", "Retrieval", "Rail", "Amount"] as const;

function LedgerStrip({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-[24rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 h-32 -translate-y-1/2 bg-accent/10 blur-2xl"
      />

      <div className="relative overflow-hidden rounded-xl border border-border bg-surface shadow-[0_16px_40px_-24px_rgb(var(--shadow-color)/0.5)]">
        <div className="border-b border-accent/25 bg-accent/8 px-3 py-2.5 sm:px-3.5">
          <p className="font-display text-base leading-none text-foreground sm:text-lg">
            Store routing
          </p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">ledger strip</p>
        </div>

        <div
          className="grid grid-cols-[1.1fr_0.9fr_1fr_0.75fr_0.65fr] gap-x-2 border-b border-border/70 bg-surface-elevated/50 px-2 py-2 text-[8px] text-muted-foreground sm:px-2.5 sm:text-[9px]"
          aria-hidden="true"
        >
          {columns.map((col) => (
            <span key={col} className="truncate">
              {col}
            </span>
          ))}
        </div>

        <ol>
          {manifests.map((row, index) => {
            const primary = index === 0;
            return (
              <motion.li
                key={row.id}
                custom={index}
                variants={rowSlide}
                initial={reduced ? false : "hidden"}
                whileInView={reduced ? undefined : "visible"}
                viewport={{ once: true, margin: "-10% 0px" }}
                className={`grid grid-cols-[1.1fr_0.9fr_1fr_0.75fr_0.65fr] gap-x-2 border-b border-border/50 px-2 py-2.5 last:border-b-0 sm:px-2.5 sm:py-3 ${
                  primary ? "bg-background/80 ring-1 ring-inset ring-accent/25" : "bg-background/40"
                }`}
              >
                <span className="truncate text-[9px] font-medium text-foreground sm:text-[10px]">
                  {row.workload}
                </span>
                <span className="truncate text-[9px] text-accent sm:text-[10px]">{row.store}</span>
                <span className="truncate text-[9px] text-accent-secondary sm:text-[10px]">
                  {row.retrieval}
                </span>
                <span className="truncate text-[9px] text-foreground sm:text-[10px]">
                  {row.rail}
                </span>
                <span className="flex items-center gap-1 truncate font-display text-[9px] tabular-nums text-foreground sm:text-[10px]">
                  {row.amount}
                  {primary && row.settled ? (
                    <span className="size-1.5 shrink-0 rounded-full bg-success" title="Settled" />
                  ) : null}
                </span>
              </motion.li>
            );
          })}
        </ol>

        <div className="border-t border-border/70 px-3 py-2.5 sm:px-3.5">
          <p className="text-[10px] leading-4 text-muted-foreground">
            Each row posts to the store that owns it. Stripe and Trust Commerce capture against that
            write — not a separate ledger hunt.
          </p>
        </div>
      </div>
    </div>
  );
}

export function DataV5Mock5I() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="data-v5-mock-5-i"
      aria-labelledby="data-v5-mock-5-i-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <LedgerStrip reduced={reduced} />
        </div>

        <div className="lg:order-2">
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            whileInView={reduced ? undefined : { opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.55, ease: settle }}
          >
            <h2
              id="data-v5-mock-5-i-title"
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
