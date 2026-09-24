"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { revealStart } from "@/lib/reveal-visibility";

gsap.registerPlugin(ScrollTrigger, SplitText);

const ease = "power3.out";

// `scroll` is not in ScrollTrigger's published types, so type the optional getter here and
// keep the runtime check (it follows the smooth-scroll proxy when one is registered).
const scrollTrigger = ScrollTrigger as typeof ScrollTrigger & { scroll?: () => number };

function scrollY() {
  return typeof scrollTrigger.scroll === "function" ? scrollTrigger.scroll() : window.scrollY;
}

function playIfPast(
  trigger: ScrollTrigger,
  timeline: gsap.core.Timeline,
  extra?: () => void,
) {
  if (trigger.start <= scrollY() + 4 && !timeline.isActive() && timeline.progress() === 0) {
    extra?.();
    timeline.play();
  }
}

function splitTitle(title: HTMLElement, origin: "left bottom" | "right bottom") {
  let timeline: gsap.core.Timeline | null = null;
  let started = false;

  const split = SplitText.create(title, {
    type: "lines",
    mask: "lines",
    linesClass: "mobile-title-line",
    autoSplit: true,
    onSplit: (self) => {
      timeline = gsap
        .timeline({ paused: true, defaults: { ease } })
        .fromTo(
          self.lines,
          { yPercent: 112, rotate: origin === "right bottom" ? -0.7 : 0.7, transformOrigin: origin },
          { yPercent: 0, rotate: 0, duration: 0.72, stagger: 0.085 },
        );
      if (started) timeline.progress(1);
    },
  });

  return {
    play() {
      if (!started) {
        started = true;
        timeline?.play(0);
      }
    },
    kill() {
      timeline?.kill();
      split.revert();
    },
  };
}

function copyTimeline(nodes: NodeListOf<HTMLElement> | HTMLElement[]) {
  const items = Array.from(nodes);
  if (!items.length) return gsap.timeline({ paused: true });

  gsap.set(items, { opacity: 0, y: 14 });
  return gsap
    .timeline({ paused: true, defaults: { ease } })
    .to(items, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, 0.04);
}

function listTimeline(nodes: NodeListOf<HTMLElement> | HTMLElement[]) {
  const items = Array.from(nodes);
  if (!items.length) return null;

  gsap.set(items, { opacity: 0, y: 10 });
  return gsap
    .timeline({ paused: true, defaults: { ease } })
    .to(items, { opacity: 1, y: 0, duration: 0.45, stagger: 0.055 }, 0);
}

function deviceTimeline(visual: HTMLElement) {
  const device = visual.dataset.device ?? visual.dataset.visual ?? "stage";
  const shells = visual.querySelectorAll<HTMLElement>("[data-mobile-shell]");
  const toast = visual.querySelector<HTMLElement>("[data-mobile-toast]");
  const tl = gsap.timeline({ paused: true, defaults: { ease } });

  if (device === "sync" && shells.length) {
    const web = visual.querySelector<HTMLElement>('[data-mobile-shell="web"]');
    const android = visual.querySelector<HTMLElement>('[data-mobile-shell="android"]');
    const phone = visual.querySelector<HTMLElement>('[data-mobile-shell="phone"]');

    if (web) gsap.set(web, { opacity: 0, x: -36, y: 10, scale: 0.96 });
    if (android) gsap.set(android, { opacity: 0, x: 40, y: 8, scale: 0.96 });
    if (phone) gsap.set(phone, { opacity: 0, y: 36, scale: 0.9 });

    if (web) tl.to(web, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.7 }, 0);
    if (android) tl.to(android, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.7 }, 0.08);
    if (phone) tl.to(phone, { opacity: 1, y: 0, scale: 1, duration: 0.72 }, 0.12);
    return tl;
  }

  if (device === "tablet") {
    gsap.set(visual, { opacity: 0, x: -24 });
    tl.to(visual, { opacity: 1, x: 0, duration: 0.5 });
    return tl;
  }

  if (device === "phone") {
    gsap.set(visual, { opacity: 0, y: 22, scale: 0.94 });
    tl.to(visual, { opacity: 1, y: 0, scale: 1, duration: 0.5 });
    if (toast) {
      gsap.set(toast, { opacity: 0, y: 10 });
      tl.to(toast, { opacity: 1, y: 0, duration: 0.32 }, 0.22);
    }
    return tl;
  }

  if (device === "watch") {
    gsap.set(visual, { opacity: 0, y: 18, scale: 0.94 });
    tl.to(visual, { opacity: 1, y: 0, scale: 1, duration: 0.5 });
    return tl;
  }

  if (device === "car") {
    gsap.set(visual, { opacity: 0, x: -24 });
    tl.to(visual, { opacity: 1, x: 0, duration: 0.5 });
    return tl;
  }

  if (device === "stacks") {
    shells.forEach((shell, index) => {
      const from = index === 0 ? -32 : 32;
      gsap.set(shell, { opacity: 0, x: from, y: 16, rotate: index === 0 ? -4 : 4 });
      tl.to(
        shell,
        { opacity: 1, x: 0, y: 0, rotate: 0, duration: 0.8 },
        index * 0.12,
      );
    });
    return tl;
  }

  if (device === "hardware") {
    gsap.set(visual, { opacity: 0, y: 24, scale: 0.96 });
    tl.to(visual, { opacity: 1, y: 0, scale: 1, duration: 0.8 });
    return tl;
  }

  gsap.set(visual, { opacity: 0, y: 18 });
  tl.to(visual, { opacity: 1, y: 0, duration: 0.7 });
  return tl;
}

