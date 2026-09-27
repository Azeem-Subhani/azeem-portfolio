"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";

const settle = [0.16, 1, 0.3, 1] as const;

/** Racing line draw-in, shared with the bridge deck so it joins on cue. */
const DRAW = { delay: 0.1, duration: 1.1 };

/** Seconds into a `settle` tween at which it reaches `progress` (0..1). */
function settleTimeAt(progress: number): number {
  const [x1, y1, x2, y2] = settle;
  const bez = (u: number, a: number, b: number) =>
    3 * (1 - u) ** 2 * u * a + 3 * (1 - u) * u ** 2 * b + u ** 3;
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (bez(mid, y1, y2) < progress) lo = mid;
    else hi = mid;
  }
  return bez((lo + hi) / 2, x1, x2);
}

/**
 * Two red cars running nose to tail. Lap time is the average; each car brakes
 * into corners and gets back on the throttle out of them.
 */
/** Car size relative to the base drawing, which is ~6.6 x 3.4 track units. */
const CAR_SCALE = 1.8;

const racers = [
  { lapSeconds: 13, offset: 0.1, tone: "text-error" },
  { lapSeconds: 13.4, offset: 0.065, tone: "text-error" },
] as const;

const pass: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.55 } },
};

const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: settle } },
};

/**
 * Drawing sizes in track units, tuned for a frame that renders ~1.3px per unit.
 * Each track is cropped to fill its frame, so the real scale varies by venue;
 * the map measures it and scales these sizes so every venue reads the same.
 */
const BASE = {
  /** Tarmac width. */
  road: 10,
  /** Hairline edge along both sides of the tarmac. */
  edge: 0.6,
  /** Clearance left on each side where one stretch of road passes under another. */
  gap: 1.6,
  /** Corner label size. */
  label: 6.6,
  /** Multiplier for everything else (racing line, ticks, offsets). */
  k: 1,
};
type Dims = typeof BASE;

/** On-screen pixels per BASE unit that the sizes above were tuned for. */
const TARGET_PX_PER_UNIT = 1.3;

function dimsFor(k: number): Dims {
  return {
    road: BASE.road * k,
    edge: BASE.edge * k,
    gap: BASE.gap * k,
    label: BASE.label * k,
    k,
  };
}

export type TrackCorner = {
  name: string;
  /** Rough position near the corner; the marker snaps to the closest point on the track. */
  x: number;
  y: number;
  anchor?: "start" | "end";
};

export type VenueTrack = {
  trackPath: string;
  viewBox: string;
  corners: TrackCorner[];
  watermark: string;
  meta: string;
  featurePath?: string;
  startFinish: { cx: number; cy: number; angleDeg: number };
};

/** Extra viewBox margin so the road edges aren't clipped at track extremes. */
function padViewBox(viewBox: string, pad = 10): string {
  const [x, y, w, h] = viewBox.split(/\s+/).map(Number);
  if ([x, y, w, h].some((n) => Number.isNaN(n))) return viewBox;
  return `${x - pad} ${y - pad} ${w + pad * 2} ${h + pad * 2}`;
}

