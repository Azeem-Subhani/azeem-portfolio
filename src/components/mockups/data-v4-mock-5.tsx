"use client";

import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

/** Mock-local: midnight brass registry — not v3 walnut, steel clipboard, or slate dial */
const reg = {
  ground: "#0e1218",
  panel: "#171e28",
  well: "#111820",
  brass: "#b8956a",
  ink: "#dde3ea",
  muted: "#6b7585",
  rule: "#2a3442",
  pg: "#4a9a96",
  ddb: "#5d8ec8",
  fs: "#96aa58",
  rag: "#8f7fbb",
  stripe: "#6888d4",
  trust: "#c07852",
  posted: "#3d8a72",
} as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.04 },
  },
};

const rowIn: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: settle },
  },
};

const barDraw: Variants = {
  hidden: { scaleX: 0, opacity: 0.4 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.85, ease: settle, delay: 0.25 },
  },
};

const stampIn: Variants = {
  hidden: { opacity: 0, scale: 1.2, rotate: -8 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: -4,
    transition: { type: "spring", stiffness: 380, damping: 22, delay: 1.05 },
  },
};

type RegistryRow = {
  id: string;
  workload: string;
  store: string;
  storeTint: string;
  rail: string;
  railTint: string;
  retrieval: string;
  amount: string;
};

const rows: RegistryRow[] = [
  {
    id: "ledger",
    workload: "Order ledger",
    store: "PostgreSQL",
    storeTint: reg.pg,
    rail: "Stripe",
    railTint: reg.stripe,
    retrieval: "Policy excerpt · 0.89",
    amount: "$1,240.00",
  },
  {
    id: "session",
    workload: "Checkout session",
    store: "DynamoDB",
    storeTint: reg.ddb,
    rail: "Trust Commerce",
    railTint: reg.trust,
    retrieval: "Installment rule · 41ms",
    amount: "$680.00",
  },
  {
    id: "sync",
    workload: "Roster sync",
    store: "Firestore",
    storeTint: reg.fs,
    rail: "Stripe Connect",
    railTint: reg.stripe,
    retrieval: "4 receipts matched",
    amount: "$320.00",
  },
];

const chips = ["Schema-time routing", "Live sync", "Retrieval queries"];

function Crossbar({ tint, reduced }: { tint: string; reduced: boolean }) {
  return (
    <motion.div
      className="relative h-0.5 flex-1 origin-left rounded-full"
      style={{ background: tint }}
      variants={barDraw}
      initial={reduced ? false : "hidden"}
      animate="visible"
    />
  );
}

function RegistryRowBlock({
  row,
  index,
  reduced,
}: {
  row: RegistryRow;
  index: number;
  reduced: boolean;
}) {
  const isPrimary = index === 0;

  return (
    <motion.li
      className="relative list-none rounded-md px-3 py-3 sm:px-3.5 sm:py-3.5"
      style={{
        background: isPrimary ? reg.well : "transparent",
        border: isPrimary ? `1px solid ${reg.rule}` : undefined,
      }}
      variants={rowIn}
    >
      <div className="flex items-baseline justify-between gap-2">
        <p
          className="text-[10px] font-medium sm:text-[11px]"
          style={{ color: reg.muted }}
        >
          {row.workload}
        </p>
        <p
          className="tabular-nums text-[10px] sm:text-[11px]"
          style={{ color: reg.ink }}
        >
          {row.amount}
        </p>
      </div>

      <div className="mt-2.5 flex items-center gap-2">
        <span
          className="shrink-0 text-[9px] font-medium sm:text-[10px]"
          style={{ color: row.storeTint }}
        >
          {row.store}
        </span>
        <Crossbar tint={row.storeTint} reduced={reduced} />
        <span
          className="shrink-0 text-[9px] font-medium sm:text-[10px]"
          style={{ color: row.railTint }}
        >
          {row.rail}
        </span>
      </div>

      <p className="mt-2 text-[9px] leading-4 sm:text-[10px]" style={{ color: reg.muted }}>
        RAG: {row.retrieval}
      </p>

      {isPrimary && (
        <motion.div
          className="pointer-events-none absolute right-6 top-[38%] hidden sm:block"
          variants={stampIn}
          initial={reduced ? false : "hidden"}
          whileInView={reduced ? undefined : "visible"}
          viewport={{ once: true, margin: "-8% 0px" }}
        >
          <div
            className="rounded-sm border px-2 py-0.5 text-[9px] font-medium tracking-wide"
            style={{
              color: reg.posted,
              borderColor: reg.posted,
              opacity: 0.9,
            }}
          >
            Posted
          </div>
        </motion.div>
      )}
    </motion.li>
  );
}

