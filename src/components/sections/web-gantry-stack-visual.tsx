"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

import {
  VenueBrowserVisual,
  venueManualPauseMs,
} from "@/components/mockups/web-mock-2";
import {
  allLights,
  gantryGreenAtMs,
  gantryGreenHoldMs,
  GantryLights,
  GantryPosts,
  highlightLights,
  runGantryStartSequence,
  terminalLagMs,
  venues,
  type LightState,
} from "@/components/mockups/web-r2-mock-5";
import { useInViewOnce } from "@/hooks/use-in-view-once";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

export function WebGantryStackVisual() {
  const reduced = usePrefersReducedMotion();
  const { ref: rootRef, inView } = useInViewOnce<HTMLDivElement>();
  const pauseResumeRef = useRef<number | null>(null);
  const [lightStates, setLightStates] = useState<LightState[]>(
    reduced ? venues.map(() => "green" as const) : venues.map(() => "idle" as const),
  );
  const [bodyPlay, setBodyPlay] = useState(reduced);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cyclePaused, setCyclePaused] = useState(false);
  /** Flips on once the green has been read; until then every light stays green. */
  const [cycleLive, setCycleLive] = useState(reduced);

  useEffect(() => {
    if (!inView || reduced) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const clearAll = () => timers.forEach(clearTimeout);

    timers.push(...runGantryStartSequence(setLightStates));

    timers.push(
      setTimeout(() => setBodyPlay(true), gantryGreenAtMs + terminalLagMs),
    );
    timers.push(
      setTimeout(() => setCycleLive(true), gantryGreenAtMs + gantryGreenHoldMs),
    );

    return clearAll;
  }, [inView, reduced]);

  useEffect(
    () => () => {
      if (pauseResumeRef.current) window.clearTimeout(pauseResumeRef.current);
    },
    [],
  );

  const handleVenuePick = useCallback((index: number) => {
    setActiveIndex(index);
    setCyclePaused(true);
    if (pauseResumeRef.current) window.clearTimeout(pauseResumeRef.current);
    pauseResumeRef.current = window.setTimeout(() => {
      setCyclePaused(false);
      pauseResumeRef.current = null;
    }, venueManualPauseMs);
  }, []);

  const lightsLive = reduced || bodyPlay || cycleLive;
  const highlightMode = cycleLive && !reduced;
  const displayStates = reduced
    ? allLights("green")
    : highlightMode
      ? highlightLights(activeIndex)
      : lightStates;

  return (
    <div
      ref={rootRef}
      className="relative mx-auto w-full max-w-[26rem] sm:max-w-[30rem] md:max-w-[34rem]"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[30%] h-64 w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        animate={{
          opacity: lightsLive ? 0.5 : 0.18,
          scale: lightsLive ? 1.04 : 0.94,
        }}
        transition={{ duration: 0.55, ease: settle }}
        style={{ background: "color-mix(in srgb, var(--accent) 26%, transparent)" }}
      />

      <div
        className="relative overflow-hidden rounded-[1.5rem] border border-border/60 bg-background shadow-[0_28px_56px_-28px_rgb(var(--shadow-color)/0.45)]"
      >
        <div className="relative overflow-visible bg-gradient-to-b from-surface/35 via-surface/10 to-background px-4 pb-2 pt-4 sm:px-5 sm:pb-2.5 sm:pt-5">
          <GantryLights
            states={displayStates}
            activeIndex={cycleLive || reduced ? activeIndex : null}
            onSelect={handleVenuePick}
            interactive={cycleLive || reduced}
          />
          <GantryPosts />
        </div>

        <motion.div
          className="relative px-3 pb-4 pt-1 sm:px-4 sm:pb-5"
          initial={false}
          animate={{
            opacity: bodyPlay ? 1 : 0,
            y: bodyPlay ? 0 : 10,
          }}
          transition={{ duration: 0.55, ease: settle }}
        >
          <VenueBrowserVisual
            reduced={reduced}
            embedded
            play={bodyPlay}
            activeIndex={activeIndex}
            onActiveChange={setActiveIndex}
            cyclePaused={cyclePaused}
            onVenuePick={handleVenuePick}
          />
        </motion.div>
      </div>
    </div>
  );
}
