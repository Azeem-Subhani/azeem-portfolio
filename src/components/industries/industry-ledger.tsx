"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

import { useMotionPaused } from "@/hooks/use-motion-paused";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

/*
 * Hero illustration for the fintech page: each payment lights up as it is charged,
 * posted to the ledger, and written to the audit log, then settles as "Matched".
 * The rows are synthetic sample data, not client transactions.
 */

const SAMPLES = [
  { amount: "$148.00", method: "Card", ref: "txn_8QF2" },
  { amount: "$2,400.00", method: "ACH", ref: "txn_3KD9" },
  { amount: "$36.50", method: "Wallet", ref: "txn_7LM4" },
  { amount: "$820.00", method: "Payout", ref: "txn_1ZR6" },
  { amount: "$95.25", method: "Card", ref: "txn_5HT0" },
  { amount: "$1,150.00", method: "Invoice", ref: "txn_9WB3" },
] as const;

const STEPS = ["Charge", "Ledger", "Audit"] as const;
const VISIBLE_ROWS = 4;
const TICK_MS = 850;

type Row = { key: number; sample: number; stage: number };

// Server and first client render agree: three settled rows, nothing in flight.
const INITIAL_ROWS: Row[] = [
  { key: 2, sample: 2, stage: 3 },
  { key: 1, sample: 1, stage: 3 },
  { key: 0, sample: 0, stage: 3 },
];

function LedgerRow({ row, fresh }: { row: Row; fresh: boolean }) {
  const sample = SAMPLES[row.sample];
  const matched = row.stage >= STEPS.length;

  return (
    <li
      className={cn(
        "rounded-xl border bg-background/70 p-3.5 transition-colors duration-500",
        matched ? "border-border" : "border-accent/40",
        fresh && "industry-ledger-row-in",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex min-w-0 items-baseline gap-2.5">
          <span className="font-display text-xl leading-none">{sample.amount}</span>
          <span className="truncate font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground">
            {sample.method} <span className="text-foreground/40">{sample.ref}</span>
          </span>
        </span>
        <span
          className={cn(
            "flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.1em] transition-all duration-500",
            matched
              ? "border-accent/50 text-[var(--accent-readable)] opacity-100"
              : "border-border text-muted-foreground opacity-60",
          )}
        >
          {matched ? <Check aria-hidden="true" className="size-3" strokeWidth={2.5} /> : null}
          {matched ? "Matched" : "Pending"}
        </span>
      </div>
      <div className="mt-3 flex items-center">
        {STEPS.map((step, index) => {
          const lit = row.stage > index;
          return (
            <div key={step} className="flex flex-1 items-center last:flex-none">
              <span
                className={cn(
                  "flex items-center gap-1.5 text-[0.68rem] transition-colors duration-300",
                  lit ? "text-foreground" : "text-muted-foreground/70",
                )}
              >
                <span
                  className={cn(
                    "size-2 rounded-full border transition-all duration-300",
                    lit ? "scale-110 border-accent bg-accent" : "border-border bg-transparent",
                  )}
                />
                {step}
              </span>
              {index < STEPS.length - 1 ? (
                <span className="relative mx-2 h-px flex-1 overflow-hidden bg-border">
                  <span
                    className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-700 ease-out"
                    style={{ width: row.stage > index + 1 ? "100%" : "0%" }}
                  />
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </li>
  );
}

export function IndustryLedger() {
  const reduced = usePrefersReducedMotion();
  // The page's pause control freezes the loop on its current frame.
  const paused = useMotionPaused();
  const panelRef = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState<Row[]>(INITIAL_ROWS);
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
    const id = window.setInterval(() => {
      setRows((current) => {
        const [top, ...rest] = current;
        // Advance the newest payment one step; once it matches, the next one arrives.
        if (top.stage < STEPS.length) {
          return [{ ...top, stage: top.stage + 1 }, ...rest];
        }
        const next: Row = { key: top.key + 1, sample: (top.sample + 1) % SAMPLES.length, stage: 0 };
        return [next, ...current].slice(0, VISIBLE_ROWS);
      });
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [running]);

  return (
    <div
      ref={panelRef}
      className="relative rounded-[var(--shape-radius-lg)] border border-border bg-surface/70 p-4 shadow-[0_30px_80px_-40px_color-mix(in_srgb,var(--accent)_45%,transparent)] backdrop-blur-sm sm:p-5"
    >
      <p className="sr-only">
        Illustration: sample payments moving from charge to ledger to audit log, each ending
        as matched.
      </p>
      <div aria-hidden="true">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-medium">
            <span className="relative flex size-2">
              <span className="industry-live-ping absolute inset-0 rounded-full bg-accent" />
              <span className="relative size-2 rounded-full bg-accent" />
            </span>
            Reconciliation
          </span>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
            Sample data
          </span>
        </div>
        <ul className="industry-ledger-list mt-4 grid h-[21.5rem] content-start gap-2.5 overflow-hidden">
          {rows.map((row, index) => (
            <LedgerRow key={row.key} row={row} fresh={index === 0 && row.key > 2} />
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
          <span>Charge = Ledger = Audit</span>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-[var(--accent-readable)]">
            0 drift
          </span>
        </div>
      </div>
    </div>
  );
}
