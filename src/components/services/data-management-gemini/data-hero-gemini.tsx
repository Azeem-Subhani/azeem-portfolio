"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  DataHeroScene,
  type AnchorPositions,
} from "./data-hero-scene";

import "./data-hero-gemini.css";

const servicesList = [
  { title: "Data management", href: "/services/data-management" },
  { title: "Cloud infrastructure", href: "/services/cloud" },
  { title: "Web development", href: "/services/web-development" },
  { title: "Mobile development", href: "/services/mobile-development" },
];

export function DataHeroGemini() {
  const reduced = usePrefersReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [servicesOpen, setServicesOpen] = useState(false);
  const [anchors, setAnchors] = useState<AnchorPositions | null>(null);
  const [webglReady, setWebglReady] = useState(false);
  const servicesMenuId = useId();

  // Pointer tracking across hero with smooth normalization
  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    setPointer({ x: nx, y: ny });
  }, []);

  const handlePointerLeave = useCallback(() => {
    setPointer({ x: 0, y: 0 });
  }, []);

  const handleAnchorsUpdate = useCallback((newAnchors: AnchorPositions) => {
    setAnchors(newAnchors);
  }, []);

  // Hide global navbar/footer while this hero is mounted
  useEffect(() => {
    const header = document.querySelector("[data-site-header]");
    const footer = document.querySelector("main ~ footer");
    const cta = document.querySelector('aside[aria-label="Contact shortcut"]');
    const nodes = [header, footer, cta].filter(Boolean) as HTMLElement[];
    for (const node of nodes) {
      node.setAttribute("aria-hidden", "true");
      node.setAttribute("inert", "");
    }
    return () => {
      for (const node of nodes) {
        node.removeAttribute("aria-hidden");
        node.removeAttribute("inert");
      }
    };
  }, []);

  // Default fallback anchor positions if WebGL not ready yet
  const pgAnchor = anchors?.postgres ?? { x: 380, y: 220 };
  const wrAnchor = anchors?.writes ?? { x: 440, y: 330 };
  const whAnchor = anchors?.warehouse ?? { x: 420, y: 440 };

  // Calculate clean leader paths and label offsets
  // POSTGRES: up-right angle then horizontal
  const pgTargetX = pgAnchor.x + 110;
  const pgTargetY = pgAnchor.y - 42;
  const pgCornerX = pgAnchor.x + 38;

  // LIVE WRITES: horizontal or slight angle
  const wrTargetX = wrAnchor.x + 120;
  const wrTargetY = wrAnchor.y - 2;
  const wrCornerX = wrAnchor.x + 40;

  // WAREHOUSE: down-right angle then horizontal
  const whTargetX = whAnchor.x + 110;
  const whTargetY = whAnchor.y + 24;
  const whCornerX = whAnchor.x + 35;

  return (
    <header
      ref={heroRef}
      className="data-gemini-hero relative flex flex-col justify-between overflow-hidden"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Background Atmosphere Layers */}
      <div aria-hidden className="data-gemini-backdrop">
        <div className="data-gemini-cloud data-gemini-cloud-1" />
        <div className="data-gemini-cloud data-gemini-cloud-2" />
        <div className="data-gemini-cloud data-gemini-cloud-3" />
      </div>
      <div aria-hidden className="data-gemini-bg-grid" />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          NAVIGATION BAR (Matching Reference Image)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <nav
        className="data-gemini-nav px-6 sm:px-10 lg:px-16 py-5 flex items-center justify-between"
        aria-label="Site navigation"
      >
        {/* Left: Azeem Sufhanii */}
        <Link
          href="/"
          className="font-serif text-xl sm:text-2xl text-[#f3ede3] tracking-normal font-normal hover:opacity-85 transition-opacity"
        >
          Azeem Sufhanii
        </Link>

        {/* Right Nav Links */}
        <div className="flex items-center gap-6 sm:gap-8 text-sm data-gemini-sans">
          {/* Services with Dropdown */}
          <div
            className="relative"
            onPointerEnter={() => setServicesOpen(true)}
            onPointerLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-[#d5e7e4] hover:text-[#f3ede3] transition-colors py-1 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#38d9c4]"
              aria-expanded={servicesOpen}
              aria-controls={servicesMenuId}
              onClick={() => setServicesOpen((prev) => !prev)}
            >
              <span>Services</span>
              <svg
                viewBox="0 0 10 6"
                className={`w-2.5 h-2.5 fill-none stroke-current stroke-1.5 transition-transform duration-200 ${
                  servicesOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              >
                <path d="M1 1l4 4 4-4" />
              </svg>
            </button>

            {servicesOpen && (
              <ul
                id={servicesMenuId}
                role="menu"
                className="absolute left-0 mt-2 w-48 rounded-xl border border-[#214b47] bg-[#071d20]/95 p-2 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                {servicesList.map((item) => (
                  <li key={item.href} role="none">
                    <Link
                      role="menuitem"
                      href={item.href}
                      className="block rounded-lg px-3 py-2 text-xs text-[#c0e0dc] hover:bg-[#123639] hover:text-[#f3ede3] transition-colors"
                      onClick={() => setServicesOpen(false)}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Link
            href="/projects"
            className="text-[#d5e7e4] hover:text-[#f3ede3] transition-colors"
          >
            Portfolio
          </Link>

          <Link
            href="/contact"
            className="text-[#d5e7e4] hover:text-[#f3ede3] transition-colors"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#2b5954] text-[#caece7] hover:border-[#428a83] hover:bg-[#103335] text-xs font-normal transition-all"
          >
            Contact
          </Link>
        </div>
      </nav>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO MAIN COMPOSITION (Left Copy + Right 3D Visualization)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="relative z-10 flex-1 max-w-[1600px] w-full mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-4 py-8 lg:py-0 min-h-[calc(100vh-80px)]">
        {/* LEFT COLUMN: Editorial Typography & CTA (cols 1 to 5) */}
        <div className="lg:col-span-5 flex flex-col justify-center items-start lg:pr-6 z-20">
          {/* Small Eyebrow with Trailing Hairline Rule */}
          <div className="flex items-center gap-4 mb-6">
            <span className="data-gemini-sans text-[11px] uppercase tracking-[0.22em] text-[#7ca9a4] font-medium">
              Data Management
            </span>
            <span
              className="h-[1px] w-20 sm:w-28 bg-[#528984]/45"
              aria-hidden="true"
            />
          </div>

          {/* Large High-Contrast Editorial Serif Headline */}
          <h1 className="data-gemini-headline text-[#f3ede4] text-5xl sm:text-6xl md:text-7xl lg:text-[4.8rem] xl:text-[5.6rem]">
            <span className="block">one record,</span>
            <span className="block mt-1 sm:mt-2">every system</span>
          </h1>

          {/* Clean Humanist Supporting Text */}
          <p className="data-gemini-sans text-[#96b8b4] text-base sm:text-lg md:text-xl font-normal leading-relaxed mt-6 sm:mt-7 max-w-md">
            Postgres owns the row. Every system stays in sync.
          </p>

          {/* Rounded Pill CTA */}
          <div className="mt-8 sm:mt-10">
            <Link
              href="/contact"
              className="data-gemini-cta group inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-medium text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#38d9c4]"
            >
              <span>Start a conversation</span>
              <span
                className="inline-block transition-transform duration-200 group-hover:translate-x-1.5"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: Three.js 3D Stack Visualization (cols 6 to 12) */}
        <div
          ref={stageRef}
          className="lg:col-span-7 relative w-full h-[460px] sm:h-[560px] lg:h-[84vh] max-h-[880px] flex items-center justify-center overflow-visible"
        >
          {/* Radial soft atmospheric glow behind 3D stack */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(56,217,196,0.18)_0%,rgba(13,148,136,0.06)_45%,transparent_72%)]"
          />

          {/* Three.js Scene */}
          <div className="absolute inset-0 w-full h-full">
            <DataHeroScene
              reduced={reduced}
              pointer={pointer}
              onAnchorsUpdate={handleAnchorsUpdate}
              onReadyChange={setWebglReady}
            />
          </div>

          {/* SVG Connector Lines Overlay */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-20 hidden md:block"
            aria-hidden="true"
          >
            {/* POSTGRES connector: Start -> Angled -> Horizontal */}
            <path
              d={`M ${pgAnchor.x} ${pgAnchor.y} L ${pgCornerX} ${pgTargetY} L ${pgTargetX - 12} ${pgTargetY}`}
              className="data-gemini-connector"
            />
            {/* Dot at start on slab */}
            <circle
              cx={pgAnchor.x}
              cy={pgAnchor.y}
              r="3.5"
              className="data-gemini-node-dot"
            />
            {/* Dot at end before label */}
            <circle
              cx={pgTargetX - 12}
              cy={pgTargetY}
              r="3.5"
              className="data-gemini-node-dot"
            />

            {/* LIVE WRITES connector */}
            <path
              d={`M ${wrAnchor.x} ${wrAnchor.y} L ${wrCornerX} ${wrTargetY} L ${wrTargetX - 12} ${wrTargetY}`}
              className="data-gemini-connector"
            />
            <circle
              cx={wrAnchor.x}
              cy={wrAnchor.y}
              r="3.5"
              className="data-gemini-node-dot"
            />
            <circle
              cx={wrTargetX - 12}
              cy={wrTargetY}
              r="3.5"
              className="data-gemini-node-dot"
            />

            {/* WAREHOUSE connector (violet tint) */}
            <path
              d={`M ${whAnchor.x} ${whAnchor.y} L ${whCornerX} ${whTargetY} L ${whTargetX - 12} ${whTargetY}`}
              className="data-gemini-connector data-gemini-connector-violet"
            />
            <circle
              cx={whAnchor.x}
              cy={whAnchor.y}
              r="3.5"
              className="data-gemini-node-dot data-gemini-node-dot-violet"
            />
            <circle
              cx={whTargetX - 12}
              cy={whTargetY}
              r="3.5"
              className="data-gemini-node-dot data-gemini-node-dot-violet"
            />
          </svg>

          {/* HTML Annotations positioned at endpoints */}
          <div
            className="absolute pointer-events-none z-20 hidden md:block"
            style={{
              left: `${pgTargetX}px`,
              top: `${pgTargetY}px`,
              transform: "translateY(-50%)",
            }}
          >
            <span className="data-gemini-label">Postgres</span>
          </div>

          <div
            className="absolute pointer-events-none z-20 hidden md:block"
            style={{
              left: `${wrTargetX}px`,
              top: `${wrTargetY}px`,
              transform: "translateY(-50%)",
            }}
          >
            <span className="data-gemini-label">Live writes</span>
          </div>

          <div
            className="absolute pointer-events-none z-20 hidden md:block"
            style={{
              left: `${whTargetX}px`,
              top: `${whTargetY}px`,
              transform: "translateY(-50%)",
            }}
          >
            <span className="data-gemini-label data-gemini-label-violet">
              Warehouse
            </span>
          </div>

          {/* Mobile annotations bar when lines are hidden */}
          <div className="md:hidden absolute bottom-2 inset-x-4 flex items-center justify-center gap-5 z-20 bg-[#071b1d]/85 py-2 px-3 rounded-full border border-[#1f4b48] backdrop-blur-md">
            <span className="data-gemini-label flex items-center gap-1.5 text-[10px]">
              <span className="w-2 h-2 rounded-full bg-[#5eead4] inline-block" />
              Postgres
            </span>
            <span className="data-gemini-label flex items-center gap-1.5 text-[10px]">
              <span className="w-2 h-2 rounded-full bg-[#5eead4] inline-block" />
              Live writes
            </span>
            <span className="data-gemini-label data-gemini-label-violet flex items-center gap-1.5 text-[10px]">
              <span className="w-2 h-2 rounded-full bg-[#c084fc] inline-block" />
              Warehouse
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
