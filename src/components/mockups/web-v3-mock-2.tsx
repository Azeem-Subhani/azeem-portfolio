"use client";

import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.06 },
  },
};

const cardIn = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.78, ease: settle, delay },
  },
});

type Surface = {
  id: string;
  label: string;
  domain: string;
  tint: string;
  wash: string;
  rotate: string;
  offset: string;
  z: string;
  slot: string;
  price: string;
};

const surfaces: Surface[] = [
  {
    id: "a",
    label: "Site A",
    domain: "book.site-a.io",
    tint: "var(--accent)",
    wash: "color-mix(in srgb, var(--accent) 18%, var(--background))",
    rotate: "-4deg",
    offset: "translate(0, 0)",
    z: "z-30",
    slot: "Morning block",
    price: "$149",
  },
  {
    id: "b",
    label: "Site B",
    domain: "reserve.site-b.io",
    tint: "var(--signal)",
    wash: "color-mix(in srgb, var(--signal) 18%, var(--background))",
    rotate: "2.5deg",
    offset: "translate(14%, 12%)",
    z: "z-20",
    slot: "Midday session",
    price: "$289",
  },
  {
    id: "c",
    label: "Site C",
    domain: "checkout.site-c.io",
    tint: "var(--success)",
    wash: "color-mix(in srgb, var(--success) 18%, var(--background))",
    rotate: "-1.5deg",
    offset: "translate(-10%, 22%)",
    z: "z-10",
    slot: "Evening slot",
    price: "$520",
  },
];

function MiniBrowser({ surface, delay }: { surface: Surface; delay: number }) {
  return (
    <div
      className={`absolute left-1/2 top-0 w-[68%] max-w-[15rem] ${surface.z}`}
      style={{ transform: `translateX(-50%) ${surface.offset}` }}
    >
      <motion.div variants={cardIn(delay)}>
        <div style={{ transform: `rotate(${surface.rotate})` }}>
        <div className="overflow-hidden rounded-xl border border-border bg-background shadow-[0_0_0_1px_rgb(var(--shadow-color)/0.06),0_20px_40px_-24px_rgb(var(--shadow-color)/0.35)]">
        <div className="flex items-center gap-1.5 border-b border-border px-2.5 py-1.5">
          <div className="flex gap-1" aria-hidden="true">
            <span className="size-1.5 rounded-full bg-border" />
            <span className="size-1.5 rounded-full bg-border" />
            <span className="size-1.5 rounded-full bg-border" />
          </div>
          <p className="min-w-0 flex-1 truncate text-[8px] text-muted-foreground">
            {surface.domain}
          </p>
        </div>

        <div className="px-3 py-3" style={{ background: surface.wash }}>
          <div className="flex items-center justify-between gap-2">
            <p className="font-display text-sm leading-tight text-foreground">
              {surface.label}
            </p>
            <span
              className="size-2 shrink-0 rounded-full"
              style={{ background: surface.tint }}
              aria-hidden="true"
            />
          </div>

          <div className="mt-2.5 rounded-lg border border-border bg-background px-2.5 py-2">
            <p className="text-[9px] text-muted-foreground">{surface.slot}</p>
            <p
              className="mt-0.5 font-display text-base tabular-nums leading-none"
              style={{ color: surface.tint }}
            >
              {surface.price}
            </p>
          </div>

          <div
            className="mt-2.5 rounded-md py-1.5 text-center text-[9px] font-medium text-accent-foreground"
            style={{ background: surface.tint }}
          >
            Continue
          </div>
        </div>
        </div>
        </div>
      </motion.div>
    </div>
  );
}

function DeployFanVisual({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="relative mx-auto aspect-[4/5] w-full max-w-[20rem] sm:max-w-[22rem]"
      variants={stage}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      aria-hidden="true"
    >
      <p className="pointer-events-none absolute inset-x-0 top-[8%] text-center font-display text-[clamp(3.5rem,12vw,5.5rem)] leading-none text-foreground/5">
        3×
      </p>

      {surfaces.map((surface, index) => (
        <MiniBrowser key={surface.id} surface={surface} delay={index * 0.12} />
      ))}

      <motion.div
        className="absolute inset-x-0 bottom-0 rounded-xl border border-border bg-surface px-4 py-3"
        variants={cardIn(0.42)}
      >
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          One Next.js deploy publishes three branded checkout surfaces. Each
          domain loads the same React tree with its own theme config.
        </p>
      </motion.div>
    </motion.div>
  );
}

export function WebV3Mock2() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="web-v3-mock-2"
      aria-labelledby="web-v3-mock-2-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <DeployFanVisual reduced={reduced} />
        </div>

        <div className="lg:order-2">
          <h2
            id="web-v3-mock-2-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            Three domains from one React deploy
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            I build Next.js product UIs where each tenant ships under its own
            domain and palette without forking the repo. Booking grids, waiver
            steps, and Stripe checkout run once in code. Brand identity comes
            from configuration loaded at the edge.
          </p>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
            Your team edits a theme file, pushes, and every public site updates
            on the same pipeline.
          </p>
        </div>
      </div>
    </section>
  );
}
