/** 900×1600 — choose a saved payment method. */

import { MemorialPlanningMobileHeader } from "@/components/capture/memorial-planning/portal-chrome";

const methods = [
  {
    id: "visa",
    title: "Visa ending in 4821",
    subtitle: "Expires 08/28 · Default",
    selected: true,
  },
  {
    id: "ach",
    title: "Bank account ending in 9034",
    subtitle: "Checking · Verified",
    selected: false,
  },
  {
    id: "mc",
    title: "Mastercard ending in 7712",
    subtitle: "Expires 03/27",
    selected: false,
  },
];

export function MemorialPlanningPhoneMethodPickerCapture() {
  return (
    <div className="mp-capture-root">
      <section className="capture capture--phone" aria-label="Choose payment method">
        <div className="mobile-inner">
        <MemorialPlanningMobileHeader title="Payment method" />

        <div className="mobile-content method-picker-content">
          <div className="mobile-plan-label">Mitchell Family Plan</div>
          <h1 className="mobile-title">Choose how to pay</h1>
          <p className="mobile-intro">
            Pick a saved method for this $215.00 payment, or add a new card or bank
            account.
          </p>

          <ul className="method-picker-list">
            {methods.map((method) => (
              <li key={method.id}>
                <button
                  type="button"
                  className={`payment-method-card method-picker-card${method.selected ? " selected-method" : ""}`}
                >
                  <div className="payment-card-icon">
                    <svg viewBox="0 0 24 24">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 10h18" />
                      <path d="M7 15h3" />
                    </svg>
                  </div>
                  <div className="method-copy">
                    <div className="method-title">{method.title}</div>
                    <div className="method-subtitle">{method.subtitle}</div>
                  </div>
                  {method.selected ? (
                    <div className="selected-check">✓</div>
                  ) : (
                    <span className="radio" />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <button type="button" className="add-method-link">
            + Add a new card or bank account
          </button>

          <div className="lock-line">
            <svg viewBox="0 0 24 24">
              <rect x="5" y="10" width="14" height="11" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
            Tokenized with Trust Commerce. Card numbers never touch the portal servers.
          </div>
        </div>

          <section className="mobile-action-area">
            <button type="button" className="primary-button mobile-primary">
              Continue with Visa •••• 4821
            </button>
          </section>
        </div>
      </section>
    </div>
  );
}
