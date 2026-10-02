import { bookingAgentFonts } from "@/components/capture/capture-fonts";
import { Icon } from "@/components/capture/booking-agent/icons";

/** Meridian — Review and confirm before payment. */
export function BookingAgentWebConfirmCapture() {
  return (
    <div className={`ba-capture-root ${bookingAgentFonts}`}>
      <section className="capture frame web" aria-label="Review and confirm before payment">
      <div className="ghost-app">
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
            <button className="on" type="button">
              <Icon name="chat" className="i" />
              {"Assistant"}
            </button>
            <button type="button">
              <Icon name="cal" className="i" />
              {"Bookings"}
            </button>
            <button type="button">
              <Icon name="eye" className="i" />
              {"Watches"}
            </button>
            <button type="button">
              <Icon name="user" className="i" />
              {"Profile"}
            </button>
          </nav>
        </aside>
        <div className="ghost-chat">
          <div className="gb" style={{ width: "58%", alignSelf: "flex-end", background: "#2A2C31" }} />
          <div className="gb" style={{ width: "70%", height: "90px" }} />
          <div className="gb" style={{ width: "30%", alignSelf: "flex-end", background: "#2A2C31" }} />
          <div style={{ display: "flex", gap: "12px" }}>
            <div className="gb" style={{ flex: "1", height: "220px" }} />
            <div className="gb" style={{ flex: "1", height: "220px" }} />
            <div className="gb" style={{ flex: "1", height: "220px" }} />
          </div>
          <div className="gb" style={{ width: "40%", alignSelf: "flex-end", background: "#2A2C31" }} />
        </div>
      </div>
      <div className="scrim" />
      <div className="modal">
        <div className="m-left">
          <div className="ph ph-lume" />
          <div className="hold">
            <span className="ring" />
            {"Table held for you · "}
            <b>
              {"9:41"}
            </b>
          </div>
          <div className="content">
            <div className="eyebrow" style={{ color: "rgba(255,255,255,.7)" }}>
              {"Your selection"}
            </div>
            <h2 style={{ marginTop: "10px" }}>
              {"Osteria Lume"}
            </h2>
            <div className="loc">
              <Icon name="pin" className="i" />
              {"Market District · 1.2 mi away"}
            </div>
            <div className="tags">
              <span className="tag">
                {"Italian"}
              </span>
              <span className="tag">
                <Icon name="quiet" className="i" />
                {"Quiet room"}
              </span>
              <span className="tag">
                <Icon name="star" className="i" />
                {"4.8"}
              </span>
            </div>
            <div className="summary">
              <div>
                <small>
                  {"Date"}
                </small>
                <b>
                  {"Sat, Oct 10"}
                </b>
              </div>
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
            </div>
          </div>
        </div>
        <div className="m-right">
          <div className="m-head">
            <div>
              <h3>
                {"Review and confirm"}
              </h3>
              <p>
                {"Check everything below. Nothing is booked until you press confirm."}
              </p>
            </div>
            <span className="x">
              <Icon name="x" className="i" />
            </span>
          </div>
          <div className="sec">
            <div className="sec-h">
              <span className="eyebrow">
                {"Reservation"}
              </span>
              <button type="button">
                {"Edit details"}
              </button>
            </div>
            <div className="grid3">
              <div>
                <small>
                  {"Date"}
                </small>
                <b>
                  {"Saturday, Oct 10"}
                </b>
              </div>
              <div>
                <small>
                  {"Time"}
                </small>
                <b>
                  {"8:30 PM CT"}
                </b>
              </div>
              <div>
                <small>
                  {"Party"}
                </small>
                <b>
                  {"6 guests"}
                </b>
              </div>
              <div>
                <small>
                  {"Seating"}
                </small>
                <b>
                  {"Quiet room"}
                </b>
              </div>
              <div>
                <small>
                  {"Name on booking"}
                </small>
                <b>
                  {"Jordan Rivera"}
                </b>
              </div>
              <div>
                <small>
                  {"Notes"}
                </small>
                <b>
                  {"One no-shellfish guest"}
                </b>
              </div>
            </div>
          </div>
          <div className="sec">
            <div className="sec-h">
              <span className="eyebrow">
                {"Cancellation terms"}
              </span>
              <button type="button">
                {"Venue policy"}
              </button>
            </div>
            <div className="cancel">
              <div className="tl">
                <span className="bar" />
                <div className="pt g">
                  <b>
                    {"Now"}
                  </b>
                  <small>
                    {"Free to change"}
                    <br />
                    {"or cancel"}
                  </small>
                </div>
                <div className="pt w">
                  <b>
                    {"Fri, Oct 9 · 6:00 PM"}
                  </b>
                  <small>
                    {"Free cancellation ends"}
                  </small>
                </div>
                <div className="pt">
                  <b>
                    {"Sat, Oct 10 · 8:30 PM"}
                  </b>
                  <small>
                    {"Late cancel or no-show"}
                    <br />
                    {"keeps the $60 deposit"}
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div className="sec">
            <div className="sec-h">
              <span className="eyebrow">
                {"Payment"}
              </span>
            </div>
            <div className="pay">
              <div className="lines">
                <div className="ln">
                  <span>
                    {"Deposit · 6 guests × $10"}
                  </span>
                  <b>
                    {"$60.00"}
                  </b>
                </div>
                <div className="ln">
                  <span>
                    {"Booking fee"}
                  </span>
                  <b>
                    {"$0.00"}
                  </b>
                </div>
                <div className="ln tot">
                  <span>
                    {"Due today"}
                  </span>
                  <b className="num">
                    {"$60.00"}
                  </b>
                </div>
                <div className="ln note">
                  <span>
                    {"Credited to your bill. Estimated meal ~$186, paid at the venue."}
                  </span>
                </div>
              </div>
              <div className="method">
                <div className="card-row">
                  <span className="cc">
                    {"VISA"}
                  </span>
                  <div>
                    <b>
                      {"Visa •••• 4242"}
                    </b>
                    <small>
                      {"Expires 08/29"}
                    </small>
                  </div>
                  <span className="chg">
                    {"Change"}
                  </span>
                </div>
                <div className="prof">
                  <Icon name="user" className="i" />
                  <span>
                    {"Mobile from profile · •••-0142"}
                  </span>
                </div>
                <div className="prof">
                  <Icon name="bell" className="i" />
                  <span>
                    {"Email and SMS confirmation"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="consent">
            <span className="cb">
              <Icon name="check" className="i" />
            </span>
            {"I agree to Osteria Lume's cancellation terms and authorize a $60.00 refundable deposit."}
          </div>
          <div className="m-actions">
            <span className="btn ghost">
              <Icon name="cl" className="i" />
              {"Back to options"}
            </span>
            <span className="btn pri">
              <Icon name="lock" className="i" />
              {"Confirm and pay $60.00"}
            </span>
          </div>
          <div className="secure">
            <Icon name="shield" className="i" />
            {"Payment is processed securely. Meridian never sees your full card number."}
          </div>
        </div>
      </div>
      </section>
    </div>
  );
}
