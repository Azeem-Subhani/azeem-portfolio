"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { revealStart } from "@/lib/reveal-visibility";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type Stage = "plan" | "build" | "ship";

const stageOrder: Stage[] = ["plan", "build", "ship"];

// Durations and steps come from src/content/process.ts, so the homepage
// never promises something the Process page does not.
const stages: { id: Stage; meta: string; copy: string }[] = [
  {
    id: "plan",
    meta: "1–2 weeks",
    copy: "Discovery, stakeholder interviews, and a written scope. You sign off on cost and dates before any code.",
  },
  {
    id: "build",
    meta: "Two-week sprints",
    copy: "Planning, development, code review, and QA every sprint, closed with a report on what shipped.",
  },
  {
    id: "ship",
    meta: "UAT to production",
    copy: "You click through each feature in UAT. Approved releases reach real users with zero downtime.",
  },
];

// `from` is where the engagement joins the line. Every bar runs to ship.
const engagements: { title: string; copy: string; from: Stage }[] = [
  {
    title: "Ship an MVP",
    copy: "Turn a proposal into software the first users can actually book, pay, or log into.",
    from: "plan",
  },
  {
    title: "Custom product work",
    copy: "White-label booking, Stripe flows, and RAG workflows built for the business, not a template.",
    from: "plan",
  },
  {
    title: "Add the hard parts",
    copy: "Payments, real-time, and AI features dropped into a product that already exists.",
    from: "build",
  },
  {
    title: "Untangle infrastructure",
    copy: "Serverless AWS, auth, and data so the product holds up past launch.",
    from: "ship",
  },
];

// Stage columns are grid columns 2–4 on desktop; column 1 holds the labels.
const colStart: Record<Stage, string> = {
  plan: "lg:col-start-2",
  build: "lg:col-start-3",
  ship: "lg:col-start-4",
};

function coverageLabel(from: Stage) {
  return from === "ship" ? "Covers ship." : `Covers ${from} through ship.`;
}

const reducedQuery = "(prefers-reduced-motion: reduce)";

// Timing for the pulse's run down the line, in seconds.
const PULSE_START = 0.45;
const PULSE_HOP = 0.62;
const PULSE_REST = 0.2;

/** Sends a dot along an engagement bar to ship. Hover only, never on load. */
function runBar(bar: HTMLElement | null) {
  if (!bar || window.matchMedia(reducedQuery).matches) return;
  const runner = bar.querySelector<HTMLElement>("[data-engagement-runner]");
  const end = bar.querySelector<HTMLElement>("[data-engagement-end]");
  if (!runner || !end) return;

  gsap.killTweensOf([runner, end]);
  gsap.fromTo(
    runner,
    { left: "0%", xPercent: -50, yPercent: -50, opacity: 1, scale: 1 },
    {
      left: "100%",
      duration: 0.75,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.to(runner, { opacity: 0, scale: 2.4, duration: 0.35, ease: "power2.out" });
        gsap.fromTo(end, { scale: 1.6 }, { scale: 1, duration: 0.45, ease: "back.out(3)" });
      },
    },
  );
}

