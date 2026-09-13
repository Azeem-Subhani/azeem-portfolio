"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11 },
  },
};

const hubIn: Variants = {
  hidden: { opacity: 0, scale: 0.72 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 320, damping: 20 },
  },
};

const cardIn: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.88 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: settle },
  },
};

const pass: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.18 } },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: settle },
  },
};

const pop: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 420, damping: 16 },
  },
};

type Venue = {
  id: string;
  name: string;
  region: string;
  tint: string;
  bar: string;
  slot: string;
  price: string;
  angle: number;
  radius: number;
};

const venues: Venue[] = [
  {
    id: "monaco",
    name: "Monte Carlo",
    region: "Monaco GP",
    tint: "from-accent/30 to-accent/5",
    bar: "bg-accent",
    slot: "Track day",
    price: "$220",
    angle: -72,
    radius: 118,
  },
  {
    id: "silverstone",
    name: "Silverstone",
    region: "British GP",
    tint: "from-signal/28 to-signal/5",
    bar: "bg-signal",
    slot: "Hot lap",
    price: "$185",
    angle: -36,
    radius: 118,
  },
  {
    id: "laguna",
    name: "Laguna Seca",
    region: "Corkscrew",
    tint: "from-success/25 to-success/5",
    bar: "bg-success",
    slot: "Drive day",
    price: "$310",
    angle: 0,
    radius: 118,
  },
  {
    id: "nurburgring",
    name: "Nürburgring",
    region: "Nordschleife",
    tint: "from-accent-secondary/28 to-accent-secondary/5",
    bar: "bg-accent-secondary",
    slot: "Ring taxi",
    price: "$290",
    angle: 36,
    radius: 118,
  },
  {
    id: "spa",
    name: "Spa",
    region: "Eau Rouge",
    tint: "from-accent/22 to-signal/8",
    bar: "bg-accent",
    slot: "Private hire",
    price: "$1,800",
    angle: 72,
    radius: 118,
  },
];

function VenueCard({
  venue,
  active,
  reduced,
}: {
  venue: Venue;
  active: boolean;
  reduced: boolean;
}) {
  const rad = (venue.angle * Math.PI) / 180;
  const x = Math.sin(rad) * venue.radius;
  const y = -Math.cos(rad) * venue.radius * 0.55;

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 w-[7.25rem] origin-center -translate-x-1/2 -translate-y-1/2 sm:w-[7.75rem]"
      style={{
        x,
        y,
        zIndex: active ? 20 : 10 - Math.abs(venue.angle),
      }}
      variants={cardIn}
    >
      <div
        className={`overflow-hidden rounded-xl border bg-background shadow-[0_0_0_1px_rgb(42_161_152/0.14),0_16px_36px_-20px_rgb(0_43_54/0.55)] transition-[transform,box-shadow] duration-300 ${
          active
            ? "scale-105 border-accent/50 shadow-[0_0_28px_rgb(42_161_152/0.28)]"
            : "border-border/60"
        }`}
      >
        <div className="flex items-center gap-1.5 border-b border-border/50 px-2 py-1.5">
          <span className={`size-1.5 rounded-full ${venue.bar}`} />
          <span className="truncate text-[8px] text-muted-foreground">
            {venue.region}
          </span>
        </div>
        <div className={`relative bg-linear-to-br px-2.5 pb-2.5 pt-2 ${venue.tint}`}>
          <p className="font-display text-[13px] leading-none text-foreground">
            {venue.name}
          </p>
          <p className="mt-1.5 text-[9px] text-muted-foreground">{venue.slot}</p>
          <p className="mt-0.5 text-[11px] tabular-nums text-accent">{venue.price}</p>
          {!reduced && active && (
            <motion.span
              className="absolute right-2 top-2 size-1.5 rounded-full bg-accent shadow-[0_0_8px_rgb(42_161_152/0.9)]"
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

function SyncPulse({ reduced }: { reduced: boolean }) {
  if (reduced) return null;

  return (
    <svg
      viewBox="0 0 320 200"
      className="pointer-events-none absolute inset-0 h-full w-full text-accent/35"
      aria-hidden="true"
    >
      {venues.map((venue, index) => {
        const rad = (venue.angle * Math.PI) / 180;
        const x = 160 + Math.sin(rad) * 92;
        const y = 118 - Math.cos(rad) * 52;
        return (
          <motion.line
            key={venue.id}
            x1="160"
            y1="118"
            x2={x}
            y2={y}
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.6, 0.25] }}
            transition={{
              duration: 0.8,
              delay: 0.4 + index * 0.08,
              ease: settle,
            }}
          />
        );
      })}
      <motion.circle
        r="4"
        className="fill-accent"
        animate={{
          cx: venues.map((v) => 160 + Math.sin((v.angle * Math.PI) / 180) * 92),
          cy: venues.map((v) => 118 - Math.cos((v.angle * Math.PI) / 180) * 52),
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          repeatDelay: 1.6,
          ease: "easeInOut",
          times: [0, 0.08, 0.92, 1],
        }}
      />
    </svg>
  );
}

