"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const candleIn: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: settle },
  },
};

const pass: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.22 },
  },
};

const pop: Variants = {
  hidden: { opacity: 0, scale: 0.82 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 340, damping: 20 },
  },
};

const slipIn: Variants = {
  hidden: { opacity: 0, x: 24, rotate: 6 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 3,
    transition: { duration: 0.7, ease: settle, delay: 0.55 },
  },
};

const dripDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0.35 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.35, ease: settle, delay: 0.45 },
  },
};

type WaxNode = {
  id: string;
  label: string;
  y: number;
  tone: "signal" | "accent" | "success";
};

const waxNodes: WaxNode[] = [
  { id: "cognito", label: "Cognito", y: 72, tone: "signal" },
  { id: "lambda", label: "Lambda", y: 118, tone: "accent" },
  { id: "sam", label: "SAM", y: 164, tone: "success" },
  { id: "amplify", label: "Amplify", y: 210, tone: "signal" },
  { id: "dynamo", label: "DynamoDB", y: 256, tone: "accent" },
];

const dripPath =
  "M 168 52 C 174 72, 176 96, 172 118 S 168 186, 174 210 S 180 240, 168 268";

const toneFill: Record<WaxNode["tone"], string> = {
  signal: "fill-signal",
  accent: "fill-accent",
  success: "fill-success",
};

const toneGlow: Record<WaxNode["tone"], string> = {
  signal: "shadow-[0_0_10px_rgb(38_139_210/0.55)]",
  accent: "shadow-[0_0_10px_rgb(42_161_152/0.65)]",
  success: "shadow-[0_0_10px_rgb(133_153_0/0.45)]",
};

function MsCounter({ reduced }: { reduced: boolean }) {
  const [ms, setMs] = useState(reduced ? 84 : 0);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start - 1650) / 380, 1);
      if (t <= 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const eased = 1 - Math.pow(1 - t, 3);
      setMs(Math.round(eased * 84));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return <span className="tabular-nums text-accent">{ms}ms</span>;
}

function VigilFlame({ reduced }: { reduced: boolean }) {
  if (reduced) {
    return (
      <g transform="translate(120 34)">
        <ellipse cx="0" cy="8" rx="10" ry="16" className="fill-accent/80" />
        <ellipse cx="0" cy="10" rx="5" ry="9" className="fill-signal/50" />
      </g>
    );
  }

  return (
    <motion.g
      transform="translate(120 34)"
      initial={{ opacity: 0, scaleY: 0.35 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ duration: 0.5, ease: settle, delay: 0.18 }}
      style={{ originY: "18px" }}
    >
      <ellipse cx="0" cy="8" rx="10" ry="16" className="fill-accent/80" />
      <ellipse cx="0" cy="10" rx="5" ry="9" className="fill-signal/45" />
    </motion.g>
  );
}

