---
name: verify
description: Verify portfolio UI changes (service heroes, motion, layout) by driving the Next.js dev server with headless Playwright (screenshots, measurements) and the Chrome DevTools MCP (performance traces).
---

# Verify the portfolio at runtime

## Rules of engagement
1. **Run after any UI change.** Any edit under `src/` that can change what renders (components, CSS, content, motion, layout)
   gets a runtime check of the affected routes before you call the work done or open a PR. Shared code (hero, header, footer,
   `globals.css`) means checking every route that uses it, not just the one you were editing.
2. **On failure, fix and re-run.** Find the cause, fix it in the code, then repeat the same check that failed until it passes.
   Stop after 3 failed attempts and report what you tried. Never weaken a check, skip a route, or loosen an assertion to get green.
3. **Proof is a screenshot or a score.** A claim of "works" needs at least one of: an element or page screenshot of the changed UI,
   or a measured number (console-error count, LCP/CLS/TBT from a trace, overflow px). Attach it in the report, and if a fix was
   needed, show the failing capture and the passing one. No proof, no PASS.

## Handle
1. Start the app in the background: `PORT=3417 npm run dev` (Next.js 16, Turbopack). `.claude/launch.json` defines a `dev` config
   (port 3000) for the Claude preview pane via `preview_start`; the scripted flow below uses 3417 so the two never collide.
2. Drive it with a Node script that imports the repo's own Playwright by absolute path
   (`/<repo>/node_modules/@playwright/test/index.mjs`) and runs headless chromium. Keep scripts in the scratchpad.
3. Prefer element screenshots (`page.locator("h1").screenshot(...)`) plus `page.evaluate` measurements over the Claude browser pane,
   which returns blank or stale frames here (Lenis smooth scroll, scroll reveals, hidden pane).
4. Performance trace (when the change touches motion, hero, or above-the-fold layout): run a trace through the Chrome DevTools MCP
   (`chrome-devtools-mcp`), if it is connected in the session. Check with ToolSearch for `performance_start_trace`.
   - Setup (per developer, local scope, not committed): `claude mcp add chrome-devtools --scope local -- npx -y chrome-devtools-mcp@1.10.1 --isolated --no-usage-statistics --no-performance-crux`.
     Pinned on purpose; review the changelog before bumping. `--isolated` keeps it off your real Chrome profile, and the two `--no-*`
     flags stop usage telemetry and trace URLs going to Google. Start a new session after adding it so the tools load.
   - It launches its own Chrome, separate from the headless Playwright script. Point it at the same `localhost:3417` server.
   - The site intro (see Gotchas) also distorts traces on a fresh profile: pass an `initScript` to `navigate_page` that sets
     `sessionStorage["azeem:intro-seen"] = "true"`, or the first load traces the intro overlay instead of the page.
   - Open the route with `navigate_page`, then `performance_start_trace` with reload and auto-stop, at 1440px and at a mobile size
     (`emulate` with CPU throttling 4x and a slow network preset to expose jank).
   - Read the returned summary (LCP, CLS, TBT) and drill into any flagged insight with `performance_analyze_insight`.
   - Compare against a trace of `main` when judging a regression; a single number in isolation proves little.
   - Serve `next build && next start` for numbers you report. The dev server ships unminified code and HMR, so its traces
     are only good for spotting long tasks and layout shift, not for absolute timings.
   - If the MCP is not connected, say so in the report instead of substituting another tool's numbers as a DevTools trace.
5. Stop the server when done: `pkill -f "next dev"` or `pkill -f next-server`. `pkill -f "next start"` does not match the
   production server, and a leftover one serves stale chunks after a rebuild (500s, refused scripts). Confirm with
   `lsof -iTcp:<port> -sTCP:LISTEN`.

## Routes
`/services/cloud`, `/services/web-development`, `/services/mobile-development`, `/services/data-management`.
Cloud uses `CloudServiceHero`; the other three use `ServiceIntro`. Check both when touching shared hero code.

## Gotchas
- First visit shows the site intro, which pauses hero entrance animations (`html[data-intro-state="fresh"]`).
  Skip it with `context.addInitScript(() => sessionStorage.setItem("azeem:intro-seen", "true"))`.
- To inspect entrance animations mid-flight, pause and scrub them:
  `document.getAnimations().filter(a => a.animationName === "service-rise")`, then set `currentTime` (ms, includes the per-word delay).
- Wait about 4.5s after load when checking the settled state.
- The site forces `data-theme="dark"`; `colorScheme: "light"` emulation does not produce a light hero.
- Check 1440px and 390px widths, and `scrollWidth === clientWidth` for horizontal overflow.
- Turbopack can stick on a stale error after a transient bad edit: restart the dev server.
- Do not run `tests/e2e/contact.spec.ts`; it submits the real contact form (Resend) and sends email.
- Client-side navigation commits after `networkidle`. After clicking a nav link, `waitForURL` before reading `page.url()` or asserting `aria-current`.
- Device-stage tabs are `[data-device-stage] [role=tab]` (3 per project page). A broader `button` selector matches dozens of mockup buttons.
  Use `:visible` when screenshotting inside a stage, since inactive panels stay in the DOM.
- Full sweep worth running for shared changes: every route in `sitemap.ts` at 1440px and 390px, checking status, one `h1`, console errors,
  failed requests, broken images, and horizontal overflow. Click every device-stage tab on the 8 project pages and read the console.
- `/api/contact` is safe to probe with invalid payloads only (403 no/foreign Origin, 415 wrong type, 400 bad JSON, 422 empty, 413 oversized).
  Validation runs before the email send. Never send a valid body. Its rate limit trips after a couple of requests per window.
