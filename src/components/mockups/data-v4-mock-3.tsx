"use client";

import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

/** Mock-local: broadcast log deck, not site cream defaults */
const log = {
  ground: "#101820",
  panel: "#182430",
  well: "#0f161e",
  ink: "#e4eaf0",
  chalk: "#738498",
  rule: "#2a3848",
  postgres: "#7a9e7e",
  dynamo: "#5da4c9",
  firestore: "#c4a05a",
  rag: "#9a82b8",
  stripe: "#5468ff",
  trust: "#2d8a74",
  route: "#2aa198",
} as const;

const chips = ["Store routing", "Payment settlement", "Query-time retrieval"];

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.05 },
  },
};

const frameIn: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: settle },
  },
};

const rowIn: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: (delay: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.42, ease: settle, delay },
  }),
};

const routeDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0.25 },
  visible: (delay: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.65, ease: settle, delay },
  }),
};

type WriteRow = {
  id: string;
  event: string;
  store: string;
  color: string;
  delay: number;
};

const writes: WriteRow[] = [
  {
    id: "w1",
    event: "order.settled",
    store: "PostgreSQL",
    color: log.postgres,
    delay: 0.38,
  },
  {
    id: "w2",
    event: "session.refresh",
    store: "DynamoDB",
    color: log.dynamo,
    delay: 0.52,
  },
  {
    id: "w3",
    event: "lineup.published",
    store: "Firestore",
    color: log.firestore,
    delay: 0.66,
  },
  {
    id: "w4",
    event: "policy.lookup",
    store: "RAG",
    color: log.rag,
    delay: 0.8,
  },
];

