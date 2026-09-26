"use client";

import { useState, type KeyboardEvent, type ReactNode } from "react";

import { VenueTrackMap } from "@/components/sections/venue-track-map";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

function Lights() {
  return (
    <>
      <span />
      <span />
      <span />
    </>
  );
}

function Browser({
  domain,
  children,
  className,
}: {
  domain: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("web-browser", className)}>
      <div className="web-browser-bar">
        <span />
        <span />
        <span />
        <em>{domain}</em>
      </div>
      {children}
    </div>
  );
}

const slots = [
  { time: "9:00", name: "North loop", price: "$220" },
  { time: "1:30", name: "Full course", price: "$420" },
  { time: "4:00", name: "Club hire", price: "$1,800" },
];

function BookingScreen() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="web-book">
      <div className="web-book-map">
        <VenueTrackMap trackId="ridgeline" reduced={reduced} compact className="h-full" />
        <span className="web-book-map-meta">4.1 mi · 20 turns</span>
      </div>
      <div className="web-book-copy">
        <p className="web-book-kicker">Weekend bookings open</p>
        <p className="web-book-name">Ridgeline</p>
        <ul>
          {slots.map((slot) => (
            <li key={slot.time}>
              <span>{slot.name}</span>
              <em>{slot.time}</em>
              <b>{slot.price}</b>
            </li>
          ))}
        </ul>
        <span className="web-book-cta">Pick a session</span>
      </div>
    </div>
  );
}

function CmsScreen() {
  return (
    <div className="web-cms">
      <p className="web-cms-nav">
        Venues
        <span>Published</span>
      </p>
      <p className="web-cms-title">Ridgeline Motor Club</p>
      <label>
        Weekend line
        <span>Weekend bookings open</span>
      </label>
      <label>
        Featured session
        <span>North loop · 9:00 · $220</span>
      </label>
      <label>
        Schema type
        <span>Event</span>
      </label>
      <span className="web-cms-publish">Publish</span>
    </div>
  );
}

function EdgeScreen() {
  return (
    <div className="web-edge">
      <p className="web-edge-label">Edge cache</p>
      <p className="web-edge-value">&lt;100ms</p>
      <p className="web-edge-note">TTFB, New York and Lahore</p>
      <ul>
        <li>
          <span />
          <b>IAD</b>
          <em>hit</em>
        </li>
        <li>
          <span />
          <b>FRA</b>
          <em>hit</em>
        </li>
        <li>
          <span />
          <b>SIN</b>
          <em>stale-while-revalidate</em>
        </li>
      </ul>
    </div>
  );
}

export function StackStage() {
  return (
    <div className="web-stack" aria-hidden="true">
      <div className="web-stack-pane is-cms">
        <div data-web-shell="cms">
          <Browser domain="cms.example.com/venues/ridgeline">
            <CmsScreen />
          </Browser>
        </div>
      </div>
      <div className="web-stack-pane is-site">
        <div data-web-shell="site">
          <Browser domain="book.example.com/ridgeline">
            <BookingScreen />
          </Browser>
        </div>
      </div>
      <div className="web-stack-pane is-edge">
        <div data-web-shell="edge">
          <Browser domain="edge">
            <EdgeScreen />
          </Browser>
        </div>
      </div>
    </div>
  );
}

const phpPlugins = [
  { name: "cache-pro", state: "update" },
  { name: "seo-pack", state: "conflict" },
  { name: "form-builder", state: "ok" },
  { name: "security-scan", state: "update" },
];

export function MigrateStage() {
  return (
    <div className="web-migrate" aria-hidden="true">
      <div data-web-shell="php" className="web-migrate-pane is-php">
        <div className="web-migrate-bar">
          <Lights />
          <em>club.com/wp-admin</em>
        </div>
        <p className="web-migrate-kicker">Public PHP app</p>
        <p className="web-migrate-title">WordPress</p>
        <p className="web-migrate-warn">Plugin updates · MySQL on every request</p>
        <ul>
          {phpPlugins.map((plugin) => (
            <li key={plugin.name}>
              <span className={cn("web-migrate-dot", plugin.state)} />
              {plugin.name}
              <b>{plugin.state === "ok" ? "idle" : plugin.state}</b>
            </li>
          ))}
        </ul>
      </div>
      <div data-web-shell="headless" className="web-migrate-pane is-headless">
        <div className="web-migrate-bar">
          <Lights />
          <em>preview.example.com</em>
          <i>auth</i>
        </div>
        <p className="web-migrate-kicker">Next.js plus a private CMS</p>
        <p className="web-migrate-title">Headless</p>
        <p className="web-migrate-ok">No public database. HTML at the edge.</p>
        <ul>
          <li>
            <span className="web-migrate-dot ok" />
            /venues/[slug]
            <b>SSR</b>
          </li>
          <li>
            <span className="web-migrate-dot ok" />
            /book
            <b>static</b>
          </li>
          <li>
            <span className="web-migrate-dot ok" />
            preview
            <b>signed</b>
          </li>
          <li>
            <span className="web-migrate-dot ok" />
            sitemap.xml
            <b>build</b>
          </li>
        </ul>
      </div>
    </div>
  );
}

const prototypes = [
  {
    id: "v1",
    path: "/v1",
    tab: "List",
    hint: "all sessions",
    kind: "list" as const,
    why: "Every session on one screen, with seats left. For regulars who already know the track.",
  },
  {
    id: "v2",
    path: "/v2",
    tab: "Featured",
    hint: "hero session",
    kind: "featured" as const,
    why: "One session, one button. For campaign traffic that lands ready to book.",
  },
  {
    id: "v3",
    path: "/v3",
    tab: "Map",
    hint: "track view",
    kind: "map" as const,
    why: "Sessions tied to the part of the circuit they run. For first-timers picking a loop.",
  },
];

