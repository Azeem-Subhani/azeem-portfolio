/** 1600×900 — desktop make a payment flow. */

import {
  MemorialPlanningSidebar,
  MemorialPlanningWebFooter,
} from "@/components/capture/memorial-planning/portal-chrome";

export function MemorialPlanningWebMakePaymentCapture() {
  return (
    <div className="mp-capture-root">
      <section className="capture capture--web" aria-label="Make a payment on desktop">
        <MemorialPlanningSidebar active="make-payment" />
        <section className="desktop-main">
          <header className="main-header">
            <div>
              <p className="eyebrow">Secure checkout</p>
              <div data-h="1" className="desktop-title">Make a payment</div>
              <p className="header-copy">
                Apply a payment toward Mitchell Family Plan (MP-2841-019).
              </p>
            </div>
            <div className="secure-pill">
              <span className="lock-mini" />
              Encrypted session
            </div>
          </header>

          <div className="pay-desktop-grid">
            <div className="pay-desktop-form">
              <section className="card pay-panel">
                <div className="card-label">Payment amount</div>
                <label className="amount-input desktop-amount-input">
                  <span className="currency">$</span>
                  <input
                    type="text"
                    defaultValue="215.00"
                    readOnly
                    inputMode="decimal"
                    aria-label="Payment amount"
                  />
                </label>
                <div className="chip-row">
                  <button type="button" className="amount-chip selected">
                    $215
                  </button>
                  <button type="button" className="amount-chip">
                    $500
                  </button>
                  <button type="button" className="amount-chip">
                    Pay balance
                  </button>
                </div>
              </section>

              <section className="card pay-panel">
                <div className="method-heading">
                  <div className="card-label tight-label">Payment method</div>
                  <button type="button" className="change-link">
                    Change
                  </button>
                </div>
                <div className="payment-method-card desktop-method-card">
                  <div className="payment-card-icon">
                    <svg viewBox="0 0 24 24">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 10h18" />
                      <path d="M7 15h3" />
                    </svg>
                  </div>
                  <div className="method-copy">
                    <div className="method-title">Visa ending in 4821</div>
                    <div className="method-subtitle">Expires 08/28 · Default</div>
                  </div>
                  <div className="selected-check">✓</div>
                </div>
              </section>

              <section className="card pay-panel">
                <div className="card-label">Payment date</div>
                <div className="date-options desktop-date-options">
                  <button type="button" className="date-option selected">
                    <span className="radio" />
                    <div className="date-title">Today</div>
                    <div className="date-subtitle">Sep 12, 2026</div>
                  </button>
                  <button type="button" className="date-option">
                    <span className="radio" />
                    <div className="date-title">On scheduled date</div>
                    <div className="date-subtitle">Oct 15, 2026</div>
                  </button>
                </div>
              </section>
            </div>

            <aside className="card pay-summary-panel">
              <div className="card-label">Payment summary</div>
              <div className="pay-summary-balance">
                <span>Remaining balance</span>
                <strong>$4,280.00</strong>
              </div>
              <div className="summary-row">
                <span>Payment amount</span>
                <strong>$215.00</strong>
              </div>
              <div className="summary-row">
                <span>Processing fee</span>
                <strong>$0.00</strong>
              </div>
              <div className="summary-row summary-total">
                <span>Total today</span>
                <strong>$215.00</strong>
              </div>
              <button type="button" className="primary-button pay-submit">
                Review payment
              </button>
              <p className="receipt-note">
                Receipt goes to eleanor.mitchell@email.com after authorization.
              </p>
            </aside>
          </div>

          <MemorialPlanningWebFooter />
        </section>
      </section>
    </div>
  );
}
