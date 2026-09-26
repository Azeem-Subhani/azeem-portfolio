"use client";

import "./industry-checkout.css";

import { Fragment, useEffect, useRef, useState } from "react";
import { ArrowRight, Check, ChevronRight } from "lucide-react";

import { useMotionPaused } from "@/hooks/use-motion-paused";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

/*
 * Hero illustration for the e-commerce page: products drop into a cart one at a time,
 * the subtotal counts up, checkout sweeps to "Paid", an order toast lands, and the cart
 * clears for the next shopper. Products and prices are synthetic sample data.
 */

const PRODUCTS = [
  { name: "Walnut side table", price: 189, qty: 1 },
  { name: "Linen throw", price: 64, qty: 2 },
  { name: "Ceramic mug", price: 18, qty: 4 },
  { name: "Desk lamp", price: 72, qty: 1 },
  { name: "Wool rug", price: 240, qty: 1 },
  { name: "Oak shelf", price: 96, qty: 2 },
] as const;

const CART_SIZE = 4;
const FLOW = ["Cart", "Payment", "Order"] as const;

// One loop: steps 0-3 add a product each, 4 processes payment, 5 is paid, 6 clears.
const STEP_MS = [650, 650, 650, 1000, 1300, 1900, 900] as const;
const CYCLE = STEP_MS.length;
const PROCESS_STEP = 4;
const PAID_STEP = 5;
const CLEAR_STEP = 6;
const FIRST_ORDER = 1041;

// Server and first client render agree: a full cart waiting at checkout.
const INITIAL_TICK = 3;
// Reduced motion shows the finished moment: paid, with the order toast up.
const REDUCED_TICK = PAID_STEP;

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

function cartFor(cycle: number) {
  const offset = (cycle * 2) % PRODUCTS.length;
  return Array.from({ length: CART_SIZE }, (_, i) => PRODUCTS[(offset + i) % PRODUCTS.length]);
}

// Eases the displayed number toward the target; snaps when motion is off.
function useCountUp(target: number, animate: boolean) {
  const [value, setValue] = useState(target);
  const shown = useRef(target);

  useEffect(() => {
    if (!animate) {
      shown.current = target;
      return;
    }
    const from = shown.current;
    const start = performance.now();
    const duration = 450;
    let frame = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const next = from + (target - from) * (1 - (1 - t) ** 3);
      shown.current = next;
      setValue(next);
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, animate]);

  return animate ? value : target;
}