const listSlots = [
  { time: "9:00", name: "North loop", price: "$220", left: 3, total: 12 },
  { time: "1:30", name: "Full course", price: "$420", left: 7, total: 10 },
  { time: "4:00", name: "Club hire", price: "$1,800", left: 1, total: 2 },
];

const mapSlots = [
  { time: "9:00", name: "North loop", tone: "is-a" },
  { time: "1:30", name: "Full course", tone: "is-b" },
  { time: "4:00", name: "Club hire", tone: "is-c" },
];

function PrototypeScreen({ kind }: { kind: (typeof prototypes)[number]["kind"] }) {
  const reduced = usePrefersReducedMotion();

  if (kind === "map") {
    return (
      <div className="web-proto-screen is-map">
        <div className="web-proto-map">
          <VenueTrackMap trackId="ridgeline" reduced={reduced} compact className="h-full" />
        </div>
        <ul className="web-proto-legend">
          {mapSlots.map((slot) => (
            <li key={slot.time} className={slot.tone}>
              <i aria-hidden="true" />
              <span>{slot.name}</span>
              <em>{slot.time}</em>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (kind === "featured") {
    return (
      <div className="web-proto-screen is-featured">
        <div className="web-proto-hero">
          <p>Saturday · North loop</p>
          <b>9:00</b>
          <span>3 of 12 spots left</span>
        </div>
        <div className="web-proto-cta">
          <em>$220</em>
          <strong>Book North loop</strong>
        </div>
        <p className="web-proto-next">Next: Full course 1:30 · $420</p>
      </div>
    );
  }

  return (
    <div className="web-proto-screen is-list">
      <p className="web-proto-list-head">
        <span>Sat 14 Jun</span>
        <span>3 sessions</span>
      </p>
      {listSlots.map((slot) => (
        <div key={slot.time} className="web-proto-row">
          <em>{slot.time}</em>
          <div>
            <span>{slot.name}</span>
            <i aria-hidden="true">
              <b style={{ width: `${((slot.total - slot.left) / slot.total) * 100}%` }} />
            </i>
            <small>{slot.left === 1 ? "1 spot left" : `${slot.left} spots left`}</small>
          </div>
          <strong>{slot.price}</strong>
        </div>
      ))}
    </div>
  );
}

export function PrototypeStage() {
  const [active, setActive] = useState("v2");

  const select = (id: string, tablist?: HTMLElement) => {
    setActive(id);
    tablist
      ?.querySelector<HTMLButtonElement>(`[data-proto-tab="${id}"]`)
      ?.focus();
  };

  return (
    <div className="web-proto">
      <p className="web-proto-lede" aria-hidden="true">
        Three live directions for the same page. Pick one to bring it forward.
      </p>
      <div
        className="web-proto-tabs"
        role="tablist"
        aria-label="Prototype directions"
        onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
          const index = prototypes.findIndex((item) => item.id === active);
          if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            event.preventDefault();
            const next = prototypes[(index + 1) % prototypes.length];
            if (next) select(next.id, event.currentTarget);
          } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            event.preventDefault();
            const next = prototypes[(index - 1 + prototypes.length) % prototypes.length];
            if (next) select(next.id, event.currentTarget);
          }
        }}
      >
        {prototypes.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            data-proto-tab={item.id}
            aria-selected={item.id === active}
            aria-controls="web-proto-panel"
            aria-label={`${item.tab} direction, ${item.hint}, at preview dot example dot com ${item.path}`}
            tabIndex={item.id === active ? 0 : -1}
            className={cn("web-proto-tab", item.id === active && "is-selected")}
            onClick={() => setActive(item.id)}
          >
            <span className="web-proto-tab-name">{item.tab}</span>
            <span className="web-proto-tab-path" aria-hidden="true">
              {item.path}
            </span>
          </button>
        ))}
      </div>
      <div className="web-proto-stage" id="web-proto-panel">
        {prototypes.map((item) => (
          <div
            key={item.id}
            className={cn(
              "web-proto-pane",
              `is-${item.id}`,
              item.id === active && "is-active",
            )}
            onClick={() => setActive(item.id)}
          >
            <div data-web-shell={item.id} aria-hidden="true">
              <Browser domain={`preview.example.com${item.path}`}>
                <PrototypeScreen kind={item.kind} />
              </Browser>
            </div>
          </div>
        ))}
      </div>
      <p className="web-proto-why" aria-live="polite">
        <b>{prototypes.find((item) => item.id === active)?.tab}</b>
        {prototypes.find((item) => item.id === active)?.why}
      </p>
    </div>
  );
}

const crawl = [
  { path: "/", state: "index" },
  { path: "/venues/ridgeline", state: "index" },
  { path: "/venues/coastal", state: "index" },
  { path: "/book", state: "index" },
  { path: "/preview", state: "noindex" },
];

const vitals = [
  { label: "LCP", value: "1.2s" },
  { label: "CLS", value: "0.01" },
  { label: "INP", value: "80ms" },
  { label: "Lighthouse", value: "95" },
];

export function SeoStage() {
  return (
    <div className="web-seo" aria-hidden="true">
      <div className="web-seo-panel">
        <div className="web-seo-bar">
          <Lights />
          <em>audit · track booking</em>
        </div>
        <div className="web-seo-grid">
          <div>
            <p className="web-seo-label">Crawl path</p>
            <ul>
              {crawl.map((row) => (
                <li key={row.path}>
                  <code>{row.path}</code>
                  <b className={row.state === "index" ? "is-ok" : "is-off"}>
                    {row.state}
                  </b>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="web-seo-label">Launch bar</p>
            <dl>
              {vitals.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
