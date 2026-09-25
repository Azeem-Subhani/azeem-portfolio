/** 900×1600 Smart Living — Alerts tab on phone. */

import { smartLivingFonts } from "@/components/capture/capture-fonts";
import { Ic } from "@/components/capture/smart-living/shared";

const TABS = [
  { label: "Overview", icon: "overview" },
  { label: "Alerts", icon: "alerts", on: true },
  { label: "Residents", icon: "residents" },
  { label: "Events", icon: "events" },
  { label: "More", icon: "more" },
] as const;

function TabIcon({ kind }: { kind: (typeof TABS)[number]["icon"] }) {
  switch (kind) {
    case "overview":
      return (
        <>
          <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
          <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" />
          <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" />
          <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" />
        </>
      );
    case "alerts":
      return (
        <>
          <path d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.7 21a2 2 0 0 1-3.4 0" />
        </>
      );
    case "residents":
      return (
        <>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        </>
      );
    case "events":
      return (
        <>
          <rect x="3" y="4.5" width="18" height="17" rx="2.5" />
          <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
        </>
      );
    default:
      return (
        <>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 7 19.4a1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 3 15H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 7a1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 9 3V3a2 2 0 1 1 4 0v.1A1.7 1.7 0 0 0 15 4.6" />
        </>
      );
  }
}

export function SmartLivingPhoneAlertsCapture() {
  return (
    <div className={`sl-capture-root ${smartLivingFonts}`}>
      <section className="capture capture--phone" aria-label="Smart Living alerts on phone">
        <div className="phone-inner">
          <header className="p-head">
            <div>
              <div className="p-eyebrow">Smart Living</div>
              <div className="p-h1">Live alerts</div>
              <div className="p-h2">3 active · 1 critical response</div>
            </div>
            <div className="p-head-actions">
              <button type="button" className="ibtn" aria-label="Filter" style={{ width: 34, height: 34, borderRadius: 10 }}>
                <Ic size={15}>
                  <path d="M4 6h16M7 12h10M10 18h4" />
                </Ic>
              </button>
              <div className="ava" style={{ width: 34, height: 34, fontSize: 12, background: "linear-gradient(140deg,#6C8CFF,#3E5AE0)" }}>
                DW
              </div>
            </div>
          </header>

          <div className="p-body">
            <div className="seg">
              <button type="button" className="on">
                All
              </button>
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
                    <div className="p-alert-t" style={{ flex: 1 }}>
                      Fall detected
                    </div>
                    <div className="p-alert-time">09:42</div>
                  </div>
                  <div className="p-alert-m">Unit B-407 · Margaret Liu · no movement 90s</div>
                  <div className="p-actions">
                    <button type="button" className="mini r">
                      Answer call
                    </button>
                    <button type="button" className="mini">
                      Assign
                    </button>
                    <button type="button" className="mini">
                      Map
                    </button>
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
                    <div className="p-alert-t" style={{ flex: 1 }}>
                      Door held open
                    </div>
                    <div className="p-alert-time">09:31</div>
                  </div>
                  <div className="p-alert-m">Tower 2 · Lobby · 4m 12s</div>
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
                    <div className="p-alert-t" style={{ flex: 1 }}>
                      Water leak sensor
                    </div>
                    <div className="p-alert-time">09:18</div>
                  </div>
                  <div className="p-alert-m">Tower 1 · Floor 3 riser · WL-09</div>
                </div>
              </div>
            </div>
          </div>

          <nav className="p-tabbar" aria-label="App">
            {TABS.map((tab) => (
              <button type="button" className={"on" in tab && tab.on ? "p-tab on" : "p-tab"} key={tab.label}>
                <Ic size={20}>
                  <TabIcon kind={tab.icon} />
                </Ic>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </section>
    </div>
  );
}
