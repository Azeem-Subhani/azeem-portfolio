import type { ReactNode } from "react";

const NAV = ["Chairs", "Tables", "Storage", "About"] as const;

type WoodyShopWebStoreChromeProps = {
  ariaLabel: string;
  cartCount?: number;
  children: ReactNode;
};

export function WoodyShopWebStoreChrome({
  ariaLabel,
  cartCount = 2,
  children,
}: WoodyShopWebStoreChromeProps) {
  return (
    <div className="ws-capture-root">
      <section className="capture capture--web capture--web-flow" aria-label={ariaLabel}>
        <header className="masthead">
          <div className="logo">WOODY</div>
          <nav className="nav" aria-label="Store">
            {NAV.map((item) => (
              <button type="button" className="nav-link" key={item}>
                {item}
              </button>
            ))}
          </nav>
          <div className="header-icons">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <div className="cart-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 ? <span className="cart-badge">{cartCount}</span> : null}
            </div>
          </div>
        </header>
        {children}
      </section>
    </div>
  );
}
