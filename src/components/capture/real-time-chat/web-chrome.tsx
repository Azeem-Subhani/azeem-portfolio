import type { CSSProperties, ReactNode } from "react";

export function av(hex: string): CSSProperties {
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

export type RelayConvId =
  | "design-crit"
  | "maya"
  | "ship-it"
  | "tomas"
  | "random"
  | "ada"
  | "engineering"
  | "frontend-guild";

type RelayWebChromeProps = {
  ariaLabel: string;
  activeConv: RelayConvId;
  searchQuery?: string;
  main: ReactNode;
  info?: ReactNode;
};

export function RelayWebChrome({
  ariaLabel,
  activeConv,
  searchQuery,
  main,
  info,
}: RelayWebChromeProps) {
  const convClass = (id: RelayConvId) => (activeConv === id ? "conv active" : "conv");

  return (
    <section className="capture capture--web" aria-label={ariaLabel}>
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

          <div className={`sb-search${searchQuery ? " sb-search--filled" : ""}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M20.5 20.5 16.7 16.7" />
            </svg>
            <span>{searchQuery ?? "Search messages, people…"}</span>
          </div>

          <div className="sb-filters">
            <button type="button" className="chip on">
              All
            </button>
            <button type="button" className="chip">
              Unread
            </button>
            <button type="button" className="chip">
              Rooms
            </button>
            <button type="button" className="chip">
              DMs
            </button>
          </div>

          <div className="sb-list">
            <div className="sb-sec">TODAY</div>

            <button type="button" className={convClass("design-crit")}>
              <div className="av room">#</div>
              <div className="conv-main">
                <div className="conv-name">
                  <span className="hash">#</span>design-crit
                </div>
                <div className="conv-prev">
                  <b>Priya:</b> the type scale feels off at 14px…
                </div>
              </div>
              <div className="conv-side">
                <div className="conv-time">12:04</div>
                <div className="badge">3</div>
              </div>
            </button>

            <button type="button" className={convClass("maya")}>
              <div className="av" style={av("#9A6E9E")}>
                MO<span className="pres on" />
              </div>
              <div className="conv-main">
                <div className="conv-name">Maya Okonkwo</div>
                <div className="conv-prev">ok — patch is up, reconnecting now</div>
              </div>
              <div className="conv-side">
                <div className="conv-time">11:58</div>
              </div>
            </button>

            <button type="button" className={convClass("ship-it")}>
              <div className="av room">#</div>
              <div className="conv-main">
                <div className="conv-name">
                  <span className="hash">#</span>ship-it
                </div>
                <div className="conv-prev">deploy 2.4.1 is live 🎉</div>
              </div>
              <div className="conv-side">
                <div className="conv-time">11:52</div>
                <div className="badge soft">1</div>
              </div>
            </button>

            <button type="button" className={convClass("tomas")}>
              <div className="av" style={av("#6F9E86")}>
                TB<span className="pres away" />
              </div>
              <div className="conv-main">
                <div className="conv-name">Tomas Berg</div>
                <div className="conv-prev">sounds good, I&apos;ll push the fix</div>
              </div>
              <div className="conv-side">
                <div className="conv-time">11:20</div>
              </div>
            </button>

            <button type="button" className={convClass("random")}>
              <div className="av room">#</div>
              <div className="conv-main">
                <div className="conv-name">
                  <span className="hash">#</span>random
                </div>
                <div className="conv-prev">
                  <b>Ravi:</b> bagels in the kitchen
                </div>
              </div>
              <div className="conv-side">
                <div className="conv-time">10:48</div>
              </div>
            </button>

            <button type="button" className={convClass("ada")}>
              <div className="av" style={av("#C99A46")}>
                AF<span className="pres off" />
              </div>
              <div className="conv-main">
                <div className="conv-name">Ada Fernández</div>
                <div className="conv-prev">◍ voice message · 0:24</div>
              </div>
              <div className="conv-side">
                <div className="conv-time">10:12</div>
              </div>
            </button>

            <div className="sb-sec">EARLIER</div>

            <button type="button" className={convClass("engineering")}>
              <div className="av room">#</div>
              <div className="conv-main">
                <div className="conv-name">
                  <span className="hash">#</span>engineering
                </div>
                <div className="conv-prev">k6 held 8k concurrent sockets</div>
              </div>
              <div className="conv-side">
                <div className="conv-time">Tue</div>
              </div>
            </button>

            <button type="button" className={convClass("frontend-guild")}>
              <div className="av" style={av("#6E86B8")}>
                FG
              </div>
              <div className="conv-main">
                <div className="conv-name">Frontend Guild</div>
                <div className="conv-prev">
                  <b>Ravi:</b> shipping the presence fix
                </div>
              </div>
              <div className="conv-side">
                <div className="conv-time">Tue</div>
                <div className="badge soft">5</div>
              </div>
            </button>
          </div>
        </aside>

        {main}

        {info ? <aside className="info">{info}</aside> : null}
      </div>
    </section>
  );
}

export function RelayLivePill() {
  return (
    <div className="live">
      <span className="pulse" />
      <span>socket open</span>
      <span className="dim">/</span>
      <span>14 ms</span>
      <span className="dim">/</span>
      <span>8 clients</span>
    </div>
  );
}

export function RelaySocketPanel() {
  return (
    <div className="socket">
      <div className="socket-top">
        <div className="l">
          <i />
          socket open
        </div>
        <div className="r">14 ms</div>
      </div>
      <svg className="spark" viewBox="0 0 240 34" preserveAspectRatio="none">
        <defs>
          <linearGradient id="rtc-spark-alt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E9A13B" stopOpacity=".28" />
            <stop offset="100%" stopColor="#E9A13B" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,26 L18,22 L36,24 L54,14 L72,18 L90,9 L108,13 L126,6 L144,12 L162,8 L180,16 L198,10 L216,7 L240,11 L240,34 L0,34 Z"
          fill="url(#rtc-spark-alt)"
        />
        <path
          d="M0,26 L18,22 L36,24 L54,14 L72,18 L90,9 L108,13 L126,6 L144,12 L162,8 L180,16 L198,10 L216,7 L240,11"
          fill="none"
          stroke="#E9A13B"
          strokeWidth="1.6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      <div className="socket-bot">
        <span>ws://relay.local/ws</span>
        <span>8 clients</span>
      </div>
    </div>
  );
}
