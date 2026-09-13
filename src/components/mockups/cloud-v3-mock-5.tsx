"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const chassis = {
  frame: "#0e1a22",
  well: "#081016",
  ink: "#eee8d5",
  muted: "#7a8f96",
} as const;

const tubes = [
  { id: "cognito", label: "Cognito", fill: 0.62, tone: "signal" as const, ms: 12 },
  { id: "lambda", label: "Lambda", fill: 0.88, tone: "accent" as const, ms: 31 },
  { id: "sam", label: "SAM", fill: 0.54, tone: "success" as const, ms: 14 },
  { id: "amplify", label: "Amplify", fill: 0.48, tone: "accent" as const, ms: 9 },
  { id: "dynamo", label: "DynamoDB", fill: 0.72, tone: "accent" as const, ms: 18 },
] as const;

const totalMs = tubes.reduce((sum, tube) => sum + tube.ms, 0);

const toneFill: Record<(typeof tubes)[number]["tone"], string> = {
  signal: "fill-signal",
  accent: "fill-accent",
  success: "fill-success",
};

const toneGlow: Record<(typeof tubes)[number]["tone"], string> = {
  signal: "shadow-[0_0_12px_rgb(38_139_210/0.45)]",
  accent: "shadow-[0_0_12px_rgb(42_161_152/0.5)]",
  success: "shadow-[0_0_10px_rgb(133_153_0/0.4)]",
};

const shellIn: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.72, ease: settle },
  },
};

const tubeStage: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.28 },
  },
};

const rise: Variants = {
  hidden: { scaleY: 0, opacity: 0.4 },
  visible: (fill: number) => ({
    scaleY: fill,
    opacity: 1,
    transition: { duration: 0.85, ease: settle },
  }),
};

const channelDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0.25 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.95, ease: settle, delay: 0.55 },
  },
};

function MsTicker({ reduced }: { reduced: boolean }) {
  const [ms, setMs] = useState(reduced ? totalMs : 0);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start - 1500) / 420, 1);
      if (t <= 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const eased = 1 - Math.pow(1 - t, 3);
      setMs(Math.round(eased * totalMs));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return <span className="tabular-nums text-accent">{ms}ms</span>;
}

