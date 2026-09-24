"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import { INTRO_COMPLETE_EVENT } from "@/components/motion/site-intro";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { revealStart } from "@/lib/reveal-visibility";

gsap.registerPlugin(ScrollTrigger, SplitText);

const ease = "power4.out";

// `scroll` is not in ScrollTrigger's published types, so type the optional getter here and
// keep the runtime check (it follows the smooth-scroll proxy when one is registered).
const scrollTrigger = ScrollTrigger as typeof ScrollTrigger & { scroll?: () => number };

function scrollY() {
  return typeof scrollTrigger.scroll === "function" ? scrollTrigger.scroll() : window.scrollY;
}

function inSkip(el: Element) {
  return Boolean(
    el.closest("header") ||
      el.closest("[data-device-stage]") ||
      el.closest("[data-project-mockup]") ||
      el.closest("[data-project-stack]") ||
      el.closest("nav") ||
      el.classList.contains("sr-only") ||
      el.closest(".sr-only"),
  );
}

function isPlainText(el: HTMLElement) {
  return [...el.childNodes].every((node) => {
    if (node.nodeType === Node.TEXT_NODE) return true;
    if (node.nodeType !== Node.ELEMENT_NODE) return false;
    const tag = (node as HTMLElement).tagName;
    return tag === "BR" || tag === "EM" || tag === "STRONG" || tag === "SPAN";
  });
}

function hasOnlyTextAndBullet(el: HTMLElement) {
  const kids = [...el.childNodes].filter((node) => {
    if (node.nodeType === Node.TEXT_NODE) return Boolean(node.textContent?.trim());
    return node.nodeType === Node.ELEMENT_NODE;
  });
  if (kids.length !== 2) return false;
  const [first, second] = kids;
  if (first.nodeType !== Node.ELEMENT_NODE || second.nodeType !== Node.TEXT_NODE) return false;
  const mark = first as HTMLElement;
  return mark.getAttribute("aria-hidden") === "true" && Boolean(second.textContent?.trim());
}

type LineSplit = {
  play: () => void;
  kill: () => void;
};

function splitLines(
  el: HTMLElement,
  options: { rotate: number; duration: number; stagger: number; linesClass: string },
): LineSplit {
  let timeline: gsap.core.Timeline | null = null;
  let started = false;

  gsap.set(el, { opacity: 0 });

  const split = SplitText.create(el, {
    type: "lines",
    mask: "lines",
    linesClass: options.linesClass,
    autoSplit: true,
    onSplit: (self) => {
      gsap.set(el, { opacity: 1 });
      timeline = gsap
        .timeline({ paused: true, defaults: { ease } })
        .fromTo(
          self.lines,
          { yPercent: 112, rotate: options.rotate, transformOrigin: "left bottom" },
          { yPercent: 0, rotate: 0, duration: options.duration, stagger: options.stagger },
        );
      if (started) timeline.progress(1);
    },
  });

  return {
    play() {
      if (started) return;
      started = true;
      timeline?.play(0);
    },
    kill() {
      timeline?.kill();
      split.revert();
      gsap.set(el, { clearProps: "opacity" });
    },
  };
}

function clipItems(items: HTMLElement[]): LineSplit {
  if (!items.length) {
    return { play() {}, kill() {} };
  }

  gsap.set(items, { opacity: 1, clipPath: "inset(110% 0 -14% 0)" });
  const timeline = gsap
    .timeline({ paused: true, defaults: { ease } })
    .to(items, { clipPath: "inset(0% 0 -14% 0)", duration: 0.68, stagger: 0.07 });

  return {
    play() {
      timeline.play();
    },
    kill() {
      timeline.kill();
      gsap.set(items, { clearProps: "clipPath,opacity" });
    },
  };
}

