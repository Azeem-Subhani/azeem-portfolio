/** 1600×900 Gaming Global sensitivity converter. */

import { gamingGlobalFonts } from "@/components/capture/capture-fonts";
import { GamingGlobalWebFrame } from "@/components/capture/gaming-global/web-shell";

const TABLE_ROWS = [
  {
    badge: "VAL",
    name: "Valorant",
    sens: "0.390",
    edpi: "312.0",
    cm: "41.90",
    delta: "0.00%",
    deltaTone: "ok" as const,
    engine: "UNREAL 5.3",
    tag: "TARGET",
  },
  {
    badge: "CS2",
    name: "Counter-Strike 2",
    sens: "1.240",
    edpi: "992.0",
    cm: "41.90",
    delta: "0.00%",
    deltaTone: "ok" as const,
    engine: "SOURCE 2",
  },
  {
    badge: "APX",
    name: "Apex Legends",
    sens: "1.240",
    edpi: "992.0",
    cm: "41.90",
    delta: "0.00%",
    deltaTone: "ok" as const,
    engine: "SOURCE",
  },
  {
    badge: "OW2",
    name: "Overwatch 2",
    sens: "4.130",
    edpi: "3,304.0",
    cm: "41.90",
    delta: "0.00%",
    deltaTone: "ok" as const,
    engine: "OW ENGINE",
  },
  {
    badge: "R6",
    name: "Rainbow Six Siege",
    sens: "12.00",
    edpi: "9,600.0",
    cm: "41.93",
    delta: "+0.07%",
    deltaTone: "mid" as const,
    engine: "ANVIL",
  },
  {
    badge: "FIN",
    name: "The Finals",
    sens: "34.00",
    edpi: "27,200.0",
    cm: "41.88",
    delta: "−0.05%",
    deltaTone: "mid" as const,
    engine: "UNREAL 5.3",
  },
];

