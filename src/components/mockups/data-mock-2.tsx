"use client";

import { CreditCard, Database, Search } from "lucide-react";
import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const phoneIn: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: 10, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.82, ease: settle },
  },
};

const screen: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.22, staggerChildren: 0.07 },
  },
};

const pass: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: settle },
  },
};

const pop: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 360, damping: 20 },
  },
};

const dock: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: settle },
  },
};

const tabs = [
  { label: "Ledger", icon: Database, active: true },
  { label: "Retrieve", icon: Search, active: false },
  { label: "Pay", icon: CreditCard, active: false },
] as const;

const syncRows = [
  { store: "PostgreSQL", note: "row 8842 · installment 2", tone: "accent" as const },
  { store: "DynamoDB", note: "session mirror", tone: "signal" as const },
  { store: "Firestore", note: "family app live", tone: "success" as const },
];

function StatusBar() {
  return (
    <div className="flex items-end justify-between px-5 pb-1 pt-3 text-[10px] font-medium text-muted-foreground">
      <span>2:14</span>
      <span className="flex items-center gap-1">
        <svg viewBox="0 0 16 12" className="h-2.5 w-3.5 fill-current" aria-hidden="true">
          <rect x="0" y="6" width="2.2" height="6" rx="0.4" />
          <rect x="3.6" y="3.5" width="2.2" height="8.5" rx="0.4" />
          <rect x="7.2" y="1" width="2.2" height="11" rx="0.4" />
          <rect x="10.8" y="0" width="2.2" height="12" rx="0.4" opacity="0.35" />
        </svg>
        <svg viewBox="0 0 24 12" className="h-2.5 w-5 fill-current" aria-hidden="true">
          <rect
            x="0"
            y="1"
            width="18"
            height="10"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <rect x="2" y="3" width="11" height="6" rx="1" />
          <rect x="19" y="4" width="2" height="4" rx="0.6" />
        </svg>
      </span>
    </div>
  );
}

function RagSnippet({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl border border-signal/30 bg-background px-3.5 py-3"
      variants={pop}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 -top-6 size-20 rounded-full bg-signal/20 blur-2xl"
      />
      <div className="relative flex items-start justify-between gap-2">
        <p className="text-[10px] font-medium text-signal">RAG retrieval</p>
        {!reduced && (
          <motion.span
            className="inline-flex items-center gap-1 text-[9px] text-muted-foreground"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="size-1 rounded-full bg-signal" />
            indexed
          </motion.span>
        )}
      </div>
      <p className="relative mt-2 text-[11px] leading-[1.45] text-foreground">
        Payment plans may split across three installments. Late changes require staff
        approval before the next charge posts.
      </p>
      <p className="relative mt-2 text-[9px] text-muted-foreground">
        source: memorial_policy_v3.pdf
      </p>
    </motion.div>
  );
}

function LedgerConsole({ reduced }: { reduced: boolean }) {
  return (
    <div
      className="relative mx-auto w-full max-w-[18.5rem]"
      style={{ perspective: 1400 }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[55%] h-72 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/28 blur-3xl"
      />

      <div className="dark relative" data-theme="dark">
        <motion.div
          className="relative z-20 origin-center"
          style={{ transformStyle: "preserve-3d" }}
          variants={phoneIn}
        >
          <div className="rounded-[2.75rem] bg-background p-[10px] shadow-[0_0_0_1px_rgb(42_161_152/0.28),0_36px_70px_-28px_rgb(7_54_66/0.55)]">
            <div className="pointer-events-none absolute inset-0 rounded-[2.75rem] ring-1 ring-inset ring-foreground/12" />
            <motion.div
              className="relative flex h-[35.5rem] flex-col overflow-hidden rounded-[2.05rem] bg-surface"
              variants={screen}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-linear-to-b from-accent/14 to-transparent" />
              <div className="absolute left-1/2 top-[7px] z-20 h-[1.35rem] w-[5.15rem] -translate-x-1/2 rounded-full bg-background shadow-[inset_0_1px_2px_rgb(0_43_54/0.85)]" />

              <motion.div variants={fade}>
                <StatusBar />
              </motion.div>

              <motion.div className="flex min-h-0 flex-1 flex-col px-3.5 pb-2 pt-1" variants={pass}>
                <motion.div variants={fade}>
                  <p className="text-[11px] font-medium text-foreground">Memorial ledger</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">Oak Hill Chapel</p>
                </motion.div>

                <motion.div
                  className="mt-3 flex items-center gap-2 rounded-2xl border border-border/80 bg-background px-3 py-2.5"
                  variants={fade}
                >
                  <Search className="size-3.5 shrink-0 text-muted-foreground" strokeWidth={2} />
                  <p className="truncate text-[12px] text-foreground">
                    Whitmore payment schedule
                  </p>
                </motion.div>

                <motion.div className="mt-3" variants={pass}>
                  <RagSnippet reduced={reduced} />
                </motion.div>

                <motion.div
                  className="mt-3 rounded-2xl border border-accent/35 bg-background px-3.5 py-3"
                  variants={pop}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[10px] text-muted-foreground">Whitmore family</p>
                      <p className="mt-0.5 font-display text-[1.85rem] leading-none text-foreground">
                        $1,280
                      </p>
                    </div>
                    <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[9px] font-medium text-accent">
                      installment 2
                    </span>
                  </div>
                  <div className="mt-3 space-y-1.5">
                    {syncRows.map((row) => (
                      <motion.div
                        key={row.store}
                        className="flex items-center justify-between gap-2 text-[10px]"
                        variants={fade}
                      >
                        <span
                          className={
                            row.tone === "accent"
                              ? "text-accent"
                              : row.tone === "signal"
                                ? "text-signal"
                                : "text-success"
                          }
                        >
                          {row.store}
                        </span>
                        <span className="truncate text-muted-foreground">{row.note}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-border/70 bg-surface-elevated/80 px-3 py-2.5"
                  variants={fade}
                >
                  <div>
                    <p className="text-[10px] text-muted-foreground">Charge posted</p>
                    <p className="text-[11px] font-medium text-foreground">Trust Commerce</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground">Stripe fallback</p>
                    <p className="text-[11px] text-accent">ready</p>
                  </div>
                </motion.div>

                <motion.p
                  className="mt-auto pt-3 text-[10px] leading-4 text-muted-foreground"
                  variants={fade}
                >
                  RAG pulled the policy excerpt before Postgres wrote the charge row.
                </motion.p>
              </motion.div>

              <motion.div
                className="border-t border-border bg-background px-2 pb-1.5 pt-2"
                variants={dock}
              >
                <div className="grid grid-cols-3">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <div
                        key={tab.label}
                        className={`flex flex-col items-center gap-0.5 ${
                          tab.active ? "text-accent" : "text-muted-foreground"
                        }`}
                      >
                        <Icon className="size-4" strokeWidth={1.75} />
                        <span className="text-[9px] font-medium">{tab.label}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="mx-auto mt-2 h-1 w-28 rounded-full bg-muted-foreground/30" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function DataSectionMock2() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="data"
      aria-labelledby="data-mock-2-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <LedgerConsole reduced={reduced} />
        </div>

        <div className="lg:order-2">
          <h2
            id="data-mock-2-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            Stores that agree before a charge posts
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            PostgreSQL holds the ledger row. DynamoDB mirrors the session when traffic
            spikes. Firestore pushes status to the family app. RAG retrieval finds the
            policy excerpt first. Stripe and Trust Commerce charge against whichever store
            owns the record.
          </p>
        </div>
      </div>
    </section>
  );
}
