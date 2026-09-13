"use client";

import { Calendar, ChevronRight, Globe } from "lucide-react";
import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13 },
  },
};

const browserIn: Variants = {
  hidden: { opacity: 0, x: -56, rotateY: -22, rotate: -3 },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    rotate: -3,
    transition: { duration: 0.82, ease: settle },
  },
};

const panelIn: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.9, rotateX: 10 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { type: "spring", stiffness: 260, damping: 22, delay: 0.28 },
  },
};

const pass: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.22 } },
};

const screen: Variants = {
  hidden: {},
  visible: { transition: { delayChildren: 0.32, staggerChildren: 0.06 } },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: settle },
  },
};

const pop: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 380, damping: 18 },
  },
};

const slide: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.38, ease: settle },
  },
};

const venues = [
  { name: "Monaco", slug: "monaco", tone: "accent" as const, active: true },
  { name: "Silverstone", slug: "silverstone", tone: "signal" as const, active: false },
  { name: "Spa", slug: "spa", tone: "accent" as const, active: false },
  { name: "Monza", slug: "monza", tone: "signal" as const, active: false },
  { name: "Suzuka", slug: "suzuka", tone: "accent" as const, active: false },
];

const slots = [
  { time: "9:00", label: "Track day", price: "$220", open: true },
  { time: "1:30", label: "Drive experience", price: "$420", open: true },
  { time: "4:00", label: "Private hire", price: "$1,800", open: false },
];

function toneBg(tone: "accent" | "signal") {
  return tone === "signal" ? "bg-signal/20 text-signal" : "bg-accent/20 text-accent";
}

function TrafficLights() {
  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      <span className="size-2.5 rounded-full bg-error/80" />
      <span className="size-2.5 rounded-full bg-success/70" />
      <span className="size-2.5 rounded-full bg-accent-secondary/70" />
    </div>
  );
}

