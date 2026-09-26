import { Fragment, type ComponentType } from "react";
import Link from "next/link";
import { ArrowRight, Check, Compass, ShieldCheck } from "lucide-react";

import { IconMark, toneColors } from "@/components/industries/industry-icons";
import { IndustryLedger } from "@/components/industries/industry-ledger";
import { IndustrySolutionTabs } from "@/components/industries/industry-solution-tabs";
import { IndustryStackLoop } from "@/components/industries/industry-stack-loop";
import { MotionPauseButton } from "@/components/motion/motion-pause-button";
import { SolutionLink } from "@/components/industries/solution-link";
import { IndustryCare } from "@/components/industries/visuals/industry-care";
import { IndustryCheckout } from "@/components/industries/visuals/industry-checkout";
import { IndustryCourse } from "@/components/industries/visuals/industry-course";
import { IndustryListings } from "@/components/industries/visuals/industry-listings";
import { IndustryRoutes } from "@/components/industries/visuals/industry-routes";
import { IndustryStream } from "@/components/industries/visuals/industry-stream";
import { IndustryTenants } from "@/components/industries/visuals/industry-tenants";
import { MagneticButton } from "@/components/motion/magnetic-button";
import ClickSpark from "@/components/react-bits/ClickSpark";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { Button } from "@/components/ui/button";
import { CardGlow, Figure, ScrollCue, cardClassName } from "@/components/why/why-sections";
import { cn } from "@/lib/utils";
import type { IndustryHeroVisual, IndustryPageContent } from "@/types/content";

/*
 * Section layout follows the reference industry pages (hero, challenges, solutions,
 * stack, compliance, closer) in the site's own cream system. Each page picks a variant
 * per section (IndustryLayout) so no two industries read as the same template. Motion
 * hooks (data-im*) are played by IndustryMotion; see that file for the map.
 */

const heroVisuals: Record<IndustryHeroVisual, ComponentType> = {
  ledger: IndustryLedger,
  checkout: IndustryCheckout,
  tenants: IndustryTenants,
  routes: IndustryRoutes,
  stream: IndustryStream,
  care: IndustryCare,
  course: IndustryCourse,
  listings: IndustryListings,
};

const index2 = (index: number) => String(index + 1).padStart(2, "0");

/** Splits a heading into masked words so each can rise on its own beat. */
function Words({ text }: { text: string }) {
  return text.split(" ").map((word, index) => (
    <Fragment key={`${word}-${index}`}>
      <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
        <span data-im-word className="inline-block will-change-transform">
          {word}
        </span>
      </span>{" "}
    </Fragment>
  ));
}

function SectionHead({
  kicker,
  title,
  intro,
  centered = false,
}: {
  kicker: string;
  title: string;
  intro: string;
  centered?: boolean;
}) {
  return (
    <div data-im-head className={cn("max-w-2xl", centered && "mx-auto text-center")}>
      <p
        data-im-kicker
        className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-[var(--accent-readable)]"
      >
        {kicker}
      </p>
      <h2 className="mt-4 text-balance font-display text-[clamp(2.25rem,4.5vw,3.75rem)] font-normal leading-[0.95]">
        <Words text={title} />
      </h2>
      <p data-im-intro className="mt-5 text-lg leading-8 text-muted-foreground">
        {intro}
      </p>
    </div>
  );
}

function FeatureChecks({ title, features }: { title: string; features: string[] }) {
  return (
    <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2" aria-label={`${title} features`}>
      {features.map((feature) => (
        <li key={feature} data-im-check className="flex items-start gap-2.5 text-sm text-foreground/85">
          <Check
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-[var(--accent-readable)]"
            strokeWidth={2}
          />
          {feature}
        </li>
      ))}
    </ul>
  );
}

type SectionProps = { industry: IndustryPageContent };

// ---- Backdrop & hero -----------------------------------------------------------------

/** Soft accent light that drifts behind the hero, plus the grid the service pages use. */
export function IndustryBackdrop({ industry }: SectionProps) {
  const centered = industry.layout.hero === "centered";
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[46rem] overflow-hidden">
      <div className="service-grid-backdrop absolute inset-x-0 top-0 h-[32rem]" />
      <div
        className={cn(
          "industry-hero-glow absolute top-10 size-[42rem] rounded-full",
          centered ? "left-1/2 -translate-x-1/2" : industry.layout.hero === "split-reverse" ? "-left-40" : "-right-40",
        )}
      />
      <div className="industry-hero-glow industry-hero-glow--alt absolute -left-56 top-72 size-[30rem] rounded-full" />
    </div>
  );
}

