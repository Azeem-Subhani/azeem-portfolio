"use client";

import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

/** Mock-local palette: cool slate pipeline console, not v3 walnut rack or r1 graph paper */
const pipe = {
  chassis: "#1c2430",
  panel: "#252f3d",
  well: "#161d27",
  ink: "#e4eaf2",
  muted: "#8a96a8",
  flow: "#3db9b0",
  pg: "#4a90a4",
  ddb: "#6b8fd4",
  fs: "#d4a647",
  rag: "#9b87c7",
  stripe: "#7b9fd4",
  trust: "#c4785a",
} as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.06 },
  },
};

const frameIn: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.68, ease: settle },
  },
};

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0.35 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.05, ease: settle, delay: 0.22 },
  },
};

const nodeIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.38, ease: settle, delay },
  }),
};

type StoreBadge = {
  id: string;
  label: string;
  short: string;
  tint: string;
};

const stores: StoreBadge[] = [
  { id: "pg", label: "PostgreSQL", short: "PG", tint: pipe.pg },
  { id: "ddb", label: "DynamoDB", short: "DDB", tint: pipe.ddb },
  { id: "fs", label: "Firestore", short: "FS", tint: pipe.fs },
  { id: "rag", label: "RAG", short: "RAG", tint: pipe.rag },
];

const pipelineStages = [
  { id: "extract", label: "Extract", detail: "source tables, APIs" },
  { id: "transform", label: "Transform", detail: "schema, dedupe" },
  { id: "sync", label: "Sync", detail: "load + stream" },
] as const;

const chips = [
  "ETL/ELT pipelines",
  "Data migration",
  "Real-time sync",
] as const;

function StoreMonogram({ store }: { store: StoreBadge }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="flex size-11 items-center justify-center rounded-xl border text-[11px] font-semibold tracking-tight"
        style={{
          borderColor: `color-mix(in srgb, ${store.tint} 42%, transparent)`,
          background: `color-mix(in srgb, ${store.tint} 16%, ${pipe.panel})`,
          color: store.tint,
        }}
      >
        {store.short}
      </div>
      <span className="text-[9px] leading-tight" style={{ color: pipe.muted }}>
        {store.label}
      </span>
    </div>
  );
}

