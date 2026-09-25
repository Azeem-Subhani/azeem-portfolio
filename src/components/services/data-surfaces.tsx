"use client";

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
  node,
  hook = true,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  /** Pipeline stage this panel stands for; the jobs list lights it while its row is read. */
  node?: string;
  /** Main panels animate in on scroll; nested lane panels use their own rail. */
  hook?: boolean;
}) {
  return (
    <div
      className={cn("data-panel", className)}
      data-node={node}
      {...(hook ? { "data-data-panel": "" } : {})}
    >
      <div className="data-panel-bar">
        <Lights />
        <em>{title}</em>
      </div>
      {children}
    </div>
  );
}

/**
 * Several stacked values in one grid cell; CSS shows the one whose `data-at`
 * lists the migration's current phase. Consecutive repeats are merged so an
 * unchanged value doesn't blink when the phase moves on.
 */
function PhaseValue({ values }: { values: string[] }) {
  const runs: { value: string; at: number[] }[] = [];
  values.forEach((value, index) => {
    const last = runs[runs.length - 1];
    if (last && last.value === value) last.at.push(index);
    else runs.push({ value, at: [index] });
  });

  return (
    <span className="data-phase-value">
      {runs.map((run) => (
        <span key={run.at.join()} data-at={run.at.join(" ")}>
          {run.value}
        </span>
      ))}
    </span>
  );
}

const writeSources = [
  { name: "Stripe", meta: "webhook" },
  { name: "Booking app", meta: "OLTP" },
  { name: "Mobile client", meta: "Firestore" },
];

const warehouseTables = [
  { name: "fact_payments", rows: "1.8M", state: "synced" },
  { name: "dim_venues", rows: "1.2K", state: "synced" },
  { name: "fact_sessions", rows: "412K", state: "catching up" },
];

