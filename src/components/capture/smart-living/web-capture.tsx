/** 1600×900 Smart Living — Operations overview. */

function Ic({
  children,
  size = 16,
}: {
  children: React.ReactNode;
  size?: number;
}) {
  return (
    <span className="ic" style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </span>
  );
}

function Dots() {
  return (
    <Ic size={14}>
      <circle cx="12" cy="5" r="1.4" />
      <circle cx="12" cy="12" r="1.4" />
      <circle cx="12" cy="19" r="1.4" />
    </Ic>
  );
}

const NAV = [
  {
    label: "Monitor",
    items: [
      {
        name: "Overview",
        active: true,
        icon: (
          <>
            <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
            <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" />
            <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" />
            <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" />
          </>
        ),
      },
      {
        name: "Live alerts",
        badge: "3",
        icon: (
          <>
            <path d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.7 21a2 2 0 0 1-3.4 0" />
          </>
        ),
      },
      {
        name: "Devices",
        icon: (
          <>
            <rect x="4" y="4" width="16" height="16" rx="3" />
            <rect x="9" y="9" width="6" height="6" rx="1.5" />
            <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
          </>
        ),
      },
    ],
  },
  {
    label: "Community",
    items: [
      {
        name: "Residents",
        icon: (
          <>
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </>
        ),
      },
      {
        name: "Groups",
        icon: (
          <>
            <circle cx="9" cy="7" r="3.2" />
            <circle cx="17" cy="9" r="2.6" />
            <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
            <path d="M16 20a5 5 0 0 1 5.5-4.9" />
          </>
        ),
      },
      {
        name: "Events",
        icon: (
          <>
            <rect x="3" y="4.5" width="18" height="17" rx="2.5" />
            <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
          </>
        ),
      },
    ],
  },
  {
    label: "Platform",
    items: [
      {
        name: "Broadcast",
        icon: (
          <>
            <path d="M3 11v2a1 1 0 0 0 1 1h2l4 4V6L6 10H4a1 1 0 0 0-1 1Z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            <path d="M18.5 5.5a9 9 0 0 1 0 13" />
          </>
        ),
      },
      {
        name: "Integrations",
        icon: (
          <>
            <path d="M9 3H5a2 2 0 0 0-2 2v4M15 3h4a2 2 0 0 1 2 2v4M9 21H5a2 2 0 0 1-2-2v-4M15 21h4a2 2 0 0 0 2-2v-4" />
          </>
        ),
      },
      {
        name: "Settings",
        icon: (
          <>
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 7 19.4a1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 3 15H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 7a1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 9 3V3a2 2 0 1 1 4 0v.1A1.7 1.7 0 0 0 15 4.6" />
          </>
        ),
      },
    ],
  },
] as const;

