"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const panelIn: Variants = {
  hidden: { opacity: 0, y: 36, rotateX: 14, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.8, ease: settle },
  },
};

const pass: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: settle },
  },
};

const pop: Variants = {
  hidden: { opacity: 0, scale: 0.72 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 360, damping: 20 },
  },
};

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0.15 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.1, ease: settle },
  },
};

const stackNodes = [
  { id: "cognito", label: "Cognito", angle: -90, r: 0.78 },
  { id: "lambda", label: "Lambda", angle: -18, r: 0.78 },
  { id: "sam", label: "SAM", angle: 54, r: 0.62 },
  { id: "amplify", label: "Amplify", angle: 126, r: 0.62 },
  { id: "dynamo", label: "DynamoDB", angle: 198, r: 0.78 },
] as const;

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function SweepNeedle({ reduced }: { reduced: boolean }) {
  if (reduced) {
    return (
      <g transform="translate(200 200)">
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="-128"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-accent/70"
        />
      </g>
    );
  }

  return (
    <motion.g
      transform="translate(200 200)"
      initial={{ rotate: -120, opacity: 0 }}
      animate={{ rotate: 240, opacity: [0, 0.85, 0.85, 0] }}
      transition={{
        duration: 2.2,
        delay: 0.9,
        ease: settle,
        opacity: { duration: 2.2, times: [0, 0.08, 0.82, 1] },
      }}
    >
      <line
        x1="0"
        y1="0"
        x2="0"
        y2="-128"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-accent/70"
      />
    </motion.g>
  );
}

function LatencyCounter({ reduced }: { reduced: boolean }) {
  const [ms, setMs] = useState(reduced ? 84 : 0);

  useEffect(() => {
    if (reduced) return;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start - 1800) / 420, 1);
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

  return (
    <span className="tabular-nums text-accent">{ms}ms</span>
  );
}

