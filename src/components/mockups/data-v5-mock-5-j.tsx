"use client";

import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const shellIn: Variants = {
  hidden: { opacity: 0, y: 18, rotate: -0.6 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.65, ease: settle },
  },
};

const lineIn: Variants = {
  hidden: { opacity: 0, x: -6 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.42, ease: settle },
  },
};

const stampIn: Variants = {
  hidden: { opacity: 0, scale: 1.35, rotate: -14 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: -6,
    transition: { type: "spring", stiffness: 420, damping: 22, delay: 0.85 },
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

function Rule() {
  return (
    <div
      aria-hidden="true"
      className="my-2.5 h-px bg-border/80 sm:my-3"
    />
  );
}

function Field({
  label,
  value,
  valueClassName = "text-foreground",
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr] items-baseline gap-2 sm:grid-cols-[6.25rem_1fr]">
      <span className="text-[10px] leading-tight text-muted-foreground sm:text-[11px]">
        {label}
      </span>
      <span
        className={`truncate text-[11px] font-medium leading-snug sm:text-xs ${valueClassName}`}
      >
        {value}
      </span>
    </div>
  );
}

function ManifestSheet({
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
      className={`relative list-none rounded-sm bg-background px-3 py-3 sm:px-3.5 sm:py-3.5 ${
        isPrimary
          ? "shadow-[0_1px_0_var(--border),0_8px_20px_-12px_rgb(var(--shadow-color)/0.18)]"
          : "shadow-[0_1px_0_var(--border)] opacity-[0.72]"
      }`}
      style={
        isPrimary
          ? undefined
          : { transform: `translateY(${index * 3}px) scale(${1 - index * 0.015})` }
      }
      variants={shellIn}
    >
      <motion.div variants={lineIn}>
        <Field label="Workload" value={row.workload} />
        <div className="mt-1.5">
          <Field label="Store" value={row.store} valueClassName="text-accent" />
          <p className="mt-0.5 pl-[5.5rem] text-[9px] leading-4 text-muted-foreground sm:pl-[6.25rem] sm:text-[10px]">
            {row.storeNote}
          </p>
        </div>
      </motion.div>

      <Rule />

      <motion.div variants={lineIn}>
        <Field label="Query" value={row.query} />
        <div className="mt-1.5">
          <Field
            label="Retrieval"
            value={row.retrieval}
            valueClassName="text-accent-secondary"
          />
        </div>
      </motion.div>

      <Rule />

      <motion.div className="relative" variants={lineIn}>
        <Field label="Rail" value={row.rail} />
        <div className="mt-1.5">
          <Field label="Amount" value={row.amount} />
        </div>

        {row.settled && isPrimary && (
          <motion.div
            className="pointer-events-none absolute bottom-1 right-2 sm:bottom-0.5 sm:right-3"
            variants={stampIn}
            initial={reduced ? false : "hidden"}
            whileInView={reduced ? undefined : "visible"}
            viewport={{ once: true, margin: "-8% 0px" }}
          >
            <div className="rounded-sm border-2 border-success px-2 py-0.5 text-[10px] font-medium tracking-wide text-success opacity-90 sm:text-[11px]">
              Settled
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.li>
  );
}

function RoutingClipboard({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[19.5rem] sm:max-w-[22rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[38%] h-44 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/16 blur-3xl"
      />

      <motion.div
        className="relative rounded-[1.15rem] bg-surface-elevated p-[7px] shadow-[0_28px_56px_-32px_rgb(var(--shadow-color)/0.35)] sm:rounded-[1.25rem] sm:p-2"
        variants={stage}
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
      >
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-0 z-20 h-5 w-[4.5rem] -translate-x-1/2 -translate-y-[38%] rounded-b-md bg-gradient-to-b from-border to-muted-foreground/35 shadow-[inset_0_-1px_0_rgb(255_255_255/0.25),0_2px_6px_rgb(var(--shadow-color)/0.2)] sm:h-[1.375rem] sm:w-20"
        />

        <div className="overflow-hidden rounded-[0.85rem] bg-surface sm:rounded-[0.95rem]">
          <div className="flex items-end justify-between gap-3 px-3.5 pb-2 pt-4 sm:px-4 sm:pt-4.5">
            <div>
              <p className="font-display text-[1.05rem] leading-tight text-foreground sm:text-lg">
                Store routing
              </p>
              <p className="mt-0.5 text-[10px] leading-4 text-muted-foreground sm:text-[11px]">
                triplicate manifest
              </p>
            </div>
            <p className="text-right text-[10px] leading-4 text-muted-foreground sm:text-[11px]">
              RAG at
              <br />
              query time
            </p>
          </div>

          <ol className="space-y-2 px-2 pb-2.5 sm:space-y-2.5 sm:px-2.5 sm:pb-3">
            {manifests.map((row, index) => (
              <ManifestSheet
                key={row.id}
                row={row}
                index={index}
                reduced={reduced}
              />
            ))}
          </ol>

          <div className="border-t border-border/70 bg-surface px-3.5 py-2.5 sm:px-4">
            <p className="text-[10px] leading-4 text-muted-foreground sm:text-[11px]">
              Each row posts to the store that owns it. Stripe and Trust Commerce capture against that write — not a separate ledger hunt.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function DataV5Mock5J() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="data-v5-mock-5-j"
      aria-labelledby="data-v5-mock-5-j-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <RoutingClipboard reduced={reduced} />
        </div>

        <div className="lg:order-2">
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            whileInView={reduced ? undefined : { opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.55, ease: settle }}
          >
            <h2
              id="data-v5-mock-5-j-title"
              className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
            >
              Enterprise data management
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
              Postgres holds relational records. DynamoDB and Firestore take over when
              the product needs partition keys or live sync. RAG retrieval answers from
              those stores in one pass.
            </p>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              Stripe and Trust Commerce settle against whichever store posted the row. I
              wire that path at schema time so charges never chase the wrong home.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
