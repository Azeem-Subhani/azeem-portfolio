"use client";

import { useId, useState } from "react";
import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const panelIn: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: settle },
  },
};

type Slot = {
  time: string;
  label: string;
  price: string;
  open: boolean;
};

const slots: Slot[] = [
  { time: "9:00", label: "Strategy session", price: "$640", open: true },
  { time: "1:30", label: "Team workshop", price: "$420", open: true },
  { time: "4:00", label: "Office hours", price: "Free", open: false },
];

type LayoutMode = "stack" | "list" | "grid";

function layoutMode(width: number): LayoutMode {
  if (width < 280) return "stack";
  if (width < 420) return "list";
  return "grid";
}

function layoutLabel(mode: LayoutMode) {
  if (mode === "stack") return "Single column";
  if (mode === "list") return "Stacked rows";
  return "Three-up grid";
}

function RulerTicks({ width }: { width: number }) {
  const ticks = Math.min(8, Math.floor(width / 48));
  return (
    <div
      className="relative h-3 border-b border-border/80 bg-surface/60"
      aria-hidden="true"
    >
      {Array.from({ length: ticks + 1 }, (_, i) => {
        const left = (i / ticks) * 100;
        const major = i === 0 || i === ticks;
        return (
          <span
            key={i}
            className="absolute bottom-0 w-px bg-foreground/25"
            style={{
              left: `${left}%`,
              height: major ? 10 : 5,
            }}
          />
        );
      })}
      <span className="absolute right-2 top-0 font-sans text-[9px] tabular-nums text-muted-foreground">
        {Math.round(width)}px
      </span>
    </div>
  );
}

function SchedulerPanel({ mode }: { mode: LayoutMode }) {
  const grid = mode === "grid";
  const stack = mode === "stack";

  return (
    <div className="border-t border-border/70 bg-background">
      <div
        className={
          stack
            ? "flex flex-col gap-3 px-3 py-3"
            : "flex items-start justify-between gap-3 px-3 py-3 sm:px-4"
        }
      >
        <div className={stack ? undefined : "min-w-0 shrink-0"}>
          <p className="font-display text-[1.35rem] leading-none tracking-tight text-foreground">
            Thursday 12 June
          </p>
          <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
            Open booking window
          </p>
        </div>
        {!stack ? (
          <p className="shrink-0 font-sans text-[11px] tabular-nums text-accent">
            2 slots left
          </p>
        ) : null}
      </div>

      <ul
        className={
          grid
            ? "grid grid-cols-3 gap-px border-t border-border/70 bg-border/50"
            : "divide-y divide-border/70 border-t border-border/70"
        }
      >
        {slots.map((slot) => (
          <li
            key={slot.time}
            className={
              grid
                ? "bg-background px-2.5 py-3 sm:px-3"
                : "flex items-center justify-between gap-3 bg-background px-3 py-3 sm:px-4"
            }
          >
            {grid ? (
              <>
                <p
                  className={`font-display text-lg tabular-nums leading-none ${
                    slot.open ? "text-foreground" : "text-muted-foreground/45"
                  }`}
                >
                  {slot.time}
                </p>
                <p className="mt-2 text-[10px] leading-4 text-muted-foreground">
                  {slot.label}
                </p>
                <p
                  className={`mt-1 text-xs tabular-nums ${
                    slot.open ? "text-accent" : "text-muted-foreground/45"
                  }`}
                >
                  {slot.open ? slot.price : "Full"}
                </p>
              </>
            ) : (
              <>
                <div className="min-w-0">
                  <p
                    className={`font-display text-xl tabular-nums leading-none ${
                      slot.open ? "text-foreground" : "text-muted-foreground/45"
                    }`}
                  >
                    {slot.time}
                  </p>
                  <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
                    {slot.label}
                  </p>
                </div>
                <p
                  className={`shrink-0 font-sans text-sm tabular-nums ${
                    slot.open ? "text-accent" : "text-muted-foreground/45"
                  }`}
                >
                  {slot.open ? slot.price : "Full"}
                </p>
              </>
            )}
          </li>
        ))}
      </ul>

      <div
        className={
          stack
            ? "flex flex-col gap-2 border-t border-border/70 px-3 py-3"
            : "flex items-center justify-between gap-3 border-t border-border/70 px-3 py-3 sm:px-4"
        }
      >
        <p className="text-[11px] leading-4 text-muted-foreground">
          {stack ? "2 slots left this week" : "Shared checkout on one deploy"}
        </p>
        <button
          type="button"
          className="shrink-0 bg-accent px-4 py-2 font-sans text-[12px] font-medium text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Book slot
        </button>
      </div>
    </div>
  );
}

function WidthDialVisual({ reduced }: { reduced: boolean }) {
  const [width, setWidth] = useState(360);
  const inputId = useId();
  const mode = layoutMode(width);

  return (
    <div className="mx-auto w-full max-w-[24rem] md:max-w-[26rem]">
      <motion.div
        variants={panelIn}
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        className="overflow-hidden rounded-[1.25rem] border border-border/70 bg-surface shadow-[0_24px_48px_-32px_rgb(var(--shadow-color)/0.35)]"
      >
        <div className="flex items-baseline justify-between gap-3 border-b border-border/60 px-4 py-3">
          <p className="text-[11px] text-muted-foreground">Preview width</p>
          <p className="font-sans text-[11px] tabular-nums text-foreground">
            {layoutLabel(mode)}
          </p>
        </div>

        <div className="relative bg-surface-elevated/40 px-4 pb-4 pt-3">
          <div
            className="mx-auto overflow-hidden rounded-md border border-foreground/12 bg-background shadow-[inset_0_0_0_1px_rgb(255_255_255/0.04)] transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ width: `${width}px`, maxWidth: "100%" }}
          >
            <RulerTicks width={width} />
            <SchedulerPanel mode={mode} />
          </div>
        </div>

        <div className="border-t border-border/60 px-4 py-4">
          <label htmlFor={inputId} className="sr-only">
            Adjust preview width
          </label>
          <div className="relative pt-1">
            <div
              className="h-1.5 rounded-full bg-border"
              aria-hidden="true"
            />
            <input
              id={inputId}
              type="range"
              min={220}
              max={500}
              step={1}
              value={width}
              onChange={(event) => setWidth(Number(event.target.value))}
              className="absolute inset-x-0 top-0 h-4 w-full cursor-ew-resize appearance-none bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-background [&::-webkit-slider-thumb]:bg-accent [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-background [&::-moz-range-thumb]:bg-accent"
              aria-valuetext={`${width} pixels, ${layoutLabel(mode)}`}
            />
          </div>
          <div className="mt-3 flex justify-between font-sans text-[10px] tabular-nums text-muted-foreground">
            <span>220</span>
            <span>360</span>
            <span>500</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function WebV3Mock4() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="web-v3-mock-4"
      aria-labelledby="web-v3-mock-4-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <WidthDialVisual reduced={reduced} />
        </div>

        <div className="lg:order-2">
          <h2
            id="web-v3-mock-4-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            Layouts that reflow on real screens
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            I ship Next.js and React product UI with breakpoint logic baked in.
            Your scheduler, checkout, or admin panel keeps its structure from a
            narrow phone to a wide desktop without maintaining separate layouts
            per device.
          </p>
        </div>
      </div>
    </section>
  );
}
