/** 1600×900 Memorial Planning payment portal — account overview. */

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

function IconBell() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </svg>
  );
}

function IconChat() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M4 5h16v11H8l-4 3z" />
      <path d="M8 10h8M8 13h5" />
    </svg>
  );
}

function ReceiptIcon() {
  return (
    <svg className="receipt-icon" viewBox="0 0 24 24">
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
      <path d="M9 8h6M9 12h6" />
    </svg>
  );
}

const activity = [
  { date: "Sep 15, 2026", desc: "Scheduled plan payment", method: "Visa •••• 4821", amount: "$215.00" },
  { date: "Aug 15, 2026", desc: "Scheduled plan payment", method: "Visa •••• 4821", amount: "$215.00" },
  { date: "Jul 15, 2026", desc: "Scheduled plan payment", method: "Visa •••• 4821", amount: "$215.00" },
];

export function MemorialPlanningWebCapture() {
  return (
    <div className="mp-capture-root">
      <section className="capture capture--web" aria-label="Memorial Planning payment portal">
        <aside className="sidebar">
          <div className="brand">
            <div className="brand-mark" aria-hidden="true" />
            <div>
              <div className="brand-wordmark">Memorial Planning</div>
              <div className="brand-subtitle">Client Portal</div>
            </div>
          </div>
          <nav className="nav" aria-label="Portal navigation">
            <button type="button" className="nav-item active">
              <IconHome />
              Overview
            </button>
            <button type="button" className="nav-item">
              <IconCard />
              Make a payment
            </button>
            <button type="button" className="nav-item">
              <IconHistory />
              Payment history
            </button>
            <button type="button" className="nav-item">
              <IconDocs />
              Documents
            </button>
            <button type="button" className="nav-item">
              <IconSupport />
              Support
            </button>
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

        <section className="desktop-main">
          <header className="main-header">
            <div>
              <p className="eyebrow">Welcome back</p>
              <div data-h="1" className="desktop-title">Good evening, Eleanor.</div>
              <p className="header-copy">Here is an overview of your pre-arranged plan.</p>
            </div>
            <div className="header-actions">
              <button type="button" className="icon-button" aria-label="Notifications">
                <IconBell />
                <span className="notification-dot" />
              </button>
              <span className="help-link">Help</span>
              <div className="secure-pill">
                <span className="lock-mini" />
                Secure account
              </div>
            </div>
          </header>

          <div className="top-grid">
            <article className="card balance-card">
              <div className="card-label">Your plan balance</div>
              <div className="balance-amount">$4,280.00</div>
              <div className="balance-context">of $8,500.00 total plan cost</div>
              <div className="progress-wrap">
                <div className="progress-bar" aria-label="49.65 percent paid">
                  <div className="progress-value" />
                </div>
                <div className="progress-caption">
                  <span>$4,220.00 paid to date</span>
                  <span>49.65% complete</span>
                </div>
              </div>
              <div className="balance-footer">
                <span className="plan-id">Plan ID MP-2841-019</span>
                <span className="text-link">View plan details →</span>
              </div>
            </article>
            <article className="card next-card">
              <div className="card-label">Next payment</div>
              <div className="next-date">October 15, 2026</div>
              <div className="next-amount">$215.00</div>
              <div className="next-subtext">Monthly scheduled payment</div>
              <button type="button" className="primary-button">
                Make a payment
              </button>
              <br />
              <span className="next-manage">Manage automatic payments</span>
            </article>
          </div>

          <div className="section-heading-row">
            <div data-h="2" className="section-heading">Payment activity</div>
            <span className="text-link">View all history →</span>
          </div>

          <div className="activity-layout">
            <div className="card table-card">
              <table className="payments-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Payment method</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th aria-label="Receipt" />
                  </tr>
                </thead>
                <tbody>
                  {activity.map((row) => (
                    <tr key={row.date}>
                      <td>{row.date}</td>
                      <td>{row.desc}</td>
                      <td>{row.method}</td>
                      <td>{row.amount}</td>
                      <td>
                        <span className="payment-status">Completed</span>
                      </td>
                      <td>
                        <ReceiptIcon />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <aside className="card support-card">
              <div className="support-icon">
                <IconChat />
              </div>
              <div data-h="3" className="support-title">Need assistance?</div>
              <p className="support-copy">
                Our care team is here to help with questions about your plan or payment options.
              </p>
              <div className="support-phone">(800) 555-0148</div>
              <div className="support-hours">Monday–Friday, 8 AM–6 PM CT</div>
              <span className="text-link">Contact support →</span>
            </aside>
          </div>

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
        </section>
      </section>
    </div>
  );
}
