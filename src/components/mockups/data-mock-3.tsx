"use client";

import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const pass: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: settle },
  },
};

const panelIn: Variants = {
  hidden: { opacity: 0, y: 28, rotateX: 12 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.75, ease: settle },
  },
};

const floatIn: Variants = {
  hidden: { opacity: 0, x: 32, y: 20, scale: 0.92 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: settle },
  },
};

const pop: Variants = {
  hidden: { opacity: 0, scale: 0.75 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 380, damping: 18 },
  },
};

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0.3 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.1, ease: settle },
  },
};

const pulse: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0.35, 1, 0.35],
    transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
  },
};

const ledgerRows = [
  { id: "8844", name: "Chen family", amount: "$125", status: "posted" },
  { id: "8845", name: "Rivera trust", amount: "$500", status: "posted" },
  { id: "8846", name: "Whitmore", amount: "$847", status: "settling", hot: true },
  { id: "8847", name: "Nguyen", amount: "$200", status: "queued" },
];

const ragChunks = [
  { score: 0.94, text: "Contributions post within one business day after card capture." },
  { score: 0.88, text: "Trust Commerce handles ACH for amounts over $750." },
  { score: 0.81, text: "Refund requests route through the chapel admin, not Stripe directly." },
];

const syncTargets = [
  { label: "Postgres", detail: "ledger row 8846", tone: "accent" as const },
  { label: "Dynamo", detail: "session cache", tone: "signal" as const },
  { label: "Firestore", detail: "mobile receipt", tone: "muted" as const },
];

