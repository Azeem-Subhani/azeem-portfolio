"use client";

import { Calendar, CreditCard } from "lucide-react";
import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const peel: Variants = {
  hidden: { opacity: 0, x: -28, rotate: -6 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { duration: 0.65, ease: settle },
  },
};

const panelIn: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: settle },
  },
};

const pass: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.22 } },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: settle },
  },
};

const dockUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: settle, delay: 0.45 },
  },
};

const venues = [
  {
    id: "monticello",
    short: "Monticello",
    peel: "Motor Club",
    offset: "top-[8%] -left-3 -rotate-[7deg]",
    z: "z-10",
    tone: "signal" as const,
  },
  {
    id: "sonoma",
    short: "Sonoma",
    peel: "Raceway",
    offset: "top-[22%] left-1 -rotate-[3deg]",
    z: "z-30",
    tone: "accent" as const,
    active: true,
  },
  {
    id: "enclave",
    short: "Motor Enclave",
    peel: "Tampa Bay",
    offset: "top-[38%] -left-2 rotate-[2deg]",
    z: "z-20",
    tone: "accent" as const,
  },
  {
    id: "skip",
    short: "Skip Barber",
    peel: "Racing School",
    offset: "top-[54%] left-0 -rotate-[4deg]",
    z: "z-10",
    tone: "signal" as const,
  },
  {
    id: "spring",
    short: "Spring Mountain",
    peel: "Motorsports",
    offset: "top-[70%] -left-1 rotate-[5deg]",
    z: "z-0",
    tone: "accent" as const,
  },
];

const slots = [
  { time: "9:00", label: "Track day", price: "$220", taken: false },
  { time: "1:30", label: "Drive experience", price: "$420", taken: false },
  { time: "4:00", label: "Private hire", price: "$1,800", taken: true },
];

function toneSurface(tone: "accent" | "signal", active?: boolean) {
  if (active) {
    return "border-accent/50 bg-accent/18 text-accent shadow-[0_0_24px_rgb(42_161_152/0.22)]";
  }
  return tone === "signal"
    ? "border-signal/30 bg-signal/10 text-signal"
    : "border-accent/25 bg-accent/8 text-accent";
}

function VenuePeelVisual({ reduced }: { reduced: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[22rem] md:max-w-[26rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[38%] top-[48%] h-72 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/22 blur-3xl"
      />

      <div className="dark relative" data-theme="dark">
        <motion.div
          className="relative min-h-[32rem] overflow-visible md:min-h-[34rem]"
          variants={stage}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          {venues.map((venue, index) => (
            <motion.div
              key={venue.id}
              className={`absolute ${venue.offset} ${venue.z} w-[min(100%,11.5rem)]`}
              variants={peel}
              custom={index}
              style={{ transitionDelay: `${index * 0.05}s` }}
            >
              <div
                className={`rounded-2xl border px-3.5 py-2.5 backdrop-blur-md ${toneSurface(venue.tone, venue.active)}`}
              >
                <p className="font-display text-[1.05rem] leading-none text-foreground">
                  {venue.short}
                </p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">{venue.peel}</p>
              </div>
            </motion.div>
          ))}

          <motion.div
            className="relative ml-auto mt-16 w-[min(100%,17.5rem)] origin-bottom-right"
            variants={panelIn}
          >
            <div className="overflow-hidden rounded-[1.65rem] border border-border/70 bg-surface shadow-[0_0_0_1px_rgb(42_161_152/0.14),0_28px_56px_-24px_rgb(0_43_54/0.7)]">
              <div
                aria-hidden="true"
                className="graph-paper pointer-events-none absolute inset-0 opacity-35"
              />

              <div className="relative px-4 pb-3 pt-4">
                <motion.div className="flex items-start justify-between gap-3" variants={fade}>
                  <div>
                    <p className="text-[11px] text-muted-foreground">Track Hero</p>
                    <p className="font-display text-[1.75rem] leading-none text-foreground">
                      Sonoma
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">Saturday · Apr 12</p>
                  </div>
                  <span className="rounded-full border border-accent/35 bg-accent/12 px-2 py-0.5 text-[10px] text-accent">
                    live
                  </span>
                </motion.div>

                <motion.ul className="relative mt-4 space-y-2" variants={pass}>
                  {slots.map((slot) => (
                    <motion.li
                      key={slot.time}
                      className={`flex items-center justify-between rounded-xl border px-3 py-2.5 ${
                        slot.taken
                          ? "border-border/50 bg-background/40 opacity-45"
                          : "border-accent/30 bg-background/70"
                      }`}
                      variants={fade}
                    >
                      <div>
                        <p className="font-display text-lg tabular-nums leading-none text-foreground">
                          {slot.time}
                        </p>
                        <p className="mt-0.5 text-[10px] text-muted-foreground">{slot.label}</p>
                      </div>
                      <p className="text-sm tabular-nums text-accent">{slot.price}</p>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.p
                  className="relative mt-3 text-[10px] leading-4 text-muted-foreground"
                  variants={fade}
                >
                  Same checkout runs at Monticello, Motor Enclave, Skip Barber, and Spring
                  Mountain.
                </motion.p>
              </div>

              <motion.div
                className="relative border-t border-border/80 bg-background px-3 pb-2.5 pt-2.5"
                variants={dockUp}
              >
                <div className="flex items-center gap-2">
                  <div className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl bg-surface px-3 py-2">
                    <Calendar className="size-3.5 shrink-0 text-accent" strokeWidth={1.75} />
                    <div className="min-w-0">
                      <p className="truncate text-[11px] font-medium text-foreground">
                        1:30 · Drive experience
                      </p>
                      <p className="text-[10px] tabular-nums text-muted-foreground">$420 due now</p>
                    </div>
                  </div>
                  <motion.button
                    type="button"
                    className="flex shrink-0 items-center gap-1.5 rounded-2xl bg-accent px-3.5 py-2.5 text-[12px] font-medium text-accent-foreground"
                    whileTap={reduced ? undefined : { scale: 0.97 }}
                  >
                    <CreditCard className="size-3.5" strokeWidth={2} />
                    Reserve
                  </motion.button>
                </div>
                <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-muted-foreground/28" />
              </motion.div>
            </div>
          </motion.div>

          <motion.svg
            viewBox="0 0 240 320"
            className="pointer-events-none absolute bottom-[18%] left-[6%] h-48 w-36 text-accent/35"
            aria-hidden="true"
            variants={fade}
          >
            <path
              d="M 12 280 C 48 220, 72 180, 120 140"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeDasharray="3 5"
            />
            <path
              d="M 12 240 C 56 200, 88 160, 120 120"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="3 5"
              opacity="0.6"
            />
            {!reduced && (
              <motion.circle
                r="3"
                className="fill-accent"
                animate={{
                  cx: [12, 120],
                  cy: [280, 140],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  repeatDelay: 1.4,
                  ease: "easeInOut",
                }}
              />
            )}
          </motion.svg>
        </motion.div>
      </div>
    </div>
  );
}

export function WebSectionMock5() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="web"
      aria-labelledby="web-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <VenuePeelVisual reduced={reduced} />
        </div>
        <div className="lg:order-2">
          <h2
            id="web-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            Five tracks, one reservation stack
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            Track Hero sells track time at five venues, each with its own brand. I built the
            Next.js booking sites and shared Stripe checkout so Sonoma, Monticello, The Motor
            Enclave, Skip Barber, and Spring Mountain run on one platform.
          </p>
        </div>
      </div>
    </section>
  );
}
