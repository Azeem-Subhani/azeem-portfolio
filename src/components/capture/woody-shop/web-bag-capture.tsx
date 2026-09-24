/** 1600×900 Woody Shop — web shopping bag. */

import Image from "next/image";

import { WoodyShopWebStoreChrome } from "@/components/capture/woody-shop/web-store-chrome";

const BAG_ITEMS = [
  {
    title: "Walnut Coffee Table",
    price: "$38.00",
    qty: 1,
    src: "/images/capture/woody-shop/main.jpg",
  },
  {
    title: "Oak Dining Chair",
    price: "$45.00",
    qty: 1,
    src: "/images/capture/woody-shop/chair.jpg",
  },
] as const;

export function WoodyShopWebBagCapture() {
  return (
    <WoodyShopWebStoreChrome ariaLabel="Woody Shop shopping bag" cartCount={2}>
      <div className="bag-page">
        <div className="bag-head">
          <div data-h="1" className="bag-title">Your bag</div>
          <p className="bag-sub">2 items · saved in your browser</p>
        </div>

        <ul className="bag-lines">
          {BAG_ITEMS.map((item) => (
            <li className="bag-line" key={item.title}>
              <div className="bag-thumb">
                <Image
                  src={item.src}
                  alt=""
                  width={200}
                  height={160}
                  sizes="120px"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="bag-line-body">
                <p className="bag-line-title">{item.title}</p>
                <p className="bag-line-meta">Qty {item.qty}</p>
              </div>
              <p className="bag-line-price">{item.price}</p>
            </li>
          ))}
        </ul>

        <div className="bag-summary">
          <div className="bag-row">
            <span>Subtotal</span>
            <span>$83.00</span>
          </div>
          <div className="bag-row bag-row-muted">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <button type="button" className="bag-checkout">
            Continue to checkout
          </button>
        </div>
      </div>
    </WoodyShopWebStoreChrome>
  );
}
