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

// `from` is where the engagement joins the line. Every path runs to ship.
// `steps` holds what the visitor leaves with at each stage the engagement
// covers. Wording stays inside src/content/process.ts.
const engagements: {
  title: string;
  copy: string;
  from: Stage;
  /** Lead-in and the closing word that rolls in accent. */
  headline: [string, string];
  brings: string;
  steps: Partial<Record<Stage, string>>;
}[] = [
  {
    title: "Ship an MVP",
    copy: "Turn a proposal into software the first users can actually book, pay, or log into.",
    from: "plan",
    headline: ["From proposal to first", "users"],
    brings: "A proposal and the users it is for",
    steps: {
      plan: "Scope, cost, and dates signed off",
      build: "Booking, payments, and login working end to end",
      ship: "In front of the first real users",
    },
  },
  {
    title: "Custom product work",
    copy: "White-label booking, Stripe flows, and RAG workflows built for the business, not a template.",
    from: "plan",
    headline: ["Built around the", "business"],
    brings: "A business a template cannot fit",
    steps: {
      plan: "Business rules written down before any code",
      build: "Built to fit the business, reviewed every sprint",
      ship: "Approved in UAT, released with zero downtime",
    },
  },
  {
    title: "Add the hard parts",
    copy: "Payments, real-time, and AI features dropped into a product that already exists.",
    from: "build",
    headline: ["Dropped into your", "codebase"],
    brings: "A product that already exists",
    steps: {
      build: "The feature built into your codebase",
      ship: "Approved in UAT, then released",
    },
  },
  {
    title: "Untangle infrastructure",
    copy: "Serverless AWS, auth, and data so the product holds up past launch.",
    from: "ship",
    headline: ["Holds up past", "launch"],
    brings: "A built product that has to hold up past launch",
    steps: {
      ship: "AWS, auth, and data that hold up past launch",
    },
  },
];

// Timing for the pulse's run down the line, in seconds.
const PULSE_START = 0.45;
const PULSE_HOP = 0.62;
const PULSE_REST = 0.2;

// How long each engagement shows before the tabs move on by themselves.
const CYCLE_SECONDS = 6;

