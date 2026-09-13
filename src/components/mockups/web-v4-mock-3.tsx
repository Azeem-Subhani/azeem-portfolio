"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.06 },
  },
};

const shellIn: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: settle },
  },
};

const spineDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0.35 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.1, ease: settle, delay: 0.2 },
  },
};

const chips = ["Product UI", "White-label surfaces", "Shared checkout"] as const;

const slots = [
  { id: "morning", time: "9:00", label: "Morning block", price: "$149" },
  { id: "midday", time: "1:00", label: "Midday session", price: "$289" },
  { id: "evening", time: "4:30", label: "Evening slot", price: "$520" },
] as const;

function BrowserChrome({ domain }: { domain: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-border px-3 py-2">
      <div className="flex gap-1" aria-hidden="true">
        <span className="size-2 rounded-full bg-border" />
        <span className="size-2 rounded-full bg-border" />
        <span className="size-2 rounded-full bg-border" />
      </div>
      <p className="min-w-0 flex-1 truncate text-[10px] text-muted-foreground">
        {domain}
      </p>
    </div>
  );
}

function DesktopSlots({ activeId }: { activeId: string }) {
  return (
    <ul className="grid grid-cols-3 gap-2">
      {slots.map((slot) => {
        const lit = slot.id === activeId;
        return (
          <li
            key={slot.id}
            className="border px-2.5 py-2.5 transition-[border-color,background-color] duration-500"
            style={{
              borderColor: lit ? "var(--accent)" : "var(--border)",
              background: lit
                ? "color-mix(in srgb, var(--accent) 12%, var(--background))"
                : "var(--surface)",
            }}
          >
            <p className="font-display text-lg tabular-nums leading-none text-foreground">
              {slot.time}
            </p>
            <p className="mt-1 text-[9px] leading-snug text-muted-foreground">
              {slot.label}
            </p>
            <p className="mt-1 text-xs font-medium tabular-nums text-accent">
              {slot.price}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

function PhoneSlots({ activeId }: { activeId: string }) {
  return (
    <ul className="space-y-1.5">
      {slots.map((slot) => {
        const lit = slot.id === activeId;
        return (
          <li
            key={slot.id}
            className="flex items-center justify-between gap-2 border px-2.5 py-2 transition-[border-color,background-color] duration-500"
            style={{
              borderColor: lit ? "var(--accent)" : "var(--border)",
              background: lit
                ? "color-mix(in srgb, var(--accent) 12%, var(--background))"
                : "var(--surface)",
            }}
          >
            <div>
              <p className="font-display text-sm tabular-nums leading-none">
                {slot.time}
              </p>
              <p className="mt-0.5 text-[8px] text-muted-foreground">
                {slot.label}
              </p>
            </div>
            <p className="text-[10px] font-medium tabular-nums text-accent">
              {slot.price}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

function ViewportPairVisual({ reduced }: { reduced: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeId = slots[activeIndex]?.id ?? slots[0].id;

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slots.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[24rem] sm:max-w-[28rem]"
      variants={stage}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      <motion.div
        className="relative overflow-hidden rounded-[1.1rem] border border-border bg-background shadow-[0_0_0_1px_rgb(var(--shadow-color)/0.07),0_26px_52px_-30px_rgb(var(--shadow-color)/0.32)]"
        variants={shellIn}
      >
        <BrowserChrome domain="book.yourproduct.io" />
        <div className="border-b border-border bg-surface/50 px-4 py-4 sm:px-5">
          <p className="font-display text-[clamp(1.2rem,3vw,1.55rem)] leading-tight text-foreground">
            Pick a time
          </p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">
            Saturday availability
          </p>
          <div className="mt-3">
            <DesktopSlots activeId={activeId} />
          </div>
        </div>
      </motion.div>

      <svg
        viewBox="0 0 120 72"
        className="pointer-events-none absolute left-[58%] top-[42%] h-[4.5rem] w-[7.5rem] text-accent sm:left-[56%] sm:top-[44%]"
        aria-hidden="true"
      >
        <motion.path
          d="M 4 8 C 40 8, 52 36, 88 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          variants={spineDraw}
        />
        <motion.circle
          cx="4"
          cy="8"
          r="3"
          fill="currentColor"
          variants={shellIn}
        />
        <motion.circle
          cx="88"
          cy="64"
          r="3"
          fill="currentColor"
          variants={shellIn}
        />
      </svg>

      <motion.div
        className="absolute -bottom-2 right-0 w-[58%] max-w-[11.5rem] overflow-hidden rounded-[1.35rem] border-[3px] border-border bg-background shadow-[0_18px_36px_-22px_rgb(var(--shadow-color)/0.4)] sm:-bottom-4 sm:w-[52%]"
        variants={shellIn}
      >
        <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
          <p className="text-[9px] tabular-nums text-muted-foreground">9:41</p>
          <div className="flex gap-0.5" aria-hidden="true">
            <span className="h-1 w-3 rounded-sm bg-foreground/25" />
            <span className="size-1 rounded-full bg-foreground/25" />
          </div>
        </div>
        <div className="px-3 py-3">
          <p className="font-display text-base leading-tight">Pick a time</p>
          <div className="mt-2">
            <PhoneSlots activeId={activeId} />
          </div>
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            className="mt-2.5 w-full rounded-md bg-accent py-2 text-[9px] font-medium text-accent-foreground"
          >
            Continue
          </button>
        </div>
      </motion.div>

      <p className="relative z-10 mt-16 text-[11px] leading-5 text-muted-foreground sm:mt-[4.5rem]">
        Same slot data renders as a grid on desktop and a stack on phone.
      </p>
    </motion.div>
  );
}

function CapabilityChips() {
  return (
    <ul className="mt-6 flex flex-wrap gap-2" aria-label="Web capabilities">
      {chips.map((chip) => (
        <li
          key={chip}
          className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-foreground"
        >
          {chip}
        </li>
      ))}
    </ul>
  );
}

export function WebV4Mock3() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="web-v4-mock-3"
      aria-labelledby="web-v4-mock-3-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <ViewportPairVisual reduced={reduced} />
        </div>

        <div className="lg:order-2">
          <h2
            id="web-v4-mock-3-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            Web design & development
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            From marketing pages to logged-in product screens, I ship Next.js and
            React UI with auth, scheduling, and Stripe in one codebase.
          </p>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
            Your landing page and customer app deploy together. You do not need a
            second repo when checkout goes live.
          </p>
          <CapabilityChips />
        </div>
      </div>
    </section>
  );
}
