/** 1600×900 booking-mcp guardrails: tools per key scope, the overlap race, and the redacted audit log. */

import { bookingMcpFonts } from "@/components/capture/capture-fonts";
import { BookingMcpMark } from "@/components/capture/booking-mcp/web-capture";

const READ_TOOLS = ["get_policies", "list_services", "search_availability", "get_booking"];
const WRITE_TOOLS = [
  "find_bookings_by_email",
  "hold_slot",
  "confirm_booking",
  "reschedule_booking",
  "cancel_booking",
];

type AuditRow = {
  time: string;
  scope: string;
  tool: string;
  inputs: string;
  code: string;
  tone: "ok" | "warn" | "err";
  ms: string;
};

// Illustrative rows in the shape the audit log stores: customer fields are redacted before insert.
const AUDIT: AuditRow[] = [
  { time: "11:04:12", scope: "write", tool: "confirm_booking", inputs: "bookingId: 7f3c…", code: "ok", tone: "ok", ms: "4" },
  { time: "11:03:58", scope: "write", tool: "hold_slot", inputs: "customerEmail: [redacted]", code: "ok", tone: "ok", ms: "6" },
  { time: "11:03:57", scope: "write", tool: "hold_slot", inputs: "customerEmail: [redacted]", code: "slot_unavailable", tone: "warn", ms: "5" },
  { time: "11:02:40", scope: "read", tool: "hold_slot", inputs: "argument names only", code: "scope_denied", tone: "err", ms: "0" },
  { time: "11:02:31", scope: "read", tool: "search_availability", inputs: "from: 2026-10-06", code: "ok", tone: "ok", ms: "5" },
  { time: "11:01:09", scope: "write", tool: "confirm_booking", inputs: "bookingId: 2a91…", code: "hold_expired", tone: "warn", ms: "3" },
  { time: "11:00:44", scope: "read", tool: "get_policies", inputs: "{}", code: "ok", tone: "ok", ms: "3" },
];

function Inputs({ value }: { value: string }) {
  if (!value.includes("[redacted]")) return <>{value}</>;
  const [name] = value.split(":");
  return (
    <>
      {name}: <span className="redacted">[redacted]</span>
    </>
  );
}

export function BookingMcpWebGuardrailsCapture() {
  return (
    <div className={`bm-capture-root ${bookingMcpFonts}`}>
      <section className="capture capture--web" aria-label="booking-mcp guardrails">
        <header className="topbar">
          <BookingMcpMark />
          <span className="divider" aria-hidden="true" />
          <span className="crumb">
            <strong>Guardrails</strong> · scopes, overlap, audit
          </span>
          <span className="spacer" />
          <span className="chip">audit kept 30 days</span>
          <span className="chip chip--acc">
            <span className="dot" aria-hidden="true" />
            sandbox resets 08:00 UTC
          </span>
        </header>

        <div className="body body--guard">
          <div className="keys">
            <div className="key-card">
              <div className="key-head">
                <span className="key-name">Read key</span>
                <span className="key-limit">30/min · 1,000/day</span>
              </div>
              <div className="tools">
                {READ_TOOLS.map((tool) => (
                  <span key={tool} className="tool">
                    {tool}
                  </span>
                ))}
                {WRITE_TOOLS.map((tool) => (
                  <span key={tool} className="tool tool--off">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="key-card">
              <div className="key-head">
                <span className="key-name">Write key</span>
                <span className="key-limit">60/min · no daily cap</span>
              </div>
              <div className="tools">
                {[...READ_TOOLS, ...WRITE_TOOLS].map((tool) => (
                  <span key={tool} className="tool">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="key-card">
              <div className="key-head">
                <span className="key-name">Same slot, two sessions</span>
                <span className="key-limit">bookings_no_overlap</span>
              </div>
              <div className="race">
                <div className="race-lane">
                  <b>Session A</b>
                  hold_slot 13:00Z
                  <br />
                  <span className="tag tag--ok">held</span>
                </div>
                <div className="race-lane">
                  <b>Session B</b>
                  hold_slot 13:00Z
                  <br />
                  <span className="tag tag--warn">slot_unavailable</span>
                </div>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-head">
              <span className="panel-title">Audit log</span>
              <span className="panel-meta">every MCP tool call</span>
            </div>
            <table className="audit">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Key</th>
                  <th>Tool</th>
                  <th>Inputs</th>
                  <th>Result</th>
                  <th>ms</th>
                </tr>
              </thead>
              <tbody>
                {AUDIT.map((row) => (
                  <tr key={`${row.time}-${row.tool}`}>
                    <td>{row.time}</td>
                    <td>{row.scope}</td>
                    <td className="tool-cell">{row.tool}</td>
                    <td className="inputs">
                      <Inputs value={row.inputs} />
                    </td>
                    <td>
                      <span className={`tag tag--${row.tone}`}>{row.code}</span>
                    </td>
                    <td>{row.ms}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
