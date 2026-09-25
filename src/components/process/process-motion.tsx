"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { INTRO_COMPLETE_EVENT } from "@/components/motion/site-intro";

gsap.registerPlugin(ScrollTrigger);

/*
 * Page-specific motion for /process, layered on top of WhyMotion's section fades:
 *   [data-process-line]    hero headline lines rise out of their masks after the site intro
 *   [data-process-sprint]  scroll-scrubbed sprint chart: a playhead crosses the two weeks,
 *                          each [data-process-bar] fills as it passes, and the current
 *                          [data-process-day] lights up; scrolling back rewinds it
 *   [data-process-route]   environments play once as a journey: each stop pops in, the
 *                          link draws to the next one, the sign-off gate appears, and
 *                          production pulses on arrival
 * Everything is set up inside matchMedia, so reduced-motion visitors keep the static page,
 * and nothing is hidden in the server HTML.
 */

const MOTION = "(prefers-reduced-motion: no-preference)";

function heroLines(root: HTMLElement) {
  const lines = root.querySelectorAll<HTMLElement>("[data-process-line]");
  if (!lines.length) return () => {};

  gsap.set(lines, { yPercent: 110, rotate: 1.5, transformOrigin: "left bottom" });
  const play = () =>
    gsap.to(lines, { yPercent: 0, rotate: 0, duration: 1.2, ease: "expo.out", stagger: 0.11 });

  // On a fresh visit the site intro covers the page, so wait for it like WhyMotion's hero.
  if (document.documentElement.dataset.introState === "fresh") {
    window.addEventListener(INTRO_COMPLETE_EVENT, play, { once: true });
    return () => window.removeEventListener(INTRO_COMPLETE_EVENT, play);
  }
  play();
  return () => {};
}

function sprintChart(root: HTMLElement) {
  const chart = root.querySelector<HTMLElement>("[data-process-sprint]");
  if (!chart) return () => {};

  const bars = Array.from(chart.querySelectorAll<HTMLElement>("[data-process-bar]"));
  const heads = chart.querySelectorAll<HTMLElement>("[data-process-playhead]");
  const days = Array.from(chart.querySelectorAll<HTMLElement>("[data-process-day]"));

  // One timeline unit per working day, so a bar's start index is its position on the timeline.
  const timeline = gsap.timeline({ defaults: { ease: "none" } });
  timeline.fromTo(heads, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0);
  timeline.fromTo(heads, { left: "0%" }, { left: "100%", duration: 10 }, 0);
  bars.forEach((bar) => {
    const start = Number(bar.dataset.start);
    const end = Number(bar.dataset.end);
    timeline.fromTo(
      bar,
      { scaleX: 0, transformOrigin: "left center" },
      { scaleX: 1, duration: end - start + 1 },
      start,
    );
  });
  timeline.to(heads, { opacity: 0, duration: 0.5 }, 10);

  const markDay = () => {
    const time = timeline.time();
    const active = time > 0 && time < 10 ? Math.floor(time) : -1;
    days.forEach((day, index) => day.toggleAttribute("data-active", index === active));
  };

  // Driven from the timeline, not the trigger: with scrub the playhead keeps easing after
  // scrolling stops, and the day label has to follow the playhead, not the scrollbar.
  timeline.eventCallback("onUpdate", markDay);

  ScrollTrigger.create({
    trigger: chart,
    // The full sprint plays while the bar rows are on screen, from the chart's top edge
    // entering the lower third to it reaching the header.
    start: "top 65%",
    end: "top 12%",
    // A short lag smooths wheel steps without feeling detached from the scroll.
    scrub: 0.5,
    animation: timeline,
  });

  return () => days.forEach((day) => day.removeAttribute("data-active"));
}

function environmentRoute(root: HTMLElement, wide: boolean) {
  const route = root.querySelector<HTMLElement>("[data-process-route]");
  if (!route) return;

  const stations = Array.from(route.querySelectorAll<HTMLElement>("[data-process-station]"));
  const timeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

  stations.forEach((station, index) => {
    const at = index * 0.55;
    const dot = station.querySelector<HTMLElement>("[data-process-dot]");
    const text = station.querySelectorAll<HTMLElement>("[data-process-text]");
    const link = station.querySelector<HTMLElement>("[data-process-link]");
    const gate = station.querySelectorAll<HTMLElement>("[data-process-gate]");

    if (dot) timeline.from(dot, { scale: 0, duration: 0.5, ease: "back.out(2.2)" }, at);
    if (text.length) timeline.from(text, { opacity: 0, y: 14, duration: 0.6, stagger: 0.06 }, at + 0.1);
    // The route runs across on wide screens and down the left edge on phones.
    if (link) {
      timeline.from(
        link,
        wide
          ? { scaleX: 0, transformOrigin: "left center", duration: 0.55, ease: "power2.inOut" }
          : { scaleY: 0, transformOrigin: "center top", duration: 0.55, ease: "power2.inOut" },
        at + 0.25,
      );
    }
    if (gate.length) {
      timeline.from(gate, { opacity: 0, scale: 0.6, duration: 0.45, ease: "back.out(2.2)" }, at + 0.6);
    }
  });

  const arrival = stations.at(-1)?.querySelector<HTMLElement>("[data-process-dot]");
  if (arrival) {
    timeline.to(arrival, { scale: 1.35, duration: 0.2, yoyo: true, repeat: 1, ease: "power1.inOut" });
  }

  ScrollTrigger.create({ trigger: route, start: "top 80%", once: true, onEnter: () => timeline.play() });
}

export function ProcessMotion({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia(root);
    // Hero and chart do not depend on width, so they sit apart from the route and never
    // replay when a resize crosses the breakpoint.
    mm.add(MOTION, () => {
      const cleanHero = heroLines(root);
      const cleanChart = sprintChart(root);
      return () => {
        cleanHero();
        cleanChart();
      };
    });
    mm.add({ wide: "(min-width: 768px)", motion: MOTION }, (context) => {
      const { wide, motion } = context.conditions as { wide: boolean; motion: boolean };
      if (motion) environmentRoute(root, wide);
    });

    return () => mm.revert();
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
