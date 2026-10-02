/** 1600×900 booking-mcp guardrails: tools listed per key scope, the overlap race, and the audit log. */

import { bookingMcpFonts } from "@/components/capture/capture-fonts";
import { BookingMcpHead } from "@/components/capture/booking-mcp/web-capture";

const TOOLS: [name: string, read: boolean][] = [
  ["get_policies", true],
  ["list_services", true],
  ["search_availability", true],
  ["get_booking", true],
  ["find_bookings_by_email", false],
  ["hold_slot", false],
  ["confirm_booking", false],
  ["reschedule_booking", false],
  ["cancel_booking", false],
];

type AuditRow = [time: string, key: string, tool: string, inputs: string, result: string, ms: string];

// Illustrative rows in the shape audit_log stores. Customer fields are redacted before insert.
const AUDIT: AuditRow[] = [
  ["09:41:34", "write", "confirm_booking", "bookingId 7f3c…", "ok", "4"],
  ["09:41:20", "write", "hold_slot", "customerEmail [redacted]", "ok", "6"],
  ["09:41:20", "write", "hold_slot", "customerEmail [redacted]", "slot_unavailable", "5"],
  ["09:41:03", "write", "search_availability", "from 2026-10-06", "ok", "5"],
  ["09:38:51", "read", "hold_slot", "customerEmail [redacted]", "scope_denied", "0"],
  ["09:36:12", "write", "confirm_booking", "bookingId 2a91…", "hold_expired", "3"],
  ["09:35:40", "read", "list_services", "", "ok", "3"],
  ["09:35:39", "read", "get_policies", "", "ok", "3"],
];

export function BookingMcpWebGuardrailsCapture() {
  return (
    <div className={`bm-capture-root ${bookingMcpFonts}`}>
      <section className="capture capture--web" aria-label="booking-mcp guardrails">
        <BookingMcpHead
          sub="Guardrails"
          meta={["audit kept 30 days", "sandbox resets 08:00 UTC"]}
        />

        <div className="split split--guard">
          <div className="col">
            <p className="label">tools/list by key</p>
            <table className="tbl">
              <thead>
                <tr>
                  <th>Tool</th>
                  <th className="c">Read</th>
                  <th className="c">Write</th>
                </tr>
              </thead>
              <tbody>
                {TOOLS.map(([name, read]) => (
                  <tr key={name}>
                    <td className={read ? undefined : "dim"}>{name}</td>
                    <td className={read ? "c" : "c dim"}>{read ? "✓" : "—"}</td>
                    <td className="c">✓</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="race">
              <p className="label">Two sessions, one slot</p>
              <pre className="log">
                <b>A</b>  hold_slot 13:00Z      held{"\n"}
                <b>B</b>  hold_slot 13:00Z      waiting on lock{"\n"}
                <b>A</b>  COMMIT{"\n"}
                <b>B</b>  <span className="bad">23P01 bookings_no_overlap → slot_unavailable</span>
              </pre>
            </div>
          </div>

          <div className="col">
            <p className="label">audit_log, today</p>
            <table className="tbl">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Key</th>
                  <th>Tool</th>
                  <th>Inputs</th>
                  <th>Result</th>
                  <th className="r">ms</th>
                </tr>
              </thead>
              <tbody>
                {AUDIT.map(([time, key, tool, inputs, result, ms], index) => (
                  <tr key={index}>
                    <td className="dim">{time}</td>
                    <td>{key}</td>
                    <td>{tool}</td>
                    <td className="dim">{inputs}</td>
                    <td className={result === "ok" ? undefined : "bad"}>{result}</td>
                    <td className="r dim">{ms}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="rows">({AUDIT.length} rows)</p>
          </div>
        </div>
      </section>
    </div>
  );
}
