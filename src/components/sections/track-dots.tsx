"use client";

import { useLayoutEffect, useRef } from "react";

type TrackSample = { x: number; y: number };

function sampleTrack(path: SVGPathElement, steps = 720) {
  const len = path.getTotalLength();
  const pts: TrackSample[] = [];

  for (let i = 0; i < steps; i++) {
    const d = (i / steps) * len;
    const p = path.getPointAtLength(d);
    pts.push({ x: p.x, y: p.y });
  }

  const first = pts[0];
  const last = pts[pts.length - 1];
  if (first && last) {
    pts.push({ x: first.x, y: first.y });
  }

  return pts;
}

function poseAt(pts: TrackSample[], t: number) {
  const n = pts.length - 1;
  if (n < 1) return { x: 0, y: 0 };
  const u = ((t % 1) + 1) % 1;
  const scaled = u * n;
  const i = Math.min(Math.floor(scaled), n - 1);
  const f = scaled - i;
  const a = pts[i];
  const b = pts[i + 1] ?? pts[0];
  return {
    x: a.x + (b.x - a.x) * f,
    y: a.y + (b.y - a.y) * f,
  };
}

export type DotLap = {
  fill: string;
  durationMs: number;
  offset: number;
  r: number;
  stroke?: string;
};

export function TrackDots({
  reduced,
  laps,
  trackPath,
  viewBox,
  className,
}: {
  reduced: boolean;
  laps: readonly DotLap[];
  trackPath: string;
  viewBox: string;
  className?: string;
}) {
  const rootRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const path = root.querySelector("[data-track]");
    const dots = [...root.querySelectorAll<SVGCircleElement>("[data-dot]")];
    if (!(path instanceof SVGPathElement) || dots.length === 0) return;

    let pts: TrackSample[];
    try {
      if (path.getTotalLength() < 20) return;
      pts = sampleTrack(path);
    } catch {
      return;
    }
    if (pts.length < 2) return;

    const placeDot = (el: SVGCircleElement, offset: number) => {
      const pose = poseAt(pts, offset);
      el.setAttribute("cx", String(pose.x));
      el.setAttribute("cy", String(pose.y));
    };

    if (reduced) {
      dots.forEach((el, index) => {
        placeDot(el, laps[index]?.offset ?? 0);
      });
      return;
    }

    const runners = dots.map((el, index) => {
      const lap = laps[index] ?? laps[0];
      placeDot(el, lap.offset);
      return {
        el,
        durationMs: lap.durationMs,
        offset: lap.offset,
        origin: performance.now(),
      };
    });

    let cancelled = false;
    const tick = (now: number) => {
      if (cancelled) return;
      try {
        for (const dot of runners) {
          const pose = poseAt(
            pts,
            (now - dot.origin) / dot.durationMs + dot.offset,
          );
          dot.el.setAttribute("cx", String(pose.x));
          dot.el.setAttribute("cy", String(pose.y));
        }
      } catch {
        /* unmount */
      }
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    return () => {
      cancelled = true;
    };
  }, [reduced, laps, trackPath]);

  return (
    <svg
      ref={rootRef}
      viewBox={viewBox}
      className={className ?? "pointer-events-none absolute inset-0 h-full w-full overflow-visible"}
      aria-hidden="true"
    >
      <path data-track d={trackPath} fill="none" stroke="none" />
      {laps.map((lap, index) => (
        <circle
          key={index}
          data-dot
          r={lap.r}
          fill={lap.fill}
          stroke={lap.stroke ?? "rgb(255 255 255 / 0.9)"}
          strokeWidth={1.4}
        />
      ))}
    </svg>
  );
}
