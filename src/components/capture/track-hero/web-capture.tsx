/** 1600×900 Track Hero operator console — Group Overview. */

function IconOverview() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M8 3v4M16 3v4M3 11h18" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

function IconFleet() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17h14M6 17l1.5-5.5A2 2 0 019.4 10h5.2a2 2 0 011.9 1.5L18 17" />
      <circle cx="7.5" cy="19" r="1.6" />
      <circle cx="16.5" cy="19" r="1.6" />
    </svg>
  );
}

function IconCrm() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3.4" />
      <path d="M3 20a6 6 0 0112 0" />
      <path d="M16 5.5a3.4 3.4 0 010 5M18.5 20a6 6 0 00-2.2-4.6" />
    </svg>
  );
}

function IconReports() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19V9M10 19V5M16 19v-7M22 19H2" />
    </svg>
  );
}

function IconSettings() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.6 1.6 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.6 1.6 0 00-1.8-.3 1.6 1.6 0 00-1 1.5V21a2 2 0 11-4 0v-.1A1.6 1.6 0 008 19.4a1.6 1.6 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.6 1.6 0 00.3-1.8 1.6 1.6 0 00-1.5-1H2a2 2 0 110-4h.1A1.6 1.6 0 004.6 8a1.6 1.6 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.6 1.6 0 001.8.3H9a1.6 1.6 0 001-1.5V2a2 2 0 114 0v.1a1.6 1.6 0 001 1.5 1.6 1.6 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.6 1.6 0 00-.3 1.8V9a1.6 1.6 0 001.5 1H22a2 2 0 110 4h-.1a1.6 1.6 0 00-1.5 1z" />
    </svg>
  );
}

