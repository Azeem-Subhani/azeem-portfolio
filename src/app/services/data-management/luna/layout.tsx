"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";

export default function DataManagementLunaLayout({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    document.documentElement.dataset.lunaRoute = "true";
    document.body.dataset.lunaRoute = "true";
    document.documentElement.dataset.introState = "seen";
    try {
      sessionStorage.setItem("azeem:intro-seen", "1");
    } catch {
      /* storage blocked */
    }

    return () => {
      delete document.documentElement.dataset.lunaRoute;
      delete document.body.dataset.lunaRoute;
    };
  }, []);

  return children;
}
