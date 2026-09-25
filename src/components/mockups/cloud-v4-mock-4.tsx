"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  type AnimationPlaybackControls,
} from "motion/react";
import { Database, Globe, ShieldCheck } from "lucide-react";

import { useInViewOnce } from "@/hooks/use-in-view-once";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

/**
 * Mock-local trace console. It sits on the site's own surface tokens, the same
 * ones the web and data chapter panels use, so it reads as part of the page in
 * both themes instead of a separately tinted slate.
 */
const trace = {
  chassis: "var(--surface)",
  panel: "var(--surface-elevated)",
  well: "var(--background)",
  ink: "var(--foreground)",
  muted: "var(--muted-foreground)",
} as const;

/** Solarized orange: the one hue that means "this hop is the slow one". */
const culprit = "#cb4b16";

const hairline = (percent: number) =>
  `color-mix(in srgb, var(--foreground) ${percent}%, transparent)`;

const capabilities = ["Route-level auth", "SAM deploy pipeline", "Write path metrics"] as const;

type ScenarioId = "warm" | "cold";

type Hop = {
  id: "amplify" | "cognito" | "lambda" | "dynamo";
  label: string;
  detail: string;
  /** Time the hop itself spends on the request, without any cold boot. */
  ms: number;
  color: string;
  Icon: ComponentType<{ className?: string; strokeWidth?: number }> | null;
};

// Illustrative timings for one checkout request, in the order it crosses the
// stack. The cold path keeps every hop identical and adds the container boot,
// so the only thing that moves is the hop that caused the slowdown.
const hops: Hop[] = [
  { id: "amplify", label: "Amplify", detail: "Edge", ms: 9, color: "var(--muted-foreground)", Icon: Globe },
  { id: "cognito", label: "Cognito", detail: "Verify JWT", ms: 12, color: "var(--signal)", Icon: ShieldCheck },
  { id: "lambda", label: "Lambda", detail: "Charge", ms: 31, color: "var(--accent)", Icon: null },
  { id: "dynamo", label: "DynamoDB", detail: "Put order", ms: 18, color: "var(--success)", Icon: Database },
];

const lambdaIndex = hops.findIndex((hop) => hop.id === "lambda");

const scenarios: Record<ScenarioId, { label: string; bootMs: number; verdict: string }> = {
  warm: {
    label: "Warm",
    bootMs: 0,
    verdict: "Container already warm. Every hop answers inside 31ms.",
  },
  cold: {
    label: "Cold start",
    bootMs: 212,
    verdict: "Lambda booted a new container. That boot is 212 of the 282ms.",
  },
};

const scenarioOrder: ScenarioId[] = ["warm", "cold"];

const hopMs = (hop: Hop, bootMs: number) => hop.ms + (hop.id === "lambda" ? bootMs : 0);
const totalFor = (bootMs: number) => hops.reduce((sum, hop) => sum + hopMs(hop, bootMs), 0);

/** Lets the chapter's own reveal land before the packet sets off. */
const startDelayMs = 560;
/** One automatic switch to the cold path, so the story plays without a click. */
const autoColdAfterMs = 2600;

type Step = { depart: number; arrive: number; boot: number; work: number };

/**
 * Visual schedule in seconds: the packet travels to each hop, dwells for a
 * time scaled to that hop's latency, then moves on. A cold boot adds a long
 * dwell at Lambda so the stall is felt, not just read.
 */
function buildSchedule(bootMs: number) {
  let t = 0;
  const steps: Step[] = hops.map((hop, index) => {
    const depart = t;
    const arrive = depart + (index === 0 ? 0.3 : 0.42);
    const boot = hop.id === "lambda" && bootMs > 0 ? 1.8 : 0;
    const work = Math.max(0.24, (hop.ms / 31) * 0.5);
    t = arrive + boot + work;
    return { depart, arrive, boot, work };
  });
  return { steps, end: t };
}

/** Node centres sit in four equal columns, so the rail runs 12.5% to 87.5%. */
const nodeLeft = (index: number) => `${12.5 + index * 25}%`;

