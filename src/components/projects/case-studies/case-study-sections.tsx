import type { ReactNode } from "react";

import { ProjectStack } from "@/components/projects/project-stack";
import type { Project } from "@/types/content";

/*
 * Shared text sections for the case-study pages. Every block sits in the same centered
 * max-w-case column as ProjectDetailIntro, so left edges line up down the page, and every
 * page uses the same section names: Problem, Solution, Stack, Outcomes.
 */

const headingClassName = "font-display text-2xl font-normal";
const bodyClassName = "mt-4 leading-7 text-muted-foreground";

export function CaseStudyNote({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto mt-6 max-w-case">
      <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
        {children}
      </p>
    </div>
  );
}

/** Paragraphs for a Brief column: plain strings become body paragraphs. */
function Paragraphs({ items }: { items: ReactNode[] }) {
  return (
    <>
      {items.map((item, index) =>
        typeof item === "string" ? (
          <p key={index} className={bodyClassName}>
            {item}
          </p>
        ) : (
          <div key={index}>{item}</div>
        ),
      )}
    </>
  );
}

export function CaseStudyPoints({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="border-l-2 border-accent/40 pl-4 text-sm leading-6 text-muted-foreground"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

type CaseStudyBriefProps = {
  problem: ReactNode[];
  solution: ReactNode[];
  /** Approach bullets listed under the solution. */
  points?: string[];
};

export function CaseStudyBrief({
  problem,
  solution,
  points,
}: CaseStudyBriefProps) {
  return (
    <div className="mx-auto mt-20 grid max-w-case gap-12 lg:grid-cols-2 lg:gap-16">
      <section>
        <h2 className={headingClassName}>Problem</h2>
        <Paragraphs items={problem} />
      </section>
      <section>
        <h2 className={headingClassName}>Solution</h2>
        <Paragraphs items={solution} />
        {points?.length ? <CaseStudyPoints items={points} /> : null}
      </section>
    </div>
  );
}

type CaseStudySectionProps = {
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
};

/** A titled block with an optional lead paragraph and a device stage below it. */
export function CaseStudySection({
  title,
  intro,
  children,
}: CaseStudySectionProps) {
  return (
    <section className="mx-auto mt-20 max-w-case">
      <h2 className={headingClassName}>{title}</h2>
      {intro ? <p className={`${bodyClassName} max-w-2xl`}>{intro}</p> : null}
      {children ? <div className="mt-10">{children}</div> : null}
    </section>
  );
}

export function CaseStudyStack({
  items,
  intro,
}: {
  items: string[];
  intro?: ReactNode;
}) {
  return (
    <section className="mx-auto mt-20 max-w-case">
      <h2 className={headingClassName}>Stack</h2>
      {intro ? <p className={`${bodyClassName} max-w-2xl`}>{intro}</p> : null}
      <ProjectStack items={items} />
    </section>
  );
}

export function CaseStudyOutcomes({ project }: { project: Project }) {
  return (
    <section className="mx-auto mt-20 max-w-case">
      <h2 className={headingClassName}>Outcomes</h2>
      <dl className="mt-8 grid gap-8 sm:grid-cols-2">
        {project.metrics.map((metric) => (
          <div key={metric.label} className="border-l-2 border-accent/40 pl-5">
            <dt className="font-display text-[1.625rem] font-normal tracking-tight text-accent">
              {metric.value}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-muted-foreground">
              {metric.label}
            </dd>
          </div>
        ))}
      </dl>
      <ul className="mt-10 max-w-3xl space-y-3">
        {project.outcomes.map((item) => (
          <li key={item} className="flex gap-3 text-muted-foreground">
            <span
              aria-hidden="true"
              className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
            />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
