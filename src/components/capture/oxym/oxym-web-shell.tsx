import type { ReactNode } from "react";

export type OxymWebNavId =
  | "today"
  | "schedule"
  | "roster"
  | "messages"
  | "invoices"
  | "emails";

type OxymWebShellProps = {
  activeNav: OxymWebNavId;
  children: ReactNode;
  topbarTitle?: string;
  topbarSub?: string;
};

const navItems: { id: OxymWebNavId; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "schedule", label: "Schedule" },
  { id: "roster", label: "Roster" },
  { id: "messages", label: "Messages" },
  { id: "invoices", label: "Invoices" },
  { id: "emails", label: "Emails" },
];

function NavIcon({ id }: { id: OxymWebNavId }) {
  switch (id) {
    case "today":
      return (
        <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="9" cy="9" r="6.6" />
          <circle cx="9" cy="9" r="2.3" fill="currentColor" stroke="none" />
        </svg>
      );
    case "schedule":
      return (
        <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <rect x="2.6" y="4.2" width="12.8" height="11.2" rx="3" />
          <path d="M2.6 8h12.8M6.4 2.6v3.2M11.6 2.6v3.2" />
        </svg>
      );
    case "roster":
      return (
        <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="9" cy="6.4" r="3" />
          <path d="M3.4 15.2c.7-2.9 2.9-4.4 5.6-4.4s4.9 1.5 5.6 4.4" />
        </svg>
      );
    case "messages":
      return (
        <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
          <path d="M15.4 8.6c0 3-2.6 5.4-5.9 5.4-.8 0-1.6-.1-2.3-.4l-3.3 1.1.9-2.7a5.1 5.1 0 0 1-1.2-3.4c0-3 2.6-5.4 5.9-5.4s5.9 2.4 5.9 5.4Z" />
        </svg>
      );
    case "invoices":
      return (
        <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <rect x="2.6" y="4.6" width="12.8" height="8.8" rx="2.6" />
          <path d="M2.6 8.1h12.8" />
        </svg>
      );
    case "emails":
      return (
        <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
          <rect x="2.6" y="4.2" width="12.8" height="9.6" rx="2.6" />
          <path d="m3.6 5.6 5.4 4 5.4-4" />
        </svg>
      );
  }
}

export function OxymWebShell({
  activeNav,
  children,
  topbarTitle = "Northside FC",
  topbarSub = "First Team, Season 2025/26",
}: OxymWebShellProps) {
  return (
    <section className="capture capture--web" aria-label="Oxym web app">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="8.4" stroke="currentColor" strokeWidth="2.6" />
              <circle cx="12" cy="12" r="2.7" fill="currentColor" />
            </svg>
          </span>
          <span className="brand-word">Oxym</span>
        </div>

        <nav className="nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-item${activeNav === item.id ? " is-active" : ""}`}
            >
              <NavIcon id={item.id} />
              <span>{item.label}</span>
              {item.id === "messages" ? <span className="count">3</span> : null}
              {item.id === "invoices" ? <span className="count count--quiet">3</span> : null}
            </button>
          ))}
        </nav>

        <div className="side-foot">
          <button type="button" className="team-switch">
            <span className="crest crest--sm">NF</span>
            <span className="team-switch-text">
              <span className="team-switch-name">Northside FC</span>
              <span className="team-switch-sub">First Team</span>
            </span>
            <svg
              className="chev"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m4 6.5 4 4 4-4" />
            </svg>
          </button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="topbar-left">
            <span className="crest crest--md">NF</span>
            <div>
              <h1 className="topbar-title">{topbarTitle}</h1>
              <p className="topbar-sub">{topbarSub}</p>
            </div>
          </div>
          <div className="topbar-right">
            <div className="search">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <circle cx="7.2" cy="7.2" r="4.6" />
                <path d="m11 11 3 3" />
              </svg>
              <span>Search players, fixtures</span>
            </div>
            <button type="button" className="btn btn--primary">
              New fixture
            </button>
            <span className="avatar--user">MC</span>
          </div>
        </header>
        {children}
      </main>
    </section>
  );
}
