"use client";

import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Database,
  FileSearch,
  Gauge,
  Palette,
  Search,
  ShieldCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";

import {
  MigrateStage,
  PrototypeStage,
  SeoStage,
  StackStage,
} from "@/components/services/web-surfaces";
import { useWebBodyMotion } from "@/components/services/web-motion";
import type { ServicePageContent, ServiceSection } from "@/types/content";

import { ServiceTocGlass } from "@/components/services/service-toc-glass";
import "@/components/services/web-body.css";

const BUILD_ICONS: LucideIcon[] = [Code2, Palette, FileSearch, Database, Zap, ShieldCheck];
const SEO_ICONS: LucideIcon[] = [FileSearch, Search, Gauge, Database];

const CHAPTERS = [
  { id: "web-build", index: "01", kicker: "Stack", label: "What I build" },
  { id: "web-migrate", index: "02", kicker: "Migration", label: "WordPress to headless" },
  { id: "web-process", index: "03", kicker: "Process", label: "Prototype, then production" },
  { id: "web-seo", index: "04", kicker: "Search", label: "SEO + speed" },
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
    <header className="service-band-head web-chapter-head">
      <p className="web-chapter-kicker" data-web-kicker aria-hidden="true">
        <span className="web-chapter-index">{chapter.index}</span>
        <span className="web-chapter-rule" />
        <span>{chapter.kicker}</span>
      </p>
      <h2 id={chapter.id} data-web-title className="service-band-title">
        {title}
      </h2>
      {copy ? (
        <p data-web-copy className="service-band-copy">
          {copy}
        </p>
      ) : null}
    </header>
  );
}

function BuildChapter({
  section,
}: {
  section: Extract<ServiceSection, { kind: "capabilities" }>;
}) {
  return (
    <section aria-labelledby="web-build" data-web-chapter className="web-chapter">
      <ChapterHead chapter={CHAPTERS[0]} title={section.title} copy={section.copy} />
      <figure data-web-stage data-device="stack" className="web-stage">
        <StackStage />
        <figcaption className="web-stage-caption">
          <span>CMS</span>
          <span aria-hidden="true">→</span>
          <span>Next.js</span>
          <span aria-hidden="true">→</span>
          <span>Edge</span>
        </figcaption>
      </figure>
      <div data-web-list className="web-build-grid">
        {section.items.map((item, index) => {
          const Icon = BUILD_ICONS[index % BUILD_ICONS.length];
          return (
            <article key={item.title} data-web-item data-web-card className="web-card">
              <span className="web-card-icon" aria-hidden="true">
                <Icon strokeWidth={1.75} />
              </span>
              <h3 data-web-item-title>{item.title}</h3>
              <p data-web-item-copy>{item.copy}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function MigrateChapter({
  section,
}: {
  section: Extract<ServiceSection, { kind: "compare" }>;
}) {
  return (
    <section aria-labelledby="web-migrate" data-web-chapter className="web-chapter">
      <ChapterHead chapter={CHAPTERS[1]} title={section.title} copy={section.copy} />
      <div data-web-stage data-device="migrate" className="web-stage">
        <MigrateStage />
      </div>
      <div className="web-ledger-wrap" data-web-list>
        <table className="web-ledger">
          <caption className="sr-only">
            WordPress versus headless, by {section.rows.map((row) => row.label.toLowerCase()).join(", ")}
          </caption>
          <thead>
            <tr>
              <th scope="col">
                <span className="sr-only">Topic</span>
              </th>
              <th scope="col">
                <span className="web-ledger-side is-before">{section.left.title}</span>
                <span className="web-ledger-sub">{section.left.subtitle}</span>
              </th>
              <th scope="col">
                <span className="web-ledger-side is-after">{section.right.title}</span>
                <span className="web-ledger-sub">{section.right.subtitle}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {section.rows.map((row) => (
              <tr key={row.label} data-web-row>
                <th scope="row">{row.label}</th>
                <td>
                  <span className="web-ledger-cell-label" aria-hidden="true">
                    {section.left.title}
                  </span>
                  {row.left}
                </td>
                <td className="is-after">
                  <span className="web-ledger-cell-label" aria-hidden="true">
                    {section.right.title}
                  </span>
                  {row.right}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ProcessChapter({
  section,
}: {
  section: Extract<ServiceSection, { kind: "process" }>;
}) {
  return (
    <section aria-labelledby="web-process" data-web-chapter className="web-chapter">
      <ChapterHead chapter={CHAPTERS[2]} title={section.title} copy={section.copy} />
      <div data-web-stage data-device="prototype" className="web-stage">
        <PrototypeStage />
      </div>
      <div className="web-process">
        <article className="web-process-col web-card is-usual" data-web-item data-web-card>
          <p className="web-process-eyebrow">The old way</p>
          <h3 data-web-item-title>{section.left.title}</h3>
          <p data-web-item-copy>{section.left.copy}</p>
          <ol>
            {section.left.steps.map((step, index) => (
              <li key={step} data-web-step>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                {step}
              </li>
            ))}
          </ol>
        </article>
        <article className="web-process-col web-card is-mine" data-web-item data-web-card>
          <p className="web-process-eyebrow">My way</p>
          <h3 data-web-item-title>{section.right.title}</h3>
          <p data-web-item-copy>{section.right.copy}</p>
          <ol>
            {section.right.steps.map((step, index) => (
              <li key={step} data-web-step>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                {step}
              </li>
            ))}
          </ol>
        </article>
      </div>
      <ul data-web-list className="web-outcomes">
        {section.outcomes.map((item) => (
          <li key={item.title} data-web-item data-web-card className="web-card">
            <p data-web-item-title>{item.title}</p>
            <span data-web-item-copy>{item.copy}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SeoChapter({
  section,
}: {
  section: Extract<ServiceSection, { kind: "features" }>;
}) {
  return (
    <section aria-labelledby="web-seo" data-web-chapter className="web-chapter">
      <ChapterHead chapter={CHAPTERS[3]} title={section.title} copy={section.copy} />
      <div data-web-stage data-device="seo" className="web-stage">
        <SeoStage />
      </div>
      <div data-web-list className="web-seo-list">
        {section.items.map((item, index) => {
          const Icon = SEO_ICONS[index % SEO_ICONS.length];
          return (
            <article key={item.title} data-web-item data-web-card className="web-seo-copy web-card">
              <span className="web-card-icon" aria-hidden="true">
                <Icon strokeWidth={1.75} />
              </span>
              <h3 data-web-item-title>{item.title}</h3>
              <p data-web-item-copy>{item.copy}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function WebServiceBody({ service }: { service: ServicePageContent }) {
  const [capabilities] = ofKind(service.sections, "capabilities");
  const [compare] = ofKind(service.sections, "compare");
  const [process] = ofKind(service.sections, "process");
  const [features] = ofKind(service.sections, "features");
  const rootRef = useWebBodyMotion<HTMLDivElement>();

  return (
    <div ref={rootRef} className="web-body">
      <nav aria-label="On this page" className="web-toc relative">
        <ServiceTocGlass />
        <span className="web-toc-label" aria-hidden="true">
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
        <Link href="/projects/track-booking" className="web-toc-link">
          See it live: Track Booking Platform <ArrowRight aria-hidden="true" />
        </Link>
      </nav>
      <div className="web-body-scroll overflow-x-clip">
        {capabilities ? <BuildChapter section={capabilities} /> : null}
        {compare ? <MigrateChapter section={compare} /> : null}
        {process ? <ProcessChapter section={process} /> : null}
        {features ? <SeoChapter section={features} /> : null}
      </div>
    </div>
  );
}
