/** 900×1600 Track Hero session detail — mobile web. */

export function TrackHeroPhoneSessionDetailCapture() {
  return (
    <div className="th-capture-root">
      <section className="capture capture--phone" aria-label="Track Hero session detail on phone">
        <div className="p-topbar">
          <button type="button" className="p-icon" aria-label="Back">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="p-title">
            <span className="p-brand">TRACK HERO</span>
            Session detail
            <small>GT Sprint · Fri 18 Sep</small>
          </div>
          <button type="button" className="p-icon" aria-label="Share">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
          </button>
        </div>

        <div className="p-body p-body--scroll">
          <div className="sd-hero">
            <div className="sd-time">09:40</div>
            <div data-h="1">GT Sprint — Open Lapping</div>
            <p className="sd-sub">45 min · Intermediate · Dry conditions</p>
            <div className="sd-tags">
              <span className="ps-tag">12 seats left</span>
              <span className="sd-tag-outline">Coaching included</span>
            </div>
          </div>

          <div className="sd-section">
            <div data-h="2">What is included</div>
            <ul className="sd-list">
              <li>Track time on Apex Raceway full course</li>
              <li>Garage access 30 minutes before session</li>
              <li>Radio briefing and pace car lead-out</li>
              <li>Digital ticket and QR check-in</li>
            </ul>
          </div>

          <div className="sd-section">
            <div data-h="2">Driver requirements</div>
            <ul className="sd-list">
              <li>Valid driver license and signed waiver on file</li>
              <li>Intermediate group approval or prior Track Hero event</li>
              <li>Closed-toe shoes and long pants required</li>
            </ul>
          </div>

          <div className="sd-section">
            <div data-h="2">Pricing</div>
            <div className="sd-price-row">
              <span>Per driver</span>
              <b>$340.00</b>
            </div>
            <p className="sd-note">Taxes and fees calculated at checkout. Promo codes and account credits apply before card charge.</p>
          </div>
        </div>

        <div className="p-cta">
          <div className="amt">
            <span>From</span>
            <b>$340.00</b>
          </div>
          <button type="button">Continue to checkout</button>
        </div>
      </section>
    </div>
  );
}
