import { taskManagerFonts } from "@/components/capture/capture-fonts";
import {
  HandCheck,
  HandLine,
  Icon,
  ListTag,
  MarchCalendar,
  PosyBloom,
  ProgressStamp,
  TimeChip,
  VerifiedMark,
  type ListName,
} from "@/components/capture/task-manager/task-manager-parts";

/** 1600×900 Posy studio, Today: six tasks for Tuesday 9 March, two already done. */

type Task = {
  title: string;
  list: ListName;
  meta: string;
  time: string;
  done?: boolean;
  hot?: boolean;
};

// Matches the Today count in the sidebar, the progress stamp, and the phone capture.
const TODAY: Task[] = [
  { title: "Review PR #482: JWT refresh middleware", list: "work", meta: "2 subtasks", time: "9:30 AM", done: true },
  { title: "Write SendGrid verification email copy", list: "work", meta: "Auth flow", time: "9:45 AM", done: true },
  { title: "Rotate signing keys in staging", list: "work", meta: "Security", time: "11:15 AM", hot: true },
  { title: "Order birthday flowers for Mom", list: "personal", meta: "Peonies and a note", time: "1:00 PM" },
  { title: "Check the SendGrid bounce report", list: "work", meta: "Email", time: "2:30 PM" },
  { title: "Grocery run: oat milk, peaches, sourdough", list: "home", meta: "Shared with Dev", time: "5:30 PM" },
];

// The same two tasks open the Thursday and Friday rows on the upcoming screen.
const LATER: { title: string; day: string; tone: "butter" | "mint" }[] = [
  { title: "Book dentist appointment", day: "Thu 11", tone: "butter" },
  { title: "Draft the March newsletter", day: "Fri 12", tone: "mint" },
];

// Tasks per day this week, Monday to Sunday. Finished work is solid (cobalt for past days,
// tomato for today); work still planned is butter. Today has six tasks: two done, four open.
// The planned counts match the Wednesday to Sunday rows on the upcoming screen.
const WEEK_BARS: { label: string; done: number; planned: number; today?: boolean }[] = [
  { label: "Mon", done: 5, planned: 0 },
  { label: "Today", done: 2, planned: 4, today: true },
  { label: "Wed", done: 0, planned: 1 },
  { label: "Thu", done: 0, planned: 1 },
  { label: "Fri", done: 0, planned: 2 },
  { label: "Sat", done: 0, planned: 1 },
  { label: "Sun", done: 0, planned: 0 },
];

// Track length per task, in design pixels. Kept short enough that the longest row ends left of
// the phone that overlaps the rail on the case study stage.
const BAR_UNIT = 11;

