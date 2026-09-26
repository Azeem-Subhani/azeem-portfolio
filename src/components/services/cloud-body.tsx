"use client";

import { useState, type KeyboardEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CircleDollarSign,
  Cloud,
  GitPullRequest,
  Radio,
  ServerOff,
  ShieldCheck,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

import {
  BurstStage,
  CodeStage,
  HostStage,
  ShipStage,
  StackStage,
} from "@/components/services/cloud-surfaces";
import { useCloudBodyMotion } from "@/components/services/cloud-motion";
import { ServiceTocGlass } from "@/components/services/service-toc-glass";
import { cn } from "@/lib/utils";
import type { ServicePageContent, ServiceSection } from "@/types/content";

import "@/components/services/cloud-body.css";

const OPERATE_ICONS: LucideIcon[] = [Cloud, ShieldCheck, CircleDollarSign];
const CODE_ICONS: LucideIcon[] = [Workflow, GitPullRequest];
const BURST_ICONS: LucideIcon[] = [ServerOff, CircleDollarSign, Zap, Radio];

const CHAPTERS = [
  { id: "cloud-operate", index: "01", kicker: "Operate", label: "What I run" },
  { id: "cloud-shipped", index: "02", kicker: "Shipped", label: "Work shipped" },
  { id: "cloud-code", index: "03", kicker: "Code", label: "As code" },
  { id: "cloud-burst", index: "04", kicker: "Burst", label: "Serverless" },
  { id: "cloud-hosts", index: "05", kicker: "Hosts", label: "Smaller hosts" },
] as const;

function ofKind<K extends ServiceSection["kind"]>(
  sections: ServiceSection[],
  kind: K,
): Extract<ServiceSection, { kind: K }>[] {
  return sections.filter(
    (section): section is Extract<ServiceSection, { kind: K }> => section.kind === kind,
  );
}

function ChapterHead({
  chapter,
  title,
  copy,
}: {
  chapter: (typeof CHAPTERS)[number];
  title: string;
  copy?: string;
}) {
  return (
    <header className="service-band-head cloud-chapter-head">
      <p className="cloud-chapter-kicker" data-cloud-kicker aria-hidden="true">
        <span className="cloud-chapter-index">{chapter.index}</span>
        <span className="cloud-chapter-rule" />
        <span>{chapter.kicker}</span>
      </p>
      <h2 id={chapter.id} data-cloud-title className="service-band-title">
        {title}
      </h2>
      {copy ? (
        <p data-cloud-copy className="service-band-copy">
          {copy}
        </p>
      ) : null}
    </header>
  );
}

function OperateChapter({
  section,
}: {
  section: Extract<ServiceSection, { kind: "capabilities" }>;
}) {
  return (
    <section aria-labelledby="cloud-operate" data-cloud-chapter className="cloud-chapter">
      <ChapterHead chapter={CHAPTERS[0]} title={section.title} copy={section.copy} />
      <figure data-cloud-stage data-device="stack" className="cloud-stage">
        <div aria-hidden="true">
          <StackStage />
        </div>
        <figcaption className="cloud-stage-caption">
          Cognito, Lambda, DynamoDB, Amplify. One SAM stack on the memorial portal. 500+
          authenticated transactions a day.
        </figcaption>
      </figure>
      <div data-cloud-list className="cloud-operate-grid">
        {section.items.map((item, index) => {
          const Icon = OPERATE_ICONS[index % OPERATE_ICONS.length];
          return (
            <article key={item.title} data-cloud-item data-cloud-card className="cloud-card">
              <span className="cloud-card-icon" aria-hidden="true">
                <Icon strokeWidth={1.75} />
              </span>
              <h3 data-cloud-item-title>{item.title}</h3>
              <p data-cloud-item-copy>{item.copy}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ShipChapter({
  cases,
}: {
  cases: Extract<ServiceSection, { kind: "case" }>[];
}) {
  const [index, setIndex] = useState(0);
  // The first platform arrives with the scroll reveal; later ones fade in on switch.
  const [switched, setSwitched] = useState(false);
  const section = cases[index] ?? cases[0];

  const select = (next: number, tablist?: HTMLElement) => {
    setIndex(next);
    setSwitched(true);
    tablist
      ?.querySelectorAll<HTMLButtonElement>("[data-cloud-platform]")
      [next]?.focus();
  };

  return (
    <section aria-labelledby="cloud-shipped" data-cloud-chapter className="cloud-chapter">
      <ChapterHead
        chapter={CHAPTERS[1]}
        title="Work I have shipped"
        copy="Three production stacks. Pick a platform. The hops stay on the page, not behind a click."
      />
      <div data-cloud-stage data-device="ship" className="cloud-stage">
        <div className="cloud-ship">
          <div
            className="cloud-ship-tabs"
            role="tablist"
            aria-label="Shipped platforms"
            onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
              if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                event.preventDefault();
                select((index + 1) % cases.length, event.currentTarget);
              } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                event.preventDefault();
                select((index - 1 + cases.length) % cases.length, event.currentTarget);
              }
            }}
          >
            {cases.map((item, itemIndex) => (
              <button
                key={item.kicker}
                type="button"
                role="tab"
                id={`cloud-ship-tab-${itemIndex}`}
                data-cloud-platform={item.kicker}
                aria-selected={itemIndex === index}
                aria-controls="cloud-ship-panel"
                tabIndex={itemIndex === index ? 0 : -1}
                className={cn("cloud-ship-tab", itemIndex === index && "is-selected")}
                onClick={() => {
                  if (itemIndex === index) return;
                  setIndex(itemIndex);
                  setSwitched(true);
                }}
              >
                {item.kicker}
              </button>
            ))}
          </div>
          <div id="cloud-ship-panel" role="tabpanel" aria-labelledby={`cloud-ship-tab-${index}`}>
            <ShipStage
              key={section.kicker}
              kicker={section.kicker}
              entry={section.entry}
              hops={section.path}
              animate={switched}
            />
          </div>
        </div>
      </div>
      <div data-cloud-list className="cloud-case" key={section.kicker}>
        <article className="cloud-card cloud-case-story" data-cloud-item data-cloud-card>
          <p className="cloud-case-client">{section.client}</p>
          <h3 data-cloud-item-title>{section.title}</h3>
          <p data-cloud-item-copy>
            <strong>The bind. </strong>
            {section.challenge}
          </p>
          <p>
            <strong>What shipped. </strong>
            {section.solution}
          </p>
        </article>
        <ul className="cloud-case-results">
          {section.results.map((item) => (
            <li key={`${item.value}-${item.label}`} data-cloud-item data-cloud-card className="cloud-card">
              <p data-cloud-item-title>{item.value}</p>
              <span data-cloud-item-copy>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CodeChapter({
  section,
}: {
  section: Extract<ServiceSection, { kind: "platforms" }>;
}) {
  return (
    <section aria-labelledby="cloud-code" data-cloud-chapter className="cloud-chapter">
      <ChapterHead chapter={CHAPTERS[2]} title={section.title} copy={section.copy} />
      <div data-cloud-stage data-device="code" className="cloud-stage">
        <CodeStage />
      </div>
      <div data-cloud-list className="cloud-code-grid">
        {section.items.map((item, index) => {
          const Icon = CODE_ICONS[index % CODE_ICONS.length];
          return (
            <article key={item.title} data-cloud-item data-cloud-card className="cloud-card">
              <span className="cloud-card-icon" aria-hidden="true">
                <Icon strokeWidth={1.75} />
              </span>
              <h3 data-cloud-item-title>
                {item.title}
                {item.meta ? (
                  <span className="cloud-card-meta"> {item.meta}</span>
                ) : null}
              </h3>
              <p data-cloud-item-copy>{item.copy}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function BurstChapter({
  section,
}: {
  section: Extract<ServiceSection, { kind: "features" }>;
}) {
  return (
    <section aria-labelledby="cloud-burst" data-cloud-chapter className="cloud-chapter">
      <ChapterHead chapter={CHAPTERS[3]} title={section.title} copy={section.copy} />
      <div data-cloud-stage data-device="burst" className="cloud-stage">
        <BurstStage />
      </div>
      <div data-cloud-list className="cloud-burst-grid">
        {section.items.map((item, index) => {
          const Icon = BURST_ICONS[index % BURST_ICONS.length];
          return (
            <article key={item.title} data-cloud-item data-cloud-card className="cloud-card">
              <span className="cloud-card-icon" aria-hidden="true">
                <Icon strokeWidth={1.75} />
              </span>
              <h3 data-cloud-item-title>{item.title}</h3>
              <p data-cloud-item-copy>{item.copy}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function HostsChapter({
  section,
}: {
  section: Extract<ServiceSection, { kind: "coverage" }>;
}) {
  return (
    <section aria-labelledby="cloud-hosts" data-cloud-chapter className="cloud-chapter">
      <ChapterHead chapter={CHAPTERS[4]} title={section.title} copy={section.copy} />
      <div data-cloud-stage data-device="hosts" className="cloud-stage">
        <HostStage groups={section.groups} />
      </div>
    </section>
  );
}

export function CloudServiceBody({ service }: { service: ServicePageContent }) {
  const [capabilities] = ofKind(service.sections, "capabilities");
  const cases = ofKind(service.sections, "case");
  const [platforms] = ofKind(service.sections, "platforms");
  const [features] = ofKind(service.sections, "features");
  const [coverage] = ofKind(service.sections, "coverage");
  const rootRef = useCloudBodyMotion<HTMLDivElement>();

  return (
    <div ref={rootRef} className="cloud-body">
      <nav aria-label="On this page" className="cloud-toc relative">
        <ServiceTocGlass />
        <span className="cloud-toc-label" aria-hidden="true">
          On this page
        </span>
        <ol>
          {CHAPTERS.map((chapter) => (
            <li key={chapter.id}>
              <a href={`#${chapter.id}`}>
                <span aria-hidden="true">{chapter.index}</span> {chapter.label}
              </a>
            </li>
          ))}
        </ol>
        <Link
          href="/projects/memorial-planning"
          className="cloud-toc-link"
          aria-label="See the stack: memorial portal"
        >
          Memorial portal <ArrowRight aria-hidden="true" />
        </Link>
      </nav>
      <div className="cloud-body-scroll overflow-x-clip">
        {capabilities ? <OperateChapter section={capabilities} /> : null}
        {cases.length ? <ShipChapter cases={cases} /> : null}
        {platforms ? <CodeChapter section={platforms} /> : null}
        {features ? <BurstChapter section={features} /> : null}
        {coverage ? <HostsChapter section={coverage} /> : null}
      </div>
    </div>
  );
}
