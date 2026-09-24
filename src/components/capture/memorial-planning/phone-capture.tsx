/** 900×1600 Memorial Planning payment portal — make a payment. */

export function MemorialPlanningPhoneCapture() {
  return (
    <div className="mp-capture-root">
      <section className="capture capture--phone" aria-label="Memorial Planning payment on phone">
        <div className="mobile-inner">
        <header className="mobile-header">
          <button type="button" className="back-button" aria-label="Go back">
            <svg viewBox="0 0 24 24">
              <path d="M15 18 9 12l6-6" />
            </svg>
          </button>
          <div className="mobile-header-title">Make a payment</div>
          <button type="button" className="mobile-help" aria-label="Help">
            <span>?</span>
          </button>
        </header>

        <div className="mobile-content">
          <div className="mobile-plan-label">Mitchell Family Plan</div>
          <div data-h="1" className="mobile-title">Make a payment</div>
          <p className="mobile-intro">Choose an amount toward your pre-arranged services.</p>

          <section className="mobile-card" aria-label="Plan balance">
            <div className="balance-topline">
              <span>Remaining balance</span>
              <span className="plan-small-id">Plan MP-2841-019</span>
            </div>
            <div className="mobile-balance">$4,280.00</div>
            <div className="mobile-divider" />
            <div className="details-grid">
              <div>
                <span className="detail-label">Next scheduled payment</span>
                <span className="detail-value">$215.00</span>
              </div>
              <div>
                <span className="detail-label">Due date</span>
                <span className="detail-value">Oct 15, 2026</span>
              </div>
            </div>
          </section>

          <section className="form-section">
            <div data-h="2" className="form-heading">Payment amount</div>
            <label className="amount-input">
              <span className="currency">$</span>
              <input type="text" defaultValue="215.00" readOnly inputMode="decimal" aria-label="Payment amount" />
            </label>
            <p className="amount-help">Your scheduled monthly payment is $215.00.</p>
            <div className="chip-row" aria-label="Payment amount presets">
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

          <section className="form-section">
            <div className="method-heading">
              <div data-h="2" className="form-heading tight">Payment method</div>
              <button type="button" className="change-link">
                Change
              </button>
            </div>
            <div className="payment-method-card">
              <div className="payment-card-icon">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 10h18" />
                  <path d="M7 15h3" />
                </svg>
              </div>
              <div className="method-copy">
                <div className="method-title">Visa ending in 4821</div>
                <div className="method-subtitle">Expires 08/28</div>
              </div>
              <div className="selected-check">✓</div>
            </div>
            <div className="lock-line">
              <svg viewBox="0 0 24 24">
                <rect x="5" y="10" width="14" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>
              Your payment details are encrypted and securely processed.
            </div>
          </section>

          <section className="form-section">
            <div data-h="2" className="form-heading">When would you like to pay?</div>
            <div className="date-options">
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

          <section className="mobile-action-area">
            <button type="button" className="primary-button mobile-primary">
              Review payment
            </button>
            <div className="trust-line">
              <span className="trust-lock">⌑</span>
              Secure payment processing by Trust Commerce
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