export function IndustryCheckout() {
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

  // Steps have different lengths, so chain timeouts instead of a fixed interval.
  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => setTick((t) => t + 1), STEP_MS[tick % CYCLE]);
    return () => window.clearTimeout(id);
  }, [running, tick]);

  const view = reduced ? REDUCED_TICK : tick;
  const cycle = Math.floor(view / CYCLE);
  const step = view % CYCLE;
  const cart = cartFor(cycle);
  const count = step <= 3 ? step + 1 : CART_SIZE;
  const items = cart.slice(0, count);
  const leaving = step === CLEAR_STEP;
  const processing = step === PROCESS_STEP;
  const paid = step === PAID_STEP;
  const flowIndex = processing ? 1 : paid ? 2 : 0;
  const itemCount = leaving ? 0 : items.reduce((sum, item) => sum + item.qty, 0);
  const target = leaving ? 0 : items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const subtotal = useCountUp(target, !reduced);

  return (
    <div
      ref={panelRef}
      className="relative rounded-[var(--shape-radius-lg)] border border-border bg-surface/70 p-4 shadow-[0_30px_80px_-40px_color-mix(in_srgb,var(--accent)_45%,transparent)] backdrop-blur-sm sm:p-5"
    >
      <p className="sr-only">
        Illustration: sample products are added to a shopping cart, the subtotal adds up,
        checkout completes as paid, and an order confirmation appears before the cart clears.
      </p>
      <div aria-hidden="true">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-medium">
            <span className="relative flex size-2">
              <span className="industry-live-ping absolute inset-0 rounded-full bg-accent" />
              <span className="relative size-2 rounded-full bg-accent" />
            </span>
            Live checkout
          </span>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
            Sample data
          </span>
        </div>

        <div className="relative mt-4 h-[13rem]">
          <ul className="grid content-start gap-2">
            {items.map((item, index) => (
              <li
                // Keys change per loop so each new cart's rows mount and animate in.
                key={`${cycle}-${index}`}
                className={cn(
                  "flex h-[2.875rem] items-center gap-3 rounded-xl border border-border bg-background/70 px-3 transition-all duration-500",
                  cycle > 0 && "industry-checkout-row-in",
                  paid && "opacity-60",
                  leaving && "translate-x-4 opacity-0",
                )}
                style={leaving ? { transitionDelay: `${index * 60}ms` } : undefined}
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-accent/40 bg-accent/10 font-display text-sm text-[var(--accent-readable)]">
                  {item.name.charAt(0)}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm">{item.name}</span>
                <span
                  className={cn(
                    "shrink-0 rounded-full border border-border px-1.5 py-0.5 font-mono text-[0.6rem] text-muted-foreground",
                    cycle > 0 && "industry-checkout-qty-in",
                  )}
                >
                  ×{item.qty}
                </span>
                <span className="w-[4.25rem] shrink-0 text-right font-mono text-xs tabular-nums">
                  {currency.format(item.price * item.qty)}
                </span>
              </li>
            ))}
          </ul>

          <p
            className={cn(
              "absolute inset-0 flex items-center justify-center font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground transition-opacity duration-500",
              leaving ? "opacity-100 delay-300" : "opacity-0",
            )}
          >
            Cart cleared · next shopper
          </p>

          {/* Order toast rises over the dimmed cart once payment lands. */}
          <div
            className={cn(
              "absolute inset-x-2 bottom-2 flex items-center gap-3 rounded-xl border border-accent/40 bg-surface px-3 py-2.5 shadow-[0_18px_40px_-24px_color-mix(in_srgb,var(--accent)_60%,transparent)] transition-all duration-500 ease-out",
              paid ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
            )}
          >
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[var(--accent-readable)]">
              <Check className="size-3.5" strokeWidth={2.5} />
            </span>
            <span className="min-w-0 flex-1 truncate text-sm font-medium">
              Order #{FIRST_ORDER + cycle} paid
            </span>
            <span className="shrink-0 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground">
              Just now
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between gap-3">
          <span className="min-w-0 truncate font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground">
            Subtotal <span className="text-foreground/40">· {itemCount} items</span>
          </span>
          <span className="font-display text-3xl leading-none tabular-nums">
            {currency.format(subtotal)}
          </span>
        </div>

        {/* Decorative checkout button: a sweep fills it while payment processes. */}
        <div
          className={cn(
            "relative mt-3 flex h-11 items-center justify-center overflow-hidden rounded-full border bg-background/70 text-sm font-medium transition-colors duration-500",
            processing || paid ? "border-accent/40" : "border-border",
            leaving && "opacity-50",
          )}
        >
          <span
            className="absolute inset-y-0 left-0 bg-accent/15 ease-in-out"
            style={{
              width: processing || paid ? "100%" : "0%",
              transitionProperty: "width",
              transitionDuration: processing ? `${STEP_MS[PROCESS_STEP] - 150}ms` : "300ms",
            }}
          />
          {processing ? (
            <span className="industry-checkout-sheen absolute inset-y-0 left-0 w-1/3" />
          ) : null}
          <span
            className={cn(
              "relative flex items-center gap-1.5 transition-colors duration-300",
              paid ? "text-[var(--accent-readable)]" : "text-foreground",
            )}
          >
            {paid ? (
              <>
                <Check className="size-4" strokeWidth={2.5} /> Paid
              </>
            ) : processing ? (
              "Processing…"
            ) : (
              <>
                Checkout <ArrowRight className="size-4" />
              </>
            )}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs">
          {FLOW.map((label, index) => (
            <Fragment key={label}>
              <span
                className={cn(
                  "flex items-center gap-1.5 transition-colors duration-300",
                  index === flowIndex ? "text-[var(--accent-readable)]" : "text-muted-foreground",
                )}
              >
                <span
                  className={cn(
                    "size-1.5 rounded-full transition-all duration-300",
                    index === flowIndex ? "scale-125 bg-accent" : "bg-border",
                  )}
                />
                {label}
              </span>
              {index < FLOW.length - 1 ? (
                <ChevronRight className="size-3.5 text-muted-foreground/60" />
              ) : null}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
