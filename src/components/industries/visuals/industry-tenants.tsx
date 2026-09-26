"use client";

import "./industry-tenants.css";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Lock,
  Receipt,
  UserMinus,
  UserPlus,
  type LucideIcon,
} from "lucide-react";

import { useMotionPaused } from "@/hooks/use-motion-paused";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

/*
 * Hero illustration for the SaaS page: a multi-tenant admin view where each workspace
 * keeps its own plan, seats, and tenant id. Seat usage drifts, workspaces change plans,
 * and an event feed logs what happened. Tenants and events are synthetic sample data.
 */

type Plan = "Free" | "Pro" | "Team";

const SEAT_LIMIT: Record<Plan, number> = { Free: 5, Pro: 20, Team: 50 };

const TENANTS = [
  { name: "north-studio", id: "tn_4k2p", plan: "Free", seats: 4 },
  { name: "atlas-labs", id: "tn_9x1d", plan: "Pro", seats: 14 },
  { name: "kite-ops", id: "tn_2m7q", plan: "Team", seats: 31 },
  { name: "meridian", id: "tn_6r3v", plan: "Pro", seats: 12 },
] as const satisfies readonly { name: string; id: string; plan: Plan; seats: number }[];

type TenantEvent = { tenant: number; text: string; icon: LucideIcon; plan?: Plan; seats?: number };

// The script nets out to zero (every plan and seat change is later reversed),
// so replaying it from the base state loops without a visible jump.
const EVENTS: TenantEvent[] = [
  { tenant: 1, text: "atlas-labs upgraded to Team", icon: ArrowUpRight, plan: "Team" },
  { tenant: 2, text: "kite-ops invited 3 seats", icon: UserPlus, seats: 3 },
  { tenant: 3, text: "Invoice sent · meridian", icon: Receipt },
  { tenant: 0, text: "north-studio upgraded to Pro", icon: ArrowUpRight, plan: "Pro" },
  { tenant: 3, text: "meridian invited 2 seats", icon: UserPlus, seats: 2 },
  { tenant: 1, text: "Invoice sent · atlas-labs", icon: Receipt },
  { tenant: 1, text: "atlas-labs moved to Pro", icon: ArrowDownRight, plan: "Pro" },
  { tenant: 0, text: "Invoice sent · north-studio", icon: Receipt },
  { tenant: 0, text: "north-studio moved to Free", icon: ArrowDownRight, plan: "Free" },
  { tenant: 2, text: "kite-ops removed 3 seats", icon: UserMinus, seats: -3 },
  { tenant: 2, text: "Invoice sent · kite-ops", icon: Receipt },
  { tenant: 3, text: "meridian removed 2 seats", icon: UserMinus, seats: -2 },
];

const TICK_MS = 1100;
const TICKS_PER_EVENT = 2;
const FEED_SIZE = 3;
const FEED_AGES = ["now", "2s", "4s"] as const;
// Small per-tick seat drift so the bars feel live between events.
const WOBBLE = [0, 1, 1, 0, -1, 0] as const;

// Server and first client render agree: three events already logged, nothing highlighted.
const INITIAL_TICK = 3 * TICKS_PER_EVENT;
// Reduced motion freezes on the first upgrade at the top of the feed.
const REDUCED_TICK = 1 * TICKS_PER_EVENT;

const mod = (n: number, m: number) => ((n % m) + m) % m;

// Replays the script up to `eventCount` and layers the seat drift on top.
function tenantsAt(tick: number) {
  const applied = mod(Math.floor(tick / TICKS_PER_EVENT), EVENTS.length);
  const state = TENANTS.map((t) => ({ plan: t.plan as Plan, seats: t.seats as number }));
  for (const event of EVENTS.slice(0, applied)) {
    const target = state[event.tenant];
    if (event.plan) target.plan = event.plan;
    if (event.seats) target.seats += event.seats;
  }
  return state.map((t, index) => {
    const limit = SEAT_LIMIT[t.plan];
    const seats = Math.min(limit, Math.max(1, t.seats + WOBBLE[mod(tick + index * 2, WOBBLE.length)]));
    return { ...TENANTS[index], plan: t.plan, seats, limit };
  });
}

const PLAN_STYLES: Record<Plan, string> = {
  Free: "border-border text-muted-foreground",
  Pro: "border-accent/40 text-[var(--accent-readable)]",
  Team: "border-accent/60 bg-accent/10 text-[var(--accent-readable)]",
};

