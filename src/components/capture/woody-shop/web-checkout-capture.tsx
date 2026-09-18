/** 1600×900 Woody Shop — Stripe checkout step. */

import Image from "next/image";

import { WoodyShopWebStoreChrome } from "@/components/capture/woody-shop/web-store-chrome";

export function WoodyShopWebCheckoutCapture() {
  return (
    <WoodyShopWebStoreChrome ariaLabel="Woody Shop checkout" cartCount={2}>
      <div className="checkout-page">
        <div className="checkout-main">
          <h1 className="checkout-title">Checkout</h1>

          <section className="checkout-block">
            <h2>Contact</h2>
            <div className="checkout-fields">
              <div className="checkout-field">
                <span>Email</span>
                <div className="checkout-input">jane.doe@example.com</div>
              </div>
            </div>
          </section>

          <section className="checkout-block">
            <h2>Shipping</h2>
            <div className="checkout-fields checkout-fields-grid">
              <div className="checkout-field">
                <span>First name</span>
                <div className="checkout-input">Jane</div>
              </div>
              <div className="checkout-field">
                <span>Last name</span>
                <div className="checkout-input">Doe</div>
              </div>
              <div className="checkout-field checkout-field-wide">
                <span>Address</span>
                <div className="checkout-input">128 Market Street</div>
              </div>
              <div className="checkout-field">
                <span>City</span>
                <div className="checkout-input">San Francisco</div>
              </div>
              <div className="checkout-field">
                <span>Postal code</span>
                <div className="checkout-input">94105</div>
              </div>
            </div>
          </section>

          <section className="checkout-block">
            <h2>Payment</h2>
            <p className="checkout-stripe-note">Card details handled by Stripe Checkout.</p>
            <div className="checkout-card-placeholder">
              <span>4242 ···· ···· 4242</span>
              <span>04 / 28</span>
            </div>
          </section>
        </div>

        <aside className="checkout-aside">
          <h2 className="checkout-aside-title">Order summary</h2>
          <ul className="checkout-items">
            <li>
              <div className="checkout-item-thumb">
                <Image
                  src="/images/capture/woody-shop/main.jpg"
                  alt=""
                  width={120}
                  height={96}
                  sizes="72px"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="checkout-item-name">Walnut Coffee Table</p>
                <p className="checkout-item-meta">Qty 1</p>
              </div>
              <span>$38.00</span>
            </li>
            <li>
              <div className="checkout-item-thumb">
                <Image
                  src="/images/capture/woody-shop/chair.jpg"
                  alt=""
                  width={120}
                  height={96}
                  sizes="72px"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="checkout-item-name">Oak Dining Chair</p>
                <p className="checkout-item-meta">Qty 1</p>
              </div>
              <span>$45.00</span>
            </li>
          </ul>
          <div className="checkout-total">
            <span>Total</span>
            <span>$83.00</span>
          </div>
          <button type="button" className="checkout-pay">
            Pay with Stripe
          </button>
        </aside>
      </div>
    </WoodyShopWebStoreChrome>
  );
}
