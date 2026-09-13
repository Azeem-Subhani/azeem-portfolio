"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { CreditCard } from "lucide-react";
import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const frameIn: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.72, ease: settle },
  },
};

const railIn: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: settle, delay: 0.18 },
  },
};

type TenantSkin = {
  id: string;
  name: string;
  domain: string;
  accent: string;
  wash: string;
  header: string;
  mark: "arc" | "chevron" | "diamond" | "ring" | "wave";
};

const tenants: TenantSkin[] = [
  {
    id: "north",
    name: "North Loop",
    domain: "north.example",
    accent: "#2aa198",
    wash: "rgb(42 161 152 / 0.16)",
    header: "linear-gradient(168deg, rgb(42 161 152 / 0.28) 0%, var(--surface) 72%)",
    mark: "arc",
  },
  {
    id: "coast",
    name: "Coast Circuit",
    domain: "coast.example",
    accent: "#268bd2",
    wash: "rgb(38 139 210 / 0.16)",
    header: "linear-gradient(168deg, rgb(38 139 210 / 0.28) 0%, var(--surface) 72%)",
    mark: "wave",
  },
  {
    id: "desert",
    name: "Desert Run",
    domain: "desert.example",
    accent: "#b58900",
    wash: "rgb(181 137 0 / 0.16)",
    header: "linear-gradient(168deg, rgb(181 137 0 / 0.26) 0%, var(--surface) 72%)",
    mark: "chevron",
  },
  {
    id: "summit",
    name: "Summit Drive",
    domain: "summit.example",
    accent: "#6c71c4",
    wash: "rgb(108 113 196 / 0.16)",
    header: "linear-gradient(168deg, rgb(108 113 196 / 0.28) 0%, var(--surface) 72%)",
    mark: "diamond",
  },
  {
    id: "valley",
    name: "Valley Track",
    domain: "valley.example",
    accent: "#859900",
    wash: "rgb(133 153 0 / 0.16)",
    header: "linear-gradient(168deg, rgb(133 153 0 / 0.26) 0%, var(--surface) 72%)",
    mark: "ring",
  },
];

const slots = [
  { time: "9:00", label: "Track day", price: "$220", open: true },
  { time: "1:30", label: "Drive experience", price: "$420", open: true },
  { time: "4:00", label: "Private hire", price: "$1,800", open: false },
];

function TenantMark({ kind, color }: { kind: TenantSkin["mark"]; color: string }) {
  const shared = { stroke: color, fill: "none", strokeWidth: 1.6, strokeLinecap: "round" as const };

  if (kind === "arc") {
    return (
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <path d="M 4 18 Q 12 4 20 18" {...shared} />
      </svg>
    );
  }
  if (kind === "wave") {
    return (
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <path d="M 3 14 C 7 8, 11 20, 15 12 S 21 10, 21 10" {...shared} />
      </svg>
    );
  }
  if (kind === "chevron") {
    return (
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <path d="M 6 16 L 12 6 L 18 16" {...shared} />
      </svg>
    );
  }
  if (kind === "diamond") {
    return (
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <path d="M 12 4 L 20 12 L 12 20 L 4 12 Z" {...shared} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <circle cx="12" cy="12" r="7" {...shared} />
      <circle cx="12" cy="12" r="2.5" fill={color} stroke="none" />
    </svg>
  );
}

function StatusBar({ time }: { time: string }) {
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

function TokenRail({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <ol className="flex flex-col gap-2.5 py-6" aria-label="Brand skins on shared codebase">
      {tenants.map((tenant, index) => {
        const active = index === activeIndex;
        return (
          <li key={tenant.id}>
            <button
              type="button"
              aria-label={`${tenant.name} skin`}
              aria-pressed={active}
              onClick={() => onSelect(index)}
              className="group relative flex size-9 items-center justify-center rounded-full transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              style={{
                boxShadow: active
                  ? `0 0 0 2px var(--background), 0 0 0 3.5px ${tenant.accent}`
                  : "0 0 0 1px color-mix(in srgb, var(--border) 80%, transparent)",
              }}
            >
              <span
                className="block size-5 rounded-full transition-transform group-hover:scale-105"
                style={{ background: tenant.accent }}
              />
            </button>
          </li>
        );
      })}
    </ol>
  );
}

