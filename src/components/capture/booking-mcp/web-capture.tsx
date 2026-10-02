/** 1600×900 booking-mcp session: the conversation and its tool calls on one timeline, plus the hold_slot response. */

import { bookingMcpFonts } from "@/components/capture/capture-fonts";

type Line =
  | { kind: "say"; t: string; who: "Customer" | "Assistant"; text: string }
  | { kind: "call"; t: string; name: string; args: string; ms: number; selected?: boolean };

// A fictional session. Durations are illustrative, inside the 3 to 6 ms measured on the Worker.
const LINES: Line[] = [
  { kind: "say", t: "09:41:02", who: "Customer", text: "Can I get private yoga with Maya next Tuesday morning?" },
  { kind: "call", t: "09:41:03", name: "get_policies", args: "", ms: 3 },
  { kind: "call", t: "09:41:03", name: "search_availability", args: "2026-10-06 → 2026-10-06", ms: 5 },
  { kind: "say", t: "09:41:04", who: "Assistant", text: "Maya has 8:00, 9:00 and 10:30 open on Tuesday, October 6, New York time." },
  { kind: "say", t: "09:41:19", who: "Customer", text: "9 works. It's for Sam Rivera." },
  { kind: "call", t: "09:41:20", name: "hold_slot", args: "13:00Z, key 6f1e…", ms: 6, selected: true },
  { kind: "say", t: "09:41:21", who: "Assistant", text: "Holding private yoga with Maya, Tuesday 9 to 10 am, $75, for ten minutes. Shall I confirm?" },
  { kind: "say", t: "09:41:33", who: "Customer", text: "Yes, please." },
  { kind: "call", t: "09:41:34", name: "confirm_booking", args: "7f3c…", ms: 4 },
  { kind: "say", t: "09:41:34", who: "Assistant", text: "You're booked. Free cancellation until Monday at 9 am." },
];

// result.structuredContent for the selected hold_slot call, in the shape the server returns.
const RESPONSE: [indent: number, key: string | null, value: string][] = [
  [0, null, "{"],
  [1, "booking", "{"],
  [2, "id", "\"7f3c9a2e-…\","],
  [2, "status", "\"held\","],
  [2, "start", "\"2026-10-06T13:00:00.000Z\","],
  [2, "end", "\"2026-10-06T14:00:00.000Z\","],
  [2, "holdExpiresAt", "\"2026-10-02T13:51:20.000Z\","],
  [2, "details", "{"],
  [3, "serviceName", "\"Private yoga\","],
  [3, "priceCents", "7500,"],
  [3, "weekday", "\"Tuesday\","],
  [3, "localStart", "\"2026-10-06T09:00:00-04:00\","],
  [3, "localEnd", "\"2026-10-06T10:00:00-04:00\","],
  [3, "timeZone", "\"America/New_York\""],
  [2, null, "}"],
  [1, null, "}"],
  [0, null, "}"],
];

// Values the assistant reads back to the customer.
const READ_BACK = new Set(["serviceName", "priceCents", "weekday", "localStart", "localEnd"]);

export function BookingMcpHead({ sub, meta }: { sub: string; meta: string[] }) {
  return (
    <header className="head">
      <span className="tenant">Northside Studio</span>
      <span className="sub">{sub}</span>
      <span className="head-meta">
        {meta.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </span>
    </header>
  );
}

export function BookingMcpWebCapture() {
  return (
    <div className={`bm-capture-root ${bookingMcpFonts}`}>
      <section className="capture capture--web" aria-label="booking-mcp session">
        <BookingMcpHead
          sub="Session 3f2a · Tuesday booking"
          meta={["POST /mcp", "write key", "4 calls", "18 ms"]}
        />

        <div className="split split--session">
          <div className="col">
            <p className="label">Transcript</p>
            {LINES.map((line, index) =>
              line.kind === "say" ? (
                <div key={index} className="line">
                  <span className="t">{line.t}</span>
                  <span className={line.who === "Assistant" ? "who who--assistant" : "who"}>
                    {line.who}
                  </span>
                  <span className="say">{line.text}</span>
                  <span />
                </div>
              ) : (
                <div
                  key={index}
                  className={line.selected ? "line line--call line--selected" : "line line--call"}
                >
                  <span className="t">{line.t}</span>
                  <span />
                  <span className="say">
                    <b>{line.name}</b>
                    {line.args ? <i>{`  ${line.args}`}</i> : null}
                  </span>
                  <span className="ms">{line.ms} ms</span>
                </div>
              ),
            )}
          </div>

          <div className="col">
            <div className="call-title">
              <h3>hold_slot</h3>
              <span>id 7 · 6 ms · ok</span>
            </div>
            <div className="tabs">
              <span>Request</span>
              <span className="on">Response</span>
            </div>
            <div className="code">
              {RESPONSE.map(([indent, key, value], index) => (
                <div key={index}>
                  {"  ".repeat(indent)}
                  {key ? (
                    <>
                      <span className="k">&quot;{key}&quot;</span>
                      {": "}
                    </>
                  ) : null}
                  <span className={key && READ_BACK.has(key) ? "v" : undefined}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
