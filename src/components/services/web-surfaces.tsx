"use client";

import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { gsap } from "gsap";

import { MotionPauseButton } from "@/components/motion/motion-pause-button";
import { VenueTrackMap } from "@/components/sections/venue-track-map";
import { useMotionPaused } from "@/hooks/use-motion-paused";
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

function BookingScreen({ line }: { line: string }) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="web-book">
      <div className="web-book-map">
        <VenueTrackMap trackId="ridgeline" reduced={reduced} compact className="h-full" />
        <span className="web-book-map-meta">4.1 mi · 20 turns</span>
      </div>
      <div className="web-book-copy">
        <p key={line} className="web-book-kicker web-book-fresh">
          {line}
        </p>
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

// The weekend line an editor can publish. The first one is live on load.
const cmsLines = [
  "Weekend bookings open",
  "North loop sold out. Join the waitlist",
  "Night sessions start Friday",
];

const regions = ["IAD", "FRA", "SIN"];

// One publish, step by step. Step 0 is idle; each later step lasts STEP_MS[step].
const STEP_MS = [0, 450, 800, 700, 380, 380, 380, 900];
const LAST_STEP = STEP_MS.length - 1;

const stackSteps = [
  { label: "Publish", detail: "The editor saves in the CMS" },
  { label: "Webhook", detail: "The CMS pings the app" },
  { label: "Revalidate", detail: "Next.js rebuilds that one page" },
  { label: "Edge purge", detail: "Three regions refresh their copy" },
];

// Which rail item is current for a step (-1 while idle).
function railIndex(step: number) {
  if (step === 0) return -1;
  return Math.min(step - 1, stackSteps.length - 1);
}

// How long the stage rests before it publishes the next edit by itself.
const IDLE_SECONDS = 4.5;

