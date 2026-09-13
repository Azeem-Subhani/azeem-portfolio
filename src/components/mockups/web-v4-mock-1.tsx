"use client";

import { useState } from "react";
import { Calendar, ChevronRight, Globe } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.04 },
  },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: settle },
  },
};

export const webV4Mock1Chips = [
  "Product UI",
  "White-label surfaces",
  "Shared checkout",
] as const;

type Skin = {
  id: string;
  label: string;
  domain: string;
  phoneDomain: string;
  tint: string;
  wash: string;
  slots: { time: string; label: string; price: string }[];
};

const skins: Skin[] = [
  {
    id: "a",
    label: "Tenant A",
    domain: "app.platform.io/tenants/a",
    phoneDomain: "book.tenant-a.io",
    tint: "var(--accent)",
    wash: "color-mix(in srgb, var(--accent) 16%, var(--surface))",
    slots: [
      { time: "9:00", label: "Morning block", price: "$149" },
      { time: "1:30", label: "Afternoon session", price: "$289" },
      { time: "4:00", label: "Evening slot", price: "$520" },
    ],
  },
  {
    id: "b",
    label: "Tenant B",
    domain: "app.platform.io/tenants/b",
    phoneDomain: "book.tenant-b.io",
    tint: "var(--signal)",
    wash: "color-mix(in srgb, var(--signal) 16%, var(--surface))",
    slots: [
      { time: "8:30", label: "Intro call", price: "$95" },
      { time: "12:00", label: "Working session", price: "$180" },
      { time: "3:30", label: "Team review", price: "$240" },
    ],
  },
];

function TrafficLights() {
  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      <span className="size-2.5 rounded-full bg-error/80" />
      <span className="size-2.5 rounded-full bg-success/70" />
      <span className="size-2.5 rounded-full bg-accent-secondary/70" />
    </div>
  );
}

function CraftBar({ time }: { time: string }) {
  return (
    <div className="flex items-end justify-between px-4 pb-1 pt-2.5 text-[10px] font-medium text-muted-foreground">
      <span className="tabular-nums">{time}</span>
      <span className="flex items-center gap-1.5">
        <svg viewBox="0 0 16 12" className="h-2.5 w-3.5 fill-current" aria-hidden="true">
          <rect x="0" y="6" width="2.2" height="6" rx="0.4" />
          <rect x="3.6" y="3.5" width="2.2" height="8.5" rx="0.4" />
          <rect x="7.2" y="1" width="2.2" height="11" rx="0.4" />
          <rect x="10.8" y="0" width="2.2" height="12" rx="0.4" />
        </svg>
        <svg viewBox="0 0 24 12" className="h-2.5 w-5 fill-current" aria-hidden="true">
          <rect
            x="0"
            y="1"
            width="18"
            height="10"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <rect x="2" y="3" width="13" height="6" rx="1" />
          <rect x="19" y="4" width="2" height="4" rx="0.6" />
        </svg>
      </span>
    </div>
  );
}

