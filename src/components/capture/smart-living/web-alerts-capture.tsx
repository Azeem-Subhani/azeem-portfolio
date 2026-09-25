/** 1600×900 Smart Living — Alert console. */

import { smartLivingFonts } from "@/components/capture/capture-fonts";
import { CallWaveform, Ic, SmartLivingSidebar } from "@/components/capture/smart-living/shared";

function FloorPlan() {
  return (
    <svg viewBox="0 0 620 300" style={{ width: "100%", height: "100%", maxHeight: "100%" }}>
      <rect x="0" y="0" width="620" height="300" rx="12" fill="#FBFCFE" stroke="#E4E8EF" />
      <rect x="24" y="132" width="572" height="30" fill="#F1F4F8" rx="4" />
      <text
        x="310"
        y="152"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fill="#A2ABBA"
        letterSpacing="2"
        fontFamily="Inter,system-ui,sans-serif"
      >
        CORRIDOR
      </text>
      <rect x="24" y="20" width="128" height="100" rx="7" fill="#fff" stroke="#E4E8EF" />
      <text x="88" y="76" textAnchor="middle" fontSize="12" fontWeight="650" fill="#4A5462" fontFamily="Inter,system-ui,sans-serif">
        B-401
      </text>
      <rect x="164" y="20" width="128" height="100" rx="7" fill="#fff" stroke="#E4E8EF" />
      <text x="228" y="76" textAnchor="middle" fontSize="12" fontWeight="650" fill="#4A5462" fontFamily="Inter,system-ui,sans-serif">
        B-402
      </text>
      <rect x="304" y="20" width="128" height="100" rx="7" fill="#fff" stroke="#E4E8EF" />
      <text x="368" y="76" textAnchor="middle" fontSize="12" fontWeight="650" fill="#4A5462" fontFamily="Inter,system-ui,sans-serif">
        B-403
      </text>
      <rect x="164" y="174" width="128" height="106" rx="7" fill="#FDECEC" stroke="#E5484D" strokeWidth="2" />
      <text x="228" y="222" textAnchor="middle" fontSize="13" fontWeight="700" fill="#B3252A" fontFamily="Inter,system-ui,sans-serif">
        B-407
      </text>
      <text x="228" y="240" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#E5484D" letterSpacing="1" fontFamily="Inter,system-ui,sans-serif">
        ALERT
      </text>
      <circle cx="228" cy="258" r="5" fill="#E5484D" />
      <circle cx="228" cy="258" r="11" fill="none" stroke="#E5484D" strokeOpacity="0.35" strokeWidth="1.5" />
      <circle cx="520" cy="147" r="7" fill="#0B6BFF" />
      <circle cx="520" cy="147" r="13" fill="none" stroke="#0B6BFF" strokeOpacity="0.3" strokeWidth="1.5" />
      <text x="520" y="127" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#0B6BFF" fontFamily="Inter,system-ui,sans-serif">
        R. OKAFOR
      </text>
    </svg>
  );
}

