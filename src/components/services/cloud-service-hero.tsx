"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import { MagneticButton } from "@/components/motion/magnetic-button";
import { CloudV3Diagram } from "@/components/services/cloud-v3-diagram";
import { Button } from "@/components/ui/button";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { ServicePageContent } from "@/types/content";

import "./cloud-v3.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

type CloudServiceHeroProps = {
  service: ServicePageContent;
};

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

function useCloudHeroMotion<T extends HTMLElement>() {
  const rootRef = useRef<T>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (reduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ease = "expo.out";
    const context = gsap.context(() => {
      const kicker = root.querySelector<HTMLElement>(".cloud-v3-kicker");
      const kickerRule = kicker?.querySelector<HTMLElement>("span");
      const lines = root.querySelectorAll<HTMLElement>(".cloud-hero-line");
      const lede = root.querySelector<HTMLElement>(".cloud-v3-lede");
      const actions = root.querySelectorAll<HTMLElement>(".cloud-v3-actions > *");
      const stage = root.querySelector<HTMLElement>(".cloud-hero-stage");
      const proof = root.querySelector<HTMLElement>(".cloud-v3-proof");

      const ledeSplit = lede
        ? SplitText.create(lede, { type: "words", wordsClass: "cloud-copy-word" })
        : null;

      const intro = gsap.timeline({ defaults: { ease } });

      if (kicker) intro.from(kicker, { opacity: 0, x: -12, duration: 0.9 }, 0);
      if (kickerRule) {
        intro.from(kickerRule, { scaleX: 0, transformOrigin: "left center", duration: 1 }, 0.15);
      }
      if (lines.length) {
        intro.from(
          lines,
          { yPercent: 110, rotate: 1.5, transformOrigin: "left bottom", duration: 1.25, stagger: 0.11 },
          0.1,
        );
      }
      if (ledeSplit) {
        intro.fromTo(
          ledeSplit.words,
          { opacity: 0, yPercent: 50, filter: "blur(6px)" },
          {
            opacity: 1,
            yPercent: 0,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.018,
            clearProps: "filter",
          },
          0.45,
        );
      }
      if (actions.length) {
        intro.from(actions, { opacity: 0, y: 12, duration: 0.9, stagger: 0.1 }, 0.75);
      }
      if (stage) {
        intro.from(stage, { opacity: 0, scale: 0.94, y: 24, duration: 1.6 }, 0.05);
      }

      if (proof) {
        const cells = proof.querySelectorAll<HTMLElement>(":scope > div");
        const values = proof.querySelectorAll<HTMLElement>(".cloud-v3-proof__value");
        const counters = Array.from(values).map((node) => {
          const stat = parseStat(node.dataset.value ?? "");
          if (!stat) return null;
          const state = { n: 0 };
          const render = () => {
            node.textContent = `${stat.prefix}${state.n.toFixed(stat.decimals)}${stat.suffix}`;
          };
          render();
          return { stat, state, render };
        });

        const proofTl = gsap
          .timeline({ paused: true, defaults: { ease } })
          .from(cells, { opacity: 0, y: 18, duration: 1, stagger: 0.1 }, 0);
        counters.forEach((counter, index) => {
          if (!counter) return;
          proofTl.to(
            counter.state,
            {
              n: counter.stat.target,
              duration: 1.6,
              ease: "power3.out",
              onUpdate: counter.render,
            },
            0.1 + index * 0.1,
          );
        });

        ScrollTrigger.create({
          trigger: proof,
          start: "top 92%",
          once: true,
          onEnter: () => proofTl.play(),
        });
      }
    }, root);

    return () => {
      context.revert();
      root.querySelectorAll<HTMLElement>(".cloud-v3-proof__value").forEach((node) => {
        if (node.dataset.value) node.textContent = node.dataset.value;
      });
    };
  }, [reduced]);

  return rootRef;
}

export function CloudServiceHero({ service }: CloudServiceHeroProps) {
  const [lead, second, third] = service.proof;
  const rootRef = useCloudHeroMotion<HTMLDivElement>();

  return (
    <div ref={rootRef} className="cloud-v3-embed">
      <header className="cloud-v3-hero cloud-v3-hero--service">
        <div className="cloud-v3-hero__copy">
          <p className="cloud-v3-kicker">
            <i className="cloud-hero-pulse" aria-hidden />
            {service.metaTitle}
            <span aria-hidden />
          </p>
          <h1 className="service-title text-balance" aria-label={service.titleLines.join(" ")}>
            {service.titleLines.map((line) => (
              <span key={line} className="cloud-hero-line-mask" aria-hidden>
                <span className="cloud-hero-line">{line}</span>
              </span>
            ))}
          </h1>
          <p className="cloud-v3-lede">{service.lede}</p>
          {/* Provider logos already live in the cloud diagram; the copy column carries the actions. */}
          <div className="cloud-v3-actions" data-inline-cta>
            <MagneticButton>
              <Button asChild size="lg">
                <Link href="/contact">Start a conversation</Link>
              </Button>
            </MagneticButton>
            <a href="#cloud-shipped" className="cloud-v3-actions__link">
              See shipped stacks
              <ArrowDown aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="cloud-hero-stage">
          <div className="cloud-hero-aura" aria-hidden />
          <div className="cloud-hero-orbit" aria-hidden />
          <div className="cloud-hero-float">
            <CloudV3Diagram />
          </div>
        </div>
      </header>

      {lead ? (
        <section className="cloud-v3-proof" aria-label="Operated results">
          <div>
            <p>{lead.label}</p>
            <strong className="cloud-v3-proof__value" data-value={lead.value}>
              {lead.value}
            </strong>
          </div>
          {second ? (
            <div>
              {/* Qualifier lives in the label so all three stat columns share one height. */}
              <p>
                {second.label}
                {second.label.toLowerCase().includes("cost") ? " (avg.)" : null}
              </p>
              <strong className="cloud-v3-proof__value" data-value={second.value}>
              {second.value}
            </strong>
            </div>
          ) : null}
          {third ? (
            <div>
              <p>{third.label}</p>
              <strong className="cloud-v3-proof__value" data-value={third.value}>
              {third.value}
            </strong>
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
