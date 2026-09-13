import dynamic from "next/dynamic";
import type { ComponentType } from "react";

type LiveMockup = ComponentType;

// Keep the project catalog light on first paint. Each live capture is loaded
// only when the selected project actually asks for it; the static project
// image remains the default fallback in ProjectMockup.
const liveWebMockups: Partial<Record<string, LiveMockup>> = {
  "track-hero": dynamic(
    () =>
      import("@/components/projects/mockups/track-hero-web-mock").then(
        (module) => module.TrackHeroWebMock,
      ),
    { ssr: false },
  ),
  oxym: dynamic(
    () =>
      import("@/components/projects/mockups/oxym-web-mock").then(
        (module) => module.OxymWebMock,
      ),
    { ssr: false },
  ),
  "memorial-planning": dynamic(
    () =>
      import("@/components/projects/mockups/memorial-planning-web-mock").then(
        (module) => module.MemorialPlanningWebMock,
      ),
    { ssr: false },
  ),
  "gaming-global": dynamic(
    () =>
      import("@/components/projects/mockups/gaming-global-web-mock").then(
        (module) => module.GamingGlobalWebMock,
      ),
    { ssr: false },
  ),
  "woody-shop": dynamic(
    () =>
      import("@/components/projects/mockups/woody-shop-web-mock").then(
        (module) => module.WoodyShopWebMock,
      ),
    { ssr: false },
  ),
  "real-time-chat": dynamic(
    () =>
      import("@/components/projects/mockups/real-time-chat-web-mock").then(
        (module) => module.RealTimeChatWebMock,
      ),
    { ssr: false },
  ),
  "task-manager": dynamic(
    () =>
      import("@/components/projects/mockups/task-manager-web-mock").then(
        (module) => module.TaskManagerWebMock,
      ),
    { ssr: false },
  ),
  "smart-living": dynamic(
    () =>
      import("@/components/projects/mockups/smart-living-web-mock").then(
        (module) => module.SmartLivingWebMock,
      ),
    { ssr: false },
  ),
};

const livePhoneMockups: Partial<Record<string, LiveMockup>> = {
  "track-hero": dynamic(
    () =>
      import("@/components/projects/mockups/track-hero-phone-mock").then(
        (module) => module.TrackHeroPhoneMock,
      ),
    { ssr: false },
  ),
  oxym: dynamic(
    () =>
      import("@/components/projects/mockups/oxym-phone-mock").then(
        (module) => module.OxymPhoneMock,
      ),
    { ssr: false },
  ),
  "memorial-planning": dynamic(
    () =>
      import("@/components/projects/mockups/memorial-planning-phone-mock").then(
        (module) => module.MemorialPlanningPhoneMock,
      ),
    { ssr: false },
  ),
  "gaming-global": dynamic(
    () =>
      import("@/components/projects/mockups/gaming-global-phone-mock").then(
        (module) => module.GamingGlobalPhoneMock,
      ),
    { ssr: false },
  ),
  "woody-shop": dynamic(
    () =>
      import("@/components/projects/mockups/woody-shop-phone-mock").then(
        (module) => module.WoodyShopPhoneMock,
      ),
    { ssr: false },
  ),
  "real-time-chat": dynamic(
    () =>
      import("@/components/projects/mockups/real-time-chat-phone-mock").then(
        (module) => module.RealTimeChatPhoneMock,
      ),
    { ssr: false },
  ),
  "smart-living": dynamic(
    () =>
      import("@/components/projects/mockups/smart-living-phone-mock").then(
        (module) => module.SmartLivingPhoneMock,
      ),
    { ssr: false },
  ),
};

export function getLiveWebMockup(slug: string): LiveMockup | undefined {
  return liveWebMockups[slug];
}

export function getLivePhoneMockup(slug: string): LiveMockup | undefined {
  return livePhoneMockups[slug];
}

export function hasLiveWebMockup(slug: string): boolean {
  return slug in liveWebMockups;
}

export function hasLivePhoneMockup(slug: string): boolean {
  return slug in livePhoneMockups;
}
