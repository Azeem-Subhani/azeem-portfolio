"use client";

import { useEffect, useRef, useState } from "react";
import { CreditCard } from "lucide-react";
import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

export const venues = [
  { id: "monticello", label: "Monticello", sub: "Motor Club" },
  { id: "sonoma", label: "Sonoma", sub: "Raceway" },
  { id: "enclave", label: "Motor Enclave", sub: "Tampa Bay" },
  { id: "skip", label: "Skip Barber", sub: "Racing School" },
  { id: "spring", label: "Spring Mountain", sub: "Motorsports" },
] as const;

const slots = [
  { time: "9:00", name: "Track day", price: "$220", open: true },
  { time: "1:30", name: "Drive experience", price: "$420", open: true },
  { time: "4:00", name: "Private hire", price: "$1,800", open: false },
];

export type LightState = "idle" | "red" | "green";

const trafficRed = "#ff1a1a";
const trafficGreen = "#00ff5c";

/**
 * The gantry signals a start: red holds long enough to read as a signal rather
 * than a blink, then the light turns green and the run begins. Flashing red
 * three times pushed green out past a second and read as an error state.
 */
export const gantryRedHoldMs = 650;
export const terminalLagMs = 180;
/** Green is the beat the body copy and terminal key off. */
export const gantryGreenAtMs = gantryRedHoldMs;
/** All five stay green this long before the venue highlight cycle takes over. */
export const gantryGreenHoldMs = 420;

export function runGantryStartSequence(
  setLightStates: (states: LightState[]) => void,
): ReturnType<typeof setTimeout>[] {
  const timers: ReturnType<typeof setTimeout>[] = [];

  timers.push(setTimeout(() => setLightStates(allLights("red")), 0));
  timers.push(
    setTimeout(() => setLightStates(allLights("green")), gantryGreenAtMs),
  );

  return timers;
}

const terminalIn: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: settle },
  },
};

function lightFill(state: LightState) {
  if (state === "red") return trafficRed;
  if (state === "green") return trafficGreen;
  return "color-mix(in srgb, var(--muted) 28%, transparent)";
}

function lightGlow(state: LightState) {
  if (state === "red") {
    return `0 0 16px ${trafficRed}, 0 0 28px color-mix(in srgb, ${trafficRed} 65%, transparent), inset 0 -2px 4px rgb(0 0 0 / 35%)`;
  }
  if (state === "green") {
    return `0 0 16px ${trafficGreen}, 0 0 28px color-mix(in srgb, ${trafficGreen} 65%, transparent), inset 0 -2px 4px rgb(0 0 0 / 35%)`;
  }
  return "inset 0 2px 6px rgb(0 0 0 / 45%)";
}

export function allLights(state: LightState) {
  return venues.map(() => state);
}

export function highlightLights(activeIndex: number): LightState[] {
  return venues.map((_, index) => (index === activeIndex ? "green" : "idle"));
}

export function GantryPosts() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative mx-[5%] h-3 sm:h-4"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-foreground/12" />
      <div className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-foreground/22 via-border/55 to-border" />
      <div className="absolute bottom-0 right-0 top-0 w-px bg-gradient-to-b from-foreground/22 via-border/55 to-border" />
    </div>
  );
}

