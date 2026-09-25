"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { INTRO_COMPLETE_EVENT } from "@/components/motion/site-intro";
import { parseCount } from "@/components/why/why-motion";
import { revealStart } from "@/lib/reveal-visibility";

gsap.registerPlugin(ScrollTrigger);

/*
 * Choreography for industry pages. Each section reads in order (ANIMATION.md):
 * heading, then body, then the supporting bits, instead of one generic fade.
 *
 *   data-im="hero-line"    hero headline lines rise out of a mask on load
 *   data-im="underline"    SVG path under the accent line draws after the lines land
 *   data-im="hero-fade"    kicker, lede, actions, scroll cue fade up in order
 *   data-im="hero-visual"  the live ledger panel settles in beside the copy
 *   data-im-head           section head: kicker slides, [data-im-word]s rise, [data-im-intro] follows
 *   data-im-card           card clips open; its [data-im-icon], [data-im-check], [data-im-tag] follow
 *   data-im-proof          figure band: [data-im-rule]s draw, [data-im-stat]s rise, numbers count up
 *   data-im-rail           solutions rail whose [data-im-rail-fill] tracks scroll
 *   data-im-scan-zone      a single scan sweep passes over the security grid
 *
 * Hidden states are applied only after hydration, so the server HTML is the finished
 * page, and reduced-motion visitors get no motion at all.
 */

const EASE = "power4.out";
/** Cards wait this long after their section heading starts, so the heading leads. */
const CARD_AFTER_HEAD = 0.46;