function CmsScreen({
  draft,
  live,
  step,
  onDraft,
  onPublish,
}: {
  draft: number;
  live: number;
  step: number;
  onDraft: (index: number) => void;
  onPublish: () => void;
}) {
  const busy = step !== 0;
  const status = step === 1 ? "Saving" : busy || draft === live ? "Published" : "Draft";

  return (
    <div className="web-cms">
      <p className="web-cms-nav">
        Venues
        <span>{status}</span>
      </p>
      <p className="web-cms-title">Ridgeline Motor Club</p>
      <p className="web-cms-field" id="web-cms-line-label">
        Weekend line
      </p>
      <div
        role="radiogroup"
        aria-labelledby="web-cms-line-label"
        className="web-cms-options"
        onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
          const dir =
            event.key === "ArrowDown" || event.key === "ArrowRight"
              ? 1
              : event.key === "ArrowUp" || event.key === "ArrowLeft"
                ? -1
                : 0;
          if (!dir || busy) return;
          event.preventDefault();
          const next = (draft + dir + cmsLines.length) % cmsLines.length;
          onDraft(next);
          event.currentTarget
            .querySelectorAll<HTMLButtonElement>('[role="radio"]')
            [next]?.focus();
        }}
      >
        {cmsLines.map((text, index) => (
          <button
            key={text}
            type="button"
            role="radio"
            aria-checked={draft === index}
            aria-disabled={busy}
            tabIndex={draft === index ? 0 : -1}
            className={cn("web-cms-option", draft === index && "is-picked")}
            onClick={() => {
              if (!busy) onDraft(index);
            }}
          >
            <span>{text}</span>
            {live === index ? <em>live</em> : null}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="web-cms-publish"
        aria-disabled={busy || draft === live}
        onClick={() => {
          if (!busy && draft !== live) onPublish();
        }}
      >
        {busy ? "Publishing…" : draft === live ? "Up to date" : "Publish"}
      </button>
    </div>
  );
}

function EdgeScreen({ step }: { step: number }) {
  return (
    <div className="web-edge">
      <p className="web-edge-label">Edge cache</p>
      <p className="web-edge-value">&lt;100ms</p>
      <p className="web-edge-note">TTFB, New York and Lahore</p>
      <ul>
        {regions.map((region, index) => {
          const purging = step === 4 + index;
          return (
            <li key={region} className={cn(purging && "is-purge")}>
              <span />
              <b>{region}</b>
              <em>{purging ? "purge" : "hit"}</em>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function StackStage() {
  const reduced = usePrefersReducedMotion();
  const paused = useMotionPaused();
  const rootRef = useRef<HTMLDivElement>(null);
  const cycleRef = useRef<gsap.core.Tween | null>(null);
  // `live` is what the site shows; `draft` is what the editor has picked.
  const [live, setLive] = useState(0);
  const [draft, setDraft] = useState(0);
  const [step, setStep] = useState(0);
  // Same rules as the "Where you come in" tabs: hold while the pointer or focus
  // is on the editor, or the stage is scrolled out of view.
  const [held, setHeld] = useState(false);
  const [inView, setInView] = useState(false);

  const busy = step !== 0;
  const armed = !busy && !reduced;
  const running = armed && inView && !held && !paused;
  const current = railIndex(step);

  useLayoutEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Walk one publish through its steps. The site takes the new line at the
  // revalidate step, which is when the page actually changes.
  useEffect(() => {
    if (step === 0) return;
    const timer = window.setTimeout(() => {
      if (step === 2) setLive(draft);
      setStep(step === LAST_STEP ? 0 : step + 1);
    }, STEP_MS[step]);
    return () => window.clearTimeout(timer);
  }, [step, draft]);

  // While idle, a timed run of the rail's top line, then publish the next edit.
  useLayoutEffect(() => {
    const bar = rootRef.current?.querySelector<HTMLElement>("[data-stack-progress]");
    if (!bar) return;
    gsap.set(bar, { scaleX: 0 });
    if (!armed) return;
    const tween = gsap.to(bar, {
      scaleX: 1,
      duration: IDLE_SECONDS,
      ease: "none",
      paused: true,
      onComplete: () => {
        // A pending pick goes out first; otherwise move on to the next line.
        setDraft(draft !== live ? draft : (live + 1) % cmsLines.length);
        setStep(1);
      },
    });
    cycleRef.current = tween;
    return () => {
      tween.kill();
      cycleRef.current = null;
    };
  }, [armed, live, draft]);

  // Holding pauses the tween in place, so the line resumes instead of restarting.
  useLayoutEffect(() => {
    const tween = cycleRef.current;
    if (!tween) return;
    if (running) tween.play();
    else tween.pause();
  }, [running, armed, live, draft]);

  const status = busy
    ? `Publishing: ${stackSteps[current]?.label.toLowerCase()}.`
    : `Live on the site: ${cmsLines[live]}. No redeploy was needed.`;

  return (
    <div
      ref={rootRef}
      className="web-stack"
      role="group"
      aria-label="Headless CMS publishing demo"
    >
      <div className="web-stack-head">
        <p className="web-stack-eyebrow" aria-hidden="true">
          Edit in the CMS. Watch the site change.
        </p>
        <MotionPauseButton />
      </div>
      <div className="web-stack-flow">
        <div
          className="web-stack-node is-cms"
          data-web-shell="cms"
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") setHeld(true);
          }}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") setHeld(false);
          }}
          onFocus={() => setHeld(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setHeld(false);
          }}
        >
          <Browser domain="cms.example.com/venues/ridgeline">
            <CmsScreen
              draft={draft}
              live={live}
              step={step}
              onDraft={setDraft}
              onPublish={() => setStep(1)}
            />
          </Browser>
        </div>
        <div
          className={cn("web-stack-link is-a", step === 2 && "is-firing")}
          aria-hidden="true"
        >
          <span>webhook</span>
          <i />
        </div>
        <div className="web-stack-node is-site" data-web-shell="site" aria-hidden="true">
          <Browser domain="book.example.com/ridgeline">
            <BookingScreen line={cmsLines[live]} />
          </Browser>
          <span className={cn("web-stack-badge", step === 3 && "is-busy")}>
            {step === 3 ? "Revalidating" : "Live"}
          </span>
        </div>
        <div
          className={cn("web-stack-link is-b", step >= 4 && step <= 6 && "is-firing")}
          aria-hidden="true"
        >
          <span>purge</span>
          <i />
        </div>
        <div className="web-stack-node is-edge" data-web-shell="edge" aria-hidden="true">
          <Browser domain="edge">
            <EdgeScreen step={step} />
          </Browser>
        </div>
      </div>
      <div className="web-stack-rail-wrap">
        <i data-stack-progress className="web-stack-progress" aria-hidden="true" />
        <ol className="web-stack-rail" aria-label="What happens when an editor publishes">
          {stackSteps.map((item, index) => (
            <li
              key={item.label}
              className={cn(
                index === current && "is-active",
                current > index && "is-done",
              )}
            >
              <b>{item.label}</b>
              <span>{item.detail}</span>
            </li>
          ))}
        </ol>
      </div>
      <p className="web-stack-note">
        No redeploy. The page rebuilds in place and the edge cache refreshes.
      </p>
      <p className="sr-only" aria-live={running ? "off" : "polite"}>
        {status}
      </p>
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
    kind: "list" as const,
    why: "Every session on one screen, with seats left. For regulars who already know the track.",
  },
  {
    id: "v2",
    path: "/v2",
    tab: "Featured",
    kind: "featured" as const,
    why: "One session, one button. For campaign traffic that lands ready to book.",
  },
  {
    id: "v3",
    path: "/v3",
    tab: "Map",
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

// What flips when a direction ships: the prototype's stand-ins become the real thing.
const launchChecks = [
  { label: "Data", before: "Mock", after: "Live" },
  { label: "Search", before: "noindex", after: "Indexed" },
  { label: "Speed", before: "Unmeasured", after: "Lighthouse 95" },
];

// How long each direction shows before the tabs move on by themselves.
const CYCLE_SECONDS = 3.6;

export function PrototypeStage() {
  const reduced = usePrefersReducedMotion();
  const paused = useMotionPaused();
  const rootRef = useRef<HTMLDivElement>(null);
  const cycleRef = useRef<gsap.core.Tween | null>(null);
  const [active, setActive] = useState("v1");
  // Id of the direction that was shipped; the other two are cut.
  const [shipped, setShipped] = useState<string | null>(null);
  // Same rules as the "Where you come in" tabs: the loop keeps going after a
  // pick and holds only while the pointer or focus is on a tab, or the stage
  // is scrolled out of view.
  const [held, setHeld] = useState(false);
  const [inView, setInView] = useState(false);

  const current = prototypes.find((item) => item.id === active) ?? prototypes[0];
  const live = shipped !== null;
  const armed = !live && !reduced;
  const running = armed && inView && !held && !paused;
  // Cut directions are disabled, so keyboard navigation only cycles what is left.
  const reachable = prototypes.filter((item) => !live || item.id === shipped);

  useLayoutEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.45 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // One timed run of the active tab's progress line, then on to the next tab.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const bars = root.querySelectorAll<HTMLElement>("[data-proto-progress]");
    gsap.set(bars, { scaleX: 0 });
    const bar = root.querySelector<HTMLElement>(
      `[data-proto-tab="${active}"] [data-proto-progress]`,
    );
    if (!armed || !bar) return;
    const tween = gsap.to(bar, {
      scaleX: 1,
      duration: CYCLE_SECONDS,
      ease: "none",
      paused: true,
      onComplete: () =>
        setActive((id) => {
          const index = prototypes.findIndex((item) => item.id === id);
          return prototypes[(index + 1) % prototypes.length].id;
        }),
    });
    cycleRef.current = tween;
    return () => {
      tween.kill();
      cycleRef.current = null;
    };
  }, [active, armed]);

  // Holding pauses the tween in place, so the line resumes instead of restarting.
  useLayoutEffect(() => {
    const tween = cycleRef.current;
    if (!tween) return;
    if (running) tween.play();
    else tween.pause();
  }, [running, active, armed]);

  const select = (id: string, tablist?: HTMLElement) => {
    setActive(id);
    tablist
      ?.querySelector<HTMLButtonElement>(`[data-proto-tab="${id}"]`)
      ?.focus();
  };

  const status = live
    ? `${current.tab} shipped. The other two directions were cut.`
    : `${current.tab} in review. ${current.why}`;

  return (
    <div ref={rootRef} className="web-proto">
      <div className="web-proto-side" data-web-shell="directions">
        <div className="web-proto-head">
          <p className="web-proto-eyebrow" aria-hidden="true">
            Three review links, one decision
          </p>
          {!live ? <MotionPauseButton /> : null}
        </div>
        <div
          className="web-proto-tabs"
          role="tablist"
          aria-orientation="vertical"
          aria-label="Prototype directions"
          onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
            const index = reachable.findIndex((item) => item.id === active);
            if (index < 0) return;
            const step =
              event.key === "ArrowDown" || event.key === "ArrowRight"
                ? 1
                : event.key === "ArrowUp" || event.key === "ArrowLeft"
                  ? -1
                  : 0;
            if (!step) return;
            event.preventDefault();
            const next = reachable[(index + step + reachable.length) % reachable.length];
            if (next) select(next.id, event.currentTarget);
          }}
        >
          {prototypes.map((item) => {
            const selected = item.id === active;
            const cut = live && item.id !== shipped;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`web-proto-tab-${item.id}`}
                data-proto-tab={item.id}
                aria-selected={selected}
                aria-controls="web-proto-panel"
                tabIndex={selected ? 0 : -1}
                disabled={cut}
                className={cn(
                  "web-proto-tab",
                  selected && "is-selected",
                  cut && "is-cut",
                  live && item.id === shipped && "is-shipped",
                )}
                onClick={() => setActive(item.id)}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") setHeld(true);
                }}
                onPointerLeave={(event) => {
                  if (event.pointerType !== "mouse") return;
                  const next = event.relatedTarget;
                  if (next instanceof Element && next.closest("[data-proto-tab]")) return;
                  setHeld(false);
                }}
                onFocus={() => setHeld(true)}
                onBlur={(event) => {
                  const next = event.relatedTarget;
                  if (next instanceof Element && next.closest("[data-proto-tab]")) return;
                  setHeld(false);
                }}
              >
                <span className="web-proto-tab-path">{item.path}</span>
                <span className="web-proto-tab-name">{item.tab}</span>
                <span className="web-proto-tab-status">
                  {cut ? "Cut" : live ? "Shipped" : "In review"}
                </span>
                <span className="web-proto-tab-why">
                  <span>{item.why}</span>
                </span>
                <i data-proto-progress className="web-proto-tab-timer" aria-hidden="true" />
              </button>
            );
          })}
        </div>
        <button
          type="button"
          className="web-proto-ship"
          onClick={() => setShipped(live ? null : active)}
        >
          {live ? (
            <>
              <RotateCcw aria-hidden="true" /> Start over
            </>
          ) : (
            <>
              Ship {current.tab} <ArrowRight aria-hidden="true" />
            </>
          )}
        </button>
      </div>
      <div className="web-proto-view" data-web-shell="preview">
        <div
          className={cn("web-proto-frame", live && "is-live")}
          id="web-proto-panel"
          role="tabpanel"
          aria-labelledby={`web-proto-tab-${active}`}
        >
          <div aria-hidden="true">
            <Browser
              domain={live ? "trackbooking.example.com" : `preview.example.com${current.path}`}
            >
              <div key={active} className="web-proto-swap">
                <PrototypeScreen kind={current.kind} />
              </div>
            </Browser>
          </div>
        </div>
        <ul className="web-proto-checks" aria-label="Launch checks">
          {launchChecks.map((check) => (
            <li key={check.label} className={cn(live && "is-done")}>
              <span>{check.label}</span>
              <b>{live ? check.after : check.before}</b>
            </li>
          ))}
        </ul>
      </div>
      <p className="sr-only" aria-live={running ? "off" : "polite"}>
        {status}
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
