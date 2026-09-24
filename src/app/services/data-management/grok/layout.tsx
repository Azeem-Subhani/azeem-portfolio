"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

export default function DataManagementGrokLayout({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    document.documentElement.dataset.introState = "seen";
    try {
      sessionStorage.setItem("azeem:intro-seen", "1");
    } catch {
      /* storage blocked */
    }
  }, []);

  return children;
}