function bindBlock(
  title: HTMLElement | null,
  copyNodes: NodeListOf<HTMLElement>,
  visual: HTMLElement | null,
  listRoot: HTMLElement | null,
  origin: "left bottom" | "right bottom",
  triggers: Array<() => void>,
) {
  const splitHeading = Boolean(title?.classList.contains("service-band-title"));
  const heading = splitHeading && title ? splitTitle(title, origin) : null;
  const copyItems = [...copyNodes];
  if (title && !splitHeading) copyItems.unshift(title);
  const copyTl = copyTimeline(copyItems);
  const visualTl = visual ? deviceTimeline(visual) : null;
  const listItems = listRoot?.querySelectorAll<HTMLElement>("[data-mobile-item]") ?? [];
  const itemsTl = listItems.length ? listTimeline(listItems) : null;

  const copyTrigger = title ?? visual;
  if (copyTrigger) {
    const copySt = ScrollTrigger.create({
      trigger: copyTrigger,
      start: () => revealStart(copyTrigger.offsetHeight, window.innerHeight),
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        heading?.play();
        copyTl.play();
      },
    });
    const raf = requestAnimationFrame(() =>
      playIfPast(copySt, copyTl, () => heading?.play()),
    );
    triggers.push(
      () => cancelAnimationFrame(raf),
      () => copySt.kill(),
      () => heading?.kill(),
      () => copyTl.kill(),
    );
  }

  if (visual && visualTl) {
    const visualSt = ScrollTrigger.create({
      trigger: visual,
      start: () => revealStart(visual.offsetHeight, window.innerHeight),
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => visualTl.play(),
    });
    const raf = requestAnimationFrame(() => playIfPast(visualSt, visualTl));
    triggers.push(
      () => cancelAnimationFrame(raf),
      () => visualSt.kill(),
      () => visualTl.kill(),
    );
  }

  if (listRoot && itemsTl) {
    const listSt = ScrollTrigger.create({
      trigger: listRoot,
      start: () => revealStart(listRoot.offsetHeight, window.innerHeight),
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => itemsTl.play(),
    });
    const raf = requestAnimationFrame(() => playIfPast(listSt, itemsTl));
    triggers.push(
      () => cancelAnimationFrame(raf),
      () => listSt.kill(),
      () => itemsTl.kill(),
    );
  }
}

export function useMobileBodyMotion<T extends HTMLElement>() {
  const rootRef = useRef<T>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Pitch spots are placed with inline left/top and never animate; clearProps "all"
    // would wipe that placement and stack every spot in the pitch corner.
    const targets = root.querySelectorAll<HTMLElement>(
      "[data-mobile-title], [data-mobile-copy], [data-mobile-visual], [data-mobile-shell], [data-mobile-row], [data-mobile-toast], [data-mobile-item]",
    );
    const clear = () => gsap.set(targets, { clearProps: "all" });

    if (reduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      clear();
      return;
    }

    const triggers: Array<() => void> = [];

    const context = gsap.context(() => {
      root.querySelectorAll<HTMLElement>("[data-mobile-chapter]").forEach((chapter) => {
        const title = chapter.querySelector<HTMLElement>(
          ":scope > .service-band-head [data-mobile-title]",
        );
        const copy = chapter.querySelectorAll<HTMLElement>(
          ":scope > .service-band-head [data-mobile-copy]",
        );
        const visual = chapter.querySelector<HTMLElement>("[data-mobile-stage]");
        const list = chapter.querySelector<HTMLElement>(":scope > [data-mobile-list]");
        bindBlock(title, copy, visual, list, "left bottom", triggers);
      });

      root.querySelectorAll<HTMLElement>("[data-mobile-glass]").forEach((row) => {
        const title = row.querySelector<HTMLElement>("[data-mobile-title]");
        const copy = row.querySelectorAll<HTMLElement>("[data-mobile-copy]");
        const visual = row.querySelector<HTMLElement>("[data-mobile-visual]");
        const list = row.querySelector<HTMLElement>("ul");
        const reverse = row.classList.contains("is-reverse");
        bindBlock(title, copy, visual, list, reverse ? "right bottom" : "left bottom", triggers);
      });
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      context.revert();
      clear();
      triggers.forEach((kill) => kill());
    };
  }, [reduced]);

  return rootRef;
}
