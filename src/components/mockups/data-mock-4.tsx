"use client";

import { useState } from "react";
import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const drift: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: settle },
  },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: settle },
  },
};

const pass: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.1, ease: settle },
  },
};

type StoreKey = "postgres" | "dynamo" | "firestore" | "rag";

type StoreNode = {
  key: StoreKey;
  label: string;
  product: string;
  record: string;
  detail: string;
  rail?: string;
  x: string;
  y: string;
  rotate: string;
  tone: "accent" | "signal";
};

const stores: StoreNode[] = [
  {
    key: "postgres",
    label: "PostgreSQL",
    product: "Track Hero",
    record: "reservation #TH-4821",
    detail: "Sonoma · Saturday 10:30 slot held",
    rail: "Stripe · $890 captured",
    x: "8%",
    y: "14%",
    rotate: "-2.5deg",
    tone: "accent",
  },
  {
    key: "dynamo",
    label: "DynamoDB",
    product: "Memorial portal",
    record: "pk WHIT-2024-0312",
    detail: "$1,280 toward pre-arranged services",
    rail: "Trust Commerce · auth cleared",
    x: "52%",
    y: "6%",
    rotate: "1.5deg",
    tone: "signal",
  },
  {
    key: "firestore",
    label: "Firestore",
    product: "Oxym",
    record: "invoice thread · 14 receipts",
    detail: "Connect transfer queued for coach payout",
    rail: "Stripe Connect · $340",
    x: "4%",
    y: "58%",
    rotate: "2deg",
    tone: "signal",
  },
  {
    key: "rag",
    label: "RAG retrieval",
    product: "Oxym email",
    record: "3 docs pulled from team index",
    detail: "Pre-event draft ready to send at 4:00",
    x: "48%",
    y: "52%",
    rotate: "-1deg",
    tone: "accent",
  },
];

const craftTabs: { key: StoreKey; short: string }[] = [
  { key: "postgres", short: "Postgres" },
  { key: "dynamo", short: "Dynamo" },
  { key: "firestore", short: "Firestore" },
  { key: "rag", short: "RAG" },
];

function toneBorder(tone: "accent" | "signal") {
  return tone === "signal" ? "border-signal/35" : "border-accent/35";
}

function toneGlow(tone: "accent" | "signal") {
  return tone === "signal"
    ? "shadow-[0_0_24px_rgb(38_139_210/0.22)]"
    : "shadow-[0_0_24px_rgb(42_161_152/0.22)]";
}

