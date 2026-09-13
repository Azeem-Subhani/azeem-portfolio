"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.04 },
  },
};

const spineIn: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.62, ease: settle },
  },
};

const panelIn: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.68, ease: settle, delay: 0.1 },
  },
};

const pass: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.28 } },
};

const fade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: settle },
  },
};

type Venue = {
  id: string;
  name: string;
  short: string;
  domain: string;
  tint: string;
  wash: string;
  ink: string;
  slots: { time: string; label: string; price: string }[];
};

const venues: Venue[] = [
  {
    id: "laguna",
    name: "Laguna Seca",
    short: "Laguna",
    domain: "laguna.trackhero.app",
    tint: "var(--accent)",
    wash: "color-mix(in srgb, var(--accent) 14%, var(--surface))",
    ink: "text-accent",
    slots: [
      { time: "8:30", label: "Track day", price: "$220" },
      { time: "12:00", label: "HPDE", price: "$340" },
      { time: "3:15", label: "Private hire", price: "$1,800" },
    ],
  },
  {
    id: "road-atl",
    name: "Road Atlanta",
    short: "Road Atl",
    domain: "roadatl.trackhero.app",
    tint: "var(--signal)",
    wash: "color-mix(in srgb, var(--signal) 14%, var(--surface))",
    ink: "text-signal",
    slots: [
      { time: "9:00", label: "Club sprint", price: "$195" },
      { time: "1:00", label: "Time attack", price: "$410" },
      { time: "4:30", label: "Night session", price: "$520" },
    ],
  },
  {
    id: "watkins",
    name: "Watkins Glen",
    short: "The Glen",
    domain: "watkins.trackhero.app",
    tint: "var(--success)",
    wash: "color-mix(in srgb, var(--success) 14%, var(--surface))",
    ink: "text-success",
    slots: [
      { time: "7:45", label: "Open track", price: "$210" },
      { time: "11:30", label: "Instructor lap", price: "$380" },
      { time: "2:45", label: "Corporate", price: "$2,400" },
    ],
  },
  {
    id: "cota",
    name: "Circuit of the Americas",
    short: "COTA",
    domain: "cota.trackhero.app",
    tint: "var(--accent-secondary)",
    wash: "color-mix(in srgb, var(--accent-secondary) 14%, var(--surface))",
    ink: "text-accent-secondary",
    slots: [
      { time: "10:00", label: "F1 layout", price: "$295" },
      { time: "2:00", label: "GT rental", price: "$640" },
      { time: "5:00", label: "Sunset run", price: "$275" },
    ],
  },
  {
    id: "sonoma",
    name: "Sonoma Raceway",
    short: "Sonoma",
    domain: "sonoma.trackhero.app",
    tint: "var(--accent-strong)",
    wash: "color-mix(in srgb, var(--accent-strong) 14%, var(--surface))",
    ink: "text-accent-strong",
    slots: [
      { time: "8:00", label: "Morning heat", price: "$185" },
      { time: "12:30", label: "Drift school", price: "$360" },
      { time: "4:00", label: "Member only", price: "$240" },
    ],
  },
];

function SharedRail() {
  return (
    <div
      className="absolute bottom-6 left-0 top-6 hidden w-px bg-border sm:block"
      aria-hidden="true"
    >
      <span className="absolute left-1/2 top-[18%] size-1.5 -translate-x-1/2 rounded-full bg-accent" />
      <span className="absolute left-1/2 top-[52%] size-1.5 -translate-x-1/2 rounded-full bg-muted-foreground/50" />
      <span className="absolute left-1/2 top-[84%] size-1.5 -translate-x-1/2 rounded-full bg-muted-foreground/50" />
    </div>
  );
}

