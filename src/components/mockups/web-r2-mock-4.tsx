"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Venue = {
  id: string;
  name: string;
  short: string;
  color: string;
  light: string;
  slot: string;
  time: string;
  price: string;
};

const venues: Venue[] = [
  {
    id: "monticello",
    name: "Monticello Motor Club",
    short: "Monticello",
    color: "#1B4332",
    light: "#D8E9DF",
    slot: "Member track day",
    time: "9:30",
    price: "$385",
  },
  {
    id: "sonoma",
    name: "Sonoma Raceway",
    short: "Sonoma",
    color: "#722F37",
    light: "#F0D9DC",
    slot: "Drive experience",
    time: "1:30",
    price: "$420",
  },
  {
    id: "enclave",
    name: "The Motor Enclave",
    short: "Enclave",
    color: "#1E4D8C",
    light: "#D6E4F5",
    slot: "Club sprint",
    time: "11:00",
    price: "$295",
  },
  {
    id: "skip",
    name: "Skip Barber Racing School",
    short: "Skip Barber",
    color: "#5C4D7A",
    light: "#E4DFEC",
    slot: "Two-day school",
    time: "8:00",
    price: "$2,400",
  },
  {
    id: "spring",
    name: "Spring Mountain",
    short: "Spring Mountain",
    color: "#5C6B4F",
    light: "#E2E8DC",
    slot: "Exotic rental",
    time: "3:00",
    price: "$890",
  },
];

function MergeGraphic({
  activeIndex,
  reduced,
  clipId,
}: {
  activeIndex: number;
  reduced: boolean;
  clipId: string;
}) {
  const barWidth = 56;
  const gap = 6;
  const totalWidth = venues.length * barWidth + (venues.length - 1) * gap;
  const startX = (320 - totalWidth) / 2;

  return (
    <svg
      viewBox="0 0 320 88"
      className="mx-auto block w-full max-w-[20rem]"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y="0" width="320" height="88" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        {venues.map((venue, index) => {
          const x = startX + index * (barWidth + gap);
          const centerX = x + barWidth / 2;
          const active = index === activeIndex;
          const endX = 160 + (centerX - 160) * 0.22;

          return (
            <g key={venue.id}>
              <motion.path
                d={`M ${centerX} 46 L ${endX} 84`}
                fill="none"
                stroke={venue.color}
                strokeWidth={active ? 2.5 : 1.25}
                strokeOpacity={active ? 0.85 : 0.22}
                initial={false}
                animate={{
                  strokeOpacity: active ? 0.85 : 0.22,
                  strokeWidth: active ? 2.5 : 1.25,
                }}
                transition={reduced ? { duration: 0 } : { duration: 0.28 }}
              />
              <rect
                x={x}
                y={8}
                width={barWidth}
                height={34}
                fill={venue.color}
                opacity={active ? 1 : 0.38}
              />
              <rect
                x={x}
                y={8}
                width={barWidth}
                height={3}
                fill={venue.light}
                opacity={active ? 0.9 : 0.4}
              />
            </g>
          );
        })}
        <rect x="72" y="84" width="176" height="2" fill="#2B3340" opacity="0.18" />
      </g>
    </svg>
  );
}

