"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  copyTimeline,
  listTimeline,
  splitTitle,
  type Playable,
} from "@/components/services/service-text-reveal";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { afterRouteScroll } from "@/lib/reveal-visibility";

gsap.registerPlugin(ScrollTrigger);

const ease = "power3.out";

/**
 * Cloud chapters start revealing as soon as their top edge clears the bottom of
 * the viewport. The shared revealStart() waits for up to a third of the screen,
 * which leaves empty bands on phones when visitors scroll at a normal pace.
 */
const CLOUD_REVEAL_START = "top 92%";

function scrollY() {
  return window.scrollY;
}

function playIfPast(trigger: ScrollTrigger, play: () => void) {
  if (trigger.start <= scrollY() + 4) play();
}

function kickerTimeline(kicker: HTMLElement) {
  const rule = kicker.querySelector<HTMLElement>(".cloud-chapter-rule");
  const bits = kicker.querySelectorAll<HTMLElement>(
    ".cloud-chapter-index, .cloud-chapter-kicker > span:last-child",
  );

  const tl = gsap
    .timeline({ paused: true, defaults: { ease } })
    .from(kicker, { opacity: 0, y: 10, duration: 0.45 });

  if (bits.length) {
    tl.from(bits, { opacity: 0, y: 8, duration: 0.4, stagger: 0.07 }, 0.05);
  }
  if (rule) {
    tl.from(
      rule,
      { scaleX: 0, transformOrigin: "left center", duration: 0.55 },
      0.08,
    );
  }

  return tl;
}

function stageTimeline(visual: HTMLElement) {
  const device = visual.dataset.device ?? "stage";
  const tl = gsap.timeline({ paused: true, defaults: { ease } });

  if (device === "stack") {
    const panes = visual.querySelectorAll<HTMLElement>("[data-cloud-shell]");
    if (panes.length) {
      tl.from(panes, { opacity: 0, y: 18, duration: 0.65, stagger: 0.1 }, 0);
    }
    return tl;
  }

  if (device === "ship") {
    const cloud = visual.querySelector<HTMLElement>('[data-cloud-shell="cloud"]');
    const nodes = visual.querySelectorAll<HTMLElement>("[data-cloud-node]");
    if (cloud) tl.from(cloud, { opacity: 0, y: 12, scale: 0.96, duration: 0.62 }, 0);
    if (nodes.length) {
      tl.from(nodes, { opacity: 0, y: 14, duration: 0.45, stagger: 0.07 }, 0.14);
    }
    return tl;
  }

  if (device === "code") {
    const consolePane = visual.querySelector<HTMLElement>('[data-cloud-shell="console"]');
    const repo = visual.querySelector<HTMLElement>('[data-cloud-shell="repo"]');
    if (consolePane) tl.from(consolePane, { opacity: 0, x: -24, duration: 0.7 }, 0);
    if (repo) tl.from(repo, { opacity: 0, x: 24, duration: 0.7 }, 0.08);
    return tl;
  }

  if (device === "burst") {
    const panels = visual.querySelectorAll<HTMLElement>("[data-cloud-panel]");
    const bars = visual.querySelectorAll<HTMLElement>(".cloud-burst-bars li");
    if (panels.length) {
      tl.from(panels, { opacity: 0, y: 16, duration: 0.55, stagger: 0.08 }, 0);
    }
    if (bars.length) {
      tl.from(
        bars,
        { scaleY: 0, transformOrigin: "bottom center", duration: 0.7, stagger: 0.012 },
        0.18,
      );
    }
    return tl;
  }

  const shells = visual.querySelectorAll<HTMLElement>("[data-cloud-shell]");
  if (shells.length) {
    tl.from(shells, { opacity: 0, y: 16, duration: 0.55, stagger: 0.08 }, 0);
    return tl;
  }

  tl.from(visual, { opacity: 0, y: 18, duration: 0.7 });
  return tl;
}

type ListPlayable = Playable | gsap.core.Timeline | null;

function playList(target: ListPlayable) {
  if (!target) return;
  if ("play" in target && typeof target.play === "function") target.play();
}

