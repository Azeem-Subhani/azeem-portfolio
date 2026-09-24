"use client";

import {
  CloudInfrastructureDiagram,
  CloudProviderRow,
} from "@/components/services/cloud-infrastructure-diagram";

const titleLines = ["cloud that ships", "as one stack"];

const stats = [
  { label: "Production apps", value: "50+", note: null },
  { label: "Infrastructure cost cut", value: "40%", note: "average" },
  { label: "Uptime", value: "99.95%", note: null },
] as const;

export function CloudHeroV2() {
  return (
    <header className="cloud-v2-hero">
      <div className="cloud-v2-hero__main">
        <div className="cloud-v2-hero__copy">
          <p className="cloud-v2-kicker">
            <span className="cloud-v2-kicker__rule" aria-hidden />
            Cloud infrastructure
            <span className="cloud-v2-kicker__dash" aria-hidden>
              —
            </span>
          </p>
          <h1 className="cloud-v2-title">
            {titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="cloud-v2-lede">
            Scalable, secure, and reliable cloud infrastructure across AWS,
            Azure and GCP — designed to ship, not just sit.
          </p>
          <CloudProviderRow />
        </div>

        <div className="cloud-v2-hero__visual">
          <CloudInfrastructureDiagram />
        </div>
      </div>

      <dl className="cloud-v2-stats">
        {stats.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>
              <span className="cloud-v2-stats__value">{item.value}</span>
              {item.note ? (
                <span className="cloud-v2-stats__note">{item.note}</span>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </header>
  );
}