function PlatformHub({ reduced }: { reduced: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % venues.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <div
      className="relative mx-auto w-full max-w-[22rem] md:max-w-[28rem]"
      style={{ perspective: 1200 }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[46%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/22 blur-3xl"
      />

      <div className="dark relative" data-theme="dark">
        <motion.div
          className="relative min-h-[22rem] overflow-hidden rounded-[1.75rem] border border-border/60 bg-surface px-4 py-5 shadow-[0_0_0_1px_rgb(42_161_152/0.12),0_32px_64px_-28px_rgb(0_43_54/0.65)] sm:min-h-[24rem] sm:px-5 sm:py-6"
          variants={stage}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <div
            aria-hidden="true"
            className="graph-paper pointer-events-none absolute inset-0 opacity-35"
          />

          <motion.div
            className="relative mb-4 flex items-end justify-between gap-3"
            variants={fade}
          >
            <div>
              <p className="text-[11px] text-muted-foreground">Track Hero</p>
              <p className="font-display text-[1.55rem] leading-none text-foreground">
                shared platform
              </p>
            </div>
            <div className="text-right">
              <p className="font-display text-2xl leading-none tabular-nums text-foreground">
                5
              </p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                live venue fronts
              </p>
            </div>
          </motion.div>

          <div className="relative mx-auto h-[11.5rem] w-full max-w-[19rem] sm:h-[12.5rem] sm:max-w-[21rem]">
            <SyncPulse reduced={reduced} />

            <motion.div
              className="absolute left-1/2 top-[58%] z-30 -translate-x-1/2 -translate-y-1/2"
              variants={hubIn}
            >
              <div className="relative flex size-[4.25rem] flex-col items-center justify-center rounded-2xl border border-accent/45 bg-background shadow-[0_0_32px_rgb(42_161_152/0.22),inset_0_1px_0_rgb(238_232_213/0.08)] sm:size-[4.75rem]">
                <span className="font-display text-lg leading-none text-accent">
                  N
                </span>
                <span className="mt-0.5 text-[8px] text-muted-foreground">
                  Next.js
                </span>
                {!reduced && (
                  <motion.span
                    className="absolute -inset-1 rounded-[1.1rem] border border-accent/25"
                    animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
              </div>
            </motion.div>

            <motion.div className="relative h-full w-full" variants={pass}>
              {venues.map((venue, index) => (
                <VenueCard
                  key={venue.id}
                  venue={venue}
                  active={index === activeIndex}
                  reduced={reduced}
                />
              ))}
            </motion.div>
          </div>

          <motion.div
            className="relative mt-4 grid grid-cols-3 gap-2 border-t border-border/60 pt-4"
            variants={pass}
          >
            {[
              { label: "React UI", detail: "one component tree" },
              { label: "Booking API", detail: "shared slot engine" },
              { label: "White-label", detail: "per-venue theme" },
            ].map((item) => (
              <motion.div key={item.label} variants={pop} className="min-w-0">
                <p className="text-[10px] font-medium text-foreground">{item.label}</p>
                <p className="mt-0.5 text-[9px] leading-4 text-muted-foreground">
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            className="relative mt-4 text-[11px] leading-5 text-muted-foreground"
            variants={fade}
          >
            One deploy updates inventory across every venue site. Book on Monaco,
            the same slot logic runs at Silverstone.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

export function WebSectionMock4() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="web"
      aria-labelledby="web-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <PlatformHub reduced={reduced} />
        </div>
        <div className="lg:order-2">
          <h2
            id="web-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            Five venue sites, one booking spine
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            I build Next.js and React product UIs. Track Hero runs white-label
            booking for five race circuits on a single shared platform, so each
            venue keeps its own look without forking the checkout flow.
          </p>
        </div>
      </div>
    </section>
  );
}
