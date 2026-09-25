/** 900×1600 Relay chat — Maya Okonkwo DM thread. */

import type { CSSProperties } from "react";

import { realTimeChatFonts } from "@/components/capture/capture-fonts";

function av(hex: string): CSSProperties {
  return { ["--c"]: hex } as CSSProperties;
}

export function RealTimeChatPhoneDmCapture() {
  return (
    <div className={`rtc-capture-root ${realTimeChatFonts}`}>
      <section className="capture capture--phone" aria-label="Relay DM on phone">
        <div className="p-app">
          <header className="p-head">
            <button type="button" className="p-back" aria-label="Back">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18 9 12l6-6" />
              </svg>
            </button>
            <div className="p-room">
              <div className="p-room-av p-room-av--person" style={av("#9A6E9E")}>
                MO
              </div>
              <div>
                <div className="p-room-name">Maya Okonkwo</div>
                <div className="p-room-meta">
                  <i />
                  online · realtime
                </div>
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
            <div className="p-daymark">
              <span>Today</span>
            </div>

            <div className="p-group">
              <div className="p-av" style={av("#9A6E9E")}>
                MO
              </div>
              <div className="p-main">
                <div className="p-ghead">
                  <div className="p-gname">Maya Okonkwo</div>
                  <div className="p-gtime">11:41</div>
                </div>
                <div className="p-bubble">can you sanity-check the reconnect handler before I merge? staging looks fine but I want another pair of eyes on the close code path.</div>
              </div>
            </div>

            <div className="p-group own">
              <div className="p-main">
                <div className="p-ghead">
                  <div className="p-gname">You</div>
                  <div className="p-gtime">11:43</div>
                </div>
                <div className="p-bubble own">on it. I will run through a tab refresh and a hard network drop.</div>
              </div>
            </div>

            <div className="p-group">
              <div className="p-av" style={av("#9A6E9E")}>
                MO
              </div>
              <div className="p-main">
                <div className="p-ghead">
                  <div className="p-gname">Maya Okonkwo</div>
                  <div className="p-gtime">11:58</div>
                </div>
                <div className="p-bubble">ok — patch is up, reconnecting now</div>
              </div>
            </div>
          </div>

          <div className="p-composer">
            <div className="p-composer-in">
              <button type="button" className="p-plus" aria-label="Attach">
                +
              </button>
              <div className="p-field">
                Message <b>Maya</b>
              </div>
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
