"use client";

import { Check } from "lucide-react";
import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.08 },
  },
};

const panelIn: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.72, ease: settle },
  },
};

const rowIn: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: settle, delay },
  }),
};

const gateOpen: Variants = {
  hidden: { opacity: 0, scaleY: 0.4 },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: { duration: 0.5, ease: settle, delay: 1.05 },
  },
};

type StoreLane = {
  id: string;
  label: string;
  note: string;
  tone: "accent" | "signal" | "success";
  delay: number;
};

const storeLanes: StoreLane[] = [
  {
    id: "pg",
    label: "PostgreSQL",
    note: "ledger row committed",
    tone: "accent",
    delay: 0.52,
  },
  {
    id: "ddb",
    label: "DynamoDB",
    note: "session mirror updated",
    tone: "signal",
    delay: 0.66,
  },
  {
    id: "fs",
    label: "Firestore",
    note: "client doc synced",
    tone: "success",
    delay: 0.8,
  },
];

const chips = [
  "Store routing",
  "Query-time retrieval",
  "Payment wiring",
] as const;

const toneClass = {
  accent: "text-accent",
  signal: "text-signal",
  success: "text-success",
} as const;

const toneBg = {
  accent: "bg-accent/12 border-accent/30",
  signal: "bg-signal/12 border-signal/30",
  success: "bg-success/12 border-success/30",
} as const;

function CommitGateVisual({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[21rem] sm:max-w-[24rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[42%] h-56 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/16 blur-3xl"
      />

      <motion.div
        className="relative overflow-hidden rounded-[1.35rem] border border-border bg-surface shadow-[0_24px_48px_-28px_rgb(var(--shadow-color)/0.45)]"
        variants={stage}
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
      >
        <div className="border-b border-border bg-surface-elevated/80 px-4 py-3">
          <p className="text-[11px] text-muted-foreground">Write batch #8842</p>
          <p className="mt-0.5 text-sm font-medium text-foreground">
            awaiting store agreement
          </p>
        </div>

        <motion.div className="space-y-3 px-4 py-4" variants={panelIn}>
          <motion.div
            className="rounded-xl border border-signal/30 bg-background px-3 py-2.5"
            custom={reduced ? 0 : 0.28}
            variants={rowIn}
          >
            <p className="text-[10px] font-medium text-signal">RAG retrieval</p>
            <p className="mt-1.5 text-[11px] leading-5 text-foreground">
              Refund policy requires staff approval before the next installment posts.
            </p>
            <p className="mt-1.5 text-[9px] text-muted-foreground">
              policy_index · 3 chunks matched
            </p>
          </motion.div>

          <div className="space-y-2">
            {storeLanes.map((lane) => (
              <motion.div
                key={lane.id}
                className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5 ${toneBg[lane.tone]}`}
                custom={reduced ? 0 : lane.delay}
                variants={rowIn}
              >
                <div className="min-w-0">
                  <p className={`text-[11px] font-medium ${toneClass[lane.tone]}`}>
                    {lane.label}
                  </p>
                  <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
                    {lane.note}
                  </p>
                </div>
                <span
                  className={`flex size-5 shrink-0 items-center justify-center rounded-full ${toneBg[lane.tone]}`}
                  aria-hidden="true"
                >
                  <Check className={`size-3 ${toneClass[lane.tone]}`} strokeWidth={2.5} />
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="relative overflow-hidden rounded-xl border border-border bg-background"
            variants={gateOpen}
            style={{ transformOrigin: "top center" }}
          >
            <div className="border-b border-border px-3 py-2">
              <p className="text-[10px] text-muted-foreground">Settlement gate open</p>
            </div>
            <div className="grid grid-cols-2 divide-x divide-border">
              <div className="px-3 py-3">
                <p className="text-[10px] text-muted-foreground">Card capture</p>
                <p className="mt-0.5 text-[11px] font-medium text-foreground">Stripe</p>
                <p className="mt-1 text-[9px] text-accent">ready · owns row</p>
              </div>
              <div className="px-3 py-3">
                <p className="text-[10px] text-muted-foreground">ACH settlement</p>
                <p className="mt-0.5 text-[11px] font-medium text-foreground">
                  Trust Commerce
                </p>
                <p className="mt-1 text-[9px] text-muted-foreground">standby</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="flex items-center justify-between gap-3 border-t border-border bg-surface-elevated/60 px-4 py-2.5">
          <p className="text-[10px] leading-4 text-muted-foreground">
            Charge posts only after every store commits
          </p>
          {!reduced ? (
            <motion.span
              aria-hidden="true"
              className="size-2 shrink-0 rounded-full bg-accent"
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          ) : (
            <span
              aria-hidden="true"
              className="size-2 shrink-0 rounded-full bg-accent"
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}

export function DataV4Mock2() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="data-v4-mock-2"
      aria-labelledby="data-v4-mock-2-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <CommitGateVisual reduced={reduced} />
        </div>

        <div className="lg:order-2">
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            whileInView={reduced ? undefined : { opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.55, ease: settle }}
          >
            <h2
              id="data-v4-mock-2-title"
              className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
            >
              Enterprise data management
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
              From relational ledgers to live client sync, I pick PostgreSQL,
              DynamoDB, or Firestore based on what the write needs. RAG retrieval
              pulls policy context before anyone answers. Stripe and Trust Commerce
              charge against the store that owns the row. I wire that path at schema
              time.
            </p>
            <p className="mt-4 max-w-md text-sm leading-6 text-foreground">
              Money moves after the stores agree.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Capabilities">
              {chips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-foreground"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
