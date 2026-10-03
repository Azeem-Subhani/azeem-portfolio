import { bookingAgentFonts } from "@/components/capture/capture-fonts";
import { Icon } from "@/components/capture/booking-agent/icons";

/** Meridian — Conversational search and option comparison. */
export function BookingAgentWebChatCapture() {
  return (
    <div className={`ba-capture-root ${bookingAgentFonts}`}>
      <section className="capture frame web" aria-label="Conversational search and option comparison">
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
            <button className="on" type="button">
              <Icon name="chat" className="i" />
              {"Assistant"}
            </button>
            <button type="button">
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
            <button style={{ background: "#EFEDE7", color: "var(--ink)" }} type="button">
              {"Dinner Saturday for 6"}
              <small>
                {"Now · Comparing options"}
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
        <div className="chat-main">
          <div className="chat-col">
            <div className="top">
              <div data-h="1">
                {"Dinner Saturday for 6"}
              </div>
              <span className="sub">
                {"Restaurant reservation"}
              </span>
              <div className="right">
                <span className="btn sm ghost">
                  <Icon name="mic" className="i" />
                  {"Voice"}
                </span>
                <span className="btn sm ghost">
                  <Icon name="globe" className="i" />
                  {"English"}
                </span>
              </div>
            </div>
            <div className="thread">
              <div className="thread-in">
                <div className="u">
                  {"I need somewhere nice for dinner this Saturday around 8, preferably quiet. I don't want to spend more than $200, and I need free cancellation."}
                </div>
                <div className="a">
                  <div className="orb" />
                  <div className="body">
                    <p>
                      {"Happy to help. I have "}
                      <b>
                        {"Saturday, Oct 10 around 8:00 PM"}
                      </b>
                      {", somewhere quiet, under $200 with free cancellation. How many people will be joining?"}
                    </p>
                    <div className="understood">
                      <span className="lab">
                        {"Understood"}
                      </span>
                      <span className="chip">
                        <Icon name="cal" className="i" />
                        {"Sat, Oct 10"}
                      </span>
                      <span className="chip">
                        <Icon name="clock" className="i" />
                        {"About 8:00 PM"}
                      </span>
                      <span className="chip">
                        <Icon name="quiet" className="i" />
                        {"Quiet"}
                      </span>
                      <span className="chip">
                        <Icon name="dollar" className="i" />
                        {"Under $200"}
                      </span>
                      <span className="chip">
                        <Icon name="shield" className="i" />
                        {"Free cancellation"}
                      </span>
                      <span className="chip miss">
                        <Icon name="users" className="i" />
                        {"Party size?"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="u">
                  {"Table for 4."}
                </div>
                <div className="u">
                  {"Actually, make that 6 people. And 8:30 would be better."}
                </div>
                <div className="a">
                  <div className="orb" />
                  <div className="body">
                    <p>
                      {"Updated, no need to start over. I kept quiet, under $200, and free cancellation. Three places fit everything:"}
                    </p>
                    <div className="understood">
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
                      <span className="meta-line" style={{ marginLeft: "6px" }}>
                        <Icon name="search" className="i" />
                        {"4 providers · 37 venues checked · 3 matches"}
                      </span>
                    </div>
                    <div className="opts">
                      <div className="opt best">
                        <span className="badge">
                          <Icon name="star" className="i" />
                          {"Best match"}
                        </span>
                        <span className="rate">
                          <Icon name="star" className="i" />
                          {"4.8"}
                        </span>
                        <div className="ph ph-lume" />
                        <div className="in">
                          <h4>
                            {"Osteria Lume"}
                          </h4>
                          <div className="where">
                            {"Italian · Market District · 1.2 mi"}
                          </div>
                          <div className="tags">
                            <span className="tag g">
                              {"Quiet room"}
                            </span>
                            <span className="tag g">
                              {"Free cancel · Fri 6 PM"}
                            </span>
                          </div>
                          <div className="row">
                            <span className="price">
                              {"~$186 "}
                              <small>
                                {"for 6"}
                              </small>
                            </span>
                            <span className="slots">
                              <span className="slot">
                                {"8:15"}
                              </span>
                              <span className="slot on">
                                {"8:30"}
                              </span>
                              <span className="slot">
                                {"8:45"}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="opt">
                        <span className="rate">
                          <Icon name="star" className="i" />
                          {"4.7"}
                        </span>
                        <div className="ph ph-saffron" />
                        <div className="in">
                          <h4>
                            {"Saffron House"}
                          </h4>
                          <div className="where">
                            {"Modern Indian · Riverside · 2.4 mi"}
                          </div>
                          <div className="tags">
                            <span className="tag g">
                              {"Quiet booth"}
                            </span>
                            <span className="tag g">
                              {"Free cancel · Sat noon"}
                            </span>
                          </div>
                          <div className="row">
                            <span className="price">
                              {"~$174 "}
                              <small>
                                {"for 6"}
                              </small>
                            </span>
                            <span className="slots">
                              <span className="slot">
                                {"8:00"}
                              </span>
                              <span className="slot">
                                {"8:30"}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="opt">
                        <span className="rate">
                          <Icon name="star" className="i" />
                          {"4.6"}
                        </span>
                        <div className="ph ph-juniper" />
                        <div className="in">
                          <h4>
                            {"Juniper Table"}
                          </h4>
                          <div className="where">
                            {"New American · Old Town · 0.8 mi"}
                          </div>
                          <div className="tags">
                            <span className="tag g">
                              {"Private nook"}
                            </span>
                            <span className="tag g">
                              {"Free cancel · Fri 8 PM"}
                            </span>
                          </div>
                          <div className="row">
                            <span className="price">
                              {"~$198 "}
                              <small>
                                {"for 6"}
                              </small>
                            </span>
                            <span className="slots">
                              <span className="slot">
                                {"8:30"}
                              </span>
                              <span className="slot">
                                {"9:00"}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="composer-wrap">
              <div className="composer-in">
                <div className="sugg">
                  <span className="chip">
                    <Icon name="lock" className="i" />
                    {"Hold Osteria Lume at 8:30"}
                  </span>
                  <span className="chip">
                    <Icon name="list" className="i" />
                    {"Compare side by side"}
                  </span>
                  <span className="chip">
                    <Icon name="pin" className="i" />
                    {"Something closer"}
                  </span>
                </div>
                <div className="composer">
                  <div className="ph-text">
                    {"Ask for changes, or pick an option…"}
                  </div>
                  <div className="bar">
                    <span className="ibtn b">
                      <Icon name="plus" className="i" />
                    </span>
                    <span className="chip" style={{ height: "30px" }}>
                      <Icon name="user" className="i" />
                      {"Using saved profile"}
                    </span>
                    <span style={{ marginLeft: "auto" }} className="ibtn">
                      <Icon name="mic" className="i" />
                    </span>
                    <span className="send">
                      <Icon name="up" className="i" />
                    </span>
                  </div>
                </div>
                <div className="fine">
                  <Icon name="shield" className="i" />
                  {"Meridian can search and hold. Nothing is booked or charged until you confirm."}
                </div>
              </div>
            </div>
          </div>
          <aside className="ctx">
            <div className="ctx-h">
              <h3>
                {"Request details"}
              </h3>
              <span className="live">
                <span className="dot" />
                {"Updating live"}
              </span>
            </div>
            <div className="ctx-b">
              <div className="intent">
                <div className="ic">
                  <Icon name="fork" className="i" style={{ width: "18px", height: "18px" }} />
                </div>
                <div>
                  <b>
                    {"Restaurant reservation"}
                  </b>
                  <small>
                    {"Detected from your first message"}
                  </small>
                </div>
                <span className="conf">
                  {"97%"}
                </span>
              </div>
              <div>
                <div className="eyebrow" style={{ marginBottom: "4px" }}>
                  {"What I understood"}
                </div>
                <div className="fields">
                  <div className="f">
                    <span className="k">
                      {"Date"}
                    </span>
                    <span className="v">
                      {"Sat, Oct 10"}
                      <small>
                        {"From “this Saturday”"}
                      </small>
                    </span>
                  </div>
                  <div className="f">
                    <span className="k">
                      {"Time"}
                    </span>
                    <span className="v">
                      <s>
                        {"8:00 PM"}
                      </s>
                      <span className="new">
                        {"8:30 PM"}
                      </span>
                      <small>
                        {"Changed in your last message"}
                      </small>
                    </span>
                  </div>
                  <div className="f">
                    <span className="k">
                      {"Party"}
                    </span>
                    <span className="v">
                      <s>
                        {"4"}
                      </s>
                      <span className="new">
                        {"6 guests"}
                      </span>
                    </span>
                  </div>
                  <div className="f">
                    <span className="k">
                      {"Budget"}
                    </span>
                    <span className="v">
                      {"Up to $200 total"}
                    </span>
                  </div>
                  <div className="f">
                    <span className="k">
                      {"Must have"}
                    </span>
                    <span className="v">
                      {"Free cancellation"}
                    </span>
                  </div>
                  <div className="f">
                    <span className="k">
                      {"Prefers"}
                    </span>
                    <span className="v">
                      {"Quiet setting"}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className="eyebrow" style={{ marginBottom: "8px" }}>
                  {"Progress"}
                </div>
                <div className="steps">
                  <div className="st done">
                    <span className="n">
                      <Icon name="check" className="i" />
                    </span>
                    {"Understand request"}
                  </div>
                  <div className="st done">
                    <span className="n">
                      <Icon name="check" className="i" />
                    </span>
                    {"Search availability"}
                    <span className="t">
                      {"412 ms"}
                    </span>
                  </div>
                  <div className="st cur">
                    <span className="n" />
                    {"Compare options"}
                  </div>
                  <div className="st">
                    <span className="n" />
                    {"Review details"}
                  </div>
                  <div className="st">
                    <span className="n" />
                    {"Pay deposit"}
                  </div>
                  <div className="st">
                    <span className="n" />
                    {"Confirmed"}
                  </div>
                </div>
              </div>
              <div className="guard">
                <Icon name="shield" className="i" />
                <div>
                  <b>
                    {"You stay in control"}
                  </b>
                  <p>
                    {"Before anything is booked, you'll see the final details, price, and cancellation terms, and confirm yourself."}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      </section>
    </div>
  );
}
