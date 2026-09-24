/** 900×1600 Oxym player invoice screen */
export function OxymPhoneInvoiceCapture() {
  return (
    <div className="oxym-capture-root">
      <section className="capture capture--phone" aria-label="Oxym invoice on phone">
        <div className="p-inner">
        <header className="p-head">
          <button type="button" className="icon-btn" aria-label="Back">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m14.5 5.5-6.5 6.5 6.5 6.5" />
            </svg>
          </button>

          <div className="p-title">
            <div data-h="1">March subs</div>
            <p>First Team wallet</p>
          </div>

          <button type="button" className="icon-btn" aria-label="Invoice options">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="5.5" cy="12" r="1.4" fill="currentColor" stroke="none" />
              <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
              <circle cx="18.5" cy="12" r="1.4" fill="currentColor" stroke="none" />
            </svg>
          </button>
        </header>

        <div className="p-body p-body--invoice">
          <article className="invoice-card">
            <div className="invoice-card-top">
              <span className="attach-label">Amount due</span>
              <span className="attach-amount">£45.00</span>
            </div>
            <p className="invoice-card-title">March subs, First Team</p>
            <p className="invoice-card-meta">Due 20 Mar · Stripe Connect</p>

            <ul className="invoice-lines">
              <li>
                <span>Monthly membership</span>
                <span>£40.00</span>
              </li>
              <li>
                <span>Pitch levy</span>
                <span>£5.00</span>
              </li>
            </ul>

            <button type="button" className="btn-pay btn-pay--full">
              Pay now
            </button>
          </article>

          <div className="invoice-history">
            <p className="invoice-history-label">Recent</p>
            <article className="invoice-row">
              <div>
                <p className="invoice-row-title">February subs</p>
                <p className="invoice-row-sub">Paid 18 Feb</p>
              </div>
              <span className="pill pill--mint pill--p">Paid</span>
            </article>
            <article className="invoice-row">
              <div>
                <p className="invoice-row-title">Away kit deposit</p>
                <p className="invoice-row-sub">Paid 2 Jan</p>
              </div>
              <span className="pill pill--mint pill--p">Paid</span>
            </article>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
}
