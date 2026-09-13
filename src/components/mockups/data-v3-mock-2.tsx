"use client";

import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

/** Mock-local schematic: warm brown-black chassis, paper trace lines */
const schematic = {
  chassis: "#2a2620",
  well: "#332f28",
  trace: "#ddd4c4",
  muted: "#8a8278",
  pg: "#2aa198",
  ddb: "#5b8fc7",
  fs: "#8faa4a",
  rag: "#a088c0",
  stripe: "#7b6fd4",
  trust: "#c4783a",
} as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.06 },
  },
};

const frameIn: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: settle },
  },
};

const traceDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0.35 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.35, ease: settle, delay: 0.2 },
  },
};

const nodeIn: Variants = {
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
    detail: "Ledger rows",
    cx: 268,
    cy: 72,
    color: schematic.pg,
    delay: 0.72,
  },
  {
    id: "ddb",
    label: "DynamoDB",
    detail: "Session mirror",
    cx: 268,
    cy: 152,
    color: schematic.ddb,
    delay: 0.88,
  },
  {
    id: "fs",
    label: "Firestore",
    detail: "Client sync",
    cx: 268,
    cy: 232,
    color: schematic.fs,
    delay: 1.04,
  },
];

const trunkPath = "M 72 152 H 148";
const ragPath = "M 148 152 V 72 H 200";
const pgPath = "M 200 72 H 248";
const ddbPath = "M 200 152 H 248";
const fsPath = "M 200 152 V 232 H 248";
const stripePath = "M 148 152 V 292 H 198";
const trustPath = "M 148 152 V 292 H 298";
const pulsePath = "M 72 152 H 148 V 72 H 248";