function ThroughputDial({ reduced }: { reduced: boolean }) {
  const cx = 200;
  const cy = 200;
  const outerR = 158;

  return (
    <div
      className="relative mx-auto w-full max-w-[22rem] md:max-w-[26rem]"
      style={{ perspective: 1300 }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/20 blur-3xl"
      />

      <div className="dark relative" data-theme="dark">
        <motion.div
          className="relative overflow-hidden rounded-[1.75rem] border border-border/55 bg-surface px-4 py-5 shadow-[0_0_0_1px_rgb(42_161_152/0.1),0_36px_70px_-30px_rgb(0_43_54/0.7)] md:px-5 md:py-6"
          style={{ transformStyle: "preserve-3d" }}
          variants={stage}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <div
            aria-hidden="true"
            className="graph-paper pointer-events-none absolute inset-0 opacity-30"
          />

          <motion.div
            className="relative flex items-end justify-between gap-3 px-1"
            variants={fade}
          >
            <div>
              <p className="text-[11px] text-muted-foreground">Memorial portal</p>
              <p className="font-display text-[1.5rem] leading-none text-foreground">
                live scope
              </p>
            </div>
            <div className="text-right">
              <p className="font-display text-3xl leading-none tabular-nums text-foreground">
                512
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">auth payments today</p>
            </div>
          </motion.div>

          <motion.div
            className="relative mx-auto mt-4 aspect-square w-full max-w-[18.5rem]"
            variants={panelIn}
          >
            <svg
              viewBox="0 0 400 400"
              className="h-full w-full overflow-visible text-accent/55"
              aria-hidden="true"
            >
              <motion.circle
                cx={cx}
                cy={cy}
                r={outerR}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.35"
                variants={draw}
              />
              <motion.circle
                cx={cx}
                cy={cy}
                r={112}
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeDasharray="3 7"
                opacity="0.45"
                variants={draw}
              />

              {Array.from({ length: 24 }).map((_, i) => {
                const deg = (i / 24) * 360 - 90;
                const inner = polar(cx, cy, outerR - (i % 6 === 0 ? 14 : 8), deg);
                const outer = polar(cx, cy, outerR, deg);
                return (
                  <motion.line
                    key={i}
                    x1={inner.x}
                    y1={inner.y}
                    x2={outer.x}
                    y2={outer.y}
                    stroke="currentColor"
                    strokeWidth={i % 6 === 0 ? 1.4 : 0.8}
                    opacity={i % 6 === 0 ? 0.7 : 0.35}
                    variants={fade}
                  />
                );
              })}

              <motion.circle
                cx={cx}
                cy={cy}
                r={68}
                fill="rgb(0 43 54 / 0.55)"
                stroke="currentColor"
                strokeWidth="1"
                variants={pop}
              />

              <SweepNeedle reduced={reduced} />

              {!reduced && (
                <motion.circle
                  cx={cx}
                  cy={cy}
                  r={68}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-accent"
                  initial={{ scale: 0.3, opacity: 0.8 }}
                  animate={{ scale: 1.55, opacity: 0 }}
                  transition={{
                    duration: 1.4,
                    delay: 2.05,
                    ease: settle,
                  }}
                  style={{ originX: `${cx}px`, originY: `${cy}px` }}
                />
              )}

              <motion.g variants={pass}>
                {stackNodes.map((node) => {
                  const pt = polar(cx, cy, outerR * node.r, node.angle);
                  return (
                    <motion.g key={node.id} variants={pop}>
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={node.id === "lambda" ? 5 : 4}
                        className={
                          node.id === "cognito"
                            ? "fill-signal"
                            : node.id === "dynamo"
                              ? "fill-accent"
                              : "fill-foreground/80"
                        }
                      />
                      <text
                        x={pt.x}
                        y={pt.y + (node.angle > 90 && node.angle < 270 ? 18 : -12)}
                        textAnchor="middle"
                        fill="currentColor"
                        className="text-muted-foreground"
                        fontSize="11"
                        fontFamily="var(--font-sans), ui-sans-serif, system-ui, sans-serif"
                      >
                        {node.label}
                      </text>
                    </motion.g>
                  );
                })}
              </motion.g>

              {!reduced && (
                <motion.circle
                  r="5"
                  className="fill-accent"
                  initial={{ opacity: 0 }}
                  animate={{
                    cx: [
                      polar(cx, cy, outerR * 0.78, -90).x,
                      polar(cx, cy, outerR * 0.78, -18).x,
                      polar(cx, cy, outerR * 0.62, 54).x,
                      cx,
                    ],
                    cy: [
                      polar(cx, cy, outerR * 0.78, -90).y,
                      polar(cx, cy, outerR * 0.78, -18).y,
                      polar(cx, cy, outerR * 0.62, 54).y,
                      cy,
                    ],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 1.85,
                    delay: 1.05,
                    ease: settle,
                    times: [0, 0.35, 0.72, 1],
                  }}
                />
              )}
            </svg>

            <motion.div
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              variants={pop}
            >
              <div className="w-[min(72%,11rem)] rounded-2xl border border-accent/30 bg-background/95 px-3.5 py-3 text-center shadow-[0_16px_36px_-20px_rgb(0_0_0/0.65),inset_0_1px_0_rgb(238_232_213/0.06)] backdrop-blur-sm">
                <p className="text-[10px] text-muted-foreground">Oak Hill Chapel</p>
                <p className="text-[11px] font-medium text-foreground">Whitmore family</p>
                <p className="mt-2 font-display text-[2rem] leading-none tracking-tight text-foreground">
                  $1,280
                </p>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  settled in <LatencyCounter reduced={reduced} />
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative mt-4 grid grid-cols-3 gap-2 border-t border-border/60 pt-4"
            variants={pass}
          >
            {[
              { value: "500+", label: "auth payments per day" },
              { value: "84ms", label: "Lambda write on last charge" },
              { value: "us-east-1", label: "region" },
            ].map((stat) => (
              <motion.div key={stat.label} variants={fade} className="text-center">
                <p className="font-display text-lg leading-none tabular-nums text-foreground">
                  {stat.value}
                </p>
                <p className="mt-1 text-[9px] leading-3 text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export function CloudSectionMock5() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="cloud"
      aria-labelledby="cloud-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2
            id="cloud-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            Checkout clears before the receipt prints
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            Lambda, Cognito, SAM, Amplify, and DynamoDB run the memorial planning portal.
            More than five hundred authenticated payments go through every day. Oak Hill
            Chapel&apos;s Whitmore family paid $1,280; the write finished in 84ms.
          </p>
        </div>
        <div aria-hidden="true">
          <ThroughputDial reduced={reduced} />
        </div>
      </div>
    </section>
  );
}
