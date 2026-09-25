"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  MigrationStage,
  PipelineStage,
  SourcesStage,
  WarehouseStage,
} from "@/components/services/data-surfaces";
import { useDataBodyMotion } from "@/components/services/data-motion";
import { ServiceTocGlass } from "@/components/services/service-toc-glass";
import { cn } from "@/lib/utils";
import type { ServicePageContent, ServiceSection } from "@/types/content";

import "@/components/services/data-body.css";

/**
 * Which pipeline stage each job lives in, by position in the content list.
 * `all` is governance: it applies to every stage at once.
 */
const JOB_FOCUS = ["ingest", "store", "sync", "warehouse", "all", "warehouse"] as const;

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
  wide = false,
}: {
  chapter: (typeof CHAPTERS)[number];
  title: string;
  copy?: string;
  /** Title and copy side by side, so consecutive chapters don't open the same way. */
  wide?: boolean;
}) {
  return (
    <header className={cn("service-band-head data-chapter-head", wide && "is-wide")}>
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
      {/* The pipeline stays pinned while the jobs scroll past it, lighting the stage each one lives in. */}
      <div className="data-jobs-split">
        <div className="data-jobs-visual">
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
        </div>
        <ol data-data-list className="data-jobs-list">
          {section.items.map((item, index) => (
            <li
              key={item.title}
              data-data-card
              data-job={JOB_FOCUS[index % JOB_FOCUS.length]}
              className="data-job"
            >
              <span className="data-job-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 data-data-item-title data-job-title>
                  {item.title}
                </h3>
                <p>{item.copy}</p>
              </div>
            </li>
          ))}
        </ol>
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
      <ChapterHead chapter={CHAPTERS[1]} title={section.title} copy={section.copy} wide />
      {/* Final phase by default; the scroll motion rewinds it to 0 and plays it forward. */}
      <div className="data-migration" data-migration data-phase={section.items.length - 1}>
        <div data-data-stage data-device="migrate" className="data-stage">
          <MigrationStage />
        </div>
        <div className="data-track">
          <span className="data-track-line" aria-hidden="true">
            <i />
          </span>
          <ol data-data-list className="data-track-list">
            {section.items.map((item, index) => (
              <li key={item.title} data-data-step data-station className="data-station">
                <span className="data-station-dot" aria-hidden="true" />
                <span className="data-station-mark" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
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
      <ul data-data-list className="data-engines">
        {section.items.map((item) => (
          <li key={item.title} data-data-card className="data-engine">
            <h3 data-data-item-title>{item.title}</h3>
            <p>{item.copy}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SourcesChapter({
  section,
}: {
  section: Extract<ServiceSection, { kind: "platforms" }>;
}) {
  return (
    <section
      aria-labelledby="data-sources"
      data-data-chapter
      className="data-chapter is-aside"
    >
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