function ClassifierConsole({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-lg">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-6 top-1/3 h-40 w-40 rounded-full opacity-30 blur-3xl"
        style={{ background: log.route }}
      />

      <motion.div
        className="relative overflow-hidden rounded-[1.35rem] border shadow-[0_24px_48px_-28px_rgb(0_0_0/0.55)]"
        style={{
          background: log.panel,
          borderColor: "color-mix(in srgb, #e4eaf0 12%, transparent)",
        }}
        variants={frameIn}
      >
        <div
          className="flex items-center justify-between gap-3 border-b px-4 py-3 sm:px-5"
          style={{ borderColor: log.rule }}
        >
          <div>
            <p
              className="text-[11px] font-medium tracking-tight"
              style={{ color: log.ink }}
            >
              write_classifier
            </p>
            <p className="mt-0.5 text-[10px]" style={{ color: log.chalk }}>
              live routing, no replay queue
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            {!reduced ? (
              <motion.span
                aria-hidden="true"
                className="size-2 rounded-full"
                style={{ background: log.route }}
                animate={{ opacity: [0.35, 1, 0.35] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ) : (
              <span
                aria-hidden="true"
                className="size-2 rounded-full"
                style={{ background: log.route }}
              />
            )}
            <span className="text-[10px]" style={{ color: log.chalk }}>
              accepting
            </span>
          </div>
        </div>

        <div className="px-3 py-3 sm:px-4 sm:py-4">
          <div
            className="overflow-hidden rounded-xl border"
            style={{
              background: log.well,
              borderColor: log.rule,
            }}
          >
            <div
              className="grid grid-cols-[1fr_auto] gap-2 border-b px-3 py-2 text-[10px] sm:px-3.5"
              style={{
                borderColor: log.rule,
                color: log.chalk,
              }}
            >
              <span>Event</span>
              <span>Store</span>
            </div>

            <div className="divide-y" style={{ borderColor: log.rule }}>
              {writes.map((row) => (
                <motion.div
                  key={row.id}
                  custom={row.delay}
                  variants={rowIn}
                  className="grid grid-cols-[1fr_auto] items-center gap-3 px-3 py-2.5 sm:px-3.5"
                  style={{ borderColor: log.rule }}
                >
                  <div className="min-w-0">
                    <p
                      className="truncate font-mono text-[11px]"
                      style={{ color: log.ink }}
                    >
                      {row.event}
                    </p>
                    <p
                      className="mt-0.5 truncate text-[10px]"
                      style={{ color: log.chalk }}
                    >
                      classified at intake
                    </p>
                  </div>
                  <span
                    className="shrink-0 rounded-md px-2 py-0.5 text-[10px] font-medium"
                    style={{
                      color: row.color,
                      background: `color-mix(in srgb, ${row.color} 18%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${row.color} 35%, transparent)`,
                    }}
                  >
                    {row.store}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <svg
            viewBox="0 0 360 88"
            className="mt-4 h-[5.5rem] w-full"
            aria-hidden="true"
          >
            <motion.path
              d="M 36 18 H 168"
              fill="none"
              stroke={log.route}
              strokeWidth="2"
              strokeLinecap="round"
              custom={0.95}
              variants={routeDraw}
            />
            <motion.path
              d="M 36 44 H 168"
              fill="none"
              stroke={log.postgres}
              strokeWidth="2"
              strokeLinecap="round"
              custom={1.05}
              variants={routeDraw}
            />
            <motion.path
              d="M 36 70 H 168"
              fill="none"
              stroke={log.trust}
              strokeWidth="2"
              strokeLinecap="round"
              custom={1.15}
              variants={routeDraw}
            />

            <motion.g custom={1.02} variants={rowIn}>
              <rect
                x="184"
                y="8"
                width="152"
                height="22"
                rx="6"
                fill={log.ground}
                stroke={log.rule}
              />
              <text
                x="196"
                y="22"
                fill={log.ink}
                fontSize="9"
                fontFamily="var(--font-h2), sans-serif"
              >
                Stripe
              </text>
              <text
                x="310"
                y="22"
                textAnchor="end"
                fill={log.chalk}
                fontSize="8"
                fontFamily="var(--font-h2), sans-serif"
              >
                posts to row owner
              </text>
            </motion.g>

            <motion.g custom={1.12} variants={rowIn}>
              <rect
                x="184"
                y="34"
                width="152"
                height="22"
                rx="6"
                fill={log.ground}
                stroke={log.rule}
              />
              <text
                x="196"
                y="48"
                fill={log.ink}
                fontSize="9"
                fontFamily="var(--font-h2), sans-serif"
              >
                Trust Commerce
              </text>
              <text
                x="310"
                y="48"
                textAnchor="end"
                fill={log.chalk}
                fontSize="8"
                fontFamily="var(--font-h2), sans-serif"
              >
                same ledger row
              </text>
            </motion.g>

            <motion.g custom={1.22} variants={rowIn}>
              <rect
                x="184"
                y="60"
                width="152"
                height="22"
                rx="6"
                fill={log.ground}
                stroke={log.rule}
              />
              <text
                x="196"
                y="74"
                fill={log.route}
                fontSize="9"
                fontFamily="var(--font-h2), sans-serif"
              >
                schema wired at design
              </text>
            </motion.g>

            <text
              x="36"
              y="14"
              fill={log.chalk}
              fontSize="8"
              fontFamily="var(--font-h2), sans-serif"
            >
              intake
            </text>
            <text
              x="36"
              y="40"
              fill={log.chalk}
              fontSize="8"
              fontFamily="var(--font-h2), sans-serif"
            >
              ledger
            </text>
            <text
              x="36"
              y="66"
              fill={log.chalk}
              fontSize="8"
              fontFamily="var(--font-h2), sans-serif"
            >
              settle
            </text>
          </svg>
        </div>

        <div
          className="flex flex-wrap items-center justify-between gap-2 border-t px-4 py-2.5 sm:px-5"
          style={{ borderColor: log.rule }}
        >
          <p className="text-[10px]" style={{ color: log.chalk }}>
            four stores, one classifier
          </p>
          <div className="flex gap-1">
            {[log.postgres, log.dynamo, log.firestore, log.rag].map((color) => (
              <span
                key={color}
                aria-hidden="true"
                className="size-1.5 rounded-full"
                style={{ background: color }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function DataV4Mock3() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="data-v4-mock-3"
      aria-labelledby="data-v4-mock-3-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <motion.div
        className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20"
        variants={stage}
        initial={reduced ? false : "hidden"}
        whileInView={reduced ? undefined : "visible"}
        viewport={{ once: true, margin: "-10% 0px" }}
      >
        <div className="lg:order-1" aria-hidden="true">
          <ClassifierConsole reduced={reduced} />
        </div>

        <div className="lg:order-2">
          <h2
            id="data-v4-mock-3-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            Enterprise data management
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            From schema migration to live sync and retrieval, I pick the store
            that fits each write. PostgreSQL holds ledgers and joins. DynamoDB
            absorbs session spikes. Firestore keeps clients in step. RAG injects
            policy text at query time.
          </p>
          <p className="mt-4 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            Stripe and Trust Commerce post against the row owner. I wire that path
            when we design the schema, not after the first failed charge.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Capabilities">
            {chips.map((chip) => (
              <li key={chip}>
                <span className="inline-block rounded-full border border-border bg-surface px-3 py-1 text-sm text-foreground">
                  {chip}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm font-medium text-foreground">
            Production traffic is the test.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
