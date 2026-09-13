"use client";

import { useCallback, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.22, 1, 0.36, 1] as const;

type Tenant = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  accent: string;
  accentSoft: string;
  surface: string;
  slots: { time: string; label: string; price: string; open: boolean }[];
};

const tenants: Tenant[] = [
  {
    id: "a",
    label: "Site A",
    title: "Studio sessions",
    subtitle: "Week of 14 April",
    accent: "#5b4fd6",
    accentSoft: "rgb(91 79 214 / 0.14)",
    surface: "#f4f3ff",
    slots: [
      { time: "9:00", label: "Morning block", price: "$120", open: true },
      { time: "1:30", label: "Afternoon block", price: "$120", open: true },
      { time: "4:00", label: "Evening block", price: "$140", open: false },
    ],
  },
  {
    id: "b",
    label: "Site B",
    title: "Consultation slots",
    subtitle: "Week of 21 April",
    accent: "#0a8f78",
    accentSoft: "rgb(10 143 120 / 0.14)",
    surface: "#eefaf6",
    slots: [
      { time: "8:30", label: "Intro call", price: "$95", open: true },
      { time: "12:00", label: "Working session", price: "$180", open: true },
      { time: "3:30", label: "Team review", price: "$240", open: false },
    ],
  },
  {
    id: "c",
    label: "Site C",
    title: "Class bookings",
    subtitle: "Week of 28 April",
    accent: "#c45c26",
    accentSoft: "rgb(196 92 38 / 0.14)",
    surface: "#fff6ef",
    slots: [
      { time: "10:00", label: "Beginner class", price: "$65", open: true },
      { time: "2:00", label: "Open session", price: "$55", open: true },
      { time: "5:30", label: "Private lesson", price: "$110", open: true },
    ],
  },
];

const platform = {
  color: "#3b5bdb",
  soft: "rgb(59 91 219 / 0.1)",
};

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];

function TenantTabs({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (id: string) => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);

  const move = useCallback(
    (from: number) => {
      const next = (from + tenants.length) % tenants.length;
      onSelect(tenants[next].id);
      listRef.current
        ?.querySelector<HTMLButtonElement>(`[data-tenant="${tenants[next].id}"]`)
        ?.focus();
    },
    [onSelect],
  );

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label="Tenant site"
      className="flex gap-1 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {tenants.map((tenant) => {
        const selected = tenant.id === active;
        return (
          <button
            key={tenant.id}
            type="button"
            role="tab"
            data-tenant={tenant.id}
            id={`tenant-tab-${tenant.id}`}
            aria-selected={selected}
            aria-controls="tenant-booking-panel"
            tabIndex={selected ? 0 : -1}
            onClick={() => onSelect(tenant.id)}
            onKeyDown={(event) => {
              const index = tenants.findIndex((t) => t.id === tenant.id);
              if (event.key === "ArrowRight") {
                event.preventDefault();
                move(index + 1);
              }
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                move(index - 1);
              }
            }}
            className="shrink-0 rounded-lg px-3 py-2.5 text-sm font-medium transition-[background-color,color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              backgroundColor: selected
                ? "var(--tenant-accent-soft)"
                : "transparent",
              color: selected ? "var(--tenant-accent)" : "var(--tenant-muted)",
              outlineColor: "var(--tenant-accent)",
            }}
          >
            {tenant.label}
          </button>
        );
      })}
    </div>
  );
}

function LayoutPreview({ reduced }: { reduced: boolean }) {
  const morph = reduced ? "none" : "fill 350ms ease, stroke 350ms ease";

  return (
    <svg
      viewBox="0 0 280 72"
      className="h-[4.5rem] w-full sm:h-[5rem]"
      aria-hidden="true"
    >
      <rect
        x="0"
        y="0"
        width="280"
        height="28"
        rx="6"
        fill="var(--tenant-accent-soft)"
        style={{ transition: morph }}
      />
      <rect
        x="0"
        y="36"
        width="132"
        height="36"
        rx="6"
        fill="var(--tenant-surface)"
        stroke="var(--tenant-line)"
        strokeWidth="1"
        style={{ transition: morph }}
      />
      <rect
        x="148"
        y="36"
        width="132"
        height="36"
        rx="6"
        fill="var(--tenant-surface)"
        stroke="var(--tenant-line)"
        strokeWidth="1"
        style={{ transition: morph }}
      />
      <rect
        x="12"
        y="10"
        width="48"
        height="8"
        rx="2"
        fill="var(--tenant-accent)"
        opacity="0.55"
        style={{ transition: morph }}
      />
      <rect
        x="12"
        y="48"
        width="72"
        height="6"
        rx="2"
        fill="var(--tenant-muted)"
        opacity="0.35"
      />
      <rect
        x="160"
        y="48"
        width="56"
        height="6"
        rx="2"
        fill="var(--tenant-muted)"
        opacity="0.35"
      />
    </svg>
  );
}

