import { bookingAgentFonts } from "@/components/capture/capture-fonts";
import { Icon } from "@/components/capture/booking-agent/icons";

/** Meridian — Bookings, price watch, and proactive assistance. */
export function BookingAgentWebBookingsCapture() {
  return (
    <div className={`ba-capture-root ${bookingAgentFonts}`}>
      <section className="capture frame web" aria-label="Bookings, price watch, and proactive assistance">
      <div className="app">
        <aside className="side">
          <div className="brand">
            <div className="mark">
              <Icon name="sparkle" className="i" />
            </div>
            <div className="brand-name">
              {"Meridian "}
              <em>
                {"concierge"}
              </em>
            </div>
          </div>
          <div className="new-btn">
            <Icon name="plus" className="i" />
            {"New request"}
          </div>
          <nav className="nav">
            <button type="button">
              <Icon name="chat" className="i" />
              {"Assistant"}
            </button>
            <button className="on" type="button">
              <Icon name="cal" className="i" />
              {"Bookings"}
              <span className="ct">
                {"3"}
              </span>
            </button>
            <button type="button">
              <Icon name="eye" className="i" />
              {"Watches"}
              <span className="ct">
                {"1"}
              </span>
            </button>
            <button type="button">
              <Icon name="user" className="i" />
              {"Profile"}
            </button>
          </nav>
          <div className="nav-h">
            {"Recent"}
          </div>
          <div className="recent">
            <button type="button">
              {"Dinner Saturday for 6"}
              <small>
                {"Today · Booked"}
              </small>
            </button>
            <button type="button">
              {"Chicago hotel, Oct 22 to 24"}
              <small>
                {"Yesterday · Watching price"}
              </small>
            </button>
            <button type="button">
              {"Haircut next Friday"}
              <small>
                {"Mon · Booked"}
              </small>
            </button>
            <button type="button">
              {"Spa day for two"}
              <small>
                {"Sep 28 · Cancelled, refunded"}
              </small>
            </button>
          </div>
          <div className="me">
            <div className="av">
              {"JR"}
            </div>
            <div>
              <b>
                {"Jordan Rivera"}
              </b>
              <small>
                {"Personal"}
              </small>
            </div>
          </div>
        </aside>
        <div className="bk-main">
          <div className="bk-top">
            <div>
              <h1>
                {"Your bookings"}
              </h1>
              <p>
                {"Wednesday, Oct 7 · 3 upcoming · Meridian is watching 1 price"}
              </p>
            </div>
            <div className="tabs">
              <button className="on" type="button">
                {"Upcoming"}
                <span>
                  {"3"}
                </span>
              </button>
              <button type="button">
                {"Watches"}
                <span>
                  {"1"}
                </span>
              </button>
              <button type="button">
                {"Past"}
              </button>
            </div>
          </div>
          <div className="bk-grid">
            <div className="bk-left">
              <div className="feat">
                <div className="ph ph-lume">
                  <div className="dt">
                    <small>
                      {"Saturday"}
                    </small>
                    <b>
                      {"Oct 10"}
                    </b>
                  </div>
                </div>
                <div className="in">
                  <div className="hd">
                    <span className="tag g">
                      <Icon name="check" className="i" />
                      {"Confirmed"}
                    </span>
                    <span className="tag">
                      {"Ref MRD-4K7Q2"}
                    </span>
                    <span className="tag gold" style={{ marginLeft: "auto" }}>
                      {"In 3 days"}
                    </span>
                  </div>
                  <h3>
                    {"Dinner at Osteria Lume"}
                  </h3>
                  <div className="sub">
                    {"Italian · Market District · Quiet room requested"}
                  </div>
                  <div className="kv">
                    <div>
                      <small>
                        {"Time"}
                      </small>
                      <b>
                        {"8:30 PM"}
                      </b>
                    </div>
                    <div>
                      <small>
                        {"Guests"}
                      </small>
                      <b>
                        {"6"}
                      </b>
                    </div>
                    <div>
                      <small>
                        {"Deposit paid"}
                      </small>
                      <b>
                        {"$60.00"}
                      </b>
                    </div>
                    <div>
                      <small>
                        {"Free cancel until"}
                      </small>
                      <b>
                        {"Fri, 6:00 PM"}
                      </b>
                    </div>
                  </div>
                  <div className="acts">
                    <span className="btn sm dark">
                      <Icon name="edit" className="i" />
                      {"Modify"}
                    </span>
                    <span className="btn sm ghost">
                      {"Cancel for free"}
                    </span>
                    <span className="btn sm ghost">
                      <Icon name="cal" className="i" />
                      {"Add to calendar"}
                    </span>
                  </div>
                  <div className="group">
                    <span className="stack">
                      <span className="av">
                        {"JR"}
                      </span>
                      <span className="av" style={{ background: "linear-gradient(135deg,#4A6B8A,#2C4560)" }}>
                        {"AL"}
                      </span>
                      <span className="av" style={{ background: "linear-gradient(135deg,#8A5A6B,#5A3442)" }}>
                        {"BK"}
                      </span>
                      <span className="av" style={{ background: "linear-gradient(135deg,#7A6A3E,#4E4224)" }}>
                        {"TS"}
                      </span>
                      <span className="av" style={{ background: "linear-gradient(135deg,#3E7A6A,#24504A)" }}>
                        {"NP"}
                      </span>
                      <span className="av" style={{ background: "linear-gradient(135deg,#6B4A8A,#432C5E)" }}>
                        {"EM"}
                      </span>
                    </span>
                    <span>
                      <b>
                        {"6 of 6"}
                      </b>
                      {" guests invited"}
                    </span>
                    <span className="r">
                      <Icon name="bell" className="i" />
                      {"Reminder Fri, 10 AM"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="pair">
                <div className="mini">
                  <div className="hd">
                    <div className="th ph ph-hotel" />
                    <div>
                      <h4>
                        {"The Langford, Chicago"}
                      </h4>
                      <div className="sub">
                        {"Thu, Oct 22 to Sat, Oct 24 · 2 nights"}
                      </div>
                    </div>
                    <span className="tag b">
                      <Icon name="eye" className="i" />
                      {"Watching"}
                    </span>
                  </div>
                  <div className="watch">
                    <div className="top2">
                      <b className="num">
                        {"$128 "}
                        <small>
                          {"/ night"}
                        </small>
                      </b>
                      <span>
                        {"Your target: under $120"}
                      </span>
                    </div>
                    <svg width="100%" height="96" viewBox="0 0 320 58" preserveAspectRatio="none">
                      <line x1="0" y1="44" x2="320" y2="44" stroke="#3B5BA9" strokeWidth="1" strokeDasharray="4 4" opacity=".55" />
                      <path d="M0 10 L40 14 L80 9 L120 18 L160 16 L200 24 L240 22 L280 30 L320 34" fill="none" stroke="#1F4D3B" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                      <path d="M0 10 L40 14 L80 9 L120 18 L160 16 L200 24 L240 22 L280 30 L320 34 L320 58 L0 58Z" fill="#1F4D3B" opacity=".07" />
                      <circle cx="320" cy="34" r="3.5" fill="#1F4D3B" />
                    </svg>
                    <div className="lg">
                      <span>
                        {"Oct 1 · $142"}
                      </span>
                      <span>
                        {"Target $120"}
                      </span>
                      <span>
                        {"Today · $128"}
                      </span>
                    </div>
                  </div>
                  <div className="extras">
                    <div className="r">
                      <Icon name="fork" className="i" />
                      {"Breakfast"}
                      <b>
                        {"Included"}
                      </b>
                    </div>
                    <div className="r">
                      <Icon name="shield" className="i" />
                      {"Free cancellation"}
                      <b>
                        {"Until Tue, Oct 20"}
                      </b>
                    </div>
                  </div>
                  <div className="foot">
                    <span className="btn sm ghost">
                      {"Edit watch"}
                    </span>
                    <span className="btn sm ghost">
                      {"Book now at $128"}
                    </span>
                  </div>
                </div>
                <div className="mini">
                  <div className="hd">
                    <div className="th ph ph-studio" />
                    <div>
                      <h4>
                        {"Haircut at Studio Nine"}
                      </h4>
                      <div className="sub">
                        {"Fri, Oct 16 · 10:30 AM · with Dana"}
                      </div>
                    </div>
                    <span className="tag g">
                      <Icon name="check" className="i" />
                      {"Booked"}
                    </span>
                  </div>
                  <div className="resolve">
                    <div className="q">
                      {"You asked for "}
                      <i>
                        {"“next Friday.”"}
                      </i>
                      {" Since today is Wednesday, I checked which one you meant:"}
                    </div>
                    <div className="opts2">
                      <span>
                        {"Fri, Oct 9"}
                      </span>
                      <span className="on">
                        {"Fri, Oct 16 · chosen"}
                      </span>
                    </div>
                  </div>
                  <div className="extras">
                    <div className="r">
                      <Icon name="cal" className="i" />
                      {"Calendar"}
                      <b>
                        {"Added to Google Calendar"}
                      </b>
                    </div>
                    <div className="r">
                      <Icon name="bell" className="i" />
                      {"Reminder"}
                      <b>
                        {"Thu, Oct 15 · 6:00 PM"}
                      </b>
                    </div>
                    <div className="r">
                      <Icon name="card" className="i" />
                      {"Payment"}
                      <b>
                        {"Pay at visit · $45"}
                      </b>
                    </div>
                  </div>
                  <div className="foot">
                    <span className="btn sm ghost">
                      <Icon name="refresh" className="i" />
                      {"Reschedule"}
                    </span>
                    <span className="btn sm ghost">
                      {"Cancel"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bk-right">
              <div className="panel">
                <div className="panel-h">
                  <h3>
                    <span className="orb" style={{ width: "20px", height: "20px" }} />
                    {"Meridian is on it"}
                  </h3>
                  <button type="button">
                    {"See all"}
                  </button>
                </div>
                <div className="feed">
                  <div className="fi">
                    <div className="ic b">
                      <Icon name="plane" className="i" />
                    </div>
                    <div>
                      <b>
                        {"Your Oct 22 flight moved 45 min later"}
                      </b>
                      <p>
                        {"New arrival 11:40 AM. Hotel check-in still works. I can look for an earlier flight if you'd like."}
                      </p>
                      <div className="mini-acts">
                        <span className="pri">
                          {"Show alternatives"}
                        </span>
                        <span>
                          {"Keep it"}
                        </span>
                      </div>
                      <div className="when">
                        {"12 min ago"}
                      </div>
                    </div>
                  </div>
                  <div className="fi">
                    <div className="ic g">
                      <Icon name="down" className="i" />
                    </div>
                    <div>
                      <b>
                        {"The Langford dropped to $128 a night"}
                      </b>
                      <p>
                        {"$6 lower than yesterday and $8 above your target. Still watching."}
                      </p>
                      <div className="when">
                        {"This morning"}
                      </div>
                    </div>
                  </div>
                  <div className="fi">
                    <div className="ic w">
                      <Icon name="alert" className="i" />
                    </div>
                    <div>
                      <b>
                        {"The Langford needs your arrival time"}
                      </b>
                      <p>
                        {"Add it now so they hold the room past 6 PM."}
                      </p>
                      <div className="mini-acts">
                        <span>
                          {"Add arrival time"}
                        </span>
                      </div>
                      <div className="when">
                        {"Yesterday"}
                      </div>
                    </div>
                  </div>
                  <div className="fi">
                    <div className="ic gold">
                      <Icon name="bell" className="i" />
                    </div>
                    <div>
                      <b>
                        {"Reminder scheduled for Osteria Lume"}
                      </b>
                      <p>
                        {"Fri, 10 AM by SMS, before free cancellation ends at 6 PM."}
                      </p>
                      <div className="when">
                        {"Today, 6:19 PM"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel">
                <div className="panel-h">
                  <h3>
                    {"Saved for faster booking"}
                  </h3>
                  <button type="button">
                    {"Manage"}
                  </button>
                </div>
                <div className="pf">
                  <div className="r">
                    <Icon name="user" className="i" />
                    <span>
                      {"Name"}
                    </span>
                    <b>
                      {"Jordan Rivera"}
                    </b>
                  </div>
                  <div className="r">
                    <Icon name="fork" className="i" />
                    <span>
                      {"Dietary"}
                    </span>
                    <b>
                      {"No shellfish"}
                    </b>
                  </div>
                  <div className="r">
                    <Icon name="card" className="i" />
                    <span>
                      {"Payment"}
                    </span>
                    <b>
                      {"Visa •••• 4242"}
                    </b>
                  </div>
                </div>
                <div className="pf-note">
                  <Icon name="lock" className="i" />
                  {"Shared with a venue only when you confirm a booking."}
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
