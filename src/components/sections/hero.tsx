"use client";

import { useLayoutEffect, useRef } from "react";
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

const lines = [
  { text: "take", className: "block" },
  { text: "the idea", className: "block" },
  { text: "to", className: "block" },
  { text: "customers", className: "block text-accent" },
] as const;

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
      className="relative isolate flex min-h-svh items-center overflow-x-clip px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-32"
    >
      <div
        data-hero-graph
        aria-hidden="true"
        className="graph-paper graph-field pointer-events-none absolute inset-0 -bottom-28 hidden lg:block"
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div data-hero-title>
          <h1
            id="hero-title"
            className="font-display text-[clamp(3.25rem,10vw,7.5rem)] font-normal leading-[0.88] tracking-tight"
          >
            {lines.map((line) => (
              <span
                key={line.text}
                className={cn("overflow-hidden pb-[0.08em] -mb-[0.08em]", line.className)}
              >
                {/* Trailing space keeps the heading's text "take the idea to customers" for
                    search and copy; it collapses at the end of each block line. */}
                <span data-hero-line className="block will-change-transform">
                  {line.text}{" "}
                </span>
              </span>
            ))}
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
