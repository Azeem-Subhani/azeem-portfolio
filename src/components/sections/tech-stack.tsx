"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { StackLayers } from "@/components/sections/stack-layers";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { revealStart } from "@/lib/reveal-visibility";

gsap.registerPlugin(ScrollTrigger);

export function TechStack() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const lines = section.querySelectorAll<HTMLElement>("[data-stack-line]");
    const copy = section.querySelectorAll<HTMLElement>("[data-stack-copy]");
    const loop = section.querySelector<HTMLElement>("[data-stack-loop]");
    const targets = [...lines, ...copy, ...(loop ? [loop] : [])];

    const revert = () => {
      gsap.set(targets, { clearProps: "opacity,transform" });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revert();
      return;
    }

    gsap.set(lines, { yPercent: 112, rotate: 0.8, transformOrigin: "center bottom" });
    gsap.set(copy, {
      opacity: 0,
      x: (index) => (index % 2 === 0 ? -22 : 22),
      y: 12,
    });
    gsap.set(loop, { opacity: 0, y: 20 });

    // The copy and the stack console get separate triggers: stacked on mobile
    // they sit a screen apart, and the console should reveal when it's on screen.
    const textTl = gsap.timeline({ paused: true, defaults: { ease: "power4.out" } });
    textTl
      // Headline leads, body follows once it has landed.
      .to(lines, { yPercent: 0, rotate: 0, duration: 0.82, stagger: 0.12 })
      .to(
        copy,
        { opacity: 1, x: 0, y: 0, duration: 0.62, stagger: 0.12, ease: "power3.out" },
        0.5,
      );

    const loopTl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
    loopTl.to(loop, { opacity: 1, y: 0, duration: 0.75, delay: 0.15 });

    const textTrigger = textRef.current ?? section;
    const loopTrigger = loop ?? section;

    const textSt = ScrollTrigger.create({
      trigger: textTrigger,
      start: () => revealStart(textTrigger.offsetHeight, window.innerHeight),
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => textTl.play(),
    });

    const loopSt = ScrollTrigger.create({
      trigger: loopTrigger,
      start: () => revealStart(loopTrigger.offsetHeight, window.innerHeight),
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => loopTl.play(),
    });

    const raf = requestAnimationFrame(() => {
      if (textSt.start <= window.scrollY + 4 && !textTl.isActive() && textTl.progress() === 0) {
        textTl.play();
      }
      if (loopSt.start <= window.scrollY + 4 && !loopTl.isActive() && loopTl.progress() === 0) {
        loopTl.play();
      }
    });

    return () => {
      cancelAnimationFrame(raf);
      textSt.kill();
      loopSt.kill();
      textTl.kill();
      loopTl.kill();
      revert();
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="stack-title"
      className="home-band-stack relative overflow-x-clip px-4 py-20 text-foreground sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <div ref={textRef}>
          <h2
            id="stack-title"
            // -mb cancels the descender-guard padding on the last line so the
            // copy below keeps its original gap.
            className="-mb-[0.16em] font-display text-[clamp(2.75rem,6.4vw,5rem)] leading-[0.9] tracking-tight"
          >
            <span className="block overflow-hidden pb-[0.16em] -mb-[0.16em]">
              <span data-stack-line className="block will-change-transform">
                every layer of the{" "}
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.16em] -mb-[0.16em]">
              <span data-stack-line className="block text-accent will-change-transform">
                technology stack
              </span>
            </span>
          </h2>
          <p
            data-stack-copy
            className="mt-8 max-w-md text-xl font-semibold leading-snug text-foreground/90"
          >
            I choose the stack for the project, not out of habit.
          </p>
          <p
            data-stack-copy
            className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg"
          >
            The Track Booking Platform is Next.js and React on a Django API. The Sports Team App is Angular and Ionic
            on NestJS and Firestore. Different answers for different products, both
            running in production.
          </p>
          <p
            data-stack-copy
            className="mt-4 max-w-md text-sm leading-6 text-muted-foreground"
          >
            I work across the frontend, the API, the database, and the AWS account
            underneath, so nothing has to change hands between them.
          </p>
        </div>

        <div data-stack-loop>
          <StackLayers reduced={reduced} />
        </div>
      </div>
    </section>
  );
}