function PropagationSchematic({ reduced }: { reduced: boolean }) {
  return (
    <div
      className="relative mx-auto w-full max-w-[22rem] md:max-w-[28rem]"
      style={{ perspective: 1200 }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[46%] h-64 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: `${schematic.rag}22` }}
      />

      <motion.div
        className="relative overflow-hidden rounded-[1.5rem] border px-4 pb-5 pt-4 shadow-[0_28px_56px_-28px_rgb(0_0_0/0.55)]"
        style={{
          backgroundColor: schematic.chassis,
          borderColor: `${schematic.trace}28`,
        }}
        variants={stage}
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
      >
        <motion.div variants={frameIn}>
          <div className="mb-3 flex items-baseline justify-between gap-3 px-0.5">
            <p className="text-[11px]" style={{ color: schematic.muted }}>
              Write path
            </p>
            <span
              className="text-[10px]"
              style={{ color: schematic.trace }}
            >
              stores in agreement
            </span>
          </div>

          <svg
            viewBox="0 0 360 320"
            className="h-auto w-full"
            role="img"
            aria-label="Data write propagating through RAG retrieval into PostgreSQL, DynamoDB, and Firestore, then splitting to Stripe and Trust Commerce"
          >
            <motion.path
              d={trunkPath}
              fill="none"
              stroke={schematic.trace}
              strokeWidth="1.5"
              strokeLinecap="round"
              variants={traceDraw}
            />
            <motion.path
              d={ragPath}
              fill="none"
              stroke={schematic.rag}
              strokeWidth="1.5"
              strokeLinecap="round"
              variants={traceDraw}
            />
            <motion.path
              d={pgPath}
              fill="none"
              stroke={schematic.pg}
              strokeWidth="1.5"
              strokeLinecap="round"
              variants={traceDraw}
            />
            <motion.path
              d={ddbPath}
              fill="none"
              stroke={schematic.ddb}
              strokeWidth="1.5"
              strokeLinecap="round"
              variants={traceDraw}
            />
            <motion.path
              d={fsPath}
              fill="none"
              stroke={schematic.fs}
              strokeWidth="1.5"
              strokeLinecap="round"
              variants={traceDraw}
            />
            <motion.path
              d={stripePath}
              fill="none"
              stroke={schematic.stripe}
              strokeWidth="1.5"
              strokeLinecap="round"
              variants={traceDraw}
            />
            <motion.path
              d={trustPath}
              fill="none"
              stroke={schematic.trust}
              strokeWidth="1.5"
              strokeLinecap="round"
              variants={traceDraw}
            />

            <motion.g custom={reduced ? 0 : 0.5} variants={nodeIn}>
              <rect
                x="24"
                y="130"
                width="48"
                height="44"
                rx="8"
                fill={`${schematic.trace}12`}
                stroke={schematic.trace}
                strokeWidth="1.2"
              />
              <text
                x="48"
                y="150"
                textAnchor="middle"
                fill={schematic.trace}
                fontSize="10"
                fontFamily="var(--font-h2), sans-serif"
                fontWeight="500"
              >
                write
              </text>
              <text
                x="48"
                y="164"
                textAnchor="middle"
                fill={schematic.muted}
                fontSize="8"
                fontFamily="var(--font-h2), sans-serif"
              >
                incoming
              </text>
            </motion.g>

            <motion.g custom={reduced ? 0 : 0.62} variants={nodeIn}>
              <rect
                x="118"
                y="50"
                width="64"
                height="44"
                rx="8"
                fill={`${schematic.rag}18`}
                stroke={schematic.rag}
                strokeWidth="1.2"
              />
              <text
                x="150"
                y="70"
                textAnchor="middle"
                fill={schematic.trace}
                fontSize="10"
                fontFamily="var(--font-h2), sans-serif"
                fontWeight="500"
              >
                RAG retrieval
              </text>
              <text
                x="150"
                y="84"
                textAnchor="middle"
                fill={schematic.muted}
                fontSize="8"
                fontFamily="var(--font-h2), sans-serif"
              >
                policy context
              </text>
            </motion.g>

            {stores.map((store) => (
              <motion.g
                key={store.id}
                custom={reduced ? 0 : store.delay}
                variants={nodeIn}
              >
                <rect
                  x={store.cx - 52}
                  y={store.cy - 22}
                  width="104"
                  height="44"
                  rx="8"
                  fill={`${store.color}18`}
                  stroke={store.color}
                  strokeWidth="1.2"
                />
                <text
                  x={store.cx}
                  y={store.cy - 4}
                  textAnchor="middle"
                  fill={schematic.trace}
                  fontSize="10"
                  fontFamily="var(--font-h2), sans-serif"
                  fontWeight="500"
                >
                  {store.label}
                </text>
                <text
                  x={store.cx}
                  y={store.cy + 12}
                  textAnchor="middle"
                  fill={schematic.muted}
                  fontSize="8"
                  fontFamily="var(--font-h2), sans-serif"
                >
                  {store.detail}
                </text>
              </motion.g>
            ))}

            <motion.g custom={reduced ? 0 : 1.18} variants={nodeIn}>
              <rect
                x="148"
                y="272"
                width="100"
                height="40"
                rx="8"
                fill={`${schematic.stripe}18`}
                stroke={schematic.stripe}
                strokeWidth="1.2"
              />
              <text
                x="198"
                y="290"
                textAnchor="middle"
                fill={schematic.trace}
                fontSize="10"
                fontFamily="var(--font-h2), sans-serif"
                fontWeight="500"
              >
                Stripe
              </text>
              <text
                x="198"
                y="304"
                textAnchor="middle"
                fill={schematic.muted}
                fontSize="8"
                fontFamily="var(--font-h2), sans-serif"
              >
                card capture
              </text>
            </motion.g>

            <motion.g custom={reduced ? 0 : 1.28} variants={nodeIn}>
              <rect
                x="248"
                y="272"
                width="100"
                height="40"
                rx="8"
                fill={`${schematic.trust}18`}
                stroke={schematic.trust}
                strokeWidth="1.2"
              />
              <text
                x="298"
                y="290"
                textAnchor="middle"
                fill={schematic.trace}
                fontSize="10"
                fontFamily="var(--font-h2), sans-serif"
                fontWeight="500"
              >
                Trust Commerce
              </text>
              <text
                x="298"
                y="304"
                textAnchor="middle"
                fill={schematic.muted}
                fontSize="8"
                fontFamily="var(--font-h2), sans-serif"
              >
                ACH settlement
              </text>
            </motion.g>

            {!reduced ? (
              <motion.circle
                r="4"
                fill={schematic.trace}
                style={{
                  filter: `drop-shadow(0 0 4px ${schematic.trace}88)`,
                  offsetPath: `path('${pulsePath}')`,
                }}
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{
                  duration: 2.4,
                  ease: "linear",
                  delay: 1.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              />
            ) : null}
          </svg>

          <p
            className="mt-2 px-0.5 text-[10px] leading-relaxed"
            style={{ color: schematic.muted }}
          >
            Context lands first. Stores commit together. Payment rail picks up
            after agreement.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function DataV3Mock2() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="data-v3-mock-2"
      aria-labelledby="data-v3-mock-2-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <PropagationSchematic reduced={reduced} />
        </div>

        <div className="lg:order-2">
          <h2
            id="data-v3-mock-2-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            Every store updated before the charge clears
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            I work across PostgreSQL, DynamoDB, and Firestore so ledger rows,
            session mirrors, and client updates land together. RAG retrieval
            grounds writes in your policy docs. Stripe handles card capture.
            Trust Commerce runs ACH when the amount calls for it.
          </p>
        </div>
      </div>
    </section>
  );
}
