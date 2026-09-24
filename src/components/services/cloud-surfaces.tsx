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

const platformMark: Record<
  string,
  { src: string; lightSrc?: string; alt: string; w: number; h: number }
> = {
  // AWS's default wordmark is cream for dark mode; light mode uses the squid-ink variant.
  AWS: {
    src: "/images/cloud-v3/amazonaws.svg",
    lightSrc: "/images/cloud-v3/amazonaws-light.svg",
    alt: "",
    w: 56,
    h: 34,
  },
  Azure: { src: "/images/cloud-v3/microsoftazure.svg", alt: "", w: 22, h: 22 },
  GCP: { src: "/images/cloud-v3/googlecloud.svg", alt: "", w: 24, h: 21 },
};

export function ShipStage({
  kicker,
  hops,
}: {
  kicker: string;
  hops: { name: string; copy: string }[];
}) {
  const mark = platformMark[kicker];

  return (
    <div className="cloud-topo">
      <div className="cloud-topo-head" data-cloud-shell="cloud" aria-hidden="true">
        {mark?.lightSrc ? (
          <>
            <img className="svgl-light" src={mark.lightSrc} alt="" width={mark.w} height={mark.h} />
            <img className="svgl-dark" src={mark.src} alt="" width={mark.w} height={mark.h} />
          </>
        ) : mark ? (
          <img src={mark.src} alt="" width={mark.w} height={mark.h} />
        ) : null}
        <b>{kicker}</b>
      </div>
      <ol className="cloud-topo-path" aria-label={`${kicker} path`}>
        {hops.map((hop, index) => {
          const last = index === hops.length - 1;
          const wrap = !last && (index + 1) % 3 === 0;
          return (
            <li key={hop.name} data-cloud-node>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{hop.name}</strong>
              <em>{hop.copy}</em>
              {!last ? (
                <i
                  className={cn("cloud-topo-join", wrap ? "is-wrap" : "is-across")}
                  aria-hidden="true"
                />
              ) : null}
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
