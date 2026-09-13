"use client";

import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const fanIn: Variants = {
  hidden: { opacity: 0, y: 24, rotate: 0 },
  visible: (i: number) => ({
    opacity: i === 0 ? 1 : 0.55,
    y: 0,
    rotate: i === 0 ? -2 : i === 1 ? 6 : 12,
    transition: { duration: 0.6, ease: settle, delay: i * 0.08 },
  }),
};

const stampIn: Variants = {
  hidden: { opacity: 0, scale: 1.4, rotate: -12 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: -5,
    transition: { type: "spring", stiffness: 400, damping: 20, delay: 0.75 },
  },
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

function FanSlip({
  row,
  index,
  reduced,
}: {
  row: ManifestRow;
  index: number;
  reduced: boolean;
}) {
  const isPrimary = index === 0;

  return (
    <motion.li
      custom={index}
      variants={fanIn}
      initial={reduced ? false : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, margin: "-10% 0px" }}
      className={`absolute left-1/2 top-0 w-[88%] max-w-[16.5rem] -translate-x-1/2 list-none rounded-sm border px-3 py-3 sm:px-3.5 sm:py-3.5 ${
        isPrimary
          ? "z-30 border-accent/30 bg-background shadow-[0_12px_28px_-14px_rgb(var(--shadow-color)/0.45)]"
          : "z-10 border-border/60 bg-background/90"
      }`}
      style={{ transformOrigin: "50% 120%" }}
    >
      <p className="font-display text-base leading-none text-foreground">{row.workload}</p>
      <div className="mt-2.5 space-y-1.5 text-[10px] sm:text-[11px]">
        <p>
          <span className="text-muted-foreground">Store </span>
          <span className="font-medium text-accent">{row.store}</span>
        </p>
        <p>
          <span className="text-muted-foreground">Retrieval </span>
          <span className="font-medium text-accent-secondary">{row.retrieval}</span>
        </p>
        <p>
          <span className="text-muted-foreground">Rail </span>
          <span className="text-foreground">{row.rail}</span>
          <span className="float-right font-display tabular-nums text-foreground">{row.amount}</span>
        </p>
      </div>

      {isPrimary && row.settled ? (
        <motion.div
          className="pointer-events-none absolute bottom-2 right-3"
          variants={stampIn}
          initial={reduced ? false : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={{ once: true, margin: "-8% 0px" }}
        >
          <div className="rounded-sm border-2 border-success px-2 py-0.5 text-[10px] font-medium text-success">
            Settled
          </div>
        </motion.div>
      ) : null}
    </motion.li>
  );
}

function SettlementFan({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[20rem] sm:max-w-[22rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/14 blur-3xl"
      />

      <div className="relative rounded-2xl border border-border/70 bg-surface px-3 pb-4 pt-3 sm:px-4 sm:pb-5 sm:pt-4">
        <p className="text-center font-display text-sm text-foreground">triplicate manifest</p>
        <p className="mt-0.5 text-center text-[10px] text-muted-foreground">settlement fan</p>

        <ol className="relative mx-auto mt-4 h-[11.5rem] sm:h-[12.5rem]">
          {manifests.map((row, index) => (
            <FanSlip key={row.id} row={row} index={index} reduced={reduced} />
          ))}
        </ol>

        <p className="mt-2 text-center text-[10px] leading-4 text-muted-foreground">
          Each row posts to the store that owns it. Stripe and Trust Commerce capture against that
          write — not a separate ledger hunt.
        </p>
      </div>
    </div>
  );
}

export function DataV5Mock5D() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="data-v5-mock-5-d"
      aria-labelledby="data-v5-mock-5-d-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <SettlementFan reduced={reduced} />
        </div>

        <div className="lg:order-2">
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            whileInView={reduced ? undefined : { opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.55, ease: settle }}
          >
            <h2
              id="data-v5-mock-5-d-title"
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
