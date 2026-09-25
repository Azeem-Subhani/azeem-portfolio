import { oxymFonts } from "@/components/capture/capture-fonts";
import { OxymWebShell } from "@/components/capture/oxym/oxym-web-shell";

const days = [
  {
    label: "Mon 9",
    events: [{ kind: "rest" as const, time: "", title: "Rest day", meta: "No session booked" }],
  },
  {
    label: "Tue 10",
    events: [
      {
        kind: "train" as const,
        time: "19:00",
        title: "Training, Pitch 2",
        meta: "Possession, 90 min",
      },
    ],
  },
  {
    label: "Wed 11",
    events: [
      {
        kind: "meet" as const,
        time: "18:00",
        title: "Set pieces",
        meta: "Video room",
      },
    ],
  },
  {
    label: "Thu 12",
    events: [
      {
        kind: "train" as const,
        time: "18:30",
        title: "Training, Pitch 1",
        meta: "20 invited, 17 confirmed",
      },
    ],
  },
  {
    label: "Fri 13",
    events: [
      {
        kind: "meet" as const,
        time: "10:30",
        title: "Lineup lock",
        meta: "Walkthrough, then travel",
      },
    ],
  },
  {
    label: "Sat 14",
    focus: true,
    events: [
      {
        kind: "meet" as const,
        time: "13:00",
        title: "Coach meet",
        meta: "Clubhouse",
      },
      {
        kind: "match" as const,
        time: "15:00",
        title: "Harbour Rovers (A)",
        meta: "League, Round 18",
      },
    ],
  },
  {
    label: "Sun 15",
    events: [
      {
        kind: "train" as const,
        time: "10:00",
        title: "Recovery",
        meta: "Optional for squad",
      },
    ],
  },
];

/** 1600×900 Oxym coach schedule view */
export function OxymWebScheduleCapture() {
  return (
    <div className={`oxym-capture-root ${oxymFonts}`}>
      <OxymWebShell activeNav="schedule" topbarTitle="Schedule" topbarSub="March 2026, First Team">
        <div className="schedule-layout">
          <div className="schedule-toolbar">
            <div className="schedule-tabs">
              <button type="button" className="schedule-tab is-active">
                Week
              </button>
              <button type="button" className="schedule-tab">
                Month
              </button>
            </div>
            <p className="schedule-range">9–15 Mar</p>
            <button type="button" className="btn btn--ghost btn--sm">
              Export calendar
            </button>
          </div>

          <article className="schedule-next">
            <span className="crest crest--md crest--away">HR</span>
            <div className="schedule-next-copy">
              <p className="eyebrow">Next fixture</p>
              <p className="schedule-next-title">Harbour Rovers (A)</p>
              <p className="schedule-next-meta">Sat 14 Mar · 15:00 · Dockside Park, Pitch 2</p>
            </div>
            <div className="schedule-next-stat">
              <p className="schedule-next-num">
                18<span> / 22</span>
              </p>
              <p className="schedule-next-note">confirmed</p>
            </div>
            <button type="button" className="btn btn--primary btn--sm">
              Set lineup
            </button>
          </article>

          <div className="schedule-grid">
            {days.map((day) => (
              <div
                key={day.label}
                className={day.focus ? "schedule-day schedule-day--focus" : "schedule-day"}
              >
                <p className="schedule-day-label">{day.label}</p>
                {day.events.map((event) =>
                  event.kind === "rest" ? (
                    <p key={event.title} className="schedule-rest">
                      Rest
                    </p>
                  ) : (
                    <article
                      key={event.title}
                      className={`schedule-event schedule-event--${event.kind}`}
                    >
                      <p className="schedule-event-time">{event.time}</p>
                      <p className="schedule-event-title">{event.title}</p>
                      <p className="schedule-event-meta">{event.meta}</p>
                    </article>
                  ),
                )}
              </div>
            ))}
          </div>

          <aside className="schedule-live">
            <span className="schedule-live-label">Live</span>
            <ul className="schedule-feed">
              <li>
                <span className="feed-time">17:04</span>
                Dana Whitfield marked available for Sat 14
              </li>
              <li>
                <span className="feed-time">16:51</span>
                Fixture kit note posted to First Team chat
              </li>
              <li>
                <span className="feed-time">16:22</span>
                Tomas Berg requested a change for next Tuesday
              </li>
            </ul>
          </aside>
        </div>
      </OxymWebShell>
    </div>
  );
}
