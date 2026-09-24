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

function playIfPast(trigger: ScrollTrigger, play: () => void) {
  if (trigger.start <= scrollY() + 4) play();
}

function splitTitle(title: HTMLElement, origin: "left bottom" | "right bottom") {
  let timeline: gsap.core.Timeline | null = null;
  let started = false;

  const split = SplitText.create(title, {
    type: "lines,words",
    mask: "lines",
    linesClass: "web-title-line",
    wordsClass: "web-title-word",
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
    wordsClass: "web-item-word",
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
  const rule = kicker.querySelector<HTMLElement>(".web-chapter-rule");
  const bits = kicker.querySelectorAll<HTMLElement>(
    ".web-chapter-index, .web-chapter-kicker > span:last-child",
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

function copyTimeline(nodes: NodeListOf<HTMLElement> | HTMLElement[]): Playable {
  const items = Array.from(nodes);
  let started = false;

  const anims = items.map((node) => {
    let timeline: gsap.core.Timeline | null = null;
    const split = SplitText.create(node, {
      type: "words",
      wordsClass: "web-copy-word",
      autoSplit: true,
      onSplit: (self) => {
        timeline = gsap.timeline({ paused: true, defaults: { ease } }).fromTo(
          self.words,
          { opacity: 0, yPercent: 40, filter: "blur(4px)" },
          {
            opacity: 1,
            yPercent: 0,
            filter: "blur(0px)",
            duration: 0.6,
            stagger: Math.min(0.022, 0.5 / Math.max(self.words.length, 1)),
            clearProps: "filter",
          },
        );
        if (started) timeline.progress(1);
      },
    });
    return {
      play: () => timeline?.play(0),
      kill: () => {
        timeline?.kill();
        split.revert();
      },
    };
  });

  return {
    play() {
      if (started) return;
      started = true;
      anims.forEach((anim, index) => gsap.delayedCall(0.12 + index * 0.08, anim.play));
    },
    kill() {
      anims.forEach((anim) => anim.kill());
    },
  };
}

function listTimeline(
  nodes: NodeListOf<HTMLElement> | HTMLElement[],
  splitTitles = false,
) {
  const items = Array.from(nodes);
  if (!items.length) return null;

  const titleAnims = splitTitles
    ? items.map((item) => {
        const title = item.querySelector<HTMLElement>("[data-web-item-title]");
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

function rowTimeline(rows: HTMLElement[]) {
  if (!rows.length) return null;

  gsap.set(rows, { opacity: 0, x: -12 });
  return gsap
    .timeline({ paused: true, defaults: { ease } })
    .to(rows, { opacity: 1, x: 0, duration: 0.5, stagger: 0.07 }, 0);
}

function deviceTimeline(visual: HTMLElement) {
  const device = visual.dataset.device ?? "stage";
  const shells = visual.querySelectorAll<HTMLElement>("[data-web-shell]");
  const tl = gsap.timeline({ paused: true, defaults: { ease } });

  if (device === "stack" && shells.length) {
    const cms = visual.querySelector<HTMLElement>('[data-web-shell="cms"]');
    const edge = visual.querySelector<HTMLElement>('[data-web-shell="edge"]');
    const site = visual.querySelector<HTMLElement>('[data-web-shell="site"]');

    if (cms) gsap.set(cms, { opacity: 0, x: -36, y: 10, scale: 0.96 });
    if (edge) gsap.set(edge, { opacity: 0, x: 40, y: 8, scale: 0.96 });
    if (site) gsap.set(site, { opacity: 0, y: 36, scale: 0.9 });

    if (cms) tl.to(cms, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.7 }, 0);
    if (edge) tl.to(edge, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.7 }, 0.08);
    if (site) tl.to(site, { opacity: 1, y: 0, scale: 1, duration: 0.72 }, 0.12);
    return tl;
  }

  if (device === "migrate") {
    const php = visual.querySelector<HTMLElement>('[data-web-shell="php"]');
    const headless = visual.querySelector<HTMLElement>('[data-web-shell="headless"]');
    if (php) gsap.set(php, { opacity: 0, x: -24 });
    if (headless) gsap.set(headless, { opacity: 0, x: 24 });
    if (php) tl.to(php, { opacity: 1, x: 0, duration: 0.7 }, 0);
    if (headless) tl.to(headless, { opacity: 1, x: 0, duration: 0.7 }, 0.08);
    return tl;
  }

  if (device === "prototype") {
    shells.forEach((shell, index) => {
      gsap.set(shell, { opacity: 0, y: 18 });
      tl.to(shell, { opacity: 1, y: 0, duration: 0.62 }, index * 0.08);
    });
    return tl;
  }

  gsap.set(visual, { opacity: 0, y: 18 });
  tl.to(visual, { opacity: 1, y: 0, duration: 0.7 });
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
  origin: "left bottom" | "right bottom",
  triggers: Array<() => void>,
) {
  const splitHeading = Boolean(title?.classList.contains("service-band-title"));
  const heading = splitHeading && title ? splitTitle(title, origin) : null;
  const copyItems = [...copyNodes];
  if (title && !splitHeading) copyItems.unshift(title);
  const copyTl = copyTimeline(copyItems);
  const kickerTl = kicker ? kickerTimeline(kicker) : null;
  const visualTl = visual ? deviceTimeline(visual) : null;

  const items =
    listRoot?.querySelectorAll<HTMLElement>("[data-web-card], [data-web-row]") ?? [];
  const itemsTl = items.length
    ? items[0].hasAttribute("data-web-row")
      ? rowTimeline([...items])
      : listTimeline([...items], true)
    : null;

  const revealCopy = () => {
    kickerTl?.play();
    heading?.play();
    copyTl.play();
  };

  const copyTrigger = kicker ?? title ?? visual;
  if (copyTrigger) {
    const copySt = ScrollTrigger.create({
      trigger: copyTrigger,
      start: () => revealStart(copyTrigger.offsetHeight, window.innerHeight),
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
      start: () => revealStart(visual.offsetHeight, window.innerHeight),
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

  if (listRoot && itemsTl) {
    const listSt = ScrollTrigger.create({
      trigger: listRoot,
      start: () => revealStart(listRoot.offsetHeight, window.innerHeight),
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => playList(itemsTl),
    });
    const raf = requestAnimationFrame(() => playIfPast(listSt, () => playList(itemsTl)));
    triggers.push(
      () => cancelAnimationFrame(raf),
      () => listSt.kill(),
      () => killList(itemsTl),
    );
  }
}

export function useWebBodyMotion<T extends HTMLElement>() {
  const rootRef = useRef<T>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>(
      "[data-web-kicker], [data-web-title], [data-web-copy], [data-web-shell], [data-web-card], [data-web-row], [data-web-step], [data-web-item-title]",
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
      root.querySelectorAll<HTMLElement>("[data-web-chapter]").forEach((chapter) => {
        const kicker = chapter.querySelector<HTMLElement>(
          ":scope > .service-band-head [data-web-kicker]",
        );
        const title = chapter.querySelector<HTMLElement>(
          ":scope > .service-band-head [data-web-title]",
        );
        const copy = chapter.querySelectorAll<HTMLElement>(
          ":scope > .service-band-head [data-web-copy]",
        );
        const visual = chapter.querySelector<HTMLElement>("[data-web-stage]");
        const list = chapter.querySelector<HTMLElement>(":scope > [data-web-list]");
        bindBlock(kicker, title, copy, visual, list, "left bottom", triggers);
      });

      // Process chapter: the two comparison columns + outcome cards live one
      // level deeper than [data-web-list], so bind them explicitly.
      const processChapter = root.querySelector<HTMLElement>(
        '[data-web-chapter]:has(#web-process)',
      );
      if (processChapter) {
        const cols = processChapter.querySelectorAll<HTMLElement>(
          ":scope > .web-process [data-web-card]",
        );
        const outcomes = processChapter.querySelectorAll<HTMLElement>(
          ":scope > .web-outcomes [data-web-card]",
        );
        const steps = processChapter.querySelectorAll<HTMLElement>("[data-web-step]");
        if (cols.length || outcomes.length || steps.length) {
          const colTl = cols.length ? listTimeline([...cols], true) : null;
          const outTl = outcomes.length ? listTimeline([...outcomes], true) : null;
          gsap.set(steps, { opacity: 0, x: -8 });
          const stepsTl = steps.length
            ? gsap
                .timeline({ paused: true, defaults: { ease } })
                .to(steps, { opacity: 1, x: 0, duration: 0.4, stagger: 0.05 }, 0)
            : null;
          const trigger = (processChapter.querySelector<HTMLElement>(".web-process") ??
            processChapter) as HTMLElement;
          const mk = (target: ListPlayable) => {
            if (!target) return;
            const st = ScrollTrigger.create({
              trigger,
              start: () => revealStart(trigger.offsetHeight, window.innerHeight),
              once: true,
              invalidateOnRefresh: true,
              onEnter: () => playList(target),
            });
            const raf = requestAnimationFrame(() => playIfPast(st, () => playList(target)));
            triggers.push(
              () => cancelAnimationFrame(raf),
              () => st.kill(),
              () => killList(target),
            );
          };
          mk(colTl);
          mk(outTl);
          if (stepsTl) mk(stepsTl);
        }
      }
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