export function FeatureCards() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  // The engagement under the mouse. Stages it skips and the other bars fade back.
  const [active, setActive] = useState<string | null>(null);
  const activeFrom = engagements.find((e) => e.title === active)?.from;
  const activeFromIndex = activeFrom ? stageOrder.indexOf(activeFrom) : -1;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const lineGroup = section?.querySelector<HTMLElement>("[data-stage-line]");
    const rowGroup = section?.querySelector<HTMLElement>("[data-engagements]");
    if (!section || !lineGroup || !rowGroup) return;

    const q = (sel: string) => Array.from(section.querySelectorAll<HTMLElement>(sel));

    // matchMedia rebuilds the sequence when the layout flips between the
    // horizontal and vertical line, and reverts every inline style it set.
    const mm = gsap.matchMedia();
    mm.add(
      { desktop: "(min-width: 1024px)", motion: "(prefers-reduced-motion: no-preference)" },
      (ctx) => {
        const { desktop, motion } = ctx.conditions as { desktop: boolean; motion: boolean };
        if (!motion) return;

        const axis = desktop ? "x" : "y";
        const words = q("[data-stage-word]");
        const dots = q("[data-stage-dot]");
        const pings = q("[data-stage-ping]");
        const details = q("[data-stage-detail]");
        const intro = q("[data-stage-intro]");
        const rows = q("[data-engagement]");
        const bars = q("[data-engagement-bar]");
        const pulse = section.querySelector<HTMLElement>("[data-stage-pulse]");
        const track = section.querySelector<HTMLElement>(`[data-stage-track="${axis}"]`);
        const fill = section.querySelector<HTMLElement>(`[data-stage-fill="${axis}"]`);
        if (!pulse || !track || !fill) return;

        // Positions are read when each tween first renders, after fonts and
        // layout have settled, not when the effect runs.
        const origin = () => lineGroup.getBoundingClientRect();
        const center = (i: number) => {
          const r = dots[i].getBoundingClientRect();
          const o = origin();
          return {
            x: r.left + r.width / 2 - o.left,
            y: r.top + r.height / 2 - o.top,
          };
        };
        // Share of the track the fill must cover to reach stop i.
        const reach = (i: number) => {
          const t = track.getBoundingClientRect();
          const o = origin();
          const along = center(i)[axis];
          const start = desktop ? t.left - o.left : t.top - o.top;
          const length = desktop ? t.width : t.height;
          return length > 0 ? Math.min(1, Math.max(0, (along - start) / length)) : 1;
        };
        const fillScale = desktop ? "scaleX" : "scaleY";

        gsap.set(words, { yPercent: 112, rotate: 1, opacity: 0.3, transformOrigin: "left bottom" });
        gsap.set(dots, { scale: 0 });
        gsap.set(pings, { opacity: 0 });
        gsap.set([...details, ...intro], { opacity: 0, y: 14 });
        gsap.set(pulse, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0 });
        gsap.set(fill, {
          [fillScale]: 0,
          transformOrigin: desktop ? "left center" : "center top",
        });
        gsap.set(rows, { opacity: 0, y: 12 });
        gsap.set(bars, { scaleX: 0, transformOrigin: "left center" });

        // The words land dim, then a pulse carries the line from stop to
        // stop. Each stage lights, pings, and shows its detail on arrival.
        const lineTl = gsap.timeline({ paused: true });
        lineTl.to(words, { yPercent: 0, rotate: 0, duration: 0.8, stagger: 0.12, ease: "power4.out" });

        const arrive = (i: number, at: number) => {
          lineTl
            .to(dots[i], { scale: 1, duration: 0.35, ease: "back.out(3)" }, at)
            .fromTo(
              pings[i],
              { scale: 1, opacity: 0.9 },
              { scale: 3, opacity: 0, duration: 0.75, ease: "power2.out" },
              at,
            )
            .to(words[i], { opacity: 1, duration: 0.4, ease: "power1.out" }, at)
            .to(details[i], { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, at + 0.08);
        };

        lineTl
          .set(pulse, { x: () => center(0).x, y: () => center(0).y }, PULSE_START)
          .to(pulse, { opacity: 1, scale: 1, duration: 0.25, ease: "power2.out" }, PULSE_START);
        arrive(0, PULSE_START);

        let t = PULSE_START + PULSE_REST;
        for (let i = 1; i < dots.length; i++) {
          const stop = i;
          lineTl
            .to(pulse, { [axis]: () => center(stop)[axis], duration: PULSE_HOP, ease: "power2.inOut" }, t)
            .to(fill, { [fillScale]: () => reach(stop), duration: PULSE_HOP, ease: "power2.inOut" }, t);
          t += PULSE_HOP;
          arrive(stop, t);
          t += PULSE_REST;
        }

        // Ship is the end of the line: the pulse settles into it and the
        // fill runs out to the edge.
        lineTl
          .to(pulse, { opacity: 0, scale: 0, duration: 0.3, ease: "power2.in" }, t - PULSE_REST + 0.1)
          .to(fill, { [fillScale]: 1, duration: 0.5, ease: "power2.out" }, t - PULSE_REST)
          .to(intro, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, t - PULSE_REST);

        // The bars grow toward ship, so the chart reads as "everything ends there".
        const rowTl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
        rowTl
          .to(rows, { opacity: 1, y: 0, duration: 0.5, stagger: 0.09 })
          .to(bars, { scaleX: 1, duration: 0.8, stagger: 0.09, ease: "power2.inOut" }, 0.15);

        const triggers = (
          [
            [lineGroup, lineTl],
            [rowGroup, rowTl],
          ] as const
        ).map(([node, timeline]) => ({
          timeline,
          st: ScrollTrigger.create({
            trigger: node,
            start: () => revealStart(node.offsetHeight, window.innerHeight),
            once: true,
            invalidateOnRefresh: true,
            onEnter: () => timeline.play(),
          }),
        }));

        // A deep link that lands past the trigger still has to reveal.
        const raf = requestAnimationFrame(() => {
          for (const { st, timeline } of triggers) {
            if (st.start <= window.scrollY + 4 && timeline.progress() === 0) timeline.play();
          }
        });

        const refresh = () => ScrollTrigger.refresh();
        void document.fonts?.ready.then(refresh);
        window.addEventListener("load", refresh);

        return () => {
          cancelAnimationFrame(raf);
          window.removeEventListener("load", refresh);
        };
      },
    );

    return () => mm.revert();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="process-title"
      className="px-4 py-20 sm:px-6 sm:py-28"
    >
      <h2 id="process-title" className="sr-only">
        Plan, build, ship
      </h2>

      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-4 lg:gap-x-8">
        {/* Label column. On desktop it sits left of the three stages. */}
        <div data-stage-intro className="mb-12 lg:mb-0 lg:pt-4">
          <p className="max-w-xs text-base leading-7 text-muted-foreground">
            I own all three, from the first sketch to launch.
          </p>
          <Link
            href="/process"
            className="mt-4 inline-block text-sm font-medium text-foreground underline decoration-muted-foreground/50 decoration-1 underline-offset-[6px] transition-colors hover:decoration-accent focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            See how a project runs
          </Link>
        </div>

        <div
          data-stage-line
          // One size drives the words and the track's offset under them.
          className="relative [--stage-size:clamp(3.25rem,7.4vw,7.5rem)] [--stage-track:calc(var(--stage-size)*0.88+1.5rem+5px)] lg:col-span-3"
        >
          {/* Tracks and fills are painted before the list so the hollow stops
              sit on top of them. The fill is the accent line the pulse draws. */}
          <span
            aria-hidden="true"
            data-stage-track="x"
            className="pointer-events-none absolute top-(--stage-track) right-0 left-0 hidden h-px bg-foreground/15 lg:block"
          />
          <span
            aria-hidden="true"
            data-stage-fill="x"
            className="pointer-events-none absolute top-(--stage-track) right-0 left-0 hidden h-px bg-accent/70 lg:block"
          />
          <span
            aria-hidden="true"
            data-stage-track="y"
            className="pointer-events-none absolute top-[1.45rem] bottom-2 left-[5px] w-px bg-foreground/15 lg:hidden"
          />
          <span
            aria-hidden="true"
            data-stage-fill="y"
            className="pointer-events-none absolute top-[1.45rem] bottom-2 left-[5px] w-px bg-accent/70 lg:hidden"
          />

          <ol className="relative grid gap-12 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {stages.map((stage, i) => (
              <li
                key={stage.id}
                className={cn(
                  "relative pl-8 transition-opacity duration-300 motion-reduce:transition-none lg:pl-0",
                  i < activeFromIndex && "opacity-30",
                )}
              >
                <h3
                  // Descender guard: "p" and "l" at 0.88 leading clip without
                  // the extra bottom room inside the mask.
                  className="-mb-[0.16em] overflow-hidden pb-[0.16em] font-display text-(length:--stage-size) leading-[0.88] font-normal tracking-tight"
                >
                  <span
                    data-stage-word
                    className={cn("block will-change-transform", i === 2 && "text-accent")}
                  >
                    {stage.id}.
                  </span>
                </h3>

                {/* The stop on the line. On phones it sits on the vertical track. */}
                <span
                  aria-hidden="true"
                  data-stage-dot
                  className={cn(
                    "absolute top-[1.1rem] left-0 block size-[11px] rounded-full border-2 border-accent bg-background",
                    "lg:relative lg:top-auto lg:mt-6",
                    i === 2 && "bg-accent",
                  )}
                >
                  <span
                    data-stage-ping
                    className="absolute -inset-[2px] rounded-full border border-accent opacity-0"
                  />
                </span>

                <div data-stage-detail className="mt-4 lg:mt-5 lg:pr-4">
                  <p className="text-sm font-medium text-foreground">{stage.meta}</p>
                  <p className="mt-2 max-w-[34ch] text-sm leading-6 text-muted-foreground">
                    {stage.copy}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* The pulse that carries the line from plan to ship. Hidden at rest. */}
          <span
            aria-hidden="true"
            data-stage-pulse
            className="pointer-events-none absolute top-0 left-0 z-10 size-[9px] rounded-full bg-accent opacity-0 shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_22%,transparent),0_0_18px_var(--accent)]"
          />
        </div>

        <div
          data-engagements
          className="mt-20 lg:col-span-4 lg:mt-24 lg:grid lg:grid-cols-subgrid"
        >
          <p className="mb-6 text-sm font-medium text-foreground lg:col-span-4">
            Where you come in
          </p>

          <ul className="lg:col-span-4 lg:grid lg:grid-cols-subgrid">
            {engagements.map((item) => {
              const fromIndex = stageOrder.indexOf(item.from);
              return (
                <li
                  key={item.title}
                  data-engagement
                  onPointerEnter={(e) => {
                    // Touch has no hover-out, so the highlight would stick.
                    if (e.pointerType !== "mouse") return;
                    setActive(item.title);
                    runBar(e.currentTarget.querySelector<HTMLElement>("[data-engagement-bar]"));
                  }}
                  onPointerLeave={(e) => {
                    if (e.pointerType === "mouse") setActive(null);
                  }}
                  className="group border-t border-border py-5 lg:col-span-4 lg:grid lg:grid-cols-subgrid lg:items-center"
                >
                  <div className="lg:pr-6">
                    <h3 className="text-base font-medium">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{item.copy}</p>
                  </div>

                  <div
                    className={cn(
                      "relative mt-4 transition-opacity duration-300 motion-reduce:transition-none lg:col-end-5 lg:mt-0",
                      colStart[item.from],
                      active && active !== item.title && "lg:opacity-35",
                    )}
                  >
                    <span className="sr-only">{coverageLabel(item.from)}</span>

                    {/* Phones: all three stages as segments, filled from the entry point. */}
                    <div aria-hidden="true" className="grid grid-cols-3 gap-1.5 lg:hidden">
                      {stageOrder.map((s, i) => (
                        <div key={s}>
                          <span
                            className={cn(
                              "block h-1 rounded-full",
                              i >= fromIndex ? "bg-accent" : "bg-border",
                            )}
                          />
                          <span
                            className={cn(
                              "mt-1.5 block text-xs",
                              i >= fromIndex ? "text-foreground" : "text-muted-foreground/70",
                            )}
                          >
                            {s}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Desktop: one bar under the stage columns it covers. */}
                    <span
                      aria-hidden="true"
                      data-engagement-bar
                      className="relative hidden h-1 rounded-full bg-accent/70 transition-colors group-hover:bg-accent lg:block"
                    >
                      <span className="absolute top-1/2 left-0 size-[11px] -translate-y-1/2 rounded-full border-2 border-accent bg-background" />
                      <span
                        data-engagement-end
                        className="absolute top-1/2 right-0 size-[11px] -translate-y-1/2 rounded-full bg-accent"
                      />
                      {/* Rides the bar to ship on hover. */}
                      <span
                        data-engagement-runner
                        className="absolute top-1/2 left-0 size-[9px] rounded-full bg-accent opacity-0 shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_22%,transparent),0_0_16px_var(--accent)]"
                      />
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
