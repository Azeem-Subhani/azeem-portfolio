import type { Metadata } from "next";

import { GrokPage } from "@/components/services/data-management-grok/grok-page";

export const metadata: Metadata = {
  title: "Data management",
  description:
    "Postgres owns the row. Every system stays in sync. Data management by Azeem Subhani.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DataManagementGrokPage() {
  return <GrokPage />;
}
