"use client";

import {
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
  type RefObject,
} from "react";
import { gsap } from "gsap";

/**
 * "Build-up" entrance for live project captures: the screen's panels, cards and tiles
 * arrive one by one in reading order, then the repeated rows inside them slide in, so a
 * capture reads like an app loading its data rather than a picture appearing.
 *
 * Units are found from the rendered layout instead of per-screen config, so every
 * `.capture` (≈50 screens) gets it without touching the capture markup:
 * - unit: an element with its own surface (background, border or shadow) covering
 *   0.15%–25% of the screen; bigger surfaces are treated as layout and searched inside.
 * - text unit: a text block sitting directly on the screen background (titles, labels).
 * - rows: the first run of 3+ look-alike siblings inside a unit (list items, table rows).
 */

type BuildPlan = {
  units: { el: HTMLElement; small: boolean }[];
  rows: { el: HTMLElement; unitIndex: number }[];
  offset: number;
  /** Each element's own inline opacity/transform and resting opacity, restored after the build. */
  original: Map<
    HTMLElement,
    { opacity: string; transform: string; rest: number }
  >;
};

type BuildUpOptions = {
  /** Called when a capture mounts; return false to show it as-is (no build). */
  shouldBuild?: () => boolean;
};

const MIN_AREA = 0.0015;
const MAX_UNIT_AREA = 0.25;
const SMALL_UNIT_AREA = 0.03;
const MAX_UNITS = 36;

const noopSubscribe = () => () => {};

function hasSurface(style: CSSStyleDeclaration) {
  const alpha = (color: string) => {
    if (color === "transparent") return 0;
    const match = color.match(/rgba?\(([^)]+)\)/);
    if (!match) return 1;
    const parts = match[1].split(/[\s,/]+/).filter(Boolean);
    return parts.length > 3 ? Number(parts[3]) : 1;
  };
  if (alpha(style.backgroundColor) > 0.02 || style.backgroundImage !== "none")
    return true;
  if (style.boxShadow !== "none") return true;
  return (["Top", "Right", "Bottom", "Left"] as const).some(
    (side) =>
      parseFloat(style.getPropertyValue(`border-${side.toLowerCase()}-width`)) >
        0 &&
      alpha(style.getPropertyValue(`border-${side.toLowerCase()}-color`)) >
        0.02,
  );
}

function hasOwnText(el: HTMLElement) {
  return Array.from(el.childNodes).some(
    (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim(),
  );
}

/** First run of 3+ siblings that share a tag and first class: list items, table rows. */
function findRows(unit: HTMLElement): HTMLElement[] {
  const queue: { el: HTMLElement; depth: number }[] = [{ el: unit, depth: 0 }];
  while (queue.length) {
    const { el, depth } = queue.shift()!;
    const kids = Array.from(el.children) as HTMLElement[];
    const signature = (node: HTMLElement) =>
      `${node.tagName}.${node.classList[0] ?? ""}`;
    if (kids.length >= 3) {
      const counts = new Map<string, number>();
      kids.forEach((kid) =>
        counts.set(signature(kid), (counts.get(signature(kid)) ?? 0) + 1),
      );
      const [best, count] = [...counts.entries()].sort(
        (a, b) => b[1] - a[1],
      )[0];
      if (count >= 3)
        return kids.filter((kid) => signature(kid) === best).slice(0, 12);
    }
    if (depth < 4)
      kids.forEach((kid) => queue.push({ el: kid, depth: depth + 1 }));
  }
  return [];
}

function planBuild(capture: HTMLElement): BuildPlan | null {
  const root = capture.getBoundingClientRect();
  const rootArea = root.width * root.height;
  if (rootArea <= 0) return null;

  const units: HTMLElement[] = [];
  const walk = (parent: HTMLElement) => {
    for (const child of Array.from(parent.children) as HTMLElement[]) {
      if (units.length >= MAX_UNITS) return;
      const rect = child.getBoundingClientRect();
      const share = (rect.width * rect.height) / rootArea;
      if (share < MIN_AREA) continue;
      const style = getComputedStyle(child);
      if (style.display === "none" || style.visibility === "hidden") continue;
      if (hasSurface(style)) {
        if (share <= MAX_UNIT_AREA) units.push(child);
        else walk(child);
      } else if (hasOwnText(child)) {
        units.push(child);
      } else {
        walk(child);
      }
    }
  };
  walk(capture);
  if (units.length === 0) return null;

  // Reading order: top to bottom, then left to right (sidebars and top bars lead).
  const ordered = units
    .map((el) => ({ el, rect: el.getBoundingClientRect() }))
    .sort(
      (a, b) =>
        Math.round(a.rect.top - b.rect.top) || a.rect.left - b.rect.left,
    );

  const rows: BuildPlan["rows"] = [];
  ordered.forEach(({ el }, unitIndex) => {
    findRows(el).forEach((row) => rows.push({ el: row, unitIndex }));
  });

  const original: BuildPlan["original"] = new Map();
  [...ordered.map(({ el }) => el), ...rows.map((row) => row.el)].forEach(
    (el) => {
      const computed = parseFloat(getComputedStyle(el).opacity);
      original.set(el, {
        opacity: el.style.opacity,
        transform: el.style.transform,
        // Some captures dim elements on purpose (e.g. opacity 0.65); build back to that,
        // and leave anything the capture hides (opacity 0) hidden.
        rest: Number.isNaN(computed) ? 1 : computed,
      });
    },
  );

  return {
    units: ordered.map(({ el, rect }) => ({
      el,
      small: (rect.width * rect.height) / rootArea < SMALL_UNIT_AREA,
    })),
    rows,
    // Offsets in the capture's own design pixels (it is scaled as a whole).
    offset: Math.max(8, capture.offsetWidth * 0.014),
    original,
  };
}

/** Puts back exactly what the capture had inline, so the build leaves no trace. */
function restore(plan: BuildPlan) {
  plan.original.forEach((value, el) => {
    gsap.killTweensOf(el);
    el.style.opacity = value.opacity;
    el.style.transform = value.transform;
  });
}

function hideForBuild(plan: BuildPlan) {
  plan.units.forEach(({ el, small }) =>
    gsap.set(
      el,
      small ? { opacity: 0, scale: 0.92 } : { opacity: 0, y: plan.offset },
    ),
  );
  gsap.set(
    plan.rows.map((row) => row.el),
    { opacity: 0, x: -plan.offset },
  );
}

function playBuild(plan: BuildPlan) {
  const stagger = gsap.utils.clamp(0.035, 0.08, 0.95 / plan.units.length);
  const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
  plan.units.forEach(({ el, small }, index) => {
    timeline.to(
      el,
      small
        ? {
            opacity: plan.original.get(el)?.rest ?? 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.6)",
          }
        : { opacity: plan.original.get(el)?.rest ?? 1, y: 0, duration: 0.55 },
      index * stagger,
    );
  });
  const rowsSeen = new Map<number, number>();
  plan.rows.forEach(({ el, unitIndex }) => {
    const n = rowsSeen.get(unitIndex) ?? 0;
    rowsSeen.set(unitIndex, n + 1);
    timeline.to(
      el,
      { opacity: plan.original.get(el)?.rest ?? 1, x: 0, duration: 0.45 },
      unitIndex * stagger + 0.14 + n * 0.06,
    );
  });
  timeline.eventCallback("onComplete", () => restore(plan));
  return timeline;
}

function inViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return rect.width > 0 && rect.bottom > 0 && rect.top < window.innerHeight;
}

function outermostCapture(host: HTMLElement) {
  return host.querySelector<HTMLElement>(".capture");
}

export function useBuildUp(
  hostRef: RefObject<HTMLElement | null>,
  options: BuildUpOptions = {},
) {
  // True only for the render that hydrates server HTML: that content has already been
  // painted, so rebuilding it from blank would read as a glitch.
  const hydrating = useSyncExternalStore(
    noopSubscribe,
    () => false,
    () => true,
  );
  const mountedInHydration = useRef(hydrating);
  const shouldBuildRef = useRef(options.shouldBuild);
  useLayoutEffect(() => {
    shouldBuildRef.current = options.shouldBuild;
  });

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let current: HTMLElement | null = null;
    let plan: BuildPlan | null = null;
    let timeline: gsap.core.Timeline | null = null;
    let observer: IntersectionObserver | null = null;

    const reset = () => {
      observer?.disconnect();
      observer = null;
      timeline?.kill();
      timeline = null;
      if (plan) restore(plan);
      plan = null;
      delete host.dataset.building;
    };

    const prepare = (capture: HTMLElement, alreadyPainted: boolean) => {
      reset();
      current = capture;
      if (alreadyPainted && inViewport(host)) return;
      if (shouldBuildRef.current && !shouldBuildRef.current()) return;
      plan = planBuild(capture);
      if (!plan) return;
      host.dataset.building = "";
      hideForBuild(plan);
      const start = () => {
        if (plan) timeline = playBuild(plan);
      };
      if (inViewport(host)) {
        start();
      } else {
        observer = new IntersectionObserver(
          ([entry]) => {
            if (!entry?.isIntersecting) return;
            observer?.disconnect();
            observer = null;
            start();
          },
          { threshold: 0.25 },
        );
        observer.observe(host);
      }
    };

    const initial = outermostCapture(host);
    if (initial) prepare(initial, mountedInHydration.current);

    // Lazy live mocks mount after this effect, and carousels swap captures in place.
    // MutationObserver callbacks run before paint, so the hidden state never flashes.
    const mutations = new MutationObserver(() => {
      const capture = outermostCapture(host);
      if (capture && capture !== current) prepare(capture, false);
    });
    mutations.observe(host, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      reset();
    };
  }, [hostRef]);
}
