/** 1600×900 — payment history with filters and export. */

import {
  MemorialPlanningSidebar,
  MemorialPlanningWebFooter,
} from "@/components/capture/memorial-planning/portal-chrome";

const rows = [
  {
    date: "Sep 15, 2026",
    desc: "Scheduled plan payment",
    method: "Visa •••• 4821",
    amount: "$215.00",
    status: "Completed",
  },
  {
    date: "Aug 15, 2026",
    desc: "Scheduled plan payment",
    method: "Visa •••• 4821",
    amount: "$215.00",
    status: "Completed",
  },
  {
    date: "Jul 15, 2026",
    desc: "Scheduled plan payment",
    method: "Visa •••• 4821",
    amount: "$215.00",
    status: "Completed",
  },
  {
    date: "Jun 15, 2026",
    desc: "Scheduled plan payment",
    method: "Visa •••• 4821",
    amount: "$215.00",
    status: "Completed",
  },
  {
    date: "May 15, 2026",
    desc: "One-time payment",
    method: "Visa •••• 4821",
    amount: "$500.00",
    status: "Completed",
  },
];

function ReceiptIcon() {
  return (
    <svg className="receipt-icon" viewBox="0 0 24 24">
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" />
      <path d="M9 8h6M9 12h6" />
    </svg>
  );
}

export function MemorialPlanningWebPaymentHistoryCapture() {
  return (
    <div className="mp-capture-root">
      <section className="capture capture--web" aria-label="Payment history">
        <MemorialPlanningSidebar active="payment-history" />
        <section className="desktop-main">
          <header className="main-header">
            <div>
              <p className="eyebrow">Account activity</p>
              <div data-h="1" className="desktop-title">Payment history</div>
              <p className="header-copy">
                Mitchell Family Plan · Plan ID MP-2841-019
              </p>
            </div>
            <div className="header-actions">
              <button type="button" className="secondary-button">
                Export CSV
              </button>
              <div className="secure-pill">
                <span className="lock-mini" />
                Secure account
              </div>
            </div>
          </header>

          <div className="history-toolbar card">
            <div className="history-filters" role="group" aria-label="Filter payments">
              <button type="button" className="filter-chip active">
                All payments
              </button>
              <button type="button" className="filter-chip">
                Completed
              </button>
              <button type="button" className="filter-chip">
                Scheduled
              </button>
            </div>
            <div className="history-search">
              <span className="history-search-label">Search</span>
              <div className="history-search-field">Receipt or confirmation #</div>
            </div>
          </div>

          <div className="card table-card history-table-card">
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
                {rows.map((row) => (
                  <tr key={`${row.date}-${row.amount}`}>
                    <td>{row.date}</td>
                    <td>{row.desc}</td>
                    <td>{row.method}</td>
                    <td>{row.amount}</td>
                    <td>
                      <span className="payment-status">{row.status}</span>
                    </td>
                    <td>
                      <ReceiptIcon />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <MemorialPlanningWebFooter />
        </section>
      </section>
    </div>
  );
}
