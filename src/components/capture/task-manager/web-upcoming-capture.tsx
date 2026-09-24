/** 1600×900 Posy Upcoming week view for Mira. */

function CheckMark() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.4l3.2 3.2L13 4.8" />
    </svg>
  );
}

export function TaskManagerWebUpcomingCapture() {
  return (
    <div className="tm-capture-root">
      <section className="capture capture--web capture--upcoming" aria-label="Posy upcoming tasks">
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
            <button type="button" className="nav-item">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2.5v2M12 19.5v2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M2.5 12h2M19.5 12h2M5.2 18.8l1.4-1.4M17.4 6.6l1.4-1.4" />
              </svg>
              Today
              <span className="count">6</span>
            </button>
            <button type="button" className="nav-item active">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="16" rx="3.2" />
                <path d="M3.4 10h17.2M8.5 3v4M15.5 3v4" />
              </svg>
              Upcoming
              <span className="count">7</span>
            </button>
          </nav>

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
              <div data-h="1" className="greet">Upcoming <em>week</em></div>
              <p className="subline">10 March through 16 March · <b>7 tasks</b> scheduled</p>
            </div>
            <button type="button" className="btn-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              New task
            </button>
          </div>

          <div className="week-grid">
            <div className="week-col">
              <div className="week-day">Wed 10</div>
              <div className="task compact accent-lilac">
                <span className="check"><CheckMark /></span>
                <div className="task-main">
                  <div className="task-title">Prep book club notes</div>
                  <div className="task-meta"><span className="tag tag-lilac">Book club</span></div>
                </div>
              </div>
            </div>
            <div className="week-col">
              <div className="week-day">Thu 11</div>
              <div className="task compact accent-lilac">
                <span className="check"><CheckMark /></span>
                <div className="task-main">
                  <div className="task-title">Book dentist appointment</div>
                </div>
              </div>
            </div>
            <div className="week-col">
              <div className="week-day today-col">Tue 9</div>
              <div className="task compact accent-rose">
                <span className="check"><CheckMark /></span>
                <div className="task-main">
                  <div className="task-title">Draft March newsletter</div>
                  <div className="task-meta"><span className="tag tag-rose">Work</span></div>
                </div>
              </div>
            </div>
            <div className="week-col">
              <div className="week-day">Fri 12</div>
              <div className="task compact accent-sage">
                <span className="check"><CheckMark /></span>
                <div className="task-main">
                  <div className="task-title">Meal prep for the week</div>
                  <div className="task-meta"><span className="tag tag-sage">Home</span></div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <aside className="rail">
          <div className="card">
            <div className="card-head">
              <div className="card-title">March</div>
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
        </aside>
      </section>
    </div>
  );
}
