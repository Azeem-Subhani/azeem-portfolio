"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { MagneticButton } from "@/components/motion/magnetic-button";
import { INTRO_COMPLETE_EVENT } from "@/components/motion/site-intro";
import { SystemsMap } from "@/components/sections/systems-map";
import { Button } from "@/components/ui/button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// The accent word cycles through these; the first one is what renders on the server.
const outcomes = ["launch.", "revenue.", "scale.", "customers."] as const;
const OUTCOME_INTERVAL_MS = 2600;

// Operated numbers from the service pages (cloud, mobile, web), so the fold carries proof.
const proof = [
  { value: "500+", label: "authenticated payments a day" },
  { value: "25+", label: "apps shipped" },
  { value: "5", label: "venue sites on one codebase" },
] as const;

/** Survives Strict Mode remount so a finished entrance is not replayed. */
let heroEntranceDone = false;

function setHeroReveal(state: "pending" | "animating" | "done") {
  document.documentElement.dataset.heroReveal = state;
}

function markHeroRevealed() {
  heroEntranceDone = true;
  setHeroReveal("done");
}

/**
 * Cycles the headline's accent word. Every word sits in the same grid cell, so the
 * line keeps the width of the longest one and nothing around it shifts.
 */
function RotatingOutcome() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || reduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const words = gsap.utils.toArray<HTMLElement>("[data-outcome]", root);
    let index = 0;

    const tick = () => {
      // Hold until the entrance has settled, and skip hidden tabs so the cycle never runs unseen.
      if (document.hidden || document.documentElement.dataset.heroReveal !== "done") return;

      const current = words[index];
      index = (index + 1) % words.length;
      const next = words[index];

      gsap
        .timeline()
        .to(current, { yPercent: -110, opacity: 0, duration: 0.45, ease: "power3.in" })
        .fromTo(
          next,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          0.3,
        );
    };

    const id = window.setInterval(tick, OUTCOME_INTERVAL_MS);
    return () => {
      window.clearInterval(id);
      gsap.killTweensOf(words);
      // Back to the first word, matching the reset index if the effect runs again.
      gsap.set(words, { clearProps: "all" });
    };
  }, [reduced]);

  return (
    <span ref={ref} aria-hidden="true" className="inline-grid text-accent">
      {outcomes.map((word, i) => (
        <span
          key={word}
          data-outcome
          className={cn("[grid-area:1/1] will-change-transform", i > 0 && "opacity-0")}
        >
          {word}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const lineEls = section.querySelectorAll<HTMLElement>("[data-hero-line]");
    const actions = section.querySelector<HTMLElement>("[data-hero-actions]");
    const proofRow = section.querySelector<HTMLElement>("[data-hero-proof]");
    const mapPanel = section.querySelector<HTMLElement>("[data-hero-map-panel]");
    const map = section.querySelector<HTMLElement>("[data-hero-map]");
    const graph = section.querySelector<HTMLElement>("[data-hero-graph]");
    const title = section.querySelector<HTMLElement>("[data-hero-title]");
    const targets = [...lineEls, actions, proofRow, mapPanel, graph].filter(Boolean);
    let removeIntroListener = () => {};
    let media: ReturnType<typeof gsap.matchMedia> | undefined;
    let alive = true;

    const settle = () => {
      gsap.killTweensOf(targets);
      markHeroRevealed();
      gsap.set(targets, { clearProps: "all" });
    };

    if (reduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      settle();
      return;
    }

    // Return visits already have the headline in the HTML. Hiding it until GSAP
    // runs made that line the LCP, seconds after first paint. The entrance still
    // plays on a first visit, while the site intro is covering the page.
    // SiteIntro flips a return visit from "seen" to "complete" before this effect
    // runs, so only an actual first visit ("fresh") should hide the lines.
    const playEntrance =
      !heroEntranceDone && document.documentElement.dataset.introState === "fresh";

    if (!playEntrance) {
      settle();
    }

    const context = gsap.context(() => {

      if (playEntrance) {
        // Drop the CSS hide before GSAP records transforms, or yPercent stacks
        // on top of the pending translate and the lines stay clipped.
        if (document.documentElement.dataset.heroReveal === "pending") {
          setHeroReveal("animating");
        }

        gsap.set(lineEls, {
          yPercent: 112,
          rotate: 1.25,
          transformOrigin: "left bottom",
        });
        gsap.set([actions, proofRow], { opacity: 0, y: 20 });
        gsap.set(mapPanel, { opacity: 0, y: 30, scale: 0.975 });
        gsap.set(graph, { opacity: 0, scale: 1.035 });

        const play = () => {
          if (!alive || heroEntranceDone) return;

          gsap
            .timeline({
              defaults: { ease: "power4.out" },
              onComplete: () => {
                if (alive) settle();
              },
            })
            .to(graph, { opacity: 1, scale: 1, duration: 1.6 })
            .to(lineEls, { yPercent: 0, rotate: 0, duration: 1.05, stagger: 0.1 }, 0.1)
            .to(actions, { opacity: 1, y: 0, duration: 0.82, ease: "power3.out" }, 0.58)
            .to(proofRow, { opacity: 1, y: 0, duration: 0.82, ease: "power3.out" }, 0.72)
            .to(
              mapPanel,
              { opacity: 1, y: 0, scale: 1, duration: 1.12, ease: "power3.out" },
              0.44,
            );
        };

        const onIntroComplete = () => play();
        const introState = document.documentElement.dataset.introState;

        if (introState === "fresh") {
          window.addEventListener(INTRO_COMPLETE_EVENT, onIntroComplete, { once: true });
          removeIntroListener = () =>
            window.removeEventListener(INTRO_COMPLETE_EVENT, onIntroComplete);
        } else {
          play();
        }
      }

      media = gsap.matchMedia();
      media.add("(min-width: 1024px)", () => {
        if (title) {
          gsap.to(title, {
            yPercent: -7,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        }

        if (map) {
          gsap.to(map, {
            yPercent: 9,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        }
      });
    }, section);

    return () => {
      alive = false;
      removeIntroListener();
      media?.revert();
      context.revert();
      if (heroEntranceDone) {
        settle();
      } else if (document.documentElement.dataset.heroReveal === "animating") {
        setHeroReveal("pending");
      }
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh items-center overflow-x-clip pb-16 pt-28 sm:pb-24 sm:pt-32"
    >
      <div
        data-hero-graph
        aria-hidden="true"
        className="graph-paper graph-field pointer-events-none absolute inset-0 -bottom-28 hidden lg:block"
      />

      {/* max-w-7xl px-6 is the shared page container, so content lines up with the header. */}
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        <div data-hero-title>
          <h1
            id="hero-title"
            className="font-display text-[clamp(3.25rem,10vw,7.5rem)] font-normal leading-[0.95] sm:leading-[0.88] tracking-tight"
          >
            {/* Screen readers and search get one stable sentence; the animated lines are visual only. */}
            <span className="sr-only">I take products from idea to launch, revenue, scale, and customers.</span>
            <span aria-hidden="true" className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
              <span data-hero-line className="block will-change-transform">
                I take products
              </span>
            </span>
            <span aria-hidden="true" className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
              <span data-hero-line className="block will-change-transform">
                from idea
              </span>
            </span>
            <span aria-hidden="true" className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
              <span data-hero-line className="block will-change-transform">
                to <RotatingOutcome />
              </span>
            </span>
          </h1>

          {/* Side by side at every width; stacked, the two pills sat at different widths on phones. */}
          <div
            data-hero-actions
            data-inline-cta
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <MagneticButton>
              <Button asChild size="lg">
                <Link href="/contact">Contact</Link>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button asChild size="lg" variant="outline">
                <Link href="/projects">View portfolio</Link>
              </Button>
            </MagneticButton>
          </div>

          <dl
            data-hero-proof
            className="mt-10 grid max-w-xl grid-cols-3 gap-x-4 border-t border-border/70 pt-6 sm:gap-x-8"
          >
            {proof.map((item) => (
              <div key={item.label} className="flex flex-col-reverse justify-end">
                <dt className="mt-1 text-xs text-muted-foreground">{item.label}</dt>
                <dd className="font-display text-3xl leading-none tabular-nums text-foreground">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div data-hero-map className="relative isolate lg:justify-self-end">
          <div
            aria-hidden="true"
            className="graph-paper graph-field-map lg:hidden"
          />
          <div data-hero-map-panel className="relative z-10 will-change-transform">
            <SystemsMap />
          </div>
        </div>
      </div>
    </section>
  );
}