function ManifoldVisual({ reduced }: { reduced: boolean }) {
  const tubeGap = 14;
  const tubeW = 36;
  const chartW = tubes.length * tubeW + (tubes.length - 1) * tubeGap;
  const chartH = 168;
  const baseY = chartH - 8;

  return (
    <div className="relative mx-auto w-full max-w-[22rem] md:max-w-[26rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[42%] h-64 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl"
      />

      <motion.div
        className="relative overflow-hidden rounded-[1.65rem] border border-border/50 px-4 py-5 shadow-[0_0_0_1px_rgb(42_161_152/0.08),0_32px_64px_-28px_rgb(8_16_22/0.85)] sm:px-5 sm:py-6"
        style={{ backgroundColor: chassis.frame }}
        variants={shellIn}
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
              linear-gradient(to right, ${chassis.ink} 1px, transparent 1px),
              linear-gradient(to bottom, ${chassis.ink} 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        />

        <div className="relative flex items-end justify-between gap-3 border-b border-[rgb(238_232_213/0.08)] pb-4">
          <div>
            <p
              className="font-display text-[1.55rem] leading-none tabular-nums sm:text-[1.75rem]"
              style={{ color: chassis.ink }}
            >
              500+
            </p>
            <p className="mt-1 max-w-[9.5rem] text-[11px] leading-4" style={{ color: chassis.muted }}>
              authenticated requests today across live stacks
            </p>
          </div>
          <p className="text-right text-[10px] leading-4" style={{ color: chassis.muted }}>
            us-east-1
            <br />
            production
          </p>
        </div>

        <div className="relative mt-5">
          <div
            className="mx-auto overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-hidden="true"
          >
            <div className="mx-auto w-max min-w-full px-0.5">
              <svg
                viewBox={`0 0 ${chartW} ${chartH + 44}`}
                className="h-auto w-full min-w-[17.5rem] overflow-visible"
                role="img"
                aria-label="Five service columns connected by a shared channel"
              >
                <rect
                  x="0"
                  y={baseY}
                  width={chartW}
                  height="6"
                  rx="2"
                  fill={chassis.well}
                  stroke="rgb(238 232 213 / 0.12)"
                  strokeWidth="0.6"
                />

                <motion.path
                  d={`M ${tubeW / 2} ${baseY + 3} H ${chartW - tubeW / 2}`}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  variants={channelDraw}
                  initial={reduced ? false : "hidden"}
                  animate={reduced ? undefined : "visible"}
                  style={reduced ? { pathLength: 1, opacity: 1 } : undefined}
                />

                <motion.g
                  variants={tubeStage}
                  initial={reduced ? false : "hidden"}
                  animate={reduced ? undefined : "visible"}
                >
                  {tubes.map((tube, index) => {
                    const x = index * (tubeW + tubeGap);
                    const tubeH = 132;
                    const fillH = tubeH * tube.fill;

                    return (
                      <g key={tube.id}>
                        <rect
                          x={x}
                          y={baseY - tubeH}
                          width={tubeW}
                          height={tubeH}
                          rx="3"
                          fill={chassis.well}
                          stroke="rgb(238 232 213 / 0.14)"
                          strokeWidth="0.7"
                        />

                        {reduced ? (
                          <rect
                            x={x + 3}
                            y={baseY - fillH}
                            width={tubeW - 6}
                            height={fillH}
                            rx="2"
                            className={toneFill[tube.tone]}
                          />
                        ) : (
                          <motion.rect
                            x={x + 3}
                            y={baseY - fillH}
                            width={tubeW - 6}
                            height={fillH}
                            rx="2"
                            className={`${toneFill[tube.tone]} ${toneGlow[tube.tone]}`}
                            custom={tube.fill}
                            variants={rise}
                            style={{ transformOrigin: `${x + tubeW / 2}px ${baseY}px` }}
                          />
                        )}

                        <text
                          x={x + tubeW / 2}
                          y={baseY + 22}
                          textAnchor="middle"
                          fontSize="9.5"
                          fill={chassis.muted}
                          fontFamily="var(--font-sans), ui-sans-serif, system-ui, sans-serif"
                        >
                          {tube.label}
                        </text>

                        <text
                          x={x + tubeW / 2}
                          y={baseY + 34}
                          textAnchor="middle"
                          fontSize="8.5"
                          fill="rgb(42 161 152 / 0.85)"
                          fontFamily="var(--font-sans), ui-sans-serif, system-ui, sans-serif"
                        >
                          {tube.ms}ms
                        </text>
                      </g>
                    );
                  })}
                </motion.g>

                {!reduced && (
                  <motion.circle
                    r="4"
                    className="fill-accent"
                    initial={{ opacity: 0 }}
                    animate={{
                      cx: [
                        tubeW / 2,
                        tubeW + tubeGap + tubeW / 2,
                        2 * (tubeW + tubeGap) + tubeW / 2,
                        3 * (tubeW + tubeGap) + tubeW / 2,
                        4 * (tubeW + tubeGap) + tubeW / 2,
                      ],
                      cy: [baseY + 3, baseY + 3, baseY + 3, baseY + 3, baseY + 3],
                      opacity: [0, 1, 1, 1, 0],
                    }}
                    transition={{
                      duration: 1.15,
                      delay: 1.05,
                      ease: settle,
                      times: [0, 0.22, 0.5, 0.78, 1],
                    }}
                  />
                )}
              </svg>
            </div>
          </div>

          <div className="mt-4 flex items-baseline justify-between gap-3 border-t border-[rgb(238_232_213/0.08)] pt-4 sm:hidden">
            <p className="text-[11px]" style={{ color: chassis.muted }}>
              Write path through five services
            </p>
            <p className="text-[11px] tabular-nums" style={{ color: chassis.muted }}>
              <MsTicker reduced={reduced} /> total
            </p>
          </div>

          <div className="mt-4 hidden items-baseline justify-between gap-3 border-t border-[rgb(238_232_213/0.08)] pt-4 sm:flex">
            <p className="text-[11px]" style={{ color: chassis.muted }}>
              Pressure shared across auth, compute, deploy, host, and store
            </p>
            <p className="shrink-0 text-[11px] tabular-nums" style={{ color: chassis.muted }}>
              <span className="font-medium" style={{ color: chassis.ink }}>
                <MsTicker reduced={reduced} />
              </span>{" "}
              end to end
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function CloudV3Mock5() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="cloud-v3-mock-5"
      aria-labelledby="cloud-v3-mock-5-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2
            id="cloud-v3-mock-5-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            Serverless stacks that stay up under real traffic
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            I ship on Lambda, Cognito, SAM, Amplify, and DynamoDB. Auth, compute,
            infrastructure, hosting, and storage wired as one deployable unit. The
            stacks I run take hundreds of authenticated requests every day with
            sub-100ms writes.
          </p>
        </div>

        <div aria-hidden="true">
          <ManifoldVisual reduced={reduced} />
        </div>
      </div>
    </section>
  );
}
