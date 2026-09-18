/** 900×1600 Oxym team chat — ported from deepseek_html_20260911_c7333f.html */
export function OxymPhoneCapture() {
  return (
    <div className="oxym-capture-root">
      <section className="capture capture--phone" aria-label="Oxym phone app">
        <div className="p-inner">
        <header className="p-head">
          <button type="button" className="icon-btn" aria-label="Back">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m14.5 5.5-6.5 6.5 6.5 6.5" />
            </svg>
          </button>

          <div className="p-title">
            <h1>First Team</h1>
            <p>22 members, 4 online</p>
          </div>

          <button type="button" className="icon-btn" aria-label="Team settings">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="5.5" cy="12" r="1.4" fill="currentColor" stroke="none" />
              <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
              <circle cx="18.5" cy="12" r="1.4" fill="currentColor" stroke="none" />
            </svg>
          </button>
        </header>

        <div className="p-body">
          <article className="match-card">
            <div className="match-top">
              <span className="tag-away">Away</span>
              <span className="match-date">Sat 14 Mar</span>
            </div>

            <div className="match-teams">
              <span className="crest crest--p crest--away">HR</span>
              <div className="match-name">
                <p>Harbour Rovers</p>
                <span>15:00, Dockside Park</span>
              </div>
            </div>

            <div className="match-rsvp">
              <div className="avatars avatars--p">
                <span className="av av--a">DW</span>
                <span className="av av--b">TB</span>
                <span className="av av--c">PR</span>
                <span className="av av--d">MC</span>
              </div>
              <span className="label">18 of 22 going</span>
              <button type="button" className="btn-rsvp">
                Reply
              </button>
            </div>
          </article>

          <div className="thread">
            <div className="msg">
              <span className="av--p av--a">DW</span>
              <div className="msg-body">
                <p className="msg-meta">
                  <span className="msg-name">Dana Whitfield</span>
                  <span className="msg-time">18:42</span>
                </p>
                <p className="msg-text">Pitch inspection passed, we&apos;re on the far pitch. Bring both kits.</p>
              </div>
            </div>

            <div className="msg msg--out">
              <div className="msg-body">
                <span className="bubble">Noted. Lineup goes out before 8.</span>
                <p className="msg-receipt">Read by 19</p>
              </div>
            </div>

            <div className="msg msg--out">
              <div className="msg-body">
                <div className="attach">
                  <div className="attach-top">
                    <span className="attach-label">Invoice</span>
                    <span className="attach-amount">£45.00</span>
                  </div>
                  <p className="attach-title">March subs, First Team</p>
                  <div className="attach-foot">
                    <span>Due 20 Mar</span>
                    <button type="button" className="btn-pay">
                      Pay now
                    </button>
                  </div>
                </div>
                <p className="msg-receipt">Read by 12</p>
              </div>
            </div>

            <div className="msg">
              <span className="av--p av--b">TB</span>
              <div className="msg-body">
                <p className="msg-meta">
                  <span className="msg-name">Tomas Berg</span>
                  <span className="msg-time">18:47</span>
                </p>
                <p className="msg-text">Who&apos;s driving from the north side? I&apos;ve got two seats.</p>
                <div className="reactions">
                  <span className="reaction">
                    <b>3</b> going
                  </span>
                  <span className="reaction">
                    <b>2</b> seats left
                  </span>
                </div>
              </div>
            </div>

            <div className="sys">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="m8 12.4 2.8 2.8L16 9.6" />
              </svg>
              <span>Pre-game email sent to 22 players</span>
              <span className="sys-time">19:02</span>
            </div>

            <div className="msg">
              <span className="av--p av--c">PR</span>
              <div className="msg-body">
                <p className="msg-meta">
                  <span className="msg-name">Priya Raman</span>
                  <span className="msg-time">19:05</span>
                </p>
                <p className="msg-text">Paid. See you Saturday.</p>
              </div>
            </div>
          </div>
        </div>

        <footer className="composer">
          <button type="button" className="icon-btn" aria-label="Add attachment">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 5.5v13M5.5 12h13" />
            </svg>
          </button>
          <span className="composer-field">Message First Team</span>
          <button type="button" className="send-btn" aria-label="Send message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4.5 12.2 19.5 5 12.6 19.8l-1.6-6.2z" />
            </svg>
          </button>
        </footer>
        </div>
      </section>
    </div>
  );
}
