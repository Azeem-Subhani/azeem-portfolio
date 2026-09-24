"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { revealStart } from "@/lib/reveal-visibility";

gsap.registerPlugin(ScrollTrigger, SplitText);

const ease = "power3.out";

function scrollY() {
  return window.scrollY;
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
    type: "lines,words",
    mask: "lines",
    linesClass: "data-title-line",
    wordsClass: "data-title-word",
    autoSplit: true,
    onSplit: (self) => {
      timeline = gsap
        .timeline({ paused: true, defaults: { ease } })
        .fromTo(
          self.lines,
          { yPercent: 112, rotate: origin === "right bottom" ? -0.7 : 0.7, transformOrigin: origin },
          { yPercent: 0, rotate: 0, duration: 0.72, stagger: 0.085 },
        )
        // Words shimmer in just after their line lands: opacity + tiny rise.
        .fromTo(
          self.words,
          { opacity: 0.12, y: 6 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.02 },
          0.18,
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

function splitItemTitle(node: HTMLElement) {
  let timeline: gsap.core.Timeline | null = null;
  let started = false;

  const split = SplitText.create(node, {
    type: "words",
    wordsClass: "data-item-word",
    autoSplit: true,
    onSplit: (self) => {
      timeline = gsap
        .timeline({ paused: true, defaults: { ease } })
        .fromTo(
          self.words,
          { yPercent: 60, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.5, stagger: 0.035 },
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

function kickerTimeline(kicker: HTMLElement) {
  const rule = kicker.querySelector<HTMLElement>(".data-chapter-rule");
  const bits = kicker.querySelectorAll<HTMLElement>(
    ".data-chapter-index, .data-chapter-kicker > span:last-child",
  );

  gsap.set(kicker, { opacity: 0, y: 10 });
  if (bits.length) gsap.set(bits, { opacity: 0, y: 8 });
  if (rule) gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });

  return gsap
    .timeline({ paused: true, defaults: { ease } })
    .to(kicker, { opacity: 1, y: 0, duration: 0.45 })
    .to(bits, { opacity: 1, y: 0, duration: 0.4, stagger: 0.07 }, 0.05)
    .to(rule, { scaleX: 1, duration: 0.55 }, 0.08);
}

function copyTimeline(nodes: NodeListOf<HTMLElement> | HTMLElement[]) {
  const items = Array.from(nodes);
  if (!items.length) return gsap.timeline({ paused: true });

  // Word-by-word ink reveal: each word fades + rises as the copy scrolls in.
  // Applied per node so short chapter ledes stay a single graceful beat.
  const tl = gsap.timeline({ paused: true, defaults: { ease } });
  for (const node of items) {
    const words = node.textContent?.trim().split(/\s+/) ?? [];
    if (words.length <= 1) {
      gsap.set(node, { opacity: 0, y: 14 });
      tl.to(node, { opacity: 1, y: 0, duration: 0.5 }, 0.04);
      continue;
    }
    node.setAttribute("data-data-words", "split");
    const wordSpans = words.map((word) => {
      const span = document.createElement("span");
      span.className = "data-copy-word";
      span.textContent = word;
      return span;
    });
    node.textContent = "";
    wordSpans.forEach((span, index) => {
      node.appendChild(span);
      if (index < wordSpans.length - 1) node.appendChild(document.createTextNode(" "));
    });
    gsap.set(wordSpans, { opacity: 0.1, y: 5 });
    tl.to(wordSpans, { opacity: 1, y: 0, duration: 0.4, stagger: 0.018 }, 0.04);
  }
  return tl;
}

function listTimeline(nodes: NodeListOf<HTMLElement> | HTMLElement[], splitTitles = false) {
  const items = Array.from(nodes);
  if (!items.length) return null;

  const titleAnims = splitTitles
    ? items.map((item) => {
        const title = item.querySelector<HTMLElement>("[data-data-item-title]");
        return title ? splitItemTitle(title) : null;
      })
    : [];

  // Card shell: gentle lift, then the title words cascade inside.
  gsap.set(items, { opacity: 0, y: 14 });
  const tl = gsap
    .timeline({ paused: true, defaults: { ease } })
    .to(items, { opacity: 1, y: 0, duration: 0.5, stagger: 0.09 }, 0);

  return {
    play() {
      tl.play();
      // Titles trail the shell by a beat so words land on a settled card.
      titleAnims.forEach((anim, index) => {
        if (!anim) return;
        gsap.delayedCall(0.12 + index * 0.09, () => anim.play());
      });
    },
    kill() {
      tl.kill();
      titleAnims.forEach((anim) => anim?.kill());
    },
  };
}

function railTimeline(items: HTMLElement[]) {
  if (!items.length) return null;

  gsap.set(items, { opacity: 0, x: -12 });
  return gsap
    .timeline({ paused: true, defaults: { ease } })
    .to(items, { opacity: 1, x: 0, duration: 0.5, stagger: 0.07 }, 0);
}

function stageTimeline(visual: HTMLElement) {
  const panels = visual.querySelectorAll<HTMLElement>("[data-data-panel]");
  const rails = visual.querySelectorAll<HTMLElement>("[data-data-rail]");
  const stops = visual.querySelectorAll<HTMLElement>("[data-data-stop]");
  const tl = gsap.timeline({ paused: true, defaults: { ease } });

  if (panels.length) {
    gsap.set(panels, { opacity: 0, y: 16 });
    tl.to(panels, { opacity: 1, y: 0, duration: 0.55, stagger: 0.09 }, 0);
  }

  // Rails draw out of the panel they leave, so the pipeline reads left to
  // right instead of every panel popping in at once.
  if (rails.length) {
    gsap.set(rails, { scaleX: 0, transformOrigin: "left center", opacity: 0 });
    tl.to(rails, { scaleX: 1, opacity: 1, duration: 0.6, stagger: 0.12 }, 0.18);
  }

  if (stops.length) {
    gsap.set(stops, { opacity: 0, y: 10 });
    tl.to(stops, { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 }, 0.1);
  }

  if (!panels.length && !rails.length && !stops.length) {
    gsap.set(visual, { opacity: 0, y: 18 });
    tl.to(visual, { opacity: 1, y: 0, duration: 0.7 }, 0);
  }

  return tl;
}
type Playable = { play(): void; kill(): void };
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
  const heading = splitHeading && title ? splitTitle(title, "left bottom") : null;
  const copyItems = [...copyNodes];
  if (title && !splitHeading) copyItems.unshift(title);
  const copyTl = copyTimeline(copyItems);
  const kickerTl = kicker ? kickerTimeline(kicker) : null;
  const visualTl = visual ? stageTimeline(visual) : null;

  const cards = listRoot?.querySelectorAll<HTMLElement>("[data-data-card]") ?? [];
  const steps = listRoot?.querySelectorAll<HTMLElement>("[data-data-step]") ?? [];
  const cardsTl = cards.length ? listTimeline([...cards], true) : null;
  const stepsTl = steps.length ? railTimeline([...steps]) : null;

  const copyTrigger = kicker ?? title ?? visual;
  if (copyTrigger) {
    const copySt = ScrollTrigger.create({
      trigger: copyTrigger,
      start: () => revealStart(copyTrigger.offsetHeight, window.innerHeight),
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => {
        kickerTl?.play();
        heading?.play();
        copyTl.play();
      },
    });
    const raf = requestAnimationFrame(() =>
      playIfPast(copySt, copyTl, () => {
        kickerTl?.play();
        heading?.play();
      }),
    );
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

  for (const target of [cardsTl, stepsTl] as ListPlayable[]) {
    if (!listRoot || !target) continue;
    const listSt = ScrollTrigger.create({
      trigger: listRoot,
      start: () => revealStart(listRoot.offsetHeight, window.innerHeight),
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => playList(target),
    });
    // listTimeline wraps delayed word tweens: give ScrollTrigger's playIfPast
    // a real timeline by probing its shell state instead.
    const raf = requestAnimationFrame(() => {
      const shell = target as { play(): void } | gsap.core.Timeline;
      if (shell instanceof gsap.core.Timeline) playIfPast(listSt, shell);
      else if (listSt.start <= scrollY() + 4) playList(target);
    });
    triggers.push(
      () => cancelAnimationFrame(raf),
      () => listSt.kill(),
      () => killList(target),
    );
  }
}
export function useDataBodyMotion<T extends HTMLElement>() {
  const rootRef = useRef<T>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>(
      "[data-data-kicker], [data-data-title], [data-data-copy], [data-data-panel], [data-data-rail], [data-data-stop], [data-data-card], [data-data-step], [data-data-item-title]",
    );
    const clear = () => {
      gsap.set(targets, { clearProps: "all" });
      // Word-split spans are created at runtime; unwrap them so a remount
      // (StrictMode, re-navigation) never nests spans inside spans.
      root
        .querySelectorAll<HTMLElement>("[data-data-words='split']")
        .forEach((node) => {
          node.removeAttribute("data-data-words");
          node.textContent = node.textContent;
        });
      root.querySelectorAll(".data-copy-word, .data-item-word").forEach((span) => {
        const parent = span.parentNode;
        if (!parent) return;
        parent.replaceChild(document.createTextNode(span.textContent ?? ""), span);
        parent.normalize();
      });
    };

    if (reduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      clear();
      return;
    }

    const triggers: Array<() => void> = [];

    const context = gsap.context(() => {
      root.querySelectorAll<HTMLElement>("[data-data-chapter]").forEach((chapter) => {
        const kicker = chapter.querySelector<HTMLElement>(
          ":scope > .service-band-head [data-data-kicker]",
        );
        const title = chapter.querySelector<HTMLElement>(
          ":scope > .service-band-head [data-data-title]",
        );
        const copy = chapter.querySelectorAll<HTMLElement>(
          ":scope > .service-band-head [data-data-copy]",
        );
        const visual = chapter.querySelector<HTMLElement>("[data-data-stage]");
        const list = chapter.querySelector<HTMLElement>(":scope > [data-data-list]");
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
  }, [reduced]);

  return rootRef;
}