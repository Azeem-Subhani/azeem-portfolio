"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export const INTRO_COMPLETE_EVENT = "azeem:intro-complete";
export const INTRO_STORAGE_KEY = "azeem:intro-seen";

export function SiteIntro() {
  const shellRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    const root = document.documentElement;
    if (!shell) return;

    const finish = () => {
      root.dataset.introState = "complete";
      window.dispatchEvent(new Event(INTRO_COMPLETE_EVENT));
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (root.dataset.introState !== "fresh" || reduced) {
      finish();
      return;
    }

    try {
      window.sessionStorage.setItem(INTRO_STORAGE_KEY, "true");
    } catch {
      // Storage can be unavailable in strict privacy modes. The intro still runs.
    }

    const context = gsap.context(() => {
      const words = shell.querySelectorAll<HTMLElement>("[data-intro-word]");
      const meta = shell.querySelector<HTMLElement>("[data-intro-meta]");
      const rule = shell.querySelector<HTMLElement>("[data-intro-rule]");
      const content = shell.querySelector<HTMLElement>("[data-intro-content]");

      gsap.set(words, { yPercent: 115, rotate: 1.5, transformOrigin: "left bottom" });
      gsap.set(meta, { opacity: 0, y: 8 });
      gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });

      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          onComplete: finish,
        })
        .to(meta, { opacity: 1, y: 0, duration: 0.35 })
        .to(words, { yPercent: 0, rotate: 0, duration: 0.68, stagger: 0.08 }, 0.08)
        .to(rule, { scaleX: 1, duration: 0.72, ease: "power2.inOut" }, 0.18)
        .to(content, { opacity: 0, y: -18, duration: 0.34, ease: "power2.in" }, "+=0.12")
        .to(shell, { yPercent: -100, duration: 0.82, ease: "power4.inOut" }, "-=0.08")
        // Choreography is authored at 1x (~2.1s); played faster so first-time visitors reach
        // the page in ~1.2s instead of waiting on the name card.
        .timeScale(1.75);
    }, shell);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <div ref={shellRef} className="site-intro" aria-hidden="true">
      <div data-intro-content className="site-intro-content">
        <p data-intro-meta className="site-intro-meta">
          Product engineer
          <span>01 / 01</span>
        </p>
        <div className="site-intro-name font-display">
          <span className="overflow-hidden">
            <span data-intro-word className="block">
              Azeem
            </span>
          </span>
          <span className="overflow-hidden">
            <span data-intro-word className="block text-accent">
              Subhani
            </span>
          </span>
        </div>
        <span data-intro-rule className="site-intro-rule" />
      </div>
    </div>
  );
}
