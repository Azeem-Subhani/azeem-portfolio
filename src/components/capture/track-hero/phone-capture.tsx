/** 900×1600 Track Hero customer booking — mobile web. */

export function TrackHeroPhoneCapture() {
  return (
    <div className="th-capture-root">
      <section className="capture capture--phone" aria-label="Track Hero booking on phone">
        <div className="p-topbar">
          <button type="button" className="p-icon" aria-label="Back">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="p-title">
            <span className="p-brand">TRACK HERO</span>
            Book a session
            <small>Apex Raceway · Fri 18 Sep</small>
          </div>
          <button type="button" className="p-icon" aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>

        <div className="p-body">
          <div className="p-hero">
            <div>
              <div className="eyebrow">
                <span className="tag">ROUND 04</span>
              </div>
              <div data-h="1">Apex Raceway</div>
              <div className="sub">Sonoma, California · 3.42 mi</div>
            </div>
            <svg className="p-map" viewBox="0 0 260 130" fill="none">
              <path
                d="M40,100 C20,100 14,78 22,60 C30,42 52,36 72,36 C92,36 100,52 118,56 C136,60 150,48 168,44 C190,39 214,44 226,58 C238,72 232,92 214,100 C196,108 176,104 158,100 C140,96 126,88 108,90 C90,92 80,104 62,104 C54,104 46,104 40,100 Z"
                stroke="#CCF94F"
                strokeWidth="2.6"
                strokeLinejoin="round"
                opacity=".85"
              />
              <line x1="46" y1="94" x2="58" y2="104" stroke="#CCF94F" strokeWidth="2.6" opacity=".5" />
            </svg>
            <div className="mini-stats">
              <div className="mini">
                <b>6</b>
                <span>Sessions</span>
              </div>
              <div className="mini">
                <b>18</b>
                <span>Seats left</span>
              </div>
              <div className="mini">
                <b>14</b>
                <span>Turns</span>
              </div>
            </div>
          </div>

          <div className="p-dates">
            <button type="button" className="pd">
              <span className="dw">TUE</span>
              <b className="dn">15</b>
              <span className="dd">4 left</span>
            </button>
            <button type="button" className="pd">
              <span className="dw">WED</span>
              <b className="dn">16</b>
              <span className="dd">Sold out</span>
            </button>
            <button type="button" className="pd">
              <span className="dw">THU</span>
              <b className="dn">17</b>
              <span className="dd">7 left</span>
            </button>
            <button type="button" className="pd on">
              <span className="dw">FRI</span>
              <b className="dn">18</b>
              <span className="dd">6 left</span>
            </button>
            <button type="button" className="pd">
              <span className="dw">SAT</span>
              <b className="dn">19</b>
              <span className="dd">9 left</span>
            </button>
          </div>

          <div className="p-label">
            <div data-h="2">Available sessions</div>
            <span>Fri 18 Sep</span>
          </div>

          <div className="p-sessions">
            <div className="ps">
              <div className="ps-top">
                <b className="ps-time">08:15</b>
                <span className="ps-tag warn">4 seats left</span>
              </div>
              <div className="ps-name">Arrive &amp; Drive — Beginner</div>
              <div className="ps-meta">30 min · Novice · Coaching included</div>
              <div className="ps-foot">
                <div className="ps-price">
                  $210<small>/ driver</small>
                </div>
                <button type="button" className="ps-btn ghost">
                  Select
                </button>
              </div>
            </div>

            <div className="ps on">
              <div className="ps-top">
                <b className="ps-time">09:40</b>
                <span className="ps-tag">12 seats left</span>
              </div>
              <div className="ps-name">GT Sprint — Open Lapping</div>
              <div className="ps-meta">45 min · Intermediate · Dry</div>
              <div className="ps-foot">
                <div className="ps-price">
                  $340<small>/ driver</small>
                </div>
                <button type="button" className="ps-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Selected
                </button>
              </div>
            </div>

            <div className="ps">
              <div className="ps-top">
                <b className="ps-time">13:20</b>
                <span className="ps-tag warn">5 seats left</span>
              </div>
              <div className="ps-name">Endurance Test — GT4 / GT3</div>
              <div className="ps-meta">60 min · Advanced · Dry</div>
              <div className="ps-foot">
                <div className="ps-price">
                  $520<small>/ driver</small>
                </div>
                <button type="button" className="ps-btn ghost">
                  Select
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-cta">
          <div className="amt">
            <span>Total due today</span>
            <b>$403.00</b>
          </div>
          <button type="button">Continue</button>
        </div>
      </section>
    </div>
  );
}
