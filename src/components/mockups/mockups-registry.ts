import type { ComponentType } from "react";

import { CloudSectionMock1 } from "@/components/mockups/cloud-mock-1";
import { CloudSectionMock2 } from "@/components/mockups/cloud-mock-2";
import { CloudSectionMock3 } from "@/components/mockups/cloud-mock-3";
import { CloudSectionMock4 } from "@/components/mockups/cloud-mock-4";
import { CloudSectionMock5 } from "@/components/mockups/cloud-mock-5";
import { CloudR2Mock1 } from "@/components/mockups/cloud-r2-mock-1";
import { CloudR2Mock2 } from "@/components/mockups/cloud-r2-mock-2";
import { CloudR2Mock3 } from "@/components/mockups/cloud-r2-mock-3";
import { CloudR2Mock4 } from "@/components/mockups/cloud-r2-mock-4";
import { CloudR2Mock5 } from "@/components/mockups/cloud-r2-mock-5";
import { CloudV3Mock1 } from "@/components/mockups/cloud-v3-mock-1";
import { CloudV3Mock2 } from "@/components/mockups/cloud-v3-mock-2";
import { CloudV3Mock3 } from "@/components/mockups/cloud-v3-mock-3";
import { CloudV3Mock4 } from "@/components/mockups/cloud-v3-mock-4";
import { CloudV3Mock5 } from "@/components/mockups/cloud-v3-mock-5";
import { CloudV4Mock1 } from "@/components/mockups/cloud-v4-mock-1";
import { CloudV4Mock2 } from "@/components/mockups/cloud-v4-mock-2";
import { CloudV4Mock3 } from "@/components/mockups/cloud-v4-mock-3";
import { CloudV4Mock4 } from "@/components/mockups/cloud-v4-mock-4";
import { CloudV4Mock5 } from "@/components/mockups/cloud-v4-mock-5";
import { DataSectionMock1 } from "@/components/mockups/data-mock-1";
import { DataSectionMock2 } from "@/components/mockups/data-mock-2";
import { DataSectionMock3 } from "@/components/mockups/data-mock-3";
import { DataSectionMock4 } from "@/components/mockups/data-mock-4";
import { DataSectionMock5 } from "@/components/mockups/data-mock-5";
import { DataR2Mock1 } from "@/components/mockups/data-r2-mock-1";
import { DataR2Mock2 } from "@/components/mockups/data-r2-mock-2";
import { DataR2Mock3 } from "@/components/mockups/data-r2-mock-3";
import { DataR2Mock4 } from "@/components/mockups/data-r2-mock-4";
import { DataR2Mock5 } from "@/components/mockups/data-r2-mock-5";
import { DataV3Mock1 } from "@/components/mockups/data-v3-mock-1";
import { DataV3Mock2 } from "@/components/mockups/data-v3-mock-2";
import { DataV3Mock3 } from "@/components/mockups/data-v3-mock-3";
import { DataV3Mock4 } from "@/components/mockups/data-v3-mock-4";
import { DataV3Mock5 } from "@/components/mockups/data-v3-mock-5";
import { DataV4Mock1 } from "@/components/mockups/data-v4-mock-1";
import { DataV4Mock2 } from "@/components/mockups/data-v4-mock-2";
import { DataV4Mock3 } from "@/components/mockups/data-v4-mock-3";
import { DataV4Mock4 } from "@/components/mockups/data-v4-mock-4";
import { DataV4Mock5 } from "@/components/mockups/data-v4-mock-5";
import { DataV5Mock5A } from "@/components/mockups/data-v5-mock-5-a";
import { DataV5Mock5B } from "@/components/mockups/data-v5-mock-5-b";
import { DataV5Mock5C } from "@/components/mockups/data-v5-mock-5-c";
import { DataV5Mock5D } from "@/components/mockups/data-v5-mock-5-d";
import { DataV5Mock5E } from "@/components/mockups/data-v5-mock-5-e";
import { DataV5Mock5F } from "@/components/mockups/data-v5-mock-5-f";
import { DataV5Mock5G } from "@/components/mockups/data-v5-mock-5-g";
import { DataV5Mock5H } from "@/components/mockups/data-v5-mock-5-h";
import { DataV5Mock5I } from "@/components/mockups/data-v5-mock-5-i";
import { DataV5Mock5J } from "@/components/mockups/data-v5-mock-5-j";
import { WebSectionMock1 } from "@/components/mockups/web-mock-1";
import { WebSectionMock2 } from "@/components/mockups/web-mock-2";
import { WebSectionMock3 } from "@/components/mockups/web-mock-3";
import { WebSectionMock4 } from "@/components/mockups/web-mock-4";
import { WebSectionMock5 } from "@/components/mockups/web-mock-5";
import { WebR2Mock1 } from "@/components/mockups/web-r2-mock-1";
import { WebR2Mock2 } from "@/components/mockups/web-r2-mock-2";
import { WebR2Mock3 } from "@/components/mockups/web-r2-mock-3";
import { WebR2Mock4 } from "@/components/mockups/web-r2-mock-4";
import { WebR2Mock5 } from "@/components/mockups/web-r2-mock-5";
import { WebV3Mock1 } from "@/components/mockups/web-v3-mock-1";
import { WebV3Mock2 } from "@/components/mockups/web-v3-mock-2";
import { WebV3Mock3 } from "@/components/mockups/web-v3-mock-3";
import { WebV3Mock4 } from "@/components/mockups/web-v3-mock-4";
import { WebV3Mock5 } from "@/components/mockups/web-v3-mock-5";
import { WebV4Mock1 } from "@/components/mockups/web-v4-mock-1";
import { WebV4Mock2 } from "@/components/mockups/web-v4-mock-2";
import { WebV4Mock3 } from "@/components/mockups/web-v4-mock-3";
import { WebV4Mock4 } from "@/components/mockups/web-v4-mock-4";
import { WebV4Mock5 } from "@/components/mockups/web-v4-mock-5";

