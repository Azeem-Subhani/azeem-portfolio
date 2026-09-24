"use client";

import { Fragment, useLayoutEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { INTRO_COMPLETE_EVENT } from "@/components/motion/site-intro";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { ServiceVisual } from "@/components/services/service-visual";
import { Button } from "@/components/ui/button";
import { servicePath, services } from "@/content/services";
import type { ServicePageContent } from "@/types/content";

gsap.registerPlugin(ScrollTrigger);

/** Splits a stat like "<100ms" or "95+" into a countable number plus its fixed prefix/suffix. */
function parseStat(value: string) {
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const [, prefix, number, suffix] = match;
  return {
    prefix,
    suffix,
    target: Number(number),
    decimals: number.includes(".") ? number.split(".")[1].length : 0,
  };
}

type ServiceIntroProps = {
  service: ServicePageContent;
};

/** Renders text as word spans so the CSS entrance can stagger them via --i. */
function Words({ text, offset = 0 }: { text: string; offset?: number }) {
  const words = text.split(" ");
  return words.map((word, index) => (
    <Fragment key={`${word}-${index}`}>
      <span className="service-hero-word" style={{ "--i": offset + index } as CSSProperties}>
        {word}
      </span>
      {index < words.length - 1 ? " " : null}
    </Fragment>
  ));
}

export function ServiceIntro({ service }: ServiceIntroProps) {
  const introRef = useRef<HTMLElement>(null);
  const siblings = services.filter((item) => item.slug !== service.slug);

  // The entrance itself is CSS (globals.css, "Service hero entrance") so it starts on
  // first paint instead of waiting for hydration. JS only drives the stat counters.
  useLayoutEffect(() => {
    const intro = introRef.current;
    if (!intro) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const row = intro.querySelector<HTMLElement>(".service-proof-hero");
    const statValues = Array.from(intro.querySelectorAll<HTMLElement>("[data-service-proof] dd"));
    if (!row || statValues.length === 0) return;

    // If the stats are on screen and their fade has already begun (slow hydration),
    // leave them be rather than snapping visible numbers back to zero.
    const rect = row.getBoundingClientRect();
    const onScreen = rect.top < window.innerHeight && rect.bottom > 0;
    const cell = row.querySelector<HTMLElement>("[data-service-proof]");
    const fadeIn = cell?.getAnimations()[0];
    const fadeDelay = fadeIn?.effect?.getComputedTiming().delay ?? 0;
    const fadeStarted = !fadeIn || Number(fadeIn.currentTime ?? 0) >= fadeDelay;
    if (onScreen && fadeStarted) return;

    const stats = statValues.map((node) => {
      const stat = parseStat(node.dataset.value ?? "");
      if (!stat) return null;
      const state = { n: 0 };
      const render = () => {
        node.textContent = `${stat.prefix}${state.n.toFixed(stat.decimals)}${stat.suffix}`;
      };
      render();
      return { stat, state, render };
    });

    const counters: gsap.core.Tween[] = [];
    let trigger: ScrollTrigger | null = null;

    const countStats = () => {
      // Start counting as the cells finish their CSS fade-in, not before.
      const fade = cell?.getAnimations()[0];
      const timing = fade?.effect?.getComputedTiming();
      const pendingMs =
        fade && timing && typeof timing.delay === "number"
          ? Math.max(0, timing.delay - Number(fade.currentTime ?? 0))
          : 0;
      stats.forEach((entry, index) => {
        if (!entry) return;
        counters.push(
          gsap.to(entry.state, {
            n: entry.stat.target,
            duration: 1.6,
            delay: pendingMs / 1000 + index * 0.1,
            ease: "power3.out",
            onUpdate: entry.render,
          }),
        );
      });
    };

    const arm = () => {
      trigger = ScrollTrigger.create({
        trigger: row,
        start: "top 92%",
        once: true,
        onEnter: countStats,
      });
    };

    // While the first-visit site intro covers the page, the CSS entrance is paused; wait for it.
    const introFresh = document.documentElement.dataset.introState === "fresh";
    if (introFresh) {
      window.addEventListener(INTRO_COMPLETE_EVENT, arm, { once: true });
    } else {
      arm();
    }

    return () => {
      window.removeEventListener(INTRO_COMPLETE_EVENT, arm);
      trigger?.kill();
      counters.forEach((tween) => tween.kill());
      statValues.forEach((node) => {
        if (node.dataset.value) node.textContent = node.dataset.value;
      });
    };
  }, [service.slug]);

  const [lead, ...rest] = service.proof;

  return (
    // Keyed so moving between service pages remounts the hero and replays the entrance.
    <header key={service.slug} ref={introRef} className="service-hero">
      <div className="service-hero-copy">
        <p data-service-kicker className="projects-kicker">
          {service.kicker}
        </p>
        <h1 className="service-title text-balance">
          {service.titleLines.map((line, lineIndex) => (
            <span key={line} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
              <span data-service-line className="block">
                <Words
                  text={line}
                  offset={service.titleLines
                    .slice(0, lineIndex)
                    .reduce((count, prev) => count + prev.split(" ").length, 0)}
                />
              </span>
            </span>
          ))}
        </h1>
        <p data-service-copy className="service-hero-lede">
          <Words text={service.lede} />
        </p>
        <div data-service-actions data-inline-cta className="mt-8">
          <MagneticButton>
            <Button asChild size="lg">
              <Link href="/contact">Start a conversation</Link>
            </Button>
          </MagneticButton>
        </div>
        <nav
          data-service-siblings
          aria-label="Other services"
          className="service-hero-also"
        >
          <ul>
            {siblings.map((item) => (
              <li key={item.slug}>
                <Link href={servicePath(item.slug)}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div data-service-visual className="service-hero-stage">
        <ServiceVisual slug={service.slug} />
      </div>

      {lead ? (
        <dl className="service-proof-hero">
          <div data-service-proof style={{ "--i": 0 } as CSSProperties}>
            <dt>{lead.label}</dt>
            <dd data-value={lead.value}>{lead.value}</dd>
          </div>
          {rest.map((item, index) => (
            <div
              key={`${item.value}-${item.label}`}
              data-service-proof
              style={{ "--i": index + 1 } as CSSProperties}
            >
              <dt>{item.label}</dt>
              <dd data-value={item.value}>{item.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </header>
  );
}