export const venueTracks: Record<string, VenueTrack> = {
  ridgeline: {
    viewBox: "0 0 240 160",
    watermark: "Ridgeline",
    meta: "3.9 mi, 18 turns",
    featurePath:
      "M 92 96 C 108 88 128 96 132 112 C 136 128 118 140 100 136 C 82 132 78 104 92 96 Z",
    trackPath:
      "M 38 94 C 32 58 58 24 102 22 C 136 20 154 40 150 66 C 148 82 162 80 186 62 C 208 46 228 58 226 86 C 224 114 200 128 172 124 C 154 122 150 142 124 150 C 92 160 48 150 36 122 C 28 104 36 110 38 94 Z",
    corners: [
      { name: "North Loop", x: 86, y: 14 },
      { name: "Mushroom", x: 196, y: 48, anchor: "end" },
      { name: "South", x: 86, y: 148 },
    ],
    startFinish: { cx: 38, cy: 94, angleDeg: -55 },
  },
  coastal: {
    viewBox: "0 0 240 160",
    watermark: "Coastal",
    meta: "2.4 mi, 11 turns",
    featurePath:
      "M 78 78 C 96 70 112 86 108 106 C 104 124 80 128 68 114 C 56 100 60 86 78 78 Z",
    trackPath:
      "M 170 120 C 180 108 188 84 186 54 C 184 34 166 24 144 30 C 128 34 122 50 106 54 C 92 58 86 40 70 34 C 50 26 30 36 28 56 C 26 76 46 88 64 98 C 84 110 94 126 78 136 C 62 146 40 142 34 126 C 28 110 46 100 66 106 C 94 114 130 134 158 130 C 164 128 168 124 170 120 Z",
    corners: [
      { name: "Hairpin", x: 22, y: 42 },
      { name: "Sweeper", x: 18, y: 92 },
      { name: "T11", x: 22, y: 132 },
    ],
    startFinish: { cx: 170, cy: 120, angleDeg: -35 },
  },
  harbor: {
    viewBox: "0 0 240 160",
    watermark: "Harbor",
    meta: "1.8 mi, 13 turns",
    featurePath:
      "M 88 64 C 110 58 132 72 136 92 C 140 112 118 122 96 116 C 74 110 70 70 88 64 Z",
    trackPath:
      "M 46 34 L 46 118 C 46 140 74 154 104 144 C 126 136 136 118 156 112 C 184 104 210 116 220 92 C 230 68 220 40 194 30 C 176 22 160 38 140 34 C 114 28 96 14 72 18 C 56 22 46 26 46 34 Z",
    corners: [
      { name: "Turn 3", x: 186, y: 18, anchor: "end" },
      { name: "Half-mile", x: 10, y: 78 },
      { name: "Turn 9", x: 78, y: 8 },
    ],
    startFinish: { cx: 46, cy: 34, angleDeg: 85 },
  },
  summit: {
    viewBox: "0 0 240 160",
    watermark: "Summit",
    meta: "1.6 mi, 8 turns",
    featurePath:
      "M 78 78 C 110 70 148 78 156 98 C 164 118 128 128 96 124 C 64 120 52 86 78 78 Z",
    trackPath:
      "M 32 124 L 178 124 C 204 124 220 108 216 86 C 212 62 188 44 158 36 C 142 32 134 18 118 24 C 104 30 112 48 96 52 C 78 56 58 38 40 32 C 20 24 10 38 14 58 C 18 84 26 108 32 124 Z",
    corners: [
      { name: "Long Bend", x: 186, y: 70, anchor: "end" },
      { name: "Downhill", x: 148, y: 12, anchor: "end" },
      { name: "West Bend", x: 8, y: 28 },
    ],
    startFinish: { cx: 32, cy: 124, angleDeg: 5 },
  },
  desert: {
    viewBox: "0 0 240 160",
    watermark: "Desert",
    meta: "5.8 mi, 40 configs",
    featurePath:
      "M 48 118 C 62 110 78 118 80 132 C 82 146 62 152 50 144 C 38 136 36 126 48 118 Z",
    trackPath:
      "M 30 88 C 26 56 48 28 84 26 C 110 24 126 44 152 36 C 178 28 204 16 222 36 C 238 54 230 80 206 90 C 186 98 172 90 158 104 C 144 118 162 134 184 140 C 206 146 216 158 188 158 C 156 158 140 142 118 136 C 94 130 86 150 62 148 C 38 146 20 128 22 106 C 24 94 30 92 30 88 Z",
    corners: [
      { name: "The Basin", x: 18, y: 128 },
      { name: "The Chute", x: 168, y: 118, anchor: "end" },
      { name: "Thunder Alley", x: 118, y: 12 },
    ],
    startFinish: { cx: 30, cy: 88, angleDeg: -75 },
  },
};