export function SmartLivingWebAlertsCapture() {
  return (
    <div className={`sl-capture-root ${smartLivingFonts}`}>
      <section className="capture capture--web" aria-label="Smart Living alert console">
        <SmartLivingSidebar active="live-alerts" foot="webrtc" />

        <div className="main">
          <header className="topbar">
            <div className="tb-left">
              <span className="tb-title">Alert console</span>
              <span className="live-pill sl-pill-alert">
                <span className="pulse sl-pulse-alert" />
                1 active response
              </span>
            </div>
            <div className="tb-right">
              <button type="button" className="tbtn">
                Escalate to 911
              </button>
              <button type="button" className="tbtn">
                Assign
              </button>
              <button type="button" className="tbtn sl-btn-danger">
                Resolve alert
              </button>
            </div>
          </header>

          <div className="content content--alert-console">
            <div className="card">
              <div className="card-h">
                <div className="card-t">
                  Queue <span className="count-pill">3</span>
                </div>
                <div className="card-sub">09:44</div>
              </div>
              <div className="queue-list">
                <div className="queue-item queue-item--active">
                  <div className="queue-item-head">
                    <span className="sev crit" style={{ width: 26, height: 26, borderRadius: 8 }}>
                      <Ic size={13}>
                        <path d="M12 9v4M12 17h.01" />
                        <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
                      </Ic>
                    </span>
                    <div style={{ flex: 1 }}>
                      <div className="queue-title">Fall detected</div>
                      <div className="queue-meta">Unit B-407 · 09:42</div>
                    </div>
                  </div>
                  <div className="queue-chips">
                    <span className="chip red">Critical</span>
                    <span className="chip blue">Care team</span>
                  </div>
                </div>
                <div className="queue-item">
                  <div className="queue-item-head">
                    <span className="sev warn" style={{ width: 26, height: 26, borderRadius: 8 }}>
                      <Ic size={13}>
                        <path d="M12 2v6M12 22v-6" />
                        <circle cx="12" cy="12" r="4" />
                      </Ic>
                    </span>
                    <div style={{ flex: 1 }}>
                      <div className="queue-title">Door held open</div>
                      <div className="queue-meta">Tower 2 · Lobby · 09:31</div>
                    </div>
                  </div>
                  <div className="queue-chips">
                    <span className="chip amber">Warning</span>
                    <span className="chip">Facilities</span>
                  </div>
                </div>
                <div className="queue-item">
                  <div className="queue-item-head">
                    <span className="sev info" style={{ width: 26, height: 26, borderRadius: 8 }}>
                      <Ic size={13}>
                        <path d="M12 2.7s6 5.4 6 10a6 6 0 0 1-12 0c0-4.6 6-10 6-10Z" />
                      </Ic>
                    </span>
                    <div style={{ flex: 1 }}>
                      <div className="queue-title">Water leak sensor</div>
                      <div className="queue-meta">Tower 1 · Floor 3 · 09:18</div>
                    </div>
                  </div>
                  <div className="queue-chips">
                    <span className="chip blue">Info</span>
                    <span className="chip">Facilities</span>
                  </div>
                </div>
              </div>
              <div className="queue-sla">
                <span className="pulse" />
                <span>
                  SLA breach in <b style={{ color: "#E5484D" }}>1m 40s</b>
                </span>
              </div>
            </div>

            <div className="alert-console-center">
              <div className="card">
                <div className="card-h">
                  <div className="card-t">
                    <span className="sev crit" style={{ width: 22, height: 22, borderRadius: 6 }}>
                      <Ic size={11}>
                        <path d="M12 9v4M12 17h.01" />
                        <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
                      </Ic>
                    </span>
                    Fall detected — no movement for 90 seconds
                  </div>
                  <div className="card-sub">Alert #A-2291 · 09:42:18</div>
                </div>
                <div className="alert-detail-grid">
                  <div>
                    <div className="field-label">Resident</div>
                    <div className="field-resident">
                      <div className="ava" style={{ width: 32, height: 32, background: "linear-gradient(140deg,#F08A8E,#D9535A)" }}>
                        ML
                      </div>
                      <div>
                        <div className="field-name">Margaret Liu</div>
                        <div className="field-sub">Unit B-407 · Fall risk</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="field-label">Trigger</div>
                    <div className="field-value">Pendant sensor · PS-407</div>
                    <div className="field-sub">Battery 84% · Signal strong</div>
                  </div>
                  <div>
                    <div className="field-label">Responder</div>
                    <div className="field-value">R. Okafor · Care team</div>
                    <div className="field-sub">En route · ETA 2 min</div>
                  </div>
                </div>
              </div>

              <div className="card alert-map-card">
                <div className="card-h">
                  <div className="card-t">Floor plan · Tower 2 · Level 4</div>
                  <div className="card-sub">
                    <span className="chip red">Live location</span>
                  </div>
                </div>
                <div className="alert-map-body">
                  <FloorPlan />
                </div>
              </div>
            </div>

            <div className="callpanel">
              <div className="card-h">
                <div className="card-t">Live call</div>
                <div className="card-sub">
                  <span className="pulse sl-pulse-alert" />
                  Recording
                </div>
              </div>
              <div className="video">
                <div className="v-ring" />
                <div className="v-ring b" />
                <div className="v-ava">ML</div>
                <div className="v-top">
                  <span className="v-pill">
                    <span className="rec" />
                    LIVE · 00:42
                  </span>
                  <span className="v-pill">1080p · 41ms</span>
                </div>
                <div className="v-bottom">
                  <CallWaveform />
                  <div className="ctrls">
                    <button type="button" className="cbtn" aria-label="Mute">
                      <Ic size={14}>
                        <rect x="9" y="2" width="6" height="12" rx="3" />
                        <path d="M5 10a7 7 0 0 0 14 0M12 19v3" />
                      </Ic>
                    </button>
                    <button type="button" className="cbtn" aria-label="Video">
                      <Ic size={14}>
                        <rect x="2" y="6" width="13" height="12" rx="2.5" />
                        <path d="m22 8-7 4 7 4V8Z" />
                      </Ic>
                    </button>
                    <button type="button" className="cbtn end">
                      <Ic size={13}>
                        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
                      </Ic>
                      End
                    </button>
                  </div>
                </div>
              </div>
              <div className="callpanel-foot">
                <div>
                  <div className="field-name">Margaret Liu</div>
                  <div className="field-sub">Unit B-407 · responded verbally</div>
                </div>
                <span className="chip green">Connected</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