function bindBlock(
  trigger: HTMLElement,
  titles: HTMLElement[],
  copy: HTMLElement[],
  kills: Array<() => void>,
) {
  const titleSplits = titles.map((el) =>
    splitLines(el, {
      rotate: el.tagName === "H2" || el.tagName === "H1" ? 0.7 : 0.35,
      duration: 0.72,
      stagger: 0.08,
      linesClass: "project-title-line",
    }),
  );

  const lineCopy: HTMLElement[] = [];
  const clipCopy: HTMLElement[] = [];

  copy.forEach((el) => {
    if (el.tagName === "LI" && (el.classList.contains("flex") || !isPlainText(el))) {
      clipCopy.push(el);
      return;
    }
    if (el.tagName === "LI" && hasOnlyTextAndBullet(el)) {
      clipCopy.push(el);
      return;
    }
    if (isPlainText(el)) {
      lineCopy.push(el);
      return;
    }
    clipCopy.push(el);
  });

  const copySplits = lineCopy.map((el) =>
    splitLines(el, {
      rotate: 0,
      duration: 0.56,
      stagger: 0.04,
      linesClass: "project-copy-line",
    }),
  );
  const clipped = clipItems(clipCopy);

  let played = false;
  const play = () => {
    if (played) return;
    played = true;
    titleSplits.forEach((split) => split.play());
    copySplits.forEach((split) => split.play());
    clipped.play();
  };

  const st = ScrollTrigger.create({
    trigger,
    start: () => revealStart(trigger.offsetHeight, window.innerHeight),
    once: true,
    invalidateOnRefresh: true,
    onEnter: play,
  });

  const raf = requestAnimationFrame(() => {
    if (st.start <= scrollY() + 4) play();
  });

  kills.push(
    () => cancelAnimationFrame(raf),
    () => st.kill(),
    () => clipped.kill(),
    ...titleSplits.map((split) => () => split.kill()),
    ...copySplits.map((split) => () => split.kill()),
  );
}

function collectCopy(column: HTMLElement, title: HTMLElement) {
  return [...column.querySelectorAll<HTMLElement>("p, li, dd, dt")].filter((el) => {
    if (el === title || inSkip(el)) return false;
    if (el.classList.contains("font-mono")) return false;
    if (el.classList.contains("font-display") && el.tagName === "P") return false;
    if (el.tagName === "DT" && !el.classList.contains("font-display")) return false;
    return true;
  });
}

function gatherBlocks(root: HTMLElement) {
  const titles = [
    ...root.querySelectorAll<HTMLElement>("h2.font-display"),
    ...root.querySelectorAll<HTMLElement>("[data-project-closer] > p.font-display"),
  ].filter((el) => !inSkip(el) && !el.classList.contains("sr-only"));

  const blocks = titles.flatMap((title) => {
    const column = title.parentElement;
    if (!column) return [];
    const nodes = collectCopy(column, title);
    return [
      {
        trigger: title,
        titles: [title, ...nodes.filter((el) => el.tagName === "DT")],
        copy: nodes.filter((el) => el.tagName !== "DT"),
      },
    ];
  });

  const nda = [...root.querySelectorAll<HTMLElement>("article > p")].find(
    (el) => !inSkip(el) && !el.classList.contains("font-display"),
  );
  if (nda) blocks.push({ trigger: nda, titles: [], copy: [nda] });

  return blocks;
}

export function ProjectTextMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (reduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let alive = true;
    const kills: Array<() => void> = [];
    let context: gsap.Context | null = null;
    const blocks = gatherBlocks(root);
    const pending = blocks.flatMap((block) => [...block.titles, ...block.copy]);
    gsap.set(pending, { opacity: 0 });

    const setup = () => {
      if (!alive || !rootRef.current) return;

      context = gsap.context(() => {
        blocks.forEach((block) => {
          bindBlock(block.trigger, block.titles, block.copy, kills);
        });
      }, root);

      ScrollTrigger.refresh();
    };

    void (document.fonts?.ready ?? Promise.resolve()).then(setup);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    window.addEventListener(INTRO_COMPLETE_EVENT, refresh);

    return () => {
      alive = false;
      window.removeEventListener("load", refresh);
      window.removeEventListener(INTRO_COMPLETE_EVENT, refresh);
      context?.revert();
      kills.forEach((kill) => kill());
      gsap.set(pending, { clearProps: "opacity" });
    };
  }, [reduced]);

  return <div ref={rootRef}>{children}</div>;
}