function killList(target: ListPlayable) {
  if (!target) return;
  if ("kill" in target && typeof target.kill === "function") target.kill();
}

function bindBlock(
  kicker: HTMLElement | null,
  title: HTMLElement | null,
  copyNodes: NodeListOf<HTMLElement>,
  visual: HTMLElement | null,
  listRoot: HTMLElement | null,
  triggers: Array<() => void>,
) {
  const splitHeading = Boolean(title?.classList.contains("service-band-title"));
  const heading = splitHeading && title ? splitTitle(title, "left bottom", "cloud") : null;
  const copyItems = [...copyNodes];
  if (title && !splitHeading) copyItems.unshift(title);
  const copyTl = copyTimeline(copyItems, "cloud");
  const kickerTl = kicker ? kickerTimeline(kicker) : null;
  const visualTl = visual ? stageTimeline(visual) : null;

  const cards = listRoot?.querySelectorAll<HTMLElement>("[data-cloud-card]") ?? [];
  const cardsTl = cards.length ? listTimeline([...cards]) : null;

  const revealCopy = () => {
    kickerTl?.play();
    heading?.play();
    copyTl.play();
  };

  const copyTrigger = kicker ?? title ?? visual;
  if (copyTrigger) {
    const copySt = ScrollTrigger.create({
      trigger: copyTrigger,
      start: CLOUD_REVEAL_START,
      once: true,
      invalidateOnRefresh: true,
      onEnter: revealCopy,
    });
    const raf = requestAnimationFrame(() => playIfPast(copySt, revealCopy));
    triggers.push(
      () => cancelAnimationFrame(raf),
      () => copySt.kill(),
      () => kickerTl?.kill(),
      () => heading?.kill(),
      () => copyTl.kill(),
    );
  }

  if (visual && visualTl) {
    const visualSt = ScrollTrigger.create({
      trigger: visual,
      start: CLOUD_REVEAL_START,
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => visualTl.play(),
    });
    const raf = requestAnimationFrame(() => playIfPast(visualSt, () => visualTl.play()));
    triggers.push(
      () => cancelAnimationFrame(raf),
      () => visualSt.kill(),
      () => visualTl.kill(),
    );
  }

  if (listRoot && cardsTl) {
    const listSt = ScrollTrigger.create({
      trigger: listRoot,
      start: CLOUD_REVEAL_START,
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => playList(cardsTl),
    });
    const raf = requestAnimationFrame(() => playIfPast(listSt, () => playList(cardsTl)));
    triggers.push(
      () => cancelAnimationFrame(raf),
      () => listSt.kill(),
      () => killList(cardsTl),
    );
  }
}

export function useCloudBodyMotion<T extends HTMLElement>() {
  const rootRef = useRef<T>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => afterRouteScroll(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>(
      "[data-cloud-kicker], [data-cloud-title], [data-cloud-copy], [data-cloud-panel], [data-cloud-shell], [data-cloud-span], [data-cloud-node], [data-cloud-card], [data-cloud-item-title]",
    );
    const clear = () => {
      gsap.set(targets, { clearProps: "all" });
    };

    if (reduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      clear();
      return;
    }

    const triggers: Array<() => void> = [];

    const context = gsap.context(() => {
      root.querySelectorAll<HTMLElement>("[data-cloud-chapter]").forEach((chapter) => {
        const kicker = chapter.querySelector<HTMLElement>(
          ":scope > .service-band-head [data-cloud-kicker]",
        );
        const title = chapter.querySelector<HTMLElement>(
          ":scope > .service-band-head [data-cloud-title]",
        );
        const copy = chapter.querySelectorAll<HTMLElement>(
          ":scope > .service-band-head [data-cloud-copy]",
        );
        const visual = chapter.querySelector<HTMLElement>("[data-cloud-stage]");
        const list = chapter.querySelector<HTMLElement>(":scope > [data-cloud-list]");
        bindBlock(kicker, title, copy, visual, list, triggers);
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
  }), [reduced]);

  return rootRef;
}
