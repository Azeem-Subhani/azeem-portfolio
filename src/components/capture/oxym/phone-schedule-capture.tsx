import { oxymFonts } from "@/components/capture/capture-fonts";

/** 900×1600 Oxym player schedule */
export function OxymPhoneScheduleCapture() {
  return (
    <div className={`oxym-capture-root ${oxymFonts}`}>
      <section className="capture capture--phone" aria-label="Oxym schedule on phone">
        <div className="p-inner">
        <header className="p-head">
          <button type="button" className="icon-btn" aria-label="Back">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m14.5 5.5-6.5 6.5 6.5 6.5" />
            </svg>
          </button>

          <div className="p-title">
            <div data-h="1">My schedule</div>
            <p>First Team · live updates</p>
          </div>

          <button type="button" className="icon-btn" aria-label="Calendar settings">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="4" y="5" width="16" height="15" rx="2" />
              <path d="M8 3v4M16 3v4M4 10h16" />
            </svg>
          </button>
        </header>

        <div className="p-body p-body--schedule">
          <article className="match-card">
            <div className="match-top">
              <span className="tag-away">Next match</span>
              <span className="match-date">Sat 14 Mar</span>
            </div>

            <div className="match-teams">
              <span className="crest crest--p crest--away">HR</span>
              <div className="match-name">
                <p>Harbour Rovers</p>
                <span>15:00, Dockside Park</span>
              </div>
            </div>

            <div className="match-rsvp">
              <span className="label">You replied: Going</span>
              <button type="button" className="btn-rsvp">
                Change
              </button>
            </div>
          </article>

          <ul className="phone-schedule-list">
            <li className="phone-schedule-item">
              <div className="phone-schedule-date">
                <span className="phone-schedule-dow">Thu</span>
                <span className="phone-schedule-dom">12</span>
              </div>
              <div className="phone-schedule-detail">
                <p>Training, Pitch 1</p>
                <span>18:30 · 17 going</span>
              </div>
            </li>
            <li className="phone-schedule-item phone-schedule-item--active">
              <div className="phone-schedule-date">
                <span className="phone-schedule-dow">Sat</span>
                <span className="phone-schedule-dom">14</span>
              </div>
              <div className="phone-schedule-detail">
                <p>Harbour Rovers (A)</p>
                <span>15:00 · arrive 13:30</span>
              </div>
            </li>
            <li className="phone-schedule-item">
              <div className="phone-schedule-date">
                <span className="phone-schedule-dow">Tue</span>
                <span className="phone-schedule-dom">17</span>
              </div>
              <div className="phone-schedule-detail">
                <p>Tactical review</p>
                <span>19:00 · video room</span>
              </div>
            </li>
          </ul>
        </div>
        </div>
      </section>
    </div>
  );
}
