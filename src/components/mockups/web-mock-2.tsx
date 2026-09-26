"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Calendar, ChevronRight, Lock } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "motion/react";

import { VenueTrackMap, venueTracks } from "@/components/sections/venue-track-map";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

/** Time each venue stays visible before advancing to the next. */
export const venueCycleMs = 5000;

/** How long auto-cycle pauses after the user picks a venue. */
export const venueManualPauseMs = 10_000;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const frameIn: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.94, rotateX: 6 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { duration: 0.85, ease: settle },
  },
};

const ghostIn: Variants = {
  hidden: { opacity: 0, x: 0, y: 0, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 0.45 - i * 0.12,
    x: i === 0 ? -28 : 32,
    y: i === 0 ? 18 : 22,
    scale: 0.94 - i * 0.03,
    rotate: i === 0 ? -4 : 5,
    transition: { duration: 0.9, ease: settle, delay: 0.12 + i * 0.08 },
  }),
};

const screen: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.32, staggerChildren: 0.06 },
  },
};

const pass: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
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
    transition: { type: "spring", stiffness: 400, damping: 18 },
  },
};

type Venue = {
  id: string;
  name: string;
  slug: string;
  mark: string;
  shell: string;
  ink: string;
  wash: string;
  slots: { time: string; label: string; price: string }[];
};

const venues: Venue[] = [
  {
    id: "ridgeline",
    name: "Ridgeline",
    slug: "ridgeline",
    mark: "RL",
    shell: "bg-accent text-accent-foreground",
    ink: "text-accent-ink",
    wash: "bg-accent/12",
    slots: [
      { time: "9:00", label: "North loop", price: "$220" },
      { time: "1:30", label: "Full course", price: "$420" },
      { time: "4:00", label: "Club hire", price: "$1,800" },
    ],
  },
  {
    id: "coastal",
    name: "Coastal",
    slug: "coastal",
    mark: "CO",
    shell: "bg-signal text-foreground",
    ink: "text-signal",
    wash: "bg-signal/15",
    slots: [
      { time: "8:30", label: "Open track", price: "$195" },
      { time: "12:00", label: "Sweeper laps", price: "$360" },
      { time: "3:30", label: "Sunset session", price: "$275" },
    ],
  },
  {
    id: "harbor",
    name: "Harbor",
    slug: "harbor",
    mark: "HM",
    shell: "bg-success text-accent-foreground",
    ink: "text-success",
    wash: "bg-success/14",
    slots: [
      { time: "10:00", label: "Club sprint", price: "$180" },
      { time: "2:00", label: "Turn 3 run", price: "$390" },
      { time: "5:15", label: "Twilight hire", price: "$210" },
    ],
  },
  {
    id: "summit",
    name: "Summit",
    slug: "summit",
    mark: "SU",
    shell: "bg-accent-strong text-accent-foreground",
    ink: "text-accent-strong",
    wash: "bg-accent-strong/14",
    slots: [
      { time: "9:30", label: "School session", price: "$240" },
      { time: "1:00", label: "Intro to racing", price: "$520" },
      { time: "4:45", label: "Long Bend laps", price: "$95" },
    ],
  },
  {
    id: "desert",
    name: "High Desert",
    slug: "desert",
    mark: "HD",
    shell: "bg-accent-secondary text-foreground",
    ink: "text-accent-secondary",
    wash: "bg-accent-secondary/14",
    slots: [
      { time: "8:00", label: "Full course", price: "$265" },
      { time: "11:30", label: "Basin session", price: "$445" },
      { time: "3:00", label: "North loop hire", price: "$1,650" },
    ],
  },
];