function BookingSurface({ tenant, reduced }: { tenant: TenantSkin; reduced: boolean }) {
  const brandStyle = {
    "--brand-accent": tenant.accent,
    "--brand-wash": tenant.wash,
  } as CSSProperties;

  return (
    <motion.div
      className="relative flex min-h-0 flex-1 flex-col"
      style={brandStyle}
      initial={
        reduced
          ? false
          : {
              clipPath: "inset(0 100% 0 0)",
            }
      }
      animate={{ clipPath: "inset(0 0 0 0)" }}
      transition={{ duration: 0.58, ease: settle }}
    >
      <motion.div
        className="relative z-10 border-b border-border/70 px-4 py-3.5"
        animate={{ background: tenant.header }}
        transition={{ duration: 0.55, ease: settle }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <TenantMark kind={tenant.mark} color={tenant.accent} />
              <p className="truncate text-[10px] text-muted-foreground">{tenant.domain}</p>
            </div>
            <p className="font-display text-[1.3rem] leading-tight text-foreground">
              {tenant.name}
            </p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">Saturday, Apr 12</p>
          </div>
          <span
            className="shrink-0 rounded-full px-2 py-0.5 text-[9px] font-medium"
            style={{
              color: tenant.accent,
              background: tenant.wash,
              border: `1px solid color-mix(in srgb, ${tenant.accent} 35%, transparent)`,
            }}
          >
            open
          </span>
        </div>
      </motion.div>

      <ul className="relative z-10 flex-1 space-y-1.5 px-3 py-3">
        {slots.map((slot) => (
          <li
            key={slot.time}
            className={`flex min-h-[2.75rem] items-center justify-between rounded-xl border px-3 py-2.5 ${
              slot.open
                ? "border-border/60 bg-background/70"
                : "border-border/40 bg-background/35 opacity-45"
            }`}
            style={
              slot.open
                ? {
                    borderColor: `color-mix(in srgb, ${tenant.accent} 28%, var(--border))`,
                    boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${tenant.accent} 8%, transparent)`,
                  }
                : undefined
            }
          >
            <div>
              <p className="font-display text-base tabular-nums leading-none text-foreground">
                {slot.time}
              </p>
              <p className="mt-0.5 text-[9px] text-muted-foreground">{slot.label}</p>
            </div>
            <p
              className="text-sm tabular-nums"
              style={{ color: slot.open ? tenant.accent : undefined }}
            >
              {slot.price}
            </p>
          </li>
        ))}
      </ul>

      <div className="relative z-10 border-t border-border/75 bg-background px-3 pb-3 pt-2.5">
        <div className="flex items-center gap-2">
          <div className="min-w-0 flex-1 rounded-2xl bg-surface px-3 py-2.5">
            <p className="truncate text-[11px] font-medium text-foreground">
              1:30 · Drive experience
            </p>
            <p className="text-[10px] tabular-nums text-muted-foreground">$420 due now</p>
          </div>
          <button
            type="button"
            className="flex h-11 min-w-[5.5rem] shrink-0 items-center justify-center gap-1.5 rounded-2xl px-3.5 text-[12px] font-medium text-accent-foreground"
            style={{ background: tenant.accent }}
          >
            <CreditCard className="size-3.5" strokeWidth={2} />
            Reserve
          </button>
        </div>
        <div
          className="mx-auto mt-2.5 h-1 w-[4.5rem] rounded-full bg-muted-foreground/25"
          aria-hidden="true"
        />
      </div>
    </motion.div>
  );
}

function PressProofVisual({ reduced }: { reduced: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const tenant = tenants[activeIndex] ?? tenants[0];

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setInView(true);
      },
      { threshold: 0.38 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || reduced) return;

    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % tenants.length);
    }, 4400);

    return () => window.clearInterval(id);
  }, [inView, reduced]);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div
      ref={rootRef}
      className="relative mx-auto w-full max-w-[21rem] sm:max-w-[23rem]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[54%] top-[42%] h-64 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: `color-mix(in srgb, ${tenant.accent} 22%, transparent)` }}
      />

      <div className="dark relative" data-theme="dark">
        <motion.div
          className="relative flex items-stretch gap-3 sm:gap-4"
          variants={stage}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <motion.div variants={railIn} className="hidden shrink-0 sm:block">
            <TokenRail activeIndex={activeIndex} onSelect={handleSelect} />
          </motion.div>

          <motion.div variants={frameIn} className="min-w-0 flex-1">
            <div className="overflow-hidden rounded-[1.85rem] border border-border/70 bg-background shadow-[0_0_0_1px_rgb(42_161_152/0.12),0_28px_56px_-24px_rgb(0_43_54/0.68)]">
              <StatusBar time="9:41" />
              <div className="flex min-h-[24.5rem] flex-col sm:min-h-[25.5rem]">
                <BookingSurface key={tenant.id} tenant={tenant} reduced={reduced} />
              </div>
            </div>

            <div className="mt-3 flex justify-center gap-2 sm:hidden">
              {tenants.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`${item.name} skin`}
                  aria-pressed={index === activeIndex}
                  onClick={() => handleSelect(index)}
                  className="rounded-full p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span
                    className="block size-2.5 rounded-full transition-transform"
                    style={{
                      background: item.accent,
                      transform: index === activeIndex ? "scale(1.15)" : "scale(1)",
                      boxShadow:
                        index === activeIndex
                          ? `0 0 0 2px var(--background), 0 0 0 3px ${item.accent}`
                          : undefined,
                    }}
                  />
                </button>
              ))}
            </div>

            <p className="mt-3 text-center text-[10px] leading-4 text-muted-foreground sm:text-left">
              Same slot list and checkout dock. Five brand tokens from one deploy.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export function WebV3Mock5() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="web-v3-mock-5"
      aria-labelledby="web-v3-mock-5-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <PressProofVisual reduced={reduced} />
        </div>

        <div className="lg:order-2">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.55, ease: settle }}
          >
            <h2
              id="web-v3-mock-5-title"
              className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
            >
              White-label product UI on one codebase
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
              I ship Next.js and React interfaces where each brand keeps its own
              domain, palette, and checkout. Five storefronts share calendars,
              waivers, and Stripe on one deploy without looking like copies of
              each other.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