export function IndustryTenants() {
  const reduced = usePrefersReducedMotion();
  // The page's pause control freezes the loop on its current frame.
  const paused = useMotionPaused();
  const panelRef = useRef<HTMLDivElement>(null);
  const [tick, setTick] = useState(INITIAL_TICK);
  const [running, setRunning] = useState(false);

  // Only tick while the panel is on screen and the tab is visible.
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

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setTick((t) => t + 1), TICK_MS);
    return () => window.clearInterval(id);
  }, [running]);

  const view = reduced ? REDUCED_TICK : tick;
  const eventCount = Math.floor(view / TICKS_PER_EVENT);
  const tenants = tenantsAt(view);
  const latest = EVENTS[mod(eventCount - 1, EVENTS.length)];
  // The row an event touched glows for the tick right after it lands.
  const highlighted =
    !reduced && view > INITIAL_TICK && view % TICKS_PER_EVENT === 0 ? latest.tenant : -1;
  const feed = Array.from({ length: FEED_SIZE }, (_, i) => {
    const index = eventCount - 1 - i;
    return { index, event: EVENTS[mod(index, EVENTS.length)] };
  });

  return (
    <div
      ref={panelRef}
      className="relative rounded-[var(--shape-radius-lg)] border border-border bg-surface/70 p-4 shadow-[0_30px_80px_-40px_color-mix(in_srgb,var(--accent)_45%,transparent)] backdrop-blur-sm sm:p-5"
    >
      <p className="sr-only">
        Illustration: an admin view of four sample workspaces, each isolated with its own
        tenant id, plan, and seat usage, with a feed of upgrades, seat invites, and invoices.
      </p>
      <div aria-hidden="true">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-medium">
            <span className="relative flex size-2">
              <span className="industry-live-ping absolute inset-0 rounded-full bg-accent" />
              <span className="relative size-2 rounded-full bg-accent" />
            </span>
            Workspaces
          </span>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
            Sample data
          </span>
        </div>

        <ul className="mt-4 grid gap-2">
          {tenants.map((tenant, index) => {
            const lit = index === highlighted;
            return (
              <li
                key={tenant.id}
                className={cn(
                  "rounded-xl border p-2.5 transition-colors duration-500",
                  lit ? "border-accent/40 bg-accent/5" : "border-border bg-background/70",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex min-w-0 items-baseline gap-2">
                    <span className="truncate text-sm font-medium leading-5">{tenant.name}</span>
                    <span className="flex shrink-0 items-center gap-1 font-mono text-[0.6rem] text-muted-foreground">
                      <Lock className="size-2.5" strokeWidth={2.25} />
                      {tenant.id}
                    </span>
                  </span>
                  <span
                    // Keyed by plan so a plan change remounts the badge and pops it in.
                    key={tenant.plan}
                    className={cn(
                      "shrink-0 rounded-full border px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.1em]",
                      PLAN_STYLES[tenant.plan],
                      lit && latest.plan && "industry-tenants-badge-in",
                    )}
                  >
                    {tenant.plan}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-border">
                    <span
                      className="absolute inset-y-0 left-0 rounded-full bg-accent transition-[width] duration-700 ease-out"
                      style={{ width: `${(tenant.seats / tenant.limit) * 100}%` }}
                    />
                  </span>
                  <span className="w-[3.25rem] shrink-0 text-right font-mono text-[0.6rem] leading-3 tabular-nums text-muted-foreground">
                    {tenant.seats}/{tenant.limit}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>

        <ul className="industry-tenants-feed mt-4 grid h-[5.25rem] content-start gap-1.5 overflow-hidden border-t border-border pt-3">
          {feed.map(({ index, event }, position) => {
            const Icon = event.icon;
            const newest = position === 0;
            return (
              <li
                key={index}
                className={cn(
                  "flex h-5 items-center gap-2 text-xs transition-colors duration-500",
                  newest ? "text-foreground" : "text-muted-foreground",
                  newest && index >= INITIAL_TICK / TICKS_PER_EVENT && "industry-tenants-event-in",
                )}
              >
                <Icon
                  className={cn(
                    "size-3.5 shrink-0",
                    newest ? "text-[var(--accent-readable)]" : "text-muted-foreground",
                  )}
                  strokeWidth={2.25}
                />
                <span className="min-w-0 flex-1 truncate">{event.text}</span>
                <span className="shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground">
                  {FEED_AGES[position]}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