export function IndustryMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const q = (selector: string, scope: ParentNode = root) =>
      Array.from(scope.querySelectorAll<HTMLElement>(selector));
    const rafs: number[] = [];
    let removeIntroListener = () => {};

    const ctx = gsap.context(() => {
      /** Plays once when enough of `trigger` is on screen, including deep links that land past it. */
      const onceVisible = (trigger: HTMLElement, play: () => void) => {
        let played = false;
        const run = () => {
          if (played) return;
          played = true;
          play();
        };
        const st = ScrollTrigger.create({
          trigger,
          start: () => revealStart(trigger.offsetHeight, window.innerHeight),
          once: true,
          invalidateOnRefresh: true,
          onEnter: run,
        });
        rafs.push(
          requestAnimationFrame(() => {
            if (st.start <= window.scrollY + 4) run();
          }),
        );
      };

      // ---- Hero: one orchestrated entrance -------------------------------------------
      const heroLines = q('[data-im="hero-line"]');
      const heroFade = q('[data-im="hero-fade"]');
      const underline = q('[data-im="underline"]');
      const heroVisual = q('[data-im="hero-visual"]');

      gsap.set(heroLines, { yPercent: 110, rotate: 1.5, transformOrigin: "left bottom" });
      gsap.set(heroFade, { opacity: 0, y: 22 });
      gsap.set(underline, { strokeDashoffset: 1 });
      gsap.set(heroVisual, { opacity: 0, y: 36, scale: 0.96, rotateX: 8, transformPerspective: 900 });

      const hero = gsap
        .timeline({ paused: true, defaults: { ease: EASE } })
        .to(heroFade.slice(0, 1), { opacity: 1, y: 0, duration: 0.6 }, 0)
        .to(heroLines, { yPercent: 0, rotate: 0, duration: 1.05, stagger: 0.13 }, 0.08)
        .to(heroFade.slice(1), { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 0.5)
        .to(underline, { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" }, 0.85)
        .to(heroVisual, { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 1.2, clearProps: "transform" }, 0.45);

      if (document.documentElement.dataset.introState === "fresh") {
        const play = () => hero.play();
        window.addEventListener(INTRO_COMPLETE_EVENT, play, { once: true });
        removeIntroListener = () => window.removeEventListener(INTRO_COMPLETE_EVENT, play);
      } else {
        hero.play();
      }

      // ---- Count-up figures -----------------------------------------------------------
      const counters = new Map<HTMLElement, (progress: number) => string>();
      q("[data-im-proof] [data-why-count]").forEach((el) => {
        const format = parseCount(
          el.dataset.whyCount ?? "",
          "whyCountDown" in el.dataset,
          el.dataset.whyCountFrom,
        );
        if (!format) return;
        counters.set(el, format);
        el.textContent = format(0);
      });
      const countUp = (scope: ParentNode, delay: number) => {
        q("[data-why-count]", scope).forEach((el, index) => {
          const format = counters.get(el);
          if (!format) return;
          const state = { progress: 0 };
          gsap.to(state, {
            progress: 1,
            duration: 1.6,
            ease: "power3.out",
            delay: delay + index * 0.1,
            onUpdate: () => {
              el.textContent = format(state.progress);
            },
            onComplete: () => {
              el.textContent = el.dataset.whyCount ?? "";
            },
          });
        });
      };

      // ---- Proof band: rules draw, figures rise and count -----------------------------
      q("[data-im-proof]").forEach((band) => {
        const rules = q("[data-im-rule]", band);
        const stats = q("[data-im-stat]", band);
        gsap.set(rules, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(stats, { opacity: 0, y: 24 });
        const tl = gsap
          .timeline({ paused: true, defaults: { ease: EASE } })
          .to(rules, { scaleX: 1, duration: 1.1, stagger: 0.15, ease: "power3.inOut" }, 0)
          .to(stats, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 0.25);
        onceVisible(band, () => {
          tl.play();
          countUp(band, 0.25);
        });
      });

      // ---- Section heads: kicker, words, intro ----------------------------------------
      const heads = new Map<Element, gsap.core.Timeline>();
      q("[data-im-head]").forEach((head) => {
        const kicker = q("[data-im-kicker]", head);
        const words = q("[data-im-word]", head);
        const intro = q("[data-im-intro]", head);
        gsap.set(kicker, { opacity: 0, x: -14 });
        gsap.set(words, { yPercent: 115, rotate: 2, transformOrigin: "left bottom" });
        gsap.set(intro, { opacity: 0, y: 18 });
        const tl = gsap
          .timeline({ paused: true, defaults: { ease: EASE } })
          .to(kicker, { opacity: 1, x: 0, duration: 0.55 }, 0)
          .to(words, { yPercent: 0, rotate: 0, duration: 0.85, stagger: 0.045 }, 0.08)
          .to(intro, { opacity: 1, y: 0, duration: 0.65, stagger: 0.1 }, 0.45);
        // Cards wait on the section's first head (its title), not a later note in the section.
        const section = head.closest("[data-im-section]");
        if (section && !heads.has(section)) heads.set(section, tl);
        onceVisible(head, () => tl.play());
      });

      // ---- Cards: clip open, then their icon, checks, and tags ------------------------
      let lastEnter = 0;
      let groupIndex = 0;
      q("[data-im-card]").forEach((card) => {
        const icons = q("[data-im-icon]", card);
        const checks = q("[data-im-check]", card);
        const tags = q("[data-im-tag]", card);
        const after = q("[data-im-after]", card);
        gsap.set(card, { opacity: 0, y: 44, clipPath: "inset(14% 0% 0% 0% round 1rem)" });
        gsap.set(icons, { opacity: 0, scale: 0.55, rotate: -24 });
        gsap.set(checks, { opacity: 0, x: -10 });
        gsap.set(tags, { opacity: 0, y: 10, scale: 0.9 });
        gsap.set(after, { opacity: 0, x: -8 });

        const tl = gsap
          .timeline({ paused: true, defaults: { ease: EASE } })
          .to(card, {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0% round 1rem)",
            duration: 0.85,
            // The clip would cut off the hover lift and glow, so drop it once open.
            clearProps: "clipPath,transform",
          })
          .to(icons, { opacity: 1, scale: 1, rotate: 0, duration: 0.7, ease: "back.out(2.2)" }, 0.28)
          .to(checks, { opacity: 1, x: 0, duration: 0.45, stagger: 0.05 }, 0.4)
          .to(tags, { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.035 }, 0.36)
          .to(after, { opacity: 1, x: 0, duration: 0.5 }, 0.62);

        onceVisible(card, () => {
          // Cards that enter in the same frame (a row) stagger instead of popping together.
          const now = performance.now();
          groupIndex = now - lastEnter < 60 ? groupIndex + 1 : 0;
          lastEnter = now;
          const headTl = heads.get(card.closest("[data-im-section]") ?? root);
          const waitForHead =
            headTl && headTl.isActive() ? Math.max(0, CARD_AFTER_HEAD - headTl.time()) : 0;
          tl.delay(waitForHead + groupIndex * 0.1).play();
        });
      });

      // ---- Solutions rail: progress follows the scroll --------------------------------
      q("[data-im-rail]").forEach((rail) => {
        const fill = q("[data-im-rail-fill]", rail);
        const list = rail.parentElement ?? rail;
        gsap.fromTo(
          fill,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: list, start: "top 70%", end: "bottom 55%", scrub: 0.6 },
          },
        );
      });

      // ---- Security grid: one scan sweep ----------------------------------------------
      q("[data-im-scan-zone]").forEach((zone) => {
        const bar = q("[data-im-scan]", zone);
        const tl = gsap
          .timeline({ paused: true })
          .set(bar, { y: 0, opacity: 0 })
          .to(bar, { opacity: 1, duration: 0.25 }, 0.55)
          .to(bar, { y: () => zone.offsetHeight, duration: 1.7, ease: "power1.inOut" }, 0.55)
          .to(bar, { opacity: 0, duration: 0.35 }, ">-0.3");
        onceVisible(zone, () => tl.play());
      });
    }, root);

    // Fonts change line heights, which moves every trigger.
    const refresh = () => ScrollTrigger.refresh();
    void document.fonts?.ready.then(refresh);

    return () => {
      rafs.forEach(cancelAnimationFrame);
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
