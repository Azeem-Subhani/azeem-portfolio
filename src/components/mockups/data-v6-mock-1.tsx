"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
} from "motion/react";
import { AppWindow, CreditCard, Database, Sparkles } from "lucide-react";

const settle = [0.16, 1, 0.3, 1] as const;

/** Same surface tokens as the cloud trace console, so the two chapters match. */
const tone = {
  chassis: "var(--surface)",
  panel: "var(--surface-elevated)",
  well: "var(--background)",
  ink: "var(--foreground)",
  muted: "var(--muted-foreground)",
} as const;

const hairline = (percent: number) =>
  `color-mix(in srgb, var(--foreground) ${percent}%, transparent)`;

type StoreId = "postgres" | "dynamo" | "firestore";

type Store = {
  label: string;
  /** Short name for the toggle, where space is tight. */
  short: string;
  trait: string;
  color: string;
  writer: string;
  table: string;
  recordKey: string;
  fields: [string, string][];
  question: string;
  answer: string;
  rail: string;
  verdict: string;
};

// Illustrative records, one per store the chapter copy names. Each keeps the
// same shape: the app writes it, AI reads it, the payment rail updates it.
const stores: Record<StoreId, Store> = {
  postgres: {
    label: "PostgreSQL",
    short: "Postgres",
    trait: "Row lock",
    color: "var(--signal)",
    writer: "Booking hold",
    table: "booking_holds",
    recordKey: "id 4821",
    fields: [
      ["slot", "Sat 9:00"],
      ["amount", "$890.00"],
    ],
    question: "Is Saturday 9:00 still open?",
    answer: "Held for you until checkout.",
    rail: "Stripe",
    verdict: "Postgres locks the row until checkout. Stripe marks that same row paid.",
  },
  dynamo: {
    label: "DynamoDB",
    short: "DynamoDB",
    trait: "Partition key",
    color: "var(--accent)",
    writer: "Checkout",
    table: "checkout_sessions",
    recordKey: "pk cart#7Q2",
    fields: [
      ["plan", "3 installments"],
      ["amount", "$1,280.00"],
    ],
    question: "What is left on my plan?",
    answer: "Two installments after today.",
    rail: "Trust Commerce",
    verdict: "The cart id is the partition key. Trust Commerce posts to that same item.",
  },
  firestore: {
    label: "Firestore",
    short: "Firestore",
    trait: "Live sync",
    color: "#b58900",
    writer: "Roster update",
    table: "rosters/u19",
    recordKey: "doc dues-sept",
    fields: [
      ["players", "18"],
      ["amount", "$340.00"],
    ],
    question: "Who still owes dues?",
    answer: "Four players, as of right now.",
    rail: "Stripe Connect",
    verdict: "Every client sees the roster change live. Dues settle on the same doc.",
  },
};

const storeOrder: StoreId[] = ["postgres", "dynamo", "firestore"];

// Map geometry in one fixed viewBox. The HTML nodes sit in a box with the
// same aspect ratio, so percentages line up with SVG units exactly.
const VIEW_W = 480;
const VIEW_H = 260;
const at = { app: [64, 130], store: [240, 130], ai: [410, 58], rail: [410, 202] } as const;
const wires = {
  write: `M ${at.app[0]} 130 L ${at.store[0]} 130`,
  read: `M 240 130 C 322 130, 322 58, ${at.ai[0]} 58`,
  pay: `M ${at.rail[0]} 202 C 322 202, 322 130, 240 130`,
} as const;

/**
 * Run phases, in order. Odd phases are a packet in flight, even phases are the
 * state it left behind: record written, question answered, payment posted.
 */
const PHASE = { idle: 0, writing: 1, written: 2, reading: 3, answered: 4, paying: 5, paid: 6 } as const;
const FLIGHT = 0.7;
const HOLD = 0.3;
/** Lets the chapter's own reveal land before the first write. */
const startDelayMs = 620;
/** Pause on a settled record before the tour moves to the next store. */
const advanceAfterMs = 2900;

const pct = (value: number, of: number) => `${(value / of) * 100}%`;

