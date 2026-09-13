"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.06 },
  },
};

const shellIn: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: settle },
  },
};

type Tenant = {
  id: string;
  name: string;
  domain: string;
  tint: string;
  wash: string;
};

const sharedSlots = [
  { time: "9:00", label: "Morning block", price: "$149" },
  { time: "1:00", label: "Midday session", price: "$289" },
  { time: "4:30", label: "Evening slot", price: "$520" },
];

const tenants: Tenant[] = [
  {
    id: "northline",
    name: "Northline",
    domain: "book.northline.io",
    tint: "var(--accent)",
    wash: "color-mix(in srgb, var(--accent) 18%, var(--background))",
  },
  {
    id: "harbor",
    name: "Harbor & Co",
    domain: "reserve.harbor.co",
    tint: "var(--signal)",
    wash: "color-mix(in srgb, var(--signal) 18%, var(--background))",
  },
  {
    id: "ridge",
    name: "Ridgefield",
    domain: "schedule.ridgefield.health",
    tint: "var(--success)",
    wash: "color-mix(in srgb, var(--success) 18%, var(--background))",
  },
];

const railLayers = [
  { id: "brand", label: "Brand", shared: false, flex: "0 0 4.75rem" },
  { id: "slots", label: "Slots", shared: true, flex: "1 1 9.5rem" },
  { id: "checkout", label: "Checkout", shared: true, flex: "0 0 3.25rem" },
  { id: "platform", label: "Platform", shared: true, flex: "0 0 2.75rem" },
] as const;

function CompositionRail({ tenant }: { tenant: Tenant }) {
  return (
    <div
      className="flex w-[3.35rem] shrink-0 flex-col border-r border-border sm:w-[3.75rem]"
      aria-hidden="true"
    >
      {railLayers.map((layer, index) => {
        const isBrand = !layer.shared;

        return (
          <div
            key={layer.id}
            className="relative flex items-end px-1.5 pb-2 sm:px-2"
            style={{
              flex: layer.flex,
              background: isBrand
                ? tenant.wash
                : "repeating-linear-gradient(135deg, color-mix(in srgb, var(--border) 55%, transparent) 0 1px, transparent 1px 7px)",
              borderTop: index > 0 ? "1px solid var(--border)" : undefined,
              transition: "background-color 500ms ease",
            }}
          >
            {isBrand ? (
              <span
                className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full"
                style={{ background: tenant.tint, transition: "background-color 500ms ease" }}
              />
            ) : null}
            <span
              className={`text-[9px] leading-none ${
                isBrand ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {layer.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function TenantPicker({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div
      className="mt-3 flex gap-1"
      role="group"
      aria-label="Switch tenant brand"
    >
      {tenants.map((item, index) => {
        const selected = index === activeIndex;
        return (
          <button
            key={item.id}
            type="button"
            aria-pressed={selected}
            onClick={() => onSelect(index)}
            className="flex flex-1 items-center gap-1.5 rounded-md border px-2 py-1.5 text-[10px] transition-[border-color,opacity] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            style={{
              borderColor: selected ? item.tint : "var(--border)",
              opacity: selected ? 1 : 0.5,
            }}
          >
            <span
              className="size-1.5 shrink-0 rounded-full"
              style={{ background: item.tint }}
              aria-hidden="true"
            />
            <span className={selected ? "text-foreground" : "text-muted-foreground"}>
              {item.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function CompositionVisual({ reduced }: { reduced: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tenant = tenants[activeIndex] ?? tenants[0];

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % tenants.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem]"
      variants={stage}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      <motion.div
        className="relative overflow-hidden rounded-[1.15rem] border border-border bg-background shadow-[0_0_0_1px_rgb(var(--shadow-color)/0.07),0_26px_52px_-30px_rgb(var(--shadow-color)/0.32)]"
        variants={shellIn}
      >
        <div className="flex min-h-[24.5rem] sm:min-h-[26rem]">
          <CompositionRail tenant={tenant} />

          <div className="flex min-w-0 flex-1 flex-col">
            <AnimatePresence mode="wait">
              <motion.header
                key={tenant.id}
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.32, ease: settle }}
                className="border-b border-border px-4 py-4 sm:px-5"
                style={{ background: tenant.wash }}
              >
                <p className="truncate text-[10px] text-muted-foreground">
                  {tenant.domain}
                </p>
                <p className="mt-1 font-display text-[clamp(1.35rem,3.5vw,1.75rem)] leading-[1.02] text-foreground">
                  {tenant.name}
                </p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  Saturday availability
                </p>
              </motion.header>
            </AnimatePresence>

            <div className="flex flex-1 flex-col px-3 py-3.5 sm:px-4">
              <ul className="space-y-1.5">
                {sharedSlots.map((slot) => (
                  <li
                    key={slot.time}
                    className="flex items-center justify-between gap-3 border border-border bg-surface px-3 py-2.5"
                  >
                    <div>
                      <p className="font-display text-base tabular-nums leading-none text-foreground">
                        {slot.time}
                      </p>
                      <p className="mt-1 text-[10px] text-muted-foreground">
                        {slot.label}
                      </p>
                    </div>
                    <p className="text-sm font-medium tabular-nums text-foreground">
                      {slot.price}
                    </p>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                tabIndex={-1}
                aria-hidden="true"
                className="mt-3 w-full border border-border bg-background py-2.5 text-[11px] font-medium text-foreground"
              >
                Continue to checkout
              </button>
            </div>

            <div className="border-t border-border bg-surface px-4 py-2.5">
              <p className="text-[10px] leading-relaxed text-muted-foreground">
                Shared Next.js layer: auth, inventory, Stripe
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <TenantPicker activeIndex={activeIndex} onSelect={setActiveIndex} />

      <p className="mt-3 text-[11px] leading-5 text-muted-foreground">
        Header swaps per tenant. Slot grid and checkout stay on the shared React
        tree.
      </p>
    </motion.div>
  );
}

export function WebV3Mock3() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="web-v3-mock-3"
      aria-labelledby="web-v3-mock-3-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <CompositionVisual reduced={reduced} />
        </div>

        <div className="lg:order-2">
          <h2
            id="web-v3-mock-3-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            Brand on top, platform underneath
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            I build Next.js and React product UIs where the public face changes
            per tenant but the booking flow stays one codebase. Your header,
            domain, and palette are configurable. Slot logic, waivers, and
            Stripe checkout ship once.
          </p>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
            That split is deliberate — you get a white-label surface without
            paying for a separate product rewrite every time you add a site.
          </p>
        </div>
      </div>
    </section>
  );
}
