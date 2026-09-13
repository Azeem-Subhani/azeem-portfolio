"use client";

import type { KeyboardEvent } from "react";
import { useState } from "react";
import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

/** Mock-local palette: walnut rack panel, not site cream, near-black+acid, or r2/v3 clipboard defaults */
const rack = {
  chassis: "#3d2c2e",
  panel: "#4a383a",
  well: "#2f2224",
  bezel: "#5c4a4c",
  ink: "#f0e8e4",
  muted: "#a89490",
  jack: "#6b5658",
  cable: "#c17f59",
  pg: "#4a90a4",
  ddb: "#d4845a",
  fs: "#c4a647",
  rag: "#8b7fa8",
  stripe: "#7b9fd4",
  trust: "#b86b52",
} as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.08 },
  },
};

const panelIn: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.72, ease: settle },
  },
};

const cableDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0.3 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.1, ease: settle, delay: 0.35 },
  },
};

const jackIn: Variants = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: settle, delay },
  }),
};

type RouteKey = "postgres" | "dynamo" | "firestore" | "rag";

type PatchRoute = {
  key: RouteKey;
  store: string;
  storeTint: string;
  workload: string;
  schemaNote: string;
  rail: string;
  railTint: string;
  cablePath: string;
  jackX: number;
};

const routes: PatchRoute[] = [
  {
    key: "postgres",
    store: "PostgreSQL",
    storeTint: rack.pg,
    workload: "Relational ledger",
    schemaNote: "orders.id owns the charge row",
    rail: "Stripe",
    railTint: rack.stripe,
    cablePath: "M 120 108 C 120 148, 72 168, 72 208",
    jackX: 120,
  },
  {
    key: "dynamo",
    store: "DynamoDB",
    storeTint: rack.ddb,
    workload: "Session keys at volume",
    schemaNote: "pk + sk partition the write",
    rail: "Trust Commerce",
    railTint: rack.trust,
    cablePath: "M 160 108 C 160 148, 160 168, 160 208",
    jackX: 160,
  },
  {
    key: "firestore",
    store: "Firestore",
    storeTint: rack.fs,
    workload: "Live client sync",
    schemaNote: "doc path mirrors payout state",
    rail: "Stripe",
    railTint: rack.stripe,
    cablePath: "M 200 108 C 200 148, 248 168, 248 208",
    jackX: 200,
  },
  {
    key: "rag",
    store: "RAG retrieval",
    storeTint: rack.rag,
    workload: "Retrieval query",
    schemaNote: "index injected at query time",
    rail: "No charge",
    railTint: rack.muted,
    cablePath: "M 240 108 C 240 148, 288 168, 288 208",
    jackX: 240,
  },
];

const mobileTabs: { key: RouteKey; short: string }[] = [
  { key: "postgres", short: "Postgres" },
  { key: "dynamo", short: "Dynamo" },
  { key: "firestore", short: "Firestore" },
  { key: "rag", short: "RAG" },
];

function Jack({
  x,
  y,
  tint,
  active,
  label,
  onClick,
}: {
  x: number;
  y: number;
  tint: string;
  active?: boolean;
  label?: string;
  onClick?: () => void;
}) {
  return (
    <g
      {...(onClick
        ? {
            role: "button" as const,
            tabIndex: 0,
            onClick,
            onKeyDown: (e: KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            },
            style: { cursor: "pointer" },
          }
        : {})}
    >
      <rect
        x={x - 14}
        y={y - 10}
        width="28"
        height="20"
        rx="3"
        fill={rack.jack}
        stroke={active ? tint : rack.bezel}
        strokeWidth={active ? +2 : 1}
      />
      <circle cx={x - 5} cy={y} r="2.5" fill={active ? tint : rack.bezel} />
      <circle cx={x + 5} cy={y} r="2.5" fill={active ? tint : rack.bezel} />
      {label ? (
        <text
          x={x}
          y={y + 22}
          textAnchor="middle"
          fill={active ? tint : rack.muted}
          fontSize="7.5"
          fontFamily="var(--font-h2), sans-serif"
          fontWeight={active ? 600 : 400}
        >
          {label}
        </text>
      ) : null}
    </g>
  );
}

