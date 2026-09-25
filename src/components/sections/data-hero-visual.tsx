"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useTheme } from "next-themes";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

import {
  CORE,
  FLOW,
  NODE_R,
  ORBIT,
  nodePositions,
  orbitRotations,
  routes,
  type Point,
} from "./data-hero-geometry";
import {
  DataHeroWebgl,
  createDataHeroMotion,
  type DataHeroMotion,
} from "./data-hero-webgl";

import "./data-hero-visual.css";

const paths = {
  postgres: routes.postgres.d,
  writes: routes.writes.d,
  warehouse: routes.warehouse.d,
} as const;

const FLOW_DUR = `${FLOW.seconds}s`;
const FLOOR_Y = 478;
const orbitNames = ["back", "front", "side"] as const;

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
  const svgRef = useRef<SVGSVGElement>(null);
  const motionRef = useRef<DataHeroMotion>(createDataHeroMotion());
  const rawId = useId();
  const id = rawId.replace(/:/g, "");
  const ids = {
    grid: `${id}-grid`,
    core: `${id}-core`,
    coreGlow: `${id}-core-glow`,
    postgres: `${id}-postgres`,
    writes: `${id}-writes`,
    warehouse: `${id}-warehouse`,
    floor: `${id}-floor`,
    beam: `${id}-beam`,
  };

  // Hand the SVG's SMIL clock to the glass scene so its tube energy tracks
  // the pulse circles exactly.
  useLayoutEffect(() => {
    const svg = svgRef.current;
    const motion = motionRef.current;
    if (!svg) return;
    motion.clock = () => svg.getCurrentTime();
    return () => {
      motion.clock = null;
    };
  }, []);

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
    const motion = motionRef.current;
    let cleanup = () => {};
    const context = gsap.context(() => {
      gsap.set(routeElements, { strokeDashoffset: 1 });
      gsap.set(nodes, { opacity: 0, scale: 0.82, transformOrigin: "center" });
      gsap.set(motion, {
        routePostgres: 0,
        routeWrites: 0,
        routeWarehouse: 0,
        nodePostgres: 0,
        nodeWrites: 0,
        nodeWarehouse: 0,
      });

      // The glass scene gets the same timings as the SVG it sits under:
      // routes in DOM order at 0.1 + 0.12n, nodes after the ports group at
      // 0.55 + 0.1n.
      const reveal = gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(routeElements, { strokeDashoffset: 0, duration: 1.25, stagger: 0.12 }, 0.1)
        .to(nodes, { opacity: 1, scale: 1, duration: 0.65, stagger: 0.1 }, 0.55)
        .to(motion, { routePostgres: 1, duration: 1.25 }, 0.1)
        .to(motion, { routeWrites: 1, duration: 1.25 }, 0.22)
        .to(motion, { routeWarehouse: 1, duration: 1.25 }, 0.34)
        .to(motion, { nodePostgres: 1, duration: 0.65 }, 0.65)
        .to(motion, { nodeWrites: 1, duration: 0.65 }, 0.75)
        .to(motion, { nodeWarehouse: 1, duration: 0.65 }, 0.85);

      const floatVars = { duration: 5.8, ease: "sine.inOut", repeat: -1, yoyo: true };
      const float = gsap.to(core, { y: -5, ...floatVars });
      const floatGlass = gsap.to(motion, { float: -5, ...floatVars });
      const spin = gsap.to(orbit, {
        rotation: 360,
        svgOrigin: `${CORE.x} ${CORE.y}`,
        duration: 48,
        ease: "none",
        repeat: -1,
      });

      const follow = { duration: 0.7, ease: "power3.out" };
      const xTo = gsap.quickTo(system, "x", follow);
      const yTo = gsap.quickTo(system, "y", follow);
      const glassXTo = gsap.quickTo(motion, "offsetX", follow);
      const glassYTo = gsap.quickTo(motion, "offsetY", follow);

      const moveTo = (x: number, y: number) => {
        motion.pointerX = x;
        motion.pointerY = y;
        xTo(x * 10);
        yTo(y * 7);
        glassXTo(x * 10);
        glassYTo(y * 7);
      };
      const onPointerMove = (event: PointerEvent) => {
        const bounds = visual.getBoundingClientRect();
        moveTo(
          (event.clientX - bounds.left) / bounds.width - 0.5,
          (event.clientY - bounds.top) / bounds.height - 0.5,
        );
      };
      const onPointerLeave = () => moveTo(0, 0);

      visual.addEventListener("pointermove", onPointerMove);
      visual.addEventListener("pointerleave", onPointerLeave);

      cleanup = () => {
        reveal.kill();
        float.kill();
        floatGlass.kill();
        spin.kill();
        visual.removeEventListener("pointermove", onPointerMove);
        visual.removeEventListener("pointerleave", onPointerLeave);
        Object.assign(motion, createDataHeroMotion(), { clock: motion.clock });
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
          motionRef={motionRef}
          onReadyChange={setWebglReady}
        />
        <svg
          ref={svgRef}
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
          <radialGradient id={ids.floor} cx="50%" cy="50%" r="50%">
            <stop offset="0" className="data-hero-floor-stop data-hero-floor-stop-core" />
            <stop offset="0.45" className="data-hero-floor-stop data-hero-floor-stop-mid" />
            <stop offset="1" className="data-hero-floor-stop data-hero-floor-stop-edge" />
          </radialGradient>
          <linearGradient id={ids.beam} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" className="data-hero-beam-stop data-hero-beam-stop-top" />
            <stop offset="1" className="data-hero-beam-stop data-hero-beam-stop-bottom" />
          </linearGradient>
        </defs>

        <rect className="data-hero-grid" width="700" height="540" fill={`url(#${ids.grid})`} />
        <circle className="data-hero-atmosphere" cx={CORE.x} cy={CORE.y} r="148" filter={`url(#${ids.coreGlow})`} />

        {/* Light pooled on the floor under the core, with a faint reflection. */}
        <g className="data-hero-floor">
          <rect
            className="data-hero-beam"
            x={CORE.x - 46}
            y={CORE.y + CORE.r - 6}
            width="92"
            height={FLOOR_Y - (CORE.y + CORE.r) + 6}
            fill={`url(#${ids.beam})`}
          />
          <ellipse className="data-hero-floor-pool" cx={CORE.x} cy={FLOOR_Y} rx="210" ry="26" fill={`url(#${ids.floor})`} />
          <ellipse className="data-hero-floor-line" cx={CORE.x} cy={FLOOR_Y} rx="150" ry="3" />
          <ellipse className="data-hero-floor-reflection" cx={CORE.x} cy={FLOOR_Y + 22} rx="64" ry="14" />
        </g>

        <g ref={orbitRef} className="data-hero-orbit-system">
          {orbitRotations.map((degrees, index) => (
            <ellipse
              key={degrees}
              className={`data-hero-orbit data-hero-orbit-${orbitNames[index]}`}
              cx={CORE.x}
              cy={CORE.y}
              rx={ORBIT.rx}
              ry={ORBIT.ry}
              transform={degrees ? `rotate(${degrees} ${CORE.x} ${CORE.y})` : undefined}
            />
          ))}
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
                  dur={FLOW_DUR}
                  repeatCount="indefinite"
                  keyPoints="0;1;1"
                  keyTimes={`0;${FLOW.handoff};1`}
                  calcMode="linear"
                >
                  <mpath href={`#${ids.writes}`} />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  dur={FLOW_DUR}
                  repeatCount="indefinite"
                  values="0;1;1;0;0"
                  keyTimes={`0;0.06;${FLOW.handoff - 0.04};${FLOW.handoff};1`}
                />
              </circle>
              {(["postgres", "warehouse"] as const).map((key) => (
                <circle key={key} className={`data-hero-pulse data-hero-pulse-${key}`} opacity="0" r="4">
                  <animateMotion
                    dur={FLOW_DUR}
                    repeatCount="indefinite"
                    keyPoints="0;0;1;1"
                    keyTimes={`0;${FLOW.handoff};${FLOW.outboundEnd};1`}
                    calcMode="linear"
                  >
                    <mpath href={`#${ids[key]}`} />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    dur={FLOW_DUR}
                    repeatCount="indefinite"
                    values="0;0;1;1;0"
                    keyTimes={`0;${FLOW.handoff};${FLOW.handoff + 0.05};0.88;0.94`}
                  />
                </circle>
              ))}
              <circle className="data-hero-core-ping" cx={CORE.x} cy={CORE.y} r={CORE.r}>
                <animate
                  attributeName="r"
                  dur={FLOW_DUR}
                  repeatCount="indefinite"
                  values={`${CORE.r};${CORE.r};${CORE.r + 26};${CORE.r + 26}`}
                  keyTimes={`0;${FLOW.handoff};${FLOW.handoff + 0.3};1`}
                />
                <animate
                  attributeName="opacity"
                  dur={FLOW_DUR}
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
