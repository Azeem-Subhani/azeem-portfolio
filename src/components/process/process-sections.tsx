import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowDown, Check } from "lucide-react";

import { MagneticButton } from "@/components/motion/magnetic-button";
import { Button } from "@/components/ui/button";
import { Figure } from "@/components/why/why-sections";
import {
  changePaths,
  changeSteps,
  closureDeliverables,
  environments,
  preProjectSteps,
  preProjectTimeline,
  rolloverNote,
  sprintBars,
  sprintRituals,
  type SprintActivity,
  type SprintBar,
} from "@/content/process";
import { cn } from "@/lib/utils";

const sectionClassName = "mt-28 scroll-mt-28 lg:mt-36";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;

/** Section heading without an eyebrow: the title and intro carry the section on their own. */
function Head({ title, intro }: { title: ReactNode; intro?: string }) {
  return (
    <div data-why="up" data-why-distance="20" className="max-w-2xl">
      <h2 className="text-balance font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-normal leading-[0.95]">
        {title}
      </h2>
      {intro ? <p className="mt-5 text-lg leading-8 text-muted-foreground">{intro}</p> : null}
    </div>
  );
}

export function ProcessHero() {
  return (
    <header className="max-w-4xl">
      <h1
        aria-label="a process you can see into"
        className="font-display text-[clamp(3.25rem,8vw,6.5rem)] font-normal leading-[0.9]"
      >
        {/* Bottom padding keeps descenders inside the mask while the lines rise. */}
        <span aria-hidden="true" className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
          <span data-process-line className="block">
            a process you
          </span>
        </span>
        <span aria-hidden="true" className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
          <span data-process-line className="block text-accent">
            can see into
          </span>
        </span>
      </h1>
      <p data-why="hero" className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
        Scope agreed before the first commit, a working build every two weeks, and nothing in
        front of your users until you approve it. Here is each step.
      </p>
      <div data-why="hero" data-inline-cta className="mt-10 w-fit">
        <MagneticButton>
          <Button asChild size="lg">
            <a href="#before-the-build">
              See how a build runs
              <ArrowDown aria-hidden="true" />
            </a>
          </Button>
        </MagneticButton>
      </div>
    </header>
  );
}

