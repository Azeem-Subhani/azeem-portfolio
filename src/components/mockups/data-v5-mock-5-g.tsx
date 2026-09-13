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

const slabIn: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: settle },
  },
};

const rowIn: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: settle },
  },
};

const stampIn: Variants = {
  hidden: { opacity: 0, scale: 1.25, rotate: -8 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: -3,
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

function AccentRule() {
  return (
    <div
      aria-hidden="true"
      className="my-2.5 h-px bg-accent/35 sm:my-3"
    />
  );
}

function Field({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: "accent" | "signal";
}) {
  const valueClass =
    highlight === "accent"
      ? "text-accent"
      : highlight === "signal"
        ? "text-accent-secondary"
        : "text-foreground";

  return (
    <div className="grid grid-cols-[5.5rem_1fr] items-baseline gap-2 sm:grid-cols-[6.25rem_1fr]">
      <span className="text-[10px] leading-tight text-muted-foreground sm:text-[11px]">
        {label}
      </span>
      <span
        className={`truncate text-[11px] font-medium leading-snug sm:text-xs ${valueClass}`}
      >
        {value}
      </span>
    </div>
  );
}

function ManifestCard({
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
      className={`relative list-none rounded-lg border px-3 py-3 sm:px-3.5 sm:py-3.5 ${
        isPrimary
          ? "border-accent/30 bg-surface shadow-[0_0_0_1px_rgb(var(--shadow-color)/0.06),0_8px_24px_-12px_rgb(var(--shadow-color)/0.55)]"
          : "border-border/70 bg-background/80"
      }`}
      variants={rowIn}
    >
      <Field label="Workload" value={row.workload} />

      <div className="mt-1.5">
        <Field label="Store" value={row.store} highlight="accent" />
        <p className="mt-0.5 pl-[5.5rem] text-[9px] leading-4 text-muted-foreground sm:pl-[6.25rem] sm:text-[10px]">
          {row.storeNote}
        </p>
      </div>

      <AccentRule />

      <Field label="Query" value={row.query} highlight="signal" />
      <div className="mt-1.5">
        <Field label="Retrieval" value={row.retrieval} highlight="signal" />
      </div>

      <AccentRule />

      <div className="relative">
        <Field label="Rail" value={row.rail} />
        <div className="mt-1.5">
          <Field label="Amount" value={row.amount} />
        </div>

        {row.settled && isPrimary && (
          <motion.div
            className="pointer-events-none absolute bottom-0 right-0 sm:bottom-0.5 sm:right-1"
            variants={stampIn}
            initial={reduced ? false : "hidden"}
            whileInView={reduced ? undefined : "visible"}
            viewport={{ once: true, margin: "-8% 0px" }}
          >
            <div className="rounded-md border border-success/50 bg-success/10 px-2 py-0.5 text-[10px] font-medium tracking-wide text-success sm:text-[11px]">
              Settled
            </div>
          </motion.div>
        )}
      </div>
    </motion.li>
  );
}

function DispatchSlab({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[19.5rem] sm:max-w-[22rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[40%] h-44 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/14 blur-3xl"
      />

      <div className="dark relative" data-theme="dark">
        <motion.div
          className="relative overflow-hidden rounded-[1.15rem] border border-border bg-surface-elevated shadow-[0_28px_56px_-32px_rgb(var(--shadow-color)/0.75)] sm:rounded-[1.25rem]"
          variants={stage}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <motion.div
            className="border-b border-accent/25 bg-accent/12 px-3.5 py-3 sm:px-4 sm:py-3.5"
            variants={slabIn}
          >
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="font-display text-[1.05rem] leading-tight text-foreground sm:text-lg">
                  Store routing
                </p>
                <p className="mt-0.5 text-[10px] leading-4 text-muted-foreground sm:text-[11px]">
                  triplicate manifest
                </p>
              </div>
              <p className="text-right text-[10px] leading-4 text-accent-secondary sm:text-[11px]">
                RAG at
                <br />
                query time
              </p>
            </div>
          </motion.div>

          <ol className="space-y-2 px-2.5 py-2.5 sm:space-y-2.5 sm:px-3 sm:py-3">
            {manifests.map((row, index) => (
              <ManifestCard
                key={row.id}
                row={row}
                index={index}
                reduced={reduced}
              />
            ))}
          </ol>

          <div className="border-t border-border bg-surface px-3.5 py-2.5 sm:px-4">
            <p className="text-[10px] leading-4 text-muted-foreground sm:text-[11px]">
              Each row posts to the store that owns it. Stripe and Trust Commerce capture
              against that write — not a separate ledger hunt.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function DataV5Mock5G() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="data-v5-mock-5-g"
      aria-labelledby="data-v5-mock-5-g-title"
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
              id="data-v5-mock-5-g-title"
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
