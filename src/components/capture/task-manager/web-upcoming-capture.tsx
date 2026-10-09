import { taskManagerFonts } from "@/components/capture/capture-fonts";
import {
  HandCheck,
  HandLine,
  Icon,
  ListTag,
  MarchCalendar,
  PosyBloom,
  VerifiedMark,
  type ListName,
} from "@/components/capture/task-manager/task-manager-parts";

/** 1600×900 Posy upcoming week: 10 to 16 March, seven tasks scheduled. */

type Task = { title: string; list: ListName };
type Day = { num: number; name: string; sub?: string; tasks: Task[] };

// Seven rows, one per day. The Thursday and Friday tasks match the Later list on Today.
const WEEK: Day[] = [
  { num: 10, name: "Wednesday", sub: "Tomorrow", tasks: [{ title: "Prep book club notes", list: "book" }] },
  { num: 11, name: "Thursday", tasks: [{ title: "Book dentist appointment", list: "personal" }] },
  {
    num: 12,
    name: "Friday",
    tasks: [
      { title: "Draft the March newsletter", list: "work" },
      { title: "Meal prep for the week", list: "home" },
    ],
  },
  { num: 13, name: "Saturday", tasks: [{ title: "Plant basil on the balcony", list: "home" }] },
  { num: 14, name: "Sunday", tasks: [] },
  { num: 15, name: "Monday", tasks: [{ title: "Renew the SendGrid API key", list: "work" }] },
  { num: 16, name: "Tuesday", tasks: [{ title: "Sign the lease renewal", list: "personal" }] },
];

// Tasks planned per day for the next seven days, Wednesday 10 to Tuesday 16 March. The counts
// match the day rows in the ledger, so the chart and the list agree.
const NEXT_BARS: { label: string; planned: number }[] = [
  { label: "Wed", planned: 1 },
  { label: "Thu", planned: 1 },
  { label: "Fri", planned: 2 },
  { label: "Sat", planned: 1 },
  { label: "Sun", planned: 0 },
  { label: "Mon", planned: 1 },
  { label: "Tue", planned: 1 },
];

// Track length per task, in design pixels.
const BAR_UNIT = 22;

export function TaskManagerWebUpcomingCapture() {
  return (
    <div className={`tm-capture-root ${taskManagerFonts}`}>
      <section className="capture tm-screen tm-screen--upcoming" aria-label="Posy upcoming tasks">
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
            <button type="button" className="tm-nav-item">
              <Icon name="today" size={17} />
              Today
              <span className="tm-nav-count">6</span>
            </button>
            <button type="button" className="tm-nav-item tm-is-active">
              <Icon name="upcoming" size={17} />
              Upcoming
              <span className="tm-nav-count">7</span>
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

        <main className="tm-main">
          <header className="tm-topbar">
            <div>
              <div data-h="1" className="tm-greet">
                Upcoming{" "}
                <span className="tm-hl">
                  week
                  <HandLine variant="under" className="tm-hl-line" />
                </span>
              </div>
              <p className="tm-subline">10 to 16 March, seven tasks scheduled.</p>
            </div>
            <div className="tm-actions">
              <button type="button" className="tm-btn-ink">
                <Icon name="plus" size={15} />
                New task
              </button>
            </div>
          </header>

          <div className="tm-week">
            {WEEK.map((day) => (
              <div key={day.num} className="tm-day">
                <div className="tm-day-head">
                  <span className="tm-day-num">{day.num}</span>
                  <div>
                    <div className="tm-day-name">{day.name}</div>
                    {day.sub ? <div className="tm-day-sub">{day.sub}</div> : null}
                  </div>
                </div>
                <div className="tm-day-slips">
                  {day.tasks.length > 0 ? (
                    day.tasks.map((task, index) => (
                      <div
                        key={task.title}
                        className={`tm-day-slip ${index % 2 === 0 ? "tm-tilt-a" : "tm-tilt-b"}`}
                      >
                        <div className="tm-day-slip-top">
                          <span className="tm-check">
                            <HandCheck size={14} />
                          </span>
                          <span className="tm-day-slip-title">{task.title}</span>
                        </div>
                        <ListTag list={task.list} />
                      </div>
                    ))
                  ) : (
                    <p className="tm-day-empty">Nothing planned</p>
                  )}
                </div>
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
            <MarchCalendar today={9} weekFrom={10} weekTo={16} eventDays={[10, 11, 12, 13, 15, 16]} />
          </section>

          <section className="tm-card">
            <header className="tm-card-head">
              <div className="tm-card-title">Next 7 days</div>
            </header>
            <div className="tm-bars" aria-hidden="true">
              {NEXT_BARS.map((bar, index) => (
                <div key={`${bar.label}-${index}`} className="tm-bar-row">
                  <span className="tm-bar-lb">{bar.label}</span>
                  <span className="tm-bar-value">{bar.planned}</span>
                  <span className="tm-bar-track">
                    {bar.planned ? (
                      <i className="tm-bar-planned" style={{ width: bar.planned * BAR_UNIT }} />
                    ) : (
                      <i className="tm-bar-zero" />
                    )}
                  </span>
                </div>
              ))}
            </div>
            <p className="tm-bars-caption">Planned by day</p>
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