type Point = { x: number; y: number };
type PlacedCorner = {
  name: string;
  tick: [Point, Point];
  label: Point;
  anchor: "start" | "middle" | "end";
};
type Bridge = {
  d: string;
  /** Distance along the lap where the deck starts and ends (may wrap). */
  from: number;
  to: number;
  /** Fraction of the lap at the crossing itself. */
  at: number;
};
type TrackGeometry = {
  /** Start line position and heading (degrees, direction of travel). */
  start: { x: number; y: number; angle: number };
  corners: PlacedCorner[];
  /** Short stretches of road that pass over another part of the circuit. */
  bridges: Bridge[];
  /** Evenly spaced samples along the racing line, and its length. */
  lap: Point[];
  total: number;
  /** Crop hugging the drawn track (and its labels), so the outline fills the frame. */
  viewBox: string;
  dims: Dims;
};

/** Unit normal at a sample index, flipped to point away from the track's centroid. */
function outwardNormal(pts: Point[], i: number, centroid: Point): Point {
  const a = pts[(i - 2 + pts.length) % pts.length];
  const b = pts[(i + 2) % pts.length];
  const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
  let nx = -(b.y - a.y) / len;
  let ny = (b.x - a.x) / len;
  const p = pts[i];
  if (nx * (p.x - centroid.x) + ny * (p.y - centroid.y) < 0) {
    nx = -nx;
    ny = -ny;
  }
  return { x: nx, y: ny };
}

function unitTangent(pts: Point[], i: number): Point {
  const a = pts[(i - 1 + pts.length) % pts.length];
  const b = pts[(i + 1) % pts.length];
  const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
  return { x: (b.x - a.x) / len, y: (b.y - a.y) / len };
}

/** Where segment ab meets segment cd, as a fraction along ab; null if they miss. */
function segmentHit(a: Point, b: Point, c: Point, d: Point): number | null {
  const rx = b.x - a.x;
  const ry = b.y - a.y;
  const sx = d.x - c.x;
  const sy = d.y - c.y;
  const denom = rx * sy - ry * sx;
  if (Math.abs(denom) < 1e-9) return null;
  const t = ((c.x - a.x) * sy - (c.y - a.y) * sx) / denom;
  const u = ((c.x - a.x) * ry - (c.y - a.y) * rx) / denom;
  return t >= 0 && t <= 1 && u >= 0 && u <= 1 ? t : null;
}

/**
 * Finds each place the circuit crosses itself and returns the stretch of road
 * that goes over, long enough to clear the road underneath plus its gap.
 */
