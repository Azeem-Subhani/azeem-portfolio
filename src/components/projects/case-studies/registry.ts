import type { ComponentType } from "react";

import { FallbackCaseStudy } from "@/components/projects/case-studies/fallback-case-study";
import { GamingGlobalCaseStudy } from "@/components/projects/case-studies/gaming-global-case-study";
import { MemorialPlanningCaseStudy } from "@/components/projects/case-studies/memorial-planning-case-study";
import { OxymCaseStudy } from "@/components/projects/case-studies/oxym-case-study";
import { RealTimeChatCaseStudy } from "@/components/projects/case-studies/real-time-chat-case-study";
import { SmartLivingCaseStudy } from "@/components/projects/case-studies/smart-living-case-study";
import { TaskManagerCaseStudy } from "@/components/projects/case-studies/task-manager-case-study";
import { TrackHeroCaseStudy } from "@/components/projects/case-studies/track-hero-case-study";
import { WoodyShopCaseStudy } from "@/components/projects/case-studies/woody-shop-case-study";
import type { Project } from "@/types/content";

export type CaseStudyComponent = ComponentType<{ project: Project }>;

const caseStudies: Partial<Record<string, CaseStudyComponent>> = {
  "track-hero": TrackHeroCaseStudy,
  oxym: OxymCaseStudy,
  "memorial-planning": MemorialPlanningCaseStudy,
  "gaming-global": GamingGlobalCaseStudy,
  "woody-shop": WoodyShopCaseStudy,
  "real-time-chat": RealTimeChatCaseStudy,
  "task-manager": TaskManagerCaseStudy,
  "smart-living": SmartLivingCaseStudy,
};

export function getCaseStudy(slug: string): CaseStudyComponent {
  return caseStudies[slug] ?? FallbackCaseStudy;
}