function SyncArc({ reduced, tint }: { reduced: boolean; tint: string }) {
  return (
    <svg
      viewBox="0 0 120 80"
      className="pointer-events-none absolute -right-2 bottom-[28%] z-30 hidden w-[7.5rem] sm:block md:w-[8.5rem]"
      aria-hidden="true"
    >
      <path
        d="M 4 72 Q 60 8 116 20"
        fill="none"
        stroke={tint}
        strokeWidth="1.5"
        strokeDasharray="4 5"
        opacity="0.45"
      />
      {!reduced ? (
        <motion.circle
          r="3"
          fill={tint}
          animate={{ offsetDistance: ["0%", "100%"] }}
          style={{
            offsetPath: 'path("M 4 72 Q 60 8 116 20")',
          }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
        />
      ) : null}
    </svg>
  );
}

function AdminBrowser({
  skin,
  activeId,
  onSelect,
  embedded = false,
}: {
  skin: Skin;
  activeId: string;
  onSelect: (id: string) => void;
  embedded?: boolean;
}) {
  return (
    <motion.div
      className={`relative z-10 origin-center ${
        embedded
          ? "mx-auto w-[88%] max-w-[20rem] sm:w-[86%] sm:max-w-[22rem]"
          : "w-full max-w-[min(100%,24rem)] md:max-w-[26rem]"
      }`}
      variants={rise}
    >
      <div className="rounded-[1.25rem] bg-background p-[7px] shadow-[0_0_0_1px_rgb(var(--shadow-color)/0.08),0_28px_56px_-24px_rgb(var(--shadow-color)/0.35)]">
        <div className="overflow-hidden rounded-[0.95rem] bg-surface">
          <div className="flex items-center gap-2 border-b border-border px-3 py-2">
            <TrafficLights />
            <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-lg bg-background/70 px-2.5 py-1.5">
              <Globe className="size-3 shrink-0 text-muted-foreground" strokeWidth={2} />
              <span className="truncate text-[10px] text-muted-foreground">{skin.domain}</span>
            </div>
          </div>

          <div className="flex gap-1 overflow-x-auto border-b border-border bg-background/50 px-2 py-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {skins.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.id)}
                className={`shrink-0 rounded-md px-2.5 py-1 text-[9px] font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                  item.id === activeId
                    ? "text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                style={
                  item.id === activeId
                    ? { background: item.tint, color: "var(--accent-foreground)" }
                    : undefined
                }
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-[4.5rem_1fr] gap-0">
            <div
              className="border-r border-border px-2 py-3"
              style={{ background: skin.wash }}
            >
              <p className="text-[8px] font-medium text-muted-foreground">Nav</p>
              <ul className="mt-2 space-y-1.5">
                {["Schedule", "Bookings", "Themes"].map((item, index) => (
                  <li
                    key={item}
                    className={`rounded-md px-1.5 py-1 text-[8px] ${
                      index === 0
                        ? "font-medium text-foreground"
                        : "text-muted-foreground"
                    }`}
                    style={index === 0 ? { background: "var(--background)" } : undefined}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="px-3 py-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={skin.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: settle }}
                >
                  <p className="font-display text-base leading-tight text-foreground">
                    Week overview
                  </p>
                  <p className="mt-0.5 text-[9px] text-muted-foreground">
                    Shared React admin for every tenant
                  </p>

                  <div className="mt-3 space-y-1.5">
                    {skin.slots.map((slot) => (
                      <div
                        key={slot.time}
                        className="flex items-center justify-between rounded-lg border border-border bg-background px-2 py-1.5"
                      >
                        <div>
                          <p className="text-[9px] font-medium text-foreground">{slot.label}</p>
                          <p className="text-[8px] tabular-nums text-muted-foreground">
                            {slot.time}
                          </p>
                        </div>
                        <p
                          className="text-[9px] font-medium tabular-nums"
                          style={{ color: skin.tint }}
                        >
                          {slot.price}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BookingPhone({ skin, embedded = false }: { skin: Skin; embedded?: boolean }) {
  return (
    <motion.div
      className={
        embedded
          ? "absolute bottom-0 right-0 z-20 w-[10.75rem] sm:w-[11.75rem]"
          : "absolute -bottom-2 right-0 z-20 w-[min(100%,11.5rem)] sm:-right-4 sm:w-[12.5rem]"
      }
      variants={rise}
    >
      <div className="overflow-hidden rounded-[1.65rem] bg-background shadow-[0_0_0_1px_rgb(var(--shadow-color)/0.1),0_22px_44px_-18px_rgb(var(--shadow-color)/0.38)]">
        <CraftBar time="9:41" />
        <div className="bg-surface px-3 pb-3 pt-1">
          <div className="flex min-w-0 items-center gap-1 rounded-md bg-background/80 px-2 py-1">
            <Globe className="size-2.5 shrink-0 text-muted-foreground" strokeWidth={2} />
            <span className="truncate text-[8px] text-muted-foreground">{skin.phoneDomain}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={skin.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: settle }}
            >
              <div className="mt-2.5 flex items-start justify-between gap-2">
                <div>
                  <p className="font-display text-[1.05rem] leading-none text-foreground">
                    Pick a time
                  </p>
                  <p className="mt-0.5 text-[9px] text-muted-foreground">Open slots this week</p>
                </div>
                <span
                  className="inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[8px] text-accent-foreground"
                  style={{ background: skin.tint }}
                >
                  <Calendar className="size-2.5" strokeWidth={2} />
                  Live
                </span>
              </div>

              <ul className="mt-2.5 space-y-1.5">
                {skin.slots.slice(0, 2).map((slot) => (
                  <li
                    key={slot.time}
                    className="flex items-center justify-between rounded-xl border border-border bg-background px-2.5 py-2"
                  >
                    <div>
                      <p className="text-[10px] font-medium text-foreground">{slot.label}</p>
                      <p className="text-[9px] tabular-nums text-muted-foreground">{slot.time}</p>
                    </div>
                    <p
                      className="text-[10px] font-medium tabular-nums"
                      style={{ color: skin.tint }}
                    >
                      {slot.price}
                    </p>
                  </li>
                ))}
              </ul>

              <div
                className="mt-2 flex items-center justify-center gap-1 rounded-xl py-2 text-[10px] font-medium text-accent-foreground"
                style={{ background: skin.tint }}
              >
                Continue
                <ChevronRight className="size-3" strokeWidth={2.5} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center pb-2 pt-0.5" aria-hidden="true">
          <span className="h-1 w-16 rounded-full bg-border/80" />
        </div>
      </div>
    </motion.div>
  );
}

export function ResponsivePairVisual({
  reduced,
  embedded = false,
  play = false,
}: {
  reduced: boolean;
  embedded?: boolean;
  /** When embedded, parent drives reveal (e.g. synced to gantry green). */
  play?: boolean;
}) {
  const [activeId, setActiveId] = useState(skins[0].id);
  const skin = skins.find((item) => item.id === activeId) ?? skins[0];

  const motionProps = embedded
    ? {
        initial: "hidden" as const,
        animate: reduced || play ? ("visible" as const) : ("hidden" as const),
      }
    : {
        initial: reduced ? false : ("hidden" as const),
        whileInView: "visible" as const,
        viewport: { once: true, margin: "-10% 0px" },
      };

  return (
    <motion.div
      className={`relative mx-auto w-full ${
        embedded
          ? "pb-10 pt-1 sm:pb-12"
          : "max-w-[22rem] pb-8 pt-2 sm:max-w-[26rem] md:max-w-[28rem]"
      }`}
      variants={stage}
      aria-hidden="true"
      {...motionProps}
    >
      {!embedded ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[18%] top-[42%] h-56 w-56 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: `color-mix(in srgb, ${skin.tint} 22%, transparent)` }}
        />
      ) : null}

      <AdminBrowser
        skin={skin}
        activeId={activeId}
        onSelect={setActiveId}
        embedded={embedded}
      />
      <BookingPhone skin={skin} embedded={embedded} />
      <SyncArc reduced={reduced} tint={skin.tint} />

      {!embedded ? (
        <motion.p
          className="mt-6 max-w-[16rem] text-[11px] leading-relaxed text-muted-foreground sm:max-w-none sm:text-center"
          variants={rise}
        >
          One Next.js tree powers the admin and the public booking flow. Switch tenants to
          see the palette follow.
        </motion.p>
      ) : null}
    </motion.div>
  );
}

export function WebV4Mock1() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="web-v4-mock-1"
      aria-labelledby="web-v4-mock-1-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <ResponsivePairVisual reduced={reduced} />
        </div>

        <div className="lg:order-2">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.55, ease: settle }}
          >
            <h2
              id="web-v4-mock-1-title"
              className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
            >
              Web design & development
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
              From landing and marketing pages to multi-tenant product UI and white-label
              booking, I ship Next.js and React with SEO in the markup, CMS hooks when
              content teams need them, and one codebase that holds up as you add tenants.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Capabilities">
              {webV4Mock1Chips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-foreground"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
