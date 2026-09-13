"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

/** Mock-local ledger: Solarized paper surface, not mock 1's dark registry chassis */
const ledger = {
  paper: "#f0e9d3",
  rule: "#d3cbb8",
  ink: "#073642",
  muted: "#657b83",
  well: "#f5efd8",
  accent: "#2aa198",
  signal: "#268bd2",
  success: "#859900",
} as const;

const capabilities = ["Autoscaling compute", "Auth pools", "Atomic deploys"] as const;

const scaleMarks = [
  { value: 100, label: "100" },
  { value: 250, label: "250" },
  { value: 500, label: "500" },
  { value: 750, label: "750" },
  { value: 1000, label: "1k" },
  { value: 2000, label: "2k" },
] as const;

const targetConcurrent = 512;

const services = [
  { id: "cognito", label: "Cognito", role: "Auth pool", tone: "signal" as const },
  { id: "lambda", label: "Lambda", role: "Compute", tone: "accent" as const },
  { id: "sam", label: "SAM", role: "Deploy", tone: "success" as const },
  { id: "amplify", label: "Amplify", role: "Host", tone: "signal" as const },
  { id: "dynamo", label: "DynamoDB", role: "Store", tone: "accent" as const },
] as const;

const toneBorder: Record<(typeof services)[number]["tone"], string> = {
  signal: "border-signal/35 bg-signal/10 text-signal",
  accent: "border-accent/35 bg-accent/10 text-accent",
  success: "border-success/35 bg-success/10 text-success",
};

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.06 },
  },
};

const panelIn: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.72, ease: settle },
  },
};

const ruleDraw: Variants = {
  hidden: { scaleX: 0, opacity: 0.4 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.85, ease: settle, delay: 0.22 },
  },
};

const markerIn: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: settle, delay: 0.75 },
  },
};

const tagIn: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: settle, delay: 0.55 + index * 0.06 },
  }),
};

function markerPosition(value: number, chartW: number, pad: number) {
  const min = scaleMarks[0].value;
  const max = scaleMarks[scaleMarks.length - 1].value;
  const t = (value - min) / (max - min);
  return pad + t * (chartW - pad * 2);
}

function ConcurrentCounter({ reduced }: { reduced: boolean }) {
  const [count, setCount] = useState(reduced ? targetConcurrent : 0);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const start = performance.now();
    const delay = 900;
    const duration = 520;

    const tick = (now: number) => {
      const elapsed = now - start - delay;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * targetConcurrent));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <span className="tabular-nums font-medium" style={{ color: ledger.ink }}>
      {count}
    </span>
  );
}

function CapacityLedgerVisual({ reduced }: { reduced: boolean }) {
  const chartW = 320;
  const pad = 24;
  const markerX = markerPosition(targetConcurrent, chartW, pad);
  const markerPct = (markerX / chartW) * 100;

  return (
    <div className="relative mx-auto w-full max-w-[20rem] md:max-w-[26rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[42%] h-56 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "color-mix(in srgb, #2aa198 14%, transparent)" }}
      />

      <motion.div
        className="relative overflow-hidden rounded-[1.65rem] border px-4 py-5 shadow-[0_24px_48px_-28px_rgb(7_54_66/0.22)] sm:px-5 sm:py-6"
        style={{
          backgroundColor: ledger.paper,
          borderColor: "color-mix(in srgb, #073642 12%, transparent)",
        }}
        variants={stage}
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
      >
        <motion.div variants={panelIn}>
          <div className="flex items-end justify-between gap-3 border-b pb-4" style={{ borderColor: ledger.rule }}>
            <div>
              <p className="text-[11px]" style={{ color: ledger.muted }}>
                Capacity ledger
              </p>
              <p
                className="mt-0.5 font-display text-[1.35rem] leading-none sm:text-[1.5rem]"
                style={{ color: ledger.ink }}
              >
                Lambda concurrency
              </p>
            </div>
            <p className="text-right text-[10px] leading-4" style={{ color: ledger.muted }}>
              us-east-1
              <br />
              production
            </p>
          </div>

          <div className="relative mt-6">
            <motion.div
              className="relative h-px origin-left"
              style={{ backgroundColor: ledger.rule }}
              variants={ruleDraw}
            />

            <div className="relative mt-0 h-16">
              {scaleMarks.map((mark) => {
                const x = markerPosition(mark.value, chartW, pad);
                const pct = (x / chartW) * 100;
                return (
                  <div
                    key={mark.label}
                    className="absolute top-0 flex -translate-x-1/2 flex-col items-center"
                    style={{ left: `${pct}%` }}
                    aria-hidden="true"
                  >
                    <div
                      className="h-3 w-px"
                      style={{ backgroundColor: ledger.rule }}
                    />
                    <span
                      className="mt-1.5 text-[9px] tabular-nums"
                      style={{ color: ledger.muted }}
                    >
                      {mark.label}
                    </span>
                  </div>
                );
              })}

              <motion.div
                className="absolute top-0 flex -translate-x-1/2 flex-col items-center"
                style={{ left: `${markerPct}%` }}
                variants={markerIn}
              >
                <div
                  className="flex h-14 w-8 items-end justify-center rounded-t-md border-x border-t"
                  style={{
                    borderColor: ledger.accent,
                    background: "color-mix(in srgb, #2aa198 12%, #f0e9d3)",
                  }}
                >
                  <div
                    className="mb-0.5 size-2 rounded-full"
                    style={{ backgroundColor: ledger.accent }}
                  />
                </div>
                <span
                  className="mt-1 text-[9px] font-medium tabular-nums"
                  style={{ color: ledger.accent }}
                >
                  now
                </span>
              </motion.div>
            </div>

            <div
              className="mt-2 rounded-lg px-3 py-2.5"
              style={{ backgroundColor: ledger.well }}
            >
              <p className="text-[10px]" style={{ color: ledger.muted }}>
                Concurrent executions
              </p>
              <p className="mt-0.5 text-sm">
                <ConcurrentCounter reduced={reduced} />
                <span style={{ color: ledger.muted }}> / 1,000 reserved</span>
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-1.5" aria-hidden="true">
            {services.map((service, index) => (
              <motion.span
                key={service.id}
                custom={reduced ? 0 : index}
                variants={tagIn}
                className={`rounded-full border px-2 py-1 text-[9px] font-medium ${toneBorder[service.tone]}`}
              >
                {service.label}
              </motion.span>
            ))}
          </div>

          <div
            className="mt-4 flex items-baseline justify-between gap-3 border-t pt-4"
            style={{ borderColor: ledger.rule }}
          >
            <p className="max-w-[11rem] text-[10px] leading-4" style={{ color: ledger.muted }}>
              Traffic climbs, concurrency follows. No manual resize.
            </p>
            <p className="shrink-0 text-[10px] tabular-nums" style={{ color: ledger.muted }}>
              <span className="font-medium" style={{ color: ledger.success }}>
                SAM
              </span>{" "}
              deploy live
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function CloudV4Mock5() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="cloud-v4-mock-5"
      aria-labelledby="cloud-v4-mock-5-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2
            id="cloud-v4-mock-5-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            Cloud expertise at scale
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            From a single SAM template to stacks handling hundreds of authenticated
            requests daily, I deploy Lambda, Cognito, Amplify, and DynamoDB as one
            unit. Concurrency rises when traffic does. You are not resizing servers
            at midnight.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Cloud capabilities">
            {capabilities.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-border/80 bg-surface/60 px-3 py-1.5 text-sm text-foreground"
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>

        <div aria-hidden="true">
          <CapacityLedgerVisual reduced={reduced} />
        </div>
      </div>
    </section>
  );
}
