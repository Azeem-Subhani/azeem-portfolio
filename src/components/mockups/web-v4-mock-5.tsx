"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

/** Mock-local console: Solarized night chassis, not site cream or agency black */
const console = {
  frame: "#0a3540",
  well: "#04313d",
  bezel: "#073642",
  ink: "#eee8d5",
  muted: "#93a1a1",
  live: "#859900",
  pending: "#657b83",
} as const;

const capabilities = ["Product UI", "White-label surfaces", "Shared checkout"];

const deployTargets = [
  {
    id: "north",
    host: "book.northline.io",
    tint: "#2aa198",
    wash: "rgb(42 161 152 / 0.14)",
  },
  {
    id: "harbor",
    host: "reserve.harbor.co",
    tint: "#268bd2",
    wash: "rgb(38 139 210 / 0.14)",
  },
  {
    id: "ridge",
    host: "schedule.ridgefield.health",
    tint: "#b58900",
    wash: "rgb(181 137 0 / 0.14)",
  },
] as const;

const previewSlots = [
  { time: "9:00", label: "Morning block", price: "$149" },
  { time: "1:30", label: "Midday session", price: "$289" },
  { time: "4:00", label: "Evening slot", price: "$520" },
];

const shellIn: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.72, ease: settle },
  },
};

const rowIn = (delay: number): Variants => ({
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.48, ease: settle, delay },
  },
});

function LiveBadge({ live, reduced }: { live: boolean; reduced: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-medium tabular-nums"
      style={{
        color: live ? console.live : console.pending,
        background: live
          ? "rgb(133 153 0 / 0.14)"
          : "rgb(101 123 131 / 0.12)",
        border: `1px solid ${live ? "rgb(133 153 0 / 0.35)" : "rgb(101 123 131 / 0.28)"}`,
      }}
    >
      {live ? (
        <motion.span
          initial={reduced ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 460, damping: 20 }}
        >
          <Check className="size-2.5" strokeWidth={2.5} aria-hidden="true" />
        </motion.span>
      ) : (
        <span
          className="size-1.5 rounded-full"
          style={{ background: console.pending }}
          aria-hidden="true"
        />
      )}
      {live ? "live" : "pending"}
    </span>
  );
}

function SlotStrip({ tint }: { tint: string }) {
  return (
    <ul className="flex gap-1.5" aria-hidden="true">
      {previewSlots.map((slot) => (
        <li
          key={slot.time}
          className="min-w-0 flex-1 rounded-lg border px-2 py-1.5"
          style={{
            borderColor: `color-mix(in srgb, ${tint} 28%, transparent)`,
            background: `color-mix(in srgb, ${tint} 8%, ${console.well})`,
          }}
        >
          <p
            className="font-display text-[11px] tabular-nums leading-none"
            style={{ color: console.ink }}
          >
            {slot.time}
          </p>
          <p className="mt-0.5 truncate text-[7px]" style={{ color: console.muted }}>
            {slot.label}
          </p>
          <p className="mt-0.5 text-[8px] tabular-nums" style={{ color: tint }}>
            {slot.price}
          </p>
        </li>
      ))}
    </ul>
  );
}

