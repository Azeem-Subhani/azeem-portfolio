"use client";

import { useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  CarDash,
  HardwarePhone,
  IonicPhone,
  NativePhone,
  OsShelf,
  SquadPhone,
  SyncStage,
  TabletBoard,
  WatchFace,
} from "@/components/services/mobile-surfaces";
import { useMobileBodyMotion } from "@/components/services/mobile-motion";
import { ServiceTocGlass } from "@/components/services/service-toc-glass";
import { cn } from "@/lib/utils";
import type { ServicePageContent, ServiceSection } from "@/types/content";

import "@/components/services/mobile-body.css";

const CHAPTERS = [
  { id: "mobile-why", index: "01", label: "One codebase" },
  { id: "mobile-stacks", index: "02", label: "Two stacks" },
  { id: "mobile-glass", index: "03", label: "Every surface" },
  { id: "mobile-hardware", index: "04", label: "Hardware" },
  { id: "mobile-platforms", index: "05", label: "Where it runs" },
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
      <h2 id={id} data-mobile-title className="service-band-title">
        {title}
      </h2>
      {copy ? (
        <p data-mobile-copy className="service-band-copy">
          {copy}
        </p>
      ) : null}
    </header>
  );
}

function WhyChapter({
  section,
}: {
  section: Extract<ServiceSection, { kind: "capabilities" }>;
}) {
  return (
    <section aria-labelledby="mobile-why" data-mobile-chapter className="mobile-chapter">
      <ChapterHead id="mobile-why" title={section.title} copy={section.copy} />
      <div data-mobile-stage data-device="sync">
        <SyncStage />
      </div>
      <div data-mobile-list className="mobile-why-grid">
        {section.items.map((item) => (
          <article key={item.title} data-mobile-item>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function StacksChapter({
  section,
}: {
  section: Extract<ServiceSection, { kind: "platforms" }>;
}) {
  return (
    <section aria-labelledby="mobile-stacks" data-mobile-chapter className="mobile-chapter">
      <ChapterHead id="mobile-stacks" title={section.title} copy={section.copy} />
      <div data-mobile-stage data-device="stacks" className="mobile-stack-pair">
        {section.items.map((item, index) => (
          <article key={item.title} className="mobile-stack">
            <div className="mobile-stack-device" aria-hidden="true">
              <div data-mobile-shell>
                {index === 0 ? <IonicPhone /> : <NativePhone />}
              </div>
            </div>
            <div className="mobile-stack-copy">
              <p className="mobile-stack-meta">{item.meta}</p>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function GlassChapter({
  section,
}: {
  section: Extract<ServiceSection, { kind: "coverage" }>;
}) {
  const devices = ["tablet", "phone", "watch", "car"] as const;
  const visuals = [TabletBoard, SquadPhone, WatchFace, CarDash] as const;

  return (
    <section aria-labelledby="mobile-glass" data-mobile-chapter className="mobile-chapter">
      <ChapterHead id="mobile-glass" title={section.title} copy={section.copy} />
      <div className="mobile-glass-list">
        {section.groups.map((group, index) => {
          const Visual = visuals[index];
          const reverse = index % 2 === 1;

          return (
            <article
              key={group.title}
              data-mobile-glass
              className={cn("mobile-glass-row", reverse && "is-reverse")}
            >
              <div className="mobile-glass-copy">
                <h3 data-mobile-title>{group.title}</h3>
                <p data-mobile-copy>{group.copy}</p>
                <ul>
                  {group.items.map((item) => (
                    <li key={item} data-mobile-item>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="mobile-glass-stage"
                aria-hidden="true"
                data-mobile-visual
                data-device={devices[index]}
              >
                {Visual ? <Visual /> : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function hardwareTabId(title: string) {
  return `mobile-hw-tab-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

function HardwareChapter({
  section,
}: {
  section: Extract<ServiceSection, { kind: "coverage" }>;
}) {
  const sensors = section.groups.slice(0, 3);
  const landing = section.groups[3];
  const [active, setActive] = useState(sensors[0]?.title ?? "");
  const group = sensors.find((item) => item.title === active) ?? sensors[0];

  const select = (title: string, tablist?: HTMLElement) => {
    setActive(title);
    tablist
      ?.querySelector<HTMLButtonElement>(`#${hardwareTabId(title)}`)
      ?.focus();
  };

  return (
    <section aria-labelledby="mobile-hardware" data-mobile-chapter className="mobile-chapter">
      <ChapterHead id="mobile-hardware" title={section.title} copy={section.copy} />
      <div className="mobile-hw">
        <div data-mobile-stage data-device="hardware">
          <HardwarePhone active={active} />
        </div>
        <div className="mobile-hw-copy">
          <div
            className="mobile-hw-tabs"
            role="tablist"
            aria-label={section.title}
            onKeyDown={(event: KeyboardEvent<HTMLDivElement>) => {
              const index = sensors.findIndex((item) => item.title === active);
              if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                event.preventDefault();
                const next = sensors[(index + 1) % sensors.length];
                if (next) select(next.title, event.currentTarget);
              } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                event.preventDefault();
                const next = sensors[(index - 1 + sensors.length) % sensors.length];
                if (next) select(next.title, event.currentTarget);
              }
            }}
          >
            {sensors.map((item) => {
              const selected = item.title === active;
              return (
                <button
                  key={item.title}
                  id={hardwareTabId(item.title)}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="mobile-hw-panel"
                  tabIndex={selected ? 0 : -1}
                  className={cn("mobile-hw-tab", selected && "is-selected")}
                  onClick={() => setActive(item.title)}
                >
                  {item.title}
                </button>
              );
            })}
          </div>
          {group ? (
            <div
              className="mobile-hw-detail"
              role="tabpanel"
              id="mobile-hw-panel"
              aria-labelledby={hardwareTabId(group.title)}
              aria-live="polite"
            >
              <div key={group.title} className="mobile-hw-detail-copy">
                <h3>{group.title}</h3>
                <p>{group.copy}</p>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {landing ? (
        <div data-mobile-list className="mobile-land">
          <h3>{landing.title}</h3>
          <p>{landing.copy}</p>
          <ul>
            {landing.items.map((item) => (
              <li key={item} data-mobile-item>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

function PlatformsChapter({
  section,
}: {
  section: Extract<ServiceSection, { kind: "coverage" }>;
}) {
  const kinds = ["ios", "android", "web", "desktop"] as const;

  return (
    <section aria-labelledby="mobile-platforms" data-mobile-chapter className="mobile-chapter">
      <ChapterHead id="mobile-platforms" title={section.title} copy={section.copy} />
      <div data-mobile-list className="mobile-os-grid">
        {section.groups.map((group, index) => (
          <OsShelf
            key={group.title}
            title={group.title}
            copy={group.copy}
            items={group.items}
            kind={kinds[index] ?? "ios"}
          />
        ))}
      </div>
    </section>
  );
}

export function MobileServiceBody({ service }: { service: ServicePageContent }) {
  const [capabilities] = ofKind(service.sections, "capabilities");
  const [platforms] = ofKind(service.sections, "platforms");
  const coverage = ofKind(service.sections, "coverage");
  const rootRef = useMobileBodyMotion<HTMLDivElement>();

  return (
    <div ref={rootRef} className="mobile-body">
      <nav aria-label="On this page" className="mobile-toc relative">
        <ServiceTocGlass />
        <span className="mobile-toc-label" aria-hidden="true">
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
        <Link href="/projects/oxym" className="mobile-toc-link">
          See it live: Oxym <ArrowRight aria-hidden="true" />
        </Link>
      </nav>
      <div className="mobile-body-scroll overflow-x-clip">
        {capabilities ? <WhyChapter section={capabilities} /> : null}
        {platforms ? <StacksChapter section={platforms} /> : null}
        {coverage[0] ? <GlassChapter section={coverage[0]} /> : null}
        {coverage[1] ? <HardwareChapter section={coverage[1]} /> : null}
        {coverage[2] ? <PlatformsChapter section={coverage[2]} /> : null}
      </div>
    </div>
  );
}
