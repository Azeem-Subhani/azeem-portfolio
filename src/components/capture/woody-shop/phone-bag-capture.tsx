/** 900×1600 Woody Shop — mobile shopping bag. */

import Image from "next/image";

import { WoodyShopPhoneTabbar } from "@/components/capture/woody-shop/phone-tabbar";

const BAG_ITEMS = [
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
] as const;

export function WoodyShopPhoneBagCapture() {
  return (
    <div className="ws-capture-root">
      <section className="capture capture--phone" aria-label="Woody Shop bag on phone">
        <div className="ph-inner">
          <header className="ph-header">
            <div className="logo">WOODY</div>
            <button type="button" className="ph-icon" aria-label="Edit bag">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
          </header>

          <div className="ph-scroll">
            <div className="section-title">Your bag</div>
            <p className="ph-bag-note">2 items · synced from Redux</p>

            <ul className="ph-bag-list">
              {BAG_ITEMS.map((item) => (
                <li className="ph-bag-row" key={item.title}>
                  <div className="ph-bag-thumb">
                    <Image
                      src={item.src}
                      alt=""
                      width={280}
                      height={200}
                      sizes="120px"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ph-bag-copy">
                    <p className="card-title">{item.title}</p>
                    <p className="card-price">{item.price}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="ph-bag-total">
              <span>Subtotal</span>
              <span>$83.00</span>
            </div>
            <button type="button" className="ph-bag-checkout">
              Checkout with Stripe
            </button>
          </div>

          <WoodyShopPhoneTabbar active="cart" />
        </div>
      </section>
    </div>
  );
}
