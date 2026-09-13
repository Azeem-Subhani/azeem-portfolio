"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";

import {
  StartFinishFromPoint,
  TrackDots,
  type DotLap,
} from "@/components/sections/track-dots";

const settle = [0.16, 1, 0.3, 1] as const;

const pass: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
};

const pop: Variants = {
  hidden: { opacity: 0, scale: 0.86 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 18 },
  },
};

export type TrackCorner = {
  name: string;
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

const venueDotLaps: readonly DotLap[] = [
  { fill: "#00ff5c", durationMs: 14000, offset: 0, r: 4.2 },
  { fill: "#ff453a", durationMs: 17000, offset: 0.42, r: 3.8 },
];

/** Extra viewBox margin so dots and stroke aren't clipped at track extremes. */
function padViewBox(viewBox: string, pad = 10): string {
  const [x, y, w, h] = viewBox.split(/\s+/).map(Number);
  if ([x, y, w, h].some((n) => Number.isNaN(n))) return viewBox;
  return `${x - pad} ${y - pad} ${w + pad * 2} ${h + pad * 2}`;
}

export const venueTracks: Record<string, VenueTrack> = {
  monticello: {
    viewBox: "0 0 240 160",
    watermark: "Monticello",
    meta: "4.1 mi, 20 turns",
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
  sonoma: {
    viewBox: "0 0 240 160",
    watermark: "Sonoma",
    meta: "2.52 mi, 12 turns",
    featurePath:
      "M 78 78 C 96 70 112 86 108 106 C 104 124 80 128 68 114 C 56 100 60 86 78 78 Z",
    trackPath:
      "M 170 120 C 180 108 188 84 186 54 C 184 34 166 24 144 30 C 128 34 122 50 106 54 C 92 58 86 40 70 34 C 50 26 30 36 28 56 C 26 76 46 88 64 98 C 84 110 94 126 78 136 C 62 146 40 142 34 126 C 28 110 46 100 66 106 C 94 114 130 134 158 130 C 164 128 168 124 170 120 Z",
    corners: [
      { name: "Hairpin", x: 22, y: 42 },
      { name: "Carousel", x: 18, y: 92 },
      { name: "T11", x: 22, y: 132 },
    ],
    startFinish: { cx: 170, cy: 120, angleDeg: -35 },
  },
  enclave: {
    viewBox: "0 0 240 160",
    watermark: "Enclave",
    meta: "1.72 mi, 14 turns",
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
  skip: {
    viewBox: "0 0 240 160",
    watermark: "Skip",
    meta: "1.53 mi, 7 turns",
    featurePath:
      "M 78 78 C 110 70 148 78 156 98 C 164 118 128 128 96 124 C 64 120 52 86 78 78 Z",
    trackPath:
      "M 32 124 L 178 124 C 204 124 220 108 216 86 C 212 62 188 44 158 36 C 142 32 134 18 118 24 C 104 30 112 48 96 52 C 78 56 58 38 40 32 C 20 24 10 38 14 58 C 18 84 26 108 32 124 Z",
    corners: [
      { name: "Big Bend", x: 186, y: 70, anchor: "end" },
      { name: "Downhill", x: 148, y: 12, anchor: "end" },
      { name: "West Bend", x: 8, y: 28 },
    ],
    startFinish: { cx: 32, cy: 124, angleDeg: 5 },
  },
  spring: {
    viewBox: "0 0 240 160",
    watermark: "Spring",
    meta: "6.1 mi, 50 configs",
    featurePath:
      "M 48 118 C 62 110 78 118 80 132 C 82 146 62 152 50 144 C 38 136 36 126 48 118 Z",
    trackPath:
      "M 30 88 C 26 56 48 28 84 26 C 110 24 126 44 152 36 C 178 28 204 16 222 36 C 238 54 230 80 206 90 C 186 98 172 90 158 104 C 144 118 162 134 184 140 C 206 146 216 158 188 158 C 156 158 140 142 118 136 C 94 130 86 150 62 148 C 38 146 20 128 22 106 C 24 94 30 92 30 88 Z",
    corners: [
      { name: "The Bowl", x: 18, y: 128 },
      { name: "The Chute", x: 168, y: 118, anchor: "end" },
      { name: "Thunder Alley", x: 118, y: 12 },
    ],
    startFinish: { cx: 30, cy: 88, angleDeg: -75 },
  },
};

export function VenueTrackMap({
  trackId,
  reduced,
}: {
  trackId: string;
  reduced: boolean;
}) {
  const track = venueTracks[trackId] ?? venueTracks.sonoma;
  const viewBox = padViewBox(track.viewBox);

  return (
    <div className="relative h-28 w-full overflow-visible text-accent sm:h-32">
      <AnimatePresence mode="wait">
        <motion.div
          key={trackId}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <p className="pointer-events-none absolute left-2.5 top-1 font-display text-[2.35rem] leading-[0.8] text-foreground/12 sm:text-[2.7rem]">
            {track.watermark}
          </p>

          <motion.svg
            viewBox={viewBox}
            className="h-full w-full overflow-visible"
            aria-hidden="true"
            initial={reduced ? false : "hidden"}
            animate="visible"
            variants={pass}
          >
            {track.featurePath ? (
              <path
                d={track.featurePath}
                fill="currentColor"
                className="text-signal"
                opacity="0.16"
              />
            ) : null}

            <path
              d={track.trackPath}
              fill="none"
              stroke="currentColor"
              strokeWidth="11"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.2"
            />

            <motion.path
              d={track.trackPath}
              fill="none"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={
                reduced ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0.25 }
              }
              animate={{ pathLength: 1, opacity: 1 }}
              transition={
                reduced
                  ? { duration: 0 }
                  : { duration: 0.85, ease: settle, delay: 0.05 }
              }
            />

            <StartFinishFromPoint
              cx={track.startFinish.cx}
              cy={track.startFinish.cy}
              angleDeg={track.startFinish.angleDeg}
              length={12}
            />

            {track.corners.map((corner) => (
              <motion.g key={corner.name} variants={reduced ? undefined : pop}>
                <circle
                  cx={corner.anchor === "end" ? corner.x + 8 : corner.x - 7}
                  cy={corner.y + 3}
                  r="2.2"
                  fill="currentColor"
                  className="text-foreground"
                />
                <text
                  x={corner.x}
                  y={corner.y + 6}
                  fill="currentColor"
                  className="text-foreground"
                  fontSize="9"
                  textAnchor={corner.anchor === "end" ? "end" : "start"}
                  fontFamily="var(--font-sans), ui-sans-serif, system-ui, sans-serif"
                >
                  {corner.name}
                </text>
              </motion.g>
            ))}
          </motion.svg>

          <TrackDots
            reduced={reduced}
            laps={venueDotLaps}
            trackPath={track.trackPath}
            viewBox={viewBox}
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
