# Animation pass — Outcome split

The homepage is structurally done and currently static. Add React Bits (https://reactbits.dev) motion so this variant feels like a live product, not a brochure.

Do not restyle the layout, palette, or copy. Do not edit other clones.

## Install

TypeScript + Tailwind variants only:

```
npx shadcn@latest add https://reactbits.dev/r/<Name>-TS-TW --yes
```

Put source under `src/components/react-bits/`. Install only the deps that component needs (`gsap`, `ogl`, `three`). The project already has `motion`.

Retheme every color prop to Solarized: `#2aa198`, `#268bd2`, `#073642`, `#fdf6e3`, `#002b36`, `#eee8d5`, `#93a1a1`. Never leave default purple / magenta / lime.

## Required components (this variant only)

1. **SplitText** on the stacked hero lines (`take` / `the idea` / `to` / `customers`). Stagger by word or line. Accent color stays on `customers`.
2. **SpotlightCard** wrapping each of the four feature cards. Spotlight color `#2aa198` at low opacity.
3. **GlareHover** on the product window chrome (not on the whole page).
4. **LogoLoop** for the tech stack row. Pause on hover. Monochrome marks, same as now.
5. **Magnet** on the Contact / View projects buttons in the hero and the final CTA button.
6. **AnimatedContent** for each service chapter as it enters the viewport. Alternate direction (left/right) to match the existing left/right chapters.
7. **ClickSpark** around the final CTA. Spark color `#2aa198`.

Optional, only if it stays quiet: a clipped **Silk** or **LightRays** layer *inside* the product window mock, opacity low enough to read the booking UI. Not a full-page background.

## Forbidden here

SplashCursor, Ballpit, GlitchText, ElectricBorder, Hyperspeed, BlobCursor, MagicBento. Do not add a page-wide cursor effect.

## Motion rules

- One orchestrated hero entrance. Do not fade-slide every section the generic way.
- Respect `prefers-reduced-motion`: skip SplitText stagger, WebGL, LogoLoop motion, Magnet, ClickSpark. Render the current static markup instead.
- Dynamic-import canvas / WebGL with `ssr: false` if they break SSR.
- Keep keyboard focus visible. Do not trap pointer events over links.
- Responsive to 360px. Perf: no more than one WebGL scene on screen at a time.

## Verify

`npm test`. Fix anything you break. Do not commit. Do not push. Do not leave a dev server running.

## Reveal trigger rule (scroll sections)

Section reveals must start when the thing being animated is on screen, not when
a section edge peeks past the viewport. Otherwise a chapter's lower half plays
its story while the visitor is still two sections away.

- Shared thresholds live in `src/lib/reveal-visibility.ts`. `revealTargetPx`
  asks for 40% of the element's height, bounded between 8% and 32% of the
  viewport so small elements clear the bottom edge and tall ones still start
  while they are visibly on screen. `revealStart` converts that into a GSAP
  `start` value.
- GSAP sections (`service-chapters`, `feature-cards`, `tech-stack`) pass
  `start: () => revealStart(el.offsetHeight, window.innerHeight)` per animated
  element. Chapters trigger copy and visual separately, because a chapter is
  taller than one screen.
- Motion-driven mockups use `useInViewOnce` (`src/hooks/use-in-view-once.ts`)
  instead of `playOnMount` or `viewport={{ margin: "-10% 0px" }}`.
- Keep the `requestAnimationFrame` "already past" guard next to each
  `ScrollTrigger.create`: a deep link that lands mid-page must still reveal.

## Reveal choreography (reading order)

Each section reads in order: heading, then body, then the supporting bits.
Nothing in a section should start at the same instant as its heading.

- Service chapters (`service-chapters.tsx`) split the chapter title into lines
  with `SplitText` (`type: "lines"`, `mask: "lines"`, `autoSplit: true`) and
  rise each line on an 85ms stagger. Body copy starts at 0.45s, chips at 1.0s,
  and the visual carries a 0.24s delay so it answers the copy instead of racing
  it. `onSplit` re-applies `progress(1)` when the reveal already ran, because a
  resize creates new line elements.
- Feature cards: heading lines first, cards from 0.46s, icons from 0.74s, the
  sub-line last.
- Tech stack: headline lines first, body copy from 0.5s, logo loop from its own
  trigger with a 0.15s delay.
- Contrast with the reference site (fivexlabs), measured for calibration:
  headline lines stagger ~80ms apart, body lands as the last line lands
  (~0.4s), the link follows 80ms later, and the visual slides in alongside the
  body. Whole sequence is ~1.2s.

Write what you installed and where you used it in `design-brief/NOTES.md`.
