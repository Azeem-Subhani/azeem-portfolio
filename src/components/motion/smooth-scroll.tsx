"use client";

import { useEffect } from "react";

import { attachSmoothScroll } from "@/components/motion/smooth-scroll-lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => attachSmoothScroll(), []);
  return children;
}
