"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { gsap } from "gsap";

import { INTRO_COMPLETE_EVENT } from "@/components/motion/site-intro";
import type { Project } from "@/types/content";

type ProjectDetailIntroProps = {
  project: Project;
};

export function ProjectDetailIntro({ project }: ProjectDetailIntroProps) {
  const introRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const intro = introRef.current;
    if (!intro) return;

    const backLink = intro.querySelector<HTMLElement>("[data-detail-back]");
    const path = intro.querySelector<HTMLElement>("[data-detail-path]");
    const categories = intro.querySelectorAll<HTMLElement>("[data-detail-category]");
    const title = intro.querySelector<HTMLElement>("[data-detail-title]");
    const summary = intro.querySelector<HTMLElement>("[data-detail-summary]");
    const metrics = intro.querySelectorAll<HTMLElement>("[data-detail-metric]");
    const targets = [backLink, path, title, summary, ...categories, ...metrics].filter(
      (target): target is HTMLElement => Boolean(target),
    );
    let removeIntroListener = () => {};
    let alive = true;

    const settle = () => {
      gsap.killTweensOf(targets);
      gsap.set(targets, { clearProps: "all" });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      settle();
      return;
    }

    gsap.set(backLink, { opacity: 0, y: 12 });
    gsap.set(path, { opacity: 0, y: 10 });
    gsap.set(categories, { opacity: 0, y: 12 });
    gsap.set(title, {
      yPercent: 112,
      rotate: 1.25,
      transformOrigin: "left bottom",
    });
    gsap.set(summary, { opacity: 0, y: 20 });
    gsap.set(metrics, { opacity: 0, y: 16 });

    const play = () => {
      if (!alive) return;

      gsap
        .timeline({
          defaults: { ease: "power4.out" },
          onComplete: settle,
        })
        .to(backLink, { opacity: 1, y: 0, duration: 0.5 }, 0)
        .to(path, { opacity: 1, y: 0, duration: 0.45 }, 0.1)
        .to(categories, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, 0.16)
        .to(title, { yPercent: 0, rotate: 0, duration: 0.9 }, 0.22)
        .to(summary, { opacity: 1, y: 0, duration: 0.72 }, 0.58)
        .to(metrics, { opacity: 1, y: 0, duration: 0.58, stagger: 0.08 }, 0.7);
    };

    if (document.documentElement.dataset.introState === "fresh") {
      window.addEventListener(INTRO_COMPLETE_EVENT, play, { once: true });
      removeIntroListener = () =>
        window.removeEventListener(INTRO_COMPLETE_EVENT, play);
    } else {
      play();
    }

    return () => {
      alive = false;
      removeIntroListener();
      settle();
    };
  }, []);

  return (
    <header ref={introRef} className="mt-8 max-w-3xl">
      <Link
        href="/projects"
        data-detail-back
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        All projects
      </Link>

      {project.productPath ? (
        <p data-detail-path className="mt-8 font-mono text-[0.7rem] text-muted-foreground">
          {project.productPath}
        </p>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        {project.categories.map((category) => (
          <span
            key={category}
            data-detail-category
            className="rounded-full border border-border px-3 py-1 text-[0.7rem] font-medium text-muted-foreground"
          >
            {category}
          </span>
        ))}
      </div>

      <h1 className="mt-4 overflow-hidden text-balance font-display text-[clamp(2.25rem,5vw,4rem)] font-normal leading-none">
        <span data-detail-title className="block will-change-transform">
          {project.title}
        </span>
      </h1>
      <p data-detail-summary className="mt-6 text-lg leading-8 text-muted-foreground">
        {project.summary}
      </p>

      <dl className="mt-8 flex flex-wrap gap-8">
        {project.metrics.map((metric) => (
          <div key={metric.label} data-detail-metric>
            <dt className="font-display text-[1.625rem] font-normal tracking-tight text-accent">
              {metric.value}
            </dt>
            <dd className="mt-0.5 text-[0.78rem] text-muted-foreground">
              {metric.label}
            </dd>
          </div>
        ))}
      </dl>
    </header>
  );
}

