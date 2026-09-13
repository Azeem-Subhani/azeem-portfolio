"use client";

import { useLayoutEffect, useRef } from "react";
import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: settle },
  },
};

const pop: Variants = {
  hidden: { opacity: 0, scale: 0.86 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 18 },
  },
};

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0.2 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.6, ease: settle },
  },
};

const pass: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const monacoPath =
  "M118.34 246.687c-5.14.774-6.994 2.392-9.853 7.317-4.586 7.898-9.192 18.211-11.413 27.357-2.486 10.243-2.829 25.557-1.95 39.458.445 7.034 2.23 10.04 8.243 12.045 7.17 2.387 8.339 2.488 9.949 9.801 1.61 7.319 6.389 33.36 8.047 42.434 1.188 6.495 2.042 8.91-3.805 11.704-6.436 3.07-7.9 3.95-6.729 9.07 1.17 5.12 6.805 23.714 11.023 30.435 11.51 18.336 19.262 23.945 27.311 26.726 5.165 1.784 11.935 2.284 13.315 7.946 1.317 5.416 1.181 7.937-2.341 9.074-13.167 4.244-26.043 5.56-38.334 5.268-4.24-.102-4.829-.294-4.245-5.56.442-3.967.44-9.514-3.803-14.047-3.322-3.553-10.24-13.756-16.093-28.531-9.486-23.955-16.97-48.602-19.168-60.132-2.924-15.363-5.422-36.152-6.435-49.746-1.903-25.458-.928-45.988 3.217-55.89 5.267-12.585 6.437-17.12 5.999-21.07-.878-7.9-.355-10.97 4.242-12.437 14.192-4.535 27.36-4.242 37.456-5.852 10.094-1.609 27.134-4.495 33.651-6.439 8.34-2.486 23.423-7.227 36.577-9.363 11.704-1.903 21.801-3.073 32.774-8.34 6.195-2.974 21.8-11.119 28.384-13.169 6.585-2.046 18.713-4.606 25.75-6.143 8.048-1.759 17.221-3.118 23.994-4.534 9.32-1.953 25.118-13.113 27.46-27.898 2.535-15.996-2.563-24.582-12.876-33.749-7.022-6.243-11.658-11.657-12.68-15.461-1.987-7.38.472-12.368 3.803-16.97 4.974-6.877 50.625-68.034 53.99-72.277 3.366-4.244 6.436-3.658 9.95-.88 3.509 2.783 7.415 5.432 7.023 10.39-.438 5.56-.515 9.95 1.757 13.607 2.632 4.244 3.365 5.121 6.585 9.51 2.136 2.914 3.949 5.707 5.121 9.51 1.097 3.565 6.103 5.143 8.922 2.633 2.632-2.341 3.073-6.585-.876-9.51-1.636-1.211-3.58-2.506-5.269-5.12-2.926-4.537-5.415-7.9-7.168-10.681-1.389-2.204-3.13-11.026 2.778-12.73 8.632-2.487 19.607-5.853 25.31-7.608 2.719-.835 11.123-.146 11.123 8.34 0 8.485-.294 17.848-1.17 25.896-.394 3.597-3.482 47.7-22.192 77.593-23.132 36.952-62.28 63.471-70.912 68.28-19.604 10.923-39.682 17.952-46.525 19.703-12.584 3.218-28.287 4.485-42.725 6.437-3.529.476-5.299 3.87-5.074 5.463.586 4.098-.946 5.21-4.484 5.852-8.585 1.563-10.73 2.731-12.486-.388-1.8-3.2-3.085-2.424-7.805-1.759-15.215 2.147-86.663 12.827-97.344 14.435z";

const harborPath =
  "M 168 300 C 230 275 300 305 318 365 C 328 410 280 445 210 430 C 155 418 140 340 168 300";

const corners = [
  { name: "Hairpin", x: 338, y: 4 },
  { name: "Tunnel", x: 318, y: 128 },
  { name: "Piscine", x: 168, y: 468 },
];

const slots = [
  { time: "9:00", name: "Track day", price: "$220" },
  { time: "1:30", name: "Drive experience", price: "$420" },
  { time: "4:00", name: "Private hire", price: "$1,800" },
];

type TrackSample = { x: number; y: number; angle: number };

function unwrapDelta(from: number, to: number) {
  let delta = to - from;
  while (delta > 180) delta -= 360;
  while (delta < -180) delta += 360;
  return delta;
}

function sampleTrack(path: SVGPathElement, steps = 720, lookAhead = 42) {
  const len = path.getTotalLength();
  const pts: TrackSample[] = [];

  for (let i = 0; i < steps; i++) {
    const d = (i / steps) * len;
    const p = path.getPointAtLength(d);
    const ahead = path.getPointAtLength((d + lookAhead) % len);
    pts.push({
      x: p.x,
      y: p.y,
      angle: (Math.atan2(ahead.y - p.y, ahead.x - p.x) * 180) / Math.PI,
    });
  }

  for (let i = 1; i < pts.length; i++) {
    pts[i].angle = pts[i - 1].angle + unwrapDelta(pts[i - 1].angle, pts[i].angle);
  }

  const first = pts[0];
  const last = pts[pts.length - 1];
  pts.push({
    x: first.x,
    y: first.y,
    angle: last.angle + unwrapDelta(last.angle, first.angle),
  });

  return pts;
}

function poseAt(pts: TrackSample[], t: number) {
  const n = pts.length - 1;
  if (n < 1) return { x: 118.34, y: 246.687, angle: 90 };
  const u = ((t % 1) + 1) % 1;
  const scaled = u * n;
  const i = Math.min(Math.floor(scaled), n - 1);
  const f = scaled - i;
  const a = pts[i];
  const b = pts[i + 1] ?? pts[0];
  return {
    x: a.x + (b.x - a.x) * f,
    y: a.y + (b.y - a.y) * f,
    angle: a.angle + (b.angle - a.angle) * f,
  };
}

