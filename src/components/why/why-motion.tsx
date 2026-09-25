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
 * Hidden states are applied only after hydration, so the server HTML is always visible
 * (no-JS visitors see the finished page), and reduced-motion visitors get no motion.
 */

const EASE = "power3.out";

type Kind = "up" | "side" | "scale";

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
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: kind === "side" ? 0.75 : 0.65,
              ease: EASE,
              stagger: 0.1,
              clearProps: "transform",
            }),
        });
      });
    }, root);

    return () => {
      removeIntroListener();
      ctx.revert();
    };
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