function BrowserChrome({
  venue,
  children,
  embedded = false,
}: {
  venue: Venue;
  children: ReactNode;
  embedded?: boolean;
}) {
  return (
    <div
      className={
        embedded
          ? "relative overflow-hidden rounded-xl bg-background ring-1 ring-inset ring-border/70"
          : "relative overflow-visible rounded-xl border border-border bg-background shadow-[0_0_0_1px_rgb(42_161_152/0.18),0_28px_56px_-26px_rgb(7_54_66/0.48)]"
      }
    >
      {!embedded ? (
        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-foreground/6" />
      ) : null}
      <div
        className={`flex items-center gap-2 border-b border-border/80 bg-surface px-3 py-2.5 ${
          embedded ? "rounded-t-xl" : ""
        }`}
      >
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-error/80" />
          <span className="size-2.5 rounded-full bg-success/70" />
          <span className="size-2.5 rounded-full bg-accent/60" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-background px-2.5 py-1 text-[10px] text-muted-foreground">
          <Lock className="size-2.5 shrink-0" strokeWidth={2.2} />
          <span className="truncate">
            book.example.com/
            <AnimatePresence mode="wait">
              <motion.span
                key={venue.slug}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.22 }}
                className="text-foreground"
              >
                {venue.slug}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>
      </div>
      {children}
    </div>
  );
}

