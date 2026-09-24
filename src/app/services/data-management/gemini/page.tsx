import type { Metadata } from "next";
import { DataManagementGeminiPage } from "@/components/services/data-management-gemini/data-management-page";

export const metadata: Metadata = {
  title: "Data Management | one record, every system",
  description:
    "Postgres owns the row. Every system stays in sync. Data management architecture consultancy by Azeem Subhani.",
};

export default function GeminiPage() {
  return <DataManagementGeminiPage />;
}
