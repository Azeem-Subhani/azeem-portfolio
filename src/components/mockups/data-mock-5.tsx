"use client";

import { CreditCard, Database, Layers, Search } from "lucide-react";
import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const shellIn: Variants = {
  hidden: { opacity: 0, y: 32, rotateX: 10, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.8, ease: settle },
  },
};

const pass: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: settle },
  },
};

const pop: Variants = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 360, damping: 20 },
  },
};

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.75, ease: settle },
  },
};

const stores = [
  {
    id: "pg",
    label: "Postgres",
    detail: "lineups · invoices",
    angle: -58,
    dist: "38%",
    tone: "accent" as const,
  },
  {
    id: "fs",
    label: "Firestore",
    detail: "live roster sync",
    angle: 62,
    dist: "38%",
    tone: "signal" as const,
  },
  {
    id: "ddb",
    label: "DynamoDB",
    detail: "session cart",
    angle: 178,
    dist: "36%",
    tone: "accent" as const,
  },
];

const dockTabs = [
  { label: "Query", icon: Search, active: true },
  { label: "Stores", icon: Database, active: false },
  { label: "Ledger", icon: CreditCard, active: false },
  { label: "Layers", icon: Layers, active: false },
];

function toneRing(tone: "accent" | "signal") {
  return tone === "signal"
    ? "border-signal/45 bg-signal/14 text-signal"
    : "border-accent/45 bg-accent/14 text-accent";
}

function StatusBar({ time }: { time: string }) {
  return (
    <div className="flex items-end justify-between px-5 pb-1 pt-3 text-[10px] font-medium text-muted-foreground">
      <span>{time}</span>
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
          <rect x="2" y="3" width="12" height="6" rx="1" />
          <rect x="19" y="4" width="2" height="4" rx="0.6" />
        </svg>
      </span>
    </div>
  );
}

