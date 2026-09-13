/** 1600×900 Oxym coach dashboard — ported from deepseek_html_20260911_c7333f.html */
export function OxymWebCapture() {
  return (
    <div className="oxym-capture-root">
      <section className="capture capture--web" aria-label="Oxym web app">
        <aside className="sidebar">
          <div className="brand">
            <span className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="8.4" stroke="currentColor" strokeWidth="2.6" />
                <circle cx="12" cy="12" r="2.7" fill="currentColor" />
              </svg>
            </span>
            <span className="brand-word">Oxym</span>
          </div>

          <nav className="nav">
            <button type="button" className="nav-item is-active">
              <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="9" cy="9" r="6.6" />
                <circle cx="9" cy="9" r="2.3" fill="currentColor" stroke="none" />
              </svg>
              <span>Today</span>
            </button>
            <button type="button" className="nav-item">
              <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <rect x="2.6" y="4.2" width="12.8" height="11.2" rx="3" />
                <path d="M2.6 8h12.8M6.4 2.6v3.2M11.6 2.6v3.2" />
              </svg>
              <span>Schedule</span>
            </button>
            <button type="button" className="nav-item">
              <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="9" cy="6.4" r="3" />
                <path d="M3.4 15.2c.7-2.9 2.9-4.4 5.6-4.4s4.9 1.5 5.6 4.4" />
              </svg>
              <span>Roster</span>
            </button>
            <button type="button" className="nav-item">
              <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
                <path d="M15.4 8.6c0 3-2.6 5.4-5.9 5.4-.8 0-1.6-.1-2.3-.4l-3.3 1.1.9-2.7a5.1 5.1 0 0 1-1.2-3.4c0-3 2.6-5.4 5.9-5.4s5.9 2.4 5.9 5.4Z" />
              </svg>
              <span>Messages</span>
              <span className="count">3</span>
            </button>
            <button type="button" className="nav-item">
              <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <rect x="2.6" y="4.6" width="12.8" height="8.8" rx="2.6" />
                <path d="M2.6 8.1h12.8" />
              </svg>
              <span>Invoices</span>
              <span className="count count--quiet">3</span>
            </button>
            <button type="button" className="nav-item">
              <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
                <rect x="2.6" y="4.2" width="12.8" height="9.6" rx="2.6" />
                <path d="m3.6 5.6 5.4 4 5.4-4" />
              </svg>
              <span>Emails</span>
            </button>
          </nav>

          <div className="side-foot">
            <button type="button" className="team-switch">
              <span className="crest crest--sm">NF</span>
              <span className="team-switch-text">
                <span className="team-switch-name">Northside FC</span>
                <span className="team-switch-sub">First Team</span>
              </span>
              <svg className="chev" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="m4 6.5 4 4 4-4" />
              </svg>
            </button>
          </div>
        </aside>

        <main className="main">
          <header className="topbar">
            <div className="topbar-left">
              <span className="crest crest--md">NF</span>
              <div>
                <h1 className="topbar-title">Northside FC</h1>
                <p className="topbar-sub">First Team, Season 2025/26</p>
              </div>
            </div>
            <div className="topbar-right">
              <div className="search">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <circle cx="7.2" cy="7.2" r="4.6" />
                  <path d="m11 11 3 3" />
                </svg>
                <span>Search players, fixtures</span>
              </div>
              <button type="button" className="btn btn--primary">
                New fixture
              </button>
              <span className="avatar--user">MC</span>
            </div>
          </header>

          <section className="hero">
            <div className="hero-fixture">
              <p className="eyebrow">Next fixture</p>

              <div className="scoreline">
                <div className="side">
                  <span className="crest crest--lg crest--away">HR</span>
                  <div>
                    <p className="side-name">Harbour Rovers</p>
                    <p className="side-role">Home</p>
                  </div>
                </div>

                <div className="kickoff">
                  <p className="kickoff-time">15:00</p>
                  <p className="kickoff-date">Sat 14 Mar</p>
                </div>

                <div className="side side--right">
                  <div>
                    <p className="side-name">Northside FC</p>
                    <p className="side-role">Away</p>
                  </div>
                  <span className="crest crest--lg">NF</span>
                </div>
              </div>

              <div className="hero-meta">
                <span>Dockside Park, Pitch 2</span>
                <span className="dot-sep" />
                <span>Round 18, League</span>
              </div>

              <div className="hero-actions">
                <button type="button" className="btn btn--primary">
                  Set lineup
                </button>
                <button type="button" className="btn btn--ghost">
                  Message squad
                </button>
              </div>
            </div>

            <div className="hero-status">
              <p className="eyebrow">Availability</p>
              <p className="big-stat">
                <span className="big-num">18</span>
                <span className="big-den">of 22</span>
              </p>
              <p className="stat-note">confirmed for Saturday</p>
              <div className="meter">
                <span />
              </div>

              <div className="awaiting">
                <div className="avatars">
                  <span className="av av--a">DW</span>
                  <span className="av av--b">TB</span>
                  <span className="av av--c">PR</span>
                </div>
                <span>4 players haven&apos;t replied</span>
              </div>
            </div>
          </section>

          <section className="panels">
            <article className="card panel">
              <header className="panel-head">
                <h2>Squad</h2>
                <span className="pill pill--mint">18 available</span>
              </header>
              <ul className="rows">
                <li className="row">
                  <span className="num">1</span>
                  <span className="row-name">Ada Okonkwo</span>
                  <span className="pill pill--mint">Available</span>
                </li>
                <li className="row">
                  <span className="num">8</span>
                  <span className="row-name">Marcus Cole</span>
                  <span className="pill pill--mint">Available</span>
                </li>
                <li className="row">
                  <span className="num">10</span>
                  <span className="row-name">Dana Whitfield</span>
                  <span className="pill pill--mint">Available</span>
                </li>
                <li className="row">
                  <span className="num">4</span>
                  <span className="row-name">Priya Raman</span>
                  <span className="pill pill--sand">Doubtful</span>
                </li>
                <li className="row">
                  <span className="num">7</span>
                  <span className="row-name">Tomas Berg</span>
                  <span className="pill pill--grey">No reply</span>
                </li>
                <li className="row">
                  <span className="num">15</span>
                  <span className="row-name">Leo Mensah</span>
                  <span className="pill pill--rose">Out</span>
                </li>
              </ul>
            </article>

            <article className="card panel">
              <header className="panel-head">
                <h2>Invoices</h2>
                <span className="pill pill--rose">3 unpaid</span>
              </header>

              <p className="panel-stat">
                <span className="stat-amount">£420</span>
                <span className="stat-note" style={{ marginTop: 0 }}>
                  outstanding across 9 players
                </span>
              </p>

              <ul className="rows">
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
              </ul>

              <div className="panel-actions" style={{ marginTop: "auto" }}>
                <button type="button" className="btn btn--ghost btn--sm">
                  Send reminders
                </button>
              </div>
            </article>

            <article className="card panel">
              <header className="panel-head">
                <h2>Matchday email</h2>
                <span className="pill pill--grey">Draft</span>
              </header>

              <p className="mail-subject">Harbour Rovers away, what to bring</p>
              <p className="mail-body">
                Squad, kick-off is 15:00 at Dockside Park. Arrive by 13:30 for warm-up. Both kits travel, the forecast is wet and the far pitch drains slowly.
              </p>

              <p className="mail-note">
                Drafted from the fixture, the squad list and Saturday&apos;s forecast.
              </p>

              <div className="panel-actions">
                <button type="button" className="btn btn--primary btn--sm">
                  Review and send
                </button>
              </div>
            </article>
          </section>
        </main>
      </section>
    </div>
  );
}
