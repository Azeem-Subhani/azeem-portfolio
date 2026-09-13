"use client";

import { useState } from "react";
import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const RING_R = 118;
const CX = 160;
const CY = 160;
const CIRC = 2 * Math.PI * RING_R;
const FILL = 512 / 600;

const services = [
  { id: "cognito", label: "Cognito", detail: "Family sign-in", angle: -90, tone: "signal" as const },
  { id: "lambda", label: "Lambda", detail: "Charge handler", angle: -18, tone: "accent" as const },
  { id: "sam", label: "SAM", detail: "Deploy stack", angle: 54, tone: "success" as const },
  { id: "amplify", label: "Amplify", detail: "Portal API", angle: 126, tone: "signal" as const },
  { id: "dynamo", label: "DynamoDB", detail: "Payment record", angle: 198, tone: "accent" as const },
] as const;

const toneChip: Record<(typeof services)[number]["tone"], string> = {
  signal: "border-signal/40 bg-signal/12 text-signal",
  accent: "border-accent/40 bg-accent/12 text-accent",
  success: "border-success/40 bg-success/12 text-success",
};

const toneDot: Record<(typeof services)[number]["tone"], string> = {
  signal: "bg-signal",
  accent: "bg-accent",
  success: "bg-success",
};

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const copyIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.55, ease: settle },
  },
};

const ringReveal: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: settle },
  },
};

const centerIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 340, damping: 22, delay: 0.55 },
  },
};

function ServiceNode({
  service,
  active,
  onSelect,
}: {
  service: (typeof services)[number];
  active: boolean;
  onSelect: () => void;
}) {
  const pos = polar(CX, CY, RING_R, service.angle);
  const chip = toneChip[service.tone];
  const dot = toneDot[service.tone];

  return (
    <motion.button
      type="button"
      className={`absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${chip} ${
        active ? "shadow-[0_0_18px_rgb(42_161_152/0.35)]" : ""
      }`}
      style={{ left: `${(pos.x / 320) * 100}%`, top: `${(pos.y / 320) * 100}%` }}
      onClick={onSelect}
      aria-pressed={active}
      aria-label={`${service.label}: ${service.detail}`}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
    >
      <span className={`size-1.5 shrink-0 rounded-full ${dot}`} aria-hidden="true" />
      {service.label}
    </motion.button>
  );
}

function ThroughputRing({ reduced }: { reduced: boolean }) {
  const [focus, setFocus] = useState<string>("lambda");
  const active = services.find((s) => s.id === focus) ?? services[1];

  return (
    <div className="relative mx-auto w-full max-w-[20rem] sm:max-w-[22rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full bg-accent/15 blur-3xl"
      />

      <motion.div
        className="relative"
        variants={ringReveal}
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
      >
        <div className="relative aspect-square w-full">
          <svg
            viewBox="0 0 320 320"
            className="h-full w-full"
            role="img"
            aria-label="Daily throughput ring showing five hundred twelve authenticated payments"
          >
            <circle
              cx={CX}
              cy={CY}
              r={RING_R}
              fill="none"
              stroke="currentColor"
              strokeWidth="14"
              className="text-border"
            />
            <motion.circle
              cx={CX}
              cy={CY}
              r={RING_R}
              fill="none"
              stroke="currentColor"
              strokeWidth="14"
              strokeLinecap="round"
              className="text-accent"
              transform={`rotate(-90 ${CX} ${CY})`}
              strokeDasharray={CIRC}
              initial={reduced ? { strokeDashoffset: CIRC * (1 - FILL) } : { strokeDashoffset: CIRC }}
              whileInView={{ strokeDashoffset: CIRC * (1 - FILL) }}
              viewport={{ once: true }}
              transition={{ duration: reduced ? 0 : 1.15, ease: settle, delay: 0.12 }}
            />
            {!reduced && (
              <motion.circle
                cx={CX}
                cy={CY}
                r={RING_R}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-accent/50"
                transform={`rotate(-90 ${CX} ${CY})`}
                strokeDasharray={`8 ${CIRC - 8}`}
                initial={{ strokeDashoffset: 0, opacity: 0 }}
                whileInView={{
                  strokeDashoffset: [0, -CIRC],
                  opacity: [0, 0.7, 0],
                }}
                viewport={{ once: true }}
                transition={{
                  strokeDashoffset: { duration: 1.8, ease: "linear", delay: 0.85 },
                  opacity: { duration: 1.8, times: [0, 0.15, 1], delay: 0.85 },
                }}
              />
            )}
          </svg>

          <motion.div
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center"
            variants={centerIn}
            initial={reduced ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px" }}
          >
            <p className="text-[11px] text-muted-foreground">Oak Hill Chapel</p>
            <p className="mt-1 font-display text-[clamp(2.6rem,9vw,3.4rem)] leading-none tabular-nums tracking-tight text-foreground">
              $1,280
            </p>
            <p className="mt-1.5 text-sm text-accent">settled in 84ms</p>
          </motion.div>

          {services.map((service) => (
            <ServiceNode
              key={service.id}
              service={service}
              active={focus === service.id}
              onSelect={() => setFocus(service.id)}
            />
          ))}
        </div>

        <div className="mt-6 flex items-end justify-between gap-4 px-1">
          <div>
            <p className="font-display text-4xl leading-none tabular-nums text-foreground">512</p>
            <p className="mt-1 text-sm text-muted-foreground">authenticated payments today</p>
          </div>
          <p className="max-w-[9.5rem] text-right text-xs leading-5 text-muted-foreground">
            <span className="block font-medium text-foreground">{active.label}</span>
            {active.detail}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export function CloudR2Mock2() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="cloud-r2-mock-2"
      aria-labelledby="cloud-r2-mock-2-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <motion.div
        className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20"
        variants={stage}
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-12% 0px" }}
      >
        <div>
          <motion.h2
            id="cloud-r2-mock-2-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
            variants={copyIn}
          >
            Five hundred signed-in payments, every day
          </motion.h2>
          <motion.p
            className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg"
            variants={copyIn}
          >
            Lambda, Cognito, SAM, Amplify, and DynamoDB run the memorial planning portal I
            shipped. Families authenticate once; checkout clears without a server waiting in the
            background. Oak Hill Chapel settled $1,280 in eighty-four milliseconds.
          </motion.p>
        </div>

        <div>
          <ThroughputRing reduced={reduced} />
        </div>
      </motion.div>
    </section>
  );
}
