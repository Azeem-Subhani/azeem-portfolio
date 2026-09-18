import type { ReactNode } from "react";

import { GamingGlobalMark } from "@/components/capture/gaming-global/mark";

export type WebNavId =
  | "converter"
  | "stats"
  | "chat"
  | "matches"
  | "admin"
  | "api";

const NAV_TOOLS: {
  id: WebNavId;
  label: string;
  kbd: string;
  icon: ReactNode;
}[] = [
  {
    id: "converter",
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
    id: "stats",
    label: "Player Stats",
    kbd: "2",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M4 19V11M10 19V5M16 19v-6M22 19h-2" />
      </svg>
    ),
  },
  {
    id: "chat",
    label: "Realtime Chat",
    kbd: "3",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5z" />
      </svg>
    ),
  },
  {
    id: "matches",
    label: "Match History",
    kbd: "4",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M4 6h16M4 12h16M4 18h10" />
      </svg>
    ),
  },
];

const NAV_OPS: { id: WebNavId; label: string; kbd?: string; icon: ReactNode }[] = [
  {
    id: "admin",
    label: "Admin Panel",
    kbd: "5",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      </svg>
    ),
  },
  {
    id: "api",
    label: "API & Keys",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="8" cy="12" r="3.4" />
        <path d="M11.4 12H21M18 12v3M15 12v2" />
      </svg>
    ),
  },
];

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

export function GamingGlobalWebSidebar({ active }: { active: WebNavId }) {
  return (
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
        <NavItem key={item.id} {...item} active={active === item.id} />
      ))}
      <div className="nv-sec">OPS</div>
      {NAV_OPS.map((item) => (
        <NavItem key={item.id} {...item} active={active === item.id} />
      ))}
      <div className="sb-foot">
        <div className="av">KA</div>
        <div>
          <div className="nm">k.arvind</div>
          <div className="rl">ADMIN · OWNER</div>
        </div>
      </div>
    </aside>
  );
}

export function GamingGlobalWebTopbar({
  crumb,
  searchPlaceholder = "Search games, players…",
  socketLabel = "SOCKET LIVE",
  showNotify = true,
}: {
  crumb: ReactNode;
  searchPlaceholder?: string;
  socketLabel?: string;
  showNotify?: boolean;
}) {
  return (
    <header className="tb">
      <div className="crumb">{crumb}</div>
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
        <span>{searchPlaceholder}</span>
        <span className="k">⌘K</span>
      </div>
      {showNotify ? (
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
      ) : null}
      <div className="sock">
        <i />
        <span>{socketLabel}</span>
      </div>
    </header>
  );
}

export function GamingGlobalWebFrame({
  active,
  crumb,
  searchPlaceholder,
  socketLabel,
  showNotify,
  children,
  contentClassName,
}: {
  active: WebNavId;
  crumb: ReactNode;
  searchPlaceholder?: string;
  socketLabel?: string;
  showNotify?: boolean;
  children: ReactNode;
  contentClassName?: string;
}) {
  return (
    <section className="capture capture--web">
      <GamingGlobalWebSidebar active={active} />
      <div className="main">
        <GamingGlobalWebTopbar
          crumb={crumb}
          searchPlaceholder={searchPlaceholder}
          socketLabel={socketLabel}
          showNotify={showNotify}
        />
        <div className={contentClassName ?? "content"}>{children}</div>
      </div>
    </section>
  );
}
