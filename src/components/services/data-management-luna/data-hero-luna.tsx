"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";

import { serviceNav } from "@/content/nav";
import { profile } from "@/content/profile";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

import {
  mountLunaDataScene,
  type LunaAnchorPositions,
} from "./luna-data-scene";

import "./data-hero-luna.css";

const servicesList = serviceNav.map((item) => ({
  title: item.title,
  href: item.href,
}));

type AnchorKey = keyof LunaAnchorPositions;

const anchorKeys: AnchorKey[] = ["postgres", "writes", "warehouse"];

export function DataHeroLuna() {
  const reducedMotion = usePrefersReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const sceneHostRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [servicesOpen, setServicesOpen] = useState(false);
  const [webglReady, setWebglReady] = useState(false);
  const servicesMenuId = useId();

  const labelRefs = useRef<Record<AnchorKey, HTMLSpanElement | null>>({
    postgres: null,
    writes: null,
    warehouse: null,
  });
  const startDotRefs = useRef<Record<AnchorKey, SVGCircleElement | null>>({
    postgres: null,
    writes: null,
    warehouse: null,
  });
  const endDotRefs = useRef<Record<AnchorKey, SVGCircleElement | null>>({
    postgres: null,
    writes: null,
    warehouse: null,
  });
  const pathRefs = useRef<Record<AnchorKey, SVGPathElement | null>>({
    postgres: null,
    writes: null,
    warehouse: null,
  });

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      const hero = heroRef.current;
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      pointerRef.current = {
        x: (event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5,
        y: (event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5,
      };
    },
    [],
  );

  const handlePointerLeave = useCallback(() => {
    pointerRef.current = { x: 0, y: 0 };
  }, []);

  const handleAnchorsUpdate = useCallback((next: LunaAnchorPositions) => {
    const visual = visualRef.current;
    if (!visual) return;

    const width = visual.clientWidth;
    const height = visual.clientHeight;
    const labelStart = Math.max(width * 0.62, 180);
    const labelRight = Math.max(labelStart, width - 20);
    const layout: Record<
      AnchorKey,
      { targetX: number; targetY: number; elbowX: number }
    > = {
      postgres: {
        targetX: Math.min(labelRight, Math.max(labelStart, next.postgres.x + 92)),
        targetY: Math.min(height * 0.34, Math.max(54, next.postgres.y - 44)),
        elbowX: next.postgres.x + 34,
      },
      writes: {
        targetX: Math.min(labelRight, Math.max(labelStart, next.writes.x + 92)),
        targetY: Math.min(height * 0.64, Math.max(86, next.writes.y)),
        elbowX: next.writes.x + 38,
      },
      warehouse: {
        targetX: Math.min(labelRight, Math.max(labelStart, next.warehouse.x + 92)),
        targetY: Math.min(
          height - 58,
          Math.max(height * 0.7, next.warehouse.y + 30),
        ),
        elbowX: next.warehouse.x + 34,
      },
    };

    anchorKeys.forEach((key) => {
      const anchor = next[key];
      const target = layout[key];
      const path = pathRefs.current[key];
      const startDot = startDotRefs.current[key];
      const endDot = endDotRefs.current[key];
      const label = labelRefs.current[key];
      const elbowX = Math.min(target.elbowX, target.targetX - 32);

      path?.setAttribute(
        "d",
        `M ${anchor.x} ${anchor.y} L ${elbowX} ${target.targetY} L ${target.targetX - 14} ${target.targetY}`,
      );
      startDot?.setAttribute("cx", String(anchor.x));
      startDot?.setAttribute("cy", String(anchor.y));
      endDot?.setAttribute("cx", String(target.targetX - 14));
      endDot?.setAttribute("cy", String(target.targetY));

      if (label) {
        label.style.left = `${target.targetX}px`;
        label.style.top = `${target.targetY}px`;
        label.style.transform = "translate3d(0, -50%, 0)";
      }
    });
  }, []);

  useEffect(() => {
    const host = sceneHostRef.current;
    if (!host) return;

    setWebglReady(false);
    return mountLunaDataScene({
      host,
      reducedMotion,
      getPointer: () => pointerRef.current,
      onAnchorsUpdate: handleAnchorsUpdate,
      onReadyChange: setWebglReady,
    }).dispose;
  }, [handleAnchorsUpdate, reducedMotion]);

  useEffect(() => {
    if (!servicesOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [servicesOpen]);

  return (
    <header
      ref={heroRef}
      className="data-luna-hero"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="data-luna-atmosphere" aria-hidden="true" />
      <div className="data-luna-grid" aria-hidden="true" />

      <nav className="data-luna-nav" aria-label="Site navigation">
        <Link href="/" className="data-luna-brand">
          {profile.name}
        </Link>

        <div ref={navRef} className="data-luna-nav-links">
          <div className="data-luna-services">
            <button
              type="button"
              className="data-luna-nav-link"
              aria-expanded={servicesOpen}
              aria-haspopup="menu"
              aria-controls={servicesMenuId}
              onClick={() => setServicesOpen((open) => !open)}
            >
              Services
              <svg viewBox="0 0 10 6" aria-hidden="true">
                <path d="m1 1 4 4 4-4" />
              </svg>
            </button>
            <ul
              id={servicesMenuId}
              className="data-luna-services-menu"
              role="menu"
              aria-label="Services"
              aria-hidden={!servicesOpen}
              {...(!servicesOpen ? { inert: true } : {})}
            >
              {servicesList.map((item) => (
                <li key={item.href} role="none">
                  <Link
                    href={item.href}
                    role="menuitem"
                    tabIndex={servicesOpen ? 0 : -1}
                    onClick={() => setServicesOpen(false)}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link href="/projects" className="data-luna-nav-link">
            Portfolio
          </Link>
          <Link href="/contact" className="data-luna-contact-link">
            Contact
          </Link>
        </div>
      </nav>

      <div className="data-luna-main">
        <div className="data-luna-copy">
          <p className="data-luna-eyebrow">
            <span>DATA MANAGEMENT</span>
            <span className="data-luna-eyebrow-rule" aria-hidden="true" />
          </p>
          <h1>
            <span>one record,</span>
            <span>every system</span>
          </h1>
          <p className="data-luna-supporting-copy">
            Postgres owns the row. Every system stays in sync.
          </p>
          <Link href="/contact" className="data-luna-cta">
            <span>Start a conversation</span>
            <span aria-hidden="true" className="data-luna-cta-arrow">
              →
            </span>
          </Link>
        </div>

        <div
          ref={visualRef}
          className={`data-luna-visual ${webglReady ? "is-webgl-ready" : ""}`}
          data-luna-fallback={webglReady ? undefined : "true"}
        >
          <div className="data-luna-visual-glow" aria-hidden="true" />
          <div
            ref={sceneHostRef}
            className="data-luna-scene-host"
            data-data-hero-webgl
            data-scene-variant="luna"
            data-webgl-status="loading"
            data-motion={reducedMotion ? "reduced" : "full"}
            aria-hidden="true"
          />

          <div className="data-luna-fallback" aria-hidden="true">
            <span className="data-luna-fallback-slab data-luna-fallback-slab-top" />
            <span className="data-luna-fallback-slab data-luna-fallback-slab-middle" />
            <span className="data-luna-fallback-slab data-luna-fallback-slab-bottom" />
            <span className="data-luna-fallback-core" />
          </div>

          <svg className="data-luna-connectors" aria-hidden="true">
            {anchorKeys.map((key) => (
              <g key={key}>
                <path
                  ref={(node) => {
                    pathRefs.current[key] = node;
                  }}
                  className={`data-luna-connector data-luna-connector-${key}`}
                  d="M 0 0 L 0 0 L 0 0"
                />
                <circle
                  ref={(node) => {
                    startDotRefs.current[key] = node;
                  }}
                  className={`data-luna-node data-luna-node-${key}`}
                  cx="0"
                  cy="0"
                  r="3"
                />
                <circle
                  ref={(node) => {
                    endDotRefs.current[key] = node;
                  }}
                  className={`data-luna-node data-luna-node-${key}`}
                  cx="0"
                  cy="0"
                  r="3"
                />
              </g>
            ))}
          </svg>

          <div className="data-luna-label-layer" aria-label="Data flow layers">
            <span
              ref={(node) => {
                labelRefs.current.postgres = node;
              }}
              className="data-luna-label data-luna-label-postgres"
            >
              POSTGRES
            </span>
            <span
              ref={(node) => {
                labelRefs.current.writes = node;
              }}
              className="data-luna-label data-luna-label-writes"
            >
              LIVE WRITES
            </span>
            <span
              ref={(node) => {
                labelRefs.current.warehouse = node;
              }}
              className="data-luna-label data-luna-label-warehouse"
            >
              WAREHOUSE
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
