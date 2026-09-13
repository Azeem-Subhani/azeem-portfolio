"use client";

import type { CSSProperties } from "react";
import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.06 },
  },
};

const pass: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: settle },
  },
};

const pop: Variants = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 380, damping: 20 },
  },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 28, rotateX: 12 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.75, ease: settle },
  },
};

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: settle },
  },
};

const stores = [
  {
    id: "pg",
    label: "PostgreSQL",
    short: "PG",
    detail: "orders, ledgers",
    x: 18,
    accent: "var(--accent)",
  },
  {
    id: "ddb",
    label: "DynamoDB",
    short: "DDB",
    detail: "session, scale",
    x: 50,
    accent: "var(--signal)",
  },
  {
    id: "fs",
    label: "Firestore",
    short: "FS",
    detail: "live sync",
    x: 82,
    accent: "var(--success)",
  },
] as const;

const payments = [
  { id: "stripe", label: "Stripe", detail: "card checkout" },
  { id: "trust", label: "Trust Commerce", detail: "memorial portal" },
] as const;

const traceLines = [
  { id: 1, text: "memorial_orders WHERE id = $1", tone: "muted" as const },
  { id: 2, text: "→ Postgres row 8842", tone: "accent" as const },
  { id: 3, text: "RAG: pull policy excerpt", tone: "signal" as const },
  { id: 4, text: "charge via Trust Commerce", tone: "accent" as const },
];

function DatabaseCylinder({
  label,
  short,
  detail,
  accent,
}: {
  label: string;
  short: string;
  detail: string;
  accent: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-[4.5rem] w-[3.6rem]">
        {[0, 1, 2].map((layer) => (
          <div
            key={layer}
            className="absolute inset-x-0 rounded-[0.55rem] border border-foreground/12 bg-surface-elevated shadow-[inset_0_1px_0_rgb(238_232_213/0.12)]"
            style={{
              height: "1.15rem",
              top: `${layer * 0.95}rem`,
              opacity: 1 - layer * 0.12,
              boxShadow:
                layer === 0
                  ? `0 0 18px color-mix(in srgb, ${accent} 35%, transparent), inset 0 1px 0 rgb(238 232 213 / 0.14)`
                  : undefined,
            }}
          />
        ))}
        <div
          className="absolute inset-x-0 bottom-0 flex h-[1.35rem] items-center justify-center rounded-[0.55rem] border border-foreground/10 text-[10px] font-semibold tracking-wide"
          style={{
            background: `color-mix(in srgb, ${accent} 22%, var(--surface))`,
            color: accent,
          }}
        >
          {short}
        </div>
      </div>
      <div className="text-center">
        <p className="text-[11px] font-medium text-foreground">{label}</p>
        <p className="text-[10px] text-muted-foreground">{detail}</p>
      </div>
    </div>
  );
}