function PublishConsoleVisual({ reduced }: { reduced: boolean }) {
  const [liveCount, setLiveCount] = useState(reduced ? deployTargets.length : 0);

  useEffect(() => {
    if (reduced) return;

    const timers = deployTargets.map((_, index) =>
      window.setTimeout(() => setLiveCount(index + 1), 900 + index * 680),
    );

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [reduced]);

  const activeTarget = deployTargets[Math.max(0, liveCount - 1)] ?? deployTargets[0];

  return (
    <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-[24rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[38%] h-56 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: `color-mix(in srgb, ${activeTarget.tint} 18%, transparent)` }}
      />

      <motion.div
        className="relative overflow-hidden rounded-[1.65rem] border border-border/50 shadow-[0_0_0_1px_rgb(42_161_152/0.08),0_32px_64px_-28px_rgb(4_49_61/0.88)]"
        style={{ backgroundColor: console.frame }}
        variants={shellIn}
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(to right, ${console.ink} 1px, transparent 1px),
              linear-gradient(to bottom, ${console.ink} 1px, transparent 1px)
            `,
            backgroundSize: "18px 18px",
          }}
        />

        <div
          className="relative flex items-center justify-between gap-3 border-b px-4 py-3 sm:px-5"
          style={{ borderColor: "rgb(238 232 213 / 0.08)" }}
        >
          <div>
            <p className="text-[10px]" style={{ color: console.muted }}>
              Production deploy
            </p>
            <p className="font-display text-[1.15rem] leading-tight" style={{ color: console.ink }}>
              One push, three hosts
            </p>
          </div>
          <p className="text-right text-[10px] leading-4" style={{ color: console.muted }}>
            Next.js 15
            <br />
            edge themes
          </p>
        </div>

        <div className="relative space-y-0 px-3 py-3 sm:px-4 sm:py-4">
          <div
            className="mb-3 rounded-xl border px-3 py-2.5"
            style={{
              borderColor: "rgb(238 232 213 / 0.1)",
              backgroundColor: console.well,
            }}
          >
            <p className="text-[9px]" style={{ color: console.muted }}>
              commit on main
            </p>
            <p className="mt-0.5 text-[11px] font-medium" style={{ color: console.ink }}>
              slot grid + theme tokens
            </p>
          </div>

          <ol className="space-y-2" aria-label="Deploy targets">
            {deployTargets.map((target, index) => {
              const live = liveCount > index;

              return (
                <motion.li
                  key={target.id}
                  variants={rowIn(0.12 + index * 0.08)}
                  initial={reduced ? false : "hidden"}
                  whileInView="visible"
                  viewport={{ once: true, margin: "-10% 0px" }}
                  className="rounded-xl border px-3 py-2.5"
                  style={{
                    borderColor: live
                      ? `color-mix(in srgb, ${target.tint} 32%, transparent)`
                      : "rgb(238 232 213 / 0.08)",
                    backgroundColor: live ? target.wash : console.well,
                    transition: "border-color 420ms ease, background-color 420ms ease",
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p
                        className="truncate font-mono text-[10px] sm:text-[11px]"
                        style={{ color: live ? console.ink : console.muted }}
                      >
                        {target.host}
                      </p>
                      <p className="mt-0.5 text-[9px]" style={{ color: console.muted }}>
                        shared checkout tree
                      </p>
                    </div>
                    <LiveBadge live={live} reduced={reduced} />
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>

        <div
          className="relative border-t px-3 py-3 sm:px-4 sm:py-4"
          style={{
            borderColor: "rgb(238 232 213 / 0.08)",
            backgroundColor: console.bezel,
          }}
        >
          <div className="mb-2 flex items-baseline justify-between gap-2">
            <p className="text-[10px]" style={{ color: console.muted }}>
              Slot UI on all three
            </p>
            <p className="text-[9px] tabular-nums" style={{ color: activeTarget.tint }}>
              {activeTarget.host.split(".")[0]}
            </p>
          </div>
          <SlotStrip tint={activeTarget.tint} />
          <p className="mt-3 text-[10px] leading-4" style={{ color: console.muted }}>
            Same React tree. Brand color swaps per hostname at the edge.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export function WebV4Mock5() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="web-v4-mock-5"
      aria-labelledby="web-v4-mock-5-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <PublishConsoleVisual reduced={reduced} />
        </div>

        <div className="lg:order-2">
          <h2
            id="web-v4-mock-5-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            Web design & development
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            From marketing landing pages to multi-tenant product interfaces, I
            ship Next.js and React UIs customers can browse, book, and pay on.
            Each domain gets its own palette and checkout flow without forking
            the repo.
          </p>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
            Landing pages, booking grids, and Stripe checkout live in one tree.
            I load brand tokens at the edge so every hostname ships the same
            features with its own look.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Web capabilities">
            {capabilities.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-border/80 bg-surface px-3 py-1.5 text-sm text-foreground"
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
