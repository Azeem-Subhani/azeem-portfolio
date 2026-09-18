import type { ReactNode } from "react";

type PhoneTabId = "CONVERT" | "STATS" | "CHAT" | "MATCHES" | "ADMIN";

const TABS: { id: PhoneTabId; icon: ReactNode }[] = [
  {
    id: "CONVERT",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      </svg>
    ),
  },
  {
    id: "STATS",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
        <path d="M4 19V11M10 19V5M16 19v-6M22 19h-2" />
      </svg>
    ),
  },
  {
    id: "CHAT",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
        <path d="M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5z" />
      </svg>
    ),
  },
  {
    id: "MATCHES",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
        <path d="M4 6h16M4 12h16M4 18h10" />
      </svg>
    ),
  },
  {
    id: "ADMIN",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      </svg>
    ),
  },
];

export function GamingGlobalPhoneTabBar({ active }: { active: PhoneTabId }) {
  return (
    <nav className="ph-tabbar">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={tab.id === active ? "ph-tab on" : "ph-tab"}
        >
          {tab.icon}
          <span>{tab.id}</span>
        </button>
      ))}
    </nav>
  );
}