export type MockupVersion = "v1" | "v2" | "v3" | "v4" | "v5";
export type MockupSection = "cloud" | "web" | "data";

export type MockupDefinition = {
  version: MockupVersion;
  label: string;
  Component: ComponentType;
};

export type MockupVersionGroup = {
  version: MockupVersion;
  description: string;
  mockups: MockupDefinition[];
};

const versionDescriptions: Record<MockupVersion, string> = {
  v1: "Round 1 — original project-heavy directions.",
  v2: "Round 2 — full design brief pass.",
  v3: "Round 3 — sell the service, not portfolio projects.",
  v4: "Round 4 — fivexlabs-style copy plus category visuals.",
  v5: "Round 5 — routing manifest iterations (Data mock 5).",
};

function groupByVersion(mockups: MockupDefinition[]): MockupVersionGroup[] {
  const order: MockupVersion[] = ["v1", "v2", "v3", "v4", "v5"];

  return order.map((version) => ({
    version,
    description: versionDescriptions[version],
    mockups: mockups.filter((mockup) => mockup.version === version),
  }));
}

export const cloudMockups: MockupDefinition[] = [
  { version: "v1", label: "Mock 1 — settlement stack", Component: CloudSectionMock1 },
  { version: "v1", label: "Mock 2 — trace console", Component: CloudSectionMock2 },
  { version: "v1", label: "Mock 3 — payment trace", Component: CloudSectionMock3 },
  { version: "v1", label: "Mock 4 — settlement strata", Component: CloudSectionMock4 },
  { version: "v1", label: "Mock 5 — live scope", Component: CloudSectionMock5 },
  { version: "v2", label: "Mock 1 — chapel portal arch", Component: CloudR2Mock1 },
  { version: "v2", label: "Mock 2 — throughput ring", Component: CloudR2Mock2 },
  { version: "v2", label: "Mock 3 — chapel kiosk conduit", Component: CloudR2Mock3 },
  { version: "v2", label: "Mock 4 — load field", Component: CloudR2Mock4 },
  { version: "v2", label: "Mock 5 — vigil candle", Component: CloudR2Mock5 },
  { version: "v3", label: "Mock 1 — serverless stack trace", Component: CloudV3Mock1 },
  { version: "v3", label: "Mock 2 — auth-to-settlement conduit", Component: CloudV3Mock2 },
  { version: "v3", label: "Mock 3 — production load snapshot", Component: CloudV3Mock3 },
  { version: "v3", label: "Mock 4 — pipeline manifest", Component: CloudV3Mock4 },
  { version: "v3", label: "Mock 5 — stack manifold", Component: CloudV3Mock5 },
  { version: "v4", label: "Mock 1 — service registry topology", Component: CloudV4Mock1 },
  { version: "v4", label: "Mock 2 — deploy pipeline lanes", Component: CloudV4Mock2 },
  { version: "v4", label: "Mock 3 — scale headroom gauge", Component: CloudV4Mock3 },
  { version: "v4", label: "Mock 4 — trace waterfall", Component: CloudV4Mock4 },
  { version: "v4", label: "Mock 5 — capacity ledger", Component: CloudV4Mock5 },
];

