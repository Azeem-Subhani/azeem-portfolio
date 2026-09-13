/** 1600×900 Woody Shop product page — walnut coffee table. */

const NAV = ["Chairs", "Tables", "Storage", "About"] as const;

export function WoodyShopWebCapture() {
  return (
    <div className="ws-capture-root">
      <section className="capture capture--web" aria-label="Woody Shop product page">
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
              <span className="cart-badge">2</span>
            </div>
          </div>
        </header>

        <div className="stage">
          <section className="product-images">
            <div className="main-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/capture/woody-shop/main.jpg"
                alt="Walnut Coffee Table"
              />
            </div>
            <div className="thumbnails">
              <button type="button" className="thumbnail" aria-label="Top view" />
              <button type="button" className="thumbnail" aria-label="Three-quarter view" />
              <button type="button" className="thumbnail" aria-label="Side view" />
            </div>
          </section>

          <section className="product-details">
            <h1 className="product-title">Walnut Coffee Table</h1>
            <div className="price-rating">
              <span className="price">$38.00</span>
              <span className="rating">
                <span className="stars">★★★★☆</span> (0 reviews)
              </span>
            </div>
            <p className="short-desc">
              Walnut Coffee Tables exude luxury, their rich, dark tones and elegant
              grain patterns bringing a touch of sophistication to any living space.
            </p>
            <div className="dimensions">
              <h3>Dimension:</h3>
              <ul>
                <li>Premium: 32.5 cm</li>
                <li>Open. Raw: 30 mm</li>
                <li>Shipping: 328.48.5 cm</li>
              </ul>
            </div>
            <div className="actions">
              <div className="qty">
                <button type="button" className="qty-btn" aria-label="Decrease quantity">
                  -
                </button>
                <span className="qty-val">1</span>
                <button type="button" className="qty-btn" aria-label="Increase quantity">
                  +
                </button>
              </div>
              <button type="button" className="add-to-bag">
                Add to Bag
              </button>
            </div>
            <div className="product-copy">
              <h2>Product Description</h2>
              <p>
                Walnut Coffee Table, the epitome of modern elegance and
                functionality. Crafted from premium walnut wood, this exquisite
                piece seamlessly blends style with durability. Its sleek design and
                rich, warm tones add a touch of sophistication to any living space,
                making it the perfect centerpiece for your home. Whether you&apos;re
                enjoying a morning coffee or hosting guests, this table elevates
                every moment with its timeless beauty and impeccable craftsmanship.
              </p>
            </div>
          </section>
        </div>

        <button type="button" className="chat-bubble" aria-label="Chat">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </button>
      </section>
    </div>
  );
}
