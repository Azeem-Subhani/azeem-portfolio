"use client";

import { useCallback, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.22, 1, 0.36, 1] as const;

type Venue = {
  id: string;
  short: string;
  name: string;
  date: string;
  accent: string;
  accentSoft: string;
  track: string;
  slots: { time: string; label: string; price: string; open: boolean }[];
};

const venues: Venue[] = [
  {
    id: "monaco",
    short: "Monaco",
    name: "Monte Carlo",
    date: "Saturday 14 June",
    accent: "#c8102e",
    accentSoft: "rgb(200 16 46 / 0.14)",
    track:
      "M118 250c-40-8-62 28-58 72 4 44 38 68 82 58 44-10 72-52 68-96-4-44-38-68-92-34z",
    slots: [
      { time: "9:00", label: "Track day", price: "$220", open: true },
      { time: "1:30", label: "Drive experience", price: "$420", open: true },
      { time: "4:00", label: "Private hire", price: "$1,800", open: false },
    ],
  },
  {
    id: "silverstone",
    short: "Silverstone",
    name: "Silverstone Circuit",
    date: "Sunday 6 July",
    accent: "#004990",
    accentSoft: "rgb(0 73 144 / 0.14)",
    track:
      "M80 200c20-36 68-44 108-16 40 28 48 76 20 116-28 40-76 48-116 20-40-28-48-76-12-120z",
    slots: [
      { time: "8:30", label: "Hot lap", price: "$185", open: true },
      { time: "12:00", label: "Track day", price: "$240", open: true },
      { time: "3:30", label: "Corporate", price: "$2,400", open: false },
    ],
  },
  {
    id: "spa",
    short: "Spa",
    name: "Circuit de Spa-Francorchamps",
    date: "Friday 22 August",
    accent: "#e10600",
    accentSoft: "rgb(225 6 0 / 0.14)",
    track:
      "M60 180c16-52 72-64 120-32 48 32 56 88 24 132-32 44-88 52-132 20-44-32-52-88-12-120z",
    slots: [
      { time: "10:00", label: "Ardenne drive", price: "$310", open: true },
      { time: "2:00", label: "Track day", price: "$265", open: true },
      { time: "5:30", label: "Private hire", price: "$1,950", open: true },
    ],
  },
  {
    id: "monza",
    short: "Monza",
    name: "Autodromo Nazionale Monza",
    date: "Saturday 13 September",
    accent: "#009246",
    accentSoft: "rgb(0 146 70 / 0.14)",
    track:
      "M100 160c-8-48 44-72 92-52 48 20 64 72 44 112-20 40-72 56-112 36-40-20-56-72-24-96z",
    slots: [
      { time: "9:30", label: "Parabolica pass", price: "$195", open: true },
      { time: "1:00", label: "Track day", price: "$230", open: true },
      { time: "4:30", label: "Private hire", price: "$1,650", open: false },
    ],
  },
  {
    id: "suzuka",
    short: "Suzuka",
    name: "Suzuka Circuit",
    date: "Sunday 5 October",
    accent: "#dc143c",
    accentSoft: "rgb(220 20 60 / 0.14)",
    track:
      "M140 120c28-20 64-8 76 24 12 32-8 64-40 76-32 12-64-8-76-40-12-32 8-64 40-60z",
    slots: [
      { time: "8:00", label: "Figure-eight", price: "$275", open: true },
      { time: "11:30", label: "Track day", price: "$290", open: true },
      { time: "3:00", label: "Private hire", price: "$2,100", open: false },
    ],
  },
];

const platform = {
  color: "#2aa198",
  soft: "rgb(42 161 152 / 0.12)",
};

function VenueTabs({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (id: string) => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);

  const move = useCallback(
    (from: number) => {
      const next = (from + venues.length) % venues.length;
      onSelect(venues[next].id);
      listRef.current
        ?.querySelector<HTMLButtonElement>(`[data-venue="${venues[next].id}"]`)
        ?.focus();
    },
    [onSelect],
  );

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label="Venue"
      className="flex gap-1 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {venues.map((venue) => {
        const selected = venue.id === active;
        return (
          <button
            key={venue.id}
            type="button"
            role="tab"
            data-venue={venue.id}
            id={`venue-tab-${venue.id}`}
            aria-selected={selected}
            aria-controls="venue-booking-panel"
            tabIndex={selected ? 0 : -1}
            onClick={() => onSelect(venue.id)}
            onKeyDown={(event) => {
              const index = venues.findIndex((v) => v.id === venue.id);
              if (event.key === "ArrowRight") {
                event.preventDefault();
                move(index + 1);
              }
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                move(index - 1);
              }
            }}
            className="shrink-0 rounded-lg px-3 py-2.5 text-sm font-medium transition-[background-color,color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              backgroundColor: selected ? "var(--skin-venue-soft)" : "transparent",
              color: selected ? "var(--skin-venue)" : "var(--skin-muted)",
              outlineColor: "var(--skin-venue)",
            }}
          >
            {venue.short}
          </button>
        );
      })}
    </div>
  );
}

