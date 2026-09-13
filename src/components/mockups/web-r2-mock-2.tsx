"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const shellIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.68, ease: settle },
  },
};

const gridIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.55, ease: settle, delay: 0.12 },
  },
};

type Venue = {
  id: string;
  short: string;
  name: string;
  tint: string;
  prices: [string, string, string];
};

const times = ["8:30", "12:00", "3:15"] as const;
const labels = ["Track day", "HPDE", "Private"] as const;

const venues: Venue[] = [
  {
    id: "laguna",
    short: "LS",
    name: "Laguna Seca",
    tint: "var(--accent)",
    prices: ["$195", "$340", "$1,650"],
  },
  {
    id: "road-atl",
    short: "RA",
    name: "Road Atlanta",
    tint: "var(--signal)",
    prices: ["$210", "$385", "$295"],
  },
  {
    id: "watkins",
    short: "WG",
    name: "Watkins Glen",
    tint: "var(--success)",
    prices: ["$185", "$360", "$2,100"],
  },
  {
    id: "cota",
    short: "COTA",
    name: "Circuit of the Americas",
    tint: "var(--accent-secondary)",
    prices: ["$240", "$520", "$275"],
  },
  {
    id: "sonoma",
    short: "SR",
    name: "Sonoma Raceway",
    tint: "var(--accent-strong)",
    prices: ["$190", "$410", "$165"],
  },
];

function CraftBar({ time }: { time: string }) {
  return (
    <div className="flex items-end justify-between px-4 pb-1 pt-2.5 text-[10px] font-medium text-muted-foreground">
      <span className="tabular-nums">{time}</span>
      <span className="flex items-center gap-1.5">
        <svg viewBox="0 0 16 12" className="h-2.5 w-3.5 fill-current" aria-hidden="true">
          <rect x="0" y="6" width="2.2" height="6" rx="0.4" />
          <rect x="3.6" y="3.5" width="2.2" height="8.5" rx="0.4" />
          <rect x="7.2" y="1" width="2.2" height="11" rx="0.4" />
          <rect x="10.8" y="0" width="2.2" height="12" rx="0.4" />
        </svg>
        <svg viewBox="0 0 24 12" className="h-2.5 w-5 fill-current" aria-hidden="true">
          <rect
            x="0"
            y="1"
            width="18"
            height="10"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <rect x="2" y="3" width="13" height="6" rx="1" />
          <rect x="19" y="4" width="2" height="4" rx="0.6" />
        </svg>
      </span>
    </div>
  );
}

function RosterGrid({
  activeIndex,
  onSelect,
  reduced,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
  reduced: boolean;
}) {
  const active = venues[activeIndex] ?? venues[0];

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <motion.div
        className="border-b border-border px-4 py-3.5"
        animate={
          reduced
            ? undefined
            : {
                background: `linear-gradient(165deg, color-mix(in srgb, ${active.tint} 20%, var(--surface)) 0%, var(--surface) 70%)`,
              }
        }
        style={{
          background: `linear-gradient(165deg, color-mix(in srgb, ${active.tint} 20%, var(--surface)) 0%, var(--surface) 70%)`,
        }}
        transition={{ duration: 0.5, ease: settle }}
      >
        <motion.p
          key={active.id}
          className="font-display text-[1.25rem] leading-tight text-foreground"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: settle }}
        >
          {active.name}
        </motion.p>
        <p className="mt-0.5 text-[10px] text-muted-foreground">
          Saturday inventory across five tracks
        </p>
      </motion.div>

      <motion.div className="flex-1 px-2 py-3" variants={gridIn}>
        <div
          className="grid grid-cols-[2.4rem_repeat(5,minmax(0,1fr))] gap-x-0.5 gap-y-1 text-[9px]"
          role="grid"
          aria-label="Venue slot roster"
        >
          <div className="col-start-1" aria-hidden="true" />
          {venues.map((venue, colIndex) => {
            const selected = colIndex === activeIndex;
            return (
              <button
                key={venue.id}
                type="button"
                role="columnheader"
                aria-selected={selected}
                onClick={() => onSelect(colIndex)}
                className="flex flex-col items-center gap-0.5 rounded-md px-0.5 py-1 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                style={{ opacity: selected ? 1 : 0.48 }}
              >
                <span
                  className="block h-0.5 w-full rounded-full"
                  style={{ background: venue.tint }}
                  aria-hidden="true"
                />
                <span
                  className={`font-medium leading-none ${selected ? "text-foreground" : "text-muted-foreground"}`}
                >
                  {venue.short}
                </span>
              </button>
            );
          })}

          {times.map((time, rowIndex) => [
            <div
              key={`time-${time}`}
              className="flex items-center pr-1 font-display text-[10px] tabular-nums leading-none text-muted-foreground"
              role="rowheader"
            >
              {time}
            </div>,
            ...venues.map((venue, colIndex) => {
              const selected = colIndex === activeIndex;
              return (
                <div
                  key={`${venue.id}-${time}`}
                  role="gridcell"
                  className={`rounded-md border px-0.5 py-1.5 text-center tabular-nums transition-[border-color,background-color,opacity] ${
                    selected
                      ? "border-border bg-background"
                      : "border-transparent bg-surface"
                  }`}
                  style={{
                    opacity: selected ? 1 : 0.55,
                    color: selected ? venue.tint : undefined,
                  }}
                >
                  {venue.prices[rowIndex]}
                </div>
              );
            }),
          ])}
        </div>

        <div className="mt-3 grid grid-cols-3 gap-1 px-1">
          {labels.map((label) => (
            <p
              key={label}
              className="truncate text-center text-[8px] text-muted-foreground"
            >
              {label}
            </p>
          ))}
        </div>
      </motion.div>

      <div className="border-t border-border px-4 py-2.5">
        <p className="text-[10px] leading-relaxed text-muted-foreground">
          One React grid component. Five theme columns from the same deploy.
        </p>
      </div>
    </div>
  );
}

function PhoneVisual({ reduced }: { reduced: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % venues.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[18rem] sm:max-w-[19rem]"
      variants={stage}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      <motion.div
        className="overflow-hidden rounded-[1.75rem] bg-background shadow-[0_0_0_1px_rgb(var(--shadow-color)/0.1),0_28px_56px_-24px_rgb(var(--shadow-color)/0.32)]"
        variants={shellIn}
      >
        <CraftBar time="9:41" />

        <div className="flex h-[25rem] flex-col bg-surface">
          <RosterGrid
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
            reduced={reduced}
          />
        </div>

        <div className="flex justify-center pb-2 pt-1" aria-hidden="true">
          <span className="h-1 w-24 rounded-full bg-border/80" />
        </div>
      </motion.div>

      <motion.p
        className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground"
        initial={reduced ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: settle, delay: 0.2 }}
      >
        Five venue calendars in one view. Pick a column to inspect that brand.
      </motion.p>
    </motion.div>
  );
}

export function WebR2Mock2() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="web-r2-mock-2"
      aria-labelledby="web-r2-mock-2-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <PhoneVisual reduced={reduced} />
        </div>

        <div className="lg:order-2">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.55, ease: settle }}
          >
            <h2
              id="web-r2-mock-2-title"
              className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
            >
              Web design and development
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
              Track Hero runs white-label booking for five race circuits on one
              Next.js platform. I built the React layer that keeps calendars,
              waivers, and Stripe in sync while each track keeps its own domain
              and palette.
            </p>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              Add a sixth venue by shipping a theme file, not a fork. One deploy
              pipeline, five public faces.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
