/** 1600×900 Relay chat — #design-crit thread. */

import type { CSSProperties } from "react";

function av(hex: string): CSSProperties {
  return { ["--c"]: hex } as CSSProperties;
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.2A8.4 8.4 0 0 1 12 3.1a8.4 8.4 0 0 1 9 8.4z" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9.5" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16.5 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function HashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </svg>
  );
}

function SlidersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />
    </svg>
  );
}

export function RealTimeChatWebCapture() {
  return (
    <div className="rtc-capture-root">
      <section className="capture capture--web" aria-label="Relay chat desktop">
        <div className="app">
          <nav className="rail" aria-label="Relay">
            <div className="mark" aria-hidden="true">
              <svg width="30" height="30" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round">
                <path d="M11 11a7 7 0 0 0 0 10" />
                <path d="M21 11a7 7 0 0 1 0 10" />
                <path d="M7 7a12 12 0 0 0 0 18" />
                <path d="M25 7a12 12 0 0 1 0 18" />
                <circle cx="16" cy="16" r="2.6" fill="currentColor" stroke="none" />
              </svg>
            </div>
            <button type="button" className="nav-btn active" aria-label="Chats">
              <ChatIcon />
            </button>
            <button type="button" className="nav-btn" aria-label="People">
              <PeopleIcon />
            </button>
            <button type="button" className="nav-btn" aria-label="Rooms">
              <HashIcon />
            </button>
            <button type="button" className="nav-btn" aria-label="Alerts">
              <BellIcon />
            </button>
            <div className="spacer" />
            <button type="button" className="nav-btn" aria-label="Settings">
              <SlidersIcon />
            </button>
            <div className="me">AR</div>
          </nav>

          <aside className="sidebar">
            <div className="sb-head">
              <div className="sb-title">Relay</div>
              <button type="button" className="sb-new" aria-label="New conversation">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </div>

            <div className="sb-search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M20.5 20.5 16.7 16.7" />
              </svg>
              <span>Search messages, people…</span>
            </div>

            <div className="sb-filters">
              <button type="button" className="chip on">All</button>
              <button type="button" className="chip">Unread</button>
              <button type="button" className="chip">Rooms</button>
              <button type="button" className="chip">DMs</button>
            </div>

            <div className="sb-list">
              <div className="sb-sec">TODAY</div>

              <button type="button" className="conv active">
                <div className="av room">#</div>
                <div className="conv-main">
                  <div className="conv-name"><span className="hash">#</span>design-crit</div>
                  <div className="conv-prev"><b>Priya:</b> the type scale feels off at 14px…</div>
                </div>
                <div className="conv-side">
                  <div className="conv-time">12:04</div>
                  <div className="badge">3</div>
                </div>
              </button>

              <button type="button" className="conv">
                <div className="av" style={av("#9A6E9E")}>MO<span className="pres on" /></div>
                <div className="conv-main">
                  <div className="conv-name">Maya Okonkwo</div>
                  <div className="conv-prev">ok — patch is up, reconnecting now</div>
                </div>
                <div className="conv-side"><div className="conv-time">11:58</div></div>
              </button>

              <button type="button" className="conv">
                <div className="av room">#</div>
                <div className="conv-main">
                  <div className="conv-name"><span className="hash">#</span>ship-it</div>
                  <div className="conv-prev">deploy 2.4.1 is live 🎉</div>
                </div>
                <div className="conv-side">
                  <div className="conv-time">11:52</div>
                  <div className="badge soft">1</div>
                </div>
              </button>

              <button type="button" className="conv">
                <div className="av" style={av("#6F9E86")}>TB<span className="pres away" /></div>
                <div className="conv-main">
                  <div className="conv-name">Tomas Berg</div>
                  <div className="conv-prev">sounds good, I&apos;ll push the fix</div>
                </div>
                <div className="conv-side"><div className="conv-time">11:20</div></div>
              </button>

              <button type="button" className="conv">
                <div className="av room">#</div>
                <div className="conv-main">
                  <div className="conv-name"><span className="hash">#</span>random</div>
                  <div className="conv-prev"><b>Ravi:</b> bagels in the kitchen</div>
                </div>
                <div className="conv-side"><div className="conv-time">10:48</div></div>
              </button>

              <button type="button" className="conv">
                <div className="av" style={av("#C99A46")}>AF<span className="pres off" /></div>
                <div className="conv-main">
                  <div className="conv-name">Ada Fernández</div>
                  <div className="conv-prev">◍ voice message · 0:24</div>
                </div>
                <div className="conv-side"><div className="conv-time">10:12</div></div>
              </button>

              <div className="sb-sec">EARLIER</div>

              <button type="button" className="conv">
                <div className="av room">#</div>
                <div className="conv-main">
                  <div className="conv-name"><span className="hash">#</span>engineering</div>
                  <div className="conv-prev">k6 held 8k concurrent sockets</div>
                </div>
                <div className="conv-side"><div className="conv-time">Tue</div></div>
              </button>

              <button type="button" className="conv">
                <div className="av" style={av("#6E86B8")}>FG</div>
                <div className="conv-main">
                  <div className="conv-name">Frontend Guild</div>
                  <div className="conv-prev"><b>Ravi:</b> shipping the presence fix</div>
                </div>
                <div className="conv-side">
                  <div className="conv-time">Tue</div>
                  <div className="badge soft">5</div>
                </div>
              </button>
            </div>
          </aside>

          <main className="chat">
            <header className="chat-head">
              <div className="room-glyph">#</div>
              <div>
                <div className="chat-title">design-crit</div>
                <div className="chat-sub"><i />4 online · 12 members · 1,284 messages</div>
              </div>
              <div className="grow" />
              <div className="live">
                <span className="pulse" />
                <span>socket open</span>
                <span className="dim">/</span>
                <span>14 ms</span>
                <span className="dim">/</span>
                <span>8 clients</span>
              </div>
              <button type="button" className="icon-btn" aria-label="Search thread">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20.5 20.5 16.7 16.7" />
                </svg>
              </button>
              <button type="button" className="icon-btn" aria-label="Expand">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 4h4a1 1 0 0 1 1 1v4M9 20H5a1 1 0 0 1-1-1v-4M20 4l-7 7M4 20l7-7" />
                </svg>
              </button>
              <button type="button" className="icon-btn" aria-label="More">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none" />
                  <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
                  <circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none" />
                </svg>
              </button>
            </header>

            <div className="msgs">
              <div className="daymark"><span>Today</span></div>

              <div className="group">
                <div className="g-av" style={av("#C2704E")}>PR</div>
                <div className="g-main">
                  <div className="g-head">
                    <div className="g-name">Priya Raman</div>
                    <div className="g-time">11:42</div>
                  </div>
                  <div className="bubble">morning! dropped the new spacing tokens into the branch — everything sits on a 4px base now.</div>
                  <div className="bubble">the old 6px rhythm was fighting the type scale at smaller sizes, you could see it in the sidebar gutters.</div>
                </div>
              </div>

              <div className="group">
                <div className="g-av" style={av("#6E86B8")}>RS</div>
                <div className="g-main">
                  <div className="g-head">
                    <div className="g-name">Ravi Shankar</div>
                    <div className="g-time">11:44</div>
                  </div>
                  <div className="bubble">nice. the 4px base makes the message list breathe a lot more — <span className="mention">@Priya</span> did you also touch the avatar gutter?</div>
                  <div className="reactions">
                    <span className="react">🔥 <b>3</b></span>
                    <span className="react mine">🙌 <b>1</b></span>
                  </div>
                </div>
              </div>

              <div className="group own">
                <div className="g-main">
                  <div className="g-head">
                    <div className="g-name">You</div>
                    <div className="g-time">11:47</div>
                  </div>
                  <div className="bubble own">pulling it now. does this change the bubble radius too, or just spacing?</div>
                </div>
              </div>

              <div className="group">
                <div className="g-av" style={av("#9A6E9E")}>MO</div>
                <div className="g-main">
                  <div className="g-head">
                    <div className="g-name">Maya Okonkwo</div>
                    <div className="g-time">11:55</div>
                  </div>
                  <div className="bubble">heads up — presence events are batching on reconnect. <code>ws.readyState === 1</code> fires late, so the green dots lag ~400ms. patch in a bit.</div>
                  <div className="reactions">
                    <span className="react">👀 <b>2</b></span>
                  </div>
                </div>
              </div>

              <div className="typing">
                <div className="tdots"><i /><i /><i /></div>
                <span><b>Priya</b> is typing…</span>
              </div>
            </div>

            <div className="composer">
              <div className="composer-in">
                <button type="button" className="plus" aria-label="Attach">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
                <div className="field">Message <b>#design-crit</b></div>
                <button type="button" className="icon-btn" aria-label="Emoji">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8.6 14.4a4.4 4.4 0 0 0 6.8 0" />
                    <circle cx="9.2" cy="9.8" r=".9" fill="currentColor" stroke="none" />
                    <circle cx="14.8" cy="9.8" r=".9" fill="currentColor" stroke="none" />
                  </svg>
                </button>
                <button type="button" className="send" aria-label="Send">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
                  </svg>
                </button>
              </div>
              <div className="composer-hint"><em>↵</em> send &nbsp;·&nbsp; <em>⇧↵</em> newline &nbsp;·&nbsp; typing broadcasts over ws</div>
            </div>
          </main>

          <aside className="info">
            <div className="info-scroll">
              <div className="room-card">
                <div className="room-mark">#</div>
                <div data-h="3">design-crit</div>
                <p>Weekly critiques, token changes and screenshots. Keep it kind, keep it specific.</p>
                <div className="room-stats">
                  <div><strong>12</strong><span>Members</span></div>
                  <div><strong>4</strong><span>Online</span></div>
                  <div><strong>1.2k</strong><span>Messages</span></div>
                </div>
              </div>

              <div data-h="4">Members <em>4 online</em></div>

              <div className="member">
                <div className="av" style={av("#C2704E")}>PR<span className="pres on" /></div>
                <div><div className="m-name">Priya Raman</div><div className="m-role">design lead</div></div>
              </div>
              <div className="member">
                <div className="av" style={av("#6E86B8")}>RS<span className="pres on" /></div>
                <div><div className="m-name">Ravi Shankar</div><div className="m-role">frontend</div></div>
              </div>
              <div className="member">
                <div className="av" style={av("#9A6E9E")}>MO<span className="pres on" /></div>
                <div><div className="m-name">Maya Okonkwo</div><div className="m-role">realtime</div></div>
              </div>
              <div className="member">
                <div className="av" style={av("#5E8C8A")}>AR<span className="pres on" /></div>
                <div><div className="m-name">You</div><div className="m-role">you</div></div>
              </div>
              <div className="member">
                <div className="av" style={av("#6F9E86")}>TB<span className="pres away" /></div>
                <div><div className="m-name">Tomas Berg</div><div className="m-role">away</div></div>
              </div>
              <div className="member">
                <div className="av" style={av("#C99A46")}>AF<span className="pres off" /></div>
                <div><div className="m-name">Ada Fernández</div><div className="m-role">offline</div></div>
              </div>

              <div data-h="4">Shared <em>3 files</em></div>
              <div className="file">
                <div className="fi">FIG</div>
                <div><div className="fn">tokens-v3.fig</div><div className="fs">4.2 MB · Priya</div></div>
              </div>
              <div className="file">
                <div className="fi">PNG</div>
                <div><div className="fn">bubble-radius.png</div><div className="fs">218 KB · Ravi</div></div>
              </div>
              <div className="file">
                <div className="fi">CSV</div>
                <div><div className="fn">ws-latency.csv</div><div className="fs">12 KB · Maya</div></div>
              </div>
            </div>

            <div className="socket">
              <div className="socket-top">
                <div className="l"><i />socket open</div>
                <div className="r">14 ms</div>
              </div>
              <svg className="spark" viewBox="0 0 240 34" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="rtc-spark" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E9A13B" stopOpacity=".28" />
                    <stop offset="100%" stopColor="#E9A13B" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,26 L18,22 L36,24 L54,14 L72,18 L90,9 L108,13 L126,6 L144,12 L162,8 L180,16 L198,10 L216,7 L240,11 L240,34 L0,34 Z" fill="url(#rtc-spark)" />
                <path d="M0,26 L18,22 L36,24 L54,14 L72,18 L90,9 L108,13 L126,6 L144,12 L162,8 L180,16 L198,10 L216,7 L240,11" fill="none" stroke="#E9A13B" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
              </svg>
              <div className="socket-bot">
                <span>ws://relay.local/ws</span>
                <span>8 clients</span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
