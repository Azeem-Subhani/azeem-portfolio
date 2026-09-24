import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import { CloudV3Page } from "@/components/services/cloud-v3-page";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cloud-v3-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cloud infrastructure (v3)",
  description:
    "AWS, Azure, and GCP production systems. Serverless SAM stacks, cost cuts, and traced request paths. Work by Azeem Subhani.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CloudServiceV3Page() {
  return <CloudV3Page className={manrope.variable} />;
}
