"use client";

import { useState } from "react";
import { CreditCard, LayoutGrid, Users } from "lucide-react";
import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const frameIn: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.72, ease: settle },
  },
};

const phoneIn: Variants = {
  hidden: { opacity: 0, y: 28, x: 12 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.68, ease: settle, delay: 0.22 },
  },
};

const chips = ["Product UI", "Shared checkout", "Admin views"];

const orders = [
  { id: "1842", guest: "Morning slot", status: "Paid", amount: "$420" },
  { id: "1841", guest: "Team block", status: "Pending", amount: "$640" },
  { id: "1840", guest: "Office hours", status: "Paid", amount: "$0" },
];

const slots = [
  { time: "9:00", label: "Strategy session", price: "$640", open: true },
  { time: "1:30", label: "Team workshop", price: "$420", open: true },
  { time: "4:00", label: "Office hours", price: "Free", open: false },
];

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

function BrowserChrome({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-border/70 px-3 py-2">
      <div className="flex gap-1" aria-hidden="true">
        <span className="size-2 rounded-full bg-error/70" />
        <span className="size-2 rounded-full bg-success/70" />
        <span className="size-2 rounded-full bg-accent/70" />
      </div>
      <p className="min-w-0 flex-1 truncate rounded-md bg-surface px-2 py-0.5 text-[10px] text-muted-foreground">
        {url}
      </p>
    </div>
  );
}

function DualSurfaceVisual({ reduced }: { reduced: boolean }) {
  const [activeOrder, setActiveOrder] = useState(0);
  const order = orders[activeOrder] ?? orders[0];

  return (
    <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[42%] top-[38%] h-56 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl"
      />

      <div className="dark relative" data-theme="dark">
        <motion.div
          className="relative"
          variants={stage}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <motion.div
            variants={frameIn}
            className="overflow-hidden rounded-[1.35rem] border border-border/70 bg-background shadow-[0_0_0_1px_rgb(42_161_152/0.12),0_28px_56px_-28px_rgb(0_43_54/0.72)]"
          >
            <BrowserChrome url="app.example/admin/bookings" />

            <div className="grid min-h-[15.5rem] grid-cols-[38%_62%] border-t border-border/60">
              <div className="border-r border-border/60 bg-surface/40">
                <div className="flex items-center gap-1.5 border-b border-border/50 px-2.5 py-2">
                  <Users className="size-3 text-accent" strokeWidth={2} />
                  <p className="text-[10px] font-medium text-foreground">Orders</p>
                </div>
                <ul className="divide-y divide-border/50">
                  {orders.map((item, index) => {
                    const active = index === activeOrder;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => setActiveOrder(index)}
                          className={`w-full px-2.5 py-2.5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent ${
                            active ? "bg-accent/10" : "hover:bg-surface/80"
                          }`}
                        >
                          <div className="flex items-baseline justify-between gap-1">
                            <p className="font-display text-sm tabular-nums leading-none text-foreground">
                              #{item.id}
                            </p>
                            <p className="text-[9px] tabular-nums text-accent">{item.amount}</p>
                          </div>
                          <p className="mt-1 truncate text-[9px] text-muted-foreground">
                            {item.guest}
                          </p>
                          <p
                            className={`mt-1 text-[8px] ${
                              item.status === "Paid" ? "text-success" : "text-signal"
                            }`}
                          >
                            {item.status}
                          </p>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="flex flex-col bg-background">
                <div className="flex items-center justify-between gap-2 border-b border-border/50 px-3 py-2">
                  <div className="flex items-center gap-1.5">
                    <LayoutGrid className="size-3 text-signal" strokeWidth={2} />
                    <p className="text-[10px] font-medium text-foreground">Public booking</p>
                  </div>
                  <span className="rounded-full border border-accent/35 bg-accent/12 px-2 py-0.5 text-[8px] text-accent">
                    live
                  </span>
                </div>

                <div className="px-3 py-2.5">
                  <p className="font-display text-[1.1rem] leading-none text-foreground">
                    Thursday 12 June
                  </p>
                  <p className="mt-1 text-[9px] text-muted-foreground">Open slots this week</p>
                </div>

                <ul className="flex-1 divide-y divide-border/50 border-t border-border/50">
                  {slots.map((slot) => (
                    <li
                      key={slot.time}
                      className={`flex items-center justify-between px-3 py-2 ${
                        slot.open ? "" : "opacity-40"
                      }`}
                    >
                      <div>
                        <p className="font-display text-base tabular-nums leading-none text-foreground">
                          {slot.time}
                        </p>
                        <p className="mt-0.5 text-[9px] text-muted-foreground">{slot.label}</p>
                      </div>
                      <p
                        className={`text-xs tabular-nums ${
                          slot.open ? "text-accent" : "text-muted-foreground"
                        }`}
                      >
                        {slot.open ? slot.price : "Full"}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-border/60 px-3 py-2">
                  <p className="text-[9px] text-muted-foreground">
                    Order #{order.id} updates both views
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={phoneIn}
            className="absolute -bottom-6 -right-2 w-[42%] max-w-[9.5rem] sm:-right-4 sm:max-w-[10.5rem]"
          >
            <div className="overflow-hidden rounded-[1.65rem] border border-border/70 bg-background shadow-[0_20px_40px_-20px_rgb(0_43_54/0.75)]">
              <StatusBar time="9:41" />
              <div className="px-3 pb-3 pt-1">
                <p className="font-display text-lg leading-tight text-foreground">Checkout</p>
                <p className="mt-0.5 text-[9px] text-muted-foreground">Order #{order.id}</p>

                <div className="mt-3 rounded-xl border border-border/60 bg-surface/50 px-3 py-2.5">
                  <p className="text-[10px] text-muted-foreground">{order.guest}</p>
                  <p className="mt-1 font-display text-xl tabular-nums leading-none text-accent">
                    {order.amount}
                  </p>
                </div>

                <button
                  type="button"
                  className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-accent py-2 text-[11px] font-medium text-accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <CreditCard className="size-3.5" strokeWidth={2} />
                  Pay now
                </button>
              </div>
              <div
                className="mx-auto mb-2 h-1 w-12 rounded-full bg-muted-foreground/30"
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <p className="mt-10 text-center text-[10px] leading-4 text-muted-foreground sm:text-left">
        Admin queue, public booking, and mobile checkout on one Next.js tree.
      </p>
    </div>
  );
}

export function WebV4Mock4() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="web-v4-mock-4"
      aria-labelledby="web-v4-mock-4-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <DualSurfaceVisual reduced={reduced} />
        </div>

        <div className="lg:order-2">
          <h2
            id="web-v4-mock-4-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            Web design & development
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            From marketing pages to complex product UI, I ship Next.js and React with booking,
            checkout, and admin views your team runs every day. The same repo powers public
            booking and internal orders. Add a brand without forking the front end.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Capabilities">
            {chips.map((chip) => (
              <li key={chip}>
                <span className="inline-block rounded-full border border-border bg-surface px-3 py-1 text-sm text-foreground">
                  {chip}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
