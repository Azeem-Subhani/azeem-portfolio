/** 900×1600 Relay chat — conversation inbox on phone. */

import type { CSSProperties } from "react";

function av(hex: string): CSSProperties {
  return { ["--c"]: hex } as CSSProperties;
}

export function RealTimeChatPhoneInboxCapture() {
  return (
    <div className="rtc-capture-root">
      <section className="capture capture--phone" aria-label="Relay inbox on phone">
        <div className="p-app p-app--inbox">
          <header className="p-inbox-head">
            <div className="p-inbox-title">Relay</div>
            <button type="button" className="p-inbox-new" aria-label="New conversation">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </header>

          <div className="p-inbox-search">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M20.5 20.5 16.7 16.7" />
            </svg>
            <span>Search messages, people…</span>
          </div>

          <div className="p-inbox-filters">
            <span className="p-inbox-chip on">All</span>
            <span className="p-inbox-chip">Unread</span>
            <span className="p-inbox-chip">Rooms</span>
            <span className="p-inbox-chip">DMs</span>
          </div>

          <div className="p-inbox-list">
            <div className="p-inbox-sec">TODAY</div>

            <button type="button" className="p-inbox-row active">
              <div className="p-inbox-av room">#</div>
              <div className="p-inbox-main">
                <div className="p-inbox-name">design-crit</div>
                <div className="p-inbox-prev">
                  <b>Priya:</b> the type scale feels off at 14px…
                </div>
              </div>
              <div className="p-inbox-side">
                <span>12:04</span>
                <em>3</em>
              </div>
            </button>

            <button type="button" className="p-inbox-row">
              <div className="p-inbox-av" style={av("#9A6E9E")}>
                MO<span className="pres on" />
              </div>
              <div className="p-inbox-main">
                <div className="p-inbox-name">Maya Okonkwo</div>
                <div className="p-inbox-prev">ok — patch is up, reconnecting now</div>
              </div>
              <div className="p-inbox-side">
                <span>11:58</span>
              </div>
            </button>

            <button type="button" className="p-inbox-row">
              <div className="p-inbox-av room">#</div>
              <div className="p-inbox-main">
                <div className="p-inbox-name">ship-it</div>
                <div className="p-inbox-prev">deploy 2.4.1 is live 🎉</div>
              </div>
              <div className="p-inbox-side">
                <span>11:52</span>
                <em className="soft">1</em>
              </div>
            </button>

            <button type="button" className="p-inbox-row">
              <div className="p-inbox-av" style={av("#6F9E86")}>
                TB<span className="pres away" />
              </div>
              <div className="p-inbox-main">
                <div className="p-inbox-name">Tomas Berg</div>
                <div className="p-inbox-prev">sounds good, I&apos;ll push the fix</div>
              </div>
              <div className="p-inbox-side">
                <span>11:20</span>
              </div>
            </button>

            <div className="p-inbox-sec">EARLIER</div>

            <button type="button" className="p-inbox-row">
              <div className="p-inbox-av room">#</div>
              <div className="p-inbox-main">
                <div className="p-inbox-name">engineering</div>
                <div className="p-inbox-prev">k6 held 8k concurrent sockets</div>
              </div>
              <div className="p-inbox-side">
                <span>Tue</span>
              </div>
            </button>
          </div>

          <div className="p-inbox-live">
            <i />
            <span>socket open</span>
            <span className="dim">/</span>
            <span>14 ms</span>
          </div>
        </div>
      </section>
    </div>
  );
}