export function SmartLivingWebCapture() {
  return (
    <div className="sl-capture-root">
      <section className="capture capture--web" aria-label="Smart Living operations overview">
        <aside className="sb">
          <div className="sb-brand">
            <div className="logo" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 10.5 12 3l9 7.5" />
                <path d="M5 9.5V21h14V9.5" />
                <path d="M9.5 21v-6h5v6" />
              </svg>
            </div>
            <div>
              <div className="sb-name">Smart Living</div>
              <div className="sb-sub">Operations</div>
            </div>
          </div>
          <nav className="sb-nav" aria-label="Operations">
            {NAV.map((group) => (
              <div key={group.label}>
                <div className="nav-label">{group.label}</div>
                {group.items.map((item) => (
                  <button
                    type="button"
                    className={"active" in item && item.active ? "nav-item active" : "nav-item"}
                    key={item.name}
                  >
                    <Ic>{item.icon}</Ic>
                    {item.name}
                    {"badge" in item && item.badge ? (
                      <span className="nav-badge">{item.badge}</span>
                    ) : null}
                  </button>
                ))}
              </div>
            ))}
          </nav>
          <div className="sb-foot">
            <div className="sys-card">
              <div className="sys-row"><span className="pulse" />AWS SAM · us-east-1</div>
              <div className="sys-sub" style={{ paddingLeft: 13 }}>12 lambdas · 38ms p95</div>
              <div className="sys-row" style={{ marginTop: 8 }}><span className="pulse" />Firebase FCM</div>
              <div className="sys-sub" style={{ paddingLeft: 13 }}>99.2% delivery · 12.4k sent</div>
            </div>
            <div className="user-row">
              <div className="ava" style={{ background: "linear-gradient(140deg,#6C8CFF,#3E5AE0)" }}>DW</div>
              <div style={{ flex: 1 }}>
                <div className="u-name">Dana Whitfield</div>
                <div className="u-role">Shift supervisor</div>
              </div>
              <span className="ic" style={{ color: "#A2ABBA", width: 15, height: 15 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="5" r="1.4" />
                  <circle cx="12" cy="12" r="1.4" />
                  <circle cx="12" cy="19" r="1.4" />
                </svg>
              </span>
            </div>
          </div>
        </aside>

        <div className="main">
          <header className="topbar">
            <div className="tb-left">
              <span className="tb-title">Operations overview</span>
              <span className="live-pill"><span className="pulse" />Live</span>
            </div>
            <div className="tb-right">
              <div className="search">
                <Ic size={14}>
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </Ic>
                <span>Search residents, units…</span>
                <span className="kbd">⌘K</span>
              </div>
              <button type="button" className="tbtn">
                Today
                <Ic size={12}>
                  <path d="m6 9 6 6 6-6" />
                </Ic>
              </button>
              <button type="button" className="tbtn icon" aria-label="Alerts">
                <Ic>
                  <path d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.7 21a2 2 0 0 1-3.4 0" />
                </Ic>
                <span className="dot-badge" />
              </button>
              <button type="button" className="tbtn primary">Broadcast</button>
            </div>
          </header>

          <div className="content">
            <div className="kpis">
              <div className="kpi">
                <div className="kpi-top"><span className="kpi-label">Residents online</span></div>
                <div className="kpi-val tnum">1,284</div>
                <div className="kpi-foot"><span className="delta up">▲ 3.1%</span><span>vs yesterday</span></div>
                <svg className="spark" viewBox="0 0 64 26" preserveAspectRatio="none"><polyline points="0,21 9,17 18,19 27,11 36,14 45,7 54,9 64,3" fill="none" stroke="#0B6BFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div className="kpi">
                <div className="kpi-top">
                  <span className="kpi-label">Active alerts</span>
                  <span className="pulse" style={{ background: "#E5484D", boxShadow: "0 0 0 3px rgba(229,72,77,.15)" }} />
                </div>
                <div className="kpi-val tnum">3</div>
                <div className="kpi-foot"><span style={{ color: "#E5484D", fontWeight: 700 }}>2 critical</span><span>· 1 warning</span></div>
                <svg className="spark" viewBox="0 0 64 26" preserveAspectRatio="none"><polyline points="0,19 9,21 18,14 27,16 36,8 45,12 54,5 64,9" fill="none" stroke="#E5484D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div className="kpi">
                <div className="kpi-top"><span className="kpi-label">Events today</span></div>
                <div className="kpi-val tnum">7</div>
                <div className="kpi-foot"><span>Next</span><span style={{ color: "#0F141B", fontWeight: 650 }}>Chair yoga · 09:30</span></div>
                <svg className="spark" viewBox="0 0 64 26" preserveAspectRatio="none"><polyline points="0,16 9,18 18,13 27,15 36,10 45,13 54,7 64,6" fill="none" stroke="#7C5CFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <div className="kpi">
                <div className="kpi-top"><span className="kpi-label">Push delivered</span></div>
                <div className="kpi-val tnum">99.2<span style={{ fontSize: 16, fontWeight: 600 }}>%</span></div>
                <div className="kpi-foot"><span className="delta up">▲ 0.4%</span><span>12,480 sent</span></div>
                <svg className="spark" viewBox="0 0 64 26" preserveAspectRatio="none"><polyline points="0,14 9,12 18,15 27,9 36,11 45,6 54,8 64,4" fill="none" stroke="#0E9F6E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </div>

            <div className="grid-2" style={{ flex: "0 0 384px" }}>
              <div className="card">
                <div className="card-h">
                  <div className="card-t">Live alert feed <span className="count-pill">3 active</span></div>
                  <div className="card-sub">Auto-refresh <span style={{ color: "#0B6BFF", fontWeight: 700 }}>2s</span></div>
                </div>
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <div className="alert-row">
                    <div className="sev crit">
                      <Ic>
                        <path d="M12 9v4M12 17h.01" />
                        <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
                      </Ic>
                    </div>
                    <div className="ar-main">
                      <div className="ar-title">Fall detected — no movement for 90s</div>
                      <div className="ar-meta"><b>Unit B-407</b><span className="sep" />Margaret Liu<span className="sep" />Pendant sensor</div>
                    </div>
                    <span className="chip red">Critical</span>
                    <span className="chip blue">Care Team</span>
                    <span className="ar-time tnum">09:42</span>
                    <button type="button" className="ibtn blue" aria-label="Call">
                      <Ic size={14}>
                        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
                      </Ic>
                    </button>
                    <button type="button" className="ibtn" aria-label="More"><Dots /></button>
                  </div>
                  <div className="alert-row">
                    <div className="sev warn">
                      <Ic>
                        <path d="M12 2v6M12 22v-6" />
                        <circle cx="12" cy="12" r="4" />
                      </Ic>
                    </div>
                    <div className="ar-main">
                      <div className="ar-title">Emergency exit door held open</div>
                      <div className="ar-meta"><b>Tower 2 · Lobby</b><span className="sep" />Door sensor D-14<span className="sep" />4m 12s</div>
                    </div>
                    <span className="chip amber">Warning</span>
                    <span className="chip">Facilities</span>
                    <span className="ar-time tnum">09:31</span>
                    <button type="button" className="ibtn" aria-label="More"><Dots /></button>
                  </div>
                  <div className="alert-row">
                    <div className="sev info">
                      <Ic>
                        <path d="M12 2.7s6 5.4 6 10a6 6 0 0 1-12 0c0-4.6 6-10 6-10Z" />
                      </Ic>
                    </div>
                    <div className="ar-main">
                      <div className="ar-title">Water leak sensor triggered</div>
                      <div className="ar-meta"><b>Tower 1 · Floor 3 riser</b><span className="sep" />Sensor WL-09</div>
                    </div>
                    <span className="chip blue">Info</span>
                    <span className="chip">Facilities</span>
                    <span className="ar-time tnum">09:18</span>
                    <button type="button" className="ibtn" aria-label="More"><Dots /></button>
                  </div>
                  <div className="alert-row">
                    <div className="sev ok">
                      <Ic>
                        <path d="m5 13 4 4L19 7" />
                      </Ic>
                    </div>
                    <div className="ar-main">
                      <div className="ar-title">Medical pendant SOS — resolved by R. Okafor</div>
                      <div className="ar-meta"><b>Unit A-112</b><span className="sep" />Harold Petersen<span className="sep" />Response 3m 41s</div>
                    </div>
                    <span className="chip green">Resolved</span>
                    <span className="chip">Care Team</span>
                    <span className="ar-time tnum">09:04</span>
                    <button type="button" className="ibtn" aria-label="More"><Dots /></button>
                  </div>
                  <div className="alert-row">
                    <div className="sev warn">
                      <Ic>
                        <path d="M11 5 6 9H2v6h4l5 4V5Z" />
                        <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                      </Ic>
                    </div>
                    <div className="ar-main">
                      <div className="ar-title">Ambient noise above threshold (night hours)</div>
                      <div className="ar-meta"><b>Block C · 2F corridor</b><span className="sep" />Avg 62 dB</div>
                    </div>
                    <span className="chip amber">Warning</span>
                    <span className="chip">Security</span>
                    <span className="ar-time tnum">08:55</span>
                    <button type="button" className="ibtn" aria-label="More"><Dots /></button>
                  </div>
                  <div className="alert-row">
                    <div className="sev ok">
                      <Ic>
                        <path d="m5 13 4 4L19 7" />
                      </Ic>
                    </div>
                    <div className="ar-main">
                      <div className="ar-title">Wellness check completed — 24 units</div>
                      <div className="ar-meta"><b>Morning round</b><span className="sep" />Automated via resident app</div>
                    </div>
                    <span className="chip green">Complete</span>
                    <span className="chip">Wellness</span>
                    <span className="ar-time tnum">08:30</span>
                    <button type="button" className="ibtn" aria-label="More"><Dots /></button>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-h">
                  <div className="card-t">Community status</div>
                  <div className="card-sub">Updated 09:44</div>
                </div>
                <div className="donut-wrap">
                  <svg width="120" height="120" viewBox="0 0 140 140" style={{ flex: "0 0 120px" }}>
                    <circle cx="70" cy="70" r="54" fill="none" stroke="#EEF1F6" strokeWidth="16" />
                    <g transform="rotate(-90 70 70)">
                      <circle cx="70" cy="70" r="54" fill="none" stroke="#0B6BFF" strokeWidth="16" strokeDasharray="301.7 339.29" strokeDashoffset="0" />
                      <circle cx="70" cy="70" r="54" fill="none" stroke="#F0A32B" strokeWidth="16" strokeDasharray="27.7 339.29" strokeDashoffset="-301.7" />
                      <circle cx="70" cy="70" r="54" fill="none" stroke="#D6DDE7" strokeWidth="16" strokeDasharray="9.9 339.29" strokeDashoffset="-329.4" />
                    </g>
                    <text x="70" y="68" textAnchor="middle" fontSize="21" fontWeight="650" fill="#0F141B" letterSpacing="-0.6" fontFamily="Inter,system-ui,sans-serif">1,444</text>
                    <text x="70" y="84" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#A2ABBA" letterSpacing="1.2" fontFamily="Inter,system-ui,sans-serif">RESIDENTS</text>
                  </svg>
                  <div className="legend">
                    <div className="lg-row"><span className="lg-dot" style={{ background: "#0B6BFF" }} /><span className="lg-name">Online</span><span className="lg-val tnum">1,284</span></div>
                    <div className="lg-row"><span className="lg-dot" style={{ background: "#F0A32B" }} /><span className="lg-name">Do not disturb</span><span className="lg-val tnum">118</span></div>
                    <div className="lg-row"><span className="lg-dot" style={{ background: "#D6DDE7" }} /><span className="lg-name">Offline</span><span className="lg-val tnum">42</span></div>
                  </div>
                </div>
                <div style={{ borderTop: "1px solid var(--line-2)", padding: "12px 15px 6px" }}>
                  <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".09em", textTransform: "uppercase", color: "#A2ABBA" }}>Buildings</div>
                </div>
                <div className="bld" style={{ paddingTop: 8 }}>
                  <div className="bld-row"><span className="bld-name">Tower 1</span><span className="bar"><i style={{ width: "94%", background: "linear-gradient(90deg,#4E9BFF,#0B6BFF)" }} /></span><span className="bld-val tnum">94%</span></div>
                  <div className="bld-row"><span className="bld-name">Tower 2</span><span className="bar"><i style={{ width: "88%", background: "linear-gradient(90deg,#4E9BFF,#0B6BFF)" }} /></span><span className="bld-val tnum">88%</span></div>
                  <div className="bld-row"><span className="bld-name">Block C</span><span className="bar"><i style={{ width: "71%", background: "linear-gradient(90deg,#FFC46B,#F0A32B)" }} /></span><span className="bld-val tnum">71%</span></div>
                  <div className="bld-row"><span className="bld-name">Garden Wing</span><span className="bar"><i style={{ width: "97%", background: "linear-gradient(90deg,#4ED2A0,#0E9F6E)" }} /></span><span className="bld-val tnum">97%</span></div>
                </div>
              </div>
            </div>

            <div className="grid-2" style={{ flex: 1 }}>
              <div className="card">
                <div className="card-h">
                  <div className="card-t">Upcoming events</div>
                  <div className="card-sub"><button type="button" className="ghost-link">Open scheduler →</button></div>
                </div>
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <div className="ev-row">
                    <div className="ev-time"><div className="ev-h tnum">09:30</div><div className="ev-m">45 min</div></div>
                    <div className="ev-bar" style={{ background: "#0B6BFF" }} />
                    <div style={{ flex: 1 }}><div className="ev-name">Chair yoga & mobility</div><div className="ev-loc">Garden Wing · Studio A</div></div>
                    <div className="stack">
                      <div className="ava" style={{ background: "#6C8CFF" }}>ML</div>
                      <div className="ava" style={{ background: "#F0A32B" }}>HP</div>
                      <div className="ava" style={{ background: "#0E9F6E" }}>JS</div>
                      <div className="more">+14</div>
                    </div>
                    <span className="chip blue">Wellness</span>
                  </div>
                  <div className="ev-row">
                    <div className="ev-time"><div className="ev-h tnum">11:00</div><div className="ev-m">30 min</div></div>
                    <div className="ev-bar" style={{ background: "#0E9F6E" }} />
                    <div style={{ flex: 1 }}><div className="ev-name">Blood pressure clinic</div><div className="ev-loc">Tower 1 · Health Room</div></div>
                    <div className="stack">
                      <div className="ava" style={{ background: "#7C5CFF" }}>RO</div>
                      <div className="ava" style={{ background: "#E5484D" }}>AK</div>
                      <div className="more">+8</div>
                    </div>
                    <span className="chip green">Care</span>
                  </div>
                  <div className="ev-row">
                    <div className="ev-time"><div className="ev-h tnum">14:00</div><div className="ev-m">90 min</div></div>
                    <div className="ev-bar" style={{ background: "#7C5CFF" }} />
                    <div style={{ flex: 1 }}><div className="ev-name">Resident council meeting</div><div className="ev-loc">Tower 2 · Community Hall</div></div>
                    <div className="stack">
                      <div className="ava" style={{ background: "#0B6BFF" }}>DW</div>
                      <div className="ava" style={{ background: "#0E9F6E" }}>JS</div>
                      <div className="more">+22</div>
                    </div>
                    <span className="chip violet">Social</span>
                  </div>
                  <div className="ev-row">
                    <div className="ev-time"><div className="ev-h tnum">16:30</div><div className="ev-m">60 min</div></div>
                    <div className="ev-bar" style={{ background: "#D98200" }} />
                    <div style={{ flex: 1 }}><div className="ev-name">Fire drill — Block C</div><div className="ev-loc">Block C · All floors</div></div>
                    <div className="stack">
                      <div className="ava" style={{ background: "#E5484D" }}>SC</div>
                      <div className="more">+48</div>
                    </div>
                    <span className="chip amber">Facilities</span>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-h">
                  <div className="card-t">Push delivery</div>
                  <div className="card-sub">Last 7 days</div>
                </div>
                <div className="chart">
                  <div className="col dim"><i style={{ height: "44%" }} /><span>Wed</span></div>
                  <div className="col dim"><i style={{ height: "58%" }} /><span>Thu</span></div>
                  <div className="col dim"><i style={{ height: "38%" }} /><span>Fri</span></div>
                  <div className="col dim"><i style={{ height: "66%" }} /><span>Sat</span></div>
                  <div className="col dim"><i style={{ height: "52%" }} /><span>Sun</span></div>
                  <div className="col"><i style={{ height: "84%" }} /><span>Mon</span></div>
                  <div className="col"><i style={{ height: "100%" }} /><span>Tue</span></div>
                </div>
                <div className="push-stats">
                  <div className="push-stat"><div className="k">Sent</div><div className="v tnum">12,480</div></div>
                  <div className="push-stat"><div className="k">Opened</div><div className="v tnum">71.6%</div></div>
                  <div className="push-stat"><div className="k">Failed</div><div className="v tnum" style={{ color: "#E5484D" }}>0.6%</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
