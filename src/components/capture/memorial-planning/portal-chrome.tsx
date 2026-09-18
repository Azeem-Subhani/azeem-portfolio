/** Shared sidebar chrome for memorial-planning case-study captures. */

import type { ReactElement } from "react";

export type MemorialPortalNav =
  | "overview"
  | "make-payment"
  | "payment-history"
  | "documents"
  | "support";

function IconHome() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M3 10.5 12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5z" />
      <path d="M9 21v-6h6v6" />
    </svg>
  );
}

function IconCard() {
  return (
    <svg viewBox="0 0 24 24">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
      <path d="M7 15h3" />
    </svg>
  );
}

function IconHistory() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v5h5" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function IconDocs() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M7 3h7l4 4v14H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h6" />
    </svg>
  );
}

function IconSupport() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M20 15a4 4 0 0 1-4 4H8l-4 3v-7a4 4 0 0 1-1-2.7V8a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4z" />
      <path d="M8 10h.01M12 10h.01M16 10h.01" />
    </svg>
  );
}

const navItems: { id: MemorialPortalNav; label: string; icon: () => ReactElement }[] = [
  { id: "overview", label: "Overview", icon: IconHome },
  { id: "make-payment", label: "Make a payment", icon: IconCard },
  { id: "payment-history", label: "Payment history", icon: IconHistory },
  { id: "documents", label: "Documents", icon: IconDocs },
  { id: "support", label: "Support", icon: IconSupport },
];

export function MemorialPlanningSidebar({ active }: { active: MemorialPortalNav }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark" aria-hidden="true" />
        <div>
          <div className="brand-wordmark">Memorial Planning</div>
          <div className="brand-subtitle">Client Portal</div>
        </div>
      </div>
      <nav className="nav" aria-label="Portal navigation">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`nav-item${item.id === active ? " active" : ""}`}
          >
            <item.icon />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="sidebar-spacer" />
      <div className="account-menu">
        <div className="avatar">EM</div>
        <div className="account-copy">
          <div className="account-name">Eleanor Mitchell</div>
          <div className="account-number">Account ending in 2841</div>
        </div>
        <span className="chevron">⌄</span>
      </div>
    </aside>
  );
}

export function MemorialPlanningWebFooter() {
  return (
    <footer className="desktop-footer">
      <div className="footer-secure">
        <span>Payments are securely processed by Trust Commerce.</span>
        <span>•</span>
        <span>Your information is protected</span>
      </div>
      <div className="footer-links">
        <span>Privacy</span>
        <span>Terms</span>
        <span>Accessibility</span>
      </div>
    </footer>
  );
}

export function MemorialPlanningMobileHeader({
  title,
  backLabel = "Go back",
}: {
  title: string;
  backLabel?: string;
}) {
  return (
    <header className="mobile-header">
      <button type="button" className="back-button" aria-label={backLabel}>
        <svg viewBox="0 0 24 24">
          <path d="M15 18 9 12l6-6" />
        </svg>
      </button>
      <div className="mobile-header-title">{title}</div>
      <button type="button" className="mobile-help" aria-label="Help">
        <span>?</span>
      </button>
    </header>
  );
}
