/** 1600×900 Smart Living — Event scheduling. */

import { Ic, SmartLivingSidebar } from "@/components/capture/smart-living/shared";

const CAL_LINES = [0, 68, 136, 204, 272, 340, 408, 476, 544, 612];

function CalColumn({
  highlight,
  children,
}: {
  highlight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={highlight ? "cal-col cal-col--today" : "cal-col"}>
      {CAL_LINES.map((top) => (
        <div key={top} className="cal-line" style={{ top }} />
      ))}
      {children}
    </div>
  );
}

export function SmartLivingWebSchedulingCapture() {
  return (
    <div className="sl-capture-root">
      <section className="capture capture--web" aria-label="Smart Living event scheduling">
        <SmartLivingSidebar active="events" foot="scheduler" />

        <div className="main">
          <header className="topbar">
            <div className="tb-left">
              <span className="tb-title">Event scheduling</span>
              <span className="chip" style={{ background: "#F1F4F8", color: "#4A5462" }}>
                12–17 May 2025
              </span>
            </div>
            <div className="tb-right">
              <button type="button" className="tbtn icon" aria-label="Previous week">
                <Ic size={15}>
                  <path d="m15 18-6-6 6-6" />
                </Ic>
              </button>
              <button type="button" className="tbtn">
                Today
              </button>
              <button type="button" className="tbtn icon" aria-label="Next week">
                <Ic size={15}>
                  <path d="m9 18 6-6-6-6" />
                </Ic>
              </button>
              <button type="button" className="tbtn primary">
                + New event
              </button>
            </div>
          </header>

          <div className="content">
            <div className="toolbar">
              <button type="button" className="filter on">
                Week
              </button>
              <button type="button" className="filter">
                Month
              </button>
              <button type="button" className="filter">
                Agenda
              </button>
              <div className="toolbar-legend">
                <span>
                  <i className="legend-swatch" style={{ background: "#0B6BFF" }} />
                  Wellness
                </span>
                <span>
                  <i className="legend-swatch" style={{ background: "#0E9F6E" }} />
                  Care
                </span>
                <span>
                  <i className="legend-swatch" style={{ background: "#7C5CFF" }} />
                  Social
                </span>
                <span>
                  <i className="legend-swatch" style={{ background: "#D98200" }} />
                  Facilities
                </span>
              </div>
            </div>

            <div className="grid-2 scheduling-grid">
              <div className="card">
                <div className="cal">
                  <div className="cal-head">
                    <div />
                    <div className="cal-dh">
                      MON<b>12</b>
                    </div>
                    <div className="cal-dh">
                      TUE<b>13</b>
                    </div>
                    <div className="cal-dh">
                      WED<b>14</b>
                    </div>
                    <div className="cal-dh">
                      THU<b>15</b>
                    </div>
                    <div className="cal-dh today">
                      FRI<b>16</b>
                    </div>
                    <div className="cal-dh">
                      SAT<b>17</b>
                    </div>
                  </div>
                  <div className="cal-body">
                    <div className="cal-times">
                      {CAL_LINES.map((top, index) => (
                        <div key={top} className="cal-t" style={{ top }}>
                          {String(8 + index).padStart(2, "0")}:00
                        </div>
                      ))}
                    </div>
                    <CalColumn>
                      <div className="ev blue" style={{ top: 88, height: 52 }}>
                        <b>Chair yoga</b>
                        <span>Studio A</span>
                      </div>
                    </CalColumn>
                    <CalColumn>
                      <div className="ev violet" style={{ top: 170, height: 80 }}>
                        <b>Book club</b>
                        <span>Library · 11:30</span>
                      </div>
                    </CalColumn>
                    <CalColumn>
                      <div className="ev blue" style={{ top: 34, height: 58 }}>
                        <b>Mobility group</b>
                        <span>Studio A · 08:30</span>
                      </div>
                    </CalColumn>
                    <CalColumn>
                      <div className="ev green" style={{ top: 120, height: 66 }}>
                        <b>Physio 1:1</b>
                        <span>Garden Wing</span>
                      </div>
                    </CalColumn>
                    <CalColumn highlight>
                      <div className="ev blue" style={{ top: 88, height: 52 }}>
                        <b>Chair yoga</b>
                        <span>Studio A</span>
                      </div>
                      <div className="ev green" style={{ top: 300, height: 46 }}>
                        <b>BP clinic</b>
                        <span>Health Room</span>
                      </div>
                      <div className="ev violet" style={{ top: 408, height: 92 }}>
                        <b>Resident council</b>
                        <span>Community Hall · 14:00</span>
                      </div>
                      <div className="ev amber" style={{ top: 544, height: 52 }}>
                        <b>Fire drill</b>
                        <span>Block C · 16:30</span>
                      </div>
                    </CalColumn>
                    <CalColumn>
                      <div className="ev violet" style={{ top: 200, height: 70 }}>
                        <b>Family brunch</b>
                        <span>Garden Terrace</span>
                      </div>
                    </CalColumn>
                  </div>
                </div>
              </div>

              <div className="scheduling-side">
                <div className="card">
                  <div className="card-h">
                    <div className="card-t">Today · Fri 16</div>
                    <div className="card-sub">
                      <button type="button" className="ghost-link">
                        + Add
                      </button>
                    </div>
                  </div>
                  <div className="ev-row" style={{ padding: "10px 15px" }}>
                    <div className="ev-time">
                      <div className="ev-h tnum">09:30</div>
                      <div className="ev-m">45m</div>
                    </div>
                    <div className="ev-bar" style={{ background: "#0B6BFF" }} />
                    <div style={{ flex: 1 }}>
                      <div className="ev-name">Chair yoga & mobility</div>
                      <div className="ev-loc">Garden Wing · Studio A</div>
                    </div>
                  </div>
                  <div className="ev-row" style={{ padding: "10px 15px" }}>
                    <div className="ev-time">
                      <div className="ev-h tnum">11:00</div>
                      <div className="ev-m">30m</div>
                    </div>
                    <div className="ev-bar" style={{ background: "#0E9F6E" }} />
                    <div style={{ flex: 1 }}>
                      <div className="ev-name">Blood pressure clinic</div>
                      <div className="ev-loc">Tower 1 · Health Room</div>
                    </div>
                  </div>
                  <div className="ev-row" style={{ padding: "10px 15px" }}>
                    <div className="ev-time">
                      <div className="ev-h tnum">14:00</div>
                      <div className="ev-m">90m</div>
                    </div>
                    <div className="ev-bar" style={{ background: "#7C5CFF" }} />
                    <div style={{ flex: 1 }}>
                      <div className="ev-name">Resident council meeting</div>
                      <div className="ev-loc">Tower 2 · Community Hall</div>
                    </div>
                  </div>
                  <div className="ev-row" style={{ padding: "10px 15px" }}>
                    <div className="ev-time">
                      <div className="ev-h tnum">16:30</div>
                      <div className="ev-m">60m</div>
                    </div>
                    <div className="ev-bar" style={{ background: "#D98200" }} />
                    <div style={{ flex: 1 }}>
                      <div className="ev-name">Fire drill — Block C</div>
                      <div className="ev-loc">Block C · All floors</div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-h">
                    <div className="card-t">Room availability</div>
                    <div className="card-sub">Now</div>
                  </div>
                  <div className="bld" style={{ paddingTop: 12 }}>
                    <div className="bld-row">
                      <span className="bld-name">Studio A</span>
                      <span className="bar">
                        <i style={{ width: "0%", background: "#E5484D" }} />
                      </span>
                      <span className="bld-val" style={{ color: "#E5484D" }}>
                        Busy
                      </span>
                    </div>
                    <div className="bld-row">
                      <span className="bld-name">Hall 2</span>
                      <span className="bar">
                        <i style={{ width: "100%", background: "#0E9F6E" }} />
                      </span>
                      <span className="bld-val" style={{ color: "#0E9F6E" }}>
                        Free
                      </span>
                    </div>
                    <div className="bld-row">
                      <span className="bld-name">Library</span>
                      <span className="bar">
                        <i style={{ width: "100%", background: "#0E9F6E" }} />
                      </span>
                      <span className="bld-val" style={{ color: "#0E9F6E" }}>
                        Free
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
