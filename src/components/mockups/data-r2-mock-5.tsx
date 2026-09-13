"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

/** Mock-local board: cool slate chassis, not site cream or near-black+acid defaults */
const board = {
  chassis: "#1c2430",
  well: "#121820",
  flap: "#0c1218",
  ink: "#e8e4dc",
  muted: "#7a8494",
  accent: "#2aa198",
  signal: "#268bd2",
  success: "#859900",
} as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11, delayChildren: 0.06 },
  },
};

const shellIn: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.68, ease: settle },
  },
};

const copyIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.55, ease: settle },
  },
};

type RowTone = "accent" | "signal" | "success";

type BoardRow = {
  id: string;
  store: string;
  product: string;
  reveal: string;
  rail: string;
  amount: string;
  tone: RowTone;
};

const rows: BoardRow[] = [
  {
    id: "pg",
    store: "PostgreSQL",
    product: "Track Hero",
    reveal: "reservation TH-4821 held",
    rail: "Stripe",
    amount: "$890",
    tone: "accent",
  },
  {
    id: "ddb",
    store: "DynamoDB",
    product: "Memorial portal",
    reveal: "pk WHIT-2024-0312 live",
    rail: "Trust Commerce",
    amount: "$1,280",
    tone: "signal",
  },
  {
    id: "fs",
    store: "Firestore",
    product: "Oxym",
    reveal: "14 receipt docs synced",
    rail: "Stripe Connect",
    amount: "$340",
    tone: "accent",
  },
  {
    id: "rag",
    store: "RAG retrieval",
    product: "Oxym email",
    reveal: "3 docs matched at 0.94",
    rail: "no charge",
    amount: "41ms",
    tone: "success",
  },
];

function toneInk(tone: RowTone) {
  if (tone === "signal") return board.signal;
  if (tone === "success") return board.success;
  return board.accent;
}

function FlapCell({
  text,
  delay,
  reduced,
}: {
  text: string;
  delay: number;
  reduced: boolean;
}) {
  return (
    <div
      className="relative h-[1.65rem] overflow-hidden rounded-sm"
      style={{ background: board.flap, perspective: 480 }}
    >
      <motion.div
        className="flex h-full items-center justify-center px-2 text-[10px] font-medium leading-none sm:text-[11px]"
        style={{ color: board.ink, transformOrigin: "50% 0%" }}
        initial={reduced ? false : { rotateX: -88, opacity: 0 }}
        whileInView={reduced ? undefined : { rotateX: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 0.48, ease: settle, delay }}
      >
        {text}
      </motion.div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 h-px"
        style={{ background: "color-mix(in srgb, #e8e4dc 12%, transparent)" }}
      />
    </div>
  );
}

function SplitFlapRow({
  row,
  index,
  reduced,
}: {
  row: BoardRow;
  index: number;
  reduced: boolean;
}) {
  const tint = toneInk(row.tone);
  const flipDelay = 0.18 + index * 0.14;

  return (
    <motion.li
      className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)_minmax(0,0.9fr)] items-center gap-2 border-b py-2.5 last:border-b-0 sm:gap-3 sm:py-3"
      style={{ borderColor: "color-mix(in srgb, #7a8494 22%, transparent)" }}
      variants={shellIn}
    >
      <div className="min-w-0">
        <p className="truncate text-[9px] leading-tight sm:text-[10px]" style={{ color: board.muted }}>
          {row.product}
        </p>
        <p className="mt-0.5 truncate text-[10px] font-medium sm:text-[11px]" style={{ color: tint }}>
          {row.store}
        </p>
      </div>

      <FlapCell text={row.reveal} delay={flipDelay} reduced={reduced} />

      <div className="min-w-0 text-right">
        <p className="truncate text-[9px] leading-tight sm:text-[10px]" style={{ color: board.muted }}>
          {row.rail}
        </p>
        <p
          className="mt-0.5 truncate text-[11px] font-medium tabular-nums sm:text-xs"
          style={{ color: board.ink }}
        >
          {row.amount}
        </p>
      </div>
    </motion.li>
  );
}

function LiveCounter({ reduced }: { reduced: boolean }) {
  const [count, setCount] = useState(reduced ? 512 : 0);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start - 900) / 520, 1);
      if (t <= 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 512));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <span className="tabular-nums" style={{ color: board.accent }}>
      {count}
    </span>
  );
}

function DepartureBoard({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[21rem] sm:max-w-[24rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[44%] h-48 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "color-mix(in srgb, #2aa198 22%, transparent)" }}
      />

      <motion.div
        className="relative overflow-hidden rounded-[1.25rem] border shadow-[0_24px_52px_-28px_rgb(12_18_24/0.85)]"
        style={{
          borderColor: "color-mix(in srgb, #2aa198 28%, transparent)",
          background: board.chassis,
        }}
        variants={stage}
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
      >
        <div
          className="flex items-center justify-between gap-3 px-3.5 py-2.5 sm:px-4"
          style={{ background: board.well }}
        >
          <div>
            <p className="text-[10px] leading-tight" style={{ color: board.muted }}>
              Memorial portal settlement
            </p>
            <p className="mt-0.5 text-[11px] font-medium" style={{ color: board.ink }}>
              live board
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px]" style={{ color: board.muted }}>
              charges today
            </p>
            <p className="mt-0.5 text-[13px] font-medium leading-none">
              <LiveCounter reduced={reduced} />
            </p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="h-1.5"
          style={{
            background: `repeating-linear-gradient(90deg, ${board.flap} 0 6px, color-mix(in srgb, #7a8494 35%, transparent) 6px 7px)`,
          }}
        />

        <ol className="list-none px-3 sm:px-4">
          {rows.map((row, index) => (
            <SplitFlapRow key={row.id} row={row} index={index} reduced={reduced} />
          ))}
        </ol>

        <div
          className="flex items-center justify-between gap-3 px-3.5 py-2.5 sm:px-4"
          style={{
            background: board.well,
            borderTop: "1px solid color-mix(in srgb, #7a8494 22%, transparent)",
          }}
        >
          <p className="text-[10px] leading-4" style={{ color: board.muted }}>
            Stripe and Trust Commerce post against the store that owns the row
          </p>
          {!reduced && (
            <motion.span
              aria-hidden="true"
              className="size-2 shrink-0 rounded-full"
              style={{ background: board.success }}
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
          {reduced && (
            <span
              aria-hidden="true"
              className="size-2 shrink-0 rounded-full"
              style={{ background: board.success }}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}

export function DataR2Mock5() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="data-r2-mock-5"
      aria-labelledby="data-r2-mock-5-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <DepartureBoard reduced={reduced} />
        </div>

        <div className="lg:order-2">
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            whileInView={reduced ? undefined : { opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.55, ease: settle }}
            variants={copyIn}
          >
            <h2
              id="data-r2-mock-5-title"
              className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
            >
              Enterprise data management
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
              When a charge clears, the row already lives in the store that fits the
              workload. Postgres holds Track Hero reservations. DynamoDB carries memorial
              portal sessions at volume. Firestore keeps Oxym receipts live. RAG pulls
              policy text before anyone answers the ticket.
            </p>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              Stripe and Trust Commerce capture against whichever store posted first. I
              wire that path at schema time so settlement never hunts for a home.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
