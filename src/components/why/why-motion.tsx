"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { INTRO_COMPLETE_EVENT } from "@/components/motion/site-intro";

gsap.registerPlugin(ScrollTrigger);

/*
 * Scroll-in motion for the Why page, modeled on fivexlabs.com/why-us:
 *   data-why="hero"   fades up 24px on load (after the site intro on a fresh visit)
 *   data-why="up"     section heads and cards fade up; siblings in view together stagger
 *   data-why="side"   process steps slide in from alternating sides
 *   data-why="scale"  summary stats grow in from 80%
 *   data-why-count    numbers inside those elements count up from 0 as they enter,
 *                     matching the proof stats on the cloud service hero
 *   data-why-count-down  on a data-why-count figure where lower is better (timelines):
 *                     it counts down from a larger value instead, so it reads as shrinking;
 *                     data-why-count-from sets that value (e.g. "8–12 weeks")
 * Hidden states are applied only after hydration, so the server HTML is always visible
 * (no-JS visitors see the finished page), and reduced-motion visitors get no motion.
 */

const EASE = "power3.out";

type Kind = "up" | "side" | "scale";

const REVEAL_SELECTOR = '[data-why="up"], [data-why="side"], [data-why="scale"]';
const NUMBER = /\d+(?:\.\d+)?/g;
// Where a count-down starts when it has no explicit start, as a multiple of the final figure:
// "1–2 weeks" opens on "3–6 weeks".
const COUNT_DOWN_FROM = 3;

/**
 * Returns a formatter that rebuilds a figure with every number scaled by progress (0..1),
 * so ranges like "3–4 weeks" count both ends and decimals like "99.95%" keep their places.
 * By default numbers rise from 0. With countDown, for figures where a smaller number is the
 * better outcome, they fall to the target from the matching numbers in `from` ("8–12 weeks"
 * into "3–4 weeks"), or from COUNT_DOWN_FROM times the target when `from` is missing or has
 * a different count of numbers.
 */
export function parseCount(value: string, countDown = false, from?: string) {
  const targets = value.match(NUMBER) ?? [];
  if (!targets.length) return null;
  const starts = from?.match(NUMBER)?.map(Number) ?? [];
  const numbers = targets.map((n, i) => {
    const target = Number(n);
    let start = 0;
    if (countDown) start = starts.length === targets.length ? starts[i] : target * COUNT_DOWN_FROM;
    return { start, target, decimals: n.split(".")[1]?.length ?? 0 };
  });
  const parts = value.split(NUMBER);
  return (progress: number) =>
    parts
      .map((part, i) => {
        const n = numbers[i];
        if (!n) return part;
        return part + (n.start + (n.target - n.start) * progress).toFixed(n.decimals);
      })
      .join("");
}

function fromVars(kind: Kind, el: HTMLElement, index: number): gsap.TweenVars {
  if (kind === "side") return { opacity: 0, x: index % 2 === 0 ? -50 : 50 };
  if (kind === "scale") return { opacity: 0, scale: 0.8 };
  // Cards travel a little further than headings, as on the reference.
  return { opacity: 0, y: el.dataset.whyDistance ? Number(el.dataset.whyDistance) : 30 };
}

export function WhyMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let removeIntroListener = () => {};
    const ctx = gsap.context(() => {
      const hero = root.querySelectorAll<HTMLElement>('[data-why="hero"]');
      gsap.set(hero, { opacity: 0, y: 24 });
      const playHero = () =>
        gsap.to(hero, { opacity: 1, y: 0, duration: 0.8, ease: EASE, stagger: 0.12 });

      if (document.documentElement.dataset.introState === "fresh") {
        window.addEventListener(INTRO_COMPLETE_EVENT, playHero, { once: true });
        removeIntroListener = () => window.removeEventListener(INTRO_COMPLETE_EVENT, playHero);
      } else {
        playHero();
      }

      // Reset every counting figure that a reveal will play to its start (0, or the higher
      // opening value for a count-down); figures outside a reveal stay final.
      const counters = new Map<HTMLElement, (progress: number) => string>();
      root.querySelectorAll<HTMLElement>("[data-why-count]").forEach((el) => {
        const format = parseCount(
          el.dataset.whyCount ?? "",
          "whyCountDown" in el.dataset,
          el.dataset.whyCountFrom,
        );
        if (!format || !el.closest(REVEAL_SELECTOR)) return;
        counters.set(el, format);
        el.textContent = format(0);
      });

      // Same timing as the cloud hero: 1.6s power3.out, each card 0.1s after the last.
      const countUp = (owner: Element, index: number) => {
        owner.querySelectorAll<HTMLElement>("[data-why-count]").forEach((el) => {
          const format = counters.get(el);
          // Only the nearest reveal plays a figure, so nested reveals do not double-count.
          if (!format || el.closest(REVEAL_SELECTOR) !== owner) return;
          const state = { progress: 0 };
          gsap.to(state, {
            progress: 1,
            duration: 1.6,
            ease: EASE,
            delay: 0.1 + index * 0.1,
            onUpdate: () => {
              el.textContent = format(state.progress);
            },
            onComplete: () => {
              el.textContent = el.dataset.whyCount ?? "";
            },
          });
        });
      };

      (["up", "side", "scale"] as const).forEach((kind) => {
        const targets = Array.from(
          root.querySelectorAll<HTMLElement>(`[data-why="${kind}"]`),
        );
        targets.forEach((el, index) => gsap.set(el, fromVars(kind, el, index)));
        // batch() groups elements that enter together (a row of cards) so they stagger
        // instead of popping in at once.
        ScrollTrigger.batch(targets, {
          start: "top 88%",
          once: true,
          onEnter: (batch) => {
            batch.forEach(countUp);
            gsap.to(batch, {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: kind === "side" ? 0.75 : 0.65,
              ease: EASE,
              stagger: 0.1,
              clearProps: "transform",
            });
          },
        });
      });
    }, root);

    return () => {
      removeIntroListener();
      ctx.revert();
      // revert() undoes tweens but not text written by onUpdate, so put the real figures back.
      root.querySelectorAll<HTMLElement>("[data-why-count]").forEach((el) => {
        if (el.dataset.whyCount) el.textContent = el.dataset.whyCount;
      });
    };
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
