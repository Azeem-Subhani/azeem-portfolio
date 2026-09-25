/** 900×1600 Woody Shop Discover — mobile app. */

import Image from "next/image";

import { woodyShopFonts } from "@/components/capture/capture-fonts";

const PRODUCTS = [
  {
    title: "Walnut Coffee Table",
    price: "$38.00",
    src: "/images/capture/woody-shop/table.jpg",
  },
  {
    title: "Oak Dining Chair",
    price: "$45.00",
    src: "/images/capture/woody-shop/chair.jpg",
  },
  {
    title: "Minimalist Shelf",
    price: "$120.00",
    src: "/images/capture/woody-shop/shelf.jpg",
  },
  {
    title: "Lounge Sofa",
    price: "$299.00",
    src: "/images/capture/woody-shop/sofa.jpg",
  },
] as const;

const CATEGORIES = [
  { label: "All", on: true },
  { label: "Chairs" },
  { label: "Tables" },
  { label: "Storage" },
  { label: "Sofas" },
] as const;

export function WoodyShopPhoneCapture() {
  return (
    <div className={`ws-capture-root ${woodyShopFonts}`}>
      <section
        className="capture capture--phone"
        aria-label="Woody Shop Discover on phone"
      >
        <div className="ph-inner">
          <header className="ph-header">
            <div className="logo">WOODY</div>
            <button type="button" className="ph-icon" aria-label="Notifications">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </button>
          </header>

          <div className="ph-scroll">
            <div className="search-wrap">
              <div className="search-bar">
                <svg viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <span>Search for furniture...</span>
              </div>
            </div>

            <div className="section-title">Categories</div>
            <div className="categories">
              {CATEGORIES.map((cat) => (
                <button
                  type="button"
                  className={"on" in cat && cat.on ? "pill on" : "pill"}
                  key={cat.label}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="section-title">Featured Collection</div>
            <div className="featured-grid">
              {PRODUCTS.map((product) => (
                <article className="product-card" key={product.title}>
                  <div className="card-image">
                    <Image
                      src={product.src}
                      alt={`${product.title} product image`}
                      width={1400}
                      height={763}
                      sizes="280px"
                      loading="lazy"
                    />
                  </div>
                  <div className="card-info">
                    <div className="card-title">{product.title}</div>
                    <div className="card-price">{product.price}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <nav className="ph-tabbar">
            <button type="button" className="ph-tab on">
              <svg viewBox="0 0 24 24">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>Home</span>
            </button>
            <button type="button" className="ph-tab">
              <svg viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>Search</span>
            </button>
            <button type="button" className="ph-tab">
              <svg viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span>Cart</span>
            </button>
            <button type="button" className="ph-tab">
              <svg viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>Profile</span>
            </button>
          </nav>
        </div>
      </section>
    </div>
  );
}