function DbGlyph({ kind }: { kind: "postgres" | "dynamo" | "firestore" }) {
  if (kind === "postgres") {
    return (
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
        <ellipse cx="12" cy="5" rx="8" ry="3" fill="currentColor" opacity="0.35" />
        <path
          d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  }
  if (kind === "dynamo") {
    return (
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
        <path
          d="M4 18L12 4l8 14H4z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path d="M8 14h8" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
      <path
        d="M6 8c0-2.2 2.7-4 6-4s6 1.8 6 4v8c0 2.2-2.7 4-6 4s-6-1.8-6-4V8z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M6 10c0 2.2 2.7 4 6 4s6-1.8 6-4" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function DataReconciliationVisual({ reduced }: { reduced: boolean }) {
  return (
    <div
      className="relative mx-auto w-full max-w-[22rem] md:max-w-[28rem]"
      style={{ perspective: 1200 }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[52%] h-64 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/25 blur-3xl"
      />

      <div className="dark relative" data-theme="dark">
        <motion.div
          className="relative min-h-[34rem] md:min-h-[36rem]"
          style={{ transformStyle: "preserve-3d" }}
          variants={stage}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <motion.div
            className="absolute left-0 top-6 hidden w-[15.5rem] origin-bottom-right md:block lg:-left-6"
            style={{ transform: "rotate(-6deg)", transformStyle: "preserve-3d" }}
            variants={panelIn}
          >
            <div className="overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-[0_24px_48px_-28px_rgb(0_0_0/0.65)]">
              <div className="flex items-center justify-between border-b border-border px-3 py-2">
                <p className="text-[10px] text-muted-foreground">Dynamo stream</p>
                <span className="rounded-full bg-accent/15 px-1.5 py-0.5 text-[9px] text-accent">
                  live
                </span>
              </div>
              <div className="space-y-1.5 p-3 font-mono text-[9px] leading-4 text-muted-foreground">
                <p>
                  <span className="text-accent">INSERT</span> session#k7f2
                </p>
                <p>
                  <span className="text-signal">UPDATE</span> cart.total 847
                </p>
                <p>
                  <span className="text-success">PUT</span> receipt.mobile
                </p>
                <p className="text-foreground/70">p95 write 12ms</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative z-10 mx-auto w-full max-w-[20.5rem]"
            style={{ transformStyle: "preserve-3d" }}
            variants={panelIn}
          >
            <div className="rounded-[1.35rem] border border-accent/25 bg-background p-[7px] shadow-[0_0_0_1px_rgb(42_161_152/0.12),0_32px_64px_-32px_rgb(0_0_0/0.7)]">
              <motion.div
                className="overflow-hidden rounded-[1.05rem] bg-surface"
                variants={pass}
              >
                <motion.div
                  className="flex items-center justify-between border-b border-border px-4 py-2.5"
                  variants={fade}
                >
                  <div>
                    <p className="text-[10px] text-muted-foreground">Oak Hill Chapel</p>
                    <p className="text-[13px] font-medium text-foreground">Contribution ledger</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <DbGlyph kind="postgres" />
                    <span className="text-[10px] text-muted-foreground">Postgres</span>
                  </div>
                </motion.div>

                <motion.div className="grid grid-cols-[2.5rem_1fr_3.5rem_3.5rem] gap-x-2 px-3 py-2 text-[9px] text-muted-foreground" variants={fade}>
                  <span>#</span>
                  <span>Family</span>
                  <span className="text-right">Amt</span>
                  <span className="text-right">State</span>
                </motion.div>

                <motion.div className="px-2 pb-2" variants={pass}>
                  {ledgerRows.map((row) => (
                    <motion.div
                      key={row.id}
                      className={`grid grid-cols-[2.5rem_1fr_3.5rem_3.5rem] gap-x-2 rounded-lg px-2 py-1.5 text-[10px] ${
                        row.hot
                          ? "bg-accent/12 ring-1 ring-accent/35"
                          : "text-muted-foreground"
                      }`}
                      variants={pop}
                    >
                      <span className={row.hot ? "text-accent" : undefined}>{row.id}</span>
                      <span className={row.hot ? "font-medium text-foreground" : undefined}>
                        {row.name}
                      </span>
                      <span className={`text-right ${row.hot ? "text-foreground" : ""}`}>
                        {row.amount}
                      </span>
                      <span
                        className={`text-right ${
                          row.status === "settling"
                            ? "font-medium text-signal"
                            : row.status === "posted"
                              ? "text-success"
                              : ""
                        }`}
                      >
                        {row.status}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  className="flex items-center justify-between border-t border-border bg-background/60 px-4 py-2.5"
                  variants={fade}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex size-5 items-center justify-center rounded-md bg-[#635bff]/20 text-[8px] font-semibold text-[#b4aeff]">
                      S
                    </span>
                    <div>
                      <p className="text-[10px] text-muted-foreground">Stripe capture</p>
                      <p className="text-[11px] font-medium text-foreground">pi_3Qx…9k2f</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground">Trust Commerce</p>
                    <p className="text-[11px] font-medium text-success">ACH queued</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="absolute -right-1 top-[11.5rem] z-20 w-[13.5rem] md:right-0 lg:-right-8"
            variants={floatIn}
          >
            <div className="overflow-hidden rounded-2xl border border-signal/30 bg-background shadow-[0_20px_44px_-24px_rgb(0_0_0/0.75)]">
              <div className="border-b border-border bg-surface px-3 py-2">
                <p className="text-[10px] text-muted-foreground">Family question</p>
                <p className="text-[11px] text-foreground">
                  When does our $847 post to the ledger?
                </p>
              </div>
              <motion.div className="relative p-3" variants={pass}>
                <svg
                  viewBox="0 0 180 48"
                  className="absolute left-3 right-3 top-0 h-12 w-[calc(100%-1.5rem)] text-accent/50"
                  aria-hidden="true"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M 0 24 C 45 8, 90 40, 180 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeDasharray="3 4"
                    variants={draw}
                  />
                </svg>
                <p className="relative pt-6 text-[9px] font-medium text-accent">RAG retrieval</p>
                <div className="relative mt-2 space-y-1.5">
                  {ragChunks.map((chunk, index) => (
                    <motion.div
                      key={chunk.score}
                      className="rounded-lg bg-surface px-2 py-1.5"
                      variants={fade}
                      custom={index}
                    >
                      <p className="text-[8px] text-signal">{chunk.score.toFixed(2)} match</p>
                      <p className="mt-0.5 text-[9px] leading-3.5 text-muted-foreground">
                        {chunk.text}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-4 left-1/2 z-30 w-[min(100%,19rem)] -translate-x-1/2"
            variants={fade}
          >
            <div className="rounded-2xl border border-border bg-surface-elevated/90 px-3 py-2.5 backdrop-blur-md">
              <p className="mb-2 text-center text-[9px] text-muted-foreground">
                One payment, three stores
              </p>
              <div className="grid grid-cols-3 gap-2">
                {syncTargets.map((target, index) => (
                  <motion.div
                    key={target.label}
                    className="flex flex-col items-center gap-1 rounded-xl bg-background/70 px-2 py-2"
                    variants={pop}
                    custom={index}
                  >
                    <DbGlyph
                      kind={
                        target.label === "Postgres"
                          ? "postgres"
                          : target.label === "Dynamo"
                            ? "dynamo"
                            : "firestore"
                      }
                    />
                    <p className="text-[10px] font-medium text-foreground">{target.label}</p>
                    <p className="text-center text-[8px] leading-3 text-muted-foreground">
                      {target.detail}
                    </p>
                    {!reduced && target.label === "Postgres" ? (
                      <motion.span
                        className="size-1.5 rounded-full bg-accent"
                        variants={pulse}
                      />
                    ) : (
                      <span className="size-1.5 rounded-full bg-accent/40" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export function DataSectionMock3() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="data-mock-3"
      aria-labelledby="data-mock-3-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <DataReconciliationVisual reduced={reduced} />
        </div>
        <div className="lg:order-2">
          <h2
            id="data-mock-3-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            Enterprise data management
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            Memorial contributions hit Postgres first. Mobile clients read the same totals from
            Firestore. When a family asks when their payment clears, RAG pulls the answer from
            policy docs instead of a support ticket. Stripe captures the card. Trust Commerce
            queues the ACH.
          </p>
        </div>
      </div>
    </section>
  );
}
