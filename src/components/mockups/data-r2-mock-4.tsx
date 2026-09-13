"use client";

import { useState } from "react";
import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13, delayChildren: 0.04 },
  },
};

const pass: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const slipFan: Variants = {
  hidden: { opacity: 0, y: 36, rotate: 0, scale: 0.94 },
  visible: (custom: { rotate: number; lift: number }) => ({
    opacity: 1,
    y: custom.lift,
    rotate: custom.rotate,
    scale: 1,
    transition: { duration: 0.72, ease: settle },
  }),
};

const fade: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: settle },
  },
};

type SlipKey = "postgres" | "dynamo" | "firestore" | "rag";

type Slip = {
  key: SlipKey;
  product: string;
  store: string;
  record: string;
  detail: string;
  rail: string;
  railTone: "accent" | "signal";
  rotate: number;
  lift: number;
  z: number;
};

const slips: Slip[] = [
  {
    key: "postgres",
    product: "Track Hero",
    store: "PostgreSQL",
    record: "reservation TH-4821",
    detail: "Sonoma slot held for Saturday 10:30",
    rail: "Stripe",
    railTone: "accent",
    rotate: -2.8,
    lift: 0,
    z: 40,
  },
  {
    key: "dynamo",
    product: "Memorial portal",
    store: "DynamoDB",
    record: "pk WHIT-2024-0312",
    detail: "$1,280 toward pre-arranged services",
    rail: "Trust Commerce",
    railTone: "signal",
    rotate: 1.4,
    lift: -8,
    z: 30,
  },
  {
    key: "firestore",
    product: "Oxym",
    store: "Firestore",
    record: "invoice thread · 14 receipts",
    detail: "Connect transfer queued for coach payout",
    rail: "Stripe Connect",
    railTone: "accent",
    rotate: -0.6,
    lift: -16,
    z: 20,
  },
  {
    key: "rag",
    product: "Oxym email",
    store: "RAG retrieval",
    record: "3 docs from team index",
    detail: "Pre-event draft ready to send at 4:00",
    rail: "team index",
    railTone: "signal",
    rotate: 2.2,
    lift: -24,
    z: 10,
  },
];

const mobileTabs: { key: SlipKey; short: string }[] = [
  { key: "postgres", short: "Postgres" },
  { key: "dynamo", short: "Dynamo" },
  { key: "firestore", short: "Firestore" },
  { key: "rag", short: "RAG" },
];

function Perforation() {
  return (
    <div
      aria-hidden="true"
      className="flex justify-center gap-[5px] border-b border-dashed border-border/90 pb-2"
    >
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="size-[5px] rounded-full bg-border/80"
          style={{ opacity: 0.45 + (i % 3) * 0.15 }}
        />
      ))}
    </div>
  );
}

function EndorsementStamp({
  label,
  tone,
}: {
  label: string;
  tone: "accent" | "signal";
}) {
  const ring =
    tone === "signal"
      ? "border-signal/50 text-signal"
      : "border-accent/50 text-accent";

  return (
    <div
      className={`flex size-[4.25rem] shrink-0 items-center justify-center rounded-full border-[1.5px] ${ring}`}
      style={{ transform: "rotate(-14deg)" }}
    >
      <p className="max-w-[3rem] text-center text-[8px] font-medium leading-[1.15]">
        {label}
      </p>
    </div>
  );
}

