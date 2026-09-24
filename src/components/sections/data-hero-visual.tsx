"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useTheme } from "next-themes";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

import {
  DataHeroWebgl,
  type DataHeroPointer,
} from "./data-hero-webgl";

import "./data-hero-visual.css";

const CORE = { x: 393, y: 270, r: 104 };
const NODE_R = 34;
const PORT_GAP = 7;

const nodePositions = {
  postgres: { x: 393, y: 62 },
  writes: { x: 160, y: 372 },
  warehouse: { x: 626, y: 372 },
} as const;

type Point = { x: number; y: number };

function edgePoint(from: Point, toward: Point, radius: number): Point {
  const dx = toward.x - from.x;
  const dy = toward.y - from.y;
  const length = Math.hypot(dx, dy);
  return { x: from.x + (dx / length) * radius, y: from.y + (dy / length) * radius };
}

function routeBetween(start: Point, startR: number, end: Point, endR: number, bend: number) {
  const a = edgePoint(start, end, startR);
  const b = edgePoint(end, start, endR);
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const nx = -(b.y - a.y);
  const ny = b.x - a.x;
  const length = Math.hypot(nx, ny) || 1;
  const cx = mx + (nx / length) * bend;
  const cy = my + (ny / length) * bend;
  const round = (n: number) => Math.round(n * 10) / 10;
  return {
    d: `M ${round(a.x)} ${round(a.y)} Q ${round(cx)} ${round(cy)} ${round(b.x)} ${round(b.y)}`,
    start: a,
    end: b,
  };
}

const coreR = CORE.r + PORT_GAP;
const nodeR = NODE_R + PORT_GAP;

const routes = {
  writes: routeBetween(nodePositions.writes, nodeR, CORE, coreR, -18),
  postgres: routeBetween(CORE, coreR, nodePositions.postgres, nodeR, 0),
  warehouse: routeBetween(CORE, coreR, nodePositions.warehouse, nodeR, -18),
};

const paths = {
  postgres: routes.postgres.d,
  writes: routes.writes.d,
  warehouse: routes.warehouse.d,
} as const;

const FLOW = { dur: "3.6s", handoff: 0.46 } as const;

function DatabaseGlyph({ className = "" }: { className?: string }) {
  return (
    <g className={className} fill="none" stroke="currentColor" strokeWidth="2.3">
      <ellipse cx="0" cy="-10" rx="13" ry="5" />
      <path d="M-13-10v19c0 3 6 5 13 5s13-2 13-5v-19" />
      <path d="M-13 0c0 3 6 5 13 5s13-2 13-5M-13 9c0 3 6 5 13 5s13-2 13-5" />
    </g>
  );
}

function WriteGlyph() {
  return (
    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.8">
      <path d="M-13 0h17" />
      <path d="m-1-8 8 8-8 8" />
      <path d="M-13-12v24" opacity="0.42" />
    </g>
  );
}

function WarehouseGlyph() {
  return (
    <g fill="currentColor">
      <rect x="-13" y="1" width="4" height="11" rx="1" />
      <rect x="-3" y="-5" width="4" height="17" rx="1" />
      <rect x="7" y="-13" width="4" height="25" rx="1" />
    </g>
  );
}

function HeroNode({
  cx,
  cy,
  tone,
  label,
  caption,
  placement,
  children,
}: {
  cx: number;
  cy: number;
  tone: "cyan" | "teal" | "violet";
  label: string;
  caption: string;
  placement: "right" | "below";
  children: React.ReactNode;
}) {
  const right = placement === "right";
  const x = right ? NODE_R + 20 : 0;
  const y = right ? -3 : NODE_R + 30;
  const anchor = right ? "start" : "middle";

  return (
    <g className={`data-hero-node data-hero-node-${tone}`} transform={`translate(${cx} ${cy})`}>
      <circle className="data-hero-node-halo" r="48" />
      <circle className="data-hero-node-ring" r={NODE_R + 10} />
      <circle className="data-hero-node-shell" r={NODE_R} />
      <circle className="data-hero-node-core" r={NODE_R - 7} />
      <g className="data-hero-node-glyph">{children}</g>
      <text className="data-hero-label" x={x} y={y} textAnchor={anchor}>
        {label}
      </text>
      <text className="data-hero-caption" x={x} y={y + 19} textAnchor={anchor}>
        {caption}
      </text>
    </g>
  );
}

function Port({ at, tone }: { at: Point; tone: "cyan" | "teal" | "violet" }) {
  return (
    <g className={`data-hero-port data-hero-node-${tone}`} transform={`translate(${at.x} ${at.y})`}>
      <circle r="5.5" className="data-hero-port-ring" />
      <circle r="2.4" className="data-hero-port-dot" />
    </g>
  );
}

