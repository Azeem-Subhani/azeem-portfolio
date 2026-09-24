/** 1600×900 Track Hero operator console — event schedule. */

import { TrackHeroWebConsoleChrome } from "@/components/capture/track-hero/web-console-chrome";

const days = [
  { label: "Mon 15", short: "MON" },
  { label: "Tue 16", short: "TUE" },
  { label: "Wed 17", short: "WED" },
  { label: "Thu 18", short: "THU", today: true },
  { label: "Fri 19", short: "FRI" },
  { label: "Sat 20", short: "SAT" },
  { label: "Sun 21", short: "SUN" },
];

const blocks = [
  { day: 3, top: 8, height: 14, title: "GT Sprint — Open Lapping", track: "Apex Raceway", fill: "82%" },
  { day: 3, top: 24, height: 10, title: "Endurance Test — GT4 / GT3", track: "Apex Raceway", fill: "34%" },
  { day: 4, top: 12, height: 12, title: "Arrive & Drive", track: "Ridge Motorsport", fill: "88%" },
  { day: 5, top: 6, height: 16, title: "GT4 Test Day", track: "Sonoma Coast", fill: "100%" },
  { day: 6, top: 18, height: 11, title: "Skip Barber Formula", track: "Spring Mountain", fill: "71%" },
];

export function TrackHeroWebScheduleCapture() {
  return (
    <div className="th-capture-root">
      <TrackHeroWebConsoleChrome
        ariaLabel="Track Hero event schedule"
        activeNav="schedule"
        activeSidebar="schedule"
      >
        <div className="ophead">
          <div>
            <div data-h="2">Event schedule</div>
            <p>Week of 15 September 2026 · All five tracks · Live capacity</p>
          </div>
          <div className="ophead-right">
            <button type="button" className="btn-ghost">
              Print week
            </button>
            <button type="button" className="btn-primary">
              Add session
            </button>
          </div>
        </div>

        <div className="sched-kpis">
          <div className="sched-kpi">
            <span>Sessions this week</span>
            <b>28</b>
          </div>
          <div className="sched-kpi">
            <span>Tracks active today</span>
            <b>5</b>
          </div>
          <div className="sched-kpi">
            <span>Avg fill rate</span>
            <b>87%</b>
          </div>
        </div>

        <div className="panel sched-panel">
          <div className="panel-head">
            <div>
              <div data-h="3">Weekly grid</div>
              <p>Drag to reschedule · click a block for booking detail</p>
            </div>
            <div className="seg">
              <span>Day</span>
              <span className="on">Week</span>
              <span>Month</span>
            </div>
          </div>
          <div className="sched-grid">
            <div className="sched-time-col">
              <span>08:00</span>
              <span>10:00</span>
              <span>12:00</span>
              <span>14:00</span>
              <span>16:00</span>
              <span>18:00</span>
            </div>
            <div className="sched-days">
              {days.map((day, dayIndex) => (
                <div key={day.short} className={`sched-day${day.today ? " today" : ""}`}>
                  <div className="sched-day-head">
                    <span className="sched-dow">{day.short}</span>
                    <span className="sched-date">{day.label.split(" ")[1]}</span>
                  </div>
                  <div className="sched-cells">
                    {blocks
                      .filter((block) => block.day === dayIndex)
                      .map((block) => (
                        <div
                          key={block.title}
                          className="sched-block"
                          style={{ top: `${block.top}%`, height: `${block.height}%` }}
                        >
                          <b>{block.title}</b>
                          <span>{block.track}</span>
                          <i>{block.fill} full</i>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </TrackHeroWebConsoleChrome>
    </div>
  );
}
