import type { ReactNode } from "react";
import Link from "next/link";

import { MagneticButton } from "@/components/motion/magnetic-button";
import { Button } from "@/components/ui/button";
import {
  areas,
  depthStats,
  differentiators,
  results,
  steps,
  timeline,
} from "@/content/why";
import { cn } from "@/lib/utils";

export function Figure({
  value,
  lowerIsBetter,
  countFrom,
  className,
}: {
  value: string;
  lowerIsBetter?: boolean;
  countFrom?: string;
  className?: string;
}) {
  const counts = /\d/.test(value);
  return (
    <span
      // Numeric figures count on scroll-in (see WhyMotion); word figures just fade in.
      // Lower-is-better figures such as timelines count down to the value instead of up.
      data-why-count={counts ? value : undefined}
      data-why-count-down={counts && lowerIsBetter ? "" : undefined}
      data-why-count-from={counts && lowerIsBetter ? countFrom : undefined}
      className={cn(
        "inline-block origin-left font-display font-normal leading-none text-accent transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none",
        className,
      )}
    >
      {value}
    </span>
  );
}

export function SectionHead({
  kicker,
  title,
  intro,
}: {
  kicker: string;
  title: ReactNode;
  intro?: string;
}) {
  return (
    <div data-why="up" data-why-distance="20" className="max-w-2xl">
      <p className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-[var(--accent-readable)]">
        {kicker}
      </p>
      <h2 className="mt-4 text-balance font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-normal leading-[0.95]">
        {title}
      </h2>
      {intro ? <p className="mt-5 text-lg leading-8 text-muted-foreground">{intro}</p> : null}
    </div>
  );
}

export const cardClassName =
  "group relative isolate overflow-hidden rounded-[var(--shape-radius-lg)] border border-border bg-surface/60 p-6 transition-[border-color,translate] duration-300 hover:-translate-y-1 hover:border-foreground/25 motion-reduce:transition-none motion-reduce:hover:translate-y-0";

/** Soft accent glow that fades in behind a card on hover. */
export function CardGlow() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -inset-px -z-10 rounded-[inherit] opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
      style={{
        background:
          "radial-gradient(60% 70% at 20% 0%, color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%)",
      }}
    />
  );
}

/** "Scroll to explore" mouse with a bouncing wheel dot, as on the reference hero. */
export function ScrollCue() {
  return (
    <div data-why="hero" aria-hidden="true" className="mt-14 hidden items-center gap-3 lg:flex">
      <span className="flex h-10 w-6 justify-center rounded-full border-2 border-foreground/20 pt-2">
        <span className="why-scroll-dot size-1.5 rounded-full bg-accent" />
      </span>
      <span className="text-xs text-muted-foreground">Scroll to explore</span>
    </div>
  );
}

export function WhyHero() {
  return (
    <header className="max-w-4xl">
      <p
        data-why="hero"
        className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-[var(--accent-readable)]"
      >
        Why work with me
      </p>
      <h1 data-why="hero" className="mt-5 font-display text-[clamp(3.25rem,8vw,6.5rem)] font-normal leading-[0.9]">
        one builder,
        <br />
        <span className="text-accent">the whole stack</span>
      </h1>
      <p data-why="hero" className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
        Product teams hire me when they need the interface, the API, the data, and the cloud
        built by someone who has shipped all four together, and who stays accountable for how
        they hold up after launch.
      </p>
      <ScrollCue />
    </header>
  );
}