export function DataHeroVisual() {
  const reduced = usePrefersReducedMotion();
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";
  const [webglReady, setWebglReady] = useState(false);
  const visualRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<SVGGElement>(null);
  const systemRef = useRef<SVGGElement>(null);
  const coreRef = useRef<SVGGElement>(null);
  const pointerRef = useRef<DataHeroPointer>({ x: 0, y: 0 });
  const rawId = useId();
  const id = rawId.replace(/:/g, "");
  const ids = {
    grid: `${id}-grid`,
    core: `${id}-core`,
    coreGlow: `${id}-core-glow`,
    postgres: `${id}-postgres`,
    writes: `${id}-writes`,
    warehouse: `${id}-warehouse`,
  };

  useLayoutEffect(() => {
    const visual = visualRef.current;
    const orbit = orbitRef.current;
    const system = systemRef.current;
    const core = coreRef.current;
    if (!visual || !orbit || !system || !core || reduced) return;

    const routeElements = visual.querySelectorAll<SVGPathElement>(
      "[data-data-hero-route]",
    );
    const nodes = visual.querySelectorAll<SVGGElement>("[data-data-hero-node]");
    let cleanup = () => {};
    const context = gsap.context(() => {
      gsap.set(routeElements, { strokeDashoffset: 1 });
      gsap.set(nodes, { opacity: 0, scale: 0.82, transformOrigin: "center" });

      const reveal = gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(routeElements, { strokeDashoffset: 0, duration: 1.25, stagger: 0.12 }, 0.1)
        .to(nodes, { opacity: 1, scale: 1, duration: 0.65, stagger: 0.1 }, 0.55);

      const float = gsap.to(core, {
        y: -5,
        duration: 5.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      const spin = gsap.to(orbit, {
        rotation: 360,
        svgOrigin: "393 270",
        duration: 48,
        ease: "none",
        repeat: -1,
      });

      const xTo = gsap.quickTo(system, "x", { duration: 0.7, ease: "power3.out" });
      const yTo = gsap.quickTo(system, "y", { duration: 0.7, ease: "power3.out" });

      const onPointerMove = (event: PointerEvent) => {
        const bounds = visual.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        pointerRef.current.x = x;
        pointerRef.current.y = y;
        xTo(x * 10);
        yTo(y * 7);
      };
      const onPointerLeave = () => {
        pointerRef.current.x = 0;
        pointerRef.current.y = 0;
        xTo(0);
        yTo(0);
      };

      visual.addEventListener("pointermove", onPointerMove);
      visual.addEventListener("pointerleave", onPointerLeave);

      cleanup = () => {
        reveal.kill();
        float.kill();
        spin.kill();
        visual.removeEventListener("pointermove", onPointerMove);
        visual.removeEventListener("pointerleave", onPointerLeave);
      };
    }, visual);

    return () => {
      cleanup();
      context.revert();
    };
  }, [reduced]);

  return (
    <div
      ref={visualRef}
      className={`data-hero-visual ${reduced ? "is-reduced" : ""} ${webglReady ? "is-webgl-ready" : ""}`}
      role="presentation"
      aria-hidden="true"
    >
      <div className="data-hero-scene">
        <DataHeroWebgl
          reduced={reduced}
          theme={theme}
          pointerRef={pointerRef}
          onReadyChange={setWebglReady}
        />
        <svg
          className="data-hero-visual-svg"
          viewBox="0 0 700 540"
          xmlns="http://www.w3.org/2000/svg"
          focusable="false"
          aria-hidden="true"
        >
        <defs>
          <pattern id={ids.grid} width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M64 0H0M0 0V64" className="data-hero-grid-line" />
          </pattern>
          <radialGradient id={ids.core} cx="32%" cy="22%" r="76%">
            <stop offset="0" className="data-hero-core-stop data-hero-core-stop-light" />
            <stop offset="0.48" className="data-hero-core-stop data-hero-core-stop-mid" />
            <stop offset="1" className="data-hero-core-stop data-hero-core-stop-dark" />
          </radialGradient>
          <filter id={ids.coreGlow} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
        </defs>

        <rect className="data-hero-grid" width="700" height="540" fill={`url(#${ids.grid})`} />
        <circle className="data-hero-atmosphere" cx="393" cy="270" r="148" filter={`url(#${ids.coreGlow})`} />

        <g ref={orbitRef} className="data-hero-orbit-system">
          <ellipse className="data-hero-orbit data-hero-orbit-back" cx="393" cy="270" rx="205" ry="142" />
          <ellipse className="data-hero-orbit data-hero-orbit-front" cx="393" cy="270" rx="205" ry="142" transform="rotate(58 393 270)" />
          <ellipse className="data-hero-orbit data-hero-orbit-side" cx="393" cy="270" rx="205" ry="142" transform="rotate(-58 393 270)" />
        </g>
        <circle className="data-hero-ring-dashed" cx="393" cy="270" r="142" />
        <circle className="data-hero-ring-ticks" cx="393" cy="270" r="160" />

        <g ref={systemRef} className="data-hero-system">
          <g className="data-hero-routes">
            <path id={ids.postgres} d={paths.postgres} pathLength="1" className="data-hero-route data-hero-route-postgres" data-data-hero-route />
            <path id={ids.writes} d={paths.writes} pathLength="1" className="data-hero-route data-hero-route-writes" data-data-hero-route />
            <path id={ids.warehouse} d={paths.warehouse} pathLength="1" className="data-hero-route data-hero-route-warehouse" data-data-hero-route />
            <path d={paths.postgres} pathLength="1" className="data-hero-route-glimmer data-hero-route-postgres" />
            <path d={paths.writes} pathLength="1" className="data-hero-route-glimmer data-hero-route-writes" />
            <path d={paths.warehouse} pathLength="1" className="data-hero-route-glimmer data-hero-route-warehouse" />
          </g>

          {!reduced ? (
            <g className="data-hero-pulses">
              <circle className="data-hero-pulse data-hero-pulse-writes" opacity="0" r="4">
                <animateMotion
                  dur={FLOW.dur}
                  repeatCount="indefinite"
                  keyPoints="0;1;1"
                  keyTimes={`0;${FLOW.handoff};1`}
                  calcMode="linear"
                >
                  <mpath href={`#${ids.writes}`} />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  dur={FLOW.dur}
                  repeatCount="indefinite"
                  values="0;1;1;0;0"
                  keyTimes={`0;0.06;${FLOW.handoff - 0.04};${FLOW.handoff};1`}
                />
              </circle>
              {(["postgres", "warehouse"] as const).map((key) => (
                <circle key={key} className={`data-hero-pulse data-hero-pulse-${key}`} opacity="0" r="4">
                  <animateMotion
                    dur={FLOW.dur}
                    repeatCount="indefinite"
                    keyPoints="0;0;1;1"
                    keyTimes={`0;${FLOW.handoff};0.92;1`}
                    calcMode="linear"
                  >
                    <mpath href={`#${ids[key]}`} />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    dur={FLOW.dur}
                    repeatCount="indefinite"
                    values="0;0;1;1;0"
                    keyTimes={`0;${FLOW.handoff};${FLOW.handoff + 0.05};0.88;0.94`}
                  />
                </circle>
              ))}
              <circle className="data-hero-core-ping" cx={CORE.x} cy={CORE.y} r={CORE.r}>
                <animate
                  attributeName="r"
                  dur={FLOW.dur}
                  repeatCount="indefinite"
                  values={`${CORE.r};${CORE.r};${CORE.r + 26};${CORE.r + 26}`}
                  keyTimes={`0;${FLOW.handoff};${FLOW.handoff + 0.3};1`}
                />
                <animate
                  attributeName="opacity"
                  dur={FLOW.dur}
                  repeatCount="indefinite"
                  values="0;0;0.7;0;0"
                  keyTimes={`0;${FLOW.handoff - 0.01};${FLOW.handoff};${FLOW.handoff + 0.3};1`}
                />
              </circle>
            </g>
          ) : null}

          <g ref={coreRef} className="data-hero-core-group">
            <circle className="data-hero-core-shadow" cx="393" cy="282" r="112" />
            <circle className="data-hero-core data-hero-core-surface" cx="393" cy="270" r="104" fill={`url(#${ids.core})`} />
            <circle className="data-hero-core-rim" cx="393" cy="270" r="104" />
            <circle className="data-hero-core-highlight" cx="365" cy="235" r="63" />
            <g transform="translate(393 270)" className="data-hero-core-glyph">
              <DatabaseGlyph />
            </g>
          </g>

          <g data-data-hero-node>
            <Port at={routes.writes.start} tone="teal" />
            <Port at={routes.writes.end} tone="teal" />
            <Port at={routes.postgres.start} tone="cyan" />
            <Port at={routes.postgres.end} tone="cyan" />
            <Port at={routes.warehouse.start} tone="violet" />
            <Port at={routes.warehouse.end} tone="violet" />
          </g>
          <g data-data-hero-node>
            <HeroNode
              cx={nodePositions.postgres.x}
              cy={nodePositions.postgres.y}
              tone="cyan"
              label="Postgres"
              caption="Source of truth"
              placement="right"
            >
              <DatabaseGlyph />
            </HeroNode>
          </g>
          <g data-data-hero-node>
            <HeroNode
              cx={nodePositions.writes.x}
              cy={nodePositions.writes.y}
              tone="teal"
              label="Live writes"
              caption="Ingest"
              placement="below"
            >
              <WriteGlyph />
            </HeroNode>
          </g>
          <g data-data-hero-node>
            <HeroNode
              cx={nodePositions.warehouse.x}
              cy={nodePositions.warehouse.y}
              tone="violet"
              label="Warehouse"
              caption="Analytics"
              placement="below"
            >
              <WarehouseGlyph />
            </HeroNode>
          </g>
        </g>
        </svg>
      </div>
    </div>
  );
}
