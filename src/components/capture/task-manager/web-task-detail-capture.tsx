import { taskManagerFonts } from "@/components/capture/capture-fonts";
import {
  HandCheck,
  HandLine,
  Icon,
  ListTag,
  PosyBloom,
  ProgressStamp,
  TimeChip,
  VerifiedMark,
} from "@/components/capture/task-manager/task-manager-parts";

/** 1600×900 Posy task detail: "Rotate signing keys in staging", open and due at 11:15. */

// The day's list in time order, matching the Today screen.
const TIMELINE: { time: string; name: string; state: "done" | "now" | "open" }[] = [
  { time: "9:30", name: "Review PR #482", state: "done" },
  { time: "9:45", name: "SendGrid verification copy", state: "done" },
  { time: "11:15", name: "Rotate signing keys", state: "now" },
  { time: "1:00", name: "Birthday flowers for Mom", state: "open" },
  { time: "2:30", name: "SendGrid bounce report", state: "open" },
  { time: "5:30", name: "Grocery run", state: "open" },
];

export function TaskManagerWebTaskDetailCapture() {
  return (
    <div className={`tm-capture-root ${taskManagerFonts}`}>
      <section className="capture tm-screen tm-screen--detail" aria-label="Posy task detail">
        <aside className="tm-side tm-side--compact">
          <div className="tm-brand">
            <span className="tm-brand-mark" aria-hidden="true">
              <PosyBloom size={36} />
            </span>
            <div>
              <div className="tm-brand-name">Posy</div>
              <div className="tm-brand-sub">Task studio</div>
            </div>
          </div>

          <div className="tm-side-label">Workspace</div>
          <nav className="tm-nav" aria-label="Workspace">
            <button type="button" className="tm-nav-item tm-is-active">
              <Icon name="today" size={17} />
              Today
            </button>
          </nav>

          <div className="tm-user">
            <span className="tm-avatar">MK</span>
            <div>
              <div className="tm-user-name">Mira Kapoor</div>
              <div className="tm-user-verified">
                <span className="tm-verified-dot">
                  <VerifiedMark size={9} />
                </span>
                Email verified
              </div>
            </div>
          </div>
        </aside>

        <main className="tm-main tm-main--detail">
          <div className="tm-detail-top">
            <button type="button" className="tm-back">
              <Icon name="back" size={15} />
              Back to Today
            </button>
            <div className="tm-actions">
              <button type="button" className="tm-icon-btn" aria-label="Share task">
                <Icon name="share" size={17} />
              </button>
              <button type="button" className="tm-btn-ink">
                Save
              </button>
            </div>
          </div>

          <div className="tm-detail-body">
            <div className="tm-detail-main">
              <div className="tm-detail-chips">
                <ListTag list="work" />
                <TimeChip hot>11:15 AM</TimeChip>
                <span className="tm-meta">Security</span>
              </div>

              <div data-h="1" className="tm-detail-title">
                Rotate signing keys{" "}
                <span className="tm-hl">
                  in staging
                  <HandLine variant="under" className="tm-hl-line" />
                </span>
              </div>

              <section className="tm-panel">
                <div data-h="2" className="tm-panel-title">
                  Notes
                </div>
                <p className="tm-panel-copy">
                  Roll JWT signing keys in staging before the client ships refresh handling. After
                  the swap, log out stale sessions and confirm SendGrid verification still sends for
                  new accounts.
                </p>
              </section>

              <section className="tm-panel">
                <div className="tm-panel-head">
                  <div data-h="2" className="tm-panel-title">
                    Subtasks
                  </div>
                  <ProgressStamp done={1} total={3} size="sm" />
                </div>
                <ul className="tm-subtasks">
                  <li className="tm-subtask tm-is-done">
                    <span className="tm-check">
                      <HandCheck size={15} />
                    </span>
                    <span className="tm-title">
                      Export current public keys
                      <HandLine variant="strike" className="tm-strike" />
                    </span>
                  </li>
                  <li className="tm-subtask">
                    <span className="tm-check">
                      <HandCheck size={15} />
                    </span>
                    <span className="tm-title">Update Express auth middleware</span>
                  </li>
                  <li className="tm-subtask">
                    <span className="tm-check">
                      <HandCheck size={15} />
                    </span>
                    <span className="tm-title">Invalidate old refresh tokens</span>
                  </li>
                </ul>
              </section>
            </div>

            <aside className="tm-detail-rail">
              <section className="tm-card tm-card--ink tm-focus-card">
                <div data-h="2" className="tm-focus-title">
                  Deep work block
                </div>
                <div className="tm-focus tm-focus--detail">
                  <div className="tm-ring tm-ring--lg">
                    <svg width="120" height="120" viewBox="0 0 96 96" aria-hidden="true">
                      <circle className="tm-ring-track" cx="48" cy="48" r="40" strokeWidth="8" />
                      <circle
                        className="tm-ring-arc"
                        cx="48"
                        cy="48"
                        r="40"
                        strokeWidth="8"
                        strokeDasharray="0 251.4"
                        transform="rotate(-90 48 48)"
                      />
                    </svg>
                    <div className="tm-ring-txt">25:00</div>
                  </div>
                  <div>
                    <p className="tm-focus-copy">Round 1, staging keys</p>
                    <button type="button" className="tm-focus-btn">
                      <Icon name="play" size={12} />
                      Start
                    </button>
                  </div>
                </div>
              </section>

              <section className="tm-card tm-timeline-card">
                <header className="tm-card-head">
                  <div className="tm-card-title">Today</div>
                  <div className="tm-card-note">6 tasks</div>
                </header>
                <div className="tm-timeline">
                  <span className="tm-timeline-rail" aria-hidden="true" />
                  <ol className="tm-timeline-list">
                    {TIMELINE.map((item) => (
                      <li key={item.time} className={`tm-tl tm-is-${item.state}`}>
                        <span className="tm-tl-time">{item.time}</span>
                        <span className="tm-tl-dot" aria-hidden="true" />
                        <span className="tm-tl-name">{item.name}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>

              <section className="tm-card">
                <div className="tm-acct">
                  <span className="tm-avatar tm-avatar--sm">MK</span>
                  <div>
                    <div className="tm-acct-mail">mira@posy.app</div>
                    <div className="tm-acct-note">JWT session, verified inbox</div>
                    <span className="tm-pill-ok">
                      <VerifiedMark size={9} />
                      Verified
                    </span>
                  </div>
                </div>
              </section>
            </aside>
          </div>
        </main>
      </section>
    </div>
  );
}
