"use client";

import { useEffect, useRef, useState } from "react";

import { useMotionPaused } from "@/hooks/use-motion-paused";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

import "./industry-routes.css";

/*
 * Hero illustration for the logistics page: three vehicles loop fixed routes out of a
 * depot at constant speed. Each stop flips to delivered as its vehicle passes, and the
 * list below counts down the ETA to the next stop. Routes and stops are synthetic.
 */

type Pt = readonly [number, number];

const MAP_W = 320;
const MAP_H = 160;
const GRID = 20;
const DEPOT: Pt = [40, 80];

const STOPS = {
  A: { at: [130, 30], label: [130, 20] },
  B: { at: [250, 55], label: [259, 58] },
  C: { at: [240, 100], label: [240, 92] },
  D: { at: [240, 130], label: [240, 146] },
  E: { at: [110, 130], label: [110, 146] },
} as const satisfies Record<string, { at: Pt; label: Pt }>;

type StopId = keyof typeof STOPS;

// Orthogonal loops that start and end at the depot. Speed is in map units per second;
// one second on screen reads as one minute of ETA.
const VEHICLES = [
  {
    name: "Van 01",
    tag: "01",
    speed: 30,
    truck: false,
    stops: ["A", "B"],
    points: [DEPOT, [40, 30], [250, 30], [250, 80], DEPOT],
  },
  {
    name: "Van 02",
    tag: "02",
    speed: 32,
    truck: false,
    stops: ["C", "D"],
    points: [DEPOT, [170, 80], [170, 100], [280, 100], [280, 130], [210, 130], [210, 80], DEPOT],
  },
  {
    name: "Truck 03",
    tag: "03",
    speed: 20,
    truck: true,
    stops: ["E"],
    points: [DEPOT, [40, 130], [140, 130], [140, 80], DEPOT],
  },
] as const satisfies ReadonlyArray<{
  name: string;
  tag: string;
  speed: number;
  truck: boolean;
  stops: readonly StopId[];
  points: readonly Pt[];
}>;

// Faint side streets so the map reads as a grid, not just the three loops.
const SIDE_STREETS: Pt[][] = [
  [
    [170, 10],
    [170, 80],
  ],
  [
    [280, 20],
    [280, 100],
  ],
  [
    [90, 80],
    [90, 150],
  ],
  [
    [210, 130],
    [210, 150],
  ],
];

// Cumulative distance at each polyline vertex, plus where each stop sits along the route.
const ROUTES = VEHICLES.map((vehicle) => {
  const cum = [0];
  for (let i = 1; i < vehicle.points.length; i += 1) {
    const [ax, ay] = vehicle.points[i - 1];
    const [bx, by] = vehicle.points[i];
    cum.push(cum[i - 1] + Math.abs(bx - ax) + Math.abs(by - ay));
  }
  const stopDist = vehicle.stops.map((id) => {
    const [sx, sy] = STOPS[id].at;
    for (let i = 1; i < vehicle.points.length; i += 1) {
      const [ax, ay] = vehicle.points[i - 1];
      const [bx, by] = vehicle.points[i];
      const onX = ay === by && sy === ay && sx >= Math.min(ax, bx) && sx <= Math.max(ax, bx);
      const onY = ax === bx && sx === ax && sy >= Math.min(ay, by) && sy <= Math.max(ay, by);
      if (onX || onY) return cum[i - 1] + Math.abs(sx - ax) + Math.abs(sy - ay);
    }
    return 0;
  });
  return { cum, length: cum[cum.length - 1], stopDist };
});

function pointAt(index: number, dist: number) {
  const { points } = VEHICLES[index];
  const { cum } = ROUTES[index];
  let seg = 1;
  while (seg < cum.length - 1 && dist > cum[seg]) seg += 1;
  const [ax, ay] = points[seg - 1];
  const [bx, by] = points[seg];
  const span = cum[seg] - cum[seg - 1] || 1;
  const t = Math.min(1, Math.max(0, (dist - cum[seg - 1]) / span));
  return { x: ax + (bx - ax) * t, y: ay + (by - ay) * t, vertical: ax === bx };
}

type Status = { lap: number; passed: number; eta: number };

function statusAt(index: number, dist: number, lap: number): Status {
  const { stopDist, length } = ROUTES[index];
  const passed = stopDist.filter((d) => d <= dist).length;
  const target = passed < stopDist.length ? stopDist[passed] : length;
  return { lap, passed, eta: Math.max(1, Math.ceil((target - dist) / VEHICLES[index].speed)) };
}

const sameStatus = (a: Status, b: Status) =>
  a.lap === b.lap && a.passed === b.passed && a.eta === b.eta;

// Server and first client render agree: vehicles part-way out, fixed offsets.
const INITIAL_DIST = ROUTES.map((route, i) => route.length * [0.2, 0.45, 0.3][i]);
const INITIAL_STATUS = INITIAL_DIST.map((d, i) => statusAt(i, d, 0));
// Reduced motion: every stop delivered, each vehicle on its way back to the depot.
const REDUCED_DIST = ROUTES.map((route, i) => route.length * [0.93, 0.8, 0.62][i]);
const REDUCED_STATUS = REDUCED_DIST.map((d, i) => statusAt(i, d, 0));

