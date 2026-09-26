import type { Metadata } from "next";

import {
  WhyCta,
  WhyDepth,
  WhyDifferentiators,
  WhyHero,
  WhyProcess,
  WhyResults,
} from "@/components/why/why-sections";
import { WhyMotion } from "@/components/why/why-motion";

export const metadata: Metadata = {
  title: "Why work with me",
  description:
    "How I work: one builder across interface, API, data, and cloud, with working software from the first week.",
  alternates: { canonical: "/why-me" },
};

export default function WhyMePage() {
  return (
    <article className="mx-auto max-w-7xl overflow-x-clip px-6 pb-24 pt-32 lg:pt-40">
      <WhyMotion>
        <WhyHero />
        <WhyDifferentiators />
        <WhyProcess />
        <WhyDepth />
        <WhyResults />
        <WhyCta />
      </WhyMotion>
    </article>
  );
}
