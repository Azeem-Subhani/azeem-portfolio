/** 900×1600 Relay chat — #design-crit thread. */

import type { CSSProperties } from "react";

function av(hex: string): CSSProperties {
  return { ["--c"]: hex } as CSSProperties;
}

export function RealTimeChatPhoneCapture() {
  return (
    <div className="rtc-capture-root">
      <section className="capture capture--phone" aria-label="Relay chat on phone">
        <div className="p-app">
          <header className="p-head">
            <button type="button" className="p-back" aria-label="Back">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18 9 12l6-6" />
              </svg>
            </button>
            <div className="p-room">
              <div className="p-room-av">#</div>
              <div>
                <div className="p-room-name">design-crit</div>
                <div className="p-room-meta"><i />4 online · 12 members</div>
              </div>
            </div>
            <button type="button" className="p-icon" aria-label="More">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </button>
          </header>

          <div className="p-live">
            <i />
            <span>socket open</span>
            <span className="dim">/</span>
            <span>14 ms</span>
            <span className="sp" />
            <span className="r">8 clients</span>
          </div>

          <div className="p-msgs">
            <div className="p-daymark"><span>Today</span></div>

            <div className="p-group">
              <div className="p-av" style={av("#C2704E")}>PR</div>
              <div className="p-main">
                <div className="p-ghead">
                  <div className="p-gname">Priya Raman</div>
                  <div className="p-gtime">11:42</div>
                </div>
                <div className="p-bubble">morning! dropped the new spacing tokens into the branch — everything sits on a 4px base now.</div>
                <div className="p-bubble">the old 6px rhythm was fighting the type scale at smaller sizes.</div>
              </div>
            </div>

            <div className="p-group">
              <div className="p-av" style={av("#6E86B8")}>RS</div>
              <div className="p-main">
                <div className="p-ghead">
                  <div className="p-gname">Ravi Shankar</div>
                  <div className="p-gtime">11:44</div>
                </div>
                <div className="p-bubble">nice. the 4px base makes the list breathe a lot more — did you touch the avatar gutter too?</div>
                <div className="p-reactions">
                  <span className="p-react">🔥 <b>3</b></span>
                  <span className="p-react">🙌 <b>1</b></span>
                </div>
              </div>
            </div>

            <div className="p-group own">
              <div className="p-main">
                <div className="p-ghead">
                  <div className="p-gname">You</div>
                  <div className="p-gtime">11:47</div>
                </div>
                <div className="p-bubble own">pulling it now. does this change the bubble radius too?</div>
              </div>
            </div>

            <div className="p-group">
              <div className="p-av" style={av("#9A6E9E")}>MO</div>
              <div className="p-main">
                <div className="p-ghead">
                  <div className="p-gname">Maya Okonkwo</div>
                  <div className="p-gtime">11:55</div>
                </div>
                <div className="p-bubble">heads up — presence events batch on reconnect. <code>ws.readyState</code> fires late, so the dots lag ~400ms.</div>
                <div className="p-reactions">
                  <span className="p-react">👀 <b>2</b></span>
                </div>
              </div>
            </div>

            <div className="p-typing">
              <div className="p-tdots"><i /><i /><i /></div>
              <span><b>Priya</b> is typing…</span>
            </div>
          </div>

          <div className="p-composer">
            <div className="p-composer-in">
              <button type="button" className="p-plus" aria-label="Attach">+</button>
              <div className="p-field">Message <b>#design-crit</b></div>
              <button type="button" className="p-send" aria-label="Send">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
