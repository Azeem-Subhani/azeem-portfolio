"use client";

import "./industry-listings.css";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { CalendarCheck, Check } from "lucide-react";

import { useMotionPaused } from "@/hooks/use-motion-paused";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

/*
 * Hero illustration for the Real Estate page: price pins on a schematic block map light
 * up one at a time, the listing card follows the active pin, and a tour slot gets
 * booked. The map is abstract and every listing is synthetic sample data.
 */

// x/y are percentages of the map box; mix/angle vary how much accent the "photo" carries.
const LISTINGS = [
  { pin: "$425k", price: "$425,000", beds: 3, baths: 2, sqft: "1,450", ref: "LST-204", x: 20, y: 34, mix: 42, angle: 160 },
  { pin: "$612k", price: "$612,000", beds: 4, baths: 3, sqft: "2,180", ref: "LST-117", x: 63, y: 24, mix: 30, angle: 200 },
  { pin: "$389k", price: "$389,000", beds: 2, baths: 2, sqft: "1,120", ref: "LST-352", x: 43, y: 64, mix: 52, angle: 135 },
  { pin: "$745k", price: "$745,000", beds: 4, baths: 3, sqft: "2,640", ref: "LST-089", x: 82, y: 60, mix: 24, angle: 180 },
  { pin: "$298k", price: "$298,000", beds: 2, baths: 1, sqft: "940", ref: "LST-461", x: 18, y: 84, mix: 36, angle: 120 },
] as const;

const TOUR_SLOTS = ["Sat 10:00", "Sat 1:30", "Sun 11:00"] as const;

const TICK_MS = 900;
const TICKS_PER_LISTING = 4;
// Sub-step at which the active listing flips from "Available" to "Tour booked".
const BOOK_SUB = 2;
const CYCLE_TICKS = LISTINGS.length * TICKS_PER_LISTING;

// Schematic city blocks: a fixed grid, with one block tinted as a park.
const BLOCK_COLS = 6;
const BLOCK_ROWS = 4;
const PARK_BLOCK = 8;

// Server and first client render agree: the first listing with its tour booked.
// Reduced motion stays on this frame.
const INITIAL_TICK = BOOK_SUB;

function MonoLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

function BlockMap() {
  return (
    <svg
      viewBox="0 0 400 180"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 size-full"
    >
      {Array.from({ length: BLOCK_COLS * BLOCK_ROWS }, (_, index) => {
        const col = index % BLOCK_COLS;
        const row = Math.floor(index / BLOCK_COLS);
        const x = 10 + col * 66;
        const y = 10 + row * 44;
        return (
          <g key={index}>
            <rect
              x={x}
              y={y}
              width="52"
              height="32"
              rx="3"
              className={index === PARK_BLOCK ? "fill-accent/15" : "fill-foreground/5"}
            />
            {/* Every other block is split into two lots for a little texture. */}
            {index !== PARK_BLOCK && (col + row) % 2 === 0 ? (
              <line x1={x + 26} y1={y + 4} x2={x + 26} y2={y + 28} className="stroke-foreground/10" strokeWidth="1" />
            ) : null}
          </g>
        );
      })}
      {/* A diagonal avenue cut through the grid, with a dashed centerline. */}
      <path d="M -10 160 L 410 40" className="fill-none stroke-[var(--background)]" strokeWidth="12" />
      <path
        d="M -10 160 L 410 40"
        className="fill-none stroke-[var(--border)]"
        strokeWidth="1"
        strokeDasharray="6 6"
      />
    </svg>
  );
}