function VenueSpine({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <motion.nav
      className="relative hidden shrink-0 flex-col justify-center gap-1 border-r border-border py-6 pl-1 pr-5 sm:flex sm:w-[9.5rem] md:w-[11rem]"
      aria-label="Venue brands"
      variants={spineIn}
    >
      <SharedRail />
      <ul className="relative space-y-0.5">
        {venues.map((venue, index) => {
          const active = index === activeIndex;
          return (
            <li key={venue.id}>
              <button
                type="button"
                onClick={() => onSelect(index)}
                aria-pressed={active}
                className={`group relative w-full py-1.5 text-left transition-[opacity,color] duration-300 ${
                  active ? "opacity-100" : "opacity-35 hover:opacity-65"
                }`}
              >
                <span
                  className="absolute -left-1 top-1/2 h-[calc(100%-4px)] w-0.5 -translate-y-1/2 rounded-full transition-all duration-300"
                  style={{
                    background: active ? venue.tint : "transparent",
                    opacity: active ? 1 : 0,
                  }}
                  aria-hidden="true"
                />
                <span
                  className={`block font-display leading-[0.95] transition-[font-size] duration-300 ${
                    active
                      ? "text-[clamp(1.35rem,2.4vw,1.75rem)] text-foreground"
                      : "text-[1.05rem] text-muted-foreground"
                  }`}
                >
                  {active ? venue.name : venue.short}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="relative mt-5 text-[10px] leading-4 text-muted-foreground">
        Pick a brand. The shell stays put.
      </p>
    </motion.nav>
  );
}

function VenueSpineMobile({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div
      className="flex gap-1 overflow-x-auto border-b border-border px-3 py-2.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:hidden [&::-webkit-scrollbar]:hidden"
      role="tablist"
      aria-label="Venue brands"
    >
      {venues.map((venue, index) => {
        const active = index === activeIndex;
        return (
          <button
            key={venue.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onSelect(index)}
            className={`shrink-0 rounded-lg px-3 py-1.5 text-left transition-colors ${
              active
                ? "bg-background text-foreground shadow-[inset_0_0_0_1px_var(--border)]"
                : "text-muted-foreground"
            }`}
          >
            <span
              className="mb-1 block size-1.5 rounded-full"
              style={{ background: venue.tint }}
              aria-hidden="true"
            />
            <span className="block font-display text-sm leading-tight">{venue.short}</span>
          </button>
        );
      })}
    </div>
  );
}

function BookingSkeleton({ venue, reduced }: { venue: Venue; reduced: boolean }) {
  return (
    <motion.div className="flex min-h-0 flex-1 flex-col" variants={panelIn}>
      <div
        className="border-b border-border px-4 py-4 transition-[background] duration-500 sm:px-5 sm:py-5"
        style={{ background: venue.wash }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={venue.id}
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.28, ease: settle }}
          >
            <p className="truncate text-[11px] text-muted-foreground">{venue.domain}</p>
            <p className="mt-1 font-display text-[clamp(1.5rem,4vw,2rem)] leading-[1.02] text-foreground">
              {venue.name}
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">Saturday, 14 June</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative flex-1 px-3 py-4 sm:px-4">
        <div
          className="pointer-events-none absolute left-0 top-4 bottom-4 hidden w-px bg-border sm:block"
          aria-hidden="true"
        />

        <motion.ul className="grid gap-2" variants={pass}>
          {venue.slots.map((slot) => (
            <motion.li
              key={`${venue.id}-${slot.time}`}
              variants={fade}
              className="flex items-center justify-between rounded-xl border border-border bg-background px-3 py-2.5 sm:px-3.5 sm:py-3"
            >
              <div>
                <p className="font-display text-lg tabular-nums leading-none text-foreground">
                  {slot.time}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">{slot.label}</p>
              </div>
              <p className={`text-sm font-medium tabular-nums ${venue.ink}`}>{slot.price}</p>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          className="mt-4 rounded-xl border border-dashed border-border bg-surface px-3 py-2.5"
          variants={fade}
        >
          <p className="text-[11px] leading-5 text-muted-foreground">
            Waivers, inventory, and Stripe checkout run through the shared Next.js layer.
            Only the header strip and accent tokens change per venue.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ThemeSpineVisual({ reduced }: { reduced: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const venue = venues[activeIndex] ?? venues[0];

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % venues.length);
    }, 4800);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <motion.div
      className="relative mx-auto w-full max-w-lg"
      variants={stage}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      <div className="overflow-hidden rounded-[1.25rem] bg-surface shadow-[0_0_0_1px_rgb(var(--shadow-color)/0.1),0_28px_56px_-32px_rgb(var(--shadow-color)/0.38)]">
        <VenueSpineMobile activeIndex={activeIndex} onSelect={setActiveIndex} />

        <div className="flex min-h-[24rem] sm:min-h-[26rem]">
          <VenueSpine activeIndex={activeIndex} onSelect={setActiveIndex} />
          <BookingSkeleton venue={venue} reduced={reduced} />
        </div>
      </div>

      <motion.p
        className="mt-4 text-center text-[11px] text-muted-foreground sm:text-left"
        variants={fade}
      >
        Five venue domains, one React booking shell
      </motion.p>
    </motion.div>
  );
}

export function WebR2Mock3() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="web-r2-mock-3"
      aria-labelledby="web-r2-mock-3-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <ThemeSpineVisual reduced={reduced} />
        </div>

        <div className="lg:order-2">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.55, ease: settle }}
          >
            <h2
              id="web-r2-mock-3-title"
              className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
            >
              One booking flow, five track brands
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
              I build Next.js and React product interfaces. Track Hero ships
              white-label booking for five race circuits on one shared platform.
              Each venue keeps its own domain, palette, and copy.
            </p>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              Calendars, waivers, and Stripe stay in sync. Add a sixth track by
              shipping a theme config, not a new codebase.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