/** A wire that fills in its travel direction, with a packet riding the head. */
function Wire({
  d,
  color,
  progress,
}: {
  d: string;
  color: string;
  progress: MotionValue<number>;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const point = (v: number, axis: "x" | "y") => {
    const path = pathRef.current;
    if (!path) return 0;
    return path.getPointAtLength(v * path.getTotalLength())[axis];
  };
  const cx = useTransform(progress, (v) => point(v, "x"));
  const cy = useTransform(progress, (v) => point(v, "y"));
  const packetOpacity = useTransform(progress, [0, 0.04, 0.92, 1], [0, 1, 1, 0]);

  return (
    <g>
      <path ref={pathRef} d={d} fill="none" stroke={hairline(16)} strokeWidth="1.5" />
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        style={{ pathLength: progress, filter: `drop-shadow(0 0 4px ${color})` }}
      />
      <motion.circle
        r="4"
        fill={tone.ink}
        stroke={color}
        strokeWidth="2.5"
        style={{ cx, cy, opacity: packetOpacity, filter: `drop-shadow(0 0 6px ${color})` }}
      />
    </g>
  );
}

function MapNode({
  x,
  y,
  Icon,
  label,
  detail,
  color,
  lit,
  size = "sm",
}: {
  x: number;
  y: number;
  Icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  detail: string;
  color: string;
  lit: boolean;
  size?: "sm" | "lg";
}) {
  const big = size === "lg";
  return (
    <div
      role="listitem"
      className="absolute flex w-[6.5rem] -translate-x-1/2 flex-col items-center text-center"
      style={{ left: pct(x, VIEW_W), top: pct(y, VIEW_H) }}
    >
      <div
        className={`relative flex -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] transition-[border-color,box-shadow,background-color,color] duration-500 ${
          big ? "size-[3.75rem] sm:size-[4.5rem]" : "size-11 sm:size-[3.25rem]"
        }`}
        style={{
          borderColor: lit ? color : hairline(18),
          backgroundColor: lit ? tone.panel : tone.well,
          boxShadow: lit
            ? `0 0 0 ${big ? 6 : 4}px color-mix(in srgb, ${color} 14%, transparent), 0 0 ${big ? 34 : 20}px color-mix(in srgb, ${color} 38%, transparent)`
            : "none",
          color: lit ? color : tone.muted,
        }}
      >
        <Icon className={big ? "size-6 sm:size-7" : "size-[1.1rem] sm:size-5"} strokeWidth={1.6} />
      </div>
      <div className={big ? "-mt-5 sm:-mt-6" : "-mt-3.5 sm:-mt-4"}>
        <p className="max-w-full truncate text-[11px] font-medium leading-4 sm:text-[12px]" style={{ color: tone.ink }}>
          {label}
        </p>
        <p className="max-w-full truncate text-[10px] leading-4" style={{ color: tone.muted }}>
          {detail}
        </p>
      </div>
    </div>
  );
}

export function StoreOfRecordVisual({
  reduced,
  active,
}: {
  reduced: boolean;
  /** True once the panel is on screen; the tour waits for it. */
  active: boolean;
}) {
  const [storeId, setStoreId] = useState<StoreId>("postgres");
  const [runKey, setRunKey] = useState(0);
  const [phaseState, setPhase] = useState<number>(PHASE.idle);
  const userPicked = useRef(false);

  // Reduced motion skips the journey and shows the record already settled.
  const phase = reduced ? PHASE.paid : phaseState;
  const store = stores[storeId];

  const write = useMotionValue(reduced ? 1 : 0);
  const read = useMotionValue(reduced ? 1 : 0);
  const pay = useMotionValue(reduced ? 1 : 0);

  useEffect(() => {
    if (!active || reduced) return;
    const first = window.setTimeout(() => setRunKey(1), startDelayMs);
    return () => window.clearTimeout(first);
  }, [active, reduced]);

  // One record through its life: written, read by AI, paid by the rail.
  useEffect(() => {
    if (reduced) {
      write.set(1);
      read.set(1);
      pay.set(1);
      return;
    }
    if (runKey === 0) return;

    const timers: number[] = [];
    const controls: AnimationPlaybackControls[] = [];
    const later = (seconds: number, fn: () => void) =>
      timers.push(window.setTimeout(fn, seconds * 1000));

    write.set(0);
    read.set(0);
    pay.set(0);
    later(0, () => setPhase(PHASE.idle));

    const legs: [MotionValue<number>, number, number][] = [
      [write, PHASE.writing, PHASE.written],
      [read, PHASE.reading, PHASE.answered],
      [pay, PHASE.paying, PHASE.paid],
    ];
    legs.forEach(([value, flying, landed], index) => {
      const start = 0.05 + index * (FLIGHT + HOLD);
      later(start, () => {
        setPhase(flying);
        controls.push(animate(value, 1, { duration: FLIGHT, ease: [0.45, 0, 0.2, 1] }));
      });
      later(start + FLIGHT, () => setPhase(landed));
    });

    // Tour the stores once, then stay on the last one unless the visitor picks.
    const end = 0.05 + legs.length * (FLIGHT + HOLD);
    const next = storeOrder[storeOrder.indexOf(storeId) + 1];
    if (next && !userPicked.current) {
      later(end + advanceAfterMs / 1000, () => {
        if (userPicked.current) return;
        setStoreId(next);
        setRunKey((k) => k + 1);
      });
    }

    return () => {
      timers.forEach(window.clearTimeout);
      controls.forEach((c) => c.stop());
    };
    // storeId changes always come with a runKey bump, so runKey covers it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runKey, reduced]);

  const pick = (id: StoreId) => {
    userPicked.current = true;
    if (id === storeId && phase !== PHASE.paid) return;
    setStoreId(id);
    if (!reduced) setRunKey((k) => k + 1);
  };

  const written = phase >= PHASE.written;
  const answered = phase >= PHASE.answered;
  const paid = phase >= PHASE.paid;
  const morph = reduced ? { duration: 0 } : { duration: 0.45, ease: settle };
  const swap = reduced ? { duration: 0 } : { duration: 0.32, ease: settle };

  return (
    <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-[28rem] md:max-w-[33rem]">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[40%] h-64 w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.16] blur-3xl"
        initial={false}
        animate={{ backgroundColor: store.color }}
        transition={{ duration: 0.9, ease: settle }}
      />

      <div
        className="relative overflow-hidden rounded-[1.65rem] border border-border/80 px-4 pb-5 pt-4 shadow-[0_28px_56px_-30px_rgb(21_40_48/0.85)] sm:px-6 sm:pb-6 sm:pt-5"
        style={{
          backgroundColor: tone.chassis,
          backgroundImage: `linear-gradient(to bottom, ${hairline(4)}, transparent 38%, color-mix(in srgb, var(--background) 60%, transparent))`,
          boxShadow: `inset 0 1px 0 ${hairline(7)}`,
        }}
      >
        {/* Light pool under the store, tinted by whichever store owns the record. */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          initial={false}
          animate={{
            background: `radial-gradient(ellipse 46% 36% at 50% 36%, color-mix(in srgb, ${store.color} 16%, transparent), transparent 70%)`,
          }}
          transition={{ duration: 0.9, ease: settle }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, ${hairline(13)} 1px, transparent 1.4px)`,
            backgroundSize: "18px 18px",
            backgroundPosition: "9px 9px",
            maskImage: "radial-gradient(ellipse 58% 36% at 50% 36%, black 20%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 58% 36% at 50% 36%, black 20%, transparent 100%)",
          }}
        />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
            <div>
              <p className="text-[11px]" style={{ color: tone.muted }}>
                Store of record
              </p>
              <p
                className="mt-0.5 font-display text-[1.35rem] leading-none sm:text-[1.55rem]"
                style={{ color: tone.ink }}
              >
                One write, every reader
              </p>
            </div>

            <div
              className="flex rounded-full border p-0.5"
              style={{ borderColor: hairline(14), backgroundColor: tone.well }}
              role="group"
              aria-label="Store that owns the record"
            >
              {storeOrder.map((id) => {
                const selected = id === storeId;
                return (
                  <button
                    key={id}
                    type="button"
                    // The visual sits inside an aria-hidden wrapper, so keep this
                    // pointer-only demo control out of the keyboard tab order.
                    tabIndex={-1}
                    aria-pressed={selected}
                    onClick={() => pick(id)}
                    className="relative h-8 rounded-full px-3 text-[12px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
                    style={{ color: selected ? tone.ink : tone.muted }}
                  >
                    {selected ? (
                      <motion.span
                        layoutId="data-store-pill"
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: tone.panel }}
                        transition={morph}
                      />
                    ) : null}
                    <span className="relative">{stores[id].short}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Record map: one store in the middle, the app writing in from the
              left, AI reading out and the payment rail writing back on the right. */}
          {/* Bottom margin leaves room for the rail node's label, which hangs
              below the map box and does not scale with it. */}
          <div className="relative mb-10 mt-6 sm:mb-8" style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}>
            <svg
              aria-hidden="true"
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
              className="absolute inset-0 size-full overflow-visible"
            >
              <Wire d={wires.write} color={store.color} progress={write} />
              <Wire d={wires.read} color="var(--accent-secondary)" progress={read} />
              <Wire d={wires.pay} color="var(--success)" progress={pay} />
            </svg>

            <div role="list" aria-label="How one record moves between the app, its store, AI, and payments">
              <MapNode
                x={at.app[0]}
                y={at.app[1]}
                Icon={AppWindow}
                label="App"
                detail={store.writer}
                color={store.color}
                lit={phase >= PHASE.writing}
              />
              <MapNode
                x={at.store[0]}
                y={at.store[1]}
                Icon={Database}
                label={store.label}
                detail={store.trait}
                color={store.color}
                lit={written}
                size="lg"
              />
              <MapNode
                x={at.ai[0]}
                y={at.ai[1]}
                Icon={Sparkles}
                label="AI answer"
                detail="reads it live"
                color="var(--accent-secondary)"
                lit={answered}
              />
              <MapNode
                x={at.rail[0]}
                y={at.rail[1]}
                Icon={CreditCard}
                label={store.rail}
                detail="writes it back"
                color="var(--success)"
                lit={paid}
              />
            </div>
          </div>

          {/* The record itself. Payment status changes on this row, not a copy. */}
          <div
            className="overflow-hidden rounded-2xl border"
            style={{ borderColor: hairline(12), backgroundColor: tone.well }}
          >
            <div
              className="flex items-center justify-between gap-3 border-b px-3.5 py-2 text-[10px] sm:text-[11px]"
              style={{ borderColor: hairline(10), color: tone.muted }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={storeId}
                  className="truncate tabular-nums"
                  initial={reduced ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -4 }}
                  transition={swap}
                >
                  <span style={{ color: tone.ink }}>{store.table}</span> · {store.recordKey}
                </motion.span>
              </AnimatePresence>
              <span className="shrink-0">1 row</span>
            </div>

            <div className="grid grid-cols-[1fr_1fr_auto] items-end gap-x-3 px-3.5 py-3">
              {store.fields.map(([name, value]) => (
                <div key={name} className="min-w-0">
                  <p className="text-[10px] leading-4" style={{ color: tone.muted }}>
                    {name}
                  </p>
                  <motion.p
                    className="truncate text-[12px] font-medium leading-5 tabular-nums sm:text-[13px]"
                    style={{ color: tone.ink }}
                    initial={false}
                    animate={{ opacity: written ? 1 : 0.2 }}
                    transition={swap}
                  >
                    {value}
                  </motion.p>
                </div>
              ))}
              <div>
                <p className="text-[10px] leading-4" style={{ color: tone.muted }}>
                  status
                </p>
                <motion.span
                  className="mt-0.5 inline-flex h-5 items-center rounded-full border px-2 text-[10px] font-medium sm:text-[11px]"
                  initial={false}
                  animate={{
                    opacity: written ? 1 : 0.2,
                    borderColor: paid ? "var(--success)" : hairline(22),
                    color: paid ? "var(--success)" : tone.muted,
                  }}
                  transition={swap}
                >
                  {paid ? "paid" : "held"}
                </motion.span>
              </div>
            </div>

            <div
              className="flex min-h-[2.75rem] items-center gap-2.5 border-t px-3.5 py-2"
              style={{ borderColor: hairline(10) }}
            >
              <Sparkles
                aria-hidden="true"
                className="size-3.5 shrink-0 transition-colors duration-500"
                style={{ color: answered ? "var(--accent-secondary)" : hairline(25) }}
                strokeWidth={1.8}
              />
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={`${storeId}-${answered}`}
                  className="min-w-0 text-[11px] leading-4 sm:text-[12px]"
                  initial={reduced ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -4 }}
                  transition={swap}
                >
                  <span style={{ color: tone.muted }}>“{store.question}”</span>
                  {answered ? <span style={{ color: tone.ink }}> {store.answer}</span> : null}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
            <p className="shrink-0 leading-none" style={{ color: tone.ink }}>
              <span className="font-display text-[2.75rem] sm:text-[3.25rem]">0</span>
              <span className="ml-1.5 font-display text-[1.25rem] sm:text-[1.4rem]">copies</span>
              <span className="mt-1.5 block text-[11px]" style={{ color: tone.muted }}>
                to keep in sync
              </span>
            </p>
            <div className="relative min-h-9 max-w-[15rem] flex-1 basis-[11rem] pb-0.5">
              <AnimatePresence mode="wait" initial={false}>
                {paid ? (
                  <motion.p
                    key={storeId}
                    className="text-[12px] leading-[1.15rem]"
                    style={{ color: tone.muted }}
                    initial={reduced ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -4 }}
                    transition={swap}
                  >
                    {store.verdict}
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