export function WhyDifferentiators() {
  return (
    <section className="mt-28 lg:mt-36">
      <SectionHead
        kicker="01 · What is different"
        title="Not an agency, not a handoff"
        intro="One person owns the build end to end, so decisions do not get lost between a designer, a front-end team, and whoever runs the servers."
      />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {differentiators.map((item) => (
          <li key={item.label} data-why="up" className={cardClassName}>
            <CardGlow />
            <Figure value={item.value} lowerIsBetter={item.lowerIsBetter}
              countFrom={item.countFrom}
              className="text-[2.4rem]" />
            <p className="mt-3 font-medium text-foreground">{item.label}</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.copy}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function WhyProcess() {
  return (
    <section className="mt-28 lg:mt-36">
      <SectionHead
        kicker="02 · How a build runs"
        title="Working software early, then every week"
        intro="Scope is agreed on paper up front, then the build runs on previews. You see the product running from the first sprint."
      />
      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
        <ol className="relative border-l border-border">
          {steps.map((step, index) => (
            <li key={step.title} data-why="side" className="relative pb-10 pl-8 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute -left-[0.8rem] top-0 grid size-6 place-items-center rounded-full border border-border bg-background font-mono text-[0.7rem] text-muted-foreground"
              >
                {index + 1}
              </span>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-display text-2xl font-normal">{step.title}</h3>
                <span className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-[var(--accent-readable)]">
                  {step.timing}
                </span>
              </div>
              <p className="mt-2 max-w-xl leading-7 text-muted-foreground">{step.copy}</p>
            </li>
          ))}
        </ol>
        <aside data-why="up" className={cn(cardClassName, "self-start")}>
          <CardGlow />
          <p className="text-sm text-muted-foreground">{timeline.label}</p>
          <Figure value={timeline.value} lowerIsBetter={timeline.lowerIsBetter}
            countFrom={timeline.countFrom}
            className="mt-3 block text-[2.6rem]" />
          <p className="mt-4 text-sm leading-6 text-muted-foreground">{timeline.copy}</p>
        </aside>
      </div>
    </section>
  );
}

export function WhyDepth() {
  return (
    <section className="mt-28 lg:mt-36">
      <SectionHead
        kicker="03 · Depth across the stack"
        title="Built at every layer"
        intro="The same person who designs the screen also writes the resolver behind it, the table it reads, and the pipeline that deploys it."
      />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2">
        {areas.map((area) => (
          <li key={area.title} data-why="up" className={cardClassName}>
            <CardGlow />
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-2xl font-normal">{area.title}</h3>
              <p className="shrink-0 text-right">
                <Figure value={area.value} className="text-[2rem]" />
                <span className="mt-1 block text-xs text-muted-foreground">{area.label}</span>
              </p>
            </div>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${area.title} tools`}>
              {area.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <dl data-why="up" className="mt-12 grid grid-cols-2 gap-y-8 border-y border-border py-8 lg:grid-cols-4">
        {depthStats.map((stat) => (
          <div key={stat.label} data-why="scale" className="flex flex-col-reverse gap-2 pr-4">
            <dt className="text-sm text-muted-foreground">{stat.label}</dt>
            <dd>
                <Figure value={stat.value} className="text-[2.2rem]" />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function WhyResults() {
  return (
    <section className="mt-28 lg:mt-36">
      <SectionHead
        kicker="04 · Results"
        title="Measured after launch, not at the demo"
        intro="The numbers that matter are the ones a product shows months later: traffic, speed, cost, and whether it stayed up."
      />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((result) => (
          <li key={result.label} data-why="up" className={cardClassName}>
            <CardGlow />
              <Figure value={result.value} lowerIsBetter={result.lowerIsBetter}
                countFrom={result.countFrom}
                className="text-[2.6rem]" />
            <p className="mt-3 font-medium text-foreground">{result.label}</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{result.copy}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function WhyCta() {
  return (
    <section
      className="mt-28 flex flex-col gap-8 lg:mt-36 lg:flex-row lg:items-end lg:justify-between"
    >
      <div data-why="up" className="max-w-2xl">
        <h2 className="text-balance font-display text-[clamp(2rem,4vw,3.75rem)] font-normal leading-[0.98]">
          Skip the pitch deck. Let&apos;s look at your product.
        </h2>
        <p className="mt-5 leading-7 text-muted-foreground">
          Tell me what you are building and where it is stuck. I will come back with how I would
          approach it.
        </p>
      </div>
      <div data-inline-cta data-why="up" data-why-distance="20" className="w-fit">
        <MagneticButton>
          <Button asChild size="lg">
            <Link href="/contact">Start a conversation</Link>
          </Button>
        </MagneticButton>
      </div>
    </section>
  );
}
