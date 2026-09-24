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
  hook = true,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  /** Main panels animate in on scroll; nested lane panels use their own rail. */
  hook?: boolean;
}) {
  return (
    <div className={cn("data-panel", className)} {...(hook ? { "data-data-panel": "" } : {})}>
      <div className="data-panel-bar">
        <Lights />
        <em>{title}</em>
      </div>
      {children}
    </div>
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
    <div className="data-pipeline" aria-hidden="true">
      <Panel title="sources" className="is-sources">
        <ul className="data-flow-list">
          {writeSources.map((source) => (
            <li key={source.name}>
              <b>{source.name}</b>
              <span>{source.meta}</span>
            </li>
          ))}
        </ul>
      </Panel>

      <div className="data-pipeline-rail" data-data-rail>
        <span className="data-rail-line" />
        <span className="data-rail-spark" />
        <span className="data-rail-badge">&lt;100ms</span>
      </div>

      <Panel title="product store" className="is-store">
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

      <div className="data-pipeline-rail is-down" data-data-rail>
        <span className="data-rail-line" />
        <span className="data-rail-spark" />
        <span className="data-rail-badge">CDC</span>
      </div>

      <Panel title="warehouse" className="is-warehouse">
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

const migrationStates = [
  { label: "Old store", state: "live", note: "still takes writes" },
  { label: "Copy", state: "running", note: "full + catch-up" },
  { label: "Validation", state: "passing", note: "counts, totals, queries" },
  { label: "Cut over", state: "ready", note: "readers then writers" },
];

export function MigrationStage() {
  return (
    <div className="data-migrate" aria-hidden="true">
      <Panel title="migration · dual-write" className="is-migrate">
        <div className="data-migrate-track">
          {migrationStates.map((step, index) => (
            <div
              key={step.label}
              className={cn("data-migrate-stop", `is-${step.state}`)}
              data-data-stop
              style={{ "--stop": index } as React.CSSProperties}
            >
              <span className="data-migrate-dot" />
              <b>{step.label}</b>
              <em>{step.note}</em>
            </div>
          ))}
        </div>
        <div className="data-migrate-footer">
          <span className="data-migrate-meter">
            <i style={{ width: "86%" }} />
          </span>
          <p>
            Backfill lag <b>240ms</b> · 0 rows lost · rollback armed
          </p>
        </div>
      </Panel>
    </div>
  );
}

const warehouseCards = [
  {
    name: "Checkout path",
    owner: "Postgres",
    note: "Live writes · never queued behind BI",
    state: "online",
  },
  {
    name: "Analytics path",
    owner: "Warehouse",
    note: "Columnar copy · elastic compute",
    state: "online",
  },
];

export function WarehouseStage() {
  return (
    <div className="data-warehouse" aria-hidden="true">
      {warehouseCards.map((card) => (
        <Panel key={card.name} title={card.owner} className="is-lane">
          <p className="data-lane-name">{card.name}</p>
          <p className="data-lane-note">{card.note}</p>
          <p className="data-lane-state">
            <i />
            {card.state}
          </p>
        </Panel>
      ))}
      <p className="data-warehouse-rule">
        <span>No shared connection pool</span>
        <span aria-hidden="true">·</span>
        <span>No shared disk</span>
      </p>
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
        <ul className="data-source-list">
          {items.map((source) => (
            <li key={source.title}>
              <b>{source.title}</b>
              {source.meta ? <span className="data-source-cadence">{source.meta}</span> : <span />}
              <em>{source.copy}</em>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
