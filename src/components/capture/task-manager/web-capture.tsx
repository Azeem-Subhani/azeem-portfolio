/** 1600×900 Posy task studio — Mira's Today list. */

function CheckMark() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.4l3.2 3.2L13 4.8" />
    </svg>
  );
}

export function TaskManagerWebCapture() {
  return (
    <div className="tm-capture-root">
      <section className="capture capture--web" aria-label="Posy task studio">
        <aside className="sidebar">
          <div className="brand">
            <div className="brand-mark" aria-hidden="true">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="2.6" />
                <path d="M12 9.4c0-2.6.7-4.6 2-4.6s2 2 2 4.6" />
                <path d="M12 14.6c0 2.6-.7 4.6-2 4.6s-2-2-2-4.6" />
                <path d="M9.4 12c-2.6 0-4.6-.7-4.6-2s2-2 4.6-2" />
                <path d="M14.6 12c2.6 0 4.6.7 4.6 2s-2 2-4.6 2" />
              </svg>
            </div>
            <div>
              <div className="brand-name">Posy</div>
              <div className="brand-sub">task studio</div>
            </div>
          </div>

          <div className="nav-label">Workspace</div>
          <nav className="nav" aria-label="Workspace">
            <button type="button" className="nav-item active">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2.5v2M12 19.5v2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M2.5 12h2M19.5 12h2M5.2 18.8l1.4-1.4M17.4 6.6l1.4-1.4" />
              </svg>
              Today
              <span className="count">6</span>
            </button>
            <button type="button" className="nav-item">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="16" rx="3.2" />
                <path d="M3.4 10h17.2M8.5 3v4M15.5 3v4" />
              </svg>
              Upcoming
              <span className="count">7</span>
            </button>
            <button type="button" className="nav-item">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 8.5 12 4l8 4.5v9L12 22l-8-4.5z" />
                <path d="M4 8.5 12 13l8-4.5M12 13v9" />
              </svg>
              Someday
              <span className="count">14</span>
            </button>
            <button type="button" className="nav-item">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="8.6" />
                <path d="M8.4 12.2l2.5 2.5 4.7-5" />
              </svg>
              Completed
            </button>
          </nav>

          <div className="divider" />

          <div className="nav-label">My lists</div>
          <div className="nav">
            <button type="button" className="list-item"><span className="dot" style={{ background: "#F19CB2" }} />Work<span className="count">9</span></button>
            <button type="button" className="list-item"><span className="dot" style={{ background: "#A9CFA6" }} />Home<span className="count">4</span></button>
            <button type="button" className="list-item"><span className="dot" style={{ background: "#C0A9E4" }} />Personal<span className="count">5</span></button>
            <button type="button" className="list-item"><span className="dot" style={{ background: "#EFC978" }} />Book club<span className="count">2</span></button>
          </div>

          <div className="user-card">
            <div className="avatar">MK</div>
            <div>
              <div className="user-name">Mira Kapoor</div>
              <div className="user-verified">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6.5 9.4 17.1 4 11.7" />
                </svg>
                Email verified
              </div>
            </div>
          </div>
        </aside>

        <main className="main">
          <div className="topbar">
            <div>
              <h1 className="greet">Good morning, <em>Mira</em></h1>
              <p className="subline">Tuesday, 9 March · <b>12 tasks</b> on your plate today</p>
            </div>
            <div className="topbar-actions">
              <div className="search">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.6-3.6" />
                </svg>
                Search tasks…
                <kbd>⌘K</kbd>
              </div>
              <button type="button" className="icon-btn" aria-label="Notifications">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8.5a6 6 0 1 0-12 0c0 6-2.2 7.5-2.2 7.5h16.4S18 14.5 18 8.5" />
                  <path d="M10.2 19.5a2 2 0 0 0 3.6 0" />
                </svg>
                <span className="pip" />
              </button>
              <button type="button" className="btn-primary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                New task
              </button>
            </div>
          </div>

          <div className="progress-card">
            <div>
              <div className="pc-label">Today&apos;s progress</div>
              <div className="pc-num"><span>5</span> of 12 <small>done</small></div>
              <div className="segments">
                <i className="on" /><i className="on" /><i className="on" /><i className="on" /><i className="on" />
                <i /><i /><i /><i /><i /><i /><i />
              </div>
            </div>
            <div className="pc-right">
              <div className="pc-stats">
                <div><b>7 tasks</b> left</div>
                <div><b>2</b> due before noon</div>
              </div>
              <div className="sticker">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3s5 4.2 5 8.6A5 5 0 0 1 7 11.6C7 7.2 12 3 12 3z" />
                </svg>
                4-day streak
              </div>
            </div>
          </div>

          <div className="section-head">
            <h2>Today</h2>
            <span className="pill-count">6</span>
            <div className="spacer" />
            <button type="button" className="ghost-btn">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 6h16M7 12h10M10 18h4" />
              </svg>
              Sort by time
            </button>
          </div>

          <div className="task-list">
            <div className="task done accent-rose">
              <span className="check"><CheckMark /></span>
              <div className="task-main">
                <div className="task-title">Review PR #482 — JWT refresh middleware</div>
                <div className="task-meta">
                  <span className="tag tag-rose">Work</span>
                  <span className="meta-txt">2 subtasks</span>
                </div>
              </div>
              <span className="time-chip">9:30 AM</span>
            </div>

            <div className="task done accent-rose">
              <span className="check"><CheckMark /></span>
              <div className="task-main">
                <div className="task-title">Write SendGrid verification email copy</div>
                <div className="task-meta">
                  <span className="tag tag-rose">Work</span>
                  <span className="meta-txt">Auth flow</span>
                </div>
              </div>
              <span className="time-chip">9:45 AM</span>
            </div>

            <div className="task accent-rose">
              <span className="check"><CheckMark /></span>
              <div className="task-main">
                <div className="task-title">Rotate signing keys in staging</div>
                <div className="task-meta">
                  <span className="tag tag-rose">Work</span>
                  <span className="meta-txt">Security</span>
                </div>
              </div>
              <span className="time-chip hot">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 21V4" />
                  <path d="M5 4h11l-2.2 3.5L16 11H5" />
                </svg>
                11:15 AM
              </span>
            </div>

            <div className="task accent-lilac">
              <span className="check"><CheckMark /></span>
              <div className="task-main">
                <div className="task-title">Order birthday flowers for Mom</div>
                <div className="task-meta">
                  <span className="tag tag-lilac">Personal</span>
                  <span className="meta-txt">Peonies + a note</span>
                </div>
              </div>
              <span className="time-chip">1:00 PM</span>
            </div>

            <div className="task accent-sage">
              <span className="check"><CheckMark /></span>
              <div className="task-main">
                <div className="task-title">Grocery run — oat milk, peaches, sourdough</div>
                <div className="task-meta">
                  <span className="tag tag-sage">Home</span>
                  <span className="meta-txt">Shared with Dev</span>
                </div>
              </div>
              <span className="time-chip">5:30 PM</span>
            </div>
          </div>

          <div className="later">
            <div className="section-head">
              <h2>Later this week</h2>
              <span className="pill-count">2</span>
              <div className="spacer" />
            </div>
            <div className="task-list">
              <div className="task compact accent-lilac">
                <span className="check"><CheckMark /></span>
                <div className="task-main">
                  <div className="task-title">Book dentist appointment</div>
                </div>
                <span className="time-chip">Thu</span>
              </div>
              <div className="task compact accent-rose">
                <span className="check"><CheckMark /></span>
                <div className="task-main">
                  <div className="task-title">Draft the March newsletter</div>
                </div>
                <span className="time-chip">Fri</span>
              </div>
            </div>
          </div>
        </main>

        <aside className="rail">
          <div className="card">
            <div className="card-head">
              <div className="card-title">March</div>
              <div className="cal-nav">
                <button type="button" aria-label="Previous month">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6" /></svg>
                </button>
                <button type="button" aria-label="Next month">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
                </button>
              </div>
            </div>
            <div className="cal-grid">
              <div className="cal-wd">M</div><div className="cal-wd">T</div><div className="cal-wd">W</div>
              <div className="cal-wd">T</div><div className="cal-wd">F</div><div className="cal-wd">S</div>
              <div className="cal-wd">S</div>
              <div className="cal-d mute">1</div>
              <div className="cal-d">2</div>
              <div className="cal-d">3</div>
              <div className="cal-d">4</div>
              <div className="cal-d"><i />5</div>
              <div className="cal-d">6</div>
              <div className="cal-d">7</div>
              <div className="cal-d">8</div>
              <div className="cal-d today"><i />9</div>
              <div className="cal-d">10</div>
              <div className="cal-d">11</div>
              <div className="cal-d"><i />12</div>
              <div className="cal-d">13</div>
              <div className="cal-d">14</div>
              <div className="cal-d">15</div>
              <div className="cal-d">16</div>
              <div className="cal-d">17</div>
              <div className="cal-d">18</div>
              <div className="cal-d"><i />19</div>
              <div className="cal-d">20</div>
              <div className="cal-d">21</div>
              <div className="cal-d">22</div>
              <div className="cal-d">23</div>
              <div className="cal-d">24</div>
              <div className="cal-d">25</div>
              <div className="cal-d"><i />26</div>
              <div className="cal-d">27</div>
              <div className="cal-d">28</div>
              <div className="cal-d">29</div>
              <div className="cal-d">30</div>
              <div className="cal-d">31</div>
              <div className="cal-d" /><div className="cal-d" /><div className="cal-d" /><div className="cal-d" />
            </div>
          </div>

          <div className="card">
            <div className="card-head">
              <div className="card-title">This week</div>
              <div className="card-sub">23 done</div>
            </div>
            <div className="bars">
              <div className="bar-col"><div className="bar filled" style={{ height: "52%" }} /><div className="bar-lb">M</div></div>
              <div className="bar-col"><div className="bar today" style={{ height: "82%" }} /><div className="bar-lb today">T</div></div>
              <div className="bar-col"><div className="bar filled" style={{ height: "34%" }} /><div className="bar-lb">W</div></div>
              <div className="bar-col"><div className="bar filled" style={{ height: "66%" }} /><div className="bar-lb">T</div></div>
              <div className="bar-col"><div className="bar filled" style={{ height: "74%" }} /><div className="bar-lb">F</div></div>
              <div className="bar-col"><div className="bar" style={{ height: "24%" }} /><div className="bar-lb">S</div></div>
              <div className="bar-col"><div className="bar" style={{ height: "16%" }} /><div className="bar-lb">S</div></div>
            </div>
          </div>

          <div className="card">
            <div className="focus">
              <div className="ring">
                <svg width="82" height="82" viewBox="0 0 82 82">
                  <circle cx="41" cy="41" r="34" fill="none" stroke="#F6E7E4" strokeWidth="8" />
                  <circle cx="41" cy="41" r="34" fill="none" stroke="#E4698A" strokeWidth="8" strokeLinecap="round" strokeDasharray="213.6" strokeDashoffset="82" />
                </svg>
                <div className="ring-txt">24:18</div>
              </div>
              <div className="focus-info">
                <h4>Focus session</h4>
                <p>Deep work · round 3 of 4</p>
                <button type="button" className="focus-btn">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z" /></svg>
                  Pause
                </button>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="acct">
              <div className="avatar">MK</div>
              <div>
                <div className="acct-mail">mira@posy.app</div>
                <div className="acct-note">Session active · renews in 6 days</div>
                <div className="verified-pill">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6.5 9.4 17.1 4 11.7" />
                  </svg>
                  Verified
                </div>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
