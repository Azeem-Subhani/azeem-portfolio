import type { Metadata } from "next";

import { DataManagementLunaPage } from "@/components/services/data-management-luna/data-management-luna-page";

export const metadata: Metadata = {
  title: "Data Management | one record, every system",
  description:
    "Postgres owns the row. Every system stays in sync. Data management architecture consultancy by Azeem Subhani.",
  alternates: {
    canonical: "/services/data-management/luna",
  },
};

export default function LunaPage() {
  return <DataManagementLunaPage />;
}
