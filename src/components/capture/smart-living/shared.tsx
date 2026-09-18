/** Shared chrome for Smart Living ops captures. */

import type { ReactNode } from "react";

export function Ic({
  children,
  size = 16,
}: {
  children: ReactNode;
  size?: number;
}) {
  return (
    <span className="ic" style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
    </span>
  );
}

export type SmartLivingNavKey =
  | "overview"
  | "live-alerts"
  | "devices"
  | "residents"
  | "groups"
  | "events"
  | "broadcast"
  | "integrations"
  | "settings";

const NAV_GROUPS: {
  label: string;
  items: {
    key: SmartLivingNavKey;
    name: string;
    badge?: string;
    icon: ReactNode;
  }[];
}[] = [
  {
    label: "Monitor",
    items: [
      {
        key: "overview",
        name: "Overview",
        icon: (
          <>
            <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
            <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" />
            <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" />
            <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" />
          </>
        ),
      },
      {
        key: "live-alerts",
        name: "Live alerts",
        badge: "3",
        icon: (
          <>
            <path d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.7 21a2 2 0 0 1-3.4 0" />
          </>
        ),
      },
      {
        key: "devices",
        name: "Devices",
        icon: (
          <>
            <rect x="4" y="4" width="16" height="16" rx="3" />
            <rect x="9" y="9" width="6" height="6" rx="1.5" />
            <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
          </>
        ),
      },
    ],
  },
  {
    label: "Community",
    items: [
      {
        key: "residents",
        name: "Residents",
        icon: (
          <>
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </>
        ),
      },
      {
        key: "groups",
        name: "Groups",
        icon: (
          <>
            <circle cx="9" cy="7" r="3.2" />
            <circle cx="17" cy="9" r="2.6" />
            <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
            <path d="M16 20a5 5 0 0 1 5.5-4.9" />
          </>
        ),
      },
      {
        key: "events",
        name: "Events",
        icon: (
          <>
            <rect x="3" y="4.5" width="18" height="17" rx="2.5" />
            <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
          </>
        ),
      },
    ],
  },
  {
    label: "Platform",
    items: [
      {
        key: "broadcast",
        name: "Broadcast",
        icon: (
          <>
            <path d="M3 11v2a1 1 0 0 0 1 1h2l4 4V6L6 10H4a1 1 0 0 0-1 1Z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18.5 5.5a9 9 0 0 1 0 13" />
          </>
        ),
      },
      {
        key: "integrations",
        name: "Integrations",
        icon: (
          <>
            <path d="M9 3H5a2 2 0 0 0-2 2v4M15 3h4a2 2 0 0 1 2 2v4M9 21H5a2 2 0 0 1-2-2v-4M15 21h4a2 2 0 0 0 2-2v-4" />
          </>
        ),
      },
      {
        key: "settings",
        name: "Settings",
        icon: (
          <>
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 7 19.4a1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 3 15H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 7a1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 9 3V3a2 2 0 1 1 4 0v.1A1.7 1.7 0 0 0 15 4.6" />
          </>
        ),
      },
    ],
  },
];

type SidebarFootProps = {
  variant?: "default" | "webrtc" | "scheduler";
};

export function SmartLivingSidebar({
  active,
  foot = "default",
}: {
  active: SmartLivingNavKey;
  foot?: SidebarFootProps["variant"];
}) {
  return (
    <aside className="sb">
      <div className="sb-brand">
        <div className="logo" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            width="15"
            height="15"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 10.5 12 3l9 7.5" />
            <path d="M5 9.5V21h14V9.5" />
            <path d="M9.5 21v-6h5v6" />
          </svg>
        </div>
        <div>
          <div className="sb-name">Smart Living</div>
          <div className="sb-sub">Operations</div>
        </div>
      </div>
      <nav className="sb-nav" aria-label="Operations">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <div className="nav-label">{group.label}</div>
            {group.items.map((item) => (
              <button
                type="button"
                className={item.key === active ? "nav-item active" : "nav-item"}
                key={item.key}
              >
                <Ic>{item.icon}</Ic>
                {item.name}
                {item.badge ? <span className="nav-badge">{item.badge}</span> : null}
              </button>
            ))}
          </div>
        ))}
      </nav>
      <div className="sb-foot">
        <div className="sys-card">
          {foot === "webrtc" ? (
            <>
              <div className="sys-row">
                <span className="pulse" />
                AWS SAM · us-east-1
              </div>
              <div className="sys-sub" style={{ paddingLeft: 13 }}>
                12 lambdas · 38ms p95
              </div>
              <div className="sys-row" style={{ marginTop: 8 }}>
                <span className="pulse amber" />
                WebRTC SFU
              </div>
              <div className="sys-sub" style={{ paddingLeft: 13 }}>
                1 active call · 41ms RTT
              </div>
            </>
          ) : foot === "scheduler" ? (
            <>
              <div className="sys-row">
                <span className="pulse" />
                AWS SAM · us-east-1
              </div>
              <div className="sys-sub" style={{ paddingLeft: 13 }}>
                EventBridge · 7 reminders queued
              </div>
              <div className="sys-row" style={{ marginTop: 8 }}>
                <span className="pulse" />
                Firebase FCM
              </div>
              <div className="sys-sub" style={{ paddingLeft: 13 }}>
                99.2% delivery · 12.4k sent
              </div>
            </>
          ) : (
            <>
              <div className="sys-row">
                <span className="pulse" />
                AWS SAM · us-east-1
              </div>
              <div className="sys-sub" style={{ paddingLeft: 13 }}>
                12 lambdas · 38ms p95
              </div>
              <div className="sys-row" style={{ marginTop: 8 }}>
                <span className="pulse" />
                Firebase FCM
              </div>
              <div className="sys-sub" style={{ paddingLeft: 13 }}>
                99.2% delivery · 12.4k sent
              </div>
            </>
          )}
        </div>
        <div className="user-row">
          <div
            className="ava"
            style={{ background: "linear-gradient(140deg,#6C8CFF,#3E5AE0)" }}
          >
            DW
          </div>
          <div style={{ flex: 1 }}>
            <div className="u-name">Dana Whitfield</div>
            <div className="u-role">Shift supervisor</div>
          </div>
          <span className="ic" style={{ color: "#A2ABBA", width: 15, height: 15 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="5" r="1.4" />
              <circle cx="12" cy="12" r="1.4" />
              <circle cx="12" cy="19" r="1.4" />
            </svg>
          </span>
        </div>
      </div>
    </aside>
  );
}

const WAVE_HEIGHTS = [
  22, 48, 72, 36, 88, 54, 30, 66, 94, 42, 74, 28, 58, 86, 38, 62, 24, 78, 50,
  34, 70, 44, 18, 56,
];

export function CallWaveform({ compact }: { compact?: boolean }) {
  return (
    <div className="wave" style={compact ? { height: 20, marginBottom: 10 } : undefined}>
      {WAVE_HEIGHTS.map((height, index) => (
        <i key={index} style={{ height: `${height}%` }} />
      ))}
    </div>
  );
}
