import type { ComponentType } from "react";

import { GamingGlobalPhoneMock } from "@/components/projects/mockups/gaming-global-phone-mock";
import { GamingGlobalWebMock } from "@/components/projects/mockups/gaming-global-web-mock";
import { MemorialPlanningPhoneMock } from "@/components/projects/mockups/memorial-planning-phone-mock";
import { MemorialPlanningWebMock } from "@/components/projects/mockups/memorial-planning-web-mock";
import { OxymPhoneMock } from "@/components/projects/mockups/oxym-phone-mock";
import { OxymWebMock } from "@/components/projects/mockups/oxym-web-mock";
import { RealTimeChatPhoneMock } from "@/components/projects/mockups/real-time-chat-phone-mock";
import { RealTimeChatWebMock } from "@/components/projects/mockups/real-time-chat-web-mock";
import { SmartLivingPhoneMock } from "@/components/projects/mockups/smart-living-phone-mock";
import { SmartLivingWebMock } from "@/components/projects/mockups/smart-living-web-mock";
import { TaskManagerWebMock } from "@/components/projects/mockups/task-manager-web-mock";
import { TrackHeroPhoneMock } from "@/components/projects/mockups/track-hero-phone-mock";
import { TrackHeroWebMock } from "@/components/projects/mockups/track-hero-web-mock";
import { WoodyShopPhoneMock } from "@/components/projects/mockups/woody-shop-phone-mock";
import { WoodyShopWebMock } from "@/components/projects/mockups/woody-shop-web-mock";

const liveWebMockups: Partial<Record<string, ComponentType>> = {
  "track-hero": TrackHeroWebMock,
  oxym: OxymWebMock,
  "memorial-planning": MemorialPlanningWebMock,
  "gaming-global": GamingGlobalWebMock,
  "woody-shop": WoodyShopWebMock,
  "real-time-chat": RealTimeChatWebMock,
  "task-manager": TaskManagerWebMock,
  "smart-living": SmartLivingWebMock,
};

const livePhoneMockups: Partial<Record<string, ComponentType>> = {
  "track-hero": TrackHeroPhoneMock,
  oxym: OxymPhoneMock,
  "memorial-planning": MemorialPlanningPhoneMock,
  "gaming-global": GamingGlobalPhoneMock,
  "woody-shop": WoodyShopPhoneMock,
  "real-time-chat": RealTimeChatPhoneMock,
  "smart-living": SmartLivingPhoneMock,
};

export function getLiveWebMockup(slug: string): ComponentType | undefined {
  return liveWebMockups[slug];
}

export function getLivePhoneMockup(slug: string): ComponentType | undefined {
  return livePhoneMockups[slug];
}

export function hasLiveWebMockup(slug: string): boolean {
  return slug in liveWebMockups;
}

export function hasLivePhoneMockup(slug: string): boolean {
  return slug in livePhoneMockups;
}
