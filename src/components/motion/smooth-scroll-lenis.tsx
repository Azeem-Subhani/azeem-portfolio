"use client";

import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Smooth scrolling for pages that actually scroll. Kept out of the root layout
 * so a legal page does not download Lenis or run a GSAP ticker forever.
 * Returns a teardown the caller runs on route change and unmount.
 */
export function attachSmoothScroll() {
  const lenis = new Lenis({
    autoRaf: false,
    duration: 1.05,
    easing: (time) => 1 - Math.pow(1 - time, 4),
    // Wheel and trackpad scroll natively; Lenis only eases in-page anchor jumps.
    smoothWheel: false,
    syncTouch: false,
    touchMultiplier: 1,
    anchors: false,
    stopInertiaOnNavigate: true,
    respectReducedMotion: true,
  });

  const updateScrollTriggers = () => ScrollTrigger.update();
  // Anchor jumps are the only time Lenis animates. A standing GSAP ticker
  // would keep a frame loop alive on every marketing page, including while idle.
  let rafId = 0;
  let driveToken = 0;
  let driveTimer = 0;
  const stopDrive = () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
    window.clearTimeout(driveTimer);
    driveTimer = 0;
  };
  const loop = (time: number) => {
    lenis.raf(time);
    rafId = requestAnimationFrame(loop);
  };
  const startDrive = () => {
    const token = ++driveToken;
    if (!rafId) rafId = requestAnimationFrame(loop);
    window.clearTimeout(driveTimer);
    driveTimer = window.setTimeout(() => {
      if (token === driveToken) stopDrive();
    }, 1600);
    return () => {
      if (token === driveToken) stopDrive();
    };
  };
  const refresh = () => {
    lenis.resize();
    ScrollTrigger.refresh();
  };
  // Anchor clicks are intercepted for smooth scrolling, which also skips the
  // browser's own focus move. Move focus by hand so the skip link and
  // in-page TOCs put keyboard and screen-reader users at the target.
  const focusTarget = (target: HTMLElement) => {
    if (target.tabIndex < 0 && !target.hasAttribute("tabindex")) {
      target.setAttribute("tabindex", "-1");
      // Sections are focus targets, not controls; globals.css drops the ring.
      target.setAttribute("data-scroll-target", "");
    }
    target.focus({ preventScroll: true });
  };
  const scrollToHash = (hash: string, immediate = false, moveFocus = true) => {
    const id = decodeURIComponent(hash.replace(/^#/, ""));
    const target = id ? document.getElementById(id) : null;
    if (!target) return;

    const endDrive = startDrive();
    lenis.scrollTo(target, {
      offset: -96,
      duration: immediate ? undefined : 0.95,
      immediate,
      force: true,
      onComplete: () => {
        endDrive();
        ScrollTrigger.update();
      },
    });
    if (moveFocus) focusTarget(target);
  };
  const handleAnchorClick = (event: MouseEvent) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const origin = event.target;
    if (!(origin instanceof Element)) return;

    const anchor = origin.closest<HTMLAnchorElement>("a[href*='#']");
    if (!anchor || anchor.target || anchor.hasAttribute("download")) return;

    const url = new URL(anchor.href, window.location.href);
    if (
      url.origin !== window.location.origin ||
      url.pathname !== window.location.pathname ||
      !url.hash
    ) {
      return;
    }

    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;

    event.preventDefault();
    window.history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
    scrollToHash(url.hash);
  };
  const handleHistory = () => {
    if (window.location.hash) scrollToHash(window.location.hash);
  };
  const initialHashTimer = window.setTimeout(() => {
    refresh();
    if (window.location.hash) {
      // A deep link on load positions the page but leaves focus alone.
      scrollToHash(window.location.hash, true, false);
    }
  }, 60);

  lenis.on("scroll", updateScrollTriggers);
  window.addEventListener("scroll", updateScrollTriggers, { passive: true });
  document.addEventListener("click", handleAnchorClick, true);
  window.addEventListener("popstate", handleHistory);

  void document.fonts?.ready.then(refresh);
  window.addEventListener("load", refresh);

  return () => {
    window.clearTimeout(initialHashTimer);
    window.removeEventListener("load", refresh);
    window.removeEventListener("popstate", handleHistory);
    document.removeEventListener("click", handleAnchorClick, true);
    window.removeEventListener("scroll", updateScrollTriggers);
    lenis.off("scroll", updateScrollTriggers);
    stopDrive();
    lenis.destroy();
  };
}
