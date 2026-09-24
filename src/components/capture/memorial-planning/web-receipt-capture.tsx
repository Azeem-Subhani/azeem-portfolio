/** 1600×900 — payment receipt and confirmation detail. */

import {
  MemorialPlanningSidebar,
  MemorialPlanningWebFooter,
} from "@/components/capture/memorial-planning/portal-chrome";

export function MemorialPlanningWebReceiptCapture() {
  return (
    <div className="mp-capture-root">
      <section className="capture capture--web" aria-label="Payment receipt">
        <MemorialPlanningSidebar active="payment-history" />
        <section className="desktop-main receipt-main">
          <header className="main-header receipt-header">
            <div>
              <p className="eyebrow">Payment confirmed</p>
              <div data-h="1" className="desktop-title">Receipt MP-2026-0915-4821</div>
              <p className="header-copy">Sep 15, 2026 · Visa ending in 4821</p>
            </div>
            <div className="header-actions">
              <button type="button" className="secondary-button">
                Download PDF
              </button>
              <button type="button" className="primary-button">
                Email receipt
              </button>
            </div>
          </header>

          <div className="receipt-layout">
            <article className="card receipt-detail-card">
              <div className="receipt-success-banner">
                <span className="receipt-success-icon" aria-hidden="true">
                  ✓
                </span>
                <div>
                  <div className="receipt-success-title">$215.00 received</div>
                  <div className="receipt-success-sub">
                    Applied to Mitchell Family Plan · Confirmation emailed to
                    eleanor.mitchell@email.com
                  </div>
                </div>
              </div>

              <div className="receipt-lines">
                <div className="receipt-line">
                  <span>Payment amount</span>
                  <strong>$215.00</strong>
                </div>
                <div className="receipt-line">
                  <span>Processing fee</span>
                  <strong>$0.00</strong>
                </div>
                <div className="receipt-line receipt-line-total">
                  <span>Total charged</span>
                  <strong>$215.00</strong>
                </div>
              </div>

              <div className="receipt-meta-grid">
                <div>
                  <div className="receipt-meta-label">Plan balance after payment</div>
                  <div className="receipt-meta-value">$4,280.00</div>
                </div>
                <div>
                  <div className="receipt-meta-label">Next scheduled payment</div>
                  <div className="receipt-meta-value">Oct 15, 2026 · $215.00</div>
                </div>
                <div>
                  <div className="receipt-meta-label">Authorization code</div>
                  <div className="receipt-meta-value">TC-884219</div>
                </div>
                <div>
                  <div className="receipt-meta-label">Processed by</div>
                  <div className="receipt-meta-value">Trust Commerce</div>
                </div>
              </div>
            </article>

            <aside className="card receipt-side-card">
              <div data-h="2" className="receipt-side-title">Need a copy for your records?</div>
              <p className="receipt-side-copy">
                Download the PDF or forward the email receipt to a family member. Your care
                team can also resend confirmation from your account history.
              </p>
              <div className="receipt-notify-pill">
                <span className="notify-dot" aria-hidden="true" />
                Receipt emailed · Sep 15, 2026 at 9:14 AM CT
              </div>
              <span className="text-link">View payment history →</span>
            </aside>
          </div>

          <MemorialPlanningWebFooter />
        </section>
      </section>
    </div>
  );
}
