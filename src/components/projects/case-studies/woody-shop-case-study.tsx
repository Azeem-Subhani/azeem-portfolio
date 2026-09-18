"use client";

import type { ReactNode } from "react";
import Link from "next/link";

import { WoodyShopPhoneBagCapture } from "@/components/capture/woody-shop/phone-bag-capture";
import { WoodyShopPhoneCapture } from "@/components/capture/woody-shop/phone-capture";
import { WoodyShopPhoneProductCapture } from "@/components/capture/woody-shop/phone-product-capture";
import { WoodyShopWebBagCapture } from "@/components/capture/woody-shop/web-bag-capture";
import { WoodyShopWebCapture } from "@/components/capture/woody-shop/web-capture";
import { WoodyShopWebCheckoutCapture } from "@/components/capture/woody-shop/web-checkout-capture";
import { DeviceStage } from "@/components/projects/device-stage";
import { CaptureFrame } from "@/components/projects/mockups/capture-frame";
import { ProjectDetailIntro } from "@/components/projects/project-detail-intro";
import { Button } from "@/components/ui/button";
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

const mobileRow = heroPhones;

const stackGroups = [
  {
    title: "Storefront",
    items: ["React", "Redux"],
    detail: "Product pages, cart state, and checkout UI with Redux holding line items between routes.",
  },
  {
    title: "Data",
    items: ["Firebase"],
    detail: "Product catalog and order records live in Firebase so the shop stays serverless on the front end.",
  },
  {
    title: "Payments",
    items: ["Stripe API"],
    detail: "Stripe Checkout handles card capture so the app never stores PAN data locally.",
  },
];

export function WoodyShopCaseStudy({ project }: WoodyShopCaseStudyProps) {
  return (
    <article className="mx-auto max-w-7xl px-6 pb-20 pt-32">
      <ProjectDetailIntro project={project} />

      <div className="mt-12">
        <DeviceStage layout="hero" web={heroWeb} phones={heroPhones} syncPhone />
      </div>

      <div className="mx-auto mt-20 grid max-w-5xl gap-12 lg:grid-cols-2">
        <section>
          <h2 className="font-display text-2xl font-normal">Problem</h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            I wanted a real storefront to practice cart state and payments, not a static product
            grid. The hard part is keeping bag contents consistent after refresh and handing off
            to a processor I could trust in production.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl font-normal">Solution</h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            {project.role} Redux persists the cart in localStorage, Firebase holds catalog data,
            and Stripe Checkout closes the loop. Shoppers can leave, come back, and still land on
            checkout with the same items.
          </p>
        </section>
      </div>

      <section className="mt-20">
        <h2 className="font-display text-2xl font-normal">Mobile surfaces</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          The phone app mirrors the same catalog and bag. Discover feeds into product detail, then
          into a bag view that shares Redux state with the web storefront.
        </p>
        <div className="mt-10">
          <DeviceStage layout="row" phones={mobileRow} />
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-5xl">
        <h2 className="font-display text-2xl font-normal">Technology stack</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {stackGroups.map((group) => (
            <li
              key={group.title}
              className="rounded-2xl border border-border bg-card/40 p-6"
            >
              <h3 className="font-display text-lg font-normal">{group.title}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-border px-2.5 py-1 font-mono text-[0.65rem] text-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{group.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-20 max-w-5xl">
        <h2 className="font-display text-2xl font-normal">Outcomes</h2>
        <dl className="mt-8 grid gap-10 sm:grid-cols-2">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <dt className="font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-none text-accent">
                {metric.value}
              </dt>
              <dd className="mt-2 text-muted-foreground">{metric.label}</dd>
            </div>
          ))}
        </dl>
        <ul className="mt-10 space-y-3 border-t border-border pt-8">
          {project.outcomes.map((item) => (
            <li key={item} className="flex gap-3 text-muted-foreground">
              <span
                aria-hidden="true"
                className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
              />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <div className="mx-auto mt-20 max-w-3xl border-t border-border pt-10">
        <p className="font-display text-2xl font-normal">Want to talk through the build?</p>
        <Button asChild className="mt-6" size="lg">
          <Link href="/contact">Start a conversation</Link>
        </Button>
      </div>
    </article>
  );
}
