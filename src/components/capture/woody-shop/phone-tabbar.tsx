type WoodyShopPhoneTab = "home" | "search" | "cart" | "profile";

type WoodyShopPhoneTabbarProps = {
  active: WoodyShopPhoneTab;
};

export function WoodyShopPhoneTabbar({ active }: WoodyShopPhoneTabbarProps) {
  const tabClass = (tab: WoodyShopPhoneTab) =>
    tab === active ? "ph-tab on" : "ph-tab";

  return (
    <nav className="ph-tabbar">
      <button type="button" className={tabClass("home")}>
        <svg viewBox="0 0 24 24">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <span>Home</span>
      </button>
      <button type="button" className={tabClass("search")}>
        <svg viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span>Search</span>
      </button>
      <button type="button" className={tabClass("cart")}>
        <svg viewBox="0 0 24 24">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
        <span>Cart</span>
      </button>
      <button type="button" className={tabClass("profile")}>
        <svg viewBox="0 0 24 24">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <span>Profile</span>
      </button>
    </nav>
  );
}