function RetrievalConsole({ reduced }: { reduced: boolean }) {
  return (
    <div
      className="relative mx-auto w-full max-w-[20rem] md:max-w-[22rem]"
      style={{ perspective: 1300 }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[48%] h-72 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/25 blur-3xl"
      />

      <div className="dark relative" data-theme="dark">
        <motion.div
          className="relative origin-center"
          style={{ transformStyle: "preserve-3d" }}
          variants={shellIn}
        >
          <motion.div
            className="relative overflow-hidden rounded-[2.35rem] bg-background p-[10px] shadow-[0_0_0_1px_rgb(38_134_210/0.22),0_36px_72px_-30px_rgb(0_43_54/0.7)]"
            variants={pass}
          >
            <div className="pointer-events-none absolute inset-0 rounded-[2.35rem] ring-1 ring-inset ring-foreground/10" />
            <div className="absolute left-1/2 top-[7px] z-20 h-[1.3rem] w-[5rem] -translate-x-1/2 rounded-full bg-surface shadow-[inset_0_1px_2px_rgb(0_43_54/0.85)]" />

            <motion.div
              className="relative flex min-h-[34.5rem] flex-col overflow-hidden rounded-[1.85rem] bg-surface"
              variants={pass}
            >
              <motion.div variants={fade}>
                <StatusBar time="4:02" />
              </motion.div>

              <motion.div className="px-4 pb-2 pt-1" variants={fade}>
                <p className="text-[11px] text-muted-foreground">RAG retrieval</p>
                <p className="font-display text-[1.45rem] leading-tight text-foreground">
                  Which kit for Northside?
                </p>
              </motion.div>

              <motion.div className="relative mx-4 mt-2 flex-1" variants={pass}>
                <svg
                  viewBox="0 0 240 220"
                  className="absolute inset-0 h-full w-full text-accent/40"
                  aria-hidden="true"
                >
                  {stores.map((store) => {
                    const rad = (store.angle * Math.PI) / 180;
                    const cx = 120 + Math.sin(rad) * 78;
                    const cy = 108 + Math.cos(rad) * 72;
                    return (
                      <motion.path
                        key={store.id}
                        d={`M 120 108 L ${cx} ${cy}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.1"
                        strokeDasharray="3 4"
                        variants={draw}
                      />
                    );
                  })}
                  {!reduced && (
                    <motion.circle
                      r="2.5"
                      className="fill-accent"
                      animate={{
                        cx: [120, 52, 120, 188, 120, 120],
                        cy: [108, 48, 108, 48, 168, 108],
                        opacity: [0, 1, 0.6, 1, 0.6, 0],
                      }}
                      transition={{
                        duration: 3.2,
                        repeat: Infinity,
                        repeatDelay: 0.8,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.35, 0.55, 0.75, 1],
                      }}
                    />
                  )}
                </svg>

                <motion.div
                  className="absolute left-1/2 top-[49%] z-10 -translate-x-1/2 -translate-y-1/2"
                  variants={pop}
                >
                  <div className="flex size-14 items-center justify-center rounded-2xl border border-accent/50 bg-accent/18 shadow-[0_0_28px_rgb(42_161_152/0.35)]">
                    <Search className="size-5 text-accent" strokeWidth={1.75} />
                  </div>
                </motion.div>

                {stores.map((store) => {
                  const rad = (store.angle * Math.PI) / 180;
                  const left = 50 + Math.sin(rad) * 34;
                  const top = 49 + Math.cos(rad) * 31;
                  return (
                    <motion.div
                      key={store.id}
                      className="absolute z-20 w-[5.6rem] -translate-x-1/2 -translate-y-1/2"
                      style={{ left: `${left}%`, top: `${top}%` }}
                      variants={pop}
                    >
                      <div
                        className={`rounded-xl border px-2 py-2 text-center backdrop-blur-sm ${toneRing(store.tone)}`}
                      >
                        <p className="text-[10px] font-medium leading-tight">{store.label}</p>
                        <p className="mt-0.5 text-[8px] opacity-80">{store.detail}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              <motion.div className="mx-4 mt-auto space-y-2.5 pb-3" variants={pass}>
                <motion.div
                  className="rounded-2xl border border-border/70 bg-background px-3.5 py-3"
                  variants={fade}
                >
                  <p className="text-[10px] text-muted-foreground">Answer · 3 sources</p>
                  <p className="mt-1 text-[12px] leading-5 text-foreground">
                    Away kit. Northside changed to blue shorts last season.
                  </p>
                  <p className="mt-2 text-[10px] text-accent">Postgres row · Firestore doc · 41ms</p>
                </motion.div>

                <motion.div
                  className="flex items-stretch gap-2"
                  variants={fade}
                >
                  <div className="min-w-0 flex-1 rounded-2xl border border-accent/35 bg-surface-elevated px-3 py-2.5">
                    <p className="text-[9px] text-muted-foreground">Stripe</p>
                    <p className="font-display text-xl leading-none text-foreground">$847</p>
                    <p className="mt-1 text-[9px] text-muted-foreground">dues batch · cleared</p>
                  </div>
                  <div className="flex w-[5.5rem] flex-col justify-between rounded-2xl border border-signal/35 bg-signal/10 px-2.5 py-2.5">
                    <p className="text-[8px] leading-tight text-signal">Trust Commerce</p>
                    <p className="text-[10px] font-medium leading-tight text-foreground">
                      memorial checkout
                    </p>
                    <p className="text-[8px] text-muted-foreground">same ledger</p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                className="border-t border-border bg-background px-2 pb-1.5 pt-2"
                variants={fade}
              >
                <div className="grid grid-cols-4">
                  {dockTabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <div
                        key={tab.label}
                        className={`flex flex-col items-center gap-0.5 ${
                          tab.active ? "text-accent" : "text-muted-foreground"
                        }`}
                      >
                        <Icon className="size-3.5" strokeWidth={1.75} />
                        <span className="text-[8px] font-medium">{tab.label}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-muted-foreground/30" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export function DataSectionMock5() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="data"
      aria-labelledby="data-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <RetrievalConsole reduced={reduced} />
        </div>
        <div className="lg:order-2">
          <h2
            id="data-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            Stores picked for the shape of the data
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            Postgres holds relational records. DynamoDB and Firestore take over when the
            product needs partition keys or live sync. RAG retrieval answers from those
            stores in one pass. Stripe and Trust Commerce settle the charges that write
            back to them.
          </p>
        </div>
      </div>
    </section>
  );
}
