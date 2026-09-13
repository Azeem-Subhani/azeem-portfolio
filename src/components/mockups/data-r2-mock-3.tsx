"use client";

import type { CSSProperties } from "react";
import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

const sheetIn: Variants = {
  hidden: { opacity: 0, y: 24, rotateX: 8 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.72, ease: settle },
  },
};

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0.25 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.15, ease: settle, delay: 0.35 },
  },
};

const columns = [
  {
    id: "pg",
    label: "PostgreSQL",
    rows: [
      { key: "order", text: "order 8846", tone: "fg" as const },
      { key: "ledger", text: "ledger posted", tone: "accent" as const },
      { key: "amt", text: "$847.00", tone: "fg" as const },
    ],
  },
  {
    id: "ddb",
    label: "DynamoDB",
    rows: [
      { key: "sess", text: "session k7f2", tone: "muted" as const },
      { key: "stream", text: "stream write", tone: "signal" as const },
      { key: "ms", text: "12ms p95", tone: "muted" as const },
    ],
  },
  {
    id: "fs",
    label: "Firestore",
    rows: [
      { key: "doc", text: "receipt doc", tone: "muted" as const },
      { key: "sync", text: "family app sync", tone: "signal" as const },
      { key: "read", text: "read 41ms", tone: "muted" as const },
    ],
  },
  {
    id: "rag",
    label: "RAG retrieval",
    rows: [
      { key: "q", text: "when does $847 post?", tone: "muted" as const },
      { key: "hit", text: "0.94 policy match", tone: "accent" as const },
      { key: "ans", text: "one business day", tone: "fg" as const },
    ],
  },
] as const;

function toneClass(tone: "fg" | "muted" | "accent" | "signal") {
  if (tone === "accent") return "text-accent";
  if (tone === "signal") return "text-signal";
  if (tone === "muted") return "text-muted-foreground";
  return "text-foreground";
}

function ColumnLedgerVisual({ reduced }: { reduced: boolean }) {
  return (
    <div
      className="relative mx-auto w-full max-w-[22rem] md:max-w-[28rem]"
      style={{ perspective: 1100 }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[48%] h-56 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl"
      />

      <div className="dark relative" data-theme="dark">
        <motion.div
          className="relative overflow-hidden rounded-[1.35rem] border border-accent/20 bg-surface shadow-[0_0_0_1px_rgb(42_161_152/0.1),0_28px_56px_-28px_rgb(0_0_0/0.7)]"
          style={{ transformStyle: "preserve-3d" }}
          variants={stage}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-30"
            style={
              {
                backgroundImage: `
                  linear-gradient(to right, color-mix(in srgb, var(--muted) 28%, transparent) 1px, transparent 1px),
                  linear-gradient(to bottom, color-mix(in srgb, var(--muted) 18%, transparent) 1px, transparent 1px)
                `,
                backgroundSize: "25% 100%, 100% 2.75rem",
              } as CSSProperties
            }
          />

          <motion.div className="relative border-b border-border/80 px-4 py-3" variants={sheetIn}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] text-muted-foreground">Whitmore contribution</p>
                <p className="mt-0.5 text-[13px] font-medium text-foreground">txn WHIT-8846</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-muted-foreground">Stripe capture</p>
                <p className="mt-0.5 text-[13px] font-medium tabular-nums text-foreground">$847.00</p>
              </div>
            </div>
            <p className="mt-2 text-[9px] tabular-nums text-muted-foreground">pi_3Qx9k2f · card cleared</p>
          </motion.div>

          <div className="relative px-3 py-4 sm:px-4">
            <svg
              viewBox="0 0 280 220"
              className="pointer-events-none absolute inset-x-4 top-2 h-[calc(100%-1rem)] w-[calc(100%-2rem)]"
              aria-hidden="true"
              preserveAspectRatio="none"
            >
              <motion.path
                d="M 140 0 V 220"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.5"
                strokeLinecap="round"
                variants={draw}
              />
              {[70, 140, 210].map((x) => (
                <line
                  key={x}
                  x1={x}
                  y1={0}
                  x2={x}
                  y2={220}
                  stroke="currentColor"
                  strokeWidth="0.75"
                  className="text-border/80"
                />
              ))}
            </svg>

            <div className="relative grid grid-cols-4 gap-0">
              {columns.map((col) => (
                <div key={col.id} className="flex flex-col px-1.5 sm:px-2">
                  <p className="min-h-[2.25rem] text-[9px] leading-3 text-muted-foreground sm:text-[10px]">
                    {col.label}
                  </p>
                  <div className="mt-2 space-y-3">
                    {col.rows.map((row) => (
                      <p
                        key={row.key}
                        className={`text-[9px] leading-3.5 sm:text-[10px] ${toneClass(row.tone)}`}
                      >
                        {row.text}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            className="relative border-t border-border/80 bg-background/50 px-4 py-3"
            variants={sheetIn}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] text-muted-foreground">Trust Commerce</p>
                <p className="mt-0.5 text-[11px] font-medium text-success">ACH queued</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-muted-foreground">Threshold</p>
                <p className="mt-0.5 text-[11px] tabular-nums text-foreground">over $750</p>
              </div>
            </div>
          </motion.div>

          <div className="border-t border-border/60 px-4 py-2.5">
            <p className="text-[9px] leading-4 text-muted-foreground">
              Memorial portal, 500+ authenticated charges per day
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function DataR2Mock3() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="data-r2-mock-3"
      aria-labelledby="data-r2-mock-3-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <ColumnLedgerVisual reduced={reduced} />
        </div>

        <div className="lg:order-2">
          <h2
            id="data-r2-mock-3-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            Enterprise data management
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            I pick the store that fits the workload. Postgres holds ledger rows on the
            memorial portal. DynamoDB mirrors sessions when traffic spikes. Firestore keeps
            the family app in sync. RAG pulls policy text before support gets involved.
            Stripe captures the card. Trust Commerce queues the ACH when the amount crosses
            the threshold.
          </p>
        </div>
      </div>
    </section>
  );
}
