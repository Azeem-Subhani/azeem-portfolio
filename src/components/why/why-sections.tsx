import { Fragment, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";

import { MagneticButton } from "@/components/motion/magnetic-button";
import { Button } from "@/components/ui/button";
import {
  areas,
  depthStats,
  differentiators,
  heroLayers,
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
      className={cn(
        "inline-block origin-left font-display font-normal leading-none text-accent transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none",
        className,
      )}
    >
      {counts ? (
        <>
          {/* Numeric figures count on scroll-in (see WhyMotion); word figures just fade in.
              Lower-is-better figures such as timelines count down to the value instead of up.
              The animated copy is hidden from assistive tech, which reads the final value. */}
          <span
            aria-hidden="true"
            data-why-count={value}
            data-why-count-down={lowerIsBetter ? "" : undefined}
            data-why-count-from={lowerIsBetter ? countFrom : undefined}
          >
            {value}
          </span>
          <span className="sr-only">{value}</span>
        </>
      ) : (
        value
      )}
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
      <p className="eyebrow text-[var(--accent-readable)]">
        {kicker}
      </p>
      <h2 className="mt-4 text-balance font-display text-[clamp(2.5rem,4.5vw,3.75rem)] font-normal leading-[0.98]">
        {title}
      </h2>
      {intro ? <p className="mt-5 text-lg leading-8 text-muted-foreground">{intro}</p> : null}
    </div>
  );
}

export const cardClassName =
  "group relative isolate overflow-hidden rounded-lg border border-border bg-surface/60 p-6 transition-[border-color,translate] duration-300 hover:-translate-y-1 hover:border-foreground/25 motion-reduce:transition-none motion-reduce:hover:translate-y-0";

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

