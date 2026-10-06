import path from "node:path";

import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

// Google Analytics (loaded only after consent) is the only third-party origin.
// 'unsafe-inline' stays on scripts because the pages are statically
// prerendered: Next's inline bootstrap, the theme/intro script in the root
// layout, and the gtag snippet cannot carry per-request nonces without making
// every route dynamic. The policy still blocks plugins, framing, foreign form
// targets, <base> hijacking, and scripts from any other host.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.googletagmanager.com https://*.google-analytics.com",
  "font-src 'self' data:",
  `connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com${isDev ? " ws: wss:" : ""}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
];

const nextConfig: NextConfig = {
  agentRules: false,
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  poweredByHeader: false,
  // 90 is for blog covers: flat art with thin text shows artifacts at the default 75.
  images: { qualities: [75, 90] },
  turbopack: {
    root: path.resolve(__dirname),
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Project cards and capture stills keep their filenames when re-exported
      // (scripts/optimize-images.ts overwrites in place), so they cannot be
      // immutable. A day fresh plus a week of stale-while-revalidate lets
      // repeat visits skip the per-image round trip and still pick up new art
      // within a day.
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

// Blog post bodies (src/content/blog/*.mdx) are imported as components; no
// .mdx routes, so pageExtensions stays at the default. Plugins are named by
// string so Turbopack can serialize them. Shiki highlights code at build time
// and emits both themes as CSS variables (see src/components/blog/blog.css),
// so no highlighter ships to the browser.
const withMDX = createMDX({
  options: {
    rehypePlugins: [
      [
        "@shikijs/rehype",
        { themes: { light: "github-light", dark: "github-dark-dimmed" }, defaultColor: false },
      ],
    ],
  },
});

export default withMDX(nextConfig);
