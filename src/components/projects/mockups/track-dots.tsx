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
}: {
  reduced: boolean;
  laps: readonly DotLap[];
  trackPath: string;
  viewBox: string;
}) {
  const rootRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const path = root.querySelector("[data-track]");
    const dots = [...root.querySelectorAll<SVGCircleElement>("[data-dot]")];
    if (
      !path ||
      typeof (path as SVGPathElement).getTotalLength !== "function" ||
      dots.length === 0
    ) {
      return;
    }

    const trackPath = path as SVGPathElement;
    let pts: TrackSample[];
    try {
      if (trackPath.getTotalLength() < 20) return;
      pts = sampleTrack(trackPath);
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
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
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

function CheckeredStartFinish({
  cx,
  cy,
  lineAngleDeg,
  halfLength,
  cellSize = 3.4,
  rows = 2,
  skewDeg = -24,
}: {
  cx: number;
  cy: number;
  lineAngleDeg: number;
  halfLength: number;
  cellSize?: number;
  rows?: number;
  skewDeg?: number;
}) {
  const cols = Math.max(4, Math.ceil((halfLength * 2) / cellSize));
  const bandWidth = cols * cellSize;
  const bandHeight = rows * cellSize;
  const startX = -bandWidth / 2;
  const startY = -bandHeight / 2;

  return (
    <g
      transform={`translate(${cx} ${cy}) rotate(${lineAngleDeg}) skewX(${skewDeg})`}
      aria-hidden="true"
    >
      <rect
        x={startX}
        y={startY}
        width={bandWidth}
        height={bandHeight}
        fill="#ffffff"
        stroke="rgb(0 0 0 / 0.45)"
        strokeWidth={0.4}
      />
      {Array.from({ length: rows }, (_, row) =>
        Array.from({ length: cols }, (_, col) => {
          const dark = (col + row) % 2 === 1;
          if (!dark) return null;
          return (
            <rect
              key={`${row}-${col}`}
              x={startX + col * cellSize}
              y={startY + row * cellSize}
              width={cellSize}
              height={cellSize}
              fill="#111111"
            />
          );
        }),
      )}
    </g>
  );
}

export function StartFinishFromPoint({
  cx,
  cy,
  angleDeg,
  length = 10,
}: {
  cx: number;
  cy: number;
  angleDeg: number;
  length?: number;
}) {
  return (
    <CheckeredStartFinish
      cx={cx}
      cy={cy}
      lineAngleDeg={angleDeg + 90}
      halfLength={length}
      cellSize={3.4}
      rows={2}
      skewDeg={-24}
    />
  );
}