function PatchBayPanel({
  route,
  reduced,
  onSelect,
}: {
  route: PatchRoute;
  reduced: boolean;
  onSelect: (key: RouteKey) => void;
}) {
  return (
    <svg
      viewBox="0 0 320 260"
      className="relative z-10 h-auto w-full"
      role="img"
      aria-label={`${route.store} patched to ${route.rail} for ${route.workload}`}
    >
      <motion.path
        key={route.key}
        d={route.cablePath}
        fill="none"
        stroke={rack.cable}
        strokeWidth="2.5"
        strokeLinecap="round"
        variants={cableDraw}
        initial={reduced ? false : "hidden"}
        animate="visible"
        style={{ filter: "drop-shadow(0 0 4px rgb(193 127 89 / 0.35))" }}
      />

      <motion.g custom={reduced ? 0 : 0.18} variants={jackIn}>
        <rect
          x="128"
          y="28"
          width="64"
          height="28"
          rx="4"
          fill={rack.well}
          stroke={rack.bezel}
          strokeWidth="1"
        />
        <text
          x="160"
          y="46"
          textAnchor="middle"
          fill={rack.ink}
          fontSize="8"
          fontFamily="var(--font-h2), sans-serif"
        >
          Incoming write
        </text>
        <Jack x={160} y={72} tint={rack.cable} active />
      </motion.g>

      {routes.map((r, i) => (
        <motion.g
          key={r.key}
          custom={reduced ? 0 : 0.28 + i * 0.08}
          variants={jackIn}
        >
          <Jack
            x={r.jackX}
            y={108}
            tint={r.storeTint}
            active={r.key === route.key}
            label={r.store.split(" ")[0]}
            onClick={() => onSelect(r.key)}
          />
        </motion.g>
      ))}

      <motion.g custom={reduced ? 0 : 0.62} variants={jackIn}>
        <Jack
          x={route.rail === "Trust Commerce" ? 160 : route.rail === "No charge" ? 288 : 72}
          y={208}
          tint={route.railTint}
          active
        />
        <text
          x={route.rail === "Trust Commerce" ? 160 : route.rail === "No charge" ? 288 : 72}
          y={232}
          textAnchor="middle"
          fill={route.railTint}
          fontSize="8"
          fontFamily="var(--font-h2), sans-serif"
          fontWeight="500"
        >
          {route.rail}
        </text>
      </motion.g>
    </svg>
  );
}

