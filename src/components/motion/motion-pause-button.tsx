"use client";

import { Pause, Play } from "lucide-react";

import { setMotionPaused, useMotionPaused } from "@/hooks/use-motion-paused";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

/**
 * Visible pause for looping page motion (WCAG 2.2.2); hover-to-pause never reaches
 * keyboard or touch. Hidden for reduced-motion visitors, whose loops never start.
 */
export function MotionPauseButton({ className }: { className?: string }) {
  const paused = useMotionPaused();
  const reduced = usePrefersReducedMotion();
  if (reduced) return null;

  const Icon = paused ? Play : Pause;
  return (
    <button
      type="button"
      aria-pressed={paused}
      onClick={() => setMotionPaused(!paused)}
      className={cn(
        "inline-flex min-h-8 items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground",
        className,
      )}
    >
      <Icon aria-hidden="true" className="size-3.5" />
      {paused ? "Play animations" : "Pause animations"}
    </button>
  );
}
