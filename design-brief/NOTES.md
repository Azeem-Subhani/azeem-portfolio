# Design 01 notes

Headline: **take / the idea / to / customers** (`customers` in teal).

That is the job of the site. An idea becomes a booking, payments, or AI product people can actually use.

## Layout

Header, 50/50 hero, 2x2 feature cards beside plan/build/ship, centered stack, four alternating service chapters, large CTA, four-column footer.

## Reused

- Solarized tokens in `src/app/globals.css`. Accent stays `#2aa198`.
- Instrument Serif and Inter from the root layout.
- `Button`, `Header`/`Footer` shells, theme toggle, `useReveal`, `useScrolled`.
- Project facts from `src/content/projects.ts` (Track Hero, Oxym, memorial portal).
- Stack list matches `src/content/skills.ts`. Marks are new monochrome SVGs, not the colored workflow icons.

Removed `/resume`, nav links, sitemap entry, and `scripts/generate-resume-pdf.ts`. `public/azeem-subhani-resume.pdf` is still on disk. `/projects` and `/contact` are unchanged.

## Animation

React Bits TS-TW components live in `src/components/react-bits/`. Extra deps: `gsap`, `@gsap/react`, `ogl`.

- SplitText: stacked hero lines in `src/components/sections/hero.tsx`. Line stagger, `customers` stays teal.
- Magnet: Contact / View projects in the hero, and the final CTA, via `src/components/motion/magnetic-button.tsx`.
- GlareHover: product window chrome in `src/components/sections/product-window.tsx`.
- LightRays: clipped inside the booking mock only, `ssr: false`, teal `#2aa198`, skipped without WebGL or when `prefers-reduced-motion` is on.
- SpotlightCard: four feature cards in `src/components/sections/feature-cards.tsx`. Spotlight `rgba(42, 161, 152, 0.18)`.
- LogoLoop: tech stack row in `src/components/sections/tech-stack.tsx`. Pause on hover, monochrome marks. Static wrap when reduced motion.
- AnimatedContent: each service chapter in `src/components/sections/service-chapters.tsx`, left/right to match the existing split.
- ClickSpark: around "Start a conversation" in `src/components/sections/contact-cta.tsx`. Spark `#2aa198`.

Skipped: SplashCursor, Ballpit, GlitchText, ElectricBorder, Hyperspeed, BlobCursor, MagicBento. Silk was skipped so LightRays can be the only WebGL scene.

## Run

```bash
npm run dev -- --port 3011
```

Open http://localhost:3011

```bash
npm test
```