function PatchBayVisual({ reduced }: { reduced: boolean }) {
  const [active, setActive] = useState<RouteKey>("postgres");
  const route = routes.find((r) => r.key === active)!;

  return (
    <div className="relative mx-auto w-full max-w-[20rem] sm:max-w-[24rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[44%] h-56 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "color-mix(in srgb, #c17f59 18%, transparent)" }}
      />

      <motion.div
        className="relative overflow-hidden rounded-[1.5rem] border shadow-[0_28px_56px_-32px_rgb(47_34_36/0.85)]"
        style={{
          borderColor: "color-mix(in srgb, #c17f59 24%, transparent)",
          background: rack.chassis,
        }}
        variants={stage}
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
      >
        <div
          className="flex items-center justify-between gap-3 px-3.5 py-2.5 sm:px-4"
          style={{ background: rack.well }}
        >
          <div>
            <p className="text-[10px] leading-tight" style={{ color: rack.muted }}>
              Store patch bay
            </p>
            <p className="mt-0.5 text-[11px] font-medium" style={{ color: rack.ink }}>
              wired at schema time
            </p>
          </div>
          <div
            className="rounded-md px-2 py-1 text-[9px] font-medium"
            style={{
              color: route.storeTint,
              background: `color-mix(in srgb, ${route.storeTint} 18%, transparent)`,
            }}
          >
            {route.store}
          </div>
        </div>

        <motion.div
          className="relative px-3 pb-2 pt-3 sm:px-4 sm:pb-3"
          style={{ background: rack.panel }}
          variants={panelIn}
        >
          <PatchBayPanel route={route} reduced={reduced} onSelect={setActive} />

          <div
            className="mt-1 rounded-lg px-3 py-2.5"
            style={{ background: rack.well }}
          >
            <p className="text-[10px]" style={{ color: rack.muted }}>
              {route.workload}
            </p>
            <p className="mt-1 text-[11px] leading-5" style={{ color: rack.ink }}>
              {route.schemaNote}
            </p>
          </div>
        </motion.div>

        <div
          className="border-t px-2 pb-2 pt-2 md:hidden"
          style={{
            background: rack.well,
            borderColor: "color-mix(in srgb, #f0e8e4 10%, transparent)",
          }}
        >
          <div className="grid grid-cols-4 gap-1">
            {mobileTabs.map((tab) => {
              const selected = tab.key === active;
              const tint = routes.find((r) => r.key === tab.key)!.storeTint;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActive(tab.key)}
                  className="rounded-lg px-1 py-2.5 text-center text-[9px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  style={
                    selected
                      ? {
                          background: `color-mix(in srgb, ${tint} 22%, ${rack.panel})`,
                          color: rack.ink,
                        }
                      : { color: rack.muted }
                  }
                >
                  {tab.short}
                </button>
              );
            })}
          </div>
          <div
            aria-hidden="true"
            className="mx-auto mt-2 h-1 w-20 rounded-full"
            style={{ background: "color-mix(in srgb, #f0e8e4 18%, transparent)" }}
          />
        </div>

        <div
          className="hidden items-center justify-between gap-3 px-3.5 py-2.5 md:flex sm:px-4"
          style={{
            background: rack.well,
            borderTop: "1px solid color-mix(in srgb, #f0e8e4 10%, transparent)",
          }}
        >
          <p className="text-[10px] leading-4" style={{ color: rack.muted }}>
            Click a jack on desktop to re-patch. Stripe and Trust Commerce post to
            the store that owns the row.
          </p>
          {!reduced ? (
            <motion.span
              aria-hidden="true"
              className="size-2 shrink-0 rounded-full"
              style={{ background: rack.cable }}
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          ) : (
            <span
              aria-hidden="true"
              className="size-2 shrink-0 rounded-full"
              style={{ background: rack.cable }}
            />
          )}
        </div>

        <div
          className="flex items-center justify-between gap-3 px-3.5 py-2.5 md:hidden sm:px-4"
          style={{
            background: rack.well,
            borderTop: "1px solid color-mix(in srgb, #f0e8e4 10%, transparent)",
          }}
        >
          <p className="text-[10px] leading-4" style={{ color: rack.muted }}>
            Stripe and Trust Commerce post to the store that owns the row
          </p>
          {!reduced ? (
            <motion.span
              aria-hidden="true"
              className="size-2 shrink-0 rounded-full"
              style={{ background: rack.cable }}
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          ) : (
            <span
              aria-hidden="true"
              className="size-2 shrink-0 rounded-full"
              style={{ background: rack.cable }}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}

export function DataV3Mock1() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="data-v3-mock-1"
      aria-labelledby="data-v3-mock-1-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <PatchBayVisual reduced={reduced} />
        </div>

        <div className="lg:order-2">
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            whileInView={reduced ? undefined : { opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.55, ease: settle }}
          >
            <h2
              id="data-v3-mock-1-title"
              className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
            >
              Pick the store before the first write
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
              Orders and ledgers stay relational in PostgreSQL. Session keys that
              spike traffic belong in DynamoDB. Live sync across clients fits
              Firestore. When a query needs policy text, RAG retrieval injects
              it before anyone answers.
            </p>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              Stripe and Trust Commerce post against the store that owns the row.
              I wire that path when we design the schema, not after the first
              failed charge.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