const carShape = (
  <>
    <path
      d="M -14 0 L -9 -4.6 L 12 -4.1 L 16.5 0 L 12 4.1 L -9 4.6 Z"
      fill="currentColor"
    />
    <rect
      x="-11"
      y="-6"
      width="4.2"
      height="12"
      rx="0.8"
      fill="currentColor"
      opacity="0.65"
    />
  </>
);

const laps = [
  { color: "text-accent", durationMs: 28000, offset: 0 },
  { color: "text-signal", durationMs: 31000, offset: 0.37 },
] as const;

function MonacoCars({ reduced }: { reduced: boolean }) {
  const rootRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    if (!root) return;

    const path = root.querySelector("[data-track]");
    const cars = [...root.querySelectorAll("[data-car]")];
    if (!(path instanceof SVGPathElement) || cars.length === 0) return;

    let pts: TrackSample[];
    try {
      if (path.getTotalLength() < 100) return;
      pts = sampleTrack(path);
    } catch {
      return;
    }
    if (pts.length < 2) return;

    const runners = cars.map((el, index) => {
      const lap = laps[index] ?? laps[0];
      const start = poseAt(pts, lap.offset);
      el.setAttribute(
        "transform",
        `translate(${start.x} ${start.y}) rotate(${start.angle})`,
      );
      return {
        el,
        durationMs: lap.durationMs,
        offset: lap.offset,
        angle: start.angle,
        last: performance.now(),
        origin: performance.now(),
      };
    });

    let cancelled = false;
    const tick = (now: number) => {
      if (cancelled) return;
      try {
        for (const car of runners) {
          const pose = poseAt(
            pts,
            (now - car.origin) / car.durationMs + car.offset,
          );
          const dt = Math.min(now - car.last, 48);
          car.last = now;
          car.angle += unwrapDelta(car.angle, pose.angle) * (1 - Math.exp(-dt / 320));
          car.el.setAttribute(
            "transform",
            `translate(${pose.x} ${pose.y}) rotate(${((car.angle % 360) + 360) % 360})`,
          );
        }
      } catch {}
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    return () => {
      cancelled = true;
    };
  }, [reduced]);

  return (
    <svg
      ref={rootRef}
      viewBox="40 -8 420 510"
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      aria-hidden="true"
    >
      <path data-track d={monacoPath} fill="none" stroke="none" />
      {reduced ? (
        <g className="text-accent" transform="translate(118.34 246.687) rotate(90)">
          {carShape}
        </g>
      ) : (
        laps.map((lap) => (
          <g
            key={lap.color}
            data-car
            className={lap.color}
            transform="translate(118.34 246.687) rotate(90)"
          >
            {carShape}
          </g>
        ))
      )}
    </svg>
  );
}

export function WebVisual() {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      className="relative mx-auto w-full max-w-lg"
      variants={stage}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      <motion.p
        className="pointer-events-none absolute -left-1 top-6 font-display text-[clamp(4.5rem,14vw,7rem)] leading-[0.8] text-foreground/8"
        variants={fade}
      >
        Monaco
      </motion.p>

      <motion.p
        className="relative font-display text-[clamp(2.4rem,6vw,3.75rem)] leading-[0.95]"
        variants={fade}
      >
        Monte Carlo
      </motion.p>
      <motion.p className="relative mt-1 text-sm text-muted-foreground" variants={fade}>
        Grand Prix circuit
      </motion.p>

      <div className="relative mt-1 h-[min(24rem,78vw)] w-full text-accent">
      <motion.svg
        viewBox="40 -8 420 510"
        className="h-full w-full overflow-visible"
        aria-hidden="true"
        variants={pass}
      >
        <path
          d={harborPath}
          fill="currentColor"
          className="text-signal"
          opacity="0.18"
        />
        <path
          d={monacoPath}
          fill="none"
          stroke="currentColor"
          strokeWidth="22"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.2"
        />
        <motion.path
          d={monacoPath}
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={draw}
        />
        <line
          x1="102"
          y1="250"
          x2="134"
          y2="244"
          stroke="currentColor"
          strokeWidth="4"
          className="text-foreground"
        />

        {corners.map((corner) => (
          <motion.g key={corner.name} variants={pop}>
            <circle
              cx={corner.x - 10}
              cy={corner.y + 10}
              r="4"
              fill="currentColor"
              className="text-foreground"
            />
            <text
              x={corner.x}
              y={corner.y + 14}
              fill="currentColor"
              className="text-foreground"
              fontSize="18"
              fontFamily="var(--font-sans), ui-sans-serif, system-ui, sans-serif"
            >
              {corner.name}
            </text>
          </motion.g>
        ))}
      </motion.svg>
      <MonacoCars reduced={reduced} />
      </div>

      <motion.p className="text-xs text-muted-foreground" variants={fade}>
        3.337 km, 19 turns
      </motion.p>

      <motion.ul
        className="mt-6 grid grid-cols-3 gap-2 border-t border-border pt-4"
        variants={pass}
      >
        {slots.map((slot) => (
          <motion.li key={slot.time} variants={pop}>
            <p className="font-display text-xl tabular-nums leading-none">
              {slot.time}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{slot.name}</p>
            <p className="mt-0.5 text-sm tabular-nums text-accent">{slot.price}</p>
          </motion.li>
        ))}
      </motion.ul>
      <motion.p className="mt-3 text-xs text-muted-foreground" variants={fade}>
        Track Hero books the same weekend at five venues
      </motion.p>
    </motion.div>
  );
}