export function GamingGlobalWebConverterCapture() {
  return (
    <div className={`gg-capture-root ${gamingGlobalFonts}`}>
      <GamingGlobalWebFrame
        active="converter"
        crumb={
          <>
            TOOLS / <b>SENSITIVITY CONVERTER</b>
          </>
        }
      >
        <div className="chead">
          <div>
            <div data-h="1">SENSITIVITY CONVERTER</div>
            <div className="sub">Cross-game aim translation · 14 titles supported · yaw-accurate</div>
          </div>
          <div className="acts">
            <div className="seg">
              <span>DISTANCE</span>
              <span className="on">SENS</span>
              <span>PRO</span>
            </div>
            <button type="button" className="btn">
              SAVE PRESET
            </button>
            <button type="button" className="btn pri">
              EXPORT .CFG
            </button>
          </div>
        </div>

        <div className="conv-grid">
          <div className="panel tick">
            <div className="ph">
              <span className="idx">01</span>
              <div data-h="3">Source</div>
              <div className="rt">
                <span className="chip acc">
                  <i />
                  LOCKED
                </span>
              </div>
            </div>
            <div className="conv-panel-body">
              <div className="gsel">
                <div className="gbadge">CS2</div>
                <div>
                  <div className="gn">Counter-Strike 2</div>
                  <div className="gs">SOURCE ENGINE · YAW 0.022</div>
                </div>
                <svg className="chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div className="field">
                  <div className="lbl">Mouse DPI</div>
                  <div className="v mono">
                    800<span className="u">DPI</span>
                  </div>
                </div>
                <div className="field">
                  <div className="lbl">In-game sens</div>
                  <div className="v mono">1.240</div>
                </div>
              </div>
              <div className="hr" />
              <div className="ro">
                <div className="ro-row">
                  <span className="k">Effective DPI</span>
                  <span className="v">992.0</span>
                </div>
                <div className="ro-row">
                  <span className="k">cm / 360°</span>
                  <span className="v acc">41.90</span>
                </div>
                <div className="ro-row">
                  <span className="k">Counts / 360°</span>
                  <span className="v">13,197</span>
                </div>
                <div className="ro-row">
                  <span className="k">Polling</span>
                  <span className="v">1000 Hz</span>
                </div>
              </div>
            </div>
          </div>

          <div className="panel tick">
            <div className="ph">
              <span className="idx">02</span>
              <div data-h="3">Match</div>
            </div>
            <div className="conv-match">
              <div className="lbl">Locked distance</div>
              <div className="conv-match-num">41.90</div>
              <div className="mono" style={{ fontSize: 9.5, letterSpacing: "0.24em", color: "var(--tx3)" }}>
                CM / 360°
              </div>
              <svg width="180" height="26" viewBox="0 0 180 26" aria-hidden="true">
                <path d="M2 13h150" stroke="#433e36" strokeWidth="1" />
                <path d="M152 13l-9-5v10l9-5z" fill="#FF7A2A" />
                <path d="M2 13l9-5v10l-9-5z" fill="#433e36" />
                <rect x="60" y="8" width="3" height="10" fill="#FF7A2A" />
                <rect x="96" y="8" width="3" height="10" fill="#433e36" />
              </svg>
              <div className="ro" style={{ width: "100%", borderTop: "1px dashed #2a2722", paddingTop: 12 }}>
                <div className="ro-row">
                  <span className="k">Ratio</span>
                  <span className="v">3.1789</span>
                </div>
                <div className="ro-row">
                  <span className="k">Confidence</span>
                  <span className="v">99.2%</span>
                </div>
                <div className="ro-row">
                  <span className="k">Rounding</span>
                  <span className="v">0.03%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="panel tick">
            <div className="ph">
              <span className="idx">03</span>
              <div data-h="3">Target</div>
              <div className="rt">
                <span className="chip">14 TITLES</span>
              </div>
            </div>
            <div className="conv-panel-body">
              <div className="gsel" style={{ borderColor: "rgba(255, 122, 42, 0.32)" }}>
                <div className="gbadge" style={{ borderColor: "rgba(255, 122, 42, 0.32)" }}>
                  VAL
                </div>
                <div>
                  <div className="gn">Valorant</div>
                  <div className="gs">UNREAL · YAW 0.070</div>
                </div>
                <svg className="chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
              <div
                className="field"
                style={{
                  background: "rgba(255, 122, 42, 0.05)",
                  borderColor: "rgba(255, 122, 42, 0.28)",
                }}
              >
                <div className="lbl" style={{ color: "var(--acc)" }}>
                  Converted sensitivity
                </div>
                <div className="v mono" style={{ fontSize: 32, color: "var(--acc)" }}>
                  0.390
                </div>
              </div>
              <div className="hr" />
              <div className="ro">
                <div className="ro-row">
                  <span className="k">Effective DPI</span>
                  <span className="v">312.0</span>
                </div>
                <div className="ro-row">
                  <span className="k">cm / 360°</span>
                  <span className="v">41.90</span>
                </div>
                <div className="ro-row">
                  <span className="k">Scope mult</span>
                  <span className="v">1.000</span>
                </div>
                <div className="ro-row">
                  <span className="k">Deviation</span>
                  <span className="v acc">0.00%</span>
                </div>
              </div>
              <div style={{ marginTop: "auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <button type="button" className="btn" style={{ justifyContent: "center" }}>
                  COPY
                </button>
                <button type="button" className="btn pri" style={{ justifyContent: "center" }}>
                  APPLY
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="panel" style={{ flex: "0 0 auto" }}>
          <div className="ph">
            <span className="idx">04</span>
            <div data-h="3">All titles · converted from CS2 @ 800 DPI</div>
            <div className="rt">
              <span className="chip">TOLERANCE ±0.10%</span>
              <span className="chip inf">
                <i />
                SYNCED 14:22:07
              </span>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th style={{ width: "32%" }}>Game</th>
                <th>In-game sens</th>
                <th>eDPI</th>
                <th>cm / 360°</th>
                <th>Δ vs locked</th>
                <th style={{ width: 110 }}>Engine</th>
                <th style={{ width: 70 }} />
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map((row, index) => (
                <tr key={row.badge} className={index === 0 ? "hl" : undefined}>
                  <td>
                    <div className="gname">
                      <span className="gk">{row.badge}</span>
                      {row.name}
                    </div>
                  </td>
                  <td className="num">{row.sens}</td>
                  <td className="num">{row.edpi}</td>
                  <td className="num">{row.cm}</td>
                  <td className={`delta ${row.deltaTone}`}>{row.delta}</td>
                  <td className="mut mono" style={{ fontSize: 10 }}>
                    {row.engine}
                  </td>
                  <td>{row.tag ? <span className="chip acc">{row.tag}</span> : null}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GamingGlobalWebFrame>
    </div>
  );
}
