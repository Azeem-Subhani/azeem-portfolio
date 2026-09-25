/** 1600×900 Gaming Global realtime chat. */

import { gamingGlobalFonts } from "@/components/capture/capture-fonts";
import { GamingGlobalWebFrame } from "@/components/capture/gaming-global/web-shell";

export function GamingGlobalWebChatCapture() {
  return (
    <div className={`gg-capture-root ${gamingGlobalFonts}`}>
      <GamingGlobalWebFrame
        active="chat"
        crumb={
          <>
            REALTIME / <b>#SCRIM-FINDER</b>
          </>
        }
        searchPlaceholder="Jump to conversation…"
        socketLabel="1,204 ONLINE"
        showNotify={false}
        contentClassName="content content--chat"
      >
        <div className="chat-rail">
          <div className="chat-rail-pad">
            <div className="chat-rail-search">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-4-4" />
              </svg>
              <span>Find channel</span>
            </div>
          </div>
          <div className="chat-rail-sec lbl">Channels · 6</div>
          <button type="button" className="nv active" style={{ paddingLeft: 14 }}>
            <span className="mono" style={{ fontSize: 12 }}>
              #
            </span>
            <span>scrim-finder</span>
            <span className="kbd" style={{ color: "var(--acc)" }}>
              3
            </span>
          </button>
          <button type="button" className="nv" style={{ paddingLeft: 14 }}>
            <span className="mono" style={{ fontSize: 12 }}>
              #
            </span>
            <span>vods-review</span>
          </button>
          <button type="button" className="nv" style={{ paddingLeft: 14 }}>
            <span className="mono" style={{ fontSize: 12 }}>
              #
            </span>
            <span>sens-lab</span>
            <span className="kbd">12</span>
          </button>
          <button type="button" className="nv" style={{ paddingLeft: 14 }}>
            <span className="mono" style={{ fontSize: 12 }}>
              #
            </span>
            <span>tournament-news</span>
          </button>
          <button type="button" className="nv" style={{ paddingLeft: 14 }}>
            <span className="mono" style={{ fontSize: 12 }}>
              #
            </span>
            <span>bug-report</span>
            <span className="kbd">1</span>
          </button>
          <div className="chat-rail-sec lbl">Direct · 4</div>
          <button type="button" className="nv" style={{ paddingLeft: 14, gap: 9 }}>
            <span className="chat-dot acc" />
            <span>nexus.igl</span>
            <span className="kbd" style={{ color: "var(--acc)" }}>
              2
            </span>
          </button>
          <button type="button" className="nv" style={{ paddingLeft: 14, gap: 9 }}>
            <span className="chat-dot wrn" />
            <span>halcyon</span>
          </button>
          <button type="button" className="nv" style={{ paddingLeft: 14, gap: 9 }}>
            <span className="chat-dot off" />
            <span>r0gue_ttv</span>
          </button>
          <button type="button" className="nv" style={{ paddingLeft: 14, gap: 9 }}>
            <span className="chat-dot acc" />
            <span>kaiju.coach</span>
          </button>
          <div className="chat-rail-foot">
            <span className="mono" style={{ fontSize: 9, color: "var(--acc)", letterSpacing: "0.12em" }}>
              ● TYPING
            </span>
            <span style={{ fontSize: 10, color: "var(--tx3)" }}>halcyon is writing…</span>
          </div>
        </div>

        <div className="chat-thread">
          <div className="chat-thread-head">
            <span className="mono" style={{ fontSize: 15, color: "var(--tx3)" }}>
              #
            </span>
            <span style={{ fontSize: 13.5, fontWeight: 700 }}>scrim-finder</span>
            <span className="chip">24 MEMBERS</span>
            <span className="chip acc">
              <i />4 ONLINE
            </span>
          </div>

          <div className="chat-msgs">
            <div className="chat-day">
              <span />
              TODAY · 12 SEPT
              <span />
            </div>

            <div className="chat-line">
              <div className="chat-time">13:58</div>
              <div className="chat-body">
                <div className="chat-meta">
                  <span className="chat-user-acc">nexus.igl</span>
                  <span className="chip" style={{ height: 16, fontSize: 8 }}>
                    IGL
                  </span>
                  <span className="chat-text">
                    need 2 for scrim vs Team Kaiju, 21:00 IST BO3
                  </span>
                </div>
              </div>
            </div>

            <div className="chat-line">
              <div className="chat-time">14:01</div>
              <div className="chat-body">
                <div className="chat-meta">
                  <span className="chat-user-hal">halcyon</span>
                  <span className="chat-text">roles?</span>
                </div>
              </div>
            </div>

            <div className="chat-line">
              <div className="chat-time">14:02</div>
              <div className="chat-body">
                <div className="chat-meta">
                  <span className="chat-user-acc">nexus.igl</span>
                  <span className="chat-text">sentinel + controller. map pool is Ascent / Lotus</span>
                </div>
                <div className="chat-embed">
                  <div>
                    <div className="lbl">Match lobby</div>
                    <div style={{ fontSize: 14, fontWeight: 800, marginTop: 6, letterSpacing: "-0.01em" }}>
                      ASCENT · LOTUS
                    </div>
                    <div className="mono" style={{ fontSize: 10, color: "var(--tx3)", marginTop: 6, letterSpacing: "0.1em" }}>
                      21:00 IST · BO3 · CUSTOM SERVER
                    </div>
                  </div>
                  <div style={{ height: 44, width: 1, background: "var(--line)" }} />
                  <div>
                    <div className="lbl">Slots</div>
                    <div className="mono" style={{ fontSize: 19, fontWeight: 600, marginTop: 5 }}>
                      3<span style={{ color: "var(--tx3)", fontSize: 13 }}>/5</span>
                    </div>
                  </div>
                  <div style={{ height: 44, width: 1, background: "var(--line)" }} />
                  <div>
                    <div className="lbl">Avg rank</div>
                    <div className="mono" style={{ fontSize: 19, fontWeight: 600, marginTop: 5, color: "var(--acc)" }}>
                      IMM
                    </div>
                  </div>
                  <button type="button" className="btn pri" style={{ marginLeft: "auto" }}>
                    REQUEST SLOT
                  </button>
                </div>
              </div>
            </div>

            <div className="chat-line">
              <div className="chat-time">14:05</div>
              <div className="chat-body">
                <div className="chat-meta">
                  <span className="chat-user-v1">v1p3r</span>
                  <span className="chip acc" style={{ height: 16, fontSize: 8 }}>
                    YOU
                  </span>
                  <span className="chat-text">in. sentinel main, can flex controller on Lotus</span>
                </div>
                <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                  <span className="chip">SENS 41.9 CM/360</span>
                  <span className="chip inf">RATING 1.18</span>
                </div>
              </div>
            </div>

            <div className="chat-line">
              <div className="chat-time">14:06</div>
              <div className="chat-body">
                <div className="chat-meta">
                  <span className="chat-user-hal">halcyon</span>
                  <span className="chat-text">that&apos;s 5. locking the lobby.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="chat-composer">
            <div className="chat-composer-box">
              <span style={{ fontSize: 12.5, color: "var(--tx3)" }}>Message #scrim-finder</span>
              <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
                <span className="mono" style={{ fontSize: 9, color: "#5c564e", letterSpacing: "0.1em" }}>
                  / FOR COMMANDS
                </span>
                <span className="mono" style={{ fontSize: 9, color: "#5c564e", border: "1px solid var(--line)", padding: "2px 5px" }}>
                  ↵
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="chat-members">
          <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center" }}>
            <span className="lbl">Members · 24</span>
            <span className="chip acc" style={{ marginLeft: "auto" }}>
              <i />4 LIVE
            </span>
          </div>
          <div style={{ padding: "14px 16px 6px" }} className="lbl">
            In game · 2
          </div>
          <div className="chat-member-row">
            <span className="chat-dot wrn" />
            <span style={{ fontSize: 12, fontWeight: 600 }}>halcyon</span>
            <span className="mono" style={{ marginLeft: "auto", fontSize: 9, color: "var(--tx3)", letterSpacing: "0.1em" }}>
              ASCENT
            </span>
          </div>
          <div className="chat-member-row">
            <span className="chat-dot wrn" />
            <span style={{ fontSize: 12, fontWeight: 600 }}>r0gue_ttv</span>
            <span className="mono" style={{ marginLeft: "auto", fontSize: 9, color: "var(--tx3)", letterSpacing: "0.1em" }}>
              LOTUS
            </span>
          </div>
          <div style={{ padding: "16px 16px 6px" }} className="lbl">
            Online · 2
          </div>
          <div className="chat-member-row">
            <span className="chat-dot acc" />
            <span style={{ fontSize: 12, fontWeight: 600 }}>nexus.igl</span>
            <span className="chip" style={{ marginLeft: "auto", height: 16, fontSize: 8 }}>
              IGL
            </span>
          </div>
          <div className="chat-member-row">
            <span className="chat-dot acc" />
            <span style={{ fontSize: 12, fontWeight: 600 }}>v1p3r</span>
            <span className="chip acc" style={{ marginLeft: "auto", height: 16, fontSize: 8 }}>
              YOU
            </span>
          </div>
          <div style={{ marginTop: "auto", borderTop: "1px solid var(--line)", padding: "14px 16px" }}>
            <div className="lbl" style={{ marginBottom: 11 }}>
              Socket health
            </div>
            <div className="ro">
              <div className="ro-row">
                <span style={{ fontSize: 11, color: "var(--tx2)" }}>Latency</span>
                <span className="mono" style={{ fontSize: 11, color: "var(--acc)" }}>
                  38 ms
                </span>
              </div>
              <div className="ro-row">
                <span style={{ fontSize: 11, color: "var(--tx2)" }}>Transport</span>
                <span className="mono" style={{ fontSize: 11 }}>
                  WS
                </span>
              </div>
              <div className="ro-row">
                <span style={{ fontSize: 11, color: "var(--tx2)" }}>Reconnects</span>
                <span className="mono" style={{ fontSize: 11 }}>
                  0
                </span>
              </div>
            </div>
          </div>
        </div>
      </GamingGlobalWebFrame>
    </div>
  );
}
