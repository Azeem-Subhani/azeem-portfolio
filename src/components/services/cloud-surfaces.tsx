"use client";

import { useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { gsap } from "gsap";

import { cn } from "@/lib/utils";

function Lights() {
  return (
    <>
      <span />
      <span />
      <span />
    </>
  );
}

function Panel({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("cloud-panel", className)} data-cloud-panel="">
      <div className="cloud-panel-bar">
        <Lights />
        <em>{title}</em>
      </div>
      {children}
    </div>
  );
}

function CognitoScreen() {
  return (
    <div className="cloud-sam-screen">
      <p className="cloud-sam-kicker">Customer pool</p>
      <p className="cloud-sam-title">Signed in</p>
      <p className="cloud-sam-note">Cognito holds the session. Payments stay authenticated.</p>
      <ul>
        <li>
          <span>Pool</span>
          <b>customers</b>
        </li>
        <li>
          <span>App client</span>
          <b>portal</b>
        </li>
      </ul>
    </div>
  );
}

function PortalScreen() {
  return (
    <div className="cloud-sam-screen is-portal">
      <p className="cloud-sam-kicker">Pre-arranged services</p>
      <p className="cloud-sam-title">Account</p>
      <p className="cloud-sam-note">Authenticated payments toward the arrangement. Trust Commerce takes the charge.</p>
      <p className="cloud-sam-metric">500+</p>
      <p className="cloud-sam-metric-label">transactions a day</p>
    </div>
  );
}

function LedgerScreen() {
  return (
    <div className="cloud-sam-screen">
      <p className="cloud-sam-kicker">SAM write path</p>
      <p className="cloud-sam-title">Posted</p>
      <p className="cloud-sam-note">Lambda writes the record. AppSync notifies staff. No manual follow-up.</p>
      <ul>
        <li>
          <span>Store</span>
          <b>DynamoDB</b>
        </li>
        <li>
          <span>Notify</span>
          <b>Lambda</b>
        </li>
        <li>
          <span>API</span>
          <b>AppSync</b>
        </li>
      </ul>
    </div>
  );
}

export function StackStage() {
  return (
    <div className="cloud-sam">
      <div className="cloud-sam-pane is-auth" data-cloud-shell="cognito">
        <Panel title="Cognito">
          <CognitoScreen />
        </Panel>
      </div>
      <div className="cloud-sam-pane is-site" data-cloud-shell="amplify">
        <Panel title="memorialplan.com/account" className="is-live">
          <PortalScreen />
        </Panel>
      </div>
      <div className="cloud-sam-pane is-ledger" data-cloud-shell="ledger">
        <Panel title="Lambda · DynamoDB">
          <LedgerScreen />
        </Panel>
      </div>
    </div>
  );
}

type TraceHop = { name: string; copy: string; parent?: string };

type TraceRow = {
  hop: TraceHop;
  index: number;
  /** 1 for services hanging off the entry, 2 for their children, and so on. */
  depth: number;
  /** Names from the first service down to this one. */
  path: string[];
  /** For each ancestor level, whether its line keeps running past this row. */
  pass: boolean[];
  last: boolean;
};

/** Flattens the hops into depth-first rows, the order a trace view reads in. */
function traceRows(hops: TraceHop[]): TraceRow[] {
  const names = new Set(hops.map((hop) => hop.name));
  const rows: TraceRow[] = [];
  const seen = new Set<string>();

  const walk = (siblings: TraceHop[], depth: number, pass: boolean[], path: string[]) => {
    siblings.forEach((hop, i) => {
      // A bad parent loop in content should drop a row, not hang the page.
      if (seen.has(hop.name)) return;
      seen.add(hop.name);
      const last = i === siblings.length - 1;
      const rowPath = [...path, hop.name];
      rows.push({ hop, index: rows.length, depth, path: rowPath, pass, last });
      walk(
        hops.filter((child) => child.parent === hop.name),
        depth + 1,
        [...pass, !last],
        rowPath,
      );
    });
  };

  walk(
    hops.filter((hop) => !hop.parent || !names.has(hop.parent)),
    1,
    [],
    [],
  );
  return rows;
}

