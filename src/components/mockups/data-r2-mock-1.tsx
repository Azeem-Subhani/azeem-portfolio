"use client";

import type { CSSProperties } from "react";
import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

/** Mock-local palette: violet-slate dispatch strip, not site cream defaults */
const strip = {
  base: "#2d2640",
  surface: "#3d3555",
  ink: "#f0ede8",
  muted: "#9b8ec4",
  query: "#7eb8da",
  pay: "#e07a5f",
  pg: "#2aa198",
  ddb: "#268bd2",
  fs: "#859900",
} as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

const frameIn: Variants = {
  hidden: { opacity: 0, scaleY: 0.88, originY: 1 },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: { duration: 0.55, ease: settle },
  },
};

type Frame = {
  id: string;
  label: string;
  body: string;
  detail?: string;
  tint: string;
  mono?: string;
};

const frames: Frame[] = [
  {
    id: "query",
    label: "Incoming query",
    body: "Memorial order lookup",
    mono: "SELECT * FROM memorial_orders WHERE id = $1",
    tint: strip.query,
  },
  {
    id: "pg",
    label: "PostgreSQL",
    body: "Row 8842, installment 2",
    detail: "Orders and ledgers stay relational",
    tint: strip.pg,
  },
  {
    id: "rag",
    label: "RAG retrieval",
    body: "Policy excerpt matched",
    detail: "Context injected at query time",
    tint: strip.muted,
  },
  {
    id: "mirror",
    label: "DynamoDB and Firestore",
    body: "Session mirror, family app sync",
    detail: "Scale and live updates where the product needs them",
    tint: strip.ddb,
  },
  {
    id: "pay",
    label: "Payment rail",
    body: "Stripe or Trust Commerce",
    detail: "Charged against the store that owns the record",
    tint: strip.pay,
  },
];

function PerfRow() {
  return (
    <div
      aria-hidden="true"
      className="flex justify-between px-2 py-1.5"
      style={{ background: strip.surface }}
    >
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className="size-1.5 rounded-full"
          style={{ background: "color-mix(in srgb, #f0ede8 18%, transparent)" }}
        />
      ))}
    </div>
  );
}

function FilmFrame({
  frame,
  className,
}: {
  frame: Frame;
  className?: string;
}) {
  return (
    <motion.div
      className={`relative flex min-w-0 flex-1 flex-col overflow-hidden ${className ?? ""}`}
      variants={frameIn}
      style={
        {
          "--ink": strip.ink,
          "--tint": frame.tint,
        } as CSSProperties
      }
    >
      <div
        className="h-0.5 w-full"
        style={{ background: frame.tint }}
        aria-hidden="true"
      />
      <div
        className="flex flex-1 flex-col px-2.5 py-2.5 sm:px-3 sm:py-3"
        style={{ background: strip.surface }}
      >
        <p
          className="text-[10px] font-medium leading-tight sm:text-[11px]"
          style={{ color: frame.tint }}
        >
          {frame.label}
        </p>
        <p
          className="mt-1.5 text-[11px] font-medium leading-snug sm:text-xs"
          style={{ color: strip.ink }}
        >
          {frame.body}
        </p>
        {frame.mono ? (
          <p
            className="mt-1.5 truncate font-mono text-[8px] leading-4 sm:text-[9px]"
            style={{ color: "color-mix(in srgb, var(--tint) 70%, var(--ink))" }}
          >
            {frame.mono}
          </p>
        ) : null}
        {frame.detail ? (
          <p
            className="mt-auto pt-2 text-[9px] leading-4 sm:text-[10px]"
            style={{ color: strip.muted }}
          >
            {frame.detail}
          </p>
        ) : null}
      </div>
    </motion.div>
  );
}

function DispatchStripVisual() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-[22rem] md:max-w-[28rem]">
      <div
        className="relative overflow-hidden rounded-2xl border shadow-[0_28px_56px_-32px_rgb(45_38_64/0.85)]"
        style={{
          borderColor: "color-mix(in srgb, #9b8ec4 35%, transparent)",
          background: strip.base,
        }}
      >
        <PerfRow />

        <motion.div
          className="relative px-2 py-3 sm:px-3 sm:py-4"
          variants={stage}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          {/* Desktop: horizontal film strip */}
          <ol className="hidden list-none gap-0.5 sm:flex">
            {frames.map((frame) => (
              <li key={frame.id} className="flex min-w-0 flex-1">
                <FilmFrame frame={frame} className="w-full" />
              </li>
            ))}
          </ol>

          {/* Mobile: vertical strip with spine */}
          <ol className="relative list-none space-y-0 sm:hidden">
            <div
              aria-hidden="true"
              className="absolute bottom-2 left-[0.65rem] top-2 w-px"
              style={{ background: "color-mix(in srgb, #9b8ec4 40%, transparent)" }}
            />
            {frames.map((frame) => (
              <li key={frame.id} className="relative pl-5">
                <span
                  aria-hidden="true"
                  className="absolute left-1 top-4 size-2 rounded-full"
                  style={{
                    background: frame.tint,
                    boxShadow: `0 0 0 2px ${strip.base}`,
                  }}
                />
                <FilmFrame frame={frame} className="w-full rounded-lg overflow-hidden" />
              </li>
            ))}
          </ol>

          {!reduced && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-3 top-3 bottom-3 hidden rounded-sm sm:inset-x-4 sm:block"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, color-mix(in srgb, #7eb8da 22%, transparent) 45%, transparent 90%)",
              }}
              initial={{ x: "-110%" }}
              whileInView={{ x: "110%" }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1.35, ease: settle, delay: 0.25 }}
            />
          )}
        </motion.div>

        <PerfRow />

        <div
          className="flex items-center justify-between gap-3 px-3 py-2.5 sm:px-4"
          style={{ background: strip.base }}
        >
          <p className="text-[10px] leading-4" style={{ color: strip.muted }}>
            Memorial portal dispatch
          </p>
          <p className="shrink-0 text-[10px] font-medium" style={{ color: strip.pay }}>
            500+ charges/day
          </p>
        </div>
      </div>
    </div>
  );
}

export function DataR2Mock1() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="data"
      aria-labelledby="data-r2-mock-1-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <DispatchStripVisual />
        </div>

        <div className="lg:order-2">
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 24 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.75, ease: settle }}
          >
            <h2
              id="data-r2-mock-1-title"
              className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
            >
              Enterprise data management
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
              PostgreSQL keeps orders and ledgers in shape. DynamoDB and Firestore pick up session
              state and live sync. RAG pulls the policy excerpt when a query runs. Stripe and Trust
              Commerce charge whichever store owns the record.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