export function TrackHeroWebCapture() {
  return (
    <div className="th-capture-root">
      <section className="capture capture--web" aria-label="Track Hero operator console">
        <header className="topbar">
          <div className="brand">
            <div className="logo">TH</div>
            <div>
              <div className="b-name">TRACK HERO</div>
              <div className="b-sub">Ops Console</div>
            </div>
          </div>
          <nav className="nav">
            <button type="button" className="on">Dashboard</button>
            <button type="button">Bookings</button>
            <button type="button">Schedule</button>
            <button type="button">Fleet</button>
            <button type="button">CRM</button>
          </nav>
          <div className="tb-right">
            <button type="button" className="trackpill">
              <span className="dot" />
              All tracks · 5
              <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
                <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button type="button" className="iconbtn" aria-label="Notifications">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8a6 6 0 10-12 0c0 7-3 8-3 8h18s-3-1-3-8" />
                <path d="M13.7 21a2 2 0 01-3.4 0" />
              </svg>
            </button>
            <div className="avatar">JD</div>
          </div>
        </header>

        <div className="opbody">
          <aside className="sidebar">
            <div className="sb-title">Operations</div>
            <div className="sb-item on">
              <IconOverview />
              Overview
            </div>
            <div className="sb-item">
              <IconCalendar />
              Bookings
              <span className="sb-badge">142</span>
            </div>
            <div className="sb-item">
              <IconClock />
              Schedule
            </div>
            <div className="sb-item">
              <IconFleet />
              Fleet
              <span className="sb-badge">38</span>
            </div>
            <div className="sb-item">
              <IconCrm />
              CRM
            </div>
            <div className="sb-item">
              <IconReports />
              Reports
            </div>
            <div className="sb-item">
              <IconSettings />
              Settings
            </div>
            <div className="sb-foot">
              <div className="t">Stripe payouts</div>
              <div className="s">
                Next payout $182,440
                <br />
                Fri 19 Sep · 5 accounts
              </div>
            </div>
          </aside>

          <main className="opmain">
            <div className="ophead">
              <div>
                <div data-h="2">Operations overview</div>
                <p>All five tracks · Friday 18 September 2026 · Live</p>
              </div>
              <div className="ophead-right">
                <button type="button" className="btn-ghost">
                  Export CSV
                </button>
                <button type="button" className="btn-primary">
                  New booking
                </button>
              </div>
            </div>

            <div className="kpis">
              <div className="kpi">
                <div className="kpi-top">
                  <span>Revenue today</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#CCF94F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 17l6-6 4 4 8-8" />
                    <path d="M15 7h6v6" />
                  </svg>
                </div>
                <div className="kpi-val">$48,920</div>
                <div className="kpi-delta up">
                  ▲ 12.4% <span>vs last Fri</span>
                </div>
              </div>
              <div className="kpi">
                <div className="kpi-top">
                  <span>Track utilisation</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9AA1AC" strokeWidth="1.8" strokeLinecap="round">
                    <circle cx="12" cy="12" r="8" />
                    <path d="M12 12V6" />
                  </svg>
                </div>
                <div className="kpi-val">87.5%</div>
                <div className="kpi-delta up">
                  ▲ 3.1 pts <span>vs 7-day avg</span>
                </div>
              </div>
              <div className="kpi">
                <div className="kpi-top">
                  <span>Bookings confirmed</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9AA1AC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <div className="kpi-val">142</div>
                <div className="kpi-delta up">
                  ▲ 18 <span>new today</span>
                </div>
              </div>
              <div className="kpi">
                <div className="kpi-top">
                  <span>Fleet available</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9AA1AC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 17h14M6 17l1.5-5.5A2 2 0 019.4 10h5.2a2 2 0 011.9 1.5L18 17" />
                    <circle cx="7.5" cy="19" r="1.6" />
                    <circle cx="16.5" cy="19" r="1.6" />
                  </svg>
                </div>
                <div className="kpi-val">31 / 38</div>
                <div className="kpi-delta down">
                  ▼ 2 <span>in service</span>
                </div>
              </div>
            </div>

            <div className="panel chart">
              <div className="panel-head">
                <div>
                  <div data-h="3">Revenue &amp; utilisation</div>
                  <p>Last 14 days · consolidated across five branded booking sites</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <div className="legend-row">
                    <span>
                      <i style={{ background: "#CCF94F" }} />
                      Gross revenue
                    </span>
                  </div>
                  <div className="seg">
                    <span className="on">14D</span>
                    <span>30D</span>
                    <span>90D</span>
                  </div>
                </div>
              </div>
              <div className="chart-wrap">
                <div className="yaxis">
                  <span>$60k</span>
                  <span>$45k</span>
                  <span>$30k</span>
                  <span>$15k</span>
                  <span>$0</span>
                </div>
                <div className="plot">
                  <svg viewBox="0 0 880 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="th-area-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#CCF94F" stopOpacity="0.30" />
                        <stop offset="100%" stopColor="#CCF94F" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="10" x2="880" y2="10" stroke="rgba(255,255,255,.05)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    <line x1="0" y1="58" x2="880" y2="58" stroke="rgba(255,255,255,.05)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    <line x1="0" y1="106" x2="880" y2="106" stroke="rgba(255,255,255,.05)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    <line x1="0" y1="154" x2="880" y2="154" stroke="rgba(255,255,255,.05)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    <line x1="0" y1="199" x2="880" y2="199" stroke="rgba(255,255,255,.09)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    <path
                      d="M0,140 C40,140 60,86 110,86 C160,86 180,150 220,142 C260,134 292,66 330,74 C368,82 400,120 440,110 C480,100 522,44 550,50 C588,58 620,108 660,96 C700,84 730,32 770,38 C810,44 852,70 880,64 L880,200 L0,200 Z"
                      fill="url(#th-area-grad)"
                    />
                    <path
                      d="M0,140 C40,140 60,86 110,86 C160,86 180,150 220,142 C260,134 292,66 330,74 C368,82 400,120 440,110 C480,100 522,44 550,50 C588,58 620,108 660,96 C700,84 730,32 770,38 C810,44 852,70 880,64"
                      fill="none"
                      stroke="#CCF94F"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                    <circle cx="550" cy="50" r="4.5" fill="#CCF94F" stroke="#07080A" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
                  </svg>
                  <div className="xaxis">
                    <span>SEP 05</span>
                    <span>SEP 07</span>
                    <span>SEP 09</span>
                    <span>SEP 11</span>
                    <span>SEP 13</span>
                    <span>SEP 15</span>
                    <span>SEP 17</span>
                    <span>SEP 18</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bottomrow">
              <div className="panel">
                <div className="panel-head">
                  <div>
                    <div data-h="3">Fleet status</div>
                    <p>38 vehicles · 5 tracks</p>
                  </div>
                  <div className="seg">
                    <span className="on">Live</span>
                    <span>All</span>
                  </div>
                </div>
                <div className="fleet-list">
                  <div className="fleet-row">
                    <div className="car">GT3</div>
                    <div className="fleet-txt">
                      <b>Porsche 911 GT3 R</b>
                      <span>#07 · Apex Raceway</span>
                    </div>
                    <span className="pill track">On track</span>
                  </div>
                  <div className="fleet-row">
                    <div className="car">GT4</div>
                    <div className="fleet-txt">
                      <b>BMW M4 GT4</b>
                      <span>#12 · Apex Raceway</span>
                    </div>
                    <span className="pill track">On track</span>
                  </div>
                  <div className="fleet-row">
                    <div className="car">F4</div>
                    <div className="fleet-txt">
                      <b>Tatuus F4-T014</b>
                      <span>#21 · Ridge Motorsport</span>
                    </div>
                    <span className="pill pit">In pit</span>
                  </div>
                  <div className="fleet-row">
                    <div className="car">GT4</div>
                    <div className="fleet-txt">
                      <b>Mercedes-AMG GT4</b>
                      <span>#05 · Sonoma Coast</span>
                    </div>
                    <span className="pill serv">Service</span>
                  </div>
                  <div className="fleet-row">
                    <div className="car">RAD</div>
                    <div className="fleet-txt">
                      <b>Radical SR3 XXR</b>
                      <span>#33 · Thunderhill</span>
                    </div>
                    <span className="pill ready">Available</span>
                  </div>
                </div>
              </div>

              <div className="panel">
                <div className="panel-head">
                  <div>
                    <div data-h="3">Upcoming sessions &amp; capacity</div>
                    <p>Next 6 departures across the group</p>
                  </div>
                  <div className="seg">
                    <span className="on">Today</span>
                    <span>Week</span>
                  </div>
                </div>
                <div className="tbl">
                  <div className="tr head">
                    <span>Time</span>
                    <span>Session</span>
                    <span>Track</span>
                    <span>Capacity</span>
                    <span style={{ textAlign: "right" }}>Revenue</span>
                  </div>
                  <div className="tr">
                    <span className="t">09:40</span>
                    <div>
                      <div>GT Sprint — Open Lapping</div>
                      <div className="s">Intermediate · 45 min</div>
                    </div>
                    <span className="s">Apex Raceway</span>
                    <div className="cap-bar">
                      <i style={{ width: "60%" }} />
                    </div>
                    <span className="r">$6,800</span>
                  </div>
                  <div className="tr">
                    <span className="t">10:15</span>
                    <div>
                      <div>Arrive &amp; Drive</div>
                      <div className="s">Novice · 30 min</div>
                    </div>
                    <span className="s">Ridge Motorsport</span>
                    <div className="cap-bar">
                      <i style={{ width: "88%" }} />
                    </div>
                    <span className="r">$4,410</span>
                  </div>
                  <div className="tr">
                    <span className="t">11:00</span>
                    <div>
                      <div>GT4 Test Day</div>
                      <div className="s">Advanced · 60 min</div>
                    </div>
                    <span className="s">Sonoma Coast</span>
                    <div className="cap-bar">
                      <i style={{ width: "100%" }} />
                    </div>
                    <span className="r">$9,120</span>
                  </div>
                  <div className="tr">
                    <span className="t">13:20</span>
                    <div>
                      <div>Endurance Test — GT4 / GT3</div>
                      <div className="s">Advanced · 60 min</div>
                    </div>
                    <span className="s">Apex Raceway</span>
                    <div className="cap-bar">
                      <i style={{ width: "34%" }} />
                    </div>
                    <span className="r">$8,320</span>
                  </div>
                  <div className="tr">
                    <span className="t">17:05</span>
                    <div>
                      <div>Sunset Lapping — Open Pit</div>
                      <div className="s">All levels · 40 min</div>
                    </div>
                    <span className="s">Thunderhill</span>
                    <div className="cap-bar">
                      <i style={{ width: "76%" }} />
                    </div>
                    <span className="r">$5,220</span>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