export function GantryLights({
  states,
  activeIndex,
  onSelect,
  interactive = false,
}: {
  states: LightState[];
  /** `undefined` keeps the standalone Sonoma accent. `null` skips label highlight (flash). */
  activeIndex?: number | null;
  onSelect?: (index: number) => void;
  interactive?: boolean;
}) {
  return (
    <div className="relative w-full min-h-[5rem] pb-1 sm:min-h-[5.75rem] sm:pb-1.5">
      <svg
        viewBox="0 0 320 52"
        preserveAspectRatio="none"
        className="h-12 w-full"
        aria-hidden="true"
      >
        <path
          d="M 0 38 Q 160 4 320 38"
          fill="none"
          stroke="color-mix(in srgb, var(--muted) 35%, transparent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 0 38 L 320 38"
          fill="none"
          stroke="color-mix(in srgb, var(--foreground) 12%, transparent)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <ul className="absolute inset-x-0 top-3 flex justify-between">
        {venues.map((venue, index) => {
          const state = states[index] ?? "idle";
          const lit = state !== "idle";
          const labelHot =
            activeIndex === undefined
              ? venue.id === "sonoma"
              : activeIndex === index;

          const lightOrb = (
            <div
              className="relative flex size-7 items-center justify-center rounded-full sm:size-8"
              style={{
                background: "color-mix(in srgb, var(--background) 70%, var(--surface))",
                boxShadow: lit
                  ? `0 0 0 1px color-mix(in srgb, var(--foreground) 14%, transparent)`
                  : "0 0 0 1px color-mix(in srgb, var(--border) 80%, transparent)",
              }}
            >
              <span
                className="block size-4 rounded-full sm:size-[1.125rem]"
                style={{
                  background: lightFill(state),
                  boxShadow: lightGlow(state),
                }}
              />
            </div>
          );

          return (
            <li
              key={venue.id}
              className="flex w-[18%] flex-col items-center gap-1.5 sm:gap-2"
            >
              {interactive && onSelect ? (
                <button
                  type="button"
                  onClick={() => onSelect(index)}
                  className="rounded-full transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                  aria-label={`Select ${venue.label}`}
                  aria-pressed={labelHot}
                >
                  {lightOrb}
                </button>
              ) : (
                lightOrb
              )}
              <div
                className="w-full px-0.5 text-center leading-snug transition-opacity duration-300"
                style={{
                  opacity: activeIndex == null || labelHot ? 1 : 0.42,
                }}
              >
                <p
                  className={`truncate text-[8px] leading-snug sm:text-[9px] ${
                    labelHot ? "text-accent" : "text-foreground"
                  }`}
                >
                  {venue.label}
                </p>
                <p className="mt-0.5 hidden text-[7px] leading-snug text-muted-foreground sm:block">
                  {venue.sub}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function BookingTerminal({ visible }: { visible: boolean }) {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-[17.5rem] sm:max-w-[19rem]"
      variants={terminalIn}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-6 top-0 h-16 bg-gradient-to-b from-accent/10 to-transparent"
      />

      <svg
        viewBox="0 0 120 48"
        className="pointer-events-none absolute left-1/2 top-0 h-12 w-24 -translate-x-1/2 -translate-y-full text-accent/40"
        aria-hidden="true"
      >
        <line x1="60" y1="48" x2="60" y2="8" stroke="currentColor" strokeWidth="1.2" />
        <line x1="20" y1="8" x2="100" y2="8" stroke="currentColor" strokeWidth="1" />
        <circle cx="20" cy="8" r="2" fill="currentColor" />
        <circle cx="100" cy="8" r="2" fill="currentColor" />
      </svg>

      <div className="overflow-hidden rounded-[1.35rem] border border-border/75 bg-surface shadow-[0_0_0_1px_rgb(42_161_152/0.12),0_24px_48px_-22px_rgb(0_43_54/0.65)]">
        <div className="border-b border-border/70 px-3.5 py-3 sm:px-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-display text-[1.45rem] leading-none text-foreground sm:text-[1.65rem]">
                Sonoma
              </p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">Saturday, Apr 12</p>
            </div>
            <span className="shrink-0 rounded-md bg-success/15 px-1.5 py-0.5 text-[9px] text-success">
              open
            </span>
          </div>
        </div>

        <ul className="space-y-1.5 px-3 py-2.5 sm:px-3.5">
          {slots.map((slot) => (
            <li
              key={slot.time}
              className={`flex items-center justify-between rounded-xl border px-2.5 py-2 sm:px-3 ${
                slot.open
                  ? "border-accent/28 bg-background/65"
                  : "border-border/45 bg-background/30 opacity-50"
              }`}
            >
              <div>
                <p className="font-display text-base tabular-nums leading-none text-foreground sm:text-lg">
                  {slot.time}
                </p>
                <p className="mt-0.5 text-[9px] text-muted-foreground">{slot.name}</p>
              </div>
              <p className="text-xs tabular-nums text-accent sm:text-sm">{slot.price}</p>
            </li>
          ))}
        </ul>

        <div className="border-t border-border/75 bg-background px-3 pb-2.5 pt-2 sm:px-3.5">
          <div className="flex items-center gap-2">
            <div className="min-w-0 flex-1 rounded-xl bg-surface px-2.5 py-2">
              <p className="truncate text-[10px] font-medium text-foreground">
                1:30 drive experience
              </p>
              <p className="text-[9px] tabular-nums text-muted-foreground">$420 due now</p>
            </div>
            <button
              type="button"
              className="flex shrink-0 items-center gap-1 rounded-xl bg-accent px-3 py-2 text-[11px] font-medium text-accent-foreground"
            >
              <CreditCard className="size-3.5" strokeWidth={2} />
              Reserve
            </button>
          </div>
          <p className="mt-2 text-center text-[9px] leading-4 text-muted-foreground">
            Same checkout at all five venues on one Next.js platform
          </p>
          <div className="mx-auto mt-2 h-1 w-20 rounded-full bg-muted-foreground/25" />
        </div>
      </div>
    </motion.div>
  );
}

export function StartGantryVisual({ reduced }: { reduced: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [lightStates, setLightStates] = useState<LightState[]>(
    reduced ? venues.map(() => "green" as const) : venues.map(() => "idle" as const),
  );
  const [terminalVisible, setTerminalVisible] = useState(reduced);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setInView(true);
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || reduced) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const clearAll = () => timers.forEach(clearTimeout);

    timers.push(...runGantryStartSequence(setLightStates));

    timers.push(
      setTimeout(() => setTerminalVisible(true), gantryGreenAtMs + terminalLagMs),
    );

    return clearAll;
  }, [inView, reduced]);

  return (
    <div
      ref={rootRef}
      className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[38%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/16 blur-3xl"
      />

      <div className="dark relative pt-2" data-theme="dark">
        <div className="relative min-h-[26rem] sm:min-h-[28rem]">
          <GantryLights states={lightStates} />

          <div className="mt-10 sm:mt-12">
            <BookingTerminal visible={terminalVisible} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function WebR2Mock5() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="web-r2-mock-5"
      aria-labelledby="web-r2-mock-5-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <StartGantryVisual reduced={reduced} />
        </div>

        <div className="lg:order-2">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.55, ease: settle }}
          >
            <h2
              id="web-r2-mock-5-title"
              className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
            >
              Five circuits, one checkout path
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
              I build Next.js and React product UIs. Track Hero sells track time at Monticello,
              Sonoma, The Motor Enclave, Skip Barber, and Spring Mountain. Each site keeps its
              own brand and domain while calendars, waivers, and Stripe checkout run on one
              shared platform.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
