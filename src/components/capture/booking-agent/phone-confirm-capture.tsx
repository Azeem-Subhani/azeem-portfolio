import { bookingAgentFonts } from "@/components/capture/capture-fonts";
import { Icon } from "@/components/capture/booking-agent/icons";

/** Meridian — Final review sheet with explicit confirm. */
export function BookingAgentPhoneConfirmCapture() {
  return (
    <div className={`ba-capture-root ${bookingAgentFonts}`}>
      <section className="capture frame phone" aria-label="Final review sheet with explicit confirm">
      <div className="p">
        <div className="sb">
          <span>
            {"6:15"}
          </span>
          <span className="ic">
            <span className="sig">
              <i style={{ height: "4px" }} />
              <i style={{ height: "6px" }} />
              <i style={{ height: "8px" }} />
              <i style={{ height: "10px" }} />
            </span>
            <span className="bat" />
          </span>
        </div>
        <div className="p-top">
          <span className="ib">
            <Icon name="cl" className="i" style={{ width: "20px", height: "20px" }} />
          </span>
          <div className="orb" style={{ width: "32px", height: "32px" }} />
          <div className="t">
            <b>
              {"Meridian"}
            </b>
            <small>
              <span className="dot" />
              {"Dinner Saturday for 6"}
            </small>
          </div>
        </div>
        <div className="p-thread" style={{ bottom: "630px", paddingBottom: "6px" }}>
          <div className="u">
            {"Hold Osteria Lume at 8:30."}
          </div>
        </div>
        <div className="p-dim" />
        <div className="sheet">
          <div className="grab" />
          <div className="sh-h">
            <h3>
              {"Review and confirm"}
            </h3>
            <span className="p-hold">
              <Icon name="clock" className="i" />
              {"Held · 9:41"}
            </span>
          </div>
          <div className="vrow">
            <div className="ph ph-lume" />
            <div>
              <b>
                {"Osteria Lume"}
              </b>
              <small>
                {"Italian · Market District · Quiet room"}
              </small>
            </div>
          </div>
          <div className="dl">
            <div className="r">
              <span>
                <Icon name="cal" className="i" />
                {"Date"}
              </span>
              <b>
                {"Saturday, Oct 10"}
              </b>
            </div>
            <div className="r">
              <span>
                <Icon name="clock" className="i" />
                {"Time"}
              </span>
              <b>
                {"8:30 PM CT"}
              </b>
            </div>
            <div className="r">
              <span>
                <Icon name="users" className="i" />
                {"Guests"}
              </span>
              <b>
                {"6"}
              </b>
            </div>
            <div className="r">
              <span>
                <Icon name="dollar" className="i" />
                {"Estimated meal"}
              </span>
              <b>
                {"~$186, paid at venue"}
              </b>
            </div>
          </div>
          <div className="p-cancel">
            <Icon name="shield" className="i" />
            <div>
              <b>
                {"Free cancellation until Fri, Oct 9 · 6:00 PM"}
              </b>
              <p>
                {"After that, a late cancel or no-show keeps the $60 deposit. Otherwise it's credited to your bill."}
              </p>
            </div>
          </div>
          <div className="p-tot">
            <div>
              <small>
                {"Refundable deposit due today"}
              </small>
              <b className="num">
                {"$60.00"}
              </b>
            </div>
            <div className="card-row" style={{ gap: "8px" }}>
              <span className="cc" style={{ width: "34px", height: "22px", fontSize: "7.5px" }}>
                {"VISA"}
              </span>
              <b>
                {"•••• 4242"}
              </b>
            </div>
          </div>
          <div className="p-cta">
            <span className="btn pri">
              <Icon name="lock" className="i" />
              {"Confirm and pay $60.00"}
            </span>
            <span className="alt">
              {"Change something"}
            </span>
            <div className="fine">
              <Icon name="shield" className="i" />
              {"Nothing is booked until you confirm."}
            </div>
          </div>
        </div>
        <div className="home-ind" />
      </div>
      </section>
    </div>
  );
}