function HeroHeadline({ industry, large }: { industry: IndustryPageContent; large: boolean }) {
  return (
    <h1
      className={cn(
        "mt-5 font-display font-normal leading-[0.9]",
        large ? "text-[clamp(3.1rem,8vw,6.25rem)]" : "text-[clamp(3.1rem,7vw,5.6rem)]",
      )}
    >
      <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
        <span data-im="hero-line" className="block will-change-transform">
          {industry.title}
        </span>
      </span>
      <span className="block overflow-hidden pb-[0.22em] -mb-[0.12em]">
        <span data-im="hero-line" className="relative inline-block text-accent will-change-transform">
          {industry.titleAccent}
          <svg
            data-im="underline"
            aria-hidden="true"
            viewBox="0 0 300 12"
            preserveAspectRatio="none"
            className="absolute -bottom-[0.14em] left-0 h-[0.16em] w-full overflow-visible"
          >
            <path
              d="M2 8.5C58 3 120 2.5 180 5.5S262 10 298 4"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </span>
      </span>
    </h1>
  );
}

export function IndustryHero({ industry }: SectionProps) {
  const { hero } = industry.layout;
  const centered = hero === "centered";
  const Visual = heroVisuals[industry.heroVisual];

  const copy = (
    <div className={cn(centered && "mx-auto max-w-4xl text-center", hero === "split-reverse" && "lg:order-2")}>
      <p
        data-im="hero-fade"
        className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-[var(--accent-readable)]"
      >
        {industry.kicker}
      </p>
      <HeroHeadline industry={industry} large={centered} />
      <p
        data-im="hero-fade"
        className={cn("mt-8 max-w-2xl text-lg leading-8 text-muted-foreground", centered && "mx-auto")}
      >
        {industry.lede}
      </p>
      <div data-im="hero-fade" className={cn("mt-10 flex flex-wrap gap-3", centered && "justify-center")}>
        <Button asChild size="lg" className="group/solutions">
          <a href="#solutions">
            {industry.evidence === "approach" ? "See the approach" : "See the solutions"}
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover/solutions:translate-x-1"
            />
          </a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/contact">Start a conversation</Link>
        </Button>
      </div>
      {centered ? null : (
        <div data-im="hero-fade">
          <ScrollCue />
        </div>
      )}
    </div>
  );

  return (
    <header
      className={cn(
        "grid items-center gap-14",
        hero === "split" && "lg:grid-cols-[minmax(0,1fr)_25rem] lg:gap-12",
        hero === "split-reverse" && "lg:grid-cols-[25rem_minmax(0,1fr)] lg:gap-16",
      )}
    >
      {copy}
      <div
        data-im="hero-visual"
        data-pausable=""
        className={cn(
          "w-full max-w-md justify-self-center",
          centered ? "max-w-xl" : "lg:max-w-none",
          hero === "split-reverse" && "lg:order-1",
        )}
      >
        <Visual />
        <div className="mt-3 flex justify-end">
          <MotionPauseButton />
        </div>
      </div>
    </header>
  );
}

// ---- Proof band, or the approach note ------------------------------------------------

export function IndustryProof({ industry }: SectionProps) {
  if (industry.evidence === "approach") {
    return (
      <aside
        data-im-card
        aria-label="About this page"
        className="mt-20 flex flex-col gap-4 rounded-[var(--shape-radius-lg)] border border-dashed border-accent/50 bg-surface/50 p-6 sm:flex-row sm:items-start sm:gap-5 lg:mt-28"
      >
        <span
          data-im-icon
          aria-hidden="true"
          className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-[var(--accent-readable)]"
        >
          <Compass className="size-5" strokeWidth={1.6} />
        </span>
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[var(--accent-readable)]">
            Approach page
          </p>
          <p className="mt-2 max-w-3xl leading-7 text-foreground/85">{industry.approachNote}</p>
        </div>
      </aside>
    );
  }

  return (
    <dl data-im-proof className="relative mt-20 grid grid-cols-2 gap-y-8 py-8 lg:mt-28 lg:grid-cols-4">
      <span data-im-rule aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-border" />
      {industry.proof.map((stat) => (
        <div key={stat.label} data-im-stat className="group flex flex-col-reverse gap-2 pr-4">
          <dt className="text-sm text-muted-foreground">{stat.label}</dt>
          <dd>
            <Figure value={stat.value} className="text-[2.2rem]" />
          </dd>
        </div>
      ))}
      <span data-im-rule aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-border" />
    </dl>
  );
}

