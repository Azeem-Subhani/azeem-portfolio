"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

import { INTRO_COMPLETE_EVENT } from "@/components/motion/site-intro";

const titleLines = [
  "Work that has",
  "to hold up",
  "in the real world.",
] as const;

export function ProjectsIntro() {
  const introRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const intro = introRef.current;
    if (!intro) return;

    const kicker = intro.querySelector<HTMLElement>("[data-projects-kicker]");
    const lines = intro.querySelectorAll<HTMLElement>("[data-projects-line]");
    const copy = intro.querySelector<HTMLElement>("[data-projects-copy]");
    const proof = intro.querySelectorAll<HTMLElement>("[data-projects-proof]");
    const backdrop = intro.parentElement?.querySelector<HTMLElement>(
      ".projects-grid-backdrop",
    );
    const kickerTarget = kicker ? [kicker] : [];
    const copyTarget = copy ? [copy] : [];
    const backdropTarget = backdrop ? [backdrop] : [];
    const targets = [...kickerTarget, ...lines, ...copyTarget, ...proof, ...backdropTarget];
    let removeIntroListener = () => {};
    let alive = true;

    const settle = () => {
      gsap.killTweensOf(targets);
      gsap.set(targets, { clearProps: "all" });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      settle();
      return;
    }

    const play = () => {
      if (!alive) return;

      gsap
        .timeline({
          defaults: { ease: "power4.out" },
          onComplete: settle,
        })
        .to(backdropTarget, { opacity: 1, scale: 1, duration: 1.15 }, 0)
        .to(kickerTarget, { opacity: 1, y: 0, duration: 0.55 }, 0.08)
        .to(
          lines,
          { yPercent: 0, rotate: 0, duration: 0.95, stagger: 0.1 },
          0.12,
        )
        .to(copyTarget, { opacity: 1, y: 0, duration: 0.75 }, 0.52)
        .to(proof, { opacity: 1, y: 0, duration: 0.62, stagger: 0.08 }, 0.62);
    };

    gsap.set(lines, {
      yPercent: 112,
      rotate: 1.25,
      transformOrigin: "left bottom",
    });
    gsap.set(kickerTarget, { opacity: 0, y: 12 });
    gsap.set(copyTarget, { opacity: 0, y: 22 });
    gsap.set(proof, { opacity: 0, y: 18 });
    gsap.set(backdropTarget, { opacity: 0.35, scale: 1.035, transformOrigin: "top center" });

    if (document.documentElement.dataset.introState === "fresh") {
      window.addEventListener(INTRO_COMPLETE_EVENT, play, { once: true });
      removeIntroListener = () =>
        window.removeEventListener(INTRO_COMPLETE_EVENT, play);
    } else {
      play();
    }

    return () => {
      alive = false;
      removeIntroListener();
      settle();
    };
  }, []);

  return (
    <header ref={introRef} className="projects-intro">
      <div>
        <p data-projects-kicker className="projects-kicker">
          Portfolio / selected systems
        </p>
        <h1 className="projects-title text-balance">
          {titleLines.map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
              {/* Trailing space keeps the heading's text readable for search and copy. */}
              <span data-projects-line className="block will-change-transform">
                {line}{" "}
              </span>
            </span>
          ))}
        </h1>
      </div>
      <div data-projects-copy className="projects-intro-copy">
        <p>
          Booking platforms, payment portals, live systems, and AI
          features, designed to stay useful when the stakes are high.
        </p>
        <p className="projects-note">
          Some client work is anonymized. The systems, decisions, and
          outcomes are still here.
        </p>
      </div>
    </header>
  );
}
