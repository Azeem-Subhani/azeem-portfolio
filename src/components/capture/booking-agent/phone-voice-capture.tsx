import { bookingAgentFonts } from "@/components/capture/capture-fonts";
import { Icon } from "@/components/capture/booking-agent/icons";

/** Meridian — Voice booking with live understanding. */
export function BookingAgentPhoneVoiceCapture() {
  return (
    <div className={`ba-capture-root ${bookingAgentFonts}`}>
      <section className="capture frame phone" aria-label="Voice booking with live understanding">
      <div className="p voice">
        <div className="sb">
          <span>
            {"6:11"}
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
        <div className="v-top">
          <span className="ib">
            <Icon name="cd" className="i" style={{ width: "18px", height: "18px" }} />
          </span>
          <span className="v-lang">
            <Icon name="globe" className="i" />
            {"English · auto-detect"}
          </span>
          <span className="ib">
            <Icon name="more" className="i" style={{ width: "18px", height: "18px" }} />
          </span>
        </div>
        <div className="v-orb">
          <div className="ring3" />
          <div className="halo" />
          <div className="ring2" />
          <div className="core" />
        </div>
        <div className="v-status">
          <span className="wave">
            <i style={{ height: "6px" }} />
            <i style={{ height: "12px" }} />
            <i style={{ height: "16px" }} />
            <i style={{ height: "9px" }} />
            <i style={{ height: "13px" }} />
            <i style={{ height: "5px" }} />
          </span>
          {"Listening"}
        </div>
        <div className="v-said">
          {"“Actually, make it six people… and 8:30 "}
          <span>
            {"would be better”"}
          </span>
        </div>
        <div className="v-chips">
          <span className="chip">
            <Icon name="cal" className="i" />
            {"Sat, Oct 10"}
          </span>
          <span className="chip diff">
            <Icon name="users" className="i" />
            <s>
              {"4"}
            </s>
            {" 6 guests"}
          </span>
          <span className="chip diff">
            <Icon name="clock" className="i" />
            <s>
              {"8:00"}
            </s>
            {" 8:30 PM"}
          </span>
          <span className="chip">
            <Icon name="quiet" className="i" />
            {"Quiet"}
          </span>
        </div>
        <div className="v-agent">
          <div className="orb" />
          <div>
            {"Updating your search. I'll read you the top three, then send them to your screen so you can compare."}
          </div>
        </div>
        <div className="v-ctrl">
          <div>
            <span className="c">
              <Icon name="keyboard" className="i" />
            </span>
            <label>
              {"Type"}
            </label>
          </div>
          <div>
            <span className="c end">
              <Icon name="x" className="i" />
            </span>
            <label>
              {"End"}
            </label>
          </div>
          <div>
            <span className="c">
              <Icon name="mic" className="i" />
            </span>
            <label>
              {"Mute"}
            </label>
          </div>
        </div>
        <div className="home-ind" />
      </div>
      </section>
    </div>
  );
}