function IndexBadge({ label }: { label: string }) {
  return (
    <div className="flex size-[4.25rem] shrink-0 items-center justify-center rounded-lg border border-border bg-surface-elevated">
      <p className="max-w-[3rem] text-center text-[8px] font-medium leading-[1.15] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

function DepositSlip({
  slip,
  compact,
}: {
  slip: Slip;
  compact?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-border/80 bg-background shadow-[0_18px_44px_-28px_rgb(var(--shadow-color)/0.45)] ${
        compact ? "w-full" : "absolute inset-x-4 top-6 w-[calc(100%-2rem)] max-w-[17.5rem]"
      }`}
      style={
        compact
          ? undefined
          : {
              zIndex: slip.z,
              transform: `rotate(${slip.rotate}deg) translateY(${slip.lift}px)`,
            }
      }
    >
      <div className="px-4 pb-4 pt-3">
        <Perforation />
        <div className="mt-3 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] text-muted-foreground">{slip.product}</p>
            <p className="mt-0.5 text-[11px] font-medium text-foreground">{slip.store}</p>
            <p className="mt-3 font-display text-[1.35rem] leading-[1.08] text-foreground sm:text-[1.45rem]">
              {slip.record}
            </p>
            <p className="mt-2 text-[11px] leading-5 text-muted-foreground">{slip.detail}</p>
          </div>
          {slip.key === "rag" ? (
            <IndexBadge label={slip.rail} />
          ) : (
            <EndorsementStamp label={slip.rail} tone={slip.railTone} />
          )}
        </div>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-[4.75rem] w-px border-r border-dashed border-border/60"
      />
    </div>
  );
}

function SlipStack({ reduced }: { reduced: boolean }) {
  const [active, setActive] = useState<SlipKey>("postgres");
  const activeSlip = slips.find((s) => s.key === active)!;

  return (
    <div className="relative mx-auto w-full max-w-[20rem] sm:max-w-[22rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[42%] h-52 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/16 blur-3xl"
      />

      <motion.div
        className="relative overflow-hidden rounded-[1.65rem] border border-border/70 bg-surface px-1 pb-1 pt-1 shadow-[0_0_0_1px_rgb(42_161_152/0.08),0_24px_52px_-30px_rgb(7_54_66/0.35)]"
        variants={stage}
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
      >
        <motion.div
          className="relative hidden min-h-[23.5rem] md:block"
          variants={pass}
        >
          <motion.p
            className="absolute left-5 top-4 text-[11px] text-muted-foreground"
            variants={fade}
          >
            Each write carries its payment rail
          </motion.p>

          <div className="relative mx-auto min-h-[21rem] max-w-[19rem] pt-12">
            {slips.map((slip) => (
              <motion.div
                key={slip.key}
                custom={{ rotate: slip.rotate, lift: slip.lift }}
                variants={slipFan}
              >
                <DepositSlip slip={slip} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="relative flex flex-col md:hidden" variants={pass}>
          <motion.div className="px-4 pb-3 pt-4" variants={fade}>
            <p className="text-[11px] text-muted-foreground">Cross-store writes</p>
            <p className="font-display text-[1.4rem] leading-none text-foreground">
              {activeSlip.store}
            </p>
          </motion.div>

          <motion.div className="min-h-[13.5rem] px-4" variants={fade} key={active}>
            <DepositSlip slip={activeSlip} compact />
          </motion.div>

          <motion.p
            className="px-4 pb-3 text-[11px] leading-5 text-muted-foreground"
            variants={fade}
          >
            Tap a store below to see the record shape and which payment rail cleared it.
          </motion.p>

          <motion.div
            className="border-t border-border/70 bg-background/95 px-2 pb-2 pt-2 backdrop-blur-sm"
            variants={fade}
          >
            <div className="grid grid-cols-4 gap-1">
              {mobileTabs.map((tab) => {
                const selected = tab.key === active;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActive(tab.key)}
                    className={`rounded-xl px-1 py-2 text-center text-[9px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      selected
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.short}
                  </button>
                );
              })}
            </div>
            <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-muted-foreground/25" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function DataR2Mock4() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="data-r2-4"
      aria-labelledby="data-r2-4-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <SlipStack reduced={reduced} />
        </div>
        <div className="lg:order-2">
          <h2
            id="data-r2-4-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            Enterprise data management
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            PostgreSQL, DynamoDB, Firestore, and RAG retrieval sit under the products I
            ship. Stripe and Trust Commerce move the money through those stores.
          </p>
        </div>
      </div>
    </section>
  );
}