export function PipelineStage() {
  return (
    <div className="data-pipeline" data-pipeline aria-hidden="true">
      <p className="data-pipeline-focus">
        <span>focus</span>
        <b data-focus-label>whole pipeline</b>
      </p>

      <Panel title="sources" className="is-sources" node="ingest">
        <ul className="data-flow-list">
          {writeSources.map((source) => (
            <li key={source.name}>
              <b>{source.name}</b>
              <span>{source.meta}</span>
            </li>
          ))}
        </ul>
      </Panel>

      <div className="data-pipeline-rail" data-data-rail data-node="ingest">
        <span className="data-rail-line" />
        <span className="data-rail-spark" />
        <span className="data-rail-badge">&lt;100ms</span>
      </div>

      <Panel title="product store" className="is-store" node="store">
        <p className="data-store-label">Postgres · source of truth</p>
        <p className="data-store-row">
          <code>payment#84213</code>
          <b>committed</b>
        </p>
        <ul className="data-store-meta">
          <li>
            <span>WAL</span>
            <b>streaming</b>
          </li>
          <li>
            <span>PITR</span>
            <b>7 days</b>
          </li>
        </ul>
      </Panel>

      <div className="data-pipeline-rail is-down" data-data-rail data-node="sync">
        <span className="data-rail-line" />
        <span className="data-rail-spark" />
        <span className="data-rail-badge">CDC</span>
      </div>

      <Panel title="warehouse" className="is-warehouse" node="warehouse">
        <p className="data-store-label">Columnar copy · read only</p>
        <ul className="data-warehouse-list">
          {warehouseTables.map((table) => (
            <li key={table.name}>
              <code>{table.name}</code>
              <span>{table.rows}</span>
              <b className={table.state === "synced" ? "is-ok" : "is-busy"}>{table.state}</b>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

/** One entry per migration step, in the same order as the steps in the content file. */
const migrationPhases = [
  { old: "reads + writes", next: "not provisioned", copied: "0%", check: "tracing jobs and reports" },
  { old: "reads + writes", next: "schema + partitions", copied: "0%", check: "transforms reviewed" },
  { old: "reads + writes", next: "pilot slice", copied: "8%", check: "checksums match" },
  { old: "reads + writes", next: "dual-write, catching up", copied: "100%", check: "lag 240ms" },
  { old: "standby, rollback armed", next: "reads + writes", copied: "100%", check: "totals match" },
];

/**
 * The migration console. It holds no state of its own: the chapter's
 * `data-phase` attribute (set by the scroll motion) picks which values show,
 * and it defaults to the finished migration when motion is off.
 */
export function MigrationStage() {
  return (
    <Panel title="migration · dual-write" className="data-mig-console">
      <div className="data-mig-lanes">
        <div className="data-mig-lane is-old" data-live="0 1 2 3">
          <span className="data-mig-app">app</span>
          <span className="data-mig-flow">
            <i />
            <i />
            <i />
          </span>
          <span className="data-mig-store">
            <b>Old store</b>
            <em>
            <PhaseValue values={migrationPhases.map((phase) => phase.old)} />
            </em>
          </span>
        </div>
        <div className="data-mig-lane is-new" data-live="2 3 4">
          <span className="data-mig-app">app</span>
          <span className="data-mig-flow">
            <i />
            <i />
            <i />
          </span>
          <span className="data-mig-store">
            <b>New store</b>
            <em>
            <PhaseValue values={migrationPhases.map((phase) => phase.next)} />
            </em>
          </span>
        </div>
      </div>
      <div className="data-mig-footer">
        <span className="data-mig-meter">
          <i />
        </span>
        <p>
          Copied <b><PhaseValue values={migrationPhases.map((phase) => phase.copied)} /></b>
          <span aria-hidden="true">·</span>
          Rows lost <b>0</b>
          <span aria-hidden="true">·</span>
          <PhaseValue values={migrationPhases.map((phase) => phase.check)} />
        </p>
      </div>
    </Panel>
  );
}

const checkoutRows = [
  { id: "payment#84213", amount: "$182.00" },
  { id: "payment#84214", amount: "$64.50" },
  { id: "booking#20931", amount: "$240.00" },
  { id: "payment#84215", amount: "$19.99" },
  { id: "refund#1177", amount: "-$64.50" },
  { id: "payment#84216", amount: "$310.00" },
];

const warehouseColumns = [
  { name: "amount", height: 82 },
  { name: "venue", height: 58 },
  { name: "day", height: 70 },
  { name: "method", height: 44 },
  { name: "status", height: 64 },
  { name: "region", height: 50 },
];

/**
 * Row store against column store: checkout writes stream in one row at a time
 * on the left, a query sweeps whole columns on the right, and nothing crosses
 * the wall between them.
 */
export function WarehouseStage() {
  return (
    <div className="data-split" aria-hidden="true">
      <Panel title="postgres · row store" className="data-split-pane is-rows">
        <p className="data-split-name">Checkout path</p>
        <p className="data-split-note">Live writes, never queued behind BI</p>
        <div className="data-rowstore">
          <ul className="data-rowstore-feed">
            {[...checkoutRows, ...checkoutRows].map((row, index) => (
              <li key={`${row.id}-${index}`}>
                <code>{row.id}</code>
                <span>{row.amount}</span>
                <b>insert</b>
              </li>
            ))}
          </ul>
        </div>
      </Panel>

      <div className="data-split-wall">
        <span>no shared pool</span>
        <span>no shared disk</span>
      </div>

      <Panel title="warehouse · columnar" className="data-split-pane is-cols">
        <p className="data-split-name">Analytics path</p>
        <p className="data-split-note">Columnar copy, elastic compute</p>
        <div className="data-colstore">
          {warehouseColumns.map((column, index) => (
            <span
              key={column.name}
              style={{ "--h": `${column.height}%`, "--i": index } as React.CSSProperties}
            >
              <i />
              <em>{column.name}</em>
            </span>
          ))}
        </div>
        <p className="data-colstore-query">
          <code>sum(amount) by venue, day</code>
          <b>scan</b>
        </p>
      </Panel>
    </div>
  );
}

/**
 * The connector catalog is the chapter's only list (it used to be repeated as cards),
 * so unlike the other stages it stays in the accessibility tree.
 */
export function SourcesStage({ items }: { items: { title: string; copy: string; meta?: string }[] }) {
  return (
    <div className="data-sources">
      <Panel title="pipeline catalog" className="is-catalog">
        <ul data-data-list className="data-source-list">
          {items.map((source) => (
            <li key={source.title} data-data-step>
              <b>{source.title}</b>
              {source.meta ? (
                <span className="data-source-cadence">
                  <span className="data-source-pill">{source.meta}</span>
                  {/* How the connector delivers: a steady stream, bursts, or a nightly block. */}
                  <span
                    className="data-signal"
                    data-kind={source.meta.toLowerCase()}
                    aria-hidden="true"
                  >
                    <i />
                    <i />
                    <i />
                  </span>
                </span>
              ) : (
                <span />
              )}
              <em>{source.copy}</em>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
