"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { INTRO_COMPLETE_EVENT } from "@/components/motion/site-intro";
import { afterRouteScroll, revealStart } from "@/lib/reveal-visibility";
import { activateBlogMotion, prepareBlogMotion, takeBlogMotionFallback } from "@/components/blog/blog-motion-flag";

gsap.registerPlugin(ScrollTrigger);

const EASE = "power3.out";

type Sets = {
  armed: Set<string>;
  shown: Set<string>;
};

function heroLeadSeconds() {
  const word = document.querySelector(".blog-hero-title .service-hero-word");
  if (!word) return 0;
  const rising = word.getAnimations().find((entry) => {
    return "animationName" in entry && entry.animationName === "blog-word-rise";
  });
  if (!rising || rising.playState === "finished") return 0;
  return 0.42;
}

function armCards(root: HTMLElement, opening: boolean, sets: Sets) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  const cards = [...root.querySelectorAll<HTMLElement>("[data-blog-card]")];
  const present = new Set(cards.map((card) => card.dataset.slug ?? ""));

  ScrollTrigger.getAll().forEach((trigger) => {
    const el = trigger.trigger;
    if (el instanceof HTMLElement && el.hasAttribute("data-blog-card") && !el.isConnected) {
      trigger.kill();
    }
  });

  for (const slug of [...sets.armed]) {
    if (!present.has(slug) && !sets.shown.has(slug)) sets.armed.delete(slug);
  }

  const fresh = cards.filter((card) => {
    const slug = card.dataset.slug ?? "";
    return slug.length > 0 && !sets.armed.has(slug);
  });
  if (!fresh.length) return () => {};

  const slugs = fresh.map((card) => card.dataset.slug ?? "");
  slugs.forEach((slug) => sets.armed.add(slug));

  let committed = false;
  let lastEnter = 0;
  let group = 0;
  const lead = opening ? heroLeadSeconds() : 0;
  const kills: Array<() => void> = [];

  const ctx = gsap.context(() => {
    gsap.set(fresh, { opacity: 0, y: opening ? 36 : 18 });

    fresh.forEach((card) => {
      const slug = card.dataset.slug ?? "";
      const play = () => {
        if (sets.shown.has(slug)) return;
        sets.shown.add(slug);
        const now = performance.now();
        group = now - lastEnter < 70 ? group + 1 : 0;
        lastEnter = now;
        const inFirstScreen = card.getBoundingClientRect().top < window.innerHeight;
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: opening ? 0.72 : 0.48,
          delay: (opening && inFirstScreen ? lead : 0) + Math.min(group, 4) * 0.08,
          ease: EASE,
          clearProps: "opacity,transform",
        });
      };

      let queued = false;
      const gate = () => {
        if (document.documentElement.dataset.introState !== "fresh") {
          play();
          return;
        }
        if (queued) return;
        queued = true;
        window.addEventListener(INTRO_COMPLETE_EVENT, play, { once: true });
      };

      const rect = card.getBoundingClientRect();
      const onScreen = rect.top < window.innerHeight && rect.bottom > 0;
      // Already in view: rise with the hero. Waiting for revealStart here leaves a blank card.
      if (onScreen) {
        gate();
        kills.push(() => window.removeEventListener(INTRO_COMPLETE_EVENT, play));
        return;
      }

      const st = ScrollTrigger.create({
        trigger: card,
        start: () => revealStart(card.offsetHeight, window.innerHeight),
        once: true,
        invalidateOnRefresh: true,
        onEnter: gate,
      });

      const raf = requestAnimationFrame(() => {
        if (st.start <= window.scrollY + 4) gate();
      });

      kills.push(() => {
        cancelAnimationFrame(raf);
        window.removeEventListener(INTRO_COMPLETE_EVENT, play);
        st.kill();
      });
    });
  }, root);

  // Strict mode runs the effect twice before paint. Commit on the next frame so
  // the discarded run can undo its slugs, and the run that survives keeps them.
  const commit = requestAnimationFrame(() => {
    committed = true;
  });

  return () => {
    cancelAnimationFrame(commit);
    if (!committed) {
      kills.forEach((kill) => kill());
      ctx.revert();
      slugs.forEach((slug) => {
        sets.armed.delete(slug);
        sets.shown.delete(slug);
      });
      return;
    }

    fresh.forEach((card, index) => {
      if (card.isConnected) return;
      kills[index]?.();
      if (!sets.shown.has(slugs[index] ?? "")) sets.armed.delete(slugs[index] ?? "");
    });
  };
}

export function useBlogCardReveal(rootRef: RefObject<HTMLElement | null>, signature: string) {
  const sets = useRef<Sets>({ armed: new Set(), shown: new Set() });
  const opened = useRef(false);

  useLayoutEffect(() => {
    prepareBlogMotion();
    return afterRouteScroll(() => {
      const root = rootRef.current;
      if (!root) return;
      // The timer already released this page. Leave `opened` unset so filters stay static too.
      if (takeBlogMotionFallback()) return;
      opened.current = true;
      const cleanup = armCards(root, true, sets.current);
      activateBlogMotion();
      return cleanup;
    });
  }, [rootRef]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    // The opening pass owns the first list. Later signature changes are filters.
    if (!root || !opened.current) return;
    return armCards(root, false, sets.current);
  }, [rootRef, signature]);

  useLayoutEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        const el = trigger.trigger;
        if (el instanceof HTMLElement && el.hasAttribute("data-blog-card")) trigger.kill();
      });
    };
  }, []);
}
