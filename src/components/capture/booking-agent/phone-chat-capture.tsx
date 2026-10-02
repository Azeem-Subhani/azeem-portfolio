import { bookingAgentFonts } from "@/components/capture/capture-fonts";
import { Icon } from "@/components/capture/booking-agent/icons";

/** Meridian — Chat with live updates and swipeable options. */
export function BookingAgentPhoneChatCapture() {
  return (
    <div className={`ba-capture-root ${bookingAgentFonts}`}>
      <section className="capture frame phone" aria-label="Chat with live updates and swipeable options">
      <div className="p">
        <div className="sb">
          <span>
            {"6:14"}
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
          <div className="r">
            <span className="ib">
              <Icon name="phone" className="i" style={{ width: "19px", height: "19px" }} />
            </span>
            <span className="ib">
              <Icon name="more" className="i" style={{ width: "19px", height: "19px" }} />
            </span>
          </div>
        </div>
        <div className="p-thread">
          <div className="u">
            {"Somewhere nice and quiet for dinner this Saturday around 8. Under $200, free cancellation."}
          </div>
          <div className="a">
            <div className="orb" />
            <div className="body">
              <p>
                {"Got it: "}
                <b>
                  {"Sat, Oct 10 around 8:00 PM"}
                </b>
                {". How many people?"}
              </p>
              <div className="understood" style={{ gap: "5px" }}>
                <span className="chip">
                  <Icon name="cal" className="i" />
                  {"Sat, Oct 10"}
                </span>
                <span className="chip">
                  <Icon name="quiet" className="i" />
                  {"Quiet"}
                </span>
                <span className="chip">
                  <Icon name="dollar" className="i" />
                  {"Under $200"}
                </span>
                <span className="chip miss">
                  <Icon name="users" className="i" />
                  {"Party size?"}
                </span>
              </div>
            </div>
          </div>
          <div className="u">
            {"4. Actually make that 6, and 8:30 is better."}
          </div>
          <div className="a">
            <div className="orb" />
            <div className="body">
              <p>
                {"Updated, everything else kept. 3 places fit:"}
              </p>
              <div className="understood" style={{ gap: "5px" }}>
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
              </div>
              <div className="hscroll">
                <div className="pc best">
                  <span className="badge">
                    <Icon name="star" className="i" />
                    {"Best match"}
                  </span>
                  <div className="ph ph-lume" />
                  <div className="in">
                    <h4>
                      {"Osteria Lume"}
                    </h4>
                    <div className="where">
                      {"Italian · 1.2 mi · ★ 4.8"}
                    </div>
                    <div className="tags">
                      <span className="tag g">
                        {"Quiet room"}
                      </span>
                      <span className="tag g">
                        {"Free cancel"}
                      </span>
                    </div>
                    <div className="row">
                      <span className="price">
                        {"~$186 "}
                        <small>
                          {"for 6"}
                        </small>
                      </span>
                      <span className="slot on">
                        {"8:30"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pc">
                  <div className="ph ph-saffron" />
                  <div className="in">
                    <h4>
                      {"Saffron House"}
                    </h4>
                    <div className="where">
                      {"Modern Indian · 2.4 mi · ★ 4.7"}
                    </div>
                    <div className="tags">
                      <span className="tag g">
                        {"Quiet booth"}
                      </span>
                      <span className="tag g">
                        {"Free cancel"}
                      </span>
                    </div>
                    <div className="row">
                      <span className="price">
                        {"~$174 "}
                        <small>
                          {"for 6"}
                        </small>
                      </span>
                      <span className="slot">
                        {"8:30"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-comp">
          <div className="p-sugg">
            <span className="chip">
              <Icon name="lock" className="i" />
              {"Hold Osteria Lume"}
            </span>
            <span className="chip">
              {"Compare all 3"}
            </span>
            <span className="chip">
              {"Closer"}
            </span>
          </div>
          <div className="p-in">
            <span className="ph-text">
              {"Message Meridian"}
            </span>
            <span className="ibtn">
              <Icon name="mic" className="i" style={{ width: "19px", height: "19px" }} />
            </span>
            <span className="send">
              <Icon name="up" className="i" />
            </span>
          </div>
        </div>
        <div className="home-ind" />
      </div>
      </section>
    </div>
  );
}
