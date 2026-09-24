"use client";

import type { ReactNode } from "react";

import { WoodyShopPhoneBagCapture } from "@/components/capture/woody-shop/phone-bag-capture";
import { WoodyShopPhoneCapture } from "@/components/capture/woody-shop/phone-capture";
import { WoodyShopPhoneProductCapture } from "@/components/capture/woody-shop/phone-product-capture";
import { WoodyShopWebBagCapture } from "@/components/capture/woody-shop/web-bag-capture";
import { WoodyShopWebCapture } from "@/components/capture/woody-shop/web-capture";
import { WoodyShopWebCheckoutCapture } from "@/components/capture/woody-shop/web-checkout-capture";
import {
  CaseStudyBrief,
  CaseStudyOutcomes,
  CaseStudySection,
  CaseStudyStack,
} from "@/components/projects/case-studies/case-study-sections";
import { DeviceStage } from "@/components/projects/device-stage";
import { CaptureFrame } from "@/components/projects/mockups/capture-frame";
import { ProjectCloser } from "@/components/projects/project-closer";
import { ProjectDetailIntro } from "@/components/projects/project-detail-intro";
import type { Project } from "@/types/content";

import "@/components/capture/woody-shop/woody-shop-capture.css";
import "@/components/projects/mockups/woody-shop-phone-mock.css";

/*
 * FRAME PLAN
 * - web | product-detail | Product page | existing WoodyShopWebCapture | primary DeviceStage (hero)
 * - web | shopping-bag | Shopping bag | invented WoodyShopWebBagCapture | primary DeviceStage (hero)
 * - web | checkout | Checkout | invented WoodyShopWebCheckoutCapture | primary DeviceStage (hero)
 * - phone | discover | Discover feed | existing WoodyShopPhoneCapture | primary DeviceStage (hero, synced)
 * - phone | product-detail | Product detail | invented WoodyShopPhoneProductCapture | primary + secondary
 * - phone | bag | Bag | invented WoodyShopPhoneBagCapture | primary + secondary
 */

type WoodyShopCaseStudyProps = {
  project: Project;
};

const PHONE_SHELL = "bg-[#1A1A1A]";
const PHONE_SCREEN = "bg-white";
const WEB_BG = "#FFFFFF";
const STORE_URL = "woody.shop";

function WoodyShopWebFrame({ children }: { children: ReactNode }) {
  return (
    <CaptureFrame kind="web" background={WEB_BG}>
      {children}
    </CaptureFrame>
  );
}

function WoodyShopPhoneFrame({ children }: { children: ReactNode }) {
  return (
    <CaptureFrame
      kind="phone"
      background={WEB_BG}
      className="ws-phone-mock-host"
    >
      {children}
    </CaptureFrame>
  );
}

const heroWeb = [
  {
    id: "product-detail",
    label: "Product page",
    url: STORE_URL,
    tone: "white" as const,
    children: (
      <WoodyShopWebFrame>
        <WoodyShopWebCapture />
      </WoodyShopWebFrame>
    ),
  },
  {
    id: "shopping-bag",
    label: "Shopping bag",
    url: STORE_URL,
    tone: "white" as const,
    children: (
      <WoodyShopWebFrame>
        <WoodyShopWebBagCapture />
      </WoodyShopWebFrame>
    ),
  },
  {
    id: "checkout",
    label: "Checkout",
    url: STORE_URL,
    tone: "white" as const,
    children: (
      <WoodyShopWebFrame>
        <WoodyShopWebCheckoutCapture />
      </WoodyShopWebFrame>
    ),
  },
];

const heroPhones = [
  {
    id: "discover",
    label: "Discover feed",
    shellClassName: PHONE_SHELL,
    screenClassName: PHONE_SCREEN,
    statusTone: "light" as const,
    children: (
      <WoodyShopPhoneFrame>
        <WoodyShopPhoneCapture />
      </WoodyShopPhoneFrame>
    ),
  },
  {
    id: "product-detail",
    label: "Product detail",
    shellClassName: PHONE_SHELL,
    screenClassName: PHONE_SCREEN,
    statusTone: "light" as const,
    children: (
      <WoodyShopPhoneFrame>
        <WoodyShopPhoneProductCapture />
      </WoodyShopPhoneFrame>
    ),
  },
  {
    id: "bag",
    label: "Bag",
    shellClassName: PHONE_SHELL,
    screenClassName: PHONE_SCREEN,
    statusTone: "light" as const,
    children: (
      <WoodyShopPhoneFrame>
        <WoodyShopPhoneBagCapture />
      </WoodyShopPhoneFrame>
    ),
  },
];

// The hero carries the Discover feed; the row shows the rest of the phone flow, so none repeat.
const heroPhone = heroPhones.slice(0, 1);
const mobileRow = heroPhones.slice(1);

export function WoodyShopCaseStudy({ project }: WoodyShopCaseStudyProps) {
  return (
    <article className="mx-auto max-w-7xl px-6 pb-8 pt-32">
      <ProjectDetailIntro project={project} />

      <div className="mt-12">
        <DeviceStage layout="hero" web={heroWeb} phones={heroPhone} syncPhone />
      </div>

      <CaseStudyBrief
        problem={[
          "I wanted a real storefront to practice cart state and payments, not a static product grid. The hard part is keeping bag contents consistent after refresh and handing off to a processor I could trust in production.",
        ]}
        solution={[
          `${project.role} Redux persists the cart in localStorage, Firebase holds catalog data, and Stripe Checkout closes the loop. Shoppers can leave, come back, and still land on checkout with the same items.`,
        ]}
      />

      <CaseStudySection
        title="Mobile surfaces"
        intro="The phone app mirrors the same catalog and bag. Discover feeds into product detail, then into a bag view that shares Redux state with the web storefront."
      >
        <DeviceStage layout="row" phones={mobileRow} />
      </CaseStudySection>

      <CaseStudyStack items={project.stack} />
      <CaseStudyOutcomes project={project} />
      <ProjectCloser slug={project.slug} />
    </article>
  );
}
