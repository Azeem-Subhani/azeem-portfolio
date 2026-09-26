/**
 * iPhone 15 Pro logical pixels — matches Playwright `devices['iPhone 15 Pro']`
 * and iOS Simulator (393×852 screen).
 */
export const IPHONE_15_PRO = {
  screenWidth: 393,
  screenHeight: 852,
  dynamicIsland: { width: 126, height: 37, top: 11 },
  /** Status row + island inset (pt). */
  safeAreaTop: 59,
} as const;

/** Oxym phone capture canvas width (Playwright export size). */
export const OXYM_PHONE_CAPTURE_WIDTH = 900;

/** Canvas height so width-scaling fills an iPhone 15 Pro screen (393×852). */
export const OXYM_PHONE_MOCK_HEIGHT = Math.round(
  OXYM_PHONE_CAPTURE_WIDTH *
    (IPHONE_15_PRO.screenHeight / IPHONE_15_PRO.screenWidth),
);
