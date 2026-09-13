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

const fade: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: settle },
  },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: settle },
  },
};

const pass: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const pop: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 380, damping: 22 },
  },
};

type Venue = {
  id: string;
  name: string;
  short: string;
  tint: string;
  header: string;
  slots: { time: string; label: string; state: "open" | "low" | "full" }[];
};

const venues: Venue[] = [
  {
    id: "laguna",
    name: "Laguna Seca",
    short: "LS",
    tint: "var(--accent)",
    header: "Laguna Seca Raceway",
    slots: [
      { time: "8:30", label: "Track day", state: "open" },
      { time: "12:00", label: "HPDE", state: "low" },
      { time: "3:15", label: "Private hire", state: "full" },
    ],
  },
  {
    id: "road-atl",
    name: "Road Atlanta",
    short: "RA",
    tint: "var(--signal)",
    header: "Road Atlanta Motorsports",
    slots: [
      { time: "9:00", label: "Club sprint", state: "open" },
      { time: "1:00", label: "Time attack", state: "open" },
      { time: "4:30", label: "Night session", state: "low" },
    ],
  },
  {
    id: "watkins",
    name: "Watkins Glen",
    short: "WG",
    tint: "var(--success)",
    header: "The Glen Experience",
    slots: [
      { time: "7:45", label: "Open track", state: "low" },
      { time: "11:30", label: "Instructor lap", state: "open" },
      { time: "2:45", label: "Corporate", state: "full" },
    ],
  },
  {
    id: "cota",
    name: "Circuit of the Americas",
    short: "COTA",
    tint: "var(--accent-secondary)",
    header: "COTA Driving Club",
    slots: [
      { time: "10:00", label: "F1 layout", state: "open" },
      { time: "2:00", label: "GT rental", state: "low" },
      { time: "5:00", label: "Sunset run", state: "open" },
    ],
  },
  {
    id: "sonoma",
    name: "Sonoma Raceway",
    short: "SR",
    tint: "var(--accent-strong)",
    header: "Sonoma Track Days",
    slots: [
      { time: "8:00", label: "Morning heat", state: "full" },
      { time: "12:30", label: "Drift school", state: "open" },
      { time: "4:00", label: "Member only", state: "low" },
    ],
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

function slotStateLabel(state: Venue["slots"][number]["state"]) {
  if (state === "open") return "Open";
  if (state === "low") return "2 left";
  return "Full";
}

function slotStateClass(state: Venue["slots"][number]["state"]) {
  if (state === "open") return "text-accent";
  if (state === "low") return "text-signal";
  return "text-muted-foreground";
}

function BookingSurface({
  venue,
  reduced,
}: {
  venue: Venue;
  reduced: boolean;
}) {
  return (
    <motion.div
      key={venue.id}
      className="flex min-h-0 flex-1 flex-col"
      initial={reduced ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: settle }}
    >
      <div
        className="px-4 py-3"
        style={{
          background: `linear-gradient(135deg, color-mix(in srgb, ${venue.tint} 18%, var(--surface)) 0%, var(--surface) 72%)`,
        }}
      >
        <p className="font-display text-[1.35rem] leading-tight text-foreground">
          {venue.header}
        </p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          Saturday, 14 June
        </p>
      </div>

      <div className="flex-1 px-3 py-3">
        <ul className="grid gap-2">
          {venue.slots.map((slot) => (
            <li
              key={slot.time}
              className="flex items-center justify-between rounded-xl border border-border bg-background px-3 py-2.5"
            >
              <div>
                <p className="font-display text-lg tabular-nums leading-none">
                  {slot.time}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {slot.label}
                </p>
              </div>
              <span
                className={`text-[11px] font-medium tabular-nums ${slotStateClass(slot.state)}`}
              >
                {slotStateLabel(slot.state)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-border px-4 py-3">
        <p className="text-[11px] text-muted-foreground">
          Checkout, waivers, and Stripe run through the shared platform layer.
        </p>
      </div>
    </motion.div>
  );
}

function BrowserMock({ reduced }: { reduced: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const venue = venues[activeIndex] ?? venues[0];

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % venues.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <motion.div
      className="relative mx-auto w-full max-w-md"
      variants={stage}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      <motion.div
        className="overflow-hidden rounded-[1.35rem] bg-background shadow-[0_0_0_1px_rgb(var(--shadow-color)/0.12),0_32px_64px_-28px_rgb(var(--shadow-color)/0.35)]"
        variants={rise}
      >
        <CraftBar time="9:41" />

        <div className="flex items-center gap-2 border-y border-border bg-surface px-3 py-2">
          <span className="flex gap-1" aria-hidden="true">
            <span className="size-2 rounded-full bg-error/80" />
            <span className="size-2 rounded-full bg-signal/70" />
            <span className="size-2 rounded-full bg-success/80" />
          </span>
          <p className="min-w-0 flex-1 truncate rounded-md bg-background px-2.5 py-1 text-[10px] text-muted-foreground">
            book.{venue.id}.trackhero.app
          </p>
        </div>

        <div className="border-b border-border bg-surface px-2 py-2">
          <div className="flex gap-1 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {venues.map((item, index) => {
              const active = index === activeIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`shrink-0 rounded-lg px-2.5 py-1.5 text-left transition-colors ${
                    active
                      ? "bg-background text-foreground shadow-[inset_0_0_0_1px_var(--border)]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-pressed={active}
                >
                  <span
                    className="mb-1 block size-1.5 rounded-full"
                    style={{ background: item.tint }}
                    aria-hidden="true"
                  />
                  <span className="block text-[10px] font-medium leading-tight">
                    {item.short}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex h-[22.5rem] flex-col bg-surface">
          <BookingSurface venue={venue} reduced={reduced} />
        </div>
      </motion.div>

      <motion.ul
        className="mt-5 grid grid-cols-5 gap-1.5"
        variants={pass}
        aria-hidden="true"
      >
        {venues.map((item, index) => (
          <motion.li
            key={item.id}
            variants={pop}
            className={`overflow-hidden rounded-lg border transition-opacity ${
              index === activeIndex ? "border-border opacity-100" : "border-transparent opacity-45"
            }`}
          >
            <div
              className="h-1.5 w-full"
              style={{ background: item.tint }}
            />
            <div className="bg-background px-1.5 py-2">
              <p className="truncate text-[8px] font-medium text-foreground">
                {item.name.split(" ")[0]}
              </p>
              <p className="mt-1 font-display text-[10px] tabular-nums text-muted-foreground">
                {item.slots[0]?.time}
              </p>
            </div>
          </motion.li>
        ))}
      </motion.ul>

      <motion.p className="mt-3 text-center text-[11px] text-muted-foreground" variants={fade}>
        Five venue brands, one Next.js deployment
      </motion.p>
    </motion.div>
  );
}

export function WebSectionMock3() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="web-mock-3"
      aria-labelledby="web-mock-3-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <BrowserMock reduced={reduced} />
        </div>

        <div className="lg:order-2">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.55, ease: settle }}
          >
            <h2
              id="web-mock-3-title"
              className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
            >
              Five venues, one booking engine
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
              Track Hero runs white-label checkout for five race circuits. I built
              the Next.js and React layer that keeps calendars, waivers, and
              Stripe in sync while each venue keeps its own URL, palette, and
              copy.
            </p>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              New track? Ship a branded site from the same codebase. No fork, no
              second deploy pipeline.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
