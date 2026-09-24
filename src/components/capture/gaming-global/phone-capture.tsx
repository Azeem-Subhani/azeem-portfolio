/** 900×1600 Gaming Global admin panel. */

import { GamingGlobalMark } from "@/components/capture/gaming-global/mark";
import { GamingGlobalPhoneTabBar } from "@/components/capture/gaming-global/phone-tabs";

const TILES = [
  { k: "Total users", v: "12,480", d: "▲ 342 this week", tone: "up" },
  { k: "Online now", v: "1,204", d: "▲ 8.1% peak", tone: "up" },
  { k: "Pending reports", v: "37", d: "▲ 12 unresolved", tone: "down", danger: true },
  { k: "Matches · 24h", v: "88,120", d: "— steady", tone: "flat" },
] as const;

const QUEUE = [
  {
    level: "HIGH",
    chip: "dng",
    title: "Cheating suspected",
    id: "#8821",
    note: "4 reports · aim anomaly 3.2σ",
  },
  {
    level: "MED",
    chip: "wrn",
    title: "Toxicity · chat log",
    id: "#8796",
    note: "Auto-flagged in #scrim-finder",
  },
  {
    level: "MED",
    chip: "wrn",
    title: "Boosting · 3 matches",
    id: "#8744",
    note: "Account sharing across 2 regions",
  },
] as const;

const USERS = [
  { initials: "V1", name: "v1p3r#0417", chip: "acc", role: "PLAYER" },
  { initials: "NX", name: "nexus.igl", chip: "inf", role: "MOD" },
  { initials: "GH", name: "ghost_ay", chip: "dng", role: "FLAGGED", flagged: true },
  { initials: "HC", name: "halcyon", chip: "wrn", role: "IN GAME" },
  { initials: "RG", name: "r0gue_ttv", chip: "inf", role: "CREATOR" },
] as const;

export function GamingGlobalPhoneCapture() {
  return (
    <div className="gg-capture-root">
      <section
        className="capture capture--phone"
        aria-label="Gaming Global admin panel on phone"
      >
        <div className="ph-inner">
          <header className="ph-head">
            <GamingGlobalMark size={19} strokeWidth={1.8} />
            <div className="ph-brand">
              GAMING<span>GLOBAL</span>
            </div>
            <span className="chip dng">ADMIN</span>
          </header>

          <div className="ph-body">
            <div>
              <div className="ph-title">ADMIN PANEL</div>
              <div className="ph-sub mono">ROLE-GATED · AUDIT LOGGED</div>
            </div>

            <div className="tiles tiles-2">
              {TILES.map((tile) => (
                <div className="tile ph-tile" key={tile.k}>
                  <div className="k">{tile.k}</div>
                  <div
                    className="v"
                    style={"danger" in tile && tile.danger ? { color: "var(--dang)" } : undefined}
                  >
                    {tile.v}
                  </div>
                  <div className={`d ${tile.tone}`}>{tile.d}</div>
                </div>
              ))}
            </div>

            <div className="panel tick" style={{ flex: "0 0 auto" }}>
              <div className="ph ph-ph">
                <div data-h="3">Moderation queue</div>
                <span className="chip dng" style={{ marginLeft: "auto", height: 18, fontSize: 10 }}>
                  37 OPEN
                </span>
              </div>
              <div>
                {QUEUE.map((item) => (
                  <div className="queue-row" key={item.id}>
                    <div className="queue-top">
                      <span
                        className={`chip ${item.chip}`}
                        style={{ height: 17, fontSize: 9 }}
                      >
                        {item.level}
                      </span>
                      <span className="queue-title">{item.title}</span>
                      <span className="queue-id mono">{item.id}</span>
                    </div>
                    <div className="queue-note">{item.note}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel" style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
              <div className="ph ph-ph">
                <div data-h="3">User management</div>
                <span
                  className="mono"
                  style={{
                    marginLeft: "auto",
                    fontSize: 10,
                    color: "var(--tx3)",
                    letterSpacing: "0.1em",
                  }}
                >
                  7D · ALL REGIONS
                </span>
              </div>
              <div>
                {USERS.map((user) => (
                  <div
                    className={"flagged" in user && user.flagged ? "user-row flagged" : "user-row"}
                    key={user.name}
                  >
                    <span className={"flagged" in user && user.flagged ? "gk dng" : "gk"}>
                      {user.initials}
                    </span>
                    <span className="user-name">{user.name}</span>
                    <span className={`chip chip-sm ${user.chip}`}>{user.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <GamingGlobalPhoneTabBar active="ADMIN" />
        </div>
      </section>
    </div>
  );
}
