"use client";

import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const COLS =
  "grid grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)_minmax(0,1.15fr)_minmax(0,0.85fr)_minmax(0,0.7fr)] items-center gap-x-1.5 sm:gap-x-2";

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.04 },
  },
};

const rowSlideIn: Variants = {
  hidden: { opacity: 0, x: -14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.48, ease: settle },
  },
};

const stampIn: Variants = {
  hidden: { opacity: 0, scale: 1.25, rotate: -8 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: -3,
    transition: { type: "spring", stiffness: 420, damping: 22, delay: 0.9 },
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

const headers = ["Workload", "Store", "Retrieval", "Rail", "Amount"] as const;

function FlipCell({
  text,
  delay,
  reduced,
}: {
  text: string;
  delay: number;
  reduced: boolean;
}) {
  return (
    <div
      className="relative h-[1.55rem] overflow-hidden rounded-sm border border-border/60 bg-background sm:h-[1.65rem]"
      style={{ perspective: 480 }}
    >
      <motion.div
        className="flex h-full items-center px-1.5 text-[9px] font-medium leading-none text-accent-secondary sm:px-2 sm:text-[10px]"
        style={{ transformOrigin: "50% 0%" }}
        initial={reduced ? false : { rotateX: -88, opacity: 0 }}
        whileInView={reduced ? undefined : { rotateX: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 0.46, ease: settle, delay }}
      >
        <span className="truncate">{text}</span>
      </motion.div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-border/80"
      />
    </div>
  );
}

function StripCell({
  value,
  tone = "foreground",
}: {
  value: string;
  tone?: "foreground" | "accent";
}) {
  const toneClass = tone === "accent" ? "text-accent" : "text-foreground";

  return (
    <div className="flex h-[1.55rem] items-center overflow-hidden rounded-sm border border-border/50 bg-surface px-1.5 sm:h-[1.65rem] sm:px-2">
      <span className={`truncate text-[9px] font-medium sm:text-[10px] ${toneClass}`}>
        {value}
      </span>
    </div>
  );
}

function ColumnHeaders() {
  return (
    <div
      className={`${COLS} border-b border-border/70 px-2 pb-1.5 pt-0.5 sm:px-2.5`}
      aria-hidden="true"
    >
      {headers.map((label) => (
        <span
          key={label}
          className="truncate text-[8px] font-medium uppercase tracking-wide text-muted-foreground sm:text-[9px]"
        >
          {label}
        </span>
      ))}
    </div>
  );
}

function LedgerRow({
  row,
  index,
  reduced,
}: {
  row: ManifestRow;
  index: number;
  reduced: boolean;
}) {
  const isPrimary = index === 0;
  const flipDelay = 0.22 + index * 0.12;

  return (
    <motion.li
      className={`relative list-none px-1.5 py-1 sm:px-2 sm:py-1.5 ${
        isPrimary
          ? "rounded-md border border-accent/45 bg-accent/8 shadow-[inset_3px_0_0_0_var(--accent)]"
          : "border-b border-border/40 last:border-b-0"
      }`}
      style={{ opacity: isPrimary ? 1 : 0.78 }}
      variants={rowSlideIn}
    >
      <div className={COLS}>
        <StripCell value={row.workload} />
        <StripCell value={row.store} tone="accent" />
        <FlipCell text={row.retrieval} delay={flipDelay} reduced={reduced} />
        <StripCell value={row.rail} />
        <div className="flex h-[1.55rem] items-center justify-end overflow-hidden rounded-sm border border-border/50 bg-surface px-1.5 sm:h-[1.65rem] sm:px-2">
          <span className="truncate font-display text-[10px] leading-none text-foreground sm:text-[11px]">
            {row.amount}
          </span>
        </div>
      </div>

      {row.settled && isPrimary && (
        <motion.div
          className="pointer-events-none absolute -right-0.5 top-1/2 -translate-y-1/2 sm:right-0"
          variants={stampIn}
          initial={reduced ? false : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={{ once: true, margin: "-8% 0px" }}
        >
          <div className="rounded-sm border border-success/60 bg-success/12 px-1.5 py-0.5 text-[8px] font-medium tracking-wide text-success sm:text-[9px]">
            Settled
          </div>
        </motion.div>
      )}
    </motion.li>
  );
}

function LedgerStrip({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[21rem] sm:max-w-[24rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[42%] h-44 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/14 blur-3xl"
      />

      <div className="dark relative" data-theme="dark">
        <motion.div
          className="relative overflow-hidden rounded-[1.1rem] border border-border bg-surface-elevated shadow-[0_28px_56px_-32px_rgb(var(--shadow-color)/0.75)] sm:rounded-[1.2rem]"
          variants={stage}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <div className="flex items-end justify-between gap-3 border-b border-border/80 bg-surface px-3 py-2.5 sm:px-3.5 sm:py-3">
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

          <div
            aria-hidden="true"
            className="h-1 bg-[repeating-linear-gradient(90deg,var(--surface)_0_5px,color-mix(in_srgb,var(--border)_55%,transparent)_5px_6px)]"
          />

          <div className="bg-background/40 px-1 py-1.5 sm:px-1.5 sm:py-2">
            <ColumnHeaders />
            <ol className="mt-0.5 space-y-0.5 sm:space-y-1">
              {manifests.map((row, index) => (
                <LedgerRow
                  key={row.id}
                  row={row}
                  index={index}
                  reduced={reduced}
                />
              ))}
            </ol>
          </div>

          <div className="border-t border-border/70 bg-surface px-3.5 py-2.5 sm:px-4">
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

export function DataV5Mock5E() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="data-v5-mock-5-e"
      aria-labelledby="data-v5-mock-5-e-title"
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
              id="data-v5-mock-5-e-title"
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
