import { smartLivingFonts } from "@/components/capture/capture-fonts";

/** 900×1600 Smart Living — mobile overview. */

function Ic({ children, size = 16 }: { children: React.ReactNode; size?: number }) {
  return (
    <span className="ic" style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </span>
  );
}

const TABS = [
  {
    label: "Overview",
    on: true,
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
    label: "Alerts",
    icon: (
      <>
        <path d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.7 21a2 2 0 0 1-3.4 0" />
      </>
    ),
  },
  {
    label: "Residents",
    icon: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      </>
    ),
  },
  {
    label: "Events",
    icon: (
      <>
        <rect x="3" y="4.5" width="18" height="17" rx="2.5" />
        <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
      </>
    ),
  },
  {
    label: "More",
    icon: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 7 19.4a1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 3 15H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 7a1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 9 3V3a2 2 0 1 1 4 0v.1A1.7 1.7 0 0 0 15 4.6" />
      </>
    ),
  },
] as const;

export function SmartLivingPhoneCapture() {
  return (
    <div className={`sl-capture-root ${smartLivingFonts}`}>
      <section className="capture capture--phone" aria-label="Smart Living overview on phone">
        <div className="phone-inner">
          <header className="p-head">
            <div>
              <div className="p-eyebrow">Smart Living</div>
              <div className="p-h1">Smart Living overview</div>
              <div className="p-h2">Fri 16 May · Shift 07:00–15:00</div>
            </div>
            <div className="p-head-actions">
              <button type="button" className="ibtn" aria-label="Alerts" style={{ width: 34, height: 34, borderRadius: 10, position: "relative" }}>
                <Ic>
                  <path d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.7 21a2 2 0 0 1-3.4 0" />
                </Ic>
                <span className="dot-badge" style={{ top: 7, right: 7 }} />
              </button>
              <div className="ava" style={{ width: 34, height: 34, fontSize: 12, background: "linear-gradient(140deg,#6C8CFF,#3E5AE0)" }}>DW</div>
            </div>
          </header>

          <div className="p-body">
            <div className="p-hero">
              <div className="p-hero-t">Active response</div>
              <div className="p-hero-v tnum">3 alerts</div>
              <div className="p-hero-s">1 critical · Unit B-407 · Margaret Liu</div>
              <div className="p-hero-stats">
                <div><div className="p-stat-v tnum">1,284</div><div className="p-stat-l">ONLINE</div></div>
                <div><div className="p-stat-v tnum">7</div><div className="p-stat-l">EVENTS</div></div>
                <div><div className="p-stat-v tnum">99.2%</div><div className="p-stat-l">PUSH</div></div>
              </div>
            </div>

            <div className="seg">
              <button type="button" className="on">All</button>
              <button type="button">Critical</button>
              <button type="button">Assigned</button>
              <button type="button">Resolved</button>
            </div>

            <div className="p-card" style={{ flex: 1, overflow: "hidden" }}>
              <div className="p-alert" style={{ background: "#FFF9F9", borderLeft: "3px solid #E5484D" }}>
                <div className="sev crit" style={{ width: 30, height: 30, borderRadius: 9, flex: "0 0 30px" }}>
                  <Ic size={14}>
                    <path d="M12 9v4M12 17h.01" />
                    <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
                  </Ic>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="p-alert-head">
                    <div className="p-alert-t" style={{ flex: 1 }}>Fall detected</div>
                    <div className="p-alert-time">09:42</div>
                  </div>
                  <div className="p-alert-m">Unit B-407 · Margaret Liu · no movement 90s</div>
                  <div className="p-actions">
                    <button type="button" className="mini r">Answer call</button>
                    <button type="button" className="mini">Assign</button>
                    <button type="button" className="mini">Map</button>
                  </div>
                </div>
              </div>

              <div className="p-alert">
                <div className="sev warn" style={{ width: 30, height: 30, borderRadius: 9, flex: "0 0 30px" }}>
                  <Ic size={14}>
                    <path d="M12 2v6M12 22v-6" />
                    <circle cx="12" cy="12" r="4" />
                  </Ic>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="p-alert-head">
                    <div className="p-alert-t" style={{ flex: 1 }}>Door held open</div>
                    <div className="p-alert-time">09:31</div>
                  </div>
                  <div className="p-alert-m">Tower 2 · Lobby · 4m 12s</div>
                  <div className="p-actions">
                    <button type="button" className="mini b">View camera</button>
                    <button type="button" className="mini">Facilities</button>
                  </div>
                </div>
              </div>

              <div className="p-alert">
                <div className="sev info" style={{ width: 30, height: 30, borderRadius: 9, flex: "0 0 30px" }}>
                  <Ic size={14}>
                    <path d="M12 2.7s6 5.4 6 10a6 6 0 0 1-12 0c0-4.6 6-10 6-10Z" />
                  </Ic>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="p-alert-head">
                    <div className="p-alert-t" style={{ flex: 1 }}>Water leak sensor</div>
                    <div className="p-alert-time">09:18</div>
                  </div>
                  <div className="p-alert-m">Tower 1 · Floor 3 riser · WL-09</div>
                </div>
              </div>

              <div className="p-alert" style={{ opacity: 0.65 }}>
                <div className="sev ok" style={{ width: 30, height: 30, borderRadius: 9, flex: "0 0 30px" }}>
                  <Ic size={14}>
                    <path d="m5 13 4 4L19 7" />
                  </Ic>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="p-alert-head">
                    <div className="p-alert-t" style={{ flex: 1 }}>Pendant SOS resolved</div>
                    <div className="p-alert-time">09:04</div>
                  </div>
                  <div className="p-alert-m">Unit A-112 · Harold Petersen</div>
                </div>
              </div>
            </div>
          </div>

          <nav className="p-tabbar" aria-label="App">
            {TABS.map((tab) => (
              <button type="button" className={"on" in tab && tab.on ? "p-tab on" : "p-tab"} key={tab.label}>
                <Ic size={20}>{tab.icon}</Ic>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </section>
    </div>
  );
}
