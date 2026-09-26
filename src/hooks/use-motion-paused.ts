"use client";

import { useSyncExternalStore } from "react";

/**
 * Page-wide "pause animations" switch (WCAG 2.2.2). Stored as a data attribute on
 * <html> so CSS loops can pause via `[data-motion-paused] [data-pausable]`, and JS
 * loops subscribe through useMotionPaused.
 */
const CHANGE_EVENT = "site-motion-paused-change";

function readPaused() {
  return document.documentElement.dataset.motionPaused === "true";
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CHANGE_EVENT, onChange);
}

export function setMotionPaused(paused: boolean) {
  if (paused) document.documentElement.dataset.motionPaused = "true";
  else delete document.documentElement.dataset.motionPaused;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function useMotionPaused() {
  return useSyncExternalStore(subscribe, readPaused, () => false);
}