function QueryTracePanel() {
  return (
    <motion.div
      className="absolute left-3 top-4 z-20 w-[11.5rem] overflow-hidden rounded-xl border border-border/80 bg-background/90 p-3 shadow-[0_16px_40px_-24px_rgb(0_0_0/0.65)] backdrop-blur-md sm:left-5 sm:w-[12.5rem]"
      variants={rise}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] font-medium text-muted-foreground">Live trace</p>
        <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-1.5 py-0.5 text-[9px] text-accent">
          <span className="size-1 rounded-full bg-accent" />
          running
        </span>
      </div>
      <div className="mt-2.5 space-y-1.5 font-mono text-[9px] leading-4">
        {traceLines.map((line) => (
          <motion.p
            key={line.id}
            className={
              line.tone === "muted"
                ? "text-muted-foreground"
                : line.tone === "signal"
                  ? "text-signal"
                  : "text-accent"
            }
            variants={fade}
          >
            {line.text}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}

function RagHub({ reduced }: { reduced: boolean }) {
  return (
    <motion.div className="relative mx-auto flex w-fit flex-col items-center" variants={pop}>
      <div className="relative flex size-[4.75rem] items-center justify-center rounded-2xl border border-accent/35 bg-surface-elevated shadow-[0_0_32px_color-mix(in_srgb,var(--accent)_28%,transparent)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-2 rounded-xl bg-[radial-gradient(circle_at_50%_40%,color-mix(in_srgb,var(--accent)_30%,transparent),transparent_70%)]"
        />
        <div className="relative grid grid-cols-3 gap-1 p-2">
          {Array.from({ length: 9 }).map((_, index) => (
            <span
              key={index}
              className="size-1 rounded-full bg-accent/70"
              style={{ opacity: 0.35 + (index % 3) * 0.2 }}
            />
          ))}
        </div>
        {!reduced && (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl border border-accent/50"
            animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>
      <p className="mt-2 text-center text-[11px] font-medium text-foreground">RAG retrieval</p>
      <p className="text-[10px] text-muted-foreground">context at query time</p>
    </motion.div>
  );
}

function PaymentRail({
  label,
  detail,
  index,
}: {
  label: string;
  detail: string;
  index: number;
}) {
  return (
    <motion.div
      className="flex min-w-0 flex-1 flex-col items-center rounded-xl border border-border/70 bg-background/75 px-3 py-2.5 backdrop-blur-sm"
      variants={fade}
      custom={index}
    >
      <p className="truncate text-[11px] font-medium text-foreground">{label}</p>
      <p className="mt-0.5 text-[10px] text-muted-foreground">{detail}</p>
    </motion.div>
  );
}

function TopologyVisual() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[22rem] md:max-w-[28rem]" style={{ perspective: 1200 }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[52%] h-64 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-3xl"
      />

      <div className="dark relative" data-theme="dark">
        <motion.div
          className="relative min-h-[34rem] overflow-hidden rounded-[1.75rem] border border-accent/20 bg-surface px-4 pb-6 pt-5 shadow-[0_0_0_1px_rgb(42_161_152/0.12),0_32px_64px_-32px_rgb(0_43_54/0.75)] sm:min-h-[36rem] sm:px-6"
          variants={stage}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <div
            aria-hidden="true"
            className="graph-paper pointer-events-none absolute inset-0 opacity-35"
            style={{ "--glow-x": "50%", "--glow-y": "38%" } as CSSProperties}
          />

          <QueryTracePanel />

          <motion.div className="relative mt-[7.5rem] flex justify-center" variants={pass}>
            <RagHub reduced={reduced} />
          </motion.div>

          <svg
            viewBox="0 0 320 180"
            className="pointer-events-none absolute inset-x-6 top-[11.5rem] h-[11rem] w-[calc(100%-3rem)] text-border sm:inset-x-8"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid meet"
          >
            {stores.map((store) => {
              const startX = 160;
              const startY = 12;
              const endX = (store.x / 100) * 320;
              const endY = 150;
              const midY = 78;
              return (
                <motion.path
                  key={store.id}
                  d={`M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  variants={draw}
                />
              );
            })}
            {payments.map((payment, index) => {
              const startX = index === 0 ? 110 : 210;
              const endX = index === 0 ? 56 : 264;
              return (
                <motion.path
                  key={payment.id}
                  d={`M ${startX} 168 L ${endX} 132`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeDasharray="4 5"
                  variants={draw}
                />
              );
            })}
            {!reduced &&
              stores.map((store, index) => (
                <motion.circle
                  key={`pulse-${store.id}`}
                  r="3"
                  fill="var(--accent)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    delay: index * 0.55,
                    ease: "linear",
                  }}
                >
                  <animateMotion
                    dur="2.4s"
                    repeatCount="indefinite"
                    begin={`${index * 0.55}s`}
                    path={`M 160 12 C 160 78, ${(store.x / 100) * 320} 78, ${(store.x / 100) * 320} 150`}
                  />
                </motion.circle>
              ))}
          </svg>

          <motion.div
            className="relative mt-6 grid grid-cols-3 gap-3 sm:gap-5"
            variants={pass}
          >
            {stores.map((store) => (
              <motion.div key={store.id} variants={pop}>
                <DatabaseCylinder
                  label={store.label}
                  short={store.short}
                  detail={store.detail}
                  accent={store.accent}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="relative mt-8" variants={pass}>
            <motion.p
              className="mb-3 text-center text-[10px] font-medium tracking-wide text-muted-foreground"
              variants={fade}
            >
              payments routed through stores
            </motion.p>
            <div className="flex gap-3">
              {payments.map((payment, index) => (
                <PaymentRail
                  key={payment.id}
                  label={payment.label}
                  detail={payment.detail}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="mt-5 flex items-center justify-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-[10px] text-muted-foreground backdrop-blur-sm"
            variants={fade}
          >
            <span className="size-1.5 rounded-full bg-success" />
            500+ authenticated charges/day on memorial portal
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export function DataSectionMock1() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="data"
      aria-labelledby="data-mock-1-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <TopologyVisual />
        </div>

        <div className="lg:order-2">
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 24 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.75, ease: settle }}
          >
            <h2
              id="data-mock-1-title"
              className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
            >
              Enterprise data management
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
              Postgres holds relational orders and ledgers. DynamoDB and Firestore pick up the
              workloads that need scale or live sync. RAG pulls the right context when a query
              runs. Stripe and Trust Commerce charge against whichever store owns the record.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
