/** 1600×900 Relay chat — inbox search results. */

import { av, RelayWebChrome } from "@/components/capture/real-time-chat/web-chrome";

export function RealTimeChatWebSearchCapture() {
  const main = (
    <main className="chat search-main">
      <header className="chat-head">
        <div className="room-glyph search-glyph">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="M20.5 20.5 16.7 16.7" />
          </svg>
        </div>
        <div>
          <div className="chat-title">Search</div>
          <div className="chat-sub">4 results for &quot;presence reconnect&quot;</div>
        </div>
        <div className="grow" />
        <button type="button" className="icon-btn" aria-label="Clear search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </header>

      <div className="search-body">
        <div className="search-filters">
          <button type="button" className="chip on">
            Messages
          </button>
          <button type="button" className="chip">
            People
          </button>
          <button type="button" className="chip">
            Files
          </button>
        </div>

        <button type="button" className="search-hit">
          <div className="av" style={av("#9A6E9E")}>
            MO
          </div>
          <div className="search-hit-main">
            <div className="search-hit-top">
              <span className="search-hit-who">Maya Okonkwo</span>
              <span className="search-hit-where">#design-crit</span>
              <span className="search-hit-time">11:55</span>
            </div>
            <p>
              heads up — <mark>presence</mark> events are batching on <mark>reconnect</mark>.{" "}
              <code>ws.readyState === 1</code> fires late, so the green dots lag ~400ms.
            </p>
          </div>
        </button>

        <button type="button" className="search-hit">
          <div className="av room">#</div>
          <div className="search-hit-main">
            <div className="search-hit-top">
              <span className="search-hit-who">Frontend Guild</span>
              <span className="search-hit-where">group</span>
              <span className="search-hit-time">Tue</span>
            </div>
            <p>
              <b>Ravi:</b> shipping the <mark>presence</mark> fix after the <mark>reconnect</mark> handler lands.
            </p>
          </div>
        </button>

        <button type="button" className="search-hit">
          <div className="av" style={av("#9A6E9E")}>
            MO
          </div>
          <div className="search-hit-main">
            <div className="search-hit-top">
              <span className="search-hit-who">Maya Okonkwo</span>
              <span className="search-hit-where">DM</span>
              <span className="search-hit-time">11:58</span>
            </div>
            <p>ok — patch is up, <mark>reconnecting</mark> now</p>
          </div>
        </button>

        <button type="button" className="search-hit">
          <div className="av room">#</div>
          <div className="search-hit-main">
            <div className="search-hit-top">
              <span className="search-hit-who">#engineering</span>
              <span className="search-hit-where">room</span>
              <span className="search-hit-time">Tue</span>
            </div>
            <p>notes from the socket load test: clients that drop mid-handshake need a cleaner <mark>reconnect</mark> path.</p>
          </div>
        </button>
      </div>
    </main>
  );

  return (
    <div className="rtc-capture-root">
      <RelayWebChrome
        ariaLabel="Relay message search"
        activeConv="design-crit"
        searchQuery="presence reconnect"
        main={main}
      />
    </div>
  );
}