function BookingPanel({
  venue,
  reduced,
  onSelectVenue,
}: {
  venue: Venue;
  reduced: boolean;
  onSelectVenue: (id: string) => void;
}) {
  const morph = reduced ? "none" : "background-color 350ms ease, color 350ms ease";

  return (
    <div
      className="overflow-hidden rounded-2xl shadow-[0_1px_0_rgb(26_35_50/0.06),0_24px_48px_-28px_rgb(26_35_50/0.35)]"
      style={{
        backgroundColor: "var(--skin-bg)",
        color: "var(--skin-fg)",
        transition: morph,
      }}
    >
      <div
        className="border-b px-4 py-3 sm:px-5"
        style={{ borderColor: "var(--skin-line)" }}
      >
        <VenueTabs active={venue.id} onSelect={onSelectVenue} />
      </div>

      <div
        role="tabpanel"
        id="venue-booking-panel"
        aria-labelledby={`venue-tab-${venue.id}`}
        className="px-4 py-5 sm:px-5 sm:py-6"
      >
        <div className="relative h-[7.5rem] sm:h-[8.5rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.svg
              key={venue.id}
              viewBox="0 0 240 160"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.35, ease: settle }}
            >
              <path
                d={venue.track}
                fill="none"
                stroke="var(--skin-venue)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.85"
                style={{ transition: morph }}
              />
              <path
                d={venue.track}
                fill="var(--skin-venue-soft)"
                stroke="none"
                style={{ transition: morph }}
              />
            </motion.svg>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={venue.id}
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: reduced ? 0 : 0.32, ease: settle }}
          >
            <h3 className="font-display text-[clamp(1.65rem,4.5vw,2.25rem)] leading-[1.05] tracking-tight">
              {venue.name}
            </h3>
            <p className="mt-1 text-sm" style={{ color: "var(--skin-muted)" }}>
              {venue.date}
            </p>
          </motion.div>
        </AnimatePresence>

        <ul className="mt-6 divide-y" style={{ borderColor: "var(--skin-line)" }}>
          {venue.slots.map((slot) => (
            <li
              key={slot.time}
              className="flex items-baseline justify-between gap-3 py-3 first:pt-0 last:pb-0"
              style={{ borderColor: "var(--skin-line)" }}
            >
              <div className="flex min-w-0 items-baseline gap-3">
                <span
                  className="shrink-0 font-display text-xl tabular-nums leading-none"
                  style={{
                    color: slot.open ? "var(--skin-fg)" : "var(--skin-muted)",
                  }}
                >
                  {slot.time}
                </span>
                <span
                  className="truncate text-sm"
                  style={{
                    color: slot.open ? "var(--skin-fg)" : "var(--skin-muted)",
                  }}
                >
                  {slot.label}
                </span>
              </div>
              <span
                className="shrink-0 text-sm tabular-nums font-medium"
                style={{
                  color: slot.open ? "var(--skin-venue)" : "var(--skin-muted)",
                  transition: morph,
                }}
              >
                {slot.open ? slot.price : "Full"}
              </span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="mt-6 w-full rounded-xl py-3 text-sm font-medium transition-[background-color,transform] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.99]"
          style={{
            backgroundColor: "var(--skin-venue)",
            color: "#f8f9fb",
            outlineColor: "var(--skin-venue)",
          }}
        >
          Book a slot
        </button>
      </div>

      <div
        className="flex items-center gap-2 border-t px-4 py-3 sm:px-5"
        style={{
          borderColor: "var(--skin-line)",
          backgroundColor: platform.soft,
        }}
      >
        <span
          className="size-2 shrink-0 rounded-full"
          style={{ backgroundColor: platform.color }}
          aria-hidden="true"
        />
        <p className="text-xs leading-5" style={{ color: "var(--skin-muted)" }}>
          Shared checkout, waivers, and Stripe run on one Next.js codebase
        </p>
      </div>
    </div>
  );
}

function PitWallVisual({ reduced }: { reduced: boolean }) {
  const [activeId, setActiveId] = useState(venues[0].id);
  const venue = venues.find((v) => v.id === activeId) ?? venues[0];

  const skinVars = {
    "--skin-bg": "#e8eaef",
    "--skin-fg": "#1a2332",
    "--skin-muted": "#5c6574",
    "--skin-line": "#c5cad3",
    "--skin-venue": venue.accent,
    "--skin-venue-soft": venue.accentSoft,
  } as CSSProperties;

  return (
    <div className="relative mx-auto w-full max-w-md" style={skinVars}>
      <BookingPanel
        venue={venue}
        reduced={reduced}
        onSelectVenue={setActiveId}
      />
    </div>
  );
}

export function WebR2Mock1() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="web"
      aria-labelledby="web-r2-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1">
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: reduced ? 0 : 0.5, ease: settle }}
          >
            <PitWallVisual reduced={reduced} />
          </motion.div>
        </div>
        <div className="lg:order-2">
          <h2
            id="web-r2-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            One platform, five venue skins
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            I build Next.js and React product UIs. Track Hero runs white-label
            booking for five race circuits. Each site gets its own colors, copy,
            and URL. Calendars, waivers, and Stripe checkout stay on one
            codebase.
          </p>
        </div>
      </div>
    </section>
  );
}