export function TaskManagerWebCapture() {
  return (
    <div className={`tm-capture-root ${taskManagerFonts}`}>
      <section className="capture tm-screen tm-screen--today" aria-label="Posy task studio">
        <aside className="tm-side">
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
              <span className="tm-nav-count">6</span>
            </button>
            <button type="button" className="tm-nav-item">
              <Icon name="upcoming" size={17} />
              Upcoming
              <span className="tm-nav-count">7</span>
            </button>
            <button type="button" className="tm-nav-item">
              <Icon name="someday" size={17} />
              Someday
              <span className="tm-nav-count">14</span>
            </button>
            <button type="button" className="tm-nav-item">
              <Icon name="completed" size={17} />
              Completed
            </button>
          </nav>

          <div className="tm-side-rule" />

          <div className="tm-side-label">My lists</div>
          <div className="tm-nav">
            <button type="button" className="tm-list-item">
              <span className="tm-dot tm-dot--work" />
              Work
              <span className="tm-nav-count">9</span>
            </button>
            <button type="button" className="tm-list-item">
              <span className="tm-dot tm-dot--home" />
              Home
              <span className="tm-nav-count">4</span>
            </button>
            <button type="button" className="tm-list-item">
              <span className="tm-dot tm-dot--personal" />
              Personal
              <span className="tm-nav-count">5</span>
            </button>
            <button type="button" className="tm-list-item">
              <span className="tm-dot tm-dot--book" />
              Book club
              <span className="tm-nav-count">2</span>
            </button>
          </div>

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

        <main className="tm-main">
          <header className="tm-topbar">
            <div>
              <div data-h="1" className="tm-greet">
                Good morning, <span className="tm-hl">Mira<HandLine variant="under" className="tm-hl-line" /></span>
              </div>
              <p className="tm-subline">Six tasks on today&apos;s list, two already done.</p>
            </div>
            <div className="tm-actions">
              <div className="tm-search">
                <Icon name="search" size={15} />
                Search tasks
                <kbd>⌘K</kbd>
              </div>
              <button type="button" className="tm-icon-btn" aria-label="Notifications">
                <Icon name="bell" size={17} />
                <span className="tm-pip" />
              </button>
              <button type="button" className="tm-btn-ink">
                <Icon name="plus" size={15} />
                New task
              </button>
            </div>
          </header>

          <section className="tm-hero" aria-label="Today at a glance">
            <div className="tm-numeral" aria-hidden="true">
              <span className="tm-numeral-under">9</span>
              <span className="tm-numeral-over">9</span>
            </div>
            <div className="tm-date">
              <div className="tm-date-day">Tuesday</div>
              <div className="tm-date-month">March</div>
              <ul className="tm-stats">
                <li>
                  <b>4</b> tasks left
                </li>
                <li>
                  <b>1</b> due before noon
                </li>
                <li className="tm-sticker">4-day streak</li>
              </ul>
            </div>
            <div className="tm-hero-end">
              <ProgressStamp done={2} total={6} />
            </div>
          </section>

          <div className="tm-section">
            <div data-h="2" className="tm-section-title">
              Today
            </div>
            <span className="tm-count">6</span>
            <span className="tm-section-spacer" />
            <button type="button" className="tm-link-btn">
              <Icon name="sort" size={14} />
              Sort by time
            </button>
          </div>

          <div className="tm-slips">
            {TODAY.map((task, index) => (
              <div
                key={task.title}
                className={[
                  "tm-slip",
                  index % 2 === 0 ? "tm-tilt-a" : "tm-tilt-b",
                  task.done ? "tm-is-done" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span className="tm-check">
                  <HandCheck size={14} />
                </span>
                <div className="tm-slip-body">
                  <span className="tm-title">
                    {task.title}
                    {task.done ? <HandLine variant="strike" className="tm-strike" /> : null}
                  </span>
                  <ListTag list={task.list} />
                  <span className="tm-meta">{task.meta}</span>
                </div>
                <TimeChip hot={task.hot}>{task.time}</TimeChip>
              </div>
            ))}
          </div>

          <div className="tm-section">
            <div data-h="2" className="tm-section-title">
              Later this week
            </div>
            <span className="tm-count">2</span>
          </div>

          <div className="tm-notes">
            {LATER.map((item, index) => (
              <div
                key={item.title}
                className={`tm-note tm-note--${item.tone} ${index % 2 === 0 ? "tm-tilt-c" : "tm-tilt-d"}`}
              >
                <span className="tm-check">
                  <HandCheck size={14} />
                </span>
                <span className="tm-note-title">{item.title}</span>
                <span className="tm-note-day">{item.day}</span>
              </div>
            ))}
          </div>
        </main>

        <aside className="tm-rail">
          <section className="tm-card">
            <header className="tm-card-head">
              <div className="tm-card-title">March</div>
              <div className="tm-cal-nav">
                <button type="button" aria-label="Previous month">
                  <Icon name="prev" size={13} />
                </button>
                <button type="button" aria-label="Next month">
                  <Icon name="next" size={13} />
                </button>
              </div>
            </header>
            <MarchCalendar today={9} eventDays={[9, 10, 11, 12, 13, 15, 16]} />
          </section>

          <section className="tm-card">
            <header className="tm-card-head">
              <div className="tm-card-title">This week</div>
            </header>
            <div className="tm-bars" aria-hidden="true">
              {WEEK_BARS.map((bar, index) => {
                const total = bar.done + bar.planned;
                return (
                  <div
                    key={`${bar.label}-${index}`}
                    className={bar.today ? "tm-bar-row tm-is-today" : "tm-bar-row"}
                  >
                    <span className="tm-bar-lb">{bar.label}</span>
                    <span className="tm-bar-value">{total}</span>
                    <span className="tm-bar-track">
                      {bar.done ? (
                        <i className="tm-bar-done" style={{ width: bar.done * BAR_UNIT }} />
                      ) : null}
                      {bar.planned ? (
                        <i className="tm-bar-planned" style={{ width: bar.planned * BAR_UNIT }} />
                      ) : null}
                      {total === 0 ? <i className="tm-bar-zero" /> : null}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="tm-legend" aria-hidden="true">
              <span>
                <i className="tm-swatch tm-swatch--done" />
                Done
              </span>
              <span>
                <i className="tm-swatch tm-swatch--planned" />
                Planned
              </span>
            </div>
          </section>

          <section className="tm-card tm-card--ink">
            <div className="tm-focus">
              <div className="tm-ring">
                <svg width="96" height="96" viewBox="0 0 96 96" aria-hidden="true">
                  <circle className="tm-ring-track" cx="48" cy="48" r="40" strokeWidth="8" />
                  <circle
                    className="tm-ring-arc"
                    cx="48"
                    cy="48"
                    r="40"
                    strokeWidth="8"
                    strokeDasharray="155.8 251.4"
                    transform="rotate(-90 48 48)"
                  />
                </svg>
                <div className="tm-ring-txt">24:18</div>
              </div>
              <div>
                <div data-h="3" className="tm-focus-title">
                  Focus session
                </div>
                <p className="tm-focus-copy">Deep work, round 3 of 4</p>
                <button type="button" className="tm-focus-btn">
                  <Icon name="pause" size={13} />
                  Pause
                </button>
              </div>
            </div>
          </section>

          <section className="tm-card">
            <div className="tm-acct">
              <span className="tm-avatar tm-avatar--sm">MK</span>
              <div>
                <div className="tm-acct-mail">mira@posy.app</div>
                <div className="tm-acct-note">Session active, renews in 6 days</div>
                <span className="tm-pill-ok">
                  <VerifiedMark size={9} />
                  Verified
                </span>
              </div>
            </div>
          </section>
        </aside>
      </section>
    </div>
  );
}