export function FeatureCards() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [selected, setSelected] = useState(0);
  const current = engagements[selected];
  const currentFromIndex = stageOrder.indexOf(current.from);

  const tablistRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);
  const cycleRef = useRef<gsap.core.Tween | null>(null);
  // The tabs cycle on their own until the visitor picks one. Hover, focus,
  // and scrolling away hold the cycle where it is.
  const [autoplay, setAutoplay] = useState(true);
  const [held, setHeld] = useState(false);
  const [inView, setInView] = useState(false);

  const select = (index: number, focus = false) => {
    const next = (index + engagements.length) % engagements.length;
    setAutoplay(false);
    setSelected(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  // The marker slides to the selected tab, and follows it through resizes.
  useLayoutEffect(() => {
    const list = tablistRef.current;
    const marker = indicatorRef.current;
    if (!list || !marker) return;
    const place = (animate: boolean) => {
      const tab = tabRefs.current[selected];
      if (!tab) return;
      const to = { y: tab.offsetTop, height: tab.offsetHeight };
      if (animate) gsap.to(marker, { ...to, duration: 0.55, ease: "power3.inOut" });
      else gsap.set(marker, to);
    };
    place(!reduced);
    const ro = new ResizeObserver(() => place(false));
    ro.observe(list);
    return () => ro.disconnect();
  }, [selected, reduced]);

  // Each switch rolls the stage word up and eases the rest in. Skipped on
  // first paint so the scroll reveal owns the entrance.
  const firstPanel = useRef(true);
  useLayoutEffect(() => {
    if (firstPanel.current) {
      firstPanel.current = false;
      return;
    }
    const panel = panelRef.current;
    if (!panel || reduced) return;
    const word = panel.querySelector<HTMLElement>("[data-panel-word]");
    const parts = panel.querySelectorAll<HTMLElement>("[data-panel-part]");
    const rows = panel.querySelectorAll<HTMLElement>("[data-panel-row]");
    gsap.killTweensOf([word, ...parts, ...rows]);
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(
      word,
      { yPercent: 110, rotate: 3 },
      { yPercent: 0, rotate: 0, duration: 0.7, ease: "power4.out" },
    )
      .fromTo(parts, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, 0)
      .fromTo(rows, { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.45, stagger: 0.07 }, 0.12);
  }, [selected, reduced]);

  useLayoutEffect(() => {
    const block = sectionRef.current?.querySelector<HTMLElement>("[data-engagements]");
    if (!block) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.45,
    });
    io.observe(block);
    return () => io.disconnect();
  }, []);

  // One timed run of the selected tab's progress line, then the next tab.
  useLayoutEffect(() => {
    const bars = tabRefs.current.map((t) => t?.querySelector<HTMLElement>("[data-tab-progress]"));
    gsap.set(bars, { scaleX: 0 });
    const bar = bars[selected];
    if (!autoplay || reduced || !bar) return;
    const tween = gsap.to(bar, {
      scaleX: 1,
      duration: CYCLE_SECONDS,
      ease: "none",
      paused: true,
      onComplete: () => setSelected((s) => (s + 1) % engagements.length),
    });
    cycleRef.current = tween;
    return () => {
      tween.kill();
      cycleRef.current = null;
    };
  }, [selected, autoplay, reduced]);

  useLayoutEffect(() => {
    const tween = cycleRef.current;
    if (!tween) return;
    if (inView && !held) tween.play();
    else tween.pause();
  }, [inView, held, selected, autoplay, reduced]);

  // The panel's glow drifts after the pointer and settles back when it leaves.
  const glowTo = useRef<{ x: gsap.QuickToFunc; y: gsap.QuickToFunc } | null>(null);
  useLayoutEffect(() => {
    const glow = glowRef.current;
    if (!glow || reduced) return;
    glowTo.current = {
      x: gsap.quickTo(glow, "left", { duration: 0.9, ease: "power3.out" }),
      y: gsap.quickTo(glow, "top", { duration: 0.9, ease: "power3.out" }),
    };
    return () => {
      glowTo.current = null;
    };
  }, [reduced]);

  const moveGlow = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !glowTo.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    glowTo.current.x(e.clientX - r.left);
    glowTo.current.y(e.clientY - r.top);
  };

  const resetGlow = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!glowTo.current) return;
    glowTo.current.x(e.currentTarget.offsetWidth);
    glowTo.current.y(0);
  };

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
        const heading = q("[data-engagement-heading]");
        const tabs = q("[data-engagement-tab]");
        const panel = q("[data-engagement-panel]");
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
        gsap.set([...heading, ...tabs], { opacity: 0, y: 12 });
        const panelWord = q("[data-panel-word]");
        const panelRows = q("[data-panel-row]");
        gsap.set(panel, { clipPath: "inset(0% 0% 100% 0% round 1.5rem)", y: 32 });
        gsap.set(panelWord, { yPercent: 110 });
        gsap.set(panelRows, { opacity: 0, x: -14 });

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

        const rowTl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
        rowTl
          .to(heading, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 })
          .to(tabs, { opacity: 1, y: 0, duration: 0.45, stagger: 0.06 }, 0.1)
          .to(
            panel,
            {
              clipPath: "inset(0% 0% 0% 0% round 1.5rem)",
              y: 0,
              duration: 1,
              ease: "power4.inOut",
              clearProps: "clipPath",
            },
            0.15,
          )
          .to(panelWord, { yPercent: 0, duration: 0.8, ease: "power4.out" }, 0.75)
          .to(panelRows, { opacity: 1, x: 0, duration: 0.45, stagger: 0.07 }, 0.85);

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
              <li key={stage.id} className="relative pl-8 lg:pl-0">
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
          className="mt-20 lg:col-span-4 lg:mt-28 lg:grid lg:grid-cols-subgrid lg:items-start"
          onPointerEnter={(e) => e.pointerType === "mouse" && setHeld(true)}
          onPointerLeave={(e) => e.pointerType === "mouse" && setHeld(false)}
          onFocus={() => setHeld(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHeld(false);
          }}
        >
          <div className="lg:sticky lg:top-28">
            <p
              data-engagement-heading
              className="font-display text-[clamp(1.9rem,3.6vw,2.75rem)] leading-none tracking-tight text-foreground"
            >
              Where you come in
            </p>
            <p
              data-engagement-heading
              className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground"
            >
              Join at whichever stage you are at. Every path ends at ship.
            </p>

            <div
              role="tablist"
              aria-label="Engagements"
              aria-orientation="vertical"
              ref={tablistRef}
              className="relative mt-8 border-b border-border"
              onKeyDown={(e) => {
                const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
                if (step) {
                  e.preventDefault();
                  select(selected + step, true);
                } else if (e.key === "Home" || e.key === "End") {
                  e.preventDefault();
                  select(e.key === "Home" ? 0 : engagements.length - 1, true);
                }
              }}
            >
              <span
                ref={indicatorRef}
                aria-hidden="true"
                className="pointer-events-none absolute top-0 left-0 w-full border-l-2 border-accent bg-linear-to-r from-accent/12 to-transparent"
              />
              {engagements.map((item, index) => {
                const isSelected = index === selected;
                return (
                  <button
                    key={item.title}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    id={`engagement-tab-${index}`}
                    aria-selected={isSelected}
                    aria-controls="engagement-panel"
                    tabIndex={isSelected ? 0 : -1}
                    data-engagement-tab
                    onClick={() => select(index)}
                    className={cn(
                      "group relative flex w-full items-baseline gap-3 border-t border-border py-4 pr-2 pl-4 text-left transition-colors duration-200 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                      isSelected ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      data-tab-progress
                      className="pointer-events-none absolute -top-px right-0 left-0 h-px origin-left scale-x-0 bg-accent"
                    />
                    <span
                      className={cn(
                        "w-5 shrink-0 text-xs font-medium tabular-nums",
                        isSelected ? "text-accent-readable" : "text-muted-foreground/70",
                      )}
                    >
                      0{index + 1}
                    </span>
                    <span
                      className={cn(
                        "flex-1 font-display text-[1.35rem] leading-tight tracking-tight transition-transform duration-300 ease-out motion-reduce:transition-none",
                        !isSelected && "group-hover:translate-x-1",
                      )}
                    >
                      {item.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "text-sm text-accent transition-[opacity,translate] duration-300 motion-reduce:transition-none",
                        isSelected ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0",
                      )}
                    >
                      →
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            ref={panelRef}
            id="engagement-panel"
            role="tabpanel"
            aria-labelledby={`engagement-tab-${selected}`}
            data-engagement-panel
            className="relative mt-8 overflow-hidden rounded-3xl border border-border bg-surface/60 p-6 sm:p-10 lg:col-span-3 lg:col-start-2 lg:mt-0 lg:p-12"
            onPointerMove={moveGlow}
            onPointerLeave={resetGlow}
          >
            <span
              ref={glowRef}
              aria-hidden="true"
              className="pointer-events-none absolute top-0 left-full size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/12 blur-3xl"
            />

            <div className="relative">
              <p data-panel-part className="text-xs font-medium text-muted-foreground">
                Starts at <span className="text-accent-readable">{current.from}</span>
              </p>

              <p className="mt-4 min-h-[1.9em] max-w-[16ch] font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] tracking-tight text-foreground">
                {current.headline[0]}{" "}
                <span className="-mb-[0.16em] inline-block overflow-hidden pb-[0.16em] align-bottom">
                  <span data-panel-word className="inline-block text-accent will-change-transform">
                    {current.headline[1]}
                  </span>
                </span>
                .
              </p>

              <p
                data-panel-part
                className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg"
              >
                {current.copy}
              </p>

              <div className="mt-10 grid gap-10 border-t border-border pt-8 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-12 lg:min-h-[12.25rem]">
                <div data-panel-part>
                  <p className="text-xs font-medium text-muted-foreground">You bring</p>
                  <p className="mt-3 text-base leading-7 text-foreground">{current.brings}</p>
                </div>

                <div>
                  <p data-panel-part className="text-xs font-medium text-muted-foreground">
                    You leave with
                  </p>
                  <ol className="mt-3">
                    {stageOrder.slice(currentFromIndex).map((stage) => (
                      <li
                        key={stage}
                        data-panel-row
                        className="flex items-baseline gap-4 border-b border-border/60 py-3 first:pt-0 last:border-b-0 last:pb-0"
                      >
                        <span className="w-10 shrink-0 text-xs font-medium text-accent-readable">
                          {stage}
                        </span>
                        <span className="text-base leading-7 text-foreground">
                          {current.steps[stage]}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <p data-panel-part className="mt-10">
                <Link
                  href="/contact"
                  className="inline-flex w-fit items-center gap-2 border-b border-accent pb-1 text-sm font-medium text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  Talk through your project
                  <span aria-hidden="true">→</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
