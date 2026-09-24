/** 900×1600 Posy mobile — Mira's Today list and task detail. */

function CheckMark() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.4l3.2 3.2L13 4.8" />
    </svg>
  );
}

function PosyMark({ size = 32 }: { size?: number }) {
  return (
    <div className="p-brand-mark" style={{ width: size, height: size, borderRadius: size * 0.34 }}>
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2.6" />
        <path d="M12 9.4c0-2.6.7-4.6 2-4.6s2 2 2 4.6" />
        <path d="M12 14.6c0 2.6-.7 4.6-2 4.6s-2-2-2-4.6" />
        <path d="M9.4 12c-2.6 0-4.6-.7-4.6-2s2-2 4.6-2" />
        <path d="M14.6 12c2.6 0 4.6.7 4.6 2s-2 2-4.6 2" />
      </svg>
    </div>
  );
}

function PhoneTabBar({ active }: { active: "today" | "upcoming" | "lists" | "profile" }) {
  const tabs = [
    { id: "today" as const, label: "Today" },
    { id: "upcoming" as const, label: "Upcoming" },
    { id: "lists" as const, label: "Lists" },
    { id: "profile" as const, label: "Profile" },
  ];

  return (
    <nav className="p-tabbar" aria-label="Main">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={tab.id === active ? "on" : undefined}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

export function TaskManagerPhoneCapture() {
  return (
    <div className="tm-capture-root">
      <section className="capture capture--phone" aria-label="Posy Today on phone">
        <div className="p-inner">
        <header className="p-head">
          <div className="p-head-row">
            <PosyMark />
            <div className="p-head-copy">
              <div className="p-eyebrow">Posy</div>
              <div data-h="1" className="p-title">
                Good morning, <em>Mira</em>
              </div>
            </div>
            <div className="avatar p-avatar">MK</div>
          </div>
          <p className="p-sub">Tuesday, 9 March · 6 tasks left today</p>
        </header>

        <div className="p-body">
          <div className="p-progress">
            <div className="p-progress-top">
              <span className="p-progress-label">Today&apos;s progress</span>
              <span className="p-progress-num">
                <em>5</em> of 12
              </span>
            </div>
            <div className="p-segments">
              <i className="on" /><i className="on" /><i className="on" /><i className="on" /><i className="on" />
              <i /><i /><i /><i /><i /><i /><i />
            </div>
          </div>

          <div className="p-section-head">
            <div data-h="2">Today</div>
            <span className="pill-count">6</span>
          </div>

          <div className="p-task-list">
            <div className="p-task done accent-rose">
              <span className="check"><CheckMark /></span>
              <div className="p-task-main">
                <div className="p-task-title">Review PR #482 — JWT refresh middleware</div>
                <div className="p-task-meta">
                  <span className="tag tag-rose">Work</span>
                  <span className="meta-txt">9:30 AM</span>
                </div>
              </div>
            </div>

            <div className="p-task accent-rose">
              <span className="check"><CheckMark /></span>
              <div className="p-task-main">
                <div className="p-task-title">Rotate signing keys in staging</div>
                <div className="p-task-meta">
                  <span className="tag tag-rose">Work</span>
                  <span className="meta-txt hot">11:15 AM</span>
                </div>
              </div>
            </div>

            <div className="p-task accent-lilac">
              <span className="check"><CheckMark /></span>
              <div className="p-task-main">
                <div className="p-task-title">Order birthday flowers for Mom</div>
                <div className="p-task-meta">
                  <span className="tag tag-lilac">Personal</span>
                  <span className="meta-txt">1:00 PM</span>
                </div>
              </div>
            </div>

            <div className="p-task accent-sage">
              <span className="check"><CheckMark /></span>
              <div className="p-task-main">
                <div className="p-task-title">Grocery run — oat milk, peaches</div>
                <div className="p-task-meta">
                  <span className="tag tag-sage">Home</span>
                  <span className="meta-txt">5:30 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <PhoneTabBar active="today" />
        </div>
      </section>
    </div>
  );
}

export function TaskManagerPhoneDetailCapture() {
  return (
    <div className="tm-capture-root">
      <section className="capture capture--phone" aria-label="Posy task detail on phone">
        <div className="p-inner">
        <header className="p-head p-head--detail">
          <button type="button" className="p-back" aria-label="Back to Today">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m14.5 5.5-6.5 6.5 6.5 6.5" />
            </svg>
          </button>
          <div className="p-head-copy">
            <div className="p-eyebrow">Work · Today</div>
            <div data-h="1" className="p-title p-title--task">Rotate signing keys in staging</div>
          </div>
        </header>

        <div className="p-body">
          <div className="p-detail-chips">
            <span className="time-chip hot">11:15 AM</span>
            <span className="tag tag-rose">Work</span>
            <span className="verified-pill">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6.5 9.4 17.1 4 11.7" />
              </svg>
              Session active
            </span>
          </div>

          <div className="p-card-block">
            <div className="p-card-label">Notes</div>
            <p className="p-card-body">
              Roll JWT signing keys in staging before the client ships refresh handling. Log out stale sessions after the swap.
            </p>
          </div>

          <div className="p-card-block">
            <div className="p-card-label">Subtasks</div>
            <ul className="p-subtasks">
              <li className="done">
                <span className="check"><CheckMark /></span>
                Export current public keys
              </li>
              <li>
                <span className="check"><CheckMark /></span>
                Update Express auth middleware
              </li>
              <li>
                <span className="check"><CheckMark /></span>
                Invalidate old refresh tokens
              </li>
            </ul>
          </div>

          <button type="button" className="p-focus-btn">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 4.5v15l13-7.5z" />
            </svg>
            Start focus session
          </button>
        </div>

        <PhoneTabBar active="today" />
        </div>
      </section>
    </div>
  );
}
