/** 900×1600 Gaming Global realtime chat on phone. */

import { gamingGlobalFonts } from "@/components/capture/capture-fonts";
import { GamingGlobalPhoneTabBar } from "@/components/capture/gaming-global/phone-tabs";

export function GamingGlobalPhoneChatCapture() {
  return (
    <div className={`gg-capture-root ${gamingGlobalFonts}`}>
      <section className="capture capture--phone" aria-label="Gaming Global chat on phone">
        <div className="ph-inner">
          <header className="ph-chat-head">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9a9388" strokeWidth="2" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" />
            </svg>
            <div>
              <div className="ph-chat-title">
                <span className="mono">#</span>
                scrim-finder
              </div>
              <div className="ph-chat-online mono">4 online · 24 members</div>
            </div>
            <div className="tb-ic ph-chat-search" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-4-4" />
              </svg>
            </div>
          </header>

          <div className="ph-chat-msgs">
            <div className="chat-day">
              <span />
              TODAY
              <span />
            </div>

            <div className="chat-line">
              <div className="chat-time">13:58</div>
              <div className="chat-body">
                <div className="chat-meta">
                  <span className="chat-user-acc">nexus.igl</span>
                </div>
                <div className="chat-text">
                  need 2 for scrim vs Team Kaiju, 21:00 IST BO3
                </div>
              </div>
            </div>

            <div className="chat-line">
              <div className="chat-time">14:01</div>
              <div className="chat-body">
                <div className="chat-meta">
                  <span className="chat-user-hal">halcyon</span>
                </div>
                <div className="chat-text">roles?</div>
              </div>
            </div>

            <div className="chat-line">
              <div className="chat-time">14:02</div>
              <div className="chat-body">
                <div className="chat-meta">
                  <span className="chat-user-acc">nexus.igl</span>
                </div>
                <div className="chat-text">sentinel + controller. Ascent / Lotus</div>
                <div className="chat-embed">
                  <div className="lbl">Match lobby</div>
                  <div className="ph-chat-embed-title">ASCENT · LOTUS</div>
                  <div className="mono ph-chat-embed-meta">21:00 IST · BO3</div>
                  <button type="button" className="btn pri ph-chat-embed-btn">
                    Request slot
                  </button>
                </div>
              </div>
            </div>

            <div className="chat-line">
              <div className="chat-time">14:05</div>
              <div className="chat-body">
                <div className="chat-meta">
                  <span className="chat-user-v1">v1p3r</span>
                  <span className="chip acc chip-sm">YOU</span>
                </div>
                <div className="chat-text">in. sentinel main</div>
              </div>
            </div>

            <div className="chat-line">
              <div className="chat-time">14:06</div>
              <div className="chat-body">
                <div className="chat-meta">
                  <span className="chat-user-hal">halcyon</span>
                </div>
                <div className="chat-text">lobby locked.</div>
              </div>
            </div>
          </div>

          <div className="chat-composer">
            <div className="chat-composer-box">
              <span>Message #scrim-finder</span>
              <span className="mono ph-chat-return">↵</span>
            </div>
          </div>

          <GamingGlobalPhoneTabBar active="CHAT" />
        </div>
      </section>
    </div>
  );
}