function PipelineVisual({ reduced }: { reduced: boolean }) {
  const trunkPath = "M 48 118 H 112 M 160 118 H 224 M 272 118 H 336";
  const fanPaths = [
    "M 336 118 C 336 148, 72 148, 72 188",
    "M 336 118 C 336 148, 144 148, 144 188",
    "M 336 118 C 336 148, 216 148, 216 188",
    "M 336 118 C 336 148, 288 148, 288 188",
  ];
  const stripePath = "M 160 118 V 228 H 112";
  const trustPath = "M 160 118 V 228 H 208";

  return (
    <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[42%] h-56 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "color-mix(in srgb, #3db9b0 14%, transparent)" }}
      />

      <motion.div
        className="relative overflow-hidden rounded-[1.5rem] border shadow-[0_28px_56px_-32px_rgb(22_29_39/0.9)]"
        style={{
          borderColor: "color-mix(in srgb, #3db9b0 22%, transparent)",
          background: pipe.chassis,
        }}
        variants={stage}
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
      >
        <div
          className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5"
          style={{ background: pipe.well }}
        >
          <div>
            <p className="text-[10px] leading-tight" style={{ color: pipe.muted }}>
              Data pipeline
            </p>
            <p className="mt-0.5 text-[11px] font-medium" style={{ color: pipe.ink }}>
              migration to live sync
            </p>
          </div>
          {!reduced ? (
            <motion.span
              aria-hidden="true"
              className="size-2 shrink-0 rounded-full"
              style={{ background: pipe.flow }}
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          ) : (
            <span
              aria-hidden="true"
              className="size-2 shrink-0 rounded-full"
              style={{ background: pipe.flow }}
            />
          )}
        </div>

        <motion.div
          className="px-4 py-4 sm:px-5 sm:py-5"
          style={{ background: pipe.panel }}
          variants={frameIn}
        >
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {stores.map((store, i) => (
              <motion.div
                key={store.id}
                custom={reduced ? 0 : 0.12 + i * 0.06}
                variants={nodeIn}
              >
                <StoreMonogram store={store} />
              </motion.div>
            ))}
          </div>

          <svg
            viewBox="0 0 384 240"
            className="relative z-10 mt-4 h-auto w-full"
            role="img"
            aria-label="ETL pipeline from extract through transform and sync into PostgreSQL, DynamoDB, Firestore, and RAG stores with Stripe and Trust Commerce wired at schema time"
          >
            {pipelineStages.map((stageNode, i) => {
              const x = 48 + i * 112;
              return (
                <motion.g
                  key={stageNode.id}
                  custom={reduced ? 0 : 0.28 + i * 0.1}
                  variants={nodeIn}
                >
                  <rect
                    x={x - 36}
                    y={88}
                    width="72"
                    height="44"
                    rx="8"
                    fill={pipe.well}
                    stroke={i === 2 ? pipe.flow : pipe.muted}
                    strokeWidth={i === 2 ? 1.5 : 1}
                    strokeOpacity={i === 2 ? 1 : 0.45}
                  />
                  <text
                    x={x}
                    y={106}
                    textAnchor="middle"
                    fill={pipe.ink}
                    fontSize="9"
                    fontFamily="var(--font-h2), sans-serif"
                    fontWeight="600"
                  >
                    {stageNode.label}
                  </text>
                  <text
                    x={x}
                    y={122}
                    textAnchor="middle"
                    fill={pipe.muted}
                    fontSize="7.5"
                    fontFamily="var(--font-h2), sans-serif"
                  >
                    {stageNode.detail}
                  </text>
                </motion.g>
              );
            })}

            <motion.path
              d={trunkPath}
              fill="none"
              stroke={pipe.flow}
              strokeWidth="2"
              strokeLinecap="round"
              variants={draw}
            />

            {fanPaths.map((d, i) => (
              <motion.path
                key={stores[i].id}
                d={d}
                fill="none"
                stroke={stores[i].tint}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeOpacity="0.75"
                variants={draw}
              />
            ))}

            <motion.path
              d={stripePath}
              fill="none"
              stroke={pipe.stripe}
              strokeWidth="1.2"
              strokeDasharray="4 4"
              strokeLinecap="round"
              variants={draw}
            />
            <motion.path
              d={trustPath}
              fill="none"
              stroke={pipe.trust}
              strokeWidth="1.2"
              strokeDasharray="4 4"
              strokeLinecap="round"
              variants={draw}
            />

            {stores.map((store, i) => {
              const positions = [72, 144, 216, 288];
              const x = positions[i];
              return (
                <motion.g
                  key={`dest-${store.id}`}
                  custom={reduced ? 0 : 0.72 + i * 0.06}
                  variants={nodeIn}
                >
                  <circle
                    cx={x}
                    cy={188}
                    r="14"
                    fill={pipe.well}
                    stroke={store.tint}
                    strokeWidth="1.5"
                  />
                  <text
                    x={x}
                    y={192}
                    textAnchor="middle"
                    fill={store.tint}
                    fontSize="7"
                    fontFamily="var(--font-h2), sans-serif"
                    fontWeight="600"
                  >
                    {store.short}
                  </text>
                </motion.g>
              );
            })}

            <motion.g custom={reduced ? 0 : 0.88} variants={nodeIn}>
              <rect
                x="88"
                y="214"
                width="48"
                height="20"
                rx="4"
                fill={`color-mix(in srgb, ${pipe.stripe} 18%, ${pipe.well})`}
                stroke={pipe.stripe}
                strokeWidth="1"
              />
              <text
                x="112"
                y="227"
                textAnchor="middle"
                fill={pipe.stripe}
                fontSize="7"
                fontFamily="var(--font-h2), sans-serif"
              >
                Stripe
              </text>
            </motion.g>

            <motion.g custom={reduced ? 0 : 0.94} variants={nodeIn}>
              <rect
                x="184"
                y="214"
                width="72"
                height="20"
                rx="4"
                fill={`color-mix(in srgb, ${pipe.trust} 18%, ${pipe.well})`}
                stroke={pipe.trust}
                strokeWidth="1"
              />
              <text
                x="220"
                y="227"
                textAnchor="middle"
                fill={pipe.trust}
                fontSize="7"
                fontFamily="var(--font-h2), sans-serif"
              >
                Trust Commerce
              </text>
            </motion.g>

            {!reduced ? (
              <motion.circle
                r="3"
                fill={pipe.flow}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 2.6,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <animateMotion
                  dur="2.6s"
                  repeatCount="indefinite"
                  path="M 48 118 H 336 C 336 148, 72 148, 72 188"
                />
              </motion.circle>
            ) : null}
          </svg>
        </motion.div>

        <div
          className="border-t px-4 py-2.5 sm:px-5"
          style={{
            background: pipe.well,
            borderColor: "color-mix(in srgb, #e4eaf2 8%, transparent)",
          }}
        >
          <p className="text-[10px] leading-4" style={{ color: pipe.muted }}>
            Payment rails attach when the schema is drawn, not after the first
            failed charge.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export function DataV4Mock1() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="data-v4-mock-1"
      aria-labelledby="data-v4-mock-1-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <PipelineVisual reduced={reduced} />
        </div>

        <div className="lg:order-2">
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            whileInView={reduced ? undefined : { opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.55, ease: settle }}
          >
            <h2
              id="data-v4-mock-1-title"
              className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
            >
              Enterprise data management
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
              I take data from relational stores and one-off migrations and put
              it on pipelines that keep syncing. Postgres for ledgers. DynamoDB
              for keyed traffic. Firestore when clients need live state. RAG
              when the answer has to be retrieved, not guessed.
            </p>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              Stripe and Trust Commerce post against the store that owns the
              row. I wire that when we design the schema.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Data capabilities">
              {chips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-border/80 bg-surface px-3 py-1.5 text-sm text-foreground"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