function WeekStrip() {
  return (
    <div className="mt-4 flex gap-1.5">
      {weekDays.map((day, index) => {
        const selected = index === 2;
        return (
          <div
            key={day}
            className="flex flex-1 flex-col items-center rounded-lg py-2 text-center transition-[background-color,color] duration-300"
            style={{
              backgroundColor: selected
                ? "var(--tenant-accent)"
                : "var(--tenant-surface)",
              color: selected ? "#fafbfc" : "var(--tenant-muted)",
            }}
          >
            <span className="text-[10px] leading-none">{day}</span>
            <span className="mt-1 font-display text-base tabular-nums leading-none">
              {10 + index}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function BookingPanel({
  tenant,
  reduced,
  onSelectTenant,
}: {
  tenant: Tenant;
  reduced: boolean;
  onSelectTenant: (id: string) => void;
}) {
  const morph = reduced
    ? "none"
    : "background-color 350ms ease, color 350ms ease, border-color 350ms ease";

  return (
    <div
      className="overflow-hidden rounded-2xl shadow-[0_1px_0_rgb(26_35_50/0.05),0_20px_40px_-24px_rgb(26_35_50/0.28)]"
      style={{
        backgroundColor: "var(--tenant-bg)",
        color: "var(--tenant-fg)",
        transition: morph,
      }}
    >
      <div
        className="border-b px-4 py-3 sm:px-5"
        style={{ borderColor: "var(--tenant-line)" }}
      >
        <TenantTabs active={tenant.id} onSelect={onSelectTenant} />
      </div>

      <div
        role="tabpanel"
        id="tenant-booking-panel"
        aria-labelledby={`tenant-tab-${tenant.id}`}
        className="px-4 py-5 sm:px-5 sm:py-6"
      >
        <LayoutPreview reduced={reduced} />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tenant.id}
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: reduced ? 0 : 0.32, ease: settle }}
          >
            <h3 className="mt-4 font-display text-[clamp(1.5rem,4vw,2rem)] leading-[1.08] tracking-tight">
              {tenant.title}
            </h3>
            <p className="mt-1 text-sm" style={{ color: "var(--tenant-muted)" }}>
              {tenant.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        <WeekStrip />

        <ul
          className="mt-5 divide-y"
          style={{ borderColor: "var(--tenant-line)" }}
        >
          {tenant.slots.map((slot) => (
            <li
              key={slot.time}
              className="flex items-baseline justify-between gap-3 py-3 first:pt-0 last:pb-0"
              style={{ borderColor: "var(--tenant-line)" }}
            >
              <div className="flex min-w-0 items-baseline gap-3">
                <span
                  className="shrink-0 font-display text-xl tabular-nums leading-none"
                  style={{
                    color: slot.open ? "var(--tenant-fg)" : "var(--tenant-muted)",
                  }}
                >
                  {slot.time}
                </span>
                <span
                  className="truncate text-sm"
                  style={{
                    color: slot.open ? "var(--tenant-fg)" : "var(--tenant-muted)",
                  }}
                >
                  {slot.label}
                </span>
              </div>
              <span
                className="shrink-0 text-sm font-medium tabular-nums"
                style={{
                  color: slot.open ? "var(--tenant-accent)" : "var(--tenant-muted)",
                  transition: morph,
                }}
              >
                {slot.open ? slot.price : "Full"}
              </span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="mt-6 w-full rounded-xl py-3 text-sm font-medium transition-[background-color,transform] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.99]"
          style={{
            backgroundColor: "var(--tenant-accent)",
            color: "#fafbfc",
            outlineColor: "var(--tenant-accent)",
          }}
        >
          Continue to checkout
        </button>
      </div>

      <div
        className="flex items-center gap-2 border-t px-4 py-3 sm:px-5"
        style={{
          borderColor: "var(--tenant-line)",
          backgroundColor: platform.soft,
        }}
      >
        <span
          className="size-2 shrink-0 rounded-full"
          style={{ backgroundColor: platform.color }}
          aria-hidden="true"
        />
        <p className="text-xs leading-5" style={{ color: "var(--tenant-muted)" }}>
          Shared Next.js platform: auth, calendar, and Stripe checkout
        </p>
      </div>
    </div>
  );
}

function TenantLabVisual({ reduced }: { reduced: boolean }) {
  const [activeId, setActiveId] = useState(tenants[0].id);
  const tenant = tenants.find((t) => t.id === activeId) ?? tenants[0];

  const tenantVars = {
    "--tenant-bg": "#eef1f6",
    "--tenant-fg": "#1a2234",
    "--tenant-muted": "#64748b",
    "--tenant-line": "#c8d0dc",
    "--tenant-surface": tenant.surface,
    "--tenant-accent": tenant.accent,
    "--tenant-accent-soft": tenant.accentSoft,
  } as CSSProperties;

  return (
    <div className="relative mx-auto w-full max-w-md" style={tenantVars}>
      <BookingPanel
        tenant={tenant}
        reduced={reduced}
        onSelectTenant={setActiveId}
      />
    </div>
  );
}

export function WebV3Mock1() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="web-v3-mock-1"
      aria-labelledby="web-v3-mock-1-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: reduced ? 0 : 0.5, ease: settle }}
          >
            <TenantLabVisual reduced={reduced} />
          </motion.div>
        </div>

        <div className="lg:order-2">
          <h2
            id="web-v3-mock-1-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            One codebase, three storefronts
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            I ship Next.js and React product UIs. Three brands can run separate
            booking and checkout on one shared platform. Each site gets its own
            colors, copy, and domain. Calendars, forms, and Stripe stay in one
            codebase.
          </p>
        </div>
      </div>
    </section>
  );
}