function VigilCandleVisual({ reduced }: { reduced: boolean }) {
  return (
    <div
      className="relative mx-auto w-full max-w-[20rem] md:max-w-[26rem]"
      style={{ perspective: 1300 }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[48%] h-72 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/22 blur-3xl"
      />

      <div className="dark relative" data-theme="dark">
        <motion.div
          className="relative min-h-[34rem] overflow-hidden rounded-[1.75rem] border border-border/55 bg-surface px-5 pb-7 pt-8 shadow-[0_0_0_1px_rgb(42_161_152/0.1),0_36px_70px_-30px_rgb(0_43_54/0.7)] md:min-h-[36rem] md:px-7 md:pb-9 md:pt-10"
          variants={stage}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <motion.div
            className="relative mx-auto w-full max-w-[15rem]"
            variants={candleIn}
          >
            <svg
              viewBox="0 0 240 320"
              className="h-auto w-full overflow-visible text-muted-foreground"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="wax-body" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(238 232 213)" stopOpacity="0.95" />
                  <stop offset="55%" stopColor="rgb(238 232 213 / 0.88)" />
                  <stop offset="100%" stopColor="rgb(147 161 161 / 0.35)" />
                </linearGradient>
                <linearGradient id="brass-base" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgb(42 161 152 / 0.35)" />
                  <stop offset="50%" stopColor="rgb(238 232 213 / 0.18)" />
                  <stop offset="100%" stopColor="rgb(42 161 152 / 0.35)" />
                </linearGradient>
              </defs>

              <ellipse
                cx="120"
                cy="296"
                rx="62"
                ry="10"
                fill="url(#brass-base)"
                stroke="currentColor"
                strokeWidth="0.6"
                opacity="0.85"
              />

              <path
                d="M 92 48 L 108 38 L 132 38 L 148 48 L 142 278 L 98 278 Z"
                fill="url(#wax-body)"
                stroke="currentColor"
                strokeWidth="0.7"
                opacity="0.92"
              />

              <rect
                x="98"
                y="278"
                width="44"
                height="8"
                rx="1.5"
                fill="rgb(4 49 61 / 0.9)"
                stroke="currentColor"
                strokeWidth="0.5"
                opacity="0.8"
              />

              <VigilFlame reduced={reduced} />

              <motion.path
                d={dripPath}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                className="text-accent"
                variants={dripDraw}
                initial={reduced ? false : "hidden"}
                animate={reduced ? undefined : "visible"}
                style={reduced ? { pathLength: 1, opacity: 1 } : undefined}
              />

              <motion.g variants={pass}>
                {waxNodes.map((node) => (
                  <motion.g key={node.id} variants={pop}>
                    <circle
                      cx="176"
                      cy={node.y}
                      r="5.5"
                      className={`${toneFill[node.tone]} ${toneGlow[node.tone]}`}
                    />
                    <text
                      x="188"
                      y={node.y + 4}
                      fontSize="10"
                      fill="currentColor"
                      className="text-muted-foreground"
                      fontFamily="var(--font-sans), ui-sans-serif, system-ui, sans-serif"
                    >
                      {node.label}
                    </text>
                  </motion.g>
                ))}
              </motion.g>

              {!reduced && (
                <motion.circle
                  r="4"
                  className="fill-accent"
                  initial={{ opacity: 0 }}
                  animate={{
                    cx: [168, 172, 174, 168],
                    cy: [52, 118, 210, 268],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 1.35,
                    delay: 0.45,
                    ease: settle,
                    times: [0, 0.35, 0.72, 1],
                  }}
                />
              )}

              <text
                x="120"
                y="292"
                textAnchor="middle"
                fontSize="9"
                fill="currentColor"
                className="text-muted-foreground"
                fontFamily="var(--font-sans), ui-sans-serif, system-ui, sans-serif"
              >
                512 authenticated today
              </text>
            </svg>
          </motion.div>

          <motion.div
            className="absolute bottom-6 left-4 z-20 w-[min(72%,11.5rem)] origin-bottom-left md:bottom-8 md:left-6"
            variants={slipIn}
          >
            <div className="rounded-xl border border-border/60 bg-background/95 px-3.5 py-3 shadow-[0_16px_36px_-20px_rgb(0_0_0/0.65),inset_0_1px_0_rgb(238_232_213/0.06)] backdrop-blur-sm">
              <p className="text-[10px] text-muted-foreground">Oak Hill Chapel</p>
              <p className="text-[11px] font-medium text-foreground">Whitmore family</p>
              <p className="mt-2 font-display text-[2rem] leading-none tracking-tight text-foreground">
                $1,280
              </p>
              <p className="mt-2 text-[11px] text-muted-foreground">
                ledger write in <MsCounter reduced={reduced} />
              </p>
            </div>
          </motion.div>

          <p className="relative mt-2 text-center text-[11px] leading-5 text-muted-foreground">
            Each drip is one service hop on the live stack
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export function CloudR2Mock5() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="cloud-r2-mock-5"
      aria-labelledby="cloud-r2-mock-5-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2
            id="cloud-r2-mock-5-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            Five hundred signed-in payments, every day
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            I run the memorial planning portal on Lambda, Cognito, SAM, Amplify, and
            DynamoDB. Checkout only opens after Cognito verifies the family. Oak Hill
            Chapel&apos;s Whitmore family paid $1,280; the write finished in 84ms.
          </p>
        </div>
        <div aria-hidden="true">
          <VigilCandleVisual reduced={reduced} />
        </div>
      </div>
    </section>
  );
}
