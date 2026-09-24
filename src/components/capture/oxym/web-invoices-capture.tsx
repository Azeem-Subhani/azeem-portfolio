import { OxymWebShell } from "@/components/capture/oxym/oxym-web-shell";

/** 1600×900 Oxym coach invoices and wallet */
export function OxymWebInvoicesCapture() {
  return (
    <div className="oxym-capture-root">
      <OxymWebShell activeNav="invoices" topbarTitle="Invoices" topbarSub="Stripe Connect, First Team wallet">
        <div className="invoices-layout">
          <div className="invoices-summary">
            <article className="card invoice-stat">
              <p className="eyebrow">Outstanding</p>
              <p className="stat-amount">£420</p>
              <p className="stat-note">across 9 players</p>
            </article>
            <article className="card invoice-stat">
              <p className="eyebrow">Collected this month</p>
              <p className="stat-amount">£1,035</p>
              <p className="stat-note">23 payments via Connect</p>
            </article>
            <article className="card invoice-stat invoice-stat--connect">
              <p className="eyebrow">Payout account</p>
              <p className="connect-status">Verified</p>
              <p className="stat-note">Northside FC treasury</p>
            </article>
          </div>

          <article className="card panel invoices-table">
            <header className="panel-head">
              <div data-h="2">March subs</div>
              <div className="invoices-actions">
                <button type="button" className="btn btn--ghost btn--sm">
                  Filter
                </button>
                <button type="button" className="btn btn--primary btn--sm">
                  New invoice
                </button>
              </div>
            </header>

            <ul className="rows rows--invoices">
              <li className="row row--head">
                <span className="row-name">Player</span>
                <span className="row-amount">Amount</span>
                <span className="row-status">Status</span>
              </li>
              <li className="row">
                <span className="row-name">Tomas Berg</span>
                <span className="row-amount">£45</span>
                <span className="pill pill--rose">Overdue</span>
              </li>
              <li className="row">
                <span className="row-name">Leo Mensah</span>
                <span className="row-amount">£45</span>
                <span className="pill pill--rose">Overdue</span>
              </li>
              <li className="row">
                <span className="row-name">Priya Raman</span>
                <span className="row-amount">£45</span>
                <span className="pill pill--sand">Sent 3d ago</span>
              </li>
              <li className="row">
                <span className="row-name">Ada Okonkwo</span>
                <span className="row-amount">£45</span>
                <span className="pill pill--mint">Paid</span>
              </li>
              <li className="row">
                <span className="row-name">Marcus Cole</span>
                <span className="row-amount">£45</span>
                <span className="pill pill--mint">Paid</span>
              </li>
            </ul>

            <div className="panel-actions">
              <button type="button" className="btn btn--ghost btn--sm">
                Send reminders
              </button>
              <button type="button" className="btn btn--primary btn--sm">
                Record cash payment
              </button>
            </div>
          </article>
        </div>
      </OxymWebShell>
    </div>
  );
}
