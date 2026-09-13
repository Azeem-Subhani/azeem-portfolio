"use client";

import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

/** Mock-local slate panel: not site cream, not near-black + acid accent */
const ledger = {
  chassis: "#2a333c",
  panel: "#343e48",
  well: "#232b33",
  line: "#4a5662",
  ink: "#e2ddd4",
  muted: "#94a0ab",
} as const;

const skins = [
  {
    id: "a",
    label: "Surface A",
    domain: "book.alpha.io",
    accent: "#c46852",
    wash: "rgb(196 104 82 / 0.14)",
    surface: "#f6f0ec",
  },
  {
    id: "b",
    label: "Surface B",
    domain: "reserve.beta.co",
    accent: "#2aa198",
    wash: "rgb(42 161 152 / 0.14)",
    surface: "#eef6f5",
  },
  {
    id: "c",
    label: "Surface C",
    domain: "schedule.gamma.health",
    accent: "#6b8fc7",
    wash: "rgb(107 143 199 / 0.14)",
    surface: "#eef2f8",
  },
] as const;

const sharedSlots = [
  { time: "9:00", label: "Morning block", price: "$149" },
  { time: "1:00", label: "Midday session", price: "$289" },
  { time: "4:30", label: "Evening slot", price: "$520" },
] as const;

const chips = ["Product UI", "Theme config", "Shared checkout"] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const panelIn: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: settle },
  },
};

const columnIn = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: settle, delay },
  },
});

function ConfigStrip() {
  return (
    <div
      className="rounded-lg border px-3 py-2.5 sm:px-3.5"
      style={{
        backgroundColor: ledger.well,
        borderColor: ledger.line,
        color: ledger.ink,
      }}
    >
      <p className="text-[10px] font-medium" style={{ color: ledger.muted }}>
        theme.config
      </p>
      <dl className="mt-2 space-y-1.5 text-[10px] leading-none sm:text-[11px]">
        <div className="flex justify-between gap-3">
          <dt style={{ color: ledger.muted }}>primary</dt>
          <dd className="truncate font-medium tabular-nums">per tenant</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt style={{ color: ledger.muted }}>domain</dt>
          <dd className="truncate font-medium">unique hostname</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt style={{ color: ledger.muted }}>checkout</dt>
          <dd className="truncate font-medium">shared Stripe route</dd>
        </div>
      </dl>
    </div>
  );
}

function SkinColumn({
  skin,
  delay,
}: {
  skin: (typeof skins)[number];
  delay: number;
}) {
  return (
    <motion.div
      className="min-w-0 flex-1"
      variants={columnIn(delay)}
      aria-hidden="true"
    >
      <div
        className="overflow-hidden rounded-lg border shadow-[0_14px_28px_-20px_rgb(0_0_0/0.55)]"
        style={{
          borderColor: ledger.line,
          backgroundColor: skin.surface,
          color: "#1a2234",
        }}
      >
        <div
          className="flex items-center justify-between gap-2 border-b px-2 py-1.5 sm:px-2.5"
          style={{ borderColor: "rgb(26 34 52 / 0.08)", background: skin.wash }}
        >
          <p className="truncate text-[8px] sm:text-[9px]" style={{ color: "#64748b" }}>
            {skin.domain}
          </p>
          <span
            className="size-1.5 shrink-0 rounded-full"
            style={{ backgroundColor: skin.accent }}
          />
        </div>

        <div className="px-2 py-2 sm:px-2.5 sm:py-2.5">
          <p
            className="font-display text-[11px] leading-tight sm:text-xs"
            style={{ color: "#1a2234" }}
          >
            {skin.label}
          </p>

          <ul className="mt-2 space-y-1.5">
            {sharedSlots.map((slot) => (
              <li
                key={slot.time}
                className="flex items-baseline justify-between gap-1 rounded-md border px-1.5 py-1"
                style={{ borderColor: "rgb(26 34 52 / 0.07)" }}
              >
                <div className="min-w-0">
                  <p className="text-[8px] tabular-nums leading-none text-[#64748b]">
                    {slot.time}
                  </p>
                  <p className="mt-0.5 truncate text-[8px] leading-none sm:text-[9px]">
                    {slot.label}
                  </p>
                </div>
                <span
                  className="shrink-0 text-[9px] font-medium tabular-nums"
                  style={{ color: skin.accent }}
                >
                  {slot.price}
                </span>
              </li>
            ))}
          </ul>

          <div
            className="mt-2 rounded-md py-1 text-center text-[8px] font-medium text-white sm:text-[9px]"
            style={{ backgroundColor: skin.accent }}
          >
            Continue
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TriptychLedger({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-md"
      variants={stage}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      aria-hidden="true"
    >
      <div
        className="overflow-hidden rounded-2xl border p-3 sm:p-4"
        style={{
          backgroundColor: ledger.chassis,
          borderColor: ledger.line,
        }}
      >
        <motion.div variants={panelIn}>
          <ConfigStrip />
        </motion.div>

        <motion.p
          className="mt-3 text-center text-[10px] leading-relaxed"
          style={{ color: ledger.muted }}
          variants={panelIn}
        >
          Same React slot list, three theme files
        </motion.p>

        <div className="mt-3 flex gap-2 sm:gap-2.5">
          {skins.map((skin, index) => (
            <SkinColumn key={skin.id} skin={skin} delay={0.14 + index * 0.1} />
          ))}
        </div>

        <motion.div
          className="mt-3 flex items-center gap-2 rounded-lg border px-3 py-2"
          style={{
            borderColor: ledger.line,
            backgroundColor: ledger.panel,
          }}
          variants={panelIn}
        >
          <span
            className="size-2 shrink-0 rounded-full bg-accent"
            aria-hidden="true"
          />
          <p className="text-[10px] leading-relaxed sm:text-[11px]" style={{ color: ledger.muted }}>
            Next.js app router, one deploy, shared checkout route
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function WebV4Mock2() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="web-v4-mock-2"
      aria-labelledby="web-v4-mock-2-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <TriptychLedger reduced={reduced} />
        </div>

        <div className="lg:order-2">
          <h2
            id="web-v4-mock-2-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            Web design & development
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            From a branded landing page to a full white-label product UI, I build
            Next.js and React surfaces on one deploy pipeline. Theme files swap
            colors and domains. Booking grids, admin panels, and Stripe checkout
            stay in the same repo.
          </p>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
            Edit a config file, every tenant surface updates.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Capabilities">
            {chips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-accent/35 bg-accent/10 px-3 py-1 text-sm text-accent"
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