export function TraceWaterfallVisual({
  reduced,
  playOnMount = false,
}: {
  /** Overrides the in-view gate, for previews that own their own timing. */
  reduced: boolean;
  playOnMount?: boolean;
}) {
  const { ref: panelRef, inView } = useInViewOnce<HTMLDivElement>();
  const active = reduced || playOnMount || inView;

  const [scenarioId, setScenarioId] = useState<ScenarioId>("warm");
  /** Bumped on every run so the schedule restarts from the edge. */
  const [runKey, setRunKey] = useState(0);
  /** Hop the packet is heading to (or sitting at); -1 before it sets off. */
  const [packetState, setPacketAt] = useState(-1);
  /** Hops the packet has reached; they stay lit for the rest of the run. */
  const [reachedState, setReached] = useState(-1);
  const [finishedState, setFinished] = useState(false);
  const userPicked = useRef(false);

  const { bootMs, verdict } = scenarios[scenarioId];
  // Reduced motion skips the journey and shows the request already delivered.
  const packetAt = reduced ? hops.length - 1 : packetState;
  const reached = reduced ? hops.length - 1 : reachedState;
  const finished = reduced || finishedState;
  const isCold = bootMs > 0;
  const total = totalFor(bootMs);
  const { steps } = buildSchedule(bootMs);

  const elapsed = useMotionValue(reduced ? total : 0);
  const elapsedLabel = useTransform(elapsed, (v) => `${Math.round(v)}`);
  const boot = useMotionValue(reduced && isCold ? 1 : 0);

  // First run, then a single hand-off to the cold path unless the visitor has
  // already chosen one.
  useEffect(() => {
    if (!active || reduced) return;
    const first = window.setTimeout(() => setRunKey(1), startDelayMs);
    return () => window.clearTimeout(first);
  }, [active, reduced]);

  // Plays one request through the stack for the current scenario.
  useEffect(() => {
    if (reduced) {
      // Reduced motion reads the finished state straight from render.
      elapsed.set(total);
      boot.set(isCold ? 1 : 0);
      return;
    }
    if (runKey === 0) return;

    const timers: number[] = [];
    const controls: AnimationPlaybackControls[] = [];
    const at = (seconds: number, fn: () => void) =>
      timers.push(window.setTimeout(fn, seconds * 1000));

    // Reset from a zero-delay timer so the run starts on a clean frame.
    at(0, () => {
      setPacketAt(-1);
      setReached(-1);
      setFinished(false);
    });
    elapsed.set(0);
    boot.set(0);

    let running = 0;
    steps.forEach((step, index) => {
      const hop = hops[index];
      const before = running;
      running += hopMs(hop, bootMs);
      const after = running;

      at(step.depart, () => setPacketAt(index));
      at(step.arrive, () => {
        setReached(index);
        elapsed.set(before);
        controls.push(
          animate(elapsed, after, { duration: step.boot + step.work, ease: "linear" }),
        );
        if (step.boot > 0) {
          controls.push(animate(boot, 1, { duration: step.boot, ease: "easeInOut" }));
        }
      });
    });

    const last = steps[steps.length - 1];
    at(last.arrive + last.boot + last.work, () => {
      setFinished(true);
      if (!userPicked.current && scenarioId === "warm") {
        at(autoColdAfterMs / 1000, () => {
          if (userPicked.current) return;
          setScenarioId("cold");
          setRunKey((k) => k + 1);
        });
      }
    });

    return () => {
      timers.forEach(window.clearTimeout);
      controls.forEach((c) => c.stop());
    };
    // steps, total and isCold derive from scenarioId, so runKey + scenarioId cover them.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runKey, scenarioId, reduced]);

  const pick = (id: ScenarioId) => {
    userPicked.current = true;
    if (id === scenarioId && !finished) return;
    setScenarioId(id);
    if (!reduced) setRunKey((k) => k + 1);
  };

  const hopDuration = (index: number) =>
    index === 0 ? 0.3 : steps[index].arrive - steps[index].depart;
  const travel = reduced
    ? { duration: 0 }
    : { duration: hopDuration(Math.max(packetAt, 0)), ease: settle };
  const morph = reduced ? { duration: 0 } : { duration: 0.7, ease: settle };

  return (
    <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-[28rem] md:max-w-[33rem]">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[42%] h-64 w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        initial={false}
        animate={{
          backgroundColor:
            isCold && reached >= lambdaIndex
              ? "rgba(203, 75, 22, 0.18)"
              : "rgba(38, 139, 210, 0.16)",
        }}
        transition={{ duration: 0.9, ease: settle }}
      />

      <div
        ref={panelRef}
        className="relative overflow-hidden rounded-[1.65rem] border border-border/80 px-4 pb-5 pt-4 shadow-[0_0_0_1px_rgb(38_139_210/0.1),0_28px_56px_-30px_rgb(21_40_48/0.85)] sm:px-6 sm:pb-6 sm:pt-5"
        style={{
          backgroundColor: trace.chassis,
          // A touch of lift at the top edge and depth toward the readout.
          backgroundImage: `linear-gradient(to bottom, ${hairline(4)}, transparent 38%, color-mix(in srgb, var(--background) 60%, transparent))`,
          boxShadow: `inset 0 1px 0 ${hairline(7)}`,
        }}
      >
        {/* Light pool behind the rail: blue while the request flows, orange
            once a cold boot is holding it at Lambda. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 62% 42% at 50% 34%, rgb(38 139 210 / 0.13), transparent 70%)",
          }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 52% 38% at 60% 34%, rgb(203 75 22 / 0.14), transparent 70%)",
          }}
          initial={false}
          animate={{ opacity: isCold && reached >= lambdaIndex ? 1 : 0 }}
          transition={{ duration: 0.9, ease: settle }}
        />
        {/* Sparse dot field around the map only, fading out before the edges. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, ${hairline(13)} 1px, transparent 1.4px)`,
            backgroundSize: "18px 18px",
            backgroundPosition: "9px 9px",
            maskImage: "radial-gradient(ellipse 58% 40% at 50% 36%, black 20%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 58% 40% at 50% 36%, black 20%, transparent 100%)",
          }}
        />

        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
            <div>
              <p className="text-[11px]" style={{ color: trace.muted }}>
                Request trace
              </p>
              <p
                className="mt-0.5 font-display text-[1.35rem] leading-none sm:text-[1.55rem]"
                style={{ color: trace.ink }}
              >
                POST /checkout
              </p>
            </div>

            <div
              className="flex rounded-full border p-0.5"
              style={{ borderColor: hairline(14), backgroundColor: trace.well }}
              role="group"
              aria-label="Trace scenario"
            >
              {scenarioOrder.map((id) => {
                const selected = id === scenarioId;
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => pick(id)}
                    className="relative h-8 rounded-full px-3.5 text-[12px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
                    style={{ color: selected ? trace.ink : trace.muted }}
                  >
                    {selected ? (
                      <motion.span
                        layoutId="trace-scenario-pill"
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: trace.panel }}
                        transition={morph}
                      />
                    ) : null}
                    <span className="relative">{scenarios[id].label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stack map: the request crosses four services on one rail. */}
          <div
            className="relative mt-9 sm:mt-10"
            role="list"
            aria-label="Latency breakdown across serverless services"
          >
            <div
              aria-hidden="true"
              className="absolute top-[1.625rem] h-px sm:top-[1.875rem]"
              style={{ left: nodeLeft(0), right: "12.5%", backgroundColor: hairline(16) }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute top-[calc(1.625rem-0.5px)] h-[2px] origin-left bg-signal sm:top-[calc(1.875rem-0.5px)]"
              style={{ left: nodeLeft(0), boxShadow: "0 0 10px rgb(38 139 210 / 0.6)" }}
              initial={false}
              animate={{ width: `${Math.max(packetAt, 0) * 25}%`, opacity: packetAt > 0 ? 1 : 0 }}
              transition={travel}
            />

            {/* The request itself: rides the rail. It renders under the nodes, so
                it disappears into each hop while that hop works. */}
            {packetAt >= 0 && !reduced ? (
              <motion.span
                aria-hidden="true"
                className="absolute top-[1.625rem] size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full sm:top-[1.875rem]"
                style={{ backgroundColor: trace.ink, boxShadow: "0 0 0 3px rgb(38 139 210 / 0.35), 0 0 14px 2px rgb(38 139 210 / 0.8)" }}
                initial={{ left: nodeLeft(0), opacity: 0 }}
                animate={{ left: nodeLeft(packetAt), opacity: finished ? 0 : 1 }}
                transition={{ left: travel, opacity: { duration: 0.3 } }}
              />
            ) : null}

            <div className="relative grid grid-cols-4">
              {hops.map((hop, index) => {
                const lit = reached >= index;
                const booting = hop.id === "lambda" && isCold;
                const ms = hopMs(hop, bootMs);
                return (
                  <div
                    key={hop.id}
                    role="listitem"
                    className="flex min-w-0 flex-col items-center text-center"
                  >
                    <div className="relative size-[3.25rem] sm:size-[3.75rem]">
                      {booting ? (
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 64 64"
                          className="absolute -inset-[7px] size-[calc(100%+14px)] -rotate-90"
                        >
                          <circle cx="32" cy="32" r="30" fill="none" stroke={hairline(12)} strokeWidth="2" />
                          <motion.circle
                            cx="32"
                            cy="32"
                            r="30"
                            fill="none"
                            stroke={culprit}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            style={{ pathLength: boot }}
                          />
                        </svg>
                      ) : null}
                      <div
                        className="relative flex size-full items-center justify-center rounded-full border-[1.5px] transition-[border-color,box-shadow,background-color] duration-500"
                        style={{
                          borderColor: lit ? hop.color : hairline(18),
                          backgroundColor: lit ? trace.panel : trace.well,
                          boxShadow: lit
                            ? `0 0 0 4px color-mix(in srgb, ${hop.color} 14%, transparent), 0 0 22px color-mix(in srgb, ${hop.color} 35%, transparent)`
                            : "none",
                          color: lit ? hop.color : trace.muted,
                        }}
                      >
                        {hop.Icon ? (
                          <hop.Icon className="size-5 sm:size-[1.4rem]" strokeWidth={1.6} />
                        ) : (
                          <span aria-hidden="true" className="font-display text-[1.7rem] leading-none sm:text-[2rem]">
                            λ
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="mt-3 max-w-full truncate text-[12px] font-medium leading-4" style={{ color: trace.ink }}>
                      {hop.label}
                    </p>
                    <p className="max-w-full truncate text-[10px] leading-4" style={{ color: trace.muted }}>
                      {booting ? (
                        <span style={{ color: culprit }}>{bootMs} boot + {hop.ms}</span>
                      ) : (
                        hop.detail
                      )}
                    </p>
                    <p
                      className="mt-1.5 font-display text-[1.2rem] leading-none tabular-nums transition-[color,opacity] duration-500 sm:text-[1.35rem]"
                      style={{
                        color: booting && lit ? culprit : trace.ink,
                        opacity: lit ? 1 : 0.25,
                      }}
                    >
                      {ms}
                      <span className="ml-px text-[0.7em]">ms</span>
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Where the milliseconds went, as one strip in request order. */}
          <div className="mt-8" aria-hidden="true">
            <div className="flex h-3 gap-[3px]">
              {hops.map((hop, index) => {
                const ms = hopMs(hop, bootMs);
                const booting = hop.id === "lambda" && isCold;
                const step = steps[index];
                return (
                  <motion.div
                    key={hop.id}
                    className="relative h-full overflow-hidden rounded-[3px]"
                    style={{ backgroundColor: trace.well }}
                    initial={false}
                    animate={{ flexGrow: ms, flexBasis: 0 }}
                    transition={morph}
                  >
                    <motion.div
                      className="absolute inset-0 flex"
                      initial={false}
                      animate={{
                        clipPath: reached >= index ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
                      }}
                      transition={
                        reduced || reached < index
                          ? { duration: 0 }
                          : { duration: step.boot + step.work, ease: "linear" }
                      }
                    >
                      {booting ? (
                        <span className="h-full" style={{ flexGrow: bootMs, backgroundColor: culprit }} />
                      ) : null}
                      <span className="h-full" style={{ flexGrow: hop.ms, backgroundColor: hop.color }} />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
            <p className="shrink-0 leading-none" style={{ color: trace.ink }}>
              <motion.span className="font-display text-[2.75rem] tabular-nums sm:text-[3.25rem]">
                {elapsedLabel}
              </motion.span>
              <span className="ml-1 font-display text-[1.25rem] sm:text-[1.4rem]">ms</span>
              <span className="mt-1.5 block text-[11px]" style={{ color: trace.muted }}>
                end to end
              </span>
            </p>
            <div className="relative min-h-9 max-w-[15rem] flex-1 basis-[11rem] pb-0.5">
              <AnimatePresence mode="wait" initial={false}>
                {finished ? (
                  <motion.p
                    key={scenarioId}
                    className="text-[12px] leading-[1.15rem]"
                    style={{ color: isCold ? trace.ink : trace.muted }}
                    initial={reduced ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -4 }}
                    transition={{ duration: 0.32, ease: settle }}
                  >
                    {verdict}
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CloudV4Mock4() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="cloud-v4-mock-4"
      aria-labelledby="cloud-v4-mock-4-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2
            id="cloud-v4-mock-4-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            Cloud expertise at scale
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            From API routes behind Cognito to DynamoDB writes in production, I
            architect and deploy serverless stacks on Lambda, SAM, Amplify, and
            DynamoDB. I trace the auth gate, the compute slice, and the store
            write so latency has a name before users hit it.
          </p>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
            Five AWS services ship as one SAM deploy. Your team runs the stack
            daily without me on call.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Cloud capabilities">
            {capabilities.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-border/80 bg-surface/60 px-3 py-1.5 text-sm text-foreground"
              >
                {chip}
              </li>
            ))}
          </ul>
        </div>

        <div aria-hidden="true">
          <TraceWaterfallVisual reduced={reduced} />
        </div>
      </div>
    </section>
  );
}