export function ProcessPreProject() {
  return (
    <section id="before-the-build" className={sectionClassName}>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        {/* The heading and timeline stay pinned while the four steps scroll past. */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Head
            title="Alignment before the first commit"
            intro="Scope, timeline, and expectations are settled before any code is written, so the build starts from one shared plan."
          />
          <div data-why="up" className="mt-10 max-w-xs border-t border-border pt-6">
            <Figure
              value={preProjectTimeline.value}
              lowerIsBetter={preProjectTimeline.lowerIsBetter}
              className="text-[3rem]"
            />
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{preProjectTimeline.label}</p>
          </div>
        </div>
        <ol className="divide-y divide-border border-y border-border">
          {preProjectSteps.map((step, index) => (
            <li key={step.title} data-why="up" className="grid gap-3 py-8 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6">
              <span aria-hidden="true" className="font-display text-4xl leading-none text-accent">
                {index + 1}
              </span>
              <div>
                <h3 className="font-display text-[1.75rem] font-normal leading-tight">{step.title}</h3>
                <p className="mt-2 max-w-xl leading-7 text-muted-foreground">{step.copy}</p>
                <ul className="mt-5 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
                  {step.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// Planning and the UAT deploy bookend the sprint, so they carry the solid accent.
const barClassName: Record<SprintActivity, string> = {
  planning: "bg-accent",
  build: "bg-accent/25",
  review: "bg-accent/55",
  qa: "bg-accent/55",
  deploy: "bg-accent",
};

/** Screen-reader day range for a bar, e.g. "Tue week 1 to Tue week 2". */
function dayRange({ start, end }: SprintBar) {
  const name = (i: number) => `${DAYS[i % 5]} week ${Math.floor(i / 5) + 1}`;
  return start === end ? name(start) : `${name(start)} to ${name(end)}`;
}

/** Faint day columns behind a track; the week boundary is drawn in the accent. */
function DayLines() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 grid grid-cols-10">
      {Array.from({ length: 10 }, (_, i) => (
        <span
          key={i}
          className={cn(
            "border-l",
            i === 0 ? "border-transparent" : i === 5 ? "border-accent/40" : "border-border/70",
          )}
        />
      ))}
    </span>
  );
}

const trackRow = "grid gap-x-6 sm:grid-cols-[9rem_minmax(0,1fr)]";

function SprintChart() {
  return (
    <figure data-why="up" data-process-sprint className="mt-12 rounded-[var(--shape-radius-lg)] border border-border bg-surface/40 p-5 sm:p-8">
      <figcaption className="sr-only">
        A typical two-week sprint: planning on Monday of week 1, development through Tuesday of
        week 2, then code review, testing, and a UAT deploy on the final Friday.
      </figcaption>

      <div aria-hidden="true" className={trackRow}>
        <span className="hidden sm:block" />
        <div className="grid grid-cols-10 text-xs">
          <span className="col-span-5 pb-2 text-muted-foreground">Week 1</span>
          <span className="col-span-5 border-l border-accent/40 pb-2 pl-2 text-muted-foreground">Week 2</span>
          {Array.from({ length: 10 }, (_, i) => (
            <span
              key={i}
              data-process-day
              className="pb-2 pl-1 text-muted-foreground/80 transition-colors duration-200 data-active:text-accent sm:pl-2"
            >
              <span className="sm:hidden">{DAYS[i % 5].charAt(0)}</span>
              <span className="hidden sm:inline">{DAYS[i % 5]}</span>
            </span>
          ))}
        </div>
      </div>

      <ol>
        {sprintBars.map((bar) => (
          <li key={bar.label} className={cn(trackRow, "items-center gap-y-1 py-1.5 sm:py-0")}>
            <span className="text-sm text-foreground">
              {bar.label}
              <span className="sr-only">, {dayRange(bar)}</span>
            </span>
            <div className="relative grid h-8 grid-cols-10 items-center sm:h-11">
              <DayLines />
              <span
                data-process-bar
                data-start={bar.start}
                data-end={bar.end}
                className={cn("relative mx-1 h-4 rounded-full sm:h-6", barClassName[bar.activity])}
                style={{ gridColumn: `${bar.start + 1} / ${bar.end + 2}` }}
              />
              {/* Scroll playhead; stays hidden unless ProcessMotion drives it. */}
              <span
                aria-hidden="true"
                data-process-playhead
                className="pointer-events-none absolute inset-y-0 left-0 -ml-px w-0.5 rounded-full bg-accent opacity-0"
              />
            </div>
          </li>
        ))}
      </ol>

      <div className={cn(trackRow, "mt-6 gap-y-4 border-t border-border pt-6")}>
        <p className="text-sm text-muted-foreground">At sprint close</p>
        <ul className="grid gap-5 sm:grid-cols-3">
          {closureDeliverables.map((item) => (
            <li key={item.title}>
              <p className="font-medium text-foreground">{item.title}</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.copy}</p>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}

export function ProcessSprints() {
  return (
    <section className={sectionClassName}>
      <Head
        title="Two weeks, one working build"
        intro="Every sprint runs from a Monday to the Friday after next and ends with features you can test in UAT. This is a typical one."
      />
      <SprintChart />
      <ul className="mt-12 grid gap-8 sm:grid-cols-3">
        {sprintRituals.map((ritual) => (
          <li key={ritual.title} data-why="up">
            <h3 className="font-display text-2xl font-normal">{ritual.title}</h3>
            <p className="mt-2 leading-7 text-muted-foreground">{ritual.copy}</p>
          </li>
        ))}
      </ul>
      <p data-why="up" className="mt-10 max-w-3xl border-l-2 border-accent pl-5 leading-7 text-muted-foreground">
        <span className="font-medium text-foreground">When a sprint slips. </span>
        {rolloverNote}
      </p>
    </section>
  );
}

/** Pill marking the approval step between UAT and production. */
function SignOffPill({ className, ...rest }: { className?: string; "data-process-gate"?: boolean }) {
  return (
    <span
      {...rest}
      className={cn(
        "whitespace-nowrap rounded-full border border-accent bg-background px-3 py-1 text-xs font-medium text-accent",
        className,
      )}
    >
      Your sign-off
    </span>
  );
}

export function ProcessPipeline() {
  return (
    <section className={sectionClassName}>
      <Head
        title="Four environments, one gate"
        intro="Every change is tested more than once on its way to your users, and the last step waits for your approval."
      />
      <ol data-process-route className="mt-14 grid gap-10 md:grid-cols-4 md:gap-6">
        {environments.map((env, index) => {
          const last = index === environments.length - 1;
          // The hop from UAT to production is the one that needs the client's approval.
          const gate = index === environments.length - 2;
          return (
            <li key={env.name} data-process-station className="relative pl-10 md:pl-0 md:pt-12">
              <span
                aria-hidden="true"
                data-process-dot
                className={cn(
                  "absolute left-0 top-0.5 size-6 rounded-full border-2",
                  last ? "border-accent bg-accent" : "border-accent/60 bg-background",
                )}
              />
              {!last ? (
                <span
                  aria-hidden="true"
                  data-process-link
                  className={cn(
                    "absolute -bottom-8 left-[11px] top-9 w-px md:-right-4 md:bottom-auto md:left-8 md:top-[13px] md:h-px md:w-auto",
                    gate ? "bg-accent" : "bg-accent/35",
                  )}
                />
              ) : null}
              {gate ? (
                // Centered on the link (it runs from 2rem to 1rem past the column). The wrapper
                // owns the translate so the animated pill inside only ever gets a scale.
                <span className="absolute left-[calc(50%+1.5rem)] top-[13px] hidden -translate-x-1/2 -translate-y-1/2 md:block">
                  <SignOffPill className="block" data-process-gate />
                </span>
              ) : null}
              <h3 data-process-text className="font-display text-3xl font-normal leading-none">
                {env.name}
              </h3>
              <p data-process-text className="mt-2 text-sm text-[var(--accent-readable)]">
                {env.role}
              </p>
              <p data-process-text className="mt-3 leading-7 text-muted-foreground">
                {env.copy}
              </p>
              {gate ? <SignOffPill className="mt-4 inline-block md:hidden" data-process-gate /> : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export function ProcessChanges() {
  return (
    <section className={sectionClassName}>
      <Head
        title="When the scope changes"
        intro="New ideas are welcome mid-build. Each one is sized and agreed before it touches the sprint."
      />
      <ol className="mt-12 grid gap-8 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4">
        {changeSteps.map((step, index) => (
          <li key={step.title} data-why="up">
            <span aria-hidden="true" className="font-display text-3xl leading-none text-accent">
              {index + 1}
            </span>
            <h3 className="mt-3 font-medium text-foreground">{step.title}</h3>
            <p className="mt-1 leading-7 text-muted-foreground">{step.copy}</p>
          </li>
        ))}
      </ol>
      {/* One split panel: the 1px gap over the border color draws the divider. */}
      <div
        data-why="up"
        className="mt-14 grid gap-px overflow-hidden rounded-[var(--shape-radius-lg)] border border-border bg-border md:grid-cols-2"
      >
        {changePaths.map((path) => (
          <div key={path.title} className={cn("p-6 sm:p-8", path.formal ? "bg-surface" : "bg-background")}>
            <h3 className="font-display text-3xl font-normal">{path.title}</h3>
            <p className="mt-3 max-w-md leading-7 text-muted-foreground">{path.copy}</p>
            <p className="mt-6 text-sm text-muted-foreground">For example</p>
            <ul className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-foreground">
              {path.examples.map((example) => (
                <li key={example}>{example}</li>
              ))}
            </ul>
            <p className="mt-6 flex items-center gap-2 border-t border-border pt-5 text-sm font-medium text-foreground">
              <Check aria-hidden="true" className="size-4 shrink-0 text-accent" />
              {path.outcome}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProcessCta() {
  return (
    <section className="mt-28 flex flex-col gap-8 lg:mt-36 lg:flex-row lg:items-end lg:justify-between">
      <div data-why="up" className="max-w-2xl">
        <h2 className="text-balance font-display text-[clamp(2rem,4vw,3.75rem)] font-normal leading-[0.98]">
          Tell me what you want to build.
        </h2>
        <p className="mt-5 leading-7 text-muted-foreground">
          I will come back with how the first two weeks would look for your project.
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
