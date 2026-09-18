/** 900×1600 — payment confirmed on phone. */

import { MemorialPlanningMobileHeader } from "@/components/capture/memorial-planning/portal-chrome";

export function MemorialPlanningPhoneConfirmationCapture() {
  return (
    <div className="mp-capture-root">
      <section className="capture capture--phone" aria-label="Payment confirmed on phone">
        <div className="mobile-inner">
        <MemorialPlanningMobileHeader title="Payment confirmed" backLabel="Back to overview" />

        <div className="mobile-content confirmation-content">
          <div className="confirmation-badge" aria-hidden="true">
            ✓
          </div>
          <h1 className="mobile-title confirmation-title">You&apos;re all set</h1>
          <p className="mobile-intro confirmation-intro">
            $215.00 applied to Mitchell Family Plan. A receipt is on its way to
            eleanor.mitchell@email.com.
          </p>

          <section className="mobile-card confirmation-card">
            <div className="confirmation-amount">$215.00</div>
            <div className="confirmation-meta">Sep 15, 2026 · Visa •••• 4821</div>
            <div className="mobile-divider" />
            <div className="details-grid">
              <div>
                <span className="detail-label">Confirmation</span>
                <span className="detail-value">MP-2026-0915</span>
              </div>
              <div>
                <span className="detail-label">New balance</span>
                <span className="detail-value">$4,280.00</span>
              </div>
            </div>
          </section>

          <section className="review-card confirmation-notify">
            <h2 className="review-title">Care team notified</h2>
            <p className="receipt-note">
              Staff receive an automated update when your payment posts. No call needed
              to confirm it landed.
            </p>
          </section>
        </div>

          <section className="mobile-action-area">
            <button type="button" className="primary-button mobile-primary">
              View receipt
            </button>
            <button type="button" className="text-button-link">
              Return to account overview
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