/** Same word split as the service heroes, so the shared CSS entrance can stagger via --i. */
function HeroWords({ text, offset = 0 }: { text: string; offset?: number }) {
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

const WHY_TITLE = ["one builder,", "the whole stack"];

/** "Scroll to explore" mouse with a bouncing wheel dot, as on the reference hero. */
export function ScrollCue() {
  return (
    <div data-service-actions aria-hidden="true" className="mt-14 hidden items-center gap-3 lg:flex">
      <span className="flex h-10 w-6 justify-center rounded-full border-2 border-foreground/20 pt-2">
        <span className="why-scroll-dot size-1.5 rounded-full bg-accent" />
      </span>
      <span className="text-xs text-muted-foreground">Scroll to explore</span>
    </div>
  );
}

/**
 * The four layers the headline names, joined by one accent thread: a single owner runs
 * through every layer. Decorative; the lede already says the same thing in words.
 */
function WhyStack() {
  return (
    <div data-service-visual aria-hidden="true" className="relative">
      <p className="mb-5 flex items-center gap-3 font-label text-2xs uppercase tracking-[0.16em] text-muted-foreground">
        <span className="size-1.5 rounded-full bg-accent" />
        One owner, every layer
      </p>
      <ol className="relative grid gap-3">
        {/* The thread sits over the cards but under the layer dots; the pulse travels it. */}
        <span className="absolute inset-y-7 left-[1.95rem] z-[1] w-px bg-accent/35">
          <span className="why-stack-pulse absolute -left-[3px] top-0 size-[7px] rounded-full bg-accent" />
        </span>
        {heroLayers.map((layer, index) => (
          <li
            key={layer.name}
            className="relative flex items-start gap-5 rounded-lg border border-border bg-surface/60 py-4 pl-[1.6rem] pr-6"
          >
            <span className="relative z-[2] mt-1.5 size-[0.7rem] shrink-0 rounded-full border border-accent bg-background" />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-display text-2xl leading-none">{layer.name}</span>
                <span className="meta-label text-[var(--accent-readable)]">
                  0{index + 1}
                </span>
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">{layer.role}</p>
              <p className="mt-2.5 flex flex-wrap gap-1.5">
                {layer.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-2.5 py-0.5 text-[0.7rem] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function WhyHero() {
  return (
    <header className="why-hero grid items-center gap-14 lg:grid-cols-12 lg:gap-x-12">
      <div className="why-hero-copy lg:col-span-7">
        <p
          data-service-kicker
          className="eyebrow text-[var(--accent-readable)]"
        >
          Why work with me
        </p>
        <h1
          className="why-hero-title mt-5 font-display text-[clamp(3.25rem,6.4vw,6rem)] font-normal leading-[0.9]"
          aria-label={WHY_TITLE.join(" ")}
        >
          {WHY_TITLE.map((line, lineIndex) => {
            const accent = lineIndex === WHY_TITLE.length - 1;
            const offset = WHY_TITLE.slice(0, lineIndex).reduce(
              (count, prev) => count + prev.split(" ").length,
              0,
            );
            return (
              <span key={line} aria-hidden className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
                <span className={cn("block", accent && "text-accent")}>
                  <HeroWords text={line} offset={offset} />
                </span>
              </span>
            );
          })}
        </h1>
        <p className="why-hero-lede mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
          <HeroWords text="Product teams hire me when they need the interface, the API, the data, and the cloud built by someone who has shipped all four together, and who stays accountable for how they hold up after launch." />
        </p>
        {/* Same primary and secondary pair as the home hero; joins the shared entrance CSS. */}
        <div data-service-actions data-inline-cta className="mt-10 flex flex-wrap items-center gap-3">
          <MagneticButton>
            <Button asChild size="lg">
              <Link href="/contact">Start a conversation</Link>
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button asChild size="lg" variant="outline">
              <Link href="/projects">View portfolio</Link>
            </Button>
          </MagneticButton>
        </div>
        <ScrollCue />
      </div>
      <div className="mx-auto w-full max-w-[32rem] lg:col-span-5 lg:max-w-none">
        <WhyStack />
      </div>
    </header>
  );
}

export function WhyDifferentiators() {
  return (
    <section className="mt-20 lg:mt-28">
      <SectionHead
        kicker="01 · What is different"
        title="Not an agency, not a handoff"
        intro="One person owns the build end to end, so decisions do not get lost between a designer, a front-end team, and whoever runs the servers."
      />
      {/* Two columns from phone width so six cards do not stack into one long column. */}
      <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {differentiators.map((item) => (
          <li key={item.label} data-why="up" className={cn(cardClassName, "p-4 sm:p-6")}>
            <CardGlow />
            {/* The large numeral style is for figures only; word values read as a label. */}
            {/\d/.test(item.value) ? (
              <Figure value={item.value} lowerIsBetter={item.lowerIsBetter}
                countFrom={item.countFrom}
                className="text-[1.6rem] sm:text-[2.4rem]" />
            ) : (
              <span className="inline-flex rounded-full border border-accent/40 px-3 py-1 eyebrow text-[var(--accent-readable)]">
                {item.value}
              </span>
            )}
            <p className="mt-3 text-base font-semibold leading-snug text-foreground sm:text-lg">{item.label}</p>
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
                className="absolute -left-[0.8rem] top-0 grid size-6 place-items-center rounded-full border border-border bg-background font-label text-[0.7rem] text-muted-foreground"
              >
                {index + 1}
              </span>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-display text-2xl font-normal">{step.title}</h3>
                <span className="font-label text-[0.72rem] uppercase tracking-[0.12em] text-[var(--accent-readable)]">
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
            <p className="mt-3 text-lg font-semibold leading-snug text-foreground">{result.label}</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{result.copy}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function WhyCta() {
  return (
    <section className="mt-28 flex flex-col gap-8 lg:mt-36">
      <div data-why="up" className="max-w-2xl">
        <h2 className="text-balance font-display text-[clamp(2.5rem,4vw,3.75rem)] font-normal leading-[0.98]">
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