const vehicleTransform = (index: number, dist: number) => {
  const { x, y } = pointAt(index, dist);
  return `translate(${x.toFixed(2)} ${y.toFixed(2)})`;
};
const bodyTransform = (index: number, dist: number) =>
  pointAt(index, dist).vertical ? "rotate(90)" : "rotate(0)";
const barTransform = (index: number, dist: number) =>
  `scaleX(${(dist / ROUTES[index].length).toFixed(4)})`;

const toPoints = (points: readonly Pt[]) => points.map(([x, y]) => `${x},${y}`).join(" ");

export function IndustryRoutes() {
  const reduced = usePrefersReducedMotion();
  // The page's pause control freezes the loop on its current frame.
  const paused = useMotionPaused();
  const panelRef = useRef<HTMLDivElement>(null);
  const distRef = useRef<number[]>([...INITIAL_DIST]);
  const lapRef = useRef<number[]>(INITIAL_STATUS.map((s) => s.lap));
  const lastRef = useRef<Status[]>(INITIAL_STATUS);
  const [status, setStatus] = useState<Status[]>(INITIAL_STATUS);
  const [running, setRunning] = useState(false);

  // Only animate while the panel is on screen and the tab is visible.
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

  // Continuous movement is written straight to the DOM each frame; React only
  // re-renders when a stop is reached or an ETA minute ticks over.
  useEffect(() => {
    const panel = panelRef.current;
    if (!running || !panel) return;
    const cars = panel.querySelectorAll<SVGGElement>("[data-route-vehicle]");
    const bodies = panel.querySelectorAll<SVGGElement>("[data-route-body]");
    const bars = panel.querySelectorAll<HTMLElement>("[data-route-bar]");
    const dist = distRef.current;
    const laps = lapRef.current;
    let previous = performance.now();
    let frame = 0;

    const step = (now: number) => {
      // Clamp the delta so a dropped frame never teleports a vehicle.
      const dt = Math.min(0.1, (now - previous) / 1000);
      previous = now;
      const next = VEHICLES.map((vehicle, i) => {
        const length = ROUTES[i].length;
        dist[i] += vehicle.speed * dt;
        if (dist[i] >= length) {
          dist[i] -= length;
          laps[i] += 1;
        }
        cars[i]?.setAttribute("transform", vehicleTransform(i, dist[i]));
        bodies[i]?.setAttribute("transform", bodyTransform(i, dist[i]));
        if (bars[i]) bars[i].style.transform = barTransform(i, dist[i]);
        return statusAt(i, dist[i], laps[i]);
      });
      if (next.some((s, i) => !sameStatus(s, lastRef.current[i]))) {
        lastRef.current = next;
        setStatus(next);
      }
      frame = window.requestAnimationFrame(step);
    };

    frame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(frame);
  }, [running]);

  const shown = reduced ? REDUCED_STATUS : status;
  const baseDist = reduced ? REDUCED_DIST : INITIAL_DIST;
  const delivered = shown.reduce((sum, s) => sum + s.passed, 0);
  const totalStops = Object.keys(STOPS).length;

  return (
    <div
      ref={panelRef}
      className="relative rounded-[var(--shape-radius-lg)] border border-border bg-surface/70 p-4 shadow-[0_30px_80px_-40px_color-mix(in_srgb,var(--accent)_45%,transparent)] backdrop-blur-sm sm:p-5"
    >
      <p className="sr-only">
        Illustration: three delivery vehicles looping routes from a depot on a schematic map,
        marking each stop as delivered and counting down the time to their next stop.
      </p>
      <div aria-hidden="true">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-medium">
            <span className="relative flex size-2">
              <span className="industry-live-ping absolute inset-0 rounded-full bg-accent" />
              <span className="relative size-2 rounded-full bg-accent" />
            </span>
            Fleet
          </span>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
            Sample data
          </span>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-border bg-background/70">
          <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="block h-auto w-full">
            {/* Faint survey grid. */}
            <g className="stroke-foreground/[0.06]" strokeWidth={1}>
              {Array.from({ length: MAP_W / GRID + 1 }, (_, i) => (
                <line key={`x${i}`} x1={i * GRID} y1={0} x2={i * GRID} y2={MAP_H} />
              ))}
              {Array.from({ length: MAP_H / GRID + 1 }, (_, i) => (
                <line key={`y${i}`} x1={0} y1={i * GRID} x2={MAP_W} y2={i * GRID} />
              ))}
            </g>

            {/* Streets, then the dashed route each vehicle follows. */}
            <g
              className="fill-none stroke-foreground/10"
              strokeWidth={7}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {SIDE_STREETS.map((street, i) => (
                <polyline key={`s${i}`} points={toPoints(street)} />
              ))}
              {VEHICLES.map((vehicle) => (
                <polyline key={vehicle.tag} points={toPoints(vehicle.points)} />
              ))}
            </g>
            <g
              className="fill-none stroke-[var(--accent)] opacity-40"
              strokeWidth={1}
              strokeDasharray="3 4"
              strokeLinejoin="round"
            >
              {VEHICLES.map((vehicle) => (
                <polyline key={vehicle.tag} points={toPoints(vehicle.points)} />
              ))}
            </g>

            {/* Depot. */}
            <rect
              x={DEPOT[0] - 7}
              y={DEPOT[1] - 7}
              width={14}
              height={14}
              rx={3}
              className="fill-[color-mix(in_srgb,var(--accent)_22%,var(--background))] stroke-[var(--accent)]"
              strokeWidth={1.5}
            />
            <text
              x={DEPOT[0] + 10}
              y={DEPOT[1] - 8}
              className="fill-[var(--muted-foreground)] font-mono uppercase"
              fontSize={7}
              letterSpacing={1}
            >
              Depot
            </text>

            {/* Stops: hollow while pending, filled once delivered. */}
            {VEHICLES.flatMap((vehicle, v) =>
              vehicle.stops.map((id, s) => {
                const stop = STOPS[id];
                const done = shown[v].passed > s;
                return (
                  <g key={id}>
                    {done && !reduced ? (
                      <circle
                        key={shown[v].lap}
                        cx={stop.at[0]}
                        cy={stop.at[1]}
                        r={5}
                        className="industry-routes-pulse fill-none stroke-[var(--accent)]"
                        strokeWidth={1.5}
                      />
                    ) : null}
                    <circle
                      cx={stop.at[0]}
                      cy={stop.at[1]}
                      r={4.5}
                      strokeWidth={1.5}
                      className={cn(
                        "stroke-[var(--accent)] transition-[fill] duration-500",
                        done ? "fill-[var(--accent)]" : "fill-[var(--background)]",
                      )}
                    />
                    <text
                      x={stop.label[0]}
                      y={stop.label[1]}
                      textAnchor={stop.label[0] > stop.at[0] ? "start" : "middle"}
                      className={cn(
                        "font-mono transition-[fill] duration-500",
                        done ? "fill-[var(--accent-readable)]" : "fill-[var(--muted-foreground)]",
                      )}
                      fontSize={8}
                    >
                      {id}
                    </text>
                  </g>
                );
              }),
            )}

            {/* Vehicles: soft glow, a body that turns with the street, and a tag. */}
            {VEHICLES.map((vehicle, i) => (
              <g
                key={vehicle.tag}
                data-route-vehicle=""
                transform={vehicleTransform(i, baseDist[i])}
              >
                <circle r={12} className="fill-[var(--accent)] opacity-10" />
                <circle r={7.5} className="fill-[var(--accent)] opacity-20" />
                <g data-route-body="" transform={bodyTransform(i, baseDist[i])}>
                  <rect
                    x={vehicle.truck ? -6.5 : -5}
                    y={vehicle.truck ? -3.5 : -3}
                    width={vehicle.truck ? 13 : 10}
                    height={vehicle.truck ? 7 : 6}
                    rx={2}
                    className="fill-[var(--accent)] stroke-[var(--background)]"
                    strokeWidth={1}
                  />
                </g>
                <text
                  y={-10}
                  textAnchor="middle"
                  className="fill-[var(--foreground)] font-mono"
                  fontSize={7}
                >
                  {vehicle.tag}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <ul className="mt-3 grid gap-2">
          {VEHICLES.map((vehicle, i) => {
            const s = shown[i];
            const nextStop = s.passed < vehicle.stops.length ? `Stop ${vehicle.stops[s.passed]}` : "Depot";
            return (
              <li key={vehicle.tag} className="rounded-xl border border-border bg-background/70 px-3 py-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex min-w-0 items-center gap-2.5">
                    <span
                      className={cn(
                        "shrink-0 rounded-[3px] bg-accent",
                        vehicle.truck ? "h-2 w-3.5" : "h-1.5 w-2.5",
                      )}
                    />
                    <span className="text-sm leading-none">{vehicle.name}</span>
                    <span className="truncate font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground">
                      Next <span className="text-foreground/70">{nextStop}</span>
                    </span>
                  </span>
                  <span className="flex shrink-0 items-baseline gap-1">
                    <span className="font-display text-lg leading-none tabular-nums">{s.eta}</span>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground">
                      min
                    </span>
                  </span>
                </div>
                <div className="mt-2 h-0.5 overflow-hidden rounded-full bg-border">
                  <div
                    data-route-bar=""
                    className="h-full origin-left bg-accent"
                    style={{ transform: barTransform(i, baseDist[i]) }}
                  />
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
          <span>Depot to stop to depot</span>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-[var(--accent-readable)]">
            {delivered}/{totalStops} delivered
          </span>
        </div>
      </div>
    </div>
  );
}