function samePrefix(a: string[], b: string[], length: number) {
  for (let i = 0; i < length; i++) if (a[i] !== b[i]) return false;
  return true;
}

/**
 * Whether the vertical line in guide column `level` of `row` is part of the
 * hovered service's path: it is when the path branches off to a later sibling
 * of this row's ancestor at that level.
 */
function lineOnPath(row: TraceRow, level: number, active: TraceRow | null) {
  if (!active || active.index <= row.index || active.path.length <= level) return false;
  return samePrefix(active.path, row.path, level) && active.path[level] !== row.path[level];
}

export function ShipStage({
  kicker,
  entry,
  hops,
  animate = false,
}: {
  kicker: string;
  entry?: string;
  hops: TraceHop[];
  /** Fade the rows in, used when the visitor switches platform. */
  animate?: boolean;
}) {
  const rows = useMemo(() => traceRows(hops), [hops]);
  const [activeName, setActiveName] = useState<string | null>(null);
  const active = rows.find((row) => row.hop.name === activeName) ?? null;
  const listRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!animate || !list || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.from("[data-trace-row]", {
        opacity: 0,
        y: 6,
        duration: 0.35,
        stagger: 0.035,
        ease: "power2.out",
      });
    }, list);
    return () => context.revert();
  }, [animate]);

  return (
    <div
      ref={listRef}
      className="cloud-trace"
      data-active={active ? "" : undefined}
      onPointerLeave={() => setActiveName(null)}
    >
      <p className="cloud-trace-row is-entry" data-cloud-node data-trace-row>
        <span className="cloud-trace-gutter" aria-hidden="true">
          <span className={cn("cloud-trace-guide is-node", rows.length && "has-children", active && "is-lit")}>
            <i className="cloud-trace-dot is-entry" />
          </span>
        </span>
        <span className="cloud-trace-entry">{entry ?? "Traffic"}</span>
      </p>

      <ol className="cloud-trace-list" aria-label={`${kicker} request path`}>
        {rows.map((row) => {
          const onPath =
            !!active && active.path.length >= row.depth && samePrefix(active.path, row.path, row.depth);
          const elbowLevel = row.depth - 1;
          return (
            <li
              key={row.hop.name}
              data-cloud-node
              data-trace-row
              className={cn("cloud-trace-row", active && (onPath ? "is-on" : "is-off"))}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") setActiveName(row.hop.name);
              }}
            >
              <span className="cloud-trace-gutter" aria-hidden="true">
                {row.pass.map((continues, level) => (
                  <span
                    key={level}
                    className={cn(
                      "cloud-trace-guide",
                      continues && "is-pass",
                      lineOnPath(row, level, active) && "is-lit",
                    )}
                  />
                ))}
                <span
                  className={cn(
                    "cloud-trace-guide is-elbow",
                    !row.last && "is-pass",
                    lineOnPath(row, elbowLevel, active) && "is-lit",
                    onPath && "is-hit",
                  )}
                />
                {/* The service's own column: its dot, and the line down to its children. */}
                <span
                  className={cn(
                    "cloud-trace-guide is-node",
                    rows[row.index + 1]?.depth === row.depth + 1 && "has-children",
                    onPath && active && active.depth > row.depth && "is-lit",
                  )}
                >
                  <i className={cn("cloud-trace-dot", onPath && "is-on", row === active && "is-active")} />
                </span>
              </span>
              {/* Inline style lives here, not on the row: the chapter's scroll
                  reveal clears every inline style on [data-cloud-node]. */}
              <span className="cloud-trace-body" style={{ "--trace-depth": row.depth } as CSSProperties}>
                <strong>{row.hop.name}</strong>
                <span className="cloud-trace-copy">
                  {row.hop.copy}
                  {row.hop.parent ? <span className="sr-only"> Reached from {row.hop.parent}.</span> : null}
                </span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

const consoleClicks = [
  { step: "Create security group", state: "done" },
  { step: "Inbound 0.0.0.0/0", state: "risk" },
  { step: "Missing CostAllocation tag", state: "drift" },
  { step: "Staging does not match prod", state: "drift" },
];

const repoFiles = [
  { path: "modules/ecs/main.tf", change: "+42 −8" },
  { path: "modules/rds/main.tf", change: "+11 −2" },
  { path: "envs/prod/backend.tf", change: "plan" },
  { path: "template.yaml", change: "SAM" },
];

export function CodeStage() {
  return (
    <div className="cloud-code" aria-hidden="true">
      <div data-cloud-shell="console" className="cloud-code-pane is-console">
        <div className="cloud-code-bar">
          <Lights />
          <em>us-east-1 · console</em>
        </div>
        <p className="cloud-code-kicker">Click path</p>
        <p className="cloud-code-title">AWS console</p>
        <p className="cloud-code-warn">Drift after four clicks. Staging drifted from prod.</p>
        <ul>
          {consoleClicks.map((row) => (
            <li key={row.step}>
              <span className={cn("cloud-code-dot", row.state)} />
              {row.step}
              <b>{row.state}</b>
            </li>
          ))}
        </ul>
      </div>
      <div data-cloud-shell="repo" className="cloud-code-pane is-repo">
        <div className="cloud-code-bar">
          <Lights />
          <em>infra / pull/184</em>
          <i>checks</i>
        </div>
        <p className="cloud-code-kicker">Same change as a pull request</p>
        <p className="cloud-code-title">Terraform + SAM</p>
        <p className="cloud-code-ok">Remote state. Plan in CI. Staging and prod share the module.</p>
        <ul>
          {repoFiles.map((file) => (
            <li key={file.path}>
              <span className="cloud-code-dot ok" />
              <code>{file.path}</code>
              <b>{file.change}</b>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const idleHours = Array.from({ length: 24 }, () => 82);
const burstHours = [
  4, 3, 2, 2, 3, 6, 12, 28, 64, 88, 72, 41, 22, 18, 16, 24, 58, 91, 70, 33, 14, 8, 5, 4,
];

export function BurstStage() {
  return (
    <div className="cloud-burst" aria-hidden="true">
      <Panel title="cost · 24h" className="is-idle">
        <p className="cloud-burst-kicker">Always-on box</p>
        <p className="cloud-burst-title">Idle 20 hours</p>
        <p className="cloud-burst-note">The bill does not care that checkout slept.</p>
        <ol className="cloud-burst-bars" data-cloud-bars="idle">
          {idleHours.map((value, hour) => (
            <li key={`idle-${hour}`} style={{ height: `${value}%` }} />
          ))}
        </ol>
      </Panel>
      <Panel title="lambda · 24h" className="is-live">
        <p className="cloud-burst-kicker">Functions on the write path</p>
        <p className="cloud-burst-title">Pay the spike</p>
        <p className="cloud-burst-note">A sale, a roster sync, a payment burst.</p>
        <ol className="cloud-burst-bars is-live" data-cloud-bars="live">
          {burstHours.map((value, hour) => (
            <li key={`live-${hour}`} style={{ height: `${value}%` }} />
          ))}
        </ol>
      </Panel>
    </div>
  );
}

const hostKinds = ["box", "edge", "app"] as const;

export function HostStage({
  groups,
}: {
  groups: { title: string; copy: string; items: string[] }[];
}) {
  return (
    <div className="cloud-hosts">
      {groups.map((group, index) => {
        const kind = hostKinds[index] ?? "box";
        return (
          <article
            key={group.title}
            data-cloud-shell="host"
            className={cn("cloud-panel is-host", `is-${kind}`)}
          >
            <div className="cloud-panel-bar">
              <Lights />
              <em>{group.title}</em>
            </div>
            <span className={cn("cloud-host-mark", `is-${kind}`)} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <p className="cloud-host-lede">{group.copy}</p>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        );
      })}
    </div>
  );
}