export const webMockups: MockupDefinition[] = [
  { version: "v1", label: "Mock 1 — dual browser", Component: WebSectionMock1 },
  { version: "v1", label: "Mock 2 — browser stack", Component: WebSectionMock2 },
  { version: "v1", label: "Mock 3 — venue dispatch", Component: WebSectionMock3 },
  { version: "v1", label: "Mock 4 — hub orbit", Component: WebSectionMock4 },
  { version: "v1", label: "Mock 5 — venue peel", Component: WebSectionMock5 },
  { version: "v2", label: "Mock 1 — pit-wall skin swap", Component: WebR2Mock1 },
  { version: "v2", label: "Mock 2 — phone roster grid", Component: WebR2Mock2 },
  { version: "v2", label: "Mock 3 — theme spine", Component: WebR2Mock3 },
  { version: "v2", label: "Mock 4 — lane merge", Component: WebR2Mock4 },
  { version: "v2", label: "Mock 5 — start gantry", Component: WebR2Mock5 },
  { version: "v3", label: "Mock 1 — tenant skin lab", Component: WebV3Mock1 },
  { version: "v3", label: "Mock 2 — deploy fan", Component: WebV3Mock2 },
  { version: "v3", label: "Mock 3 — composition rail", Component: WebV3Mock3 },
  { version: "v3", label: "Mock 4 — width dial", Component: WebV3Mock4 },
  { version: "v3", label: "Mock 5 — skin wipe", Component: WebV3Mock5 },
  { version: "v4", label: "Mock 1 — responsive tenant pair", Component: WebV4Mock1 },
  { version: "v4", label: "Mock 2 — triptych ledger", Component: WebV4Mock2 },
  { version: "v4", label: "Mock 3 — viewport pair", Component: WebV4Mock3 },
  { version: "v4", label: "Mock 4 — dual surface", Component: WebV4Mock4 },
  { version: "v4", label: "Mock 5 — publish console", Component: WebV4Mock5 },
];

export const dataMockups: MockupDefinition[] = [
  { version: "v1", label: "Mock 1 — topology board", Component: DataSectionMock1 },
  { version: "v1", label: "Mock 2 — phone console", Component: DataSectionMock2 },
  { version: "v1", label: "Mock 3 — reconciliation console", Component: DataSectionMock3 },
  { version: "v1", label: "Mock 4 — constellation", Component: DataSectionMock4 },
  { version: "v1", label: "Mock 5 — retrieval console", Component: DataSectionMock5 },
  { version: "v2", label: "Mock 1 — dispatch strip", Component: DataR2Mock1 },
  { version: "v2", label: "Mock 2 — charge strata", Component: DataR2Mock2 },
  { version: "v2", label: "Mock 3 — ruled ledger", Component: DataR2Mock3 },
  { version: "v2", label: "Mock 4 — deposit slip stack", Component: DataR2Mock4 },
  { version: "v2", label: "Mock 5 — departure board", Component: DataR2Mock5 },
  { version: "v3", label: "Mock 1 — store patch bay", Component: DataV3Mock1 },
  { version: "v3", label: "Mock 2 — write propagation schematic", Component: DataV3Mock2 },
  { version: "v3", label: "Mock 3 — resolver dial", Component: DataV3Mock3 },
  { version: "v3", label: "Mock 4 — store routing worksheet", Component: DataV3Mock4 },
  { version: "v3", label: "Mock 5 — routing manifest", Component: DataV3Mock5 },
  { version: "v4", label: "Mock 1 — pipeline console", Component: DataV4Mock1 },
  { version: "v4", label: "Mock 2 — commit gate", Component: DataV4Mock2 },
  { version: "v4", label: "Mock 3 — classifier console", Component: DataV4Mock3 },
  { version: "v4", label: "Mock 4 — departure board", Component: DataV4Mock4 },
  { version: "v4", label: "Mock 5 — ownership registry", Component: DataV4Mock5 },
  { version: "v5", label: "Mock 5 — solarized clipboard", Component: DataV5Mock5A },
  { version: "v5", label: "Mock 5 — dispatch slab", Component: DataV5Mock5B },
  { version: "v5", label: "Mock 5 — routing spine", Component: DataV5Mock5C },
  { version: "v5", label: "Mock 5 — settlement fan", Component: DataV5Mock5D },
  { version: "v5", label: "Mock 5 — ledger strip", Component: DataV5Mock5E },
  { version: "v5", label: "Mock 5 — routing spine (compact)", Component: DataV5Mock5F },
  { version: "v5", label: "Mock 5 — dispatch slab (pit wall)", Component: DataV5Mock5G },
  { version: "v5", label: "Mock 5 — settlement fan (triplicate)", Component: DataV5Mock5H },
  { version: "v5", label: "Mock 5 — ledger strip (compact)", Component: DataV5Mock5I },
  { version: "v5", label: "Mock 5 — solarized clipboard (refined)", Component: DataV5Mock5J },
];

export function getSectionMockupGroups(section: MockupSection): MockupVersionGroup[] {
  const mockups =
    section === "cloud"
      ? cloudMockups
      : section === "web"
        ? webMockups
        : dataMockups;

  return groupByVersion(mockups);
}

export const sectionLinks = [
  { href: "/mockups/cloud", section: "cloud" as const, label: "Cloud" },
  { href: "/mockups/web", section: "web" as const, label: "Web" },
  { href: "/mockups/data", section: "data" as const, label: "Data" },
] as const;

export const versionLinks = [
  { href: "/mockups/v1", version: "v1" as const, label: "v1" },
  { href: "/mockups/v2", version: "v2" as const, label: "v2" },
  { href: "/mockups/v3", version: "v3" as const, label: "v3" },
  { href: "/mockups/v4", version: "v4" as const, label: "v4" },
  { href: "/mockups/v5", version: "v5" as const, label: "v5" },
] as const;
