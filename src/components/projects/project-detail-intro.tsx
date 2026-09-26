"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

import { INTRO_COMPLETE_EVENT } from "@/components/motion/site-intro";
import type { Project } from "@/types/content";

gsap.registerPlugin(SplitText);

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
    const chrome = [backLink, path, ...categories, ...metrics].filter(
      (target): target is HTMLElement => Boolean(target),
    );
    let removeIntroListener = () => {};
    let alive = true;
    let titleSplit: SplitText | null = null;
    let summarySplit: SplitText | null = null;
    let titleTl: gsap.core.Timeline | null = null;
    let summaryTl: gsap.core.Timeline | null = null;
    let titleStarted = false;
    let summaryStarted = false;

    const settle = () => {
      titleTl?.kill();
      summaryTl?.kill();
      titleSplit?.revert();
      summarySplit?.revert();
      gsap.killTweensOf(chrome);
      gsap.set(chrome, { clearProps: "all" });
      if (title) gsap.set(title, { clearProps: "opacity" });
      if (summary) gsap.set(summary, { clearProps: "opacity" });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      settle();
      return;
    }

    gsap.set(backLink, { opacity: 0, y: 12 });
    gsap.set(path, { opacity: 0, y: 10 });
    gsap.set(categories, { opacity: 0, y: 12 });
    gsap.set(metrics, { opacity: 0, y: 16 });
    if (title) gsap.set(title, { opacity: 0 });
    if (summary) gsap.set(summary, { opacity: 0 });

    if (title) {
      titleSplit = SplitText.create(title, {
        type: "lines",
        mask: "lines",
        linesClass: "project-title-line",
        autoSplit: true,
        onSplit: (self) => {
          gsap.set(title, { opacity: 1 });
          titleTl = gsap
            .timeline({ paused: true, defaults: { ease: "power4.out" } })
            .fromTo(
              self.lines,
              { yPercent: 112, rotate: 1.25, transformOrigin: "left bottom" },
              { yPercent: 0, rotate: 0, duration: 0.9, stagger: 0.08 },
            );
          if (titleStarted) titleTl.progress(1);
        },
      });
    }

    if (summary) {
      summarySplit = SplitText.create(summary, {
        type: "lines",
        mask: "lines",
        linesClass: "project-copy-line",
        autoSplit: true,
        onSplit: (self) => {
          gsap.set(summary, { opacity: 1 });
          summaryTl = gsap
            .timeline({ paused: true, defaults: { ease: "power4.out" } })
            .fromTo(
              self.lines,
              { yPercent: 110 },
              { yPercent: 0, duration: 0.72, stagger: 0.055 },
            );
          if (summaryStarted) summaryTl.progress(1);
        },
      });
    }

    const play = () => {
      if (!alive) return;

      gsap
        .timeline({
          defaults: { ease: "power4.out" },
          onComplete: () => gsap.set(chrome, { clearProps: "all" }),
        })
        .to(backLink, { opacity: 1, y: 0, duration: 0.5 }, 0)
        .to(path, { opacity: 1, y: 0, duration: 0.45 }, 0.1)
        .to(categories, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, 0.16)
        .add(() => {
          titleStarted = true;
          titleTl?.play(0);
        }, 0.22)
        .add(() => {
          summaryStarted = true;
          summaryTl?.play(0);
        }, 0.58)
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
    <header ref={introRef} className="mx-auto mt-8 max-w-case">
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

      <h1 className="mt-4 max-w-3xl overflow-hidden text-balance font-display text-[clamp(2.25rem,5vw,4rem)] font-normal leading-none">
        <span data-detail-title className="block">
          {project.title}
        </span>
      </h1>
      <p data-detail-summary className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">
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