export function IndustryListings() {
  const reduced = usePrefersReducedMotion();
  // The page's pause control freezes the loop on its current frame.
  const paused = useMotionPaused();
  const panelRef = useRef<HTMLDivElement>(null);
  // Steps taken since mount; the visible tick is derived so the first frame is fixed.
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);

  // Only tick while the panel is on screen and the tab is visible.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || reduced || paused) return;
    let inView = false;
    const update = () => setRunning(inView && document.visibilityState === "visible");
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    observer.observe(panel);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      setRunning(false);
    };
  }, [reduced, paused]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setStep((s) => s + 1), TICK_MS);
    return () => window.clearInterval(id);
  }, [running]);

  const tick = (INITIAL_TICK + step) % CYCLE_TICKS;
  const active = Math.floor(tick / TICKS_PER_LISTING);
  const sub = tick % TICKS_PER_LISTING;
  const listing = LISTINGS[active];
  const booked = sub >= BOOK_SUB;
  const bookedSlot = active % TOUR_SLOTS.length;
  // Entrance animations play only on the tick where their content changes.
  const cardIn = step > 0 && sub === 0;
  const bookIn = step > 0 && sub === BOOK_SUB;

  return (
    <div
      ref={panelRef}
      className="relative rounded-[var(--shape-radius-lg)] border border-border bg-surface/70 p-4 shadow-[0_30px_80px_-40px_color-mix(in_srgb,var(--accent)_45%,transparent)] backdrop-blur-sm sm:p-5"
    >
      <p className="sr-only">
        Illustration: a schematic map with five sample price pins. Each pin activates in
        turn, the listing card below updates to match, and a tour slot is booked.
      </p>
      <div aria-hidden="true">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-medium">
            <span className="relative flex size-2">
              <span className="industry-live-ping absolute inset-0 rounded-full bg-accent" />
              <span className="relative size-2 rounded-full bg-accent" />
            </span>
            Listings
          </span>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
            Sample data
          </span>
        </div>

        {/* Map: pins sit on top of the SVG grid as HTML so their text stays crisp. */}
        <div className="relative mt-4 h-40 overflow-hidden rounded-xl border border-border bg-background/70 sm:h-44">
          <BlockMap />
          {LISTINGS.map((item, index) => {
            const on = index === active;
            return (
              <span
                key={item.ref}
                className={cn("absolute", on ? "z-10" : "z-0")}
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
              >
                {on && !reduced ? (
                  <span className="industry-listings-ripple absolute left-0 top-0 size-7 rounded-full bg-accent/40" />
                ) : null}
                <span
                  className={cn(
                    "absolute left-0 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-300",
                    on ? "bg-accent" : "bg-muted-foreground/60",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-1.5 left-0 origin-bottom -translate-x-1/2 whitespace-nowrap rounded-full border px-1.5 py-0.5 font-mono text-[0.6rem] tabular-nums shadow-sm transition-all duration-300",
                    on
                      ? "scale-125 border-accent bg-accent text-accent-foreground"
                      : "scale-100 border-border bg-surface text-foreground/80",
                  )}
                >
                  {item.pin}
                </span>
              </span>
            );
          })}
        </div>

        {/* Listing card follows the active pin. */}
        <div className="mt-3 grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3 rounded-xl border border-border bg-background/70 p-3">
          <div
            key={`photo-${active}`}
            className={cn("relative h-[5.5rem] overflow-hidden rounded-lg", cardIn && "industry-listings-card-in")}
            style={{
              backgroundImage: `linear-gradient(${listing.angle}deg, color-mix(in srgb, var(--accent) ${listing.mix}%, var(--surface)), var(--background))`,
            }}
          >
            {/* Abstract "photo": a soft sun and a simple house silhouette. */}
            <span className="absolute right-2.5 top-2.5 size-4 rounded-full bg-background/60" />
            <span className="absolute inset-x-0 bottom-0 h-5 bg-foreground/10" />
            <span className="absolute bottom-3 left-1/2 h-10 w-12 -translate-x-1/2 bg-background/55 [clip-path:polygon(50%_0,100%_40%,100%_100%,0_100%,0_40%)]" />
            <span className="absolute bottom-3 left-1/2 h-3.5 w-2.5 -translate-x-1/2 bg-foreground/20" />
          </div>
          <div key={`info-${active}`} className={cn("min-w-0 self-center", cardIn && "industry-listings-card-in")}>
            <div className="flex items-center justify-between gap-2">
              <MonoLabel className="truncate">{listing.ref}</MonoLabel>
              <span
                className={cn(
                  "flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.08em] transition-colors duration-500",
                  booked
                    ? "border-accent/50 text-[var(--accent-readable)]"
                    : "border-border text-muted-foreground",
                )}
              >
                {booked ? <CalendarCheck aria-hidden="true" className="size-3" strokeWidth={2.25} /> : null}
                {booked ? "Tour booked" : "Available"}
              </span>
            </div>
            <p className="mt-2 truncate font-display text-2xl leading-none tabular-nums">{listing.price}</p>
            <p className="mt-2 truncate text-xs text-muted-foreground tabular-nums">
              {listing.beds} bd · {listing.baths} ba · {listing.sqft} sq ft
            </p>
          </div>
        </div>

        {/* Tour slots for the active listing; one fills once the tour is booked. */}
        <div className="mt-3">
          <div className="flex items-center justify-between">
            <MonoLabel>Tour slots</MonoLabel>
            <MonoLabel className={cn(booked && "text-[var(--accent-readable)]")}>
              {booked ? "1 booked" : `${TOUR_SLOTS.length} open`}
            </MonoLabel>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {TOUR_SLOTS.map((slot, index) => {
              const filled = booked && index === bookedSlot;
              return (
                <span
                  key={slot}
                  className={cn(
                    "flex min-w-0 items-center justify-center gap-1 rounded-lg border px-1.5 py-1.5 font-mono text-[0.62rem] tabular-nums transition-colors duration-500",
                    filled
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border text-muted-foreground",
                    filled && bookIn && "industry-listings-book",
                  )}
                >
                  {filled ? <Check aria-hidden="true" className="size-3 shrink-0" strokeWidth={2.75} /> : null}
                  <span className="truncate">{slot}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
