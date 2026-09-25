/** 900×1600 Gaming Global sensitivity converter on phone. */

import { gamingGlobalFonts } from "@/components/capture/capture-fonts";
import { GamingGlobalMark } from "@/components/capture/gaming-global/mark";
import { GamingGlobalPhoneTabBar } from "@/components/capture/gaming-global/phone-tabs";

const TITLES: {
  badge: string;
  name: string;
  sens: string;
  highlight?: boolean;
}[] = [
  { badge: "VAL", name: "Valorant", sens: "0.390", highlight: true },
  { badge: "APX", name: "Apex Legends", sens: "1.240" },
  { badge: "OW2", name: "Overwatch 2", sens: "4.130" },
  { badge: "R6", name: "Rainbow Six Siege", sens: "12.00" },
  { badge: "FIN", name: "The Finals", sens: "34.00" },
];

export function GamingGlobalPhoneConverterCapture() {
  return (
    <div className={`gg-capture-root ${gamingGlobalFonts}`}>
      <section className="capture capture--phone" aria-label="Gaming Global converter on phone">
        <div className="ph-inner">
          <header className="ph-head">
            <GamingGlobalMark size={19} strokeWidth={1.8} />
            <div className="ph-brand">
              GAMING<span>GLOBAL</span>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
              <span className="mono" style={{ fontSize: 11, letterSpacing: "0.12em", color: "var(--acc)" }}>
                ● LIVE
              </span>
              <div className="av" style={{ width: 28, height: 28, flex: "0 0 28px", fontSize: 11 }}>
                V1
              </div>
            </div>
          </header>

          <div className="ph-body">
            <div>
              <div className="ph-title">CONVERTER</div>
              <div className="ph-sub mono">14 TITLES · YAW-ACCURATE</div>
            </div>

            <div className="panel tick">
              <div className="ph ph-ph">
                <span className="mono" style={{ fontSize: 11, color: "var(--tx3)" }}>
                  01
                </span>
                <div data-h="3">Source</div>
                <span className="chip acc" style={{ marginLeft: "auto", height: 18, fontSize: 10 }}>
                  <i />
                  LOCKED
                </span>
              </div>
              <div style={{ padding: 11, display: "flex", flexDirection: "column", gap: 9 }}>
                <div className="gsel" style={{ padding: "8px 10px" }}>
                  <div className="gbadge" style={{ width: 28, height: 28, flex: "0 0 28px", fontSize: 10 }}>
                    CS2
                  </div>
                  <div>
                    <div className="gn" style={{ fontSize: 15 }}>
                      Counter-Strike 2
                    </div>
                    <div className="gs" style={{ fontSize: 10 }}>
                      SOURCE 2 · YAW 0.022
                    </div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <div className="field" style={{ padding: "8px 10px", gap: 4 }}>
                    <div className="lbl" style={{ fontSize: 11 }}>
                      Mouse DPI
                    </div>
                    <div className="v mono" style={{ fontSize: 20 }}>
                      800
                    </div>
                  </div>
                  <div className="field" style={{ padding: "8px 10px", gap: 4 }}>
                    <div className="lbl" style={{ fontSize: 11 }}>
                      Sens
                    </div>
                    <div className="v mono" style={{ fontSize: 20 }}>
                      1.240
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="ph-conv-strip">
              <div>
                <div className="lbl" style={{ fontSize: 11 }}>
                  Locked cm / 360°
                </div>
                <div className="mono" style={{ fontSize: 26, fontWeight: 600, color: "var(--acc)", letterSpacing: "-0.03em", lineHeight: 1, marginTop: 4 }}>
                  41.90
                </div>
              </div>
              <svg width="86" height="18" viewBox="0 0 86 18" aria-hidden="true" style={{ marginLeft: "auto" }}>
                <path d="M2 9h68" stroke="#433e36" strokeWidth="1" />
                <path d="M76 9l-8-4v8l8-4z" fill="#FF7A2A" />
                <rect x="30" y="4.5" width="2.5" height="9" fill="#FF7A2A" />
              </svg>
            </div>

            <div className="panel tick" style={{ borderColor: "rgba(255, 122, 42, 0.28)" }}>
              <div className="ph ph-ph">
                <span className="mono" style={{ fontSize: 11, color: "var(--tx3)" }}>
                  02
                </span>
                <div data-h="3">Target</div>
                <span className="chip" style={{ marginLeft: "auto", height: 18, fontSize: 10 }}>
                  14 TITLES
                </span>
              </div>
              <div style={{ padding: 11, display: "flex", flexDirection: "column", gap: 9 }}>
                <div className="gsel" style={{ padding: "8px 10px", borderColor: "rgba(255, 122, 42, 0.32)" }}>
                  <div className="gbadge" style={{ width: 28, height: 28, flex: "0 0 28px", fontSize: 10, borderColor: "rgba(255, 122, 42, 0.32)" }}>
                    VAL
                  </div>
                  <div>
                    <div className="gn" style={{ fontSize: 15 }}>
                      Valorant
                    </div>
                    <div className="gs" style={{ fontSize: 10 }}>
                      UNREAL · YAW 0.070
                    </div>
                  </div>
                </div>
                <div
                  className="field"
                  style={{
                    padding: "10px 11px",
                    gap: 4,
                    background: "rgba(255, 122, 42, 0.05)",
                    borderColor: "rgba(255, 122, 42, 0.3)",
                  }}
                >
                  <div className="lbl" style={{ fontSize: 11, color: "var(--acc)" }}>
                    Converted sensitivity
                  </div>
                  <div className="v mono" style={{ fontSize: 32, color: "var(--acc)", lineHeight: 1.05 }}>
                    0.390
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
                  <button type="button" className="btn" style={{ height: 36, fontSize: 12, justifyContent: "center" }}>
                    COPY
                  </button>
                  <button type="button" className="btn pri" style={{ height: 36, fontSize: 12, justifyContent: "center" }}>
                    APPLY
                  </button>
                </div>
              </div>
            </div>

            <div className="panel" style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
              <div className="ph ph-ph">
                <div data-h="3">All titles</div>
                <span className="mono" style={{ marginLeft: "auto", fontSize: 10, color: "var(--tx3)" }}>
                  FROM CS2 @ 800 DPI
                </span>
              </div>
              <div>
                {TITLES.map((row) => (
                  <div
                    key={row.badge}
                    className="user-row"
                    style={row.highlight ? { background: "rgba(255, 122, 42, 0.05)" } : undefined}
                  >
                    <span className="gk" style={{ color: row.highlight ? "var(--acc)" : undefined }}>
                      {row.badge}
                    </span>
                    <span className="user-name">{row.name}</span>
                    <span className="mono" style={{ marginLeft: "auto", fontSize: 14, color: row.highlight ? "var(--acc)" : undefined }}>
                      {row.sens}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <GamingGlobalPhoneTabBar active="CONVERT" />
        </div>
      </section>
    </div>
  );
}
