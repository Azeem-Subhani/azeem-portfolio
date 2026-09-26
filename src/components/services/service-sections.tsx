"use client";

import { useState } from "react";

import {
  FocusList,
  HopPath,
  SegmentedControl,
} from "@/components/services/service-controls";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import type {
  ServiceItem,
  ServicePageContent,
  ServiceProof,
  ServiceSection,
} from "@/types/content";

function SectionHeading({
  id,
  title,
  copy,
}: {
  id: string;
  title: string;
  copy?: string;
}) {
  return (
    <header className="service-band-head">
      <h2 id={id} className="service-band-title">
        {title}
      </h2>
      {copy ? <p className="service-band-copy">{copy}</p> : null}
    </header>
  );
}

function ProofStage({ items }: { items: ServiceProof[] }) {
  const [lead, ...rest] = items;
  if (!lead) return null;

  return (
    <dl className="service-proof-hero">
      <div>
        <dt>{lead.label}</dt>
        <dd>{lead.value}</dd>
      </div>
      {rest.map((item) => (
        <div key={`${item.value}-${item.label}`}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function itemId(item: ServiceItem, index: number) {
  return `${item.title}-${index}`;
}

function Capabilities({
  section,
  headingId,
}: {
  section: Extract<ServiceSection, { kind: "capabilities" | "features" }>;
  headingId: string;
}) {
  const options = section.items.map((item, index) => ({
    id: itemId(item, index),
    title: item.title,
  }));
  const [activeId, setActiveId] = useState(options[0]?.id ?? "");
  const active =
    section.items[options.findIndex((option) => option.id === activeId)] ??
    section.items[0];

  return (
    <section aria-labelledby={headingId} className="service-band">
      <SectionHeading id={headingId} title={section.title} copy={section.copy} />
      <div className="service-split">
        <FocusList
          label={section.title}
          items={options}
          value={activeId}
          onChange={setActiveId}
        />
        <div className="service-split-detail" aria-live="polite">
          <h3>{active.title}</h3>
          <p>{active.copy}</p>
        </div>
      </div>
    </section>
  );
}

function Compare({
  section,
  headingId,
}: {
  section: Extract<ServiceSection, { kind: "compare" }>;
  headingId: string;
}) {
  const [topic, setTopic] = useState(section.rows[0]?.label ?? "");
  const row = section.rows.find((item) => item.label === topic) ?? section.rows[0];
  const reduced = usePrefersReducedMotion();

  return (
    <section aria-labelledby={headingId} className="service-band">
      <SectionHeading id={headingId} title={section.title} copy={section.copy} />
      <SegmentedControl
        label="Compare by"
        options={section.rows.map((item) => ({
          id: item.label,
          label: item.label,
        }))}
        value={topic}
        onChange={setTopic}
      />
      <div
        className={cn("service-compare-stage", reduced && "is-static")}
        key={topic}
      >
        <article>
          <p className="service-compare-kicker">{section.left.subtitle}</p>
          <h3>{section.left.title}</h3>
          <p>{row.left}</p>
        </article>
        <article className="is-mine">
          <p className="service-compare-kicker">{section.right.subtitle}</p>
          <h3>{section.right.title}</h3>
          <p>{row.right}</p>
        </article>
      </div>
    </section>
  );
}

function Process({
  section,
  headingId,
}: {
  section: Extract<ServiceSection, { kind: "process" }>;
  headingId: string;
}) {
  const [side, setSide] = useState<"left" | "right">("right");
  const column = side === "left" ? section.left : section.right;
  const reduced = usePrefersReducedMotion();

  return (
    <section aria-labelledby={headingId} className="service-band">
      <SectionHeading id={headingId} title={section.title} copy={section.copy} />
      <SegmentedControl
        label="Process"
        options={[
          { id: "left", label: section.left.title },
          { id: "right", label: section.right.title },
        ]}
        value={side}
        onChange={(id) => setSide(id as "left" | "right")}
      />
      <div className={cn("service-process-stage", reduced && "is-static")} key={side}>
        <p className="service-split-detail-copy">{column.copy}</p>
        <ol>
          {column.steps.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {step}
            </li>
          ))}
        </ol>
      </div>
      <ul className="service-outcome-row">
        {section.outcomes.map((item) => (
          <li key={item.title}>
            <p>{item.title}</p>
            <span>{item.copy}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Metrics({
  section,
  headingId,
}: {
  section: Extract<ServiceSection, { kind: "metrics" }>;
  headingId: string;
}) {
  return (
    <section aria-labelledby={headingId} className="service-band">
      <SectionHeading id={headingId} title={section.title} copy={section.copy} />
      <ProofStage items={section.items} />
    </section>
  );
}

function Steps({
  section,
  headingId,
}: {
  section: Extract<ServiceSection, { kind: "steps" }>;
  headingId: string;
}) {
  const [index, setIndex] = useState(0);
  const active = section.items[index] ?? section.items[0];
  const reduced = usePrefersReducedMotion();

  return (
    <section aria-labelledby={headingId} className="service-band">
      <SectionHeading id={headingId} title={section.title} copy={section.copy} />
      <SegmentedControl
        label={section.title}
        options={section.items.map((item, itemIndex) => ({
          id: String(itemIndex),
          label: item.title,
        }))}
        value={String(index)}
        onChange={(id) => setIndex(Number(id))}
      />
      <div className={cn("service-split-detail", reduced && "is-static")} key={index}>
        <h3>{active.title}</h3>
        <p>{active.copy}</p>
      </div>
    </section>
  );
}

function CaseDeck({
  cases,
  headingId,
}: {
  cases: Extract<ServiceSection, { kind: "case" }>[];
  headingId: string;
}) {
  const [index, setIndex] = useState(0);
  const section = cases[index] ?? cases[0];
  const [hop, setHop] = useState(section.path[0]?.name ?? "");
  const activeHop =
    section.path.find((item) => item.name === hop) ?? section.path[0];
  const reduced = usePrefersReducedMotion();

  const showCase = (id: string) => {
    const next = cases.findIndex((item) => item.kicker === id);
    const nextCase = cases[next] ?? cases[0];
    setIndex(next);
    setHop(nextCase.path[0]?.name ?? "");
  };

  return (
    <section aria-labelledby={headingId} className="service-band">
      <SectionHeading
        id={headingId}
        title={cases.length > 1 ? "Work I have shipped" : section.title}
        copy={
          cases.length > 1
            ? "Pick a platform. Click a hop. That is the stack, not a slide."
            : undefined
        }
      />
      {cases.length > 1 ? (
        <SegmentedControl
          label="Platform"
          options={cases.map((item) => ({
            id: item.kicker,
            label: item.kicker,
          }))}
          value={section.kicker}
          onChange={showCase}
        />
      ) : (
        <p className="service-case-kicker">{section.kicker}</p>
      )}
      {cases.length > 1 ? (
        <p className="service-case-name">{section.title}</p>
      ) : null}
      <p className="service-case-client">{section.client}</p>
      <p className="service-case-challenge">{section.challenge}</p>
      <div className="service-case-stage">
        <HopPath hops={section.path} active={hop} onChange={setHop} />
        <div
          className={cn("service-split-detail", reduced && "is-static")}
          key={`${section.kicker}-${activeHop?.name}`}
          aria-live="polite"
        >
          <h3>{activeHop?.name}</h3>
          <p>{activeHop?.copy}</p>
        </div>
      </div>
      <ProofStage items={section.results} />
    </section>
  );
}

function Platforms({
  section,
  headingId,
}: {
  section: Extract<ServiceSection, { kind: "platforms" }>;
  headingId: string;
}) {
  const [active, setActive] = useState(section.items[0]?.title ?? "");
  const item =
    section.items.find((entry) => entry.title === active) ?? section.items[0];
  const reduced = usePrefersReducedMotion();

  return (
    <section aria-labelledby={headingId} className="service-band">
      <SectionHeading id={headingId} title={section.title} copy={section.copy} />
      <SegmentedControl
        label={section.title}
        options={section.items.map((entry) => ({
          id: entry.title,
          label: entry.title,
        }))}
        value={active}
        onChange={setActive}
      />
      <div className={cn("service-split-detail", reduced && "is-static")} key={active}>
        <h3>
          {item.title}
          {item.meta ? <span className="service-meta">{item.meta}</span> : null}
        </h3>
        <p>{item.copy}</p>
      </div>
    </section>
  );
}

function Coverage({
  section,
  headingId,
}: {
  section: Extract<ServiceSection, { kind: "coverage" }>;
  headingId: string;
}) {
  const [active, setActive] = useState(section.groups[0]?.title ?? "");
  const group =
    section.groups.find((entry) => entry.title === active) ?? section.groups[0];
  const reduced = usePrefersReducedMotion();

  return (
    <section aria-labelledby={headingId} className="service-band">
      <SectionHeading id={headingId} title={section.title} copy={section.copy} />
      <SegmentedControl
        label={section.title}
        options={section.groups.map((entry) => ({
          id: entry.title,
          label: entry.title,
        }))}
        value={active}
        onChange={setActive}
      />
      <div className={cn("service-coverage-stage", reduced && "is-static")} key={active}>
        <div className="service-split-detail">
          <h3>{group.title}</h3>
          <p>{group.copy}</p>
        </div>
        <ul>
          {group.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function renderSection(section: ServiceSection, index: number) {
  const headingId = `service-section-${index}`;

  switch (section.kind) {
    case "capabilities":
    case "features":
      return <Capabilities key={headingId} section={section} headingId={headingId} />;
    case "compare":
      return <Compare key={headingId} section={section} headingId={headingId} />;
    case "process":
      return <Process key={headingId} section={section} headingId={headingId} />;
    case "metrics":
      return <Metrics key={headingId} section={section} headingId={headingId} />;
    case "steps":
      return <Steps key={headingId} section={section} headingId={headingId} />;
    case "case":
      return <CaseDeck key={headingId} cases={[section]} headingId={headingId} />;
    case "platforms":
      return <Platforms key={headingId} section={section} headingId={headingId} />;
    case "coverage":
      return <Coverage key={headingId} section={section} headingId={headingId} />;
  }
}

function clusterSections(sections: ServiceSection[]) {
  const clusters: Array<ServiceSection | Extract<ServiceSection, { kind: "case" }>[]> =
    [];

  for (const section of sections) {
    if (section.kind !== "case") {
      clusters.push(section);
      continue;
    }

    const last = clusters[clusters.length - 1];
    if (Array.isArray(last)) {
      last.push(section);
    } else {
      clusters.push([section]);
    }
  }

  return clusters;
}

export function ServiceSections({ service }: { service: ServicePageContent }) {
  return (
    <div className="service-body">
      {clusterSections(service.sections).map((cluster, index) =>
        Array.isArray(cluster) ? (
          <CaseDeck
            key={`service-cases-${index}`}
            cases={cluster}
            headingId={`service-section-${index}`}
          />
        ) : (
          renderSection(cluster, index)
        ),
      )}
    </div>
  );
}