function VenuePanel({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="absolute right-0 top-6 z-10 w-[min(100%,14.5rem)] origin-top-right md:-right-10 lg:-right-14"
      style={{ transformStyle: "preserve-3d" }}
      variants={panelIn}
    >
      <div className="rounded-2xl bg-background p-[7px] shadow-[0_0_0_1px_rgb(38_139_210/0.22),0_24px_48px_-20px_rgb(0_43_54/0.55)]">
        <div className="flex flex-col overflow-hidden rounded-[1.15rem] bg-surface">
          <div className="flex items-center gap-2 border-b border-border px-3 py-2">
            <TrafficLights />
            <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-background/80 px-2 py-1">
              <Globe className="size-2.5 shrink-0 text-muted-foreground" strokeWidth={2} />
              <span className="truncate text-[9px] text-muted-foreground">
                silverstone.trackhero.app
              </span>
            </div>
          </div>
          <motion.div className="relative px-3.5 py-3.5" variants={screen}>
            <motion.div className="h-1.5 w-14 rounded-full bg-signal" variants={fade} />
            <motion.p
              className="mt-2 font-display text-[1.15rem] leading-none text-foreground"
              variants={fade}
            >
              Silverstone
            </motion.p>
            <motion.p className="mt-1 text-[10px] text-muted-foreground" variants={fade}>
              GP circuit · 5.891 km
            </motion.p>
            <motion.div
              className="mt-3 rounded-xl bg-background px-2.5 py-2"
              variants={pop}
            >
              <p className="text-[9px] text-muted-foreground">Next slot</p>
              <p className="font-display text-lg leading-none tabular-nums text-foreground">
                1:30
              </p>
              <p className="mt-0.5 text-[10px] text-signal">Drive experience</p>
            </motion.div>
            {!reduced && (
              <motion.span
                className="absolute -left-2 top-1/2 size-2 rounded-full bg-signal shadow-[0_0_10px_rgb(38_139_210/0.75)]"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              />
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function PlatformBrowser() {
  return (
    <motion.div
      className="relative z-20 w-full max-w-[min(100%,22rem)] origin-center md:max-w-[24rem]"
      style={{ transformStyle: "preserve-3d" }}
      variants={browserIn}
    >
      <div className="rounded-[1.35rem] bg-background p-[8px] shadow-[0_0_0_1px_rgb(42_161_152/0.2),0_32px_64px_-26px_rgb(7_54_66/0.5)]">
        <div className="pointer-events-none absolute inset-0 rounded-[1.35rem] ring-1 ring-inset ring-foreground/10" />
        <div className="overflow-hidden rounded-[1rem] bg-surface">
          <motion.div
            className="flex items-center gap-2 border-b border-border px-3 py-2.5"
            variants={fade}
          >
            <TrafficLights />
            <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-lg bg-background/70 px-2.5 py-1.5">
              <Globe className="size-3 shrink-0 text-muted-foreground" strokeWidth={2} />
              <span className="truncate text-[10px] text-muted-foreground">
                monaco.trackhero.app/book
              </span>
            </div>
          </motion.div>

          <motion.div
            className="flex gap-0.5 overflow-x-auto border-b border-border bg-background/50 px-2 py-1.5"
            variants={pass}
          >
            {venues.map((venue) => (
              <motion.span
                key={venue.slug}
                className={`shrink-0 rounded-md px-2 py-1 text-[9px] font-medium ${
                  venue.active
                    ? `${toneBg(venue.tone)} ring-1 ring-inset ring-current/25`
                    : "text-muted-foreground"
                }`}
                variants={slide}
              >
                {venue.name}
              </motion.span>
            ))}
          </motion.div>

          <motion.div className="px-4 py-4" variants={screen}>
            <motion.div className="flex items-start justify-between gap-3" variants={fade}>
              <div>
                <p className="text-[11px] text-muted-foreground">Track Hero · shared platform</p>
                <p className="font-display text-[1.75rem] leading-none text-foreground">
                  Monaco GP
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[10px] text-accent">
                <Calendar className="size-3" strokeWidth={2} />
                May 24
              </span>
            </motion.div>

            <motion.p className="mt-2 text-[11px] leading-5 text-muted-foreground" variants={fade}>
              Same Next.js booking flow. Five venues, one deploy pipeline.
            </motion.p>

            <motion.ul className="mt-4 space-y-2" variants={pass}>
              {slots.map((slot) => (
                <motion.li
                  key={slot.time}
                  className={`flex items-center justify-between rounded-xl border px-3 py-2.5 ${
                    slot.open
                      ? "border-border bg-background"
                      : "border-border/50 bg-background/40 opacity-60"
                  }`}
                  variants={pop}
                >
                  <div>
                    <p className="font-display text-lg leading-none tabular-nums text-foreground">
                      {slot.time}
                    </p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">{slot.label}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm tabular-nums text-accent">{slot.price}</p>
                    {slot.open && (
                      <span className="flex size-6 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                        <ChevronRight className="size-3.5" strokeWidth={2.5} />
                      </span>
                    )}
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              className="mt-4 flex items-center gap-2 rounded-xl border border-dashed border-accent/35 bg-accent/8 px-3 py-2"
              variants={fade}
            >
              <span className="flex size-7 items-center justify-center rounded-lg bg-accent text-[10px] font-medium text-accent-foreground">
                5
              </span>
              <p className="text-[11px] leading-4 text-muted-foreground">
                Five venues on one React codebase. White-label skins, shared checkout.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function VenueStackVisual({ reduced }: { reduced: boolean }) {
  return (
    <div
      className="relative mx-auto w-full max-w-[22rem] md:max-w-[28rem]"
      style={{ perspective: 1400 }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[52%] h-72 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/20 blur-3xl"
      />

      <div className="dark relative" data-theme="dark">
        <motion.div
          className="relative flex min-h-[32rem] items-center justify-center md:min-h-[34rem]"
          variants={stage}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <VenuePanel reduced={reduced} />
          <PlatformBrowser />
        </motion.div>
      </div>
    </div>
  );
}

export function WebSectionMock1() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="web"
      aria-labelledby="web-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <VenueStackVisual reduced={reduced} />
        </div>
        <div className="lg:order-2">
          <h2
            id="web-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            Five venue sites, one React platform
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            I ship Next.js and React product interfaces. Track Hero runs white-label
            booking for five race circuits. Each site looks like its own brand. One
            shared platform runs all of them.
          </p>
        </div>
      </div>
    </section>
  );
}
