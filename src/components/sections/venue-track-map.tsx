"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";

import { TrackDots, type DotLap } from "@/components/sections/track-dots";

const settle = [0.16, 1, 0.3, 1] as const;

const pass: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.55 } },
};

const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: settle } },
};

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

// One car on track reads as "live session"; two neon dots read as a toy.
const venueDotLaps: readonly DotLap[] = [
  { fill: "currentColor", durationMs: 16000, offset: 0.08, r: 3 },
];

/** Extra viewBox margin so dots and stroke aren't clipped at track extremes. */
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
  on: Point;
  tick: [Point, Point];
  label: Point;
  anchor: "start" | "middle" | "end";
};
type TrackGeometry = {
  startLine: [Point, Point];
  corners: PlacedCorner[];
  /** Crop hugging the drawn track (and its labels), so the outline fills the frame. */
  viewBox: string;
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

/**
 * Measures the rendered track so the start line sits across the tarmac and each
 * corner label hangs off its own apex instead of floating in the margin.
 */
function useTrackGeometry(track: VenueTrack, withLabels: boolean) {
  const pathRef = useRef<SVGPathElement>(null);
  const [geometry, setGeometry] = useState<TrackGeometry | null>(null);

  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path || typeof path.getTotalLength !== "function") return;

    let pts: Point[];
    try {
      const total = path.getTotalLength();
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

    const start = pts[0];
    const startN = outwardNormal(pts, 0, centroid);
    const startLine: [Point, Point] = [
      { x: start.x - startN.x * 6, y: start.y - startN.y * 6 },
      { x: start.x + startN.x * 6, y: start.y + startN.y * 6 },
    ];

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
      return {
        name: corner.name,
        on,
        tick: [
          { x: on.x + n.x * 4.5, y: on.y + n.y * 4.5 },
          { x: on.x + n.x * 10, y: on.y + n.y * 10 },
        ],
        // Nudge the baseline so text centers on the leader line's end.
        label: {
          x: on.x + n.x * 13,
          y: on.y + n.y * 13 + 3.2 + (anchor === "middle" ? n.y * 3.5 : 0),
        },
        anchor,
      };
    });

    // Fit the crop to what is actually drawn: the tarmac band, plus label text
    // (estimated at ~0.52em per glyph) when labels are shown.
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
        const width = name.length * 9 * 0.52;
        const left =
          anchor === "start"
            ? label.x
            : anchor === "end"
              ? label.x - width
              : label.x - width / 2;
        grow(left, label.y - 8);
        grow(left + width, label.y + 2);
      });
    }
    const pad = 6;
    const viewBox = [
      minX - pad,
      minY - pad,
      maxX - minX + pad * 2,
      maxY - minY + pad * 2,
    ]
      .map((n) => Math.round(n * 10) / 10)
      .join(" ");

    setGeometry({ startLine, corners, viewBox });
  }, [track, withLabels]);

  return { pathRef, geometry };
}

export function VenueTrackMap({
  trackId,
  reduced,
  compact = false,
  className = "h-36 sm:h-40",
}: {
  trackId: string;
  reduced: boolean;
  compact?: boolean;
  className?: string;
}) {
  const track = venueTracks[trackId] ?? venueTracks.coastal;
  const viewBox = padViewBox(track.viewBox);

  return (
    <div
      className={`relative w-full overflow-visible text-accent-ink ${className}`}
    >
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
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function TrackDrawing({
  track,
  viewBox,
  reduced,
  compact,
}: {
  track: VenueTrack;
  viewBox: string;
  reduced: boolean;
  compact: boolean;
}) {
  const { pathRef, geometry } = useTrackGeometry(track, !compact);
  // Measured in a layout effect, so the fitted crop lands before first paint.
  const fitted = geometry?.viewBox ?? viewBox;

  return (
    <>
      <motion.svg
        viewBox={fitted}
        className="h-full w-full overflow-visible"
        aria-hidden="true"
        initial={reduced ? false : "hidden"}
        animate="visible"
        variants={pass}
      >
        {/* Tarmac: a quiet neutral band under the racing line. */}
        <path
          ref={pathRef}
          d={track.trackPath}
          fill="none"
          stroke="currentColor"
          className="text-foreground"
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.09"
        />
        <motion.path
          d={track.trackPath}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={
            reduced ? { duration: 0 } : { duration: 0.9, ease: settle }
          }
        />

        {geometry ? (
          <motion.line
            variants={reduced ? undefined : fade}
            x1={geometry.startLine[0].x}
            y1={geometry.startLine[0].y}
            x2={geometry.startLine[1].x}
            y2={geometry.startLine[1].y}
            stroke="currentColor"
            className="text-foreground"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
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
                  strokeWidth="0.7"
                  opacity="0.6"
                />
                <circle
                  cx={corner.on.x}
                  cy={corner.on.y}
                  r="1.9"
                  style={{ fill: "var(--background)" }}
                  stroke="currentColor"
                  className="text-foreground"
                  strokeWidth="1"
                />
                <text
                  x={corner.label.x}
                  y={corner.label.y}
                  fill="currentColor"
                  className="text-muted-foreground"
                  fontSize="9"
                  letterSpacing="0.02em"
                  textAnchor={corner.anchor}
                  fontFamily="var(--font-sans), ui-sans-serif, system-ui, sans-serif"
                >
                  {corner.name}
                </text>
              </motion.g>
            ))
          : null}
      </motion.svg>
      <TrackDots
        reduced={reduced}
        laps={venueDotLaps}
        trackPath={track.trackPath}
        viewBox={fitted}
      />
    </>
  );
}
