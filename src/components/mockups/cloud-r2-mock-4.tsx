"use client";

import { useMemo } from "react";
import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const COLS = 26;
const ROWS = 20;
const HIGHLIGHT = { col: 14, row: 8 };

const stages: {
  id: string;
  label: string;
  ms: number;
  tone: "signal" | "accent" | "success" | "muted";
}[] = [
  { id: "cognito", label: "Cognito", ms: 12, tone: "signal" },
  { id: "lambda", label: "Lambda", ms: 31, tone: "accent" },
  { id: "dynamo", label: "DynamoDB", ms: 18, tone: "accent" },
  { id: "amplify", label: "Amplify", ms: 9, tone: "muted" },
  { id: "sam", label: "SAM", ms: 14, tone: "success" },
];

const toneFill: Record<(typeof stages)[number]["tone"], string> = {
  signal: "bg-signal",
  accent: "bg-accent",
  success: "bg-success",
  muted: "bg-foreground/55",
};

const toneText: Record<(typeof stages)[number]["tone"], string> = {
  signal: "text-signal",
  accent: "text-accent",
  success: "text-success",
  muted: "text-muted-foreground",
};

const panelReveal: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: settle },
  },
};

const traceDraw: Variants = {
  hidden: { scaleX: 0, opacity: 0.35 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: settle, delay: 0.25 },
  },
};

const calloutIn: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: settle, delay: 0.85 },
  },
};

function DotField({ reduced }: { reduced: boolean }) {
  const dots = useMemo(() => {
    const list: { key: string; col: number; row: number; hot: boolean }[] = [];
    for (let row = 0; row < ROWS; row += 1) {
      for (let col = 0; col < COLS; col += 1) {
        list.push({
          key: `${col}-${row}`,
          col,
          row,
          hot: col === HIGHLIGHT.col && row === HIGHLIGHT.row,
        });
      }
    }
    return list;
  }, []);

  const hotLeft = ((HIGHLIGHT.col + 0.5) / COLS) * 100;
  const hotTop = ((HIGHLIGHT.row + 0.5) / ROWS) * 100;

  return (
    <div className="relative">
      <div
        className="grid gap-[3px] sm:gap-1"
        style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
        aria-hidden="true"
      >
        {dots.map((dot) => (
          <span
            key={dot.key}
            className={`aspect-square rounded-full ${
              dot.hot
                ? "relative z-10 bg-accent shadow-[0_0_0_2px_var(--surface),0_0_14px_rgb(42_161_152/0.55)]"
                : "bg-foreground/14"
            }`}
          />
        ))}
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-8% 0px" }}
      >
        <svg
          className="absolute inset-0 hidden h-full w-full overflow-visible sm:block"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <motion.line
            x1={hotLeft}
            y1={hotTop}
            x2={hotLeft}
            y2={hotTop + 22}
            stroke="var(--accent)"
            strokeWidth="0.35"
            strokeLinecap="round"
            variants={calloutIn}
          />
          <motion.line
            x1={hotLeft}
            y1={hotTop + 22}
            x2={hotLeft + 18}
            y2={hotTop + 22}
            stroke="var(--accent)"
            strokeWidth="0.35"
            strokeLinecap="round"
            variants={calloutIn}
          />
        </svg>

        <motion.div
          className="absolute hidden max-w-[10.5rem] text-left sm:block"
          style={{
            left: `calc(${hotLeft}% + 1.1rem)`,
            top: `calc(${hotTop}% + 1.65rem)`,
          }}
          variants={calloutIn}
        >
          <p className="text-[10px] leading-4 text-muted-foreground">Oak Hill Chapel</p>
          <p className="font-display text-[1.35rem] leading-none tabular-nums text-foreground">
            $1,280
          </p>
          <p className="mt-0.5 text-[10px] tabular-nums text-accent">84ms total</p>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-3 sm:hidden"
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-8% 0px" }}
        variants={calloutIn}
      >
        <p className="text-[10px] text-muted-foreground">Oak Hill Chapel, traced charge</p>
        <p className="font-display text-[1.5rem] leading-none tabular-nums text-foreground">
          $1,280
        </p>
        <p className="mt-0.5 text-[11px] tabular-nums text-accent">84ms through five services</p>
      </motion.div>
    </div>
  );
}

function LatencyRuler({ reduced }: { reduced: boolean }) {
  const totalMs = stages.reduce((sum, stage) => sum + stage.ms, 0);

  return (
    <div className="mt-6 border-t border-border/70 pt-5">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <p className="text-[11px] text-muted-foreground">Whitmore family charge, traced</p>
        <p className="text-[11px] tabular-nums text-muted-foreground">
          <span className="font-medium text-foreground">{totalMs}ms</span> total
        </p>
      </div>

      <motion.div
        className="flex h-2.5 w-full overflow-hidden rounded-sm bg-foreground/8"
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-8% 0px" }}
      >
        {stages.map((stage) => (
          <motion.div
            key={stage.id}
            className={`h-full origin-left ${toneFill[stage.tone]}`}
            style={{ width: `${(stage.ms / totalMs) * 100}%` }}
            variants={traceDraw}
          />
        ))}
      </motion.div>

      <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-5">
        {stages.map((stage) => (
          <li key={stage.id} className="min-w-0">
            <p className={`truncate text-[11px] font-medium ${toneText[stage.tone]}`}>
              {stage.label}
            </p>
            <p className="text-[10px] tabular-nums text-muted-foreground">{stage.ms}ms</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LoadPanel({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-[22rem] md:max-w-[26rem]"
      variants={panelReveal}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-surface px-4 py-5 sm:px-5 sm:py-6">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage: `
              linear-gradient(to right, color-mix(in srgb, var(--muted) 16%, transparent) 1px, transparent 1px),
              linear-gradient(to bottom, color-mix(in srgb, var(--muted) 16%, transparent) 1px, transparent 1px)
            `,
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="font-display text-[1.65rem] leading-none tabular-nums text-foreground sm:text-[1.85rem]">
                512
              </p>
              <p className="mt-1 max-w-[11rem] text-[11px] leading-4 text-muted-foreground">
                authenticated payments today on the memorial portal
              </p>
            </div>
            <p className="text-right text-[10px] leading-4 text-muted-foreground">
              us-east-1
              <br />
              live production
            </p>
          </div>

          <div className="mt-5">
            <DotField reduced={reduced} />
          </div>

          <LatencyRuler reduced={reduced} />
        </div>
      </div>
    </motion.div>
  );
}

export function CloudR2Mock4() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="cloud-r2-mock-4"
      aria-labelledby="cloud-r2-mock-4-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2
            id="cloud-r2-mock-4-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            Five hundred signed-in charges clear through AWS daily
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            Lambda, Cognito, SAM, Amplify, and DynamoDB run the memorial planning portal in
            us-east-1. Oak Hill Chapel paid $1,280 on the last charge I traced. All five
            services finished in 84ms.
          </p>
        </div>

        <div aria-hidden="true">
          <LoadPanel reduced={reduced} />
        </div>
      </div>
    </section>
  );
}
