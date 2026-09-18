import type { ReactNode } from "react";

function IconOverview() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M8 3v4M16 3v4M3 11h18" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

function IconFleet() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17h14M6 17l1.5-5.5A2 2 0 019.4 10h5.2a2 2 0 011.9 1.5L18 17" />
      <circle cx="7.5" cy="19" r="1.6" />
      <circle cx="16.5" cy="19" r="1.6" />
    </svg>
  );
}

function IconCrm() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3.4" />
      <path d="M3 20a6 6 0 0112 0" />
      <path d="M16 5.5a3.4 3.4 0 010 5M18.5 20a6 6 0 00-2.2-4.6" />
    </svg>
  );
}

function IconReports() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19V9M10 19V5M16 19v-7M22 19H2" />
    </svg>
  );
}

function IconSettings() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.6 1.6 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.6 1.6 0 00-1.8-.3 1.6 1.6 0 00-1 1.5V21a2 2 0 11-4 0v-.1A1.6 1.6 0 008 19.4a1.6 1.6 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.6 1.6 0 00.3-1.8 1.6 1.6 0 00-1.5-1H2a2 2 0 110-4h.1A1.6 1.6 0 004.6 8a1.6 1.6 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.6 1.6 0 001.8.3H9a1.6 1.6 0 001-1.5V2a2 2 0 114 0v.1a1.6 1.6 0 001 1.5 1.6 1.6 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.6 1.6 0 00-.3 1.8V9a1.6 1.6 0 001.5 1H22a2 2 0 110 4h-.1a1.6 1.6 0 00-1.5 1z" />
    </svg>
  );
}

export type TrackHeroConsoleNav =
  | "dashboard"
  | "bookings"
  | "schedule"
  | "fleet"
  | "crm";

export type TrackHeroConsoleSidebar =
  | "overview"
  | "bookings"
  | "schedule"
  | "fleet"
  | "crm"
  | "reports"
  | "settings";

type TrackHeroWebConsoleChromeProps = {
  ariaLabel: string;
  activeNav: TrackHeroConsoleNav;
  activeSidebar: TrackHeroConsoleSidebar;
  children: ReactNode;
};

export function TrackHeroWebConsoleChrome({
  ariaLabel,
  activeNav,
  activeSidebar,
  children,
}: TrackHeroWebConsoleChromeProps) {
  return (
    <section className="capture capture--web" aria-label={ariaLabel}>
      <header className="topbar">
        <div className="brand">
          <div className="logo">TH</div>
          <div>
            <div className="b-name">TRACK HERO</div>
            <div className="b-sub">Ops Console</div>
          </div>
        </div>
        <nav className="nav">
          <button type="button" className={activeNav === "dashboard" ? "on" : undefined}>
            Dashboard
          </button>
          <button type="button" className={activeNav === "bookings" ? "on" : undefined}>
            Bookings
          </button>
          <button type="button" className={activeNav === "schedule" ? "on" : undefined}>
            Schedule
          </button>
          <button type="button" className={activeNav === "fleet" ? "on" : undefined}>
            Fleet
          </button>
          <button type="button" className={activeNav === "crm" ? "on" : undefined}>
            CRM
          </button>
        </nav>
        <div className="tb-right">
          <button type="button" className="trackpill">
            <span className="dot" />
            All tracks · 5
            <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
              <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button type="button" className="iconbtn" aria-label="Notifications">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8a6 6 0 10-12 0c0 7-3 8-3 8h18s-3-1-3-8" />
              <path d="M13.7 21a2 2 0 01-3.4 0" />
            </svg>
          </button>
          <div className="avatar">JD</div>
        </div>
      </header>

      <div className="opbody">
        <aside className="sidebar">
          <div className="sb-title">Operations</div>
          <div className={`sb-item${activeSidebar === "overview" ? " on" : ""}`}>
            <IconOverview />
            Overview
          </div>
          <div className={`sb-item${activeSidebar === "bookings" ? " on" : ""}`}>
            <IconCalendar />
            Bookings
            <span className="sb-badge">142</span>
          </div>
          <div className={`sb-item${activeSidebar === "schedule" ? " on" : ""}`}>
            <IconClock />
            Schedule
          </div>
          <div className={`sb-item${activeSidebar === "fleet" ? " on" : ""}`}>
            <IconFleet />
            Fleet
            <span className="sb-badge">38</span>
          </div>
          <div className={`sb-item${activeSidebar === "crm" ? " on" : ""}`}>
            <IconCrm />
            CRM
          </div>
          <div className={`sb-item${activeSidebar === "reports" ? " on" : ""}`}>
            <IconReports />
            Reports
          </div>
          <div className={`sb-item${activeSidebar === "settings" ? " on" : ""}`}>
            <IconSettings />
            Settings
          </div>
          <div className="sb-foot">
            <div className="t">Stripe payouts</div>
            <div className="s">
              Next payout $182,440
              <br />
              Fri 19 Sep · 5 accounts
            </div>
          </div>
        </aside>

        <main className="opmain">{children}</main>
      </div>
    </section>
  );
}
