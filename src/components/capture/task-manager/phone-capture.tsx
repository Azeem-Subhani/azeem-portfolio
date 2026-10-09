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
  type ListName,
} from "@/components/capture/task-manager/task-manager-parts";

/**
 * 900 wide canvas. The inner screen is laid out at 393 logical pixels (iPhone 15 Pro) and
 * scaled up; task-manager-phone-mock.css stretches it to the device height.
 */

// Four of the six Today tasks fit above the tab bar. Same titles as the web list, shortened
// so each one fits on a single line.
const PHONE_TODAY: { title: string; list: ListName; time: string; done?: boolean; hot?: boolean }[] = [
  { title: "Review PR #482", list: "work", time: "9:30 AM", done: true },
  { title: "Rotate signing keys in staging", list: "work", time: "11:15 AM", hot: true },
  { title: "Order birthday flowers for Mom", list: "personal", time: "1:00 PM" },
  { title: "Grocery run: oat milk, peaches", list: "home", time: "5:30 PM" },
];

function PhoneTabBar({ active }: { active: "today" | "upcoming" | "lists" | "profile" }) {
  const tabs = [
    { id: "today" as const, label: "Today" },
    { id: "upcoming" as const, label: "Upcoming" },
    { id: "lists" as const, label: "Lists" },
    { id: "profile" as const, label: "Profile" },
  ];

  return (
    <nav className="tm-tabbar" aria-label="Main">
      {tabs.map((tab) => (
        <button key={tab.id} type="button" className={tab.id === active ? "tm-is-on" : undefined}>
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

export function TaskManagerPhoneCapture() {
  return (
    <div className={`tm-capture-root ${taskManagerFonts}`}>
      <section
        className="capture capture--phone tm-screen tm-screen--phone"
        aria-label="Posy Today on phone"
      >
        <div className="tm-phone-inner">
          <header className="tm-phone-top">
            <div className="tm-phone-brand">
              <PosyBloom size={28} />
              <span className="tm-phone-name">Posy</span>
            </div>
            <span className="tm-avatar tm-avatar--sm">MK</span>
          </header>

          <div className="tm-phone-hero">
            <div className="tm-numeral tm-numeral--sm" aria-hidden="true">
              <span className="tm-numeral-under">9</span>
              <span className="tm-numeral-over">9</span>
            </div>
            <div className="tm-phone-date">
              <div data-h="1" className="tm-phone-day">
                Tuesday
              </div>
              <div className="tm-phone-month">March</div>
            </div>
            <ProgressStamp done={2} total={6} size="sm" />
          </div>

          <div data-h="1" className="tm-phone-greet">
            Good morning, <span className="tm-hl">Mira<HandLine variant="under" className="tm-hl-line" /></span>
          </div>
          <p className="tm-phone-sub">4 tasks left today, 1 due before noon.</p>

          <div className="tm-phone-section">
            <div data-h="2" className="tm-section-title">
              Today
            </div>
            <span className="tm-count">6</span>
          </div>

          <div className="tm-phone-list">
            {PHONE_TODAY.map((task, index) => (
              <div
                key={task.title}
                className={[
                  "tm-p-slip",
                  index % 2 === 0 ? "tm-tilt-a" : "tm-tilt-b",
                  task.done ? "tm-is-done" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span className="tm-check">
                  <HandCheck size={13} />
                </span>
                <div className="tm-p-slip-body">
                  <span className="tm-title">
                    {task.title}
                    {task.done ? <HandLine variant="strike" className="tm-strike" /> : null}
                  </span>
                  <div className="tm-p-meta">
                    <ListTag list={task.list} />
                    <TimeChip hot={task.hot}>{task.time}</TimeChip>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <PhoneTabBar active="today" />
        </div>
      </section>
    </div>
  );
}

export function TaskManagerPhoneDetailCapture() {
  return (
    <div className={`tm-capture-root ${taskManagerFonts}`}>
      <section
        className="capture capture--phone tm-screen tm-screen--phone"
        aria-label="Posy task detail on phone"
      >
        <div className="tm-phone-inner">
          <header className="tm-phone-top tm-phone-top--detail">
            <button type="button" className="tm-p-back" aria-label="Back to Today">
              <Icon name="back" size={18} />
            </button>
            <span className="tm-p-eyebrow">Work, today</span>
          </header>

          <div data-h="1" className="tm-p-heading">
            Rotate signing keys in staging
          </div>

          <div className="tm-p-chips">
            <TimeChip hot>11:15 AM</TimeChip>
            <ListTag list="work" />
            <span className="tm-pill-ok">
              <VerifiedMark size={9} />
              Session active
            </span>
          </div>

          <section className="tm-p-card">
            <div className="tm-p-label">Notes</div>
            <p className="tm-p-copy">
              Roll JWT signing keys in staging before the client ships refresh handling. Log out
              stale sessions after the swap.
            </p>
          </section>

          <section className="tm-p-card">
            <div className="tm-p-label">Subtasks</div>
            <ul className="tm-p-subtasks">
              <li className="tm-is-done">
                <span className="tm-check">
                  <HandCheck size={13} />
                </span>
                <span className="tm-title">
                  Export current public keys
                  <HandLine variant="strike" className="tm-strike" />
                </span>
              </li>
              <li>
                <span className="tm-check">
                  <HandCheck size={13} />
                </span>
                <span className="tm-title">Update Express auth middleware</span>
              </li>
              <li>
                <span className="tm-check">
                  <HandCheck size={13} />
                </span>
                <span className="tm-title">Invalidate old refresh tokens</span>
              </li>
            </ul>
          </section>

          <button type="button" className="tm-p-focus">
            <Icon name="play" size={12} />
            Start focus session
          </button>

          <PhoneTabBar active="today" />
        </div>
      </section>
    </div>
  );
}
