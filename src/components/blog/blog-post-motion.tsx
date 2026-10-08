"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { INTRO_COMPLETE_EVENT } from "@/components/motion/site-intro";
import { afterRouteScroll, revealStart } from "@/lib/reveal-visibility";

gsap.registerPlugin(ScrollTrigger);

const EASE = "power3.out";

function prepareBlogMotion() {
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.dataset.blogMotion = "pending";
  }
}

function activateBlogMotion() {
  const root = document.documentElement;
  if (root.dataset.blogMotion === "pending") root.dataset.blogMotion = "active";
}

function scrollY() {
  return window.scrollY;
}

// Plays once the block is actually on screen, and waits out the first-visit intro
// so nothing finishes underneath the name card.
function playWhenVisible(trigger: HTMLElement, play: () => void) {
  let played = false;
  const run = () => {
    if (played) return;
    played = true;
    play();
  };

  let queued = false;
  const gate = () => {
    if (document.documentElement.dataset.introState !== "fresh") {
      run();
      return;
    }
    if (queued) return;
    queued = true;
    window.addEventListener(INTRO_COMPLETE_EVENT, run, { once: true });
  };

  const rect = trigger.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    gate();
    return () => window.removeEventListener(INTRO_COMPLETE_EVENT, run);
  }

  const st = ScrollTrigger.create({
    trigger,
    start: () => revealStart(trigger.offsetHeight, window.innerHeight),
    once: true,
    invalidateOnRefresh: true,
    onEnter: gate,
  });

  const raf = requestAnimationFrame(() => {
    if (st.start <= scrollY() + 4) gate();
  });

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener(INTRO_COMPLETE_EVENT, run);
    st.kill();
  };
}

export function BlogPostMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    prepareBlogMotion();
    return afterRouteScroll(() => {
      const root = rootRef.current;
      if (!root) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const stops: Array<() => void> = [];

      const ctx = gsap.context(() => {
        root.querySelectorAll<HTMLElement>(".blog-prose figure").forEach((figure) => {
          gsap.set(figure, { opacity: 0, y: 28 });
          stops.push(
            playWhenVisible(figure, () => {
              gsap.to(figure, {
                opacity: 1,
                y: 0,
                duration: 0.75,
                ease: EASE,
                clearProps: "opacity,transform",
              });
            }),
          );
        });

        root.querySelectorAll<HTMLElement>("[data-blog-reveal]").forEach((section) => {
          const title = section.querySelector<HTMLElement>("[data-blog-reveal-title]");
          const items = [...section.querySelectorAll<HTMLElement>("[data-blog-reveal-item]")];
          gsap.set(title ?? [], { opacity: 0, y: 16 });
          gsap.set(items, { opacity: 0, y: 28 });
          if (!title && !items.length) gsap.set(section, { opacity: 0, y: 24 });

          const timeline = gsap.timeline({ paused: true, defaults: { ease: EASE } });
          if (title) {
            timeline.to(title, { opacity: 1, y: 0, duration: 0.55, clearProps: "opacity,transform" }, 0);
          }
          if (items.length) {
            timeline.to(
              items,
              { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, clearProps: "opacity,transform" },
              title ? 0.12 : 0,
            );
          }
          if (!title && !items.length) {
            timeline.to(section, { opacity: 1, y: 0, duration: 0.65, clearProps: "opacity,transform" }, 0);
          }

          stops.push(playWhenVisible(section, () => timeline.play()));
        });
      }, root);

      activateBlogMotion();

      return () => {
        stops.forEach((stop) => stop());
        ctx.revert();
      };
    });
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