function OwnershipRegistry({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[20rem] sm:max-w-[23rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[42%] h-48 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "color-mix(in srgb, #b8956a 14%, transparent)" }}
      />

      <motion.div
        className="relative overflow-hidden rounded-[1.15rem] shadow-[0_28px_56px_-32px_rgb(14_18_24/0.9)] sm:rounded-[1.25rem]"
        style={{
          background: reg.panel,
          border: `1px solid color-mix(in srgb, ${reg.brass} 22%, transparent)`,
        }}
        variants={stage}
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
      >
        <div
          className="flex items-end justify-between gap-3 px-3.5 py-3 sm:px-4 sm:py-3.5"
          style={{
            background: reg.ground,
            borderBottom: `1px solid ${reg.rule}`,
          }}
        >
          <div>
            <p
              className="font-display text-[1.05rem] leading-tight sm:text-lg"
              style={{ color: reg.ink }}
            >
              Ownership registry
            </p>
            <p
              className="mt-0.5 text-[10px] leading-4 sm:text-[11px]"
              style={{ color: reg.muted }}
            >
              store to rail, wired once
            </p>
          </div>
          <div
            className="rounded-md px-2 py-1 text-[9px] font-medium sm:text-[10px]"
            style={{
              color: reg.rag,
              background: `color-mix(in srgb, ${reg.rag} 16%, ${reg.panel})`,
            }}
          >
            RAG at query
          </div>
        </div>

        <ol className="relative space-y-1 px-2 py-2.5 sm:space-y-1.5 sm:px-2.5 sm:py-3">
          {rows.map((row, index) => (
            <RegistryRowBlock
              key={row.id}
              row={row}
              index={index}
              reduced={reduced}
            />
          ))}
        </ol>

        <div
          className="grid grid-cols-3 gap-px px-2 pb-2.5 sm:px-2.5 sm:pb-3"
          aria-hidden="true"
        >
          {[
            { label: "PostgreSQL", tint: reg.pg },
            { label: "DynamoDB", tint: reg.ddb },
            { label: "Firestore", tint: reg.fs },
          ].map((store) => (
            <div
              key={store.label}
              className="rounded-sm py-2 text-center text-[9px] font-medium sm:text-[10px]"
              style={{
                color: store.tint,
                background: `color-mix(in srgb, ${store.tint} 10%, ${reg.well})`,
              }}
            >
              {store.label}
            </div>
          ))}
        </div>

        <div
          className="px-3.5 py-2.5 sm:px-4"
          style={{
            background: reg.ground,
            borderTop: `1px solid ${reg.rule}`,
          }}
        >
          <p className="text-[10px] leading-4 sm:text-[11px]" style={{ color: reg.muted }}>
            Each row posts to the store that owns it. Stripe and Trust Commerce capture
            against that write, not a second lookup.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function CapabilityChips() {
  return (
    <ul className="mt-6 flex flex-wrap gap-2">
      {chips.map((chip) => (
        <li
          key={chip}
          className="list-none rounded-full border border-border bg-surface px-3 py-1 text-sm text-foreground"
        >
          {chip}
        </li>
      ))}
    </ul>
  );
}

export function DataV4Mock5() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="data-v4-mock-5"
      aria-labelledby="data-v4-mock-5-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <OwnershipRegistry reduced={reduced} />
        </div>

        <div className="lg:order-2">
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            whileInView={reduced ? undefined : { opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.55, ease: settle }}
          >
            <h2
              id="data-v4-mock-5-title"
              className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
            >
              Enterprise data management
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
              From relational migration to live sync and retrieval queries, I pick the
              store that owns each write and wire Stripe and Trust Commerce against it at
              schema time.
            </p>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              PostgreSQL holds ledgers. DynamoDB takes session keys at volume. Firestore
              mirrors state to clients. RAG retrieval injects policy text before anyone
              answers. Charges post to the right home on the first attempt.
            </p>
            <CapabilityChips />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
