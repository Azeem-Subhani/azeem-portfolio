"use client";

import Link from "next/link";
import {
  ArrowRight,
  Columns3,
  DatabaseZap,
  Gauge,
  GitCompare,
  Radio,
  ShieldCheck,
  Table2,
  Warehouse,
  Workflow,
  type LucideIcon,
} from "lucide-react";

import {
  MigrationStage,
  PipelineStage,
  SourcesStage,
  WarehouseStage,
} from "@/components/services/data-surfaces";
import { useDataBodyMotion } from "@/components/services/data-motion";
import { ServiceTocGlass } from "@/components/services/service-toc-glass";
import type { ServicePageContent, ServiceSection } from "@/types/content";

import "@/components/services/data-body.css";

const JOB_ICONS: LucideIcon[] = [
  Workflow,
  GitCompare,
  Radio,
  Warehouse,
  ShieldCheck,
  Gauge,
];
const WAREHOUSE_ICONS: LucideIcon[] = [Table2, DatabaseZap, Columns3];

const CHAPTERS = [
  { id: "data-jobs", index: "01", kicker: "Work", label: "What I do" },
  { id: "data-migration", index: "02", kicker: "Migration", label: "Zero downtime" },
  { id: "data-warehouse", index: "03", kicker: "Warehouse", label: "Analytical copy" },
  { id: "data-sources", index: "04", kicker: "Sources", label: "What I connect" },
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
    <header className="service-band-head data-chapter-head">
      <p className="data-chapter-kicker" data-data-kicker aria-hidden="true">
        <span className="data-chapter-index">{chapter.index}</span>
        <span className="data-chapter-rule" />
        <span>{chapter.kicker}</span>
      </p>
      <h2 id={chapter.id} data-data-title className="service-band-title">
        {title}
      </h2>
      {copy ? (
        <p data-data-copy className="service-band-copy">
          {copy}
        </p>
      ) : null}
    </header>
  );
}

function JobsChapter({
  section,
}: {
  section: Extract<ServiceSection, { kind: "capabilities" }>;
}) {
  return (
    <section aria-labelledby="data-jobs" data-data-chapter className="data-chapter">
      <ChapterHead chapter={CHAPTERS[0]} title={section.title} copy={section.copy} />
      <figure data-data-stage data-device="pipeline" className="data-stage">
        <PipelineStage />
        <figcaption className="data-stage-caption">
          <span>Writes</span>
          <span aria-hidden="true">→</span>
          <span>One record</span>
          <span aria-hidden="true">→</span>
          <span>Analytical copy</span>
        </figcaption>
      </figure>
      <div data-data-list className="data-jobs-grid">
        {section.items.map((item, index) => {
          const Icon = JOB_ICONS[index % JOB_ICONS.length];
          return (
            <article key={item.title} data-data-card className="data-card">
              <span className="data-card-icon" aria-hidden="true">
                <Icon strokeWidth={1.75} />
              </span>
              <h3 data-data-item-title>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function MigrationChapter({
  section,
}: {
  section: Extract<ServiceSection, { kind: "steps" }>;
}) {
  return (
    <section
      aria-labelledby="data-migration"
      data-data-chapter
      className="data-chapter"
    >
      <ChapterHead chapter={CHAPTERS[1]} title={section.title} copy={section.copy} />
      <div data-data-stage data-device="migrate" className="data-stage">
        <MigrationStage />
      </div>
      <ol data-data-list className="data-steps">
        {section.items.map((item, index) => (
          <li key={item.title} data-data-step className="data-step">
            <span className="data-step-mark" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function WarehouseChapter({
  section,
}: {
  section: Extract<ServiceSection, { kind: "platforms" }>;
}) {
  return (
    <section
      aria-labelledby="data-warehouse"
      data-data-chapter
      className="data-chapter"
    >
      <ChapterHead chapter={CHAPTERS[2]} title={section.title} copy={section.copy} />
      <div data-data-stage data-device="warehouse" className="data-stage">
        <WarehouseStage />
      </div>
      <div data-data-list className="data-warehouse-grid">
        {section.items.map((item, index) => {
          const Icon = WAREHOUSE_ICONS[index % WAREHOUSE_ICONS.length];
          return (
            <article key={item.title} data-data-card className="data-card">
              <span className="data-card-icon" aria-hidden="true">
                <Icon strokeWidth={1.75} />
              </span>
              <h3 data-data-item-title>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function SourcesChapter({
  section,
}: {
  section: Extract<ServiceSection, { kind: "platforms" }>;
}) {
  return (
    <section aria-labelledby="data-sources" data-data-chapter className="data-chapter">
      <ChapterHead chapter={CHAPTERS[3]} title={section.title} copy={section.copy} />
      <div data-data-stage data-device="sources" className="data-stage">
        <SourcesStage items={section.items} />
      </div>
    </section>
  );
}

export function DataServiceBody({ service }: { service: ServicePageContent }) {
  const [capabilities] = ofKind(service.sections, "capabilities");
  const [steps] = ofKind(service.sections, "steps");
  const [warehouses, sources] = ofKind(service.sections, "platforms");
  const rootRef = useDataBodyMotion<HTMLDivElement>();

  return (
    <div ref={rootRef} className="data-body">
      <nav aria-label="On this page" className="data-toc relative">
        <ServiceTocGlass />
        <span className="data-toc-label" aria-hidden="true">
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
        <Link href="/projects/memorial-planning" className="data-toc-link">
          See the data: payment portal <ArrowRight aria-hidden="true" />
        </Link>
      </nav>
      <div className="data-body-scroll overflow-x-clip">
        {capabilities ? <JobsChapter section={capabilities} /> : null}
        {steps ? <MigrationChapter section={steps} /> : null}
        {warehouses ? <WarehouseChapter section={warehouses} /> : null}
        {sources ? <SourcesChapter section={sources} /> : null}
      </div>
    </div>
  );
}
