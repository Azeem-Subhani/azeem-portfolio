"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.05,
      easing: (time) => 1 - Math.pow(1 - time, 4),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      anchors: false,
      stopInertiaOnNavigate: true,
      respectReducedMotion: true,
    });

    const updateScrollTriggers = () => ScrollTrigger.update();
    const tick = (time: number) => lenis.raf(time * 1000);
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

      lenis.scrollTo(target, {
        offset: -96,
        duration: immediate ? undefined : 0.95,
        immediate,
        force: true,
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
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    document.addEventListener("click", handleAnchorClick, true);
    window.addEventListener("popstate", handleHistory);

    void document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(initialHashTimer);
      window.removeEventListener("load", refresh);
      window.removeEventListener("popstate", handleHistory);
      document.removeEventListener("click", handleAnchorClick, true);
      lenis.off("scroll", updateScrollTriggers);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);

  return children;
}
