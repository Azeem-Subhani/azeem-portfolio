/** 1600×900 Gaming Global player stats dashboard. */

import type { ReactNode } from "react";

import { gamingGlobalFonts } from "@/components/capture/capture-fonts";
import { GamingGlobalMark } from "@/components/capture/gaming-global/mark";

const NAV_TOOLS = [
  {
    label: "Converter",
    kbd: "1",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      </svg>
    ),
  },
  {
    label: "Player Stats",
    kbd: "2",
    active: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M4 19V11M10 19V5M16 19v-6M22 19h-2" />
      </svg>
    ),
  },
  {
    label: "Realtime Chat",
    kbd: "3",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5z" />
      </svg>
    ),
  },
  {
    label: "Match History",
    kbd: "4",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M4 6h16M4 12h16M4 18h10" />
      </svg>
    ),
  },
] as const;

const NAV_OPS = [
  {
    label: "Admin Panel",
    kbd: "5",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      </svg>
    ),
  },
  {
    label: "API & Keys",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="8" cy="12" r="3.4" />
        <path d="M11.4 12H21M18 12v3M15 12v2" />
      </svg>
    ),
  },
] as const;

const TILES = [
  { k: "K / D", v: "1.31", d: "▲ 0.08 vs prev", tone: "up" },
  { k: "Headshot %", v: "47.2", d: "▲ 2.4", tone: "up" },
  { k: "ADR", v: "168.4", d: "▲ 6.1", tone: "up" },
  { k: "Win rate", v: "58.1", d: "▼ 1.3", tone: "down" },
  { k: "KAST", v: "74.3", d: "▲ 3.0", tone: "up" },
  { k: "Rating 2.1", v: "1.18", d: "— 0.00", tone: "flat" },
] as const;

const MATCHES = [
  { map: "ASCENT", score: "13–9 · WIN", kda: "24/15/6", rtg: "1.42", win: true },
  { map: "LOTUS", score: "13–11 · WIN", kda: "19/18/9", rtg: "1.09", win: true },
  { map: "SUNSET", score: "7–13 · LOSS", kda: "14/19/4", rtg: "0.78", win: false },
  { map: "BIND", score: "13–4 · WIN", kda: "22/8/11", rtg: "1.71", win: true },
  { map: "HAVEN", score: "10–13 · LOSS", kda: "17/18/7", rtg: "0.94", win: false },
] as const;

const MAPS = [
  { name: "ASCENT", wr: "64%", gp: "78 GP · 1.24 RTG", tone: "acc" },
  { name: "LOTUS", wr: "59%", gp: "71 GP · 1.11 RTG", tone: "acc" },
  { name: "BIND", wr: "57%", gp: "63 GP · 1.19 RTG", tone: "acc" },
  { name: "HAVEN", wr: "48%", gp: "54 GP · 0.96 RTG", tone: "warn" },
  { name: "SUNSET", wr: "41%", gp: "49 GP · 0.88 RTG", tone: "dang" },
  { name: "SPLIT", wr: "62%", gp: "58 GP · 1.17 RTG", tone: "acc" },
] as const;

const MAP_TONE: Record<string, string> = {
  acc: "var(--acc)",
  warn: "var(--warn)",
  dang: "var(--dang)",
};

function NavItem({
  label,
  kbd,
  icon,
  active,
}: {
  label: string;
  kbd?: string;
  icon: ReactNode;
  active?: boolean;
}) {
  return (
    <button type="button" className={active ? "nv active" : "nv"}>
      {icon}
      <span>{label}</span>
      {kbd ? <span className="kbd">{kbd}</span> : null}
    </button>
  );
}

