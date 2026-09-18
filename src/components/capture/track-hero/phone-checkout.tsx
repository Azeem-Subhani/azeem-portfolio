/** 900×1600 Track Hero customer checkout — mobile web. */

export function TrackHeroPhoneCheckoutCapture() {
  return (
    <div className="th-capture-root">
      <section className="capture capture--phone" aria-label="Track Hero checkout on phone">
        <div className="p-topbar">
          <button type="button" className="p-icon" aria-label="Back">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="p-title">
            <span className="p-brand">TRACK HERO</span>
            Checkout
            <small>Apex Raceway · Fri 18 Sep</small>
          </div>
          <button type="button" className="p-icon" aria-label="Help">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path d="M9.5 9a2.5 2.5 0 115 0c0 2-2.5 2-2.5 4" />
              <path d="M12 17h.01" />
            </svg>
          </button>
        </div>

        <div className="p-body p-body--scroll">
          <div className="co-card">
            <div className="co-line">
              <div>
                <b>GT Sprint — Open Lapping</b>
                <span>09:40 · 45 min · 1 driver</span>
              </div>
              <strong>$340.00</strong>
            </div>
            <div className="co-line muted">
              <div>
                <b>Helmet rental</b>
                <span>Optional add-on</span>
              </div>
              <strong>$45.00</strong>
            </div>
          </div>

          <div className="co-field">
            <label>Promo code</label>
            <div className="co-input-row">
              <input type="text" readOnly value="TRACKDAY15" />
              <button type="button" className="co-apply on">
                Applied
              </button>
            </div>
            <p className="co-hint">−$51.00 · 15% off session</p>
          </div>

          <div className="co-field">
            <label>Account credit</label>
            <div className="co-credit">
              <span>Use $18.00 gift certificate balance</span>
              <span className="co-toggle on" aria-hidden="true" />
            </div>
          </div>

          <div className="co-field">
            <label>Payment</label>
            <div className="co-pay">
              <div className="co-pay-icon">VISA</div>
              <div>
                <b>Visa ···· 4242</b>
                <span>Stored card · expires 09/28</span>
              </div>
              <button type="button" className="co-change">
                Change
              </button>
            </div>
            <p className="co-stripe">Secured by Stripe</p>
          </div>

          <div className="co-total">
            <div className="co-total-row">
              <span>Subtotal</span>
              <span>$385.00</span>
            </div>
            <div className="co-total-row">
              <span>Promo</span>
              <span className="co-discount">−$51.00</span>
            </div>
            <div className="co-total-row">
              <span>Gift certificate</span>
              <span className="co-discount">−$18.00</span>
            </div>
            <div className="co-total-row grand">
              <span>Total due today</span>
              <b>$316.00</b>
            </div>
          </div>
        </div>

        <div className="p-cta">
          <div className="amt">
            <span>Total due today</span>
            <b>$316.00</b>
          </div>
          <button type="button">Pay &amp; confirm</button>
        </div>
      </section>
    </div>
  );
}
