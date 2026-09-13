"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

import {
  gantryGreenAtMs,
  GantryLights,
  runGantryStartSequence,
  terminalLagMs,
  venues,
  type LightState,
} from "@/components/mockups/web-r2-mock-5";
import { ResponsivePairVisual } from "@/components/mockups/web-v4-mock-1";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

export function WebGantryPairVisual() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [lightStates, setLightStates] = useState<LightState[]>(
    reduced ? venues.map(() => "green" as const) : venues.map(() => "idle" as const),
  );
  const [bodyPlay, setBodyPlay] = useState(reduced);

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
      setTimeout(() => setBodyPlay(true), gantryGreenAtMs + terminalLagMs),
    );

    return clearAll;
  }, [inView, reduced]);

  const lightsLive = lightStates.every((state) => state === "green");

  return (
    <div
      ref={rootRef}
      className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem] md:max-w-[28rem]"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[28%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        animate={{
          opacity: lightsLive ? 0.55 : 0.2,
          scale: lightsLive ? 1.05 : 0.92,
        }}
        transition={{ duration: 0.55, ease: settle }}
        style={{ background: "color-mix(in srgb, var(--accent) 28%, transparent)" }}
      />

      <div
        className="dark relative overflow-visible rounded-[1.5rem] border border-border/60 bg-background px-4 py-5 shadow-[0_28px_56px_-28px_rgb(var(--shadow-color)/0.45)] sm:px-5 sm:py-6"
        data-theme="dark"
      >
        <div className="min-h-[5.75rem] sm:min-h-[6.25rem]">
          <GantryLights states={lightStates} />
        </div>

        <div
          aria-hidden="true"
          className="mx-2 border-t border-border/35 sm:mx-3"
        />

        <motion.div
          className="min-h-[21rem] overflow-visible pt-7 sm:min-h-[23rem] sm:pt-9"
          initial={false}
          animate={{
            opacity: bodyPlay ? 1 : 0,
            y: bodyPlay ? 0 : 14,
          }}
          transition={{ duration: 0.55, ease: settle }}
        >
          <ResponsivePairVisual reduced={reduced} embedded play={bodyPlay} />
        </motion.div>
      </div>
    </div>
  );
}
