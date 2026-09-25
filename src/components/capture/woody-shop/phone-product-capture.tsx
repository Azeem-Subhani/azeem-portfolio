/** 900×1600 Woody Shop — mobile product detail. */

import Image from "next/image";

import { woodyShopFonts } from "@/components/capture/capture-fonts";
import { WoodyShopPhoneTabbar } from "@/components/capture/woody-shop/phone-tabbar";

export function WoodyShopPhoneProductCapture() {
  return (
    <div className={`ws-capture-root ${woodyShopFonts}`}>
      <section
        className="capture capture--phone"
        aria-label="Woody Shop product detail on phone"
      >
        <div className="ph-inner">
          <header className="ph-header ph-header-back">
            <button type="button" className="ph-back" aria-label="Back">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div className="logo">WOODY</div>
            <button type="button" className="ph-icon" aria-label="Share">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </button>
          </header>

          <div className="ph-scroll">
            <div className="ph-product-hero">
              <Image
                src="/images/capture/woody-shop/main.jpg"
                alt="Walnut Coffee Table"
                width={1400}
                height={1200}
                sizes="400px"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="ph-product-body">
              <div data-h="1" className="ph-product-title">Walnut Coffee Table</div>
              <p className="ph-product-price">$38.00</p>
              <p className="ph-product-desc">
                Rich walnut grain and a low profile made for everyday living rooms.
              </p>
              <div className="ph-product-actions">
                <div className="qty qty-compact">
                  <button type="button" className="qty-btn" aria-label="Decrease quantity">
                    -
                  </button>
                  <span className="qty-val">1</span>
                  <button type="button" className="qty-btn" aria-label="Increase quantity">
                    +
                  </button>
                </div>
                <button type="button" className="add-to-bag add-to-bag-wide">
                  Add to bag
                </button>
              </div>
            </div>
          </div>

          <WoodyShopPhoneTabbar active="home" />
        </div>
      </section>
    </div>
  );
}
