/** 1600×900 Relay chat — #ship-it release thread. */

import { av, RelayLivePill, RelaySocketPanel, RelayWebChrome } from "@/components/capture/real-time-chat/web-chrome";

export function RealTimeChatWebShipItCapture() {
  const info = (
    <>
      <div className="info-scroll">
        <div className="room-card">
          <div className="room-mark">#</div>
          <h3>ship-it</h3>
          <p>Release coordination, deploy notes, and rollback threads. Keep alerts concise.</p>
          <div className="room-stats">
            <div>
              <strong>18</strong>
              <span>Members</span>
            </div>
            <div>
              <strong>6</strong>
              <span>Online</span>
            </div>
            <div>
              <strong>842</strong>
              <span>Messages</span>
            </div>
          </div>
        </div>

        <h4>
          Members <em>6 online</em>
        </h4>
        <div className="member">
          <div className="av" style={av("#6E86B8")}>
            RS<span className="pres on" />
          </div>
          <div>
            <div className="m-name">Ravi Shankar</div>
            <div className="m-role">release captain</div>
          </div>
        </div>
        <div className="member">
          <div className="av" style={av("#9A6E9E")}>
            MO<span className="pres on" />
          </div>
          <div>
            <div className="m-name">Maya Okonkwo</div>
            <div className="m-role">realtime</div>
          </div>
        </div>
        <div className="member">
          <div className="av" style={av("#5E8C8A")}>
            AR<span className="pres on" />
          </div>
          <div>
            <div className="m-name">You</div>
            <div className="m-role">you</div>
          </div>
        </div>
      </div>
      <RelaySocketPanel />
    </>
  );

  const main = (
    <main className="chat">
      <header className="chat-head">
        <div className="room-glyph">#</div>
        <div>
          <div className="chat-title">ship-it</div>
          <div className="chat-sub">
            <i />6 online · 18 members · 842 messages
          </div>
        </div>
        <div className="grow" />
        <RelayLivePill />
        <button type="button" className="icon-btn" aria-label="Search thread">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="M20.5 20.5 16.7 16.7" />
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
        <div className="daymark">
          <span>Today</span>
        </div>

        <div className="group">
          <div className="g-av" style={av("#6E86B8")}>
            RS
          </div>
          <div className="g-main">
            <div className="g-head">
              <div className="g-name">Ravi Shankar</div>
              <div className="g-time">11:38</div>
            </div>
            <div className="bubble">tagged v2.4.1 on main. changelog is in the release branch if anyone wants a skim before we flip traffic.</div>
          </div>
        </div>

        <div className="group">
          <div className="g-av" style={av("#9A6E9E")}>
            MO
          </div>
          <div className="g-main">
            <div className="g-head">
              <div className="g-name">Maya Okonkwo</div>
              <div className="g-time">11:44</div>
            </div>
            <div className="bubble">ws gateway is warm on both nodes. reconnect storm test looked clean on staging.</div>
            <div className="bubble">rolling deploy now. I will post when every client socket has migrated.</div>
          </div>
        </div>

        <div className="group own">
          <div className="g-main">
            <div className="g-head">
              <div className="g-name">You</div>
              <div className="g-time">11:49</div>
            </div>
            <div className="bubble own">watching the client count in the sidebar panel. broadcast fan-out still looks steady.</div>
          </div>
        </div>

        <div className="group">
          <div className="g-av" style={av("#6F9E86")}>
            TB
          </div>
          <div className="g-main">
            <div className="g-head">
              <div className="g-name">Tomas Berg</div>
              <div className="g-time">11:52</div>
            </div>
            <div className="bubble">deploy 2.4.1 is live 🎉</div>
            <div className="reactions">
              <span className="react">
                🎉 <b>4</b>
              </span>
              <span className="react mine">
                ✅ <b>2</b>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="composer">
        <div className="composer-in">
          <button type="button" className="plus" aria-label="Attach">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
          <div className="field">
            Message <b>#ship-it</b>
          </div>
          <button type="button" className="send" aria-label="Send">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
            </svg>
          </button>
        </div>
        <div className="composer-hint">
          <em>↵</em> send &nbsp;·&nbsp; <em>⇧↵</em> newline &nbsp;·&nbsp; typing broadcasts over ws
        </div>
      </div>
    </main>
  );

  return (
    <div className="rtc-capture-root">
      <RelayWebChrome ariaLabel="Relay ship-it release thread" activeConv="ship-it" main={main} info={info} />
    </div>
  );
}