function BookingRail({
  venue,
  reduced,
}: {
  venue: Venue;
  reduced: boolean;
}) {
  return (
    <motion.div
      className="overflow-hidden border-2 border-[#2B3340]/12 bg-[#F4F6F8]"
      initial={false}
      animate={{
        borderColor: `${venue.color}33`,
      }}
      transition={reduced ? { duration: 0 } : { duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.div
        className="px-4 py-3"
        initial={false}
        animate={{ backgroundColor: venue.color }}
        transition={reduced ? { duration: 0 } : { duration: 0.32 }}
      >
        <p className="text-[11px] font-medium leading-none text-white/72">Track Hero</p>
        <p className="mt-1 font-sans text-[1.35rem] font-bold leading-none tracking-tight text-white">
          {venue.short}
        </p>
      </motion.div>

      <div className="divide-y divide-[#2B3340]/10">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <p className="font-sans text-xl font-bold tabular-nums leading-none text-[#1A1F26]">
              {venue.time}
            </p>
            <p className="mt-1 text-[11px] leading-4 text-[#6A7380]">{venue.slot}</p>
          </div>
          <p className="font-sans text-base font-semibold tabular-nums text-[#1A1F26]">
            {venue.price}
          </p>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <p className="font-sans text-xl font-bold tabular-nums leading-none text-[#1A1F26]/35">
              4:15
            </p>
            <p className="mt-1 text-[11px] leading-4 text-[#6A7380]/55">Private hire</p>
          </div>
          <p className="text-[11px] text-[#6A7380]/55">Full</p>
        </div>
      </div>

      <div className="flex items-center justify-between border-t-2 border-[#2B3340]/10 bg-white px-4 py-3">
        <p className="max-w-[9rem] text-[11px] leading-4 text-[#6A7380]">
          Shared Stripe checkout runs at every venue front.
        </p>
        <motion.button
          type="button"
          className="shrink-0 px-4 py-2 font-sans text-[12px] font-semibold text-white"
          initial={false}
          animate={{ backgroundColor: venue.color }}
          transition={reduced ? { duration: 0 } : { duration: 0.32 }}
          whileTap={reduced ? undefined : { scale: 0.98 }}
        >
          Reserve
        </motion.button>
      </div>
    </motion.div>
  );
}

function LaneMergeVisual({ reduced }: { reduced: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const clipId = useId().replace(/:/g, "");
  const activeVenue = venues[activeIndex];

  const pick = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % venues.length);
    }, 4800);
    return () => window.clearInterval(id);
  }, [reduced, activeIndex]);

  return (
    <div className="mx-auto w-full max-w-[22rem] lg:max-w-none">
      <div className="border-2 border-[#2B3340]/10 bg-[#E8ECF1] p-4 sm:p-5">
        <div
          className="mb-1 grid grid-cols-5 gap-1.5"
          role="tablist"
          aria-label="Venue skins"
        >
          {venues.map((venue, index) => {
            const active = index === activeIndex;
            return (
              <button
                key={venue.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`venue-panel-${venue.id}`}
                id={`venue-tab-${venue.id}`}
                onClick={() => pick(index)}
                className="group relative min-h-[2.75rem] px-0.5 py-2 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B3340]"
                style={{
                  backgroundColor: active ? venue.color : `${venue.color}30`,
                }}
              >
                <span
                  className={`block truncate font-sans text-[9px] font-semibold leading-tight sm:text-[10px] ${
                    active ? "text-white" : "text-[#1A1F26]"
                  }`}
                >
                  {venue.short}
                </span>
              </button>
            );
          })}
        </div>

        <MergeGraphic activeIndex={activeIndex} reduced={reduced} clipId={clipId} />

        <div
          role="tabpanel"
          id={`venue-panel-${activeVenue.id}`}
          aria-labelledby={`venue-tab-${activeVenue.id}`}
          className="mt-1"
        >
          <BookingRail venue={activeVenue} reduced={reduced} />
        </div>

        <p className="mt-3 text-center font-sans text-[10px] leading-4 text-[#6A7380]">
          Next.js and React, one deploy updates inventory everywhere.
        </p>
      </div>
    </div>
  );
}

export function WebR2Mock4() {
  const reduced = usePrefersReducedMotion();
  const systemReduced = useReducedMotion();
  const motionSafe = reduced || !!systemReduced;

  return (
    <section
      id="web-r2-4"
      aria-labelledby="web-r2-4-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="lg:order-1">
          <LaneMergeVisual reduced={motionSafe} />
        </div>

        <div className="lg:order-2">
          <h2
            id="web-r2-4-title"
            className="font-sans text-[clamp(1.85rem,4.6vw,3.25rem)] font-black leading-[1.08] tracking-[-0.03em] text-foreground"
          >
            White-label booking on one Next.js platform
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-[1.05rem] sm:leading-8">
            I build React product UIs for teams that ship. Track Hero runs five race-circuit
            booking sites on a shared platform, so Monticello, Sonoma, The Motor Enclave, Skip
            Barber, and Spring Mountain each keep their own look without maintaining separate
            checkout code.
          </p>
        </div>
      </div>
    </section>
  );
}
