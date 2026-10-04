import { bookingAgentFonts } from "@/components/capture/capture-fonts";
import { Icon } from "@/components/capture/booking-agent/icons";

/** Meridian — Operations console with live conversations and human takeover. */
export function BookingAgentWebAdminCapture() {
  return (
    <div className={`ba-capture-root ${bookingAgentFonts}`}>
      <section className="capture frame web" aria-label="Operations console with live conversations and human takeover">
      <div className="app">
        <aside className="side ops-side">
          <div className="brand">
            <div className="mark">
              <Icon name="sparkle" className="i" />
            </div>
            <div className="brand-name">
              {"Meridian "}
              <em>
                {"ops"}
              </em>
            </div>
          </div>
          <nav className="nav">
            <button type="button">
              <Icon name="grid" className="i" />
              {"Overview"}
            </button>
            <button className="on" type="button">
              <Icon name="chat" className="i" />
              {"Conversations"}
              <span className="ct">
                {"186"}
              </span>
            </button>
            <button type="button">
              <Icon name="headset" className="i" />
              {"Handoffs"}
              <span className="ct hot">
                {"3"}
              </span>
            </button>
            <button type="button">
              <Icon name="cal" className="i" />
              {"Bookings"}
            </button>
            <button type="button">
              <Icon name="users" className="i" />
              {"Customers"}
            </button>
            <button type="button">
              <Icon name="building" className="i" />
              {"Providers"}
            </button>
            <button type="button">
              <Icon name="card" className="i" />
              {"Payments and refunds"}
            </button>
          </nav>
          <div className="nav-h">
            {"Governance"}
          </div>
          <nav className="nav">
            <button type="button">
              <Icon name="file" className="i" />
              {"Audit log"}
            </button>
            <button type="button">
              <Icon name="shield" className="i" />
              {"Risk review"}
              <span className="ct hot">
                {"1"}
              </span>
            </button>
            <button type="button">
              <Icon name="chart" className="i" />
              {"Analytics"}
            </button>
            <button type="button">
              <Icon name="settings" className="i" />
              {"Settings"}
            </button>
          </nav>
          <div className="me">
            <div className="av" style={{ background: "linear-gradient(135deg,#3E5C7A,#24364A)" }}>
              {"MK"}
            </div>
            <div>
              <b>
                {"Morgan Kim "}
                <span className="role">
                  {"OPS LEAD"}
                </span>
              </b>
              <small>
                {"Support team"}
              </small>
            </div>
          </div>
        </aside>
        <div className="ops-main">
          <div className="ops-col">
            <div className="ops-top">
              <div data-h="1">
                {"Conversations"}
              </div>
              <span className="tag w">
                {"Sample data"}
              </span>
              <div className="right">
                <div className="seg">
                  <span>
                    {"24h"}
                  </span>
                  <span className="on">
                    {"Today"}
                  </span>
                  <span>
                    {"7d"}
                  </span>
                  <span>
                    {"30d"}
                  </span>
                </div>
                <span className="btn sm ghost">
                  <span className="dot" />
                  {"Live"}
                </span>
              </div>
            </div>
            <div className="kpis">
              <div className="kpi">
                <small>
                  {"Conversations today"}
                </small>
                <div className="v">
                  <b className="num">
                    {"1,284"}
                  </b>
                  <span>
                    {"+8.4%"}
                  </span>
                </div>
                <svg width="100%" height="26" viewBox="0 0 200 26" preserveAspectRatio="none">
                  <path d="M0 20 L25 18 L50 19 L75 14 L100 15 L125 10 L150 12 L175 7 L200 5" fill="none" stroke="#2E6B52" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <div className="kpi">
                <small>
                  {"Booked by AI, end to end"}
                </small>
                <div className="v">
                  <b className="num">
                    {"38.2%"}
                  </b>
                  <span>
                    {"+2.1 pts"}
                  </span>
                </div>
                <svg width="100%" height="26" viewBox="0 0 200 26" preserveAspectRatio="none">
                  <path d="M0 18 L25 19 L50 16 L75 17 L100 13 L125 14 L150 11 L175 10 L200 8" fill="none" stroke="#2E6B52" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <div className="kpi">
                <small>
                  {"Median time to book"}
                </small>
                <div className="v">
                  <b className="num">
                    {"3m 12s"}
                  </b>
                  <span className="dn">
                    {"−18s"}
                  </span>
                </div>
                <svg width="100%" height="26" viewBox="0 0 200 26" preserveAspectRatio="none">
                  <path d="M0 6 L25 8 L50 7 L75 11 L100 10 L125 14 L150 13 L175 17 L200 18" fill="none" stroke="#2E6B52" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <div className="kpi">
                <small>
                  {"Human handoffs"}
                </small>
                <div className="v">
                  <b className="num">
                    {"4.1%"}
                  </b>
                  <span style={{ color: "var(--ink-3)" }}>
                    {"53 today"}
                  </span>
                </div>
                <svg width="100%" height="26" viewBox="0 0 200 26" preserveAspectRatio="none">
                  <path d="M0 14 L25 12 L50 15 L75 13 L100 16 L125 13 L150 15 L175 14 L200 15" fill="none" stroke="#878C96" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <div className="tbl">
              <div className="tbl-h">
                <h3>
                  {"Live now"}
                </h3>
                <span className="tag">
                  {"186 active"}
                </span>
                <div className="right">
                  <div className="search">
                    <Icon name="search" className="i" />
                    {"Search customer or ref"}
                  </div>
                  <span className="btn sm ghost">
                    {"Status"}
                    <Icon name="cd" className="i" />
                  </span>
                  <span className="btn sm ghost">
                    {"Channel"}
                    <Icon name="cd" className="i" />
                  </span>
                </div>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>
                      {"Customer"}
                    </th>
                    <th>
                      {"Request"}
                    </th>
                    <th>
                      {"Channel"}
                    </th>
                    <th>
                      {"Status"}
                    </th>
                    <th>
                      {"Risk"}
                    </th>
                    <th>
                      {"Waiting"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="sel">
                    <td>
                      <div className="who">
                        <div className="av">
                          {"JR"}
                        </div>
                        <b>
                          {"Jordan R."}
                        </b>
                      </div>
                    </td>
                    <td>
                      <span className="req">
                        {"Dinner · 6 guests · Sat 8:30 PM"}
                      </span>
                    </td>
                    <td>
                      <span className="ch">
                        <Icon name="monitor" className="i" />
                        {"Web · EN"}
                      </span>
                    </td>
                    <td>
                      <span className="tag gold">
                        {"Awaiting confirmation"}
                      </span>
                    </td>
                    <td>
                      <span className="risk">
                        <i />
                        {"Low"}
                      </span>
                    </td>
                    <td>
                      <span className="wait">
                        {"0:42"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="who">
                        <div className="av" style={{ background: "linear-gradient(135deg,#8A5A6B,#5A3442)" }}>
                          {"MG"}
                        </div>
                        <b>
                          {"María G."}
                        </b>
                      </div>
                    </td>
                    <td>
                      <span className="req">
                        {"Refund outside policy · Spa"}
                      </span>
                    </td>
                    <td>
                      <span className="ch">
                        <Icon name="msg" className="i" />
                        {"WhatsApp · ES"}
                      </span>
                    </td>
                    <td>
                      <span className="tag w">
                        <Icon name="hand" className="i" />
                        {"Needs human"}
                      </span>
                    </td>
                    <td>
                      <span className="risk m">
                        <i />
                        {"Medium"}
                      </span>
                    </td>
                    <td>
                      <span className="wait hot">
                        {"2:10"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="who">
                        <div className="av" style={{ background: "linear-gradient(135deg,#4A6B8A,#2C4560)" }}>
                          {"SO"}
                        </div>
                        <b>
                          {"Sam O."}
                        </b>
                      </div>
                    </td>
                    <td>
                      <span className="req">
                        {"Hotel · Chicago · 2 nights"}
                      </span>
                    </td>
                    <td>
                      <span className="ch">
                        <Icon name="phone" className="i" />
                        {"Voice · EN"}
                      </span>
                    </td>
                    <td>
                      <span className="tag b">
                        {"Searching"}
                      </span>
                    </td>
                    <td>
                      <span className="risk">
                        <i />
                        {"Low"}
                      </span>
                    </td>
                    <td>
                      <span className="wait">
                        {"0:08"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="who">
                        <div className="av" style={{ background: "linear-gradient(135deg,#7A6A3E,#4E4224)" }}>
                          {"PK"}
                        </div>
                        <b>
                          {"Priya K."}
                        </b>
                      </div>
                    </td>
                    <td>
                      <span className="req">
                        {"Group dinner · 12 guests"}
                      </span>
                    </td>
                    <td>
                      <span className="ch">
                        <Icon name="monitor" className="i" />
                        {"Web · EN"}
                      </span>
                    </td>
                    <td>
                      <span className="tag">
                        {"Collecting guest details"}
                      </span>
                    </td>
                    <td>
                      <span className="risk">
                        <i />
                        {"Low"}
                      </span>
                    </td>
                    <td>
                      <span className="wait">
                        {"1:15"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="who">
                        <div className="av" style={{ background: "linear-gradient(135deg,#6B4A8A,#432C5E)" }}>
                          {"AT"}
                        </div>
                        <b>
                          {"Ana T."}
                        </b>
                      </div>
                    </td>
                    <td>
                      <span className="req">
                        {"Card declined twice · Hotel"}
                      </span>
                    </td>
                    <td>
                      <span className="ch">
                        <Icon name="monitor" className="i" />
                        {"Web · PT"}
                      </span>
                    </td>
                    <td>
                      <span className="tag r">
                        {"Risk review"}
                      </span>
                    </td>
                    <td>
                      <span className="risk h">
                        <i />
                        {"High"}
                      </span>
                    </td>
                    <td>
                      <span className="wait hot">
                        {"3:02"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="who">
                        <div className="av" style={{ background: "linear-gradient(135deg,#3E7A6A,#24504A)" }}>
                          {"CD"}
                        </div>
                        <b>
                          {"Chris D."}
                        </b>
                      </div>
                    </td>
                    <td>
                      <span className="req">
                        {"Flight change · Rebooking"}
                      </span>
                    </td>
                    <td>
                      <span className="ch">
                        <Icon name="phone" className="i" />
                        {"Voice · EN"}
                      </span>
                    </td>
                    <td>
                      <span className="tag b">
                        {"Options sent"}
                      </span>
                    </td>
                    <td>
                      <span className="risk">
                        <i />
                        {"Low"}
                      </span>
                    </td>
                    <td>
                      <span className="wait">
                        {"0:31"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="who">
                        <div className="av" style={{ background: "linear-gradient(135deg,#5A7A3E,#3A5024)" }}>
                          {"HN"}
                        </div>
                        <b>
                          {"Hana N."}
                        </b>
                      </div>
                    </td>
                    <td>
                      <span className="req">
                        {"Spa day for two · Sun"}
                      </span>
                    </td>
                    <td>
                      <span className="ch">
                        <Icon name="msg" className="i" />
                        {"WhatsApp · JA"}
                      </span>
                    </td>
                    <td>
                      <span className="tag">
                        {"Comparing options"}
                      </span>
                    </td>
                    <td>
                      <span className="risk">
                        <i />
                        {"Low"}
                      </span>
                    </td>
                    <td>
                      <span className="wait">
                        {"0:19"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="who">
                        <div className="av" style={{ background: "linear-gradient(135deg,#8A4A4A,#5E2C2C)" }}>
                          {"RB"}
                        </div>
                        <b>
                          {"Rui B."}
                        </b>
                      </div>
                    </td>
                    <td>
                      <span className="req">
                        {"Price watch · Hotel under $150"}
                      </span>
                    </td>
                    <td>
                      <span className="ch">
                        <Icon name="monitor" className="i" />
                        {"Web · EN"}
                      </span>
                    </td>
                    <td>
                      <span className="tag b">
                        {"Watching"}
                      </span>
                    </td>
                    <td>
                      <span className="risk">
                        <i />
                        {"Low"}
                      </span>
                    </td>
                    <td>
                      <span className="wait" style={{ color: "var(--ink-4)" }}>
                        {"Idle"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="who">
                        <div className="av" style={{ background: "linear-gradient(135deg,#8A6B4A,#5E452C)" }}>
                          {"LW"}
                        </div>
                        <b>
                          {"Leo W."}
                        </b>
                      </div>
                    </td>
                    <td>
                      <span className="req">
                        {"Reschedule · Massage"}
                      </span>
                    </td>
                    <td>
                      <span className="ch">
                        <Icon name="msg" className="i" />
                        {"SMS · EN"}
                      </span>
                    </td>
                    <td>
                      <span className="tag g">
                        <Icon name="check" className="i" />
                        {"Confirmed"}
                      </span>
                    </td>
                    <td>
                      <span className="risk">
                        <i />
                        {"Low"}
                      </span>
                    </td>
                    <td>
                      <span className="wait" style={{ color: "var(--ink-4)" }}>
                        {"Done"}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <aside className="ops-det">
            <div className="det-h">
              <div className="row1">
                <div className="av">
                  {"JR"}
                </div>
                <div>
                  <b>
                    {"Jordan R."}
                  </b>
                  <small>
                    {"Web · English · 4 past bookings"}
                  </small>
                </div>
                <span className="tag gold">
                  {"Awaiting confirmation"}
                </span>
              </div>
              <div className="dtabs">
                <span className="on">
                  {"AI trace"}
                </span>
                <span>
                  {"Transcript"}
                </span>
                <span>
                  {"Customer"}
                </span>
                <span>
                  {"Audit"}
                </span>
              </div>
            </div>
            <div className="det-b">
              <div className="aisum">
                <div className="eyebrow">
                  <Icon name="sparkle" className="i" />
                  {"AI summary"}
                </div>
                {"\n              Dinner for 6 on Sat, Oct 10 at 8:30 PM, quiet, under $200, free cancellation. Party size and time changed mid-conversation. Table held at Osteria Lume; customer is on the review screen.\n            "}
              </div>
              <div className="trace">
                <div className="tr">
                  <span className="n">
                    <Icon name="sparkle" className="i" />
                  </span>
                  <div>
                    <b>
                      {"Intent detected"}
                    </b>
                    <p>
                      {"restaurant_reservation · confidence 0.97"}
                    </p>
                  </div>
                  <span className="ms">
                    {"38 ms"}
                  </span>
                </div>
                <div className="tr">
                  <span className="n">
                    <Icon name="list" className="i" />
                  </span>
                  <div>
                    <b>
                      {"Details extracted, then updated"}
                    </b>
                    <p>
                      {"party 4 → 6 · time 20:00 → 20:30 · date resolved to 2026-10-10"}
                    </p>
                  </div>
                  <span className="ms">
                    {"52 ms"}
                  </span>
                </div>
                <div className="tr">
                  <span className="n">
                    <Icon name="search" className="i" />
                  </span>
                  <div>
                    <b>
                      <code>
                        {"search_availability"}
                      </code>
                    </b>
                    <p>
                      {"4 providers · 37 venues · 3 pass all filters"}
                    </p>
                  </div>
                  <span className="ms">
                    {"412 ms"}
                  </span>
                </div>
                <div className="tr">
                  <span className="n w">
                    <Icon name="lock" className="i" />
                  </span>
                  <div>
                    <b>
                      <code>
                        {"hold_slot"}
                      </code>
                      {" · Osteria Lume, 8:30 PM"}
                    </b>
                    <p>
                      {"Held 10 min · expires 6:24 PM CT"}
                    </p>
                  </div>
                  <span className="ms">
                    {"186 ms"}
                  </span>
                </div>
                <div className="tr block">
                  <span className="n lock">
                    <Icon name="shield" className="i" />
                  </span>
                  <div>
                    <b>
                      <code>
                        {"confirm_booking"}
                      </code>
                      {" · server only"}
                    </b>
                    <div className="lockbox">
                      {"Not available to the AI. Runs only after the customer presses Confirm and the $60.00 deposit payment is verified."}
                    </div>
                  </div>
                  <span className="ms">
                    {"Waiting"}
                  </span>
                </div>
              </div>
              <div>
                <div className="eyebrow" style={{ marginBottom: "6px" }}>
                  {"Audit trail"}
                </div>
                <div className="audit">
                  <div className="r">
                    <span>
                      {"6:14:51 PM"}
                    </span>
                    {"Customer opened the review screen"}
                  </div>
                  <div className="r">
                    <span>
                      {"6:14:09 PM"}
                    </span>
                    {"Hold created by AI via hold_slot, expires 6:24 PM"}
                  </div>
                  <div className="r">
                    <span>
                      {"6:13:40 PM"}
                    </span>
                    {"Saved profile used: name, mobile (masked)"}
                  </div>
                </div>
              </div>
            </div>
            <div className="det-f">
              <span className="btn ghost">
                <Icon name="edit" className="i" />
                {"Add note"}
              </span>
              <span className="btn dark">
                <Icon name="headset" className="i" />
                {"Take over conversation"}
              </span>
            </div>
          </aside>
        </div>
      </div>
      </section>
    </div>
  );
}