// ---- Challenges ------------------------------------------------------------------------

export function IndustryChallenges({ industry }: SectionProps) {
  const spotlight = toneColors[industry.tone].spotlight;
  const { challenges: layout } = industry.layout;

  return (
    <section data-im-section className="mt-28 lg:mt-36">
      <SectionHead
        kicker="01 · The hard part"
        title={industry.challengesTitle}
        intro={industry.challengesIntro}
      />

      {layout === "cards" ? (
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {industry.challenges.map((challenge) => (
            <li key={challenge.title} data-im-card>
              <SpotlightCard spotlightColor={spotlight} className={cn(cardClassName, "h-full")}>
                <CardGlow />
                <IconMark icon={challenge.icon} />
                <h3 className="mt-6 font-display text-2xl font-normal">{challenge.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{challenge.copy}</p>
              </SpotlightCard>
            </li>
          ))}
        </ul>
      ) : null}

      {layout === "list" ? (
        // Numbered rows: a big numeral, the problem, and its icon on one line.
        <ol className="mt-12 border-b border-border">
          {industry.challenges.map((challenge, index) => (
            <li
              key={challenge.title}
              data-im-card
              className="group grid grid-cols-[3.5rem_minmax(0,1fr)] items-start gap-x-5 gap-y-3 border-t border-border py-7 transition-colors duration-300 hover:bg-surface/40 sm:grid-cols-[5rem_minmax(0,1fr)_auto] sm:px-3"
            >
              <span
                aria-hidden="true"
                className="font-display text-5xl leading-none text-accent transition-transform duration-500 group-hover:translate-x-1 sm:text-6xl"
              >
                {index2(index)}
              </span>
              <div>
                <h3 className="font-display text-2xl font-normal sm:text-[1.75rem]">{challenge.title}</h3>
                <p className="mt-2 max-w-2xl leading-7 text-muted-foreground">{challenge.copy}</p>
              </div>
              <IconMark icon={challenge.icon} className="hidden sm:grid" />
            </li>
          ))}
        </ol>
      ) : null}

      {layout === "columns" ? (
        // Open columns with an accent rule that fills on hover; no card surface.
        <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {industry.challenges.map((challenge) => (
            <li key={challenge.title} data-im-card className="group relative pt-6">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-border" />
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-0.5 w-10 bg-accent transition-[width] duration-500 ease-out group-hover:w-full motion-reduce:transition-none"
              />
              <IconMark icon={challenge.icon} />
              <h3 className="mt-5 font-display text-[1.6rem] font-normal leading-tight">{challenge.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{challenge.copy}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

// ---- Solutions -------------------------------------------------------------------------

export function IndustrySolutions({ industry }: SectionProps) {
  const spotlight = toneColors[industry.tone].spotlight;
  const { solutions: layout } = industry.layout;
  const kicker = industry.evidence === "approach" ? "02 · The approach" : "02 · What I build";

  return (
    <section id="solutions" data-im-section className="mt-28 scroll-mt-32 lg:mt-36">
      <SectionHead kicker={kicker} title={industry.solutionsTitle} intro={industry.solutionsIntro} />

      {layout === "stacked" ? (
        <div className="relative mt-12 lg:pl-12">
          {/* Progress rail: fills as the visitor reads down the solutions. */}
          <span
            data-im-rail
            aria-hidden="true"
            className="absolute bottom-4 left-4 top-4 hidden w-px bg-border lg:block"
          >
            <span data-im-rail-fill className="absolute inset-0 origin-top bg-accent" />
          </span>
          <ul className="grid gap-4">
            {industry.solutions.map((solution, index) => (
              <li key={solution.title} data-im-card>
                <SpotlightCard
                  spotlightColor={spotlight}
                  className={cn(cardClassName, "grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-12 lg:p-8")}
                >
                  <CardGlow />
                  <div className="flex items-start gap-4 lg:flex-col">
                    <IconMark icon={solution.icon} />
                    <div>
                      <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
                        {index2(index)}
                      </p>
                      <h3 className="mt-1 font-display text-[1.75rem] font-normal leading-tight">
                        {solution.title}
                      </h3>
                    </div>
                  </div>
                  <div>
                    <p className="max-w-2xl leading-7 text-muted-foreground">{solution.copy}</p>
                    <FeatureChecks title={solution.title} features={solution.features} />
                    <SolutionLink link={solution.link} className="mt-7" />
                  </div>
                </SpotlightCard>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {layout === "alternating" ? (
        // Copy and feature panel swap sides row by row, joined by a large numeral.
        <ol className="mt-14 grid gap-16 lg:gap-24">
          {industry.solutions.map((solution, index) => {
            const flip = index % 2 === 1;
            return (
              <li key={solution.title} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                <div data-im-card className={cn(flip && "lg:order-2")}>
                  <div className="flex items-center gap-4">
                    <span aria-hidden="true" className="font-display text-6xl leading-none text-accent/70">
                      {index2(index)}
                    </span>
                    <IconMark icon={solution.icon} />
                  </div>
                  <h3 className="mt-6 font-display text-[clamp(1.9rem,3vw,2.4rem)] font-normal leading-tight">
                    {solution.title}
                  </h3>
                  <p className="mt-4 max-w-xl leading-7 text-muted-foreground">{solution.copy}</p>
                  <SolutionLink link={solution.link} className="mt-6" />
                </div>
                <div data-im-card className={cn(flip && "lg:order-1")}>
                  <SpotlightCard spotlightColor={spotlight} className={cn(cardClassName, "lg:p-8")}>
                    <CardGlow />
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
                      What it includes
                    </p>
                    <FeatureChecks title={solution.title} features={solution.features} />
                  </SpotlightCard>
                </div>
              </li>
            );
          })}
        </ol>
      ) : null}

      {layout === "tabs" ? (
        <div className="mt-12">
          <IndustrySolutionTabs solutions={industry.solutions} spotlight={spotlight} />
        </div>
      ) : null}
    </section>
  );
}

// ---- Stack -----------------------------------------------------------------------------

export function IndustryStack({ industry }: SectionProps) {
  const spotlight = toneColors[industry.tone].spotlight;

  if (industry.layout.stack === "rows") {
    // Definition rows: group on the left, tools on the right, hairlines between.
    return (
      <section data-im-section className="mt-28 lg:mt-36">
        <SectionHead kicker="03 · Stack" title="The tools behind the work" intro={industry.stackIntro} />
        <dl className="mt-12 border-b border-border">
          {industry.stack.map((group) => (
            <div
              key={group.title}
              data-im-card
              className="grid gap-4 border-t border-border py-6 sm:grid-cols-[14rem_minmax(0,1fr)] sm:items-center"
            >
              <dt className="font-display text-2xl font-normal">{group.title}</dt>
              <dd>
                <ul className="flex flex-wrap gap-2" aria-label={`${group.title} tools`}>
                  {group.items.map((item) => (
                    <li
                      key={item}
                      data-im-tag
                      className="rounded-full border border-border bg-surface/50 px-3.5 py-1.5 text-sm text-foreground/80 transition-colors duration-300 hover:border-accent/50 hover:text-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </section>
    );
  }

  const allTools = industry.stack.flatMap((group) => group.items);
  return (
    <section data-im-section className="mt-28 lg:mt-36">
      <SectionHead kicker="03 · Stack" title="The tools behind the work" intro={industry.stackIntro} />
      <IndustryStackLoop items={allTools} label={`Tools used in ${industry.label} builds`} />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {industry.stack.map((group) => (
          <li key={group.title} data-im-card>
            <SpotlightCard spotlightColor={spotlight} className={cn(cardClassName, "h-full")}>
              <CardGlow />
              <h3 className="font-display text-2xl font-normal">{group.title}</h3>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${group.title} tools`}>
                {group.items.map((item) => (
                  <li
                    key={item}
                    data-im-tag
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-colors duration-300 hover:border-accent/50 hover:text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ---- Practices -------------------------------------------------------------------------

export function IndustryPractices({ industry }: SectionProps) {
  const spotlight = toneColors[industry.tone].spotlight;
  const kicker = `04 · ${industry.practicesKicker ?? "Security & compliance"}`;

  const note = (
    <p data-im-head className="mt-8 flex max-w-3xl items-start gap-3 text-sm leading-6 text-muted-foreground">
      <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[var(--accent-readable)]" />
      <span data-im-intro>{industry.practicesNote}</span>
    </p>
  );

  const scan = (
    // One sweep over the grid as it arrives, like a check running across the controls.
    <span
      data-im-scan
      aria-hidden="true"
      className="industry-scan pointer-events-none absolute inset-x-0 top-0 z-10 h-28 -translate-y-full opacity-0"
    />
  );

  if (industry.layout.practices === "checklist") {
    // One panel, two columns of controls that tick in one after another.
    return (
      <section data-im-section className="mt-28 lg:mt-36">
        <SectionHead kicker={kicker} title={industry.practicesTitle} intro={industry.practicesIntro} />
        <div data-im-scan-zone className="relative mt-12 overflow-hidden rounded-[var(--shape-radius-lg)]">
          <div data-im-card>
            <SpotlightCard spotlightColor={spotlight} className={cn(cardClassName, "p-2 hover:translate-y-0 sm:p-4")}>
              <ul className="grid md:grid-cols-2">
                {industry.practices.map((practice) => (
                  <li
                    key={practice.title}
                    data-im-check
                    className="flex gap-4 rounded-xl p-4 transition-colors duration-300 hover:bg-background/60"
                  >
                    <span
                      aria-hidden="true"
                      className="grid size-8 shrink-0 place-items-center rounded-full bg-accent/15 text-[var(--accent-readable)]"
                    >
                      <Check className="size-4" strokeWidth={2.5} />
                    </span>
                    <div>
                      <h3 className="font-medium text-foreground">{practice.title}</h3>
                      <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{practice.copy}</p>
                      <p className="mt-2.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-[var(--accent-readable)]">
                        {practice.supports}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </div>
          {scan}
        </div>
        {note}
      </section>
    );
  }

  return (
    <section data-im-section className="mt-28 lg:mt-36">
      <SectionHead kicker={kicker} title={industry.practicesTitle} intro={industry.practicesIntro} />
      <div data-im-scan-zone className="relative mt-12">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industry.practices.map((practice) => (
            <li key={practice.title} data-im-card>
              <SpotlightCard spotlightColor={spotlight} className={cn(cardClassName, "h-full")}>
                <CardGlow />
                <IconMark icon={practice.icon} />
                <h3 className="mt-6 font-medium text-foreground">{practice.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{practice.copy}</p>
                <p
                  data-im-after
                  className="mt-5 flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-[var(--accent-readable)]"
                >
                  <ShieldCheck aria-hidden="true" className="size-3.5" strokeWidth={2} />
                  {practice.supports}
                </p>
              </SpotlightCard>
            </li>
          ))}
        </ul>
        {scan}
      </div>
      {note}
    </section>
  );
}

// ---- Closer ----------------------------------------------------------------------------

export function IndustryCta({ industry }: SectionProps) {
  return (
    <section className="relative mt-28 lg:mt-36">
      <div
        aria-hidden="true"
        className="industry-hero-glow industry-hero-glow--alt pointer-events-none absolute -bottom-24 right-0 size-[26rem] rounded-full"
      />
      <div
        data-im-head
        className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
      >
        <div className="max-w-2xl">
          <h2 className="text-balance font-display text-[clamp(2rem,4vw,3.75rem)] font-normal leading-[0.98]">
            <Words text={industry.ctaTitle} />
          </h2>
          <p data-im-intro className="mt-5 leading-7 text-muted-foreground">
            {industry.ctaCopy}
          </p>
        </div>
        <div data-inline-cta data-im-intro className="w-fit">
          <ClickSpark
            sparkColor={toneColors[industry.tone].hex}
            sparkRadius={28}
            sparkCount={10}
            className="relative inline-flex"
          >
            <MagneticButton>
              <Button asChild size="lg">
                <Link href="/contact">Start a conversation</Link>
              </Button>
            </MagneticButton>
          </ClickSpark>
        </div>
      </div>
    </section>
  );
}