function findBridges(
  path: SVGPathElement,
  pts: Point[],
  total: number,
  { road, gap, k }: Dims,
): Bridge[] {
  const n = pts.length;
  const step = total / n;
  const bridges: Bridge[] = [];

  for (let i = 0; i < n; i++) {
    // Skip neighbors: adjacent samples always "touch".
    for (let j = i + 8; j < n; j++) {
      if (i === 0 && j > n - 8) continue;
      const t = segmentHit(pts[j], pts[(j + 1) % n], pts[i], pts[(i + 1) % n]);
      if (t === null) continue;

      // The later pass goes over. How much of it the bridge needs depends on
      // how shallow the crossing is: a glancing angle needs a longer deck.
      const over = unitTangent(pts, j);
      const under = unitTangent(pts, i);
      const cos = Math.abs(over.x * under.x + over.y * under.y);
      const sin = Math.max(Math.sqrt(1 - cos * cos), 0.25);
      const half = (road / 2 + (road / 2 + gap) * cos) / sin + k;

      const at = (j + t) * step;
      const samples = 24;
      const d = Array.from({ length: samples + 1 }, (_, k) => {
        const len = (at - half + (2 * half * k) / samples + total) % total;
        const p = path.getPointAtLength(len);
        return `${k === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
      }).join(" ");
      bridges.push({ d, from: at - half, to: at + half, at: at / total });
    }
  }
  return bridges;
}

/**
 * Measures the rendered track so the start line sits across the tarmac, each
 * corner label hangs off its own apex, and crossovers get a proper bridge.
 */
function useTrackGeometry(track: VenueTrack, withLabels: boolean) {
  const pathRef = useRef<SVGPathElement>(null);
  const [geometry, setGeometry] = useState<TrackGeometry | null>(null);

  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path || typeof path.getTotalLength !== "function") return;

    let pts: Point[];
    let total: number;
    try {
      total = path.getTotalLength();
      if (total < 20) return;
      const steps = 360;
      pts = Array.from({ length: steps }, (_, i) => {
        const p = path.getPointAtLength((i / steps) * total);
        return { x: p.x, y: p.y };
      });
    } catch {
      return;
    }

    const centroid = pts.reduce(
      (acc, p) => ({
        x: acc.x + p.x / pts.length,
        y: acc.y + p.y / pts.length,
      }),
      { x: 0, y: 0 },
    );

    const heading = unitTangent(pts, 0);
    const start = {
      x: pts[0].x,
      y: pts[0].y,
      angle: (Math.atan2(heading.y, heading.x) * 180) / Math.PI,
    };

    /** Places labels for a set of sizes and crops the frame around the result. */
    const layout = (dims: Dims) => {
      const { k, label: size } = dims;
      const edge = dims.road / 2 + dims.edge;
      const corners = track.corners.map((corner): PlacedCorner => {
        let best = 0;
        let bestDist = Infinity;
        pts.forEach((p, i) => {
          const d = (p.x - corner.x) ** 2 + (p.y - corner.y) ** 2;
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        const on = pts[best];
        const n = outwardNormal(pts, best, centroid);
        const anchor = n.x > 0.35 ? "start" : n.x < -0.35 ? "end" : "middle";
        const out = edge + 7 * k;
        return {
          name: corner.name,
          tick: [
            { x: on.x + n.x * (edge + 1.2 * k), y: on.y + n.y * (edge + 1.2 * k) },
            { x: on.x + n.x * (edge + 4.6 * k), y: on.y + n.y * (edge + 4.6 * k) },
          ],
          // Nudge the baseline so caps center on the tick's end.
          label: {
            x: on.x + n.x * out,
            y:
              on.y +
              n.y * out +
              size * 0.36 +
              (anchor === "middle" ? n.y * size * 0.4 : 0),
          },
          anchor,
        };
      });

      // Fit the crop to what is actually drawn: the tarmac band, plus label
      // text (uppercase with tracking, ~0.8em per glyph) when shown.
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
      const grow = (x: number, y: number) => {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      };
      pts.forEach((p) => grow(p.x, p.y));
      if (withLabels) {
        corners.forEach(({ label, anchor, name }) => {
          const width = name.length * size * 0.8;
          const left =
            anchor === "start"
              ? label.x
              : anchor === "end"
                ? label.x - width
                : label.x - width / 2;
          grow(left, label.y - size);
          grow(left + width, label.y + 2 * k);
        });
      }
      const pad = 6 * k;
      const box = [minX - pad, minY - pad, maxX - minX + pad * 2, maxY - minY + pad * 2];
      return { corners, box };
    };

    const measure = () => {
      let dims = BASE;
      let placed = layout(dims);
      // The crop depends on the sizes and the sizes on the crop's scale, so
      // settle them over two passes. Compact thumbnails keep the base sizes.
      const frame = path.ownerSVGElement?.getBoundingClientRect();
      if (withLabels && frame && frame.width > 0 && frame.height > 0) {
        for (let pass = 0; pass < 2; pass++) {
          const [, , w, h] = placed.box;
          const pxPerUnit = Math.min(frame.width / w, frame.height / h);
          dims = dimsFor(TARGET_PX_PER_UNIT / pxPerUnit);
          placed = layout(dims);
        }
      }

      let bridges: Bridge[];
      try {
        bridges = findBridges(path, pts, total, dims);
      } catch {
        bridges = [];
      }

      setGeometry({
        start,
        corners: placed.corners,
        bridges,
        lap: pts,
        total,
        viewBox: placed.box.map((n) => Math.round(n * 10) / 10).join(" "),
        dims,
      });
    };

    measure();

    // Re-fit when the frame changes size (breakpoints, container resizes).
    const svg = path.ownerSVGElement;
    if (!svg || typeof ResizeObserver === "undefined") return;
    let frameId = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(measure);
    });
    observer.observe(svg);
    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [track, withLabels]);

  return { pathRef, geometry };
}

/**
 * Drives the cars round the lap. Speed follows the track: a car slows in
 * proportion to how tight the bend is, so corners read as corners.
 */
function useRacers(
  geometry: TrackGeometry | null,
  reduced: boolean,
  lowCars: RefObject<(SVGGElement | null)[]>,
  highCars: RefObject<(SVGGElement | null)[]>,
) {
  useEffect(() => {
    if (!geometry) return;
    const { lap: pts, total, bridges } = geometry;
    const n = pts.length;
    if (n < 8) return;
    const step = total / n;

    // Curvature per sample (radians per unit length), smoothed so the car
    // brakes before the apex instead of snapping to a new speed.
    const heading = pts.map((_, i) => {
      const t = unitTangent(pts, i);
      return Math.atan2(t.y, t.x);
    });
    const bend = heading.map((h, i) => {
      let d = heading[(i + 1) % n] - h;
      d = Math.atan2(Math.sin(d), Math.cos(d));
      return Math.abs(d) / step;
    });
    const span = 8;
    const speed = bend.map((_, i) => {
      let sum = 0;
      for (let o = -span; o <= span; o++) sum += bend[(i + o + n) % n];
      return 1 / (1 + 10 * (sum / (span * 2 + 1)));
    });

    // Cumulative time to reach each sample, normalized to one lap = 1.
    const clock = [0];
    for (let i = 0; i < n; i++) clock.push(clock[i] + 1 / speed[i]);
    const lapTime = clock[n];
    for (let i = 0; i <= n; i++) clock[i] /= lapTime;

    const onDeck = (distance: number) =>
      bridges.some(({ from, to }) => {
        const inside = (d: number) => d >= from && d <= to;
        return inside(distance) || inside(distance + total) || inside(distance - total);
      });

    const place = (i: number, phase: number) => {
      const u = ((phase % 1) + 1) % 1;
      let lo = 0;
      let hi = n;
      while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (clock[mid] <= u) lo = mid;
        else hi = mid;
      }
      const f = (u - clock[lo]) / (clock[lo + 1] - clock[lo] || 1);
      const a = pts[lo];
      const b = pts[(lo + 1) % n];
      const x = a.x + (b.x - a.x) * f;
      const y = a.y + (b.y - a.y) * f;
      const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
      const high = onDeck((lo + f) * step);
      const transform = `translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${angle.toFixed(1)})`;
      for (const [el, visible] of [
        [lowCars.current[i], !high],
        [highCars.current[i], high],
      ] as const) {
        if (!el) continue;
        el.setAttribute("transform", transform);
        el.setAttribute("visibility", visible ? "visible" : "hidden");
      }
    };

    if (reduced) {
      racers.forEach((racer, i) => place(i, racer.offset));
      return;
    }

    const origin = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const seconds = (now - origin) / 1000;
      racers.forEach((racer, i) => place(i, racer.offset + seconds / racer.lapSeconds));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [geometry, reduced, lowCars, highCars]);
}

export function VenueTrackMap({
  trackId,
  reduced,
  compact = false,
  ink = "text-accent",
  className = "h-36 sm:h-40",
}: {
  trackId: string;
  reduced: boolean;
  compact?: boolean;
  /** Text color class for the racing line, so each venue skin owns its map. */
  ink?: string;
  className?: string;
}) {
  const track = venueTracks[trackId] ?? venueTracks.coastal;
  const viewBox = padViewBox(track.viewBox);

  return (
    <div className={`relative w-full overflow-visible ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={trackId}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <TrackDrawing
            track={track}
            viewBox={viewBox}
            reduced={reduced}
            compact={compact}
            ink={ink}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/** A solid line across the tarmac, edge to edge, square to the direction of travel. */
function StartLine({
  start: { x, y, angle },
  dims: { road, edge, k },
}: {
  start: TrackGeometry["start"];
  dims: Dims;
}) {
  const width = road - edge * 2;
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <rect x={-0.8 * k} y={-width / 2} width={1.6 * k} height={width} fill="currentColor" />
    </g>
  );
}

/**
 * A top-down open-wheel car, nose along +x, about 6.6 x 3.4 track units.
 * Body in the racer's tone, a livery stripe in the venue's ink, dark tyres.
 */
function RaceCar({ tone, ink }: { tone: string; ink: string }) {
  const tyre = "rgb(0 0 0 / 0.72)";
  return (
    <>
      {/* Tyres sit outboard of the body, front pair narrower than the rear. */}
      {[
        { x: 1.55, w: 1.05, h: 0.7, y: 1.2 },
        { x: -2.05, w: 1.25, h: 0.82, y: 1.22 },
      ].map(({ x, w, h, y }) =>
        [-1, 1].map((side) => (
          <rect
            key={`${x}-${side}`}
            x={x - w / 2}
            y={side * y - h / 2}
            width={w}
            height={h}
            rx={0.2}
            fill={tyre}
          />
        )),
      )}
      <g className={tone} fill="currentColor">
        {/* Front and rear wings. */}
        <rect x={2.75} y={-1.55} width={0.55} height={3.1} rx={0.15} />
        <rect x={-3.3} y={-1.4} width={0.6} height={2.8} rx={0.15} />
        {/* Nose, sidepods, and engine cover. */}
        <path
          d="M 3 -0.3 L 1.1 -0.55 L 0.5 -1.05 L -1.25 -1.05 L -2.7 -0.55 L -2.7 0.55 L -1.25 1.05 L 0.5 1.05 L 1.1 0.55 L 3 0.3 Z"
          strokeLinejoin="round"
          stroke="currentColor"
          strokeWidth={0.2}
        />
      </g>
      {/* Livery stripe, so each venue's cars wear its color. */}
      <rect x={-2.6} y={-0.17} width={5.4} height={0.34} className={ink} fill="currentColor" />
      {/* Cockpit opening. */}
      <ellipse cx={-0.15} cy={0} rx={0.6} ry={0.42} fill={tyre} />
    </>
  );
}

const BIG = { x: "-1000", y: "-1000", width: "3000", height: "3000" } as const;

function TrackDrawing({
  track,
  viewBox,
  reduced,
  compact,
  ink,
}: {
  track: VenueTrack;
  viewBox: string;
  reduced: boolean;
  compact: boolean;
  ink: string;
}) {
  const { pathRef, geometry } = useTrackGeometry(track, !compact);
  // Measured in a layout effect, so the fitted crop lands before first paint.
  const fitted = geometry?.viewBox ?? viewBox;
  const bridges = geometry?.bridges ?? [];
  const decks = bridges.map((b) => b.d);
  const lowCars = useRef<(SVGGElement | null)[]>([]);
  const highCars = useRef<(SVGGElement | null)[]>([]);
  useRacers(geometry, reduced, lowCars, highCars);
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const cutMask = `${id}-cut`;
  const edgeMask = `${id}-edge`;
  const deckMask = `${id}-deck`;
  const { road, edge, gap, label, k } = geometry?.dims ?? BASE;
  const racingWidth = (compact ? 1.8 : 1.2) * k;

  // Drawn like a road map: the circuit is laid down once, each bridge cuts a
  // clean gap through everything beneath it, then its deck goes on top.
  const strokes = (
    paths: string[],
    width: number,
    color: "white" | "black",
    cap: "butt" | "round" = "butt",
  ) =>
    paths.map((d, i) => (
      <path
        key={`${width}-${color}-${i}`}
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap={cap}
        strokeLinejoin="round"
      />
    ));

  // Each car is drawn twice: once under the bridges, once over them. The
  // animation shows whichever copy matches the car's place on the lap.
  const cars = (refs: typeof lowCars) => (
    <motion.g
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: DRAW.delay + DRAW.duration }}
    >
      {racers.map((racer, i) => (
        <g
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          visibility="hidden"
        >
          <g transform={`scale(${k * CAR_SCALE})`}>
            <RaceCar tone={racer.tone} ink={ink} />
          </g>
        </g>
      ))}
    </motion.g>
  );

  const appear = reduced
    ? { initial: false as const }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.4, ease: settle },
      };

  return (
    <motion.svg
      viewBox={fitted}
      className="h-full w-full overflow-visible"
      aria-hidden="true"
      initial={reduced ? false : "hidden"}
      animate="visible"
      variants={pass}
    >
      <defs>
        <mask id={cutMask} maskUnits="userSpaceOnUse" {...BIG}>
          <rect {...BIG} fill="white" />
          {strokes(decks, road + gap * 2, "black")}
        </mask>
        <mask id={edgeMask} maskUnits="userSpaceOnUse" {...BIG}>
          {strokes([track.trackPath], road, "white")}
          {strokes([track.trackPath], road - edge * 2, "black")}
        </mask>
        <mask id={deckMask} maskUnits="userSpaceOnUse" {...BIG}>
          {strokes(decks, road, "white")}
          {strokes(decks, road - edge * 2, "black")}
        </mask>
      </defs>

      {/* Measurement only: the geometry hook samples this path. */}
      <path ref={pathRef} d={track.trackPath} fill="none" stroke="none" />

      <g mask={bridges.length ? `url(#${cutMask})` : undefined}>
        <motion.g {...appear} className="text-foreground">
          {/* Tarmac: a faint surface inside hairline edges. */}
          <path
            d={track.trackPath}
            fill="none"
            stroke="currentColor"
            strokeWidth={road}
            strokeLinejoin="round"
            opacity={0.06}
          />
          {!compact ? (
            <rect {...BIG} mask={`url(#${edgeMask})`} fill="currentColor" opacity={0.26} />
          ) : null}
        </motion.g>

        {/* Racing line: the one venue-colored mark, drawn once per venue. */}
        <motion.path
          d={track.trackPath}
          className={ink}
          fill="none"
          stroke="currentColor"
          strokeWidth={racingWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={
            reduced ? { duration: 0 } : { ...DRAW, ease: settle }
          }
        />

        {cars(lowCars)}
      </g>

      {bridges.length ? (
        <>
          {/* The deck lands with the rest of the road, so there's never a hole. */}
          <motion.g {...appear} className="text-foreground">
            {decks.map((d, i) => (
              <path
                key={i}
                d={d}
                fill="none"
                stroke="currentColor"
                strokeWidth={road}
                opacity={0.06}
              />
            ))}
            {!compact ? (
              <rect {...BIG} mask={`url(#${deckMask})`} fill="currentColor" opacity={0.26} />
            ) : null}
          </motion.g>
          {/* Its stretch of racing line appears as the draw-in reaches it. */}
          {bridges.map((b, i) => (
            <motion.path
              key={i}
              d={b.d}
              className={ink}
              fill="none"
              stroke="currentColor"
              strokeWidth={racingWidth}
              strokeLinejoin="round"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.08,
                delay: DRAW.delay + DRAW.duration * settleTimeAt(b.at),
              }}
            />
          ))}
          {cars(highCars)}
        </>
      ) : null}

      {geometry ? (
        <motion.g variants={reduced ? undefined : fade} className="text-foreground">
          <StartLine start={geometry.start} dims={geometry.dims} />
        </motion.g>
      ) : null}

      {geometry && !compact
        ? geometry.corners.map((corner) => (
            <motion.g key={corner.name} variants={reduced ? undefined : fade}>
              <line
                x1={corner.tick[0].x}
                y1={corner.tick[0].y}
                x2={corner.tick[1].x}
                y2={corner.tick[1].y}
                stroke="currentColor"
                className="text-muted-foreground"
                strokeWidth={0.6 * k}
                opacity="0.7"
              />
              <text
                x={corner.label.x}
                y={corner.label.y}
                fill="currentColor"
                className="text-muted-foreground"
                fontSize={label}
                fontWeight={600}
                letterSpacing="0.14em"
                textAnchor={corner.anchor}
                fontFamily="var(--font-sans), ui-sans-serif, system-ui, sans-serif"
                style={{ textTransform: "uppercase" }}
              >
                {corner.name}
              </text>
            </motion.g>
          ))
        : null}
    </motion.svg>
  );
}
