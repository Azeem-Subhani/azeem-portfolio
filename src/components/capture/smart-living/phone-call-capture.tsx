/** 900×1600 Smart Living — Resident detail with live call. */

import { CallWaveform, Ic } from "@/components/capture/smart-living/shared";

export function SmartLivingPhoneCallCapture() {
  return (
    <div className="sl-capture-root">
      <section className="capture capture--phone" aria-label="Smart Living resident call on phone">
        <div className="phone-inner">
          <header className="p-head" style={{ paddingBottom: 10, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button type="button" className="ibtn" aria-label="Back" style={{ width: 34, height: 34, borderRadius: 10 }}>
                <Ic size={15}>
                  <path d="m15 18-6-6 6-6" />
                </Ic>
              </button>
              <div>
                <div className="p-h1" style={{ fontSize: 17, marginTop: 0 }}>
                  Margaret Liu
                </div>
                <div className="p-h2" style={{ marginTop: 2 }}>
                  Unit B-407 · Tower 2
                </div>
              </div>
            </div>
            <button type="button" className="ibtn" aria-label="More" style={{ width: 34, height: 34, borderRadius: 10 }}>
              <Ic size={15}>
                <circle cx="12" cy="5" r="1.4" />
                <circle cx="12" cy="12" r="1.4" />
                <circle cx="12" cy="19" r="1.4" />
              </Ic>
            </button>
          </header>

          <div className="p-body">
            <div className="p-card" style={{ padding: 14, display: "flex", gap: 13, alignItems: "center", flex: "0 0 auto" }}>
              <div className="ava" style={{ width: 54, height: 54, fontSize: 19, background: "linear-gradient(140deg,#F08A8E,#D9535A)" }}>
                ML
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <span className="chip red">Care team</span>
                  <span className="chip amber">Fall risk</span>
                </div>
                <div style={{ fontSize: 11.5, color: "#8B95A5", marginTop: 7, fontWeight: 550 }}>
                  Pendant 84% · 4 devices linked
                </div>
              </div>
            </div>

            <div className="p-quick">
              <button type="button" className="p-q">
                <span className="ic" style={{ width: 19, height: 19, color: "#0B6BFF" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
                  </svg>
                </span>
                <span>Call</span>
              </button>
              <button type="button" className="p-q">
                <Ic size={19}>
                  <rect x="2" y="6" width="13" height="12" rx="2.5" />
                  <path d="m22 8-7 4 7 4V8Z" />
                </Ic>
                <span>Video</span>
              </button>
              <button type="button" className="p-q">
                <Ic size={19}>
                  <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.9 8.9 0 0 1-3.8-.9L3 21l1.9-4.9A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5Z" />
                </Ic>
                <span>Message</span>
              </button>
              <button type="button" className="p-q">
                <Ic size={19}>
                  <path d="M12 2 4 6v6c0 5 3.4 9.4 8 10 4.6-.6 8-5 8-10V6l-8-4Z" />
                </Ic>
                <span>Dispatch</span>
              </button>
            </div>

            <div className="p-callvideo">
              <div className="v-ring" style={{ width: 120, height: 120 }} />
              <div className="v-ring b" style={{ width: 170, height: 170 }} />
              <div className="v-ava" style={{ width: 64, height: 64, fontSize: 22 }}>
                ML
              </div>
              <div className="v-top">
                <span className="v-pill">
                  <span className="rec" />
                  LIVE · 00:42
                </span>
                <span className="v-pill">1080p</span>
              </div>
              <div className="v-bottom">
                <CallWaveform compact />
                <div className="ctrls">
                  <button type="button" className="cbtn" style={{ width: 34, height: 34 }} aria-label="Mute">
                    <Ic size={14}>
                      <rect x="9" y="2" width="6" height="12" rx="3" />
                      <path d="M5 10a7 7 0 0 0 14 0M12 19v3" />
                    </Ic>
                  </button>
                  <button type="button" className="cbtn end" style={{ height: 34, padding: "0 14px", fontSize: 11.5 }}>
                    End
                  </button>
                </div>
              </div>
            </div>

            <div className="p-card" style={{ flex: "0 0 auto" }}>
              <div style={{ padding: "11px 14px 6px", fontSize: 10.5, fontWeight: 700, letterSpacing: ".09em", textTransform: "uppercase", color: "#A2ABBA" }}>
                Recent activity
              </div>
              <div className="p-alert" style={{ padding: "9px 14px" }}>
                <span className="sdot r" style={{ marginTop: 6 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 620 }}>Fall detected · pendant PS-407</div>
                  <div style={{ fontSize: 11, color: "#8B95A5", marginTop: 2 }}>09:42 · auto-escalated to care team</div>
                </div>
              </div>
              <div className="p-alert" style={{ padding: "9px 14px", borderBottom: 0 }}>
                <span className="sdot g" style={{ marginTop: 6 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 620 }}>Answered video call</div>
                  <div style={{ fontSize: 11, color: "#8B95A5", marginTop: 2 }}>09:43 · Dana Whitfield · 42s</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
