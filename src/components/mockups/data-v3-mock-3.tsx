"use client";

import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

/** Mock-local palette: cool engineering slate, not site cream defaults */
const dial = {
  ground: "#111820",
  panel: "#1a2430",
  ink: "#e4eaf0",
  chalk: "#728498",
  postgres: "#7a9e7e",
  dynamo: "#5da4c9",
  firestore: "#c4a05a",
  rag: "#9a82b8",
  stripe: "#5468ff",
  trust: "#2d8a74",
} as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.06 },
  },
};

const ringDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0.35 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.35, ease: settle, delay: 0.12 },
  },
};

const hubIn: Variants = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: settle, delay: 0.45 },
  },
};

const spokeIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.42, ease: settle, delay },
  }),
};

type StoreNode = {
  id: string;
  label: string;
  detail: string;
  cx: number;
  cy: number;
  color: string;
  delay: number;
};

const stores: StoreNode[] = [
  {
    id: "pg",
    label: "PostgreSQL",
    detail: "Ledger rows and joins",
    cx: 200,
    cy: 52,
    color: dial.postgres,
    delay: 0.72,
  },
  {
    id: "ddb",
    label: "DynamoDB",
    detail: "Session and spike traffic",
    cx: 318,
    cy: 148,
    color: dial.dynamo,
    delay: 0.86,
  },
  {
    id: "fs",
    label: "Firestore",
    detail: "Live client sync",
    cx: 82,
    cy: 148,
    color: dial.firestore,
    delay: 1.0,
  },
  {
    id: "rag",
    label: "RAG retrieval",
    detail: "Policy context at query time",
    cx: 200,
    cy: 268,
    color: dial.rag,
    delay: 1.14,
  },
];

const outerRing = "M 200 36 A 164 164 0 1 1 199.9 36";
const innerRing = "M 200 108 A 92 92 0 1 1 199.9 108";

function ResolverDialVisual({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[21rem] md:max-w-[26rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: dial.dynamo }}
      />

      <motion.div
        className="relative overflow-hidden rounded-[1.65rem] border px-4 pb-5 pt-4 shadow-[0_28px_56px_-32px_rgb(0_0_0/0.55)] sm:px-5"
        style={{
          background: dial.ground,
          borderColor: "color-mix(in srgb, #728498 28%, transparent)",
        }}
        variants={stage}
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
      >
        <svg
          viewBox="0 0 400 320"
          className="h-auto w-full"
          role="img"
          aria-label="Resolver dial routing one inbound request to PostgreSQL, DynamoDB, Firestore, or RAG retrieval, with Stripe and Trust Commerce settling against the source record"
        >
          <motion.circle
            cx="200"
            cy="160"
            r="164"
            fill="none"
            stroke={dial.panel}
            strokeWidth="28"
            variants={ringDraw}
          />
          <motion.path
            d={outerRing}
            fill="none"
            stroke={dial.chalk}
            strokeWidth="1.25"
            strokeOpacity="0.45"
            variants={ringDraw}
          />
          <motion.path
            d={innerRing}
            fill="none"
            stroke={dial.chalk}
            strokeWidth="1"
            strokeOpacity="0.35"
            variants={ringDraw}
          />

          {stores.map((store) => (
            <motion.g
              key={store.id}
              custom={reduced ? 0 : store.delay}
              variants={spokeIn}
            >
              <line
                x1="200"
                y1="160"
                x2={store.cx}
                y2={store.cy}
                stroke={store.color}
                strokeWidth="1.25"
                strokeOpacity="0.55"
                strokeDasharray="4 5"
              />
              <circle
                cx={store.cx}
                cy={store.cy}
                r="34"
                fill={dial.panel}
                stroke={store.color}
                strokeWidth="1.5"
              />
              <text
                x={store.cx}
                y={store.cy - 5}
                textAnchor="middle"
                fill={dial.ink}
                fontSize="10.5"
                fontFamily="var(--font-h2), sans-serif"
                fontWeight="500"
              >
                {store.label}
              </text>
              <text
                x={store.cx}
                y={store.cy + 10}
                textAnchor="middle"
                fill={dial.chalk}
                fontSize="8"
                fontFamily="var(--font-h2), sans-serif"
              >
                {store.detail}
              </text>
            </motion.g>
          ))}

          <motion.g custom={reduced ? 0 : 0.58} variants={hubIn}>
            <circle
              cx="200"
              cy="160"
              r="44"
              fill={dial.panel}
              stroke={dial.ink}
              strokeWidth="1.2"
              strokeOpacity="0.35"
            />
            <text
              x="200"
              y="152"
              textAnchor="middle"
              fill={dial.ink}
              fontSize="10"
              fontFamily="var(--font-h2), sans-serif"
              fontWeight="500"
            >
              Inbound
            </text>
            <text
              x="200"
              y="168"
              textAnchor="middle"
              fill={dial.chalk}
              fontSize="8.5"
              fontFamily="var(--font-h2), sans-serif"
            >
              one request
            </text>
          </motion.g>

          {!reduced ? (
            <motion.circle
              r="4"
              fill={dial.firestore}
              style={{
                filter: `drop-shadow(0 0 4px ${dial.firestore})`,
                offsetPath: `path('${outerRing}')`,
              }}
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: "100%" }}
              transition={{
                duration: 4.5,
                ease: "linear",
                delay: 1.6,
                repeat: Infinity,
              }}
            />
          ) : null}

          <motion.g custom={reduced ? 0 : 1.28} variants={spokeIn}>
            <rect
              x="118"
              y="288"
              width="72"
              height="26"
              rx="7"
              fill="color-mix(in srgb, #5468ff 16%, #1a2430)"
              stroke={dial.stripe}
              strokeWidth="1.1"
            />
            <text
              x="154"
              y="305"
              textAnchor="middle"
              fill={dial.ink}
              fontSize="9.5"
              fontFamily="var(--font-h2), sans-serif"
            >
              Stripe
            </text>

            <rect
              x="210"
              y="288"
              width="92"
              height="26"
              rx="7"
              fill="color-mix(in srgb, #2d8a74 16%, #1a2430)"
              stroke={dial.trust}
              strokeWidth="1.1"
            />
            <text
              x="256"
              y="305"
              textAnchor="middle"
              fill={dial.ink}
              fontSize="9.5"
              fontFamily="var(--font-h2), sans-serif"
            >
              Trust Commerce
            </text>

            <line
              x1="200"
              y1="204"
              x2="200"
              y2="288"
              stroke={dial.chalk}
              strokeWidth="1"
              strokeOpacity="0.4"
              strokeDasharray="3 4"
            />
            <text
              x="200"
              y="282"
              textAnchor="middle"
              fill={dial.chalk}
              fontSize="8"
              fontFamily="var(--font-h2), sans-serif"
            >
              charged against source record
            </text>
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
}

export function DataV3Mock3() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="data-v3-mock-3"
      aria-labelledby="data-v3-mock-3-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <ResolverDialVisual reduced={reduced} />
        </div>

        <div className="lg:order-2">
          <h2
            id="data-v3-mock-3-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            The right store for every workload
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            I design data layers where relational rows, key-value bursts, live
            document sync, and retrieval-augmented answers each have a defined
            home. PostgreSQL holds what must join. DynamoDB absorbs spikes.
            Firestore keeps clients current. RAG pulls policy text when a query
            needs context. Stripe and Trust Commerce charge against whichever
            store owns the record.
          </p>
        </div>
      </div>
    </section>
  );
}