function RecordSheet({
  node,
  active,
  compact,
}: {
  node: StoreNode;
  active: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border bg-background/92 px-3.5 py-3 backdrop-blur-md transition-[opacity,transform,box-shadow] duration-300 ${toneBorder(node.tone)} ${
        active ? toneGlow(node.tone) : "opacity-55"
      } ${compact ? "" : "absolute w-[min(100%,15.5rem)]"}`}
      style={
        compact
          ? undefined
          : {
              left: node.x,
              top: node.y,
              transform: `rotate(${node.rotate})`,
            }
      }
    >
      <p className="text-[10px] text-muted-foreground">{node.product}</p>
      <p className="mt-0.5 text-[11px] font-medium leading-4 text-foreground">
        {node.label}
      </p>
      <p className="mt-2 font-display text-[1.15rem] leading-tight text-foreground">
        {node.record}
      </p>
      <p className="mt-1.5 text-[10px] leading-4 text-muted-foreground">{node.detail}</p>
      {node.rail && (
        <p className="mt-2 text-[10px] font-medium text-accent">{node.rail}</p>
      )}
    </div>
  );
}

function ConstellationMap({ reduced }: { reduced: boolean }) {
  const [active, setActive] = useState<StoreKey>("postgres");
  const activeNode = stores.find((s) => s.key === active)!;

  return (
    <div
      className="relative mx-auto w-full max-w-[22rem] md:max-w-[28rem]"
      style={{ perspective: 1100 }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[38%] top-[38%] h-56 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl"
      />

      <div className="dark relative" data-theme="dark">
        <motion.div
          className="relative min-h-[26rem] overflow-hidden rounded-[1.75rem] border border-border/60 bg-surface shadow-[0_0_0_1px_rgb(42_161_152/0.1),0_28px_60px_-26px_rgb(0_43_54/0.6)] md:min-h-[30rem]"
          variants={stage}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <div
            aria-hidden="true"
            className="graph-paper pointer-events-none absolute inset-0 opacity-35"
          />

          <motion.div className="relative hidden px-4 pb-24 pt-5 md:block md:px-5 md:pt-6" variants={pass}>
            <motion.div className="relative mb-3 flex items-end justify-between" variants={fade}>
              <div>
                <p className="text-[11px] text-muted-foreground">Cross-store index</p>
                <p className="font-display text-[1.5rem] leading-none text-foreground">
                  live reads
                </p>
              </div>
              <p className="text-right text-[10px] leading-4 text-muted-foreground">
                Stripe and Trust Commerce
                <br />
                settle against each write
              </p>
            </motion.div>

            <svg
              viewBox="0 0 320 280"
              className="pointer-events-none absolute inset-x-4 top-[4.5rem] h-[calc(100%-7rem)] w-[calc(100%-2rem)] text-accent/40"
              aria-hidden="true"
            >
              <motion.path
                d="M 72 48 C 120 72, 168 40, 220 36"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="3 5"
                variants={draw}
              />
              <motion.path
                d="M 56 168 C 110 140, 180 150, 230 132"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="3 5"
                variants={draw}
              />
              <motion.path
                d="M 220 36 C 240 90, 210 120, 230 132"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.9"
                variants={draw}
              />
              <motion.path
                d="M 72 48 C 64 110, 58 150, 56 168"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.9"
                variants={draw}
              />
              {!reduced && (
                <motion.circle
                  r="3"
                  className="fill-accent"
                  animate={{
                    cx: [72, 220, 230, 56, 72],
                    cy: [48, 36, 132, 168, 48],
                    opacity: [0, 1, 1, 1, 0],
                  }}
                  transition={{
                    duration: 4.2,
                    repeat: Infinity,
                    repeatDelay: 0.8,
                    ease: "easeInOut",
                    times: [0, 0.28, 0.52, 0.78, 1],
                  }}
                />
              )}
            </svg>

            <div className="relative min-h-[18.5rem]">
              {stores.map((node) => (
                <motion.div key={node.key} variants={drift}>
                  <RecordSheet node={node} active />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="relative flex flex-col px-4 pb-[4.75rem] pt-5 md:hidden" variants={pass}>
            <motion.div variants={fade}>
              <p className="text-[11px] text-muted-foreground">Cross-store index</p>
              <p className="font-display text-[1.45rem] leading-none text-foreground">
                {activeNode.label}
              </p>
            </motion.div>

            <motion.div className="mt-4 min-h-[14rem]" variants={drift} key={active}>
              <RecordSheet node={activeNode} active compact />
            </motion.div>

            <motion.p className="mt-4 text-[11px] leading-5 text-muted-foreground" variants={fade}>
              Tap a store below to see the record shape and which payment rail cleared it.
            </motion.p>
          </motion.div>

          <motion.div
            className="absolute inset-x-0 bottom-0 border-t border-border/70 bg-background/95 px-2 pb-2 pt-2 backdrop-blur-md md:hidden"
            variants={fade}
          >
            <div className="grid grid-cols-4 gap-1">
              {craftTabs.map((tab) => {
                const selected = tab.key === active;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActive(tab.key)}
                    className={`rounded-xl px-1 py-2 text-center text-[9px] font-medium transition-colors ${
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

          <motion.p
            className="absolute bottom-3 right-4 hidden text-[10px] text-muted-foreground md:block"
            variants={fade}
          >
            retrieval and settlement share one schema contract
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

export function DataSectionMock4() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="data"
      aria-labelledby="data-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <ConstellationMap reduced={reduced} />
        </div>
        <div className="lg:order-2">
          <h2
            id="data-title"
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
