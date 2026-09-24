import type { Metadata } from "next";

import { CloudHeroV2 } from "@/components/services/cloud-hero-v2";

export const metadata: Metadata = {
  title: "Cloud infrastructure (preview)",
  description:
    "Preview hero for cloud infrastructure services — AWS, Azure, and GCP.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CloudServiceV2Page() {
  return (
    <article className="cloud-v2-page dark" data-theme="dark">
      <div aria-hidden className="cloud-v2-page__backdrop" />
      <div className="cloud-v2-page__inner">
        <CloudHeroV2 />
      </div>
    </article>
  );
}