export function VenueBrowserVisual({
  reduced: reducedProp,
  embedded = false,
  play = false,
  activeIndex: activeIndexProp,
  onActiveChange,
  cyclePaused = false,
  onVenuePick,
}: {
  reduced?: boolean;
  embedded?: boolean;
  /** When embedded, parent drives reveal (e.g. synced to gantry green). */
  play?: boolean;
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
  cyclePaused?: boolean;
  onVenuePick?: (index: number) => void;
} = {}) {
  const reducedHook = usePrefersReducedMotion();
  const reduced = reducedProp ?? reducedHook;
  const [internalActive, setInternalActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const pauseResumeRef = useRef<number | null>(null);
  const active = activeIndexProp ?? internalActive;
  const venue = venues[active] ?? venues[0];
  const trackMeta = venueTracks[venue.id]?.meta;

  const setActive = useCallback((index: number) => {
    if (activeIndexProp === undefined) setInternalActive(index);
    onActiveChange?.(index);
  }, [activeIndexProp, onActiveChange]);

  const pauseForManualPick = () => {
    setPaused(true);
    if (pauseResumeRef.current) window.clearTimeout(pauseResumeRef.current);
    pauseResumeRef.current = window.setTimeout(() => {
      setPaused(false);
      pauseResumeRef.current = null;
    }, venueManualPauseMs);
  };

  useEffect(
    () => () => {
      if (pauseResumeRef.current) window.clearTimeout(pauseResumeRef.current);
    },
    [],
  );

  const motionProps = embedded
    ? {
        initial: "hidden" as const,
        animate: reduced || play ? ("visible" as const) : ("hidden" as const),
      }
    : {
        initial: reduced ? false : ("hidden" as const),
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-10% 0px" },
      };

  const cycleHeld = paused || cyclePaused;

  useEffect(() => {
    if (reduced || cycleHeld) return;
    if (embedded && !play) return;

    const id = window.setInterval(() => {
      setActive((active + 1) % venues.length);
    }, venueCycleMs);
    return () => window.clearInterval(id);
  }, [reduced, cycleHeld, embedded, play, active, setActive]);

  return (
    <div
      className={`relative mx-auto w-full ${
        embedded ? "pb-2 pt-0.5" : "max-w-[26rem]"
      }`}
      style={{ perspective: 1200 }}
    >
      {!embedded ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[55%] h-64 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-3xl"
        />
      ) : null}

      <motion.div className="relative" variants={stage} {...motionProps}>
        {!embedded
          ? [0, 1].map((i) => (
              <motion.div
                key={i}
                className="pointer-events-none absolute inset-x-4 top-6 z-0 origin-bottom"
                custom={i}
                variants={ghostIn}
              >
                <div className="overflow-hidden rounded-xl border border-border/50 bg-surface/70 shadow-[0_16px_40px_-24px_rgb(7_54_66/0.35)]">
                  <div className="flex gap-1.5 border-b border-border/40 px-3 py-2">
                    <span className="size-2 rounded-full bg-muted-foreground/25" />
                    <span className="size-2 rounded-full bg-muted-foreground/20" />
                    <span className="size-2 rounded-full bg-muted-foreground/15" />
                  </div>
                  <div className="h-[21rem] bg-linear-to-br from-accent/5 to-signal/5" />
                </div>
              </motion.div>
            ))
          : null}

        <motion.div
          className="relative z-10 origin-bottom"
          style={embedded ? undefined : { transformStyle: "preserve-3d" }}
          variants={embedded ? fade : frameIn}
        >
          <BrowserChrome venue={venue} embedded={embedded}>
            <motion.div
              className={`overflow-hidden bg-surface ${embedded ? "p-3 sm:p-3.5" : "rounded-b-xl p-3 sm:p-3.5"}`}
              variants={screen}
            >
              {!embedded ? (
                <motion.div className="flex gap-1 pb-1" variants={pass}>
                  {venues.map((v, index) => (
                    <motion.button
                      key={v.id}
                      type="button"
                      variants={pop}
                      onClick={() => {
                        if (onVenuePick) {
                          onVenuePick(index);
                        } else {
                          setActive(index);
                          pauseForManualPick();
                        }
                      }}
                      className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium transition-colors ${
                        index === active
                          ? `${v.shell} shadow-sm`
                          : "bg-background text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {v.name}
                    </motion.button>
                  ))}
                </motion.div>
              ) : null}

              <motion.div
                className={`relative rounded-2xl bg-background ${embedded ? "overflow-visible" : "mt-3 overflow-hidden"}`}
                variants={pop}
              >
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute -right-8 top-6 size-32 rounded-full blur-2xl transition-colors duration-500 ${venue.wash}`}
                />
                <VenueTrackMap trackId={venue.id} reduced={reduced} />
                <div className="relative px-3.5 pb-3.5 pt-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={`${venue.id}-name`}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.25 }}
                          className="font-display text-[1.65rem] leading-none text-foreground"
                        >
                          {venue.name}
                        </motion.p>
                      </AnimatePresence>
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        Weekend bookings open
                        {trackMeta ? ` · ${trackMeta}` : null}
                      </p>
                    </div>
                    <motion.span
                      key={venue.id}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 420, damping: 20 }}
                      className={`flex size-10 items-center justify-center rounded-xl text-xs font-semibold ${venue.shell}`}
                    >
                      {venue.mark}
                    </motion.span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={venue.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.28, ease: settle }}
                      className="relative mt-4 grid gap-1.5"
                    >
                      {venue.slots.map((slot, slotIndex) => (
                        <motion.div
                          key={`${venue.id}-${slot.time}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.32,
                            ease: settle,
                            delay: slotIndex * 0.06,
                          }}
                          className="flex items-center justify-between rounded-xl border border-border bg-surface px-3 py-2"
                        >
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`flex size-7 items-center justify-center rounded-lg ${venue.wash}`}
                            >
                              <Calendar className={`size-3.5 ${venue.ink}`} strokeWidth={2} />
                            </span>
                            <div>
                              <p className="text-[12px] font-medium text-foreground">
                                {slot.label}
                              </p>
                              <p className="text-[10px] tabular-nums text-muted-foreground">
                                {slot.time}
                              </p>
                            </div>
                          </div>
                          <p className={`text-[12px] font-medium tabular-nums ${venue.ink}`}>
                            {slot.price}
                          </p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>

                  <motion.div
                    className={`mt-3 flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-[12px] font-medium transition-colors duration-500 ${venue.shell}`}
                    variants={fade}
                  >
                    Pick a session
                    <ChevronRight className="size-3.5" strokeWidth={2.5} />
                  </motion.div>
                </div>
              </motion.div>

              {!embedded ? (
                <motion.p className="mt-2.5 text-center text-[10px] text-muted-foreground" variants={fade}>
                  Same React shell. Five venue skins.
                </motion.p>
              ) : null}
            </motion.div>
          </BrowserChrome>
        </motion.div>
      </motion.div>
    </div>
  );
}
