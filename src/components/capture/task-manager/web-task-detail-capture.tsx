/** 1600×900 Posy task detail — focused work item for Mira. */

function CheckMark() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.4l3.2 3.2L13 4.8" />
    </svg>
  );
}

export function TaskManagerWebTaskDetailCapture() {
  return (
    <div className="tm-capture-root">
      <section className="capture capture--web capture--detail" aria-label="Posy task detail">
        <aside className="sidebar sidebar--compact">
          <div className="brand">
            <div className="brand-mark" aria-hidden="true">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="2.6" />
                <path d="M12 9.4c0-2.6.7-4.6 2-4.6s2 2 4.6" />
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
          <button type="button" className="nav-item active">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2.5v2M12 19.5v2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M2.5 12h2M19.5 12h2M5.2 18.8l1.4-1.4M17.4 6.6l1.4-1.4" />
            </svg>
            Today
          </button>
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

        <main className="main main--detail">
          <div className="detail-top">
            <button type="button" className="ghost-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m14.5 5.5-6.5 6.5 6.5 6.5" />
              </svg>
              Back to Today
            </button>
            <div className="topbar-actions">
              <button type="button" className="icon-btn" aria-label="Share task">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
              </button>
              <button type="button" className="btn-primary">Save</button>
            </div>
          </div>

          <div className="detail-hero accent-rose">
            <span className="check done-lg"><CheckMark /></span>
            <div>
              <div data-h="1" className="detail-title">Rotate signing keys in staging</div>
              <div className="detail-meta">
                <span className="tag tag-rose">Work</span>
                <span className="time-chip hot">11:15 AM</span>
                <span className="meta-txt">Security</span>
              </div>
            </div>
          </div>

          <div className="detail-grid">
            <div className="detail-panel">
              <div data-h="2" className="panel-title">Notes</div>
              <p className="panel-copy">
                Roll JWT signing keys in staging before the client ships refresh handling. After the swap, log out stale sessions and confirm SendGrid verification still sends for new accounts.
              </p>
              <div data-h="2" className="panel-title">Subtasks</div>
              <ul className="subtask-list">
                <li className="subtask done">
                  <span className="check"><CheckMark /></span>
                  Export current public keys
                </li>
                <li className="subtask">
                  <span className="check"><CheckMark /></span>
                  Update Express auth middleware
                </li>
                <li className="subtask">
                  <span className="check"><CheckMark /></span>
                  Invalidate old refresh tokens
                </li>
              </ul>
            </div>

            <aside className="detail-rail">
              <div className="card">
                <div className="card-title">Focus</div>
                <div className="focus">
                  <div className="ring">
                    <svg width="82" height="82" viewBox="0 0 82 82">
                      <circle cx="41" cy="41" r="34" fill="none" stroke="#F6E7E4" strokeWidth="8" />
                      <circle cx="41" cy="41" r="34" fill="none" stroke="#E4698A" strokeWidth="8" strokeLinecap="round" strokeDasharray="213.6" strokeDashoffset="120" />
                    </svg>
                    <div className="ring-txt">25:00</div>
                  </div>
                  <div className="focus-info">
                    <div data-h="4">Deep work block</div>
                    <p>Round 1 · staging keys</p>
                    <button type="button" className="focus-btn">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z" /></svg>
                      Start
                    </button>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="acct">
                  <div className="avatar">MK</div>
                  <div>
                    <div className="acct-mail">mira@posy.app</div>
                    <div className="acct-note">JWT session · verified inbox</div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </section>
    </div>
  );
}
