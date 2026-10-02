/** 1600×900 booking-mcp session trace: a customer conversation beside the MCP tool calls it made. */

import { bookingMcpFonts } from "@/components/capture/capture-fonts";

export function BookingMcpMark() {
  return (
    <div className="mark">
      <span className="mark-icon" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="16" rx="2.5" />
          <path d="M8 3v4M16 3v4M3 11h18M9 16l2 2 4-4" />
        </svg>
      </span>
      booking-mcp
    </div>
  );
}

type CallRow = {
  step: number;
  name: string;
  args: string;
  tag: string;
  tone: "ok" | "warn";
  ms: string;
};

// Durations are illustrative, in line with the 3 to 6 ms warm MCP requests measured on the Worker.
const CALLS: CallRow[] = [
  { step: 1, name: "get_policies", args: "{}", tag: "read-only", tone: "ok", ms: "3 ms" },
  { step: 2, name: "search_availability", args: "{ from: 2026-10-06, to: 2026-10-06 }", tag: "read-only", tone: "ok", ms: "5 ms" },
  { step: 3, name: "hold_slot", args: "{ start: 13:00Z, idempotencyKey }", tag: "held · 10 min", tone: "warn", ms: "6 ms" },
  { step: 4, name: "confirm_booking", args: "{ bookingId }", tag: "confirmed", tone: "ok", ms: "4 ms" },
];

export function BookingMcpWebCapture() {
  return (
    <div className={`bm-capture-root ${bookingMcpFonts}`}>
      <section className="capture capture--web" aria-label="booking-mcp session trace">
        <header className="topbar">
          <BookingMcpMark />
          <span className="divider" aria-hidden="true" />
          <span className="crumb">
            <strong>Northside Studio</strong> · America/New_York
          </span>
          <span className="spacer" />
          <span className="chip">POST /mcp</span>
          <span className="chip">write key · 60/min</span>
          <span className="chip chip--acc">
            <span className="dot" aria-hidden="true" />
            9 tools registered
          </span>
        </header>

        <div className="body body--session">
          <div className="panel">
            <div className="panel-head">
              <span className="panel-title">Conversation</span>
              <span className="panel-meta">assistant ↔ customer</span>
            </div>
            <div className="thread">
              <p className="msg msg--customer">
                <span className="msg-who">Customer</span>
                Can I get private yoga with Maya next Tuesday morning?
              </p>
              <div className="msg msg--assistant">
                <span className="msg-who">Assistant</span>
                Maya has 8:00, 9:00, and 10:30 AM open on Tuesday, October 6 (New York time).
                <div className="used">
                  <span>get_policies</span>
                  <span>search_availability</span>
                </div>
              </div>
              <p className="msg msg--customer">
                <span className="msg-who">Customer</span>
                9 works. Book it for Sam Rivera.
              </p>
              <div className="msg msg--assistant">
                <span className="msg-who">Assistant</span>
                I&apos;m holding this for 10 minutes. Shall I confirm?
                <dl className="readback">
                  <dt>Service</dt>
                  <dd>Private yoga · $75.00</dd>
                  <dt>When</dt>
                  <dd>Tuesday, 9:00 to 10:00 AM EDT</dd>
                  <dt>Cancel</dt>
                  <dd>Free up to 24 hours before</dd>
                </dl>
                <div className="used">
                  <span>hold_slot</span>
                </div>
              </div>
              <p className="msg msg--customer">
                <span className="msg-who">Customer</span>
                Yes, confirm it.
              </p>
            </div>
          </div>

          <div className="panel">
            <div className="panel-head">
              <span className="panel-title">Tool calls</span>
              <span className="panel-meta">stateless server, built per request</span>
            </div>
            <div className="trace">
              {CALLS.map((call) => (
                <div key={call.name} className="call">
                  <span className="call-step">{call.step}</span>
                  <span>
                    <span className="call-name">{call.name}</span>
                    <span className="call-args">{call.args}</span>
                  </span>
                  <span className={`tag tag--${call.tone}`}>{call.tag}</span>
                  <span className="call-ms">{call.ms}</span>
                </div>
              ))}
            </div>
            <div className="json">
              <span className="json-label">hold_slot → details for the read-back</span>
              {"{\n  "}
              <span className="k">&quot;status&quot;</span>: <span className="s">&quot;held&quot;</span>
              {",\n  "}
              <span className="k">&quot;details&quot;</span>
              {": {\n    "}
              <span className="k">&quot;serviceName&quot;</span>: <span className="s">&quot;Private yoga&quot;</span>
              {",\n    "}
              <span className="k">&quot;priceCents&quot;</span>: <span className="n">7500</span>
              {",\n    "}
              <span className="k">&quot;weekday&quot;</span>: <span className="s">&quot;Tuesday&quot;</span>
              {",\n    "}
              <span className="k">&quot;localStart&quot;</span>: <span className="s">&quot;2026-10-06T09:00:00-04:00&quot;</span>
              {",\n    "}
              <span className="k">&quot;localEnd&quot;</span>: <span className="s">&quot;2026-10-06T10:00:00-04:00&quot;</span>
              {",\n    "}
              <span className="k">&quot;timeZone&quot;</span>: <span className="s">&quot;America/New_York&quot;</span>
              {"\n  }\n}"}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
