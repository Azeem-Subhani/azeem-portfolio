import dynamic from "next/dynamic";
import type { ComponentType } from "react";

type LiveMockup = ComponentType;
type Loader = () => Promise<LiveMockup>;

// Keep the project catalog light on first paint. Each live capture is loaded
// only when the selected project actually asks for it; ProjectMockup holds the
// frame's size empty until the chunk arrives and the capture builds itself in.
const webLoaders: Record<string, Loader> = {
  "track-hero": () =>
    import("@/components/projects/mockups/track-hero-web-mock").then(
      (module) => module.TrackHeroWebMock,
    ),
  oxym: () =>
    import("@/components/projects/mockups/oxym-web-mock").then(
      (module) => module.OxymWebMock,
    ),
  "memorial-planning": () =>
    import("@/components/projects/mockups/memorial-planning-web-mock").then(
      (module) => module.MemorialPlanningWebMock,
    ),
  "gaming-global": () =>
    import("@/components/projects/mockups/gaming-global-web-mock").then(
      (module) => module.GamingGlobalWebMock,
    ),
  "woody-shop": () =>
    import("@/components/projects/mockups/woody-shop-web-mock").then(
      (module) => module.WoodyShopWebMock,
    ),
  "real-time-chat": () =>
    import("@/components/projects/mockups/real-time-chat-web-mock").then(
      (module) => module.RealTimeChatWebMock,
    ),
  "task-manager": () =>
    import("@/components/projects/mockups/task-manager-web-mock").then(
      (module) => module.TaskManagerWebMock,
    ),
  "smart-living": () =>
    import("@/components/projects/mockups/smart-living-web-mock").then(
      (module) => module.SmartLivingWebMock,
    ),
};

const phoneLoaders: Record<string, Loader> = {
  "track-hero": () =>
    import("@/components/projects/mockups/track-hero-phone-mock").then(
      (module) => module.TrackHeroPhoneMock,
    ),
  oxym: () =>
    import("@/components/projects/mockups/oxym-phone-mock").then(
      (module) => module.OxymPhoneMock,
    ),
  "memorial-planning": () =>
    import("@/components/projects/mockups/memorial-planning-phone-mock").then(
      (module) => module.MemorialPlanningPhoneMock,
    ),
  "gaming-global": () =>
    import("@/components/projects/mockups/gaming-global-phone-mock").then(
      (module) => module.GamingGlobalPhoneMock,
    ),
  "woody-shop": () =>
    import("@/components/projects/mockups/woody-shop-phone-mock").then(
      (module) => module.WoodyShopPhoneMock,
    ),
  "real-time-chat": () =>
    import("@/components/projects/mockups/real-time-chat-phone-mock").then(
      (module) => module.RealTimeChatPhoneMock,
    ),
  "task-manager": () =>
    import("@/components/projects/mockups/task-manager-phone-mock").then(
      (module) => module.TaskManagerPhoneMock,
    ),
  "smart-living": () =>
    import("@/components/projects/mockups/smart-living-phone-mock").then(
      (module) => module.SmartLivingPhoneMock,
    ),
};

function lazyMap(
  loaders: Record<string, Loader>,
): Partial<Record<string, LiveMockup>> {
  return Object.fromEntries(
    Object.entries(loaders).map(([slug, load]) => [
      slug,
      dynamic(load, { ssr: false }),
    ]),
  );
}

const liveWebMockups = lazyMap(webLoaders);
const livePhoneMockups = lazyMap(phoneLoaders);

let preloaded = false;

/**
 * Fetches every live mock chunk without rendering it. The catalog calls this once the
 * browser is idle, so first paint stays light but switching slides doesn't wait on a
 * download. Module promises are cached, so dynamic() resolves instantly afterwards.
 */
export function preloadLiveMockups() {
  if (preloaded) return;
  preloaded = true;
  [...Object.values(webLoaders), ...Object.values(phoneLoaders)].forEach(
    (load) => {
      load().catch(() => {
        // A failed prefetch is harmless: dynamic() retries when the mock is actually shown.
      });
    },
  );
}

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