export function GamingGlobalWebCapture() {
  return (
    <div className={`gg-capture-root ${gamingGlobalFonts}`}>
      <section
        className="capture capture--web"
        aria-label="Gaming Global player stats"
      >
        <aside className="sb">
          <div className="sb-logo">
            <GamingGlobalMark />
            <div>
              <div className="wm">
                GAMING<span>GLOBAL</span>
              </div>
              <div className="ver">BUILD 0.9.4 · MERN</div>
            </div>
          </div>
          <div className="nv-sec">TOOLS</div>
          {NAV_TOOLS.map((item) => (
            <NavItem key={item.label} {...item} />
          ))}
          <div className="nv-sec">OPS</div>
          {NAV_OPS.map((item) => (
            <NavItem key={item.label} {...item} />
          ))}
          <div className="sb-foot">
            <div className="av">KA</div>
            <div>
              <div className="nm">k.arvind</div>
              <div className="rl">ADMIN · OWNER</div>
            </div>
          </div>
        </aside>

        <div className="main">
          <header className="tb">
            <div className="crumb">
              PLAYERS / <b>V1P3R#0417</b>
            </div>
            <div className="tb-search">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-4-4" />
              </svg>
              <span>Search games, players…</span>
              <span className="k">⌘K</span>
            </div>
            <div className="tb-ic">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d="M18 8a6 6 0 1 0-12 0c0 6-2 7-2 7h16s-2-1-2-7z" />
                <path d="M10.5 20a2 2 0 0 0 3 0" />
              </svg>
            </div>
            <div className="sock">
              <i />
              <span>SOCKET LIVE</span>
            </div>
          </header>

          <div className="content">
            <div className="panel" style={{ flex: "0 0 auto" }}>
              <div className="player-strip">
                <div className="av av-lg">V1</div>
                <div>
                  <div className="player-name">
                    v1p3r<span className="tag">#0417</span>
                    <span className="chip acc">IMMORTAL 2</span>
                    <span className="chip">IN · MUMBAI</span>
                  </div>
                  <div className="player-meta mono">
                    1,284 HRS TRACKED · 412 MATCHES INGESTED · LAST SYNC 2 MIN AGO
                  </div>
                </div>
                <div className="player-acts">
                  <div className="seg">
                    <span>7D</span>
                    <span className="on">30D</span>
                    <span>ALL</span>
                  </div>
                  <button type="button" className="btn">
                    COMPARE
                  </button>
                  <button type="button" className="btn pri">
                    EXPORT CSV
                  </button>
                </div>
              </div>
            </div>

            <div className="tiles tiles-6">
              {TILES.map((tile) => (
                <div className="tile" key={tile.k}>
                  <div className="k">{tile.k}</div>
                  <div className="v">{tile.v}</div>
                  <div className={`d ${tile.tone}`}>{tile.d}</div>
                </div>
              ))}
            </div>

            <div className="stats-grid">
              <div className="panel tick">
                <div className="ph">
                  <span className="idx">01</span>
                  <div data-h="3">Performance · last 20 matches</div>
                  <div className="rt">
                    <span className="chip acc">
                      <i />
                      RATING 2.1
                    </span>
                    <span className="chip">ADR</span>
                    <span className="chip">HS%</span>
                  </div>
                </div>
                <div className="chart-wrap">
                  <svg viewBox="0 0 700 200" preserveAspectRatio="none">
                    <g stroke="#26231E" strokeWidth="1">
                      <line x1="0" y1="40" x2="700" y2="40" />
                      <line x1="0" y1="80" x2="700" y2="80" />
                      <line x1="0" y1="120" x2="700" y2="120" />
                      <line x1="0" y1="160" x2="700" y2="160" />
                    </g>
                    <line
                      x1="0"
                      y1="72"
                      x2="700"
                      y2="72"
                      stroke="#FF7A2A"
                      strokeWidth="1"
                      strokeDasharray="4 5"
                      opacity=".45"
                    />
                    <text
                      x="6"
                      y="67"
                      fill="#6A645C"
                      style={{ fontFamily: "var(--mono)" }}
                      fontSize="9"
                    >
                      1.60 TARGET
                    </text>
                    <path
                      d="M15,135.8 50.3,118.2 85.5,144.6 120.8,103.9 156,88.5 191.3,124.8 226.6,151.2 261.8,111.6 297.1,98.4 332.4,129.2 367.6,80.8 402.9,92.9 438.2,117.1 473.4,142.4 508.7,107.2 544,101.7 579.2,121.5 614.5,86.3 649.8,113.8 685,96.2 L685,200 L15,200 Z"
                      fill="rgba(255,122,42,.08)"
                    />
                    <polyline
                      points="15,135.8 50.3,118.2 85.5,144.6 120.8,103.9 156,88.5 191.3,124.8 226.6,151.2 261.8,111.6 297.1,98.4 332.4,129.2 367.6,80.8 402.9,92.9 438.2,117.1 473.4,142.4 508.7,107.2 544,101.7 579.2,121.5 614.5,86.3 649.8,113.8 685,96.2"
                      fill="none"
                      stroke="#FF7A2A"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <g fill="#12110F" stroke="#FF7A2A" strokeWidth="1.6">
                      <circle cx="367.6" cy="80.8" r="3.4" />
                      <circle cx="685" cy="96.2" r="3.4" />
                    </g>
                  </svg>
                  <div className="chart-axis mono">
                    <span>M-20</span>
                    <span>M-15</span>
                    <span>M-10</span>
                    <span>M-5</span>
                    <span>NOW</span>
                  </div>
                </div>
              </div>

              <div className="panel tick">
                <div className="ph">
                  <span className="idx">02</span>
                  <div data-h="3">Recent matches</div>
                  <div className="rt">
                    <span className="chip inf">
                      <i />
                      LIVE SYNC
                    </span>
                  </div>
                </div>
                <div className="match-list">
                  {MATCHES.map((match) => (
                    <div className="match-row" key={match.map}>
                      <div
                        className={match.win ? "match-bar win" : "match-bar loss"}
                      />
                      <div className="match-map">
                        {match.map}
                        <div className="match-score mono">{match.score}</div>
                      </div>
                      <div className="match-kda mono">{match.kda}</div>
                      <div
                        className="match-rtg mono"
                        style={{
                          color: match.win ? "var(--acc)" : "var(--dang)",
                        }}
                      >
                        {match.rtg}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="panel" style={{ flex: "0 0 auto" }}>
              <div className="ph">
                <span className="idx">03</span>
                <div data-h="3">Map pool · win rate</div>
                <div className="rt">
                  <span className="chip">412 MATCHES</span>
                </div>
              </div>
              <div className="map-pool">
                {MAPS.map((map) => (
                  <div className="map-cell" key={map.name}>
                    <div className="map-cell-top">
                      <span>{map.name}</span>
                      <span
                        className="mono"
                        style={{ fontSize: 11, color: MAP_TONE[map.tone] }}
                      >
                        {map.wr}
                      </span>
                    </div>
                    <div className="map-bar">
                      <span
                        className="map-bar-fill"
                        style={{
                          width: map.wr,
                          background: MAP_TONE[map.tone],
                        }}
                      />
                    </div>
                    <div className="gp mono">{map.gp}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
